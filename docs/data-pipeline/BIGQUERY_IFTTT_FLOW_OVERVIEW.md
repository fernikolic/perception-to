# BigQuery IFTTT Google Sheets Data Pipeline Overview

## System Architecture

This document provides a comprehensive overview of the data pipeline that flows from IFTTT applets through Google Sheets to BigQuery, supporting the Bitcoin data analysis platform.

## High-Level Flow

```
IFTTT Applets → Google Sheets → Apps Script → BigQuery → Cloud Run Services → UI
```

## Components Overview

### 1. IFTTT Applets
- **Purpose**: Automatically collect Bitcoin-related content from various sources
- **Sources**: Reddit, X (Twitter), News outlets, GitHub, etc.
- **Output**: Structured data sent to Google Sheets

### 2. Google Sheets (8 Different Sheets)
- **All Media**: General Bitcoin news aggregation
- **Reddit**: Bitcoin subreddit posts
- **X (Twitter)**: Bitcoin-related tweets
- **YouTube**: Bitcoin video content
- **Research**: Academic and research papers
- **GitHub PRs**: Bitcoin development activity
- **Hacker News**: Bitcoin discussions
- **Spotify**: Bitcoin podcast content

### 3. Apps Script Processing
- **Location**: Each Google Sheet contains an Apps Script
- **Function**: `sendDataToBigQuery()`
- **Purpose**: Process, validate, and send data to BigQuery
- **Features**: Deduplication, data cleaning, incremental sync

### 4. BigQuery Database
- **Project**: `triple-upgrade-245423`
- **Dataset**: `btcp_main_dataset`
- **Main Table**: `all_channels_data`
- **Purpose**: Central data warehouse for all Bitcoin content

### 5. Cloud Run Services
- **Service**: `btcpapifunction3-1-final`
- **Purpose**: API layer for querying BigQuery data
- **Endpoints**: `/trends`, `/extract`, `/intelligence/categories`

## Data Flow Details

### IFTTT → Google Sheets
Each IFTTT applet uses a specific template to populate Google Sheets columns:

```
{{ArticlePublishedAt}} ||| {{ArticleTitle}} ||| {{ArticleContent}} ||| {{ArticleURL}} ||| ||| ||| {{ArticleFirstImageURL}} ||| {{ArticleAuthor}} ||| ||| ||| ||| ||| ||| ||| ||| |||
```

**Column Mapping:**
- A: Date ({{ArticlePublishedAt}})
- B: Title ({{ArticleTitle}})
- C: Content ({{ArticleContent}})
- D: URL ({{ArticleURL}})
- E: Outlet (filled by sheet name)
- F: Sentiment (empty, for future use)
- G: Image URL ({{ArticleFirstImageURL}})
- H: Author Name ({{ArticleAuthor}})
- I-Q: Additional metadata fields

### Google Sheets → BigQuery
Each Google Sheet runs an Apps Script that:

1. **Reads new data** from the sheet
2. **Validates required fields** (URL, Title, Outlet)
3. **Cleans data** (removes non-ASCII characters)
4. **Formats for BigQuery** with proper column mapping
5. **Sends to BigQuery** via REST API
6. **Backs up successfully sent data**
7. **Deletes processed rows** from the source sheet

### BigQuery Schema
The `all_channels_data` table contains:

```sql
CREATE TABLE `triple-upgrade-245423.btcp_main_dataset.all_channels_data` (
  Date TIMESTAMP,
  Title STRING,
  Content STRING,
  URL STRING,
  Outlet STRING,
  Sentiment STRING,
  Image_URL STRING,        -- Renamed from BTC_Price
  author_name STRING,      -- Renamed from Google_Trends
  BPI FLOAT,
  Topic_1 STRING,
  Topic_2 STRING,
  Topic_3 STRING,
  Topic_4 STRING,
  Country STRING,
  Funding STRING,
  Outlet_Category STRING,
  Political_Leaning STRING,
  All_Topics STRING,
  row_num INTEGER
);
```

## Key Features

### Incremental Processing
- Each Apps Script tracks `LAST_SENT_TIMESTAMP`
- Only processes new data since last successful run
- Prevents duplicate data in BigQuery

### Error Handling
- Failed insertions are logged but don't stop processing
- Backup sheet maintains copy of all sent data
- Malformed rows are skipped with detailed logging

### Schema Stability
- Uses column renaming instead of adding new columns
- Prevents BigQuery schema resets
- Maintains backward compatibility

## Monitoring & Maintenance

### Scheduled Operations
- **Trends Extraction**: Hourly via Cloud Scheduler
- **Data Sync**: Triggered by IFTTT applets
- **Schema Updates**: Manual when needed

### Common Issues
1. **Schema Resets**: Caused by inconsistent column structures
2. **Duplicate Data**: Usually due to timestamp tracking issues
3. **Missing Data**: Often due to IFTTT applet failures

### Health Checks
```sql
-- Check recent activity by outlet
SELECT
  Outlet,
  COUNT(*) as records_last_6h,
  MAX(Date) as latest_entry
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 6 HOUR)
GROUP BY Outlet
ORDER BY latest_entry DESC;
```

## Related Documentation
- [Google Sheets Apps Script Reference](./GOOGLE_SHEETS_APPS_SCRIPT.md)
- [BigQuery Schema Management](./BIGQUERY_SCHEMA_MANAGEMENT.md)
- [IFTTT Configuration Guide](./IFTTT_CONFIGURATION.md)
- [Troubleshooting Guide](./TROUBLESHOOTING_GUIDE.md)