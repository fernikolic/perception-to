# Sources Page Architecture

This document describes the architecture of the Sources page, including the Single Source and Compare Sources views, with special attention to X/Social account support.

## Overview

The Sources page (`/coverage` route) allows users to analyze Bitcoin media coverage from various sources including:
- Traditional media outlets (mainstream, financial, crypto, tech)
- Podcasts and conferences
- Research publications
- X (Twitter) accounts
- Repositories (GitHub, etc.)

## Page Sections

### 1. Leaderboard View
- Shows top outlets and reporters by article count
- Includes sentiment breakdown and activity metrics
- Uses `MediaOutletRanking` and `MediaReporterRanking` components

### 2. Single Source View
- Deep dive into a single source's coverage
- Shows mention volume chart, topic breakdown, and latest articles
- For X accounts: displays actual tweet content (not just the handle)

### 3. Compare Sources View
- Compare up to 6 sources side-by-side
- Comparative sentiment analysis and topic coverage
- Social category is currently disabled (marked "Soon")

### 4. By Topic View
- Search for sources by topic coverage
- Find reporters who have covered specific topics

## Key Components

### Source Selector (`unified-source-selector.tsx`)
- Unified dropdown for selecting sources
- Category tabs: Mainstream, Financial, Crypto, Tech, Podcasts, Conferences, Research, Communities, Social, Repositories, International
- Supports single and multi-select modes
- Social category disabled in Compare Sources mode (multi mode)

### Latest Articles (`media-outlet-sections.tsx`)
- Displays latest articles/tweets for the selected source
- For X accounts: Shows tweet content instead of just the handle
- Sentiment-colored border indicators

### Mention Volume Chart (`outlet-mentions-chart.tsx`)
- Time-series visualization of coverage frequency
- Aggregation based on date range (daily/weekly/monthly)

## X/Social Account Support

### Data Flow for X Accounts

1. **Source Selection**
   - X accounts are identified by handles starting with `@` (e.g., `@glassnode`)
   - Category: `social`

2. **API Request**
   ```
   GET /media-radar?outlet=X&startDate=...&endDate=...&aggregate=none
   ```
   - `outlet` is set to `'X'` for all X accounts
   - `aggregate=none` ensures individual tweets are returned (not aggregated)

3. **Data Structure in BigQuery**
   ```
   all_channels_data table:
   - Outlet: "X" (for all X accounts)
   - Title: "@handle" (e.g., "@glassnode")
   - Content: "Actual tweet text..."
   - Date, URL, Sentiment, Image_URL, author_name
   ```

4. **Frontend Filtering**
   - After API response, filter by `article.title === selectedOutlet` to get tweets for specific handle
   - Map `article.content` (lowercase from API) to `Content` (uppercase for component)

5. **Display Logic**
   ```tsx
   // In media-outlet-sections.tsx
   {selectedOutlet.startsWith('@') ? (
     <p>{entry.Content || entry.Title}</p>  // Shows tweet content
   ) : (
     <p>{entry.Title}</p>  // Shows article title for non-X sources
   )}
   ```

### Key Files

| File | Purpose |
|------|---------|
| `narrative-tracker.tsx` | Main page component, fetches article data |
| `media-outlet-sections.tsx` | Displays articles/tweets in Latest section |
| `unified-source-selector.tsx` | Source selection dropdown |
| `use-all-sources.ts` | Hooks for fetching sources including X accounts |
| `source-categories.ts` | Centralized categorization logic |

### Data Mapping

```typescript
// API Response (lowercase)
{
  title: "@handle",
  content: "Tweet text...",
  date: "2025-12-20T...",
  url: "https://twitter.com/...",
  sentiment: "Neutral",
  imageUrl: null,
  author: null
}

// Frontend Format (PascalCase)
{
  Title: "@handle",
  Content: "Tweet text...",
  Date: "2025-12-20T...",
  URL: "https://twitter.com/...",
  Sentiment: "Neutral",
  Image_URL: null,
  Outlet: "@handle",
  author_name: "handle"
}
```

## Caching Strategy

### React Query Cache Keys

```typescript
// Article data - includes version for cache busting
queryKey: ['media-outlet-articles-v2', dateRange?.from, dateRange?.to, selectedOutlet]

// Internal fetch in media-outlet-sections
queryKey: ['media-outlet-complete-feed-v2', dateRange?.from, dateRange?.to, selectedOutlet, selectedTopic]
```

**Important:** When adding new fields to the API response (like Content for X accounts), update the cache key version to force clients to fetch fresh data.

### Cache Timing
- Historical data (>7 days old): 24 hour stale time
- Recent data: 2 minute stale time
- GC time: 30 minutes

## Troubleshooting

### Content Not Showing for X Accounts

If X account tweets show only the handle instead of content:

1. **Check API Response**
   - Look for `[NarrativeTracker] X Account API response:` in console
   - Verify `hasContent: true` and `firstArticle.content` has value

2. **Check Cache Key Version**
   - Ensure query keys include version suffix (e.g., `'media-outlet-articles-v2'`)
   - Old cached data may not have Content field

3. **Verify Data Mapping**
   - API returns `content` (lowercase)
   - Frontend expects `Content` (PascalCase)
   - Check `article.content` is being mapped to `Content` in queryFn

4. **Debug Logs to Look For**
   ```
   [MediaOutletSections] X Account data debug: {
     selectedOutlet: '@handle',
     usingPrefetched: true/false,
     hasContent: true,
     contentSample: "Tweet text..."
   }
   ```

### Social Category Disabled in Compare Sources

This is intentional. Social sources don't work well in comparison mode due to:
- Different content structure (tweets vs articles)
- No topic/reporter data for X accounts

Social category works fully in Single Source mode.

## Backend API

### Endpoint: `/media-radar`

**Base URL:** `https://btcpapifunction3-1-final-45998414364.us-central1.run.app`

**Parameters:**
| Parameter | Description |
|-----------|-------------|
| `outlet` | Outlet name or "X" for X accounts |
| `startDate` | Start date (YYYY-MM-DD) |
| `endDate` | End date (YYYY-MM-DD) |
| `aggregate` | Aggregation type: none, daily, weekly, monthly |
| `topic` | Optional topic filter |
| `limit` | Max results (default: unlimited) |

**Response:**
```json
{
  "aggregationType": "none",
  "articles": [
    {
      "title": "@handle or Article Title",
      "content": "Tweet or article content",
      "date": "2025-12-20T...",
      "url": "...",
      "sentiment": "Positive|Neutral|Negative",
      "imageUrl": "...",
      "author": "..."
    }
  ],
  "stats": {
    "totalArticles": 5917,
    "sentimentBreakdown": {...}
  }
}
```

## Recent Changes (December 2025)

### Content Field Support for X Accounts
- Added `Content` field to BigQuery queries in Cloud Run service
- Updated response formatting to include `content` in article objects
- Frontend now correctly maps and displays tweet content
- Cache keys versioned to `v2` to invalidate stale data

### Source Selector Improvements
- Renamed "Media" to "Sources" throughout the app
- Added category tabs with counts
- Social category disabled with "Soon" badge in Compare Sources mode
- Clear button for multi-select mode

### UX Improvements
- Curved arrow pointing to dropdown in empty states
- No auto-selection of random outlet on page load
- Removed emojis from trending topic badges
