# Upload Tools Reference Guide

**Created During**: Dataset Migration Project
**Purpose**: Technical reference for data upload and verification tools
**Status**: Production-ready tools

## Overview

This document catalogs all the tools created during the dataset migration project for uploading, analyzing, and verifying Bitcoin Perception Dashboard data.

## Core Upload Tools

### 1. single-batch.py
**Purpose**: Upload individual batches of records for controlled processing
**Usage**: `python3 single-batch.py [start_row] [batch_size]`
**Default**: 2,000 records per batch starting from row 10,001

```bash
# Upload batch starting from row 10,001
python3 single-batch.py 10001

# Upload batch starting from row 50,001
python3 single-batch.py 50001

# Upload with custom batch size
python3 single-batch.py 10001 1500
```

**Features**:
- Real-time progress reporting
- Error tracking and statistics
- Automatic CSV escaping
- Current count verification
- SSL timeout handling

### 2. final-upload-strategy.py
**Purpose**: Systematic batch processing with automatic stopping
**Usage**: `python3 final-upload-strategy.py [csv_file] [chunk_size] [start_chunk]`

```bash
# Process entire file in 3k chunks
python3 final-upload-strategy.py unique_records.csv 3000 1

# Resume from chunk 20
python3 final-upload-strategy.py unique_records.csv 3000 20
```

**Features**:
- Automatic target detection
- Progress tracking every 10 chunks
- Resume capability
- Safety limits (max 50 chunks per session)
- Batch statistics reporting

### 3. chunked-fill-missing.py
**Purpose**: Upload to fillMissingRecords function in chunks
**Usage**: `python3 chunked-fill-missing.py [csv_file] [chunk_size]`

```bash
# Upload in 10k chunks to fillMissingRecords
python3 chunked-fill-missing.py unique_records.csv 10000
```

**Features**:
- Uses fillMissingRecords endpoint
- Smart duplicate detection
- Progress monitoring
- Large file handling

## Analysis & Verification Tools

### 4. direct-url-analysis.py
**Purpose**: Analyze CSV for URL uniqueness and missing records
**Usage**: `python3 direct-url-analysis.py [csv_file]`

```bash
# Analyze unique URLs in CSV
python3 direct-url-analysis.py /Users/username/Downloads/bq-results.csv
```

**Output**:
- Total unique URLs count
- Duplicate analysis
- Missing records calculation
- Clean CSV generation

### 5. analyze-url-uniqueness.py
**Purpose**: Statistical sampling comparison between CSV and Firestore
**Usage**: `python3 analyze-url-uniqueness.py [csv_file]`

**Features**:
- Random sampling approach
- Firestore comparison
- Missing URL identification
- Statistical extrapolation

### 6. comprehensive-verification.py
**Purpose**: Complete system status verification
**Usage**: `python3 comprehensive-verification.py`

**Verification Areas**:
- Current Firestore count
- Hybrid feed totals
- Recent data analysis (last 7 days)
- API endpoint status
- Automatic sync verification
- Target achievement confirmation

## Utility Tools

### 7. test-upload.py
**Purpose**: Test upload functionality with small datasets
**Usage**: `python3 test-upload.py [csv_file]`

**Features**:
- Small batch testing
- Upload verification
- Error diagnosis
- Quick validation

### 8. rapid-upload.py
**Purpose**: Fast batch processing for urgent uploads
**Usage**: `python3 rapid-upload.py`

**Configuration**:
- 2,000 record batches
- 20 batch limit per session
- Minimal delays
- Progress tracking every 5 batches

## Data Processing Tools

### 9. force-full-reupload.py
**Purpose**: Attempt complete CSV re-upload (for reference)
**Usage**: `python3 force-full-reupload.py [csv_file]`

**Note**: Created for completeness but typically fails on large files due to Cloud Function limits.

### 10. upload-tail-records.py
**Purpose**: Upload last N records from CSV
**Usage**: `python3 upload-tail-records.py [csv_file] [tail_size]`

```bash
# Upload last 30,000 records
python3 upload-tail-records.py bq-results.csv 30000
```

## Analysis Results Files

### Generated Datasets
- **unique_records.csv**: 432,631 unique URL records (duplicates removed)
- **missing_urls.csv**: Sample of missing URL records identified
- **test_5k.csv**: 5,000 record test dataset
- **test_unique_1000.csv**: 1,000 record test dataset

### Key Statistics
```
Total CSV Rows: 433,333
Unique URLs: 432,631
Duplicates: 702 (0.16% duplication rate)
Target Achievement: 100.5% (434,617 final count)
```

## Function Endpoints

### Upload Endpoints
1. **uploadHistoricalCSV**: `https://us-central1-perception-app-3db34.cloudfunctions.net/uploadHistoricalCSV`
   - Standard upload endpoint
   - Returns detailed statistics
   - Handles duplicate detection

2. **fillMissingRecords**: `https://us-central1-perception-app-3db34.cloudfunctions.net/fillMissingRecords`
   - Smart missing record detection
   - URL-based comparison
   - Batch insertion capabilities

### Verification Endpoints
1. **Count Check**: `uploadHistoricalCSV?status=check`
   - Returns current Firestore document count
   - POST request required

2. **Hybrid Feed**: `hybridFeed/feed`
   - Returns paginated access to data
   - Supports date range queries
   - Provides total count in pagination

## Best Practices

### Upload Strategy
1. **Start Small**: Test with 1,000-2,000 record batches
2. **Monitor Progress**: Check counts every 5-10 batches
3. **Handle Errors**: Expect ~1% error rate, mostly validation issues
4. **Resume Capability**: Use start_row parameters to resume interrupted uploads
5. **Verify Results**: Always run verification after major uploads

### Error Handling
- **SSL Timeouts**: Retry with smaller batch sizes
- **Validation Errors**: Normal for malformed data (~1% rate)
- **Duplicate Errors**: Indicates data quality, not upload failure
- **Function Timeouts**: Use chunked approaches for large datasets

### Performance Tips
- **Batch Size**: 2,000-5,000 records optimal for reliability
- **Delays**: 2-5 second delays between batches prevent overload
- **Monitoring**: Check counts every 5-10 batches
- **Parallel Processing**: Avoid - can cause conflicts

## Troubleshooting

### Common Issues
1. **SSL Timeouts**: Reduce batch size to 1,000-1,500 records
2. **Memory Errors**: Use chunked upload approaches
3. **Function Limits**: Deploy with higher memory allocation
4. **Count Discrepancies**: Different functions may filter differently

### Diagnostic Commands
```bash
# Check current count
curl -X POST "https://us-central1-perception-app-3db34.cloudfunctions.net/uploadHistoricalCSV?status=check"

# Test small upload
python3 test-upload.py test_1k.csv

# Full system verification
python3 comprehensive-verification.py
```

## Tool Selection Guide

| Use Case | Recommended Tool | Batch Size | Notes |
|----------|------------------|------------|-------|
| Large migration | final-upload-strategy.py | 3,000 | Best for systematic uploads |
| Precise control | single-batch.py | 2,000 | Manual batch-by-batch |
| Missing records | chunked-fill-missing.py | 5,000 | Uses smart detection |
| Quick test | test-upload.py | 1,000 | Validation and testing |
| Analysis | comprehensive-verification.py | N/A | System status check |
| URL verification | direct-url-analysis.py | N/A | Duplicate analysis |

## Security Notes

- All tools use HTTPS endpoints
- No authentication tokens stored in scripts
- CSV data remains local during processing
- Function access controlled by Firebase IAM

---

**Created**: September 20, 2025
**Status**: Production Ready
**Maintenance**: Tools are stable and require no ongoing maintenance