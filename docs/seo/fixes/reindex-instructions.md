# Manual Reindexing Instructions

**Date:** December 20, 2024
**Status:** SSR fixes deployed, awaiting reindexing

## Current Index Status

All key pages are already indexed in Google, but with **old meta tags**. The SSR fix is now live and serving unique meta tags to Googlebot.

| Page | Last Crawl | Status |
|------|-----------|--------|
| / | Dec 19, 2025 | Will recrawl soon |
| /bitcoin-fear-greed-index | Dec 16, 2025 | Needs reindex |
| /bitcoin-market-sentiment | Dec 16, 2025 | Needs reindex |
| /crypto-conferences | Nov 27, 2025 | Needs reindex |
| /pricing | Dec 14, 2025 | Needs reindex |
| /about | Dec 4, 2025 | Needs reindex |
| /journalist | Nov 11, 2025 | Needs reindex |
| /investor | Nov 13, 2025 | Needs reindex |
| /methodology | Dec 1, 2025 | Needs reindex |
| /docs | Nov 5, 2025 | Needs reindex |
| /api | Nov 2, 2025 | Needs reindex |

## Option 1: Manual Reindexing (Recommended)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select property: `perception.to`
3. Click **URL Inspection** in the left menu
4. For each URL below, paste it and click **Request Indexing**:

```
https://perception.to/bitcoin-fear-greed-index
https://perception.to/bitcoin-market-sentiment
https://perception.to/crypto-conferences
https://perception.to/pricing
https://perception.to/journalist
https://perception.to/investor
https://perception.to/methodology
https://perception.to/docs
https://perception.to/api
```

**Note:** There's a daily limit of ~10-20 indexing requests per property.

## Option 2: Wait for Natural Recrawl

Google will naturally recrawl pages based on:
- Page importance (homepage crawled more frequently)
- Update frequency signals
- Sitemap lastmod dates

Expected timeline:
- Homepage: 1-3 days
- High-value pages: 3-7 days
- Lower-priority pages: 1-2 weeks

## Option 3: Force Recrawl via Sitemap

Update sitemap lastmod dates and resubmit:

1. Update `public/sitemap.xml` with today's date for all URLs
2. Go to Search Console > Sitemaps
3. Click on `sitemap.xml` > "Resubmit sitemap"

## Verification

After reindexing, verify the new meta tags are live:

```bash
# Check what Google sees
site:perception.to/bitcoin-fear-greed-index

# Or use URL Inspection in Search Console
# Look for "Page title" and "Description" in the inspection result
```

## Monitoring

Run the GSC script weekly to track position changes:

```bash
node perception-cmo/seo/scripts/gsc-keyword-analysis.js
```

Compare with previous exports in `perception-cmo/seo/data/`
