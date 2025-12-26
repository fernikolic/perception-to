# Conference Video Monitoring System

## Overview

The Conference Video Monitoring System is an automated pipeline that extracts, analyzes, and stores Bitcoin conference video data from YouTube channels. It combines web scraping, natural language processing, and sentiment analysis to provide comprehensive intelligence on Bitcoin conference content.

**Created:** October 29, 2025
**Last Updated:** October 29, 2025
**Status:** Active - Automated Daily Monitoring Enabled

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Components](#components)
3. [Data Flow](#data-flow)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [Monitoring](#monitoring)
7. [Troubleshooting](#troubleshooting)
8. [Future Enhancements](#future-enhancements)

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────┐
│  Cloud Scheduler            │
│  Daily @ 6 AM UTC           │
└──────────┬──────────────────┘
           │
           v
┌──────────────────────────────┐
│  Firebase Cloud Function     │
│  monitorConferenceVideos     │
│                              │
│  • Triggers monitoring       │
│  • Passes environment vars   │
│  • Logs execution            │
└──────────┬───────────────────┘
           │
           v
┌─────────────────┐
│  YouTube API    │
│  (Page Scraping)│
└────────┬────────┘
         │
         v
┌────────────────────────────────┐
│ conference-youtube-monitor.cjs │
│                                │
│  0. Query Existing URLs        │
│     (Deduplication Check)      │
│  1. Fetch Videos               │
│  2. Filter Out Duplicates      │
│  3. Extract Transcripts        │
│  4. AI Analysis (GPT-4o)       │
│  5. Sentiment Detection        │
│  6. Topic Classification       │
└────────────┬───────────────────┘
             │
             v
┌────────────────────────────┐
│  BigQuery                  │
│  conference_videos_staging │
│                            │
│  ✅ No Duplicates          │
│  ✅ Review & Quality Check │
└────────────┬───────────────┘
             │
             v (Manual Move)
┌────────────────────────────┐
│  BigQuery                  │
│  all_channels_data         │
│                            │
│  (Production Data)         │
└────────────────────────────┘
```

### Technology Stack

- **Runtime:** Node.js 18+
- **Language Processing:** OpenAI GPT-4o-mini
- **Data Storage:** Google BigQuery
- **Transcript Extraction:** youtube-caption-extractor npm package
- **Web Scraping:** node-fetch
- **Cloud Platform:** Google Cloud Platform

---

## Components

### 1. Main Monitoring Script

**File:** `conference-youtube-monitor.cjs`

**Purpose:** Core extraction and analysis engine

**Key Functions:**
- `getChannelVideos()` - Scrapes YouTube channel pages for video lists
- `getTranscript()` - Extracts English captions from videos
- `extractStructuredData()` - Uses GPT-4o-mini to extract speaker, topics, and summary
- `analyzeSentiment()` - Determines sentiment (Positive/Neutral/Negative) and BPI score
- `processVideo()` - Orchestrates the full extraction pipeline
- `insertToBigQuery()` - Writes processed data to BigQuery
- `monitorChannel()` - Processes all videos from a single conference channel
- `monitorAllChannels()` - Batch processes all enabled channels

**Configuration Requirements:**
- `OPENAI_API_KEY_V2` environment variable
- `GOOGLE_APPLICATION_CREDENTIALS` environment variable
- `conference-channels-config.json` file

---

### 2. Firebase Cloud Functions

**File:** `functions/src/conference-monitor.ts`

**Purpose:** Automated daily monitoring wrapper

**Functions Exported:**

1. **monitorConferenceVideos** (Scheduled)
   - Schedule: `'0 6 * * *'` (Daily at 6 AM UTC)
   - Timeout: 540 seconds (9 minutes)
   - Memory: 2GiB
   - Secrets: OPENAI_API_KEY_V2
   - Executes: `node conference-youtube-monitor.cjs --all`

2. **triggerConferenceMonitor** (HTTP Trigger)
   - Endpoint: https://triggerconferencemonitor-uycbgxxglq-uc.a.run.app
   - Purpose: Manual testing and on-demand monitoring
   - Same configuration as scheduled version

**Cloud Scheduler Job:**
- Name: `firebase-schedule-monitorConferenceVideos-us-central1`
- Region: us-central1
- Schedule: Daily at 6 AM UTC
- Status: ENABLED

---

### 3. Configuration File

**File:** `conference-channels-config.json`

**Structure:**
```json
{
  "channels": [
    {
      "channelHandle": "@TheBitcoinConference",
      "channelUrl": "https://www.youtube.com/@TheBitcoinConference",
      "conferenceName": "Bitcoin Conference",
      "enabled": true
    }
  ],
  "settings": {
    "checkLastNDays": 2,
    "maxVideosPerChannel": 200,
    "minVideoDurationSeconds": 300,
    "enableTranscriptExtraction": true,
    "enableSentimentAnalysis": true
  }
}
```

**Currently Configured Channels:** 18 active conference channels

---

### 3. Monitoring Script

**File:** `monitor-conference-backfill.cjs`

**Purpose:** Real-time progress tracking and statistics

**Features:**
- Overall backfill statistics (total videos, conferences, date ranges)
- Sentiment distribution (Positive/Neutral/Negative breakdown)
- Per-conference breakdown (video counts, average BPI)
- Recent additions (last 5 videos added)
- Continuous monitoring mode with auto-refresh

**Usage:**
```bash
# Single snapshot
node monitor-conference-backfill.cjs

# Continuous monitoring (updates every 60 seconds)
node monitor-conference-backfill.cjs --continuous

# Custom interval (updates every 30 seconds)
node monitor-conference-backfill.cjs --continuous --interval 30
```

---

## Data Flow

### Step-by-Step Process

1. **Automated Trigger**
   - Cloud Scheduler triggers `monitorConferenceVideos` function daily at 6 AM UTC
   - Firebase Cloud Function sets up environment variables and credentials
   - Executes `conference-youtube-monitor.cjs --all` as a child process

2. **Channel Discovery**
   - Load enabled channels from `conference-channels-config.json`
   - Filter by `enabled: true` status

3. **Deduplication Check**
   - Query BigQuery `conference_videos_staging` table for all existing video URLs
   - Store URLs in a JavaScript `Set` for O(1) lookup performance
   - Log count of existing videos in database

4. **Video Extraction**
   - Fetch channel page HTML
   - Parse `ytInitialData` JSON structure
   - Extract video metadata (title, URL, views, duration, publish date)
   - Filter videos by minimum duration (300 seconds)

5. **Duplicate Filtering**
   - Compare fetched videos against existing URLs Set
   - Filter out any videos already in BigQuery
   - Log statistics: `X new videos to process (Y already exist)`
   - Skip processing if no new videos found

6. **Transcript Extraction**
   - Use `youtube-caption-extractor` package
   - Request English captions
   - Combine all caption segments into full text
   - Handle missing captions gracefully

7. **AI Analysis (GPT-4o-mini)**

   **Extract Structured Data:**
   - **Speaker Names:** Extracted from title/description
   - **Topics:** Select 3-5 from 20 predefined categories:
     - Regulatory, Mining, Lightning, Scaling, Privacy, DeFi
     - Adoption, Technology, Economics, Security, Development
     - Trading, Investment, Policy, Education, Infrastructure
     - Corporate, Custody, Payments, Innovation
   - **Detailed Summary:** 3-4 paragraph comprehensive report covering:
     - What the speaker discussed
     - Main arguments and points made
     - Key insights or recommendations
     - Implications for Bitcoin

8. **Sentiment Analysis**
   - Analyze overall tone (Positive/Neutral/Negative)
   - Map to BPI scores:
     - Positive: 0.3
     - Neutral: 0.1
     - Negative: 0.6

9. **Data Transformation**
   - Map to `all_channels_data` schema (19 fields)
   - Format dates as ISO TIMESTAMP
   - Split topics into Topic_1, Topic_2, Topic_3, Topic_4
   - Generate image URL from video ID

10. **BigQuery Insert**
   - Write to `conference_videos_staging` table
   - Only new videos inserted (duplicates already filtered out)
   - Log insertion success/failure

11. **Manual Review & Promotion**
   - Review data in staging table
   - Manually move to `all_channels_data` when satisfied

---

## Configuration

### Environment Variables

```bash
# Required
export OPENAI_API_KEY_V2="sk-proj-..."
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/bitcoin-data-chat-key.json"
```

### BigQuery Setup

**Project:** `triple-upgrade-245423`
**Dataset:** `btcp_main_dataset`

**Tables:**
- `conference_videos_staging` (staging/review table)
- `all_channels_data` (production table)

**Schema (19 fields):**
```
Date: TIMESTAMP
Title: STRING
Content: STRING
URL: STRING
Outlet: STRING
Sentiment: STRING
Image_URL: STRING
author_name: STRING
BPI: FLOAT
Topic_1: STRING
Topic_2: STRING
Topic_3: STRING
Topic_4: STRING
Country: STRING
Funding: STRING
Outlet_Category: STRING
Political_Leaning: STRING
All_Topics: STRING
row_num: INTEGER
```

---

## Usage

### Automated Daily Monitoring (Production)

**Cloud Scheduler** automatically runs the monitoring daily at 6 AM UTC. No manual intervention required.

**Verify Schedule:**
```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json \
gcloud scheduler jobs describe firebase-schedule-monitorConferenceVideos-us-central1 \
  --location=us-central1 \
  --project=triple-upgrade-245423
```

**Check Execution Logs:**
```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json \
gcloud functions logs read monitorConferenceVideos \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --limit=50
```

---

### Manual Triggering

**Option 1: HTTP Trigger (Recommended for Testing)**
```bash
curl -X POST https://triggerconferencemonitor-uycbgxxglq-uc.a.run.app
```

This will return JSON with success status and output logs.

**Option 2: Direct Script Execution (Local Testing)**

**Full Backfill (All Channels):**
```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
export OPENAI_API_KEY_V2=sk-proj-...

node conference-youtube-monitor.cjs --all
```

**Single Channel Test:**
```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
export OPENAI_API_KEY_V2=sk-proj-...

node conference-youtube-monitor.cjs --channel @BTCPrague
```

**Test with Single Video:**
```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
export OPENAI_API_KEY_V2=sk-proj-...

node conference-youtube-monitor.cjs --test
```

---

### Monitoring Progress

**One-time Check:**
```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
node monitor-conference-backfill.cjs
```

**Continuous Monitoring:**
```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
node monitor-conference-backfill.cjs --continuous
```

### Verifying Results in BigQuery

**Count total videos:**
```sql
SELECT COUNT(*) as total_videos
FROM `triple-upgrade-245423.btcp_main_dataset.conference_videos_staging`
```

**Check per-conference breakdown:**
```sql
SELECT
  Outlet,
  COUNT(*) as video_count,
  ROUND(AVG(BPI), 2) as avg_bpi
FROM `triple-upgrade-245423.btcp_main_dataset.conference_videos_staging`
GROUP BY Outlet
ORDER BY video_count DESC
```

**View recent additions:**
```sql
SELECT
  Title,
  Outlet,
  author_name,
  Sentiment,
  BPI,
  DATE(Date) as video_date
FROM `triple-upgrade-245423.btcp_main_dataset.conference_videos_staging`
ORDER BY Date DESC
LIMIT 10
```

---

## Monitoring

### Real-Time Monitoring Dashboard

The monitoring script (`monitor-conference-backfill.cjs`) provides:

1. **Overall Statistics**
   - Total videos extracted
   - Total conferences covered
   - Date range of extracted videos
   - Average BPI across all videos
   - Sentiment distribution (Positive/Neutral/Negative percentages)

2. **Conference Breakdown**
   - Videos per conference
   - Average BPI per conference
   - Latest video date per conference

3. **Recent Additions**
   - Last 5 videos added
   - Title, speaker, conference, sentiment, BPI, date

### Backfill Progress Estimation

**Factors Affecting Duration:**
- **Number of videos:** ~50-200 per channel
- **Transcript extraction:** ~2-5 seconds per video
- **OpenAI API calls:** 2 calls per video (structured data + sentiment)
- **Rate limiting:** 2-second delay between videos, 5-second delay between channels

**Estimated Time:**
- Per video: ~10-15 seconds (including API calls and rate limiting)
- Per channel (50 videos): ~10-15 minutes
- All 18 channels: ~3-5 hours total

---

## Deployment

### Initial Setup

**1. Create Firebase Cloud Functions:**

Create `functions/src/conference-monitor.ts` with scheduled and HTTP-triggered functions (see file in repository).

**2. Add Function Exports:**

Add to `functions/src/index.ts`:
```typescript
export { monitorConferenceVideos, triggerConferenceMonitor } from './conference-monitor';
```

**3. Set Secret in Firebase:**
```bash
firebase functions:secrets:set OPENAI_API_KEY_V2
# Enter your OpenAI API key when prompted
```

**4. Build and Deploy:**
```bash
cd functions
npm run build
firebase deploy --only functions:monitorConferenceVideos,functions:triggerConferenceMonitor
```

**5. Verify Deployment:**
```bash
# Check Cloud Scheduler
gcloud scheduler jobs list --location=us-central1

# Check Cloud Functions
firebase functions:list

# Test HTTP trigger
curl -X POST https://triggerconferencemonitor-uycbgxxglq-uc.a.run.app
```

---

### Updating the System

**Update Monitoring Script:**
```bash
# Make changes to conference-youtube-monitor.cjs
# No redeployment needed - script is executed directly by Cloud Function
```

**Update Configuration:**
```bash
# Edit conference-channels-config.json
# Add/remove channels or modify settings
# No redeployment needed
```

**Update Cloud Function Logic:**
```bash
# Make changes to functions/src/conference-monitor.ts
cd functions
npm run build
firebase deploy --only functions:monitorConferenceVideos,functions:triggerConferenceMonitor
```

**Update Secret:**
```bash
# If you need to rotate the OpenAI API key
firebase functions:secrets:set OPENAI_API_KEY_V2
firebase deploy --only functions:monitorConferenceVideos,functions:triggerConferenceMonitor
```

---

## Troubleshooting

### Common Issues

**1. "Invalid YouTube URL" Error**
- **Cause:** Video ID extraction failed
- **Solution:** Check URL format, ensure it's a valid YouTube URL

**2. "Could not find video data in page" Error**
- **Cause:** YouTube page structure changed or channel has no videos tab
- **Solution:** Verify channel URL, check if channel has public videos

**3. "Transcript extraction failed" Warning**
- **Cause:** Video has no captions or captions are disabled
- **Solution:** This is expected for some videos, system continues without transcript

**4. OpenAI API Errors**
- **Cause:** API key invalid, rate limit exceeded, or API downtime
- **Solution:** Verify API key, check OpenAI status page, reduce concurrency

**5. BigQuery Insert Errors**
- **Cause:** Schema mismatch, invalid data types, or duplicate URL
- **Solution:** Check schema alignment, verify data formats, note duplicates are skipped

**6. "Streaming buffer" Error When Deleting**
- **Cause:** BigQuery has a streaming buffer for recently inserted data
- **Solution:** Wait 30-90 minutes or use a different test URL to avoid duplicates

**7. Cloud Function Not Executing on Schedule**
- **Cause:** Scheduler job may be paused or function may have failed deployment
- **Solution:** Check scheduler status with `gcloud scheduler jobs list`, verify function deployed successfully
- **Verification:** Check Cloud Function logs for execution history

**8. HTTP Trigger Returns 500 Error**
- **Cause:** Script execution failed, missing environment variables, or timeout exceeded
- **Solution:** Check function logs with `gcloud functions logs read`, verify SECRET is accessible, increase timeout if needed

**9. Duplicate Videos Still Being Added**
- **Cause:** Deduplication query may be failing or URL format mismatch
- **Solution:** Check BigQuery staging table for duplicate URLs, verify `getExistingVideoUrls()` function executes successfully
- **Debugging:** Add console.log in deduplication function to verify URL Set size

### Debugging Tips

**Enable Verbose Logging:**
```bash
# Add console.log statements in processVideo() function
# Check transcript length, extracted topics, sentiment reasoning
```

**Check Background Process:**
```bash
# If running in background, check if process is still running
ps aux | grep conference-youtube-monitor

# Check system logs for errors
tail -f /var/log/system.log
```

**Verify BigQuery Credentials:**
```bash
# Test BigQuery connection
bq ls triple-upgrade-245423:btcp_main_dataset
```

---

## Future Enhancements

### Planned Improvements

1. **Historical Backfill**
   - YouTube Data API v3 integration for accessing older videos
   - Date range filtering for targeted backfills

2. **Playlist Support**
   - Special handling for conference-specific playlists (e.g., Baltic Honeybadger)
   - Recursive playlist video extraction

3. **Speaker Recognition**
   - Build speaker database
   - Automatic speaker tagging
   - Speaker profile enrichment

4. **Topic Model Training**
   - Fine-tune topic classification model
   - Dynamic topic discovery
   - Topic trending analysis

5. **Real-Time Monitoring**
   - WebSocket integration for instant notifications
   - Slack/Discord alerts for new conference videos
   - Email digests for weekly summaries

6. **Quality Assurance**
   - Automated data quality checks
   - Transcript accuracy verification
   - Sentiment analysis confidence scores

7. **Data Enrichment**
   - Conference location extraction
   - Event date parsing
   - Attendee count estimates
   - Social media engagement metrics

8. **Production Pipeline**
   - Automated staging-to-production promotion based on quality thresholds
   - Data validation rules
   - Rollback mechanisms

---

## Support & Maintenance

**System Owner:** Fernando Nikolic
**Project:** Perception App
**Repository:** `/Users/fernandonikolic/perception`

**Key Files:**
- Main script: `conference-youtube-monitor.cjs`
- Cloud Functions: `functions/src/conference-monitor.ts`
- Config: `conference-channels-config.json`
- Monitor: `monitor-conference-backfill.cjs`
- Test script: `test-youtube-extract.cjs`

**BigQuery Console:**
- [https://console.cloud.google.com/bigquery?project=triple-upgrade-245423](https://console.cloud.google.com/bigquery?project=triple-upgrade-245423)

**OpenAI Dashboard:**
- [https://platform.openai.com/usage](https://platform.openai.com/usage)

---

## Changelog

**2025-10-29 (Evening Update - Automated Monitoring):**
- ✅ **Deduplication System Implemented**
  - Added `getExistingVideoUrls()` function to query BigQuery for existing URLs
  - Implemented Set-based O(1) lookup for efficient duplicate detection
  - Added duplicate filtering before video processing
  - System now skips channels with zero new videos
  - Tested successfully: 0 duplicates added to staging table

- ✅ **Firebase Cloud Functions Deployment**
  - Created `functions/src/conference-monitor.ts`
  - Deployed `monitorConferenceVideos` (scheduled function)
  - Deployed `triggerConferenceMonitor` (HTTP trigger)
  - Configured Google Secret Manager for OPENAI_API_KEY_V2
  - Set up Cloud Scheduler job: `firebase-schedule-monitorConferenceVideos-us-central1`
  - Schedule: Daily at 6 AM UTC
  - Timeout: 540 seconds (9 minutes)
  - Memory: 2GiB

- ✅ **Production Automation Enabled**
  - System now runs automatically every day at 6 AM UTC
  - No manual intervention required
  - HTTP endpoint available for manual testing: https://triggerconferencemonitor-uycbgxxglq-uc.a.run.app

- ✅ **Documentation Updated**
  - Added Firebase Cloud Functions section
  - Added Deployment section with setup instructions
  - Updated Data Flow with deduplication steps
  - Updated Usage section with automated and manual options
  - Added troubleshooting for Cloud Functions issues
  - Updated architecture diagram with Cloud Scheduler and deduplication

**2025-10-29 (Initial Deployment):**
- Initial system deployment
- 18 conference channels configured
- Backfill initiated for all channels
- Monitoring script created (`conference-youtube-monitor.cjs`)
- Comprehensive documentation written
- Increased maxVideosPerChannel from 50 to 200
- Removed @BitcoinMagazine from channel list

---

## License

Internal use only. Property of Perception App.
