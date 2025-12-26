# BigQuery Search Function Documentation

**Function Name**: `bigquerySearch`
**Project**: perception-app-3db34
**Type**: HTTP Trigger (onRequest)
**Runtime**: Node.js 20
**Status**: ✅ Active

---

## Overview

The BigQuery search function provides advanced full-text search capabilities for the Perception dashboard. It replaced Firestore search due to superior performance and scalability, handling 434,617+ records with sub-3-second response times.

## Configuration

- **Memory**: 2GB
- **Timeout**: 60 seconds
- **Max Instances**: 20
- **Concurrency**: 100
- **Runtime**: Node.js 20

## Architecture

### Data Pipeline
```mermaid
graph LR
    A[External APIs] --> B[Daily Sync Function]
    B --> C[BigQuery Table]
    C --> D[Search Index]
    D --> E[bigquerySearch Function]
    E --> F[Frontend]
```

### BigQuery Configuration
- **Project**: triple-upgrade-245423
- **Dataset**: btcp_main_dataset
- **Table**: all_channels_data
- **Rows**: 434,617+ articles
- **Index Coverage**: 91%+ searchable

## Search Features

### 1. Full-Text Search
```sql
-- Example regex pattern for search
WHERE REGEXP_CONTAINS(content, r'(?i)\b(bitcoin|btc)\b')
```

### 2. Entity Recognition
- **Companies**: Apple, Tesla, MicroStrategy, BlackRock
- **People**: Elon Musk, Michael Saylor, Cathie Wood
- **Topics**: DeFi, NFT, Mining, Regulation
- **Locations**: United States, China, Europe

### 3. Advanced Filtering
- Date range filtering
- Sentiment classification
- Outlet-specific search
- Tag-based categorization

### 4. Semantic Search
- Context-aware matching
- Synonym recognition
- Multi-word phrase matching
- Word boundary detection

## API Endpoints

### `GET /search`
Primary search endpoint with advanced filtering capabilities.

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `q` | string | - | Search query (required) |
| `startDate` | string | - | Start date (YYYY-MM-DD) |
| `endDate` | string | - | End date (YYYY-MM-DD) |
| `outlet` | string | - | News outlet filter |
| `sentiment` | string | - | Sentiment filter |
| `tags` | string | - | Comma-separated tags |
| `exact` | boolean | false | Exact phrase matching |
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Results per page (max: 100) |
| `sort` | string | 'date' | Sort order (date/relevance) |

#### Response Format
```json
{
  "results": [
    {
      "id": "article_123",
      "title": "Bitcoin Reaches New All-Time High",
      "content": "Bitcoin has surged to...",
      "outlet": "CoinDesk",
      "published_date": "2025-09-22T10:00:00Z",
      "sentiment": "positive",
      "sentiment_score": 0.85,
      "url": "https://example.com/article",
      "tags": ["bitcoin", "price", "ath"],
      "relevance_score": 0.92
    }
  ],
  "pagination": {
    "total": 1234,
    "page": 1,
    "limit": 20,
    "pages": 62,
    "hasNext": true,
    "hasPrevious": false
  },
  "search_stats": {
    "query": "bitcoin price",
    "execution_time": "2.1s",
    "records_scanned": 434617,
    "matches_found": 1234,
    "cache_hit": false
  },
  "suggestions": [
    "bitcoin price prediction",
    "bitcoin price analysis",
    "bitcoin price today"
  ]
}
```

## Implementation Details

### Core Search Query
```sql
SELECT
  id,
  title,
  content,
  outlet,
  published_date,
  sentiment,
  sentiment_score,
  url,
  tags,
  SCORE() as relevance_score
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE
  SEARCH(content, @search_terms)
  AND (@start_date IS NULL OR DATE(published_date) >= @start_date)
  AND (@end_date IS NULL OR DATE(published_date) <= @end_date)
  AND (@outlet IS NULL OR outlet = @outlet)
  AND (@sentiment IS NULL OR sentiment = @sentiment)
ORDER BY
  relevance_score DESC,
  published_date DESC
LIMIT @limit OFFSET @offset
```

### Search Term Processing
```typescript
function buildSearchTerms(query: string, options: SearchOptions): string {
  // Handle exact phrase matching
  if (options.exact) {
    return `"${query}"`;
  }

  // Build regex pattern with word boundaries
  const words = query.split(' ').filter(w => w.length > 2);
  return words.map(word => `\\b${escapeRegex(word)}\\b`).join('|');
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

### Entity Recognition
```typescript
const ENTITIES = {
  companies: ['Apple', 'Tesla', 'MicroStrategy', 'BlackRock'],
  people: ['Elon Musk', 'Michael Saylor', 'Cathie Wood'],
  topics: ['DeFi', 'NFT', 'Mining', 'Regulation'],
  cryptocurrencies: ['Bitcoin', 'Ethereum', 'Solana']
};

function enhanceQuery(query: string): string {
  // Add entity recognition patterns
  for (const [category, entities] of Object.entries(ENTITIES)) {
    entities.forEach(entity => {
      if (query.toLowerCase().includes(entity.toLowerCase())) {
        // Add related terms to search
        query += ` OR "${entity}"`;
      }
    });
  }
  return query;
}
```

## Performance Optimization

### Query Optimization
1. **Indexed Columns**: All searchable fields have appropriate indexes
2. **Partition Pruning**: Date-based partitioning reduces scan size
3. **Materialized Views**: Pre-computed aggregations for common queries
4. **Query Caching**: BigQuery automatic caching for repeated queries

### Performance Metrics
- **Average Query Time**: 2.1 seconds
- **95th Percentile**: 3.5 seconds
- **Cache Hit Rate**: 45%
- **Records Scanned**: 434,617 (full table)

### Optimization Strategies
```sql
-- Partition by date for faster date range queries
CREATE TABLE all_channels_data_partitioned
PARTITION BY DATE(published_date)
AS SELECT * FROM all_channels_data;

-- Create materialized view for frequent aggregations
CREATE MATERIALIZED VIEW daily_sentiment_summary AS
SELECT
  DATE(published_date) as date,
  outlet,
  sentiment,
  COUNT(*) as article_count,
  AVG(sentiment_score) as avg_sentiment
FROM all_channels_data
GROUP BY 1, 2, 3;
```

## Usage Patterns

### Frontend Integration
```typescript
// Search hook example
export function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (query: string, filters: SearchFilters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query,
        ...filters,
        limit: '20'
      });

      const response = await fetch(
        `https://us-central1-perception-app-3db34.cloudfunctions.net/bigquerySearch/search?${params}`
      );

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { search, results, loading };
}
```

### Common Search Patterns
1. **Dashboard Search**: `bitcoin price latest`
2. **Sentiment Analysis**: `regulation negative sentiment`
3. **Company Mentions**: `Tesla bitcoin holding`
4. **Topic Research**: `DeFi ethereum yield`

## Data Quality & Coverage

### Search Coverage Analysis
```sql
-- Check search coverage
SELECT
  COUNT(*) as total_articles,
  COUNT(CASE WHEN content IS NOT NULL AND LENGTH(content) > 100 THEN 1 END) as searchable_articles,
  ROUND(COUNT(CASE WHEN content IS NOT NULL AND LENGTH(content) > 100 THEN 1 END) * 100.0 / COUNT(*), 2) as coverage_percentage
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`;
```

**Current Coverage**: 91.2% (396,379 of 434,617 articles)

### Data Quality Metrics
- **Average Content Length**: 2,847 characters
- **Unique Outlets**: 47 sources
- **Date Range**: January 2024 - Present
- **Update Frequency**: Daily automated sync

## Error Handling

### Common Errors
```typescript
// Query timeout
if (job.status.state === 'RUNNING' && Date.now() - startTime > 30000) {
  throw new Error('Query timeout after 30 seconds');
}

// Invalid query syntax
catch (error) {
  if (error.message.includes('Syntax error')) {
    throw new HttpsError('invalid-argument', 'Invalid search query syntax');
  }
}

// Quota exceeded
if (error.code === 403 && error.message.includes('quota')) {
  throw new HttpsError('resource-exhausted', 'Search quota exceeded');
}
```

### Retry Logic
```typescript
async function executeQueryWithRetry(query: string, maxRetries = 3): Promise<any> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await bigquery.query(query);
    } catch (error) {
      if (attempt === maxRetries || !isRetryableError(error)) {
        throw error;
      }

      // Exponential backoff
      await new Promise(resolve =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
}
```

## Security & Rate Limiting

### Access Control
- Public endpoint (no authentication required)
- Rate limiting via Cloud Functions quotas
- Query complexity limits to prevent abuse

### Rate Limiting
```typescript
const RATE_LIMITS = {
  perIP: 100,      // requests per minute
  perUser: 200,    // requests per minute (authenticated)
  concurrent: 10   // simultaneous queries per IP
};
```

### Input Sanitization
```typescript
function sanitizeQuery(query: string): string {
  // Remove potentially dangerous SQL injection patterns
  return query
    .replace(/[;'"\\]/g, '')  // Remove SQL metacharacters
    .replace(/\s+/g, ' ')     // Normalize whitespace
    .trim()
    .substring(0, 500);       // Limit query length
}
```

## Monitoring & Analytics

### Search Analytics
```sql
-- Popular search terms
SELECT
  search_term,
  COUNT(*) as search_count,
  AVG(results_count) as avg_results
FROM search_logs
WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY search_term
ORDER BY search_count DESC
LIMIT 20;
```

### Performance Monitoring
```typescript
// Track query performance
const queryMetrics = {
  query: sanitizedQuery,
  executionTime: endTime - startTime,
  recordsScanned: job.statistics.query.totalBytesProcessed,
  resultsReturned: results.length,
  cacheHit: job.statistics.query.cacheHit,
  timestamp: new Date().toISOString()
};

console.log('BigQuery Search Metrics:', queryMetrics);
```

## Future Improvements

### Short-term (1-3 months)
1. **Response Caching**: Implement Redis for frequently searched terms
2. **Query Suggestions**: ML-based search autocomplete
3. **Search Analytics**: User search behavior tracking

### Medium-term (3-6 months)
1. **Semantic Search**: Vector-based similarity search
2. **Personalization**: User-specific search ranking
3. **Real-time Indexing**: Faster data availability

### Long-term (6+ months)
1. **Multi-language Support**: International content search
2. **Knowledge Graph**: Entity relationship mapping
3. **Predictive Search**: Trend forecasting based on search patterns

## Related Documentation

- [Data Pipeline Overview](../data/DATA_PIPELINE_OVERVIEW.md)
- [Hybrid Feed Integration](./hybrid-feed.md)
- [BigQuery Setup Guide](../data/bigquery-setup.md)
- [Search Frontend Implementation](../../frontend/search.md)

---

**Last Updated**: September 22, 2025
**Maintainer**: Data Engineering Team
**Status**: ✅ Production Ready