# MSM Author Backfill - Quick Status Check Prompt

**Use this prompt when checking back on progress:**

---

## 📋 Copy/Paste This Prompt

```
Check the MSM author backfill status and give me:
1. Is the process still running?
2. Current progress (completed/failed/pending counts from msm_urls_to_backfill)
3. How many new authors added since last check (4,749 baseline from Oct 31, 10:05 AM)
4. Success rate and top performing outlets
5. Should I let it continue or stop?

Run these commands to check:
- Process: ps aux | grep "backfill-msm-authors-bigquery" | grep -v grep
- Progress: bq query on msm_urls_to_backfill status counts
- Recent log: tail -100 smart-backfill.log
```

---

## Manual Commands (If Needed)

### Check if process is running
```bash
ps aux | grep "backfill-msm-authors-bigquery" | grep -v grep
```

### Check progress in staging table
```bash
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json

bq query --use_legacy_sql=false --format=csv \
  "SELECT status, COUNT(*) as count
   FROM \`triple-upgrade-245423.btcp_main_dataset.msm_urls_to_backfill\`
   GROUP BY status
   ORDER BY status"
```

### Check success by outlet
```bash
bq query --use_legacy_sql=false \
  "SELECT outlet,
    COUNTIF(status='completed') as completed,
    COUNTIF(status='failed') as failed,
    ROUND(COUNTIF(status='completed') * 100.0 /
          (COUNTIF(status='completed') + COUNTIF(status='failed')), 1) as success_pct
   FROM \`triple-upgrade-245423.btcp_main_dataset.msm_urls_to_backfill\`
   WHERE status IN ('completed', 'failed')
   GROUP BY outlet
   HAVING (COUNTIF(status='completed') + COUNTIF(status='failed')) > 10
   ORDER BY completed DESC
   LIMIT 20"
```

### View recent log activity
```bash
tail -100 /Users/fernandonikolic/perception/smart-backfill.log
```

---

## Baseline Numbers (Oct 31, 2025, 10:05 AM)

```
Total URLs:     79,650
Completed:       4,749 (6.0%)
Failed:            419 (0.5%)
Pending:        74,482 (93.5%)
```

---

## Decision Criteria

**Continue if:**
- Process is running smoothly
- Adding 50-100+ authors per hour
- Success rate > 5%
- Haven't reached ~10,000-12,000 completed yet

**Stop if:**
- Process crashed or stuck
- Success rate consistently < 5%
- Reached ~10,000-12,000 completed (realistic goal)
- Running low on Scrape.do credits (check usage)

---

## Related Documentation

- Full details: `/Users/fernandonikolic/perception/docs/MSM_AUTHOR_BACKFILL_SMART_TARGETED_2025-10-29.md`
- Script: `/Users/fernandonikolic/perception/backfill-msm-authors-bigquery.cjs`
- Log: `/Users/fernandonikolic/perception/smart-backfill.log`
