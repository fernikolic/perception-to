# Project Reorganization Summary

This document summarizes the file reorganization performed on November 8, 2025.

## New Directory Structure

### `/docs` - Documentation
Organized into subdirectories by topic:

- **`docs/security/`** - Security audit reports and fixes
  - SECURITY_AUDIT_REPORT.md
  - SECURITY_FIXES_APPLIED.md
  - SECURITY_RESOLVED.md
  - ADDITIONAL_SECURITY_AUDIT.md
  - SECURITY_FIXES_IMMEDIATE.md

- **`docs/content/`** - Content strategy and status documents
  - CONTENT_GUIDE.md
  - CONTENT_PRODUCTION_COMPLETE.md
  - CONTENT_RESTRUCTURE_COMPLETE.md
  - CONTENT_GUARANTEE.md
  - CONTENT_STATUS_REPORT.md

- **`docs/guides/`** - Implementation and feature guides
  - BITCOIN_MARKET_SENTIMENT_README.md
  - CONFERENCE_AUTOMATION.md
  - HERO_CONVEYOR_DOCS.md
  - PAYLOAD_ARTICLE_UPLOAD_README.md
  - PAYLOAD_CMS_IMPORT_GUIDE.md
  - PAYLOAD_GLOSSARY_UPLOAD_README.md
  - SOCIAL_IMAGES_GUIDE.md
  - SOCIAL_IMAGES_README.md

- **`docs/seo/`** - SEO documentation and PRDs
  - PROGRAMMATIC_SEO_IMPLEMENTATION.md
  - programmatic-seo-prd.md
  - SEO_IMPROVEMENTS.md
  - SOCIAL_GRAPH_IMPROVEMENTS.md

- **`docs/`** (root) - General documentation
  - perception-summary-firecrawl.md

### `/data` - Data Files
Organized by data type:

- **`data/intelligence/`** - Intelligence article data
  - intelligence-articles-export.json
  - intelligence-glossary-seo.json
  - intelligence-meta-tags.json
  - intelligence-structured-data.json

- **`data/seo/`** - SEO and content data
  - content-stats.json
  - internal-linking-map.json
  - robots-intelligence-additions.txt
  - seo-keyword-mapping.json

### `/scripts/scrapers` - Web Scraping Scripts
- scrape-perception.js
- scrape-perception-simple.js
- scrape-perception-firecrawl.js

### `/public/standalone` - Standalone HTML Pages
- fear-greed-index-standalone.html

## Files Removed
- `.ghost-cli` - Unused Ghost CMS configuration
- `.ghostpid` - Unused Ghost CMS process ID
- `dev.log` - Development log (now in .gitignore)

## Updated Files
- **`.gitignore`** - Added entries for:
  - Development logs (*.log, dev.log)
  - Build artifacts (*.tsbuildinfo)
  - Ghost CMS files (.ghost-cli, .ghostpid)

## Benefits
1. **Clearer structure** - Related files are grouped together
2. **Easier navigation** - Documentation is categorized by topic
3. **Reduced clutter** - Root directory only contains essential config files
4. **Better maintainability** - New files have clear locations based on their purpose
