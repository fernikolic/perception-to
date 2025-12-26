# Conference Data Pipeline - Complete System Documentation

## Overview

Automated system for discovering, monitoring, and extracting Bitcoin/Crypto/Blockchain conference data into BigQuery for perception analysis.

**Goal**: Track 100+ major conferences, automatically detect when agendas are published, extract session/speaker data, and load to BigQuery matching the `all_channels_data` schema.

## The Problem We Solved

**Initial Issue**: When scraping conference URLs before agendas were published, OpenAI would hallucinate fake data (e.g., "Andreas Antonopoulos speaking at SatsConf 2025" when the agenda didn't exist yet).

**Solution**: Built a 4-phase pipeline that:
1. Discovers 100+ conferences
2. **Monitors weekly for agenda publication** (KEY: prevents hallucination)
3. Only scrapes when agendas are confirmed
4. Loads verified data to BigQuery

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ PHASE 1: DISCOVERY (Monthly)                                │
│ ─────────────────────────────────────────────────────────── │
│ • Find 100+ Bitcoin/Crypto/Blockchain conferences           │
│ • Regional + categorical Perplexity queries                 │
│ • Include TradFi events with blockchain tracks              │
│ • Output: conference-registry-master.json                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ PHASE 2: AGENDA MONITORING (Weekly/Bi-weekly) **CRITICAL** │
│ ─────────────────────────────────────────────────────────── │
│ • Check if 2025/2026 agendas published                      │
│ • Perplexity search: "{Conference} 2025 agenda"             │
│ • Detect NEW agenda URLs                                    │
│ • Flag conferences ready to scrape                          │
│ • Output: conference-monitor-state.json                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ PHASE 3: INTELLIGENT SCRAPING (When agendas detected)       │
│ ─────────────────────────────────────────────────────────── │
│ • Scrape.do with render=true (JavaScript rendering)         │
│ • Validation: reject redirect/empty pages                   │
│ • OpenAI extraction: sessions, speakers, topics             │
│ • Validation: reject placeholder/TBA content                │
│ • Sentiment analysis per session                            │
│ • Output: conference-data-extracted.json                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ PHASE 4: BIGQUERY LOADING                                   │
│ ─────────────────────────────────────────────────────────── │
│ • Transform to all_channels_data schema (19 fields)         │
│ • Load to triple-upgrade-245423.btcp_main_dataset           │
│ • Table: conference_data                                    │
│ • Verify data quality                                       │
└─────────────────────────────────────────────────────────────┘
```

## Files

### Core Pipeline Scripts

1. **conference-pipeline-master.cjs** - Master automation script
   - Orchestrates all 4 phases
   - Weekly automation entry point
   - Usage: `node conference-pipeline-master.cjs --mode=monitor`

2. **conference-discovery-expand-to-100.cjs** - Phase 1
   - Finds 100+ conferences via 16 targeted Perplexity queries
   - Regional: North America, Europe, Asia, Latin America, Africa
   - Categorical: Developer, Institutional, Mining, Regulation, Enterprise
   - Deduplicates against existing registry

3. **conference-agenda-monitor.cjs** - Phase 2 (CRITICAL)
   - **This is what prevents hallucination**
   - Weekly Perplexity checks: "Has {Conference} published {year} agenda?"
   - Detects NEW agenda URLs
   - Tracks state to avoid re-checking
   - Only triggers scraping when agendas confirmed

4. **conference-agenda-scraper.cjs** - Phase 3
   - Scrape.do with `render=true` for JavaScript sites
   - Validates: rejects redirects, empty pages, placeholder content
   - OpenAI extracts: conference details, sessions, speakers, topics
   - Sentiment analysis: sophisticated, not literal title interpretation
   - Transforms to all_channels_data schema

5. **conference-orchestrator.cjs** - Phase 3 orchestration
   - Processes multiple conferences
   - Progress tracking and resume capability
   - Rate limiting (3s between conferences)

6. **load-conferences-to-bigquery.cjs** - Phase 4
   - Creates `conference_data` table if needed
   - Loads to BigQuery
   - Verification queries

### Data Files

- `conference-registry-master.json` - Master list of 65+ conferences
- `conference-monitor-state.json` - Tracks agenda publication status
- `conference-data-extracted.json` - Scraped data ready for BigQuery
- `conference-extraction-progress.json` - Scraping progress

### Support Files

- `conference-registry-seed.json` - 30 manually curated conferences
- `conference-discovery-perplexity.cjs` - Single Perplexity query
- `conference-discovery-multi-query.cjs` - 8 targeted queries
- `merge-conference-registries.cjs` - Deduplication utility

## Quick Start

### 1. Setup

```bash
# Install dependencies (if needed)
npm install @google-cloud/bigquery dotenv

# Set environment variables in .env
PERPLEXITY_API_KEY=your_key
OPENAI_API_KEY_V2=your_key
SCRAPEDO_API_KEY=your_key
GOOGLE_APPLICATION_CREDENTIALS=/path/to/bigquery-key.json
```

### 2. Weekly Automation (Recommended)

```bash
# Run monitoring (checks for new agenda publications)
node conference-pipeline-master.cjs --mode=monitor

# If new agendas found, run scraping
node conference-pipeline-master.cjs --mode=scrape

# Or run full pipeline (monitoring + scraping + loading)
node conference-pipeline-master.cjs --mode=full
```

### 3. One-time Setup

```bash
# Expand conference registry to 100+ (run once or monthly)
node conference-discovery-expand-to-100.cjs

# Test monitoring on a few conferences
node conference-agenda-monitor.cjs --max=5

# Test scraping
node conference-orchestrator.cjs --max=2 --priority-only
```

## Usage Examples

### Weekly Monitoring Workflow

```bash
# Every Monday: Check for new agenda publications
node conference-pipeline-master.cjs --mode=monitor

# If agendas detected: Scrape and load
node conference-pipeline-master.cjs --mode=scrape
node conference-pipeline-master.cjs --mode=load
```

### Full Automation

```bash
# Run complete pipeline (all 4 phases)
node conference-pipeline-master.cjs --mode=full --include-discovery
```

### Targeted Operations

```bash
# Monitor only priority 1-2 conferences
node conference-agenda-monitor.cjs --priority-only --max=20

# Scrape specific conferences
node conference-orchestrator.cjs --max=5 --priority-only

# Re-check all conferences (ignore known agendas)
node conference-agenda-monitor.cjs --recheck-all
```

## Data Schema

### conference_data Table (BigQuery)

Matches `all_channels_data` schema exactly:

```sql
CREATE TABLE conference_data (
  Date TIMESTAMP,
  Title STRING,
  Content STRING,
  URL STRING,
  Outlet STRING,              -- Conference name
  Sentiment STRING,           -- Positive/Neutral/Negative
  Image_URL STRING,
  author_name STRING,         -- Primary speaker
  BPI FLOAT,                  -- 0.3 (Positive), 0.1 (Neutral), 0.6 (Negative)
  Topic_1 STRING,
  Topic_2 STRING,
  Topic_3 STRING,
  Topic_4 STRING,
  Country STRING,
  Funding STRING,
  Outlet_Category STRING,     -- Always "Conference"
  Political_Leaning STRING,
  All_Topics STRING,
  row_num INTEGER
)
```

### Session Transformation

Each conference session becomes one row:
- **Date**: Session date/time (or conference start date)
- **Title**: Session title
- **Content**: Description + speakers + type + track
- **Outlet**: Conference name
- **author_name**: First speaker
- **Sentiment**: AI-analyzed sentiment based on substance
- **Topics**: Up to 4 main topics + all topics combined

## How It Prevents Hallucination

### Problem
When scraping conference URLs months before events, agendas often don't exist yet. OpenAI would make up plausible data:
- **Example**: "Andreas Antonopoulos speaking at SatsConf 2025" (fake)

### Solution: Multi-Layer Validation

1. **Phase 2 Monitoring** (Before scraping)
   - Perplexity confirms agenda is published
   - Extracts actual agenda URL
   - Only scrapes after confirmation

2. **Scrape.do Validation**
   ```javascript
   // Reject redirect pages
   if (html.length < 1000) throw Error('Too short');
   if (html.includes('301 moved')) throw Error('Redirect');
   ```

3. **Content Validation**
   ```javascript
   // Reject placeholder content
   const suspiciousPatterns = ['to be announced', 'tba', 'coming soon'];
   const isPlaceholder = patterns.some(p => description.includes(p));
   if (isPlaceholder) reject();
   ```

4. **Minimum Quality Threshold**
   ```javascript
   // Must have substantive descriptions
   if (description.length < 20) reject();

   // If >50% of sessions rejected, likely hallucinated
   if (validSessions < totalSessions * 0.5) reject();
   ```

## Deployment Options

### Option 1: Manual Weekly Execution

```bash
# Run every Monday
node conference-pipeline-master.cjs --mode=monitor
```

### Option 2: Cron Job (Local Server)

```bash
# Add to crontab: Run every Monday at 9 AM
0 9 * * 1 cd /path/to/perception && node conference-pipeline-master.cjs --mode=full >> conference-pipeline.log 2>&1
```

### Option 3: Firebase Scheduled Function

```javascript
// functions/index.js
exports.conferenceMonitor = functions.pubsub
  .schedule('0 9 * * 1')  // Every Monday 9 AM
  .timeZone('America/New_York')
  .onRun(async (context) => {
    const { runFullPipeline } = require('./conference-pipeline-master.cjs');
    return await runFullPipeline({ priorityOnly: true });
  });
```

### Option 4: Cloud Scheduler + Cloud Run

```bash
# Deploy as Cloud Run service
gcloud run deploy conference-monitor \
  --source . \
  --region us-central1 \
  --timeout 540 \
  --memory 2Gi

# Create scheduler
gcloud scheduler jobs create http conference-weekly-monitor \
  --location us-central1 \
  --schedule="0 9 * * 1" \
  --uri="https://conference-monitor-xxx.run.app" \
  --http-method=POST
```

## Monitoring & Alerts

### Check Pipeline Status

```bash
# View monitoring state
cat conference-monitor-state.json | jq '.conferences | length'

# View last run
cat conference-monitor-state.json | jq '.lastRun'

# View conferences ready to scrape
cat conference-monitor-state.json | jq '[.conferences[] | select(.agendas[].scraped == false)]'
```

### BigQuery Verification

```sql
-- Total conference data rows
SELECT COUNT(*) as total_rows,
       COUNT(DISTINCT Outlet) as conferences
FROM `triple-upgrade-245423.btcp_main_dataset.conference_data`

-- Recent conferences
SELECT Outlet,
       COUNT(*) as sessions,
       MIN(Date) as start_date,
       COUNTIF(Sentiment = 'Positive') as positive
FROM `triple-upgrade-245423.btcp_main_dataset.conference_data`
GROUP BY Outlet
ORDER BY start_date DESC
LIMIT 10

-- Data quality check
SELECT
  COUNTIF(Title IS NULL) as missing_titles,
  COUNTIF(Content IS NULL) as missing_content,
  COUNTIF(author_name IS NULL) as missing_speakers,
  COUNTIF(Sentiment IS NULL) as missing_sentiment
FROM `triple-upgrade-245423.btcp_main_dataset.conference_data`
```

## Troubleshooting

### Issue: No new agendas detected

**Check**:
```bash
# Verify monitoring is running
node conference-agenda-monitor.cjs --max=3

# Re-check all conferences
node conference-agenda-monitor.cjs --recheck-all
```

**Possible causes**:
- Agendas not published yet (normal for conferences 6+ months away)
- Need to expand conference registry

### Issue: Scraping fails with "Page content too short"

**Cause**: Conference site redirecting or blocking

**Solution**:
1. Check if URL is correct
2. Try `render=true` (already enabled)
3. May need manual URL discovery for agenda page

### Issue: All sessions rejected as placeholders

**Cause**: Agenda page exists but content is "Coming soon"

**Solution**: This is working as intended! System correctly rejects placeholder content. Wait for actual agenda to be published.

### Issue: Hallucinated/fake speakers

**Check validation**:
```javascript
// Increase strictness in conference-agenda-scraper.cjs
if (session.description.length < 50) return false;  // Increase from 20
```

## Roadmap

### Completed
- ✅ Phase 1: Discovery system (65 conferences)
- ✅ Phase 2: Agenda monitoring
- ✅ Phase 3: Intelligent scraping with validation
- ✅ Phase 4: BigQuery loading
- ✅ Hallucination prevention

### Next Steps
1. **Expand to 100+ conferences**
   - Run: `node conference-discovery-expand-to-100.cjs`
   - Target: 100-150 conferences

2. **Deploy automated weekly monitoring**
   - Firebase scheduled function
   - Or Cloud Scheduler + Cloud Run

3. **Quality improvements**
   - Add image extraction (conference logos, speaker photos)
   - Enhance topic extraction (use NER/entity extraction)
   - Add session recording URLs when available

4. **Integration**
   - Merge `conference_data` into `all_channels_data`
   - Add to hybrid feed
   - Create conference-specific dashboards

## API Costs

### Typical Weekly Run (100 conferences)

**Phase 2: Monitoring**
- Perplexity: 100 queries × $0.001 = **$0.10**

**Phase 3: Scraping** (assuming 5 new agendas per week)
- Scrape.do: 5 pages × $0.001 = **$0.005**
- OpenAI extraction: 5 × $0.01 = **$0.05**
- Sentiment analysis: 50 sessions × $0.001 = **$0.05**

**Total: ~$0.20/week = $10/year**

Very cost-effective for automated conference monitoring!

## Key Insights

1. **Monitoring is Critical**: Don't scrape blindly. Always confirm agenda is published first.

2. **Validation Saves Costs**: Better to reject questionable data than load hallucinated content.

3. **Patience Required**: Many conferences publish agendas only 1-2 months before the event.

4. **Progressive Enhancement**: Start with 65 high-priority conferences, expand as system proves reliable.

5. **Data Quality > Quantity**: 50 conferences with real data > 100 with hallucinated data.

## Support

For issues or questions:
1. Check this README
2. Review logs in `conference-pipeline.log`
3. Inspect state files (`conference-monitor-state.json`)
4. Verify BigQuery data quality with SQL queries above

## License

Internal use - Perception perception analysis platform
