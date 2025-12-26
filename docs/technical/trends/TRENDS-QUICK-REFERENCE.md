# Trends System v4.0 - Quick Reference

**Current Version**: 4.0.0-production
**Service**: btcpapifunction3-1-final
**URL**: https://btcpapifunction3-1-final-293695725781.us-central1.run.app

---

## 🎯 Quick Stats

| Metric | Value |
|--------|-------|
| Avg articles per trend | 3.0+ |
| Single-article trends | <20% |
| Emerging signal trends | 75% |
| Monthly cost | $3-5 |
| Cache hit rate | ~70% |
| Similarity threshold | 60% |

---

## 🚀 Common Commands

### Health Check
```bash
curl https://btcpapifunction3-1-final-293695725781.us-central1.run.app/
```

### Manual Extraction
```bash
curl -X POST https://btcpapifunction3-1-final-293695725781.us-central1.run.app/extract \
  -H "Content-Type: application/json" \
  -d '{"hours_back": 72}'
```

### Get Recent Trends
```bash
curl "https://btcpapifunction3-1-final-293695725781.us-central1.run.app/trends?limit=5"
```

### View Logs
```bash
gcloud run services logs read btcpapifunction3-1-final --region=us-central1 --limit=20
```

### Check Scheduler
```bash
gcloud scheduler jobs list --location=us-central1
```

---

## 📊 Key Queries

### Consolidation Performance
```sql
SELECT
  AVG(article_count) as avg_articles,
  SUM(CASE WHEN article_count = 1 THEN 1 ELSE 0 END) / COUNT(*) * 100 as pct_single,
  SUM(CASE WHEN update_count > 0 THEN 1 ELSE 0 END) as consolidated
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR);
```

### Recent Trends
```sql
SELECT title, article_count, signal_strength, update_count
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 48 HOUR)
ORDER BY article_count DESC
LIMIT 10;
```

### BigQuery Costs
```sql
SELECT
  SUM(total_bytes_processed) / POW(10, 12) * 5.0 as cost_usd
FROM `triple-upgrade-245423.region-us.INFORMATION_SCHEMA.JOBS_BY_PROJECT`
WHERE creation_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR);
```

---

## 🔧 Troubleshooting

### Single-Article Trends Still Appearing
1. Check health endpoint shows v4.0.0
2. Wait 24-48 hours for consolidation to take effect
3. Verify OpenAI prompt is updated

### No Consolidation Happening
1. Check `update_count` column in BigQuery
2. Verify cache is working (check health endpoint)
3. Review logs for "Consolidating" messages

### High Costs
1. Check BigQuery query costs (see query above)
2. Verify cache hit rate in health endpoint
3. Alert if BigQuery cost > $1/day

---

## 📁 Important Files

**Production Code:**
- `/functions/btc-trends-ui-deployment/index.js` - Main service
- `/functions/btc-trends-ui-deployment/trend-consolidation-test.js` - Helper functions

**Documentation:**
- `/docs/technical/TRENDS-SYSTEM.md` - Full technical docs
- `/docs/CHANGELOG-TRENDS-V4.md` - Version 4.0 changelog
- `/TRENDS_CONSOLIDATION_DEPLOYED.md` - Deployment summary
- `/TRENDS_FIXED_FINAL.md` - Fix details

**Database:**
- Table: `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
- Schema: Enhanced with 5 new columns (v4.0)

---

## 🎚️ Configuration

**Similarity Threshold**: 60% (line 152 in index.js)
**Cache TTL**: 15 minutes
**Lookback Window**: 72 hours
**Articles per Trend**: 3-15 (target)
**OpenAI Model**: gpt-4o-mini
**Schedule**: Every hour at :00

---

## 📈 Expected Behavior

**Hour 0**: New trends created with 3-4 articles each
**Hour 1-6**: Trends accumulate to 5-7 articles
**Hour 6-24**: Popular trends reach 8-12 articles (strong signal)
**Day 2-3**: Major stories have 15-20+ articles

---

## 🚨 Alert Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| Avg articles | <2.5 | <2.0 |
| Single-article % | >30% | >50% |
| BigQuery cost/day | >$0.50 | >$1.00 |
| Cache hit rate | <50% | <30% |

---

## 📞 Support

**Check first:**
1. Health endpoint
2. Service logs
3. BigQuery costs
4. Recent trends

**Full docs**: `/docs/technical/TRENDS-SYSTEM.md`
