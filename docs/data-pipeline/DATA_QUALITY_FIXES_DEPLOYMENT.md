# Data Quality Fixes - Deployment Guide

**Created**: 2025-11-23
**Status**: Ready for deployment

## Overview

This document provides deployment instructions for fixing two critical data quality issues identified in the BigQuery alerts:

1. **Missing Sentiment Values** (40+ instances with 100% null rate)
2. **Duplicate URLs** (1,365+ duplicate Reddit URLs)

## Root Causes Identified

### 1. Missing Sentiment Issue

**Problem**: Two separate data pipelines with different enrichment behaviors:

- **Pipeline A (Legacy)**: IFTTT → Google Sheets → Apps Script → `all_channels_data` (DIRECT, no enrichment)
- **Pipeline B (Enrichment)**: Source → `staging_table` → Enrichment Service → `all_channels_data` (WITH enrichment)

Most outlets (Yahoo Finance, Galaxy Research, GitHub, etc.) use Pipeline A, which bypasses sentiment enrichment.

### 2. Duplicate URLs Issue

**Problem**: Reddit IFTTT applets trigger multiple times for the same URL within 1-4 hours, creating duplicates. Analysis shows:
- 1,365 duplicate Reddit URLs found in the last 30 days
- Most duplicates occur within 1-4 hours
- Each URL appears 3 times on average

## Solutions Implemented

### Three Scripts Created:

1. **`scripts/backfill-missing-sentiment.cjs`** - Backfills sentiment for existing NULL records
2. **`scripts/cleanup-duplicate-urls.cjs`** - Removes duplicate URLs, keeping earliest
3. **`scripts/admin/apps-script-staging-table.js`** - Updated Apps Script for proper enrichment flow

## Deployment Steps

### Phase 1: Immediate Fixes (Run Now)

#### Step 1: Cleanup Duplicate URLs

First, run in dry-run mode to see what will be deleted:

```bash
# Preview what will be deleted (Reddit only)
node scripts/cleanup-duplicate-urls.cjs --dry-run --outlet=Reddit

# If satisfied, run the actual cleanup
node scripts/cleanup-duplicate-urls.cjs --outlet=Reddit
```

**Expected Result**: ~2,730 duplicate Reddit records deleted, keeping the earliest version of each.

#### Step 2: Backfill Missing Sentiment

Set the OpenAI API key and run the backfill:

```bash
# Preview what will be enriched (5 records)
OPENAI_API_KEY_V2=your-key-here node scripts/backfill-missing-sentiment.cjs --batch-size=5 --dry-run

# Run actual backfill in small batches
OPENAI_API_KEY_V2=your-key-here node scripts/backfill-missing-sentiment.cjs --batch-size=50

# Continue running until all NULL sentiment records are enriched
# The script will tell you how many remain after each run
```

**Expected Cost**: ~$0.0075 per 50 records (50 × $0.00015)
**Expected Time**: ~5-10 minutes per 50 records

### Phase 2: Long-term Fix (Deploy to Google Sheets)

#### Update Apps Scripts

For each Google Sheet (All Media, Reddit, X, YouTube, GitHub, etc.):

1. Open the Google Sheet
2. Go to **Extensions → Apps Script**
3. Open `scripts/admin/apps-script-staging-table.js`
4. Copy the entire code
5. In Apps Script editor:
   - Replace the `sendDataToBigQuery()` function with the new code
   - Update the `OUTLET_NAME` constant to match your sheet (e.g., 'Reddit', 'Yahoo Finance')
   - Save the script
6. **Test first**:
   - Run `sendDataToBigQuery()` manually
   - Check the logs to ensure data goes to `staging_table`
   - Verify enrichment service processes the staging data
7. Set up the trigger:
   - Run `setupTrigger()` function to enable automatic hourly sync

**IMPORTANT**: Do this for ALL 8 Google Sheets:
- All Media
- Reddit
- X (Twitter)
- YouTube
- GitHub PRs
- Research
- Hacker News
- Spotify

#### Verify Enrichment Service is Running

Ensure the enrichment service processes staging_table regularly:

```bash
# Check if enrichment service is deployed
gcloud run services list | grep standalone-enrichment

# Verify it's scheduled (should run hourly)
gcloud scheduler jobs list | grep enrichment

# If not scheduled, create a Cloud Scheduler job:
gcloud scheduler jobs create http enrichment-hourly \
  --location=us-central1 \
  --schedule="0 * * * *" \
  --uri="https://standalone-enrichment-[YOUR-SERVICE].run.app/" \
  --http-method=GET
```

### Phase 3: Monitoring (Ongoing)

#### Weekly Cleanup Job

Schedule the duplicate cleanup script to run weekly:

```bash
# Create a Cloud Scheduler job for weekly cleanup
gcloud scheduler jobs create http duplicate-cleanup-weekly \
  --location=us-central1 \
  --schedule="0 2 * * 0" \
  --uri="https://[YOUR-CLEANUP-SERVICE].run.app/cleanup" \
  --http-method=POST
```

Or run manually each week:

```bash
# Run cleanup for all outlets (not just Reddit)
node scripts/cleanup-duplicate-urls.cjs
```

#### Data Quality Monitor

The existing data quality monitor (`functions/data-quality-monitor/index.js`) will continue to alert on issues. After deploying these fixes, you should see:

- ✅ Sentiment null rates drop to <5%
- ✅ Duplicate URLs drop to <5 per week

## Verification

After deployment, verify the fixes are working:

```bash
# Check sentiment null rate (should be <5%)
bq query --use_legacy_sql=false '
SELECT
  Outlet,
  COUNT(*) as total,
  COUNTIF(Sentiment IS NULL) as null_sentiment,
  ROUND(COUNTIF(Sentiment IS NULL) / COUNT(*) * 100, 2) as null_pct
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY Outlet
HAVING null_pct > 5
ORDER BY null_pct DESC
'

# Check for duplicates (should be minimal)
bq query --use_legacy_sql=false '
SELECT
  URL,
  COUNT(*) as count
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY URL
HAVING COUNT(*) > 1
LIMIT 10
'
```

## Rollback Plan

If issues occur after deployment:

### Rollback Apps Script Changes

1. Go to **Extensions → Apps Script → Version history**
2. Restore the previous version
3. The old script will resume writing to `all_channels_data` directly

### Restore Deleted Duplicates

Duplicates are permanently deleted. If needed:

1. Check backup_data table for copies (if backups were enabled)
2. Re-run IFTTT sync to re-fetch recent data

## Expected Outcomes

After full deployment:

1. **Sentiment Coverage**: 95%+ of articles will have sentiment values
2. **Duplicate Rate**: <0.5% duplicate URLs
3. **Data Quality Alerts**: Reduced from 40+ instances to <5
4. **API Costs**: Minimal increase (~$1-2/month for backfill enrichment)

## Maintenance

### Monthly Tasks

1. Run `node scripts/cleanup-duplicate-urls.cjs` to remove any new duplicates
2. Check data quality monitor alerts for new issues

### Quarterly Tasks

1. Review IFTTT applet configurations
2. Verify all Apps Scripts are using staging_table
3. Check enrichment service logs for errors

## Support

If issues arise:

1. Check Cloud Run logs for enrichment service errors
2. Check Apps Script execution logs in Google Sheets
3. Review data quality monitor alerts
4. Check BigQuery for staging_table backlog

## Files Created

- `/scripts/backfill-missing-sentiment.cjs` - Backfill script
- `/scripts/cleanup-duplicate-urls.cjs` - Deduplication script
- `/scripts/admin/apps-script-staging-table.js` - Updated Apps Script template
- `/docs/data-pipeline/DATA_QUALITY_FIXES_DEPLOYMENT.md` - This file
