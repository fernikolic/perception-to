# Outlet Categorization System

## Overview

The Outlet Categorization System provides a unified way to categorize media outlets across the Perception platform. It uses a single source of truth (BigQuery `outlet_categories` table) that feeds both the data ingestion pipeline and the frontend.

**Created:** December 13, 2025
**Status:** Active

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    BigQuery: outlet_categories                               │
│                    (Single Source of Truth)                                  │
│                                                                              │
│    ┌────────────────────────────────────────────────────────────────────┐   │
│    │  Outlet                      │  Category                           │   │
│    ├────────────────────────────────────────────────────────────────────┤   │
│    │  Bloomberg                   │  Financial Media                    │   │
│    │  CoinDesk                    │  Crypto Media                       │   │
│    │  Galaxy Research             │  Research                           │   │
│    │  What Bitcoin Did            │  Podcast                            │   │
│    │  Bitcoin Conference          │  Conference                         │   │
│    │  ...                         │  ...                                │   │
│    └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│    343 outlets mapped to 10 categories                                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
        ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
        │  Google Apps  │  │   YouTube     │  │   Frontend    │
        │  Script       │  │   Monitor     │  │   Queries     │
        │               │  │               │  │               │
        │  Pulls from   │  │  Uses config  │  │  Filters by   │
        │  BigQuery on  │  │  for category │  │  category     │
        │  each run     │  │               │  │               │
        └───────┬───────┘  └───────┬───────┘  └───────────────┘
                │                  │
                ▼                  ▼
        ┌─────────────────────────────────────────────────────┐
        │           BigQuery: all_channels_data               │
        │                                                     │
        │  Outlet_Category column populated from lookup       │
        └─────────────────────────────────────────────────────┘
```

---

## Categories

| Category | Description | Example Outlets |
|----------|-------------|-----------------|
| **Financial Media** | Traditional financial news | Bloomberg, CNBC, Reuters, Forbes, Wall Street Journal |
| **Crypto Media** | Cryptocurrency-focused news | CoinDesk, Cointelegraph, The Block, Decrypt, Bitcoin Magazine |
| **Tech Media** | Technology news | Wired, TechCrunch, The Verge, Ars Technica |
| **Legacy Media** | Traditional news outlets (newspapers, TV, international) | BBC, CNN, New York Times, The Guardian, El País |
| **Research** | Research firms and reports | Galaxy Research, Glassnode, Messari, NYDIG, K33 |
| **Communities** | User-generated content platforms | Reddit, Stacker News, Hacker News, Medium |
| **Social Media** | Social platforms | X/Twitter, LinkedIn, YouTube, Telegram |
| **Bitcoin Repositories** | GitHub repositories | bitcoin/bitcoin, lightningnetwork/lnd, fedimint/fedimint |
| **Podcast** | Audio/video podcasts | What Bitcoin Did, Stephan Livera, TFTC, Citadel Dispatch |
| **Conference** | Conference recordings | Bitcoin Conference, BTC Prague, Baltic Honeybadger |

---

## Data Distribution (as of December 13, 2025)

| Category | Count | Percentage |
|----------|-------|------------|
| Social Media | 346,371 | 60.2% |
| Crypto Media | 76,711 | 13.3% |
| Communities | 63,653 | 11.1% |
| Legacy Media | 38,639 | 6.7% |
| Financial Media | 35,394 | 6.1% |
| Bitcoin Repositories | 5,965 | 1.0% |
| Tech Media | 2,529 | 0.4% |
| Podcast | 1,370 | 0.2% |
| Research | 564 | 0.1% |
| Unmapped | ~4,500 | 0.8% |

**Total rows:** ~575,000

---

## Components

### 1. BigQuery Table: `outlet_categories`

**Location:** `triple-upgrade-245423.btcp_main_dataset.outlet_categories`

**Schema:**
```sql
CREATE TABLE outlet_categories (
  Outlet STRING,    -- Outlet name (must match exactly)
  Category STRING   -- One of the 10 categories above
);
```

**Current size:** 343 outlet mappings

### 2. Google Apps Script

**File:** `scripts/google-apps-script/categorize-outlets-v2.js`

**Purpose:** Categorizes new articles as they flow from IFTTT → Google Sheets → BigQuery

**How it works:**
1. Fetches category mappings from `outlet_categories` table
2. Caches mappings for 6 hours (for performance)
3. Looks up each outlet and writes category to Column P
4. Falls back to "Other" for unmapped outlets

**Key functions:**
- `categorizeOutlets()` - Main function, call from trigger
- `getOutletCategories()` - Gets mappings from cache or BigQuery
- `refreshCategoryCache()` - Force refresh after adding new outlets

### 3. YouTube Conference Monitor

**File:** `scripts/conference/conference-youtube-monitor.cjs`

**Purpose:** Extracts videos from Bitcoin conference YouTube channels

**Categorization:** Uses channel config to set `Outlet_Category`:
- Conference channels → "Conference"
- Podcast channels → "Podcast"

### 4. Backfill Scripts

**Location:** `scripts/sql/`

- `update-outlet-categories.sql` - Full rebuild of outlet_categories table
- `backfill-outlet-categories.sql` - Update all_channels_data from lookup table

---

## Usage

### Adding a New Outlet

1. **Insert into outlet_categories:**
```sql
INSERT INTO `triple-upgrade-245423.btcp_main_dataset.outlet_categories`
  (Outlet, Category)
VALUES
  ('New Outlet Name', 'Crypto Media');
```

2. **Backfill existing rows (optional):**
```sql
UPDATE `triple-upgrade-245423.btcp_main_dataset.all_channels_data` a
SET a.Outlet_Category = c.Category
FROM `triple-upgrade-245423.btcp_main_dataset.outlet_categories` c
WHERE a.Outlet = c.Outlet
  AND (a.Outlet_Category IS NULL OR a.Outlet_Category = '');
```

3. **Refresh Apps Script cache:**
Run `refreshCategoryCache()` in the Apps Script, or wait 6 hours for auto-refresh.

### Querying by Category

```sql
-- Get all Research articles
SELECT *
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE Outlet_Category = 'Research'
ORDER BY Date DESC;

-- Get category breakdown for a date range
SELECT
  Outlet_Category,
  COUNT(*) as count
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
WHERE Date >= '2025-12-01'
GROUP BY Outlet_Category
ORDER BY count DESC;
```

### Checking Unmapped Outlets

```sql
-- Find outlets not in the lookup table
SELECT
  a.Outlet,
  COUNT(*) as count
FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data` a
LEFT JOIN `triple-upgrade-245423.btcp_main_dataset.outlet_categories` c
  ON a.Outlet = c.Outlet
WHERE c.Outlet IS NULL
  AND a.Outlet IS NOT NULL
GROUP BY a.Outlet
ORDER BY count DESC
LIMIT 50;
```

---

## Migration History

### December 13, 2025 - Initial Setup

**Problem:**
- `Outlet_Category` column existed but was mostly NULL (~460K rows)
- Multiple conflicting category systems:
  - BigQuery table had 133 outlets with inconsistent names
  - Apps Script had hardcoded arrays with different category names
  - Frontend had its own hardcoded categorization
- Same outlet could have different categories depending on ingestion method

**Solution:**
1. Unified category names (chose BigQuery-style: "Financial Media" not "Financial News")
2. Added new categories: Podcast, Conference
3. Rebuilt `outlet_categories` table with 343 outlets
4. Backfilled 549,436 rows in `all_channels_data`
5. Created new Apps Script that pulls from BigQuery instead of hardcoding

**Before:**
- Mapped outlets: 133
- Categorized rows: ~115K
- Unmapped rows: ~460K (80%)

**After:**
- Mapped outlets: 343
- Categorized rows: ~571K
- Unmapped rows: ~4.5K (0.8%)

---

## Maintenance

### Weekly Tasks
- Check for new unmapped outlets (query above)
- Add frequently appearing outlets to `outlet_categories`

### When Adding New Data Sources
1. Identify all outlet names that will appear
2. Add them to `outlet_categories` before ingestion begins
3. This ensures proper categorization from the start

### Troubleshooting

**Issue: New articles showing wrong category**
- Check if outlet name matches exactly (case-sensitive, accent-sensitive)
- Add variant spellings to `outlet_categories` if needed

**Issue: Apps Script not picking up new outlets**
- Run `refreshCategoryCache()` to force cache refresh
- Check BigQuery API is enabled in Apps Script project

**Issue: Frontend not showing Research articles**
- Verify `Outlet_Category = 'Research'` in BigQuery
- Check frontend query is filtering by `Outlet_Category` not hardcoded outlet names

---

## Related Documentation

- [BIGQUERY_IFTTT_FLOW_OVERVIEW.md](./BIGQUERY_IFTTT_FLOW_OVERVIEW.md) - Data ingestion pipeline
- [CONFERENCE_VIDEO_MONITORING_SYSTEM.md](../CONFERENCE_VIDEO_MONITORING_SYSTEM.md) - YouTube conference monitor
- [outlet-categorization.ts](../../src/lib/utils/outlet-categorization.ts) - Frontend categorization utilities

---

## File Locations

| File | Purpose |
|------|---------|
| `scripts/sql/update-outlet-categories.sql` | Full SQL to rebuild outlet_categories table |
| `scripts/sql/backfill-outlet-categories.sql` | Backfill query template |
| `scripts/google-apps-script/categorize-outlets-v2.js` | New Apps Script for Google Sheets |
| `scripts/conference/conference-youtube-monitor.cjs` | YouTube monitor (uses channel config) |
| `data/conference/conference-channels-config.json` | YouTube channel configuration |
