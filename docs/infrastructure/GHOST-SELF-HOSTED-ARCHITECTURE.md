# Ghost CMS Self-Hosted Architecture

Documentation for migrating from Ghost Pro to self-hosted Ghost on GCP with Mailgun for newsletters.

**Created:** December 30, 2025
**Status:** Planning

---

## Executive Summary

### Current State (Ghost Pro)
- **Hosting:** Ghost Pro ($46/mo for >1,000 members)
- **Newsletters:** Included (Mailgun managed by Ghost)
- **App Notifications:** Brevo Free (300/day)
- **Annual Cost:** ~$552

### Target State (Self-Hosted)
- **Hosting:** GCP Compute Engine (e2-micro free tier)
- **Newsletters:** Mailgun Flex (~$8/mo for 1k subscribers)
- **App Notifications:** Brevo Free (unchanged)
- **Annual Cost:** ~$100-120

### Savings: ~$430/year

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PERCEPTION PLATFORM                             │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────────┐
                              │   Cloudflare        │
                              │   (CDN/Proxy)       │
                              ├─────────────────────┤
                              │ • Edge caching      │
                              │ • DDoS protection   │
                              │ • SSL termination   │
                              │ • 85% cache hits    │
                              └──────────┬──────────┘
                                         │
         ┌───────────────────────────────┼───────────────────────────────┐
         │                               │                               │
         ▼                               ▼                               ▼
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│   GCP Compute       │     │   Cloudflare        │     │   Firebase/GCP      │
│   Engine            │     │   Pages             │     │   Backend           │
│   (e2-micro)        │     │                     │     │                     │
├─────────────────────┤     ├─────────────────────┤     ├─────────────────────┤
│ • Ghost CMS         │     │ • perception.to     │     │ • Cloud Functions   │
│ • MySQL             │     │ • React SPA         │     │ • Firestore         │
│ • Nginx             │     │ • SEO Middleware    │     │ • Auth              │
│ • SSL (Let's Encrypt)│    │                     │     │ • BigQuery          │
└──────────┬──────────┘     └──────────┬──────────┘     └──────────┬──────────┘
           │                           │                           │
           │ Content API               │ Static Build              │ App Data
           ▼                           ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA FLOW                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Newsletter Flow:                                                            │
│  Ghost → Mailgun API → Subscriber Inbox                                     │
│                                                                              │
│  App Notification Flow:                                                      │
│  Cloud Function → Brevo API → User Inbox                                    │
│                                                                              │
│  Build Flow:                                                                 │
│  Ghost Content API → fetch-ghost-posts.js → ghost-posts.json → React       │
│                                                                              │
│  Member Sync Flow:                                                           │
│  Firestore (new user) → Cloud Function → Ghost Admin API → Ghost Members   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────┐     ┌─────────────────────┐
│   Mailgun           │     │   Brevo             │
│   (Newsletter)      │     │   (App Notifications)│
├─────────────────────┤     ├─────────────────────┤
│ • Flex Plan         │     │ • Free Tier         │
│ • $2/1000 emails    │     │ • 300 emails/day    │
│ • Native Ghost      │     │ • Transactional API │
│   integration       │     │                     │
└─────────────────────┘     └─────────────────────┘
```

---

## 1. GCP Compute Engine Setup

### Instance Specification

| Setting | Value |
|---------|-------|
| Machine Type | e2-micro (Always Free) |
| vCPU | 0.25 (shared) |
| Memory | 1 GB |
| Region | us-central1 / us-east1 / us-west1 |
| Boot Disk | 30 GB Standard (Free Tier) |
| OS | Ubuntu 22.04 LTS |
| Static IP | Included (free when attached) |

### Free Tier Limits

| Resource | Free Allowance |
|----------|----------------|
| e2-micro VM hours | 720 hrs/month (full month) |
| Standard persistent disk | 30 GB |
| Snapshot storage | 5 GB |
| Network egress | 1 GB/month to most regions |

### Estimated Monthly Cost

| Component | Cost |
|-----------|------|
| e2-micro VM | $0 (free tier) |
| 30GB disk | $0 (free tier) |
| Static IP | $0 (attached to VM) |
| Network egress (1GB) | $0 (free tier) |
| **Total** | **$0** |

> **Note:** If exceeding free tier limits, e2-micro costs ~$6.12/month.

---

## 2. Ghost CMS Installation

### Prerequisites

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x (Ghost requirement)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL 8.0
sudo apt install -y mysql-server
sudo mysql_secure_installation

# Install Nginx
sudo apt install -y nginx

# Install Ghost-CLI
sudo npm install ghost-cli@latest -g
```

### Ghost Installation

```bash
# Create Ghost directory
sudo mkdir -p /var/www/ghost
sudo chown $USER:$USER /var/www/ghost
cd /var/www/ghost

# Install Ghost
ghost install

# Configuration prompts:
# - Blog URL: https://newsletter.perception.to (or subdomain)
# - MySQL hostname: localhost
# - MySQL username: ghost
# - MySQL password: <secure-password>
# - Ghost database name: ghost_production
# - Set up Nginx: Yes
# - Set up SSL: Yes (via Let's Encrypt)
# - Set up systemd: Yes
```

### Configuration File

**File:** `/var/www/ghost/config.production.json`

```json
{
  "url": "https://cms.perception.to",
  "server": {
    "port": 2368,
    "host": "127.0.0.1"
  },
  "database": {
    "client": "mysql",
    "connection": {
      "host": "localhost",
      "user": "ghost",
      "password": "<MYSQL_PASSWORD>",
      "database": "ghost_production"
    }
  },
  "mail": {
    "transport": "SMTP",
    "options": {
      "service": "Mailgun",
      "host": "smtp.mailgun.org",
      "port": 587,
      "secure": false,
      "auth": {
        "user": "postmaster@mg.perception.to",
        "pass": "<MAILGUN_SMTP_PASSWORD>"
      }
    }
  },
  "logging": {
    "transports": ["file", "stdout"]
  },
  "process": "systemd",
  "paths": {
    "contentPath": "/var/www/ghost/content"
  }
}
```

### Bulk Mail Configuration (Mailgun)

**File:** Ghost Admin → Settings → Email newsletter

```
Mailgun Domain: mg.perception.to
Mailgun API Key: <MAILGUN_API_KEY>
Mailgun Base URL: https://api.mailgun.net/v3
```

---

## 3. Mailgun Setup

### Account Configuration

1. **Sign up:** https://www.mailgun.com/
2. **Add domain:** `mg.perception.to` (or subdomain)
3. **Verify domain:** Add DNS records

### DNS Records Required

| Type | Name | Value |
|------|------|-------|
| TXT | mg | v=spf1 include:mailgun.org ~all |
| TXT | smtp._domainkey.mg | (provided by Mailgun) |
| CNAME | email.mg | mailgun.org |
| MX | mg | mxa.mailgun.org (priority 10) |
| MX | mg | mxb.mailgun.org (priority 10) |

### Mailgun Pricing (Current)

| Plan | Monthly | Emails Included | Overage |
|------|---------|-----------------|---------|
| Flex | $0 base | 1,000 free | $2/1,000 |
| Basic | $15 | 10,000 | $1.80/1,000 |
| Foundation | $35 | 50,000 | $1.50/1,000 |

### Your Expected Cost

| Subscribers | Emails/Month | Plan | Monthly Cost |
|-------------|--------------|------|--------------|
| 1,000 | ~4,300 | Flex | ~$6.60 |
| 2,000 | ~8,600 | Basic | $15 |
| 5,000 | ~21,500 | Foundation | $35 |

---

## 4. Cloudflare CDN Setup (Required)

Cloudflare is required to minimize GCP egress costs and provide DDoS protection.

### Why Cloudflare?

| Without Cloudflare | With Cloudflare |
|--------------------|-----------------|
| All traffic hits GCP | 85% served from edge |
| 10GB egress = $1.08/mo | 10GB egress = ~$0.16/mo |
| No DDoS protection | DDoS protection included |
| No edge caching | Global CDN caching |

### Setup Steps

1. **Add domain to Cloudflare** (Free plan)
2. **Update nameservers** at your registrar
3. **Configure DNS:**

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | newsletter | `<GCP_STATIC_IP>` | Proxied (orange) |

4. **SSL Settings:**
   - Mode: Full (strict)
   - Always Use HTTPS: ON
   - Minimum TLS: 1.2

5. **Caching Rules:**
   - Cache `/content/*` (images, assets)
   - Bypass `/ghost/*` (admin panel)

6. **Update Nginx** for real visitor IPs (see setup guide)

### Detailed Instructions

See: `scripts/ghost-selfhost/cloudflare-setup.md`

---

## 5. DNS & Domain Configuration

### DNS Records (via Cloudflare)

| Record | Type | Name | Value | Proxy |
|--------|------|------|-------|-------|
| A | cms | `34.172.225.167` | Proxied |

**Result:** `https://cms.perception.to`

### URL Structure

| URL | Purpose | Who Accesses |
|-----|---------|--------------|
| `cms.perception.to/ghost` | Ghost Admin panel | You only |
| `cms.perception.to/ghost/api/content/` | Content API | Build script |
| `perception.to/bitcoin-media-research` | Public research hub | Visitors |

### Mailgun DNS Records

| Type | Name | Value |
|------|------|-------|
| TXT | mg | v=spf1 include:mailgun.org ~all |
| TXT | smtp._domainkey.mg | (provided by Mailgun) |
| CNAME | email.mg | mailgun.org |
| MX | mg | mxa.mailgun.org (priority 10) |
| MX | mg | mxb.mailgun.org (priority 10) |

---

## 6. Member Sync: App Users → Ghost Newsletter

### Strategy

When a new user signs up for the Perception app, automatically add them to Ghost as a newsletter subscriber.

### Cloud Function: `syncUserToGhost`

**File:** `functions/src/ghost-member-sync.ts`

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

const GHOST_URL = 'https://newsletter.perception.to';
const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY;

// Generate Ghost Admin API token
function generateGhostToken(): string {
  const [id, secret] = GHOST_ADMIN_API_KEY!.split(':');

  const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: '/admin/'
  });

  return token;
}

// Add member to Ghost
async function addGhostMember(email: string, name: string): Promise<void> {
  const token = generateGhostToken();

  const response = await fetch(`${GHOST_URL}/ghost/api/admin/members/`, {
    method: 'POST',
    headers: {
      'Authorization': `Ghost ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      members: [{
        email,
        name,
        subscribed: true,
        labels: ['app-user']
      }]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    // Member might already exist - that's OK
    if (error.errors?.[0]?.type !== 'ValidationError') {
      throw new Error(`Ghost API error: ${JSON.stringify(error)}`);
    }
  }
}

// Firestore trigger: new user created
export const syncUserToGhost = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    const userData = snap.data();

    // Skip if user opted out of newsletter
    if (userData.newsletterOptOut === true) {
      console.log(`User ${userData.email} opted out of newsletter`);
      return;
    }

    try {
      await addGhostMember(
        userData.email,
        userData.displayName || userData.email.split('@')[0]
      );

      console.log(`Added ${userData.email} to Ghost newsletter`);

      // Update user record
      await snap.ref.update({
        ghostMemberSynced: true,
        ghostSyncedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      console.error(`Failed to sync ${userData.email} to Ghost:`, error);

      // Mark for retry
      await snap.ref.update({
        ghostMemberSyncError: (error as Error).message,
        ghostMemberSyncRetry: true
      });
    }
  });

// Scheduled retry for failed syncs
export const retryGhostMemberSync = functions.pubsub
  .schedule('every 6 hours')
  .onRun(async () => {
    const db = admin.firestore();

    const failedSyncs = await db.collection('users')
      .where('ghostMemberSyncRetry', '==', true)
      .limit(100)
      .get();

    for (const doc of failedSyncs.docs) {
      const userData = doc.data();

      try {
        await addGhostMember(userData.email, userData.displayName);

        await doc.ref.update({
          ghostMemberSynced: true,
          ghostSyncedAt: admin.firestore.FieldValue.serverTimestamp(),
          ghostMemberSyncRetry: admin.firestore.FieldValue.delete(),
          ghostMemberSyncError: admin.firestore.FieldValue.delete()
        });

        console.log(`Retry successful for ${userData.email}`);
      } catch (error) {
        console.error(`Retry failed for ${userData.email}:`, error);
      }
    }
  });
```

### Ghost Admin API Key

1. Go to Ghost Admin → Settings → Integrations
2. Create "Perception App Sync" integration
3. Copy **Admin API Key** (format: `{id}:{secret}`)
4. Add to GCP Secret Manager:

```bash
# Add secret
gcloud secrets create GHOST_ADMIN_API_KEY \
  --project=perception-app-3db34 \
  --replication-policy="automatic"

# Set value
echo -n "your-admin-api-key" | gcloud secrets versions add GHOST_ADMIN_API_KEY \
  --project=perception-app-3db34 \
  --data-file=-
```

### Function Deployment

```bash
# Update functions/src/index.ts to export new functions
# Then deploy:
firebase deploy --only functions:syncUserToGhost,functions:retryGhostMemberSync
```

---

## 7. Content API Integration (Unchanged)

The existing build-time fetch remains the same, just update the URL:

### Environment Variables

```env
# Before (Ghost Pro)
GHOST_API_URL=https://bitcoin-perception.ghost.io

# After (Self-Hosted)
GHOST_API_URL=https://cms.perception.to
```

### Fetch Script

**File:** `scripts/fetch-ghost-posts.js` (no changes needed)

The script will automatically use the new URL from environment variables.

---

## 8. Migration Plan

### Phase 1: Infrastructure Setup (Day 1-2)

- [ ] Create GCP Compute Engine instance (e2-micro)
- [ ] Configure firewall rules (HTTP/HTTPS/SSH)
- [ ] Assign static IP
- [ ] Install Ghost CMS
- [ ] Set up SSL with Let's Encrypt
- [ ] Configure Nginx

### Phase 2: Cloudflare Setup (Day 2)

- [ ] Add domain to Cloudflare (Free plan)
- [ ] Update nameservers at registrar
- [ ] Add A record for newsletter subdomain (Proxied)
- [ ] Configure SSL mode: Full (strict)
- [ ] Set up caching rules
- [ ] Configure Nginx for real visitor IPs
- [ ] Verify Cloudflare is working (check cf-ray header)

### Phase 3: Mailgun Setup (Day 2-3)

- [ ] Create Mailgun account
- [ ] Add and verify domain `mg.perception.to`
- [ ] Configure DNS records
- [ ] Connect Mailgun to Ghost
- [ ] Test newsletter sending

### Phase 4: Content Migration (Day 3)

- [ ] Export content from Ghost Pro (Settings → Labs → Export)
- [ ] Import to self-hosted Ghost
- [ ] Verify all posts imported correctly
- [ ] Export/import members list
- [ ] Verify member count matches

### Phase 5: Integration Updates (Day 4)

- [ ] Update `GHOST_API_URL` in Cloudflare Pages
- [ ] Deploy member sync Cloud Function
- [ ] Update DNS for newsletter subdomain
- [ ] Test build process with new Ghost URL

### Phase 6: Testing (Day 5)

- [ ] Test newsletter signup form
- [ ] Test newsletter delivery (send test post)
- [ ] Test member sync (create test app user)
- [ ] Test Content API (run `npm run ghost:fetch`)
- [ ] Verify all research pages render correctly

### Phase 7: Cutover (Day 6)

- [ ] Point DNS to self-hosted Ghost
- [ ] Update all documentation
- [ ] Cancel Ghost Pro subscription
- [ ] Monitor for issues

---

## 9. Backup Strategy

### Automated Backups

```bash
# Create backup script
cat > /home/$USER/backup-ghost.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/$USER/ghost-backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup MySQL
mysqldump -u ghost -p ghost_production > $BACKUP_DIR/ghost_db_$DATE.sql

# Backup content
tar -czf $BACKUP_DIR/ghost_content_$DATE.tar.gz /var/www/ghost/content

# Upload to GCS (optional)
# gsutil cp $BACKUP_DIR/* gs://perception-ghost-backups/

# Keep only last 7 days
find $BACKUP_DIR -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /home/$USER/backup-ghost.sh

# Schedule daily backup (2am)
(crontab -l 2>/dev/null; echo "0 2 * * * /home/$USER/backup-ghost.sh") | crontab -
```

### Manual Backup

```bash
# From Ghost Admin
Settings → Labs → Export content

# Database backup
ghost backup

# Full content backup
tar -czf ghost-content-backup.tar.gz /var/www/ghost/content
```

---

## 10. Monitoring

### Ghost Health Check

```bash
# Check Ghost status
ghost status

# View logs
ghost log

# Check systemd service
sudo systemctl status ghost_newsletter-perception-to
```

### Uptime Monitoring

Add to existing monitoring (or use free tier):
- UptimeRobot: https://newsletter.perception.to
- Ghost Admin: https://newsletter.perception.to/ghost/

### Resource Monitoring

```bash
# Memory usage (critical for e2-micro)
free -h

# Disk usage
df -h

# Process memory
ps aux --sort=-%mem | head -10
```

---

## 11. Cost Summary

### Monthly Costs

| Component | Provider | Cost |
|-----------|----------|------|
| Ghost Hosting | GCP Free Tier | $0 |
| CDN/Proxy | Cloudflare Free | $0 |
| GCP Egress (with Cloudflare) | GCP | ~$0.10 |
| Newsletter Sending | Mailgun Flex | ~$7 |
| App Notifications | Brevo Free | $0 |
| Domain | Already owned | $0 |
| SSL | Let's Encrypt | $0 |
| **Total** | | **~$7.10/month** |

### Egress Cost Breakdown

| Traffic Level | Without Cloudflare | With Cloudflare (85% cache) |
|---------------|--------------------|-----------------------------|
| 5,000 views | $0.48/mo | $0.07/mo |
| 10,000 views | $1.08/mo | $0.16/mo |
| 50,000 views | $5.88/mo | $0.88/mo |

### Annual Comparison

| Setup | Annual Cost |
|-------|-------------|
| Ghost Pro (>1k members) | $552 |
| Self-Hosted + Mailgun + Cloudflare | ~$85 |
| **Savings** | **~$467/year** |

---

## 12. Troubleshooting

### Ghost Won't Start

```bash
# Check logs
ghost log

# Check Node.js version (need 18.x)
node -v

# Check MySQL
sudo systemctl status mysql

# Restart Ghost
ghost restart
```

### Newsletter Not Sending

1. Check Mailgun dashboard for errors
2. Verify domain is verified
3. Check Ghost → Settings → Email newsletter
4. Test with: `ghost mail test`

### Memory Issues (e2-micro)

```bash
# Add swap file
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### SSL Certificate Renewal

```bash
# Let's Encrypt auto-renews, but to test:
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal
```

---

## 13. Security Hardening

### Firewall Rules (GCP)

| Rule | Direction | Ports | Source |
|------|-----------|-------|--------|
| Allow HTTP | Ingress | 80 | 0.0.0.0/0 |
| Allow HTTPS | Ingress | 443 | 0.0.0.0/0 |
| Allow SSH | Ingress | 22 | Your IP only |

### SSH Hardening

```bash
# Disable password auth
sudo sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

# Use SSH keys only
```

### Ghost Security

```bash
# Keep Ghost updated
ghost update

# Regular security updates
sudo apt update && sudo apt upgrade -y
```

---

## Related Documentation

- [Current Ghost Integration](./GHOST-CMS-INTEGRATION.md)
- [Infrastructure Overview](./INFRASTRUCTURE-OVERVIEW.md)
- [Email Design System](../email/EMAIL_DESIGN_SYSTEM.md)
- [Brevo Audit Report](../email/BREVO_AUDIT_REPORT.md)
