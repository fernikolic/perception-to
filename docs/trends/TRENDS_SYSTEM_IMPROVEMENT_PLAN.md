# Trends System Improvement Plan

**Date**: October 23, 2025
**System**: External Trends API (Cloud Run: btcpapifunction3-1-final)
**Status**: ⚠️ NEEDS SIGNIFICANT IMPROVEMENT

---

## Executive Summary

The current trends system **DOES have some consolidation logic**, but it's **NOT WORKING AS INTENDED**. Despite having:
- Title similarity checking (70% threshold)
- Entity extraction for deduplication
- Post-processing consolidation
- Article merging capabilities

**The actual data shows**:
- 86% of trends still have only 1 article
- Multiple duplicate trends about the same stories
- No evidence of article accumulation over time
- Signal strength stuck at "early" (1 article) or "emerging" (2 articles max)

---

## Current System Analysis

### ✅ What EXISTS (But Isn't Working)

#### 1. **Deduplication Logic** (index.js:497-533)
```javascript
const similarity = calculateTrendSimilarity(et.title, trendTitle);
if (similarity > 0.7) {
  // MERGE with existing trend
  mergedArticles = [...existingArticles, ...newArticles];
  existingProcessed.article_count = mergedArticles.length;
  existingProcessed.signal_strength = determineSignalStrength(mergedArticles.length);
}
```

#### 2. **Entity Extraction** (index.js:1183-1236)
- Recognizes companies: Visa, Stripe, MicroStrategy, BlackRock, etc.
- Identifies concepts: ETF, mining, partnerships, regulations
- Detects people: Michael Saylor, Jamie Dimon, etc.

#### 3. **Signal Strength Progression** (index.js:721-725)
```javascript
function determineSignalStrength(articleCount) {
  if (articleCount >= 5) return 'strong';
  if (articleCount >= 3) return 'emerging';
  return 'early';
}
```

#### 4. **Post-Processing Consolidation** (index.js:603-658)
- Groups trends by entity overlap
- Combines articles from related trends
- Selects best title from group

### ❌ Why It's NOT Working

#### Problem 1: **Hourly Processing Window Too Short**
```javascript
// index.js:321
const existingTrends = await getExistingTrends(168); // 7 days
```

**BUT:**
```javascript
// index.js:361-392
if (lastTrendTime) {
  articlesToAnalyze = articles.filter(article => articleDate > lastTrendTime);

  if (articlesToAnalyze.length === 0) {
    return { message: "No new articles", openai_call_avoided: true };
  }
}
```

**THE ISSUE**: Each hourly run only processes **NEW articles since the last run**. It checks for existing trends, but:
1. It only looks at trends from the CURRENT batch
2. It doesn't aggregate articles into older trends across multiple runs
3. Each run creates isolated trend sets

#### Problem 2: **No Cross-Run Accumulation**
The system does this hourly:
1. Hour 1: Article A about "MicroStrategy buys BTC" → Creates Trend #1 (1 article)
2. Hour 2: Article B about same story → **Should add to Trend #1**, but creates Trend #2 (1 article)
3. Hour 3: Article C about same story → Creates Trend #3 (1 article)

**Why?** The similarity check (index.js:498) only compares against `existingTrends` from the SAME extraction run, not against ALL trends in BigQuery.

#### Problem 3: **BigQuery Storage Without Update**
```javascript
// index.js:138-163
async function storeTrendInBigQuery(trend) {
  await bigquery.dataset('btcp_main_dataset')
    .table('ai_trends_tracking')
    .insert([row]); // INSERTS new row, never UPDATES
}
```

**THE ISSUE**: Every trend is always INSERTED as a new row. There's **NO UPDATE logic** to add articles to existing trends.

#### Problem 4: **GET Endpoint Deduplication is Cosmetic**
```javascript
// index.js:265-277
for (const trend of allTrends) {
  const titleKey = trend.title.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 30); // Only first 30 chars!

  if (!seenTitles.has(titleKey)) {
    deduplicatedTrends.push(trend);
  }
}
```

**THE ISSUE**: This only removes exact duplicate titles from the **display**. It doesn't:
- Merge article counts
- Combine different articles about the same story
- Update the database

---

## Real-World Evidence of Failure

### Duplicate Trends Found

| Story | Number of Separate Trends | Should Be |
|-------|---------------------------|-----------|
| Lugano Bitcoin adoption (350 businesses) | 3 trends | 1 trend with 3+ articles |
| TD Cowen $141K price prediction | 2 trends (1 sec apart) | 1 trend with 2+ articles |
| Mauritania Bitcoin usage | 2 trends | 1 trend with 2+ articles |
| California SB 822 crypto law | 2 trends | 1 trend with 2+ articles |
| Gladstein Bitcoin monetary policy | 2 trends | 1 trend with 2+ articles |
| EMCD Crypto Battle event | 2 trends | 1 trend with 2+ articles |

### Article Distribution (Should NOT Look Like This)
```
Single-article trends:  43 (86%)  ← TOO HIGH
Multi-article trends:    7 (14%)  ← TOO LOW
Maximum articles:        2         ← Should be 10+
```

---

## Root Cause Summary

The system has all the RIGHT pieces, but they're not connected properly:

1. ✅ **Entity extraction** - Works
2. ✅ **Similarity calculation** - Works
3. ✅ **Signal strength levels** - Works
4. ❌ **Cross-run trend matching** - MISSING
5. ❌ **BigQuery UPDATE logic** - MISSING
6. ❌ **Persistent trend IDs** - MISSING
7. ❌ **Article accumulation** - NOT HAPPENING

---

## Improvement Recommendations

### 🎯 Priority 1: Enable Cross-Run Trend Matching

**Current**:
```javascript
const existingTrends = await getExistingTrends(168); // Gets from current run only
```

**Should Be**:
```javascript
// BEFORE processing new articles:
const allRecentTrends = await getAllTrendsFromBigQuery(72); // Last 3 days
const trendIndex = buildTrendIndex(allRecentTrends); // Group by similarity

// DURING processing:
for (const newTrend of extractedTrends) {
  const matchingTrendId = findMatchingTrend(newTrend, trendIndex);

  if (matchingTrendId) {
    // ADD articles to existing trend
    await updateTrendInBigQuery(matchingTrendId, newTrend.articles);
  } else {
    // CREATE new trend
    await insertTrendInBigQuery(newTrend);
  }
}
```

### 🎯 Priority 2: Implement BigQuery UPDATE Logic

**Add this function**:
```javascript
async function updateTrendInBigQuery(trendId, newArticles) {
  // 1. Fetch existing trend
  const query = `SELECT * FROM ai_trends_tracking WHERE trend_id = @trendId`;
  const [rows] = await bigquery.query({ query, params: { trendId } });

  if (rows.length === 0) return;

  const existingTrend = rows[0];
  const existingArticles = JSON.parse(existingTrend.articles || '[]');

  // 2. Merge articles (avoid duplicates)
  const mergedArticles = [...existingArticles];
  const existingUrls = new Set(existingArticles.map(a => a.url));

  newArticles.forEach(article => {
    if (!existingUrls.has(article.url)) {
      mergedArticles.push(article);
    }
  });

  // 3. Update in BigQuery
  const updateQuery = `
    UPDATE ai_trends_tracking
    SET
      articles = @articles,
      article_count = @article_count,
      signal_strength = @signal_strength,
      confidence_score = @confidence_score,
      last_updated = CURRENT_TIMESTAMP()
    WHERE trend_id = @trendId
  `;

  await bigquery.query({
    query: updateQuery,
    params: {
      trendId,
      articles: JSON.stringify(mergedArticles),
      article_count: mergedArticles.length,
      signal_strength: determineSignalStrength(mergedArticles.length),
      confidence_score: Math.min(0.95, existingTrend.confidence_score + 0.05)
    }
  });

  console.log(`✅ Updated trend ${trendId}: ${existingArticles.length} → ${mergedArticles.length} articles`);
}
```

### 🎯 Priority 3: Use Stable Trend IDs

**Current**:
```javascript
id: `enhanced_trend_${Date.now()}_${index}` // Different every time
```

**Should Be**:
```javascript
function generateStableTrendId(trend) {
  const entities = Array.from(extractEntities(trend.title))
    .sort()
    .join('_');

  const dateKey = new Date().toISOString().substring(0, 10); // YYYY-MM-DD

  // Stable ID based on entities + date
  return `trend_${hashCode(entities)}_${dateKey}`;
}
```

### 🎯 Priority 4: Implement Trend Lifecycle

```javascript
async function processTrendLifecycle(newTrend) {
  const trendId = generateStableTrendId(newTrend);

  // 1. Check if trend exists (within last 3 days)
  const existingTrend = await findTrendById(trendId);

  if (existingTrend) {
    // 2a. UPDATE existing trend
    const age = Date.now() - new Date(existingTrend.generated_at);
    const ageHours = age / (1000 * 60 * 60);

    if (ageHours < 72) { // Still active (less than 3 days old)
      await updateTrendInBigQuery(trendId, newTrend.articles);
      return { action: 'updated', trendId };
    } else {
      // Trend is too old, create new one
      return await createNewTrend(newTrend);
    }
  } else {
    // 2b. CREATE new trend
    return await createNewTrend(newTrend);
  }
}
```

### 🎯 Priority 5: Add Similarity-Based Matching

**Before storing, check ALL recent trends**:
```javascript
async function findSimilarTrend(newTrend, lookbackHours = 72) {
  // Get all recent trends
  const recentTrends = await getAllTrendsFromBigQuery(lookbackHours);

  // Find best match
  let bestMatch = null;
  let highestSimilarity = 0;

  for (const existing of recentTrends) {
    const similarity = calculateTrendSimilarity(existing.title, newTrend.title);

    if (similarity > 0.7 && similarity > highestSimilarity) {
      bestMatch = existing;
      highestSimilarity = similarity;
    }
  }

  return bestMatch;
}
```

### 🎯 Priority 6: Monitor Trend Evolution

```javascript
// Add to BigQuery schema
ALTER TABLE ai_trends_tracking ADD COLUMN IF NOT EXISTS (
  first_seen TIMESTAMP,
  last_updated TIMESTAMP,
  update_count INTEGER,
  peak_article_count INTEGER,
  evolution_stage STRING  -- 'early' → 'emerging' → 'established' → 'mature'
);
```

---

## Implementation Plan

### Phase 1: Database Schema Updates (Week 1)
1. Add `last_updated` timestamp to BigQuery table
2. Add `first_seen` timestamp
3. Add `update_count` field
4. Add `peak_article_count` field
5. Add composite index on (title_hash, generated_at) for fast lookups

### Phase 2: Core Matching Logic (Week 2)
1. Implement `generateStableTrendId()`
2. Implement `findSimilarTrend()` with 3-day lookback
3. Implement `updateTrendInBigQuery()`
4. Update `/extract` endpoint to use new logic

### Phase 3: Testing & Validation (Week 3)
1. Run backfill script to consolidate existing trends
2. Monitor for duplicate reduction
3. Verify article accumulation works
4. Check signal strength progression

### Phase 4: Optimization (Week 4)
1. Add BigQuery caching for frequent lookups
2. Implement trend expiry (archive trends >7 days old)
3. Add trend versioning for title changes
4. Create admin dashboard for trend management

---

## Success Metrics

### Before (Current State)
- Single-article trends: 86%
- Multi-article trends: 14%
- Maximum articles per trend: 2
- Duplicate trends: ~15-20% of total
- Signal strength distribution: 86% early, 14% emerging, 0% strong

### After (Target State)
- Single-article trends: <40%
- Multi-article trends: >60%
- Maximum articles per trend: 20+
- Duplicate trends: <5% of total
- Signal strength distribution: 30% early, 50% emerging, 20% established/strong

---

## Quick Win: Immediate Fixes

### 1. Increase Similarity Window (5 minutes)
```javascript
// index.js:166
// BEFORE:
async function getExistingTrends(hours = 168, dateFilter = null)

// AFTER:
async function getExistingTrends(hours = 168, dateFilter = null, includeAll = false)
  if (includeAll) {
    // Get ALL recent trends from BigQuery, not just current batch
    whereClause = `WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 72 HOUR)`;
  }
```

### 2. Fix Deduplication Window (10 minutes)
```javascript
// index.js:270
// BEFORE:
const titleKey = trend.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 30);

// AFTER:
const titleKey = calculateTrendFingerprint(trend.title); // Use full title + entities
```

### 3. Increase Lookback for Matching (5 minutes)
```javascript
// index.js:321
// BEFORE:
const existingTrends = await getExistingTrends(168);

// AFTER:
const existingTrends = await getExistingTrends(168, null, true); // Get ALL recent trends
```

---

## Questions to Answer

1. **Should trends ever "expire"?**
   - Suggestion: Yes, archive trends after 7 days, but keep consolidating related articles for 3 days

2. **What if a trend title evolves?**
   - Example: "Bitcoin at $100K" → "Bitcoin Surges Past $110K"
   - Suggestion: Use entity-based matching, allow title updates with version history

3. **How to handle conflicting trend interpretations?**
   - Example: AI extracts "Bullish institutional adoption" vs "Concerns about centralization" from same articles
   - Suggestion: Keep as separate trends if categories differ significantly

4. **Should we consolidate trends across different time periods?**
   - Example: "MicroStrategy buys BTC" on Monday and Friday
   - Suggestion: Yes if <7 days apart, No if >7 days (separate trend cycles)

---

## Technical Debt to Address

1. **No transaction handling**: Multiple concurrent runs could create duplicate trends
2. **No rate limiting**: Hourly scheduler could overwhelm OpenAI API during high news volume
3. **No rollback mechanism**: Failed consolidations leave partial data
4. **No audit trail**: Can't track why trends were merged or split
5. **No manual override**: Admins can't manually merge/split trends

---

## Cost Impact

### Current Costs
- OpenAI API: ~$0.50-2.00/day (24 hourly runs, 100 articles each)
- BigQuery: Minimal storage, queries

### After Improvements
- OpenAI API: **Same or lower** (fewer duplicate extractions)
- BigQuery: **Slightly higher** (UPDATE queries + more complex lookups)
- **Net savings**: Reduced OpenAI costs from better deduplication

---

## Monitoring & Alerts

Add these metrics:
1. Trends created per hour
2. Trends updated per hour
3. Average articles per trend (target: >2.5)
4. Duplicate trend rate (target: <5%)
5. Signal strength distribution
6. Consolidation success rate

---

**Ready to implement? Let's start with Phase 1!**
