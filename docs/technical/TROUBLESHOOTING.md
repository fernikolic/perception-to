# Trends System Troubleshooting Checklist

Quick reference guide for common trends system issues.

## 🚨 Emergency Checklist

### Categories Showing Only 4 Items with Low Counts

**Quick Fix:**
```bash
# 1. Test API directly (should return ~15 categories)
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/intelligence/categories?hours=8760"

# 2. Check frontend fetchCategories function
# File: /src/components/dashboard/pages/trends.tsx
# Ensure: hours: 8760 (not 24)
```

**Root Causes:**
- ❌ `fetchCategories` using `hours: 24` instead of `hours: 8760`
- ❌ Wrong API URL (`293695725781` instead of `45998414364`)
- ❌ Cache issues (add `cacheBuster: Date.now()`)

### No New Trends Appearing

**Quick Fix:**
```bash
# 1. Check scheduler job exists
gcloud scheduler jobs list --location=us-central1

# 2. Check API is working
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?hours=24&limit=5"

# 3. Check service logs
gcloud run services logs read btcpapifunction3-1-final --region=us-central1 --limit=10
```

**Root Causes:**
- ❌ Missing scheduler job `trends-hourly-update`
- ❌ Wrong API URLs in frontend
- ❌ Missing OpenAI API key environment variable

## 🔧 API URL Verification

### Critical Files to Check:
1. `/src/lib/api/trends.ts` → `API_BASE_URL_V3`
2. `/src/lib/api/base.ts` → `TRENDS_API_URL`

### Correct URLs:
```javascript
// ✅ CORRECT
const API_BASE_URL_V3 = 'https://btcpapifunction3-1-final-45998414364.us-central1.run.app';
export const TRENDS_API_URL = 'https://btcpapifunction3-1-final-45998414364.us-central1.run.app';

// ❌ WRONG (old inactive service)
const API_BASE_URL_V3 = 'https://btcpapifunction3-1-final-293695725781.us-central1.run.app';
```

## 🔍 Quick Tests

### Test Categories API:
```bash
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/intelligence/categories?hours=8760" | jq '.'

# Expected: ~15 categories with varied counts
# Broken: 4 categories with count=1 each
```

### Test Trends API:
```bash
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?hours=24&limit=3" | jq 'length'

# Expected: 3-5 recent trends
# Broken: Empty array or old trends
```

### Test Extract Function:
```bash
curl -X POST "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract" \
  -H "Content-Type: application/json" \
  -d '{"hours_back": 24}'

# Expected: Success message with trends generated
# Broken: OpenAI API error or 500 error
```

## 🛠 Common Fixes

### 1. Recreate Missing Scheduler Job:
```bash
gcloud scheduler jobs create http trends-hourly-update \
  --location=us-central1 \
  --schedule="0 * * * *" \
  --uri="https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract" \
  --project=triple-upgrade-245423
```

### 2. Add Missing OpenAI API Key:
```bash
gcloud run services update btcpapifunction3-1-final \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --update-env-vars="OPENAI_API_KEY_V2=your_openai_key_here"
```

### 3. Force Frontend Cache Refresh:
- Hard refresh browser (Cmd+Shift+R)
- Clear localStorage/sessionStorage
- Add `cacheBuster: Date.now()` to API calls

## 📊 Monitoring Commands

### Check System Status:
```bash
# Scheduler status
gcloud scheduler jobs list --location=us-central1

# Service status
gcloud run services list --region=us-central1 --filter="name:btcpapifunction3-1-final"

# Recent logs
gcloud run services logs read btcpapifunction3-1-final --region=us-central1 --limit=20
```

### Check Data Pipeline:
```sql
-- Recent trends count
SELECT DATE(generated_at) as date, COUNT(*) as trends
FROM `triple-upgrade-245423.btcp_main_dataset.ai_trends_tracking`
WHERE generated_at >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY date ORDER BY date DESC;

-- Article ingestion
SELECT DATE(date) as date, COUNT(*) as articles
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7)
GROUP BY date ORDER BY date DESC;
```

## 🚨 Emergency Contacts

- **Technical Issues**: Check GitHub issues
- **API Outages**: Monitor Cloud Run service health
- **Data Issues**: Query BigQuery directly

---

**Last Updated**: September 2025
**Next Review**: When new issues are discovered