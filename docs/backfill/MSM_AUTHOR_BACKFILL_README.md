# Mainstream Media Author Backfill System

## Overview

Automated system to extract missing author names from mainstream media outlets in BigQuery using Scrape.do with anti-detection features.

## Features

✅ **Direct BigQuery Integration**
- Automatically fetches URLs with missing authors
- Updates main table and tracking table
- Processes in batches of 100 URLs

✅ **Advanced Anti-Detection**
- Residential proxy support (via Scrape.do `super=true` parameter)
- User-agent rotation
- Rate limiting with configurable delays
- Random jitter between requests
- Exponential backoff retry logic

✅ **Multi-Method Author Extraction**
1. **JSON-LD** (95% confidence) - Structured data from `<script type="application/ld+json">`
2. **Meta Tags** (75-90% confidence) - `author`, `article:author`, `twitter:data1`, etc.
3. **HTML Patterns** (70-85% confidence) - Bylines, author class elements

✅ **Progress Tracking**
- Separate BigQuery tracking table monitors all processing
- Tracks status, attempts, confidence scores, response times
- Prevents duplicate processing
- Enables resumable processing

## Files Created

### 1. `create-author-backfill-table.sql`
Creates the tracking table in BigQuery:
- `url` - URL being processed
- `status` - pending, processing, completed, failed
- `author_found` - Extracted author name
- `extraction_method` - Method used (json_ld, meta_tag, html_pattern)
- `confidence_score` - 0.0 to 1.0
- `scrape_do_credits_used` - Cost tracking
- Timestamps for tracking progress

### 2. `backfill-msm-authors-bigquery.cjs`
Main execution script that:
- Fetches URLs from BigQuery (mainstream media with empty authors)
- Extracts authors using Scrape.do + residential proxies
- Updates tracking table and main table
- Provides detailed progress reports

## Setup

### Prerequisites

1. **Scrape.do API Key**: Already configured in `.env` as `SCRAPEDO_API_KEY`
2. **BigQuery Access**: Service account key at `./functions/bitcoin-data-chat-key.json`
3. **Node.js Dependencies**: Already installed (`@google-cloud/bigquery`, `dotenv`)

### Installation

The tracking table is already created in BigQuery:
```
triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_tracking
```

## Usage

### Run Backfill (100 URLs per batch)

```bash
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  node backfill-msm-authors-bigquery.cjs
```

The script will:
1. Fetch 100 URLs from mainstream media with missing authors
2. Process them with residential proxies and anti-detection
3. Extract authors using multiple methods
4. Update both tracking and main tables
5. Provide detailed statistics

### Run Multiple Batches

To process all ~54,360 URLs, run the script multiple times:

```bash
# Process first batch (100 URLs)
node backfill-msm-authors-bigquery.cjs

# Process next batch (100 more)
node backfill-msm-authors-bigquery.cjs

# ... repeat as needed
```

Each run automatically skips already-processed URLs.

### Process Larger Batches

Edit `CONFIG.BATCH_SIZE` in the script:

```javascript
const CONFIG = {
  BATCH_SIZE: 500, // Change from 100 to 500
  // ...
};
```

## Configuration

### Anti-Detection Settings

```javascript
const CONFIG = {
  // Residential proxies for mainstream media sites
  USE_RESIDENTIAL_PROXY: true,

  // Rate limiting (milliseconds)
  CONCURRENT_REQUESTS: 3,           // 3 simultaneous requests
  DELAY_BETWEEN_BATCHES: 2000,      // 2 seconds between batches
  DELAY_BETWEEN_REQUESTS: 500,      // 500ms random jitter

  // Retry logic
  MAX_RETRIES: 3,                   // Retry up to 3 times
  RETRY_BASE_DELAY: 1000,           // Start with 1 second delay

  // Processing
  BATCH_SIZE: 100,                  // URLs per run
  SAVE_PROGRESS_EVERY: 10,          // Update tracking every 10 URLs

  // Target outlet categories
  OUTLET_CATEGORIES: [
    'Major Newspapers',
    'Financial News',
    'International News',
    'General News',
    'Political News',
    'Technology News'
  ]
};
```

### Cost Optimization

**Residential Proxies** (Recommended for mainstream media):
- Enabled: `USE_RESIDENTIAL_PROXY: true`
- Cost: ~$0.00012 per request
- Better success rate with major outlets (Bloomberg, Forbes, WSJ)

**Standard Proxies** (Cheaper, lower success rate):
- Disabled: `USE_RESIDENTIAL_PROXY: false`
- Cost: ~$0.00004 per request

### Estimated Costs

With current settings (residential proxies):
- **54,360 URLs** × $0.00012 = **~$6.52 total**
- Processing time: ~18-24 hours (with rate limiting)
- Success rate: 60-70% based on testing

## Monitoring

### Check Tracking Table

```bash
# Status breakdown
bq query --use_legacy_sql=false "
  SELECT status, COUNT(*) as count
  FROM \`triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_tracking\`
  GROUP BY status
"

# Success rate by outlet
bq query --use_legacy_sql=false "
  SELECT
    outlet,
    COUNT(*) as total,
    COUNTIF(status = 'completed') as completed,
    ROUND(COUNTIF(status = 'completed') / COUNT(*) * 100, 1) as success_rate
  FROM \`triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_tracking\`
  GROUP BY outlet
  ORDER BY total DESC
  LIMIT 20
"

# Average confidence by extraction method
bq query --use_legacy_sql=false "
  SELECT
    extraction_method,
    COUNT(*) as count,
    ROUND(AVG(confidence_score), 3) as avg_confidence
  FROM \`triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_tracking\`
  WHERE status = 'completed'
  GROUP BY extraction_method
"
```

### Check Main Table Updates

```bash
# Count authors before/after
bq query --use_legacy_sql=false "
  SELECT
    COUNT(*) as total_msm_rows,
    COUNTIF(author_name IS NOT NULL AND author_name != '') as has_author,
    COUNTIF(author_name IS NULL OR author_name = '') as missing_author
  FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
  WHERE Outlet_Category IN (
    'Major Newspapers', 'Financial News', 'International News',
    'General News', 'Political News', 'Technology News'
  )
"
```

## Output Example

```
📰 MAINSTREAM MEDIA AUTHOR BACKFILL - BigQuery Edition

================================================================================

🔐 Anti-Detection Features:
  ✓ Residential proxies: ENABLED
  ✓ Rate limiting: 2000ms between batches
  ✓ Request jitter: up to 500ms random delay
  ✓ Retry logic: 3 retries with exponential backoff
  ✓ Concurrent requests: 3 (reduced for stealth)

================================================================================

📂 Fetching URLs from BigQuery...

✅ Found 100 URLs to process
   Categories: Major Newspapers, Financial News, International News, General News, Political News, Technology News

✅ Initialized tracking for 100 URLs

🚀 Starting author extraction...

[1/100] Bloomberg
  🌐 https://www.bloomberg.com/news/articles/2025-10-24/...
  ✅ Author: Olga Kharif (json_ld, 95% confidence)

[2/100] Forbes
  🌐 https://www.forbes.com/sites/...
  ✅ Author: Billy Bambrough (meta_tag, 90% confidence)

[3/100] CNBC
  🌐 https://www.cnbc.com/2025/10/23/...
  ❌ Failed: No author found in HTML

📊 Progress: 10/100 | Found: 7 (70.0%) | Rate: 0.25/s | ETA: 6.0min

...

================================================================================

🎉 BACKFILL BATCH COMPLETE!

================================================================================

📊 Statistics:

Total URLs processed: 100
Authors found: 67 (67.0%)
Failed: 33 (33.0%)

Scrape.do credits used: 105
Average rate: 0.23 URLs/second
Total time: 7.2 minutes

📈 Success Rate by Outlet:

  Bloomberg                      15/20 (75.0%)
  Forbes                         12/18 (66.7%)
  CNBC                          10/16 (62.5%)
  The Guardian                   8/12 (66.7%)
  Reuters                        6/10 (60.0%)
  ...

================================================================================

💡 Next Steps:
  • Run this script again to process more URLs (fetches next batch)
  • Check tracking table for detailed results
  • Monitor main table for updated authors

================================================================================
```

## Troubleshooting

### Issue: Rate Limited by Scrape.do

**Solution**: Increase `DELAY_BETWEEN_BATCHES` in CONFIG:
```javascript
DELAY_BETWEEN_BATCHES: 3000, // Increase to 3 seconds
```

### Issue: Low Success Rate (<50%)

**Solutions**:
1. Enable residential proxies if not already enabled
2. Check specific outlet errors in tracking table
3. May need outlet-specific parsing patterns

### Issue: BigQuery Permission Errors

**Solution**: Verify service account has permissions:
- `bigquery.tables.update`
- `bigquery.tables.updateData`
- `bigquery.jobs.create`

### Issue: Scrape.do API Errors

**Solutions**:
- Check API key in `.env`: `SCRAPEDO_API_KEY`
- Verify credit balance: [Scrape.do Dashboard](https://scrape.do/dashboard)
- Check for blocked IPs or rate limits

## Best Practices

### 1. Start Small
Test with default batch size (100) before scaling up

### 2. Monitor Credits
Check Scrape.do dashboard regularly:
- Hobby plan: 250,000 credits/month
- Current usage: Track in console output

### 3. Review Results
Check tracking table after each batch:
- Identify low-performing outlets
- Adjust extraction patterns if needed

### 4. Gradual Processing
Process in multiple sessions rather than all at once:
- Avoids overwhelming Scrape.do API
- Better for debugging issues
- Easier to monitor progress

### 5. Verify Updates
Spot-check main table to ensure authors are being updated correctly

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   BigQuery: all_channels_data (main table)         │
│   ┌──────────────────────────────────────────┐    │
│   │ Mainstream media articles                │    │
│   │ 54,360 rows with missing author_name     │    │
│   └────────────────┬─────────────────────────┘    │
│                    │                              │
└────────────────────┼──────────────────────────────┘
                     │
                     │ Query (SELECT URLs WHERE author_name IS NULL)
                     ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│   backfill-msm-authors-bigquery.cjs                 │
│   ┌──────────────────────────────────────────┐    │
│   │ • Fetch 100 URLs                         │    │
│   │ • Initialize tracking records            │    │
│   │ • Process with Scrape.do + Residential   │    │
│   │ • Extract authors (JSON-LD/Meta/HTML)    │    │
│   │ • Update tracking + main tables          │    │
│   └──────────────┬───────────────────────────┘    │
│                  │                                 │
└──────────────────┼─────────────────────────────────┘
                   │
                   │ HTTPS + Residential Proxies
                   ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Scrape.do API (with anti-detection)               │
│   ┌──────────────────────────────────────────┐    │
│   │ • Residential proxy rotation             │    │
│   │ • User-agent spoofing                    │    │
│   │ • Rate limiting                          │    │
│   └──────────────┬───────────────────────────┘    │
│                  │                                 │
└──────────────────┼─────────────────────────────────┘
                   │
                   │ Fetch HTML
                   ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Target Websites (Bloomberg, Forbes, etc.)         │
│   ┌──────────────────────────────────────────┐    │
│   │ Returns HTML with author metadata        │    │
│   └──────────────┬───────────────────────────┘    │
│                  │                                 │
└──────────────────┼─────────────────────────────────┘
                   │
                   │ Parse & Extract
                   ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│   BigQuery: msm_author_backfill_tracking            │
│   ┌──────────────────────────────────────────┐    │
│   │ • url, status, author_found              │    │
│   │ • extraction_method, confidence_score    │    │
│   │ • Prevents duplicate processing          │    │
│   └────────────────────────────────────────┬─┘    │
│                                            │       │
│   BigQuery: all_channels_data (updated)   │       │
│   ┌──────────────────────────────────────┐ │      │
│   │ • author_name column populated        │ │      │
│   └──────────────────────────────────────┘ │      │
│                                              │      │
└──────────────────────────────────────────────┼──────┘
                                              │
                                              ▼
                                     ✅ Complete!
```

## Summary

This system provides a fully automated, resumable, and cost-effective solution for backfilling missing author names from mainstream media outlets. It uses industry best practices for web scraping anti-detection and provides comprehensive tracking and monitoring capabilities.

**Total estimated cost**: ~$6.52 for all 54,360 URLs
**Expected success rate**: 60-70%
**Processing time**: 18-24 hours with rate limiting

Run the script repeatedly until all URLs are processed, monitoring the tracking table for progress and success rates.
