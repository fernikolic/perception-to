# Cloudflare Setup for Ghost CMS

Configure Cloudflare as a CDN/proxy in front of your self-hosted Ghost to reduce GCP egress costs and improve performance.

## Why Cloudflare?

| Without Cloudflare | With Cloudflare |
|--------------------|-----------------|
| All traffic hits GCP | 80-90% served from edge |
| 5GB egress = $0.60/mo | 5GB egress = ~$0.06/mo |
| No DDoS protection | DDoS protection included |
| No edge caching | Global CDN caching |

## Setup Steps

### 1. Add Domain to Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click "Add a Site"
3. Enter your domain: `perception.to`
4. Select **Free** plan
5. Cloudflare will scan existing DNS records

### 2. Update Nameservers

Update your domain registrar to use Cloudflare nameservers:
```
ns1.cloudflare.com
ns2.cloudflare.com
```

Wait for DNS propagation (up to 24 hours, usually faster).

### 3. Configure DNS for Ghost

Add this record in Cloudflare DNS:

| Type | Name | Content | Proxy Status |
|------|------|---------|--------------|
| A | cms | `34.172.225.167` | Proxied (orange cloud) |

**Result:** `https://cms.perception.to`

**Important:** Keep the orange cloud (Proxied) enabled - this routes traffic through Cloudflare.

**Note:** Your public research content stays at `perception.to/bitcoin-media-research` - visitors never see `cms.perception.to`.

### 4. SSL/TLS Configuration

Go to **SSL/TLS** in Cloudflare dashboard:

1. **SSL/TLS encryption mode**: Set to **Full (strict)**
   - Ghost has its own Let's Encrypt certificate
   - Cloudflare → GCP connection is encrypted

2. **Edge Certificates**: Enable these (free):
   - Always Use HTTPS: ON
   - Automatic HTTPS Rewrites: ON
   - Minimum TLS Version: 1.2

### 5. Caching Configuration

Go to **Caching** → **Configuration**:

| Setting | Value |
|---------|-------|
| Caching Level | Standard |
| Browser Cache TTL | Respect Existing Headers |
| Always Online | ON |

#### Cache Rules (Optional but Recommended)

Go to **Rules** → **Page Rules** (3 free rules):

**Rule 1: Cache Ghost Content**
```
URL: cms.perception.to/content/*
Setting: Cache Level = Cache Everything
Edge Cache TTL: 1 month
```

**Rule 2: Bypass Cache for Admin**
```
URL: cms.perception.to/ghost/*
Setting: Cache Level = Bypass
```

**Rule 3: Cache Static Assets**
```
URL: cms.perception.to/*.css
URL: cms.perception.to/*.js
URL: cms.perception.to/*.jpg
URL: cms.perception.to/*.png
Setting: Cache Level = Cache Everything
Edge Cache TTL: 1 month
```

### 6. Security Settings

Go to **Security** → **Settings**:

| Setting | Value |
|---------|-------|
| Security Level | Medium |
| Challenge Passage | 30 minutes |
| Browser Integrity Check | ON |

Go to **Security** → **Bots**:
- Bot Fight Mode: ON (free)

### 7. Performance Settings

Go to **Speed** → **Optimization**:

| Setting | Value |
|---------|-------|
| Auto Minify | HTML, CSS, JS (all) |
| Brotli | ON |
| Early Hints | ON |
| Rocket Loader | OFF (can break Ghost) |

### 8. Ghost Configuration for Cloudflare

SSH into your GCP VM and update Ghost config:

```bash
cd /var/www/ghost

# Update config to trust Cloudflare proxy headers
ghost config set server.host "127.0.0.1"
ghost config set server.port 2368

# Restart Ghost
ghost restart
```

Update Nginx to get real visitor IPs (already proxied through Cloudflare):

```bash
sudo nano /etc/nginx/nginx.conf
```

Add inside the `http` block:
```nginx
# Cloudflare IP ranges - get real visitor IP
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 104.16.0.0/13;
set_real_ip_from 104.24.0.0/14;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 131.0.72.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 2400:cb00::/32;
set_real_ip_from 2606:4700::/32;
set_real_ip_from 2803:f800::/32;
set_real_ip_from 2405:b500::/32;
set_real_ip_from 2405:8100::/32;
set_real_ip_from 2c0f:f248::/32;
set_real_ip_from 2a06:98c0::/29;

real_ip_header CF-Connecting-IP;
```

Restart Nginx:
```bash
sudo nginx -t && sudo systemctl restart nginx
```

## Verification

### Check Cloudflare is Working

```bash
# Check response headers
curl -I https://newsletter.perception.to

# Look for:
# cf-ray: <ray-id>
# cf-cache-status: HIT (for cached content)
```

### Monitor Cache Performance

In Cloudflare Dashboard → **Analytics** → **Caching**:
- Cached Requests (should be 70-90%)
- Bandwidth Saved

### Estimate Egress Savings

| Metric | Before | After Cloudflare |
|--------|--------|------------------|
| Total requests | 10,000/mo | 10,000/mo |
| Cache hit ratio | 0% | ~85% |
| Origin requests | 10,000 | ~1,500 |
| Egress (1MB/page) | 10GB | ~1.5GB |
| GCP cost | $1.08 | ~$0.06 |

## Troubleshooting

### Ghost Admin Not Loading

Cloudflare might be caching admin pages. Add a page rule:
```
URL: newsletter.perception.to/ghost/*
Setting: Cache Level = Bypass
Security Level = Essentially Off
```

### SSL Errors

1. Ensure Ghost has valid SSL (Let's Encrypt)
2. Cloudflare SSL mode = Full (strict)
3. Check certificate hasn't expired: `ghost ssl`

### Mixed Content Warnings

Enable in Cloudflare:
- Automatic HTTPS Rewrites: ON

### Images Not Loading

Ghost stores images in `/content/images/`. Ensure this path is cached:
```
URL: newsletter.perception.to/content/*
Cache Level: Cache Everything
```

### Real IP Not Showing in Ghost

Verify Nginx real_ip config is applied:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Cost Comparison

### Without Cloudflare
| Traffic | Egress | Cost |
|---------|--------|------|
| 1,000 views | 1GB | Free |
| 5,000 views | 5GB | $0.48 |
| 10,000 views | 10GB | $1.08 |
| 50,000 views | 50GB | $5.88 |

### With Cloudflare (85% cache hit)
| Traffic | Origin Egress | Cost |
|---------|---------------|------|
| 1,000 views | 150MB | Free |
| 5,000 views | 750MB | Free |
| 10,000 views | 1.5GB | $0.06 |
| 50,000 views | 7.5GB | $0.78 |

**Savings at 10k views: $1.02/month = $12.24/year**

## Architecture Diagram

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Visitors   │────▶│  Cloudflare  │────▶│  GCP e2-micro│
│              │     │  (CDN/Proxy) │     │  (Ghost)     │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                     ┌──────┴──────┐
                     │   Cached    │
                     │   Content   │
                     │  (85% hits) │
                     └─────────────┘

Traffic Flow:
1. Visitor requests page
2. Cloudflare checks cache
3. If cached → serve from edge (no GCP egress)
4. If not cached → fetch from GCP, cache, serve
```

## Next Steps

After Cloudflare is configured:

1. ✅ Verify SSL is working
2. ✅ Check cache is hitting (cf-cache-status: HIT)
3. ✅ Monitor Analytics for cache ratio
4. ✅ Set up Cloudflare Email Routing (optional - for receiving emails)
