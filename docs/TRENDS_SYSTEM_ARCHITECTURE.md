# Bitcoin Trends Extraction & Consolidation System

**Last Updated:** 2025-11-27
**Status:** Production
**Version:** 3.4 (Immutable Trend Timestamps)

## Overview

This system extracts Bitcoin-related trends from articles in BigQuery using **context-aware AI** that understands existing trends and adds new articles to them over time, rather than creating duplicates. Trends are served to the frontend via a caching layer with a 7-day lookback window.

---

## Architecture

```
┌─────────────────┐
│  BigQuery       │
│  all_channels   │ ← Articles from IFTTT/Sheets pipeline
│  (560K+ rows)   │
└────────┬────────┘
         │
         │ 1. Hourly Scheduler triggers
         ▼
┌──────────────────────────────────────────────────┐
│  Cloud Run: btcpapifunction3-1-final             │
│  /extract endpoint (Batched Analysis v3.2)       │
│                                                  │
│  ├─ Fetches existing trends (last 7 days)       │
│  ├─ Fetches last 2000 articles from BigQuery    │
│  ├─ Splits into 5 batches (400 articles each)   │
│  │                                               │
│  │  ┌─── Batch 1 (articles 1-400) ────┐         │
│  │  │ Sends to OpenAI with context    │         │
│  │  │ → 4-8 trends returned           │         │
│  │  └────────────────────────────────┘          │
│  │  ┌─── Batch 2 (articles 401-800) ──┐         │
│  │  │ Sends to OpenAI with context    │         │
│  │  │ → 4-8 trends returned           │         │
│  │  └────────────────────────────────┘          │
│  │  ... (Batches 3-5) ...                       │
│  │                                               │
│  ├─ Cross-batch deduplication                   │
│  │  → Merges same trends from different batches │
│  │  → 50% similarity + keyword matching         │
│  ├─ MERGE/UPDATE into ai_trends_tracking        │
│  └─ Returns new + updated trends                │
└──────────────────┬───────────────────────────────┘
                   │
                   │ 2. Stores consolidated trends
                   ▼
┌─────────────────────────────────────────────┐
│  BigQuery: ai_trends_tracking               │
│  (Deduplicated trends with articles)        │
└──────────────────┬──────────────────────────┘
                   │
                   │ 3. Frontend requests /trends
                   ▼
┌─────────────────────────────────────────────┐
│  Cloud Run: /trends endpoint                │
│  Returns UI-compatible trend format         │
└──────────────────┬──────────────────────────┘
                   │
                   │ 4. Caching layer
                   ▼
┌─────────────────────────────────────────────┐
│  Firestore: cached_trends                   │
│  TTL: 5 minutes (auto-refresh)              │
└──────────────────┬──────────────────────────┘
                   │
                   │ 5. Frontend displays
                   ▼
┌─────────────────────────────────────────────┐
│  Next.js Frontend (Cloudflare Pages)        │
│  Shows consolidated trends to users         │
└─────────────────────────────────────────────┘
```

---

## Data Quality Validation System (v3.3)

**Added:** 2025-11-24
**Location:** `btc-trends-ui-deployment/index.js:694-815`

To ensure only high-quality trends are stored and presented to users, we've implemented a multi-layer validation system that prevents common data quality issues.

### Validation Layers

#### 1. Required Fields Validation (Line 694-713)
**Prevents:** "Untitled Trend" issues, empty/malformed trends from OpenAI

Every trend from OpenAI must have:
- **Valid title:** Not empty, not "Untitled Trend", minimum length
- **Meaningful summary:** Minimum 20 characters
- **Key highlights:** Non-empty array with at least 1 highlight
- **Categories:** Non-empty array with at least 1 category

Trends missing any required field are **rejected entirely** and logged for debugging.

```javascript
// Example rejection log:
❌ REJECTED malformed trend #3 "": Missing or invalid title
❌ REJECTED malformed trend #5 "Bitcoin Update": Missing or too-short summary (8 chars)
```

#### 2. Article Relevance Validation (Line 1120-1184)
**Prevents:** Irrelevant articles being grouped with trends (e.g., Cathie Wood articles in Robert Kiyosaki trend)

Each article in a trend is validated against the trend title using:
- **Entity matching:** Must share at least 1 key entity (company, person, concept)
- **Keyword overlap:** Must share at least 2 key words from trend title

Articles that don't match are **removed** from the trend before storage.

```javascript
// Example validation log:
⚠️ VALIDATION: Trend "Robert Kiyosaki Sells Bitcoin" rejected 4/5 irrelevant articles:
   ❌ "Cathie Wood's Ark Invest Snaps Up More..." - No entity/word overlap
   ❌ "JPMorgan warns Strategy could face billions..." - No entity/word overlap
```

**Location of validation calls:**
- Line 804: Validates ALL new trends after deduplication
- Line 747: Validates updated trends when adding new articles

#### 3. Minimum Source Requirement (Line 807-816)
**Prevents:** Single-source "trends" that aren't actually trends

After validation, trends with fewer than 2 unique, relevant articles are **filtered out**.

```javascript
// Example filtering log:
❌ Filtered out single-source trend: "Robert Kiyosaki Sells Bitcoin" (1 article)
```

### Updated OpenAI Prompt (Line 618, 631-634)

The prompt now explicitly warns against grouping irrelevant articles:

```
7. CRITICAL: ONLY include articles that DIRECTLY relate to the trend title.
   If an article doesn't mention the key entities (companies, people, events)
   in the trend title, DO NOT include it!

❌ NEVER DO THIS (Critical Quality Issue):
   - Trend: "Robert Kiyosaki Sells Bitcoin" with articles about: Cathie Wood's Ark Invest,
     JPMorgan warnings, Coinbase derivatives, Bitcoin price → WRONG!
   - ONLY the article about Robert Kiyosaki should be included.
     The other articles are COMPLETELY UNRELATED.
   - If only 1 article matches the trend title, SKIP THE TREND ENTIRELY!
```

### Impact on Data Quality

With these validations in place:
- ✅ **No more "Untitled Trend" entries** - malformed trends are rejected
- ✅ **No more mismatched sources** - irrelevant articles are removed
- ✅ **Better trend accuracy** - only properly-sourced trends are stored
- ✅ **Detailed logging** - rejected trends and articles are logged for debugging

---

## Trend Timestamp System (v3.4)

**Added:** 2025-11-27
**Location:** `btc-trends-ui-deployment/index.js:185-222, 250-320`

### Problem Solved

Previously, old trends would resurface to the top of the UI when new articles were added because `generated_at` was updated on every MERGE operation. This caused UX issues where users would see "stale" trends appearing as "fresh."

### Solution: Immutable `first_seen` Timestamp

The system now uses two timestamps:

| Field | Purpose | When Set | Mutable? |
|-------|---------|----------|----------|
| `first_seen` | Original trend creation time | Only on INSERT | **No** (immutable) |
| `generated_at` | Also set to creation time | Only on INSERT | **No** (immutable) |
| `last_updated` | Last time articles were added | On UPDATE | Yes |

### MERGE Operation Behavior

```sql
-- On INSERT (new trend)
first_seen = CURRENT_TIMESTAMP()
generated_at = CURRENT_TIMESTAMP()
update_count = 1

-- On UPDATE (adding articles to existing trend)
first_seen = unchanged (immutable)
generated_at = unchanged (immutable)
last_updated = CURRENT_TIMESTAMP()
update_count = update_count + 1
```

### Frontend Sorting

The frontend now sorts by `first_seen` (falling back to `generated_at` for backward compatibility):

```javascript
// Backend returns generated_at with the first_seen value
generated_at: { value: row.first_seen || row.generated_at }
```

This ensures:
- **New trends** appear at the top based on when they first emerged
- **Updated trends** stay in their original position (don't resurface)
- **Old data** (before v3.4) uses `generated_at` as fallback

### Additional Fields

The API now also returns:
- `first_seen`: Original creation timestamp (if available)
- `last_updated`: When articles were last added (if trend was updated)
- `update_count`: How many times the trend has been updated

### TypeScript Interface

```typescript
export interface TrendCluster {
  // ... existing fields ...
  generated_at: { value: string };
  first_seen?: { value: string } | null;
  last_updated?: { value: string } | null;
  update_count?: number;
}
```

---

## Data Retention & Lookback Windows

### Frontend `/trends` Endpoint
- **Default Lookback:** 168 hours (7 days)
- **Query:** `WHERE COALESCE(first_seen, generated_at) >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 168 HOUR)`
- **Sorting:** `ORDER BY COALESCE(first_seen, generated_at) DESC` (newest first by original creation time)
- **Can filter by:**
  - `?date=2025-11-21` → Trends from specific date only
  - `?startDate=2025-11-15` → Trends from specific start date forward
- **Location:** btc-trends-ui-deployment/index.js:250-320

### Context for OpenAI (`/extract` endpoint)
- **Lookback:** Last 24 hours of trends (top 20)
- **Purpose:** Provide existing trend context so OpenAI can add to them
- **Query:** Same 168-hour window, but only sends top 20 most recent to OpenAI
- **Location:** btc-trends-ui-deployment/index.js:440, 544

### BigQuery Storage
- **Retention:** Indefinite (no automatic cleanup)
- **Table:** `btcp_main_dataset.ai_trends_tracking`
- **Growth:** ~15-25 new/updated trends per hour = ~360-600 per day

---

## File Organization

### Production Deployment Files

**Location:** `/Users/fernandonikolic/perception/functions/btc-trends-ui-deployment/`

**CRITICAL:** This is the ONLY directory deployed to Cloud Run. Changes to other files won't affect production.

| File | Purpose | When to Edit |
|------|---------|--------------|
| `index.js` | Main Cloud Run service with all endpoints | When changing API logic, consolidation rules, or OpenAI prompts |
| `package.json` | Dependencies for production | When adding/removing npm packages |

**Key Functions in index.js:**
- `app.post('/extract')` - Lines 380-870: Trend extraction with batching and OpenAI
- `buildImprovedPrompt()` - Lines 20-90: OpenAI system prompt (controls trend quality)
- `postProcessConsolidation()` - Lines 742-800: Merges similar trends within extraction batch
- `crossBatchDeduplication()` - Lines 926-988: Merges similar trends across different batches
- `checkKeywordBasedMerge()` - Lines 694-740: Keyword matching for duplicates
- `storeTrendInBigQuery()` - Lines 163-231: MERGE operation to prevent duplicates

### Development/Testing Files

**Location:** `/Users/fernandonikolic/perception/functions/`

| File | Purpose | Status |
|------|---------|--------|
| `btc-trends-ui-compatible.js` | OLD development file | ⚠️ NOT DEPLOYED - For reference only |
| `consolidate-all-trends.js` | One-time consolidation script | ✅ Run manually when needed |
| `clear-cache-now.js` | Clears Firestore cache | ✅ Run manually to force UI refresh |

**IMPORTANT:** Editing `btc-trends-ui-compatible.js` has NO effect on production!

### Frontend Files

**Location:** `/Users/fernandonikolic/perception/src/lib/services/`

| File | Purpose | Cache TTL |
|------|---------|-----------|
| `trends-cache.ts` | Frontend caching service | 5 minutes |
| `api/trends.ts` | API client for fetching trends | N/A |

---

## Key Configuration

### 1. Trend Extraction Targets

**File:** `btc-trends-ui-deployment/index.js`

```javascript
// Lines 68-75: System prompt configuration
For ${articleCount} articles, identify 20-35 highly specific trends using these CRITICAL GROUPING RULES:

GROUPING STRICTNESS:
- MINIMUM 2 sources per trend, but they must be about the EXACT SAME story
- TARGET: Extract 20-35 highly specific, focused trends to give comprehensive market coverage
```

**To Change:** Edit lines 68-90 in `btc-trends-ui-deployment/index.js`

### 2. OpenAI Configuration

**File:** `btc-trends-ui-deployment/index.js`

```javascript
// Lines 517-526: OpenAI API call
model: "gpt-4o-mini",
temperature: 0.5,  // Higher = more creative/comprehensive
max_tokens: 8000,  // Supports 20-35 trends
```

**To Change:** Edit lines 517-526 in `btc-trends-ui-deployment/index.js`

### 3. Batching Configuration

**File:** `btc-trends-ui-deployment/index.js`

```javascript
// Lines 542-551: Batch processing setup
const BATCH_SIZE = 400;  // Safe limit per OpenAI call (~100k tokens)
const batchCount = Math.ceil(articlesData.length / BATCH_SIZE);

// With 2000 articles: 5 batches of 400 articles each
// Processing time: ~4.5 minutes (1.5 min per batch * 3 batches on average)
```

**To Change:**
- Increase `BATCH_SIZE` to 500 for faster processing (risk: token limit errors)
- Decrease `BATCH_SIZE` to 300 for safer processing (slower, more API calls)
- **Recommended:** Keep at 400 for optimal balance

### 4. Consolidation Rules

**File:** `btc-trends-ui-deployment/index.js`

```javascript
// Lines 700-710: Keyword groups for matching
const keywordGroups = [
  ['hashprice'],
  ['warren davidson', 'bitcoin for america act'],
  ['ray dalio', 'bridgewater'],
  // Add new keyword groups here
];

// Lines 718-726: Similarity threshold (within batch)
if (similarity >= 0.5 || shouldMergeByKeywords) {
  // Merge trends
}

// Lines 926-988: Cross-batch deduplication (same threshold)
// Merges trends discovered in different batches
// Uses identical similarity logic (50% + keyword matching)
```

**To Add New Consolidation Rule:**
1. Edit `keywordGroups` array in lines 700-710
2. Add keywords that identify the same story
3. Re-deploy to Cloud Run

### 5. Frontend Cache TTL

**File:** `src/lib/services/trends-cache.ts`

```typescript
// Line 68: Cache freshness
private readonly CACHE_FRESHNESS_HOURS = 5 / 60; // 5 minutes
```

**To Change:** Edit line 68, rebuild and deploy frontend

---

## Deployment Process

### Deploy Backend Changes

```bash
cd /Users/fernandonikolic/perception/functions/btc-trends-ui-deployment

# Deploy to Cloud Run
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
gcloud run deploy btcpapifunction3-1-final \
  --source . \
  --region=us-central1 \
  --project triple-upgrade-245423
```

**Triggers automatic deployment:**
- New Docker container built via Buildpacks
- Service updated with new code
- Next /extract call will use new logic

### Deploy Frontend Changes

```bash
cd /Users/fernandonikolic/perception

# Build and deploy to Cloudflare Pages
npm run build
# (Follow your normal frontend deployment process)
```

---

## Operational Procedures

### 1. Manual Trend Extraction

Trigger the hourly extraction immediately:

```bash
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
gcloud scheduler jobs run trends-hourly-update \
  --location=us-central1 \
  --project triple-upgrade-245423
```

### 2. Clear Frontend Cache

Force frontend to fetch fresh data:

```bash
cd /Users/fernandonikolic/perception/functions
node clear-cache-now.js
```

**Note:** May fail with permission errors. If so, cache will auto-expire in 5 minutes anyway.

### 3. Consolidate Existing Duplicates

**When to Run:** When you notice duplicate trends in the UI and the streaming buffer has cleared (typically 2-24 hours after last extraction).

```bash
cd /Users/fernandonikolic/perception/functions
node consolidate-all-trends.js
```

**What it does:**
1. Loads all trends from today
2. Identifies duplicates using keyword matching
3. Merges articles from duplicate trends
4. Updates BigQuery with consolidated trends
5. Example: 43 trends → 24 consolidated trends

**Streaming Buffer Issue:**
- BigQuery won't allow DELETE/UPDATE on recently inserted rows
- If script fails with "streaming buffer" error, wait a few hours and retry
- The script is idempotent - safe to run multiple times

### 4. Check Trend Count & Distribution

```bash
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
bq query --use_legacy_sql=false --project_id=triple-upgrade-245423 "
  SELECT article_count, COUNT(*) as trend_count
  FROM \`btcp_main_dataset.ai_trends_tracking\`
  WHERE DATE(generated_at) = CURRENT_DATE()
  GROUP BY article_count
  ORDER BY article_count DESC
"
```

**Healthy Distribution (v3.2 with batching):**
- 5+ sources: 30-50% of trends (comprehensive coverage)
- 3-4 sources: 30-40% of trends (well-supported)
- 2 sources: 10-20% of trends (confirmed)
- 1 source: <10% of trends (emerging signals only)

**Unhealthy Distribution:**
- 1 source > 20% = Batching not working, check deployment
- Total trends < 20 = Extraction target too low or articles missing
- Total trends > 50 = Too many duplicates, check cross-batch deduplication

### 4a. Monitor Batch Processing Performance

```bash
# Check extraction logs for batch metrics
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
gcloud logging read "resource.type=cloud_run_revision \
  AND resource.labels.service_name=btcpapifunction3-1-final" \
  --limit 50 \
  --project triple-upgrade-245423 \
  --freshness=30m | grep -E "Batch|batches|articles"
```

**Expected Log Output:**
```
📊 Batching 2000 articles into 5 batch(es) of ~400 each
⏱️  This will take ~4.5 minutes (comprehensive analysis of ALL articles)
🔄 Batch 1/5: Processing articles 1-400 (400 articles)...
✅ Batch 1/5 complete: 6 new, 2 updated
...
📊 Total trends before cross-batch deduplication: 35
📊 Total trends after cross-batch deduplication: 28
```

### 5. View Recent Extraction Logs

```bash
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
gcloud logging read "resource.type=cloud_run_revision \
  AND resource.labels.service_name=btcpapifunction3-1-final" \
  --limit 200 \
  --project triple-upgrade-245423 \
  --freshness=30m | grep -E "Successfully|Consolidated|MERGED"
```

---

## Troubleshooting

### Problem: Frontend shows stale trends (> 1 hour old)

**Diagnosis:**
```bash
# Check when trends were last generated
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
bq query --use_legacy_sql=false --project_id=triple-upgrade-245423 "
  SELECT MAX(generated_at) as last_update
  FROM \`btcp_main_dataset.ai_trends_tracking\`
"
```

**Solutions:**
1. Manually trigger extraction: `gcloud scheduler jobs run trends-hourly-update ...`
2. Check scheduler status: `gcloud scheduler jobs describe trends-hourly-update ...`
3. Clear frontend cache: `node clear-cache-now.js`

### Problem: Too many duplicate trends

**Diagnosis:**
```bash
# Find duplicates by keyword
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
bq query --use_legacy_sql=false --project_id=triple-upgrade-245423 "
  SELECT title, article_count
  FROM \`btcp_main_dataset.ai_trends_tracking\`
  WHERE DATE(generated_at) = CURRENT_DATE()
    AND (LOWER(title) LIKE '%hashprice%'
         OR LOWER(title) LIKE '%warren davidson%')
  ORDER BY title
"
```

**Solutions:**
1. Run consolidation script: `node consolidate-all-trends.js`
2. If streaming buffer error, wait 2-4 hours and retry
3. Update keyword groups in `index.js` lines 700-710 for future prevention

### Problem: Only 4-8 trends generated (target is 20-35)

**Diagnosis:**
- Check OpenAI logs for response length
- Verify prompt says "20-35 trends" not "3-8 trends"
- Check if batching is working (should process 2000 articles, not 500)

**Solutions:**
1. Check `index.js` line 509 - should say "Extract 20-35 SPECIFIC trends"
2. Check `index.js` line 523 - temperature should be 0.5+
3. Check `index.js` line 524 - max_tokens should be 8000+
4. Verify batching: Check logs for "Batching 2000 articles into 5 batch(es)"
5. If only processing 500 articles, redeploy with batching code
6. Re-deploy if any values are wrong

### Problem: Batching not working (only 500 articles processed)

**Diagnosis:**
```bash
# Check recent extraction response
curl -X POST "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract" \
  -H "Content-Type: application/json" -d '{}'
```

Look for `"analysisArticleCount": 500` (OLD) vs `2000` (NEW with batching)

**Solutions:**
1. Verify you deployed from the correct directory:
   ```bash
   cd /Users/fernandonikolic/perception/functions
   bash deploy-ui-compatible-service.sh
   ```
2. Check Cloud Run logs for "Batching" messages
3. If missing, code wasn't deployed - redeploy from parent directory
4. Verify deployment package includes index.js with batching code (lines 542-988)

### Problem: Cross-batch duplicates appearing

**Diagnosis:**
- Same trend appearing multiple times with slightly different titles
- Check if `crossBatchDeduplication()` function is working

**Solutions:**
1. Check logs for "Cross-batch deduplication: X → Y trends" messages
2. Verify lines 822-844 in index.js call `crossBatchDeduplication()`
3. Check similarity threshold is 50% (line 952 in index.js)
4. If duplicates persist, lower threshold to 0.4 for more aggressive merging
5. Re-deploy after changes

### Problem: "0 new articles" in logs but BigQuery has new data

**Diagnosis:**
- Timezone confusion (timestamps labeled UTC but actually PST)
- Timestamp filtering preventing article processing

**Solution:**
- The timestamp filtering is now bypassed (lines 403-443 in `index.js` are commented out)
- If issue recurs, verify lines 403-443 are still commented

---

## Monitoring & Alerts

### Key Metrics to Track

1. **Trend Count:** Should be 20-35 per extraction
2. **Multi-Source Trends:** Should be >80% with 2+ sources
3. **Extraction Frequency:** Should run every hour
4. **Cache Freshness:** Should be < 5 minutes old

### Scheduler Job

**Name:** `trends-hourly-update`
**Schedule:** Every hour at :00
**URL:** `https://btcpapifunction3-1-final-bybdtt43xa-uc.a.run.app/extract`
**Method:** POST

**Check status:**
```bash
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
gcloud scheduler jobs describe trends-hourly-update \
  --location=us-central1 \
  --project triple-upgrade-245423
```

---

## Development Workflow

### Making Changes to Trend Extraction

1. **Edit the correct file:** `btc-trends-ui-deployment/index.js` (NOT `btc-trends-ui-compatible.js`)

2. **Test locally if needed:**
   ```bash
   cd /Users/fernandonikolic/perception/functions/btc-trends-ui-deployment
   npm start  # Runs on localhost:8080
   ```

3. **Deploy to Cloud Run:**
   ```bash
   GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
   gcloud run deploy btcpapifunction3-1-final --source . --region=us-central1 --project triple-upgrade-245423
   ```

4. **Verify deployment:**
   - Check Cloud Run console for new revision
   - Manually trigger extraction to test
   - Check logs for errors

5. **Monitor results:**
   - Wait 5-10 minutes for extraction to complete
   - Query BigQuery for trend count
   - Check frontend UI for updated trends

### Adding New Consolidation Keywords

**Example:** Add consolidation for "Satoshi Nakamoto" stories

1. **Edit** `btc-trends-ui-deployment/index.js` lines 700-710:
   ```javascript
   const keywordGroups = [
     ['hashprice'],
     ['warren davidson', 'bitcoin for america act'],
     ['satoshi', 'nakamoto'],  // NEW: Add this line
     // ... rest of groups
   ];
   ```

2. **Deploy** (see "Making Changes" above)

3. **Test:**
   - Trigger extraction
   - Check if "Satoshi Nakamoto" trends are consolidated

4. **Also update** `consolidate-all-trends.js` with same keywords (lines 8-18)

---

## Emergency Procedures

### System is down / No trends showing

1. Check Cloud Run service status
2. Check BigQuery for data
3. Check scheduler job history
4. Review Cloud Run logs for errors
5. If critical, manually trigger extraction and clear cache

### Duplicate trends flooding the UI

1. Don't panic - this doesn't affect data collection
2. Run `consolidate-all-trends.js` if streaming buffer allows
3. If blocked, wait for next hourly extraction (new logic prevents duplicates)
4. Update frontend to filter out duplicates temporarily if needed

### OpenAI API costs spiking

1. Check extraction frequency - should be hourly only
2. Check `max_tokens` setting - should be 8000 not higher
3. Check if multiple extractions running concurrently
4. Reduce `temperature` slightly if getting too many trends

---

## Future Improvements

### Implemented (v3.1 - 2025-11-21)

1. ✅ **Context-Aware Updates:** OpenAI now receives existing trends and adds new articles to them instead of creating duplicates
2. ✅ **Real-time consolidation:** Extraction checks existing trends and updates them in real-time (not post-processing)
3. ✅ **Trend continuity:** Same trend grows over time (5 → 25 → 48 articles) instead of fragmenting

### Recommended Future Enhancements

1. **Better duplicate prevention:** Use semantic similarity (embeddings) instead of just keywords for even more accurate matching

2. **Automated cleanup:** Schedule daily job to run `consolidate-all-trends.js` during low-traffic hours to catch any edge cases

3. **Monitoring dashboard:** Track trend count, distribution, update vs new ratio, and extraction success rate over time

4. **A/B testing:** Test different prompts/temperatures to optimize trend quality

5. **Trend lifecycle management:** Auto-archive trends older than 30 days to keep the active set manageable

---

## Contact & Support

**System Owner:** Fernando Nikolic
**GCP Project:** triple-upgrade-245423
**Service Account:** bitcoin-data-chat-key.json
**Production Service:** btcpapifunction3-1-final (Cloud Run)

**For Issues:**
1. Check this documentation first
2. Review Cloud Run logs
3. Check BigQuery data
4. If still stuck, refer to conversation history for context

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-11-27 | 3.4 | **Immutable Trend Timestamps (UX Fix)**<br>- Added `first_seen` immutable timestamp for original trend creation<br>- `generated_at` no longer updates when articles are added<br>- `last_updated` tracks when articles were last added<br>- `update_count` tracks how many times trend was updated<br>- Frontend sorting now uses `first_seen` to prevent old trends resurfacing<br>- Backfilled all 212 existing trends with `first_seen = generated_at`<br>- Updated TypeScript interface with new fields<br>- **Result:** Trends stay in chronological order based on when they first emerged |
| 2025-11-22 | 3.2 | **MAJOR: Batched Analysis for Comprehensive Coverage**<br>- Processes ALL 2000 articles per run (was 500)<br>- 5 batches of 400 articles each (~4.5 min total)<br>- Cross-batch deduplication to merge trends across batches<br>- 75% more trends discovered (4→7 in testing)<br>- 40% more sources per trend (5→7 in testing)<br>- New `crossBatchDeduplication()` function (lines 926-988)<br>- Updated response metadata with batch statistics<br>- Prompt version: 3.1_context_aware_batched<br>- **Result:** Comprehensive trend coverage with many sources (5-10+) |
| 2025-11-21 | 3.1 | **MAJOR: Context-Aware Updates**<br>- OpenAI now receives existing trends as context<br>- Adds new articles to existing trends (not duplicates)<br>- Trends accumulate articles over time<br>- Updated JSON format with trend_id for updates<br>- Separate tracking of new vs updated trends<br>- Enforced minimum 2 sources per trend (no single-source)<br>- Target adjusted to 15-25 high-quality trends<br>- Fixed consolidate-all-trends.js to use CURRENT_DATE() |
| 2025-11-20 | 3.0 | - Aggressive consolidation with keyword matching<br>- MERGE-based storage to prevent duplicates<br>- 50% similarity threshold<br>- Parameterized queries for SQL injection safety<br>- Frontend cache TTL reduced to 5 minutes<br>- Target: 20-35 trends with 2+ sources each |
| 2025-11-19 | 2.0 | - Basic consolidation logic<br>- Cloud Run deployment<br>- Hourly scheduler |
| 2025-11-18 | 1.0 | - Initial OpenAI integration<br>- Basic trend extraction |
