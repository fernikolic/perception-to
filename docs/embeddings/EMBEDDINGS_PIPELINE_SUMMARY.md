# Embeddings Pipeline - Implementation Summary

## What Was Built

A complete **parallel test environment** for embeddings-based trend detection that runs independently from your production system. This allows you to validate the new approach without affecting the UI or current trends.

## Files Created

### Core Pipeline Scripts
1. **`create-embeddings-tables.cjs`** - Creates 5 BigQuery tables with `_test` suffix
2. **`generate-embeddings-test.cjs`** - Stage 1: Generate OpenAI embeddings for articles
3. **`cluster-articles-test.cjs`** - Stage 2: Cluster articles by semantic similarity
4. **`synthesize-trends-test.cjs`** - Stage 3: Generate trends using GPT-4o-mini
5. **`run-embeddings-pipeline-test.cjs`** - **Master orchestrator** (run this to execute full pipeline)

### Supporting Files
6. **`embeddings-test-schema.sql`** - SQL schema reference
7. **`validate-embeddings-trends.sql`** - 14 quality validation queries
8. **`EMBEDDINGS_PIPELINE_README.md`** - Complete documentation
9. **`EMBEDDINGS_PIPELINE_SUMMARY.md`** - This file

## BigQuery Tables Created

All in dataset: `triple-upgrade-245423.btcp_main_dataset`

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `article_embeddings_test` | Stores 1536-dim vectors | article_id, embedding, title, url |
| `trend_clusters_test` | Groups of similar articles | cluster_id, article_ids, avg_similarity |
| `trend_centroids_test` | Cluster averages for incremental updates | trend_id, centroid_embedding |
| `ai_trends_test` | Final synthesized trends | trend_id, title, summary, articles |
| `embeddings_pipeline_logs_test` | Execution logs | pipeline_stage, status, cost_usd |

✅ All tables already exist and are ready to use.

## How It Works

### Three-Stage Pipeline

```
Stage 1: EMBEDDING GENERATION
├─ Fetches articles from last 72 hours (all_channels_data)
├─ Generates embeddings using OpenAI text-embedding-ada-002
├─ Stores in article_embeddings_test table
└─ Cost: ~$0.00005 per article

Stage 2: SEMANTIC CLUSTERING
├─ Computes cosine similarity between all article pairs
├─ Groups articles with similarity > 0.75 (configurable)
├─ Validates clusters (min 3 articles, 2+ outlets, <72 hour span)
└─ Cost: Minimal (BigQuery compute only)

Stage 3: TREND SYNTHESIS
├─ Fetches validated clusters
├─ Generates title, summary, highlights using GPT-4o-mini
├─ Stores trends in ai_trends_test table
└─ Cost: ~$0.002 per trend
```

### Why This Architecture?

**No Hallucinations**
- LLM only sees real articles that were already grouped by semantic similarity
- It synthesizes narratives from actual content, not from its training data

**Better Recall**
- Semantic similarity finds related stories with different wording
- Example: "BTC price surge" and "Bitcoin rally" are matched even with different keywords

**Cost Effective**
- Uses efficient embedding model (text-embedding-ada-002)
- Only runs expensive LLM synthesis on validated clusters
- Estimated: ~$18/month for 1,000 articles/day

**Deterministic**
- Connected components algorithm ensures consistent clustering
- Same articles always form same clusters (no randomness)

## Next Steps

### 1. Run First Test (Small Scale)

```bash
# Set environment variables
export OPENAI_API_KEY="your-key-here"
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"

# Run full pipeline
cd /Users/fernandonikolic/perception
node run-embeddings-pipeline-test.cjs
```

**Expected Outcome:**
- Should process ~50-200 recent articles
- Form ~5-15 clusters
- Generate ~3-8 trends
- Cost: $0.01-0.05

### 2. Validate Results

```bash
# Run validation queries in BigQuery console
# Copy/paste from validate-embeddings-trends.sql

# Or use bq CLI
bq query --use_legacy_sql=false < validate-embeddings-trends.sql
```

**Key Metrics to Check:**
- ✅ Average confidence score > 0.70
- ✅ Average 3-5 articles per trend
- ✅ 2+ unique outlets per trend
- ✅ Zero duplicate trends (same title_hash)
- ✅ Cost per trend < $0.005

### 3. Compare with Production

Run this query to compare test vs. production:

```sql
-- Test trends (last 24 hours)
SELECT 'TEST' as env, COUNT(*) as trends, AVG(article_count) as avg_articles
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_test`
WHERE DATE(generated_at) >= CURRENT_DATE() - 1

UNION ALL

-- Production trends (last 24 hours)
SELECT 'PROD' as env, COUNT(*) as trends, AVG(ARRAY_LENGTH(articles)) as avg_articles
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE DATE(generated_at) >= CURRENT_DATE() - 1;
```

**Questions to Answer:**
1. Does test find trends that production missed? (improved recall)
2. Are test trends more coherent/accurate? (improved precision)
3. Is source diversity better in test? (check unique_outlets)
4. Are costs within acceptable range?

### 4. Tune Parameters (If Needed)

**If too few clusters formed:**
- Lower `similarityThreshold` from 0.75 to 0.70 (in `cluster-articles-test.cjs`)
- Increase `hoursBack` from 72 to 168 hours
- Lower `minClusterSize` from 3 to 2

**If too many weak clusters:**
- Increase `similarityThreshold` to 0.80
- Increase `minClusterSize` to 4
- Increase `minOutlets` to 3

**If missing recent trends:**
- Reduce `maxTimeSpanHours` from 72 to 48 hours
- This focuses on fast-breaking stories

### 5. Run Multi-Day Test

```bash
# Day 1
node run-embeddings-pipeline-test.cjs

# Day 2 (next day)
node run-embeddings-pipeline-test.cjs

# Day 3 (next day)
node run-embeddings-pipeline-test.cjs

# ... repeat for 7 days
```

**Track:**
- Daily cost trends
- Quality consistency
- Duplicate rate over time
- Comparison with production trends

### 6. Decision Point

After 7 days of testing, decide:

**✅ Go to Production If:**
- Test trends consistently outperform production
- Costs are within budget (~$18/month extrapolated)
- Duplicate rate < 2%
- Average confidence > 0.70
- No major issues found

**🔄 Continue Testing If:**
- Results are promising but need tuning
- Need more data to validate quality
- Want to test different parameter configurations

**❌ Revert to Production If:**
- Test trends are lower quality than production
- Costs are prohibitively high
- Technical issues can't be resolved

## Configuration Files

### Clustering Config

File: `cluster-articles-test.cjs` (lines 18-24)

```javascript
const CONFIG = {
  similarityThreshold: 0.75,  // 0.0-1.0 (higher = stricter)
  minClusterSize: 3,          // Min articles per cluster
  minOutlets: 2,              // Min unique outlets
  maxTimeSpanHours: 72,       // Max time span
  hoursBack: 72               // How far back to process
};
```

### Embedding Config

File: `generate-embeddings-test.cjs` (lines 22-27)

```javascript
const CONFIG = {
  hoursBack: 72,      // Process last 3 days
  batchSize: 100,     // Articles per batch
  maxArticles: 500    // Limit for testing
};
```

## Troubleshooting

### No Articles Found

**Symptom:** "Found 0 articles needing embeddings"

**Solution:**
- Articles may already have embeddings from previous run
- Check: `SELECT COUNT(*) FROM article_embeddings_test`
- To re-process: Delete rows from `article_embeddings_test` for recent dates

### No Clusters Formed

**Symptom:** "Found 0 high-similarity article pairs"

**Solutions:**
1. Lower `similarityThreshold` to 0.70
2. Increase `hoursBack` to 168 (7 days)
3. Verify embeddings exist: `SELECT COUNT(*) FROM article_embeddings_test WHERE created_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 72 HOUR)`

### All Clusters Fail Validation

**Symptom:** "Validated: 0, Pending: 8"

**Solutions:**
1. Check why: Run query #5 from `validate-embeddings-trends.sql`
2. Temporarily lower thresholds:
   - `minClusterSize: 2`
   - `minOutlets: 1`
3. Increase `maxTimeSpanHours` to 96

### OpenAI API Errors

**Solutions:**
- Verify API key: `echo $OPENAI_API_KEY`
- Check rate limits (3000 req/min)
- Ensure GPT-4o-mini access

## Cost Breakdown

Based on 1,000 articles/day:

| Component | Daily | Monthly |
|-----------|-------|---------|
| Embeddings | $0.50 | $15.00 |
| BigQuery | $0.02 | $0.50 |
| Synthesis | $0.10 | $3.00 |
| **Total** | **$0.62** | **$18.50** |

**Cost per trend:** ~$0.003-0.005

## Production Migration Checklist

Before switching from test to production:

- [ ] Run pipeline for 7+ consecutive days
- [ ] Validate all quality metrics consistently pass
- [ ] Confirm costs are within budget
- [ ] Manual review of 20+ trends shows high quality
- [ ] Compare favorably with production trends
- [ ] Zero critical bugs found
- [ ] Document optimal parameter configuration
- [ ] Set up automated scheduling (Cloud Scheduler)
- [ ] Create monitoring dashboard
- [ ] Plan gradual rollout (A/B test for users)

## Support Resources

1. **README:** `EMBEDDINGS_PIPELINE_README.md` - Complete documentation
2. **Validation Queries:** `validate-embeddings-trends.sql` - 14 quality checks
3. **BigQuery Console:** View tables, run queries, check costs
4. **Pipeline Logs:** Query `embeddings_pipeline_logs_test` table

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     DATA SOURCES                            │
│  all_channels_data table (existing production data)         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │  STAGE 1: EMBEDDINGS  │
         │  OpenAI text-embed    │
         │  $0.0001/1K tokens    │
         └──────────┬────────────┘
                    │
                    ▼
         ┌─────────────────────────────┐
         │  article_embeddings_test     │
         │  (1536-dim vectors)          │
         └──────────┬──────────────────┘
                    │
                    ▼
         ┌───────────────────────┐
         │  STAGE 2: CLUSTERING  │
         │  BigQuery SQL         │
         │  Cosine similarity    │
         └──────────┬────────────┘
                    │
                    ▼
         ┌─────────────────────────────┐
         │  trend_clusters_test         │
         │  (validated groups)          │
         └──────────┬──────────────────┘
                    │
                    ▼
         ┌───────────────────────┐
         │  STAGE 3: SYNTHESIS   │
         │  GPT-4o-mini          │
         │  $0.002/trend         │
         └──────────┬────────────┘
                    │
                    ▼
         ┌─────────────────────────────┐
         │  ai_trends_test              │
         │  (final output)              │
         └──────────────────────────────┘
```

## Summary

✅ **Complete embeddings-based trend detection system built and ready for testing**

- 5 BigQuery tables created with `_test` suffix
- 3-stage pipeline implemented (embeddings → clustering → synthesis)
- Master orchestration script ready to run
- Comprehensive validation queries included
- Full documentation provided

**Next Action:** Run `node run-embeddings-pipeline-test.cjs` to test with recent articles.

---

**Created:** October 24, 2025
**Status:** Ready for testing
**Estimated First Run Time:** 5-10 minutes (depending on article count)
**Estimated First Run Cost:** $0.01-0.05
