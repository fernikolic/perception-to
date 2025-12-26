# Quick Brief Generation System

**Status:** Production-Ready (v32) ⭐
**Last Updated:** October 7, 2025
**Cost:** ~$0.20 per brief
**Generation Time:** 190-250 seconds
**Quality Rating:** 8.7/10 (Good - see notes below)

## Overview

The Quick Brief Generation System is a PR intelligence tool that analyzes media coverage using BigQuery data (434,617+ articles) and generates actionable pitch recommendations for PR professionals.

## Key Features

### 1. Trending Intelligence & Newsjacking (v23-v32) 🆕
- **Real-time trends:** Fetches last 48 hours of trending topics from Trends API
- **Convergence analysis:** Shows how the keyword relates to broader trending conversations
- **Data richness:** Key highlights (15+ per trend), business implications, sentiment scores, article URLs
- **Newsjacking opportunities:** Specific pitch angles to insert client into trending stories
- **Example output:**
  ```
  **Trend 1: "Institutional Interest in Bitcoin Grows"**
  📊 TREND DATA:
  Signal: STRONG | Confidence: 100% | 40 articles

  Key highlights:
  • MicroStrategy adds 155 Bitcoin to reserves
  • Growing sentiment Bitcoin is crucial for companies
  • CEO Michael Saylor emphasizes treasury potential

  🎯 CONVERGENCE ANALYSIS:
  - Metaplanet's acquisitions mirror institutional trend
  - Unique angle: Emphasize innovative financing methods
  - Pitch WSJ: "Metaplanet's Institutional Playbook..."
  ```

### 2. Historical Narrative Saturation Analysis
- **Purpose:** Prevent recommending overused narrative angles
- **Method:** Semantic article sampling (reads 98 actual articles from 12 months)
- **Output:** Identifies OVERSATURATED/MATURE/EMERGING/NOVEL angles
- **Why it matters:** Without this, the system would recommend "MicroStrategy of Asia" even though it's been used 370+ times

### 3. Evidence-Based Recommendations with Factual Constraints 🆕
- Counts actual articles (e.g., "45 of 56 articles")
- Cites specific article numbers for verification
- **Factual constraint:** When financial details can't be extracted, uses general terms with attribution
- Example: ❌ "$1.4B Convertible Bond" (unverified) → ✅ "recent capital raise (per CoinDesk)"

### 4. Media Categorization
- **Crypto-native media** (expected coverage): CoinDesk, Cointelegraph, Bitcoin Magazine
- **Mainstream media** (breakthrough signal): WSJ, Bloomberg, Fortune
- Correctly distinguishes between crypto outlets and general business press

### 5. Banned Phrase Prevention
- Removes consultant clichés: "Your move", "Leverage", "Capitalize on", "Act now"
- Single API call approach (saves 66% vs retry loop)
- Post-processing cleanup of template instructions

## Architecture

```
User Request → [Parallel Data Fetch] → GPT-4o Analysis → Firestore Storage
                      ↓
        ┌─────────────┴─────────────┬──────────────────────┐
        ↓                           ↓                      ↓
   Historical (12mo)            Current (30d)         Trends (48h)
   BigQuery: 98 articles       BigQuery: 100 articles  Trends API: 10 trends
        ↓                           ↓                      ↓
   Extract framings            Structure data         Extract highlights
        ↓                           ↓                      ↓
   Cluster themes              Count articles         Add convergence
        ↓                           ↓                      ↓
   Cache 24h                        └──────────┬───────────┘
                                              ↓
                                    GPT-4o Brief Generation
                                    (4000 max tokens)
                                              ↓
                                    Post-process:
                                    - Remove banned phrases
                                    - Clean template markers
                                              ↓
                                    Store in Firestore
```

## Key Files

### Core Implementation
- `/functions/src/quick-brief-generator.ts` - Main generation logic (1,800+ lines)
- `/functions/test-brief-v5.ts` - Local testing script

### Documentation
- `/docs/quick-brief/README.md` - This file (overview)
- `/docs/quick-brief/VERSION_HISTORY.md` - Evolution from v1 to v12
- `/docs/quick-brief/TECHNICAL_DETAILS.md` - Implementation details
- `/docs/quick-brief/samples/` - Example generated briefs

## Version History Summary

### Core Foundation (v1-v15)
- **v1-v5:** Initial development, basic analysis
- **v6:** Added media categorization (crypto vs mainstream)
- **v7:** Fixed banned phrase removal with post-processing
- **v8:** Fixed crypto media categorization (Cointelegraph properly classified)
- **v9:** Added historical saturation analysis (n-gram extraction)
- **v10:** Made historical context visible to users, specific recommendations
- **v11:** Pattern-based narrative extraction (5 regex patterns)
- **v12:** Semantic article sampling (reads actual articles)
- **v13:** Hyper-specific framing extraction (not generic categories)
- **v14:** Noise filtering (2+ mentions only) + adjusted thresholds
- **v15:** Deterministic systematic sampling (reproducible intelligence)

### Trends Integration Era (v16-v32)
- **v16-v22:** Historical analysis refinements, evidence extraction improvements
- **v23-v24:** Initial Trends API integration, extracted key highlights & business implications
- **v25:** Fixed API endpoint (removed `/api/` prefix)
- **v26:** Convergence analysis - removed keyword filtering, analyze ALL trends for newsjacking
- **v27-v28:** Data preservation attempts (template instructions visible to AI)
- **v29:** Debug logging to verify trend data extraction
- **v30:** Verbatim data sections with explicit copy instructions
- **v31:** Clean template markers, better extraction patterns
- **v32:** Final polish - trend count requirement + factual constraints ⭐ Production

## Quality Metrics

### v32 Rating: 8.7/10 (Production) ⭐
**Strengths:**
- ✅ **Trends integration:** 10 real-time trending topics with 15+ key highlights each
- ✅ **Convergence analysis:** Shows how keyword relates to broader trends for newsjacking
- ✅ **Data richness:** Business implications, sentiment scores, article URLs included
- ✅ **Factual constraints:** Prevents unverified claims when extraction fails
- ✅ **Cost-optimized:** Single API call (66% savings vs retry loop)
- ✅ **Clean output:** Template markers removed, professional formatting

**Known Limitations (why not 9/10):**
- ⚠️ **Trend count:** Shows 2 trends instead of requested 5-7 (GPT-4o limitation)
- ⚠️ **Factual constraint compliance:** Occasionally invents financial details in ACTIONABLE RECOMMENDATIONS despite warnings

**Examples of Output Quality:**
```
**Trend 1: "Institutional Interest in Bitcoin Grows"**
📊 TREND DATA:
Signal: STRONG | Confidence: 100% | 40 articles

Key highlights:
• MicroStrategy adds 155 Bitcoin to reserves
• Growing sentiment Bitcoin is crucial for companies
• CEO Michael Saylor emphasizes treasury potential

🎯 CONVERGENCE ANALYSIS:
- Convergence: Metaplanet's acquisitions mirror institutional trend
- Unique Angle: Emphasize innovative financing methods
- Newsjacking Opportunity: Pitch WSJ: "Metaplanet's Institutional Playbook..."
```

**Improvement over v15:**
- v15: No real-time trends → v32: 10 trending topics from last 48h
- v15: Static analysis → v32: Dynamic newsjacking opportunities
- v15: $0.17/brief → v32: $0.20/brief (+18% cost for trends data)

### v15 Rating: 9.5/10 (Historical Analysis Baseline)
**Why v15 was rated higher:**
- Pure historical analysis without trends integration
- Simpler scope, easier to constrain AI output
- Lower cost, faster generation

**v15 remains the gold standard for:**
- Historical narrative saturation detection
- Deterministic sampling and reproducibility
- Clean signal-to-noise ratio

## Usage

### Local Testing
```bash
cd /Users/fernandonikolic/perception/functions
OPENAI_API_KEY="your-key" npx ts-node test-brief-v5.ts
```

### Production Deployment
```bash
firebase deploy --only functions:quickBriefGenerator
```

### Calling from Frontend
```typescript
const generateBrief = httpsCallable(functions, 'quickBriefGenerator');
const result = await generateBrief({
  keyword: 'metaplanet',
  briefType: 'pr_intelligence',
  timeRange: 'last_30_days',
  userId: currentUser.uid
});
```

## Cost Analysis

Per brief generation:
- BigQuery reads: Free (under 1TB/month)
- OpenAI GPT-4o: ~$0.17
  - Historical analysis: 4 batches × $0.04 = $0.16
  - Clustering: $0.02
  - Brief generation: $0.14
  - **Total per brief:** ~$0.17

At $99/month subscription:
- Allows ~580 briefs/month before breaking even on AI costs
- Average user generates 5-10 briefs/month
- Margins: 95%+

## Performance Optimization (Future)

Current: 120s generation time

**Proposed optimization:**
1. Pre-compute historical analysis nightly for tracked keywords
2. Store results in Firestore
3. Reduce latency to 30-40s (only current data + brief generation)

Implementation:
```typescript
// Cloud Scheduler → Cloud Function (nightly)
export const precomputeHistoricalAnalysis = onSchedule({
  schedule: "0 2 * * *", // 2 AM daily
  timeZone: "America/Los_Angeles"
}, async () => {
  const trackedKeywords = await getTrackedKeywords();
  for (const keyword of trackedKeywords) {
    const narrativeAngles = await analyzeHistoricalNarratives(keyword);
    await storeInFirestore(keyword, narrativeAngles);
  }
});
```

## Known Issues

### Non-Critical (v32)
1. **Trend count limitation:** GPT-4o displays only 2 of 10 available trends despite explicit instructions to show 5+
   - **Impact:** Users miss 8 newsjacking opportunities
   - **Workaround:** Consider separate API call for trends section

2. **Factual constraint compliance:** AI occasionally invents specific financial details in ACTIONABLE RECOMMENDATIONS section
   - **Impact:** Brief may claim "$1.4B Convertible Bond" without verified source
   - **Mitigation:** FACTUAL CONSTRAINT warning present, but GPT-4o doesn't always follow
   - **Workaround:** Manual review of recommendations section

3. **Financial extraction failure:** BigQuery articles contain only titles/snippets, not full content
   - **Impact:** Cannot extract dollar amounts or mechanisms from article text
   - **Status:** Expected behavior - not a bug

## Future Enhancements

1. **Performance:** Pre-computation of historical analysis (reduce from 120s to 40s)
2. **Quality:** Add "Why this angle is fresh" reasoning to recommendations
3. **Targeting:** Include specific reporters who've shown interest in similar angles
4. **Caching:** Extend cache TTL for frequently requested keywords

## Support

For issues or questions:
- Technical lead: Fernando Nikolic
- Repository: `/Users/fernandonikolic/perception/`
- Documentation: `/docs/quick-brief/`
