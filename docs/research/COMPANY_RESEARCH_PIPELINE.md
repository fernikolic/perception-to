# Company Research Pipeline

Automated system to research companies and their Bitcoin/crypto activities using Google News Search, Scrape.do, and BigQuery.

## Overview

```
Company List → Google News Search → Scrape.do → Extract Metadata → CSV → BigQuery
```

## Quick Start

```bash
# Install dependencies (if needed)
npm install @google-cloud/bigquery dotenv

# Dry run - see what would happen
node scripts/research/company-research-pipeline.cjs --dry-run --companies "MicroStrategy,Tesla"

# Single company
node scripts/research/company-research-pipeline.cjs --company "MicroStrategy"

# Multiple companies
node scripts/research/company-research-pipeline.cjs --companies "MicroStrategy,Tesla,Block"

# From CSV file
node scripts/research/company-research-pipeline.cjs --file data/research/sample-companies.csv

# With date range (early Bitcoin era)
node scripts/research/company-research-pipeline.cjs --companies "MicroStrategy" --date-range "2009-2015"
```

## Prerequisites

### 1. Google Custom Search API
- API Key: Already configured in `/functions/.env`
- Search Engine ID: Create a news-specific one (see setup guide below)

### 2. Scrape.do Account
- API Key: Already configured in `/functions/.env.yaml`
- Plan: Hobby ($29/month) - 250,000 credits

### 3. BigQuery Access
- Project: `triple-upgrade-245423`
- Dataset: `btcp_main_dataset`
- Table: `company_research_data`

## Configuration Files

| File | Purpose |
|------|---------|
| `/scripts/research/company-research-pipeline.cjs` | Main pipeline script |
| `/scripts/research/company-research-config.json` | Companies and settings |
| `/data/research/sample-companies.csv` | Input company list |
| `/data/schemas/company_research_schema.json` | BigQuery table schema |
| `/data/research/company-research-progress.json` | Resume progress |
| `/data/research/company-research-results.csv` | Output results |

## Setting Up Google News Search Engine

**Important:** The default search engine is for images. Create a dedicated news search engine.

See: `/docs/research/GOOGLE_NEWS_SEARCH_ENGINE_SETUP.md`

Quick steps:
1. Go to https://programmablesearchengine.google.com/controlpanel/create
2. Create engine with news domains (reuters.com, bloomberg.com, coindesk.com, etc.)
3. Copy the Search Engine ID
4. Add to `.env`: `GOOGLE_NEWS_SEARCH_ENGINE_ID=your_new_id`

## Date Ranges

The pipeline supports searching within specific date ranges:

| Range | Years | Description |
|-------|-------|-------------|
| Early Bitcoin | 2009-2015 | Sparse coverage, early adopters |
| Growth Era | 2016-2020 | Increasing institutional interest |
| Institutional Era | 2021-2025 | Major corporate adoption |

Usage:
```bash
node scripts/research/company-research-pipeline.cjs --companies "MicroStrategy" --date-range "2009-2015"
```

## Output

### CSV Format
The pipeline outputs to `/data/research/company-research-results.csv` with columns:
- `research_id` - Unique identifier
- `company_name` - Company researched
- `url` - Article URL
- `title` - Article title
- `date` - Publication date
- `author_name` - Author (if found)
- `outlet` - News outlet domain
- `sentiment` - positive/negative/neutral
- `company_mentions` - Count of company name mentions
- `bitcoin_mentions` - Count of Bitcoin mentions
- `relevance_score` - 0-1 relevance score
- `topics` - Extracted topics

### BigQuery Table
After review, upload to BigQuery:
```bash
node scripts/research/upload-to-bigquery.cjs
```

## Cost Estimates

| Companies | Google Calls | Scrape.do Calls | Est. Cost |
|-----------|-------------|-----------------|-----------|
| 5 | 5 | 50 | $0.00 |
| 10 | 10 | 100 | $0.00 |
| 50 | 50 | 500 | $0.00 |
| 100 | 100 | 1,000 | $0.00* |

*Assumes free tier Google (100/day) + Hobby plan Scrape.do

## Features

- Google News integration with date filtering
- Scrape.do anti-detection proxies
- Automatic metadata extraction (title, date, author, content)
- Sentiment analysis
- Company/Bitcoin mention counting
- Relevance scoring
- Progress tracking with resume capability
- CSV output for review before BigQuery
- Cost tracking

## Sample Companies

The default list includes major Bitcoin-related companies:

1. **MicroStrategy** - Largest corporate Bitcoin holder
2. **Tesla** - Early corporate adopter
3. **Block (Square)** - Jack Dorsey's Bitcoin company
4. **Coinbase** - Major crypto exchange
5. **BlackRock** - Bitcoin ETF provider
6. **Fidelity** - Institutional custody
7. **ARK Invest** - Cathie Wood's Bitcoin ETF
8. **Marathon Digital** - Bitcoin mining
9. **Riot Platforms** - Bitcoin mining
10. **Galaxy Digital** - Michael Novogratz

## Troubleshooting

### "No results found"
- Check your Search Engine ID is configured for news sites
- Try broader date range
- Verify company name spelling

### Rate limiting (429)
- The script has automatic retry with exponential backoff
- Consider reducing `CONCURRENT_SCRAPES` in config

### Missing authors/dates
- Some sites block metadata extraction
- The script uses multiple extraction methods

## Adding New Companies

1. Edit `/data/research/sample-companies.csv`
2. Or use the config: `/scripts/research/company-research-config.json`
3. Format: `company_name,priority,custom_keywords,aliases`

Example:
```csv
PayPal,high,Bitcoin cryptocurrency payments,PYPL;PayPal Holdings
Grayscale,high,Bitcoin trust GBTC,Grayscale Investments
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Company Research Pipeline                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ INPUT: Company List (CSV or --companies arg)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Google Custom Search API                            │
│ • Query: "{company} Bitcoin news"                           │
│ • Results: Top 10 URLs per company                          │
│ • Date filtering via after:/before: operators               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: URL Filtering                                       │
│ • Remove social media (Twitter, Reddit, etc.)               │
│ • Deduplicate URLs                                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Scrape.do API                                       │
│ • Fetch each URL with anti-detection                        │
│ • Automatic retries with backoff                            │
│ • 5 concurrent requests                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Content Extraction                                  │
│ • Title (og:title, <title>, h1)                            │
│ • Date (JSON-LD, meta tags, time elements)                 │
│ • Author (JSON-LD, meta tags, bylines)                     │
│ • Content (article body, meta description)                 │
│ • Image (og:image)                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 5: Analysis                                            │
│ • Sentiment detection                                       │
│ • Topic extraction                                          │
│ • Company/Bitcoin mention counting                          │
│ • Relevance scoring                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 6: Output                                              │
│ • Write to CSV for review                                   │
│ • (Later) Upload to BigQuery                               │
└─────────────────────────────────────────────────────────────┘
```

## Version History

- **1.0.0** - Initial release with Google News + Scrape.do integration
