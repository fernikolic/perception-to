# Testing & Verification Guide

## Comprehensive Test Suite

### 1. Basic Functionality Tests

#### Health Check
```bash
# Test: Function is responding
curl "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/health"

# Expected Response:
{
  "status": "ok",
  "timestamp": "2025-09-20T20:30:00.000Z",
  "service": "hybrid-feed"
}
```

#### Simple Search Test
```bash
# Test: Basic search functionality
curl "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=bitcoin&pageSize=5"

# Expected: 5 results with bitcoin mentions
# Check: Response includes data array and pagination object
```

### 2. Coinbase Comprehensive Search Tests

#### Full Historical Range
```bash
# Test: Complete historical coverage
time curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2011-01-01&endDate=2025-09-20&pageSize=1" | jq '{total: .pagination.total, timeRange: "2011-2025"}'

# Expected Results:
{
  "total": 5581,
  "timeRange": "2011-2025"
}

# Expected Performance: ~75 seconds
```

#### Recent Data Range
```bash
# Test: Recent data performance
time curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2024-01-01&endDate=2025-09-20&pageSize=1" | jq '{total: .pagination.total, timeRange: "2024-2025"}'

# Expected Results:
{
  "total": 4380,
  "timeRange": "2024-2025"
}

# Expected Performance: ~68 seconds
```

#### Content Verification
```bash
# Test: Actual content contains search terms
curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2024-08-01&endDate=2024-08-31&pageSize=3" | jq '{resultCount: (.data | length), firstTitle: .data[0].Title, containsCoinbase: [.data[].Title, .data[].Content] | map(test("(?i)coinbase")) | any}'

# Expected Results:
{
  "resultCount": 3,
  "firstTitle": "...",
  "containsCoinbase": true
}
```

### 3. Case Sensitivity Tests

#### Lowercase Search
```bash
# Test: lowercase "coinbase"
time curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2020-01-01&endDate=2020-12-31&pageSize=1" | jq '{total: .pagination.total, keyword: "coinbase"}'

# Expected: 98 results for 2020
```

#### Uppercase Search
```bash
# Test: uppercase "COINBASE"
time curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=COINBASE&startDate=2020-01-01&endDate=2020-12-31&pageSize=1" | jq '{total: .pagination.total, keyword: "COINBASE"}'

# Expected: 98 results for 2020 (identical to lowercase)
```

### 4. Performance Benchmarks

#### Timing Tests
```bash
# Full range search timing
echo "=== Performance Test: Full Range ==="
time curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2011-01-01&endDate=2025-09-20&pageSize=1" > /dev/null

# Recent range search timing
echo "=== Performance Test: Recent Range ==="
time curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2024-01-01&endDate=2025-09-20&pageSize=1" > /dev/null

# Small range search timing
echo "=== Performance Test: Small Range ==="
time curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2024-08-01&endDate=2024-08-31&pageSize=10" > /dev/null
```

#### Expected Performance Benchmarks
- **Full Range (2011-2025)**: 60-90 seconds
- **Recent Range (2024-2025)**: 55-80 seconds
- **Small Range (1 month)**: 1-5 seconds

### 5. Log Verification Tests

#### Check Comprehensive Search Activation
```bash
# Test search and check logs
curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2024-06-01&endDate=2024-06-30&pageSize=1" > /dev/null

# Check logs for comprehensive search messages
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json
gcloud functions logs read hybridFeed --region=us-central1 --limit=10 | grep -E "(comprehensive|Comprehensive|Searching for terms)"

# Expected Log Messages:
# 🚀 [Firestore] Using comprehensive full-text search for complete coverage
# 🔍 [Firestore] Searching for terms: coinbase, Coinbase, COINBASE, coinbase.com, ...
# 🎯 [Comprehensive] Full-text search found XXX matching documents
# ✅ [Comprehensive] Search completed: X results from XXX total matches
```

### 6. Error Handling Tests

#### Invalid Parameters
```bash
# Test: Invalid date format
curl "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=test&startDate=invalid-date"

# Expected: Should handle gracefully, may default to no date filter
```

#### Very Large Page Size
```bash
# Test: Large page size
curl "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=bitcoin&pageSize=10000"

# Expected: Should handle without timeout or memory issues
```

#### Empty Search Terms
```bash
# Test: Empty keyword
curl "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=&pageSize=5"

# Expected: Should return appropriate response (possibly no results or error)
```

### 7. Integration Tests

#### API + Firestore Hybrid
```bash
# Test: Date range that requires both sources
curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=bitcoin&startDate=2025-09-19&endDate=2025-09-20&pageSize=5" | jq '.data | length'

# Expected: Results from both Firestore (Sept 19) and API (Sept 20)
# Check logs for both "Firestore" and "API" messages
```

#### Filter Combinations
```bash
# Test: Multiple filters
curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2024-01-01&endDate=2024-12-31&sentiment=Positive&pageSize=5"

# Expected: Results filtered by keyword, date range, and sentiment
```

### 8. Data Quality Tests

#### Result Relevance
```bash
# Test: Get actual content to verify relevance
curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2024-09-01&endDate=2024-09-20&pageSize=3" | jq '.data[] | {title: .Title, content: .Content[0:100]}'

# Manually verify: Each result should contain "coinbase" (any case) in title or content
```

#### Date Ordering
```bash
# Test: Results are ordered by date (newest first)
curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=bitcoin&startDate=2024-01-01&endDate=2024-12-31&pageSize=5" | jq '.data[] | .Date'

# Expected: Dates should be in descending order (newest to oldest)
```

## Automated Test Script

### Complete Test Suite
```bash
#!/bin/bash
# test-hybrid-search.sh

set -e

echo "🧪 Starting Hybrid Search Test Suite..."

# Test 1: Health Check
echo "1️⃣ Testing health endpoint..."
response=$(curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/health")
if [[ $response == *"ok"* ]]; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
    exit 1
fi

# Test 2: Basic Search
echo "2️⃣ Testing basic search..."
response=$(curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=bitcoin&pageSize=1")
if [[ $response == *"data"* ]]; then
    echo "✅ Basic search passed"
else
    echo "❌ Basic search failed"
    exit 1
fi

# Test 3: Coinbase Full Range
echo "3️⃣ Testing Coinbase full range..."
start_time=$(date +%s)
total=$(curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2011-01-01&endDate=2025-09-20&pageSize=1" | jq -r '.pagination.total')
end_time=$(date +%s)
duration=$((end_time - start_time))

if [[ $total -gt 5000 ]]; then
    echo "✅ Coinbase search passed: $total results in ${duration}s"
else
    echo "❌ Coinbase search failed: only $total results"
    exit 1
fi

# Test 4: Case Sensitivity
echo "4️⃣ Testing case sensitivity..."
lower=$(curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=coinbase&startDate=2020-01-01&endDate=2020-12-31&pageSize=1" | jq -r '.pagination.total')
upper=$(curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed?keyword=COINBASE&startDate=2020-01-01&endDate=2020-12-31&pageSize=1" | jq -r '.pagination.total')

if [[ $lower -eq $upper ]]; then
    echo "✅ Case sensitivity test passed: $lower == $upper"
else
    echo "❌ Case sensitivity test failed: $lower != $upper"
    exit 1
fi

echo "🎉 All tests passed!"
```

### Make it executable
```bash
chmod +x test-hybrid-search.sh
./test-hybrid-search.sh
```

## Verification Checklist

### Pre-Deployment Testing
- [ ] TypeScript compiles without errors
- [ ] Health endpoint responds correctly
- [ ] Basic search returns results
- [ ] No console errors in function logs

### Post-Deployment Testing
- [ ] Health check passes
- [ ] Basic search functionality works
- [ ] Coinbase search returns ~5,581 results
- [ ] Case-insensitive search works correctly
- [ ] Performance is within acceptable limits
- [ ] Comprehensive search logs are visible
- [ ] Results contain actual search terms
- [ ] Date ordering is correct

### Regression Testing
When making changes, always verify:
- [ ] Previous test results remain consistent
- [ ] Performance hasn't degraded significantly
- [ ] New features don't break existing functionality
- [ ] Log messages are still helpful for debugging

## Performance Monitoring

### Setting Up Alerts
```bash
# Example: Monitor function duration
# Set up Google Cloud Monitoring alert for:
# - Function execution time > 120 seconds
# - Function error rate > 5%
# - Function memory usage > 90%
```

### Regular Health Checks
```bash
# Add to cron job for regular monitoring
0 */6 * * * /path/to/test-hybrid-search.sh > /var/log/hybrid-search-test.log 2>&1
```

## Troubleshooting Test Failures

### Common Issues
1. **Timeout Errors**: Function may need more memory or time
2. **Low Result Count**: Check if data import was successful
3. **Performance Degradation**: Monitor Firestore query performance
4. **Log Errors**: Check function logs for detailed error messages

### Debug Commands
```bash
# Check recent function executions
gcloud functions logs read hybridFeed --region=us-central1 --limit=50

# Monitor real-time logs during testing
gcloud functions logs tail hybridFeed --region=us-central1

# Check function status
gcloud functions describe hybridFeed --region=us-central1
```