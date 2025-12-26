# Quick Brief Version History

Complete evolution of the Quick Brief generation system from v1 to v12.

## v12 - Semantic Article Sampling (PRODUCTION) ✅
**Date:** October 5, 2025
**Status:** Production-ready
**Rating:** 9.5/10

### Changes
- Replaced pattern-based extraction with semantic article sampling
- Reads 36 actual articles from 12 months (3 per month)
- Uses GPT-4o to extract narrative angles with full context
- Fixes fatal flaw: now correctly identifies "MicroStrategy of Asia" as oversaturated

### Technical Implementation
```typescript
// Step 1: Sample articles from BigQuery
fetchHistoricalSampleArticles(keyword)
  → Returns 36 articles (3 per month × 12 months)

// Step 2: Extract narrative angles from content
extractNarrativeAnglesFromArticles(articles, keyword)
  → Sends 4 batches of 10 articles to GPT-4o
  → Returns 31 narrative angles

// Step 3: Cluster and count
clusterAndCountAngles(angles, keyword)
  → Groups similar angles ("MicroStrategy of Asia" + "Asia's MicroStrategy")
  → Calculates percentage and saturation status
```

### Performance
- Generation time: 123.6s
- Tokens used: 167,028
- Cost: ~$0.17 per brief

### Critical Fix
**Problem in v11:** Pattern extraction pulled "first on cryptonews" (boilerplate matching "first" pattern)
**Fix in v12:** Reads actual article content, GPT-4o identifies HOW journalists frame the story

### Example Output
```
**EMERGING** (good opportunities):
• "Corporate Bitcoin Accumulation Strategy" (7 mentions, 22.58% of coverage)

**NOVEL** (claim immediately):
• "Bitcoin Treasury and Financial Strategy" (3 mentions, 9.68% of coverage)
```

---

## v11 - Pattern-Based Narrative Extraction
**Date:** October 5, 2025
**Status:** Deprecated
**Rating:** 7/10 (fatal flaw: still captured boilerplate)

### Changes
- Replaced generic n-gram extraction with 5 targeted regex patterns:
  1. Comparison frames: `"X of Y"`
  2. Possessive frames: `"Y's X"`
  3. Similarity frames: `"like/similar to X"`
  4. Positioning frames: `"first/leading/pioneering X"`
  5. Strategy frames: `"X strategy/model/approach"`

### Issues
- Still captured boilerplate like "first on cryptonews"
- Couldn't distinguish narrative framing from random pattern matches
- Fixed BigQuery regex issues (apostrophe escaping, single capture groups)

### Why It Failed
Patterns can't provide context. "First Japanese Bitcoin holder" (narrative angle) and "first on CryptoNews" (boilerplate) both match `"first X"` pattern.

---

## v10 - Historical Context Visible + Specific Recommendations
**Date:** October 5, 2025
**Status:** Deprecated
**Rating:** 9/10 (best until fatal flaw discovered)

### Changes
1. **Made historical context visible to users**
   - Added HISTORICAL CONTEXT section to brief output
   - Shows OVERSATURATED/MATURE/EMERGING/NOVEL with mention counts
   - User feedback: "If the system detected 'MicroStrategy Comparison' is oversaturated, the brief should tell the user"

2. **Required specific recommendations**
   - ✅ "Metaplanet's $1.4B Convertible Bond for Bitcoin"
   - ❌ "Pitch financial innovations" (too vague)
   - Added explicit examples in prompt

### Issues Fixed from v9
- v9 hid historical intelligence from users (7.5/10 rating)
- v9 recommendations were too generic

### Performance
- Generation time: 106.4s
- Tokens used: 165,916

---

## v9 - Historical Saturation Analysis (Hidden)
**Date:** October 5, 2025
**Status:** Deprecated
**Rating:** 7.5/10

### Changes
- Added 12-month BigQuery analysis to detect narrative saturation
- Fetched common phrases using n-gram extraction (2-5 word phrases)
- Clustered phrases with GPT-4o into themes
- Determined OVERSATURATED/MATURE/EMERGING/NOVEL status

### Critical User Feedback
**Issue #1:** Historical data not shown to user
> "If the system detected that 'MicroStrategy Comparison' is OVERSATURATED with 370+ mentions, the brief should tell the user this."

**Issue #2:** Recommendations too vague
> "PR pros can't pitch 'financial innovations' - they need a specific hook like 'Metaplanet's $1.4B Convertible Bond'."

**Issue #3:** Performance degraded
- v9: 106s vs v7: 35-68s baseline
- Solution: Pre-compute historical analysis nightly (not yet implemented)

### What It Got Right
- Historical analysis concept was correct
- Caching system worked (24-hour TTL)
- N-gram extraction identified common patterns

### What It Got Wrong
- Kept intelligence hidden from users
- Extracted random phrases instead of narrative angles
- Recommendations lacked specificity

---

## v8 - Fixed Media Categorization
**Date:** October 4, 2025
**Status:** Deprecated
**Rating:** 8/10

### Changes
- Fixed critical media categorization bug
- Separated `cryptoMedia` and `mainstreamMedia` in data structure
- Added comprehensive crypto outlet list (tier 1 + tier 2)

### User Feedback
> "The media categorization is fundamentally broken. Cointelegraph is crypto-native media, NOT mainstream. This destroys the intelligence value."

### Technical Fix
```typescript
// BEFORE (v7):
const outlets = rawData.outlets; // Mixed crypto and mainstream

// AFTER (v8):
const { cryptoMedia, mainstreamMedia } = categorizeOutlets(rawData.outlets);
// Crypto: CoinDesk, Cointelegraph, Bitcoin Magazine...
// Mainstream: WSJ, Bloomberg, Fortune...
```

### Why This Mattered
Mainstream coverage = breakthrough signal
Crypto coverage = expected, not newsworthy
Mixing them destroys intelligence value

---

## v7 - Post-Processing for Banned Phrases
**Date:** October 4, 2025
**Status:** Deprecated
**Rating:** 7/10

### Changes
- Implemented automatic post-processing to remove banned phrases
- Added retry mechanism (3 attempts before post-processing)
- Lowered temperature to 0.3

### Banned Phrases
- "Your move" → "Recommendation"
- "Your play" → "Recommendation"
- "Leverage this" → "Use this"
- "Capitalize on" → "Use"
- "Act decisively" → "Pitch within 2 weeks"
- "Act now" → "Take action"
- "Move quickly" → "Take action"
- "Before the narrative becomes saturated" → "Before broader media coverage"

### Why Post-Processing Was Needed
GPT-4o persistently used consultant clichés despite:
- Explicit prohibition in system prompt
- Examples of banned phrases
- Temperature reduction

Multi-layer approach:
1. System prompt (prevents most)
2. Retry 3x if banned phrases detected
3. Post-processing replacement (guaranteed clean output)

---

## v6 - Media Categorization
**Date:** October 4, 2025
**Status:** Deprecated
**Rating:** 6/10

### Changes
- Added crypto vs mainstream media separation
- Implemented outlet categorization logic

### Issues
- Incorrectly categorized Cointelegraph as mainstream (fixed in v8)

---

## v1-v5 - Initial Development
**Date:** September-October 2025
**Status:** Deprecated
**Rating:** 5/10

### Features Developed
- Basic BigQuery integration
- OpenAI GPT-4o integration
- Evidence-based analysis (article counting)
- Reporter identification
- Outlet tracking

### Issues
- No historical context
- Generic recommendations
- Media categorization not implemented
- Used banned consultant phrases

---

## Key Learnings

### 1. User Feedback is Critical
Every major improvement came from specific user feedback:
- "Cointelegraph is NOT mainstream" → v8 fix
- "Historical data not shown to user" → v10 fix
- "Recommendations too vague" → v10 fix
- "Pattern extraction pulls boilerplate" → v12 fix

### 2. Context Matters More Than Patterns
- v11 patterns: "first X" matched both narrative angles and boilerplate
- v12 semantic: Reads full article context to identify framing

### 3. Quality > Speed (Initially)
- Spent 120s to read actual articles and provide accurate intelligence
- Better than 35s generation recommending oversaturated angles
- Optimization via pre-computation can come later

### 4. Evidence-Based = Trust
Users trust briefs that cite specific articles:
- "45 of 56 articles (80%)" > "Most articles"
- "Articles #1, #3, #5" > "Many sources"
- "$1.4B Convertible Bond" > "Financial innovation"

### 5. Multi-Layer Defense for AI Output
Single constraints fail. Use layered approach:
- Layer 1: System prompt (prevents most issues)
- Layer 2: Retry mechanism (catches violations)
- Layer 3: Post-processing (guaranteed compliance)

---

## Version Comparison Table

| Version | Key Feature | Rating | Critical Issue | Status |
|---------|-------------|--------|----------------|--------|
| v1-v5 | Basic analysis | 5/10 | Generic output | Deprecated |
| v6 | Media categorization | 6/10 | Wrong categorization | Deprecated |
| v7 | Banned phrase removal | 7/10 | Still has categorization bug | Deprecated |
| v8 | Fixed categorization | 8/10 | No historical context | Deprecated |
| v9 | Historical analysis (hidden) | 7.5/10 | Hidden from users | Deprecated |
| v10 | Historical visible + specific | 9/10 | Boilerplate extraction | Deprecated |
| v11 | Pattern-based extraction | 7/10 | Still captures boilerplate | Deprecated |
| **v12** | **Semantic sampling** | **9.5/10** | **None critical** | **PRODUCTION** ✅ |

---

## Migration Path

### From v10/v11 to v12

No data migration needed. V12 is backward compatible:
- Same Firestore schema
- Same API interface
- Same brief output format
- Only change: Better historical analysis

### Deployment
```bash
# Test locally first
OPENAI_API_KEY="your-key" npx ts-node test-brief-v5.ts

# Deploy to production
firebase deploy --only functions:quickBriefGenerator
```

### Rollback Plan
If v12 has issues, revert to v10:
```bash
git checkout [v10-commit-hash] functions/src/quick-brief-generator.ts
firebase deploy --only functions:quickBriefGenerator
```

V10 was stable (9/10 rating) - only limitation was boilerplate in historical context, which users could ignore.
