# Backend API Fix Required: media-radar Endpoint

## Issue
The `/media-radar` endpoint at `https://btcpapifunction3-1-final-45998414364.us-central1.run.app/media-radar` is not properly handling aggregation requests and is limiting results to 50 items.

## Current Behavior
```bash
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/media-radar?startDate=2023-10-26&endDate=2025-10-24&userId=perception&outlet=Cointelegraph&aggregate=monthly"
```

Returns:
- **Articles**: 50 (hard limit)
- **Aggregation Type**: `none` (parameter ignored)
- **Stats**: `totalArticles: 4659` (data exists but not returned)

## Expected Behavior
When `aggregate=monthly` is passed:
- Should return **~24 monthly aggregated data points** (one per month for 2-year period)
- Should set `aggregationType: "monthly"`
- Each data point should contain:
  - `period`: e.g., "2024-01", "2024-02"
  - `articleCount`: number of articles in that month
  - `sentimentBreakdown`: { positive, neutral, negative }
  - `sampleArticles`: array of 3-5 sample articles from that period

## Required Changes to Backend

### 1. Add Aggregation Support
The endpoint should check for the `aggregate` query parameter and group data accordingly:

```javascript
const aggregateType = req.query.aggregate; // 'daily', 'weekly', 'monthly', or none

if (aggregateType && aggregateType !== 'none') {
  // Group articles by the requested period
  // Return aggregated data with article counts per period
} else {
  // Return individual articles (with increased limit)
}
```

### 2. Monthly Aggregation Logic
```javascript
if (aggregateType === 'monthly') {
  // SQL example for BigQuery:
  const query = `
    SELECT
      FORMAT_TIMESTAMP('%Y-%m', Date) as period,
      COUNT(*) as articleCount,
      COUNTIF(Sentiment = 'Positive') as positive,
      COUNTIF(Sentiment = 'Neutral') as neutral,
      COUNTIF(Sentiment = 'Negative') as negative,
      ARRAY_AGG(
        STRUCT(title, date, url, sentiment, imageUrl, author)
        ORDER BY date DESC LIMIT 5
      ) as sampleArticles
    FROM dataset.articles
    WHERE outlet = ?
      AND date >= ?
      AND date <= ?
    GROUP BY period
    ORDER BY period ASC
  `;

  // Return format:
  return {
    articles: [
      {
        period: "2024-01",
        date: "2024-01-01",
        articleCount: 245,
        sentimentBreakdown: {
          positive: 110,
          neutral: 85,
          negative: 50
        },
        sampleArticles: [
          { title: "...", date: "...", url: "...", sentiment: "...", imageUrl: "...", author: "..." },
          ...
        ]
      },
      ...
    ],
    aggregationType: "monthly",
    stats: {
      totalArticles: 4659,
      sentimentBreakdown: { positive: 2099, neutral: 1537, negative: 989 },
      dateRange: { earliest: "...", latest: "..." }
    },
    outlet: "Cointelegraph"
  };
}
```

### 3. Weekly Aggregation Logic
```javascript
if (aggregateType === 'weekly') {
  // Group by ISO week (YYYY-Www format)
  // Similar to monthly but grouped by week
}
```

### 4. Increase Default Limit
For non-aggregated requests:
- Current: 50 items
- Required: At least 1000-5000 items
- Or add pagination support

## Testing
After fixing, test with:
```bash
# Monthly aggregation (should return ~24 periods)
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/media-radar?startDate=2023-10-26&endDate=2025-10-24&userId=perception&outlet=Cointelegraph&aggregate=monthly"

# Weekly aggregation (should return ~104 weeks)
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/media-radar?startDate=2023-10-26&endDate=2025-10-24&userId=perception&outlet=Cointelegraph&aggregate=weekly"

# Daily aggregation (should return ~730 days)
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/media-radar?startDate=2023-10-26&endDate=2025-10-24&userId=perception&outlet=Cointelegraph&aggregate=daily"

# No aggregation (should return more than 50 items)
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/media-radar?startDate=2023-10-26&endDate=2025-10-24&userId=perception&outlet=Cointelegraph"
```

## Frontend Status
✅ Frontend is ready and will automatically work once backend is fixed:
- Detects date range size (7 days, 60 days, 180+ days, 730+ days)
- Requests appropriate aggregation type (daily/weekly/monthly)
- Handles aggregated response format
- Falls back to processing individual articles if needed

## Impact
- **Volume Chart**: Currently flatlined for historical data - will show proper trends once fixed
- **Latest Coverage**: Limited to 50 articles - will show all articles once limit removed
- **Performance**: Aggregation will reduce data transfer and improve load times

## Priority
🔴 HIGH - Core functionality is broken for historical analysis
