# Conference Data Automation

This document explains how the automated conference data system works.

## Overview

The system automatically fetches and updates crypto conference data weekly using:
- **Perplexity API** for web search and data gathering
- **GitHub Actions** for weekly automation
- **TypeScript data file** for centralized conference management
- **Auto-generated sitemaps** for SEO

## System Architecture

```
┌─────────────────────┐
│  Perplexity API     │  ← Searches web for conferences
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ fetch-conferences.js│  ← Fetches & transforms data
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ src/data/           │  ← Centralized data file
│ conferences.ts      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Conference Pages    │  ← Import and display data
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Sitemap Generator   │  ← Creates sitemap-conferences.xml
└─────────────────────┘
```

## Setup Instructions

### 1. Get Perplexity API Key

1. Go to https://www.perplexity.ai/settings/api
2. Create an API key
3. Copy the key (starts with `pplx-`)

### 2. Set API Key in GitHub

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `PERPLEXITY_API_KEY`
4. Value: Your API key
5. Click **Add secret**

### 3. Test Locally (Optional)

```bash
# Set API key
export PERPLEXITY_API_KEY=pplx-your-key-here

# Fetch conference data
npm run conferences:fetch

# Update sitemap
npm run sitemap:conferences

# Commit changes
git add src/data/conferences.ts public/sitemap-conferences.xml
git commit -m "Update conference data"
git push
```

## Automation Schedule

The system runs automatically:
- **Every Sunday at 00:00 UTC**
- Via GitHub Actions workflow
- Commits changes automatically if data updated

### Manual Trigger

To trigger manually:
1. Go to **Actions** tab in GitHub
2. Select **Update Conference Data**
3. Click **Run workflow**
4. Select **main** branch
5. Click **Run workflow** button

## Data Structure

### Source Format (Perplexity API)
```json
{
  "name": "Bitcoin 2025",
  "start_date": "2025-05-27",
  "end_date": "2025-05-29",
  "location": "Las Vegas, Nevada, USA",
  "type": "Bitcoin",
  "duration": "May 27-29",
  "description": "..."
}
```

### Site Format (conferences.ts)
```typescript
{
  date: "2025-05-27",
  name: "Bitcoin 2025",
  location: "Las Vegas, Nevada, USA",
  type: "Bitcoin",
  duration: "May 27-29",
  monthYear: "May 2025",
  dateDisplay: "May 27, 2025"
}
```

## File Structure

```
bitcoin-perception/
├── .github/
│   └── workflows/
│       └── update-conferences.yml    # Weekly automation
├── scripts/
│   ├── fetch-conferences.js          # Perplexity API fetcher
│   ├── generate-conference-sitemap.cjs  # Sitemap generator
│   └── sync-conferences.js           # Alternative: external API sync
├── src/
│   ├── data/
│   │   └── conferences.ts            # ✨ Generated data file
│   └── pages/
│       └── crypto-conferences/
│           ├── [conference].tsx      # Individual page
│           ├── [month].tsx           # Monthly page
│           └── index.tsx             # Main index
└── public/
    └── sitemap-conferences.xml       # ✨ Generated sitemap
```

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run conferences:fetch` | Fetch latest data from Perplexity |
| `npm run sitemap:conferences` | Regenerate sitemap |
| `npm run conferences:update` | Fetch + regenerate sitemap |

## Monitoring

### Check Last Update

View the timestamp in `src/data/conferences.ts`:
```typescript
// Last updated: 2025-09-29T22:00:00.000Z
```

### Check GitHub Actions

1. Go to **Actions** tab
2. View **Update Conference Data** workflow runs
3. Check logs for errors

### Troubleshooting

**Problem: No conferences fetched**
- Check API key is set correctly in GitHub Secrets
- Check Perplexity API quota/limits
- Check workflow logs for errors

**Problem: Old data showing on site**
- Verify `src/data/conferences.ts` was updated
- Check if GitHub Action completed successfully
- Verify deployment succeeded

**Problem: Sitemap not updating**
- Check `public/sitemap-conferences.xml` was regenerated
- Verify file is copied to `dist/` during build
- Check `_routes.json` excludes `/*.xml`

## Cost Estimate

- **Perplexity API**: ~$0.50/request
- **GitHub Actions**: Free (2000 minutes/month)
- **Weekly runs**: ~52 requests/year = **~$26/year**
- **Manual runs**: Add as needed

## Future Enhancements

- [ ] Add OpenAI as backup data source
- [ ] Email notifications for new conferences
- [ ] Conference change detection (new/removed events)
- [ ] Price tracking and alerts
- [ ] Speaker information
- [ ] Conference reviews/ratings
- [ ] iCal export for calendar apps
- [ ] Webhook notifications to Slack/Discord

## Support

For issues:
1. Check GitHub Actions logs
2. Verify API key is set
3. Test locally with `npm run conferences:fetch`
4. Check Perplexity API status

---

**Last Updated**: 2025-09-29
**Maintainer**: @fernikolic