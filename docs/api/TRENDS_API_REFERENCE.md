# Trends API Reference

**Base URL:** `https://btcpapifunction3-1-final-45998414364.us-central1.run.app`
**Version:** 3.4 (with immutable timestamps for stable sorting)
**Last Updated:** November 27, 2025

---

## Endpoints

### POST `/extract`

Extracts trends from recent Bitcoin-related articles and intelligently updates existing trends or creates new ones.

#### Features
- ✅ Analyzes last 24 hours of articles
- ✅ Extracts 6-10 trends using GPT-4o-mini
- ✅ Deduplicates against existing trends (55% similarity threshold)
- ✅ Updates existing trends with new articles
- ✅ Only creates genuinely new trends

#### Request

```bash
curl -X POST https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract \
  -H "Content-Type: application/json"
```

No request body required.

#### Response

```json
{
  "status": "success",
  "message": "Processed 7 trends from 200 articles (1 new, 6 updated)",
  "trends": [
    {
      "id": "trend_1763016330297_0",
      "title": "MicroStrategy's Bitcoin Holdings Decline as Corporate Adoption Grows",
      "summary": "MicroStrategy's share of total corporate Bitcoin reserves has decreased from 75% to 60%...",
      "key_highlights": [
        "MicroStrategy holds 640,808 BTC, down to 60% of corporate reserves",
        "Coinbase purchased 2,772 BTC, Metaplanet led with 5,268 BTC"
      ],
      "articles": [
        {
          "url": "https://cryptonews.com/...",
          "title": "Bitcoin Price Prediction...",
          "outlet": "Crypto News",
          "published_at": "2025-11-12T18:58:00.000Z",
          "sentiment": "Positive"
        }
      ],
      "article_count": 8,
      "update_count": 1,
      "signal_strength": "strong",
      "confidence_score": 0.8,
      "categories": ["capital_flow", "competitive_move"],
      "business_implications": "Increased corporate adoption may lead to a more stable Bitcoin market...",
      "generated_at": { "value": "2025-11-13T06:45:30.589Z" },
      "action": "updated"
    }
  ],
  "meta": {
    "sourceArticleCount": 200,
    "analysisArticleCount": 100,
    "trendCount": 7,
    "trendsCreated": 1,
    "trendsUpdated": 6,
    "model": "gpt-4o-mini",
    "promptVersion": "3.0_improved_dedup",
    "dataSource": "bigquery-live",
    "timeRange": "24_hours",
    "extractedAt": "2025-11-14T13:15:36.443Z",
    "similarityThreshold": 0.55,
    "deduplicationEnabled": true
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | "success" or "error" |
| `message` | string | Human-readable summary with stats |
| `trends` | array | Array of trend objects |
| `meta.trendsCreated` | number | Number of new trends inserted |
| `meta.trendsUpdated` | number | Number of existing trends updated |
| `meta.similarityThreshold` | number | Threshold used for deduplication (0.55) |

#### Trend Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique trend identifier |
| `title` | string | Specific, actionable trend title |
| `summary` | string | 2-3 sentence summary |
| `key_highlights` | array | Key points (usually 2-3) |
| `articles` | array | Source articles with metadata |
| `article_count` | number | Total number of source articles |
| `update_count` | number | Number of times trend was updated |
| `signal_strength` | string | "early", "emerging", or "strong" |
| `confidence_score` | number | 0.0-1.0 confidence metric |
| `categories` | array | Trend categories |
| `business_implications` | string | Business context and impact |
| `image_url` | string | Featured image URL (absolute or relative) |
| `action` | string | "created" or "updated" (meta field) |

#### Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 500 | Server error (check logs) |

---

### GET `/trends`

Retrieves trends with optional filtering and date range support.

#### Request

```bash
# Get last 48 hours of trends
curl https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?hours=48

# Get specific date
curl https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?date=2025-11-14

# Get emerging trends only
curl https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?include_emerging=true&hours=24

# Filter by minimum article count
curl https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?min_article_count=5&limit=20
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `hours` | number | 168 (7 days) | Time window in hours |
| `date` | string | - | Specific date (YYYY-MM-DD) |
| `include_emerging` | boolean | false | Include emerging trends (3-5 articles) |
| `limit` | number | - | Max number of trends to return |
| `min_article_count` | number | - | Filter by minimum article count |
| `startDate` | string | - | Start of date range (YYYY-MM-DD) |
| `endDate` | string | - | End of date range (YYYY-MM-DD) |

#### Response

```json
{
  "success": true,
  "trends": [
    {
      "id": "trend_1763016330297_0",
      "title": "Bitcoin Price Drops Below $95,000 Amid Market Turmoil",
      "summary": "...",
      "key_highlights": [...],
      "articles": [...],
      "article_count": 34,
      "update_count": 11,
      "signal_strength": "strong",
      "confidence_score": 0.95,
      "categories": ["price_movement", "market_sentiment"],
      "first_seen": "2025-11-13T06:45:30.589Z",
      "last_updated": "2025-11-14T13:15:36.443Z",
      "generated_at": "2025-11-13T06:45:30.589Z"
    }
  ],
  "count": 25
}
```

#### Timestamp Fields (v3.4 Immutable Timestamps)

| Field | Description | Mutable? |
|-------|-------------|----------|
| `first_seen` | When trend was first created (v3.4+) | **No** |
| `generated_at` | Original creation timestamp (same as first_seen) | **No** |
| `last_updated` | When articles were last added to trend | Yes |
| `update_count` | Number of times trend has been updated | Yes |

**Important (v3.4):** `first_seen` and `generated_at` are now **immutable** - they never change after the trend is created. This ensures trends stay in chronological order based on when they first emerged, even when new articles are added.

Previously, `generated_at` was updated whenever articles were added, causing old trends to resurface to the top of the UI. This UX issue is fixed in v3.4.

#### Signal Strength Classification

| Strength | Criteria | Description |
|----------|----------|-------------|
| `early` | 1-2 articles | Breaking story, single source |
| `emerging` | 3-5 articles | Growing story, multiple sources |
| `strong` | 6+ articles | Established story, wide coverage |

---

### GET `/trends/count`

Get the count of trends for a specific date.

#### Request

```bash
curl https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends/count?date=2025-11-14
```

#### Response

```json
{
  "count": 25,
  "date": "2025-11-14"
}
```

---

### GET `/intelligence/categories`

Get available trend categories with trend counts.

#### Request

```bash
curl https://btcpapifunction3-1-final-45998414364.us-central1.run.app/intelligence/categories?hours=48
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `hours` | number | 168 (7 days) | Time window in hours |

#### Response

```json
[
  {
    "category": "price_movement",
    "trend_count": 12
  },
  {
    "category": "regulatory_development",
    "trend_count": 8
  },
  {
    "category": "capital_flow",
    "trend_count": 15
  }
]
```

---

## Rate Limits

No rate limits currently enforced. Service is unauthenticated and publicly accessible.

---

## Error Responses

### 500 Internal Server Error

```json
{
  "error": "Error message describing what went wrong"
}
```

Common causes:
- BigQuery query timeout
- OpenAI API error
- Missing environment variables

---

## Data Freshness

- **Articles:** Fetched from last 24 hours
- **Trends:** Stored for 7+ days in BigQuery
- **Extract Frequency:** Run on-demand or via Cloud Scheduler
- **Update Lag:** Real-time (trends update immediately when /extract runs)

---

## Examples

### Example 1: Daily Trend Extraction

```bash
#!/bin/bash
# Run daily at 9 AM to extract overnight trends

curl -X POST https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract

# Response shows how many trends were updated vs created
# Example: "Processed 8 trends from 180 articles (2 new, 6 updated)"
```

### Example 2: Get Today's Trends for Dashboard

```bash
#!/bin/bash
TODAY=$(date +%Y-%m-%d)

curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?date=$TODAY" \
  | jq '.trends[] | {title, article_count, signal_strength}'
```

Output:
```json
{
  "title": "Bitcoin Price Drops Below $95,000 Amid Market Turmoil",
  "article_count": 34,
  "signal_strength": "strong"
}
{
  "title": "Taiwan Evaluates Bitcoin for National Reserves",
  "article_count": 8,
  "signal_strength": "strong"
}
```

### Example 3: Monitor Trend Growth

```bash
#!/bin/bash
# Check which trends are actively growing (being updated)

curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?hours=24" \
  | jq '.trends[] | select(.update_count > 0) | {title, article_count, update_count}'
```

Output:
```json
{
  "title": "Michael Saylor Confirms Continued Bitcoin Purchases",
  "article_count": 102,
  "update_count": 38
}
{
  "title": "Bitcoin Price Drops Below $95,000 Amid Market Turmoil",
  "article_count": 34,
  "update_count": 11
}
```

---

## Webhook Integration

### Slack Notifications

Trends are automatically sent to Slack for premium users via `/functions/src/slack-trend-notifications.ts`.

**Trigger:** Cloud Scheduler (every 15 minutes)

**Logic:**
- Fetches trends from `/trends?hours=12&include_emerging=true`
- Filters for early/emerging signals only
- Checks if trend already notified (hash-based deduplication)
- Sends formatted Slack block message
- Marks trend as notified in Firestore

**Important:** Only NEW trends trigger notifications. UPDATED trends are silent to prevent spam.

---

## Monitoring

### Health Check

```bash
curl https://btcpapifunction3-1-final-45998414364.us-central1.run.app/
```

Response:
```json
{
  "status": "ok",
  "service": "btc-trends-ui-compatible",
  "version": "3.0",
  "timestamp": "2025-11-14T13:15:36.443Z"
}
```

### Check Recent Updates

```sql
-- Run in BigQuery
SELECT
  title,
  article_count,
  update_count,
  TIMESTAMP_DIFF(CURRENT_TIMESTAMP(), last_updated, MINUTE) as mins_ago
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE last_updated >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR)
ORDER BY last_updated DESC
LIMIT 20;
```

---

## Authentication

Currently **unauthenticated**. All endpoints are publicly accessible via `--allow-unauthenticated` Cloud Run setting.

Future: Consider adding API key authentication for `/extract` endpoint.

---

## Support

- **Issues:** https://github.com/anthropics/claude-code/issues
- **Documentation:** `/docs/trends/`
- **Logs:** Cloud Run console for `btcpapifunction3-1-final`

---

## Image System

### Image Sources

Trends include a `image_url` field that provides a visual representation for each trend. The system uses a priority-based approach:

1. **Primary**: `trend.image_url` - Direct image URL stored with the trend
2. **Articles**: Extract from `articles[].Image_URL` or `articles[].imageUrl` fields
3. **Backwards Compatibility**: Real-time lookup from `all_channels_data` table in BigQuery
4. **Fallback**: Random gradient from `/gradients/` directory (15 unique gradients)

### Image URL Formats

The API returns two types of image URLs:

- **Absolute URLs**: `https://images.cointelegraph.com/images/...` (from article sources)
- **Relative URLs**: `/gradients/gradient1.jpg` (gradient fallbacks)

Frontend clients should handle both formats appropriately.

### Backwards Compatibility (v3.1)

**Problem**: Trends created before November 16, 2025 lack `Image_URL` fields in stored articles.

**Solution**: The `/trends` endpoint now performs real-time lookups:

```javascript
// Pseudocode for backwards-compatible image lookup
if (!trend.image_url && !articlesHaveImages(trend.articles)) {
  const urls = trend.articles.map(a => a.url).slice(0, 5);
  const image = await queryBigQuery(`
    SELECT Image_URL FROM all_channels_data
    WHERE URL IN (${urls})
    LIMIT 1
  `);
  trend.image_url = image || getRandomGradient();
}
```

This ensures:
- **76% of trends** show real article images
- **23% of trends** use gradient fallbacks (primarily social media posts)
- **0% missing images** (all trends have visual representation)

### Gradient Fallback Strategy

Gradients are used when:
1. Articles genuinely lack images in source data
2. Sources are social media (X/Twitter, Reddit)
3. Real-time BigQuery lookup finds no images

Available gradients: 15 unique abstract gradient images in `/public/gradients/`

### Performance Considerations

- **Cache-friendly**: Image URLs are stable (don't change frequently)
- **BigQuery Optimization**: Lookups limited to 5 articles max per trend
- **Async Processing**: Image lookups don't block main trend data response

---

**Last Updated:** November 27, 2025
