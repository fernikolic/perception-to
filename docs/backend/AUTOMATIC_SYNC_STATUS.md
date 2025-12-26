# Automatic Data Sync System Status

**System**: dailyFeedSync Function
**Status**: ✅ OPERATIONAL
**Last Verified**: September 20, 2025, 07:42 UTC

## Overview

Your Bitcoin Perception Dashboard has an automatic data synchronization system that transfers new data from your API endpoint to Firestore daily. This ensures your historical dataset stays current with fresh content.

## Sync Configuration

### Function Details
- **Function Name**: `dailyFeedSync`
- **Schedule**: Daily at 2:00 AM UTC
- **Region**: us-central1
- **Memory**: 1GB
- **Max Instances**: 1
- **Timeout**: Default Cloud Function timeout

### Data Flow
```
API Endpoint → dailyFeedSync Function → Firestore Collection → hybridFeed Access
```

1. **Source**: `https://btcpapifunction-45998414364.us-central1.run.app/btcpapifunction/feed`
2. **Target**: `feed_entries` collection in Firestore
3. **Access**: Available via hybridFeed function for frontend

## Sync Process Details

### Daily Operation
1. **Trigger**: Scheduled function runs at 2 AM UTC
2. **Date Logic**: Fetches data for previous day (yesterday)
3. **Duplicate Check**: Verifies if data already exists for that date
4. **API Fetch**: Retrieves all pages of data for the target date
5. **Storage**: Batch writes to Firestore with metadata
6. **Metrics**: Creates daily summary statistics

### Data Processing
```javascript
// Key parameters used in sync
{
  startDate: 'YYYY-MM-DD',    // Yesterday's date
  endDate: 'YYYY-MM-DD',      // Same as startDate
  pageSize: 100,              // Efficient page size
  page: 1,2,3...,            // All pages until complete
  userId: 'perception'        // Your API user ID
}
```

### Error Handling
- **API Timeouts**: 30-second timeout per request
- **Rate Limiting**: 100ms delay between API requests
- **Duplicate Prevention**: Skips sync if data already exists
- **Batch Failures**: Continues processing on individual failures

## Current Performance

### Recent Activity (Last 7 Days)
- **2025-09-20**: 242 records
- **2025-09-19**: 854 records
- **2025-09-18**: 1,032 records
- **2025-09-17**: 871 records
- **2025-09-16**: 1,094 records
- **2025-09-15**: 1,051 records
- **2025-09-14**: 840 records

**Total Last 7 Days**: 5,984 new records
**Average Daily**: ~855 records per day

### System Health Indicators
- ✅ **API Availability**: Responding normally
- ✅ **Data Quality**: Consistent daily volumes
- ✅ **Sync Timing**: Running on schedule
- ✅ **Error Rate**: Minimal errors detected

## Monitoring & Verification

### Check Sync Status
```bash
# Run comprehensive verification
python3 comprehensive-verification.py

# Check function logs
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json firebase functions:log dailyFeedSync

# Manual count check
curl -X POST "https://us-central1-perception-app-3db34.cloudfunctions.net/uploadHistoricalCSV?status=check"
```

### Expected Behavior
- **Daily Growth**: 800-1,200 new records per day
- **Sync Time**: Processes typically complete in <10 minutes
- **Data Availability**: New data accessible via hybridFeed within hours

## Troubleshooting

### If Sync Stops Working
1. **Check API Endpoint**: Verify source API is responding
2. **Review Function Logs**: Look for error messages
3. **Verify Schedule**: Confirm Cloud Scheduler is active
4. **Manual Trigger**: Use manualFeedSync for immediate sync

### Common Issues
- **API Rate Limits**: Function includes delays to prevent this
- **Duplicate Data**: Function checks and skips existing dates
- **Network Timeouts**: 30-second timeouts with retry logic
- **Memory Limits**: 1GB allocation sufficient for daily volumes

## Manual Operations

### Force Sync for Specific Date
```bash
# Deploy and trigger manual sync function
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json firebase deploy --only functions:manualFeedSync

# Then trigger via HTTP or Cloud Console
```

### Check Missing Dates
```bash
# Use verification script to identify gaps
python3 comprehensive-verification.py
```

## Schedule Information

### UTC Schedule
- **Current Time**: Check with `date -u`
- **Next Sync**: Daily at 02:00:00 UTC
- **Time Until Next**: Calculate from current UTC time

### Timezone Considerations
- Function operates in UTC timezone
- Syncs previous day's data (UTC date)
- Frontend should handle timezone display

## Data Quality Assurance

### Validation Steps
1. **Date Indexing**: Adds `date_indexed` field for efficient queries
2. **Outlet Normalization**: Stores `outlet_normalized` for filtering
3. **Content Metrics**: Tracks `content_length` and `title_length`
4. **Metadata**: Adds `created_at` timestamp and `sync_batch` identifier

### Monitoring Metrics
- Daily record counts should be consistent
- No gaps in sequential dates
- Error rates should remain <1%
- API response times stable

## Integration with Frontend

### Data Access
- **hybridFeed Function**: Provides unified access to historical + live data
- **Date Filtering**: Supports full date range queries
- **Real-time**: New data available within hours of sync

### Query Examples
```javascript
// Get today's data
const todayData = await hybridFeed({
  startDate: '2025-09-20',
  endDate: '2025-09-20',
  pageSize: 1000
});

// Get last week's data
const weekData = await hybridFeed({
  startDate: '2025-09-13',
  endDate: '2025-09-20',
  pageSize: 5000
});
```

---

**System Status**: ✅ FULLY OPERATIONAL
**Last Updated**: September 20, 2025
**Next Scheduled Sync**: September 21, 2025 at 02:00:00 UTC