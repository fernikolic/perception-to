# Maintenance Scripts

## Overview

Scripts for system maintenance, data backfill operations, cleanup tasks, and ongoing data integrity maintenance for the Bitcoin Perception Dashboard.

## Scripts

### 1. `run-search-backfill.py` - SearchTerms Field Backfill
**Purpose**: Add missing `searchTerms` field to CSV-imported records for optimal search performance

**Status**: 🔄 **Currently Running** - Executing searchTerms backfill operation

**Features**:
- Batch processing with configurable batch sizes
- Dry run capability for testing
- Progress tracking and ETA calculations
- Automatic retry with exponential backoff
- Resume capability from interruption points

**Usage**:
```bash
# Dry run to estimate scope
python3 run-search-backfill.py test

# Execute backfill operation
python3 run-search-backfill.py execute

# Execute with custom batch size
python3 run-search-backfill.py execute --batch-size 1000

# Resume from specific point
python3 run-search-backfill.py execute --start-after "document_id"
```

**Key Functions**:
```python
def run_backfill_batch(batch_size: int = 500, dry_run: bool = True, start_after: str = None) -> dict:
    """Run a single batch of the backfill process"""

def continuous_backfill(batch_size: int = 500, dry_run: bool = False) -> None:
    """Run continuous backfill until completion"""

def monitor_backfill_progress() -> dict:
    """Monitor current backfill progress and statistics"""
```

**Current Operation**:
```bash
# Active backfill command
python3 run-search-backfill.py execute
# Processing documents to add searchTerms field for enhanced search performance
```

---

### 2. `clean-corrupted-firestore.py` - Data Cleanup
**Purpose**: Identify and clean corrupted or malformed data in Firestore

**Features**:
- Automated corruption detection
- Safe cleanup with backup options
- Detailed logging of cleanup operations
- Verification of cleanup success

**Usage**:
```bash
# Scan for corrupted data (dry run)
python3 clean-corrupted-firestore.py --scan-only

# Clean corrupted data with backup
python3 clean-corrupted-firestore.py --clean --backup

# Clean specific date range
python3 clean-corrupted-firestore.py --clean --start-date 2020-01-01 --end-date 2020-12-31
```

**Cleanup Operations**:
```python
def detect_corrupted_records(collection: str) -> List[str]:
    """Detect records with corruption indicators"""

def backup_before_cleanup(doc_ids: List[str]) -> str:
    """Create backup of records before cleanup"""

def clean_corrupted_records(doc_ids: List[str], backup_path: str) -> dict:
    """Clean corrupted records with safety measures"""
```

---

### 3. `chunked-fill-missing.py` - Missing Records Fill
**Purpose**: Fill missing records identified through analysis with optimized chunked processing

**Status**: 🔄 **Currently Running** - Processing unique_records.csv with 5000 record batches

**Features**:
- Large file processing with memory optimization
- Intelligent chunking based on available resources
- Progress tracking with detailed statistics
- Error recovery and retry mechanisms

**Usage**:
```bash
# Process missing records with default chunk size
python3 chunked-fill-missing.py missing_records.csv

# Custom chunk size for resource optimization
python3 chunked-fill-missing.py unique_records.csv 5000

# Background processing with logging
python3 chunked-fill-missing.py unique_records.csv 5000 > fill_missing.log 2>&1 &
```

**Current Operation**:
```bash
# Active fill operation
python3 chunked-fill-missing.py unique_records.csv 5000 &
# Processing missing records in 5000-record chunks
```

---

### 4. `use-fill-missing-records.py` - Strategic Missing Records Fill
**Purpose**: Use the fillMissingRecords Cloud Function for targeted data recovery

**Features**:
- Integration with Cloud Function endpoints
- Targeted missing record identification
- Batch processing with Cloud Function optimization
- Real-time progress monitoring

**Usage**:
```bash
# Identify and fill missing records
python3 use-fill-missing-records.py

# Target specific time periods
python3 use-fill-missing-records.py --start-date 2020-01-01 --end-date 2020-12-31

# Fill with custom batch sizes
python3 use-fill-missing-records.py --batch-size 2000
```

---

### 5. `force-full-reupload.py` - Complete Data Refresh
**Purpose**: Force complete re-upload of data when structural changes are needed

**Features**:
- Complete data replacement strategy
- Backup creation before re-upload
- Verification of upload completeness
- Rollback capability if issues occur

**Usage**:
```bash
# Force full re-upload with backup
python3 force-full-reupload.py --backup-first

# Re-upload specific collections
python3 force-full-reupload.py --collection feed_entries

# Verify only (no actual upload)
python3 force-full-reupload.py --verify-only
```

**Safety Measures**:
```python
def create_full_backup() -> str:
    """Create complete backup before re-upload"""

def verify_reupload_success(original_count: int) -> bool:
    """Verify re-upload completed successfully"""

def rollback_if_needed(backup_path: str) -> bool:
    """Rollback to backup if verification fails"""
```

## Maintenance Workflows

### 1. Regular Maintenance Routine
```bash
# Weekly maintenance sequence
# Step 1: Check system health
python3 comprehensive-verification.py --quick

# Step 2: Clean any corrupted data
python3 clean-corrupted-firestore.py --scan-only

# Step 3: Fill any missing records
python3 use-fill-missing-records.py

# Step 4: Update search terms for new records
python3 run-search-backfill.py test
python3 run-search-backfill.py execute

# Step 5: Verify system health
python3 comprehensive-verification.py
```

### 2. Emergency Data Recovery
```bash
# Emergency recovery sequence
# Step 1: Assess damage
python3 analyze-missing-records.py current_data.csv

# Step 2: Create backup of current state
python3 clean-corrupted-firestore.py --backup-only

# Step 3: Clean corrupted data
python3 clean-corrupted-firestore.py --clean

# Step 4: Fill missing records
python3 chunked-fill-missing.py recovery_data.csv 2000

# Step 5: Verify recovery
python3 comprehensive-verification.py
```

### 3. Performance Optimization
```bash
# Performance optimization sequence
# Step 1: Complete searchTerms backfill
python3 run-search-backfill.py execute

# Step 2: Clean and optimize data
python3 clean-corrupted-firestore.py --optimize

# Step 3: Verify search performance
python3 comprehensive-verification.py --performance-test

# Step 4: Generate optimization report
python3 generate-performance-report.py
```

## Active Operations Status

### Currently Running Maintenance
1. **SearchTerms Backfill**: `run-search-backfill.py execute`
   - Adding searchTerms field to historical records
   - Batch processing for memory efficiency
   - Essential for optimal search performance

2. **Missing Records Fill**: `chunked-fill-missing.py unique_records.csv 5000`
   - Processing unique records in 5000-record chunks
   - Filling gaps identified in data analysis
   - Background processing for system availability

3. **Upload Strategy**: `final-upload-strategy.py unique_records.csv 3000 1`
   - Optimized upload of unique records
   - Production-ready upload strategy
   - Comprehensive error handling

## Monitoring and Alerts

### Key Metrics to Monitor
- **Backfill Progress**: Records processed vs remaining
- **Error Rates**: Failed operations percentage
- **Memory Usage**: Peak memory consumption during operations
- **Completion ETAs**: Estimated time to completion

### Monitoring Commands
```bash
# Check backfill progress
curl -s "https://us-central1-perception-app-3db34.cloudfunctions.net/backfillSearchTerms" \
  -d '{"batchSize": 1, "dryRun": true}' | jq '.remaining'

# Monitor active Python processes
ps aux | grep -E "python3.*(backfill|fill|upload)" | grep -v grep

# Check memory usage
top -p $(pgrep -f "python3.*backfill")

# Monitor log files
tail -f backfill.log fill_missing.log upload.log
```

### Alert Conditions
- Memory usage > 90% for extended periods
- Error rate > 5% in any maintenance operation
- No progress for > 30 minutes in active operations
- Firestore quota approaching limits

## Best Practices

### Pre-Maintenance Checklist
1. **Verify system health** with comprehensive verification
2. **Create backups** of critical data
3. **Check resource availability** (memory, disk, quotas)
4. **Schedule during low-usage** periods
5. **Prepare rollback procedures**

### During Maintenance
1. **Monitor progress** regularly
2. **Watch for error patterns** in logs
3. **Verify intermediate results** periodically
4. **Be ready to pause/resume** if needed
5. **Document any issues** encountered

### Post-Maintenance
1. **Verify operation success** with tests
2. **Update documentation** with results
3. **Archive logs** for future reference
4. **Schedule next maintenance** cycle
5. **Update monitoring dashboards**

## Error Recovery Procedures

### Common Issues and Solutions

#### Timeout Errors in Backfill
```python
# Increase timeouts and reduce batch sizes
def handle_backfill_timeout():
    batch_size = max(100, current_batch_size // 2)
    timeout = min(600, current_timeout * 1.5)
    retry_with_new_params(batch_size, timeout)
```

#### Memory Issues During Fill Operations
```python
# Implement memory management
def memory_conscious_fill():
    import gc
    for chunk in process_chunks(data, small_chunk_size):
        process_chunk(chunk)
        gc.collect()  # Force garbage collection
        time.sleep(1)  # Brief pause
```

#### Quota Exhaustion
```python
# Implement quota-aware processing
def quota_aware_processing():
    current_usage = check_firestore_quota()
    if current_usage > 0.8:  # 80% of quota used
        time.sleep(3600)  # Wait 1 hour
    continue_processing()
```

---

**Last Updated**: September 20, 2025
**Active Operations**: 3 maintenance scripts currently running
**Next Scheduled**: Weekly health check and optimization cycle