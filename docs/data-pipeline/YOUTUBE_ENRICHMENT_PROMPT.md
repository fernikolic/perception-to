# YouTube Video Enrichment - Execution Prompt

Use the prompt below when you're ready to start the YouTube video enrichment process.

---

## Full Enrichment Prompt

```
I'm ready to enrich the YouTube videos in the staging table. Here's what I need:

## Current State
- BigQuery Table: `triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging`
- Total Videos: 14,910
- Videos needing enrichment: All rows where Sentiment IS NULL
- Cloud Run Service: https://youtube-summarizer-293695725781.us-central1.run.app

## Task
Run the YouTube video enrichment process to populate:
1. Content - AI-generated summary from video transcript
2. Sentiment - Positive/Negative/Neutral classification
3. Topic_1, Topic_2, Topic_3, Topic_4 - Extracted topic tags
4. All_Topics - Comma-separated topics
5. author_name - Speaker/host extraction
6. BPI - Bitcoin Perception Index score (derived from sentiment)

## Files
- Enrichment Script: /Users/fernandonikolic/perception/scripts/youtube-backfill/enrich-youtube-videos.cjs
- Documentation: /Users/fernandonikolic/perception/docs/data-pipeline/YOUTUBE_VIDEO_ENRICHMENT.md
- Progress File: /Users/fernandonikolic/perception/scripts/youtube-backfill/enrichment-progress.json
- Error Log: /Users/fernandonikolic/perception/scripts/youtube-backfill/enrichment-errors.json
- Main Log: /Users/fernandonikolic/perception/scripts/youtube-backfill/enrichment.log

## Execution Options

### Option A: Test Run (Recommended First)
Run a small batch of 100 videos to verify everything works:
- Estimated time: ~10 minutes
- Estimated cost: ~$0.20

### Option B: Medium Batch
Run 1,000 videos to validate quality at scale:
- Estimated time: ~1.5 hours
- Estimated cost: ~$2

### Option C: Full Enrichment
Process all 14,910 videos:
- Estimated time: ~25 hours
- Estimated cost: ~$15-30
- Can be run in background and resumed if interrupted

### Option D: Channel-Specific
Process only a specific channel (e.g., just "Bitcoin Conference")

## Commands to Run

1. First, verify the Cloud Run service is working:
   - Test with a single video URL

2. Check how many videos need enrichment:
   - Query BigQuery for COUNT where Sentiment IS NULL

3. Start the enrichment with chosen option:
   - Use the --limit flag for test/medium batches
   - Use --dry-run first if you want to preview without updating

4. Monitor progress:
   - Show last 30 lines of enrichment.log
   - Query BigQuery for enrichment progress

5. If interrupted, resume with --resume flag

## What I Want
Please start with [OPTION A/B/C/D - specify your choice] and:
1. Verify the Cloud Run service is responding
2. Run the enrichment process
3. Show me progress updates
4. Let me know when complete or if any issues arise

## Additional Instructions
- Run in background if doing full enrichment
- Save progress frequently so we can resume if needed
- Alert me if error rate exceeds 5%
- Provide a summary when complete showing sentiment distribution and sample results
```

---

## Quick Start Commands

If you just want to run the enrichment without the full prompt:

### Test Run (100 videos)
```
Start YouTube video enrichment with a test batch of 100 videos.
Script: /Users/fernandonikolic/perception/scripts/youtube-backfill/enrich-youtube-videos.cjs
Run with --limit=100 flag and monitor progress.
```

### Resume Interrupted Run
```
Resume the YouTube video enrichment process from where it left off.
Script: /Users/fernandonikolic/perception/scripts/youtube-backfill/enrich-youtube-videos.cjs
Run with --resume flag.
Check enrichment-progress.json for current state.
```

### Check Status
```
Check the status of YouTube video enrichment:
1. How many videos have been enriched (Sentiment IS NOT NULL)?
2. How many still pending (Sentiment IS NULL)?
3. Show last 20 lines of enrichment.log
4. Show any errors from enrichment-errors.json
```

---

## Monitoring Queries

### Progress Check
```sql
SELECT
  COUNTIF(Sentiment IS NOT NULL) as enriched,
  COUNTIF(Sentiment IS NULL) as pending,
  ROUND(COUNTIF(Sentiment IS NOT NULL) * 100.0 / COUNT(*), 2) as percent_complete
FROM `triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging`
```

### Sentiment Distribution
```sql
SELECT
  Sentiment,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM `triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging`
WHERE Sentiment IS NOT NULL
GROUP BY Sentiment
ORDER BY count DESC
```

### Recent Enrichments
```sql
SELECT Title, Outlet, Sentiment, Topic_1, Topic_2, author_name
FROM `triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging`
WHERE Sentiment IS NOT NULL
ORDER BY Date DESC
LIMIT 10
```

### Enrichment by Channel
```sql
SELECT
  Outlet,
  COUNTIF(Sentiment IS NOT NULL) as enriched,
  COUNTIF(Sentiment IS NULL) as pending
FROM `triple-upgrade-245423.btcp_main_dataset.youtube_videos_staging`
GROUP BY Outlet
ORDER BY pending DESC
```
