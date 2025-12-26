# Trends System Documentation

**Last Updated:** December 2, 2025
**Current Version:** 4.0 (Embeddings-Based Deduplication)

---

## Quick Links

### Core Documentation
- **[Embeddings Deduplication V4.0](./TRENDS_EMBEDDINGS_DEDUPLICATION_DEC_2025.md)** - Current production system (LLM-powered)
- **[Deduplication System V3.0](./TRENDS_DEDUPLICATION_V3_UPDATE_LOGIC.md)** - UPDATE logic (still used for /extract)
- **[API Reference](../api/TRENDS_API_REFERENCE.md)** - API endpoints, parameters, and examples
- **[Database Schema](../../data/schemas/ai_trends_tracking_schema.md)** - BigQuery table schema and field definitions

### Legacy Documentation
- **[V2.0 Consolidation](./TRENDS_CONSOLIDATION_DEPLOYED.md)** - Previous deduplication approach
- **[V1.0 Deduplication](../duplicate-trends-fix/DEDUPLICATION_SYSTEM.md)** - Original system

---

## System Overview

The Trends System extracts, deduplicates, and tracks Bitcoin-related trends from news articles using GPT-4o-mini and intelligent similarity matching.

### Key Features (V4.0)

✅ **Embeddings-Based Deduplication** - LLM-powered semantic similarity (65% threshold)
✅ **UPDATE Logic** - New articles merged into existing trends (not duplicated)
✅ **Semantic Matching** - Uses OpenAI text-embedding-3-small for meaning-based similarity
✅ **Organic Growth** - Trends grow from 1 → 100+ articles naturally
✅ **No Duplicate Notifications** - Slack alerts only for genuinely new trends
✅ **Real-time Tracking** - Trends update immediately when new articles found
✅ **Fallback Support** - Falls back to keyword-based if embeddings fail

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Data Sources                               │
│  BigQuery: all_channels_data (Bitcoin news articles)         │
└─────────────────────┬────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────────────┐
│                 /extract Endpoint                             │
│  1. Fetch last 24h articles (200 max)                        │
│  2. Send to GPT-4o-mini                                      │
│  3. Extract 6-10 trends                                      │
│  4. Compare vs existing trends (7 days)                      │
│  5. UPDATE (≥55% match) or INSERT (<55% match)               │
└─────────────────────┬────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────────────┐
│              BigQuery Storage                                 │
│  Table: ai_trends_tracking                                   │
│  - Partitioned by DATE(generated_at)                         │
│  - Clustered by signal_strength, article_count               │
└─────────────────────┬────────────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
┌──────────────────┐      ┌──────────────────────┐
│  /trends API     │      │  Slack Notifications │
│  (Frontend)      │      │  (Cloud Scheduler)   │
└──────────────────┘      └──────────────────────┘
```

---

## Quick Start

### Run Trend Extraction

```bash
curl -X POST https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract
```

**Expected Output:**
```json
{
  "status": "success",
  "message": "Processed 7 trends from 200 articles (1 new, 6 updated)",
  "meta": {
    "trendsCreated": 1,
    "trendsUpdated": 6,
    "similarityThreshold": 0.55
  }
}
```

### Get Today's Trends

```bash
TODAY=$(date +%Y-%m-%d)
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?date=$TODAY"
```

### Check Deduplication

```sql
-- Run in BigQuery console
SELECT
  title,
  article_count,
  update_count,
  TIMESTAMP_DIFF(CURRENT_TIMESTAMP(), last_updated, MINUTE) as mins_ago
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE update_count > 0
ORDER BY update_count DESC
LIMIT 10;
```

---

## How It Works

### 1. Article Collection
- Fetches last 24 hours of Bitcoin news from BigQuery
- Sources: CoinDesk, Cointelegraph, Crypto News, X/Twitter, etc.
- Limit: 200 most recent articles

### 2. Trend Extraction
- Sends articles to GPT-4o-mini
- Prompt asks for 6-10 specific, actionable trends
- Returns: title, summary, highlights, categories, articles

### 3. Deduplication Check
For each extracted trend:
```javascript
for (const existingTrend of last7DaysTrends) {
  const similarity = calculateImprovedSimilarity(newTitle, existingTrend.title);

  if (similarity >= 0.55) {
    // MATCH FOUND → UPDATE
    await updateTrendInBigQuery(existingTrend, newArticles);
    // Merges articles, increments update_count
  }
}

if (noMatchFound) {
  // GENUINELY NEW → INSERT
  await storeTrendInBigQuery(newTrend);
  // Creates new trend_id, sends Slack notification
}
```

### 4. Similarity Calculation

**Formula:** `similarity = (jaccard × 0.25) + (entity_score × 0.75)`

**Signals Used:**
- Companies (JPMorgan, MicroStrategy, Coinbase)
- People (Trump, Saylor, Musk)
- Numbers ($1.7B, 100%, 5,000 BTC) - fuzzy matching
- Actions (acquire, surge, predict, launch)
- Coins (Bitcoin, BTC, Ethereum)

**Example:**
- "MicroStrategy Acquires 5,000 BTC for $432 Million"
- "Saylor's Strategy Buys 5,268 Bitcoin Worth $430M"
- **Similarity:** 69% → **UPDATE** ✅

---

## Configuration

### Environment Variables

```bash
# Cloud Run service
OPENAI_API_KEY_V2=sk-proj-...  # OpenAI API key for GPT-4o-mini
```

### Tunable Parameters

Located in `/functions/btc-trends-ui-compatible.js`:

| Parameter | Current Value | Description |
|-----------|--------------|-------------|
| `SIMILARITY_THRESHOLD` | 0.55 | Match threshold (higher = stricter) |
| Trend count | 6-10 | Number of trends to extract |
| Article limit | 200 | Max articles to analyze |
| Time window | 24 hours | Article freshness window |
| Existing trends | 7 days | How far back to check for matches |

---

## Deployment

### Deploy Updated Code

```bash
cd /Users/fernandonikolic/perception/functions
./deploy-ui-compatible-service.sh
```

**Deployment Details:**
- **Service:** btcpapifunction3-1-final
- **Region:** us-central1
- **Memory:** 4Gi
- **CPU:** 2 cores
- **Timeout:** 540s (9 minutes)
- **Build Time:** ~2-3 minutes

### Verify Deployment

```bash
# Health check
curl https://btcpapifunction3-1-final-45998414364.us-central1.run.app/

# Test extraction
curl -X POST https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract
```

---

## Monitoring

### Key Metrics to Track

1. **Deduplication Rate**
   ```sql
   SELECT
     COUNT(*) as total_trends,
     COUNTIF(update_count > 0) as updated_trends,
     SAFE_DIVIDE(COUNTIF(update_count > 0), COUNT(*)) as update_rate
   FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
   WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY);
   ```

2. **Most Active Trends**
   ```sql
   SELECT title, article_count, update_count
   FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
   WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
   ORDER BY update_count DESC
   LIMIT 10;
   ```

3. **Duplicate Detection**
   ```sql
   SELECT title, COUNT(*) as dupes
   FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
   WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
   GROUP BY title
   HAVING dupes > 1;
   ```

### Cloud Run Logs

```bash
# View recent logs
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json \
gcloud logging read \
  "resource.type=cloud_run_revision AND resource.labels.service_name=btcpapifunction3-1-final" \
  --limit=50 \
  --freshness=1h
```

Look for:
- `✅ MATCH FOUND` - Successful deduplication
- `🆕 NO MATCH` - New trend created
- `🔄 [UPDATE]` - Trend updated with new articles
- `💾 [INSERT]` - New trend stored

---

## Troubleshooting

### Problem: Trends Still Duplicating

**Symptoms:** Multiple similar trends in database

**Solution:**
1. Check similarity threshold is 0.55 (not too low)
2. Verify entity extraction is working
3. Run manual consolidation script:
   ```bash
   node /Users/fernandonikolic/perception/functions/consolidate-with-improved-similarity.cjs
   ```

### Problem: No Trends Being Created

**Symptoms:** trendsCreated = 0 for multiple runs

**Solution:**
1. Check if threshold is too low (matching everything)
2. Verify GPT-4o-mini is returning trends
3. Check article data is fresh (< 24 hours old)

### Problem: "0 sources" on Frontend

**Symptoms:** Trends show "0 sources" in UI

**Root Cause:** Frontend filters out articles > 48 hours old, but backend fetches 7 days

**Solution:** (Phase 2 - Planned)
- Move article filtering to backend
- Or expand frontend filter to 7 days

---

## Performance

### Costs

| Component | Cost | Frequency |
|-----------|------|-----------|
| GPT-4o-mini | ~$0.02 per extraction | Per /extract call |
| BigQuery INSERT | ~$0.01 per trend | 1-2 per extraction |
| BigQuery UPDATE | ~$0.001 per update | 6-8 per extraction |
| **Total per extraction** | **~$0.04** | **Every 15-30 min** |
| **Monthly (3K extractions)** | **~$120** | **Automated** |

### Latency

| Operation | Time |
|-----------|------|
| Article fetch (BigQuery) | 2-5s |
| GPT-4o-mini extraction | 15-30s |
| Deduplication check | 1-2s |
| Database update | 1-2s |
| **Total /extract time** | **20-40s** |

---

## Roadmap

### ✅ Completed (V4.0 - December 2025)
- **Embeddings-based deduplication** - LLM-powered semantic similarity
- OpenAI text-embedding-3-small integration
- 65% similarity threshold (validated on real duplicates)
- Fallback to keyword-based matching

### ✅ Completed (V3.0 - November 2025)
- Improved similarity algorithm
- UPDATE logic for existing trends
- Deduplication at 55% threshold (for /extract)
- Organic trend growth tracking
- Slack notification deduplication

### 🚧 In Progress (Phase 2)
- Server-side article filtering
- Fix time window mismatch (48h vs 7d)

### 📋 Planned (Phase 3)
- Admin dashboard for manual merging
- Trend relationship visualization
- Automated consolidation scheduler
- A/B testing for different thresholds

---

## Contributing

### Code Locations

```
/functions/
  ├── btc-trends-ui-compatible.js     # Main service
  │   ├── Lines 90-396: Similarity algorithm
  │   ├── Lines 443-521: INSERT/UPDATE functions
  │   └── Lines 670-920: /extract endpoint
  │
  ├── deploy-ui-compatible-service.sh # Deployment script
  └── src/slack-trend-notifications.ts # Notification service

/docs/
  ├── trends/
  │   ├── TRENDS_DEDUPLICATION_V3_UPDATE_LOGIC.md
  │   └── README.md (this file)
  ├── api/
  │   └── TRENDS_API_REFERENCE.md
  └── duplicate-trends-fix/
      └── DEDUPLICATION_SYSTEM.md (legacy)

/data/
  └── schemas/
      └── ai_trends_tracking_schema.md
```

### Testing Changes

1. **Local syntax check:**
   ```bash
   node -c btc-trends-ui-compatible.js
   ```

2. **Deploy to staging:**
   ```bash
   ./deploy-ui-compatible-service.sh
   ```

3. **Test extraction:**
   ```bash
   curl -X POST https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract
   ```

4. **Verify in BigQuery:**
   ```sql
   SELECT * FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
   WHERE last_updated >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 5 MINUTE)
   ORDER BY last_updated DESC;
   ```

---

## Support

- **Issues:** Report bugs or request features
- **Documentation:** See links at top of this README
- **Logs:** Cloud Run console for `btcpapifunction3-1-final`
- **Database:** BigQuery console for `ai_trends_tracking` table

---

**Version:** 4.0
**Last Updated:** December 2, 2025
**Status:** ✅ Production Ready (Embeddings-Based Deduplication)
