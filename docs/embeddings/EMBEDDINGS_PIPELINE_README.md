# Embeddings-Based Trend Detection Pipeline

## Overview

This is a **parallel test environment** for improved trend detection using semantic similarity via OpenAI embeddings. It runs independently from the production system, allowing safe experimentation and validation.

### Architecture

**Two-Stage Pipeline:**
1. **Semantic Clustering** - Group articles by meaning, not keywords
2. **Narrative Synthesis** - Generate trends from validated clusters

**Key Benefits:**
- No hallucinations (LLM only sees real articles in clusters)
- Better recall (semantic similarity finds related stories with different wording)
- Cost-effective (~$18/month for 1,000 articles/day)
- Deterministic clustering (no randomness in grouping)

---

## Files Structure

### Database Schema
- `embeddings-test-schema.sql` - SQL schema definition (reference)
- `create-embeddings-tables.cjs` - Script to create BigQuery tables

**Tables Created:**
- `article_embeddings_test` - Stores 1536-dimensional vectors for each article
- `trend_clusters_test` - Groups of semantically similar articles
- `trend_centroids_test` - Average embeddings for incremental updates
- `ai_trends_test` - Final synthesized trends (mirrors production format)
- `embeddings_pipeline_logs_test` - Execution logs and metrics

### Pipeline Scripts

**Individual Stages:**
1. `generate-embeddings-test.cjs` - Stage 1: Generate OpenAI embeddings
2. `cluster-articles-test.cjs` - Stage 2: Cluster by similarity
3. `synthesize-trends-test.cjs` - Stage 3: LLM synthesis with GPT-4o-mini

**Orchestration:**
- `run-embeddings-pipeline-test.cjs` - **Master script** - runs full pipeline

### Validation
- `validate-embeddings-trends.sql` - 14 quality assessment queries

---

## Quick Start

### Prerequisites

```bash
# Set OpenAI API key
export OPENAI_API_KEY="sk-..."
# or
export OPENAI_API_KEY_V2="sk-..."

# Set Google Cloud credentials
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
```

### Initial Setup (One-Time)

```bash
# Create BigQuery tables
node create-embeddings-tables.cjs
```

### Run Full Pipeline

```bash
# Run end-to-end: embeddings → clustering → synthesis
node run-embeddings-pipeline-test.cjs
```

**Expected Output:**
```
╔════════════════════════════════════════════════════════════════╗
║   Embeddings-Based Trend Detection Pipeline - Test Environment ║
╚════════════════════════════════════════════════════════════════╝

STAGE 1: EMBEDDING GENERATION
📊 Fetching articles from last 72 hours...
✅ Found 150 articles needing embeddings
🔄 Processing 150 articles...
✅ Successfully processed: 150
💰 Estimated cost: $0.0075

STAGE 2: SEMANTIC CLUSTERING
📊 Found 45 high-similarity article pairs
🔗 Forming clusters via connected components...
✅ Formed 8 preliminary clusters
   - Validated: 5
   - Pending: 3

STAGE 3: TREND SYNTHESIS
📊 Fetching validated clusters...
✅ Found 5 validated clusters ready for synthesis
🔄 Processing clusters with GPT-4o-mini...
✅ Successfully synthesized: 5 trends
💰 Estimated cost: $0.0100

PIPELINE SUMMARY
📊 Processing Stats:
   Articles embedded:    150
   Clusters created:     8
   Clusters validated:   5
   Trends synthesized:   5

💰 Cost Analysis:
   Total cost:           $0.0175
   Cost per trend:       $0.0035
```

### Run Individual Stages

```bash
# Stage 1: Generate embeddings only
node generate-embeddings-test.cjs

# Stage 2: Cluster existing embeddings
node cluster-articles-test.cjs

# Stage 3: Synthesize trends from clusters
node synthesize-trends-test.cjs
```

---

## Configuration

### Clustering Parameters

Edit `cluster-articles-test.cjs`:

```javascript
const CONFIG = {
  similarityThreshold: 0.75,  // 0.0-1.0 (higher = stricter matching)
  minClusterSize: 3,          // Minimum articles per cluster
  minOutlets: 2,              // Minimum unique outlets required
  maxTimeSpanHours: 72,       // Maximum time span for cluster (hours)
  hoursBack: 72               // How far back to process articles
};
```

**Tuning Guide:**
- **Low recall (missing trends)?** Lower `similarityThreshold` to 0.70
- **Too many weak clusters?** Increase `minClusterSize` to 4 or 5
- **Want faster-moving trends?** Reduce `maxTimeSpanHours` to 48
- **Need more data?** Increase `hoursBack` to 168 (7 days)

### Embedding Generation

Edit `generate-embeddings-test.cjs`:

```javascript
const CONFIG = {
  hoursBack: 72,      // Process last 3 days
  batchSize: 100,     // Articles per batch
  maxArticles: 500    // Limit for testing
};
```

---

## Validation & Quality Checks

### Run Validation Queries

```bash
# Copy queries to BigQuery console or use bq CLI
bq query --use_legacy_sql=false < validate-embeddings-trends.sql
```

### Key Metrics to Check

**1. Overall Health**
- Articles embedded vs. trends created ratio
- Average confidence scores (should be > 0.7)
- Average articles per trend (should be 3-5)

**2. Source Diversity**
- Trends should have 2+ unique outlets
- Check if any outlet dominates clusters

**3. Duplicate Detection**
- Run query #9 to find duplicate trends
- Should have zero duplicates with same title_hash

**4. Cost Analysis**
- Query #12 shows cost per trend
- Target: $0.002-0.005 per trend

**5. Cluster Validation**
- Query #4 shows why clusters fail validation
- Adjust CONFIG if too many pending clusters

---

## Cost Estimates

Based on 1,000 articles/day:

| Component | Unit Cost | Monthly Cost |
|-----------|-----------|--------------|
| Embeddings (text-embedding-ada-002) | $0.0001/1K tokens | ~$15.00 |
| Clustering (BigQuery) | Included in free tier | ~$0.50 |
| Synthesis (GPT-4o-mini) | $0.002/trend | ~$3.00 |
| **Total** | | **~$18.50** |

**Actual costs will vary based on:**
- Number of articles ingested
- Average article length
- Cluster validation rate
- Number of trends generated

---

## Monitoring

### Check Pipeline Logs

```sql
SELECT
  pipeline_stage,
  run_timestamp,
  trends_synthesized,
  execution_time_seconds,
  cost_usd,
  status,
  error_message
FROM `triple-upgrade-245423.btcp_main_dataset.embeddings_pipeline_logs_test`
ORDER BY run_timestamp DESC
LIMIT 10;
```

### View Latest Trends

```sql
SELECT
  title,
  article_count,
  signal_strength,
  confidence_score,
  categories,
  generated_at
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_test`
WHERE DATE(generated_at) = CURRENT_DATE()
ORDER BY generated_at DESC;
```

---

## Comparison with Production

### Side-by-Side Analysis

```sql
-- Test environment
SELECT 'TEST' as env, COUNT(*) as trends, AVG(article_count) as avg_articles
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_test`
WHERE DATE(generated_at) = CURRENT_DATE()

UNION ALL

-- Production
SELECT 'PROD' as env, COUNT(*) as trends, AVG(ARRAY_LENGTH(articles)) as avg_articles
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE DATE(generated_at) = CURRENT_DATE();
```

### Quality Metrics to Compare

| Metric | Production Target | Test Target |
|--------|------------------|-------------|
| Trends per day | 10-20 | 8-15 |
| Articles per trend | 3-5 | 3-5 |
| Unique outlets per trend | 2+ | 2+ |
| Confidence score | 0.65+ | 0.70+ |
| Duplicate rate | <5% | <2% |

---

## Troubleshooting

### No Clusters Formed

**Symptoms:** Stage 2 finds 0 high-similarity pairs

**Solutions:**
1. Check if embeddings were generated: `SELECT COUNT(*) FROM article_embeddings_test`
2. Lower `similarityThreshold` from 0.75 to 0.70
3. Increase `hoursBack` to get more articles
4. Verify embedding dimensions: `SELECT ARRAY_LENGTH(embedding) FROM article_embeddings_test LIMIT 1` (should be 1536)

### All Clusters Fail Validation

**Symptoms:** Stage 2 creates clusters but all marked as 'pending'

**Solutions:**
1. Check validation failures: Run query #5 from `validate-embeddings-trends.sql`
2. Adjust CONFIG parameters:
   - Lower `minClusterSize` to 2
   - Lower `minOutlets` to 1 (temporarily)
   - Increase `maxTimeSpanHours` to 96

### Synthesis Errors

**Symptoms:** Stage 3 fails with OpenAI API errors

**Solutions:**
1. Verify OpenAI API key: `echo $OPENAI_API_KEY`
2. Check rate limits (3000 requests/min)
3. Review error messages in logs table
4. Ensure GPT-4o-mini model access

### High Costs

**Symptoms:** Pipeline cost exceeds expectations

**Solutions:**
1. Run cost analysis query (#12)
2. Reduce `maxArticles` in embedding generation
3. Increase `similarityThreshold` to form fewer clusters
4. Check for duplicate embeddings being generated

---

## Next Steps

### After First Successful Run

1. **Review Trends Quality**
   ```bash
   # Run all validation queries
   bq query --use_legacy_sql=false < validate-embeddings-trends.sql
   ```

2. **Compare with Production**
   - Manually review 5-10 trends from test vs. production
   - Check for missed trends (false negatives)
   - Check for weak trends (false positives)

3. **Tune Parameters**
   - Adjust `similarityThreshold` based on cluster quality
   - Modify `minClusterSize` if needed
   - Test different time windows

4. **Cost Validation**
   - Confirm costs match estimates
   - Extrapolate to production scale
   - Identify optimization opportunities

### Before Production Migration

- [ ] Run pipeline for 7 consecutive days
- [ ] Achieve <2% duplicate rate
- [ ] Maintain average confidence >0.70
- [ ] Verify cost per trend <$0.005
- [ ] Compare favorably with production trends
- [ ] Document any parameter adjustments
- [ ] Set up automated scheduling (Cloud Scheduler)
- [ ] Create monitoring dashboards
- [ ] Plan gradual rollout strategy

---

## Scheduling (Future)

To automate daily runs, create a Cloud Scheduler job:

```bash
gcloud scheduler jobs create http embeddings-pipeline-daily \
  --schedule="0 2 * * *" \
  --uri="https://[YOUR-CLOUD-RUN-URL]/run-embeddings-pipeline" \
  --http-method=POST \
  --time-zone="America/New_York"
```

Or run via cron:
```bash
# Daily at 2 AM
0 2 * * * cd /path/to/perception && node run-embeddings-pipeline-test.cjs >> /var/log/embeddings-pipeline.log 2>&1
```

---

## Support

For issues or questions:
1. Check validation queries first
2. Review pipeline logs in BigQuery
3. Compare with this documentation
4. Adjust configuration parameters
5. Test individual stages in isolation

---

## Technical Details

### Embedding Model
- **Model:** text-embedding-ada-002
- **Dimensions:** 1536
- **Context:** 8,191 tokens
- **Input:** Title + Outlet + First 500 chars of content

### Clustering Algorithm
- **Method:** Connected components via SQL
- **Similarity:** Cosine similarity on embeddings
- **Implementation:** BigQuery native operations (no external libraries)

### Synthesis Model
- **Model:** GPT-4o-mini
- **Temperature:** 0.3 (consistent output)
- **Max Tokens:** 1,000
- **Format:** JSON structured output

### Data Flow

```
Articles (BigQuery)
    ↓
[Stage 1] Generate Embeddings (OpenAI)
    ↓
article_embeddings_test
    ↓
[Stage 2] Compute Similarity & Cluster (BigQuery SQL)
    ↓
trend_clusters_test (validated clusters only)
    ↓
[Stage 3] Synthesize with LLM (GPT-4o-mini)
    ↓
ai_trends_test + trend_centroids_test
```

---

## Version History

- **v1.0** - Initial implementation (2025-10-24)
  - Three-stage pipeline
  - Test environment with `_test` suffix tables
  - Validation queries included
  - Cost tracking built-in
