# 6-Month Trends Backfill - Documentation

**Created:** October 24, 2025
**Script:** `backfill-v4-trends-6months.cjs`
**Status:** Ready to run
**Estimated Time:** 6-8 hours
**Estimated Cost:** $85-95

---

## Overview

This script backfills high-quality trends for **May - October 2025** (6 months, ~170,000 articles) using the production v4.0 OpenAI system.

### What It Does

1. Processes articles month-by-month (May → October 2025)
2. Uses the **same v4.0 prompt** that's producing today's excellent quality
3. Extracts trends with proper article grouping (multiple articles per trend, all relevant)
4. Automatically consolidates duplicate trends using 60% title similarity
5. Saves progress after each month (fully resumable)

### Expected Output

- **~1,700-2,000 high-quality trends** across 6 months
- Each trend will have **multiple related articles** (no single-article noise)
- All articles in a trend will be about the **EXACT SAME event** (no unrelated grouping)
- Same quality as current production (October 2025) trends

---

## Prerequisites

### Environment Variables Required

```bash
OPENAI_API_KEY_V2=sk-...    # Your OpenAI API key
GOOGLE_APPLICATION_CREDENTIALS=/path/to/bitcoin-data-chat-key.json
```

### Dependencies

Already installed in the project:
- `@google-cloud/bigquery`
- `openai`
- Node.js 18+

---

## Usage

### Option 1: Run in Foreground (Watch Progress)

```bash
cd /Users/fernandonikolic/perception

OPENAI_API_KEY_V2=$OPENAI_API_KEY \
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
node backfill-v4-trends-6months.cjs
```

### Option 2: Run in Background (Start and Leave)

```bash
cd /Users/fernandonikolic/perception

OPENAI_API_KEY_V2=$OPENAI_API_KEY \
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
nohup node backfill-v4-trends-6months.cjs > backfill-v4.log 2>&1 &

# Get the process ID
echo $!

# Later, check if still running:
ps aux | grep backfill-v4-trends
```

### Option 3: Use screen/tmux (Recommended)

```bash
# Start a screen session
screen -S backfill

# Run the script
cd /Users/fernandonikolic/perception
OPENAI_API_KEY_V2=$OPENAI_API_KEY \
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
node backfill-v4-trends-6months.cjs

# Detach: Press Ctrl+A, then D

# Later, reattach to see progress:
screen -r backfill
```

**YES, you can open a new chat and work on something else!** The script runs independently and saves progress automatically.

---

## Progress Tracking

### Progress File
Location: `/Users/fernandonikolic/perception/data/v4-backfill-progress.json`

Example:
```json
{
  "completedMonths": ["2025-05", "2025-06"],
  "currentMonth": "2025-07",
  "totalCost": 28.45,
  "totalTrends": 567,
  "totalArticlesProcessed": 59476,
  "startedAt": "2025-10-24T...",
  "lastUpdated": "2025-10-24T..."
}
```

### Log File
Location: `/Users/fernandonikolic/perception/data/v4-backfill.log`

Contains detailed logs of:
- Articles processed per month
- Trends created vs updated
- Costs per batch
- Any errors encountered

### Check Progress While Running

```bash
# View progress file
cat /Users/fernandonikolic/perception/data/v4-backfill-progress.json

# Watch log file in real-time
tail -f /Users/fernandonikolic/perception/data/v4-backfill.log

# Check current month being processed
cat /Users/fernandonikolic/perception/data/v4-backfill-progress.json | grep currentMonth
```

---

## What Happens Each Month

### Example: May 2025

1. **Fetch articles** from BigQuery (31,858 articles)
2. **Split into batches** of 100 articles each (~319 batches)
3. **For each batch:**
   - Send to OpenAI with v4.0 prompt
   - Extract 8-15 trends
   - Check if similar trend already exists in May
   - If yes: UPDATE existing trend (add articles)
   - If no: CREATE new trend
4. **After all batches:**
   - Save progress to JSON file
   - Move to next month (June)

### Processing Time per Month

| Month | Articles | Batches | Est. Time | Est. Cost |
|-------|----------|---------|-----------|-----------|
| May 2025 | 31,858 | 319 | 1.5h | $16 |
| June 2025 | 27,618 | 277 | 1.3h | $14 |
| July 2025 | 28,168 | 282 | 1.3h | $14 |
| August 2025 | 28,627 | 287 | 1.3h | $14 |
| September 2025 | 28,971 | 290 | 1.3h | $15 |
| October 2025 | 25,107 | 252 | 1.2h | $13 |
| **Total** | **170,349** | **1,707** | **~8h** | **~$86** |

---

## Resume Capability

**The script is fully resumable!**

If it stops for any reason (power outage, API error, manual stop):

1. It saves progress after each month completes
2. When you restart, it checks `completedMonths` in progress file
3. It skips already-processed months
4. It continues from the next month

**Example:**
```bash
# First run processes May and June, then crashes
# completedMonths: ["2025-05", "2025-06"]

# Restart the script - it will skip May/June and start with July
node backfill-v4-trends-6months.cjs
# Output: "✅ Completed: 2, ⏳ Remaining: 4"
# Continues with July → August → September → October
```

---

## Quality Assurance

### The v4.0 Prompt (Production Quality)

The script uses the **exact same prompt** producing today's excellent results:

**Key Features:**
- ✅ Groups ONLY articles about the EXACT SAME event
- ✅ Rejects loosely-related articles
- ✅ Creates specific titles (names, numbers, actions)
- ✅ Provides concrete business implications
- ✅ Maximum 2 categories per trend

**Example Grouping Rules:**

✅ **GOOD - Will group together:**
- "JPMorgan to Accept Bitcoin as Collateral" (Crypto News)
- "JPMorgan Plans Bitcoin-Backed Loans" (Bloomberg)
- "JPMorgan Allows BTC/ETH Collateral" (Decrypt)

❌ **BAD - Will NOT group:**
- "JPMorgan Bitcoin News" + "Fidelity Bitcoin News" (different companies)
- "Bitcoin hits $109K Monday" + "Bitcoin drops to $105K Wednesday" (different events)

### Consolidation Logic

**60% Title Similarity Threshold:**
- Prevents duplicates across batches
- Only merges truly similar trends
- Preserves unique stories

**Example:**
```
Hour 1: Creates "BlackRock Adds $500M Bitcoin" (3 articles)
Hour 2: Finds "BlackRock Increases Bitcoin Holdings by $500M" (2 articles)
Similarity: 78% → MERGE into one trend (5 articles total)
```

---

## Cost Breakdown

### OpenAI Costs

**Model:** GPT-4o-mini
**Pricing:**
- Input: $0.15 per 1M tokens
- Output: $0.60 per 1M tokens

**Per Batch (100 articles):**
- Input tokens: ~15,000
- Output tokens: ~3,000
- Cost: ~$0.025

**Total for 6 months:**
- 1,707 batches × $0.025 = **~$43**
- Trend synthesis overhead: ~$43
- **Total OpenAI: ~$86**

### BigQuery Costs

**Queries:** ~$3 (fetching articles)
**Updates:** ~$2 (storing trends)
**Total BQ:** ~$5

### Grand Total

**$90-95** for the entire 6-month backfill

---

## Database Schema

### Tables Modified

**`ai_trends_tracking`** - Production trends table

No schema changes needed! Uses existing v4.0 columns:
- `trend_id` - Unique identifier
- `title` - Specific trend title
- `summary` - 2-3 sentence summary
- `key_highlights` - JSON array
- `categories` - JSON array (max 2)
- `articles` - JSON array of source articles
- `article_count` - Number of articles
- `signal_strength` - early/emerging/strong
- `business_implications` - Why it matters
- `title_hash` - MD5 hash for matching
- `last_updated` - When trend was modified
- `update_count` - Times updated

---

## Monitoring

### Check if Process is Running

```bash
# Find the process
ps aux | grep backfill-v4-trends

# Output example:
# user  12345  node backfill-v4-trends-6months.cjs
```

### Kill if Needed

```bash
# Find process ID
ps aux | grep backfill-v4-trends | grep -v grep

# Kill it
kill <process_id>

# Or force kill
kill -9 <process_id>
```

### Restart After Kill

```bash
# Just run the script again - it will resume from last completed month
OPENAI_API_KEY_V2=$OPENAI_API_KEY \
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json \
node backfill-v4-trends-6months.cjs
```

---

## Validation After Completion

### 1. Check Progress File

```bash
cat data/v4-backfill-progress.json

# Should show:
# "completedMonths": ["2025-05", "2025-06", "2025-07", "2025-08", "2025-09", "2025-10"]
# "totalTrends": ~1700-2000
# "totalCost": ~$90
```

### 2. Query BigQuery

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json bq query --use_legacy_sql=false "
SELECT
  DATE_TRUNC(DATE(generated_at), MONTH) as month,
  COUNT(*) as trend_count,
  AVG(article_count) as avg_articles_per_trend
FROM \`triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking\`
WHERE prompt_version = '4.0_backfill'
GROUP BY month
ORDER BY month
"
```

Expected output:
```
month        trend_count  avg_articles
2025-05-01   ~280         3.5
2025-06-01   ~270         3.3
2025-07-01   ~280         3.4
2025-08-01   ~285         3.6
2025-09-01   ~290         3.5
2025-10-01   ~250         3.7
```

### 3. Sample Quality Check

```bash
# Get a random trend from May
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json bq query --use_legacy_sql=false "
SELECT title, article_count, articles
FROM \`triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking\`
WHERE DATE(generated_at) = '2025-05-15'
  AND prompt_version = '4.0_backfill'
ORDER BY RAND()
LIMIT 3
"
```

Verify:
- ✅ Titles are specific (names, numbers, actions)
- ✅ Multiple articles per trend (avg 3+)
- ✅ All articles about same event

---

## Troubleshooting

### Problem: "No articles found for this month"

**Cause:** Month already processed or date filter incorrect
**Solution:** Check `completedMonths` in progress file

### Problem: "OpenAI API error: Rate limit exceeded"

**Cause:** Too many requests too fast
**Solution:** Script has 1-second delays built-in. If this happens, your API tier may be low. Wait and restart.

### Problem: "BigQuery error: Streaming buffer"

**Cause:** Trying to UPDATE rows that were just INSERTed
**Solution:** Script handles this automatically. If error persists, wait 90 seconds and restart.

### Problem: Script hangs

**Cause:** Network issue or OpenAI timeout
**Solution:** Kill and restart. Progress is saved after each month.

### Problem: Costs higher than expected

**Cause:** More articles or trends than estimated
**Solution:** Check `totalCost` in progress file. Can stop anytime - progress is saved.

---

## Next Steps After Completion

### 1. Verify Quality in UI

Visit your trends page and filter by May-October 2025:
```
https://app.perception.to/trends?startDate=2025-05-01&endDate=2025-10-31
```

### 2. Compare with Previous Trends

```bash
# Old trends (before backfill)
SELECT COUNT(*), AVG(article_count)
FROM ai_trends_tracking
WHERE DATE(generated_at) BETWEEN '2025-05-01' AND '2025-10-31'
  AND prompt_version != '4.0_backfill'

# New trends (from backfill)
SELECT COUNT(*), AVG(article_count)
FROM ai_trends_tracking
WHERE DATE(generated_at) BETWEEN '2025-05-01' AND '2025-10-31'
  AND prompt_version = '4.0_backfill'
```

### 3. Clean Up (Optional)

If you want to **replace** old trends with new backfilled ones:

```sql
-- CAREFUL! This deletes old trends
DELETE FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE DATE(generated_at) BETWEEN '2025-05-01' AND '2025-10-31'
  AND (prompt_version IS NULL OR prompt_version != '4.0_backfill')
```

---

## Files Created/Modified

### Created by Script

1. `/Users/fernandonikolic/perception/data/v4-backfill-progress.json` - Progress tracking
2. `/Users/fernandonikolic/perception/data/v4-backfill.log` - Detailed logs

### Modified by Script

1. BigQuery table: `btcp_main_dataset.ai_trends_tracking` - Adds/updates trends

### Script Location

`/Users/fernandonikolic/perception/backfill-v4-trends-6months.cjs`

---

## Support

If issues arise:

1. **Check logs:** `tail -100 data/v4-backfill.log`
2. **Check progress:** `cat data/v4-backfill-progress.json`
3. **Verify environment:** `echo $OPENAI_API_KEY_V2`
4. **Test BigQuery:** `bq ls triple-upgrade-245423:btcp_main_dataset`

---

## FAQ

**Q: Can I run this multiple times?**
A: Yes! It will skip already-completed months.

**Q: Will this affect production trends?**
A: No, it only adds/updates historical trends. Current hourly extraction continues normally.

**Q: Can I stop and resume?**
A: Yes! Progress is saved after each month. Just restart the script.

**Q: How do I know it's working?**
A: Check the log file or progress JSON file. Updates every few minutes.

**Q: What if I run out of OpenAI credits?**
A: Script will error. Add credits and restart - it will resume from last completed month.

**Q: Can I open a new chat while this runs?**
A: YES! This runs independently. You can work on other things.

---

**Status:** Ready to run
**Last Updated:** October 24, 2025
**Script Version:** 1.0
