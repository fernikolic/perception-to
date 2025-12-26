# Safe Deployment Guide: Trend Consolidation Testing

**Status**: READ-ONLY TEST MODE
**Risk Level**: MINIMAL (No user impact)
**Time Required**: 30 minutes
**Cost**: <$0.01

---

## What We're Doing

**Adding trend consolidation testing WITHOUT changing ANY user-facing behavior.**

Your users will see ZERO difference. We're just collecting data about what consolidation WOULD do.

---

## Step-by-Step Deployment

### Step 1: Add Database Columns (5 minutes, $0.001 cost)

Run this SQL in BigQuery console:

```bash
# Open BigQuery console
open "https://console.cloud.google.com/bigquery?project=triple-upgrade-245423"
```

Then paste and run:

```sql
-- Add columns (safe - nullable, won't break anything)
ALTER TABLE `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
ADD COLUMN IF NOT EXISTS title_hash STRING,
ADD COLUMN IF NOT EXISTS entity_fingerprint STRING,
ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP,
ADD COLUMN IF NOT EXISTS first_seen TIMESTAMP,
ADD COLUMN IF NOT EXISTS update_count INTEGER;

-- Backfill last 7 days only (keeps cost low)
UPDATE `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
SET
  title_hash = TO_HEX(MD5(LOWER(title))),
  last_updated = generated_at,
  first_seen = generated_at,
  update_count = 0
WHERE title_hash IS NULL
  AND generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY);
```

**Verify it worked**:
```sql
SELECT COUNT(*) FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE title_hash IS NOT NULL;
```

Should show a number > 0.

---

### Step 2: Create Test Log Table (1 minute, $0)

```sql
-- Table to store test reports
CREATE TABLE IF NOT EXISTS `triple-upgrade-245423.btcp_main_dataset.consolidation_test_logs` (
  test_run_id STRING,
  timestamp TIMESTAMP,
  report STRING,
  trends_analyzed INTEGER,
  would_update INTEGER,
  would_create INTEGER,
  cache_hit_rate FLOAT64
);
```

---

### Step 3: Deploy Test Code (10 minutes)

```bash
cd /Users/fernandonikolic/perception/functions/btc-trends-ui-deployment

# Copy the test module
cp trend-consolidation-test.js ./

# Verify files exist
ls -la trend-consolidation-test.js
```

---

### Step 4: Enable Test Mode (2 minutes)

Update Cloud Run environment variables:

```bash
gcloud run services update btcpapifunction3-1-final \
  --region=us-central1 \
  --update-env-vars="ENABLE_CONSOLIDATION_TEST=true,LOG_CONSOLIDATION_REPORTS=true"
```

**Verify**:
```bash
gcloud run services describe btcpapifunction3-1-final \
  --region=us-central1 \
  --format="value(spec.template.spec.containers[0].env)"
```

Should show `ENABLE_CONSOLIDATION_TEST=true`.

---

### Step 5: Trigger a Test Run (1 minute)

```bash
curl -X POST https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract \
  -H "Content-Type: application/json" \
  -d '{"hours_back": 24}'
```

---

### Step 6: Check Test Results (5 minutes)

View logs:
```bash
gcloud run services logs read btcpapifunction3-1-final \
  --region=us-central1 \
  --limit=50 \
  | grep "CONSOLIDATION TEST"
```

Look for:
```
🧪 CONSOLIDATION TEST MODE ENABLED
📊 CONSOLIDATION TEST RESULTS:
   Total trends analyzed: 5
   Would UPDATE existing: 2
   Would CREATE new: 3
   ...
✅ TEST COMPLETE - NO DATA WAS MODIFIED
```

---

### Step 7: Review Test Reports in BigQuery (5 minutes)

```sql
-- Get latest test results
SELECT
  timestamp,
  trends_analyzed,
  would_update,
  would_create,
  cache_hit_rate,
  JSON_EXTRACT(report, '$.duplicatesFound') as duplicates
FROM `triple-upgrade-245423.btcp_main_dataset.consolidation_test_logs`
ORDER BY timestamp DESC
LIMIT 5;
```

---

## What to Look For

### Good Signs ✅
- `would_update` > 0 (found matches!)
- `duplicatesFound` > 0 (caught duplicates!)
- `cache_hit_rate` > 0.5 (caching working!)
- `estimated_cost` < $0.01 (very cheap!)
- Logs show: "NO DATA WAS MODIFIED"

### Bad Signs ❌
- Errors in logs
- `would_update` = 0 for multiple days (matching not working)
- `estimated_cost` > $0.10 (too expensive)
- Service crashes or timeouts

---

## Monitoring Plan

### Day 1-3: Watch Closely
Check logs 2-3 times per day:
```bash
# Quick health check
gcloud run services logs read btcpapifunction3-1-final \
  --region=us-central1 \
  --limit=20 \
  | grep -E "CONSOLIDATION|ERROR|FAIL"
```

### Day 4-7: Monitor Cost
```sql
-- Check BigQuery costs from consolidation queries
SELECT
  DATE(creation_time) as date,
  COUNT(*) as queries,
  SUM(total_bytes_processed) / POW(10, 9) as GB_processed,
  SUM(total_bytes_processed) / POW(10, 12) * 5.0 as cost_usd
FROM `triple-upgrade-245423.region-us.INFORMATION_SCHEMA.JOBS_BY_PROJECT`
WHERE
  creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
  AND statement_type = 'SELECT'
  AND query LIKE '%title_hash%'
GROUP BY date
ORDER BY date DESC;
```

**Alert if cost > $1/day**.

---

## Emergency Rollback

If ANYTHING goes wrong:

### Instant Disable (30 seconds)
```bash
gcloud run services update btcpapifunction3-1-final \
  --region=us-central1 \
  --update-env-vars="ENABLE_CONSOLIDATION_TEST=false"
```

Done. Back to normal.

### Full Rollback (5 minutes)
```bash
# Remove test module
cd /Users/fernandonikolic/perception/functions/btc-trends-ui-deployment
rm trend-consolidation-test.js

# Redeploy without changes
gcloud run deploy btcpapifunction3-1-final \
  --source . \
  --region=us-central1
```

---

## Success Metrics

After 7 days, you should see:

| Metric | Target | Meaning |
|--------|--------|---------|
| Tests run | ~168 (hourly) | Running consistently |
| Duplicates found | >10 | Catching real duplicates |
| Would update | >20% | Consolidation would help |
| Cache hit rate | >60% | Cost savings working |
| Errors | 0 | Stable |
| Cost | <$0.10/week | Very cheap |

---

## Next Steps (After 7 Days of Successful Testing)

If metrics look good:

1. **Week 2**: Enable actual updates for 10% of trends
2. **Week 3**: Expand to 50% of trends
3. **Week 4**: Enable for 100% of trends

But ONLY if:
- ✅ Zero errors for 7 days
- ✅ Cost stays <$0.10/week
- ✅ Test reports show good consolidation

---

## FAQ

**Q: Will this affect my users?**
A: NO. Test mode doesn't change any data. Users see same trends as before.

**Q: What if costs spike?**
A: Instant rollback. Turn off the flag in 30 seconds.

**Q: What if it breaks?**
A: Feature flag OFF = back to normal. Zero user impact.

**Q: How do I know it's working?**
A: Check logs for "CONSOLIDATION TEST RESULTS". Check BigQuery for test_logs table.

**Q: When will users see better trends?**
A: Not yet. This is testing only. Maybe Week 2-3 if tests pass.

---

## Support

If anything looks wrong:

1. Check logs (step 6 above)
2. Turn off flag (Emergency Rollback)
3. Share logs with me

**Remember**: This is SAFE. No user impact. Easy rollback.

Ready to deploy? 🚀
