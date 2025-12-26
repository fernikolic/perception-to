# Data Pipeline Documentation - Index

**Last Updated**: December 2025

---

## Quick Start

**New here?** Start with:
1. [SOURCES_DIRECTORY.md](./SOURCES_DIRECTORY.md) - Complete list of all 450+ tracked sources
2. [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) - Overview of what was deployed
3. [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Essential commands and health checks

---

## Current System Status

**Enrichment System**: DEPLOYED AND OPERATIONAL
- Cloud Run service running at: `https://enrichment-service-45998414364.us-central1.run.app`
- Two schedulers enriching data every 5 minutes
- Real-time processing: New articles enriched in 5-10 minutes
- Backfill in progress: 116K articles being fixed over 2-3 days

---

## Documentation Library

### Sources & Feeds

**[SOURCES_DIRECTORY.md](./SOURCES_DIRECTORY.md)** - Complete sources reference
- All 450+ tracked feeds organized by category
- Conferences, Crypto Media, Mainstream Media, Newsletters, Podcasts
- Press Releases, Regulatory Developments, Research, YouTube
- Feed status and activity information

### Deployment & Operations

**[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)** - Start here
- What was deployed and why
- Before/after metrics
- Cost analysis
- Next steps

**[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Day-to-day operations
- Health check commands
- Common operations
- Scheduler management
- Quick troubleshooting

**[ENRICHMENT_SYSTEM_DEPLOYMENT_FINAL.md](./ENRICHMENT_SYSTEM_DEPLOYMENT_FINAL.md)** - Complete guide
- Full system architecture
- All configuration details
- Monitoring and maintenance
- Troubleshooting guide
- File locations

**[GCP_ENRICHMENT_DEPLOYMENT.md](./GCP_ENRICHMENT_DEPLOYMENT.md)** - Step-by-step deployment
- Original deployment guide
- Detailed setup instructions
- Cloud Scheduler configuration
- Testing procedures

### Audit & Analysis

**[SENTIMENT_ENRICHMENT_AUDIT_SUMMARY.md](./SENTIMENT_ENRICHMENT_AUDIT_SUMMARY.md)**
- Initial data quality audit
- Problems identified
- Solutions proposed
- Audit queries and results

### Legacy Documentation

**[BIGQUERY_IFTTT_FLOW_OVERVIEW.md](./BIGQUERY_IFTTT_FLOW_OVERVIEW.md)**
- Original data flow (IFTTT → Sheets → BigQuery)
- How data enters the system
- Column mappings

**[BIGQUERY_SCHEMA_MANAGEMENT.md](./BIGQUERY_SCHEMA_MANAGEMENT.md)**
- Table schema details
- Column definitions
- Schema evolution

**[GOOGLE_SHEETS_APPS_SCRIPT.md](./GOOGLE_SHEETS_APPS_SCRIPT.md)**
- Apps Script functions
- Legacy enrichment logic (now replaced by Cloud Run)
- `sendDataToBigQuery()` function

**[DATA_PIPELINE_OVERVIEW.md](./DATA_PIPELINE_OVERVIEW.md)**
- High-level pipeline overview
- Data flow diagrams
- Component descriptions

---

## Common Tasks

### Check System Health

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json

# Enrichment progress
bq query --use_legacy_sql=false "
SELECT
  COUNT(*) as total,
  COUNTIF(Sentiment IS NOT NULL AND Topic_1 IS NOT NULL) as enriched,
  ROUND((COUNTIF(Sentiment IS NOT NULL AND Topic_1 IS NOT NULL) / COUNT(*)) * 100, 2) as pct_complete
FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
"

# Scheduler status
gcloud scheduler jobs list --location=us-central1 --project=triple-upgrade-245423 | grep enrichment
```

### View Logs

```bash
gcloud run services logs read enrichment-service \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --limit=50
```

### Pause/Resume Schedulers

```bash
# Pause
gcloud scheduler jobs pause enrichment-realtime --location=us-central1 --project=triple-upgrade-245423
gcloud scheduler jobs pause enrichment-backfill --location=us-central1 --project=triple-upgrade-245423

# Resume
gcloud scheduler jobs resume enrichment-realtime --location=us-central1 --project=triple-upgrade-245423
gcloud scheduler jobs resume enrichment-backfill --location=us-central1 --project=triple-upgrade-245423
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                   Current GCP Architecture                       │
└─────────────────────────────────────────────────────────────────┘

NEW DATA FLOW:
IFTTT → Google Sheets → sendDataToBigQuery() → BigQuery (unenriched)
                                                    ↓
                                    Cloud Scheduler (every 5 min)
                                                    ↓
                                    enrichment-service (Cloud Run)
                                    - OpenAI GPT-4o-mini
                                    - Sentiment analysis
                                    - Topic categorization
                                                    ↓
                                    UPDATE BigQuery (enriched)
                                                    ↓
                                    ✅ Fully enriched within 5-10 minutes

BACKFILL FLOW:
BigQuery (116K corrupted rows) → Cloud Scheduler (every 5 min)
                                            ↓
                                    enrichment-service (Cloud Run)
                                    - 500 articles per run
                                            ↓
                                    UPDATE BigQuery (fixed)
                                            ↓
                                    ✅ Complete in 2-3 days
```

---

## Key Files

### Deployed Code
- `/functions/standalone-enrichment/index.js` - Main enrichment service
- `/functions/standalone-enrichment/package.json` - Dependencies
- `/functions/standalone-enrichment/Dockerfile` - Container definition

### Documentation
- `/docs/data-pipeline/README.md` - This file
- `/docs/data-pipeline/DEPLOYMENT_SUMMARY.md` - What was deployed
- `/docs/data-pipeline/QUICK_REFERENCE.md` - Quick commands
- `/docs/data-pipeline/ENRICHMENT_SYSTEM_DEPLOYMENT_FINAL.md` - Complete guide

---

## Apps Script Configuration

### KEEP This Trigger:
- `sendDataToBigQuery()` - Runs every 5-10 minutes

### DELETE These Triggers:
- All enrichment triggers (sentiment, topics, categorization)
- Cloud Run handles all enrichment now

---

## Support & Troubleshooting

1. **Check logs first**: `gcloud run services logs read enrichment-service --region=us-central1 --limit=50`
2. **Test manually**: `curl -X GET "https://enrichment-service-45998414364.us-central1.run.app?mode=new_only&batch_size=10"`
3. **Verify schedulers**: `gcloud scheduler jobs list --location=us-central1 | grep enrichment`
4. **Check BigQuery**: Run health check query (see above)

---

## Timeline

**Day 1 (Oct 31, 2025)**:
- System deployed
- Duplicates removed
- Real-time enrichment started
- Backfill started

**Day 2-3**:
- Monitor progress
- Backfill continues

**Day 4+**:
- Backfill complete
- Pause backfill scheduler
- Real-time enrichment continues forever

---

**System Status**: FULLY OPERATIONAL
**Next Action**: Delete Apps Script enrichment triggers, monitor for 24 hours
