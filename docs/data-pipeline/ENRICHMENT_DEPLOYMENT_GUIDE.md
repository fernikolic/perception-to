# Complete Enrichment System Deployment Guide

**Status**: ✅ Ready for Deployment
**Last Updated**: October 31, 2025
**Estimated Time**: 2-3 hours setup + 2-3 days backfill
**Estimated Cost**: ~$50 one-time + ~$6/month ongoing

## Overview

This guide walks you through deploying the complete enrichment system:
1. **Apps Script v2.0** - Handles NEW data from IFTTT (50% cost savings)
2. **Cloud Function** - Backfills EXISTING data (116K articles)

Both use identical logic for consistency.

---

## 📋 Pre-Deployment Checklist

- [ ] OpenAI API account with credits
- [ ] OpenAI API key (stored in Script Properties for Apps Script)
- [ ] Google Cloud Project access (triple-upgrade-245423)
- [ ] Firebase Functions enabled
- [ ] BigQuery write permissions
- [ ] 30 minutes for deployment
- [ ] Backup of current Apps Script code

---

## Part 1: Deploy Apps Script v2.0 (NEW Data)

**Time**: 30 minutes
**Cost**: FREE (only pay for API usage)

### Step 1: Backup Current Code

1. Open your Google Sheet with the Apps Script
2. Go to **Extensions → Apps Script**
3. Select all code in `Code.gs`
4. **File → New → Script file**
5. Name it: `backup-v1-YYYY-MM-DD`
6. Paste your code there
7. Save

### Step 2: Install New Code

1. Open the main `Code.gs` file
2. **Delete these old functions** (they're being replaced):
   ```javascript
   function analyzeAndScoreSentiment() { ... }
   function getSentiment() { ... }
   function categorizeContent() { ... }
   function getCategoriesFromChatGPT() { ... }
   ```

3. **Keep these functions** (they're still needed):
   ```javascript
   function getSentimentScore() { ... }
   function categorizeMediaByOutlet() { ... }
   function categorizeMediaByCountryBatch() { ... }
   function categorizeMediaByFundingBatch() { ... }
   function categorizeOutlets() { ... }
   function categorizeMediaByPolitics() { ... }
   function convertToHex() { ... }
   ```

4. **Add the new code** from `/docs/data-pipeline/APPS_SCRIPT_ENRICHMENT_V2.md`:
   - Copy the entire code block from the documentation
   - Paste at the END of your `Code.gs` file
   - Save (Ctrl+S / Cmd+S)

### Step 3: Test on Sample Data

1. In your Google Sheet:
   - Select rows 2-10
   - Clear columns F (Sentiment), I (Score), and J-M (Topics)

2. In Apps Script:
   - Click **Run → enrichArticlesBatch**
   - Authorize if prompted
   - **View → Logs** to see progress

3. Verify in Google Sheet:
   - Column F should have: "Positive", "Neutral", or "Negative"
   - Column I should have: 0.3, 0.1, or 0.6
   - Columns J-M should have topic names from your 17-topic list
   - NO domain names or error messages!

### Step 4: Set Up Automated Trigger

1. In Apps Script, click **Triggers** (clock icon on left sidebar)

2. Click **+ Add Trigger**

3. Configure:
   - **Function**: `enrichArticlesBatch`
   - **Event source**: Time-driven
   - **Type of time based trigger**: Hour timer
   - **Time of day**: Every hour

4. Click **Save**

5. Your script will now run automatically every hour!

### Step 5: Monitor First Run

1. Wait for the next hour
2. Check **Executions** (in Apps Script sidebar)
3. View the latest execution
4. Verify:
   - Status: "Completed"
   - Duration: < 6 minutes
   - Logs show "✅ Enrichment Complete"

**Apps Script deployment complete!** ✅

---

## Part 2: Deploy Cloud Function (EXISTING Data Backfill)

**Time**: 1 hour setup + 2-3 days running
**Cost**: ~$50 total

### Step 1: Add Cloud Function Code

1. Open terminal and navigate to functions directory:
   ```bash
   cd /Users/fernandonikolic/perception/functions
   ```

2. The code is already created at:
   ```
   /Users/fernandonikolic/perception/functions/src/backfill-enrichment.ts
   ```

3. Update `functions/src/index.ts` to export the new function:
   ```typescript
   // Add this line to exports
   export { backfillEnrichment } from './backfill-enrichment';
   ```

### Step 2: Deploy to Cloud Run

```bash
cd /Users/fernandonikolic/perception/functions

# Deploy function
firebase deploy --only functions:backfillEnrichment --project triple-upgrade-245423

# Wait for deployment to complete (2-3 minutes)
```

### Step 3: Set Environment Variable

```bash
# Set OpenAI API key
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json

gcloud run services update backfillenrichment \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --update-env-vars="OPENAI_API_KEY_V2=YOUR_OPENAI_API_KEY_HERE"
```

**Replace `YOUR_OPENAI_API_KEY_HERE` with your actual key!**

### Step 4: Test Manual Run

```bash
# Test with small batch first
curl -X GET "https://backfillenrichment-XXXXX-uc.a.run.app?batch_size=10&mode=auto"
```

Expected response:
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

### Step 5: Create Fast Backfill Scheduler

For FAST backfill (completes in 2-3 days):

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json

gcloud scheduler jobs create http enrichment-backfill-fast \
  --schedule="*/5 * * * *" \
  --uri="https://backfillenrichment-XXXXX-uc.a.run.app?batch_size=500&mode=auto" \
  --http-method=GET \
  --location=us-central1 \
  --project=triple-upgrade-245423 \
  --description="Fast backfill enrichment - 500 articles every 5 minutes"
```

**Replace the URL with your actual Cloud Run URL!**

This will:
- Run every 5 minutes
- Process 500 articles per run
- Complete ~116K articles in 2-3 days
- Cost: ~$50 total

### Step 6: Monitor Backfill Progress

**Check scheduler status:**
```bash
gcloud scheduler jobs list --location=us-central1 --project=triple-upgrade-245423
```

**View function logs:**
```bash
gcloud run services logs read backfillenrichment \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --limit=50
```

**Check BigQuery progress:**
```sql
-- See how many articles still need enrichment
SELECT
  COUNT(*) as total_articles,
  COUNTIF(Sentiment IS NULL OR Sentiment = '' OR Sentiment LIKE '%.com%') as needs_sentiment,
  COUNTIF(Topic_1 IS NULL OR Topic_1 = '') as needs_topics,
  ROUND((COUNTIF((Sentiment IS NOT NULL AND Sentiment != '' AND Sentiment NOT LIKE '%.com%') AND Topic_1 IS NOT NULL) / COUNT(*)) * 100, 2) as pct_complete
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`;
```

### Step 7: Pause After Completion

Once backfill is complete (check with SQL above):

```bash
gcloud scheduler jobs pause enrichment-backfill-fast \
  --location=us-central1 \
  --project=triple-upgrade-245423
```

---

## Part 3: Verification & Testing

### Test 1: Verify Apps Script Works

1. In Google Sheets, add a new row manually with:
   - Column B: "Bitcoin hits new all-time high"
   - Column C: "Bitcoin reached $75,000 today, marking a historic milestone..."
   - Column D: "https://example.com/test"

2. Wait for next hourly run (or trigger manually)

3. Verify columns F, I, J-M are filled correctly

### Test 2: Verify Cloud Function Works

```bash
# Check one enriched article
bq query --use_legacy_sql=false --format=prettyjson "
SELECT URL, Sentiment, Topic_1, Topic_2, Topic_3, Topic_4
FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
WHERE Sentiment IN ('Positive', 'Neutral', 'Negative')
  AND Topic_1 IS NOT NULL
ORDER BY Date DESC
LIMIT 5
"
```

Should show clean data like:
```json
{
  "URL": "https://...",
  "Sentiment": "Positive",
  "Topic_1": "Investment vehicles",
  "Topic_2": "Institutional Adoption",
  "Topic_3": "",
  "Topic_4": ""
}
```

### Test 3: Check for Corrupted Data

```bash
# Should return 0 rows after backfill completes
bq query --use_legacy_sql=false "
SELECT COUNT(*) as corrupted_count
FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
WHERE Sentiment LIKE '%.com%'
   OR Sentiment LIKE '%Error%'
"
```

---

## Cost Breakdown

### One-Time Costs (Backfill)
- 116,000 articles × $0.0002 per article = **~$23**
- Buffer for retries + errors = **~$27**
- **Total one-time**: **$50**

### Ongoing Costs (New Data)
- Apps Script: 1,000 articles/day × $0.0002 = $0.20/day
- Cloud Function: Not needed after backfill (can pause)
- **Total monthly**: **~$6**

### Compared to Old System
- Old: Two API calls per article = $0.0004 per article
- New: One API call per article = $0.0002 per article
- **Savings**: 50%

---

## Monitoring Dashboard

### Daily Health Check

Run this query daily to monitor system health:

```sql
-- Daily enrichment stats
SELECT
  DATE(generated_at) as date,
  COUNT(*) as articles_added,
  COUNTIF(Sentiment IS NOT NULL) as has_sentiment,
  COUNTIF(Topic_1 IS NOT NULL) as has_topics,
  COUNTIF(Sentiment IS NOT NULL AND Topic_1 IS NOT NULL) as fully_enriched,
  ROUND((COUNTIF(Sentiment IS NOT NULL AND Topic_1 IS NOT NULL) / COUNT(*)) * 100, 2) as pct_enriched
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY date
ORDER BY date DESC;
```

**Healthy metrics:**
- `pct_enriched` should be > 95%
- No corrupted sentiment values
- Topics only from your 17-item list

---

## Troubleshooting

### Apps Script Issues

**Problem**: "OPENAI_API_KEY not found"
- Solution: Apps Script → Project Settings → Script Properties → Add key

**Problem**: Topics not from my 17-item list
- Solution: Check logs - OpenAI might be returning variations
- Verify JSON mode is enabled in code
- Contact OpenAI support if persists

**Problem**: Sentiment shows error messages
- Solution: Old code still running - verify you deleted old functions
- Check backup file vs main file

### Cloud Function Issues

**Problem**: "OPENAI_API_KEY_V2 not configured"
- Solution: Re-run the `gcloud run services update` command with env var

**Problem**: Function timeout after 540 seconds
- Solution: Reduce batch_size from 500 to 250
- Redeploy scheduler with new batch size

**Problem**: BigQuery quota exceeded
- Solution: Slow down scheduler (every 10 min instead of 5)
- Check you're not running multiple backfill jobs simultaneously

**Problem**: Backfill not making progress
- Solution: Check scheduler is running: `gcloud scheduler jobs list`
- Verify function logs show successful executions
- Run manual test with curl to verify function works

---

## Rollback Plan

If something goes wrong:

### Rollback Apps Script
1. Apps Script → Files
2. Open `backup-v1-YYYY-MM-DD`
3. Copy all code
4. Paste into main `Code.gs`
5. Save
6. Triggers will continue working with old code

### Pause Cloud Function
```bash
gcloud scheduler jobs pause enrichment-backfill-fast \
  --location=us-central1 \
  --project=triple-upgrade-245423
```

### Delete Cloud Function (if needed)
```bash
gcloud functions delete backfillEnrichment \
  --region=us-central1 \
  --project=triple-upgrade-245423
```

---

## Success Criteria

After full deployment (2-3 days), you should have:

✅ **Data Quality**
- 0 articles with corrupted sentiment (domain names, errors)
- > 95% of articles have valid sentiment (Positive/Neutral/Negative)
- > 95% of articles have topics from your 17-item taxonomy
- < 100 distinct Topic_1 values (down from 1,123!)

✅ **System Performance**
- Apps Script runs every hour successfully
- New articles enriched within 1 hour of arrival
- Cloud Function can be paused (backfill complete)
- Costs stable at ~$6/month

✅ **Monitoring**
- Apps Script execution logs clean
- No BigQuery errors
- OpenAI API usage within budget
- Daily SQL checks show healthy metrics

---

## Next Steps After Deployment

1. **Week 1**: Monitor closely, verify data quality
2. **Week 2**: Analyze topic distribution, refine taxonomy if needed
3. **Week 3**: Pause Cloud Function once backfill complete
4. **Month 1**: Review costs, adjust Apps Script frequency if needed
5. **Ongoing**: Run weekly health checks with SQL queries

---

## Support & Contacts

**Documentation:**
- Apps Script Code: `/docs/data-pipeline/APPS_SCRIPT_ENRICHMENT_V2.md`
- Cloud Function Code: `/functions/src/backfill-enrichment.ts`
- This Guide: `/docs/data-pipeline/ENRICHMENT_DEPLOYMENT_GUIDE.md`

**Monitoring:**
- Apps Script Logs: Extensions → Apps Script → Executions
- Cloud Function Logs: `gcloud run services logs read`
- BigQuery Console: https://console.cloud.google.com/bigquery

**Emergency Rollback:**
- See "Rollback Plan" section above

---

**Status**: Ready to deploy! Start with Part 1 (Apps Script) ✅
