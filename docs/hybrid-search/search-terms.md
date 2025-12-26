# Search Terms System

## Overview

The search terms system is a crucial component that enables fast and comprehensive searching by pre-processing and expanding user queries into searchable variations.

## Search Term Extraction

### Base Term Processing
```typescript
function extractBaseTerms(keyword: string): string[] {
  return keyword.toLowerCase().trim()
    .split(/[,\s]+/)                    // Split on commas and spaces
    .map(term => term.trim())           // Clean whitespace
    .filter(term => term.length >= 3); // Minimum 3 characters
}
```

### Term Expansion Algorithm
```typescript
function expandSearchTerms(baseTerms: string[]): string[] {
  const expandedTerms = [];

  for (const term of baseTerms) {
    // Basic case variations
    expandedTerms.push(term);                              // lowercase
    expandedTerms.push(term.charAt(0).toUpperCase() + term.slice(1)); // Capitalized
    expandedTerms.push(term.toUpperCase());                // UPPERCASE

    // Company-specific variations
    if (term === 'coinbase') {
      expandedTerms.push('coinbase.com', 'Coinbase.com', 'COINBASE.COM');
      expandedTerms.push('coinbase inc', 'Coinbase Inc', 'COINBASE INC');
      expandedTerms.push('coinbase.inc', 'Coinbase.Inc', 'COINBASE.INC');
    }

    // Add more company patterns as needed
    if (term === 'binance') {
      expandedTerms.push('binance.com', 'Binance.com', 'BINANCE.COM');
      expandedTerms.push('binance inc', 'Binance Inc', 'BINANCE INC');
    }
  }

  // Remove duplicates and limit array size
  return [...new Set(expandedTerms)].slice(0, 20);
}
```

## Search Term Matching

### Comprehensive Matching Logic
```typescript
function matchesSearchTerms(fullText: string, baseTerms: string[]): boolean {
  const lowerFullText = fullText.toLowerCase();

  return baseTerms.some(baseTerm => {
    const searchTerm = baseTerm.toLowerCase();

    // Direct substring match
    if (lowerFullText.includes(searchTerm)) return true;

    // Company suffix variations
    if (lowerFullText.includes(searchTerm + '.com')) return true;
    if (lowerFullText.includes(searchTerm + ' inc')) return true;
    if (lowerFullText.includes(searchTerm + '.inc')) return true;
    if (lowerFullText.includes(searchTerm + ' corporation')) return true;
    if (lowerFullText.includes(searchTerm + ' corp')) return true;

    return false;
  });
}
```

## SearchTerms Field (Firestore)

### Purpose
The `searchTerms` field in Firestore documents enables fast indexed queries instead of slow full-text search for every request.

### Structure
```typescript
interface FeedEntry {
  Title: string;
  Content: string;
  searchTerms: string[];  // Pre-computed search terms
  // ... other fields
}
```

### Generation Logic
```typescript
function extractSearchTerms(title: string, content: string): string[] {
  const text = `${title} ${content}`.toLowerCase();

  // Remove common stop words
  const stopWords = new Set([
    'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'said',
    'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'a', 'an', 'as', 'if', 'when', 'where', 'why', 'how', 'what', 'who',
    'bitcoin', 'btc', 'crypto', 'cryptocurrency' // Too common in this dataset
  ]);

  // Extract meaningful words (3+ characters, not stop words)
  const words = text
    .replace(/[^\w\s]/g, ' ')           // Remove punctuation
    .split(/\s+/)                      // Split on whitespace
    .filter(word => word.length >= 3 && !stopWords.has(word))
    .slice(0, 30);                     // Limit to prevent huge arrays

  // Add important multi-word phrases
  const importantPhrases = [
    'blockstream', 'adam back', 'liquid network', 'lightning network',
    'michael saylor', 'elon musk', 'jack dorsey', 'cathie wood',
    'coinbase', 'binance', 'kraken', 'gemini', 'robinhood',
    'microstrategy', 'tesla', 'square', 'paypal', 'visa', 'mastercard',
    'el salvador', 'federal reserve', 'sec', 'cftc', 'treasury',
    'taproot', 'segwit', 'halving', 'mining', 'hashrate',
    'wall street', 'goldman sachs', 'jpmorgan', 'blackrock'
  ];

  const phrases = importantPhrases.filter(phrase => text.includes(phrase));

  // Combine and deduplicate
  return [...new Set([...words, ...phrases])];
}
```

## Search Strategies

### 1. Fast Indexed Search (When Available)
```typescript
// Query using pre-computed searchTerms
query = query.where('searchTerms', 'array-contains-any', searchTerms);
```

**Pros**: Very fast (sub-second for most queries)
**Cons**: Limited to pre-computed terms, may miss some variations

### 2. Comprehensive Full-Text Search (Current Implementation)
```typescript
// Fetch all documents and filter in memory
const allDocs = await query.get();
const matches = allDocs.docs.filter(doc => matchesSearchTerms(fullText, baseTerms));
```

**Pros**: Comprehensive coverage, catches all variations
**Cons**: Slower performance (~60-90 seconds for large datasets)

### 3. Hybrid Approach (Future Enhancement)
```typescript
// Try indexed search first, fall back to full-text if needed
const indexedResults = await tryIndexedSearch(searchTerms);
if (indexedResults.length < threshold) {
  const fullTextResults = await tryFullTextSearch(baseTerms);
  return combineResults(indexedResults, fullTextResults);
}
return indexedResults;
```

## SearchTerms Backfill Process

### Purpose
CSV-imported data lacks the `searchTerms` field and must be backfilled for optimal performance.

### Backfill Function
**Location**: `/functions/src/backfill-search-terms.ts`
**Endpoint**: `https://us-central1-perception-app-3db34.cloudfunctions.net/backfillSearchTerms`

### Usage
```bash
# Dry run to test
curl -X POST "https://us-central1-perception-app-3db34.cloudfunctions.net/backfillSearchTerms" \
  -H "Content-Type: application/json" \
  -d '{"batchSize": 1000, "dryRun": true}'

# Actual backfill
curl -X POST "https://us-central1-perception-app-3db34.cloudfunctions.net/backfillSearchTerms" \
  -H "Content-Type: application/json" \
  -d '{"batchSize": 1000, "dryRun": false}'
```

### Continuous Backfill Script
**Location**: `/continuous-backfill.sh`

```bash
#!/bin/bash
echo "🚀 Starting continuous searchTerms backfill..."
total_processed=0
batch_count=0

while true; do
    batch_count=$((batch_count + 1))
    echo "📦 Processing batch $batch_count..."

    response=$(curl -s -X POST "https://us-central1-perception-app-3db34.cloudfunctions.net/backfillSearchTerms" \
        -H "Content-Type: application/json" \
        -d '{"batchSize": 1000, "dryRun": false}')

    processed=$(echo "$response" | jq -r '.processed')

    if [ "$processed" = "null" ] || [ "$processed" = "0" ] || [ -z "$processed" ]; then
        echo "✅ Backfill complete! No more records to process."
        break
    fi

    total_processed=$((total_processed + processed))
    echo "   Processed: $processed records (Total: $total_processed)"

    sleep 2 # Brief pause between batches
done
```

## Performance Considerations

### Memory Usage
- **Search Term Arrays**: Limited to 20 terms maximum
- **Text Processing**: Efficient string operations
- **Firestore Queries**: Optimized for minimal document reads

### Query Optimization
- **Early Filtering**: Apply date/outlet/sentiment filters first
- **Efficient Matching**: Use indexOf instead of regex where possible
- **Batch Processing**: Process documents in memory to minimize database calls

### Indexing Strategy
```typescript
// Required Firestore indexes for searchTerms queries
{
  "collectionGroup": "feed_entries",
  "fields": [
    {"fieldPath": "searchTerms", "arrayConfig": "CONTAINS"},
    {"fieldPath": "Date", "order": "DESCENDING"}
  ]
}
```

## Examples

### Basic Search
```
User Input: "coinbase"
Base Terms: ["coinbase"]
Expanded Terms: ["coinbase", "Coinbase", "COINBASE", "coinbase.com", "Coinbase.com", "COINBASE.COM", "coinbase inc", "Coinbase Inc", "COINBASE INC", "coinbase.inc", "Coinbase.Inc", "COINBASE.INC"]
```

### Multi-term Search
```
User Input: "coinbase, binance"
Base Terms: ["coinbase", "binance"]
Expanded Terms: ["coinbase", "Coinbase", "COINBASE", "coinbase.com", ..., "binance", "Binance", "BINANCE", "binance.com", ...]
```

### Company Variations Matched
- ✅ "Coinbase announced..." (Title)
- ✅ "Visit coinbase.com for..." (Content)
- ✅ "Coinbase Inc. reported..." (Content)
- ✅ "COINBASE EARNINGS" (Title)
- ✅ "coinbase.inc policy..." (Content)

## Future Enhancements

### 1. Smart Term Expansion
- Machine learning-based term similarity
- Industry-specific synonym detection
- Context-aware expansion

### 2. Performance Optimization
- Partial index rebuilding
- Term frequency analysis
- Query result caching

### 3. Advanced Matching
- Fuzzy string matching
- Phonetic similarity (Soundex, Metaphone)
- Semantic search capabilities

### 4. Analytics
- Search term popularity tracking
- Performance metrics collection
- Query optimization recommendations