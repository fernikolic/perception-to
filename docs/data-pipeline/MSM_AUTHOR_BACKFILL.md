# Media Author Backfill Documentation

## Overview

Automated system to backfill missing author names for 79,650 media articles (mainstream + crypto-native) in BigQuery using Scrape.do API with rotating proxies.

**Started:** October 25, 2025 at 8:46 AM
**Expanded:** October 25, 2025 at 5:00 PM (added 25,290 crypto media URLs)
**Expected Completion:** ~10-12 days (November 5-7, 2025)
**Success Rate Target:** 50%+ author extraction
**Current Success Rate:** 90.7%

---

## Quick Status Check

### Check Overall Progress

```bash
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  bq query --use_legacy_sql=false --format=pretty \
  "SELECT
    status,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM \`triple-upgrade-245423.btcp_main_dataset.msm_urls_to_backfill\`), 2) as percentage
   FROM \`triple-upgrade-245423.btcp_main_dataset.msm_urls_to_backfill\`
   GROUP BY status
   ORDER BY status"
```

**Expected Output:**
```
+-----------+-------+------------+
|  status   | count | percentage |
+-----------+-------+------------+
| completed | XXXX  | XX.XX%     |
| failed    | XXXX  | XX.XX%     |
| pending   | XXXX  | XX.XX%     |
+-----------+-------+------------+
```

### Check Running Processes

```bash
ps aux | grep -E "(backfill|auto)" | grep -v grep
```

**Expected Output:**
- `start-auto-backfill.sh` - Main loop coordinator
- `backfill-authors-scrapedo-standard.cjs` - Active scraping process

### View Live Progress

```bash
# Watch auto-loop log
tail -f /Users/fernandonikolic/perception/auto-backfill.log

# Watch detailed scraping log
tail -f /Users/fernandonikolic/perception/backfill-scrapedo.log
```

### Check Success Rate by Outlet

```bash
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  bq query --use_legacy_sql=false --format=pretty \
  "SELECT
    outlet,
    COUNT(*) as authors_found
   FROM \`triple-upgrade-245423.btcp_main_dataset.msm_urls_to_backfill\`
   WHERE status = 'completed'
   GROUP BY outlet
   ORDER BY authors_found DESC"
```

### Check Extraction Method Performance

```bash
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  bq query --use_legacy_sql=false --format=pretty \
  "SELECT
    extraction_method,
    COUNT(*) as count,
    ROUND(AVG(confidence_score), 2) as avg_confidence
   FROM \`triple-upgrade-245423.btcp_main_dataset.msm_urls_to_backfill\`
   WHERE status = 'completed'
   GROUP BY extraction_method
   ORDER BY count DESC"
```

### View Sample Found Authors

```bash
GOOGLE_APPLICATION_CREDENTIALS=./Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
  bq query --use_legacy_sql=false --format=pretty --max_rows=20 \
  "SELECT
    outlet,
    author_found,
    extraction_method,
    ROUND(confidence_score, 2) as confidence
   FROM \`triple-upgrade-245423.btcp_main_dataset.msm_urls_to_backfill\`
   WHERE status = 'completed'
   ORDER BY RAND()
   LIMIT 20"
```

---

## System Architecture

### Components

1. **Tracking Table:** `triple-upgrade-245423.btcp_main_dataset.msm_urls_to_backfill`
   - Contains all 79,650 URLs to process
   - Includes mainstream media (54,360) + crypto-native media (25,290)
   - Tracks status: `pending`, `completed`, `failed`
   - Stores found authors and extraction metadata

2. **Main Data Table:** `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
   - Updated with found authors in `author_name` column
   - Original source of URLs with empty authors

3. **Scraping Script:** `/Users/fernandonikolic/perception/backfill-authors-scrapedo-standard.cjs`
   - Processes 500 URLs per batch
   - Uses Scrape.do standard rotating proxies
   - Multi-method author extraction (JSON-LD, meta tags, HTML patterns)

4. **Auto-Loop System:**
   - `/Users/fernandonikolic/perception/auto-backfill-loop.sh` - Main loop
   - `/Users/fernandonikolic/perception/start-auto-backfill.sh` - Starter script
   - Runs continuously until all URLs processed

### Configuration (Conservative Settings)

```javascript
const CONFIG = {
  CONCURRENT_REQUESTS: 5,        // Safe rate limit
  DELAY_BETWEEN_BATCHES: 1000,   // 1 second between batches
  DELAY_BETWEEN_REQUESTS: 200,   // 200ms jitter
  MAX_RETRIES: 3,                // Retry failed requests
  BATCH_SIZE: 500                // URLs per batch
};
```

**Why Conservative?**
- Prioritizes success rate over speed
- Avoids triggering anti-bot detection
- Maintains ~50%+ author extraction success
- Proven stable settings from initial testing

---

## Author Extraction Methods

### 1. JSON-LD (Highest Confidence: 95%)
Extracts from structured schema.org data:
```html
<script type="application/ld+json">
{
  "@type": "NewsArticle",
  "author": { "name": "John Doe" }
}
</script>
```

### 2. Meta Tags (High Confidence: 75-90%)
Extracts from HTML meta tags:
```html
<meta name="author" content="Jane Smith">
<meta property="article:author" content="Bob Johnson">
```

### 3. HTML Patterns (Medium Confidence: 70-85%)
Extracts from common HTML byline patterns:
```html
<span class="author-name">Alice Brown</span>
By <a rel="author">Charlie Davis</a>
```

### 4. Firecrawl Metadata (High Confidence: 90%)
Used for first 100 URLs only (free tier limit):
- API-based extraction
- Already completed with 47% success rate

---

## Cost & Credits

**Scrape.do Plan:** Hobby ($29/month)
- **Monthly Credits:** 250,000
- **Credits Used:** ~79,650 (one per URL)
- **Remaining:** ~170,350 (plenty of buffer)
- **Cost per URL:** $0.000116

**Total Estimated Cost:** ~$9.24 for entire backfill

---

## Troubleshooting

### If Process Stops Running

```bash
# Check if processes died
ps aux | grep backfill | grep -v grep

# Restart auto-loop manually
cd /Users/fernandonikolic/perception
nohup ./start-auto-backfill.sh > auto-backfill.log 2>&1 &
```

### If Success Rate Drops Below 40%

The settings may need adjustment. Check error messages:

```bash
# View recent failures
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  bq query --use_legacy_sql=false --format=pretty --max_rows=10 \
  "SELECT url, outlet, error_message
   FROM \`triple-upgrade-245423.btcp_main_dataset.msm_urls_to_backfill\`
   WHERE status = 'failed'
   ORDER BY RAND()
   LIMIT 10"
```

### If You See HTTP 429 (Rate Limit) Errors

Increase delays in `backfill-authors-scrapedo-standard.cjs`:
```javascript
DELAY_BETWEEN_BATCHES: 2000,  // Increase to 2 seconds
CONCURRENT_REQUESTS: 3,        // Reduce to 3 concurrent
```

### If You See HTTP 401 (Unauthorized) Errors

Check API key is valid:
```bash
# Test Scrape.do API
curl "http://api.scrape.do?token=${SCRAPEDO_API_KEY}&url=https://example.com"
```

---

## Manual Control

### Stop the Auto-Loop

```bash
# Find process IDs
ps aux | grep -E "(start-auto-backfill|auto-backfill-loop)" | grep -v grep

# Kill processes
pkill -f "start-auto-backfill"
pkill -f "auto-backfill-loop"
```

### Run Single Batch Manually

```bash
cd /Users/fernandonikolic/perception
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  node backfill-authors-scrapedo-standard.cjs
```

### Reset Failed URLs to Retry

```bash
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  bq query --use_legacy_sql=false \
  "UPDATE \`triple-upgrade-245423.btcp_main_dataset.msm_urls_to_backfill\`
   SET status = 'pending', error_message = NULL, attempts = 0
   WHERE status = 'failed'"
```

---

## Expected Timeline

| Day | Estimated Progress | URLs Processed |
|-----|-------------------|----------------|
| 1   | 10-12%           | ~8,000-10,000  |
| 2   | 20-25%           | ~16,000-20,000 |
| 3   | 30-35%           | ~24,000-28,000 |
| 4   | 40-45%           | ~32,000-36,000 |
| 5   | 50-55%           | ~40,000-44,000 |
| 6   | 60-65%           | ~48,000-52,000 |
| 7   | 70-75%           | ~56,000-60,000 |
| 8   | 80-85%           | ~64,000-68,000 |
| 9   | 90-95%           | ~72,000-76,000 |
| 10  | 100%             | ~79,650        |

**Success Rate Target:** 50%+ authors found (40,000+ new author names)
**Actual Success Rate:** 90.7% (exceeding target)

---

## Files & Locations

- **Main Script:** `/Users/fernandonikolic/perception/backfill-authors-scrapedo-standard.cjs`
- **Auto-Loop:** `/Users/fernandonikolic/perception/auto-backfill-loop.sh`
- **Starter:** `/Users/fernandonikolic/perception/start-auto-backfill.sh`
- **Auto Log:** `/Users/fernandonikolic/perception/auto-backfill.log`
- **Detail Log:** `/Users/fernandonikolic/perception/backfill-scrapedo.log`
- **Firecrawl Log:** `/Users/fernandonikolic/perception/backfill-firecrawl.log`
- **BigQuery Key:** `/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json`

---

## Statistics

### Initial (Oct 25, 2025 - 9:00 AM)
```
Total URLs:       54,360 (MSM only)
Completed:        94 (0.17%)
Failed:           84 (0.15%)
Pending:          54,182 (99.67%)
Success Rate:     52.8%
Authors Found:    94
Top Outlets:      CNBC (23), Fortune (20), Forbes (17)
Top Method:       Firecrawl (47), JSON-LD (37)
```

### After Expansion (Oct 25, 2025 - 5:00 PM)
```
Total URLs:       79,650 (MSM + Crypto Media)
Completed:        2,729 (3.43%)
Failed:           279 (0.35%)
Pending:          76,642 (96.22%)
Success Rate:     90.7%
Authors Found:    2,729
Added URLs:       25,290 (Cointelegraph, CoinDesk, Decrypt, etc.)
Top Method:       JSON-LD (1,893), Meta Tags (706)
```

---

## Contact & Support

- **Scrape.do Docs:** https://docs.scrape.do
- **BigQuery Docs:** See `/docs/data-pipeline/BIGQUERY_SCHEMA_MANAGEMENT.md`
- **Issues:** Monitor logs and check error patterns in BigQuery

---

## Completion Checklist

When backfill is complete (all URLs processed):

1. ✅ Verify final statistics in BigQuery
2. ✅ Check success rate met target (50%+)
3. ✅ Review error patterns for failed URLs
4. ✅ Confirm main table `all_channels_data` has been updated
5. ✅ Archive logs for future reference
6. ✅ Stop auto-loop processes
7. ✅ Document any lessons learned
8. ✅ Consider re-running failed URLs with different extraction methods

---

**Last Updated:** October 25, 2025
**Status:** Active - Running Automatically
