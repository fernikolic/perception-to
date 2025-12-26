# Data Upload Scripts

## Overview

Scripts for uploading CSV data to Firestore with various strategies, optimizations, and error handling approaches.

## Scripts

### 1. `upload-csv.py` - Basic Chunked Upload
**Purpose**: Simple CSV upload with basic chunking functionality

**Features**:
- Splits large CSV files into manageable chunks
- Basic error handling and retry logic
- Progress tracking for each chunk
- Configurable chunk sizes

**Usage**:
```bash
# Basic upload with default chunk size (10,000 rows)
python3 upload-csv.py data.csv

# Custom chunk size
python3 upload-csv.py data.csv --chunk-size 5000
```

**Configuration**:
```python
DEFAULT_CHUNK_SIZE = 10000
FUNCTION_URL = "https://us-central1-perception-app-3db34.cloudfunctions.net/uploadHistoricalCSV"
MAX_RETRIES = 3
RETRY_DELAY = 5  # seconds
```

---

### 2. `upload-csv-proper.py` - Enhanced CSV Upload
**Purpose**: Improved upload with validation and better error handling

**Features**:
- Data validation before upload
- Enhanced error handling with detailed logging
- Duplicate detection and prevention
- Memory-efficient processing
- Resume capability for interrupted uploads

**Usage**:
```bash
# Full upload with validation
python3 upload-csv-proper.py data.csv --validate

# Resume from specific chunk
python3 upload-csv-proper.py data.csv --resume-from 25

# Dry run to test validation
python3 upload-csv-proper.py data.csv --dry-run
```

**Key Functions**:
```python
def validate_csv_format(file_path: str) -> bool:
    """Validate CSV format and required columns"""

def upload_chunk_with_validation(chunk_data: str, chunk_num: int) -> bool:
    """Upload chunk with pre-upload validation"""

def resume_upload(file_path: str, start_chunk: int) -> None:
    """Resume upload from specific chunk number"""
```

---

### 3. `final-upload-strategy.py` - Optimized Production Upload
**Purpose**: Production-ready upload with advanced optimization and monitoring

**Features**:
- Intelligent batching based on data characteristics
- Real-time progress monitoring with ETA calculations
- Automatic retry with exponential backoff
- Memory usage optimization
- Comprehensive logging and metrics
- Support for unique record filtering

**Usage**:
```bash
# Production upload with default settings
python3 final-upload-strategy.py unique_records.csv 3000 1

# Background execution with logging
python3 final-upload-strategy.py unique_records.csv 3000 1 > upload.log 2>&1 &

# Monitor progress
tail -f upload.log
```

**Advanced Features**:
```python
class UploadManager:
    def __init__(self, batch_size: int = 3000, start_batch: int = 1):
        self.batch_size = batch_size
        self.start_batch = start_batch
        self.stats = UploadStats()

    def intelligent_batching(self, data_size: int) -> int:
        """Adjust batch size based on data characteristics"""

    def exponential_backoff(self, attempt: int) -> float:
        """Calculate delay for retry attempts"""
```

---

### 4. `upload-unique-records.py` - Unique Data Upload
**Purpose**: Upload only unique records to prevent duplicates

**Features**:
- URL-based uniqueness detection
- Efficient duplicate filtering
- Memory-optimized processing for large datasets
- Detailed duplicate reporting

**Usage**:
```bash
# Upload unique records only
python3 upload-unique-records.py source_data.csv

# Generate uniqueness report
python3 upload-unique-records.py source_data.csv --report-duplicates
```

---

### 5. `small-batch-upload.py` - Small Batch Testing
**Purpose**: Small-scale upload testing and validation

**Features**:
- Small batch sizes for testing
- Detailed per-record logging
- Validation of upload success
- Perfect for development and debugging

**Usage**:
```bash
# Test with small batches
python3 small-batch-upload.py test_data.csv --batch-size 100

# Verbose logging for debugging
python3 small-batch-upload.py test_data.csv --verbose
```

---

### 6. `rapid-upload.py` - High-Speed Upload
**Purpose**: Maximum speed upload for time-critical operations

**Features**:
- Parallel upload streams
- Minimal validation for speed
- High concurrency handling
- Optimized for large datasets

**Usage**:
```bash
# Rapid upload with parallel processing
python3 rapid-upload.py large_dataset.csv --parallel 5

# Maximum speed mode (use with caution)
python3 rapid-upload.py large_dataset.csv --speed-mode
```

## Upload Strategies Comparison

| Script | Speed | Reliability | Memory Usage | Use Case |
|--------|-------|-------------|--------------|----------|
| `upload-csv.py` | Medium | Good | Medium | General purpose |
| `upload-csv-proper.py` | Medium | Excellent | Medium | Production with validation |
| `final-upload-strategy.py` | Fast | Excellent | Low | Large-scale production |
| `upload-unique-records.py` | Medium | Good | Medium | Duplicate prevention |
| `small-batch-upload.py` | Slow | Excellent | Low | Testing and debugging |
| `rapid-upload.py` | Very Fast | Medium | High | Time-critical operations |

## Common Configuration

### Environment Variables
```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
export UPLOAD_FUNCTION_URL="https://us-central1-perception-app-3db34.cloudfunctions.net/uploadHistoricalCSV"
export MAX_BATCH_SIZE=5000
export RETRY_ATTEMPTS=3
```

### Function Endpoints
- **Primary Upload**: `uploadHistoricalCSV`
- **Fill Missing**: `fillMissingRecords`
- **Status Check**: `uploadHistoricalCSV?status=check`

## Best Practices

### Pre-Upload Checklist
1. **Validate CSV format** and column structure
2. **Check available memory** and disk space
3. **Verify Firestore connection** and permissions
4. **Run dry-run** to estimate time and resources
5. **Plan for interruption recovery**

### During Upload
1. **Monitor progress** regularly
2. **Check error logs** for issues
3. **Verify upload success** periodically
4. **Monitor Firestore quotas** and limits

### Post-Upload
1. **Verify total record count** matches expected
2. **Run data integrity checks**
3. **Update search indices** if needed
4. **Document upload results**

## Error Handling Patterns

### Common Errors and Solutions

#### Timeout Errors
```python
# Increase timeout and add retry logic
def upload_with_timeout(data, timeout=300):
    try:
        response = requests.post(url, data=data, timeout=timeout)
        return response
    except requests.Timeout:
        return retry_with_backoff(data, timeout * 1.5)
```

#### Memory Errors
```python
# Use streaming and smaller batches
def memory_efficient_upload(file_path, chunk_size=1000):
    with open(file_path, 'r') as file:
        for chunk in read_chunks(file, chunk_size):
            upload_chunk(chunk)
            gc.collect()  # Force garbage collection
```

#### Rate Limiting
```python
# Implement exponential backoff
def handle_rate_limit(response):
    if response.status_code == 429:
        delay = float(response.headers.get('Retry-After', 60))
        time.sleep(delay)
        return True
    return False
```

## Monitoring and Metrics

### Key Metrics to Track
- **Upload speed**: Records per second
- **Success rate**: Percentage of successful uploads
- **Error rate**: Failed upload percentage
- **Memory usage**: Peak memory consumption
- **Network usage**: Data transfer rates

### Logging Best Practices
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('upload.log'),
        logging.StreamHandler()
    ]
)

# Log important milestones
logging.info(f"🚀 Starting upload: {total_records} records")
logging.info(f"✅ Batch {batch_num} complete: {success_count}/{batch_size}")
logging.error(f"❌ Upload failed: {error_message}")
```

## Performance Optimization

### Memory Optimization
- Use generators instead of loading entire files
- Implement proper garbage collection
- Stream data processing
- Limit concurrent operations

### Network Optimization
- Batch requests appropriately
- Use connection pooling
- Implement retry logic with backoff
- Monitor and respect rate limits

### Monitoring Tools
```bash
# Monitor script performance
htop -p $(pgrep -f "python3.*upload")

# Monitor network usage
iftop -i interface_name

# Monitor memory usage
watch -n 1 'ps aux | grep python3 | grep upload'
```

---

**Last Updated**: September 20, 2025
**Active Scripts**: Currently `final-upload-strategy.py` processing unique_records.csv