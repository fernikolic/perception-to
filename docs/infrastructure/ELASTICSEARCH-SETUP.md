# 🔍 GCP Elasticsearch Integration - Fast + Complete Search Solution

## Overview
Setup native full-text search on 434K documents to achieve <5s performance with 100% coverage, eliminating Firestore array-contains limitations.

## Architecture
```
[Frontend] → [Cloud Function API] → [Elasticsearch Cluster]
                ↓
[Firestore] ← [Sync Function] ← [BigQuery Export]
```

## Phase 1: GCP Elasticsearch Cluster Setup

### 1.1 Enable APIs
```bash
gcloud services enable elasticsearch.googleapis.com
gcloud services enable compute.googleapis.com
```

### 1.2 Create Elasticsearch Cluster
```bash
# Create small production cluster
gcloud beta elasticsearch instances create perception-search \
  --node-count=3 \
  --node-type=e2-standard-2 \
  --disk-size=20GB \
  --region=us-central1 \
  --tier=basic \
  --authorized-networks=0.0.0.0/0
```

**Cost Estimate**: ~$150-300/month for 3-node cluster

## Phase 2: Data Ingestion

### 2.1 Initial Bulk Import Function
```typescript
// functions/src/elasticsearch-bulk-import.ts
import { Client } from '@elastic/elasticsearch';

export const elasticsearchBulkImport = onRequest(async (req, res) => {
  const esClient = new Client({
    node: process.env.ELASTICSEARCH_URL,
    auth: {
      apiKey: process.env.ELASTICSEARCH_API_KEY
    }
  });

  // Create index with optimized mapping
  await esClient.indices.create({
    index: 'feed_entries',
    body: {
      mappings: {
        properties: {
          title: { type: 'text', analyzer: 'standard' },
          content: { type: 'text', analyzer: 'standard' },
          date: { type: 'date' },
          outlet: { type: 'keyword' },
          sentiment: { type: 'keyword' },
          url: { type: 'keyword' }
        }
      }
    }
  });

  // Bulk import from Firestore
  // Process in chunks of 1000 documents
});
```

### 2.2 Real-time Sync Function
```typescript
// functions/src/elasticsearch-sync.ts
export const syncToElasticsearch = onDocumentCreated(
  'feed_entries/{docId}',
  async (event) => {
    const data = event.data?.data();

    await esClient.index({
      index: 'feed_entries',
      id: event.params.docId,
      body: {
        title: data.Title,
        content: data.Content,
        date: data.Date,
        outlet: data.Outlet,
        sentiment: data.Sentiment,
        url: data.URL
      }
    });
  }
);
```

## Phase 3: Search API Integration

### 3.1 Fast Search Function
```typescript
// functions/src/elasticsearch-search.ts
export const elasticsearchSearch = onRequest(async (req, res) => {
  const { keyword, startDate, endDate, pageSize = 5000 } = req.query;

  const searchQuery = {
    index: 'feed_entries',
    body: {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query: keyword,
                fields: ['title^2', 'content'],
                type: 'best_fields',
                fuzziness: 'AUTO'
              }
            }
          ],
          filter: [
            {
              range: {
                date: {
                  gte: startDate,
                  lte: endDate
                }
              }
            }
          ]
        }
      },
      size: pageSize,
      sort: [{ date: { order: 'desc' } }]
    }
  };

  const response = await esClient.search(searchQuery);

  res.json({
    data: response.body.hits.hits.map(hit => hit._source),
    pagination: {
      total: response.body.hits.total.value
    }
  });
});
```

## Phase 4: Frontend Integration

### 4.1 Update API Calls
```typescript
// src/lib/api/elasticsearch-search.ts
export async function searchElasticsearch(params: SearchParams) {
  const response = await fetch('/api/elasticsearch-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  return response.json();
}
```

### 4.2 Update Search Hook
```typescript
// src/hooks/use-elasticsearch-search.ts
export function useElasticsearchSearch(keyword: string, options: SearchOptions) {
  return useQuery({
    queryKey: ['elasticsearch-search', keyword, options],
    queryFn: () => searchElasticsearch({ keyword, ...options }),
    enabled: !!keyword,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

## Expected Performance

### Benchmark Targets
- **Coinbase 2-year search**: 4,766 results in <2 seconds
- **Complex queries**: Multi-term, fuzzy matching, phrase search
- **Scalability**: Handles 434K+ documents with room to grow
- **Reliability**: 99.9% uptime with cluster redundancy

### Search Features
- **Full-text search**: Native text analysis, stemming, synonyms
- **Fuzzy matching**: Handles typos and variations automatically
- **Field boosting**: Title matches ranked higher than content
- **Faceted search**: Filter by outlet, sentiment, date ranges
- **Pagination**: Efficient offset or cursor-based pagination

## Migration Strategy

### Phase A: Parallel Implementation (1-2 days)
1. Setup Elasticsearch cluster
2. Build bulk import function
3. Import all 434K documents
4. Build search API

### Phase B: A/B Testing (1 week)
1. Deploy Elasticsearch search alongside Firestore
2. Feature flag to toggle between systems
3. Compare performance and accuracy
4. User feedback collection

### Phase C: Full Migration (1 day)
1. Switch default search to Elasticsearch
2. Remove Firestore search complexity
3. Monitor performance metrics
4. Cleanup old searchTerms infrastructure

## Cost Analysis

### Elasticsearch Cluster
- **3-node cluster**: ~$200/month
- **Storage**: 20GB × 3 = 60GB (~$15/month)
- **Network**: Minimal for internal traffic
- **Total**: ~$215/month

### Alternative: Elasticsearch Service (managed)
- **Google Cloud Elasticsearch**: ~$300-500/month (fully managed)
- **Benefits**: Automated backups, updates, monitoring

## Implementation Priority

Given the 19% indexed coverage limitation with Firestore, **Elasticsearch is the recommended path** to achieve your fast+complete requirements.

**Ready to proceed with Phase 1 setup?** 🚀