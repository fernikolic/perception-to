# Python Scripts Documentation

## Overview

This directory contains comprehensive documentation for all Python utility scripts used in the Bitcoin Perception Dashboard project. These scripts handle data migration, analysis, testing, and maintenance operations.

## Script Categories

### 📊 [Data Upload Scripts](./data-upload.md)
Scripts for uploading CSV data to Firestore with various strategies and optimizations.

### 🔍 [Data Analysis Scripts](./data-analysis.md)
Scripts for analyzing data integrity, missing records, and performing verification.

### 🛠️ [Maintenance Scripts](./maintenance.md)
Scripts for system maintenance, backfill operations, and data cleanup.

### 🧪 [Testing Scripts](./testing.md)
Scripts for testing functionality, search capabilities, and verification.

## Quick Reference

| Script | Category | Purpose | Status |
|--------|----------|---------|--------|
| `upload-csv.py` | Upload | Basic CSV chunked upload | ✅ Stable |
| `upload-csv-proper.py` | Upload | Enhanced CSV upload with validation | ✅ Stable |
| `final-upload-strategy.py` | Upload | Optimized final upload approach | ✅ Production |
| `analyze-missing-records.py` | Analysis | Identify missing data patterns | ✅ Stable |
| `comprehensive-verification.py` | Testing | Complete system verification | ✅ Production |
| `run-search-backfill.py` | Maintenance | SearchTerms field backfill | ✅ Production |
| `clean-corrupted-firestore.py` | Maintenance | Clean corrupted Firestore data | ✅ Utility |

## Current Operations

### Active Background Processes
- **Search Backfill**: Running searchTerms field population
- **Data Upload**: Uploading unique records to Firestore
- **Missing Records**: Filling missing data gaps

### Recently Used Scripts
- `run-search-backfill.py` - Currently executing searchTerms backfill
- `final-upload-strategy.py` - Uploading unique records
- `chunked-fill-missing.py` - Processing missing records

## Usage Guidelines

### Prerequisites
```bash
# Required Python packages
pip install requests pandas firebase-admin

# Environment setup
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

### Common Patterns
```bash
# Dry run first (recommended)
python3 script_name.py --dry-run

# Monitor with verbose output
python3 script_name.py --verbose

# Background execution for long-running tasks
python3 script_name.py &
```

### Safety Protocols
1. **Always run dry-run first** for data modification scripts
2. **Monitor logs** during execution
3. **Verify results** after completion
4. **Backup data** before major operations

## Script Dependencies

### Cloud Functions
- `uploadHistoricalCSV` - CSV data upload endpoint
- `backfillSearchTerms` - SearchTerms field population
- `fillMissingRecords` - Missing data fill endpoint
- `hybridFeed` - Search and verification endpoint

### Data Sources
- CSV files (historical Bitcoin data)
- Firestore database (live data storage)
- External APIs (real-time data verification)

## Troubleshooting

### Common Issues
- **Timeout errors**: Increase request timeout values
- **Memory issues**: Use smaller batch sizes
- **Rate limiting**: Add delays between requests
- **Authentication errors**: Verify service account credentials

### Debug Commands
```bash
# Check script status
ps aux | grep python3

# Monitor log output
tail -f script_output.log

# Verify Firestore connection
python3 -c "import firebase_admin; print('Firebase connection OK')"
```

## Contributing

### Adding New Scripts
1. Follow naming convention: `purpose-action.py`
2. Include comprehensive docstring
3. Add error handling and logging
4. Update this documentation
5. Add to appropriate category documentation

### Code Standards
- Use type hints for function parameters
- Include docstrings for all functions
- Handle exceptions gracefully
- Log important operations
- Support dry-run mode where applicable

---

**Last Updated**: September 20, 2025
**Total Scripts**: 22 documented scripts
**Categories**: 4 major categories