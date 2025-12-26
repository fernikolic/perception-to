# Trends Update Architecture - Blue-Green Pattern

## Problem
Current system has issues with:
1. Duplicate trends being created for the same story
2. New articles for existing trends not being added to those trends
3. BigQuery streaming buffer prevents UPDATE/DELETE operations
4. Runtime deduplication is a band-aid, not a real solution

## Solution: Staging Table with Atomic Swap

### Database Tables

**Production Table** (Read by API):
- `btcp_main_dataset.ai_trends_tracking`

**Staging Table** (Updated by scheduler):
- `btcp_main_dataset.ai_trends_tracking_staging`

### Update Flow

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Fetch New Articles (last 24 hours)                 │
│ - Query all_channels_data WHERE Date >= NOW() - 24h        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Load Existing Trends from PRODUCTION               │
│ - Copy ai_trends_tracking → ai_trends_tracking_staging     │
│ - This becomes our working copy                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Match Articles to Existing Trends                  │
│ For each new article:                                       │
│   - Check title similarity against existing trends          │
│   - If similarity >= 0.55 → ADD to that trend's articles   │
│   - If no match → Mark for new trend extraction            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Extract New Trends (OpenAI)                        │
│ - Only process unmatched articles                          │
│ - OpenAI extracts trends from new stories                  │
│ - Add new trends to staging table                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 5: Consolidate Duplicates in Staging                  │
│ - Run deduplication algorithm on staging table             │
│ - Merge similar trends (similarity >= 0.55)                │
│ - Consolidate articles                                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 6: Atomic Swap (Blue-Green Deployment)                │
│ - Rename ai_trends_tracking → ai_trends_tracking_old       │
│ - Rename ai_trends_tracking_staging → ai_trends_tracking   │
│ - Drop ai_trends_tracking_old                              │
│ - API now reads from updated table (zero downtime)         │
└─────────────────────────────────────────────────────────────┘
```

### Benefits

1. **Incremental Updates**: New articles are added to existing trends
2. **No Duplicates**: Consolidation happens before production swap
3. **No Streaming Buffer Issues**: We only INSERT into staging, never UPDATE
4. **Atomic Updates**: API always reads from complete, consistent table
5. **Zero Downtime**: Table rename is instantaneous
6. **Rollback Possible**: Keep old table for 24h as backup

### Implementation

```javascript
async function updateTrendsWithBlueGreen() {
  // 1. Copy production → staging
  await copyTableToStaging();

  // 2. Fetch new articles
  const newArticles = await fetchNewArticles(24);

  // 3. Match articles to existing trends
  const { matched, unmatched } = await matchArticlesToTrends(newArticles);

  // 4. Update existing trends with new articles
  await addArticlesToTrendsInStaging(matched);

  // 5. Extract new trends from unmatched articles
  const newTrends = await extractNewTrends(unmatched);

  // 6. Insert new trends into staging
  await insertTrendsIntoStaging(newTrends);

  // 7. Consolidate duplicates in staging
  await consolidateDuplicatesInStaging();

  // 8. Atomic swap: staging → production
  await atomicSwapTables();
}
```

### Scheduler Configuration

Run every 30 minutes:
```bash
*/30 * * * * # Every 30 minutes
```

This ensures:
- Fresh trends every 30 mins
- Existing trends grow as more articles are published
- Duplicates are eliminated before going live
- No BigQuery streaming buffer conflicts
