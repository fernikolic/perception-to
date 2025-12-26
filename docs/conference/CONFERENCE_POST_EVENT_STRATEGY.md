# Conference Data Strategy: Post-Event Approach

## Decision: Pivot to Post-Event Conference Scraping

Based on testing, we discovered that **pre-event conference scraping produces hallucinated data** because agendas are published months before speaker details are finalized.

## Why Post-Event is Better

### 1. **Data Quality**
- ✅ Verified speakers (no hallucinations)
- ✅ Actual session content (not planned)
- ✅ Real topics discussed (based on current events)
- ✅ Often includes recordings/transcripts
- ❌ Pre-event: speakers cancel, sessions change, AI hallucinates missing details

### 2. **Unique Value Proposition**
Most tools track upcoming conferences. Almost nobody tracks:
- What was actually discussed
- Sentiment shifts across conferences over time
- Which topics dominated the conversation
- Cross-conference trend analysis

### 3. **User Value Examples**

**Query**: "How did regulation sentiment change across Q1 2024 conferences?"
```sql
SELECT
  Outlet as conference,
  Date,
  COUNT(*) as regulation_sessions,
  AVG(BPI) as avg_sentiment
FROM conference_data
WHERE All_Topics LIKE '%Regulation%'
  AND Date BETWEEN '2024-01-01' AND '2024-03-31'
GROUP BY Outlet, Date
ORDER BY Date
```

This is **impossible with pre-event data**.

## Implementation Plan

### Phase 1: Historical Backfill (Start Here)
1. Manually curate 30 major Bitcoin conferences from 2024
2. Scrape post-event data (stable, won't change)
3. Verify quality - real speakers, real topics
4. Load to BigQuery
5. Demonstrate value to users with historical analysis

**Target Conferences for 2024:**
- Bitcoin 2024 (Nashville, July) ✅ Has complete speaker list
- Bitcoin Amsterdam (October)
- Plan B Forum (Lugano)
- Bitcoin Asia (Hong Kong)
- And 26 more...

### Phase 2: Ongoing Post-Event Scraping
- Scrape conferences 1-2 weeks after they end
- Focus on top 20-30 annual events
- Quarterly trend reports for users

### Phase 3: Future Enhancements (Optional)
- Add YouTube recording URLs
- Extract quotes from transcripts
- Pre-event calendar (marked as "scheduled")

## Test Results from This Session

**Problem Found**: Both monitoring AND scraping still hallucinate

**Examples of Hallucination:**
1. Eric Trump as "Co-Founder, American Bitcoin" (fake company)
2. João Silva, Maria Oliveira, Carlos Pereira (generic Portuguese names)
3. SatsConf agenda page exists but has no speaker details

**Root Cause**:
- Agenda pages published early with just session titles
- No speaker names/bios yet
- OpenAI fills in missing details with plausible-sounding fake data

**Solution**: Only scrape post-event when ALL details are finalized

## Bitcoin 2024 Example (Good Post-Event Data)

**URL**: https://b.tc/conference/2024
**Verified Real Speakers:**
- Donald Trump (45th President)
- Robert F. Kennedy Jr. (Independent Presidential Candidate)
- Michael Saylor (Executive Chairman, MicroStrategy)
- Cathie Wood (CEO, ARK)
- Edward Snowden (Whistleblower)
- Russell Brand (Creator)
- Vivek Ramaswamy (Business Entrepreneur)

**Data Available:**
- Complete speaker list with bios
- Session agenda
- Likely has recordings/transcripts
- **This is real, verifiable data** ✅

## Next Steps

1. **Build simplified post-event scraper** for Bitcoin 2024
2. **Test extraction quality** - verify no hallucinations
3. **Load to BigQuery** - verify schema alignment
4. **Create historical analysis** - show user value
5. **Expand to 30 conferences** - build complete 2024 dataset

## Cost Estimate

**30 conferences × 50 sessions average = 1,500 sessions**
- Scraping: 30 × $0.001 = $0.03
- OpenAI extraction: 1,500 × $0.002 = $3.00
- Sentiment: 1,500 × $0.001 = $1.50

**Total: ~$5 for complete 2024 dataset** (one-time cost)
**Ongoing: ~$10-15/year for new conferences**

## Conclusion

Post-event conference scraping provides:
- **Better data quality** (no hallucinations)
- **Unique competitive advantage** (historical trend analysis)
- **Lower cost** (scrape once, data stable)
- **Higher user value** (what actually happened vs what was planned)

**Recommendation: Proceed with post-event approach immediately**
