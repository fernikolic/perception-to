# YouTube Video Enrichment System

## Overview

This document describes the system for enriching YouTube video metadata with AI-generated content summaries, sentiment analysis, and topic extraction.

## Current State

### Staging Table
- **Table**: `triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging`
- **Total Videos**: 14,910
- **Date Range**: August 2014 - December 2025
- **Channels**: 23 (12 conferences + 11 podcasts)

### Data Already Captured
| Column | Status | Source |
|--------|--------|--------|
| Date | ✅ Complete | YouTube API |
| Title | ✅ Complete | YouTube API |
| URL | ✅ Complete | YouTube API |
| Outlet | ✅ Complete | Channel config |
| Image_URL | ✅ Complete | YouTube thumbnails |
| Outlet_Category | ✅ Complete | Channel config (Conference/Podcast) |
| video_id | ✅ Complete | YouTube API |
| duration_seconds | ✅ Complete | YouTube API |
| view_count | ✅ Complete | YouTube API |
| like_count | ✅ Complete | YouTube API |

### Data Requiring Enrichment
| Column | Status | Source |
|--------|--------|--------|
| Content | ❌ Needs enrichment | Transcript → OpenAI summary |
| Sentiment | ❌ NULL | OpenAI analysis |
| Topic_1 | ❌ NULL | OpenAI extraction |
| Topic_2 | ❌ NULL | OpenAI extraction |
| Topic_3 | ❌ NULL | OpenAI extraction |
| Topic_4 | ❌ NULL | OpenAI extraction |
| All_Topics | ❌ NULL | Derived from Topic_1-4 |
| author_name | ❌ NULL | OpenAI speaker extraction |
| BPI | ❌ NULL | Derived from Sentiment |
| Country | ❌ NULL | Optional |
| Funding | ❌ NULL | Optional |
| Political_Leaning | ❌ NULL | Optional |

---

## Architecture

### Cloud Run Service
- **URL**: `https://youtube-summarizer-293695725781.us-central1.run.app`
- **Location**: `/Users/fernandonikolic/perception/functions/youtube-summarizer-standalone/`
- **Purpose**: Extracts YouTube transcripts and enriches with OpenAI

### Service Flow
```
┌─────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│  Enrichment     │────▶│  Cloud Run Service   │────▶│  OpenAI API     │
│  Script         │     │  youtube-summarizer  │     │  gpt-4o-mini    │
└─────────────────┘     └──────────────────────┘     └─────────────────┘
        │                         │                          │
        │                         ▼                          │
        │               ┌──────────────────┐                 │
        │               │  YouTube         │                 │
        │               │  Transcript API  │                 │
        │               └──────────────────┘                 │
        │                                                    │
        ▼                                                    ▼
┌─────────────────┐                               ┌─────────────────┐
│  BigQuery       │◀──────────────────────────────│  JSON Response  │
│  Staging Table  │                               │  with enriched  │
└─────────────────┘                               │  data           │
                                                  └─────────────────┘
```

### Cloud Run Service Input/Output

**Request (POST)**:
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "title": "Video Title",
  "channelName": "Channel Name"
}
```

**Response**:
```json
{
  "success": true,
  "content": "AI-generated summary of the video transcript...",
  "sentiment": "Positive|Negative|Neutral",
  "topics": ["Topic1", "Topic2", "Topic3", "Topic4"],
  "author_name": "Speaker Name",
  "image_url": "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg",
  "bpi": 0.7
}
```

---

## Enrichment Script

### Location
`/Users/fernandonikolic/perception/scripts/youtube-backfill/enrich-youtube-videos.cjs`

### Features
- Batch processing with configurable batch size
- Progress tracking and resume capability
- Rate limiting to avoid API throttling
- Error handling with retry logic
- Incremental BigQuery updates
- Detailed logging

### Configuration
```javascript
const CONFIG = {
  CLOUD_RUN_URL: 'https://youtube-summarizer-293695725781.us-central1.run.app',
  BIGQUERY_PROJECT: 'triple-upgrade-245423',
  BIGQUERY_DATASET: 'btcp_main_dataset',
  BIGQUERY_TABLE: 'youtube_videos_staging',
  BATCH_SIZE: 50,           // Videos per batch
  RATE_LIMIT_MS: 3000,      // Delay between API calls
  MAX_RETRIES: 3,           // Retry failed videos
  RETRY_DELAY_MS: 5000      // Delay before retry
};
```

### Usage
```bash
# Full enrichment (all NULL sentiment videos)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json node enrich-youtube-videos.cjs

# Limit to specific number of videos
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json node enrich-youtube-videos.cjs --limit=100

# Resume from progress file
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json node enrich-youtube-videos.cjs --resume

# Dry run (no BigQuery updates)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json node enrich-youtube-videos.cjs --dry-run
```

---

## Cost Estimates

### Time Estimate
- **Per video**: ~6 seconds (3s API call + 3s rate limit)
- **Total videos**: 14,910
- **Total time**: ~25 hours continuous

### OpenAI API Costs
- **Model**: gpt-4o-mini
- **Average transcript**: ~5,000 tokens input
- **Average response**: ~500 tokens output
- **Cost per video**: ~$0.001-0.002
- **Total estimated cost**: **$15-30**

### Recommended Approach
Run in batches to monitor costs and quality:
1. **Batch 1**: 100 videos (test run) - ~$0.20
2. **Batch 2**: 1,000 videos (validation) - ~$2
3. **Batch 3**: Remaining ~13,800 videos - ~$25

---

## Channel Coverage

### Conferences (12 channels)
| Channel | Videos | Category |
|---------|--------|----------|
| Bitcoin Conference | 422 | Conference |
| BTC Prague | 452 | Conference |
| Adopting Bitcoin | 568 | Conference |
| TABConf | 132 | Conference |
| bitcoin++ | 264 | Conference |
| Plan B Lugano | 489 | Conference |
| FREE Madeira / Bitcoin Atlantis | 113 | Conference |
| Africa Bitcoin Conference | 130 | Conference |
| Surfin' Bitcoin | 184 | Conference |
| Unconfiscatable | 50 | Conference |
| Bitcoin Events | 426 | Conference |
| Mining Disrupt | 440 | Conference |

### Podcasts (11 channels)
| Channel | Videos | Category |
|---------|--------|----------|
| Bitcoin Magazine | 3,301 | Podcast |
| Simply Bitcoin | 2,636 | Podcast |
| Swan Bitcoin | 1,597 | Podcast |
| TFTC | 1,092 | Podcast |
| Robert Breedlove | 727 | Podcast |
| Stephan Livera Podcast | 722 | Podcast |
| The Bitcoin Layer | 451 | Podcast |
| Natalie Brunell | 439 | Podcast |
| Bitcoin Audible | 150 | Podcast |
| What Bitcoin Did | 123 | Podcast |
| Bitcoin Unchained | 2 | Podcast |

---

## Files Reference

### Configuration
- `/Users/fernandonikolic/perception/scripts/youtube-backfill/bitcoin-focused-channels.json`

### Scripts
- `/Users/fernandonikolic/perception/scripts/youtube-backfill/backfill-metadata-only.cjs` - Initial metadata backfill
- `/Users/fernandonikolic/perception/scripts/youtube-backfill/enrich-youtube-videos.cjs` - AI enrichment script

### Cloud Run Service
- `/Users/fernandonikolic/perception/functions/youtube-summarizer-standalone/index.js`

### Logs
- `/Users/fernandonikolic/perception/scripts/youtube-backfill/enrichment.log`
- `/Users/fernandonikolic/perception/scripts/youtube-backfill/enrichment-progress.json`

---

## BPI (Bitcoin Perception Index) Mapping

The BPI score is derived from sentiment:

| Sentiment | BPI Score |
|-----------|-----------|
| Positive | 0.7 |
| Neutral | 0.1 |
| Negative | -0.5 |

---

## Error Handling

### Common Errors

1. **No transcript available**
   - Some videos have disabled captions
   - Script marks these as failed and continues
   - Can retry with alternative transcript sources

2. **Rate limiting**
   - Cloud Run or OpenAI rate limits
   - Script automatically retries with exponential backoff

3. **Video unavailable**
   - Deleted or private videos
   - Script logs and skips

### Recovery
- Progress is saved after each batch
- Use `--resume` flag to continue from last checkpoint
- Failed videos logged to `enrichment-errors.json`

---

## Post-Enrichment Steps

1. **Verify Data Quality**
   ```sql
   SELECT Sentiment, COUNT(*)
   FROM `btcp_main_dataset.youtube_videos_staging`
   WHERE Sentiment IS NOT NULL
   GROUP BY Sentiment
   ```

2. **Merge to Main Table** (when ready)
   ```sql
   INSERT INTO `btcp_main_dataset.all_channels_data`
   SELECT * FROM `btcp_main_dataset.youtube_videos_staging`
   WHERE Sentiment IS NOT NULL
   ```

3. **Update Feedly Pipeline**
   - Configure ongoing YouTube video processing
   - Set up scheduled Cloud Run triggers

---

## Monitoring Commands

### Check Progress
```bash
# Count enriched vs pending
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json bq query --use_legacy_sql=false "
SELECT
  COUNTIF(Sentiment IS NOT NULL) as enriched,
  COUNTIF(Sentiment IS NULL) as pending
FROM \`triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging\`
"
```

### View Recent Enrichments
```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json bq query --use_legacy_sql=false "
SELECT Title, Outlet, Sentiment, Topic_1, Topic_2
FROM \`triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging\`
WHERE Sentiment IS NOT NULL
ORDER BY Date DESC
LIMIT 10
"
```

---

## Related Documentation

- [Data Pipeline Overview](/docs/data-pipeline/README.md)
- [Sentiment Enrichment Audit](/docs/data-pipeline/SENTIMENT_ENRICHMENT_AUDIT_SUMMARY.md)
- [BigQuery Schema Management](/docs/data-pipeline/BIGQUERY_SCHEMA_MANAGEMENT.md)
