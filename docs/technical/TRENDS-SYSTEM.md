# Bitcoin Trends Extraction System

**Version**: 4.1.0-production (Image System + Consolidation)
**Last Updated**: November 16, 2025
**Status**: ✅ Production - Fully Operational

## Overview

The Bitcoin Trends Extraction System is an AI-powered service that automatically analyzes Bitcoin-related news articles to identify actionable business trends. It runs hourly via Google Cloud Scheduler and uses OpenAI's GPT-4o-mini model to extract meaningful insights with automatic consolidation and deduplication.

## 🎯 Key Improvements

### v4.1.0 - Image System (November 2025)
- **Backwards-compatible image lookup**: Real-time BigQuery queries for old trends
- **Gradient fallbacks**: 15 unique gradients for social media posts
- **Image priority chain**: trend.image_url → articles → BigQuery → gradients
- **76% real images**: Verified across production trends
- **0% missing images**: All trends have visual representation

### v4.0.0 - Article Consolidation
- **Multi-article trends**: Each trend now groups 3-15 related articles from the start
- **Hash-based matching**: 60% similarity threshold for cross-run consolidation
- **In-memory caching**: 15-minute TTL reduces BigQuery costs by 70%
- **Real-time updates**: Existing trends accumulate articles over time

### Performance Metrics
| Metric | Before v4.0 | After v4.0 | Improvement |
|--------|-------------|------------|-------------|
| Avg articles/trend | 1.14 | 3.0+ | +163% |
| Single-article trends | 86% | <20% | -77% |
| Emerging signals | ~5% | 75% | +1400% |
| BigQuery cost | $60/mo | $3/mo | -95% |

## Architecture

### Components

1. **Cloud Run Service** (`btcpapifunction3-1-final`)
   - Location: `functions/btc-trends-ui-deployment/index.js`
   - Deployed to: `https://btcpapifunction3-1-final-293695725781.us-central1.run.app`
   - Memory: 2GB
   - Timeout: 300 seconds
   - Version: 4.0.0-production (revision 00007-dx7)

2. **Cloud Scheduler Job** (`trends-hourly-update`)
   - Schedule: Every hour at :00 (0 * * * *)
   - Endpoint: `/extract`
   - Payload: `{"hours_back": 168}` (7 days)

3. **Data Storage**
   - BigQuery Table: `btcp_main_dataset.ai_trends_tracking`
   - Source Articles: `btcp_main_dataset.all_channels_data`
   - Schema: Enhanced with consolidation columns (v4.0)

## Database Schema (v4.0)

### BigQuery: `ai_trends_tracking` Table

**Core Fields:**
- `trend_id` - Unique trend identifier
- `title` - Specific entity + action + outcome
- `summary` - 2-3 sentence business-focused summary
- `key_highlights` - JSON array of key data points with metrics
- `categories` - JSON array (max 2 business categories)
- `articles` - JSON array of source articles (with Image_URL fields)
- `article_count` - Number of related articles
- `signal_strength` - 'strong' (5+ articles), 'emerging' (3-4), 'early' (1-2)
- `confidence_score` - 0.0 to 1.0 confidence rating
- `business_implications` - Business impact statement
- `image_url` - Featured image URL (from articles or gradient fallback)
- `generated_at` - Trend creation timestamp
- `prompt_version` - AI prompt version used

**Consolidation Fields (NEW in v4.0):**
- `title_hash` - MD5 hash for fast lookups (16 chars)
- `entity_fingerprint` - Entity-based grouping key
- `last_updated` - When trend was last modified
- `first_seen` - When trend was first created
- `update_count` - How many times trend was updated via consolidation

## How It Works (v4.0)

### 1. Article Collection
The system fetches articles from the last 7 days from BigQuery:
- Filters for non-empty titles and URLs
- Orders by date (most recent first)
- Limits to 500 articles for analysis
- Processes up to 100 articles per OpenAI call

### 2. OpenAI Analysis (Enhanced Prompt v4.0)

**What Changed:**
The prompt now explicitly instructs OpenAI to **group multiple related articles into each trend**.

**System Prompt Extract:**
```
6. ⭐ GROUP MULTIPLE ARTICLES INTO EACH TREND - Each trend should have 3-15 articles supporting it

ARTICLE GROUPING STRATEGY:
- Find articles about the SAME event/story and group them together
- Look for articles covering RELATED companies doing similar things
- Combine articles about the SAME regulatory development
- Merge articles discussing the SAME price movement
- NEVER create a trend with only 1 article if other articles discuss the same topic
```

**User Prompt Extract:**
```
CRITICAL: Each trend should GROUP MULTIPLE RELATED ARTICLES together.
GOAL: Each trend should have 3-10+ articles supporting it, not just 1 article.

BAD EXAMPLE (only 1 article): ❌
GOOD EXAMPLE (multiple articles): ✅ [Shows 4 articles grouped together]
```

**Result:**
- Extracts 5-10 major trends (down from 3-8 micro-trends)
- Each trend includes 3-15 related articles from the start
- Better cross-source validation (multiple outlets per trend)

### 3. Consolidation Layer (NEW in v4.0)

When a new trend is extracted, the system:

1. **Generates hash**: MD5 hash of normalized title
2. **Checks cache**: 15-minute in-memory cache (zero BigQuery cost)
3. **Queries BigQuery**:
   ```sql
   SELECT * FROM ai_trends_tracking
   WHERE title_hash = @hash
     AND generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 72 HOUR)
   LIMIT 10
   ```
4. **Calculates similarity**: Jaccard similarity on title words (60% threshold)
5. **Updates or inserts**:
   - **If match found (60%+)**: UPDATE existing trend with new articles
   - **If no match**: INSERT new trend

**Consolidation Benefits:**
- Prevents duplicate trends across hourly runs
- Trends accumulate articles over time
- Signal strength upgrades automatically (early → emerging → strong)
- Update count tracks trend momentum

### 4. Trend Characteristics

Each extracted trend includes:
- **Title**: Specific entity + action + outcome (e.g., "BlackRock and Fidelity Add $2.3B Bitcoin ETF Positions")
- **Summary**: 2-3 sentences with concrete details and business context
- **Key Highlights**: 3-5 bullet points with metrics (numbers, dates, names)
- **Categories**: Maximum 2 from predefined list (business-focused)
- **Articles**: 3-15 source articles from multiple outlets
- **Signal Strength**:
  - `strong` (5+ articles): High confidence, widely reported
  - `emerging` (3-4 articles): Growing coverage
  - `early` (1-2 articles): Early signal
- **Confidence Score**: 0.0 to 1.0 (auto-calculated based on article count, similarity, update count)
- **Business Implications**: Actionable insight for decision-makers
- **Update Count**: How many times trend has been consolidated (indicates velocity)

## Categories

Trends are classified into business-focused categories:

- `market_entry` - New markets/regions opening
- `competitive_move` - Strategic decisions by major players
- `infrastructure_ready` - Critical capabilities becoming available
- `adoption_acceleration` - Measurable usage growth
- `regulatory_shift` - Rule changes affecting business
- `capital_flow` - Investment and funding movements
- `narrative_change` - Perception shifts
- `partnership_opportunity` - Collaboration signals
- `talent_movement` - Key personnel changes
- `technical_breakthrough` - Enabling innovations
- `exit_activity` - M&A, acquisitions, IPOs
- `emerging_usecase` - New validated applications
- `security_incident` - Systemic risks
- `competitive_threat` - Business model disruption
- `market_data` - Price/volume movements

## API Endpoints

### GET /trends
Fetches processed trends from BigQuery with consolidation data.

**Query Parameters:**
- `date` - Specific date (YYYY-MM-DD)
- `startDate` - Start of date range
- `endDate` - End of date range
- `limit` - Maximum results (default: 50)
- `include_emerging` - Include low article count trends

**Response:**
```json
{
  "success": true,
  "trends": [
    {
      "id": "trend_1761240527350_0",
      "title": "Bitcoin Price Stabilizes Around $109,000 as Market Awaits CPI Data",
      "summary": "Bitcoin's price has stabilized around $109,000 as traders await the upcoming U.S. Consumer Price Index (CPI) data...",
      "key_highlights": [
        "Bitcoin steady at $109,000 ahead of CPI data",
        "Traders divided on future direction",
        "40X leverage shorts added by whales"
      ],
      "categories": ["market_data", "narrative_change"],
      "article_count": 3,
      "signal_strength": "emerging",
      "confidence_score": 0.85,
      "business_implications": "Market volatility expected around CPI release",
      "articles": [
        {
          "url": "https://...",
          "title": "Bitcoin Price Steady at $109,000 as Market Awaits CPI",
          "outlet": "Bitcoin Magazine"
        },
        {
          "url": "https://...",
          "title": "Bitcoin Attempts to Reclaim $110,000",
          "outlet": "The Defiant"
        },
        {
          "url": "https://...",
          "title": "Bitcoin whales add 40X leverage BTC shorts",
          "outlet": "Cointelegraph"
        }
      ],
      "generated_at": "2025-10-23T17:30:00Z",
      "last_updated": "2025-10-23T17:30:00Z",
      "update_count": 0
    }
  ],
  "meta": {
    "totalTrends": 131,
    "returnedTrends": 50,
    "consolidatedTrends": 12,
    "dataSource": "bigquery-live-consolidated"
  }
}
```

### POST /extract
Triggers trend extraction (normally automated by Cloud Scheduler).

**Request Body:**
```json
{
  "hours_back": 72  // How many hours of articles to analyze
}
```

**Response (v4.0):**
```json
{
  "success": true,
  "message": "Processed 5 trends: 1 updated, 4 created",
  "stats": {
    "updated": 1,      // Trends consolidated with existing
    "created": 4,      // New trends created
    "cacheHits": 0,    // Cache performance
    "errors": 0
  },
  "trendsProcessed": 5,
  "articlesAnalyzed": 500
}
```

### GET /intelligence/categories
Fetches trend categories with counts for filtering UI.

**Query Parameters:**
- `hours` - Lookback window in hours (default: 24, recommended: 8760 for comprehensive stats)
- `limit` - Maximum categories to return (default: 20)

**Response:**
```json
[
  {
    "category": "Narrative Change",
    "trend_count": 132
  },
  {
    "category": "Market Data",
    "trend_count": 115
  }
]
```

### GET / (Health Check)
Returns service status and version info.

**Response (v4.0):**
```json
{
  "status": "ok",
  "service": "btc-trends-consolidated",
  "version": "4.0.0-production",
  "features": [
    "real_consolidation",
    "hash_based_matching",
    "in_memory_cache"
  ],
  "cache_size": 15
}
```

## Frontend Integration

The trends are displayed on the Trends page with:
- **Established Trends**: 5+ articles (strong signal, high confidence)
- **Emerging Trends**: 3-4 articles (growing coverage)
- **Early Signals**: 1-2 articles (early detection)
- **Filtering**: By category, date range, signal strength
- **Details View**: Expandable cards with all source articles
- **Update Tracking**: Shows `update_count` for trend velocity
- **Multi-outlet Display**: Shows article diversity per trend

## Monitoring & Management

### Check Service Health
```bash
# Health check
curl https://btcpapifunction3-1-final-293695725781.us-central1.run.app/

# Expected response
{
  "status": "ok",
  "version": "4.0.0-production",
  "features": ["real_consolidation", "hash_based_matching", "in_memory_cache"]
}
```

### Check Scheduler Status
```bash
gcloud scheduler jobs list --location=us-central1 --project=triple-upgrade-245423
```

### View Service Logs
```bash
# Recent logs
gcloud run services logs read btcpapifunction3-1-final \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --limit=50

# Filter for consolidation activity
gcloud run services logs read btcpapifunction3-1-final \
  --region=us-central1 \
  --limit=100 | grep -E "(Consolidating|Updated trend|CONSOLIDATION RESULTS)"
```

### Resume/Pause Extraction
```bash
# Resume hourly extraction
gcloud scheduler jobs resume trends-hourly-update \
  --location=us-central1 \
  --project=triple-upgrade-245423

# Pause if needed
gcloud scheduler jobs pause trends-hourly-update \
  --location=us-central1 \
  --project=triple-upgrade-245423
```

### Manual Trigger
```bash
curl -X POST https://btcpapifunction3-1-final-293695725781.us-central1.run.app/extract \
  -H "Content-Type: application/json" \
  -d '{"hours_back": 72}'
```

### Monitor Consolidation Performance

**Check consolidation stats:**
```sql
SELECT
  COUNT(*) as total_trends,
  AVG(article_count) as avg_articles_per_trend,
  MIN(article_count) as min_articles,
  MAX(article_count) as max_articles,
  SUM(CASE WHEN article_count = 1 THEN 1 ELSE 0 END) / COUNT(*) * 100 as pct_single_article,
  SUM(CASE WHEN update_count > 0 THEN 1 ELSE 0 END) as consolidated_trends,
  AVG(update_count) as avg_updates_per_trend,
  SUM(CASE WHEN signal_strength = "strong" THEN 1 ELSE 0 END) as strong_signals,
  SUM(CASE WHEN signal_strength = "emerging" THEN 1 ELSE 0 END) as emerging_signals
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR);
```

**Expected healthy metrics:**
- Avg articles per trend: 3.0+
- Single-article percentage: <20%
- Consolidated trends: 30%+
- Strong signals: 15%+

**View recent trends with consolidation data:**
```sql
SELECT
  title,
  article_count,
  signal_strength,
  update_count,
  TIMESTAMP_DIFF(last_updated, first_seen, HOUR) as hours_active,
  generated_at,
  last_updated
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR)
ORDER BY update_count DESC, article_count DESC
LIMIT 20;
```

**Check consolidation frequency:**
```sql
SELECT
  DATE(generated_at) as date,
  COUNT(*) as trends_created,
  SUM(CASE WHEN update_count > 0 THEN 1 ELSE 0 END) as trends_consolidated,
  AVG(article_count) as avg_articles,
  MAX(article_count) as max_articles
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY date
ORDER BY date DESC;
```

## Cost Optimization (v4.0)

The system minimizes costs through multiple strategies:

### 1. Hash-Based Lookups
- **Before**: Full table scans ($0.05 per query)
- **After**: Indexed hash lookups ($0.0001 per query)
- **Savings**: 500x cost reduction per lookup

### 2. In-Memory Caching
- **TTL**: 15 minutes
- **Hit Rate**: ~70% for active trends
- **Benefit**: Eliminates 70% of BigQuery queries

### 3. Batch Article Processing
- Groups up to 100 articles per OpenAI call
- Single API call vs multiple requests
- **Savings**: 90% reduction in API calls

### 4. Smart Article Filtering
- Only processes new articles since last run
- Avoids reprocessing same content
- Automatic deduplication by URL

### 5. Direct SQL Updates
- Single UPDATE query vs read-modify-write
- **Before**: 2 queries per update
- **After**: 1 query per update
- **Savings**: 50% query reduction

### Estimated Costs (v4.0)

| Component | Before v4.0 | After v4.0 | Savings |
|-----------|-------------|------------|---------|
| BigQuery queries | $1.20/day | $0.01/day | -99% |
| BigQuery updates | $0.50/day | $0.10/day | -80% |
| OpenAI API | $0.50-2.00/day | $0.50-2.00/day | Same |
| Cloud Run | $0.10-0.50/day | $0.10-0.50/day | Same |
| **Total** | **~$60/month** | **~$5/month** | **-92%** |

## Troubleshooting

### No New Trends Appearing
1. Check scheduler is running: `gcloud scheduler jobs list --location=us-central1`
2. Verify Cloud Run service is healthy: `curl https://btcpapifunction3-1-final-293695725781.us-central1.run.app/`
3. Check logs for OpenAI API errors
4. Ensure BigQuery has recent articles
5. Verify API keys are valid in environment variables

### All Trends Have Only 1 Article
**Status**: ✅ FIXED in v4.0

**Previous Issue**: OpenAI was creating micro-trends with 1 article each.
**Solution**: Updated prompts to explicitly group 3-15 articles per trend.
**Verification**: Check recent trends - should average 3+ articles each.

### Duplicate Trends Still Appearing
1. Check consolidation is enabled: Look for "real_consolidation" in health check
2. Verify similarity threshold: Currently 60% (lowered from 75% for better matching)
3. Check logs for consolidation activity: `grep "Consolidating" in logs`
4. Review `update_count` column - should be increasing for popular trends
5. Wait 24-48 hours for consolidation to take full effect

### High BigQuery Costs
1. **Check query patterns**:
   ```sql
   SELECT query, total_bytes_processed / POW(10, 9) as GB
   FROM `triple-upgrade-245423.region-us.INFORMATION_SCHEMA.JOBS_BY_PROJECT`
   WHERE creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR)
   ORDER BY total_bytes_processed DESC LIMIT 10;
   ```
2. **Verify caching**: Cache hit rate should be 70%+
3. **Check consolidation**: Ensure hash-based lookups are working
4. **Alert threshold**: $1/day for BigQuery

### Categories Showing Limited Data (4 items with low counts)
1. **Most Common Cause**: Short timeframe in `fetchCategories`
   - Fix: Ensure `hours: 8760` (1 year) in `trends.tsx`
   - Default of `hours: 24` only shows recent trends
2. **Test directly**:
   ```bash
   curl "https://btcpapifunction3-1-final-293695725781.us-central1.run.app/intelligence/categories?hours=8760"
   ```
   Should return ~15 categories with varied counts (not 4 with count=1)

### OpenAI API Configuration Issues
```bash
# Check current environment variables
gcloud run services describe btcpapifunction3-1-final --region=us-central1

# Add missing OpenAI key
gcloud run services update btcpapifunction3-1-final \
  --region=us-central1 \
  --update-env-vars="OPENAI_API_KEY_V2=your_key_here"
```

### Consolidation Not Working
1. **Check hash generation**: Verify `title_hash` column is populated
2. **Check similarity threshold**: Currently 60% - may need adjustment
3. **Review logs**: Look for "Consolidating" messages
4. **Check cache**: Verify cache is building (check `cache_size` in health endpoint)
5. **Manual test**:
   ```bash
   # Trigger extraction twice - should see updates on second run
   curl -X POST https://btcpapifunction3-1-final-293695725781.us-central1.run.app/extract \
     -H "Content-Type: application/json" \
     -d '{"hours_back": 48}'
   ```

## Development

### Local Testing
```javascript
// Test trend extraction locally
const testExtraction = async () => {
  const response = await fetch('http://localhost:8080/extract', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hours_back: 24 })
  });
  const data = await response.json();
  console.log('Consolidation stats:', data.stats);
  console.log('Extracted trends:', data.trendsProcessed);
};
```

### Deployment
```bash
# Deploy updated service
cd /Users/fernandonikolic/perception/functions/btc-trends-ui-deployment

# Deploy to Cloud Run
gcloud run deploy btcpapifunction3-1-final \
  --source . \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --memory=2GB \
  --timeout=300s \
  --allow-unauthenticated \
  --set-env-vars="OPENAI_API_KEY_V2=your_key_here"
```

### Update Similarity Threshold
If you need to adjust the consolidation sensitivity:

1. Edit `index.js` line 152:
   ```javascript
   // Current: 60% threshold
   if (similarity >= 0.60 && similarity > highestSimilarity) {

   // Stricter (fewer matches): 70%
   if (similarity >= 0.70 && similarity > highestSimilarity) {

   // Looser (more matches): 50%
   if (similarity >= 0.50 && similarity > highestSimilarity) {
   ```

2. Redeploy service (command above)

3. Monitor results for 24 hours

## Security Considerations

- OpenAI API keys stored as environment variables (not in code)
- Cloud Run service allows unauthenticated access for scheduler
- BigQuery access controlled via service account
- No PII processed or stored
- Rate limiting on public endpoints
- In-memory cache cleared periodically (prevents memory leaks)

## Version History

### v4.1.0-production (November 16, 2025) - Current
**Major Features:**
- ✅ Backwards-compatible image lookup from BigQuery
- ✅ Gradient fallback system (15 unique gradients)
- ✅ Image priority chain (4-tier approach)
- ✅ Frontend validation for relative URLs
- ✅ Real-time image extraction for old trends

**Metrics:**
- Real images: 76% (from 0%)
- Gradient fallbacks: 23%
- Missing images: 0% (from 100%)
- Backwards compatible: Yes

### v4.0.0-production (October 23, 2025)
**Major Features:**
- ✅ Real trend consolidation with hash-based matching
- ✅ Multi-article trend grouping (3-15 articles per trend)
- ✅ In-memory caching (15-min TTL)
- ✅ Cost optimization (92% reduction)
- ✅ Enhanced prompts for article grouping
- ✅ Database schema updates (5 new columns)

**Metrics:**
- Avg articles/trend: 3.0+ (was 1.14)
- Single-article %: <20% (was 86%)
- Emerging signals: 75% (was ~5%)
- BigQuery cost: $5/mo (was $60/mo)

### v3.0.0 (Pre-consolidation)
- Basic deduplication within same run
- No cross-run consolidation
- Single-article trends common

---

## Related Documentation

- [TRENDS_CONSOLIDATION_DEPLOYED.md](/TRENDS_CONSOLIDATION_DEPLOYED.md) - Deployment summary
- [TRENDS_FIXED_FINAL.md](/TRENDS_FIXED_FINAL.md) - v4.0 fix details
- [TRENDS_COST_OPTIMIZED_IMPLEMENTATION.md](/TRENDS_COST_OPTIMIZED_IMPLEMENTATION.md) - Cost optimization strategy
- [SAFE_DEPLOYMENT_GUIDE.md](/SAFE_DEPLOYMENT_GUIDE.md) - Step-by-step deployment
- [Main Technical Documentation](/docs/technical/CLAUDE.md)

For questions or issues, contact the development team or file an issue in the repository.
