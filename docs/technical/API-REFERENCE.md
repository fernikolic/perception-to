# Bitcoin Perception API Reference

## 🌐 Production Endpoints

### Domain Structure
- **Frontend**: [app.perception.to](https://app.perception.to)
- **API Gateway**: [api.perception.to](https://api.perception.to)
- **Website**: [perception.to](https://perception.to)

### Service URLs
- **Trends Service**: `https://btcpapifunction3-1-final-45998414364.us-central1.run.app`
- **Legacy Service**: `https://btcpapifunction-45998414364.us-central1.run.app` (deprecated)

## 🏗 Architecture

### Current Data Pipeline
1. **Article Ingestion** → BigQuery (`all_channels_data`)
2. **AI Trend Extraction** → Cloud Run (hourly via OpenAI GPT-4o-mini)
3. **Trend Storage** → BigQuery (`ai_trends_tracking`)
4. **API Layer** → Cloud Run + Firebase Functions
5. **Frontend** → React app with real-time updates

## 🔗 API Endpoints

### Authentication
All authenticated endpoints require Firebase Auth token:
```http
Authorization: Bearer {firebase_id_token}
```

### Trends API

#### GET /trends
Fetch AI-extracted business trends.

**Query Parameters:**
- `date` (string, optional): Specific date (YYYY-MM-DD)
- `startDate` (string, optional): Start of date range
- `endDate` (string, optional): End of date range
- `limit` (number, default: 50): Maximum results
- `include_emerging` (boolean, default: false): Include low-confidence trends

**Response:**
```json
[
  {
    "id": "trend_abc123",
    "title": "MicroStrategy Acquires 15,000 BTC at $95K Average",
    "summary": "MicroStrategy purchased 15,000 Bitcoin...",
    "key_highlights": [
      "15,000 BTC purchased at $95K average",
      "Total holdings reach 175,000 BTC"
    ],
    "categories": ["capital_flow", "competitive_move"],
    "article_count": 12,
    "signal_strength": "strong",
    "confidence_score": 0.95,
    "business_implications": "Validates institutional treasury strategy",
    "generated_at": {"value": "2025-09-25T10:00:00Z"},
    "articles": [...]
  }
]
```

#### POST /extract
Manually trigger trend extraction (admin only).

**Request Body:**
```json
{
  "hours_back": 168
}
```

#### GET /intelligence/categories
Fetch trend categories with counts for UI filtering.

**Query Parameters:**
- `hours` (number, default: 24): Lookback window in hours (recommended: 8760 for comprehensive stats)
- `limit` (number, default: 20): Maximum categories to return

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
  },
  {
    "category": "Institutional",
    "trend_count": 90
  },
  {
    "category": "Adoption Acceleration",
    "trend_count": 88
  }
]
```

**Example:**
```bash
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/intelligence/categories?hours=8760"
```

### Sentiment API

#### GET /sentiment
Historical sentiment data by outlet.

**Query Parameters:**
- `outlet` (string, optional): Specific news outlet
- `days` (number, default: 30): Number of days
- `startDate` (string, optional): Start date (YYYY-MM-DD)
- `endDate` (string, optional): End date (YYYY-MM-DD)

**Response:**
```json
{
  "sentiment_data": [
    {
      "date": "2025-09-25",
      "outlet": "Forbes",
      "sentiment": "positive",
      "score": 0.75,
      "article_count": 15
    }
  ]
}
```

### Feed API

#### GET /feed
Article feed with hybrid search capabilities.

**Query Parameters:**
- `q` (string, optional): Search query
- `limit` (number, default: 50): Results limit
- `outlet` (string, optional): Filter by outlet
- `sentiment` (string, optional): Filter by sentiment
- `startDate` (string, optional): Start date filter

**Response:**
```json
{
  "articles": [
    {
      "id": "article_123",
      "title": "Bitcoin Reaches New All-Time High",
      "content": "Bitcoin price surged to...",
      "outlet": "Reuters",
      "url": "https://...",
      "date": "2025-09-25T08:00:00Z",
      "sentiment": "positive"
    }
  ],
  "total": 1247,
  "has_more": true
}
```

#### GET /media-radar ⚡ **NEW**
Ultra-fast optimized endpoint for Media Radar page with parallel queries and performance optimizations.

**Query Parameters:**
- `outlet` (string, **required**): News outlet name
- `startDate` (string, optional): Start date (YYYY-MM-DD), defaults to 7 days ago
- `endDate` (string, optional): End date (YYYY-MM-DD), defaults to today
- `topic` (string, optional): Topic filter for server-side filtering
- `limit` (number, default: 50, max: 100): Maximum results

**Response:**
```json
{
  "outlet": "CoinDesk",
  "dateRange": {
    "start": "2025-09-20",
    "end": "2025-09-27"
  },
  "topic": null,
  "stats": {
    "totalArticles": 71,
    "sentimentBreakdown": {
      "positive": 20,
      "neutral": 30,
      "negative": 21
    },
    "dateRange": {
      "earliest": {"value": "2025-09-20T16:45:00.000Z"},
      "latest": {"value": "2025-09-26T20:12:00.000Z"}
    }
  },
  "articles": [
    {
      "title": "Bitcoin Edges Higher, ETH Rebounds Above $4k",
      "date": {"value": "2025-09-26T20:12:00.000Z"},
      "url": "https://www.coindesk.com/markets/...",
      "sentiment": "Negative",
      "imageUrl": "https://cdn.sanity.io/images/...",
      "author": null
    }
  ],
  "performance": {
    "queryTime": "245ms",
    "articlesQuery": "120ms",
    "statsQuery": "125ms"
  }
}
```

**Features:**
- ⚡ **Parallel BigQuery queries** for blazing speed
- 🎯 **Essential fields only** (Title, Date, URL, Sentiment, Image_URL, author_name)
- 🚀 **Server-side topic filtering** for performance
- 💾 **HTTP caching headers** (5-minute cache)
- 📊 **Performance metrics** included in response
- ✅ **Error handling** and input validation

### Market API

#### GET /market
Current Bitcoin market data.

**Response:**
```json
{
  "price": {
    "usd": 95420.50,
    "change_24h": 2.34,
    "change_percentage_24h": 2.5
  },
  "market_cap": {
    "usd": 1890450000000,
    "rank": 1
  },
  "volume_24h": {
    "usd": 28740000000
  },
  "fear_greed_index": {
    "value": 75,
    "classification": "Greed",
    "last_updated": "2025-09-25T12:00:00Z"
  }
}
```

### User Management

#### GET /api/users/{uid}
Get user profile (authenticated).

#### PUT /api/users/{uid}
Update user profile (authenticated).

#### POST /api/auth
Authenticate user session.

### Subscription Management

#### POST /api/stripe/create-checkout-session
Create Stripe checkout session (authenticated).

**Request Body:**
```json
{
  "price_id": "price_1234567890",
  "success_url": "https://app.perception.to/success",
  "cancel_url": "https://app.perception.to/cancel"
}
```

#### POST /api/stripe/create-portal-session
Create customer portal session (authenticated).

#### POST /api/stripe/webhook
Stripe webhook handler (internal).

### Research Tools

#### POST /api/research/brief
Generate AI research brief (authenticated).

**Request Body:**
```json
{
  "query": "Bitcoin institutional adoption",
  "days": 7,
  "outlets": ["Forbes", "Reuters"]
}
```

#### POST /api/research/export
Export research data (authenticated).

#### POST /api/research/save
Save research item (authenticated).

## 🔒 Rate Limits

- **Public endpoints**: 100 requests/minute
- **Authenticated endpoints**: 1000 requests/minute
- **Extract endpoint**: 1 request/hour (admin only)

## 📊 Status Codes

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limited
- `500` - Internal Server Error

## 🧪 Testing

### Development
```bash
# Test trends endpoint
curl https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends

# Test with auth
curl -H "Authorization: Bearer $TOKEN" \
  https://api.perception.to/api/users/abc123
```

### Monitoring
- **Uptime**: Monitored via Google Cloud Monitoring
- **Performance**: Response time tracking
- **Errors**: Automatic alerting for 5xx errors
- **Usage**: Analytics for endpoint usage patterns

## 📞 Support

- **Technical Issues**: dev@perception.to
- **API Questions**: api-support@perception.to
- **Status Page**: [status.perception.to](https://status.perception.to)

---

Last updated: September 2025
For implementation details, see [Technical Documentation](./CLAUDE.md)