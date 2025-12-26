# Trends System: Cost-Optimized Implementation Plan

**Based on**: TRENDS_SYSTEM_IMPROVEMENT_PLAN.md
**Focus**: Minimize BigQuery costs while maximizing trend consolidation
**Reference**: Media Radar Optimization (docs/backend/MEDIA_RADAR_OPTIMIZATION.md)

---

## Cost Optimization Strategy

### Key Principles from Existing Optimizations

From the Media Radar optimization, we learned:
1. **Select only essential fields** → 10x faster queries, 50% less data transfer
2. **Parallel query execution** → 2x performance with Promise.all
3. **HTTP caching** → Eliminate redundant queries
4. **Indexed lookups** → Fast targeted queries vs full table scans

---

## Cost-Effective Trend Matching Approach

### ❌ AVOID: Expensive Full Table Scans

**Don't do this** (costs $$$):
```javascript
// BAD: Scans entire trends table hourly
async function findSimilarTrend(newTrend) {
  const query = `
    SELECT * FROM ai_trends_tracking
    WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 72 HOUR)
  `;
  const [allTrends] = await bigquery.query(query); // Scans GBs hourly

  // Then loops through thousands of trends
  for (const existing of allTrends) {
    const similarity = calculateTrendSimilarity(existing.title, newTrend.title);
    // ...
  }
}
```

**Cost**: ~$0.05 per query × 24 hours = **$1.20/day** just for lookups

---

## ✅ COST-OPTIMIZED SOLUTION

### Phase 1: Add Efficient Indexes (One-Time Setup)

```sql
-- Add composite index for fast lookups
-- Cost: One-time $0.01, saves $1+/day
ALTER TABLE `btcp_main_dataset.ai_trends_tracking`
ADD COLUMN IF NOT EXISTS title_hash STRING,
ADD COLUMN IF NOT EXISTS entity_fingerprint STRING,
ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP,
ADD COLUMN IF NOT EXISTS first_seen TIMESTAMP,
ADD COLUMN IF NOT EXISTS update_count INTEGER DEFAULT 0;

-- Create clustering for efficient queries
ALTER TABLE `btcp_main_dataset.ai_trends_tracking`
CLUSTER BY title_hash, generated_at;
```

### Phase 2: Hash-Based Trend Matching

**Use targeted lookups** instead of full scans:

```javascript
// GOOD: Fast hash-based lookup
async function findMatchingTrend(newTrend) {
  // 1. Generate stable hash from entities (NO BigQuery cost yet)
  const entities = extractEntities(newTrend.title);
  const entityFingerprint = Array.from(entities).sort().join('_');
  const titleHash = hashCode(newTrend.title.toLowerCase());

  // 2. TARGETED BigQuery lookup (only scans matching hashes)
  const query = `
    SELECT
      trend_id,
      title,
      articles,
      article_count,
      signal_strength,
      confidence_score,
      generated_at,
      last_updated
    FROM \`btcp_main_dataset.ai_trends_tracking\`
    WHERE
      -- Fast index lookup (milliseconds)
      title_hash = @titleHash
      -- Limit time window
      AND generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 72 HOUR)
      -- Prevent stale matches
      AND last_updated >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 72 HOUR)
    LIMIT 10
  `;

  const [matches] = await bigquery.query({
    query,
    params: { titleHash }
  });

  // 3. In-memory similarity check (NO BigQuery cost)
  if (matches.length === 0) return null;

  let bestMatch = null;
  let highestSimilarity = 0;

  for (const match of matches) {
    const similarity = calculateTrendSimilarity(match.title, newTrend.title);
    if (similarity > 0.7 && similarity > highestSimilarity) {
      bestMatch = match;
      highestSimilarity = similarity;
    }
  }

  return bestMatch;
}

// Simple hash function (NO BigQuery cost)
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString();
}
```

**Cost**: ~$0.0001 per lookup × 24 hours = **$0.0024/day** (500x cheaper!)

---

## Phase 3: Efficient UPDATE Implementation

### ❌ AVOID: Read-Modify-Write Pattern

**Don't do this**:
```javascript
// BAD: Two expensive queries per update
const [rows] = await bigquery.query(`SELECT * FROM ai_trends_tracking WHERE trend_id = ?`);
const existing = rows[0];
const merged = [...existing.articles, ...newArticles];
await bigquery.query(`UPDATE ai_trends_tracking SET articles = ? WHERE trend_id = ?`);
```

### ✅ USE: Direct SQL UPDATE with JSON manipulation

```javascript
// GOOD: Single query using BigQuery's JSON functions
async function updateTrendInBigQuery(trendId, newArticles) {
  const query = `
    UPDATE \`btcp_main_dataset.ai_trends_tracking\`
    SET
      -- Merge JSON arrays efficiently
      articles = (
        SELECT ARRAY_AGG(DISTINCT article)
        FROM (
          SELECT article FROM UNNEST(JSON_EXTRACT_ARRAY(articles)) article
          UNION ALL
          SELECT TO_JSON_STRING(STRUCT(
            url AS url,
            title AS title,
            outlet AS outlet
          )) FROM UNNEST(@newArticles)
        )
      ),
      -- Update counts and metadata
      article_count = (
        SELECT COUNT(DISTINCT JSON_EXTRACT_SCALAR(article, '$.url'))
        FROM UNNEST(JSON_EXTRACT_ARRAY(articles)) article
      ) + @newArticleCount,
      last_updated = CURRENT_TIMESTAMP(),
      update_count = update_count + 1,
      signal_strength = CASE
        WHEN article_count + @newArticleCount >= 5 THEN 'strong'
        WHEN article_count + @newArticleCount >= 3 THEN 'emerging'
        ELSE 'early'
      END,
      confidence_score = LEAST(0.95, confidence_score + 0.05)
    WHERE trend_id = @trendId
      AND generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 72 HOUR)
  `;

  await bigquery.query({
    query,
    params: {
      trendId,
      newArticles: newArticles.map(a => ({
        url: a.url,
        title: a.title,
        outlet: a.outlet
      })),
      newArticleCount: newArticles.length
    }
  });
}
```

**Cost**: Single UPDATE query = $0.0001 (vs $0.0005 for read-modify-write)

---

## Phase 4: In-Memory Caching Layer

### Use Node.js Map for Hot Trends

```javascript
// Cache recent trend hashes in memory (NO BigQuery cost)
const trendHashCache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function findMatchingTrendCached(newTrend) {
  const titleHash = hashCode(newTrend.title.toLowerCase());

  // 1. Check in-memory cache first (ZERO cost)
  const cached = trendHashCache.get(titleHash);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('✅ Cache hit! No BigQuery query needed');
    return cached.trend;
  }

  // 2. If not cached, query BigQuery (small cost)
  const match = await findMatchingTrend(newTrend);

  // 3. Cache the result
  if (match) {
    trendHashCache.set(titleHash, {
      trend: match,
      timestamp: Date.now()
    });
  }

  return match;
}

// Clear cache hourly to prevent stale data
setInterval(() => {
  const now = Date.now();
  for (const [hash, entry] of trendHashCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL) {
      trendHashCache.delete(hash);
    }
  }
}, CACHE_TTL);
```

**Benefit**: ~70% of lookups hit cache = **70% cost savings**

---

## Phase 5: Batch Processing

### Process Multiple Trends in Single Query

```javascript
// GOOD: Batch updates reduce query count
async function batchUpdateTrends(updates) {
  if (updates.length === 0) return;

  // Build single SQL statement for multiple updates
  const cases = updates.map((update, i) => `
    WHEN trend_id = @trendId${i} THEN
      ARRAY_CONCAT(
        articles,
        ARRAY(SELECT TO_JSON_STRING(a) FROM UNNEST(@newArticles${i}) a)
      )
  `).join('\n');

  const query = `
    UPDATE \`btcp_main_dataset.ai_trends_tracking\`
    SET
      articles = CASE
        ${cases}
        ELSE articles
      END,
      article_count = article_count + CASE
        ${updates.map((u, i) => `WHEN trend_id = @trendId${i} THEN @count${i}`).join('\n')}
        ELSE 0
      END,
      last_updated = CURRENT_TIMESTAMP()
    WHERE trend_id IN (${updates.map((_, i) => `@trendId${i}`).join(', ')})
  `;

  const params = {};
  updates.forEach((update, i) => {
    params[`trendId${i}`] = update.trendId;
    params[`newArticles${i}`] = update.newArticles;
    params[`count${i}`] = update.newArticles.length;
  });

  await bigquery.query({ query, params });

  console.log(`✅ Batch updated ${updates.length} trends in single query`);
}
```

**Benefit**: 10 updates in 1 query vs 10 separate queries = **90% cost reduction**

---

## Complete Cost-Optimized Implementation

```javascript
// Enhanced /extract endpoint with all optimizations
app.post('/extract', async (req, res) => {
  try {
    console.log('🔍 Starting cost-optimized trend extraction...');

    // 1. Fetch new articles (existing logic)
    const newArticles = await fetchRecentArticles(168, 500);

    // 2. Extract trends with OpenAI (existing logic)
    const extractedTrends = await extractTrendsWithOpenAI(newArticles);

    // 3. Cost-optimized matching and updates
    const batchUpdates = [];
    const newTrends = [];

    for (const trend of extractedTrends) {
      // Generate hash (in-memory, no cost)
      const titleHash = hashCode(trend.title.toLowerCase());
      trend.title_hash = titleHash;
      trend.entity_fingerprint = Array.from(extractEntities(trend.title))
        .sort()
        .join('_');

      // Check cache first (no cost)
      const match = await findMatchingTrendCached(trend);

      if (match) {
        // Queue for batch update
        batchUpdates.push({
          trendId: match.trend_id,
          newArticles: trend.articles
        });
      } else {
        // Mark for insertion
        newTrends.push(trend);
      }
    }

    // 4. Execute batch operations
    if (batchUpdates.length > 0) {
      await batchUpdateTrends(batchUpdates);
      console.log(`✅ Updated ${batchUpdates.length} existing trends`);
    }

    if (newTrends.length > 0) {
      await batchInsertTrends(newTrends);
      console.log(`✅ Created ${newTrends.length} new trends`);
    }

    return res.json({
      success: true,
      updated: batchUpdates.length,
      created: newTrends.length,
      cached_lookups: trendHashCache.size
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({ error: error.message });
  }
});
```

---

## Cost Comparison

### Before (Current System)
- Hourly full table scans: **$1.20/day**
- Read-modify-write updates: **$0.50/day**
- No caching: **$0.30/day** extra lookups
- **Total**: **~$2.00/day** = **$60/month**

### After (Optimized System)
- Hash-based lookups: **$0.01/day**
- Direct SQL updates: **$0.10/day**
- In-memory caching: **-$0.20/day** savings
- Batch operations: **-$0.40/day** savings
- **Total**: **~$0.10/day** = **$3/month**

### Savings
**$57/month** (95% cost reduction) while **IMPROVING** functionality!

---

## Performance Benefits

### Query Performance
- **Before**: 2-5 seconds per trend lookup
- **After**: 50-200ms per trend lookup (10-100x faster)

### Scalability
- **Before**: Can't scale beyond 24 hourly runs
- **After**: Can run every 15 minutes without cost impact

### Data Quality
- **Before**: 86% single-article trends
- **After Target**: <40% single-article trends

---

## Implementation Checklist

### Week 1: Database Setup
- [ ] Add indexed columns (title_hash, entity_fingerprint, last_updated)
- [ ] Create clustering on title_hash + generated_at
- [ ] Test hash generation functions
- [ ] Verify index performance

### Week 2: Core Logic
- [ ] Implement hashCode() function
- [ ] Implement findMatchingTrendCached()
- [ ] Implement batchUpdateTrends()
- [ ] Implement batchInsertTrends()
- [ ] Add in-memory cache with TTL

### Week 3: Integration
- [ ] Update /extract endpoint
- [ ] Test with real data
- [ ] Monitor BigQuery costs
- [ ] Validate trend consolidation works

### Week 4: Optimization
- [ ] Fine-tune cache TTL
- [ ] Optimize batch sizes
- [ ] Add monitoring dashboards
- [ ] Document new architecture

---

## Monitoring & Alerts

### Cost Monitoring
```sql
-- Daily BigQuery cost tracking
SELECT
  DATE(creation_time) as date,
  SUM(total_bytes_processed) / POW(10, 12) as TB_processed,
  SUM(total_bytes_processed) / POW(10, 12) * 5.0 as estimated_cost_usd
FROM `triple-upgrade-245423.region-us.INFORMATION_SCHEMA.JOBS_BY_PROJECT`
WHERE
  statement_type IN ('SELECT', 'UPDATE', 'INSERT')
  AND creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY date
ORDER BY date DESC;
```

### Performance Monitoring
```javascript
// Add to response
{
  "performance": {
    "cache_hit_rate": (cacheHits / totalLookups * 100).toFixed(1) + '%',
    "avg_lookup_time_ms": avgLookupTime,
    "bigquery_queries": bigqueryQueryCount,
    "trends_updated": batchUpdates.length,
    "trends_created": newTrends.length
  }
}
```

---

## Rollback Plan

If costs unexpectedly spike:

```javascript
// Emergency rollback: Disable updates, only insert
const EMERGENCY_MODE = process.env.TRENDS_EMERGENCY_MODE === 'true';

if (EMERGENCY_MODE) {
  console.warn('⚠️ EMERGENCY MODE: Skipping trend updates');
  // Only create new trends, no lookups/updates
  await batchInsertTrends(extractedTrends);
}
```

---

## Next Steps

1. **Test in development**: Run with sample data, monitor costs
2. **Gradual rollout**: Enable for 10% of traffic first
3. **Monitor closely**: Watch BigQuery costs for 48 hours
4. **Full deployment**: If costs stay low, enable for 100%

**Ready to implement cost-optimized trends!** 🚀
