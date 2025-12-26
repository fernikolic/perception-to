# Hybrid Feed Function Documentation

**Function Name**: `hybridFeed`
**Project**: perception-app-3db34
**Type**: HTTP Trigger (onRequest)
**Runtime**: Node.js 20
**Status**: ✅ Active

---

## Overview

The hybrid feed function serves as the primary data feed endpoint for the Perception dashboard. It has evolved from a dual Firestore/API system to now exclusively use BigQuery for improved search performance and scalability.

## Configuration

- **Memory**: 1GB
- **Timeout**: 60 seconds
- **Max Instances**: 50
- **Concurrency**: 1000
- **Runtime**: Node.js 20

## Architecture Evolution

### Previous Architecture (Legacy)
```
Client → hybridFeed → [Firestore OR External API] → Response
```

### Current Architecture (BigQuery-Only)
```
Client → hybridFeed → BigQuery Search → Response
```

**Migration Date**: July 2025
**Reason**: Poor text search performance in Firestore, scalability limitations

## Endpoints

### `GET /feed`
Main feed endpoint that returns paginated article data with advanced filtering capabilities.

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `startDate` | string | - | Start date filter (YYYY-MM-DD) |
| `endDate` | string | - | End date filter (YYYY-MM-DD) |
| `outlet` | string | - | Filter by news outlet |
| `sentiment` | string | - | Filter by sentiment (positive/negative/neutral) |
| `keyword` | string | - | Search keyword |
| `exactMatch` | boolean | false | Exact keyword matching |
| `page` | number | 1 | Page number for pagination |
| `pageSize` | number | 50 | Items per page (max: 100) |
| `userId` | string | - | User identifier for personalization |
| `lastDocId` | string | - | Cursor for pagination |
| `lastDocDate` | string | - | Date cursor for pagination |
| `mode` | string | 'fast' | Search mode (fast/complete/progressive) |
| `searchEngine` | string | 'bigquery' | Force search engine (A/B testing) |

#### Response Format

```json
{
  "data": [
    {
      "Title": "Article Title",
      "Content": "Article content...",
      "Outlet": "CoinDesk",
      "Sentiment": "positive",
      "Date": "2025-09-22 18:41:00 UTC",
      "URL": "https://example.com/article",
      "BTC_Price": "65000",
      "Topic_1": "bitcoin",
      "Topic_2": "price",
      "All_Topics": "bitcoin, price, market"
    }
  ],
  "pagination": {
    "total": 1234,
    "page": 1,
    "pageSize": 50,
    "totalPages": 25,
    "hasNextPage": true
  },
  "performance": {
    "source": "bigquery",
    "searchEngine": "bigquery"
  }
}
```

## Implementation Details

### BigQuery Integration

```typescript
// Default to BigQuery search
const result = await searchBigQuery({
  keyword: params.keyword,
  startDate: params.startDate,
  endDate: params.endDate,
  outlet: params.outlet,
  sentiment: params.sentiment,
  exactMatch: params.exactMatch,
  page: params.page,
  pageSize: params.pageSize,
  userId: params.userId
});
```

### Search Capabilities

1. **Full-Text Search**: Uses BigQuery regex patterns with word boundaries
2. **Advanced Filtering**: Multiple simultaneous filters
3. **Entity Recognition**: Identifies companies, people, topics
4. **Semantic Search**: Context-aware matching
5. **Sentiment Analysis**: Positive/negative/neutral classification

### Data Pipeline

```mermaid
graph LR
    A[External APIs] --> B[Daily Sync]
    B --> C[BigQuery Table]
    C --> D[Search Index]
    D --> E[hybridFeed Function]
    E --> F[Frontend]
```

## Usage Analysis

### Frontend Integration

```typescript
// Primary usage in React components
const HYBRID_FEED_ENDPOINT =
  'https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed';

const fetchFeed = async (params: FeedParams) => {
  const response = await fetch(`${HYBRID_FEED_ENDPOINT}/feed?${queryString}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};
```

### Usage Patterns

1. **Dashboard Homepage**: Real-time feed with sentiment filtering
2. **Search Interface**: Keyword-based search with pagination
3. **Analytics Views**: Date-range filtered data
4. **Mobile App**: Paginated feed with optimized payloads

### Traffic Statistics

- **Daily Requests**: ~500-800
- **Peak Usage**: 9 AM - 6 PM EST
- **Average Response Time**: 2.1 seconds
- **Success Rate**: 99.7%

## Performance Metrics

### Current Performance
- **BigQuery Query Time**: 1.5-3.0 seconds
- **Total Response Time**: 2.0-3.5 seconds
- **Cache Hit Rate**: N/A (no caching implemented)
- **Error Rate**: 0.3%

### Optimization Opportunities
1. **Response Caching**: Cache frequent queries for 5-15 minutes
2. **Query Optimization**: Pre-aggregate common filters
3. **Connection Pooling**: Reuse BigQuery connections
4. **Pagination Optimization**: Implement cursor-based pagination

## Data Quality

### Source Coverage
- **Total Records**: 434,617 articles
- **Date Range**: January 2024 - Present
- **Search Coverage**: 91%+ of records searchable
- **Update Frequency**: Daily automated sync

### Data Sources
1. **CoinDesk** - Financial news
2. **Bitcoin Magazine** - Industry insights
3. **Cointelegraph** - Market analysis
4. **The Block** - Institutional coverage
5. **Decrypt** - Technology focus

## Error Handling

### Common Error Types

```typescript
// Error response format
{
  "error": {
    "code": "SEARCH_TIMEOUT",
    "message": "BigQuery search timed out",
    "details": {
      "query": "encrypted_query_hash",
      "executionTime": "30s",
      "suggestion": "Try reducing date range"
    }
  }
}
```

### Error Codes
- `SEARCH_TIMEOUT` - BigQuery query timeout (>30s)
- `INVALID_PARAMETERS` - Malformed query parameters
- `QUOTA_EXCEEDED` - BigQuery quota limits hit
- `INTERNAL_ERROR` - Unexpected service error

### Retry Strategy
1. **Automatic Retries**: 3 attempts for transient errors
2. **Exponential Backoff**: 1s, 2s, 4s delays
3. **Circuit Breaker**: Fallback to cached data if available

## Security & Access Control

### Authentication
- No authentication required (public feed)
- Rate limiting via Cloud Functions quotas
- Optional user ID for personalization

### Data Filtering
- No PII in response data
- Sanitized article content
- Safe HTML rendering on frontend

### Rate Limiting
- **Per IP**: 100 requests/minute
- **Per User**: 200 requests/minute
- **Global**: 1000 requests/minute

## Dependencies

### Internal Functions
- `bigquerySearch` - Core search functionality
- `dailyFeedSync` - Data pipeline
- `manualFeedSync` - Manual data updates

### External Services
- **BigQuery** - Primary data store
- **Google Cloud Storage** - Data pipeline
- **Firebase Functions** - Hosting platform

### Database Schema
```sql
-- Main table: btcp_main_dataset.all_channels_data
TABLE all_channels_data (
  id STRING,
  title STRING,
  content STRING,
  outlet STRING,
  published_date TIMESTAMP,
  sentiment STRING,
  sentiment_score FLOAT64,
  url STRING,
  author STRING,
  tags ARRAY<STRING>,
  search_terms ARRAY<STRING>
)
```

## Monitoring & Alerts

### Key Metrics
1. **Response Time**: Target <3 seconds
2. **Error Rate**: Target <1%
3. **Data Freshness**: Updates within 24 hours
4. **Search Coverage**: Maintain >90%

### Alerting Rules
```yaml
alerts:
  - name: "High Error Rate"
    condition: "error_rate > 5%"
    duration: "5m"

  - name: "Slow Response Time"
    condition: "response_time > 5s"
    duration: "2m"

  - name: "Data Pipeline Failure"
    condition: "last_sync > 36h"
    duration: "1m"
```

## Future Roadmap

### Short-term (1-3 months)
1. **Implement Caching**: Redis for frequent queries
2. **Pagination Improvements**: Cursor-based navigation
3. **Search Analytics**: Track query patterns

### Medium-term (3-6 months)
1. **Real-time Updates**: WebSocket for live feed
2. **Advanced Filtering**: ML-based content categorization
3. **Personalization**: User preference learning

### Long-term (6+ months)
1. **Multi-language Support**: International content
2. **Sentiment Analysis**: Advanced NLP models
3. **Predictive Analytics**: Trend forecasting

## Related Documentation

- [BigQuery Search Implementation](./bigquery-search.md)
- [Data Pipeline Overview](../data/DATA_PIPELINE_OVERVIEW.md)
- [Daily Feed Sync](./daily-feed-sync.md)
- [Frontend Feed Integration](../../frontend/feed-integration.md)

---

**Last Updated**: September 22, 2025
**Maintainer**: Data Engineering Team
**Status**: ✅ Production Ready