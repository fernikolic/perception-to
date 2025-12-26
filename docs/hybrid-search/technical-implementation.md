# Technical Implementation Guide

## Core Implementation

### Main Function: `hybridFeed`
**File**: `/functions/src/hybrid-feed.ts`
**Entry Point**: `hybridFeed` Cloud Function
**Memory**: 8GB
**Timeout**: 540 seconds

### Key Interfaces

```typescript
interface FeedEntry {
  Title: string;
  Content: string;
  Date: string;
  URL: string;
  Outlet: string;
  From?: string;
  Outlet_Category?: string;
  Sentiment: 'Positive' | 'Neutral' | 'Negative';
  BTC_Price?: string;
}

interface HybridFeedParams {
  startDate?: string;
  endDate?: string;
  outlet?: string;
  sentiment?: string;
  keyword?: string;
  exactMatch?: boolean;
  page?: number;
  pageSize?: number;
  userId?: string;
}
```

## Search Term Expansion Algorithm

### Base Term Processing
```typescript
// Extract base terms from user input
const baseTerms = keyword.toLowerCase().trim()
  .split(/[,\s]+/)                    // Split on commas and spaces
  .map(term => term.trim())           // Clean whitespace
  .filter(term => term.length >= 3); // Minimum 3 characters
```

### Variation Generation
```typescript
const expandedTerms = [];
for (const term of baseTerms) {
  expandedTerms.push(term);                              // lowercase
  expandedTerms.push(term.charAt(0).toUpperCase() + term.slice(1)); // Capitalized
  expandedTerms.push(term.toUpperCase());                // UPPERCASE

  // Company-specific variations
  if (term === 'coinbase') {
    expandedTerms.push('coinbase.com', 'Coinbase.com', 'COINBASE.COM');
    expandedTerms.push('coinbase inc', 'Coinbase Inc', 'COINBASE INC');
    expandedTerms.push('coinbase.inc', 'Coinbase.Inc', 'COINBASE.INC');
  }
}

// Remove duplicates and limit array size
const searchTerms = [...new Set(expandedTerms)].slice(0, 20);
```

## Comprehensive Search Implementation

### Full-Text Search Logic
```typescript
// Build query without searchTerms requirement for comprehensive coverage
let fallbackQuery = admin.firestore().collection('feed_entries') as admin.firestore.Query;

// Apply filters
if (startDate && startDate !== '1900-01-01' && startDate !== '2000-01-01') {
  fallbackQuery = fallbackQuery.where('Date', '>=', startDate + ' 00:00:00 UTC');
}
if (endDate && endDate !== '2100-12-31' && endDate !== '2030-12-31') {
  fallbackQuery = fallbackQuery.where('Date', '<=', endDate + ' 23:59:59 UTC');
}
if (outlet) {
  fallbackQuery = fallbackQuery.where('outlet_normalized', '==', outlet.toLowerCase().trim());
}
if (sentiment) {
  fallbackQuery = fallbackQuery.where('Sentiment', '==', sentiment);
}

// Fetch all documents matching filters
const allDocs = await fallbackQuery.get();
```

### In-Memory Filtering
```typescript
// Filter documents containing search terms
const matchingDocs = allDocs.docs.filter(doc => {
  const data = doc.data();
  const title = (data.Title || '');
  const content = (data.Content || '');
  const fullText = `${title} ${content}`;

  // Check if any base term is found (with variations)
  return baseTerms.some(baseTerm => {
    const lowerFullText = fullText.toLowerCase();
    const searchTerm = baseTerm.toLowerCase();

    // Check for exact matches and common variations
    return lowerFullText.includes(searchTerm) ||
           lowerFullText.includes(searchTerm + '.com') ||
           lowerFullText.includes(searchTerm + ' inc') ||
           lowerFullText.includes(searchTerm + '.inc') ||
           lowerFullText.includes(searchTerm + ' corporation') ||
           lowerFullText.includes(searchTerm + ' corp');
  });
});
```

## Data Source Integration

### Hybrid Decision Logic
```typescript
// Determine data sources needed
const requestStart = params.startDate ? new Date(params.startDate) : null;
const requestEnd = params.endDate ? new Date(params.endDate) : null;

// Force Firestore for wide date ranges
const isWideRange = (!requestStart || requestStart.getFullYear() <= 2011) ||
                   (!requestEnd || requestEnd.getFullYear() >= 2030);

const needsHistorical = true; // Always check Firestore first
const needsRecent = !isWideRange && (!requestEnd || isAfter(requestEnd, new Date('2025-09-19')));
```

### Firestore Query Execution
```typescript
async function fetchFromFirestore(params: HybridFeedParams): Promise<FeedResponse> {
  console.log(`📊 [Firestore] Querying historical data: ${startDate} to ${endDate}`);

  // Build and execute comprehensive search
  const allDocs = await fallbackQuery.get();
  const matchingDocs = /* filtering logic */;

  // Sort by date (newest first)
  const sortedDocs = matchingDocs.sort((a, b) => {
    const dateA = new Date(a.data().Date || 0);
    const dateB = new Date(b.data().Date || 0);
    return dateB.getTime() - dateA.getTime();
  });

  // Apply pagination
  const offset = (page - 1) * pageSize;
  const paginatedDocs = sortedDocs.slice(offset, offset + pageSize);

  return {
    data: formatResults(paginatedDocs),
    pagination: { page, pageSize, total: matchingDocs.length }
  };
}
```

### External API Integration
```typescript
async function fetchFromAPI(params: HybridFeedParams): Promise<FeedResponse> {
  console.log(`🌐 [API] Querying live data: ${startDate} to ${endDate}`);

  const response = await axios.get<FeedResponse>(
    'https://btcpapifunction-45998414364.us-central1.run.app/btcpapifunction/feed',
    {
      params: {
        startDate, endDate, outlet, sentiment, keyword,
        exactMatch: exactMatch ? 'true' : undefined,
        page, pageSize, userId
      },
      timeout: 30000
    }
  );

  return response.data;
}
```

### Result Combination
```typescript
function combineResults(historicalData: FeedResponse, recentData: FeedResponse): FeedResponse {
  const combinedData = [...historicalData.data, ...recentData.data];

  // Remove duplicates by URL
  const uniqueData = Array.from(
    new Map(combinedData.map(entry => [entry.URL, entry])).values()
  );

  // Sort by date (newest first)
  uniqueData.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());

  return {
    data: uniqueData,
    pagination: {
      page: 1,
      pageSize: uniqueData.length,
      total: historicalData.pagination.total + recentData.pagination.total
    }
  };
}
```

## Performance Optimizations

### Memory Management
- **8GB Memory Allocation**: Handles large document sets efficiently
- **Streaming Processing**: Documents processed in memory without intermediate storage
- **Garbage Collection**: Automatic cleanup of processed documents

### Query Optimization
- **Filter Early**: Apply date, outlet, and sentiment filters before text search
- **Limit Expansions**: Cap search term variations to 20 maximum
- **Efficient Sorting**: Use native JavaScript sort for in-memory results

### Caching Strategy
- **Function-Level**: Cloud Functions automatic container reuse
- **Query-Level**: No additional caching (real-time results priority)
- **CDN-Level**: Results can be cached at application level if needed

## Error Handling

### Timeout Management
```typescript
// Function timeout: 540 seconds (9 minutes)
// API timeout: 30 seconds
// Graceful degradation on timeout
```

### Fallback Strategies
```typescript
try {
  // Primary comprehensive search
  return await comprehensiveSearch(params);
} catch (error) {
  console.error('❌ [Comprehensive] Search failed:', error);
  // Could implement fallback to indexed search
  throw error;
}
```

### Logging Strategy
```typescript
// Comprehensive logging for debugging
console.log(`🔍 [Firestore] Searching for terms: ${searchTerms.join(', ')}`);
console.log(`🚀 [Firestore] Using comprehensive full-text search for complete coverage`);
console.log(`🎯 [Comprehensive] Full-text search found ${total} matching documents`);
console.log(`✅ [Comprehensive] Search completed: ${results.length} results from ${total} total matches`);
```

## Security Considerations

### Input Validation
```typescript
// Sanitize search terms
const baseTerms = keyword.toLowerCase().trim()
  .split(/[,\s]+/)
  .map(term => term.trim())
  .filter(term => term.length >= 3 && term.length <= 100); // Length limits
```

### Query Limits
- **Term Limit**: Maximum 20 search term variations
- **Result Limit**: Configurable pageSize with reasonable defaults
- **Memory Limit**: 8GB function memory prevents excessive resource usage

### Access Control
- **CORS Enabled**: `cors({ origin: true })`
- **No Authentication**: Public read access (as designed)
- **Rate Limiting**: Handled by Cloud Functions infrastructure

## Dependencies

### Core Dependencies
```json
{
  "firebase-functions": "^4.x",
  "firebase-admin": "^11.x",
  "axios": "^1.x",
  "express": "^4.x",
  "cors": "^2.x",
  "date-fns": "^2.x"
}
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true
  }
}
```

## Deployment Configuration

### Cloud Function Settings
```typescript
export const hybridFeed = onRequest({
  cors: true,
  region: 'us-central1',
  memory: '8GiB',
  maxInstances: 10,
  timeoutSeconds: 540,
}, app);
```

### Environment Variables
```bash
# Firebase project configuration
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# Function configuration (automatic)
FUNCTION_TARGET=hybridFeed
LOG_EXECUTION_ID=true
```