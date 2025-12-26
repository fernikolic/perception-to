# Cloud Function Optimization Documentation

## btcpapifunction3-1 Recovery and Optimization

**Date**: September 22-23, 2025
**Original Issue**: Google Cloud Console UI timeout when accessing source code
**Resolution**: Successfully extracted, optimized, and redeployed the function

---

## Table of Contents
1. [Problem Summary](#problem-summary)
2. [Root Cause Analysis](#root-cause-analysis)
3. [Solution Approach](#solution-approach)
4. [Implementation Steps](#implementation-steps)
5. [Results](#results)
6. [Technical Details](#technical-details)
7. [Future Improvements](#future-improvements)

---

## Problem Summary

### Initial Symptoms
- Google Cloud Console UI would timeout when trying to access the source code
- Error message: "We ran into an error while trying to load this page"
- Safari revealed: File size over 20MB preventing UI preview
- Function was coded directly in GCP UI editor (no local backup)

### Impact
- Unable to edit or modify the function through GCP Console
- No local copy of the source code existed
- Function was critical to the application (trends analysis)
- Used extensively throughout the frontend application

---

## Root Cause Analysis

### Investigation Findings
1. **Function Type**: Cloud Run service (not Cloud Function)
   - Service: `btcpapifunction3-1`
   - URL: `https://btcpapifunction3-1-45998414364.us-central1.run.app`

2. **Resource Configuration Issues**:
   - Memory: Only 512MB allocated
   - Concurrency: Set to 80 (too high for AI processing)
   - CPU: Limited to 1000m (1 CPU)

3. **Code Structure**:
   - Single monolithic `index.js` file with 1,514 lines
   - File size: 56KB (not 20MB itself)
   - Node modules: 26MB (likely causing the UI issue)
   - All endpoints in one service

### Endpoints Served
- `POST /extract` - Trend extraction using OpenAI
- `GET /trends` - Retrieve stored trends
- `GET /trends/count` - Get trend counts
- `GET /signals` - Signal detection and intelligence
- `GET /intelligence/categories` - Category analytics
- `GET /insights/snapshot` - Market insights

---

## Solution Approach

### Phase 1: Immediate Resource Optimization
Updated the existing service configuration to prevent timeouts:
```bash
gcloud run services update btcpapifunction3-1 \
  --memory=2Gi \
  --concurrency=10 \
  --max-instances=5
```

### Phase 2: Source Code Extraction
Used Cloud Shell and Docker to extract the source code from the deployed container.

### Phase 3: Service Optimization
Created an optimized version with better resource allocation and deployment configuration.

---

## Implementation Steps

### Step 1: Source Code Extraction

```bash
# In Cloud Shell
mkdir btcapi-extraction && cd btcapi-extraction

# Set image variable
IMAGE="us-central1-docker.pkg.dev/triple-upgrade-245423/cloud-run-source-deploy/btcpapifunction3-1@sha256:36f2b217013271dfc0da44dafe71567b0cffce58b4bacaa607cf410d3df3b4fd"

# Pull and extract
docker pull $IMAGE
docker create --name temp-extract $IMAGE
docker cp temp-extract:/workspace ./btcapi-source
docker rm temp-extract

# Verify extraction
ls -la btcapi-source/
```

**Extracted Files**:
- `index.js` - 56KB, 1,514 lines of code
- `package.json` - Dependencies configuration
- `node_modules/` - 26MB of dependencies

### Step 2: Code Analysis

**Key Findings**:
- Business Intelligence Trend Discovery System v2.1
- Uses OpenAI GPT-4o-mini for trend analysis
- BigQuery integration for data storage
- Slack webhook notifications
- Complex trend merging and deduplication logic

**Dependencies**:
```json
{
  "@google-cloud/bigquery": "^7.6.0",
  "axios": "^1.6.0",
  "openai": "^4.1.0",
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "compression": "^1.7.4"
}
```

### Step 3: Fix Container Startup Issue

**Original Problem**: Container failed to start on Cloud Run

**Root Cause**: Missing server startup code
```javascript
exports.app = app;  // Export exists but server wasn't starting
```

**Solution Added**:
```javascript
// Start server for Cloud Run
const PORT = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
}

exports.app = app;
```

### Step 4: Deploy Optimized Version

Created new service `btcpapifunction3-1-optimized` with improved configuration:

```bash
gcloud run deploy btcpapifunction3-1-optimized \
  --source . \
  --region=us-central1 \
  --memory=4Gi \
  --cpu=2 \
  --timeout=540 \
  --max-instances=10 \
  --min-instances=0 \
  --concurrency=5 \
  --allow-unauthenticated \
  --set-env-vars="OPENAI_API_KEY_V2=[key],OPENAI_MODEL=gpt-4o-mini"
```

**Configuration Improvements**:
- Memory: 512MB → 4GB (8x increase)
- CPU: 1 → 2 CPUs (2x increase)
- Concurrency: 80 → 5 (better for AI workloads)
- Timeout: 300s → 540s (9 minutes)

---

## Results

### Performance Improvements
✅ **GCP Console UI**: Now loads without timeout
✅ **Response Times**: Improved due to better resource allocation
✅ **Stability**: Lower concurrency prevents memory issues
✅ **Scalability**: Can handle 10 instances with proper resources

### Verification Tests
All endpoints tested and working correctly:

```bash
# Test trend count
curl "https://btcpapifunction3-1-optimized-45998414364.us-central1.run.app/trends/count?date=2025-09-22"
# Result: {"total_in_database":14999, "today":{"total":152, "strong":2, "emerging":3, "early":147}}

# Test categories
curl "https://btcpapifunction3-1-optimized-45998414364.us-central1.run.app/intelligence/categories?hours=24"
# Result: Detailed category breakdown with trends

# Test trends
curl "https://btcpapifunction3-1-optimized-45998414364.us-central1.run.app/trends?date=2025-09-22"
# Result: Array of analyzed trends with signal strength
```

---

## Technical Details

### Architecture Overview
```
┌─────────────────────┐
│   Frontend App      │
│ (React + TypeScript)│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Cloud Run Service  │
│ btcpapifunction3-1  │
│   (Express.js)      │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
┌─────────┐ ┌─────────┐
│ OpenAI  │ │BigQuery │
│ GPT-4   │ │ Tables  │
└─────────┘ └─────────┘
```

### BigQuery Tables
- `trend_discovery.trend_discovery_table` - Main trends storage
- `trend_discovery.trend_id_log` - Trend ID tracking
- `trend_discovery.trend_instances` - Trend instances
- `btcp_main_dataset.all_channels_data` - Source data

### Data Flow
1. **Data Ingestion**: Articles from last 24 hours fetched from BigQuery
2. **AI Processing**: OpenAI analyzes articles in chunks of 800
3. **Trend Extraction**: Identifies business intelligence signals
4. **Categorization**: Assigns to 15 predefined business categories
5. **Signal Strength**: Calculates strong/emerging/early signals
6. **Storage**: Saves to BigQuery with deduplication
7. **Notification**: Sends to Slack webhooks if configured

### Signal Strength Algorithm
```javascript
SIGNAL_THRESHOLDS = {
  STRONG: { minArticles: 5, minOutlets: 3 },
  EMERGING: { minArticles: 2, minOutlets: 2 },
  EARLY: { minArticles: 1, minOutlets: 1 }
}
```

---

## Future Improvements

### Completed
- [x] Extract source code from container
- [x] Fix container startup issue
- [x] Optimize resource allocation
- [x] Deploy working optimized version
- [x] Verify all endpoints functional

### Recommended Next Steps

#### 1. Code Modularization
Split the monolithic service into microservices:
- `btcapi-trends-extract` - Trend extraction (POST /extract)
- `btcapi-trends-data` - Data retrieval (GET endpoints)
- `btcapi-signals` - Signal detection and intelligence

#### 2. Prompt Optimization
Improve OpenAI prompts for better trend quality:
- More specific titles (names, numbers, actions)
- Focused categories (max 2 per trend)
- Actionable summaries with concrete details
- Better highlight extraction

#### 3. Performance Enhancements
- Implement caching layer (Redis/Memorystore)
- Add request queuing for extraction
- Optimize BigQuery queries
- Implement pagination for large results

#### 4. Development Workflow
- Set up local development environment
- Version control in Git repository
- CI/CD pipeline for deployments
- Staging environment for testing

#### 5. Monitoring & Observability
- Add structured logging
- Implement error tracking (Sentry)
- Set up performance monitoring
- Create alerting for failures

---

## Commands Reference

### Access Source in Cloud Shell
```bash
# Extract source from container
gcloud run services describe btcpapifunction3-1-optimized \
  --region=us-central1 \
  --format="value(spec.template.spec.containers[0].image)"

# Edit source
cloudshell edit index.js

# Deploy changes
gcloud run deploy btcpapifunction3-1-optimized \
  --source . \
  --region=us-central1
```

### Frontend Integration
Update `/src/lib/api/trends.ts`:
```javascript
// Old endpoint
const API_BASE_URL_V3 = 'https://btcpapifunction3-1-45998414364.us-central1.run.app';

// New optimized endpoint
const API_BASE_URL_V3 = 'https://btcpapifunction3-1-optimized-45998414364.us-central1.run.app';
```

### Rollback if Needed
```bash
# Switch traffic back to original
gcloud run services update-traffic btcpapifunction3-1 \
  --region=us-central1 \
  --to-revisions=btcpapifunction3-1-00044-b95=100
```

---

## Lessons Learned

1. **Always maintain local copies** of code developed in cloud editors
2. **Resource allocation matters** for AI/ML workloads
3. **Concurrency settings** should match workload characteristics
4. **Container startup** requires explicit server initialization
5. **Modular architecture** prevents single points of failure

---

## Support Information

- **Service URL**: https://btcpapifunction3-1-optimized-45998414364.us-central1.run.app
- **Region**: us-central1
- **Project**: triple-upgrade-245423
- **Last Updated**: September 23, 2025
- **Status**: ✅ Fully Operational

---

*This documentation covers the complete recovery and optimization process for the btcpapifunction3-1 Cloud Run service. For questions or issues, refer to the implementation steps or contact the development team.*