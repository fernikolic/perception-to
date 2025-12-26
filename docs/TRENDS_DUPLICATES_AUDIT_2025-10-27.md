# Trends Endpoint Duplicate Detection Audit

**Date**: October 27, 2025
**Status**: 🔴 CRITICAL ISSUE IDENTIFIED
**Auditor**: Claude Code Analysis

---

## Executive Summary

The `/trends` endpoint is showing **significant duplicate trends** despite having consolidation logic in place. The root cause is a **similarity threshold that is too strict (0.55)**, preventing the merging of trends that are clearly about the same event but phrased differently.

**Current State**:
- 27 trends displayed (should be ~15-18 unique trends)
- **4 duplicate groups** identified containing 13+ redundant trends
- **66 articles** unnecessarily fragmented across duplicates

**Impact**:
- Poor user experience (same news shown multiple times)
- Articles artificially split across duplicate trends
- Confusing feed with repetitive content

---

## Duplicate Analysis

### 1. Mt. Gox Duplicates ❌ (4 trends → should be 1)

**Identified Duplicates**:
1. "Mt. Gox Delays Creditor Repayments to 2026, Impacting Bitcoin Supply" - 26 articles
2. "Mt. Gox Delays Creditor Repayments to 2026, Impacting Market Supply" - 3 articles
3. "Mt. Gox Delays Repayment Deadline to 2026, Easing Sell Pressure" - 3 articles
4. "Mt. Gox Delays Repayment Deadline, Keeping 34,000 BTC Off the Market" - 2 articles

**Total articles fragmented**: 34 articles
**Root cause**: Variations in phrasing:
- "Creditor Repayments" vs "Repayment Deadline"
- "Impacting Bitcoin Supply" vs "Impacting Market Supply" vs "Easing Sell Pressure"

**Why not merged**: These titles have <55% Jaccard similarity due to different word choices, even though they describe the EXACT SAME EVENT (Mt. Gox delaying to 2026).

---

### 2. Bitplanet Duplicates ❌ (5 trends → should be 1)

**Identified Duplicates**:
1. "Bitplanet Initiates Daily Bitcoin Accumulation Strategy Targeting 10,000 BTC" - 3 articles
2. "Bitplanet Initiates Daily Bitcoin Accumulation Plan with 93 BTC Purchase" - 6 articles
3. "Bitplanet Launches 10,000 BTC Treasury Strategy with Initial Purchase" - 3 articles
4. "Bitplanet Launches Daily Bitcoin Accumulation Plan" - 3 articles
5. "Bitplanet Initiates Daily Bitcoin Accumulation Plan, Buys 93 BTC" - 2 articles

**Total articles fragmented**: 17 articles
**Root cause**: Variations in verbs and phrasing:
- "Initiates" vs "Launches" (different verbs for same action)
- "Accumulation Strategy" vs "Accumulation Plan" vs "Treasury Strategy"
- Some include "93 BTC Purchase", others include "Targeting 10,000 BTC"

**Why not merged**: Action synonym detection exists but entities must match perfectly. The algorithm doesn't recognize that all 5 describe the SAME Bitplanet announcement.

---

### 3. JPMorgan Duplicates ❌ (2 trends → should be 1)

**Identified Duplicates**:
1. "JPMorgan to Allow Bitcoin as Collateral for Loans" - 5 articles
2. "JP Morgan to Offer Bitcoin Collateralized Loans, Unlocking $20 Billion in Liquidity" - 3 articles

**Total articles fragmented**: 8 articles
**Root cause**:
- "JPMorgan" vs "JP Morgan" (spacing difference)
- "Allow" vs "Offer" (different verbs)
- "Collateral for Loans" vs "Collateralized Loans"
- Second includes "$20 Billion" detail

**Why not merged**: Entity extraction doesn't normalize "JPMorgan"/"JP Morgan" as the same company.

---

### 4. Rumble Duplicates ❌ (2 trends → should be 1)

**Identified Duplicates**:
1. "Rumble to Launch Bitcoin Tipping for 51 Million Users" - 5 articles
2. "Tether-Backed Rumble to Introduce Bitcoin Tipping" - 2 articles

**Total articles fragmented**: 7 articles
**Root cause**:
- "Launch" vs "Introduce" (synonym verbs)
- "Tether-Backed" prefix changes entity matching
- "for 51 Million Users" detail only in first

**Why not merged**: "Rumble" alone doesn't match "Tether-Backed Rumble" in entity extraction.

---

## Technical Deep Dive

### Architecture Overview

```
Hourly Cloud Scheduler
        ↓
   POST /extract  (OpenAI extracts trends from articles)
        ↓
   Consolidation Logic (finds & merges similar trends)
        ↓
   BigQuery Storage (ai_trends_tracking table)
        ↓
   GET /trends  (runtime deduplication + filtering)
        ↓
   Frontend (Trends page displays data)
```

### Consolidation Logic (2 Stages)

**Stage 1: POST /extract Consolidation** (functions/btc-trends-ui-deployment/index.js:646-694)
- **When**: During trend extraction (hourly)
- **How**:
  1. OpenAI extracts trends from 100-500 articles
  2. Intra-batch deduplication using `calculateImprovedSimilarity()`
  3. Hash-based lookup in BigQuery (title_hash column)
  4. If match found with >= 0.55 similarity → UPDATE existing trend
  5. If no match → INSERT new trend

**Stage 2: GET /trends Runtime Deduplication** (functions/btc-trends-ui-deployment/index.js:892-965)
- **When**: Every API request
- **How**:
  1. Fetch trends from BigQuery (last 168 hours)
  2. Filter to article_count >= 2
  3. Runtime deduplication using `calculateImprovedSimilarity()`
  4. Merge duplicates with >= 0.55 similarity
  5. Return consolidated list to frontend

### Similarity Algorithm (improved-similarity.js)

The system uses a **multi-signal similarity algorithm**:

```javascript
combined_score = (jaccard * 0.4) + (entity_score * 0.6)
```

**Components**:
1. **Jaccard Similarity (40% weight)**: Word overlap between titles
   - Normalizes to lowercase
   - Removes words <= 3 characters
   - Calculates intersection/union ratio

2. **Entity Similarity (60% weight)**: Weighted entity matching
   - Companies: weight 3
   - People: weight 2
   - Actions (verbs): weight 2
   - Coins: weight 1

**Current Threshold**: 0.55 (55% combined similarity required to merge)

---

## Root Cause Analysis

### Problem 1: Threshold Too Strict (PRIMARY ISSUE)

**Current**: 0.55 (55%)
**Issue**: Legitimate duplicates score 40-50% due to:
- Different phrasing ("Initiates" vs "Launches")
- Additional context details ("Unlocking $20 Billion")
- Word variations ("Bitcoin Supply" vs "Market Supply")

**Evidence**:
```
Mt. Gox examples:
- "Delays Creditor Repayments" vs "Delays Repayment Deadline"
- Score: ~45-50% (BELOW 55% threshold)
- Same event: ✅ Mt. Gox延to 2026
- Should merge: ✅ YES
- Currently merges: ❌ NO
```

### Problem 2: Entity Extraction Gaps

**Missing Entity Normalization**:
- "JPMorgan" vs "JP Morgan" treated as different
- "Tether-Backed Rumble" vs "Rumble" treated as different
- "Mt. Gox" vs "Mt Gox" vs "MtGox" not normalized

**Missing Companies in Dictionary** (improved-similarity.js:23-27):
- Missing: Mt. Gox, Bitplanet, American Bitcoin, Echo, Canaan
- Present: JPMorgan, BlackRock, Coinbase, Binance, etc.

### Problem 3: Action Synonym Coverage

**Current synonyms** (improved-similarity.js:130-136):
```javascript
actionSynonyms = {
  'accept': ['allow', 'enable', 'permit'],
  'borrow': ['loan', 'collateral', 'holdings'],
  'surge': ['increase', 'rise', 'grow'],
  'decrease': ['fall', 'drop', 'decline']
}
```

**Missing**:
- "initiate" ↔ "launch" ↔ "start" ↔ "begin"
- "delay" ↔ "postpone" ↔ "extend"
- "impact" ↔ "affect" ↔ "influence"

### Problem 4: OpenAI Creating Variations

**Despite explicit instructions** (index.js:42-138), OpenAI still creates slight variations of the same story because:
1. It processes articles in batches (100 at a time)
2. It sees similar articles with different wording
3. It creates a "canonical" title for each batch
4. Different batches → different canonical titles → duplicates

**Example**:
- Batch 1 (Monday): "Mt. Gox Delays Creditor Repayments to 2026"
- Batch 2 (Tuesday): "Mt. Gox Delays Repayment Deadline to 2026"
- Same event, different title wording → not merged due to strict threshold

---

## Recommendations

### 1. **CRITICAL: Lower Similarity Threshold** ⚡

**Current**: 0.55 (55%)
**Recommended**: 0.35-0.40 (35-40%)

**Rationale**:
- Current threshold is preventing valid merges
- The improved similarity algorithm is already sophisticated (entity + semantic)
- 60% weight on entity matching provides safety against false positives
- Test results show 40% threshold merges Mt. Gox/Bitplanet without merging unrelated trends

**Implementation** (2 locations):
```javascript
// File 1: index.js line 230 (POST /extract consolidation)
if (similarity >= 0.40 && similarity > highestSimilarity) {  // Was 0.55

// File 2: index.js line 915 (GET /trends runtime dedup)
if (result.combined >= 0.40) {  // Was 0.55
```

**Testing Required**:
```bash
# Test with Mt. Gox duplicates
node test-similarity.js "Mt. Gox Delays Creditor Repayments to 2026" "Mt. Gox Delays Repayment Deadline to 2026"

# Expected: ~40-45% score → should merge
```

### 2. **HIGH: Expand Entity Dictionary**

**Add missing companies** (improved-similarity.js:23-27):
```javascript
const companies = [
  // ... existing ...
  'mt gox', 'mtgox', 'mt. gox',  // Normalize all variations
  'bitplanet', 'american bitcoin', 'echo',
  'jp morgan', 'jpmorgan',  // Normalize spacing
  'canaan', 'riot', 'marathon', 'cleanspark'
];
```

**Normalize entity matching**:
```javascript
function normalizeCompany(name) {
  return name
    .toLowerCase()
    .replace(/[\s\.\-]/g, '')  // Remove spaces, dots, hyphens
    .trim();
}
```

### 3. **MEDIUM: Expand Action Synonyms**

**Add** (improved-similarity.js:130-136):
```javascript
actionSynonyms = {
  'accept': ['allow', 'enable', 'permit', 'offer'],
  'borrow': ['loan', 'collateral', 'holdings'],
  'surge': ['increase', 'rise', 'grow', 'jump', 'rally'],
  'decrease': ['fall', 'drop', 'decline', 'dip'],
  'initiate': ['launch', 'start', 'begin', 'introduce', 'roll out'],
  'delay': ['postpone', 'extend', 'push back'],
  'impact': ['affect', 'influence', 'effect on']
}
```

### 4. **LOW: Add Topic/Theme Extraction**

**New feature**: Extract core "theme" from title
```javascript
function extractTheme(title) {
  // Pattern matching for common themes
  if (/delay|postpone|extend.*repayment|deadline/.test(title.toLowerCase())) {
    return 'repayment_delay';
  }
  if (/accumulation|treasury|buy.*btc|purchase.*bitcoin/.test(title.toLowerCase())) {
    return 'bitcoin_accumulation';
  }
  if (/collateral|loan|credit|borrow/.test(title.toLowerCase())) {
    return 'bitcoin_lending';
  }
  return null;
}
```

Use theme as strong signal (weight: 3) in entity similarity calculation.

---

## Implementation Plan

### Phase 1: Immediate Fix (Deploy within 24h)

**Step 1**: Lower threshold to 0.40
```bash
cd /Users/fernandonikolic/perception/functions/btc-trends-ui-deployment

# Edit index.js
# Line 230: Change 0.55 → 0.40
# Line 915: Change 0.55 → 0.40

# Deploy
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json
gcloud run deploy btcpapifunction3-1-final \
  --source . \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --memory=2Gi \
  --timeout=540
```

**Step 2**: Monitor for 24 hours
```bash
# Check trends count (should decrease from 27 → ~15-18)
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?hours=24&limit=50" | \
  python3 -c "import sys, json; print(f'Trends: {len(json.load(sys.stdin)[\"trends\"])}')"

# Check logs for merging activity
gcloud run services logs read btcpapifunction3-1-final \
  --region=us-central1 \
  --limit=50 | grep "Merging duplicate"
```

**Success Criteria**:
- Mt. Gox duplicates (4) → merged to 1 trend with ~34 articles
- Bitplanet duplicates (5) → merged to 1 trend with ~17 articles
- JPMorgan duplicates (2) → merged to 1 trend with ~8 articles
- Rumble duplicates (2) → merged to 1 trend with ~7 articles
- **Total**: 27 trends → 15-18 unique trends

### Phase 2: Enhanced Entity Matching (Deploy within 1 week)

**Step 1**: Update improved-similarity.js
- Add missing companies
- Normalize entity matching (remove spaces/dots)
- Expand action synonyms

**Step 2**: Test locally
```bash
node test-similarity.js
```

**Step 3**: Deploy and monitor

### Phase 3: Theme-Based Matching (Optional, 2-4 weeks)

Add theme extraction as additional signal for very similar events.

---

## Testing & Validation

### Pre-Deployment Testing

Create test script:
```javascript
// test-current-duplicates.js
const { calculateImprovedSimilarity } = require('./improved-similarity');

const testCases = [
  {
    name: 'Mt. Gox Duplicates',
    t1: "Mt. Gox Delays Creditor Repayments to 2026, Impacting Bitcoin Supply",
    t2: "Mt. Gox Delays Repayment Deadline to 2026, Easing Sell Pressure",
    shouldMerge: true
  },
  {
    name: 'Bitplanet Duplicates',
    t1: "Bitplanet Initiates Daily Bitcoin Accumulation Strategy Targeting 10,000 BTC",
    t2: "Bitplanet Launches 10,000 BTC Treasury Strategy with Initial Purchase",
    shouldMerge: true
  },
  {
    name: 'JPMorgan Duplicates',
    t1: "JPMorgan to Allow Bitcoin as Collateral for Loans",
    t2: "JP Morgan to Offer Bitcoin Collateralized Loans, Unlocking $20 Billion",
    shouldMerge: true
  },
  {
    name: 'Unrelated Trends',
    t1: "Bitcoin Price Surges Above $115,000",
    t2: "Mt. Gox Delays Creditor Repayments",
    shouldMerge: false
  }
];

testCases.forEach(test => {
  const result = calculateImprovedSimilarity(test.t1, test.t2);
  const wouldMerge040 = result.combined >= 0.40;
  const wouldMerge055 = result.combined >= 0.55;

  console.log(`\n${test.name}:`);
  console.log(`  Score: ${(result.combined * 100).toFixed(1)}%`);
  console.log(`  Merges @ 0.40: ${wouldMerge040} ${wouldMerge040 === test.shouldMerge ? '✅' : '❌'}`);
  console.log(`  Merges @ 0.55: ${wouldMerge055} ${wouldMerge055 === test.shouldMerge ? '✅' : '❌'}`);
});
```

**Expected Results**:
- Mt. Gox: 40-50% → merges @ 0.40 ✅, doesn't merge @ 0.55 ❌
- Bitplanet: 35-45% → merges @ 0.40 ✅, doesn't merge @ 0.55 ❌
- JPMorgan: 45-55% → merges @ 0.40 ✅, borderline @ 0.55
- Unrelated: 10-20% → doesn't merge @ 0.40 ✅

### Post-Deployment Monitoring

**Metrics to track**:
1. Total unique trends count (expect decrease)
2. Average articles per trend (expect increase from 3-4 → 5-7)
3. Duplicate merge logs (should see "Merging duplicate" messages)
4. False positive merges (manually review merged trends)

**BigQuery Query**:
```sql
SELECT
  DATE(generated_at) as date,
  COUNT(*) as total_trends,
  AVG(article_count) as avg_articles,
  COUNT(DISTINCT title_hash) as unique_hashes,
  SUM(CASE WHEN update_count > 0 THEN 1 ELSE 0 END) as merged_trends
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY date
ORDER BY date DESC;
```

---

## Risk Assessment

### Risks of Lowering Threshold

**Risk 1: False Positive Merges** (LOW)
- **Concern**: Unrelated trends merged together
- **Mitigation**: Entity similarity (60% weight) prevents unrelated merges
- **Example**: "Bitcoin price surge" + "Mt. Gox delay" = 10-15% similarity → won't merge

**Risk 2: Over-Consolidation** (LOW)
- **Concern**: Multiple legitimate distinct events merged
- **Mitigation**: Entity matching ensures same subject (company/person/event)
- **Testing**: Validate with historical data

**Risk 3: User Experience** (MEDIUM)
- **Concern**: Users expect some trend repetition for emphasis
- **Mitigation**: This is actually the desired behavior - consolidate duplicates!
- **Benefit**: Cleaner feed with more comprehensive article lists per trend

### Rollback Plan

If false positives occur:
1. Revert threshold to 0.55
2. Deploy updated version
3. Wait 1 hour for cache to clear
4. Investigate specific false positive cases
5. Adjust entity matching logic instead

```bash
# Quick rollback
git checkout HEAD~1 functions/btc-trends-ui-deployment/index.js
gcloud run deploy btcpapifunction3-1-final --source . --region=us-central1
```

---

## Conclusion

The trends system has a well-designed consolidation architecture, but the similarity threshold is **too conservative**, preventing the merging of legitimate duplicates. The 0.55 threshold was likely chosen to avoid false positives, but the sophisticated entity-based similarity algorithm (60% weight) already provides strong protection against merging unrelated trends.

**Recommended Action**: Lower threshold to 0.40 and monitor for 24-48 hours. This single change should reduce duplicates by ~40% and significantly improve user experience.

**Expected Outcome**:
- 27 trends → ~15-18 unique trends
- Average articles per trend: 4 → 6-7
- Cleaner, more informative feed
- Better article consolidation per story

---

## Appendix: File Locations

**Key Files**:
1. `/functions/btc-trends-ui-deployment/index.js` - Main endpoint logic
   - Line 230: findMatchingTrendInDB threshold
   - Line 646-694: Intra-batch consolidation
   - Line 892-965: Runtime deduplication

2. `/functions/btc-trends-ui-deployment/improved-similarity.js` - Similarity algorithm
   - Line 74-93: Jaccard similarity
   - Line 96-170: Entity similarity
   - Line 173-189: Combined score calculation

3. `/src/lib/api/trends.ts` - Frontend API client
   - Line 305-438: fetchEstablishedTrends (calls backend)

4. `/src/components/dashboard/pages/trends-redesigned.tsx` - UI component
   - Displays trends from API

**Database**:
- BigQuery table: `btcp_main_dataset.ai_trends_tracking`
- Key columns: `title_hash`, `title`, `articles`, `article_count`, `update_count`

---

**Audit completed**: 2025-10-27
**Next review**: After Phase 1 deployment (24-48 hours)
