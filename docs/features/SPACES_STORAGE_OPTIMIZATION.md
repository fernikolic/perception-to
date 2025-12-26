# Spaces Storage Optimization System

**Last Updated:** December 7, 2025
**Status:** Production
**Version:** 1.0

---

## Overview

The Spaces feature allows users to save articles, trends, and charts to collections for later analysis and report generation. This document describes the storage optimization system that solves Firestore's 1MB document size limit while maintaining full functionality.

### The Problem

Firestore has a **1MB maximum document size limit**. When users added multiple items to a space (especially watchlist items with hundreds of articles), the stored article content quickly exceeded this limit, causing errors:

```
FirebaseError: Document cannot be written because its size (1,189,249 bytes)
exceeds the maximum allowed size of 1,048,576 bytes.
```

### The Solution

**Metadata-only storage** with **on-demand content enrichment**:

1. Store only article metadata (title, URL, outlet, date, sentiment) - ~300 bytes per article
2. Fetch full content from BigQuery only when generating reports
3. Apply smart sampling to reduce BigQuery calls for large datasets

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           USER ACTION                                │
│                    "Add 150 articles to Space"                       │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    FIRESTORE STORAGE (Compressed)                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Space Document (~50KB instead of 1.2MB)                     │   │
│  │  ├── title: "My Research Space"                              │   │
│  │  ├── items: [                                                │   │
│  │  │     {                                                     │   │
│  │  │       type: "trend",                                      │   │
│  │  │       trendData: {                                        │   │
│  │  │         title: "Bitcoin ETF Surge",                       │   │
│  │  │         summary: "Full trend summary preserved...",       │   │
│  │  │         articles: [                                       │   │
│  │  │           { title, url, outlet, date, sentiment }  ← NO CONTENT  │
│  │  │         ]                                                 │   │
│  │  │       }                                                   │   │
│  │  │     }                                                     │   │
│  │  │   ]                                                       │   │
│  │  └── savedReports: [...]                                     │   │
│  └─────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 │ User clicks "Generate Report"
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      SMART SAMPLING (Frontend)                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Input: 150 articles                                         │   │
│  │  ↓                                                           │   │
│  │  Step 1: Deduplicate similar stories (60% title overlap)    │   │
│  │  Step 2: Ensure sentiment representation (min 3 per type)   │   │
│  │  Step 3: Time distribution (spread across date range)       │   │
│  │  Step 4: Prioritize Tier 1 outlets (Bloomberg, Reuters...)  │   │
│  │  Step 5: Ensure outlet diversity                            │   │
│  │  ↓                                                           │   │
│  │  Output: 60 strategically selected articles                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   BIGQUERY CONTENT FETCH (Backend)                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  POST /fetchArticlesByUrls                                   │   │
│  │  Body: { urls: ["url1", "url2", ...] }  (max 100)           │   │
│  │  ↓                                                           │   │
│  │  SELECT title, content, date, outlet, sentiment, url        │   │
│  │  FROM all_channels_data                                      │   │
│  │  WHERE url IN UNNEST(@urls)                                  │   │
│  │  ↓                                                           │   │
│  │  Response: Full article content for sampled items            │   │
│  └─────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      REPORT GENERATION                               │
│  Uses enriched items with full content for AI analysis              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Components

### 1. Metadata-Only Storage

**File:** `src/hooks/use-spaces.ts`

```typescript
// Helper to prepare trend data for storage
function compressTrendDataForStorage(trendData: TrendData): TrendData {
  // Store article metadata only - no content
  const metadataOnlyArticles = trendData.articles?.map(article => ({
    title: article.title,
    content: '', // Don't store content - trend summary has the key insights
    url: article.url,
    outlet: article.outlet,
    published_at: article.published_at,
    sentiment: article.sentiment,
  }));

  return {
    title: trendData.title,
    summary: trendData.summary, // Keep full summary - this contains the key insights
    image_url: trendData.image_url,
    articles: metadataOnlyArticles,
    generated_at: trendData.generated_at,
  };
}
```

**Storage Capacity:**
- Before: ~10-20 articles per space (hit 1MB limit)
- After: ~1,500+ articles per space

### 2. Backend: Fetch Articles by URLs

**File:** `functions/src/bigquery-search.ts`

New endpoint to fetch article content on demand:

```typescript
export const fetchArticlesByUrls = onRequest({
  cors: firebaseCorsConfig,
  region: 'us-central1',
  memory: '1GiB',
  timeoutSeconds: 60,
}, async (req, res) => {
  const urls = req.body.urls; // Array of URLs

  const query = `
    SELECT title, content, date, outlet, sentiment, url
    FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
    WHERE url IN UNNEST(@urls)
  `;

  const [rows] = await bigquery.query({ query, params: { urls } });
  res.json({ data: rows });
});
```

**Features:**
- Accepts up to 100 URLs per request
- 1-hour cache TTL
- Returns full article content

### 3. Smart Sampling Strategy

**File:** `src/lib/api/bigquery-search.ts`

```typescript
export function sampleItemsForReport(items: BriefItem[], config: SamplingConfig): BriefItem[]
```

**Thresholds:**
- ≤50 items: No sampling (use all)
- 51-100 items: Sample to ~50
- 100+ items: Sample to ~60

**Strategy (in order):**

1. **Always include trends** - They have curated summaries
2. **Deduplicate similar stories** - 60% title word overlap = same story, keep Tier 1 version
3. **Ensure sentiment representation** - Minimum 3 items per sentiment (positive/negative/neutral)
4. **Time distribution** - Split into 4 time buckets, sample from each
5. **Tier 1 outlet priority** - Bloomberg, Reuters, WSJ, FT, CNBC, Forbes, etc.
6. **Outlet diversity** - Avoid over-sampling from one source

**Tier 1 Outlets:**
```typescript
const TIER_1_OUTLETS = new Set([
  'Bloomberg', 'Reuters', 'Wall Street Journal', 'WSJ', 'Financial Times', 'FT',
  'New York Times', 'NYT', 'Washington Post', 'CNBC', 'Forbes', 'Fortune',
  'The Economist', 'Barron\'s', 'MarketWatch', 'Yahoo Finance', 'CoinDesk',
  'The Block', 'Decrypt', 'Cointelegraph', 'Bitcoin Magazine'
]);
```

### 4. Content Enrichment

**File:** `src/lib/api/bigquery-search.ts`

```typescript
export async function enrichItemsWithContent(items: BriefItem[]): Promise<BriefItem[]>
```

**Features:**
- Only fetches content for items that need it (empty or <50 chars)
- Batches requests (75 URLs per batch)
- Parallel batch fetching for speed
- Graceful handling of partial failures
- Skips trend items (they already have summaries)

### 5. Report Generator Fallback

**File:** `src/lib/services/report-generator.ts`

```typescript
function getDisplayContent(item: BriefItem, maxLength: number = 200): string {
  const content = item.content?.trim() || item.fullContent?.trim() || '';
  if (content.length > 0) {
    return content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  }
  // Fallback to title when content is empty
  return `*${item.title}*`;
}
```

Reports still work even if content fetch fails - article titles are shown instead.

---

## Integration in Space Detail Page

**File:** `src/components/dashboard/pages/space-detail.tsx`

```typescript
// When generating a report:

// 1. Build briefItems from stored metadata
const briefItems = [...]; // Items with empty content

// 2. Apply smart sampling (>50 items)
const sampledItems = sampleItemsForReport(briefItems, {
  maxItems: 60,
  minPerSentiment: 3,
  ensureOutletDiversity: true,
  ensureTimeDistribution: true,
  prioritizeTier1Outlets: true
});

// 3. Fetch content for sampled items
const enrichedItems = await enrichItemsWithContent(sampledItems);

// 4. Generate report with enriched items
await generatePRReport(enrichedItems, ...);
```

---

## Console Logging

The system provides detailed logging for debugging:

```
📊 [Sampling] Processing 150 items (2 trends, 148 coverage)
📊 [Sampling] After deduplication: 95 unique stories (removed 53 duplicates)
📊 [Sampling] Final: 60 items (2 trends, 58 coverage, 24 from tier 1 outlets)
📊 [Sampling] Sentiment distribution: 18 pos, 12 neg, 30 neutral
📊 [Sampling] Unique outlets: 32

📝 [Enrich] Need to fetch content for 58 of 58 coverage items
📝 [Enrich] 2 trend items already have summaries
📝 [Enrich] Fetching in 1 batch(es)
📝 [Enrich] Batch 1/1: 58 articles fetched
📝 [Enrich] Final: 58 coverage items with full content, 2 trends with summaries
```

---

## Deployment

### Backend (Firebase Functions)

```bash
cd functions
firebase deploy --only functions:fetchArticlesByUrls
```

### Frontend

The frontend changes are included in the regular build:

```bash
npm run build
```

---

## Cost Analysis

**Before optimization:**
- Firestore: Limited to ~20 articles per space (storage constraint)
- Report generation: Worked with whatever was stored

**After optimization:**
- Firestore: ~$0.006 per 100K document reads (unchanged)
- BigQuery: ~$0.02-0.05 per report (fetching 60-75 articles)
  - BigQuery charges $5 per TB scanned
  - URL-based query scans ~500MB → ~$0.0025
  - But with caching, repeated queries are free

**Net result:** Slightly higher BigQuery costs, but users can now store 75x more items per space.

---

## Error Handling

| Scenario | Handling |
|----------|----------|
| BigQuery fetch fails | Use article titles as fallback in report |
| Partial batch failure | Continue with successful batches |
| No content found for URL | Keep original item (title-only) |
| User navigates away during report | See below |

### Async Report Generation (Navigate Away Support)

Report generation for AI-powered templates (Stakeholder Communications, PR Pitch Intelligence, Sector Deep Dive) runs **asynchronously on the backend**:

1. **Frontend triggers generation**: Calls `generatePRReport()` with `spaceId`
2. **Backend processes in background**: Firebase Cloud Function generates the report
3. **Backend updates Firestore**: When complete, updates `space.summary` and `space.savedReports`
4. **Frontend receives update**: Firestore `onSnapshot` listener detects the change

**Detection Logic** (`space-detail.tsx`):

The component detects ongoing generation by checking if the summary contains:
- `'🔄 Generating Report'`
- `'**Analyzing'`
- `'Feel free to navigate away'`

When user navigates away and returns:
1. The Firestore listener re-subscribes
2. If summary contains generation indicators → restores `isGeneratingSummary` state
3. User sees loading UI until backend completes
4. When backend writes final report → indicators gone → completion detected

**Fix Applied (December 2025)**: Updated detection patterns to match actual stored message format (`**Analyzing` instead of `# Analyzing`).

---

## Future Improvements

1. **Smarter deduplication**: Use embeddings similarity instead of title word overlap
2. **Pre-computed content cache**: Cache frequently accessed articles in Firestore
3. **Streaming enrichment**: Show partial results as content is fetched
4. **User-configurable sampling**: Let users choose sample size and priorities

---

## Related Documentation

- [Trends and Spaces Overview](../TRENDS_AND_SPACES.md)
- [Report Template Standards](../REPORT_TEMPLATE_STANDARDS.md)
- [BigQuery Search Documentation](../backend/BIGQUERY_SEARCH.md)

---

## Files Changed

| File | Changes |
|------|---------|
| `src/hooks/use-spaces.ts` | Added `compressTrendDataForStorage()` function |
| `functions/src/bigquery-search.ts` | Added `fetchArticlesByUrls` endpoint |
| `functions/src/index.ts` | Export new function |
| `src/lib/api/bigquery-search.ts` | Added `sampleItemsForReport()`, `enrichItemsWithContent()` |
| `src/lib/services/report-generator.ts` | Added `getDisplayContent()` fallback |
| `src/components/dashboard/pages/space-detail.tsx` | Integrated sampling and enrichment |
