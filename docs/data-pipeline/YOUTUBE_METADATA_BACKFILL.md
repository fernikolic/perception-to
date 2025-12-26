# YouTube Metadata Backfill System

## Overview

This document describes the system for backfilling YouTube video metadata from Bitcoin-focused channels using the YouTube Data API. This process captures video information (title, description, date, thumbnails, etc.) **without** AI enrichment.

---

## Current State

### Staging Table
- **Table**: `triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging`
- **Total Videos**: 14,910
- **Date Range**: August 2014 - December 2025

### Breakdown by Category
| Category | Channels | Videos |
|----------|----------|--------|
| Conference | 12 | 3,670 |
| Podcast | 11 | 11,240 |

---

## Architecture

### YouTube Data API
- **API Key**: Stored in GCP Secret Manager as `YOUTUBE_API_KEY`
- **Key Value**: `AIzaSyC0e9iFEeZHsSBsUSGfzNiJ2W2kMtQYoXU`
- **Quota**: 10,000 units/day (free tier)

### Data Flow
```
┌─────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│  Channel Config │────▶│  YouTube Data API    │────▶│  NDJSON File    │
│  (JSON file)    │     │  - Channels API      │     │  (local)        │
└─────────────────┘     │  - PlaylistItems API │     └────────┬────────┘
                        │  - Videos API        │              │
                        └──────────────────────┘              ▼
                                                     ┌─────────────────┐
                                                     │  BigQuery       │
                                                     │  Staging Table  │
                                                     └─────────────────┘
```

### API Calls Per Channel
1. **Channels API** (1 call) - Get uploads playlist ID
2. **PlaylistItems API** (N calls) - Get video list (50 per page)
3. **Videos API** (N calls) - Get video details (50 per call)

---

## Channel Configuration

### Config File Location
`/Users/fernandonikolic/perception/scripts/youtube-backfill/bitcoin-focused-channels.json`

### Conference Channels (12)
| Channel | Channel ID | Handle |
|---------|------------|--------|
| Bitcoin Conference | UCJl3S8A-5ExFMbeJN0KtOBA | @TheBitcoinConference |
| BTC Prague | UCyYcjB89f5ffTv5bMU0qg9A | @BTCPrague |
| Adopting Bitcoin | UCz96fAA2tGsOxeodPCeYAPQ | @AdoptingBitcoin |
| TABConf | UCsTEmnKYqfGNc5sZrxYXRrw | @TABConf |
| bitcoin++ | UCKGgp4Wk-OpTqH-2SQzR5_Q | @btcplusplus |
| Plan B Lugano | UCOT9XfrKaiKunSGYSQNmRrg | @LuganoPlanB |
| FREE Madeira / Bitcoin Atlantis | UCaN2Zkvb4-rEYUcCdDTnbBQ | @FREEMadeira |
| Africa Bitcoin Conference | UC-ChrYEXlnV64mldjkGhPMQ | @AfricaBitcoinConference |
| Surfin' Bitcoin | UChfepkLjWJzSW16QArGYxWg | @SurfinBitcoin |
| Unconfiscatable | UCStz9KlR222tKiVhl_ekmpQ | @UnconfiscatableNetwork |
| Bitcoin Events | UCni7PAlyNS0_12H-26DJJ3w | @BitcoinEvents |
| Mining Disrupt | UCI-ylqZZtXRfkw_6jV3U2Dw | @miningdisrupt |

### Podcast Channels (12)
| Channel | Channel ID | Handle |
|---------|------------|--------|
| What Bitcoin Did | UCtvg5cXLY_tHDJeBoRySBtg | @WhatBitcoinDidPod |
| Stephan Livera Podcast | UCDqPIrJSzHyyJpmH6wnxVxA | @stephanlivera |
| Bitcoin Audible | UClG-wqz-OuXfzbpqwJd3fVA | @BitcoinAudible |
| TFTC | UCtdbWsnfA08KhSUO4amVLaQ | @TFTC21 |
| Simply Bitcoin | UCB6Q0S1gUHXMe5-Jjx0_laQ | @SimplyBitcoin |
| The Bitcoin Layer | UCDo6-SUypaXlTmH6AyrYBZA | @TheBitcoinLayer |
| Swan Bitcoin | UCl4takhOQtiyprismCPsa2Q | @SwanBitcoin |
| Robert Breedlove | UC43_LTf5Z4lbRjKCq0sIAVg | @RobertBreedlove22 |
| Natalie Brunell | UCru3nlhzHrbgK21x0MdB_eg | @NatalieBrunell |
| Bitcoin Sessions | UCRs2CI9JSikLo32H77ffGng | @BitcoinSessions |
| Bitcoin Unchained | UCMM5x4rK9VdTx9Rwzsfm1QA | @BitcoinUnchained |
| Bitcoin Magazine | UCtOV5M-T3GcsJAq8QKaf0lg | @BitcoinMagazine |

---

## Backfill Script

### Location
`/Users/fernandonikolic/perception/scripts/youtube-backfill/backfill-metadata-only.cjs`

### Features
- Fetches all videos from channel uploads playlist
- Configurable date cutoff (default: no limit, goes back to channel creation)
- Skips videos shorter than 2 minutes (filters out shorts/intros)
- Captures: title, description, date, URL, thumbnail, duration, view count, like count
- Saves progress incrementally (can resume if interrupted)
- Outputs NDJSON format for BigQuery loading

### Data Captured (No AI Required)
| Field | Source |
|-------|--------|
| Date | YouTube API (publishedAt) |
| Title | YouTube API (snippet.title) |
| Content | YouTube API (video description) |
| URL | Constructed from video ID |
| Outlet | Channel config |
| Image_URL | YouTube thumbnail (maxres/high) |
| Outlet_Category | Channel config (Conference/Podcast) |
| video_id | YouTube API |
| duration_seconds | YouTube API (parsed from ISO 8601) |
| view_count | YouTube API |
| like_count | YouTube API |

### Fields Left NULL (For AI Enrichment Later)
- Sentiment
- Topic_1, Topic_2, Topic_3, Topic_4
- All_Topics
- author_name
- BPI
- Country, Funding, Political_Leaning

---

## Usage

### Full Backfill (All Channels)
```bash
YOUTUBE_API_KEY="AIzaSyC0e9iFEeZHsSBsUSGfzNiJ2W2kMtQYoXU" \
node /Users/fernandonikolic/perception/scripts/youtube-backfill/backfill-metadata-only.cjs
```

### Resume Interrupted Backfill
```bash
YOUTUBE_API_KEY="AIzaSyC0e9iFEeZHsSBsUSGfzNiJ2W2kMtQYoXU" \
node /Users/fernandonikolic/perception/scripts/youtube-backfill/backfill-metadata-only.cjs --resume
```

### Upload to BigQuery
```bash
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
bq load \
  --source_format=NEWLINE_DELIMITED_JSON \
  --autodetect \
  triple-upgrade-245423:btcp_main_dataset.youtube_videos_staging \
  /Users/fernandonikolic/perception/scripts/youtube-backfill/metadata-backfill-output.ndjson
```

---

## Adding New Channels

### Step 1: Get Channel ID
```bash
# From channel URL like https://www.youtube.com/@ChannelHandle
curl -s "https://www.youtube.com/@ChannelHandle" | grep -o 'channel_id=[^"]*' | head -1
```

### Step 2: Verify Channel
```bash
# Check RSS feed returns correct channel name
curl -s "https://www.youtube.com/feeds/videos.xml?channel_id=UC_CHANNEL_ID" | grep -o "<title>[^<]*</title>" | head -1
```

### Step 3: Add to Config
Edit `/Users/fernandonikolic/perception/scripts/youtube-backfill/bitcoin-focused-channels.json`:
```json
{
  "name": "Channel Name",
  "channelId": "UC_CHANNEL_ID",
  "handle": "@ChannelHandle",
  "category": "Conference",  // or "Podcast"
  "focus": "Bitcoin"
}
```

### Step 4: Run Backfill
The script will automatically detect new channels and only fetch videos not already in the output file.

---

## Output Files

| File | Purpose |
|------|---------|
| `metadata-backfill-output.ndjson` | Main output file (NDJSON for BigQuery) |
| `metadata-backfill-progress.json` | Progress tracking (processed channels/URLs) |
| `metadata-backfill.log` | Detailed execution log |
| `wbd-backfill.ndjson` | What Bitcoin Did separate backfill |
| `pre-2020-backfill.ndjson` | Historical videos before 2020 |

---

## API Quota Considerations

### YouTube Data API Quotas
- **Daily limit**: 10,000 units
- **PlaylistItems.list**: 1 unit per call (50 videos per call)
- **Videos.list**: 1 unit per call (50 videos per call)
- **Channels.list**: 1 unit per call

### Estimated Usage Per Channel
- Average channel: ~200 videos = ~8 API calls = ~8 units
- Large channel (3000 videos): ~120 API calls = ~120 units

### Full Backfill Estimate
- 24 channels × ~50 units average = ~1,200 units
- Well within daily quota

---

## Monitoring Queries

### Total Videos by Category
```sql
SELECT
  Outlet_Category,
  COUNT(*) as videos,
  MIN(Date) as earliest,
  MAX(Date) as latest
FROM `triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging`
GROUP BY Outlet_Category
```

### Videos by Channel
```sql
SELECT
  Outlet,
  Outlet_Category,
  COUNT(*) as videos
FROM `triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging`
GROUP BY Outlet, Outlet_Category
ORDER BY videos DESC
```

### Check for Duplicates
```sql
SELECT URL, COUNT(*) as cnt
FROM `triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging`
GROUP BY URL
HAVING cnt > 1
```

---

## Related Documentation

- [YouTube Video Enrichment](/docs/data-pipeline/YOUTUBE_VIDEO_ENRICHMENT.md) - AI enrichment process
- [YouTube Enrichment Prompt](/docs/data-pipeline/YOUTUBE_ENRICHMENT_PROMPT.md) - Execution prompts
