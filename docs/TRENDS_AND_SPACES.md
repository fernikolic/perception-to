# Trends & Spaces Documentation

## Overview

The Trends page (also known as "Opportunities" or "Tracking" page) is the main interface for tracking keyword mentions across Bitcoin media coverage. It integrates with the Spaces feature to allow users to save and organize trends and articles for later review.

## Page Location

- **Route**: `/app/opportunities`
- **Component**: `src/components/dashboard/pages/opportunities.tsx`
- **Related Components**:
  - Spaces: `src/components/dashboard/pages/spaces.tsx`
  - Space Detail: `src/components/dashboard/pages/space-detail.tsx`
  - Settings: `src/components/dashboard/pages/settings/keyword-alerts.tsx`

## Core Features

### 1. Watchlist Tracking

Users can track specific keywords, entities, or industries across all Bitcoin media coverage within a selected date range.

**Key Capabilities**:
- Search for specific keywords across titles and content
- Filter by date range (Last 24h, Last 7 days, Last 30 days, Custom range)
- Filter by source/outlet
- View exact match vs. fuzzy match results
- Real-time data from BigQuery

**Data Source**:
- Primary: BigQuery (`useBigQueryCompleteFeed` hook)
- The complete feed is stored in `watchlistChartData.data`
- UI filtering (sourceFilter) creates `filteredMatches` for display only

### 2. Keyword Alerts

Users can set up persistent keyword alerts that track mentions over time.

**Alert Types**:
- **Keyword**: Generic keyword tracking
- **Entity**: Specific companies, people, or organizations
- **Industry**: Broader industry categories

**Limits by Plan**:
- Free: 5 alerts
- Premium: 20 alerts
- Enterprise: Unlimited

**Storage**: Firebase Firestore collection `keyword_alerts`

### 3. Spaces Integration

Spaces allow users to save trends and articles for later review, creating organized collections of related content.

## How Spaces Are Created

### From the Tracking Page

When a user clicks "Send to Space" on a keyword in the watchlist, the system:

1. **Retrieves Complete Feed Data**
   ```typescript
   const completeFeed = watchlistChartData?.data || [];
   ```
   - Uses the COMPLETE BigQuery feed (not UI-filtered results)
   - Includes all articles within the selected date range

2. **Filters Articles by Keyword**
   ```typescript
   const keywordArticles = completeFeed.filter(article => {
     const content = `${article.Title || ''} ${article.Content || ''}`.toLowerCase();
     return content.includes(keyword.toLowerCase());
   });
   ```
   - Searches both title and content
   - Case-insensitive matching

3. **Creates Nested Trend Data**
   ```typescript
   const trendData = {
     title: `${keyword} Coverage`,
     summary: `All mentions of ${keyword} from ${keywordArticles.length} articles`,
     articles: keywordArticles.map(article => ({
       title: article.Title,
       content: article.Content,
       url: article.URL,
       outlet: article.Outlet,
       published_at: article.PublishedAt,
       sentiment: article.Sentiment // Optional
     })),
     generated_at: new Date().toISOString()
   };
   ```

4. **Creates Space with Single Nested Item**
   - Creates ONE space item of type `'trend'`
   - ALL articles are nested inside `trendData.articles[]`
   - This maintains the relationship between the keyword and its mentions

### Data Structure

**Space Document** (Firestore):
```typescript
{
  id: string;
  userId: string;
  title: string; // e.g., "Bitcoin Coverage"
  items: SpaceItem[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Space Item** (nested in Space):
```typescript
{
  id: string;
  type: 'trend' | 'article';
  trendData?: {
    title: string;
    summary: string;
    articles: Array<{
      title: string;
      content: string;
      url: string;
      outlet: string;
      published_at: string;
      sentiment?: string;
    }>;
    generated_at: string;
  };
  addedAt: Timestamp;
  notes?: string;
}
```

### Why Nested Structure?

The nested structure is intentional and critical:

1. **Preserves Context**: All articles for a keyword stay grouped together
2. **Shows Trends**: Users can see how many articles mention a topic
3. **Maintains Timeline**: The coverage period is clear from the article dates
4. **Prevents Duplication**: Same article mentioned by multiple keywords doesn't create separate items

## Key Functions

### `handleCreateNewSpace` (opportunities.tsx:1238)

Creates a new space for a keyword with all matching articles.

**Process**:
1. Gets complete feed from `watchlistChartData.data`
2. Filters for keyword matches
3. Creates TrendData with nested articles
4. Calls `createSpace()` from `use-spaces.ts`
5. Navigates to new space detail page

**Important**: Uses complete feed, NOT `filteredMatches` which is UI-filtered.

### `handleAddToExistingSpace` (opportunities.tsx:1287)

Adds a keyword's articles to an existing space.

**Process**:
1. Same filtering as `handleCreateNewSpace`
2. Creates TrendData with nested articles
3. Calls `addTrendToSpace()` from `use-spaces.ts`
4. Adds as new item in the space's items array

## Common Issues & Solutions

### Issue: Only 1 Article Added Instead of All

**Cause**: Using `filteredMatches` instead of complete feed
- `filteredMatches` is filtered by UI sourceFilter dropdown
- Only shows articles visible in current UI state

**Solution**: Use `watchlistChartData.data` for complete dataset
```typescript
// WRONG
const keywordArticles = filteredMatches.filter(...)

// CORRECT
const completeFeed = watchlistChartData?.data || [];
const keywordArticles = completeFeed.filter(...)
```

### Issue: Articles Not Nested Properly

**Cause**: Creating individual article items instead of single trend item

**Solution**: Create ONE trend item with articles array:
```typescript
items: [{
  id: crypto.randomUUID(),
  type: 'trend',
  trendData: {
    title: "Keyword Coverage",
    articles: [/* all articles */]
  }
}]
```

## Related Hooks

### `useSpaces()` - src/hooks/use-spaces.ts

Manages all space operations:
- `createSpace(title, initialTrend)`: Create new space
- `getSpace(spaceId)`: Retrieve single space
- `updateSpaceTitle(spaceId, title)`: Update space name
- `addTrendToSpace(spaceId, trendData)`: Add trend to space
- `removeItemFromSpace(spaceId, itemId)`: Remove item
- `deleteSpace(spaceId)`: Delete entire space

### `useBigQueryCompleteFeed()` - src/hooks/use-bigquery-complete-feed.ts

Fetches complete article feed from BigQuery:
- Supports date range filtering
- Supports keyword search
- Returns pagination info
- Used for watchlist tracking

### `useKeywordAlerts()` - src/hooks/use-keyword-alerts.ts

Manages persistent keyword alerts:
- `addAlert(keyword, type)`: Create new alert
- `removeAlert(alertId)`: Delete alert
- `toggleAlert(alertId)`: Enable/disable alert
- `clearAllAlerts()`: Remove all alerts

## UI Components

### Watchlist Results Display

Shows matched keywords with:
- Keyword name
- Article count (from `filteredMatches`)
- "Send to Space" dropdown menu
- Options: Create New Space or Add to Existing Space

### Space Detail Page

Displays space contents:
- Expandable trend items
- Nested articles with metadata
- Delete item/space functionality
- Editable space title

## Data Flow

```
User selects keyword "Bitcoin" →
  Clicks "Send to Space" →
    handleCreateNewSpace("Bitcoin") →
      Gets watchlistChartData.data (all articles) →
        Filters for "Bitcoin" mentions →
          Creates TrendData with 7 articles →
            createSpace("Bitcoin Coverage", trendData) →
              Firestore: Creates space document →
                Navigates to /app/spaces/{spaceId}
```

## File References

- **Main Page**: `src/components/dashboard/pages/opportunities.tsx`
- **Spaces Hook**: `src/hooks/use-spaces.ts` (lines 118-160, 222-255)
- **Space Detail**: `src/components/dashboard/pages/space-detail.tsx`
- **Alerts Settings**: `src/components/dashboard/pages/settings/keyword-alerts.tsx`
- **BigQuery Hook**: `src/hooks/use-bigquery-complete-feed.ts`

## Console Logging

For debugging, the code includes extensive console logging:

```typescript
console.log('[handleCreateNewSpace] keyword:', keyword);
console.log('[handleCreateNewSpace] completeFeed.length:', completeFeed.length);
console.log('[handleCreateNewSpace] keywordArticles.length:', keywordArticles.length);
console.log('[handleCreateNewSpace] trendData.articles.length:', trendData.articles.length);
```

Look for these logs when troubleshooting space creation issues.

## Best Practices

1. **Always use complete feed**: Get `watchlistChartData.data`, not `filteredMatches`
2. **Maintain nested structure**: One trend item with articles array
3. **Include all metadata**: Title, content, URL, outlet, date, sentiment
4. **Validate article count**: Log at each step to verify filtering
5. **Handle empty results**: Check if `keywordArticles.length === 0`

## Future Enhancements

Potential improvements to consider:
- Bulk space creation for multiple keywords
- Auto-update spaces with new articles
- Export spaces to PDF/CSV
- Share spaces with team members
- AI-powered trend summaries
- Sentiment analysis charts per space
