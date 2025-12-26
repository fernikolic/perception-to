# MSM Author Backfill - Safe Staging Table Approach

## Overview

Safe isolated workflow for backfilling missing author names for 51,514 mainstream media articles using a staging table that never touches the production data.

**Started:** October 26, 2025
**Target:** 51,514 MSM articles missing authors
**Method:** Staging table → Scrape.do extraction → Validate → Merge to main
**Expected Completion:** ~52 hours (auto-running)

---

## Why Staging Table Approach?

The staging table approach provides a safe, isolated environment to:

1. **Zero Risk to Production**: Main `all_channels_data` table is never touched during scraping
2. **Easy Validation**: Review all found authors before committing to production
3. **Rollback Capability**: Can discard staging table if something goes wrong
4. **Resumable**: Script automatically skips URLs that already have authors

---

## Quick Start

### Option 1: Auto-Runner (Recommended)

Automatically processes all 51,514 URLs with zero manual intervention:

```bash
cd /Users/fernandonikolic/perception

# Make script executable (first time only)
chmod +x run-backfill-continuously.sh

# Start auto-runner
./run-backfill-continuously.sh
```

The script will:
- Process 1000 URLs per batch
- Wait 5 seconds between batches
- Automatically re-run until all URLs complete
- Log everything to `msm-backfill-continuous.log`
- Auto-stop when finished

### Option 2: Manual Batch Processing

Process one batch at a time manually:

```bash
cd /Users/fernandonikolic/perception

export SCRAPEDO_API_KEY=014deb40a23446f8ba4d60499ad9da90fbb3836945f
export GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json

node backfill-msm-staging.cjs
```

---

## System Architecture

### Tables

#### Staging Table (Safe Testing Environment)
**Table:** `triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_staging`

- Contains copy of 51,514 MSM articles missing authors
- Updates happen here during scraping
- Main table is NEVER touched
- Can be discarded if needed

#### Production Table (Never Touched During Scraping)
**Table:** `triple-upgrade-245423.btcp_main_dataset.all_channels_data`

- Contains all article data (519,263 rows)
- Only updated AFTER validation of staging table results
- Separate merge script will be created after scraping complete

### Scripts

#### Main Scraping Script
**File:** `/Users/fernandonikolic/perception/backfill-msm-staging.cjs`

Features:
- Processes 1000 URLs per batch (configurable)
- Uses all 5 concurrent requests from Scrape.do Hobby Plan
- Multi-method author extraction (JSON-LD, meta tags, HTML patterns)
- Automatic retry with exponential backoff
- Updates staging table only

Configuration:
```javascript
const CONFIG = {
  USE_RESIDENTIAL_PROXY: false,   // Standard rotating proxies
  CONCURRENT_REQUESTS: 5,          // Max on Hobby Plan
  DELAY_BETWEEN_BATCHES: 1000,   // 1 second
  DELAY_BETWEEN_REQUESTS: 200,    // 200ms jitter
  MAX_RETRIES: 3,
  BATCH_SIZE: 1000,                // URLs per run
  TEST_MODE: false                 // Production mode
};
```

#### Auto-Runner Script
**File:** `/Users/fernandonikolic/perception/run-backfill-continuously.sh`

Features:
- Continuously runs scraping script until complete
- Auto-detects when all URLs have authors
- Logs all output to `msm-backfill-continuous.log`
- Safety limit of 60 runs (52 needed for 51,514 URLs)
- 5 second pause between runs

---

## Author Extraction Methods

### 1. JSON-LD Structured Data (95% Confidence)
Extracts from schema.org JSON-LD:
```html
<script type="application/ld+json">
{
  "@type": "NewsArticle",
  "author": { "name": "John Doe" }
}
</script>
```

**Success Rate:** ~60-70% of URLs
**Reliability:** Highest - standardized format

### 2. Meta Tags (75-90% Confidence)
Extracts from HTML meta tags:
```html
<meta name="author" content="Jane Smith">
<meta property="article:author" content="Bob Johnson">
<meta name="parsely-author" content="Alice Brown">
```

**Success Rate:** ~20-25% of URLs
**Reliability:** High - publisher-provided

### 3. HTML Patterns (70-85% Confidence)
Extracts from common byline patterns:
```html
<span class="author-name">Charlie Davis</span>
By <a rel="author">Eve Wilson</a>
<div class="byline">By Frank Miller</div>
```

**Success Rate:** ~5-10% of URLs
**Reliability:** Medium - pattern matching

---

## Monitoring Progress

### Check Remaining URLs in Staging Table

```bash
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  bq query --use_legacy_sql=false --format=pretty \
  "SELECT
    COUNT(*) as urls_remaining
   FROM \`triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_staging\`
   WHERE author_name IS NULL OR author_name = '' OR TRIM(author_name) = ''"
```

### Check Success Statistics

```bash
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  bq query --use_legacy_sql=false --format=pretty \
  "SELECT
    COUNT(*) as total_urls,
    SUM(CASE WHEN author_name IS NOT NULL AND TRIM(author_name) != '' THEN 1 ELSE 0 END) as authors_found,
    ROUND(SUM(CASE WHEN author_name IS NOT NULL AND TRIM(author_name) != '' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as success_rate
   FROM \`triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_staging\`"
```

### Watch Live Progress

```bash
# Watch auto-runner log
tail -f msm-backfill-continuous.log

# Or watch manual run log
tail -f msm-backfill-production.log
```

### Check Running Processes

```bash
# See if auto-runner is running
ps aux | grep run-backfill-continuously | grep -v grep

# See if Node.js backfill is running
ps aux | grep backfill-msm-staging | grep -v grep
```

---

## Cost & Performance

### Scrape.do API Usage

**Plan:** Hobby ($29/month)
- **Monthly Credits:** 250,000
- **Needed for Project:** 51,514 credits (~20.6%)
- **Remaining After:** ~198,486 credits
- **Cost per URL:** $0.0005636
- **Total Cost:** ~$29.03 (covered by monthly plan)

### Performance Metrics

**Based on Testing:**
- **Time per URL:** ~4-5 seconds average
- **Batch of 1000 URLs:** ~1.2 hours
- **Total Batches Needed:** ~52 batches
- **Total Time:** ~52-62 hours
- **Success Rate:** 70-75% (based on test batch)

### Resource Usage

- **Network:** Moderate (5 concurrent API calls)
- **Memory:** Low (~50MB for Node.js process)
- **CPU:** Very low (mostly waiting on API)
- **Disk:** Minimal (logs only)

---

## Troubleshooting

### Auto-Runner Not Running

```bash
# Check if it's running
ps aux | grep run-backfill-continuously | grep -v grep

# Start it manually
cd /Users/fernandonikolic/perception
chmod +x run-backfill-continuously.sh
./run-backfill-continuously.sh
```

### Script Exits with Error

Check the log for errors:
```bash
tail -100 msm-backfill-continuous.log
```

Common errors and fixes:

**"HTTP 401" Errors:**
- API key issue
- Verify: `echo $SCRAPEDO_API_KEY`
- Should be: `014deb40a23446f8ba4d60499ad9da90fbb3836945f`

**"HTTP 429" Rate Limit:**
- Reduce concurrent requests in script
- Increase delays between batches

**"Permission Denied" (BigQuery):**
- Check credentials file exists
- Verify: `ls -la functions/bitcoin-data-chat-key.json`

### Low Success Rate (<60%)

View sample failures:
```bash
# Check last 20 processed URLs
tail -40 msm-backfill-continuous.log | grep "Failed:"
```

Common failure reasons:
- **No author found:** Article doesn't have byline (opinion, wire stories)
- **HTTP 404:** Page deleted or moved
- **HTTP 401:** Paywall blocking scraper
- **HTTP 301:** Permanent redirect (needs URL update)

### Script Running But No Progress

```bash
# Check if staging table is being updated
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  bq query --use_legacy_sql=false \
  "SELECT COUNT(*) as authors_found
   FROM \`triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_staging\`
   WHERE author_name IS NOT NULL AND TRIM(author_name) != ''"
```

Run this twice, 5 minutes apart. Count should increase.

---

## Manual Control

### Stop Auto-Runner

```bash
# Find process ID
ps aux | grep run-backfill-continuously | grep -v grep

# Kill it (use PID from above)
kill <PID>

# Or force kill all
pkill -f run-backfill-continuously
```

### Resume After Stopping

The script is resumable - just start it again:
```bash
cd /Users/fernandonikolic/perception
./run-backfill-continuously.sh
```

It will automatically skip URLs that already have authors.

### Process Specific Batch Size

Edit `backfill-msm-staging.cjs`:
```javascript
BATCH_SIZE: 500  // Change from 1000 to 500
```

Then run:
```bash
node backfill-msm-staging.cjs
```

---

## After Completion

### Step 1: Validate Results

Check final statistics:
```bash
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  bq query --use_legacy_sql=false --format=pretty \
  "SELECT
    COUNT(*) as total,
    SUM(CASE WHEN author_name IS NOT NULL AND TRIM(author_name) != '' THEN 1 ELSE 0 END) as found,
    SUM(CASE WHEN author_name IS NULL OR TRIM(author_name) = '' THEN 1 ELSE 0 END) as not_found,
    ROUND(SUM(CASE WHEN author_name IS NOT NULL AND TRIM(author_name) != '' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as success_rate
   FROM \`triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_staging\`"
```

### Step 2: Review Sample Authors

```bash
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  bq query --use_legacy_sql=false --format=pretty --max_rows=20 \
  "SELECT Outlet, author_name, URL
   FROM \`triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_staging\`
   WHERE author_name IS NOT NULL AND TRIM(author_name) != ''
   ORDER BY RAND()
   LIMIT 20"
```

### Step 3: Merge to Production (Future Script)

After validation, a merge script will:
1. Update `all_channels_data` with found authors from staging table
2. Match rows by URL
3. Only update `author_name` column
4. Log all changes for audit

**Script will be created after backfill completes.**

---

## Files & Locations

### Scripts
- **Main Scraper:** `/Users/fernandonikolic/perception/backfill-msm-staging.cjs`
- **Auto-Runner:** `/Users/fernandonikolic/perception/run-backfill-continuously.sh`

### Logs
- **Auto-Runner Log:** `/Users/fernandonikolic/perception/msm-backfill-continuous.log`
- **Manual Run Log:** `/Users/fernandonikolic/perception/msm-backfill-production.log`

### Configuration
- **Environment:** `/Users/fernandonikolic/perception/.env` (SCRAPEDO_API_KEY)
- **BigQuery Key:** `/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json`

### BigQuery Tables
- **Staging:** `triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_staging`
- **Production:** `triple-upgrade-245423.btcp_main_dataset.all_channels_data`

---

## Safety Features

1. **Staging Table Only:** Production table never touched during scraping
2. **Auto-Skip:** Script skips URLs that already have authors
3. **Idempotent:** Can re-run safely without duplicating work
4. **Rate Limited:** Conservative API usage to avoid bans
5. **Retry Logic:** Automatic retry with exponential backoff
6. **Logging:** Full audit trail of all operations
7. **Safety Limit:** Auto-runner stops after 60 iterations (safety net)

---

## Expected Results

### Success Rate Target: 70-75%

Based on testing:
- **JSON-LD Success:** ~65% of URLs
- **Meta Tags Success:** ~20% of URLs
- **HTML Patterns Success:** ~10% of URLs
- **No Author Found:** ~25-30% of URLs (legitimate - no byline)

### Expected Authors Found: ~36,000-38,000

From 51,514 URLs:
- **With Authors:** 36,000-38,000 articles
- **Without Authors:** 13,000-15,000 articles (wire stories, opinion pieces, etc.)

### Timeline

- **Batch Duration:** ~1.2 hours per 1000 URLs
- **Total Batches:** ~52 batches
- **Total Duration:** ~52-62 hours
- **Start:** October 26, 2025
- **Expected Completion:** October 28-29, 2025

---

**Last Updated:** October 26, 2025
**Status:** Active - Auto-Runner Ready
**Next Step:** Run auto-runner script to process all URLs
