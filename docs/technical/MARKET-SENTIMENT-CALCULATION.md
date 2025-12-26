# Market Sentiment Index Calculation

## Overview

The **Market Sentiment Index** (displayed as "Market Sentiment" on the homepage) is derived from the Fear & Greed Index, which quantifies market sentiment on a 0-100 scale based on news article sentiment analysis.

## Data Source

- **Input**: Sentiment-labeled news articles from Firestore (`feed_entries` collection)
- **Sentiment Labels**: Positive, Neutral, Negative
- **Update Frequency**: Real-time (based on article ingestion)
- **Historical Range**: Full historical data available via hybrid analytics

## Calculation Formula

### Basic Formula

For each day, the Fear & Greed Index is calculated as:

```typescript
const posRatio = positiveCount / totalCount;
const negRatio = negativeCount / totalCount;
const fearGreedIndex = Math.round((posRatio - negRatio + 1) * 50);
```

### Mathematical Breakdown

1. **Positive Ratio**: `posRatio = positive_articles / total_articles`
2. **Negative Ratio**: `negRatio = negative_articles / total_articles`
3. **Net Sentiment**: `netSentiment = posRatio - negRatio` (range: [-1, 1])
4. **Normalize to [0, 2]**: Add 1 to shift range
5. **Scale to [0, 100]**: Multiply by 50

### Example Calculations

| Positive | Neutral | Negative | Total | Calculation | Index | Interpretation |
|----------|---------|----------|-------|-------------|-------|----------------|
| 80 | 10 | 10 | 100 | (0.80 - 0.10 + 1) × 50 | 85 | Extreme Greed |
| 10 | 10 | 80 | 100 | (0.10 - 0.80 + 1) × 50 | 15 | Extreme Fear |
| 40 | 20 | 40 | 100 | (0.40 - 0.40 + 1) × 50 | 50 | Neutral |
| 60 | 20 | 20 | 100 | (0.60 - 0.20 + 1) × 50 | 70 | Greed |
| 20 | 20 | 60 | 100 | (0.20 - 0.60 + 1) × 50 | 30 | Fear |

## Sentiment Classification

The index value maps to these sentiment labels:

| Range | Label | Description |
|-------|-------|-------------|
| 0-25 | Extreme Fear | Overwhelming negative sentiment |
| 26-45 | Fear | Predominantly negative sentiment |
| 46-55 | Neutral | Balanced sentiment |
| 56-75 | Greed | Predominantly positive sentiment |
| 76-100 | Extreme Greed | Overwhelming positive sentiment |

## Role of Neutral Articles

**Important**: Neutral articles are included in the total count but don't directly influence the numerator of the calculation. This means:

- Neutral articles act as a **dampening factor**
- They reduce the impact of positive and negative articles
- More neutral coverage → index moves closer to 50 (neutral)

**Example**:
- 50 positive + 50 negative = Index 50
- 40 positive + 40 negative + 20 neutral = Index 50 (same result)
- 40 positive + 20 negative + 40 neutral = Index 60 (neutral dampens the positive bias)

This behavior is **intentional** and reflects the idea that uncertain/neutral coverage reduces market conviction.

## Data Flow

### Recent Data (Live API)

1. Frontend calls `useFearGreed` hook
2. Hook fetches from `/fear-greed-index` endpoint
3. API proxies to `btcpapifunction` Cloud Run service
4. Service queries BigQuery for recent article sentiment
5. Returns calculated index with historical data

### Historical Data (Firestore)

1. Request for dates >2 days ago routes to `hybrid-analytics` function
2. Function queries Firestore `feed_entries` collection
3. Groups articles by date and calculates daily index
4. Returns time-series data

**Implementation**: `functions/src/hybrid-analytics.ts:162-204`

```typescript
async function getHistoricalFearGreed(req: any, res: any) {
  const { startDate, endDate } = req.query;

  const query = admin.firestore()
    .collection('feed_entries')
    .where('date_indexed', '>=', startDate)
    .where('date_indexed', '<=', endDate)
    .orderBy('date_indexed', 'asc');

  const snapshot = await query.get();

  // Group by date and calculate daily fear/greed
  const dailyData: { [date: string]: any } = {};

  snapshot.docs.forEach(doc => {
    const data = doc.data();
    const date = data.date_indexed;

    if (!dailyData[date]) {
      dailyData[date] = { positive: 0, neutral: 0, negative: 0, total: 0 };
    }

    if (data.Sentiment) {
      dailyData[date][data.Sentiment.toLowerCase()]++;
      dailyData[date].total++;
    }
  });

  const fearGreedData = Object.entries(dailyData).map(([date, counts]: [string, any]) => {
    const posRatio = counts.positive / counts.total;
    const negRatio = counts.negative / counts.total;
    const fearGreedIndex = Math.round((posRatio - negRatio + 1) * 50);

    return {
      date,
      fear_greed_index: fearGreedIndex,
      sentiment_breakdown: counts
    };
  });

  res.json({ data: fearGreedData });
}
```

## Change Calculation

Day-over-day change is calculated as:

```typescript
const change = currentDay.fear_greed_index - previousDay.fear_greed_index;
```

Displayed on the homepage with:
- Green ▲ for positive change
- Red ▼ for negative change

## Mathematical Properties

### Range Guarantees

The formula **guarantees** values in [0, 100]:

- **Maximum**: All positive articles → `(1 - 0 + 1) × 50 = 100` ✓
- **Minimum**: All negative articles → `(0 - 1 + 1) × 50 = 0` ✓
- **Neutral point**: Equal pos/neg → `(0.5 - 0.5 + 1) × 50 = 50` ✓

### Symmetry

The formula is **symmetric** around the neutral point (50):
- X% positive bias → Index = 50 + X
- X% negative bias → Index = 50 - X

This reflects balanced treatment of positive and negative sentiment.

### Linearity

The relationship between sentiment ratios and index is **linear**. This means:
- Each 1% increase in positive articles = +0.5 point increase in index
- Each 1% increase in negative articles = -0.5 point decrease in index

**Trade-off**: Linear scaling is simple and predictable, but doesn't capture psychological non-linearity (e.g., market overreaction at extremes).

## Known Limitations

### 1. Volume Independence

- A day with 5 articles has the same weight as a day with 500 articles
- No confidence metric is provided based on sample size
- **Impact**: Low-volume days may have unreliable index values

### 2. No Time Weighting

- All articles within a day are weighted equally
- No recency bias within the day
- **Impact**: Morning sentiment = Evening sentiment

### 3. No Outlet Weighting

- All outlets contribute equally regardless of:
  - Reach/influence
  - Journalistic credibility
  - Historical accuracy
- **Impact**: Small blogs weighted same as major financial news

### 4. Binary Sentiment

- Sentiment labels are categorical (Positive/Neutral/Negative)
- No intensity scoring (e.g., "strongly positive" vs "mildly positive")
- **Impact**: Loses nuance in sentiment strength

### 5. Linear Psychology

- Market psychology is often non-linear
- Extreme values (panic/euphoria) may need exponential scaling
- **Impact**: May underrepresent extreme market conditions

## Validation Methods

To validate the calculation:

1. **Spot Check**: Compare index value to actual article sentiment for specific dates
2. **Historical Events**: Check if known bullish/bearish events show expected index changes
3. **Price Correlation**: Compare with Bitcoin price movements for reasonableness
4. **Volume Analysis**: Examine index reliability at different article volumes

## Proposed Improvements

See the implementation section below for:
1. **Confidence Scoring**: Based on article volume
2. **Volume-Weighted Averaging**: For multi-day calculations
3. **Non-Linear Scaling**: Optional sigmoid transformation for extreme values
4. **Metadata Enrichment**: Include article counts and confidence in responses

## API Endpoints

### Get Current Fear & Greed Index

```bash
GET https://btcpapifunction-45998414364.us-central1.run.app/btcpapifunction/fear-greed-index
Query params:
  - startDate: YYYY-MM-DD (required)
  - endDate: YYYY-MM-DD (required)
  - userId: string (optional, for access control)
```

### Response Format

```json
{
  "date": "2025-01-15",
  "fear_greed_index": 68,
  "status": "Greed",
  "change": 3.5,
  "historicalData": [
    {
      "date": "2025-01-14",
      "fear_greed_index": 64.5,
      "status": "Greed"
    }
  ]
}
```

## Frontend Display

**Location**: `src/components/dashboard/pages/home.tsx:1841-1860`

**Visual Elements**:
- Index value (large number)
- Status label (colored by sentiment)
- Day-over-day change (with arrow indicator)
- Gradient bar (red → yellow → green)
- Position indicator on gradient

**Color Coding**:
- Red: Fear/Extreme Fear
- Yellow: Neutral
- Green: Greed/Extreme Greed

## Code References

- **Backend Calculation**: `functions/src/hybrid-analytics.ts:162-204`
- **Frontend Hook**: `src/hooks/use-fear-greed.ts:18-78`
- **Frontend Display**: `src/components/dashboard/pages/home.tsx:1841-1860`
- **Type Definitions**: `src/hooks/use-fear-greed.ts:6-16`

## Change History

| Date | Change | Reason |
|------|--------|--------|
| 2025-01 | Initial implementation | Launch of Market Sentiment feature |
| 2025-01 | Added value clamping [0-100] | Prevent edge case errors |
| 2025-01 | Hybrid routing (Firestore + API) | Optimize performance for historical data |

---

**Last Updated**: January 2025
**Maintained By**: Perception Engineering Team
**Questions**: Refer to `docs/technical/CLAUDE.md` or contact dev team
