# Final Action Plan - MSM/Crypto Author Backfill
**Date:** October 26, 2025, 3:15 PM PDT
**Status:** ✅ READY TO EXECUTE

---

## ✅ COMPLETED TODAY

### 1. Data Folder Organization
- Created `/data/completed/` - Oct 23-24 enrichment (49,754 rows ✅)
- Created `/data/archived/` - Old/obsolete files
- Created `/data/active/` - Current operations
- Added README files explaining each folder

### 2. Full System Audit
- Identified 3 overlapping backfill systems
- Clarified what's complete vs what's pending
- Verified real-time enrichment is working (`backfillMissingImages`)

### 3. Database Analysis
**Total rows needing authors:** ~70,000
- Financial News: 30,630 rows (MSM)
- Crypto News: 17,861 rows
- International News: 12,437 rows (MSM)
- Other (mix): 3,868 rows (MSM + Crypto)
- Technology News: 2,355 rows (MSM)
- Political News: 1,905 rows (MSM)
- General News: 1,717 rows (MSM)
- Magazines: 1,588 rows (MSM)
- Regional News: 521 rows (MSM)
- Research: 329 rows

**TOTAL TARGET: ~73,000 rows (all MSM + Crypto News + Other)**

---

## WHAT'S ALREADY WORKING ✅

### Real-Time Metadata Enrichment
**Function:** `backfillMissingImages`
- ✅ Deployed at: https://backfillmissingimages-bybdtt43xa-uc.a.run.app
- ✅ Runs every 30 minutes via Cloud Scheduler
- ✅ Processes last 24 hours of articles
- ✅ Fills missing `Image_URL` and `author_name`
- ✅ Excludes: Reddit, Twitter/X, GitHub, Stacker News, Spotify
- ✅ Processes 50 URLs per run
- ✅ Uses Scrape.do API

**YOUR REQUIREMENT #2: COMPLETE - NO ACTION NEEDED**

---

## WHAT NEEDS TO BE DONE

### Historical Author Backfill

**Current Status:**
- Staging table: 1,223 authors found ✅ (will merge)
- Mixed table: 2,855 authors found ✅ (will merge)
- **Remaining:** ~67,000 rows still need authors

**Target Categories:**
- All MSM categories (Financial, Tech, Political, etc.)
- Crypto News
- Other (mix of MSM + Crypto)

**Exclusions:**
- Reddit (43,851 rows)
- Twitter/X (307,436 rows)
- GitHub (~5,500 rows)
- Stacker News (15,658 rows)

---

## BEST APPROACH: DIRECT PRODUCTION UPDATE

Based on your answers and my analysis, here's the best approach:

### Why Direct Production Update?

**Pros:**
1. **No confusion** - Single source of truth
2. **Real-time results** - See progress immediately
3. **Simpler** - No staging table merges
4. **Safe** - Script only ADDS data (never deletes)
5. **Resumable** - Can stop/restart anytime

**How It's Safe:**
- Script only updates rows WHERE `author_name IS NULL`
- Never touches rows that already have authors
- Only touches media rows (excludes social media)
- Logs every update for audit trail

### The Plan

**Step 1:** Merge existing found authors (4,078 total)
- 1,223 from staging table
- 2,855 from mixed table

**Step 2:** Run ONE clean backfill script
- Target: ~70k remaining media rows
- Update production table directly
- Use proven Scrape.do settings (5 concurrent, standard proxies)
- Expected: ~20,000-30,000 more authors (30-40% success rate)

**Step 3:** Monitor & Complete
- Auto-runner processes batches of 500
- Saves progress every batch
- Runs until all rows processed
- Estimated time: 5-7 days

---

## EXECUTION STEPS

### Step 1: Merge Existing Found Authors

First, let's save the 4,078 authors we already found:

```sql
-- Merge staging table authors (1,223)
UPDATE `triple-upgrade-245423.btcp_main_dataset.all_channels_data` main
SET main.author_name = staging.author_name
FROM `triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_staging` staging
WHERE main.URL = staging.URL
  AND (main.author_name IS NULL OR main.author_name = '')
  AND staging.author_name IS NOT NULL
  AND staging.author_name != ''

-- Merge mixed table authors (2,855)
UPDATE `triple-upgrade-245423.btcp_main_dataset.all_channels_data` main
SET main.author_name = mixed.author_found
FROM `triple-upgrade-245423.btcp_main_dataset.msm_urls_to_backfill` mixed
WHERE main.URL = mixed.url
  AND (main.author_name IS NULL OR main.author_name = '')
  AND mixed.status = 'completed'
  AND mixed.author_found IS NOT NULL
```

### Step 2: Create Final Backfill Script

**Target Query:**
```sql
SELECT URL, Outlet, Outlet_Category, Title
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE (author_name IS NULL OR author_name = '')
  AND Outlet_Category IN (
    'Financial News', 'Crypto News', 'International News',
    'Technology News', 'Political News', 'General News',
    'Magazines and Periodicals', 'Regional News',
    'Major Newspapers', 'Tabloid and Sensational News',
    'Other', 'Research'
  )
  AND Outlet NOT IN ('X', 'Reddit', 'GitHub', 'Stacker News')
ORDER BY Date DESC
LIMIT 500
```

**Script Features:**
- Processes 500 URLs per batch
- Uses 5 concurrent Scrape.do requests
- Updates production table directly
- Auto-saves progress
- Fully resumable
- Conservative delays (no rate limiting)

### Step 3: Run Auto-Runner

```bash
cd /Users/fernandonikolic/perception
chmod +x run-final-backfill.sh
./run-final-backfill.sh
```

The script will:
- Process all ~70,000 remaining rows
- Run continuously until complete
- Log all activity
- Stop automatically when done

---

## EXPECTED RESULTS

### Success Rate Estimates

**By Category:**
- Crypto News: ~80-90% success (easy to scrape)
- Other (mix): ~50-60% success (mixed difficulty)
- Financial News (MSM): ~5-10% success (paywalls)
- Technology News: ~10-15% success
- Political/General News: ~5-10% success
- International News: ~10-15% success (language barriers)
- Magazines: ~30-40% success (better structure)

**Overall Expected:**
- URLs processed: ~70,000
- Authors found: ~20,000-30,000 (30-40% overall)
- Cost: ~$8-10 (covered by Scrape.do monthly plan)
- Time: 5-7 days (running continuously)

### Why Some Will Fail

**Legitimate failures (can't be helped):**
- Paywalled articles (28%)
- Deleted pages / HTTP 404 (13%)
- No author byline (articles without authors) (40%)
- Language barriers (5%)

**Total Expected Failures: ~60-70%** (this is normal for MSM)

---

## MONITORING

### Check Progress

```bash
# Live log
tail -f final-backfill.log

# Database check
GOOGLE_APPLICATION_CREDENTIALS=./functions/bitcoin-data-chat-key.json \
  bq query --use_legacy_sql=false \
  "SELECT
    Outlet_Category,
    COUNT(*) as total,
    SUM(CASE WHEN author_name IS NULL OR author_name = '' THEN 1 ELSE 0 END) as missing
   FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
   WHERE Outlet_Category IN ('Financial News', 'Crypto News', 'International News', etc.)
   GROUP BY Outlet_Category"
```

### Stop/Restart

```bash
# Stop
pkill -f run-final-backfill

# Restart (picks up where it left off)
./run-final-backfill.sh
```

---

## FILES TO CREATE

I'll create:

1. ✅ `/docs/FINAL_ACTION_PLAN.md` (this file)
2. `backfill-final-clean.cjs` - Clean backfill script
3. `run-final-backfill.sh` - Auto-runner
4. `merge-found-authors.sql` - SQL to merge existing 4,078 authors

---

## CLEANUP AFTER COMPLETION

### BigQuery Tables to Drop

```sql
DROP TABLE `triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_staging`
DROP TABLE `triple-upgrade-245423.btcp_main_dataset.msm_urls_to_backfill`
DROP TABLE `triple-upgrade-245423.btcp_main_dataset.msm_author_backfill_tracking`
```

### Files to Archive

```bash
# Move to /data/archived/oct26-weekend-attempts/
msm-backfill-continuous.log
msm-backfill-production.log
auto-backfill.log
backfill-scrapedo.log

# Old scripts (keep for reference but archive)
backfill-msm-staging.cjs
backfill-authors-scrapedo-standard.cjs
auto-backfill-loop.sh
start-auto-backfill.sh
```

---

## NEXT STEPS (In Order)

1. ✅ Review this plan
2. ⏳ I'll create the clean backfill script + merge SQL
3. ⏳ Run merge SQL to save 4,078 existing authors
4. ⏳ Start final clean backfill
5. ⏳ Monitor for 5-7 days
6. ⏳ Clean up obsolete files/tables when complete

---

## QUESTIONS?

**Q: What if it crashes?**
A: Just restart it. Script is fully resumable.

**Q: Can I stop it temporarily?**
A: Yes. `pkill -f run-final-backfill`. Restart when ready.

**Q: How do I know it's working?**
A: Watch the log file + check BigQuery row counts

**Q: What about new articles?**
A: `backfillMissingImages` function handles all new articles automatically

**Q: What if success rate is too low?**
A: That's expected for MSM (~6-10%). Crypto will boost overall rate to ~30-40%.

---

**Ready to proceed?**

Say "yes" and I'll create the final backfill script + merge SQL and start the process.

