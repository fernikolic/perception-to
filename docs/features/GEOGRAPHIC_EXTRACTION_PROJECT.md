# Geographic Entity Extraction - Article-Level Implementation

**Created:** November 28, 2025
**Updated:** December 4, 2025
**Status:** Planning
**Priority:** Feature Enhancement
**Estimated Cost:** $50-100 (backfill) + ~$5/month (ongoing)

---

## ⚠️ Pre-Implementation Checklist

Before starting the backfill, complete these validation steps:

1. [ ] **Test on 200 random articles** - Verify extraction accuracy manually
2. [ ] **Check "global" percentage** - If >70% have no countries, reconsider the feature
3. [ ] **Validate ISO code normalization** - Ensure UK→GB, UAE→AE mappings work
4. [ ] **Confirm use case** - Who uses this globe? What decisions does it enable?

---

## Executive Summary

This project adds **article-level geographic extraction** to identify countries, regions, and cities mentioned in Bitcoin news articles. This enables:

- Real-time globe visualization of "where news is happening"
- Geographic filtering and analysis
- Regional trend identification
- Jurisdiction-specific regulatory tracking

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Database Schema Changes](#2-database-schema-changes)
3. [Phase 1: Real-Time Extraction](#3-phase-1-real-time-extraction)
4. [Phase 2: Historical Backfill](#4-phase-2-historical-backfill)
5. [Phase 3: API & Frontend](#5-phase-3-api--frontend)
6. [Cost Analysis](#6-cost-analysis)
7. [Implementation Scripts](#7-implementation-scripts)
8. [Monitoring & Validation](#8-monitoring--validation)
9. [Known Limitations & Considerations](#9-known-limitations--considerations)
10. [Future Enhancements](#10-future-enhancements)

---

## 1. Architecture Overview

### Current Data Flow

```
IFTTT → Google Sheets → Apps Script → BigQuery (all_channels_data)
                                           ↓
                              Cloud Run (enrichment-service)
                              - Sentiment analysis
                              - Topic categorization
                                           ↓
                              BigQuery (enriched articles)
```

### New Data Flow (With Geographic Extraction)

```
IFTTT → Google Sheets → Apps Script → BigQuery (all_channels_data)
                                           ↓
                              Cloud Run (enrichment-service) ← MODIFY
                              - Sentiment analysis
                              - Topic categorization
                              - Geographic extraction ← NEW
                                           ↓
                              BigQuery (enriched articles with locations)
                                           ↓
                              API endpoints ← NEW
                                           ↓
                              Frontend globe visualization ← NEW
```

### Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Extraction method | OpenAI GPT-4o-mini | Already using for sentiment/topics, consistent quality |
| Storage granularity | Article-level | Enables aggregation at any level (trend, time, outlet) |
| Location format | ISO 3166-1 alpha-2 codes + display names | Standard format, easy to map to globe coordinates |
| Backfill approach | CSV export → process → upload | Proven pattern, cost-effective, resumable |

---

## 2. Database Schema Changes

### 2.1 New Columns for `all_channels_data`

Add these columns to the main articles table:

```sql
-- Run this ALTER TABLE statement
ALTER TABLE `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
ADD COLUMN IF NOT EXISTS mentioned_countries STRING,
ADD COLUMN IF NOT EXISTS mentioned_regions STRING,
ADD COLUMN IF NOT EXISTS mentioned_cities STRING,
ADD COLUMN IF NOT EXISTS geographic_scope STRING,
ADD COLUMN IF NOT EXISTS primary_country STRING,
ADD COLUMN IF NOT EXISTS geo_extraction_version STRING;
```

### 2.2 Column Definitions

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `mentioned_countries` | STRING | Comma-separated ISO country codes | `"US,SV,SG"` |
| `mentioned_regions` | STRING | Comma-separated region names | `"EU,Asia Pacific,Latin America"` |
| `mentioned_cities` | STRING | Comma-separated city names | `"Miami,Singapore,Hong Kong"` |
| `geographic_scope` | STRING | Overall scope of the article | `"global"`, `"regional"`, `"local"` |
| `primary_country` | STRING | Main country focus (if any) | `"US"` |
| `geo_extraction_version` | STRING | Version of extraction logic | `"1.0"` |

### 2.3 Reference Data: Country Mappings

Create a reference table for country metadata:

```sql
CREATE TABLE IF NOT EXISTS `triple-upgrade-245423.btcp_main_dataset.geo_reference_countries` (
  iso_code STRING NOT NULL,           -- "US"
  display_name STRING NOT NULL,       -- "United States"
  region STRING,                      -- "North America"
  subregion STRING,                   -- "Northern America"
  latitude FLOAT64,                   -- 37.0902
  longitude FLOAT64,                  -- -95.7129
  bitcoin_relevance STRING            -- "high" (US, SV, SG) / "medium" / "low"
);

-- Populate with key Bitcoin-relevant countries (expanded list)
INSERT INTO `triple-upgrade-245423.btcp_main_dataset.geo_reference_countries` VALUES
  -- HIGH relevance (major Bitcoin markets/regulations)
  ('US', 'United States', 'Americas', 'Northern America', 37.0902, -95.7129, 'high'),
  ('SV', 'El Salvador', 'Americas', 'Central America', 13.7942, -88.8965, 'high'),
  ('SG', 'Singapore', 'Asia', 'South-Eastern Asia', 1.3521, 103.8198, 'high'),
  ('HK', 'Hong Kong', 'Asia', 'Eastern Asia', 22.3193, 114.1694, 'high'),
  ('CH', 'Switzerland', 'Europe', 'Western Europe', 46.8182, 8.2275, 'high'),
  ('AE', 'UAE', 'Asia', 'Western Asia', 23.4241, 53.8478, 'high'),
  ('JP', 'Japan', 'Asia', 'Eastern Asia', 36.2048, 138.2529, 'high'),
  ('CN', 'China', 'Asia', 'Eastern Asia', 35.8617, 104.1954, 'high'),
  ('GB', 'United Kingdom', 'Europe', 'Northern Europe', 55.3781, -3.4360, 'high'),
  ('DE', 'Germany', 'Europe', 'Western Europe', 51.1657, 10.4515, 'high'),
  -- MEDIUM relevance (active crypto markets)
  ('RU', 'Russia', 'Europe', 'Eastern Europe', 61.5240, 105.3188, 'medium'),
  ('BR', 'Brazil', 'Americas', 'South America', -14.2350, -51.9253, 'medium'),
  ('AR', 'Argentina', 'Americas', 'South America', -38.4161, -63.6167, 'medium'),
  ('NG', 'Nigeria', 'Africa', 'Western Africa', 9.0820, 8.6753, 'medium'),
  ('IN', 'India', 'Asia', 'Southern Asia', 20.5937, 78.9629, 'medium'),
  ('AU', 'Australia', 'Oceania', 'Australia and New Zealand', -25.2744, 133.7751, 'medium'),
  ('CA', 'Canada', 'Americas', 'Northern America', 56.1304, -106.3468, 'medium'),
  ('KR', 'South Korea', 'Asia', 'Eastern Asia', 35.9078, 127.7669, 'medium'),
  ('NL', 'Netherlands', 'Europe', 'Western Europe', 52.1326, 5.2913, 'medium'),
  ('PT', 'Portugal', 'Europe', 'Southern Europe', 39.3999, -8.2245, 'medium'),
  -- Additional important markets (frequently mentioned)
  ('VN', 'Vietnam', 'Asia', 'South-Eastern Asia', 14.0583, 108.2772, 'medium'),
  ('ID', 'Indonesia', 'Asia', 'South-Eastern Asia', -0.7893, 113.9213, 'medium'),
  ('TH', 'Thailand', 'Asia', 'South-Eastern Asia', 15.8700, 100.9925, 'medium'),
  ('PH', 'Philippines', 'Asia', 'South-Eastern Asia', 12.8797, 121.7740, 'medium'),
  ('TR', 'Turkey', 'Asia', 'Western Asia', 38.9637, 35.2433, 'medium'),
  ('MX', 'Mexico', 'Americas', 'Central America', 23.6345, -102.5528, 'medium'),
  ('ES', 'Spain', 'Europe', 'Southern Europe', 40.4637, -3.7492, 'low'),
  ('FR', 'France', 'Europe', 'Western Europe', 46.2276, 2.2137, 'low'),
  ('IT', 'Italy', 'Europe', 'Southern Europe', 41.8719, 12.5674, 'low'),
  ('PL', 'Poland', 'Europe', 'Eastern Europe', 51.9194, 19.1451, 'low'),
  ('ZA', 'South Africa', 'Africa', 'Southern Africa', -30.5595, 22.9375, 'low'),
  ('KE', 'Kenya', 'Africa', 'Eastern Africa', -0.0236, 37.9062, 'low'),
  ('CO', 'Colombia', 'Americas', 'South America', 4.5709, -74.2973, 'low'),
  ('VE', 'Venezuela', 'Americas', 'South America', 6.4238, -66.5897, 'low'),
  ('CL', 'Chile', 'Americas', 'South America', -35.6751, -71.5430, 'low'),
  ('MY', 'Malaysia', 'Asia', 'South-Eastern Asia', 4.2105, 101.9758, 'low'),
  ('PK', 'Pakistan', 'Asia', 'Southern Asia', 30.3753, 69.3451, 'low'),
  ('BD', 'Bangladesh', 'Asia', 'Southern Asia', 23.6850, 90.3563, 'low'),
  ('EG', 'Egypt', 'Africa', 'Northern Africa', 26.8206, 30.8025, 'low'),
  ('SA', 'Saudi Arabia', 'Asia', 'Western Asia', 23.8859, 45.0792, 'low'),
  ('IL', 'Israel', 'Asia', 'Western Asia', 31.0461, 34.8516, 'low'),
  ('SE', 'Sweden', 'Europe', 'Northern Europe', 60.1282, 18.6435, 'low'),
  ('NO', 'Norway', 'Europe', 'Northern Europe', 60.4720, 8.4689, 'low'),
  ('FI', 'Finland', 'Europe', 'Northern Europe', 61.9241, 25.7482, 'low'),
  ('DK', 'Denmark', 'Europe', 'Northern Europe', 56.2639, 9.5018, 'low'),
  ('AT', 'Austria', 'Europe', 'Western Europe', 47.5162, 14.5501, 'low'),
  ('BE', 'Belgium', 'Europe', 'Western Europe', 50.5039, 4.4699, 'low'),
  ('IE', 'Ireland', 'Europe', 'Northern Europe', 53.1424, -7.6921, 'low'),
  ('NZ', 'New Zealand', 'Oceania', 'Australia and New Zealand', -40.9006, 174.8860, 'low'),
  ('TW', 'Taiwan', 'Asia', 'Eastern Asia', 23.6978, 120.9605, 'low')
;
```

---

## 3. Phase 1: Real-Time Extraction

### 3.1 Modify Enrichment Service

**File:** `/Users/fernandonikolic/perception/functions/standalone-enrichment/index.js`

Update the OpenAI prompt to extract geographic entities:

```javascript
const BITCOIN_TOPICS = [
  'Mining', 'Scaling', 'Self-custody', 'Investment vehicles', 'Banking & Finance',
  'Market Analysis', 'Retail Adoption', 'Institutional Adoption', 'Use cases',
  'Regulatory updates', 'Cybersecurity', 'Crime & Legal', 'Energy & Environment',
  'Development', 'AI', 'Misc', 'Company news'
];

// NEW: Country reference for extraction
const BITCOIN_RELEVANT_COUNTRIES = {
  // High relevance
  'United States': 'US', 'USA': 'US', 'America': 'US', 'U.S.': 'US',
  'El Salvador': 'SV',
  'Singapore': 'SG',
  'Hong Kong': 'HK',
  'Switzerland': 'CH', 'Swiss': 'CH',
  'UAE': 'AE', 'Dubai': 'AE', 'Abu Dhabi': 'AE', 'United Arab Emirates': 'AE',
  'Japan': 'JP',
  'China': 'CN', 'Chinese': 'CN',
  'Germany': 'DE', 'German': 'DE',
  'United Kingdom': 'GB', 'UK': 'GB', 'Britain': 'GB', 'British': 'GB',
  'Russia': 'RU', 'Russian': 'RU',
  'Brazil': 'BR', 'Brazilian': 'BR',
  'Argentina': 'AR', 'Argentine': 'AR',
  'Nigeria': 'NG', 'Nigerian': 'NG',
  'India': 'IN', 'Indian': 'IN',
  'Australia': 'AU', 'Australian': 'AU',
  'Canada': 'CA', 'Canadian': 'CA',
  'South Korea': 'KR', 'Korea': 'KR', 'Korean': 'KR',
  'Netherlands': 'NL', 'Dutch': 'NL',
  'Portugal': 'PT', 'Portuguese': 'PT',
  // Regions
  'European Union': 'EU', 'EU': 'EU', 'Europe': 'EU',
  'Asia': 'ASIA',
  'Latin America': 'LATAM',
  'Africa': 'AFRICA',
  // Cities (map to countries)
  'Miami': 'US', 'New York': 'US', 'Texas': 'US', 'Wyoming': 'US', 'Florida': 'US',
  'London': 'GB',
  'Zurich': 'CH', 'Zug': 'CH',
  'Tokyo': 'JP',
  'Beijing': 'CN', 'Shanghai': 'CN',
  'São Paulo': 'BR',
  'Buenos Aires': 'AR',
};

// NEW: Updated prompt with geographic extraction
async function enrichWithOpenAI(content, apiKey) {
  const prompt = `Analyze this Bitcoin article and return ONLY a JSON object:
{
  "sentiment": "Positive" or "Neutral" or "Negative",
  "topics": ["topic1", "topic2", "topic3", "topic4"],
  "countries": ["US", "SV", "SG"],
  "regions": ["North America", "Latin America"],
  "cities": ["Miami", "Singapore"],
  "geographic_scope": "global" or "regional" or "local",
  "primary_country": "US" or null
}

SENTIMENT: Positive (adoption/bullish), Neutral (informative), Negative (criticism/risk)
TOPICS: Select 1-4 from EXACTLY: ${BITCOIN_TOPICS.join(', ')}

GEOGRAPHIC EXTRACTION:
- countries: ISO 3166-1 alpha-2 codes for countries MENTIONED in the article
- regions: Broader regions if mentioned (North America, Europe, Asia Pacific, Latin America, Africa, Middle East)
- cities: Major cities if specifically mentioned
- geographic_scope: "global" if about worldwide Bitcoin, "regional" if about specific region, "local" if about one country
- primary_country: The MAIN country focus (if any), null if global

IMPORTANT:
- Only extract locations that are ACTUALLY DISCUSSED in the article
- Do NOT include locations just because a company is headquartered there
- Regulatory news should include the jurisdiction
- If no specific location is mentioned, use empty arrays and "global" scope

Article: ${content}

Return ONLY JSON.`;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a data classifier. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300,  // Increased from 120 for geographic data (need room for 4 topics + 5 countries + 3 regions + 3 cities)
      temperature: 0.3,
      response_format: { type: 'json_object' }
    }, {
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      timeout: 15000
    });

    const result = JSON.parse(response.data.choices[0].message.content);

    // Validate sentiment
    if (!['Positive', 'Neutral', 'Negative'].includes(result.sentiment)) {
      result.sentiment = 'Neutral';
    }

    // Validate topics
    if (!Array.isArray(result.topics)) result.topics = [];
    result.topics = result.topics.slice(0, 4);

    // Validate geographic data
    if (!Array.isArray(result.countries)) result.countries = [];
    if (!Array.isArray(result.regions)) result.regions = [];
    if (!Array.isArray(result.cities)) result.cities = [];
    if (!['global', 'regional', 'local'].includes(result.geographic_scope)) {
      result.geographic_scope = 'global';
    }

    // Normalize ISO country codes (model often returns wrong codes)
    const ISO_NORMALIZATION = {
      'UK': 'GB', 'UAE': 'AE', 'DUBAI': 'AE', 'KOREA': 'KR', 'SOUTH KOREA': 'KR',
      'SWISS': 'CH', 'SWITZERLAND': 'CH', 'HONGKONG': 'HK', 'HONG KONG': 'HK',
      'USA': 'US', 'AMERICA': 'US', 'UNITED STATES': 'US',
      'GERMANY': 'DE', 'JAPAN': 'JP', 'CHINA': 'CN', 'RUSSIA': 'RU',
      'BRAZIL': 'BR', 'INDIA': 'IN', 'AUSTRALIA': 'AU', 'CANADA': 'CA',
      'SINGAPORE': 'SG', 'EL SALVADOR': 'SV', 'ARGENTINA': 'AR', 'NIGERIA': 'NG',
      'VIETNAM': 'VN', 'INDONESIA': 'ID', 'THAILAND': 'TH', 'PHILIPPINES': 'PH',
      'TURKEY': 'TR', 'MEXICO': 'MX', 'NETHERLANDS': 'NL', 'PORTUGAL': 'PT',
      'SPAIN': 'ES', 'FRANCE': 'FR', 'ITALY': 'IT', 'POLAND': 'PL',
    };
    result.countries = [...new Set(result.countries.map(c => {
      const upper = c.toUpperCase();
      return ISO_NORMALIZATION[upper] || c.toUpperCase();
    }))];

    // Normalize primary_country too
    if (result.primary_country) {
      const upper = result.primary_country.toUpperCase();
      result.primary_country = ISO_NORMALIZATION[upper] || result.primary_country.toUpperCase();
    }

    return result;
  } catch (error) {
    console.error('OpenAI error:', error.message);
    return null;
  }
}
```

### 3.2 Update BigQuery Insert

Update the INSERT query to include geographic columns:

```javascript
const insertQuery = `
  INSERT INTO \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
  (Date, Title, Content, URL, Outlet, Sentiment, Image_URL, author_name, BPI,
   Topic_1, Topic_2, Topic_3, Topic_4, Country, Funding, Outlet_Category,
   Political_Leaning, All_Topics, row_num,
   mentioned_countries, mentioned_regions, mentioned_cities,
   geographic_scope, primary_country, geo_extraction_version)
  VALUES (@date, @title, @content, @url, @outlet, @sentiment, @image_url,
          @author_name, @bpi, @topic1, @topic2, @topic3, @topic4, @country,
          @funding, @outlet_category, @political_leaning, @all_topics, @row_num,
          @mentioned_countries, @mentioned_regions, @mentioned_cities,
          @geographic_scope, @primary_country, @geo_extraction_version)
`;

// Add parameters
const params = {
  // ... existing params ...
  mentioned_countries: enrichment.countries.join(',') || null,
  mentioned_regions: enrichment.regions.join(',') || null,
  mentioned_cities: enrichment.cities.join(',') || null,
  geographic_scope: enrichment.geographic_scope || 'global',
  primary_country: enrichment.primary_country || null,
  geo_extraction_version: '1.0'
};
```

### 3.3 Deployment Steps

```bash
# 1. Add columns to BigQuery
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
bq query --use_legacy_sql=false --project_id=triple-upgrade-245423 "
ALTER TABLE \`btcp_main_dataset.all_channels_data\`
ADD COLUMN IF NOT EXISTS mentioned_countries STRING,
ADD COLUMN IF NOT EXISTS mentioned_regions STRING,
ADD COLUMN IF NOT EXISTS mentioned_cities STRING,
ADD COLUMN IF NOT EXISTS geographic_scope STRING,
ADD COLUMN IF NOT EXISTS primary_country STRING,
ADD COLUMN IF NOT EXISTS geo_extraction_version STRING
"

# 2. Update enrichment service code (edit index.js)

# 3. Deploy updated enrichment service
cd /Users/fernandonikolic/perception/functions/standalone-enrichment
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
gcloud run deploy enrichment-service \
  --source . \
  --region=us-central1 \
  --project triple-upgrade-245423

# 4. Test with a single article
curl -X GET "https://enrichment-service-45998414364.us-central1.run.app?mode=new_only&batch_size=1"

# 5. Verify in BigQuery
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
bq query --use_legacy_sql=false --project_id=triple-upgrade-245423 "
SELECT URL, Title, mentioned_countries, geographic_scope, primary_country
FROM \`btcp_main_dataset.all_channels_data\`
WHERE geo_extraction_version IS NOT NULL
ORDER BY Date DESC
LIMIT 5
"
```

---

## 4. Phase 2: Historical Backfill

### 4.1 Overview

Backfill ~550,000 existing articles with geographic data using the proven CSV pattern:

1. **Export** articles without geographic data to CSV
2. **Process** locally with OpenAI (resumable, cost-tracked)
3. **Upload** results to staging table
4. **Merge** into production table

> ⚠️ **Incremental Backfill Note**: The export is a snapshot. New articles arriving during the backfill won't be included. After backfill completes, either:
> - Re-run the export to catch new articles, OR
> - Deploy the real-time enrichment first, then backfill historical data

### 4.2 Step 1: Export Articles to CSV

**File:** `/Users/fernandonikolic/perception/scripts/backfill/export-for-geo-backfill.cjs`

```javascript
/**
 * Export articles for geographic backfill
 *
 * Exports articles that don't have geographic data to a CSV file
 * for offline processing with OpenAI
 */

const { BigQuery } = require('@google-cloud/bigquery');
const fs = require('fs');
const path = require('path');

const bigquery = new BigQuery({
  projectId: 'triple-upgrade-245423',
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS ||
               path.join(__dirname, '../../functions/bitcoin-data-chat-key.json')
});

const OUTPUT_FILE = path.join(__dirname, '../../data/geo-backfill-articles.csv');

async function main() {
  console.log('📤 EXPORTING ARTICLES FOR GEOGRAPHIC BACKFILL\n');

  // Query articles without geographic data
  const query = `
    SELECT
      URL,
      Title,
      Content,
      Outlet,
      Date
    FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
    WHERE geo_extraction_version IS NULL
      AND Title IS NOT NULL
      AND URL IS NOT NULL
    ORDER BY Date DESC
  `;

  console.log('🔍 Querying BigQuery for articles without geographic data...');

  const [rows] = await bigquery.query({ query });
  console.log(`✅ Found ${rows.length} articles to process`);

  // Write to CSV
  const header = 'URL,Title,Content,Outlet,Date\n';
  fs.writeFileSync(OUTPUT_FILE, header);

  let written = 0;
  for (const row of rows) {
    const url = (row.URL || '').replace(/"/g, '""');
    const title = (row.Title || '').replace(/"/g, '""').substring(0, 500);
    const content = (row.Content || '').replace(/"/g, '""').substring(0, 2000);
    const outlet = (row.Outlet || '').replace(/"/g, '""');
    const date = row.Date ? row.Date.value : '';

    const line = `"${url}","${title}","${content}","${outlet}","${date}"\n`;
    fs.appendFileSync(OUTPUT_FILE, line);
    written++;

    if (written % 10000 === 0) {
      console.log(`  Written ${written}/${rows.length} rows...`);
    }
  }

  console.log(`\n✅ Exported ${written} articles to ${OUTPUT_FILE}`);
  console.log(`   File size: ${(fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
```

### 4.3 Step 2: Process with OpenAI

**File:** `/Users/fernandonikolic/perception/scripts/backfill/geo-backfill-from-csv.cjs`

```javascript
/**
 * Geographic Backfill - Process CSV with OpenAI
 *
 * Reads articles from CSV, extracts geographic data using OpenAI,
 * and saves results to output CSV for later BigQuery upload.
 *
 * Features:
 * - Auto-resumable with progress tracking
 * - Cost monitoring
 * - Rate limiting
 * - Batch processing
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');  // Use proper CSV parser, not regex
const axios = require('axios');

// Configuration
const CONFIG = {
  INPUT_FILE: path.join(__dirname, '../../data/geo-backfill-articles.csv'),
  OUTPUT_FILE: path.join(__dirname, '../../data/geo-backfill-results.csv'),
  PROGRESS_FILE: path.join(__dirname, '../../data/geo-backfill-progress.json'),

  BATCH_SIZE: 100,                    // Process 100 articles per run
  CONCURRENT_REQUESTS: 5,             // Parallel OpenAI calls
  DELAY_BETWEEN_REQUESTS: 200,        // ms between requests
  DELAY_BETWEEN_BATCHES: 1000,        // ms between batches

  // Cost tracking (GPT-4o-mini pricing)
  COST_PER_1K_INPUT_TOKENS: 0.00015,
  COST_PER_1K_OUTPUT_TOKENS: 0.0006,
  AVG_INPUT_TOKENS: 400,
  AVG_OUTPUT_TOKENS: 100,
};

const stats = {
  processed: 0,
  success: 0,
  failed: 0,
  cost_usd: 0,
  start_time: null,
};

/**
 * Extract geographic data using OpenAI
 */
async function extractGeography(title, content, apiKey) {
  const text = `${title} ${content}`.substring(0, 1500);

  const prompt = `Extract geographic locations from this Bitcoin article. Return ONLY a JSON object:
{
  "countries": ["US", "SV"],
  "regions": ["North America"],
  "cities": ["Miami"],
  "geographic_scope": "global",
  "primary_country": "US"
}

RULES:
- countries: ISO 3166-1 alpha-2 codes (US, GB, SV, SG, etc.)
- regions: North America, Europe, Asia Pacific, Latin America, Africa, Middle East
- cities: Only major cities explicitly mentioned
- geographic_scope: "global" (worldwide), "regional" (multi-country), "local" (single country)
- primary_country: Main focus country or null

Article: ${text}

Return ONLY JSON.`;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Extract geographic entities. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 150,
      temperature: 0.2,
      response_format: { type: 'json_object' }
    }, {
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      timeout: 15000
    });

    const result = JSON.parse(response.data.choices[0].message.content);

    // Track cost
    const inputTokens = response.data.usage?.prompt_tokens || CONFIG.AVG_INPUT_TOKENS;
    const outputTokens = response.data.usage?.completion_tokens || CONFIG.AVG_OUTPUT_TOKENS;
    stats.cost_usd += (inputTokens / 1000) * CONFIG.COST_PER_1K_INPUT_TOKENS;
    stats.cost_usd += (outputTokens / 1000) * CONFIG.COST_PER_1K_OUTPUT_TOKENS;

    return {
      success: true,
      countries: Array.isArray(result.countries) ? result.countries : [],
      regions: Array.isArray(result.regions) ? result.regions : [],
      cities: Array.isArray(result.cities) ? result.cities : [],
      geographic_scope: result.geographic_scope || 'global',
      primary_country: result.primary_country || null,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Load progress from file
 */
function loadProgress() {
  if (fs.existsSync(CONFIG.PROGRESS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CONFIG.PROGRESS_FILE, 'utf8'));
    } catch (e) {
      console.warn('Could not read progress file, starting fresh');
    }
  }
  return {
    processed_urls: new Set(),
    total_processed: 0,
    total_success: 0,
    total_cost_usd: 0
  };
}

/**
 * Save progress to file
 */
function saveProgress(progress) {
  const toSave = {
    ...progress,
    processed_urls: Array.from(progress.processed_urls),
    last_updated: new Date().toISOString()
  };
  fs.writeFileSync(CONFIG.PROGRESS_FILE, JSON.stringify(toSave, null, 2));
}

/**
 * Append results to output CSV
 */
function appendResults(results) {
  const fileExists = fs.existsSync(CONFIG.OUTPUT_FILE);

  let csv = '';
  if (!fileExists) {
    csv = 'url,mentioned_countries,mentioned_regions,mentioned_cities,geographic_scope,primary_country,status,error\n';
  }

  for (const r of results) {
    const countries = r.result.countries?.join(',') || '';
    const regions = r.result.regions?.join(',') || '';
    const cities = r.result.cities?.join(',') || '';
    const scope = r.result.geographic_scope || '';
    const primary = r.result.primary_country || '';
    const status = r.result.success ? 'completed' : 'failed';
    const error = r.result.error ? r.result.error.replace(/"/g, '""') : '';

    csv += `"${r.url}","${countries}","${regions}","${cities}","${scope}","${primary}","${status}","${error}"\n`;
  }

  fs.appendFileSync(CONFIG.OUTPUT_FILE, csv);
}

/**
 * Read articles from CSV using proper parser (handles escaped quotes, multi-line content)
 */
function readArticles(progress) {
  const csvContent = fs.readFileSync(CONFIG.INPUT_FILE, 'utf8');

  // Use csv-parse for reliable parsing (handles escaped quotes, multi-line, etc.)
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true,
  });

  const articles = [];
  for (const record of records) {
    const url = record.URL || record.url;
    if (!url) continue;

    // Skip if already processed
    if (progress.processed_urls.has(url)) continue;

    articles.push({
      url,
      title: record.Title || record.title || '',
      content: record.Content || record.content || '',
      outlet: record.Outlet || record.outlet || '',
      date: record.Date || record.date || '',
    });

    // Stop when we have enough for this batch
    if (articles.length >= CONFIG.BATCH_SIZE) break;
  }

  return articles;
}

/**
 * Main execution
 */
async function main() {
  console.log('🌍 GEOGRAPHIC BACKFILL - CSV PROCESSING\n');
  console.log('='.repeat(80));

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_V2;
  if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not set');
    process.exit(1);
  }

  stats.start_time = Date.now();

  // Load progress
  const progress = loadProgress();
  if (Array.isArray(progress.processed_urls)) {
    progress.processed_urls = new Set(progress.processed_urls);
  }

  console.log(`📈 Previous progress: ${progress.total_processed} processed, ${progress.total_success} success`);
  console.log(`💰 Previous cost: $${progress.total_cost_usd?.toFixed(4) || 0}`);

  // Read articles
  const articles = await readArticles(progress);

  if (articles.length === 0) {
    console.log('\n✅ All articles processed! Run upload script next.');
    return;
  }

  console.log(`\n🚀 Processing ${articles.length} articles...\n`);

  const results = [];

  // Process in parallel batches
  for (let i = 0; i < articles.length; i += CONFIG.CONCURRENT_REQUESTS) {
    const batch = articles.slice(i, i + CONFIG.CONCURRENT_REQUESTS);

    const promises = batch.map(async (article) => {
      await new Promise(r => setTimeout(r, Math.random() * CONFIG.DELAY_BETWEEN_REQUESTS));
      const result = await extractGeography(article.title, article.content, OPENAI_API_KEY);
      return { url: article.url, result };
    });

    const batchResults = await Promise.all(promises);

    for (const r of batchResults) {
      stats.processed++;
      if (r.result.success) {
        stats.success++;
        console.log(`✅ [${stats.processed}/${articles.length}] ${r.result.countries?.join(',') || 'global'}`);
      } else {
        stats.failed++;
        console.log(`❌ [${stats.processed}/${articles.length}] ${r.result.error}`);
      }

      progress.processed_urls.add(r.url);
      results.push(r);
    }

    // Progress update every 20 articles
    if (stats.processed % 20 === 0) {
      const elapsed = (Date.now() - stats.start_time) / 1000;
      const rate = stats.processed / elapsed;
      const remaining = articles.length - stats.processed;
      const eta = (remaining / rate / 60).toFixed(1);

      console.log(`\n📊 Progress: ${stats.processed}/${articles.length} | Cost: $${stats.cost_usd.toFixed(4)} | ETA: ${eta}min\n`);
    }

    await new Promise(r => setTimeout(r, CONFIG.DELAY_BETWEEN_BATCHES));
  }

  // Save results
  appendResults(results);

  // Update progress
  progress.total_processed += stats.processed;
  progress.total_success += stats.success;
  progress.total_cost_usd = (progress.total_cost_usd || 0) + stats.cost_usd;
  saveProgress(progress);

  // Summary
  const totalTime = (Date.now() - stats.start_time) / 1000;
  console.log('\n' + '='.repeat(80));
  console.log('\n🎉 BATCH COMPLETE!\n');
  console.log(`Processed: ${stats.processed}`);
  console.log(`Success: ${stats.success} (${((stats.success / stats.processed) * 100).toFixed(1)}%)`);
  console.log(`Failed: ${stats.failed}`);
  console.log(`Cost this batch: $${stats.cost_usd.toFixed(4)}`);
  console.log(`Total cost so far: $${progress.total_cost_usd.toFixed(4)}`);
  console.log(`Time: ${(totalTime / 60).toFixed(1)} minutes`);
  console.log(`\n💾 Results saved to: ${CONFIG.OUTPUT_FILE}`);
  console.log(`📈 Progress saved to: ${CONFIG.PROGRESS_FILE}`);

  // Estimate remaining
  const totalArticles = fs.readFileSync(CONFIG.INPUT_FILE, 'utf8').split('\n').length - 1;
  const remaining = totalArticles - progress.total_processed;
  const costPerArticle = stats.cost_usd / stats.processed;
  const remainingCost = remaining * costPerArticle;
  const remainingTime = (remaining / (stats.processed / totalTime)) / 3600;

  console.log(`\n📊 Remaining: ~${remaining} articles`);
  console.log(`   Estimated cost: $${remainingCost.toFixed(2)}`);
  console.log(`   Estimated time: ${remainingTime.toFixed(1)} hours`);

  console.log('\n💡 Run this script again to continue processing.');
  console.log('   When done, run: node upload-geo-to-bigquery.cjs');
}

main().catch(console.error);
```

### 4.4 Step 3: Upload Results to BigQuery

**File:** `/Users/fernandonikolic/perception/scripts/backfill/upload-geo-to-bigquery.cjs`

```javascript
/**
 * Upload Geographic Backfill Results to BigQuery
 *
 * Uploads the processed CSV to a staging table, then merges into production.
 */

const { BigQuery } = require('@google-cloud/bigquery');
const fs = require('fs');
const path = require('path');

const bigquery = new BigQuery({
  projectId: 'triple-upgrade-245423',
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS ||
               path.join(__dirname, '../../functions/bitcoin-data-chat-key.json')
});

const MAIN_TABLE = 'triple-upgrade-245423.btcp_main_dataset.all_channels_data';
const STAGING_TABLE = 'triple-upgrade-245423.btcp_main_dataset.geo_backfill_staging';
const CSV_FILE = path.join(__dirname, '../../data/geo-backfill-results.csv');

async function main() {
  console.log('📤 UPLOADING GEOGRAPHIC BACKFILL TO BIGQUERY\n');
  console.log('='.repeat(80));

  // Check CSV exists
  if (!fs.existsSync(CSV_FILE)) {
    console.error(`❌ CSV file not found: ${CSV_FILE}`);
    console.log('   Run geo-backfill-from-csv.cjs first.');
    return;
  }

  const csvLines = fs.readFileSync(CSV_FILE, 'utf8').split('\n').length - 1;
  console.log(`\n📄 CSV File: ${CSV_FILE}`);
  console.log(`   Rows: ${csvLines}`);

  // Step 1: Create staging table
  console.log('\n📋 Step 1: Creating staging table...');

  const schema = [
    { name: 'url', type: 'STRING', mode: 'REQUIRED' },
    { name: 'mentioned_countries', type: 'STRING', mode: 'NULLABLE' },
    { name: 'mentioned_regions', type: 'STRING', mode: 'NULLABLE' },
    { name: 'mentioned_cities', type: 'STRING', mode: 'NULLABLE' },
    { name: 'geographic_scope', type: 'STRING', mode: 'NULLABLE' },
    { name: 'primary_country', type: 'STRING', mode: 'NULLABLE' },
    { name: 'status', type: 'STRING', mode: 'NULLABLE' },
    { name: 'error', type: 'STRING', mode: 'NULLABLE' },
  ];

  // Step 2: Load CSV to staging
  console.log('\n📤 Step 2: Uploading CSV to staging table...');

  const [job] = await bigquery
    .dataset('btcp_main_dataset')
    .table('geo_backfill_staging')
    .load(CSV_FILE, {
      sourceFormat: 'CSV',
      skipLeadingRows: 1,
      writeDisposition: 'WRITE_TRUNCATE',
      schema: { fields: schema },
    });

  console.log(`✅ Upload complete! Job ID: ${job.id}`);

  // Step 3: Show stats
  console.log('\n📊 Step 3: Analyzing results...');

  const [statsRows] = await bigquery.query(`
    SELECT
      status,
      COUNT(*) as count,
      COUNTIF(mentioned_countries != '') as with_countries
    FROM \`${STAGING_TABLE}\`
    GROUP BY status
  `);

  for (const row of statsRows) {
    console.log(`   ${row.status}: ${row.count} (${row.with_countries} with countries)`);
  }

  // Step 4: MERGE into production
  console.log('\n' + '='.repeat(80));
  console.log('\n⚠️  READY TO MERGE INTO PRODUCTION TABLE');

  if (process.argv.includes('--merge')) {
    console.log('\n🚀 Executing MERGE...');

    const mergeQuery = `
      MERGE \`${MAIN_TABLE}\` T
      USING (
        SELECT url, mentioned_countries, mentioned_regions, mentioned_cities,
               geographic_scope, primary_country
        FROM \`${STAGING_TABLE}\`
        WHERE status = 'completed'
      ) S
      ON T.URL = S.url
      WHEN MATCHED THEN
        UPDATE SET
          mentioned_countries = S.mentioned_countries,
          mentioned_regions = S.mentioned_regions,
          mentioned_cities = S.mentioned_cities,
          geographic_scope = S.geographic_scope,
          primary_country = S.primary_country,
          geo_extraction_version = '1.0'
    `;

    const [mergeJob] = await bigquery.createQueryJob({ query: mergeQuery });
    await mergeJob.getResults();

    console.log('✅ MERGE complete!');

    // Verify
    const [verifyRows] = await bigquery.query(`
      SELECT COUNT(*) as count
      FROM \`${MAIN_TABLE}\`
      WHERE geo_extraction_version = '1.0'
    `);

    console.log(`\n📊 ${verifyRows[0].count} articles now have geographic data`);
  } else {
    console.log('\nTo execute MERGE, run with --merge flag:');
    console.log('  node upload-geo-to-bigquery.cjs --merge');
  }
}

main().catch(console.error);
```

### 4.5 Continuous Backfill Script

**File:** `/Users/fernandonikolic/perception/scripts/backfill/run-geo-backfill-continuous.sh`

```bash
#!/bin/bash

# Geographic Backfill - Continuous Runner
# Runs the backfill script repeatedly until all articles are processed

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$SCRIPT_DIR/geo-backfill-continuous.log"

echo "🌍 Starting continuous geographic backfill..."
echo "   Log file: $LOG_FILE"
echo "   Press Ctrl+C to stop"
echo ""

# Export credentials
export GOOGLE_APPLICATION_CREDENTIALS="/Users/fernandonikolic/perception/bitcoin-data-chat-key.json"

# Counter
RUN=1

while true; do
  echo "$(date '+%Y-%m-%d %H:%M:%S') - Run #$RUN" >> "$LOG_FILE"

  # Run the backfill script
  node "$SCRIPT_DIR/geo-backfill-from-csv.cjs" 2>&1 | tee -a "$LOG_FILE"

  EXIT_CODE=$?

  if [ $EXIT_CODE -ne 0 ]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') - Error (exit code $EXIT_CODE), waiting 60s..." >> "$LOG_FILE"
    sleep 60
  else
    # Check if we're done (no more articles)
    if grep -q "All articles processed" "$LOG_FILE"; then
      echo "$(date '+%Y-%m-%d %H:%M:%S') - ✅ Backfill complete!" >> "$LOG_FILE"
      echo ""
      echo "🎉 Backfill complete! Run upload script:"
      echo "   node $SCRIPT_DIR/upload-geo-to-bigquery.cjs --merge"
      break
    fi
  fi

  RUN=$((RUN + 1))

  # Short delay between runs
  sleep 5
done
```

---

## 5. Phase 3: API & Frontend

### 5.1 New API Endpoint: Geographic Aggregation

Add to your API layer (`/functions/src/api.ts` or similar):

```typescript
/**
 * GET /api/geography/summary
 *
 * Returns geographic aggregation of articles
 *
 * Query params:
 * - days: number of days to look back (default: 7)
 * - outlet: filter by outlet (optional)
 */
app.get('/api/geography/summary', async (req, res) => {
  // Validate and sanitize inputs (prevent SQL injection)
  const days = Math.min(Math.max(parseInt(req.query.days as string) || 7, 1), 365);
  const outlet = req.query.outlet as string;

  // Use parameterized query with @days parameter (NOT string interpolation)
  const query = `
    WITH country_mentions AS (
      SELECT
        TRIM(country) as country_code,
        COUNT(*) as mention_count,
        COUNT(DISTINCT Outlet) as outlet_count,
        ARRAY_AGG(DISTINCT Outlet LIMIT 5) as sample_outlets
      FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`,
        UNNEST(SPLIT(mentioned_countries, ',')) as country
      WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL @days DAY)
        AND geo_extraction_version IS NOT NULL
        AND mentioned_countries IS NOT NULL
        AND mentioned_countries != ''
        ${outlet ? 'AND Outlet = @outlet' : ''}
      GROUP BY country_code
    ),
    scope_distribution AS (
      SELECT
        geographic_scope,
        COUNT(*) as count
      FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
      WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL @days DAY)
        AND geo_extraction_version IS NOT NULL
        ${outlet ? 'AND Outlet = @outlet' : ''}
      GROUP BY geographic_scope
    )
    SELECT
      'country_mentions' as data_type,
      TO_JSON_STRING(ARRAY_AGG(STRUCT(country_code, mention_count, outlet_count, sample_outlets))) as data
    FROM country_mentions

    UNION ALL

    SELECT
      'scope_distribution' as data_type,
      TO_JSON_STRING(ARRAY_AGG(STRUCT(geographic_scope, count))) as data
    FROM scope_distribution
  `;

  try {
    const [rows] = await bigquery.query({
      query,
      params: { days, ...(outlet ? { outlet } : {}) }
    });

    const result = {
      country_mentions: [],
      scope_distribution: [],
      meta: { days, outlet: outlet || 'all', generated_at: new Date().toISOString() }
    };

    for (const row of rows) {
      result[row.data_type] = JSON.parse(row.data);
    }

    res.json(result);
  } catch (error) {
    console.error('Geography API error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/geography/timeline
 *
 * Returns geographic mentions over time
 */
app.get('/api/geography/timeline', async (req, res) => {
  // Validate and sanitize inputs
  const days = Math.min(Math.max(parseInt(req.query.days as string) || 30, 1), 365);
  const country = req.query.country as string;

  // Validate country code format (2 uppercase letters only)
  const validCountry = country && /^[A-Z]{2}$/.test(country.toUpperCase())
    ? country.toUpperCase()
    : null;

  const query = `
    SELECT
      DATE(Date) as date,
      ${validCountry ? 'COUNTIF(mentioned_countries LIKE @country_pattern)' : 'COUNT(*)'} as article_count,
      ${validCountry ? '' : `
        COUNTIF(mentioned_countries LIKE '%US%') as us_count,
        COUNTIF(mentioned_countries LIKE '%SV%') as sv_count,
        COUNTIF(mentioned_countries LIKE '%SG%') as sg_count,
        COUNTIF(mentioned_countries LIKE '%GB%') as gb_count,
        COUNTIF(mentioned_countries LIKE '%EU%' OR mentioned_regions LIKE '%Europe%') as eu_count,
      `}
    FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
    WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL @days DAY)
      AND geo_extraction_version IS NOT NULL
    GROUP BY date
    ORDER BY date DESC
  `;

  const [rows] = await bigquery.query({
    query,
    params: {
      days,
      ...(validCountry ? { country_pattern: `%${validCountry}%` } : {})
    }
  });

  res.json({ timeline: rows, meta: { days, country: validCountry || 'all' } });
});
```

### 5.2 Frontend Globe Component

**File:** `/Users/fernandonikolic/perception/src/components/Globe/GlobeVisualization.tsx`

```typescript
/**
 * Globe visualization showing Bitcoin news geographic distribution
 *
 * Uses react-globe.gl for 3D rendering
 * Displays hot spots where Bitcoin news is happening
 */

import React, { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import { useQuery } from '@tanstack/react-query';

interface CountryMention {
  country_code: string;
  mention_count: number;
  outlet_count: number;
}

interface GlobeData {
  country_mentions: CountryMention[];
  scope_distribution: { geographic_scope: string; count: number }[];
  meta: { days: number; generated_at: string };
}

// Country coordinates (must match geo_reference_countries table)
const COUNTRY_COORDS: Record<string, { lat: number; lng: number; name: string }> = {
  // HIGH relevance
  US: { lat: 37.0902, lng: -95.7129, name: 'United States' },
  SV: { lat: 13.7942, lng: -88.8965, name: 'El Salvador' },
  SG: { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
  HK: { lat: 22.3193, lng: 114.1694, name: 'Hong Kong' },
  CH: { lat: 46.8182, lng: 8.2275, name: 'Switzerland' },
  AE: { lat: 23.4241, lng: 53.8478, name: 'UAE' },
  JP: { lat: 36.2048, lng: 138.2529, name: 'Japan' },
  CN: { lat: 35.8617, lng: 104.1954, name: 'China' },
  GB: { lat: 55.3781, lng: -3.4360, name: 'United Kingdom' },
  DE: { lat: 51.1657, lng: 10.4515, name: 'Germany' },
  // MEDIUM relevance
  RU: { lat: 61.5240, lng: 105.3188, name: 'Russia' },
  BR: { lat: -14.2350, lng: -51.9253, name: 'Brazil' },
  AR: { lat: -38.4161, lng: -63.6167, name: 'Argentina' },
  NG: { lat: 9.0820, lng: 8.6753, name: 'Nigeria' },
  IN: { lat: 20.5937, lng: 78.9629, name: 'India' },
  AU: { lat: -25.2744, lng: 133.7751, name: 'Australia' },
  CA: { lat: 56.1304, lng: -106.3468, name: 'Canada' },
  KR: { lat: 35.9078, lng: 127.7669, name: 'South Korea' },
  NL: { lat: 52.1326, lng: 5.2913, name: 'Netherlands' },
  PT: { lat: 39.3999, lng: -8.2245, name: 'Portugal' },
  VN: { lat: 14.0583, lng: 108.2772, name: 'Vietnam' },
  ID: { lat: -0.7893, lng: 113.9213, name: 'Indonesia' },
  TH: { lat: 15.8700, lng: 100.9925, name: 'Thailand' },
  PH: { lat: 12.8797, lng: 121.7740, name: 'Philippines' },
  TR: { lat: 38.9637, lng: 35.2433, name: 'Turkey' },
  MX: { lat: 23.6345, lng: -102.5528, name: 'Mexico' },
  // LOW relevance (but still tracked)
  ES: { lat: 40.4637, lng: -3.7492, name: 'Spain' },
  FR: { lat: 46.2276, lng: 2.2137, name: 'France' },
  IT: { lat: 41.8719, lng: 12.5674, name: 'Italy' },
  PL: { lat: 51.9194, lng: 19.1451, name: 'Poland' },
  ZA: { lat: -30.5595, lng: 22.9375, name: 'South Africa' },
  KE: { lat: -0.0236, lng: 37.9062, name: 'Kenya' },
  IL: { lat: 31.0461, lng: 34.8516, name: 'Israel' },
  SA: { lat: 23.8859, lng: 45.0792, name: 'Saudi Arabia' },
  SE: { lat: 60.1282, lng: 18.6435, name: 'Sweden' },
  TW: { lat: 23.6978, lng: 120.9605, name: 'Taiwan' },
};

export function GlobeVisualization({ days = 7 }: { days?: number }) {
  const globeRef = useRef<any>();

  const { data, isLoading } = useQuery<GlobeData>({
    queryKey: ['geography', 'summary', days],
    queryFn: async () => {
      const res = await fetch(`/api/geography/summary?days=${days}`);
      return res.json();
    },
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  // Convert to globe points
  const points = (data?.country_mentions || [])
    .filter(m => COUNTRY_COORDS[m.country_code])
    .map(m => ({
      lat: COUNTRY_COORDS[m.country_code].lat,
      lng: COUNTRY_COORDS[m.country_code].lng,
      name: COUNTRY_COORDS[m.country_code].name,
      count: m.mention_count,
      outlets: m.outlet_count,
      // Scale size by mention count (log scale for better distribution)
      size: Math.log10(m.mention_count + 1) * 0.5,
      // Color intensity by count
      color: `rgba(255, ${Math.max(0, 200 - m.mention_count * 2)}, 0, 0.8)`,
    }));

  // Auto-rotate
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading globe...</div>;
  }

  return (
    <div className="relative w-full h-96">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointLabel={d => `${d.name}: ${d.count} articles (${d.outlets} outlets)`}
        pointColor="color"
        pointRadius="size"
        pointAltitude={0.01}

        // Arcs between major Bitcoin hubs
        arcsData={[
          { startLat: 37.0902, startLng: -95.7129, endLat: 13.7942, endLng: -88.8965 }, // US-SV
          { startLat: 37.0902, startLng: -95.7129, endLat: 1.3521, endLng: 103.8198 },  // US-SG
        ]}
        arcColor={() => 'rgba(255, 165, 0, 0.5)'}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}

        width={600}
        height={400}
      />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg p-3 text-xs text-white">
        <div className="font-semibold mb-2">Bitcoin News Activity</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span>High activity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span>Moderate</span>
        </div>
        <div className="text-gray-400 mt-2">Last {days} days</div>
      </div>
    </div>
  );
}
```

---

## 6. Cost Analysis

### 6.1 One-Time Backfill Costs

| Component | Calculation | Estimated Cost |
|-----------|-------------|----------------|
| **BigQuery Export** | 550K rows × ~2KB = 1.1GB | ~$0.005 |
| **OpenAI Processing** | 550K articles × ~500 tokens × $0.00015/1K | ~$41.25 |
| **BigQuery Upload** | 1.1GB staging + MERGE | ~$0.01 |
| **Total Backfill** | | **~$42** |

### 6.2 Ongoing Costs (Monthly)

| Component | Calculation | Estimated Cost |
|-----------|-------------|----------------|
| **New Articles** | ~15K/month × ~500 tokens × $0.00015/1K | ~$1.13 |
| **API Queries** | Geography endpoint queries | ~$0.50 |
| **Total Monthly** | | **~$2** |

### 6.3 Cost Optimization Tips

1. **Batch Processing**: Process in batches of 100 articles for efficient API usage
2. **Skip Empty Content**: Don't send articles with no title/content to OpenAI
3. **Cache API Results**: Frontend caches geography data for 5 minutes
4. **Use Materialized Views**: For frequently-queried aggregations

---

## 7. Implementation Scripts

### 7.1 Complete File List

| File | Purpose | When to Run |
|------|---------|-------------|
| `scripts/backfill/export-for-geo-backfill.cjs` | Export articles to CSV | Once, before backfill |
| `scripts/backfill/geo-backfill-from-csv.cjs` | Process CSV with OpenAI | Run repeatedly until done |
| `scripts/backfill/upload-geo-to-bigquery.cjs` | Upload results to BQ | Once, after backfill |
| `scripts/backfill/run-geo-backfill-continuous.sh` | Continuous runner | Run in background |
| `functions/standalone-enrichment/index.js` | Real-time enrichment | Deploy once |

### 7.2 Quick Start Commands

```bash
# === PHASE 1: SETUP ===

# 1. Add columns to BigQuery
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
bq query --use_legacy_sql=false --project_id=triple-upgrade-245423 "
ALTER TABLE \`btcp_main_dataset.all_channels_data\`
ADD COLUMN IF NOT EXISTS mentioned_countries STRING,
ADD COLUMN IF NOT EXISTS mentioned_regions STRING,
ADD COLUMN IF NOT EXISTS mentioned_cities STRING,
ADD COLUMN IF NOT EXISTS geographic_scope STRING,
ADD COLUMN IF NOT EXISTS primary_country STRING,
ADD COLUMN IF NOT EXISTS geo_extraction_version STRING
"

# === PHASE 2: BACKFILL ===

# 2. Export articles to CSV
cd /Users/fernandonikolic/perception
node scripts/backfill/export-for-geo-backfill.cjs

# 3. Run backfill (foreground - for testing)
node scripts/backfill/geo-backfill-from-csv.cjs

# 3b. OR run continuously in background
chmod +x scripts/backfill/run-geo-backfill-continuous.sh
nohup ./scripts/backfill/run-geo-backfill-continuous.sh &

# 4. Monitor progress
tail -f scripts/backfill/geo-backfill-continuous.log
cat data/geo-backfill-progress.json | jq '.total_processed, .total_cost_usd'

# 5. Upload to BigQuery when complete
node scripts/backfill/upload-geo-to-bigquery.cjs --merge

# === PHASE 3: REAL-TIME ===

# 6. Update enrichment service (after editing index.js)
cd functions/standalone-enrichment
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
gcloud run deploy enrichment-service --source . --region=us-central1 --project triple-upgrade-245423
```

---

## 8. Monitoring & Validation

### 8.1 Backfill Progress Monitoring

```bash
# Check progress file
cat /Users/fernandonikolic/perception/data/geo-backfill-progress.json | jq '.'

# Count processed vs remaining
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
bq query --use_legacy_sql=false --project_id=triple-upgrade-245423 "
SELECT
  COUNTIF(geo_extraction_version IS NOT NULL) as with_geo,
  COUNTIF(geo_extraction_version IS NULL) as without_geo,
  COUNT(*) as total,
  ROUND(COUNTIF(geo_extraction_version IS NOT NULL) * 100.0 / COUNT(*), 2) as pct_complete
FROM \`btcp_main_dataset.all_channels_data\`
"
```

### 8.2 Data Quality Validation

```bash
# Top mentioned countries
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
bq query --use_legacy_sql=false --project_id=triple-upgrade-245423 "
SELECT
  TRIM(country) as country,
  COUNT(*) as mentions
FROM \`btcp_main_dataset.all_channels_data\`,
  UNNEST(SPLIT(mentioned_countries, ',')) as country
WHERE geo_extraction_version IS NOT NULL
  AND mentioned_countries != ''
GROUP BY country
ORDER BY mentions DESC
LIMIT 20
"

# Geographic scope distribution
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
bq query --use_legacy_sql=false --project_id=triple-upgrade-245423 "
SELECT
  geographic_scope,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 1) as pct
FROM \`btcp_main_dataset.all_channels_data\`
WHERE geo_extraction_version IS NOT NULL
GROUP BY geographic_scope
ORDER BY count DESC
"

# Sample articles with geographic data
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
bq query --use_legacy_sql=false --project_id=triple-upgrade-245423 "
SELECT
  Title,
  mentioned_countries,
  mentioned_cities,
  geographic_scope,
  primary_country
FROM \`btcp_main_dataset.all_channels_data\`
WHERE geo_extraction_version IS NOT NULL
  AND mentioned_countries != ''
ORDER BY Date DESC
LIMIT 10
"
```

### 8.3 Real-Time Enrichment Monitoring

```bash
# Check recent articles have geo data
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/bitcoin-data-chat-key.json \
bq query --use_legacy_sql=false --project_id=triple-upgrade-245423 "
SELECT
  Date,
  Title,
  Outlet,
  mentioned_countries,
  geographic_scope
FROM \`btcp_main_dataset.all_channels_data\`
WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR)
ORDER BY Date DESC
LIMIT 20
"

# Check enrichment service logs
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json \
gcloud run services logs read enrichment-service \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --limit=50
```

---

## 9. Known Limitations & Considerations

Before implementing, be aware of these limitations:

### 9.1 Data Quality

| Issue | Impact | Mitigation |
|-------|--------|------------|
| **"Global" articles dominate** | If >70% of articles have no specific country, globe will look sparse | Test on 200 articles first to validate distribution |
| **Geographic scope is subjective** | "US ETF approval" is local but globally significant | Accept inconsistency; scope is approximate |
| **Model may hallucinate countries** | GPT might extract countries not actually mentioned | No perfect fix; rely on context quality |
| **Company HQ vs. article subject** | Article about Coinbase might extract "US" even if about global market | Prompt explicitly says to ignore HQ locations |

### 9.2 Technical

| Issue | Impact | Mitigation |
|-------|--------|------------|
| **Combined prompt risk** | If geo extraction fails, sentiment/topics also fail | Consider separate API call for geo (higher cost but safer) |
| **Globe library size** | react-globe.gl is ~500KB | Lazy-load the component; consider simpler alternatives |
| **EU is not an ISO code** | "EU" appears in data but isn't mappable to a single point | Handle as a region, not a country |

### 9.3 Recommendations

1. **Start with the backfill test** - Run 200 articles, check accuracy before spending $42
2. **Consider a simpler visualization first** - Bar chart of top countries may be more practical than a 3D globe
3. **Deploy real-time enrichment first** - Then backfill, so no articles fall through the gap
4. **Monitor extraction quality weekly** - Spot-check 20 articles/week for accuracy

---

## 10. Future Enhancements

### 10.1 Short-Term (After Initial Implementation)

1. **City-Level Mapping**: Add coordinates for major cities for more precise globe visualization
2. **Region Aggregation Views**: Create BigQuery views for regional aggregations
3. **Trend-Level Geographic Data**: Aggregate article geo data into the trends table
4. **Real-Time Globe Updates**: WebSocket connection for live updates

### 10.2 Medium-Term

1. **Regulatory Jurisdiction Tracking**: Flag articles by regulatory jurisdiction (SEC, MiCA, etc.)
2. **Geographic Sentiment Analysis**: Sentiment breakdown by country/region
3. **Heat Map Timeline**: Animated visualization showing geographic spread over time
4. **Predictive Signals**: Identify when a region is "heating up" before major news

### 10.3 Long-Term

1. **Multi-Language Support**: Extract locations from non-English articles
2. **Entity Linking**: Link mentioned entities to knowledge graph (companies, people, events)
3. **Geographic Correlation Analysis**: Correlate Bitcoin price movements with regional news patterns
4. **Custom Alerts**: User-defined alerts for specific regions

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2025-11-28 | 1.0 | Initial project document |
| 2025-12-04 | 1.1 | Added pre-implementation checklist, ISO normalization, expanded country list (50 countries), fixed SQL injection in API, proper CSV parsing, known limitations section |

---

## Contact & Support

**Project Owner:** Fernando Nikolic
**Documentation:** `/Users/fernandonikolic/perception/docs/features/GEOGRAPHIC_EXTRACTION_PROJECT.md`
**Related Docs:**
- `/docs/data-pipeline/README.md` - Data pipeline overview
- `/docs/backfill/EXECUTE_BACKFILL_PROMPT.md` - Backfill execution patterns
- `/docs/TRENDS_SYSTEM_ARCHITECTURE.md` - Trends system architecture
