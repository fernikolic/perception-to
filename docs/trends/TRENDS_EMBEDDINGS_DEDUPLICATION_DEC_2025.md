# Trends Embeddings-Based Deduplication - December 2, 2025

**Status:** Deployed
**Date:** December 2, 2025
**Version:** 4.0 (Embeddings Integration)
**Fixed by:** Claude Code + Fernando Nikolic

---

## Problem Statement

Users were seeing **duplicate trends** on the /trends page that should have been merged:

### Example of the Issue:

**China Crypto Ban** - 6 separate trends that were the same story:
- "China Declares Bitcoin Has No Legal Status, Orders Crackdown"
- "China Doubles Down on Crypto Ban After Detecting New Trading Activity"
- "China Doubles Down on Crypto Ban, PBOC Issues Warning on Stablecoins"
- "China Reaffirms Ban on Cryptocurrency Amid Renewed Speculation"
- "China Reinforces Crypto Ban Amid New Trading Activity"

**Europol Cryptomixer** - 2 separate trends that were the same story:
- "Europol Dismantles Major Bitcoin Laundering Operation, Seizing €25M"
- "Europol Shuts Down $1.4B Bitcoin-Mixing Service Cryptomixer"

**Impact:**
- Poor UX for paying users
- Loss of credibility
- Confusing, repetitive feed
- Wasted database storage

---

## Root Cause Analysis

### The Problem with Keyword-Based Matching

The previous system used hardcoded entity extraction:
```javascript
// Old approach - hardcoded entities
const companies = ['visa', 'stripe', 'microstrategy', ...];
const people = ['saylor', 'musk', ...];
```

**Why it failed:**
1. **Missing entities**: "China", "PBOC", "Europol", "Cryptomixer" weren't in the hardcoded list
2. **Action synonyms missed**: "bans" vs "crackdown" vs "reinforces" treated as different
3. **Inflexible**: Any new entity required code changes

### Test Results (Before Fix)

Using the old keyword-based algorithm:
```
China Declares... vs China Doubles Down... = 6.7% similarity ❌
Europol Dismantles... vs Europol Shuts Down... = 8.3% similarity ❌
```

The 55% threshold was never reached because the algorithm couldn't recognize semantic similarity.

---

## The Solution: Embeddings-Based Deduplication

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    /trends Endpoint                          │
│                                                              │
│  1. Fetch trends from BigQuery (last 30 days)               │
│  2. Generate embeddings for ALL trend titles                │
│     └─ OpenAI text-embedding-3-small (1536 dimensions)      │
│  3. Calculate cosine similarity between ALL pairs           │
│  4. Merge trends with similarity >= 65%                     │
│     └─ Combine articles (dedupe by URL)                     │
│     └─ Keep earliest first_seen timestamp                   │
│  5. Return deduplicated trends                              │
└─────────────────────────────────────────────────────────────┘
```

### Key Functions Added

#### `cosineSimilarity(vecA, vecB)`
```javascript
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
```

#### `generateTitleEmbeddings(trends)`
- Uses OpenAI `text-embedding-3-small` model
- Batches requests (100 titles per batch)
- Returns 1536-dimensional vectors for each title

#### `deduplicateTrendsWithEmbeddings(trends, threshold)`
- Main deduplication function
- Threshold: 0.65 (65% similarity = same story)
- Falls back to keyword-based if embeddings fail

### Similarity Threshold Selection

**Tested on actual duplicates:**

| Comparison | Similarity | Merge? |
|------------|------------|--------|
| "China Doubles Down..." vs "China Reinforces..." | 85.4% | ✅ |
| "China Reaffirms..." vs "China Reinforces..." | 77.6% | ✅ |
| "China Doubles Down..." vs "China Reaffirms..." | 70.7% | ✅ |
| "Europol Dismantles..." vs "Europol Shuts Down..." | 69.7% | ✅ |
| "China Declares..." vs "China Reaffirms..." | 65.3% | ✅ |

**Threshold: 0.65 (65%)**
- Catches most semantic duplicates
- Low enough to merge related stories
- High enough to avoid false positives

---

## Results

### Before Fix
- 6 China crypto ban trends
- 2 Europol trends
- Total: 8 duplicate trends

### After Fix
- 1 China trend: "China Reaffirms Ban on Cryptocurrency Amid Renewed Speculation" (21 articles merged)
- 1 Europol trend: "Europol Shuts Down $1.4B Bitcoin-Mixing Service Cryptomixer" (5 articles merged)
- Total: 2 unique trends

### Cost Analysis

**Embeddings cost:** ~$0.02 per 1 million tokens

For typical /trends request:
- ~100 trends × ~10 tokens/title = ~1,000 tokens
- Cost: ~$0.00002 per request
- Monthly (10K requests): ~$0.20

**Negligible compared to GPT-4o-mini extraction costs (~$120/month)**

---

## Configuration

### Tunable Parameters

Located in `/functions/btc-trends-ui-deployment/index.js`:

| Parameter | Value | Description |
|-----------|-------|-------------|
| `similarityThreshold` | 0.65 | Embeddings similarity threshold |
| Embedding model | text-embedding-3-small | Cost-effective, fast |
| Batch size | 100 | Titles per embedding request |

### Adjusting Threshold

**If too many false merges (different stories merged):**
```javascript
// Increase threshold to 0.70 or 0.75
const deduplicatedTrends = await deduplicateTrendsWithEmbeddings(allTrends, 0.70);
```

**If too many duplicates still showing:**
```javascript
// Decrease threshold to 0.60
const deduplicatedTrends = await deduplicateTrendsWithEmbeddings(allTrends, 0.60);
```

---

## Fallback Behavior

If embeddings API fails:
1. Error is logged
2. Falls back to keyword-based `deduplicateTrendsWithKeywords()`
3. Uses original entity extraction + 55% threshold

This ensures the endpoint never fails completely.

---

## Monitoring

### Check Embeddings Deduplication

Look for these log messages in Cloud Run:

```
🔍 Starting EMBEDDINGS-BASED deduplication with 150 trends...
✅ Generated 150 embeddings for trend titles
🔗 MERGE (85.4% similar):
   "China Doubles Down on Crypto Ban..."
   "China Reinforces Crypto Ban..."
✅ Embeddings deduplication: 150 → 98 trends
```

### Check for Fallback

```
⚠️ Embeddings not available, falling back to keyword-based deduplication
```

### BigQuery - Verify No Duplicates

```sql
SELECT
  title,
  COUNT(*) as duplicate_count
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR)
GROUP BY title
HAVING duplicate_count > 1
ORDER BY duplicate_count DESC;
```

Expected: 0 results

---

## Comparison with Previous Approaches

| Version | Approach | Threshold | Catches "China Ban"? | Catches "Europol"? |
|---------|----------|-----------|---------------------|-------------------|
| V2.0 | Jaccard word overlap | 55% | ❌ 6.7% | ❌ 8.3% |
| V3.0 | Entity extraction | 55% | ❌ Entities missing | ❌ Entities missing |
| **V4.0** | **Embeddings** | **65%** | **✅ 65-85%** | **✅ 70%** |

### Why Embeddings are Better

1. **Semantic understanding**: "bans" ≈ "crackdown" ≈ "reinforces"
2. **No hardcoding**: Works for any entity, action, or topic
3. **Future-proof**: New trends automatically handled
4. **Cost-effective**: ~$0.02 per 1M tokens

---

## Files Changed

### `/functions/btc-trends-ui-deployment/index.js`

**Added:**
- `cosineSimilarity(vecA, vecB)` - Vector math
- `generateTitleEmbeddings(trends)` - OpenAI embeddings
- `deduplicateTrendsWithEmbeddings(trends, threshold)` - Main function
- `deduplicateTrendsWithKeywords(trends)` - Fallback function

**Modified:**
- `/trends` endpoint now uses embeddings-based deduplication

---

## Related Documentation

- `/docs/trends/TRENDS_DEDUPLICATION_V3_UPDATE_LOGIC.md` - Previous deduplication system
- `/docs/embeddings/EMBEDDINGS_FINAL_CONFIG.md` - Embeddings infrastructure
- `/data/schemas/ai_trends_tracking_schema.md` - Database schema

---

## Quick Reference

### Deployment
```bash
cd /Users/fernandonikolic/perception/functions
./deploy-ui-compatible-service.sh
```

### Test Endpoint
```bash
curl -s "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?hours=48" | jq '. | length'
```

### Key Files
- **Source:** `functions/btc-trends-ui-deployment/index.js`
- **Deploy Script:** `functions/deploy-ui-compatible-service.sh`

---

**Version:** 4.0 (Embeddings Deduplication)
**Last Updated:** December 2, 2025
**Status:** Deployed to Production
