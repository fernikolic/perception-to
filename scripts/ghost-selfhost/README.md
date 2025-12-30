# Ghost Self-Hosted Setup Scripts

Scripts for deploying self-hosted Ghost CMS on GCP with Mailgun for newsletters.

## Overview

This setup replaces Ghost Pro ($552/year for >1,000 members) with:
- GCP Compute Engine e2-micro (Free Tier)
- Cloudflare CDN (Free - reduces egress costs by 85%)
- Mailgun for newsletter delivery (~$84/year for 1k subscribers)
- **Total savings: ~$467/year**

## Files

| File | Purpose |
|------|---------|
| `gcp-setup.sh` | Creates GCP VM, firewall rules, static IP |
| `cloudflare-setup.md` | Cloudflare CDN configuration guide |
| `ghost-member-sync.ts` | Firebase Cloud Function to sync app users to Ghost |

## Quick Start

### 1. Create GCP Infrastructure

```bash
# Make script executable
chmod +x gcp-setup.sh

# Set your project ID (optional, defaults to perception-app-3db34)
export GCP_PROJECT_ID=your-project-id

# Run setup
./gcp-setup.sh
```

### 2. Setup Cloudflare CDN

See `cloudflare-setup.md` for detailed instructions.

1. Add domain to Cloudflare (Free plan)
2. Update nameservers at registrar
3. Add A record: `newsletter` → `[STATIC_IP]` (Proxied/orange cloud)
4. Configure SSL: Full (strict)
5. Set up caching rules

### 3. Install Ghost on VM

```bash
# SSH into VM
gcloud compute ssh ghost-newsletter --zone=us-central1-a

# Run Ghost installation
sudo -u ghost bash /tmp/ghost-install.sh newsletter.perception.to your-email@example.com
```

### 4. Configure Mailgun

1. Create Mailgun account: https://www.mailgun.com/
2. Add domain: `mg.perception.to`
3. Add DNS records (provided by Mailgun)
4. In Ghost Admin (https://newsletter.perception.to/ghost/):
   - Go to Settings → Email newsletter
   - Add Mailgun domain and API key

### 5. Deploy Member Sync Function

Add `ghost-member-sync.ts` to your Firebase Functions project:

```bash
# In your Firebase functions directory
cp ghost-member-sync.ts src/

# Add to src/index.ts
export { syncUserToGhost, retryGhostMemberSync, manualGhostSync } from './ghost-member-sync';

# Add GHOST_ADMIN_API_KEY to Secret Manager
gcloud secrets create GHOST_ADMIN_API_KEY --project=perception-app-3db34
echo -n "your-ghost-admin-api-key" | gcloud secrets versions add GHOST_ADMIN_API_KEY --data-file=-

# Deploy
firebase deploy --only functions:syncUserToGhost,functions:retryGhostMemberSync
```

### 6. Migrate Content

1. Export from Ghost Pro:
   - Ghost Admin → Settings → Labs → Export content

2. Import to self-hosted Ghost:
   - Ghost Admin → Settings → Labs → Import content

3. Export/Import members:
   - Ghost Admin → Members → Export
   - Ghost Admin → Members → Import

## Cost Breakdown

### Monthly Costs

| Component | Cost |
|-----------|------|
| GCP e2-micro | $0 (free tier) |
| 30GB disk | $0 (free tier) |
| Static IP | $0 (attached) |
| Cloudflare CDN | $0 (free tier) |
| GCP Egress (with Cloudflare) | ~$0.10 |
| Mailgun (1k subs) | ~$7 |
| **Total** | **~$7.10/month** |

### Why Cloudflare is Required

GCP Free Tier only includes 1GB/month egress. Without Cloudflare:

| Traffic | Egress | Cost |
|---------|--------|------|
| 5,000 views | 5GB | $0.48/mo |
| 10,000 views | 10GB | $1.08/mo |

With Cloudflare (85% cache hit rate):

| Traffic | Origin Egress | Cost |
|---------|---------------|------|
| 5,000 views | 750MB | Free |
| 10,000 views | 1.5GB | $0.06/mo |

### Annual Comparison

| Setup | Annual |
|-------|--------|
| Ghost Pro (>1k members) | $552 |
| Self-Hosted + Mailgun + Cloudflare | ~$85 |
| **Savings** | **$467** |

## Mailgun Pricing

| Plan | Monthly | Emails |
|------|---------|--------|
| Flex | $0 + $2/1k | Pay as you go |
| Basic | $15 | 10,000 |
| Foundation | $35 | 50,000 |

For 1,000 subscribers sending weekly: ~4,300 emails/month = ~$7/month on Flex plan.

## Maintenance

### Backups

Automated daily backups are configured. Manual backup:
```bash
ghost backup
```

### Updates

```bash
# SSH into VM
gcloud compute ssh ghost-newsletter --zone=us-central1-a

# Update Ghost
cd /var/www/ghost
ghost update
```

### Monitoring

```bash
# Check Ghost status
ghost status

# View logs
ghost log

# Check memory (important for e2-micro)
free -h
```

## Troubleshooting

### Ghost won't start
```bash
ghost log
sudo systemctl status ghost_newsletter-perception-to
```

### Memory issues (e2-micro has 1GB)
```bash
# Add swap
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### SSL issues
```bash
# Renew certificate
sudo certbot renew --force-renewal
```

## Related Documentation

- [Full Architecture Doc](../../docs/infrastructure/GHOST-SELF-HOSTED-ARCHITECTURE.md)
- [Cloudflare Setup Guide](./cloudflare-setup.md)
- [Current Ghost Integration](../../docs/infrastructure/GHOST-CMS-INTEGRATION.md)
- [Brevo Setup](../../docs/email/BREVO_AUDIT_REPORT.md)
