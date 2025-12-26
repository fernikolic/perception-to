# Conference Intelligence System: Complete Analysis

**Created:** December 2024
**Status:** For Future Consideration
**Author:** Technical Analysis of Product Proposal

---

## Executive Summary

A product proposal was submitted for a "Conference Intelligence System" that would process conference recordings to extract actionable intelligence. After technical analysis, we found that **~70% of the infrastructure already exists** in Perception's codebase. The proposal is strategically sound but technically unaware of existing capabilities.

**Key Finding:** The unique value is not in building a new pipeline (already done), but in adding an **intelligence extraction layer** on top of existing conference data processing.

---

## Part 1: What Was Proposed

### The Product Vision

> "Conference panels contain high-value intelligence that currently disappears... No one is systematically processing this content. We want to become the searchable institutional memory of crypto industry discourse."

### Proposed Features

1. **Conference Content Ingestion**
   - YouTube video processing
   - Audio extraction and transcription (Whisper API)
   - Metadata capture (conference name, speakers, dates)

2. **Intelligence Extraction Types**
   - **Quotable Positions**: Exact quotes with timestamps and topic tags
   - **Regulatory Signals**: Policy hints from officials with dovish/hawkish sentiment
   - **Competitive Intelligence**: Company announcements, market expansion plans
   - **Trackable Predictions**: Statements with deadlines that can be verified later
   - **Cross-Reference Flags**: Detecting contradictions between statements

3. **Database Schema**
   - Separate tables for conferences, sessions, speakers, intelligence
   - Speaker deduplication across events
   - Cross-reference tracking for contradictions

4. **Proposed API Endpoints**
   - `GET /conferences` - List processed conferences
   - `GET /speakers/{id}/history` - All statements by a speaker
   - `GET /predictions` - Trackable predictions with status
   - `GET /contradictions` - Cross-reference alerts

5. **UI Components**
   - Conference library view
   - Session detail with synced transcript
   - Speaker profile pages
   - Prediction tracker dashboard

### Proposed Cost Estimates (from Product)

| Item | Estimate |
|------|----------|
| Whisper API (1hr video) | $2-5 |
| OpenAI extraction | $0.01-0.02/video |
| Storage | Variable |
| **Total per conference** | **~$5** |

### Proposed Timeline

- Phase 1: Core Pipeline (Weeks 1-2)
- Phase 2: Intelligence Extraction (Weeks 2-3)
- Phase 3: UI (Weeks 3-4)
- Phase 4: Advanced Features (Week 4+)

---

## Part 2: What Already Exists

### Existing Conference Video Monitoring System

**Location:** `/docs/CONFERENCE_VIDEO_MONITORING_SYSTEM.md`

A fully operational system that:
- Monitors **18 YouTube conference channels** daily
- Extracts transcripts using `youtube-caption-extractor` (FREE, not Whisper)
- Runs GPT-4o-mini analysis for speaker extraction, topics, sentiment
- Stores in BigQuery `conference_videos_staging` table
- Uses same 19-field schema as all other data

**Key Scripts:**
- `scripts/conference/conference-youtube-monitor.cjs` - Main monitoring script
- `scripts/conference/manual-conference-video-scrape.cjs` - Manual processing

### Existing Conference Discovery Pipeline

**Location:** `/docs/conference/CONFERENCE_PIPELINE_README.md`

A 4-phase pipeline:
1. **Discovery**: Finds conferences via Perplexity API
2. **Monitoring**: Weekly checks for published agendas
3. **Scraping**: Extracts session/speaker data with anti-hallucination safeguards
4. **Loading**: Sends to BigQuery

**Key Files:**
- `/data/conference/conference-registry-master.json` - 70 conferences registered
- `/data/conference/conference-monitor-state.json` - Tracking state
- `/data/conference/conference-extraction-progress.json` - Progress tracking

### Existing Data Infrastructure

| Component | Status | Location |
|-----------|--------|----------|
| IFTTT → Sheets → BigQuery pipeline | Production | 250+ sources |
| OpenAI enrichment (sentiment, topics) | Production | `enrichment-service` |
| Trends extraction system | Production v3.4 | `btc-trends-ui-deployment` |
| Cloud Run API layer | Production | `btcpapifunction3-1-final` |
| Reporter/Author profiles | Production | `reporter-profile-modal.tsx` |

### Existing BigQuery Schema

```sql
-- all_channels_data (and conference_data uses same schema)
Date TIMESTAMP,
Title STRING,
Content STRING,
URL STRING,
Outlet STRING,              -- Conference name
Sentiment STRING,
Image_URL STRING,
author_name STRING,         -- Primary speaker
BPI FLOAT,
Topic_1 STRING,
Topic_2 STRING,
Topic_3 STRING,
Topic_4 STRING,
Country STRING,
Funding STRING,
Outlet_Category STRING,     -- "Conference"
Political_Leaning STRING,
All_Topics STRING,
row_num INTEGER
```

---

## Part 3: Gap Analysis

### What Exists vs What's Proposed

| Proposed Feature | Existing Status | Gap |
|------------------|-----------------|-----|
| YouTube video ingestion | ✅ Built | None |
| Transcript extraction | ✅ Built (free via YouTube captions) | None |
| Speaker extraction | ✅ Built | None |
| Topic classification | ✅ Built (20 categories) | None |
| Sentiment analysis | ✅ Built | None |
| BigQuery storage | ✅ Built | None |
| Conference registry | ✅ Built (70 conferences) | None |
| Anti-hallucination safeguards | ✅ Built | None |
| **Quotable positions with timestamps** | ❌ Not built | **NEW** |
| **Regulatory signal categorization** | ❌ Not built | **NEW** |
| **Trackable predictions with deadlines** | ❌ Not built | **NEW** |
| **Cross-reference/contradiction detection** | ❌ Not built | **NEW** |
| **Speaker profile pages** | Partial (reporter profiles exist) | Extend |
| **Prediction tracker UI** | ❌ Not built | **NEW** |

### Corrected Cost Estimates

| Item | Product Estimate | Actual Cost |
|------|------------------|-------------|
| Transcription | $2-5 (Whisper) | **$0** (YouTube captions) |
| OpenAI extraction | $0.01-0.02 | $0.01-0.02 (correct) |
| Storage | Variable | Negligible (BigQuery) |
| **Total per conference** | **~$5** | **~$0.50** |

### Corrected Timeline

| Phase | Product Estimate | Actual Estimate |
|-------|------------------|-----------------|
| Core Pipeline | 2 weeks | **0** (already built) |
| Intelligence Extraction | 1 week | 1 week (new prompts) |
| UI | 1 week | 1 week |
| Advanced Features | 1 week | 1 week |
| **Total** | **4+ weeks** | **~3 weeks** |

---

## Part 4: What Would Need to Be Built

### 1. Enhanced OpenAI Extraction Prompts

Modify existing conference processing to extract structured intelligence:

```javascript
// New extraction format
{
  "quotable_positions": [{
    "speaker": "Michael Saylor",
    "company": "MicroStrategy",
    "quote": "European banks will hold Bitcoin within 18 months",
    "timestamp": "14:32",
    "topic_tags": ["institutional", "Europe", "banking"],
    "confidence_score": 0.92
  }],
  "regulatory_signals": [{
    "speaker": "Hester Peirce",
    "role": "SEC Commissioner",
    "signal_type": "policy_hint",
    "regulatory_body": "SEC",
    "policy_area": "custody",
    "sentiment": "dovish"
  }],
  "predictions": [{
    "speaker": "Cathie Wood",
    "prediction": "Spot ETF approved by January 2024",
    "target_date": "2024-01-10",
    "category": "regulation",
    "trackable": true
  }]
}
```

### 2. Schema Extensions

**Option A: Add columns to existing table**
```sql
ALTER TABLE conference_videos_staging ADD COLUMN
  extracted_quotes JSON,
  regulatory_signals JSON,
  predictions JSON,
  intel_processed_at TIMESTAMP;
```

**Option B: Create separate intelligence table**
```sql
CREATE TABLE conference_intelligence (
  intel_id STRING,
  session_id STRING,
  speaker_name STRING,
  speaker_company STRING,
  intel_type STRING,  -- quote, regulatory_signal, prediction
  content STRING,
  timestamp_seconds INTEGER,
  target_date DATE,
  is_trackable BOOLEAN,
  status STRING,  -- pending, confirmed, busted
  created_at TIMESTAMP
);
```

### 3. New API Endpoints

```
GET /api/conferences                    -- List all conferences
GET /api/conferences/{id}/sessions      -- Sessions for a conference
GET /api/speakers/{name}/history        -- All quotes by speaker
GET /api/predictions                    -- All trackable predictions
GET /api/predictions/upcoming           -- Predictions with approaching deadlines
GET /api/contradictions                 -- Cross-reference alerts
```

### 4. New UI Components

| Component | Based On Existing | Effort |
|-----------|-------------------|--------|
| Conference List Page | Similar to Trends page | Medium |
| Session Detail Modal | Similar to Trend detail | Medium |
| Speaker Profile Page | Based on ReporterProfileModal | Low |
| Prediction Tracker | New component | Medium |
| Intelligence Feed | Based on TrendStoryCard | Low |
| Quote Cards | Based on KeyHighlights | Low |

### 5. Cross-Reference Engine

New logic to detect:
- Same speaker making contradictory statements
- Company positions shifting over time
- Predictions that have passed their deadline

---

## Part 5: UI/UX Impact

### Navigation Changes

```
CURRENT                          PROPOSED
─────────────────────────────────────────────
Latest                           Latest
├── Home                         ├── Home
├── Trends                       ├── Trends
├── Search                       ├── Search
├── Compare                      ├── Compare
├── Media Radar                  ├── Media Radar
└── Intelligence                 ├── Intelligence
                                 └── 🆕 Conferences
```

### Integration Points

1. **Home Page**: New widget showing recent conference highlights
2. **Search**: Results include conference mentions alongside articles
3. **Watchlist**: Add speakers and predictions to track
4. **Trends**: Conference quotes feed into trend detection

### User Flows

1. **Discovery Flow**: Conferences → Sessions → Quotes → Speaker Profile
2. **Research Flow**: Search → Conference Mentions → Full Context
3. **Tracking Flow**: Prediction → Add to Watchlist → Status Updates
4. **Accountability Flow**: Speaker Profile → Position Timeline → Contradictions

---

## Part 6: Strategic Assessment

### Why This Proposal is Valuable

1. **Unique Market Position**
   - No competitor systematically tracks conference content
   - Creates "institutional memory" of industry discourse
   - Enables accountability journalism

2. **Leverages Existing Investment**
   - 70% of infrastructure already built
   - Same tech stack (OpenAI, BigQuery, Cloud Run)
   - Reuses existing UI patterns

3. **High User Value**
   - PR professionals can find exact quotes
   - Researchers can track executive positions over time
   - Investors can verify prediction accuracy

4. **Low Marginal Cost**
   - Transcripts are free (YouTube captions)
   - Incremental OpenAI cost ~$0.50/conference
   - Uses existing compute infrastructure

### Risks and Considerations

1. **Speaker Identification Accuracy**
   - YouTube auto-captions don't identify speakers
   - May require manual tagging or diarization
   - Solution: Start with known speakers, expand over time

2. **Prediction Verification**
   - Requires human review to mark confirmed/busted
   - Could automate some checks (price targets, dates)

3. **Legal Considerations**
   - Ensure fair use for quote extraction
   - Attribution requirements

4. **Maintenance Burden**
   - New API endpoints to maintain
   - New UI components to update
   - Cross-reference logic complexity

---

## Part 7: Implementation Recommendation

### Minimum Viable Product (MVP)

**Scope:** Intelligence extraction on existing conference data

1. **Week 1: Enhanced Extraction**
   - New OpenAI prompts for quote/prediction extraction
   - Schema extension for storing intelligence
   - Process 5-10 existing conferences as test

2. **Week 2: API + Basic UI**
   - API endpoints for conferences and speakers
   - Conference list page
   - Session detail with quotes

3. **Week 3: Advanced Features**
   - Speaker profile pages
   - Prediction tracker
   - Watchlist integration

### What to Defer

- Cross-reference/contradiction detection (complex, build later)
- Real-time live stream processing (Phase 2)
- Automated prediction verification (Phase 2)

### Success Metrics

- Number of conferences processed
- Quotes extracted per conference
- User engagement with conference content
- Prediction tracking adoption

---

## Part 8: Files Reference

### Existing Documentation
- `/docs/CONFERENCE_VIDEO_MONITORING_SYSTEM.md`
- `/docs/conference/CONFERENCE_PIPELINE_README.md`
- `/docs/conference/CONFERENCE_POST_EVENT_STRATEGY.md`
- `/docs/data-pipeline/BIGQUERY_IFTTT_FLOW_OVERVIEW.md`
- `/docs/TRENDS_SYSTEM_ARCHITECTURE.md`

### Existing Scripts
- `/scripts/conference/conference-youtube-monitor.cjs`
- `/scripts/conference/conference-agenda-scraper.cjs`
- `/scripts/conference/conference-orchestrator.cjs`
- `/scripts/conference/load-conferences-to-bigquery.cjs`

### Existing Data
- `/data/conference/conference-registry-master.json`
- `/data/conference/conference-monitor-state.json`

### UI Components to Reference
- `/src/components/dashboard/components/trend-story-card.tsx`
- `/src/components/dashboard/components/reporter-profile-modal.tsx`
- `/src/components/dashboard/sidebar.tsx`

---

## Conclusion

The product proposal demonstrates excellent strategic thinking about an untapped market opportunity. The technical architecture is reasonable but significantly overestimates the work required because it doesn't account for existing infrastructure.

**Bottom Line:** This is a 3-week project to add an intelligence layer, not a 4+ week project to build a new pipeline. The foundation exists — the unique value is in the extraction and presentation of intelligence.

**When Ready to Proceed:**
1. Review this document
2. Decide on MVP scope
3. Start with enhanced extraction prompts
4. Build incrementally from existing patterns
