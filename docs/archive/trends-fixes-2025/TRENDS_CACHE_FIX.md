# Trends Cache Issue - Root Cause & Solution

## Problem Summary
The Trends API was showing stale data (8+ hours old) even though fresh trends were being generated hourly in BigQuery.

## Root Cause
The `cacheTrendsData` function (defined in `src/trends-cache-scheduler.ts`) was **never deployed**, so the Firestore cache was never being updated with fresh trends from the BigQuery `ai_trends_tracking` table.

### Data Flow:
1. ✅ IFTTT → Google Sheets (working)
2. ✅ Apps Scripts → BigQuery `all_channels_data` table (working)
3. ✅ Hourly scheduler → `btcpapifunction3-1-final` service `/extract` endpoint (working)
4. ✅ Trends generated → BigQuery `ai_trends_tracking` table (working)
5. ❌ **cacheTrendsData function** → Firestore `cached_trends` collection (NOT DEPLOYED)
6. ❌ API reads from stale Firestore cache instead of fresh BigQuery data

## Solution Implemented

### 1. Cleared Stale Cache (Immediate Fix)
```bash
node clear-trends-cache.js
```
This cleared the Firestore `cached_trends` collection, forcing the API to read fresh data from BigQuery.

### 2. Deploy cacheTrendsData Function (Permanent Fix)
```bash
gcloud functions deploy cacheTrendsData \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=. \
  --entry-point=cacheTrendsData \
  --trigger-schedule="0 * * * *" \
  --trigger-timezone="UTC" \
  --project=perception-app-3db34 \
  --memory=2GiB \
  --timeout=540s
```

This function will now run every hour and update the Firestore cache with fresh trends.

## Prevention Measures

### Monitor Deployed Functions
Check all scheduled functions are deployed:
```bash
gcloud functions list --regions=us-central1 --project=perception-app-3db34 --format="table(name,state)"
```

### Monitor Cache Freshness
Add a monitoring function to alert if cache is stale:
```javascript
// Check if cached_trends.lastUpdated is > 2 hours old
const cacheDoc = await db.collection('cache_metadata').doc('trends_config').get();
const lastUpdate = cacheDoc.data().lastSuccessfulUpdate.toDate();
const hoursSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60);
if (hoursSinceUpdate > 2) {
  // Send alert
}
```

### Deployment Checklist
Before deploying new functions:
1. ✅ Check function is exported in `src/index.ts`
2. ✅ Deploy with `firebase deploy --only functions:FUNCTION_NAME`
3. ✅ Verify deployment: `gcloud functions describe FUNCTION_NAME`
4. ✅ Check logs after first run: `gcloud functions logs read FUNCTION_NAME`

## Related Files
- `/functions/src/trends-cache-scheduler.ts` - Cache update logic
- `/functions/src/trends-analysis.ts` - Trends generation
- `/functions/clear-trends-cache.js` - Manual cache clearing script

## Monitoring URLs
- Trends API: https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends
- Cloud Scheduler: https://console.cloud.google.com/cloudscheduler?project=perception-app-3db34
- Cloud Functions: https://console.cloud.google.com/functions/list?project=perception-app-3db34

## Date Fixed
2025-10-10 (20:30 PST)
