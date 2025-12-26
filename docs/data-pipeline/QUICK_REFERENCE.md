# GCP Enrichment System - Quick Reference

**Status**: DEPLOYED AND RUNNING
**Last Updated**: October 31, 2025

---

## What's Running Now

1. **Cloud Run Service**: `enrichment-service`
   - URL: `https://enrichment-service-45998414364.us-central1.run.app`
   - Enriches articles with sentiment + topics using OpenAI GPT-4o-mini

2. **Real-Time Scheduler**: `enrichment-realtime`
   - Runs every 5 minutes
   - Processes new articles from last hour
   - Result: New articles enriched within 5-10 minutes

3. **Backfill Scheduler**: `enrichment-backfill`
   - Runs every 5 minutes
   - Fixes old corrupted data (500 articles per run)
   - Result: 116K articles will be done in 2-3 days

---

## Apps Script Triggers - What To Keep/Delete

### KEEP (Required):
- `sendDataToBigQuery()` - Sends data from Sheets to BigQuery every 5-10 minutes

### DELETE (Now handled by Cloud):
- `analyzeAndScoreSentiment()`
- `getSentiment()`
- `categorizeContent()`
- `getCategoriesFromChatGPT()`
- All other enrichment triggers

---

## Quick Health Check

```bash
# Set credentials
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json

# Check enrichment progress
bq query --use_legacy_sql=false "
SELECT
  COUNT(*) as total,
  COUNTIF(Sentiment IS NOT NULL AND Topic_1 IS NOT NULL) as enriched,
  ROUND((COUNTIF(Sentiment IS NOT NULL AND Topic_1 IS NOT NULL) / COUNT(*)) * 100, 2) as pct
FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
"

# Check schedulers are running
gcloud scheduler jobs list --location=us-central1 --project=triple-upgrade-245423 | grep enrichment
```

**Healthy values**:
- `pct` should increase daily
- Both schedulers should show `ENABLED`

---

## Common Commands

### View Service Logs
```bash
gcloud run services logs read enrichment-service --region=us-central1 --project=triple-upgrade-245423 --limit=50
```

### Test Service Manually
```bash
curl -X GET "https://enrichment-service-45998414364.us-central1.run.app?mode=new_only&batch_size=10&hours_back=24"
```

### Pause Schedulers (If Needed)
```bash
gcloud scheduler jobs pause enrichment-realtime --location=us-central1 --project=triple-upgrade-245423
gcloud scheduler jobs pause enrichment-backfill --location=us-central1 --project=triple-upgrade-245423
```

### Resume Schedulers
```bash
gcloud scheduler jobs resume enrichment-realtime --location=us-central1 --project=triple-upgrade-245423
gcloud scheduler jobs resume enrichment-backfill --location=us-central1 --project=triple-upgrade-245423
```

---

## After 3 Days

Once backfill is complete (pct > 99%):

```bash
# Pause backfill scheduler (keep real-time running!)
gcloud scheduler jobs pause enrichment-backfill --location=us-central1 --project=triple-upgrade-245423
```

Leave `enrichment-realtime` running forever - it handles all new articles automatically.

---

## Full Documentation

See `/docs/data-pipeline/ENRICHMENT_SYSTEM_DEPLOYMENT_FINAL.md` for complete details.
