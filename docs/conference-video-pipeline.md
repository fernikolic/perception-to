# Conference Video Pipeline Documentation

## Overview

This document describes the complete end-to-end pipeline for capturing, enriching, and storing Bitcoin conference videos from YouTube. The system automatically processes new videos from various Bitcoin conference channels, extracts transcripts, generates AI-powered summaries, and stores enriched data in BigQuery.

**Pipeline Flow:**
```
Feedly RSS → IFTTT → Google Sheets → Apps Script Enrichment → BigQuery
```

**Date Created:** December 2024
**Last Updated:** December 19, 2024
**Total Historical Videos:** 3,710+ (dating back to June 2015)

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Sources](#data-sources)
3. [Google Sheets Structure](#google-sheets-structure)
4. [Cloud Function: YouTube Summarizer](#cloud-function-youtube-summarizer)
5. [Apps Script: Conference Video Processor](#apps-script-conference-video-processor)
6. [Apps Script: BigQuery Sender](#apps-script-bigquery-sender)
7. [BigQuery Tables](#bigquery-tables)
8. [Trigger Configuration](#trigger-configuration)
9. [Troubleshooting](#troubleshooting)
10. [File Locations](#file-locations)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CONFERENCE VIDEO PIPELINE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────┐    ┌──────────┐    ┌────────────────┐    ┌──────────────────┐ │
│  │  Feedly  │───▶│  IFTTT   │───▶│ Google Sheets  │───▶│    BigQuery      │ │
│  │  (RSS)   │    │(Webhook) │    │   (Staging)    │    │(all_channels_data)│ │
│  └──────────┘    └──────────┘    └───────┬────────┘    └──────────────────┘ │
│                                          │                      ▲           │
│                                          ▼                      │           │
│                                  ┌───────────────┐              │           │
│                                  │  Apps Script  │              │           │
│                                  │  (Enrichment) │──────────────┘           │
│                                  └───────┬───────┘                          │
│                                          │                                  │
│                                          ▼                                  │
│                                  ┌───────────────┐                          │
│                                  │Cloud Function │                          │
│                                  │(Summarizer)   │                          │
│                                  └───────────────┘                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Components

| Component | Purpose | Technology |
|-----------|---------|------------|
| Feedly | RSS aggregation of YouTube channels | SaaS |
| IFTTT | Webhook trigger on new videos | SaaS |
| Google Sheets | Staging area for new videos | Google Workspace |
| Apps Script (Enrichment) | Content extraction & AI enrichment | Google Apps Script |
| Cloud Function | YouTube transcript + OpenAI summary | Firebase Functions |
| Apps Script (BQ Sender) | Validated BigQuery inserts | Google Apps Script |
| BigQuery | Final data warehouse | Google Cloud |

---

## Data Sources

### YouTube Channels Monitored

The pipeline monitors 18 Bitcoin conference channels:

| Channel | Content Type |
|---------|--------------|
| Bitcoin Conference | Bitcoin Magazine conferences (Nashville, Miami, etc.) |
| BTC Prague | European Bitcoin conference |
| bitcoin++ | Developer-focused conference |
| TABConf | Technical Atlanta Bitcoin Conference |
| Mining Disrupt | Mining-focused events |
| Adopting Bitcoin | El Salvador conference |
| Plan B Lugano | Swiss Bitcoin event |
| Surfin' Bitcoin | French Bitcoin conference |
| Crypto Valley | Swiss crypto ecosystem events |
| Baltic Honeybadger | Riga Bitcoin conference |
| And more... | Various regional conferences |

### Feedly Feed Configuration

- **Feed URL:** Configured in Feedly with all conference channel RSS feeds
- **Update Frequency:** Real-time (as YouTube publishes)
- **IFTTT Trigger:** "New item in feed" → "Add row to Google Sheet"

---

## Google Sheets Structure

### Sheet Name: `BTCP Feedly Conferences`

The Google Sheet serves as the staging area between IFTTT and BigQuery.

### Column Structure (A-X)

| Column | Name | Source | Description |
|--------|------|--------|-------------|
| A | Date | IFTTT | Video publish date |
| B | Title | IFTTT | Video title |
| C | Content | Enrichment | AI-generated summary (400-600 words) |
| D | URL | IFTTT | YouTube video URL |
| E | Outlet | Enrichment | Channel name (via oEmbed API) |
| F | Sentiment | Enrichment | Positive/Neutral/Negative |
| G | Image_URL | Enrichment | Thumbnail URL |
| H | Author_Name | - | Not used for videos |
| I | BPI | Enrichment | Bitcoin Perception Index (0.1/0.3/0.6) |
| J | Topic_1 | Enrichment | Primary topic |
| K | Topic_2 | Enrichment | Secondary topic |
| L | Topic_3 | Enrichment | Tertiary topic |
| M | Topic_4 | Enrichment | Quaternary topic |
| N | Country | - | Not used |
| O | Funding | - | Not used |
| P | Outlet_Category | Enrichment | Set to "Conferences" |
| Q | Political_Leaning | - | Not used |
| R | MENTIONED_COUNTRIES | Enrichment | Countries mentioned in content |
| S | MENTIONED_REGIONS | Enrichment | Regions mentioned |
| T | MENTIONED_CITIES | Enrichment | Cities mentioned |
| U | GEOGRAPHIC_SCOPE | Enrichment | local/regional/global |
| V | PRIMARY_COUNTRY | Enrichment | Main country focus |
| W | Status | Enrichment | Processing status |
| X | Uploaded_To_BQ | BQ Script | Sent/deleted tracking |

### Status Values

| Status | Meaning |
|--------|---------|
| (empty) | Pending - not yet processed |
| Processing | Currently being enriched |
| Completed | Successfully enriched, ready for BigQuery |
| Failed | Enrichment failed, will retry |
| Failed_Permanent | Failed after max retries |
| Shorts_Skip | YouTube Shorts URL, will be deleted |

---

## Cloud Function: YouTube Summarizer

### Overview

Firebase Cloud Function that extracts YouTube video transcripts and generates comprehensive AI-powered summaries using OpenAI GPT-4o-mini.

### Endpoint

```
POST https://us-central1-perception-app-3db34.cloudfunctions.net/youtubeSummarizer
```

### Request Format

```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "title": "Optional: Video Title",
  "channelName": "Optional: Channel Name"
}
```

### Response Format

```json
{
  "success": true,
  "content": "Comprehensive 400-600 word summary...",
  "sentiment": "Positive",
  "topics": ["Adoption", "Institutional", "Infrastructure"],
  "author_name": "Speaker Name or 'Not specified'",
  "image_url": "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
  "bpi": 0.3
}
```

### Configuration

| Setting | Value |
|---------|-------|
| Runtime | Node.js 20 |
| Memory | 512 MiB |
| Timeout | 120 seconds |
| Region | us-central1 |
| Secret | OPENAI_API_KEY_V2 |

### Transcript Extraction

The function extracts transcripts by:
1. Fetching the YouTube watch page
2. Parsing the `captionTracks` JSON from page data
3. Preferring English captions (`en` or `en-*`)
4. Fetching caption XML from `baseUrl`
5. Parsing and joining text nodes
6. Limiting to 100,000 characters for API efficiency

### OpenAI Prompt

The prompt instructs GPT-4o-mini to:
- Write 4-6 paragraphs (400-600 words)
- Be **definitive** - no hedging language like "likely" or "appears to"
- Extract specific facts, quotes, numbers, and dates
- Identify speakers from introductions
- Classify topics from predefined list
- Determine sentiment (Positive/Neutral/Negative)

### Topic Categories

```
Regulatory, Mining, Lightning, Scaling, Privacy, DeFi, Adoption,
Technology, Economics, Security, Development, Trading, Investment,
Policy, Education, Infrastructure, Corporate, Custody, Payments,
Innovation, Stablecoins, Tokenization, ETF, Institutional, CBDC, Banking
```

### BPI (Bitcoin Perception Index) Calculation

| Sentiment | BPI Value |
|-----------|-----------|
| Positive | 0.3 |
| Neutral | 0.1 |
| Negative | 0.6 |

### Source Code Location

```
/Users/fernandonikolic/perception/functions/src/youtube-summarizer.ts
```

### Deployment

```bash
source ~/.nvm/nvm.sh && nvm use 20
cd /Users/fernandonikolic/perception/functions
GOOGLE_APPLICATION_CREDENTIALS=./bitcoin-data-chat-key.json \
  firebase deploy --only functions:youtubeSummarizer
```

---

## Apps Script: Conference Video Processor

### Overview

Google Apps Script that runs on a schedule to enrich new conference videos in the Google Sheet. It processes pending rows and fills in content, sentiment, topics, and geographic data.

### Processing Flow

```
1. Find pending rows (no Status or Status = empty)
2. Skip YouTube Shorts URLs (mark as Shorts_Skip)
3. Extract channel name via YouTube oEmbed API
4. Call youtubeSummarizer Cloud Function for content
5. VERIFY content is valid (>50 chars, not placeholder)
6. Extract sentiment and calculate BPI
7. Extract topics from Cloud Function response
8. Call OpenAI for geographic enrichment
9. Mark as Completed
```

### Key Functions

| Function | Purpose |
|----------|---------|
| `processConferenceVideos()` | Main function - run on trigger |
| `extractYouTubeChannelName(url)` | Get channel via oEmbed API |
| `callYouTubeSummarizer(url)` | Call Cloud Function |
| `enrichGeographicData(content)` | OpenAI geographic extraction |
| `deleteShortsRows()` | Delete Shorts_Skip rows |
| `previewShortsRows()` | Dry run - preview what would be deleted |
| `testProcessing()` | Manual test function |

### Configuration

```javascript
const CONFIG = {
  CLOUD_FUNCTION_URL: 'https://us-central1-perception-app-3db34.cloudfunctions.net/youtubeSummarizer',
  MAX_VIDEOS_PER_RUN: 20,     // ~2 min runtime
  API_DELAY_MS: 500,          // Delay between API calls
  // ... column indices
};
```

### Script Properties Required

| Property | Description |
|----------|-------------|
| OPENAI_API_KEY | OpenAI API key for geographic enrichment |

### Channel Name Extraction

Uses YouTube's free oEmbed API (no authentication required):

```javascript
const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
// Returns: { author_name: "Channel Name", ... }
```

### Skip Logic

Rows are skipped if:
- Status = `Completed` or `Failed_Permanent` or `Shorts_Skip`
- URL contains `/shorts/`
- Already has Sentiment (indicates already enriched)
- Not a YouTube URL

### Source Code Location

```
/Users/fernandonikolic/perception/scripts/google-apps-script/ConferenceVideoProcessor.gs
```

---

## Apps Script: BigQuery Sender

### Overview

Separate Apps Script that validates enriched rows and sends them to BigQuery. After successful insert, rows are backed up and deleted from the source sheet.

### Processing Flow

```
1. Find rows with Status = "Completed"
2. Validate required fields (Date, Title, Content, Sentiment)
3. Parse date (flexible format handling)
4. Build BigQuery row object
5. Batch insert to BigQuery (up to 500 per batch)
6. Backup each row to backup sheet
7. Delete successfully inserted rows (bottom to top)
```

### Key Functions

| Function | Purpose |
|----------|---------|
| `sendConferenceVideosToBigQuery()` | Main function - run on trigger |
| `handleBatch()` | Insert batch and delete rows |
| `parseFlexibleDate()` | Handle various date formats |
| `getReadyToSendStatus()` | Check how many rows ready |

### Configuration

```javascript
const BQ_CONFIG = {
  PROJECT_ID: "triple-upgrade-245423",
  DATASET_ID: "btcp_main_dataset",
  TABLE_ID: "all_channels_data",
  BACKUP_SHEET_ID: "1O6qoHGzoa4sgAKsitI-2yus6jiCIRZT5yKaNz9sObIw",
  BATCH_SIZE: 500
};
```

### Script Properties Required

| Property | Description |
|----------|-------------|
| SERVICE_ACCOUNT_KEY | JSON string of GCP service account key |

### Date Parsing

Handles multiple formats:
- Date objects from Google Sheets
- ISO format: `2024-12-18T15:00:00Z`
- Named month: `December 18, 2024`
- Slash format: `12/18/2024` or `18/12/2024`

### Source Code Location

```
/Users/fernandonikolic/perception/scripts/google-apps-script/ConferenceVideoToBigQuery-v2.gs
```

---

## BigQuery Tables

### Production Table: `all_channels_data`

**Full Path:** `triple-upgrade-245423.btcp_main_dataset.all_channels_data`

This is the main production table containing all media content including conference videos.

#### Schema

| Column | Type | Description |
|--------|------|-------------|
| Date | TIMESTAMP | Video publish date |
| Title | STRING | Video title |
| Content | STRING | AI-generated summary |
| URL | STRING | YouTube URL (unique) |
| Outlet | STRING | Channel name |
| Sentiment | STRING | Positive/Neutral/Negative |
| Image_URL | STRING | Thumbnail URL |
| author_name | STRING | Speaker name (if identified) |
| BPI | FLOAT | 0.1, 0.3, or 0.6 |
| Topic_1-4 | STRING | Topic classifications |
| Country | STRING | (unused for videos) |
| Funding | STRING | (unused for videos) |
| Outlet_Category | STRING | "Conferences" |
| Political_Leaning | STRING | (unused for videos) |
| All_Topics | STRING | Comma-separated topics |
| mentioned_countries | STRING | Countries in content |
| mentioned_regions | STRING | Regions in content |
| mentioned_cities | STRING | Cities in content |
| geographic_scope | STRING | local/regional/global |
| primary_country | STRING | Main country focus |

### Staging Table: `conference_videos_staging`

**Full Path:** `triple-upgrade-245423.btcp_main_dataset.conference_videos_staging`

Used for backfill operations and testing before production insert.

#### Additional Columns (beyond all_channels_data)

| Column | Type | Description |
|--------|------|-------------|
| video_id | STRING | YouTube video ID |
| duration_seconds | INTEGER | Video length |
| view_count | INTEGER | Views at time of scrape |
| like_count | INTEGER | Likes at time of scrape |

### Statistics (as of Dec 19, 2024)

| Table | Rows | Date Range |
|-------|------|------------|
| all_channels_data (Conferences) | 3,732 | Jun 2015 - Dec 2024 |
| conference_videos_staging | 3,710 | Jun 2015 - Dec 2024 |

---

## Trigger Configuration

### Apps Script Triggers

#### Enrichment Trigger

| Setting | Value |
|---------|-------|
| Function | `processConferenceVideos` |
| Event source | Time-driven |
| Type | Hour timer |
| Interval | Every 1 hour |
| Throughput | 20 videos/hour = 480 videos/day |

#### BigQuery Sender Trigger

| Setting | Value |
|---------|-------|
| Function | `sendConferenceVideosToBigQuery` |
| Event source | Time-driven |
| Type | Hour timer |
| Interval | Every 4 hours |

### Creating Triggers

1. Open Apps Script (Extensions > Apps Script)
2. Click clock icon (Triggers) in left sidebar
3. Click "+ Add Trigger"
4. Configure as shown above
5. Click Save

Or run `setupTriggers()` function in the enrichment script.

---

## Troubleshooting

### Common Issues

#### 1. Cloud Function Returns 401

**Cause:** OpenAI API key invalid or expired

**Fix:**
```bash
# Update the secret
firebase functions:secrets:set OPENAI_API_KEY_V2

# Redeploy the function
firebase deploy --only functions:youtubeSummarizer
```

#### 2. Channel Name Not Extracted

**Cause:** YouTube oEmbed API failure (rare)

**Fix:** The script handles this gracefully - Outlet will be empty but processing continues. The Cloud Function also extracts channel name as backup.

#### 3. "Invalid Date" Errors

**Cause:** Date format not recognized

**Fix:** The `parseFlexibleDate()` function handles most formats. Check the actual date value in the log.

#### 4. YouTube Shorts Processing

**Cause:** Shorts don't have transcripts

**Fix:** Script automatically skips and marks as `Shorts_Skip`. Run `deleteShortsRows()` periodically to clean up.

#### 5. BigQuery Insert Errors

**Cause:** Schema mismatch or duplicate URL

**Fix:** Check the error message in logs. Duplicates are rejected automatically.

### Viewing Logs

#### Cloud Function Logs
```bash
GOOGLE_APPLICATION_CREDENTIALS=./bitcoin-data-chat-key.json \
  gcloud functions logs read youtubeSummarizer --limit=50
```

#### Apps Script Logs
1. Open Apps Script
2. Click "Executions" in left sidebar
3. Click on specific execution to see logs

---

## File Locations

### Cloud Functions

| File | Purpose |
|------|---------|
| `/functions/src/youtube-summarizer.ts` | Main summarizer function |
| `/functions/src/index.ts` | Function exports |

### Apps Scripts

| File | Purpose |
|------|---------|
| `/scripts/google-apps-script/ConferenceVideoProcessor.gs` | Enrichment script |
| `/scripts/google-apps-script/ConferenceVideoToBigQuery-v2.gs` | BigQuery sender |
| `/scripts/google-apps-script/YouTubeVideoProcessor.gs` | Alternative processor |

### Python Scripts (Backfill)

| File | Purpose |
|------|---------|
| `/scripts/youtube-backfill/enrich-youtube-python.py` | Bulk backfill script |
| `/scripts/youtube-backfill/youtube-channels.json` | Channel configuration |

### Documentation

| File | Purpose |
|------|---------|
| `/docs/conference-video-pipeline.md` | This document |

---

## Backfill History

### December 2024 Backfill

**Date:** December 18-19, 2024
**Source:** YouTube Data API + Python enrichment script
**Total Videos:** 3,710
**Channels:** 18
**Date Range:** June 11, 2015 - December 14, 2024

**Process:**
1. Scraped video metadata via YouTube Data API
2. Extracted transcripts via caption endpoints
3. Enriched with OpenAI GPT-4o-mini
4. Loaded to `conference_videos_staging`
5. Verified data quality
6. Copied to `all_channels_data`

**Command to copy staging to production:**
```sql
INSERT INTO `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
(Date, Title, Content, URL, Outlet, Sentiment, Image_URL, author_name, BPI,
 Topic_1, Topic_2, Topic_3, Topic_4, Country, Funding, Outlet_Category,
 Political_Leaning, All_Topics, mentioned_countries, mentioned_regions,
 mentioned_cities, geographic_scope, primary_country)
SELECT
  Date, Title, Content, URL, Outlet, Sentiment, Image_URL, author_name, BPI,
  Topic_1, Topic_2, Topic_3, Topic_4, Country, Funding, Outlet_Category,
  Political_Leaning, All_Topics, mentioned_countries, mentioned_regions,
  mentioned_cities, geographic_scope, primary_country
FROM `triple-upgrade-245423.btcp_main_dataset.conference_videos_staging`
```

---

## Maintenance

### Regular Tasks

| Task | Frequency | Function |
|------|-----------|----------|
| Delete Shorts rows | Weekly | `deleteShortsRows()` |
| Check for stuck Processing rows | Weekly | Manual review |
| Verify BigQuery inserts | Monthly | Query `all_channels_data` |
| Update OpenAI API key | As needed | Firebase secrets |

### Monitoring Queries

**Check recent inserts:**
```sql
SELECT Date, Title, Outlet, Sentiment
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE Outlet_Category = 'Conferences'
ORDER BY Date DESC
LIMIT 20
```

**Count by outlet:**
```sql
SELECT Outlet, COUNT(*) as videos
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE Outlet_Category = 'Conferences'
GROUP BY Outlet
ORDER BY videos DESC
```

---

## Contact & Support

For issues with this pipeline, check:
1. Cloud Function logs
2. Apps Script execution history
3. BigQuery job history
4. This documentation

---

*Last updated: December 19, 2024*
