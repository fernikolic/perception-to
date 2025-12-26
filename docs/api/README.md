# Bitcoin Perception API Documentation

The Bitcoin Perception API provides comprehensive Bitcoin market intelligence data including sentiment analysis, trend extraction, and media coverage analytics.

## Base URLs

- **Production**: `https://app.perception.to`
- **API v1**: `https://btcpapifunction-45998414364.us-central1.run.app`
- **API v2**: `https://btcpapifunction2-45998414364.us-central1.run.app`
- **Trends API**: `https://btcpapifunction3-1-45998414364.us-central1.run.app`

## Authentication

Most endpoints require Firebase Authentication. Include the Firebase Auth token in the Authorization header:

```http
Authorization: Bearer {firebase_auth_token}
```

### Getting an Auth Token

```javascript
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const token = await auth.currentUser?.getIdToken();
```

## Rate Limits

- **Free tier**: 100 requests/hour
- **Pro tier**: 1,000 requests/hour
- **Enterprise**: Custom limits

## Endpoints

### Sentiment Analysis

#### Get Sentiment Data
```http
GET /api/sentiment
```

**Parameters:**
- `outlet` (optional): Filter by specific media outlet
- `days` (optional): Number of days to retrieve (default: 30)
- `startDate` (optional): Start date (YYYY-MM-DD)
- `endDate` (optional): End date (YYYY-MM-DD)

**Response:**
```json
{
  "data": [
    {
      "date": "2025-01-15",
      "sentiment": 0.65,
      "volume": 156,
      "outlet": "Forbes",
      "confidence": 0.87
    }
  ],
  "meta": {
    "total": 30,
    "period": "30d"
  }
}
```

### AI Trends

#### Get Business Trends
```http
GET /api/trends
```

**Parameters:**
- `date` (optional): Specific date (YYYY-MM-DD)
- `include_emerging` (optional): Include emerging trends (default: true)
- `category` (optional): Filter by category
- `min_confidence` (optional): Minimum confidence score (0-1)

**Response:**
```json
{
  "trends": [
    {
      "id": "trend_123",
      "title": "Bitcoin ETF Adoption Accelerates",
      "summary": "Institutional adoption continues...",
      "confidence_score": 0.92,
      "signal_strength": "strong",
      "category": "institutional",
      "articles": [
        {
          "title": "BlackRock Increases Bitcoin Holdings",
          "url": "https://example.com/article",
          "outlet": "Bloomberg",
          "sentiment": 0.78,
          "published_at": "2025-01-15T10:30:00Z"
        }
      ],
      "generated_at": "2025-01-15T12:00:00Z"
    }
  ],
  "meta": {
    "total": 15,
    "date": "2025-01-15"
  }
}
```

### Feed Search

#### Hybrid Search
```http
GET /api/feed
```

**Parameters:**
- `q` (required): Search query
- `limit` (optional): Results limit (default: 50, max: 200)
- `offset` (optional): Pagination offset
- `outlet` (optional): Filter by outlet
- `startDate` (optional): Start date filter
- `endDate` (optional): End date filter
- `sentiment` (optional): Filter by sentiment range

**Response:**
```json
{
  "articles": [
    {
      "id": "article_456",
      "title": "Bitcoin Surges Past $100K",
      "content": "Bitcoin reached a new all-time high...",
      "outlet": "CoinDesk",
      "author": "John Smith",
      "published_at": "2025-01-15T09:00:00Z",
      "sentiment": 0.85,
      "url": "https://example.com/article",
      "topics": ["price", "ath", "market"],
      "search_score": 0.94
    }
  ],
  "meta": {
    "total": 1247,
    "limit": 50,
    "offset": 0,
    "query": "bitcoin price surge"
  }
}
```

### Market Data

#### Get Bitcoin Price Data
```http
GET /api/market/price
```

**Parameters:**
- `period` (optional): Time period (1h, 1d, 7d, 30d, 1y)
- `currency` (optional): Target currency (default: USD)

**Response:**
```json
{
  "price": {
    "current": 105000,
    "change_24h": 2.5,
    "change_7d": 8.2,
    "currency": "USD"
  },
  "history": [
    {
      "timestamp": "2025-01-15T12:00:00Z",
      "price": 105000,
      "volume": 15000000000
    }
  ]
}
```

#### Get Fear & Greed Index
```http
GET /api/market/fear-greed
```

**Response:**
```json
{
  "current": {
    "value": 72,
    "classification": "Greed",
    "timestamp": "2025-01-15T12:00:00Z"
  },
  "history": [
    {
      "date": "2025-01-14",
      "value": 68,
      "classification": "Greed"
    }
  ]
}
```

### Media Analytics

#### Get Media Radar
```http
GET /api/media-radar
```

**Parameters:**
- `outlet` (optional): Specific outlet name
- `limit` (optional): Results limit
- `timeframe` (optional): Time period (24h, 7d, 30d)

**Response:**
```json
{
  "outlets": [
    {
      "name": "Bloomberg",
      "mention_count": 45,
      "avg_sentiment": 0.72,
      "influence_score": 0.89,
      "recent_articles": 12
    }
  ],
  "summary": {
    "total_outlets": 50,
    "total_mentions": 1247,
    "avg_sentiment": 0.68
  }
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "The 'date' parameter must be in YYYY-MM-DD format",
    "details": {
      "parameter": "date",
      "received": "2025-1-15",
      "expected": "2025-01-15"
    }
  },
  "timestamp": "2025-01-15T12:00:00Z",
  "request_id": "req_abc123"
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `INVALID_PARAMETER` | 400 | Invalid request parameter |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `NOT_FOUND` | 404 | Resource not found |
| `INTERNAL_ERROR` | 500 | Server error |

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @perception/api-client
```

```javascript
import { PerceptionAPI } from '@perception/api-client';

const api = new PerceptionAPI({
  apiKey: 'your-api-key',
  baseURL: 'https://app.perception.to'
});

const trends = await api.trends.list({
  date: '2025-01-15',
  include_emerging: true
});
```

### Python
```bash
pip install perception-api
```

```python
from perception_api import PerceptionClient

client = PerceptionClient(api_key='your-api-key')
trends = client.trends.list(date='2025-01-15')
```

## Webhooks

Subscribe to real-time updates via webhooks.

### Supported Events
- `trend.created` - New trend identified
- `sentiment.threshold` - Sentiment crosses threshold
- `market.alert` - Market event triggered

### Webhook Setup
```http
POST /api/webhooks
Content-Type: application/json
Authorization: Bearer {token}

{
  "url": "https://your-app.com/webhooks/perception",
  "events": ["trend.created", "sentiment.threshold"],
  "secret": "webhook-secret"
}
```

## Examples

### Get Latest Bitcoin Sentiment
```bash
curl -H "Authorization: Bearer {token}" \
  "https://app.perception.to/api/sentiment?days=7&outlet=Bloomberg"
```

### Search for ETF News
```bash
curl -H "Authorization: Bearer {token}" \
  "https://app.perception.to/api/feed?q=bitcoin+etf&limit=20"
```

### Get Today's Trends
```bash
curl -H "Authorization: Bearer {token}" \
  "https://app.perception.to/api/trends?date=2025-01-15"
```

## Support

- **Documentation**: [docs.perception.to](https://docs.perception.to)
- **Email**: api-support@perception.to
- **Discord**: [Join our community](https://discord.gg/perception)
- **Status Page**: [status.perception.to](https://status.perception.to)

## Changelog

### v2.1.0 (2025-01-15)
- Added media radar endpoint
- Improved sentiment confidence scoring
- New webhook event types

### v2.0.0 (2025-01-01)
- Breaking: Renamed `/search` to `/feed`
- Added AI trends extraction
- Enhanced error responses