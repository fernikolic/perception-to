# Perception Documentation Index

Last Updated: December 22, 2025

## Charts & Data Visualization

### Chart Data Aggregation System
📊 **[Chart Data Aggregation](./features/CHART_DATA_AGGREGATION.md)**
- Daily/weekly/monthly time period handling
- Server-side vs client-side data processing
- Volume and sentiment data merging
- Critical date key matching requirements
- Troubleshooting common issues

---

## Spaces & Report Generation

### Spaces Storage Optimization
📦 **[Spaces Storage Optimization](./features/SPACES_STORAGE_OPTIMIZATION.md)**
- Metadata-only storage (solves Firestore 1MB limit)
- Smart sampling strategy for large datasets
- On-demand content enrichment from BigQuery
- Tier 1 outlet prioritization
- Deduplication of similar stories

---

## Email & Notifications

### Watchlist Alert System
📧 **[Email Design System](./email/EMAIL_DESIGN_SYSTEM.md)**
- Real-time alerts (every 30 minutes)
- Weekly digest reports
- Professional email templates
- Rate limiting and user preferences
- Admin dashboard at `/admin/watchlist-alerts`

### Weekly Reports
📊 **[Weekly Watchlist Reports](./features/weekly-watchlist-reports.md)**
- Automated weekly email summaries
- AI-powered analysis (GPT-4o)
- Week-over-week comparison metrics
- Report history archive

---

## Backend Infrastructure

### Bitcoin Price Caching System
📊 **[Bitcoin Price Cache Documentation](./backend/BITCOIN_PRICE_CACHE.md)**
- Scheduled Firebase Functions for real-time market data
- Firestore caching strategy to avoid API rate limits
- Frontend integration with React hooks
- Monitoring and troubleshooting guide

### Author Name Backfill & Data Consolidation
📝 **[Author Backfill Documentation](./AUTHOR-BACKFILL-AND-DATA-CONSOLIDATION.md)**
- Intelligent author name extraction from messy data
- BigQuery data consolidation from multiple CSV sources
- Complete data pipeline for enrichment and insertion
- 49,754 URLs prepared for sentiment, BPI, country enrichment

## Quick Brief Feature

Complete documentation for the Quick Brief generation system (v12 - Production).

### Quick Start
📄 **[Quick Brief Overview](./quick-brief/README.md)**
- System architecture
- Key features
- Usage instructions
- Cost analysis
- Performance metrics

### Technical Documentation
🔧 **[Technical Implementation Details](./quick-brief/TECHNICAL_DETAILS.md)**
- Core functions and algorithms
- Data structures
- BigQuery optimization
- Error handling
- Security
- Deployment guide

### Version History
📚 **[Version History (v1-v12)](./quick-brief/VERSION_HISTORY.md)**
- Evolution from v1 to v12
- User feedback that drove changes
- Technical improvements
- Version comparison table
- Migration guide

### Sample Outputs
📊 **[Sample Generated Briefs](./quick-brief/samples/README.md)**
- v12 (Production): Semantic article sampling
- v11: Pattern-based extraction
- v10: Historical context visible
- Quality comparison

---

## Feature Status

| Feature | Version | Status | Documentation |
|---------|---------|--------|---------------|
| Quick Brief Generator | v12 | ✅ Production | [README](./quick-brief/README.md) |
| Historical Saturation Analysis | v12 | ✅ Production | [Technical Details](./quick-brief/TECHNICAL_DETAILS.md#historical-analysis) |
| Media Categorization | v8+ | ✅ Production | [Version History](./quick-brief/VERSION_HISTORY.md#v8) |
| Banned Phrase Prevention | v7+ | ✅ Production | [Technical Details](./quick-brief/TECHNICAL_DETAILS.md#post-processing) |

---

## Quick Access

### Backend & Infrastructure

1. **Bitcoin Price Caching:** [Bitcoin Price Cache](./backend/BITCOIN_PRICE_CACHE.md)
2. **Author Backfill & Data Consolidation:** [Complete Documentation](./AUTHOR-BACKFILL-AND-DATA-CONSOLIDATION.md)
3. **Backend Functions:** [Functions Overview](./backend/functions/)
4. **Data Pipeline:** [Data Pipeline Overview](./backend/DATA_PIPELINE_OVERVIEW.md)

### Quick Brief Feature

1. **For Product Overview:** [Quick Brief README](./quick-brief/README.md)
2. **For Implementation Details:** [Technical Details](./quick-brief/TECHNICAL_DETAILS.md)
3. **For Understanding Evolution:** [Version History](./quick-brief/VERSION_HISTORY.md)
4. **For Examples:** [Sample Outputs](./quick-brief/samples/README.md)

### Code Files

- **Main Generator:** `/functions/src/quick-brief-generator.ts` (1,800+ lines)
- **Test Script:** `/functions/test-brief-v5.ts`
- **Frontend Integration:** `/src/components/quick-brief-modal.tsx`

---

## Development Timeline

```
September 2025  → v1-v5: Initial development
October 1-3     → v6-v8: Media categorization fixes
October 4       → v9: Historical analysis (hidden from users)
October 5       → v10: Historical visible + specific recommendations (9/10)
October 5       → v11: Pattern-based extraction (7/10, boilerplate issue)
October 5       → v12: Semantic article sampling (9.5/10, PRODUCTION) ✅
```

---

## Key Metrics (v12)

- **Generation Time:** 100-130 seconds
- **Cost per Brief:** $0.17
- **Data Analyzed:** 434,617+ articles in BigQuery
- **Historical Sample:** 36 articles (12 months)
- **Current Sample:** 100 articles (30 days)
- **Token Usage:** ~167,000 per brief
- **Quality Rating:** 9.5/10

---

## Future Roadmap

### Planned Enhancements

1. **Performance Optimization (Q4 2025)**
   - Pre-compute historical analysis nightly
   - Reduce generation time: 120s → 40s
   - Status: Not started

2. **Reporter Intelligence (Q1 2026)**
   - Track individual reporter coverage patterns
   - Recommend specific reporters to pitch
   - Status: Design phase

3. **Competitive Analysis (Q1 2026)**
   - Compare keyword to related keywords
   - Show competitive landscape
   - Status: Planning

### Completed Features

- ✅ Historical narrative saturation analysis (v9)
- ✅ Semantic article sampling (v12)
- ✅ Media categorization (v8)
- ✅ Evidence-based recommendations (v6)
- ✅ Banned phrase prevention (v7)

---

## Contributing

When adding new features or documentation:

1. **Update Version History:** Document changes in `/docs/quick-brief/VERSION_HISTORY.md`
2. **Update Technical Details:** Add implementation details to `/docs/quick-brief/TECHNICAL_DETAILS.md`
3. **Generate Samples:** Run test script and save output to `/docs/quick-brief/samples/`
4. **Update This Index:** Add new documentation links here

---

## Support

For questions or issues:
- **Technical Issues:** Check [Technical Details](./quick-brief/TECHNICAL_DETAILS.md#error-handling)
- **Feature Requests:** See [Future Roadmap](#future-roadmap)
- **Bug Reports:** Create issue with sample output from `/docs/quick-brief/samples/`

---

## Change Log

| Date | Change | Files Updated |
|------|--------|---------------|
| 2025-12-22 | Chart data aggregation docs + fix weekly sentiment display | unified-research.tsx, CHART_DATA_AGGREGATION.md |
| 2025-12-07 | Fix report generation detection when navigating away | space-detail.tsx, SPACES_STORAGE_OPTIMIZATION.md |
| 2025-12-07 | Spaces storage optimization (metadata-only, smart sampling) | SPACES_STORAGE_OPTIMIZATION.md, use-spaces.ts, bigquery-search.ts |
| 2025-12-02 | Real-time watchlist alerts + admin dashboard | EMAIL_DESIGN_SYSTEM.md, watchlist-alerts-admin.tsx, DECEMBER_2025_UPDATES.md |
| 2025-12-02 | Embeddings-based trend deduplication (V4.0) | btc-trends-ui-deployment/index.js, TRENDS_EMBEDDINGS_DEDUPLICATION_DEC_2025.md |
| 2025-10-19 | Author backfill & data consolidation documentation | AUTHOR-BACKFILL-AND-DATA-CONSOLIDATION.md, INDEX.md |
| 2025-10-19 | Final dataset prepared: 49,754 URLs with full schema | FINAL-COMPLETE-For-Enrichment.csv |
| 2025-10-07 | Bitcoin Price Cache system documentation | BITCOIN_PRICE_CACHE.md, INDEX.md |
| 2025-10-05 | Created comprehensive documentation | All docs/* files |
| 2025-10-05 | v12 production release | VERSION_HISTORY.md, samples/* |
| 2025-10-05 | Organized documentation structure | INDEX.md (this file) |
