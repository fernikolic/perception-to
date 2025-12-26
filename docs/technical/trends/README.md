# Bitcoin Trends System Documentation

This directory contains detailed documentation for the Bitcoin Trends extraction and consolidation system.

## Current Version: 3.2 (Batched Analysis)

**Status**: ✅ Production
**Last Updated**: November 22, 2025
**Service**: `btcpapifunction3-1-final` (Cloud Run)

---

## Quick Links

### Main Documentation
- **[TRENDS_SYSTEM_ARCHITECTURE.md](../../TRENDS_SYSTEM_ARCHITECTURE.md)** - Complete system architecture, configuration, deployment, and troubleshooting
- **[CLAUDE.md](../CLAUDE.md)** - Technical overview with deployment instructions and common issues

### Version Changelogs
- **[CHANGELOG-TRENDS-V3.2.md](./CHANGELOG-TRENDS-V3.2.md)** ⭐ **LATEST** - Batched analysis for comprehensive coverage
- **[CHANGELOG-TRENDS-V4.md](./CHANGELOG-TRENDS-V4.md)** - Experimental hash-based consolidation (not in production)

---

## System Overview

The Bitcoin Trends system uses AI to extract business-focused trends from Bitcoin-related articles:

```
BigQuery (2000 articles)
    ↓
Cloud Run Service
    ├─ Batch 1: 400 articles → OpenAI → 4-8 trends
    ├─ Batch 2: 400 articles → OpenAI → 4-8 trends
    ├─ Batch 3: 400 articles → OpenAI → 4-8 trends
    ├─ Batch 4: 400 articles → OpenAI → 4-8 trends
    └─ Batch 5: 400 articles → OpenAI → 4-8 trends
    ↓
Cross-batch deduplication
    ↓
BigQuery: ai_trends_tracking (20-35 consolidated trends)
    ↓
Frontend UI (with 5-minute cache)
```

**Key Features**:
- 🔄 **Batched Processing**: Analyzes ALL 2000 articles (not just 500)
- 🎯 **Comprehensive Coverage**: Trends show 5-10+ sources (not 2-3)
- 🤖 **Context-Aware**: OpenAI receives existing trends to add articles (not create duplicates)
- ⚡ **Automated**: Runs hourly via Cloud Scheduler
- 📊 **Production-Ready**: 75% more trends discovered, 40% more sources per trend

---

## Version History

| Version | Date | Key Feature | Status |
|---------|------|-------------|--------|
| **3.2** | 2025-11-22 | **Batched Analysis** - Processes all 2000 articles | ✅ **Current Production** |
| 3.1 | 2025-11-21 | Context-Aware Updates - Adds to existing trends | ✅ Replaced by 3.2 |
| 3.0 | 2025-11-20 | Aggressive Consolidation - 50% similarity threshold | ✅ Replaced by 3.1 |
| 2.0 | 2025-11-19 | Cloud Run Deployment - Hourly scheduler | ✅ Replaced by 3.0 |
| 1.0 | 2025-11-18 | Initial Release - Basic OpenAI integration | ✅ Replaced by 2.0 |
| **4.0** | 2025-10-23 | Hash-based Consolidation - In-memory caching | ⚠️ Experimental (separate codebase) |

---

## What Changed in v3.2?

### Problem (v3.1)
- Only analyzed 500 of 2000 available articles per run
- 75% of sources ignored every hour
- Trends showed 2-3 sources when 10+ were available
- Incomplete market coverage

### Solution (v3.2)
- **Batched processing**: Splits 2000 articles into 5 batches of 400
- **Cross-batch deduplication**: Merges similar trends from different batches
- **Comprehensive coverage**: All articles analyzed, not just a subset

### Results
- ✅ 300% more articles analyzed (500 → 2000)
- ✅ 167% more sources per trend (3 → 7 average)
- ✅ 75% more trends discovered (4 → 7 in testing)
- ⚠️ 200% longer processing time (1.5 min → 4.5 min - acceptable for hourly runs)

**See [CHANGELOG-TRENDS-V3.2.md](./CHANGELOG-TRENDS-V3.2.md) for full details.**

---

## Quick Start

### Check System Health

```bash
# Verify service is running
curl https://btcpapifunction3-1-final-45998414364.us-central1.run.app/

# Expected: {"status": "ok", "version": "3.2.0-production"}
```

### Trigger Manual Extraction

```bash
curl -X POST "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract" \
  -H "Content-Type: application/json" -d '{}'

# Takes ~4.5 minutes, returns comprehensive trends with 5-10+ sources
```

### View Recent Trends

```bash
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?hours=24&limit=10"
```

### Check Logs

```bash
gcloud run services logs read btcpapifunction3-1-final \
  --region=us-central1 --limit=50 | grep -E "Batch|batches"

# Should show: "Batching 2000 articles into 5 batch(es)"
```

---

## Common Issues

### Trends showing only 2-3 sources (should be 5-10+)

**Diagnosis**: Batching not working
```bash
curl -X POST "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract" -d '{}'
```
Check response: `"analysisArticleCount"` should be `2000`, not `500`

**Fix**: Redeploy service
```bash
cd /Users/fernandonikolic/perception/functions
bash deploy-ui-compatible-service.sh
```

### Duplicate trends in UI

**Diagnosis**: Cross-batch deduplication not working

**Fix**: Check logs for deduplication messages
```bash
gcloud run services logs read btcpapifunction3-1-final --region=us-central1 --limit=20 | grep "deduplication"
```

Should show: `"Total trends before cross-batch deduplication: X"` → `"after: Y"`

### Processing taking > 6 minutes

**Diagnosis**: Too many articles or OpenAI slowness

**Fix**: Check article count
```sql
SELECT COUNT(*) FROM `btcp_main_dataset.all_channels_data`
WHERE published_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR)
```

If > 2500 articles, consider increasing timeout or reducing lookback window.

---

## Architecture Details

### Files & Locations

**Production Code**:
- `/Users/fernandonikolic/perception/functions/btc-trends-ui-deployment/index.js` - Main service
- `/Users/fernandonikolic/perception/functions/btc-trends-ui-deployment/package.json` - Dependencies

**Key Functions**:
- `app.post('/extract')` (lines 380-870) - Main extraction endpoint with batching
- `buildImprovedPrompt()` (lines 20-90) - OpenAI system prompt
- `crossBatchDeduplication()` (lines 926-988) - Merges trends across batches
- `postProcessConsolidation()` (lines 742-800) - Merges trends within batch
- `checkKeywordBasedMerge()` (lines 694-740) - Keyword matching
- `storeTrendInBigQuery()` (lines 163-231) - MERGE operation

**Deployment Script**:
- `/Users/fernandonikolic/perception/functions/deploy-ui-compatible-service.sh`

### Configuration

**Batch Size**: 400 articles per batch (line 542 in index.js)
- Change to 300 for safer processing (slower)
- Change to 500 for faster processing (risk of token limit errors)

**Similarity Threshold**: 50% (line 952 in index.js)
- Lower to 40% for more aggressive deduplication
- Raise to 60% for stricter matching

**OpenAI Model**: `gpt-4o-mini` (line 520 in index.js)
- Could upgrade to `gpt-4o` for better quality (higher cost)

---

## Deployment

### Deploy Backend Changes

```bash
cd /Users/fernandonikolic/perception/functions
bash deploy-ui-compatible-service.sh
```

**IMPORTANT**: Deploy from parent directory (`functions/`), NOT from inside `btc-trends-ui-deployment/`

### Verify Deployment

```bash
# Check version
curl https://btcpapifunction3-1-final-45998414364.us-central1.run.app/

# Trigger test extraction
curl -X POST "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract" -d '{}'

# Check logs
gcloud run services logs read btcpapifunction3-1-final --region=us-central1 --limit=20
```

---

## Monitoring

### Key Metrics

**Healthy System**:
- Articles analyzed: 2000 per run
- Batches: 5 per extraction
- Processing time: 4-5 minutes
- Trends discovered: 20-35 per run
- Sources per trend: 5-7 average
- Trends with 5+ sources: 40%+

**Alerts**:
- ⚠️ Articles analyzed < 1500 → Batching not working
- ⚠️ Avg sources < 4 → Check consolidation
- ⚠️ Processing time > 6 min → Performance issue
- 🚨 Articles analyzed < 1000 → Critical, redeploy immediately
- 🚨 Avg sources < 3 → Critical, check logs

### SQL Queries

**Trend distribution (last 24 hours)**:
```sql
SELECT article_count, COUNT(*) as trend_count
FROM `btcp_main_dataset.ai_trends_tracking`
WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR)
GROUP BY article_count
ORDER BY article_count DESC;
```

**Average sources per trend**:
```sql
SELECT AVG(article_count) as avg_sources
FROM `btcp_main_dataset.ai_trends_tracking`
WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR);
```

---

## Support

**For Questions**:
1. Check [TRENDS_SYSTEM_ARCHITECTURE.md](../../TRENDS_SYSTEM_ARCHITECTURE.md) troubleshooting
2. Review [CHANGELOG-TRENDS-V3.2.md](./CHANGELOG-TRENDS-V3.2.md) for recent changes
3. Check Cloud Run logs for errors
4. Verify batching is working (see "Common Issues" above)

**System Owner**: Fernando Nikolic
**GCP Project**: triple-upgrade-245423
**Production Service**: btcpapifunction3-1-final
**Region**: us-central1

---

**Last Updated**: November 22, 2025
