# Metadata Enrichment System

**Status**: ✅ Active
**Last Updated**: October 26, 2025
**Owner**: Data Pipeline Team

## Overview

The Metadata Enrichment System automatically fills missing `Image_URL` and `author_name` fields for articles in the BigQuery `all_channels_data` table. This system addresses gaps in the IFTTT → Google Sheets → BigQuery pipeline by scraping article pages to extract metadata.

### Purpose

- **Problem**: Some articles from IFTTT feeds arrive without image URLs or author names
- **Impact**: Missing images reduce user engagement on trends page; missing authors reduce content credibility
- **Solution**: Automated web scraping using Scrape.do API to extract Open Graph metadata

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Data Flow Overview                            │
└─────────────────────────────────────────────────────────────────┘

IFTTT RSS Feeds
      ↓
Google Sheets (bridge-sheet-bitcoin)
      ↓
BigQuery (all_channels_data)
      ↓
[Missing metadata detected]
      ↓
Cloud Scheduler (every 30 min)
      ↓
backfillMissingImages Function
      ↓
Scrape.do API
      ↓
Extract og:image + author meta tags
      ↓
UPDATE BigQuery with metadata
```

---

## Components

### 1. Cloud Function: `backfillMissingImages`

**Location**: `/functions/src/backfill-missing-images.ts`
**Type**: Firebase Cloud Function v2 (HTTP)
**Region**: us-central1
**Memory**: 512MiB
**Timeout**: 300 seconds (5 minutes)
**URL**: https://backfillmissingimages-bybdtt43xa-uc.a.run.app

#### Function Logic

1. **Query BigQuery** for articles with missing metadata:
   ```sql
   SELECT URL, Title, Image_URL, author_name
   FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
   WHERE
     ((Image_URL IS NULL OR Image_URL = '') OR (author_name IS NULL OR author_name = ''))
     AND URL NOT LIKE '%reddit.com%'
     AND URL NOT LIKE '%twitter.com%'
     AND URL NOT LIKE '%x.com%'
     AND URL NOT LIKE '%stacker.news%'
     AND URL NOT LIKE '%github.com%'
     AND URL NOT LIKE '%spotify.com%'
     AND URL NOT LIKE '%decrypt.co/videos%'
     AND URL IS NOT NULL
     AND Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR)
   ORDER BY Date DESC
   LIMIT 50
   ```

2. **Scrape each article** using Scrape.do:
   ```typescript
   const scrapeDoUrl = `http://api.scrape.do?token=${SCRAPEDO_API_KEY}&url=${encodeURIComponent(articleUrl)}`;
   const response = await axios.get(scrapeDoUrl, { timeout: 15000 });
   ```

3. **Extract metadata** from HTML:
   - **Images**: Open Graph and Twitter meta tags
     - `<meta property="og:image" content="..."/>`
     - `<meta property="twitter:image" content="..."/>`
   - **Authors**: Multiple patterns
     - `<meta name="author" content="..."/>`
     - `<meta property="article:author" content="..."/>`
     - `<meta property="twitter:creator" content="..."/>`
     - JSON-LD structured data

4. **Update BigQuery** with discovered metadata:
   ```sql
   UPDATE `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
   SET Image_URL = @imageUrl, author_name = @authorName
   WHERE URL = @url
   ```

5. **Rate limiting**: 500ms delay between requests

#### Response Format

```json
{
  "success": true,
  "processed": 15,
  "imagesUpdated": 12,
  "authorsUpdated": 8,
  "failedCount": 3,
  "duration": 23450,
  "message": "Processed 15 articles in 23.5s. Updated 12 images and 8 authors."
}
```

---

### 2. Cloud Scheduler Job

**Name**: `backfill-metadata-scheduler`
**Schedule**: `*/30 * * * *` (every 30 minutes)
**Target**: Cloud Run HTTP endpoint
**Timezone**: UTC
**Created**: October 26, 2025

#### Scheduler Configuration

```bash
gcloud scheduler jobs create http backfill-metadata-scheduler \
  --schedule="*/30 * * * *" \
  --uri="https://backfillmissingimages-bybdtt43xa-uc.a.run.app" \
  --http-method=GET \
  --location=us-central1 \
  --project=triple-upgrade-245423
```

---

### 3. Scrape.do Integration

**Service**: Scrape.do Web Scraping API
**API Key**: Stored in Cloud Run environment variable `SCRAPEDO_API_KEY`
**Rate Limit**: As per Scrape.do plan
**Timeout**: 15 seconds per request

#### Scrape.do Features Used

- Automatic JavaScript rendering
- Bot detection bypass
- Rotating proxies
- CAPTCHA handling

---

## Deployment

### Initial Deployment

```bash
cd /Users/fernandonikolic/perception/functions

# Deploy function
firebase deploy --only functions:backfillMissingImages --project triple-upgrade-245423

# Set environment variable (required after each deployment)
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
  gcloud run services update backfillmissingimages \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --update-env-vars="SCRAPEDO_API_KEY=YOUR_API_KEY_HERE"

# Create Cloud Scheduler job
gcloud scheduler jobs create http backfill-metadata-scheduler \
  --schedule="*/30 * * * *" \
  --uri="https://backfillmissingimages-bybdtt43xa-uc.a.run.app" \
  --http-method=GET \
  --location=us-central1 \
  --project=triple-upgrade-245423
```

### Update Deployment

```bash
# Update function code
firebase deploy --only functions:backfillMissingImages --project triple-upgrade-245423

# Re-set environment variable (environment vars are lost on redeploy)
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
  gcloud run services update backfillmissingimages \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --update-env-vars="SCRAPEDO_API_KEY=YOUR_API_KEY_HERE"
```

**⚠️ Important**: The `SCRAPEDO_API_KEY` environment variable must be re-set after every deployment because Firebase Functions v2 doesn't persist custom environment variables from `.env.yaml` files.

---

## Configuration

### Environment Variables

| Variable | Location | Purpose |
|----------|----------|---------|
| `SCRAPEDO_API_KEY` | Cloud Run | Scrape.do API authentication |
| `GOOGLE_APPLICATION_CREDENTIALS` | Local dev only | BigQuery authentication (auto in Cloud Run) |

### Function Parameters

| Parameter | Value | Reason |
|-----------|-------|--------|
| `BATCH_SIZE` | 50 | Process 50 articles per run to stay within 5-minute timeout |
| `LOOKBACK_WINDOW` | 24 hours | Only process recent articles (IFTTT pipeline works well for most) |
| `REQUEST_DELAY` | 500ms | Prevent rate limiting and respect Scrape.do limits |

### Excluded Domains

The following domains are excluded from scraping (not suitable for metadata extraction):

- `reddit.com` - User-generated content, no article metadata
- `twitter.com` / `x.com` - Social media, different structure
- `stacker.news` - Bitcoin forum, no standard metadata
- `github.com` - Code repositories, not news articles
- `spotify.com` - Podcast/audio platform
- `decrypt.co/videos` - Video content, different metadata structure

---

## Monitoring

### Success Metrics

Monitor these metrics to ensure system health:

1. **Processing Rate**
   - Target: 50 articles per run (if available)
   - Check: Cloud Function logs

2. **Success Rate**
   - **Images**: ~70-90% success rate (depends on site quality)
   - **Authors**: ~40-60% success rate (many sites don't include author metadata)
   - Check: Function response JSON

3. **Execution Time**
   - Target: < 60 seconds for full batch
   - Limit: 300 seconds (function timeout)
   - Check: Function logs `duration` field

4. **BigQuery DML Quota**
   - Limit: 1,500 DML statements per table per day
   - Current usage: ~48 updates per day (50 articles × 30 min schedule × 24 hours / 1440 minutes = 50)
   - Check: BigQuery console

### Cloud Function Logs

```bash
# View recent logs
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
  gcloud run services logs read backfillmissingimages \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --limit=50
```

### Key Log Patterns

```
[BackfillMetadata] Starting image and author backfill process...
[BackfillMetadata] Found 15 articles needing metadata
[BackfillMetadata] Scraping: https://example.com/article
[BackfillMetadata] ✓ Updated https://example.com/article -> image: https://..., author: John Doe
[BackfillMetadata] ✗ No metadata found for: https://example.com/article
[BackfillMetadata] Completed in 23450ms. Images: 12, Authors: 8, Failed: 3
```

### Cloud Scheduler Status

```bash
# Check scheduler job status
gcloud scheduler jobs describe backfill-metadata-scheduler \
  --location=us-central1 \
  --project=triple-upgrade-245423
```

---

## Troubleshooting

### Issue: Function Returns "SCRAPEDO_API_KEY not configured"

**Cause**: Environment variable was lost during redeployment

**Solution**:
```bash
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
  gcloud run services update backfillmissingimages \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --update-env-vars="SCRAPEDO_API_KEY=YOUR_API_KEY_HERE"
```

### Issue: No Articles Being Processed

**Possible Causes**:
1. All recent articles already have metadata (✅ good!)
2. IFTTT pipeline is working correctly
3. Query time window is too narrow

**Check**:
```sql
-- Check for articles missing metadata
SELECT COUNT(*) as missing_count
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE
  ((Image_URL IS NULL OR Image_URL = '') OR (author_name IS NULL OR author_name = ''))
  AND Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR)
```

### Issue: Low Author Success Rate

**Cause**: Many news sites don't include author metadata in `<meta>` tags

**Expected**: 40-60% success rate is normal

**Examples of Difficult Sites**:
- Syndicated content (e.g., La Nacion publishing The Economist articles)
- News aggregators
- Sites using byline in article text but not in metadata

**Not a bug** - this is a limitation of web scraping for author data.

### Issue: Scrape.do Rate Limiting

**Symptoms**: Multiple failed requests in logs

**Solutions**:
1. Increase `REQUEST_DELAY` in code (currently 500ms)
2. Reduce `BATCH_SIZE` (currently 50)
3. Upgrade Scrape.do plan

### Issue: Function Timeout

**Symptoms**: Function logs show timeout after 300 seconds

**Solutions**:
1. Reduce `BATCH_SIZE` from 50 to 25
2. Reduce `REQUEST_DELAY` from 500ms to 300ms (if not rate limited)
3. Increase function timeout (max 540 seconds for Cloud Run)

---

## Performance & Costs

### Execution Costs

**Cloud Function**:
- Invocations: 48 per day (every 30 minutes)
- Duration: ~30 seconds average
- Memory: 512MiB
- **Estimated cost**: $0.10/month

**Cloud Scheduler**:
- Jobs: 1
- Frequency: 48 executions/day
- **Estimated cost**: $0.10/month

**Scrape.do**:
- Requests: ~100-500 per day (depends on missing articles)
- **Cost**: Per Scrape.do plan pricing

**BigQuery**:
- DML updates: ~100-500 per day
- Storage: Negligible (only updating existing rows)
- **Estimated cost**: < $0.01/month

**Total estimated cost**: ~$0.20/month + Scrape.do API costs

### Resource Usage

- **BigQuery DML Quota**: ~50-500 of 1,500 daily limit (3-33%)
- **Cloud Run concurrency**: 1 request at a time (scheduled)
- **Network**: ~50-500 MB per day (HTML downloads)

---

## Future Improvements

### Potential Enhancements

1. **Batch BigQuery Updates**
   - Current: Individual UPDATE per article
   - Proposed: Batch updates in single transaction
   - Benefit: Reduce DML quota usage by 90%

2. **Intelligent Retry Logic**
   - Current: No retry for failed scrapes
   - Proposed: Exponential backoff for transient failures
   - Benefit: Higher success rate

3. **Domain-Specific Extractors**
   - Current: Generic meta tag extraction
   - Proposed: Custom extractors for common domains (Bloomberg, CoinDesk, etc.)
   - Benefit: Higher author extraction rate (60% → 80%)

4. **Caching Layer**
   - Current: Scrape every time
   - Proposed: Cache scraped metadata in Firestore
   - Benefit: Reduce Scrape.do costs for duplicate URLs

5. **Machine Learning for Author Extraction**
   - Current: Regex pattern matching
   - Proposed: NLP model to extract authors from article text
   - Benefit: 80%+ author extraction rate

6. **Alert System**
   - Current: Manual log checking
   - Proposed: Alert if success rate drops below 50%
   - Benefit: Faster issue detection

---

## Testing

### Manual Testing

```bash
# Test function manually
curl -X GET "https://backfillmissingimages-bybdtt43xa-uc.a.run.app"

# Expected response
{
  "success": true,
  "processed": 15,
  "imagesUpdated": 12,
  "authorsUpdated": 8,
  "failedCount": 3,
  "duration": 23450,
  "message": "Processed 15 articles in 23.5s. Updated 12 images and 8 authors."
}
```

### Test Scrape.do Directly

```bash
# Test image extraction
curl -s "http://api.scrape.do?token=YOUR_API_KEY&url=https://www.coindesk.com/some-article" \
  | grep -E "(og:image|twitter:image)" | head -5

# Test author extraction
curl -s "http://api.scrape.do?token=YOUR_API_KEY&url=https://www.coindesk.com/some-article" \
  | grep -E "(author|article:author)" | head -5
```

### Integration Testing

```sql
-- 1. Find an article with missing metadata
SELECT URL, Image_URL, author_name
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE Image_URL IS NULL
LIMIT 1;

-- 2. Run function (manual or wait for scheduler)

-- 3. Verify metadata was added
SELECT URL, Image_URL, author_name
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE URL = 'https://example.com/article';
```

---

## Related Documentation

- [BigQuery IFTTT Flow Overview](./BIGQUERY_IFTTT_FLOW_OVERVIEW.md)
- [Author Backfill and Data Consolidation](./AUTHOR-BACKFILL-AND-DATA-CONSOLIDATION.md)
- [MSM Author Backfill](./MSM_AUTHOR_BACKFILL.md)
- [Google Sheets Apps Script](./GOOGLE_SHEETS_APPS_SCRIPT.md)

---

## API Reference

### Scrape.do API

**Endpoint**: `http://api.scrape.do`

**Parameters**:
- `token`: API authentication key (required)
- `url`: Target URL to scrape (required, URL-encoded)

**Example**:
```bash
curl "http://api.scrape.do?token=YOUR_KEY&url=https%3A%2F%2Fexample.com"
```

**Response**: Raw HTML of the page

---

## Metadata Extraction Patterns

### Image Patterns (in order of priority)

```typescript
const imagePatterns = [
  /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i,
  /<meta\s+name=["']og:image["']\s+content=["']([^"']+)["']/i,
  /<meta\s+property=["']twitter:image["']\s+content=["']([^"']+)["']/i,
  /<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i,
];
```

### Author Patterns (in order of priority)

```typescript
const authorPatterns = [
  /<meta\s+(?:name|property)=["']author["']\s+content=["']([^"']+)["']/i,
  /<meta\s+(?:name|property)=["']article:author["']\s+content=["']([^"']+)["']/i,
  /<meta\s+(?:name|property)=["']twitter:creator["']\s+content=["']([^"']+)["']/i,
  /<span\s+class=["'][^"']*author[^"']*["'][^>]*>([^<]+)<\/span>/i,
  /<a\s+(?:rel=["']author["']|class=["'][^"']*author[^"']*["'])[^>]*>([^<]+)<\/a>/i,
  /"author":\s*{\s*"name":\s*"([^"]+)"/i,  // JSON-LD
];
```

### Validation

**Images**:
- Must start with `http://` or `https://`
- Must not be empty string

**Authors**:
- Cleaned: Remove leading `@` symbols
- Normalized: Replace multiple spaces with single space
- Length: Between 1 and 100 characters

---

## Support & Maintenance

**Primary Maintainer**: Data Pipeline Team
**Emergency Contact**: dev-team@perception.to
**On-Call Rotation**: See [team schedule]

### Maintenance Schedule

- **Daily**: Monitor logs for errors
- **Weekly**: Review success rates
- **Monthly**: Check Scrape.do API usage and costs
- **Quarterly**: Evaluate and implement improvements

---

## Changelog

### v1.0.0 - October 26, 2025
- ✅ Initial release
- ✅ Automated metadata enrichment for images and authors
- ✅ Cloud Scheduler integration (every 30 minutes)
- ✅ Scrape.do integration with rate limiting
- ✅ BigQuery UPDATE support for live table
- ✅ Comprehensive logging and monitoring

### Planned for v1.1.0
- 🔄 Batch BigQuery updates
- 🔄 Retry logic for failed scrapes
- 🔄 Alert system for low success rates
