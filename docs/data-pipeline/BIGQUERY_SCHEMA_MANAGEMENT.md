# BigQuery Schema Management

## Overview

This document covers the BigQuery schema structure, evolution, and management strategies used in the Bitcoin data pipeline.

## Current Schema

### Table: `triple-upgrade-245423.btcp_main_dataset.all_channels_data`

```sql
CREATE TABLE `triple-upgrade-245423.btcp_main_dataset.all_channels_data` (
  Date TIMESTAMP NOT NULL,
  Title STRING NOT NULL,
  Content STRING,
  URL STRING NOT NULL,
  Outlet STRING NOT NULL,
  Sentiment STRING,
  Image_URL STRING,          -- Stores image URLs from articles
  author_name STRING,        -- Stores article author information
  BPI FLOAT,                 -- Bitcoin Price Index data
  Topic_1 STRING,            -- Primary topic classification
  Topic_2 STRING,            -- Secondary topic classification
  Topic_3 STRING,            -- Tertiary topic classification
  Topic_4 STRING,            -- Quaternary topic classification
  Country STRING,            -- Geographic information
  Funding STRING,            -- Funding-related information
  Outlet_Category STRING,    -- Category of the news outlet
  Political_Leaning STRING,  -- Political orientation metadata
  All_Topics STRING,         -- Combined topics field
  row_num INTEGER            -- Row identifier
);
```

## Schema Evolution History

### Phase 1: Original Schema
- `BTC_Price` column was used to store Bitcoin price data
- `Google_Trends` column stored Google Trends data

### Phase 2: Column Repurposing (The Problem)
- IFTTT applets were sending image URLs to `BTC_Price` column
- Author names needed to be stored but no dedicated column existed
- Decided to rename columns rather than add new ones

### Phase 3: Column Renaming (The Solution)
```sql
-- Renamed columns to match actual usage
ALTER TABLE `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
RENAME COLUMN BTC_Price TO Image_URL;

ALTER TABLE `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
RENAME COLUMN Google_Trends TO author_name;
```

## Why Column Renaming vs. Adding New Columns

### The Problem with Adding Columns
When we initially tried adding new columns:
```sql
ALTER TABLE `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
ADD COLUMN Image_URL STRING;

ALTER TABLE `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
ADD COLUMN author_name STRING;
```

**Issues encountered:**
1. **Schema Reset**: BigQuery's `insertAll` API auto-detects schema from incoming data
2. **Inconsistent Data Sources**: Different Google Sheets scripts had different column structures
3. **Race Conditions**: Scripts running with old structures would reset the schema
4. **Data Loss**: New columns would disappear when schema reset occurred

### The Solution: Column Renaming
```sql
-- Safe approach - rename existing columns
ALTER TABLE `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
RENAME COLUMN BTC_Price TO Image_URL;
```

**Benefits:**
- ✅ **Schema Stability**: Existing columns can't disappear
- ✅ **No Race Conditions**: All data sources use same column structure
- ✅ **Data Preservation**: Historical data remains intact
- ✅ **Backward Compatibility**: No breaking changes to existing queries

## Data Types and Constraints

### Required Fields
- `Date`: Must be valid timestamp
- `Title`: Must be non-empty string
- `URL`: Must be non-empty string (validated by Apps Script)
- `Outlet`: Must be non-empty string

### Optional Fields
- `Sentiment`: String (for future sentiment analysis)
- `Image_URL`: Valid URL or NULL
- `author_name`: String or NULL
- All topic and metadata fields are optional

### Data Validation
Apps Script performs validation before inserting:
```javascript
// Required field validation
if (!urlField || !title || !outlet) {
  Logger.log("⚠️ Incomplete row - Missing required fields");
  continue;
}

// Date validation
if (isNaN(dateValue.getTime())) {
  Logger.log("⏱️ Invalid date in row");
  continue;
}

// URL validation
let cleanedImageUrl = isValidUrl(imageUrl) ? imageUrl : null;
```

## Schema Monitoring

### Health Checks
```sql
-- Check schema integrity
SELECT column_name, data_type, is_nullable
FROM `triple-upgrade-245423.btcp_main_dataset.INFORMATION_SCHEMA.COLUMNS`
WHERE table_name = 'all_channels_data'
ORDER BY ordinal_position;
```

### Data Quality Checks
```sql
-- Check for missing required fields
SELECT
  COUNT(*) as total_rows,
  COUNTIF(Date IS NULL) as missing_date,
  COUNTIF(Title IS NULL OR Title = '') as missing_title,
  COUNTIF(URL IS NULL OR URL = '') as missing_url,
  COUNTIF(Outlet IS NULL OR Outlet = '') as missing_outlet
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR);
```

### Recent Activity Check
```sql
-- Monitor data flow by outlet
SELECT
  Outlet,
  COUNT(*) as records_last_6h,
  MAX(Date) as latest_entry,
  COUNT(CASE WHEN Image_URL IS NOT NULL THEN 1 END) as has_image_url,
  COUNT(CASE WHEN author_name IS NOT NULL THEN 1 END) as has_author_name
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE Date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 6 HOUR)
GROUP BY Outlet
ORDER BY latest_entry DESC;
```

## Best Practices

### Schema Changes
1. **Always use column renaming** instead of adding new columns when possible
2. **Coordinate all data sources** before making schema changes
3. **Test changes** in a development environment first
4. **Update all Apps Scripts simultaneously** to prevent schema conflicts

### Data Integrity
1. **Validate data** at the Apps Script level before sending to BigQuery
2. **Use consistent data types** across all data sources
3. **Handle NULL values** appropriately
4. **Maintain backup copies** of all sent data

### Performance Optimization
1. **Partition by Date** for better query performance
2. **Use appropriate data types** to minimize storage
3. **Create indexes** on frequently queried columns
4. **Monitor query costs** and optimize expensive queries

## Common Issues and Solutions

### Schema Reset
**Problem**: Columns disappear from BigQuery table
**Cause**: Inconsistent data structure from Apps Scripts
**Solution**: Ensure all Apps Scripts use identical column mapping

### Data Type Mismatches
**Problem**: BigQuery rejects data due to type conflicts
**Cause**: Apps Script sending wrong data types
**Solution**: Explicit type conversion in Apps Script

### Missing Data
**Problem**: Expected data not appearing in BigQuery
**Cause**: Validation failures in Apps Script
**Solution**: Check Apps Script execution logs

### Duplicate Data
**Problem**: Same records appearing multiple times
**Cause**: Timestamp tracking issues in Apps Script
**Solution**: Reset `LAST_SENT_TIMESTAMP` and clean duplicates

## Future Considerations

### Potential Enhancements
1. **Data Lineage Tracking**: Add metadata about data source and processing
2. **Schema Versioning**: Implement version control for schema changes
3. **Automated Validation**: Add BigQuery-level constraints
4. **Data Archiving**: Implement partitioning and lifecycle management

### Migration Planning
1. **Document all dependencies** before making changes
2. **Create migration scripts** for large changes
3. **Plan rollback strategies** in case of issues
4. **Communicate changes** to all stakeholders

## Related Commands

### Useful BigQuery Commands
```bash
# Check current schema
bq show --schema --format=prettyjson triple-upgrade-245423:btcp_main_dataset.all_channels_data

# Add column (if absolutely necessary)
bq query --use_legacy_sql=false "ALTER TABLE \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\` ADD COLUMN new_column STRING"

# Rename column (recommended approach)
bq query --use_legacy_sql=false "ALTER TABLE \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\` RENAME COLUMN old_name TO new_name"

# Drop column (use with caution)
bq query --use_legacy_sql=false "ALTER TABLE \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\` DROP COLUMN column_name"
```