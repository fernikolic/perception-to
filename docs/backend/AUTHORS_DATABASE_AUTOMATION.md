# Authors Database Automation

## Overview

The authors database is automatically updated weekly to maintain an up-to-date list of all authors and their associated outlets from the BigQuery database.

## Automation Details

### Cloud Function

**Function Name:** `updateAuthorsDatabase`
**Location:** `functions/src/update-authors-database.ts`
**Deployed:** `us-central1`
**Runtime:** Node.js 18
**Memory:** 1 GiB
**Timeout:** 540 seconds (9 minutes)

### Schedule

**Frequency:** Weekly
**Schedule:** Every Monday at 2:00 AM UTC
**Cron Expression:** `0 2 * * 1`
**Scheduler Job:** `firebase-schedule-updateAuthorsDatabase-us-central1`

### What It Does

1. **Queries BigQuery:**
   ```sql
   SELECT DISTINCT author_name, Outlet
   FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
   WHERE author_name IS NOT NULL
   ORDER BY Outlet, author_name
   ```

2. **Processes Data:**
   - Groups authors by outlet
   - Sorts outlets alphabetically
   - Sorts authors within each outlet alphabetically

3. **Generates Output:**
   - Creates a markdown file with all authors organized by outlet
   - Includes metadata (generation date, total counts, etc.)
   - Adds data quality notes

4. **Saves Results:**
   - **Cloud Storage:** `gs://perception-app-3db34.appspot.com/data/authors-database.md`
   - **Firestore Metadata:** `system/authors-database` document

5. **Fetches Author Images (NEW):**
   - Identifies new authors not yet in the `authors` collection
   - Searches Google Images for professional headshots
   - Downloads and stores images in Cloud Storage
   - Saves image URLs and metadata to Firestore
   - Processes up to 100 new authors per run (Google API free tier limit)
   - Uses UI Avatars as fallback for authors without found images

6. **Records Metadata:**
   - `lastUpdated`: Timestamp of last update
   - `totalAuthors`: Total number of author-outlet combinations
   - `totalOutlets`: Total number of unique outlets
   - `storageUrl`: Link to the file in Cloud Storage

## Output Locations

### Primary Output
The automated function saves the output to:
- **Cloud Storage:** `gs://perception-app-3db34.appspot.com/data/authors-database.md`

### Local Documentation Copy
A local copy is maintained at:
- **Local File:** `/Users/fernandonikolic/perception/docs/backend/AUTHORS_DATABASE.md`

> **Note:** The local copy should be manually synced from Cloud Storage when needed.

## Management Commands

### View Function Logs
```bash
# View recent logs
firebase functions:log --only updateAuthorsDatabase

# View logs in Google Cloud Console
gcloud functions logs read updateAuthorsDatabase \
  --region=us-central1 \
  --project=perception-app-3db34 \
  --limit=50
```

### Check Scheduler Status
```bash
# List all scheduler jobs
gcloud scheduler jobs list \
  --location=us-central1 \
  --project=perception-app-3db34

# Describe the authors database job
gcloud scheduler jobs describe firebase-schedule-updateAuthorsDatabase-us-central1 \
  --location=us-central1 \
  --project=perception-app-3db34
```

### Manual Trigger
```bash
# Trigger the scheduler job manually
gcloud scheduler jobs run firebase-schedule-updateAuthorsDatabase-us-central1 \
  --location=us-central1 \
  --project=perception-app-3db34
```

### Download Latest Version
```bash
# Download from Cloud Storage to local docs folder
gsutil cp gs://perception-app-3db34.appspot.com/data/authors-database.md \
  /Users/fernandonikolic/perception/docs/backend/AUTHORS_DATABASE.md
```

### Check Firestore Metadata
```bash
# Using Firebase CLI
firebase firestore:get system/authors-database

# Or view in console
# https://console.firebase.google.com/project/perception-app-3db34/firestore/data/system/authors-database
```

## Monitoring

### Success Indicators
- Function completes without errors
- Firestore document `system/authors-database` updates with current timestamp
- Cloud Storage file has recent modification time
- Logs show "Successfully updated authors database"

### What to Monitor
1. **Function Execution:**
   - Check logs for errors
   - Monitor execution time (should be < 30 seconds)
   - Verify successful completion

2. **Data Quality:**
   - Confirm author count is reasonable (currently ~297)
   - Verify outlet count (currently ~57)
   - Check for any missing or corrupted data

3. **Storage:**
   - Ensure Cloud Storage file is updated
   - Verify file size is reasonable
   - Check file metadata

### Alerts
The function will throw errors if:
- BigQuery query fails
- No results returned from BigQuery
- Cloud Storage write fails
- Firestore write fails

## Troubleshooting

### Function Not Running
1. Check scheduler status:
   ```bash
   gcloud scheduler jobs describe firebase-schedule-updateAuthorsDatabase-us-central1 \
     --location=us-central1
   ```

2. Manually trigger to test:
   ```bash
   gcloud scheduler jobs run firebase-schedule-updateAuthorsDatabase-us-central1 \
     --location=us-central1
   ```

3. Check function logs for errors:
   ```bash
   firebase functions:log --only updateAuthorsDatabase
   ```

### No Data in Cloud Storage
1. Check function logs for errors
2. Verify BigQuery access permissions
3. Confirm Cloud Storage bucket permissions
4. Try manual trigger

### Outdated Data
1. Check `lastUpdated` timestamp in Firestore
2. Verify scheduler is enabled and running
3. Check for function execution errors
4. Consider manual trigger

## Permissions Required

The Cloud Function service account needs:
- **BigQuery:** `bigquery.jobs.create`, `bigquery.datasets.get`
- **Cloud Storage:** `storage.objects.create`, `storage.objects.get`
- **Firestore:** `datastore.entities.create`, `datastore.entities.update`

These permissions are automatically granted when the function is deployed via Firebase.

## Cost Estimation

**BigQuery:**
- Query scans ~434K rows
- Estimated cost: < $0.01 per run

**Cloud Functions:**
- Execution time: ~10-30 seconds
- Memory: 512 MiB
- Estimated cost: < $0.01 per run

**Cloud Storage:**
- Storage: ~50 KB file
- Estimated cost: < $0.001 per month

**Total Weekly Cost:** < $0.05 per week

## Maintenance

### Updating the Function
1. Edit `/Users/fernandonikolic/perception/functions/src/update-authors-database.ts`
2. Build functions: `cd functions && npm run build`
3. Deploy: `firebase deploy --only functions:updateAuthorsDatabase`

### Changing the Schedule
1. Edit the cron expression in `update-authors-database.ts`:
   ```typescript
   schedule: '0 2 * * 1', // Every Monday at 2 AM UTC
   ```
2. Redeploy the function

### Updating the Output Format
1. Edit the `generateMarkdown()` function in `update-authors-database.ts`
2. Redeploy the function
3. Manually trigger to test changes

## Related Documentation

- [BigQuery Schema Management](/docs/data-pipeline/BIGQUERY_SCHEMA_MANAGEMENT.md)
- [BigQuery Search Function](/docs/backend/functions/bigquery-search.md)
- [Cloud Functions Deployment Guide](/docs/deployment/DEPLOY_AI_FUNCTION.md)

---

**Last Updated:** 2025-10-16
**Maintainer:** Data Engineering Team
**Status:** ✅ Active and Running
