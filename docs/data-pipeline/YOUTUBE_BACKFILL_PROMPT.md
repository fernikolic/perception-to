# YouTube Metadata Backfill - Execution Prompts

Use these prompts when you need to backfill YouTube video metadata from channels.

---

## Prompt: Backfill Conference Channels Only

```
I need to backfill YouTube video metadata for CONFERENCE channels only.

## Context
- YouTube API Key: AIzaSyC0e9iFEeZHsSBsUSGfzNiJ2W2kMtQYoXU (stored in GCP as YOUTUBE_API_KEY)
- Config file: /Users/fernandonikolic/perception/scripts/youtube-backfill/bitcoin-focused-channels.json
- BigQuery table: triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging

## Conference Channels (12 total)
1. Bitcoin Conference
2. BTC Prague
3. Adopting Bitcoin
4. TABConf
5. bitcoin++
6. Plan B Lugano
7. FREE Madeira / Bitcoin Atlantis
8. Africa Bitcoin Conference
9. Surfin' Bitcoin
10. Unconfiscatable
11. Bitcoin Events
12. Mining Disrupt

## Task
1. Create/modify the backfill script to ONLY process conference channels (filter by category: "Conference")
2. Fetch ALL videos from each channel (no date cutoff)
3. Skip videos shorter than 2 minutes
4. Save to NDJSON file
5. Upload to BigQuery staging table

## Data to Capture
- Date, Title, Content (description), URL, Outlet, Image_URL, Outlet_Category
- video_id, duration_seconds, view_count, like_count
- Leave NULL: Sentiment, Topics, author_name, BPI (for AI enrichment later)

## Expected Output
- Approximately 3,500-4,000 conference videos
- NDJSON file ready for BigQuery upload

Please proceed with the backfill and show me progress updates.
```

---

## Prompt: Backfill Podcast Channels Only

```
I need to backfill YouTube video metadata for PODCAST channels only.

## Context
- YouTube API Key: AIzaSyC0e9iFEeZHsSBsUSGfzNiJ2W2kMtQYoXU
- Config file: /Users/fernandonikolic/perception/scripts/youtube-backfill/bitcoin-focused-channels.json
- BigQuery table: triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging

## Podcast Channels (12 total)
1. What Bitcoin Did
2. Stephan Livera Podcast
3. Bitcoin Audible
4. TFTC
5. Simply Bitcoin
6. The Bitcoin Layer
7. Swan Bitcoin
8. Robert Breedlove
9. Natalie Brunell
10. Bitcoin Sessions
11. Bitcoin Unchained
12. Bitcoin Magazine

## Task
1. Create/modify the backfill script to ONLY process podcast channels (filter by category: "Podcast")
2. Fetch ALL videos from each channel (no date cutoff)
3. Skip videos shorter than 2 minutes
4. Save to NDJSON file
5. Upload to BigQuery staging table

## Expected Output
- Approximately 10,000-12,000 podcast videos
- NDJSON file ready for BigQuery upload

Please proceed with the backfill and show me progress updates.
```

---

## Prompt: Add New Channel(s)

```
I need to add new YouTube channel(s) to the backfill system.

## New Channel(s) to Add
[List the channel names and/or URLs here]

## Tasks
1. Get the channel ID from the YouTube URL/handle
2. Verify the channel ID returns the correct channel name
3. Add the channel to the config file: /Users/fernandonikolic/perception/scripts/youtube-backfill/bitcoin-focused-channels.json
4. Run the backfill for just the new channel(s)
5. Upload the new videos to BigQuery staging table

## Channel Details to Determine
- Channel ID (UC...)
- Handle (@...)
- Category (Conference or Podcast)
- Focus (Bitcoin, Stablecoins, etc.)

Please verify each channel and add them to the system.
```

---

## Prompt: Check Current Backfill Status

```
Check the current status of the YouTube video backfill:

1. How many total videos are in the staging table?
   - Breakdown by Outlet_Category (Conference vs Podcast)
   - Breakdown by individual Outlet/channel

2. What's the date range of videos?
   - Earliest video
   - Most recent video

3. Are there any duplicate URLs?

4. Which channels have the most/least videos?

## BigQuery Table
triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging

## Queries to Run
- Total count by category
- Count by channel
- Date range
- Duplicate check
```

---

## Prompt: Refresh/Update Existing Channels

```
I need to refresh the YouTube backfill to capture any NEW videos that have been uploaded since the last backfill.

## Context
- The staging table already has ~14,910 videos
- Some channels may have uploaded new videos since the initial backfill
- We only want to add NEW videos (not duplicate existing ones)

## Task
1. Check the most recent video date in the staging table
2. Run the backfill script with --resume flag (it will skip already-processed URLs)
3. Upload only the new videos to BigQuery
4. Report how many new videos were added per channel

## Files
- Script: /Users/fernandonikolic/perception/scripts/youtube-backfill/backfill-metadata-only.cjs
- Config: /Users/fernandonikolic/perception/scripts/youtube-backfill/bitcoin-focused-channels.json
- Progress: /Users/fernandonikolic/perception/scripts/youtube-backfill/metadata-backfill-progress.json
```

---

## Quick Commands Reference

### Run Full Backfill
```bash
cd /Users/fernandonikolic/perception/scripts/youtube-backfill

YOUTUBE_API_KEY="AIzaSyC0e9iFEeZHsSBsUSGfzNiJ2W2kMtQYoXU" \
node backfill-metadata-only.cjs
```

### Resume Backfill
```bash
YOUTUBE_API_KEY="AIzaSyC0e9iFEeZHsSBsUSGfzNiJ2W2kMtQYoXU" \
node backfill-metadata-only.cjs --resume
```

### Upload to BigQuery
```bash
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
bq load \
  --source_format=NEWLINE_DELIMITED_JSON \
  --autodetect \
  triple-upgrade-245423:btcp_main_dataset.youtube_videos_staging \
  ./metadata-backfill-output.ndjson
```

### Check Video Count
```bash
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
bq query --use_legacy_sql=false "
SELECT Outlet_Category, COUNT(*) as videos
FROM \`triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging\`
GROUP BY Outlet_Category
"
```

### Get Channel ID from Handle
```bash
curl -s "https://www.youtube.com/@ChannelHandle" | grep -o 'channel_id=[^"]*' | head -1
```

### Verify Channel ID
```bash
curl -s "https://www.youtube.com/feeds/videos.xml?channel_id=UC_CHANNEL_ID" | grep -o "<title>[^<]*</title>" | head -1
```
