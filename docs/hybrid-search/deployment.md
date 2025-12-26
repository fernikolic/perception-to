# Deployment Guide

## Prerequisites

### Required Tools
```bash
# Google Cloud SDK
gcloud --version

# Firebase CLI
firebase --version

# Node.js (v18+)
node --version
npm --version
```

### Required Credentials
```bash
# Service account key
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/bitcoin-data-chat-key.json

# Firebase project
firebase use perception-app-3db34
```

## Initial Setup

### 1. Install Dependencies
```bash
cd /Users/fernandonikolic/perception/functions
npm install
```

### 2. Build TypeScript
```bash
npm run build
```

### 3. Verify Configuration
```bash
# Check Firebase configuration
firebase projects:list

# Verify project is selected
firebase use
```

## Deployment Process

### Standard Deployment
```bash
# Deploy the hybrid feed function
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
firebase deploy --only functions:hybridFeed
```

### Advanced Deployment (Recommended)
```bash
# Build and deploy with explicit settings
npm run build && \
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
gcloud functions deploy hybridFeed \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=functions \
  --entry-point=hybridFeed \
  --trigger-http \
  --allow-unauthenticated \
  --memory=8GB \
  --timeout=540s \
  --quiet
```

### Deployment Verification
```bash
# Check function status
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
gcloud functions list --filter="name:hybridFeed"

# Test basic functionality
curl "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/health"

# Test search functionality
curl "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=test&pageSize=1"
```

## Configuration Details

### Function Configuration
```yaml
Name: hybridFeed
Runtime: nodejs20
Region: us-central1
Memory: 8GB
Timeout: 540 seconds (9 minutes)
Max Instances: 10
Trigger: HTTP
Authentication: None (public)
```

### Environment Variables
```bash
# Automatically set by Cloud Functions
FUNCTION_TARGET=hybridFeed
LOG_EXECUTION_ID=true

# Service account (configured via deployment)
GOOGLE_APPLICATION_CREDENTIALS=/var/secrets/google/key.json
```

## Firestore Requirements

### Required Indexes
The system requires specific Firestore composite indexes for optimal performance:

```json
{
  "indexes": [
    {
      "collectionGroup": "feed_entries",
      "queryScope": "COLLECTION",
      "fields": [
        {"fieldPath": "Date", "order": "ASCENDING"},
        {"fieldPath": "Date", "order": "DESCENDING"}
      ]
    },
    {
      "collectionGroup": "feed_entries",
      "queryScope": "COLLECTION",
      "fields": [
        {"fieldPath": "outlet_normalized", "order": "ASCENDING"},
        {"fieldPath": "Date", "order": "DESCENDING"}
      ]
    },
    {
      "collectionGroup": "feed_entries",
      "queryScope": "COLLECTION",
      "fields": [
        {"fieldPath": "Sentiment", "order": "ASCENDING"},
        {"fieldPath": "Date", "order": "DESCENDING"}
      ]
    }
  ]
}
```

### Deploy Indexes
```bash
# Deploy Firestore indexes
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
firebase deploy --only firestore:indexes
```

## SearchTerms Backfill

### Required for CSV-Imported Data
If you have data imported from CSV that lacks the `searchTerms` field, run the backfill:

```bash
# Deploy the backfill function
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
firebase deploy --only functions:backfillSearchTerms

# Run the backfill (dry run first)
curl -X POST "https://us-central1-perception-app-3db34.cloudfunctions.net/backfillSearchTerms" \
  -H "Content-Type: application/json" \
  -d '{"batchSize": 1000, "dryRun": true}'

# Run actual backfill
./continuous-backfill.sh
```

### Monitor Progress
```bash
# Check backfill logs
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
firebase functions:log backfillSearchTerms --limit 10
```

## Monitoring & Maintenance

### Function Logs
```bash
# View recent logs
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
gcloud functions logs read hybridFeed --region=us-central1 --limit=20

# Filter for errors
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
gcloud functions logs read hybridFeed --region=us-central1 --limit=20 --filter="severity>=ERROR"

# Real-time monitoring
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
gcloud functions logs tail hybridFeed --region=us-central1
```

### Performance Monitoring
```bash
# Check function metrics in Google Cloud Console
# https://console.cloud.google.com/functions/details/us-central1/hybridFeed

# Function URL for testing
curl -w "@curl-format.txt" -s -o /dev/null \
  "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=bitcoin&pageSize=10"
```

### Health Checks
```bash
# Basic health check
curl "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/health"

# Search functionality test
curl "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=test&startDate=2024-01-01&endDate=2024-01-31&pageSize=5"
```

## Troubleshooting Deployment

### Common Issues

#### 1. Permission Denied
```bash
# Error: Permission denied
# Solution: Verify service account key
ls -la /Users/fernandonikolic/perception/bitcoin-data-chat-key.json
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json
gcloud auth application-default print-access-token
```

#### 2. Build Failures
```bash
# Error: TypeScript compilation failed
# Solution: Check for syntax errors
cd functions
npm run build

# Check for missing dependencies
npm install
```

#### 3. Function Timeout
```bash
# Error: Function deployment timeout
# Solution: Use explicit gcloud deployment
gcloud functions deploy hybridFeed --timeout=540s --memory=8GB
```

#### 4. Index Missing
```bash
# Error: The query requires an index
# Solution: Deploy Firestore indexes
firebase deploy --only firestore:indexes

# Check index status
firebase firestore:indexes
```

### Rollback Procedure
```bash
# List previous deployments
gcloud functions describe hybridFeed --region=us-central1

# Rollback to previous version (if needed)
# Note: Cloud Functions don't support direct rollback
# Redeploy from previous code version instead
git checkout <previous-commit>
npm run build
# Redeploy
```

## Production Checklist

### Pre-Deployment
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] All dependencies installed (`npm install`)
- [ ] Service account key is valid
- [ ] Firestore indexes are deployed
- [ ] SearchTerms backfill completed (if applicable)

### Post-Deployment
- [ ] Function deploys successfully
- [ ] Health check endpoint responds
- [ ] Search functionality works
- [ ] Logs show expected behavior
- [ ] Performance is acceptable
- [ ] No error spikes in monitoring

### Verification Tests
```bash
# 1. Health check
curl "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/health"

# 2. Basic search
curl "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=bitcoin&pageSize=1"

# 3. Comprehensive search
curl "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2024-01-01&endDate=2024-12-31&pageSize=5"

# 4. Performance test
time curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=test&pageSize=10" > /dev/null
```

## Automated Deployment

### CI/CD Script
```bash
#!/bin/bash
# deploy-hybrid-search.sh

set -e

echo "🚀 Starting Hybrid Search deployment..."

# Build
echo "📦 Building TypeScript..."
cd functions
npm run build

# Deploy function
echo "🔧 Deploying function..."
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
gcloud functions deploy hybridFeed \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=. \
  --entry-point=hybridFeed \
  --trigger-http \
  --allow-unauthenticated \
  --memory=8GB \
  --timeout=540s \
  --quiet

# Verify
echo "✅ Verifying deployment..."
curl -f "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/health" || exit 1

echo "🎉 Deployment complete!"
```

### Make it executable
```bash
chmod +x deploy-hybrid-search.sh
./deploy-hybrid-search.sh
```