# GCP-Based Enrichment System Deployment

**Status**: ✅ Ready for Deployment
**Last Updated**: October 31, 2025
**Architecture**: Cloud Function handles ALL enrichment (new + old data)
**Processing Speed**: Every 5 minutes for new data

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│              Simplified GCP Enrichment Architecture              │
└─────────────────────────────────────────────────────────────────┘

NEW DATA FLOW:
IFTTT → Google Sheets → sendDataToBigQuery() → BigQuery (unenriched)
                                                    ↓
                                    Cloud Scheduler (every 5 min)
                                                    ↓
                                    enrichArticles Cloud Function
                                    (mode=new_only, batch=50)
                                                    ↓
                                    UPDATE BigQuery (enriched)
                                                    ↓
                                    ✅ Fully enriched within 5-10 minutes

EXISTING DATA BACKFILL:
BigQuery (116K corrupted rows) → Cloud Scheduler (every 5 min)
                                            ↓
                                    enrichArticles Cloud Function
                                    (mode=auto, batch=500)
                                            ↓
                                    UPDATE BigQuery (fixed)
                                            ↓
                                    ✅ Complete in 2-3 days
```

## Why This Is Better

**Simplicity:**
- ✅ Apps Script just sends data to BigQuery (no enrichment logic)
- ✅ ALL enrichment happens in one place (Cloud Function)
- ✅ One codebase to maintain
- ✅ Easier to debug and monitor

**Reliability:**
- ✅ Cloud Functions are more reliable than Google Sheets triggers
- ✅ Automatic retries on failure
- ✅ Better error handling and logging
- ✅ Scalable to high volume

**Cost-Effective:**
- ✅ Only processes articles that need enrichment
- ✅ Batch processing minimizes API calls
- ✅ No wasted enrichment on already-processed articles

---

## Deployment Steps

### Step 1: Deploy Cloud Function (10 minutes)

```bash
cd /Users/fernandonikolic/perception/functions

# Deploy the function
firebase deploy --only functions:backfillEnrichment --project triple-upgrade-245423

# Wait for deployment (2-3 minutes)
# Note the deployed URL (you'll need it for schedulers)
```

### Step 2: Set Environment Variable

```bash
# Set OpenAI API key
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json

gcloud run services update backfillenrichment \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --update-env-vars="OPENAI_API_KEY_V2=YOUR_OPENAI_API_KEY_HERE"
```

**⚠️ Replace `YOUR_OPENAI_API_KEY_HERE` with your actual OpenAI API key!**

### Step 3: Get Cloud Run URL

```bash
# Get the deployed URL
gcloud run services describe backfillenrichment \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --format='value(status.url)'
```

**Save this URL!** You'll use it in the next steps.

Example: `https://backfillenrichment-abc123-uc.a.run.app`

### Step 4: Test Manual Run

```bash
# Test with a small batch first (10 articles, new only)
curl -X GET "https://backfillenrichment-YOUR-URL.run.app?mode=new_only&batch_size=10&hours_back=24"
```

**Expected response:**
```json
{
  "success": true,
  "message": "Processed 10 articles in 23.5s. Updated 9, failed 1.",
  "stats": {
    "processed": 10,
    "updated": 9,
    "failed": 1,
    "duration": 23450
  }
}
```

If you get this response, the function works! ✅

---

## Step 5: Create TWO Schedulers

You'll create **TWO separate schedulers**:
1. **Real-time scheduler** - Processes NEW articles every 5 minutes
2. **Backfill scheduler** - Fixes OLD corrupted articles every 5 minutes

### Scheduler 1: Real-Time Enrichment (NEW Data)

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json

gcloud scheduler jobs create http enrichment-realtime \
  --schedule="*/5 * * * *" \
  --uri="https://backfillenrichment-YOUR-URL.run.app?mode=new_only&batch_size=50&hours_back=1" \
  --http-method=GET \
  --location=us-central1 \
  --project=triple-upgrade-245423 \
  --description="Real-time enrichment - processes new articles every 5 minutes"
```

**⚠️ Replace YOUR-URL with your actual Cloud Run URL!**

**What this does:**
- Runs every 5 minutes
- Processes last 1 hour of articles
- Batch size: 50 (usually only 5-10 new articles per 5 min)
- Only enriches articles missing sentiment or topics
- **Result**: New data enriched within 5-10 minutes

### Scheduler 2: Backfill Corrupted Data (OLD Data)

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json

gcloud scheduler jobs create http enrichment-backfill \
  --schedule="*/5 * * * *" \
  --uri="https://backfillenrichment-YOUR-URL.run.app?mode=auto&batch_size=500" \
  --http-method=GET \
  --location=us-central1 \
  --project=triple-upgrade-245423 \
  --description="Backfill corrupted data - 500 articles every 5 minutes"
```

**What this does:**
- Runs every 5 minutes
- Processes oldest unenriched/corrupted articles
- Batch size: 500 (aggressive backfill)
- **Result**: 116K articles fixed in 2-3 days

---

## Step 6: Verify Schedulers Are Running

```bash
# Check both schedulers
gcloud scheduler jobs list --location=us-central1 --project=triple-upgrade-245423

# Should show:
# NAME                    SCHEDULE      STATE
# enrichment-realtime     */5 * * * *   ENABLED
# enrichment-backfill     */5 * * * *   ENABLED
```

---

## Step 7: Monitor Progress

### Check Function Logs

```bash
# View real-time logs
gcloud run services logs read backfillenrichment \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --limit=50 \
  --format="table(timestamp,textPayload)"
```

**What to look for:**
```
[BackfillEnrichment] Found 12 articles to process
[BackfillEnrichment] Enriching: https://...
[BackfillEnrichment] ✓ Updated ... -> Sentiment: Positive, Topics: Investment vehicles, Market Analysis
[BackfillEnrichment] Completed in 15234ms
[BackfillEnrichment] Processed: 12, Updated: 11, Failed: 1
```

### Check BigQuery Progress

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json

bq query --use_legacy_sql=false --format=prettyjson "
SELECT
  COUNT(*) as total_articles,
  COUNTIF(Sentiment IS NOT NULL AND Sentiment IN ('Positive', 'Neutral', 'Negative')) as has_valid_sentiment,
  COUNTIF(Topic_1 IS NOT NULL) as has_topics,
  COUNTIF(Sentiment IS NOT NULL AND Topic_1 IS NOT NULL) as fully_enriched,
  ROUND((COUNTIF(Sentiment IS NOT NULL AND Topic_1 IS NOT NULL) / COUNT(*)) * 100, 2) as pct_complete
FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
"
```

**Healthy metrics after a few days:**
```json
{
  "total_articles": "531286",
  "has_valid_sentiment": "528000",
  "has_topics": "526000",
  "fully_enriched": "525000",
  "pct_complete": "98.82"
}
```

### Check Recent Articles (Real-Time Check)

```bash
# Are new articles getting enriched quickly?
bq query --use_legacy_sql=false --format=prettyjson "
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

**You should see:**
- Articles from last 30 minutes
- All have `Sentiment` = "Positive", "Neutral", or "Negative"
- All have `Topic_1` filled
- No corrupted values

---

## Step 8: Pause Backfill After Completion

Once the backfill is done (check with the BigQuery query above showing `pct_complete` > 99%):

```bash
# Pause the backfill scheduler (keep real-time running!)
gcloud scheduler jobs pause enrichment-backfill \
  --location=us-central1 \
  --project=triple-upgrade-245423
```

**Leave `enrichment-realtime` running forever** - it handles all new articles.

---

## Timeline Expectations

### New Articles (Real-Time)
```
10:00 AM - IFTTT adds article to Google Sheets
10:05 AM - Apps Script sends to BigQuery (unenriched)
10:10 AM - Cloud Function enriches it
10:10 AM - Article is fully enriched in BigQuery

Maximum delay: 10 minutes ✅
Average delay: 5-7 minutes ✅
```

### Backfill Progress

**Day 1:**
- Start: 116,000 articles need enrichment
- End: ~50,000 articles enriched
- Progress: 43%

**Day 2:**
- Start: 66,000 remaining
- End: ~20,000 remaining
- Progress: 82%

**Day 3:**
- Start: 20,000 remaining
- End: Complete!
- Progress: 100%

---

## Cost Breakdown

### Real-Time Enrichment (Ongoing)
- Runs every 5 minutes = 288 times/day
- Processes ~5-10 new articles per run
- ~2,000 articles/day enriched
- **Cost**: $0.40/day = **$12/month**

### Backfill (One-Time)
- Runs every 5 minutes = 288 times/day
- Processes 500 articles per run
- ~144,000 articles/day capacity
- Actual: 116,000 articles to fix
- **Duration**: 2-3 days
- **Cost**: ~$50 total

### Total First Month
- Real-time: $12
- Backfill: $50
- **Total**: $62

### Ongoing (After Backfill Complete)
- Real-time only: $12/month
- No backfill needed

---

## Apps Script Simplification

Since Cloud Function handles ALL enrichment, you can **simplify your Apps Script**:

### Keep Only These Functions:

1. `sendDataToBigQuery()` - Send data to BigQuery
2. `categorizeMediaByOutlet()` - Set outlet names (optional)
3. `categorizeMediaByCountryBatch()` - Set country (optional)
4. `categorizeMediaByFundingBatch()` - Set funding (optional)
5. `categorizeOutlets()` - Categorize outlets (optional)
6. `categorizeMediaByPolitics()` - Set political bias (optional)

### Remove These Functions (Cloud Function handles it):

- ❌ `analyzeAndScoreSentiment()` - Cloud Function does this
- ❌ `getSentiment()` - Cloud Function does this
- ❌ `categorizeContent()` - Cloud Function does this
- ❌ `getCategoriesFromChatGPT()` - Cloud Function does this

### Apps Script Trigger Setup:

**Only ONE trigger needed:**
- Function: `sendDataToBigQuery`
- Frequency: Every 5-10 minutes
- Purpose: Send data to BigQuery (Cloud Function enriches it)

**That's it!** Apps Script becomes simple again.

---

## Monitoring & Alerts

### Daily Health Check (Run this every morning)

```sql
-- Check enrichment health
SELECT
  DATE(Date) as date,
  COUNT(*) as articles,
  COUNTIF(Sentiment IS NOT NULL) as has_sentiment,
  COUNTIF(Topic_1 IS NOT NULL) as has_topics,
  ROUND((COUNTIF(Sentiment IS NOT NULL AND Topic_1 IS NOT NULL) / COUNT(*)) * 100, 2) as pct_enriched
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY date
ORDER BY date DESC;
```

**Healthy values:**
- `pct_enriched` should be > 95% for recent days
- Should increase every day during backfill

### Set Up Email Alerts (Optional)

You can create a Cloud Monitoring alert:

```bash
# Alert if enrichment success rate drops below 90%
gcloud alpha monitoring policies create \
  --notification-channels=YOUR_CHANNEL_ID \
  --display-name="Enrichment Health Alert" \
  --condition-display-name="Low enrichment rate" \
  --condition-threshold-value=0.90 \
  --condition-threshold-duration=3600s
```

---

## Troubleshooting

### Problem: No articles being processed

**Check:**
```bash
# Are schedulers running?
gcloud scheduler jobs list --location=us-central1

# Check function logs
gcloud run services logs read backfillenrichment --limit=50
```

**Solution:**
- Verify schedulers show STATE=ENABLED
- Check logs for errors
- Try manual run with curl

### Problem: High failure rate

**Check logs for:**
- OpenAI API errors (rate limit, invalid key)
- BigQuery errors (quota, permissions)
- Network timeouts

**Solutions:**
- Verify API key is set correctly
- Reduce batch_size if hitting timeouts
- Check OpenAI account has credits

### Problem: Backfill too slow

**Solution:**
```bash
# Increase batch size
# Update scheduler URI to: batch_size=1000

gcloud scheduler jobs update http enrichment-backfill \
  --uri="https://backfillenrichment-YOUR-URL.run.app?mode=auto&batch_size=1000"
```

### Problem: Backfill too expensive

**Solution:**
```bash
# Slow down scheduler to every 10 minutes
gcloud scheduler jobs update http enrichment-backfill \
  --schedule="*/10 * * * *"
```

---

## Rollback Plan

If anything goes wrong:

### Pause Both Schedulers
```bash
gcloud scheduler jobs pause enrichment-realtime --location=us-central1
gcloud scheduler jobs pause enrichment-backfill --location=us-central1
```

### Delete Schedulers
```bash
gcloud scheduler jobs delete enrichment-realtime --location=us-central1
gcloud scheduler jobs delete enrichment-backfill --location=us-central1
```

**No data loss** - pausing just stops future enrichment.

---

## Success Criteria

After 1 week, you should have:

✅ **Real-Time Processing:**
- New articles enriched within 10 minutes
- 95%+ of recent articles have sentiment + topics
- No corrupted sentiment values in new data

✅ **Backfill Progress:**
- 50,000+ old articles fixed
- Clear progress in BigQuery metrics
- Steady reduction in unenriched articles

✅ **System Health:**
- Both schedulers running without errors
- Cloud Function logs show successful executions
- OpenAI API costs within budget

After 3 days:

✅ **Backfill Complete:**
- 99%+ of all articles have sentiment + topics
- Backfill scheduler can be paused
- Only real-time scheduler needed going forward

---

## Next Steps

1. **Deploy Cloud Function** (Step 1-3)
2. **Test manually** (Step 4)
3. **Create schedulers** (Step 5)
4. **Monitor for 1 day** (Step 6-7)
5. **Let it run for 3 days** (backfill completes)
6. **Pause backfill scheduler** (Step 8)
7. **Enjoy clean data!** 🎉

---

**Ready to deploy?** Start with Step 1! 🚀

**Documentation:**
- This guide: `/docs/data-pipeline/GCP_ENRICHMENT_DEPLOYMENT.md`
- Cloud Function code: `/functions/src/backfill-enrichment.ts`
- Summary: `/docs/data-pipeline/SENTIMENT_ENRICHMENT_AUDIT_SUMMARY.md`
