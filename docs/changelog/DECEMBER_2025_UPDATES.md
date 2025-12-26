# December 2025 Updates & Bug Fixes

## Date: December 2, 2025

---

## 🚀 Major Feature: Embeddings-Based Trend Deduplication (v4.0)

### Issue Summary

**Problem:** Users were seeing duplicate trends on the /trends page that should have been merged. The keyword-based matching system couldn't detect semantic similarity.

**Impact:**
- Poor UX for paying users
- Loss of credibility
- Confusing, repetitive feed
- Wasted database storage

**Example Duplicates Seen:**

**China Crypto Ban** - 6 separate trends for the same story:
```
- "China Declares Bitcoin Has No Legal Status, Orders Crackdown"
- "China Doubles Down on Crypto Ban After Detecting New Trading Activity"
- "China Doubles Down on Crypto Ban, PBOC Issues Warning on Stablecoins"
- "China Reaffirms Ban on Cryptocurrency Amid Renewed Speculation"
- "China Reinforces Crypto Ban Amid New Trading Activity"
```

**Europol Cryptomixer** - 2 separate trends for the same story:
```
- "Europol Dismantles Major Bitcoin Laundering Operation, Seizing €25M"
- "Europol Shuts Down $1.4B Bitcoin-Mixing Service Cryptomixer"
```

### Root Cause Analysis

The previous V3.0 system used hardcoded entity extraction:

```javascript
// Old approach - hardcoded entities
const companies = ['visa', 'stripe', 'microstrategy', ...];
const people = ['saylor', 'musk', ...];
```

**Why it failed:**
1. **Missing entities**: "China", "PBOC", "Europol", "Cryptomixer" weren't in the hardcoded list
2. **Action synonyms missed**: "bans" vs "crackdown" vs "reinforces" treated as different
3. **Inflexible**: Any new entity required code changes

**Test Results (Before Fix):**
```
China Declares... vs China Doubles Down... = 6.7% similarity ❌
Europol Dismantles... vs Europol Shuts Down... = 8.3% similarity ❌
```

The 55% threshold was never reached because the algorithm couldn't recognize semantic similarity.

### Solution Implemented

**Files Modified:**
- `functions/btc-trends-ui-deployment/index.js`

#### Key Changes:

**1. Added Cosine Similarity Function**
```javascript
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (normA * normB);
}
```

**2. Added Embeddings Generation**
```javascript
async function generateTitleEmbeddings(trends) {
  const openai = getOpenAIClient();
  const titles = trends.map(t => t.title || '');
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",  // 1536 dimensions
    input: batch,
  });
  return response.data.map(d => d.embedding);
}
```

**3. Added Embeddings-Based Deduplication**
```javascript
async function deduplicateTrendsWithEmbeddings(trends, similarityThreshold = 0.65) {
  // Generate embeddings for all trend titles
  const embeddings = await generateTitleEmbeddings(trends);

  // Calculate pairwise similarity
  for (let i = 0; i < trends.length; i++) {
    for (let j = i + 1; j < trends.length; j++) {
      const similarity = cosineSimilarity(embeddings[i], embeddings[j]);
      if (similarity >= similarityThreshold) {
        // Merge trends
        mergedTrend.articles = mergeArticles(trend1.articles, trend2.articles);
      }
    }
  }
  return deduplicatedTrends;
}
```

**4. Modified /trends Endpoint**
```javascript
// OLD: Used keyword-based matching
const deduplicatedTrends = deduplicateTrendsWithKeywords(allTrends, 0.55);

// NEW: Uses embeddings-based matching with fallback
const deduplicatedTrends = await deduplicateTrendsWithEmbeddings(allTrends, 0.65);
```

### Similarity Threshold Selection

**Tested on actual duplicates:**

| Comparison | Similarity | Merge? |
|------------|------------|--------|
| "China Doubles Down..." vs "China Reinforces..." | 85.4% | ✅ |
| "China Reaffirms..." vs "China Reinforces..." | 77.6% | ✅ |
| "China Doubles Down..." vs "China Reaffirms..." | 70.7% | ✅ |
| "Europol Dismantles..." vs "Europol Shuts Down..." | 69.7% | ✅ |
| "China Declares..." vs "China Reaffirms..." | 65.3% | ✅ |

**Selected Threshold: 0.65 (65%)**
- Catches most semantic duplicates
- Low enough to merge related stories
- High enough to avoid false positives

### How It Works Now

```
Architecture:
┌─────────────────────────────────────────────────────────────┐
│                    /trends Endpoint                          │
│                                                              │
│  1. Fetch trends from BigQuery (last 30 days)               │
│  2. Generate embeddings for ALL trend titles                │
│     └─ OpenAI text-embedding-3-small (1536 dimensions)      │
│  3. Calculate cosine similarity between ALL pairs           │
│  4. Merge trends with similarity >= 65%                     │
│     └─ Combine articles (dedupe by URL)                     │
│     └─ Keep earliest first_seen timestamp                   │
│  5. Return deduplicated trends                              │
└─────────────────────────────────────────────────────────────┘
```

### Results

**Before Fix:**
- 6 China crypto ban trends
- 2 Europol trends
- Total: 8 duplicate trends

**After Fix:**
- 1 China trend: "China Reaffirms Ban on Cryptocurrency Amid Renewed Speculation" (21 articles merged)
- 1 Europol trend: "Europol Shuts Down $1.4B Bitcoin-Mixing Service Cryptomixer" (5 articles merged)
- Total: 2 unique trends

### Cost Analysis

**Embeddings cost:** ~$0.02 per 1 million tokens

For typical /trends request:
- ~100 trends × ~10 tokens/title = ~1,000 tokens
- Cost: ~$0.00002 per request
- Monthly (10K requests): ~$0.20

**Negligible compared to GPT-4o-mini extraction costs (~$120/month)**

### Fallback Behavior

If embeddings API fails:
1. Error is logged
2. Falls back to keyword-based `deduplicateTrendsWithKeywords()`
3. Uses original entity extraction + 55% threshold

This ensures the endpoint never fails completely.

### Deployment

**Service:** `btcpapifunction3-1-final`
**Region:** `us-central1`
**Deployed:** December 2, 2025

**Deployment Command:**
```bash
cd /Users/fernandonikolic/perception/functions
./deploy-ui-compatible-service.sh
```

**Verification:**
```bash
# Test endpoint
curl -s "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?hours=48" | jq '. | length'
```

### Monitoring

**Check Embeddings Deduplication in Logs:**
```
🔍 Starting EMBEDDINGS-BASED deduplication with 150 trends...
✅ Generated 150 embeddings for trend titles
🔗 MERGE (85.4% similar):
   "China Doubles Down on Crypto Ban..."
   "China Reinforces Crypto Ban..."
✅ Embeddings deduplication: 150 → 98 trends
```

**Check for Fallback:**
```
⚠️ Embeddings not available, falling back to keyword-based deduplication
```

**BigQuery - Verify No Duplicates:**
```sql
SELECT
  title,
  COUNT(*) as duplicate_count
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR)
GROUP BY title
HAVING duplicate_count > 1
ORDER BY duplicate_count DESC;
```

Expected: 0 results

### Impact

**Before Fix:**
- Users seeing 6+ duplicates for same story
- Poor UX and credibility
- Confusing feed

**After Fix:**
- Semantic duplicates automatically merged
- Clean, deduplicated trend feed
- Future-proof (no hardcoding required)
- Works for any entity, action, or topic

### Configuration

**Tunable Parameters in** `functions/btc-trends-ui-deployment/index.js`:

| Parameter | Value | Description |
|-----------|-------|-------------|
| `similarityThreshold` | 0.65 | Embeddings similarity threshold |
| Embedding model | text-embedding-3-small | Cost-effective, fast |
| Batch size | 100 | Titles per embedding request |

**Adjusting Threshold:**

If too many false merges (different stories merged):
```javascript
const deduplicatedTrends = await deduplicateTrendsWithEmbeddings(allTrends, 0.70);
```

If too many duplicates still showing:
```javascript
const deduplicatedTrends = await deduplicateTrendsWithEmbeddings(allTrends, 0.60);
```

### Version Comparison

| Version | Approach | Threshold | Catches "China Ban"? | Catches "Europol"? |
|---------|----------|-----------|---------------------|-------------------|
| V2.0 | Jaccard word overlap | 55% | ❌ 6.7% | ❌ 8.3% |
| V3.0 | Entity extraction | 55% | ❌ Entities missing | ❌ Entities missing |
| **V4.0** | **Embeddings** | **65%** | **✅ 65-85%** | **✅ 70%** |

### Related Documentation

- **Detailed Documentation:** [docs/trends/TRENDS_EMBEDDINGS_DEDUPLICATION_DEC_2025.md](../trends/TRENDS_EMBEDDINGS_DEDUPLICATION_DEC_2025.md)
- **Trends System Overview:** [docs/trends/README.md](../trends/README.md)
- **Database Schema:** [data/schemas/ai_trends_tracking_schema.md](../../data/schemas/ai_trends_tracking_schema.md)
- **Previous Deduplication V3:** [docs/trends/TRENDS_DEDUPLICATION_V3_UPDATE_LOGIC.md](../trends/TRENDS_DEDUPLICATION_V3_UPDATE_LOGIC.md)

---

## Summary

**Fixed:** Duplicate trends appearing on /trends page due to keyword-based matching limitations
**Impact:** Users now see clean, deduplicated trend feed
**Method:** OpenAI embeddings-based semantic similarity (65% threshold)
**Status:** ✅ Deployed and verified in production

---

## 🚀 Performance Fix: Frontend Trends Caching Optimization

### Issue Summary

**Problem:** The "Trends" page and "Trending Signals" section on the homepage were loading slowly, making unnecessary API calls on every navigation.

**Symptoms:**
- Visible delay (2-3 seconds) when switching to Trends page
- Console showing `[useCachedTrends] Fetching trends directly from API for real-time data` on every page load
- Slow homepage load when visiting "Trending Signals" section

### Root Cause

The React Query caching configuration in `use-cached-trends.ts` was too aggressive:

```javascript
// OLD - PROBLEMATIC CONFIGURATION
staleTime: 1 * 60 * 1000,      // Only 1 minute before refetch
refetchOnWindowFocus: true,    // Refetch when switching browser tabs
refetchOnMount: true,          // Refetch on EVERY component mount/navigation
```

This caused:
1. API calls every time user navigated to trends page
2. API calls when switching browser tabs/windows
3. No benefit from caching since data was always "stale" after 1 minute

### Solution

Updated caching settings in `src/hooks/use-cached-trends.ts`:

| Hook | Before | After |
|------|--------|-------|
| `useCachedTrends` | 1 min stale, refetchOnFocus=true | 5 min stale, refetchOnFocus=false |
| `useCachedCategories` | 5 min stale, refetchOnFocus=true | 10 min stale, refetchOnFocus=false |
| `useCachedSignals` | 1 min stale, refetchOnFocus=true | 5 min stale, refetchOnFocus=false |

**New Configuration:**

```javascript
// useCachedTrends
staleTime: 5 * 60 * 1000,      // 5 minutes (trends update every few hours)
gcTime: 30 * 60 * 1000,        // Keep in cache 30 minutes
refetchOnWindowFocus: false,   // Don't refetch on tab switch
refetchOnMount: false,         // Use cached data if available

// useCachedCategories
staleTime: 10 * 60 * 1000,     // 10 minutes (categories rarely change)
gcTime: 60 * 60 * 1000,        // Keep in cache 1 hour

// useCachedSignals
staleTime: 5 * 60 * 1000,      // 5 minutes
gcTime: 30 * 60 * 1000,        // 30 minutes
```

### Impact

**Before Fix:**
- Every navigation to trends page = 2-3 second API call
- Every tab switch = unnecessary API call
- Poor UX with visible loading states

**After Fix:**
- Instant page loads using cached data
- API calls only when data is genuinely stale (> 5 minutes)
- No refetching on tab switches
- Trends data is fresh enough (updates every few hours anyway)

### Files Changed

- `src/hooks/use-cached-trends.ts` - Updated staleTime, gcTime, and refetch settings

### Deployment

```bash
# Build
npm run build

# Deploy to Cloudflare Pages
mv functions functions_backup
npx wrangler pages deploy dist --project-name=perception-app --commit-dirty=true
mv functions_backup functions
```

**Deployed:** December 2, 2025
**URL:** https://app.perception.to

### Verification

1. Navigate to Trends page - should load instantly from cache
2. Switch to Home, then back to Trends - should load instantly
3. Wait 5+ minutes, then navigate to Trends - should make fresh API call
4. Check console for `[useCachedTrends] Fetching trends from API` - should only appear once per 5 minutes

---

## 🚀 Backend Performance Fix: Server-Side Trends Caching

### Issue Summary

**Problem:** Even with frontend React Query caching, the initial API call to `/trends` was taking **5-8 seconds** because it runs OpenAI embeddings-based deduplication on every request.

**Root Cause:** The `/trends` endpoint calls `deduplicateTrendsWithEmbeddings()` which:
1. Fetches ~150 trends from BigQuery
2. Generates embeddings for ALL trend titles using OpenAI text-embedding-3-small
3. Calculates cosine similarity between ALL pairs
4. Merges duplicates

This OpenAI API call takes 3-5 seconds, making every request slow.

### Solution

Added **server-side in-memory caching** in `functions/btc-trends-ui-deployment/index.js`:

```javascript
// Cache configuration
const trendsCache = {
  data: null,
  timestamp: null,
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes

  get() {
    if (!this.data || !this.timestamp) return null;
    if (Date.now() - this.timestamp > this.CACHE_TTL) return null;
    return this.data;
  },

  set(data) {
    this.data = data;
    this.timestamp = Date.now();
  },

  invalidate() {
    this.data = null;
    this.timestamp = null;
  }
};
```

**Changes to /trends endpoint:**
1. Check cache first for default requests (no date filters)
2. Return cached data if available (<5 minutes old)
3. Store processed trends in cache after embeddings deduplication
4. Invalidate cache when /extract adds new trends

### Performance Results

| Request | Before | After | Improvement |
|---------|--------|-------|-------------|
| First (cold) | 8s | 8s | Same (cache warm-up) |
| Second+ (cached) | 8s | 0.7s | **11x faster** |

**Test Results:**
```
First request (cache warm-up): 7.9s
Second request (cached): 0.68s
Third request (cached): 0.69s
Fourth request (cached): 0.69s
```

### Files Changed

- `functions/btc-trends-ui-deployment/index.js` - Added trendsCache object and cache logic

### Cache Behavior

- **Default requests** (no date/startDate/endDate): Use cache
- **Date-filtered requests**: Always fetch fresh data
- **`?no_cache=true`**: Bypass cache for testing
- **After /extract**: Cache is invalidated so next request gets new trends

### Deployment

```bash
cd /Users/fernandonikolic/perception/functions
./deploy-ui-compatible-service.sh
```

**Deployed:** December 2, 2025
**Service:** btcpapifunction3-1-final (revision 00181-gcm)

---

## 🚀 Real-time Watchlist Alerts System

### Feature Summary

**Added:** Real-time email alerts for watchlist keywords when high-impact, breaking, or time-sensitive articles are detected.

### Components

**Cloud Functions:**
- `realtimeWatchlistAlerts` - Scheduled every 30 minutes to check for new articles
- `triggerRealtimeAlertsManual` - Manual trigger for testing

**Files:**
- `functions/src/realtime-watchlist-alerts.ts` - Main function logic
- `functions/src/utils/realtime-alert-email.ts` - Professional email template

### Email Design

- Professional, clean aesthetic (no emojis)
- Muted color palette (grays, blacks, whites)
- Fast-scanning layout for busy executives

**Subject Line Format:**
```
[Urgency Label] Keyword: Article Headline...
```

**Urgency Types:**
- `Breaking News` - Breaking developments
- `Regulatory Update` - Regulatory announcements
- `Major Coverage` - Coverage from major outlets
- `High Impact` - High-impact market news

### Rate Limiting

- Max 5 alerts per day per user
- 2-hour gap between alerts for the same keyword
- State stored in `users/{uid}/realtimeAlertState`

### Admin Dashboard

Added new admin page at `/admin/watchlist-alerts` with tabs for:
- User Overview (email preferences by user)
- Real-time Alerts history
- Weekly Reports history

**File:** `src/components/admin/pages/watchlist-alerts-admin.tsx`

### Deployment Configuration

**Required Secret:** `BREVO_API_KEY` must be configured in the function definition:

```typescript
export const realtimeWatchlistAlerts = onSchedule(
  {
    schedule: 'every 30 minutes',
    region: 'us-central1',
    secrets: ['BREVO_API_KEY'],  // Required for email delivery
  },
  // ...
);
```

### Deployment

```bash
firebase deploy --only functions:realtimeWatchlistAlerts
```

**Deployed:** December 2, 2025
**Status:** Production

### Documentation

- [EMAIL_DESIGN_SYSTEM.md](../email/EMAIL_DESIGN_SYSTEM.md) - Complete email design documentation

---

---

## 🐛 Bug Fix: Slack Notifications Random Disconnection

### Date: December 12, 2025

### Issue Summary

**Problem:** Users reported their Slack integrations randomly becoming disconnected without any user action.

**Impact:**
- Users stopped receiving Slack trend notifications
- Required manual reconnection through settings
- Loss of trust in the notification system

### Root Cause Analysis

A **race condition** was identified in the OAuth flow:

1. OAuth callback (`slack-oauth.ts`) writes webhook URL to Firestore
2. OAuth callback redirects to `/app/settings/notifications?slack=success`
3. Frontend `loadSettings()` runs and loads data from Firestore
4. **Problem**: If Firestore returns cached/stale data (before OAuth write completes), the form loads with empty `slackWebhookUrl`
5. If user then saves ANY setting (timezone, weekly report, etc.), the form overwrites Firestore with the stale empty values - **disconnecting Slack**

Additionally:
- The `?slack=success` query param was **never handled** in the frontend
- No success toast was shown after OAuth completion
- No forced refresh of Slack state from Firestore

### Solution Implemented

**Files Modified:**
- `src/components/dashboard/pages/settings/notifications.tsx`

#### Key Changes:

**1. Added OAuth Success Handler**
```typescript
// Handle Slack OAuth success - force fresh read from Firestore
const slackSuccess = searchParams.get('slack');
if (slackSuccess === 'success') {
  toast.success('Slack connected successfully! You will now receive trend notifications.');
  searchParams.delete('slack');
  setSearchParams(searchParams);
}
```

**2. Protected Slack Data on Save**
```typescript
// Get current Slack config to prevent accidental overwrites
const currentSlackWebhookUrl = userDoc.data()?.persona?.communicationPreferences?.slackWebhookUrl;
const currentSlackEnabled = userDoc.data()?.persona?.communicationPreferences?.slackEnabled;

// Only update Slack fields if they've actually changed (prevents race condition)
const slackWebhookToSave = data.slackWebhookUrl || currentSlackWebhookUrl || '';
const slackEnabledToSave = data.slackWebhookUrl ? data.slackEnabled :
  (currentSlackWebhookUrl ? currentSlackEnabled : false);
```

### Impact

**Before Fix:**
- OAuth could complete successfully but user would see disconnected state
- Saving any other setting could accidentally disconnect Slack
- No feedback when OAuth completes

**After Fix:**
- Success toast confirms Slack connection
- Existing Slack config is preserved when saving other settings
- Race condition eliminated

### Deployment

```bash
npm run build
cd dist && npx wrangler pages deploy . --project-name=perception-app
```

**Deployed:** December 12, 2025
**URL:** https://app.perception.to

---

## 🐛 Bug Fix: Email Notifications for Watchlist Keywords Not Working

### Date: December 12, 2025

### Issue Summary

**Problem:** Users were not receiving email alerts for their watchlist keywords despite having alerts enabled.

**Impact:**
- Watchlist alerts silently failing
- Users missing critical mentions spikes and anomalies
- Real-time alerts completely non-functional

### Root Cause Analysis

**Two critical bugs were identified:**

#### Bug 1: Missing `secrets` Configuration

The `processWatchlistAlerts` function was missing the `secrets` configuration:

```typescript
// BEFORE (broken)
export const processWatchlistAlerts = onSchedule(
  {
    schedule: 'every 15 minutes',
    timeZone: 'UTC',
    region: 'us-central1',
    memory: '512MiB',
    timeoutSeconds: 540,
    // ❌ MISSING: secrets: ['BREVO_API_KEY']
  },
```

Without `secrets: ['BREVO_API_KEY']`, the `process.env.BREVO_API_KEY` was `undefined` at runtime, causing all email sends to fail silently.

#### Bug 2: No UI for Email Frequency Setting

The `realtime-watchlist-alerts.ts` function checks:
```typescript
function hasRealtimeEnabled(userData): boolean {
  return userData.persona?.communicationPreferences?.emailFrequency === 'realtime_weekly';
}
```

But the notifications form **never wrote `emailFrequency`** to Firestore! The form schema only had:
- `slackEnabled`
- `slackWebhookUrl`

There was no toggle for `emailFrequency: 'realtime_weekly'` in the settings UI.

### Solution Implemented

**Files Modified:**
- `functions/src/watchlist-alerts.ts`
- `src/components/dashboard/pages/settings/notifications.tsx`

#### Key Changes:

**1. Added Missing Secrets Config**
```typescript
export const processWatchlistAlerts = onSchedule(
  {
    schedule: 'every 15 minutes',
    timeZone: 'UTC',
    region: 'us-central1',
    memory: '512MiB',
    timeoutSeconds: 540,
    secrets: ['BREVO_API_KEY'],  // ✅ Added
  },
```

**2. Added Email Frequency to Form Schema**
```typescript
const notificationsFormSchema = z.object({
  // ... existing fields
  emailFrequency: z.enum(['off', 'weekly', 'realtime_weekly']).default('weekly'),
});
```

**3. Added Email Frequency UI Control**
```typescript
<FormField
  control={form.control}
  name="emailFrequency"
  render={({ field }) => (
    <FormItem className="rounded-lg border p-4 bg-white dark:bg-background">
      <FormLabel className="text-base">Watchlist Alert Emails</FormLabel>
      <FormDescription>
        Choose how often you want to receive email alerts about your watchlist items
        when there are anomalies, mention spikes, or negative coverage.
      </FormDescription>
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectContent>
          <SelectItem value="off">Off - No alert emails</SelectItem>
          <SelectItem value="weekly">Weekly Only - Summary reports only</SelectItem>
          <SelectItem value="realtime_weekly">
            Real-time + Weekly - Instant alerts for breaking news, spikes, and anomalies
          </SelectItem>
        </SelectContent>
      </Select>
    </FormItem>
  )}
/>
```

**4. Added `emailFrequency` to Firestore Save**
```typescript
await updateDoc(userRef, {
  // ... other fields
  'persona.communicationPreferences.emailFrequency': data.emailFrequency,
});
```

**5. Added Email Frequency Check to Watchlist Alerts**
```typescript
// Skip if user has explicitly turned off email alerts
const emailFrequency = userData.persona?.communicationPreferences?.emailFrequency;
if (emailFrequency === 'off') continue;
```

### Verification

Confirmed `BREVO_API_KEY` secret is now attached to the function:
```bash
gcloud run services describe processwatchlistalerts --region=us-central1 --project=perception-app-3db34
# Shows: BREVO_API_KEY valueFrom secretKeyRef
```

### Impact

**Before Fix:**
- `process.env.BREVO_API_KEY` was undefined → all emails failed
- No UI to enable real-time alerts → feature was inaccessible
- Users couldn't opt out of alert emails

**After Fix:**
- Brevo API key properly injected → emails can be sent
- New "Watchlist Alert Emails" dropdown in Settings
- Users can choose: Off, Weekly Only, or Real-time + Weekly
- Users who disable alerts are properly skipped

### Email Frequency Options

| Option | Description |
|--------|-------------|
| **Off** | No alert emails (only manual reports in dashboard) |
| **Weekly Only** | Weekly summary reports only (default) |
| **Real-time + Weekly** | Instant alerts for breaking news, spikes, anomalies + weekly reports |

### Deployment

```bash
# Deploy Cloud Functions
firebase deploy --only functions:processWatchlistAlerts

# Deploy Frontend
npm run build && cd dist && npx wrangler pages deploy . --project-name=perception-app
```

**Deployed:** December 12, 2025
- **Function Revision:** `processwatchlistalerts-00008-qak`
- **Frontend:** https://app.perception.to

---

---

## 📊 Data Backfill: Bitcoin News Archive (2011-2024)

### Date: December 12, 2025

### Summary

**Added:** 3,337 historical Bitcoin news articles from the Bitcoin News Archive, significantly expanding the dataset's historical coverage back to 2011.

### Data Source

The [Bitcoin News Archive](https://www.kaggle.com/datasets/nishantbhardwaj12345/bitcoin-news-archive) is a comprehensive collection of Bitcoin-related news articles from major outlets dating back to 2011.

### Process

1. **Downloaded archive** from Kaggle (3,337 URLs)
2. **Filtered existing URLs** already in BigQuery
3. **Enriched articles** with:
   - OpenAI sentiment analysis
   - Topic extraction (up to 4 topics per article)
   - Author name extraction (where available)
   - Outlet category classification
4. **Uploaded to BigQuery** `all_channels_data` table

### Scripts Created

| Script | Purpose |
|--------|---------|
| `scripts/research/daily-news-batch.cjs` | Reusable batch enrichment script for future backfills |
| `scripts/backfill/enrich-archive-articles.cjs` | Archive-specific enrichment (one-time use) |
| `scripts/backfill/upload-archive-to-bigquery.cjs` | Upload enriched data to BigQuery |

### Results

| Metric | Value |
|--------|-------|
| **Total articles added** | 3,337 |
| **Date range** | 2011-06-14 to 2024 |
| **Articles pre-2016** | 179 (earliest Bitcoin coverage) |
| **Sentiment coverage** | 100% |
| **Author coverage** | ~53% |
| **Topic coverage** | ~34% |

### Historical Coverage by Year

| Year | Articles |
|------|----------|
| 2011 | 6 |
| 2012 | 5 |
| 2013 | 62 |
| 2014 | 58 |
| 2015 | 48 |
| 2016 | 2 |
| 2017 | 128 |

### Sample Historical Articles

- "WikiLeaks Asks For Anonymous Bitcoin Donations" (Forbes, 2011-06-14)
- "George Clooney roils the Bitcoin market" (Financial Times, 2011-06-21)
- "Bitcoins: What are they, and how do they work?" (The Guardian, 2011-06-22)
- "The Crypto-Currency" (The New Yorker, 2011-10-03)

### BigQuery Verification

```sql
SELECT
  COUNT(*) as total_rows,
  COUNTIF(Date < '2016-01-01') as historical_2009_2015,
  COUNTIF(author_name IS NOT NULL AND author_name != '') as with_author,
  COUNTIF(Sentiment IS NOT NULL) as with_sentiment
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
```

**Result:** 574,367 total rows (up from ~571,000 before backfill)

### Files

**Kept:**
- `data/research/bitcoin-news-archive.csv` - Master archive file (keep for reference)
- `scripts/research/daily-news-batch.cjs` - Reusable for future backfills

**Cleaned up:**
- `data/research/new-articles-for-enrichment.csv` - Removed
- `data/research/enriched-archive-articles.csv` - Removed
- `data/research/archive-enrichment-progress.json` - Removed
- `data/research/archive-for-bq-upload.csv` - Removed

---

**Version:** 4.0.3
**Status:** Production
**Deployed:** December 12, 2025
**Verified:** December 12, 2025
**Author:** Engineering Team + Claude Code

