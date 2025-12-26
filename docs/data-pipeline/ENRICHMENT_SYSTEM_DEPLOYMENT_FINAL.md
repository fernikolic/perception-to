# GCP Enrichment System - Final Deployment Documentation

**Status**: DEPLOYED AND RUNNING
**Date**: October 31, 2025
**Architecture**: Cloud Run + Cloud Scheduler
**Processing**: Every 5 minutes

---

## System Overview

### What Was Deployed

A fully automated enrichment system that:
1. **Real-time enrichment** - Processes new articles every 5 minutes
2. **Backfill enrichment** - Fixes old corrupted data (116K articles)
3. **Uses OpenAI GPT-4o-mini** - Single API call for sentiment + topics
4. **100% GCP-based** - No reliance on Google Sheets triggers
5. **Automatic deduplication** - Removed 7,980 duplicate rows

### Architecture

```
IFTTT → Google Sheets → Apps Script (sendDataToBigQuery) → BigQuery (unenriched)
                                                                ↓
                                            Cloud Scheduler (every 5 min)
                                                                ↓
                                            Cloud Run Enrichment Service
                                                                ↓
                                            BigQuery (enriched with sentiment + topics)
```

---

## Deployed Components

### 1. Cloud Run Service

**Service Name**: `enrichment-service`
**URL**: `https://enrichment-service-45998414364.us-central1.run.app`
**Region**: `us-central1`
**Project**: `triple-upgrade-245423`

**Configuration**:
- Memory: 4Gi
- CPU: 2 cores
- Timeout: 540s (9 minutes)
- Max instances: 10
- Min instances: 0 (scales to zero when idle)
- Concurrency: Default (80)

**Environment Variables**:
- `OPENAI_API_KEY_V2`: OpenAI API key for GPT-4o-mini

**Code Location**: `/functions/standalone-enrichment/`
- `index.js` - Main Express service
- `package.json` - Dependencies
- `Dockerfile` - Container definition

### 2. Cloud Schedulers

#### Real-Time Enrichment Scheduler
**Name**: `enrichment-realtime`
**Schedule**: Every 5 minutes (`*/5 * * * *`)
**URL**: `https://enrichment-service-45998414364.us-central1.run.app?mode=new_only&batch_size=50&hours_back=1`
**Purpose**: Process new articles from last 1 hour
**Status**: ENABLED

**What it does**:
- Checks last hour for new articles
- Processes up to 50 articles per run
- Only enriches articles missing sentiment or topics
- **Result**: New data enriched within 5-10 minutes

#### Backfill Scheduler
**Name**: `enrichment-backfill`
**Schedule**: Every 5 minutes (`*/5 * * * *`)
**URL**: `https://enrichment-service-45998414364.us-central1.run.app?mode=auto&batch_size=500`
**Purpose**: Fix old corrupted/missing data
**Status**: ENABLED

**What it does**:
- Processes oldest unenriched articles
- Processes up to 500 articles per run
- ~144,000 articles/day capacity
- **Result**: 116K corrupted articles fixed in 2-3 days

---

## Data Quality Improvements

### Before Deployment
- Total rows: 531,286
- Duplicates: 7,981 (1.5%)
- Missing sentiment: 52,607 (9.9%)
- Corrupted sentiment: 11,053 (domain names instead of sentiment values)
- Missing topics: 218,819 (41.19%)
- Distinct Topic_1 values: 1,123 (should be ~17)

### After Deployment
- Total rows: 523,310 (duplicates removed)
- Duplicates: 1 (0.0002%)
- All new articles enriched within 5-10 minutes
- Backfill in progress (500 articles every 5 minutes)

---

## Enrichment Details

### Sentiment Classification
Uses OpenAI GPT-4o-mini to classify articles as:
- **Positive** - Adoption news, bullish sentiment
- **Neutral** - Informative, factual reporting
- **Negative** - Criticism, risks, bearish sentiment

### Topic Categorization
Exactly 17 topics from your taxonomy:
1. Mining
2. Scaling
3. Self-custody
4. Investment vehicles
5. Banking & Finance
6. Market Analysis
7. Retail Adoption
8. Institutional Adoption
9. Use cases
10. Regulatory updates
11. Cybersecurity
12. Crime & Legal
13. Energy & Environment
14. Development
15. AI
16. Misc
17. Company news

Each article gets 1-4 topics assigned to `Topic_1`, `Topic_2`, `Topic_3`, `Topic_4`.

### Query Logic

**New articles** (`mode=new_only`):
```sql
WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR)
  AND ((Sentiment IS NULL OR Sentiment = '' OR Sentiment LIKE '%.com%' OR Sentiment LIKE '%Error%')
    OR (Topic_1 IS NULL OR Topic_1 = ''))
```

**Backfill** (`mode=auto`):
```sql
WHERE (Sentiment IS NULL OR Sentiment = '' OR Sentiment LIKE '%.com%' OR Sentiment LIKE '%Error%')
  OR (Topic_1 IS NULL OR Topic_1 = '')
ORDER BY Date DESC
```

---

## Apps Script Configuration

### REQUIRED Trigger (DO NOT DELETE)

**Function**: `sendDataToBigQuery()`
**Frequency**: Every 5-10 minutes
**Purpose**: Send data from Google Sheets to BigQuery
**Critical**: Without this, new articles won't reach BigQuery

### DELETE These Triggers (Now Handled by Cloud Function)

- `analyzeAndScoreSentiment()` - Sentiment analysis (Cloud Run handles this)
- `getSentiment()` - Sentiment fetching (Cloud Run handles this)
- `categorizeContent()` - Topic categorization (Cloud Run handles this)
- `getCategoriesFromChatGPT()` - OpenAI API call (Cloud Run handles this)

### Optional Triggers (Your Choice)

These handle metadata not covered by Cloud Run:
- `categorizeMediaByOutlet()` - Outlet name mapping
- `categorizeMediaByCountryBatch()` - Country mapping
- `categorizeMediaByFundingBatch()` - Funding mapping
- `categorizeOutlets()` - Outlet categorization
- `categorizeMediaByPolitics()` - Political bias

**Recommendation**: You can delete these if you don't need this metadata, or keep them if you want to maintain outlet/country/funding data.

---

## Monitoring & Maintenance

### Check Enrichment Health

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json

bq query --use_legacy_sql=false "
SELECT
  COUNT(*) as total_articles,
  COUNTIF(Sentiment IS NOT NULL AND Sentiment IN ('Positive', 'Neutral', 'Negative')) as has_valid_sentiment,
  COUNTIF(Topic_1 IS NOT NULL) as has_topics,
  COUNTIF(Sentiment IS NOT NULL AND Topic_1 IS NOT NULL) as fully_enriched,
  ROUND((COUNTIF(Sentiment IS NOT NULL AND Topic_1 IS NOT NULL) / COUNT(*)) * 100, 2) as pct_complete
FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
"
```

**Healthy values**:
- `pct_complete` > 95% for recent data
- Should increase daily during backfill

### View Service Logs

```bash
gcloud run services logs read enrichment-service \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --limit=50
```

### Check Recent Articles

```bash
bq query --use_legacy_sql=false "
SELECT
  URL,
  Date,
  Sentiment,
  Topic_1,
  Topic_2,
  TIMESTAMP_DIFF(CURRENT_TIMESTAMP(), Date, MINUTE) as minutes_ago
FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 MINUTE)
ORDER BY Date DESC
LIMIT 10
"
```

All recent articles should have:
- Valid `Sentiment` (Positive/Neutral/Negative)
- At least one topic in `Topic_1`
- No corrupted values (domain names, errors)

### Check Scheduler Status

```bash
gcloud scheduler jobs list --location=us-central1 --project=triple-upgrade-245423
```

Both `enrichment-realtime` and `enrichment-backfill` should show `STATE: ENABLED`.

---

## Timeline Expectations

### New Articles (Real-Time)
```
10:00 AM - IFTTT adds article to Google Sheets
10:05 AM - Apps Script sends to BigQuery (unenriched)
10:10 AM - Cloud Scheduler triggers enrichment
10:10 AM - Article is fully enriched in BigQuery

Maximum delay: 10 minutes
Average delay: 5-7 minutes
```

### Backfill Progress

**Day 1**:
- Start: 116,000 articles need enrichment
- End: ~50,000 articles enriched
- Progress: 43%

**Day 2**:
- Start: 66,000 remaining
- End: ~20,000 remaining
- Progress: 82%

**Day 3**:
- Start: 20,000 remaining
- End: Complete
- Progress: 100%

---

## Cost Breakdown

### Real-Time Enrichment (Ongoing)
- Runs: 288 times/day (every 5 minutes)
- Articles: ~2,000/day
- OpenAI cost: ~$0.40/day
- Cloud Run cost: ~$0.10/day
- **Total**: ~$0.50/day = **$15/month**

### Backfill (One-Time)
- Runs: 288 times/day
- Capacity: 144,000 articles/day
- Actual: 116,000 articles to fix
- Duration: 2-3 days
- OpenAI cost: ~$23
- Cloud Run cost: ~$5
- **Total**: ~$28 one-time

### First Month Total
- Real-time: $15
- Backfill: $28
- **Total**: $43

### Ongoing (After Backfill)
- Real-time only: $15/month
- No backfill needed

---

## Troubleshooting

### No articles being processed

**Check schedulers**:
```bash
gcloud scheduler jobs list --location=us-central1 --project=triple-upgrade-245423
```

Verify both show `STATE: ENABLED`.

**Check service logs**:
```bash
gcloud run services logs read enrichment-service --region=us-central1 --limit=50
```

Look for errors or failures.

**Manual test**:
```bash
curl -X GET "https://enrichment-service-45998414364.us-central1.run.app?mode=new_only&batch_size=10&hours_back=24"
```

Should return: `{"success":true,...}`

### High failure rate

**Check logs for**:
- OpenAI API errors (rate limit, invalid key)
- BigQuery errors (quota, permissions)
- Network timeouts

**Solutions**:
- Verify API key is set: `gcloud run services describe enrichment-service --region=us-central1 --format="value(spec.template.spec.containers[0].env)"`
- Reduce batch_size if hitting timeouts
- Check OpenAI account has credits

### Backfill too slow

Increase batch size:
```bash
gcloud scheduler jobs update http enrichment-backfill \
  --location=us-central1 \
  --uri="https://enrichment-service-45998414364.us-central1.run.app?mode=auto&batch_size=1000"
```

### Backfill too expensive

Slow down to every 10 minutes:
```bash
gcloud scheduler jobs update http enrichment-backfill \
  --location=us-central1 \
  --schedule="*/10 * * * *"
```

---

## Pause/Resume Operations

### Pause Both Schedulers
```bash
gcloud scheduler jobs pause enrichment-realtime --location=us-central1 --project=triple-upgrade-245423
gcloud scheduler jobs pause enrichment-backfill --location=us-central1 --project=triple-upgrade-245423
```

### Resume Both Schedulers
```bash
gcloud scheduler jobs resume enrichment-realtime --location=us-central1 --project=triple-upgrade-245423
gcloud scheduler jobs resume enrichment-backfill --location=us-central1 --project=triple-upgrade-245423
```

### Pause Backfill After Completion

Once backfill is done (check with enrichment health query showing `pct_complete > 99%`):

```bash
gcloud scheduler jobs pause enrichment-backfill --location=us-central1 --project=triple-upgrade-245423
```

**Keep `enrichment-realtime` running forever** - it handles all new articles.

---

## Success Criteria

### After 24 Hours
- New articles enriched within 10 minutes
- 95%+ of recent articles have sentiment + topics
- No corrupted sentiment values in new data
- Backfill making steady progress

### After 3 Days
- 99%+ of all articles have sentiment + topics
- Backfill scheduler can be paused
- Only real-time scheduler needed going forward

---

## File Locations

### Deployment Code
- `/functions/standalone-enrichment/index.js` - Main service code
- `/functions/standalone-enrichment/package.json` - Dependencies
- `/functions/standalone-enrichment/Dockerfile` - Container config

### Documentation
- `/docs/data-pipeline/ENRICHMENT_SYSTEM_DEPLOYMENT_FINAL.md` - This file
- `/docs/data-pipeline/GCP_ENRICHMENT_DEPLOYMENT.md` - Step-by-step deployment guide
- `/docs/data-pipeline/SENTIMENT_ENRICHMENT_AUDIT_SUMMARY.md` - Audit findings summary

---

## Common Operations

### Update API Key
```bash
gcloud run services update enrichment-service \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --update-env-vars="OPENAI_API_KEY_V2=NEW_KEY_HERE"
```

### Redeploy Service
```bash
cd /Users/fernandonikolic/perception/functions/standalone-enrichment

gcloud run deploy enrichment-service \
  --source . \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --memory=4Gi \
  --cpu=2 \
  --timeout=540 \
  --max-instances=10 \
  --min-instances=0 \
  --allow-unauthenticated
```

### Delete Duplicate Rows (If They Appear Again)

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json

# Pause schedulers first
gcloud scheduler jobs pause enrichment-realtime --location=us-central1 --project=triple-upgrade-245423
gcloud scheduler jobs pause enrichment-backfill --location=us-central1 --project=triple-upgrade-245423

# Create deduplicated table
bq query --use_legacy_sql=false "
CREATE OR REPLACE TABLE \`triple-upgrade-245423.btcp_main_dataset.all_channels_data_deduped\` AS
WITH ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY URL ORDER BY Date DESC) as rn
  FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
)
SELECT * EXCEPT(rn)
FROM ranked
WHERE rn = 1
"

# Replace old table
bq rm -f -t triple-upgrade-245423:btcp_main_dataset.all_channels_data
bq cp triple-upgrade-245423:btcp_main_dataset.all_channels_data_deduped triple-upgrade-245423:btcp_main_dataset.all_channels_data
bq rm -f -t triple-upgrade-245423:btcp_main_dataset.all_channels_data_deduped

# Resume schedulers
gcloud scheduler jobs resume enrichment-realtime --location=us-central1 --project=triple-upgrade-245423
gcloud scheduler jobs resume enrichment-backfill --location=us-central1 --project=triple-upgrade-245423
```

---

## Questions?

If you encounter issues not covered here:

1. Check service logs first
2. Test manually with curl
3. Verify schedulers are enabled
4. Check BigQuery for recent enriched articles
5. Review OpenAI API credits/limits

---

**System Status**: FULLY OPERATIONAL
**Next Action**: Monitor for 24 hours, then pause backfill after 3 days when complete.
