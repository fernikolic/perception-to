# Chart Data Aggregation System

This document explains how the "Discussion Volume & Sentiment" chart processes and displays data across different time periods (daily, weekly, monthly).

## Overview

The chart displays two types of data:
1. **Volume**: Total count of mentions per time period (shown as an area chart)
2. **Sentiment**: Percentage breakdown of positive/neutral/negative sentiment (shown as stacked bars)

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SERVER (BigQuery)                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  allDataChart endpoint returns DAILY data with:                      │   │
│  │  - date: "YYYY-MM-DD" (e.g., "2025-12-18")                          │   │
│  │  - count: total mentions for that day                                │   │
│  │  - positive: count of positive sentiment                             │   │
│  │  - negative: count of negative sentiment                             │   │
│  │  - neutral: count of neutral sentiment                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        unified-research.tsx                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  volumeChartData useMemo:                                            │   │
│  │  - Daily: Pass through with date formatting                          │   │
│  │  - Weekly: AGGREGATE daily counts into weekly totals                 │   │
│  │  - Monthly: Pass through (server sends monthly format)               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  sentimentChartData useMemo:                                         │   │
│  │  - Daily: Calculate percentages per day                              │   │
│  │  - Weekly: AGGREGATE counts, then calculate weekly percentages       │   │
│  │  - Monthly: Calculate percentages per month                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        watchlist-view.tsx                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  combinedChartData useMemo:                                          │   │
│  │  1. Create sentimentMap from sentimentChartData (Map by date key)    │   │
│  │  2. Merge volumeChartData with sentiment lookups                     │   │
│  │  3. Add Bitcoin price, Perception Index overlays                     │   │
│  │  4. Render with Recharts ComposedChart                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Time Period Aggregation

### Daily View (< 30 days)
- Server returns one data point per day
- No frontend aggregation needed
- Date format: `"MMM dd, yyyy"` (e.g., "Dec 18, 2025")

### Weekly View (30-90 days)
- Server returns daily data
- **Frontend aggregates into weekly totals**
- Week starts on Sunday (using JavaScript's `getDay()`)
- Date format: `"MMM dd, yyyy"` (e.g., "Dec 15, 2025" for week of Dec 15-21)

### Monthly View (> 90 days)
- Server returns monthly aggregated data (format: `"YYYY-MM"`)
- Frontend converts to display format
- Date format: `"MMM yyyy"` (e.g., "Dec 2024")

## Weekly Aggregation Logic

### Location: `src/pages/unified-research.tsx`

#### Volume Aggregation (lines 931-958)

```typescript
// For weekly view with daily server data, we need to aggregate by week
if (activeTimePeriod === 'weekly') {
  const weeklyData: Record<string, { count: number; sortDate: string; year: number }> = {};

  serverChart.forEach((item: { date: string; count: number }) => {
    // Skip monthly format data (YYYY-MM)
    if (item.date.length === 7) return;

    const dateObj = new Date(item.date);
    const weekStart = new Date(dateObj);
    weekStart.setDate(dateObj.getDate() - dateObj.getDay()); // Sunday start
    const dateKey = format(weekStart, 'MMM dd, yyyy');
    const sortDate = format(weekStart, 'yyyy-MM-dd');

    if (!weeklyData[dateKey]) {
      weeklyData[dateKey] = { count: 0, sortDate, year: weekStart.getFullYear() };
    }
    weeklyData[dateKey].count += item.count; // Sum daily counts
  });

  return Object.entries(weeklyData)
    .map(([date, data]) => ({
      date,
      volume: data.count,
      sortDate: data.sortDate,
      year: data.year
    }))
    .sort((a, b) => new Date(a.sortDate).getTime() - new Date(b.sortDate).getTime());
}
```

#### Sentiment Aggregation (lines 1014-1048)

```typescript
// For weekly view with daily server data, we need to aggregate by week
if (activeTimePeriod === 'weekly') {
  const weeklyData: Record<string, {
    positive: number; negative: number; neutral: number;
    sortDate: string; year: number
  }> = {};

  serverChart.forEach((item) => {
    if (item.date.length === 7) return; // Skip monthly format

    const dateObj = new Date(item.date);
    const weekStart = new Date(dateObj);
    weekStart.setDate(dateObj.getDate() - dateObj.getDay());
    const dateKey = format(weekStart, 'MMM dd, yyyy');
    const sortDate = format(weekStart, 'yyyy-MM-dd');

    if (!weeklyData[dateKey]) {
      weeklyData[dateKey] = { positive: 0, negative: 0, neutral: 0, sortDate, year: weekStart.getFullYear() };
    }
    // Sum raw counts first (NOT percentages)
    weeklyData[dateKey].positive += item.positive;
    weeklyData[dateKey].negative += item.negative;
    weeklyData[dateKey].neutral += item.neutral;
  });

  return Object.entries(weeklyData)
    .map(([date, data]) => {
      const total = data.positive + data.negative + data.neutral;
      return {
        date,
        // Calculate percentages from aggregated counts
        positive: total > 0 ? (data.positive / total) * 100 : 0,
        neutral: total > 0 ? (data.neutral / total) * 100 : 0,
        negative: total > 0 ? (data.negative / total) * 100 : 0,
        sortDate: data.sortDate,
        year: data.year
      };
    })
    .sort((a, b) => new Date(a.sortDate).getTime() - new Date(b.sortDate).getTime());
}
```

## Data Merging in WatchlistView

### Location: `src/components/dashboard/components/watchlist-view.tsx`

The `combinedChartData` useMemo (around line 950) merges volume and sentiment:

```typescript
// Create a map of sentiment data by date for easy lookup
const sentimentMap = new Map(
  filteredSentimentChartData.map(item => [item.date, item])
);

// Merge volume data with sentiment
let mergedData = filteredVolumeChartData.map(volumeItem => {
  const sentimentItem = sentimentMap.get(volumeItem.date);

  return {
    date: volumeItem.date,
    sortDate: volumeItem.sortDate,
    volume: volumeItem.volume,
    year: volumeItem.year,
    positive: sentimentItem?.positive || 0,
    neutral: sentimentItem?.neutral || 0,
    negative: sentimentItem?.negative || 0,
    bitcoinPrice: getBitcoinPrice(volumeItem.sortDate),
    perceptionIndex: getPerceptionIndex(volumeItem.sortDate),
  };
});
```

## Critical: Date Key Matching

For the merge to work correctly, **volume and sentiment data must use identical date keys**:

| Time Period | Date Key Format | Example |
|-------------|-----------------|---------|
| Daily | `MMM dd, yyyy` | "Dec 18, 2025" |
| Weekly | `MMM dd, yyyy` | "Dec 15, 2025" (week start) |
| Monthly | `MMM yyyy` | "Dec 2024" |

If date keys don't match between volume and sentiment, the `sentimentMap.get()` lookup returns `undefined`, resulting in 0% for all sentiments (no visible bars).

## Common Issues and Solutions

### Issue: Sentiment bars only show for first week

**Cause**: Daily server data was being relabeled with weekly dates but not aggregated. This created multiple entries with the same date key, and the Map only kept the last entry per key.

**Solution** (implemented Dec 2025): Added proper weekly aggregation in `unified-research.tsx` that:
1. Groups daily data by week start date
2. Sums counts (volume) or raw sentiment counts
3. Calculates percentages after aggregation
4. Returns one entry per week instead of one per day

### Issue: Category filtering breaks sentiment display

**Cause**: When `allCategoriesSelected` is false, `watchlist-view.tsx` recomputes chart data using a different date format (`'MMM d'` vs `'MMM dd, yyyy'`).

**Solution**: The client-side aggregation in `watchlist-view.tsx` uses consistent formatting for both volume and sentiment when recomputing.

## Server-Side Chart Endpoint

### Location: `functions/src/bigquery-search.ts`

The `allDataChart` function (line 635) returns:

```typescript
{
  chart: [
    { date: "2025-12-18", count: 45, positive: 20, negative: 10, neutral: 15 },
    { date: "2025-12-17", count: 38, positive: 18, negative: 8, neutral: 12 },
    // ... one entry per day
  ],
  total: 1234,
  outletDistribution: [...],
  performance: { source: 'bigquery', durationMs: 150 }
}
```

For date ranges > 90 days, it returns monthly aggregated data:
```typescript
{ date: "2025-12", count: 450, positive: 200, negative: 100, neutral: 150 }
```

## Related Files

- `src/pages/unified-research.tsx` - Chart data processing and aggregation
- `src/components/dashboard/components/watchlist-view.tsx` - Chart rendering and data merging
- `functions/src/bigquery-search.ts` - Server-side data aggregation
- `src/hooks/use-complete-feed.ts` - Data fetching hook

## Changelog

- **Dec 2025**: Fixed weekly aggregation for server-side chart data to properly sum daily values instead of just relabeling dates
