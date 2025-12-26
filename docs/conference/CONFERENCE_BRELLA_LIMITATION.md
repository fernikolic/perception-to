# Conference Data Limitation: Brella Widget Problem

## Issue Discovered: 2025-10-29

### Problem

Bitcoin 2024 conference (and many major Bitcoin conferences) use **Brella widgets** for their agenda/schedule pages. This creates a significant technical limitation:

1. **JavaScript-Only Content**: Brella loads session data dynamically via JavaScript API calls
2. **No HTML Extraction Possible**: Session details are NOT in the HTML - they're fetched client-side
3. **Scrape.do Can't Help**: Even with rendering, the widget requires specific API credentials
4. **Example Sessions Are Worthless**: User correctly pointed out that generating fake/example sessions has no value

### What We Tried

1. ✅ Successfully scraped speakers page (7 real speakers extracted)
2. ✅ Verified no hallucinations (Donald Trump, RFK Jr, Michael Saylor, etc. - all real)
3. ❌ **FAILED**: Cannot extract agenda sessions from Brella widget
4. ❌ **REJECTED**: Generated example sessions (user correctly said this is a "net negative")

### Conferences Using Brella

- Bitcoin 2024 (Nashville)
- Bitcoin Amsterdam
- Bitcoin Asia
- Many other major conferences

**Problem**: Brella is the industry standard for event management, so MOST large conferences will have this issue.

## Solution: Alternative Data Sources

### Option 1: Conferences with Accessible Agendas ✅ RECOMMENDED

Find smaller/different conferences that publish agendas as **static HTML** instead of dynamic widgets:

**Candidates to Test**:
- Plan B Forum (Lugano) - Check if agenda is static HTML
- Baltic Honeybadger (Riga) - Often has simple HTML schedules
- Adopting Bitcoin (El Salvador) - Check accessibility
- Bitcoin Tokyo - Check accessibility
- Canadian Bitcoin Conference - Check accessibility

**Action**: Test 5-10 conferences to find ones with scrapable agendas

### Option 2: Post-Conference YouTube/Transcripts ✅ FEASIBLE

Instead of scraping agendas, scrape **actual conference recordings**:

1. Bitcoin 2024 has YouTube playlists with all sessions
2. Each video has: title, description, speaker, actual content
3. Can extract from video metadata + transcripts
4. **This is ACTUAL data, not planned/pre-event**

**Advantages**:
- Real content that actually happened
- No hallucination risk
- Better for sentiment analysis (actual discussions vs planned topics)
- Unique competitive advantage

**Disadvantages**:
- Videos published weeks after conference
- More expensive (video processing/transcription)
- Requires different scraping approach

### Option 3: Conference Recap Articles ✅ EXISTING DATA

Many conferences get extensive media coverage:

- Bitcoin Magazine articles about Bitcoin 2024
- CoinDesk coverage
- Cointelegraph conference recaps
- These already exist in your MSM data!

**Action**: Query existing `all_channels_data` for conference-related articles

### Option 4: Manual Curation (Hybrid Approach) ✅ PRAGMATIC

For top 10-20 conferences annually:

1. User manually provides YouTube playlist URLs or recap article URLs
2. System scrapes the actual content
3. Much more reliable than trying to scrape dynamic widgets
4. Quality > Quantity

## Recommendation

**Pivot to YouTube/Video-Based Conference Scraping**:

1. Bitcoin 2024 has official YouTube channel with full recordings
2. Each session video has:
   - Title
   - Description
   - Speaker names
   - Upload date
   - View count (engagement metric!)
   - Transcript (actual content for sentiment analysis)

3. This provides:
   - ✅ Real data (no hallucinations)
   - ✅ Actual topics discussed
   - ✅ Real sentiment from actual content
   - ✅ Engagement metrics (views, likes)
   - ✅ Post-event analysis (what actually happened)

### Next Steps

1. Build YouTube playlist scraper
2. Test with Bitcoin 2024 official channel
3. Extract 20-30 real session videos
4. Verify quality is high
5. Load to BigQuery
6. Demonstrate value with real analysis

## Cost Estimate

**YouTube-Based Approach**:
- 30 conferences × 30 sessions average = 900 sessions
- YouTube API: Free (quota: 10,000 requests/day)
- Transcript extraction: ~$0.002/session = $1.80
- Sentiment analysis: $0.001/session = $0.90
- **Total: ~$3 for complete 2024 dataset**

## User Value

**Query Example**: "What were the most discussed topics at Bitcoin 2024?"
```sql
SELECT
  All_Topics,
  COUNT(*) as mentions,
  AVG(BPI) as avg_sentiment,
  SUM(Views) as total_views
FROM conference_data
WHERE Outlet = 'Bitcoin 2024'
  AND Date >= '2024-07-25'
GROUP BY All_Topics
ORDER BY mentions DESC
```

**This answers**: What actually happened at the conference (not what was planned)

## Conclusion

Brella widget limitation is actually an **opportunity to pivot to better data**:
- Stop trying to scrape pre-event agendas
- Start scraping post-event YouTube recordings
- Better quality, more valuable, more unique

**User was right**: Example sessions are worthless. Real session data from videos is the solution.
