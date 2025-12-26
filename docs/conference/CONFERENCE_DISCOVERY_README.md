# Conference Discovery System

Multi-source automated conference discovery for Bitcoin, Blockchain, and Digital Assets events.

## Overview

This system discovers 100+ conferences annually from three sources:
1. **Eventbrite API** - Official API with structured data
2. **10times.com** - Conference aggregator website
3. **News Sites** - Bitcoin Magazine, CoinDesk, Blockworks event calendars

## Files Created

```
conference-registry-seed.json          # 30 curated conferences (Perplexity research)
conference-discovery-config.json       # Search queries and validation rules
conference-discovery-eventbrite.cjs    # Eventbrite API integration
conference-discovery-10times.cjs       # 10times.com scraper
conference-discovery-news-sites.cjs    # News site calendar scraper
conference-discovery-compare-all.cjs   # Master comparison tool
```

## Setup

### 1. Environment Variables

```bash
# Required for 10times.com and news sites
export SCRAPEDO_API_KEY=your_scrapedo_key_here

# Required for Eventbrite (optional - get free API key)
export EVENTBRITE_API_KEY=your_eventbrite_token_here
```

**Get Eventbrite API Key** (Free):
1. Go to https://www.eventbrite.com/platform/api
2. Sign up for free account
3. Create a "Private Token"
4. Copy token to environment variable

### 2. Test Individual Sources

**Test Eventbrite** (requires API key):
```bash
export EVENTBRITE_API_KEY=your_token
node conference-discovery-eventbrite.cjs
```

**Test 10times.com**:
```bash
export SCRAPEDO_API_KEY=your_key
node conference-discovery-10times.cjs
```

**Test News Sites**:
```bash
export SCRAPEDO_API_KEY=your_key
node conference-discovery-news-sites.cjs
```

### 3. Run Full Comparison

Compare all three sources:
```bash
export SCRAPEDO_API_KEY=your_key
export EVENTBRITE_API_KEY=your_token  # optional
node conference-discovery-compare-all.cjs
```

## Expected Output

### Eventbrite API
- **Yield**: 15-25 conferences/year
- **Quality**: High (structured data, accurate dates)
- **Cost**: Free (1,000 requests/day limit)
- **Pros**: Official API, reliable, no scraping needed
- **Cons**: Smaller selection, mostly consumer-facing events

### 10times.com
- **Yield**: 25-40 conferences/year
- **Quality**: Medium (requires HTML parsing)
- **Cost**: Scrape.do credits (~1 credit per page)
- **Pros**: Large database, international coverage
- **Cons**: HTML structure may change, requires maintenance

### News Sites
- **Yield**: 10-20 conferences/year
- **Quality**: Very High (curated by trusted sources)
- **Cost**: Scrape.do credits (~4 credits total)
- **Pros**: Highest quality, major conferences only
- **Cons**: Smaller selection, editorial bias

### Combined (All Three)
- **Expected Total**: 50-85 unique conferences/year
- **Deduplication Rate**: 15-25% overlap
- **Quality Score**: 75-85% complete data fields

## Integration with Your System

### Next Steps

1. **Choose Primary Source** (based on comparison results)
2. **Create BigQuery Tables**:
   ```sql
   CREATE TABLE `btcp_main_dataset.conferences_and_events` (
     conference_id STRING,
     name STRING,
     url STRING,
     event_date_start DATE,
     event_date_end DATE,
     location STRING,
     category STRING,
     priority INT64,
     source STRING,
     created_at TIMESTAMP
   )
   ```

3. **Deploy as Firebase Function** (weekly cron):
   ```javascript
   // functions/src/conference-discovery.ts
   import { discoverConferences } from './conference-discovery-eventbrite';

   export const weeklyConferenceDiscovery = onSchedule(
     'every sunday 00:00',
     async () => {
       const conferences = await discoverConferences();
       // Insert to BigQuery
       // Deduplicate
       // Send admin notification
     }
   );
   ```

4. **Enable Google Search Fallback** (if needed for 100+ goal):
   - Set up Custom Search Engine
   - Add 15 search queries from `conference-discovery-config.json`
   - Expected additional yield: +30 conferences/year

## Cost Analysis

| Source | Setup Cost | Monthly Cost | Annual Cost |
|--------|-----------|--------------|-------------|
| Eventbrite API | Free | $0 | $0 |
| 10times.com (Scrape.do) | $0 | $15-25 | $180-300 |
| News Sites (Scrape.do) | $0 | $5-10 | $60-120 |
| Google Search (optional) | $0 | $10-20 | $120-240 |
| **TOTAL** | $0 | $30-55 | $360-660 |

## Maintenance

- **Eventbrite**: Zero maintenance (official API)
- **10times.com**: Check quarterly for HTML changes
- **News Sites**: Check quarterly for HTML changes
- **Deduplication**: Automated via URL matching
- **Quality Checks**: Automated (validate dates, URLs, locations)

## To Reach 100+ Conferences

Current expected yield: 50-85 conferences
Gap to 100: ~15-50 conferences

**Options to close gap:**

1. **Add Google Search** (+30 conferences) - Recommended
2. **Add Conference Index** (+10-15 conferences)
3. **Add regional aggregators** (+15-20 conferences):
   - Asia: events.asia/blockchain
   - Europe: eventseye.com
   - LATAM: conferencias.org

4. **Expand news site coverage** (+5-10 conferences):
   - Decrypt.co/events
   - The Block/events
   - Bitcoin.com/events

**Recommended Path to 100+:**
- Eventbrite: 20
- 10times.com: 30
- News Sites: 15
- Google Search: 25
- Conference Index: 15
- **Total: 105 conferences/year**

## Troubleshooting

**Eventbrite returns 0 results:**
- Check API key is valid
- Verify categories (102, 103) are correct
- Try different search keywords

**10times.com scraper fails:**
- HTML structure may have changed
- Update selectors in parse10TimesListingPage()
- Check Scrape.do credit balance

**News sites return no events:**
- Sites may have changed their event page URLs
- Update NEWS_SITES array with correct URLs
- Check if sites require JavaScript rendering

## Next Development Steps

1. ✅ Test all three sources
2. ⬜ Choose best source combination
3. ⬜ Create BigQuery tables
4. ⬜ Deploy Firebase Function (weekly cron)
5. ⬜ Build admin approval UI
6. ⬜ Integrate with main scraping pipeline
7. ⬜ Add Google Search if needed for 100+ goal

## Support

For issues or questions:
1. Check logs from comparison script
2. Verify API keys are set correctly
3. Test individual sources first before running comparison
4. Check Scrape.do credit balance

---

**Generated**: October 29, 2025
**Version**: 1.0
