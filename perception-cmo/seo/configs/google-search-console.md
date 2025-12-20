# Google Search Console API Configuration

## Overview

Google Search Console API provides access to:
- Search performance data (clicks, impressions, CTR, position)
- Index coverage status
- URL inspection
- Sitemap management
- Mobile usability issues

## Setup Instructions

### 1. Enable the API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `triple-upgrade-245423`
3. Navigate to **APIs & Services > Library**
4. Search for "Search Console API"
5. Click **Enable**

### 2. Create Credentials

1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > Service Account**
3. Name: `seo-agent-service-account`
4. Grant role: **Search Console API User**
5. Download JSON key file
6. Store securely (do not commit to git)

### 3. Add Service Account to Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select property: `perception.to`
3. Go to **Settings > Users and permissions**
4. Click **Add user**
5. Add the service account email (from JSON key)
6. Grant **Full** permission

### 4. Environment Variables

Add to `.env` (do not commit):

```bash
GOOGLE_SEARCH_CONSOLE_PROPERTY=https://perception.to/
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
```

Or set the JSON content directly:

```bash
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account","project_id":"triple-upgrade-245423",...}'
```

## API Usage Examples

### Get Search Performance Data

```typescript
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

const searchconsole = google.searchconsole({ version: 'v1', auth });

// Get search analytics
const response = await searchconsole.searchanalytics.query({
  siteUrl: 'https://perception.to/',
  requestBody: {
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    dimensions: ['query', 'page'],
    rowLimit: 1000,
  },
});

console.log(response.data.rows);
```

### Check Index Coverage

```typescript
const response = await searchconsole.urlInspection.index.inspect({
  requestBody: {
    inspectionUrl: 'https://perception.to/',
    siteUrl: 'https://perception.to/',
  },
});

console.log(response.data.inspectionResult);
```

### Submit Sitemap

```typescript
await searchconsole.sitemaps.submit({
  siteUrl: 'https://perception.to/',
  feedpath: 'https://perception.to/sitemap.xml',
});
```

## Key Metrics to Track

### Performance Metrics
- **Clicks**: Total clicks from Google Search
- **Impressions**: Times pages appeared in results
- **CTR**: Click-through rate (clicks/impressions)
- **Position**: Average ranking position

### By Dimension
- **Query**: Which keywords are driving traffic
- **Page**: Which pages are performing
- **Country**: Geographic distribution
- **Device**: Mobile vs desktop

### Monitoring Queries

```typescript
// Target keywords to monitor
const targetKeywords = [
  'crypto media monitoring',
  'bitcoin media intelligence',
  'crypto PR tools',
  'bitcoin coverage tracking',
  'crypto narrative monitoring',
  'crypto sentiment analysis tool',
  'perception vs lunarcrush',
  'perception vs santiment',
];

// Filter for target keywords
const targetData = response.data.rows.filter(row =>
  targetKeywords.some(keyword =>
    row.keys[0].toLowerCase().includes(keyword)
  )
);
```

## Scheduled Tasks

### Daily
- Check for new queries appearing
- Monitor position changes for target keywords
- Check for crawl errors

### Weekly
- Generate performance report
- Compare week-over-week metrics
- Review index coverage

### Monthly
- Full keyword analysis
- Content gap identification
- Competitor comparison

## Troubleshooting

### "Permission denied" Error
- Verify service account email is added to Search Console
- Check that correct property URL is used
- Ensure API is enabled in GCP

### "Quota exceeded" Error
- Default quota: 1,200 queries/minute
- Implement rate limiting
- Cache responses where possible

### No Data Returned
- Property must have data (new sites may take weeks)
- Check date range is valid
- Verify dimensions requested are available
