# Author & Outlet Image System

This document describes the automated system for managing outlet logos and author headshots in the Perception app.

## Overview

All images are stored locally in the `/public` folder for fast loading (no API calls at runtime). Images are fetched once using Google Custom Search API and stored permanently in the codebase.

| Image Type | Location | Script |
|------------|----------|--------|
| Outlet Logos | `/public/logos/` | `scripts/fetch-outlet-logos.cjs` |
| Author Images | `/public/author-images/` | `scripts/backfill-author-images.cjs` |
| Twitter Profiles | `/public/twitter-profiles/` | `scripts/backfill-twitter-profile-images.cjs` |

## How It Works

### Runtime (Fast)
```
User loads page
  → Outlet logo: /public/logos/bloomberg.svg (instant, local file)
  → Author image: /public/author-images/john-smith.jpg (instant, local file)
      └── Falls back to UI Avatars (initials) if no local image exists
```

### Image Fetching (One-time)
```
Script runs (manual or scheduled)
  → Queries BigQuery for authors/outlets (cached to minimize cost)
  → Searches Google Custom Search API for images
  → Downloads and saves to /public folder
  → Commits to repository
```

---

## Outlet Logos

### Location
`/public/logos/`

### Mapping
Outlet names are mapped to logo files in `src/lib/utils.ts` via `getOutletLogoPath()`:

```typescript
const specialCases: Record<string, string> = {
  'bloomberg': '/logos/Bloomberg.svg',
  'cnbc': '/logos/CNBC_logo.svg',
  'benzinga': '/logos/benzinga-logo.png',
  // ... 200+ mappings
};
```

### Adding New Outlet Logos

**Option 1: Automatic (Script)**
```bash
# Edit scripts/fetch-outlet-logos.cjs to add outlets to MISSING_OUTLETS array
node scripts/fetch-outlet-logos.cjs
```

**Option 2: Manual**
1. Download the logo image
2. Save to `/public/logos/{outlet-name}-logo.{ext}`
3. Add mapping to `src/lib/utils.ts` in `getOutletLogoPath()`

### Current Logo Count
~170 outlet logos

---

## Author Images

### Current Status (Updated Nov 2025)
- **Total authors in database:** ~6,500
- **Images downloaded:** 514+ (and growing daily)
- **Automated backfill:** Running daily at 2 AM UTC
- **Estimated completion:** ~125 days from start

### Location
`/public/author-images/`

### File Naming Convention
Author names are normalized to create filenames:
```
"John Smith" → john-smith.jpg
"María García" → mar-a-garc-a.jpg
"William Suberg" → william-suberg.jpg
```

### Component Usage
The `AuthorAvatar` component in `src/components/dashboard/components/author-avatar.tsx`:

```tsx
<AuthorAvatar authorName="John Smith" size="md" />
```

Flow:
1. Tries to load `/author-images/john-smith.jpg`
2. If not found, falls back to UI Avatars (generates initials-based avatar)

### Search Algorithm
The script searches for author images using Google Custom Search API with this strategy:

1. **Primary search:** `"{author name} {outlet name} journalist headshot"`
   - Example: `"William Suberg Cointelegraph journalist headshot"`

2. **Fallback search:** `"{author name} journalist photo"`
   - Example: `"William Suberg journalist photo"`

3. **Image validation:**
   - Filters for face-type images (`imgType: 'face'`)
   - Skips placeholder images and UI Avatars URLs
   - Verifies image URL is accessible before downloading

4. **Download:**
   - Saves as `.jpg`, `.png`, or `.webp` based on content type
   - Maximum file size: 5MB

### Manual Backfill

```bash
# Check status (no API calls, uses cached data)
node scripts/backfill-author-images.cjs --report

# Download missing images (uses cached author list)
node scripts/backfill-author-images.cjs --limit=50

# Refresh author list from BigQuery (do monthly, costs ~$0.01)
node scripts/backfill-author-images.cjs --refresh-cache --limit=50

# Dry run (see what would be downloaded)
node scripts/backfill-author-images.cjs --dry-run
```

### Automated Backfill (GitHub Actions)

A workflow runs automatically **every day at 2 AM UTC**.

**Workflow file:** `.github/workflows/backfill-author-images.yml`

**What it does:**
1. Uses cached author list (no BigQuery cost)
2. Finds authors without local images
3. Searches Google for headshots (45 authors/day = ~90 queries, within free tier)
4. Downloads and commits new images automatically

**Rate:** ~45 new author images per day (stays within Google's 100 free queries/day)

**Progress tracking:**
- At 45 images/day, ~6,000 authors will take ~133 days to complete
- Check progress: `node scripts/backfill-author-images.cjs --report`

**Manual trigger:**
1. Go to https://github.com/fernikolic/perception-app/actions
2. Click "Backfill Author Images"
3. Click "Run workflow"
4. Options:
   - `limit`: Max authors to process (default: 45)
   - `refresh_cache`: Refresh from BigQuery (default: false)
   - `dry_run`: Preview only (default: false)

---

## Cost Optimization

### BigQuery Costs
- Author list is cached in `data/author-cache.json`
- Cache is reused for all runs (FREE)
- Only `--refresh-cache` queries BigQuery (~$0.01-0.05)
- Recommend refreshing monthly to pick up new authors

### Google Custom Search API
- 100 free queries per day
- Each author uses ~2 queries (tries multiple search terms)
- Default limit of 50 authors = ~100 queries = within free tier
- Rate limited to 1.2 seconds between requests

### Tracking
- `public/author-images/manifest.json` tracks:
  - Successfully downloaded images
  - Failed attempts (won't retry)
  - Last backfill date

### Why 45 Authors Per Day?
- Google Custom Search API: **100 free queries/day**
- Each author uses **~2 queries** (primary + fallback search)
- 45 authors × 2 queries = **90 queries** (safely under limit)
- Buffer accounts for retries and validation checks

---

## Monitoring & Verification

### Check Current Progress
```bash
node scripts/backfill-author-images.cjs --report
```

### Verify Images Are Valid
```bash
# Count total images
ls public/author-images/*.{jpg,png,webp} 2>/dev/null | wc -l

# Check for corrupted (zero-byte) files
find public/author-images/ -type f -size 0

# Verify image file types
file public/author-images/william-suberg.jpg
```

### View Manifest
```bash
# See total downloaded and sample entries
cat public/author-images/manifest.json | head -50
```

### Check GitHub Actions Runs
1. Go to https://github.com/fernikolic/perception-app/actions
2. Click "Backfill Author Images"
3. Review run history and logs

---

## Files Reference

| File | Purpose |
|------|---------|
| `scripts/fetch-outlet-logos.cjs` | Download outlet logos |
| `scripts/backfill-author-images.cjs` | Download author headshots |
| `scripts/fetch-author-images-local.cjs` | Alternative author image script |
| `src/lib/utils.ts` | `getOutletLogoPath()` mapping |
| `src/components/dashboard/components/author-avatar.tsx` | Author avatar component |
| `data/author-cache.json` | Cached author list from BigQuery |
| `public/author-images/manifest.json` | Download tracking |
| `.github/workflows/backfill-author-images.yml` | Automated workflow |

---

## GitHub Secrets Required

For the automated workflow to run, these secrets must be configured:

| Secret | Description |
|--------|-------------|
| `GOOGLE_SEARCH_API_KEY` | Google Custom Search API key |
| `GOOGLE_SEARCH_ENGINE_ID` | Custom Search Engine ID |
| `GCP_SERVICE_ACCOUNT_KEY` | Full JSON of GCP service account (for BigQuery) |

To set secrets:
```bash
gh secret set GOOGLE_SEARCH_API_KEY --body "your-api-key"
gh secret set GOOGLE_SEARCH_ENGINE_ID --body "your-engine-id"
gh secret set GCP_SERVICE_ACCOUNT_KEY < path/to/service-account.json
```

---

## Troubleshooting

### "No cached author list found"
Run with `--refresh-cache` to fetch from BigQuery:
```bash
node scripts/backfill-author-images.cjs --refresh-cache --report
```

### "Google API rate limit reached"
Wait until the next day (resets at midnight Pacific) or use a different API key.

### Image not showing for an outlet
1. Check if logo exists in `/public/logos/`
2. Check mapping in `src/lib/utils.ts`
3. Run `node scripts/fetch-outlet-logos.cjs` to fetch missing

### Author image not showing
1. Check if image exists in `/public/author-images/`
2. The component will fall back to UI Avatars automatically
3. Run backfill script to fetch missing images

---

## Adding a New Outlet Logo Manually

1. Find/download the logo (PNG, JPG, or SVG preferred)
2. Save to `/public/logos/{outlet-name}-logo.{ext}`
3. Add to mapping in `src/lib/utils.ts`:

```typescript
// In getOutletLogoPath() specialCases object:
'my new outlet': '/logos/my-new-outlet-logo.png',
```

4. Commit and deploy

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        RUNTIME                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   User Browser                                               │
│        │                                                     │
│        ▼                                                     │
│   ┌─────────────┐     ┌──────────────────┐                  │
│   │ AuthorAvatar│────▶│ /author-images/  │ (local file)     │
│   └─────────────┘     └──────────────────┘                  │
│        │                      │                              │
│        │ (if not found)       │                              │
│        ▼                      ▼                              │
│   ┌─────────────┐     ┌──────────────────┐                  │
│   │ UI Avatars  │     │ Fast loading!    │                  │
│   │ (fallback)  │     │ No API calls     │                  │
│   └─────────────┘     └──────────────────┘                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    BACKFILL (Daily)                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   GitHub Actions (Daily 2AM UTC)                            │
│        │                                                     │
│        ▼                                                     │
│   ┌─────────────────┐                                       │
│   │ Load author     │◀── data/author-cache.json (FREE)      │
│   │ cache           │                                        │
│   └────────┬────────┘                                       │
│            │                                                 │
│            ▼                                                 │
│   ┌─────────────────┐                                       │
│   │ Find missing    │◀── Compare with /public/author-images │
│   │ authors         │                                        │
│   └────────┬────────┘                                       │
│            │                                                 │
│            ▼                                                 │
│   ┌─────────────────┐                                       │
│   │ Google Custom   │──▶ 100 free queries/day               │
│   │ Search API      │                                        │
│   └────────┬────────┘                                       │
│            │                                                 │
│            ▼                                                 │
│   ┌─────────────────┐                                       │
│   │ Download &      │──▶ /public/author-images/             │
│   │ commit images   │                                        │
│   └─────────────────┘                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Twitter/X Profile Images

### Overview
Profile images for X/Twitter accounts tracked in the app (e.g., @glassnode, @saylor).

### Location
`/public/twitter-profiles/`

### Current Status (December 2025)
- **Total accounts tracked:** ~100
- **Images downloaded:** 90 (90% coverage)
- **Source:** Unavatar.io (free service)

### File Naming Convention
Twitter handles are normalized:
```
@saylor → saylor.jpg
@LynAldenContact → lynaldencontact.jpg
@_Checkmatey_ → _checkmatey_.jpg
```

### Script Usage

```bash
# Show status report (no downloads)
node scripts/backfill-twitter-profile-images.cjs --report

# Download missing images (default limit: 100)
node scripts/backfill-twitter-profile-images.cjs

# Limit number of accounts
node scripts/backfill-twitter-profile-images.cjs --limit=50

# Dry run (preview only)
node scripts/backfill-twitter-profile-images.cjs --dry-run

# Refresh account list from BigQuery
node scripts/backfill-twitter-profile-images.cjs --refresh-cache
```

### How It Works

1. **Account List:** Fetched from BigQuery (cached in `data/twitter-accounts-cache.json`)
2. **Image Source:** Unavatar.io (`https://unavatar.io/twitter/{handle}`)
3. **Storage:** Downloaded to `/public/twitter-profiles/{handle}.jpg`
4. **Tracking:** Progress tracked in `manifest.json`

### Unavatar.io

Unavatar is a free service that aggregates profile images from various sources:
- No API key required
- Supports Twitter, GitHub, Instagram, etc.
- Falls back gracefully when image not found
- Rate limiting: Be respectful, ~500ms delay between requests

### Files Reference

| File | Purpose |
|------|---------|
| `scripts/backfill-twitter-profile-images.cjs` | Download Twitter profile images |
| `data/twitter-accounts-cache.json` | Cached account list from BigQuery |
| `public/twitter-profiles/manifest.json` | Download tracking |
| `public/twitter-profiles/*.jpg` | Downloaded profile images |

### Troubleshooting

**"No cached account list found"**
The BigQuery client may have JWT issues. Use bq CLI to create cache manually:
```bash
bq query --format=json "SELECT DISTINCT Title as handle, COUNT(*) as tweet_count FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\` WHERE Outlet = 'X' GROUP BY Title ORDER BY tweet_count DESC" > /tmp/accounts.json
# Then convert to cache format
```

**Image not found for an account**
Some accounts may have:
- Protected/private profiles
- No profile image set
- Been suspended/deleted

These are tracked in `manifest.json` under `failed` and will be skipped on future runs.
