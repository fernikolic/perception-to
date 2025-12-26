# Data Analysis Scripts

## Overview

Scripts for analyzing data integrity, identifying missing records, performing verification, and ensuring data quality across the Bitcoin Perception Dashboard dataset.

## Scripts

### 1. `analyze-missing-records.py` - Missing Data Detection
**Purpose**: Identify patterns in missing data between CSV source and Firestore

**Features**:
- Statistical sampling of CSV vs Firestore data
- Pattern identification for missing records
- Gap analysis and reporting
- Intelligent sampling strategies

**Usage**:
```bash
# Analyze missing records with default sampling
python3 analyze-missing-records.py historical_data.csv

# Custom sample size and deep analysis
python3 analyze-missing-records.py historical_data.csv --sample-size 1000 --deep-analysis

# Generate missing records report
python3 analyze-missing-records.py historical_data.csv --report missing_analysis.json
```

**Key Functions**:
```python
def get_current_firestore_count() -> int:
    """Get current document count from Firestore"""

def sample_csv_records(csv_file: str, sample_size: int = 100) -> List[dict]:
    """Sample random records from CSV for analysis"""

def check_record_exists(url: str) -> bool:
    """Check if specific record exists in Firestore"""

def identify_missing_patterns(missing_records: List[dict]) -> dict:
    """Identify patterns in missing data (date ranges, outlets, etc.)"""
```

**Output Example**:
```json
{
  "total_csv_records": 434691,
  "total_firestore_records": 432156,
  "missing_count": 2535,
  "missing_patterns": {
    "date_ranges": ["2018-03-15 to 2018-03-20", "2020-07-10 to 2020-07-12"],
    "outlets": ["Reuters", "Bloomberg"],
    "record_types": ["breaking_news", "market_updates"]
  }
}
```

---

### 2. `analyze-url-uniqueness.py` - URL Uniqueness Analysis
**Purpose**: Analyze URL patterns and identify duplicate detection strategies

**Features**:
- URL pattern analysis across dataset
- Duplicate URL detection and reporting
- URL normalization strategies
- Uniqueness validation

**Usage**:
```bash
# Analyze URL patterns
python3 analyze-url-uniqueness.py data.csv

# Generate uniqueness report
python3 analyze-url-uniqueness.py data.csv --generate-report

# Check specific URL patterns
python3 analyze-url-uniqueness.py data.csv --pattern "bloomberg.com"
```

**Analysis Output**:
```python
{
    "total_urls": 434691,
    "unique_urls": 432156,
    "duplicate_count": 2535,
    "duplicate_patterns": {
        "query_parameters": 1200,
        "trailing_slashes": 800,
        "http_vs_https": 535
    },
    "outlet_distribution": {
        "coindesk.com": 45000,
        "cointelegraph.com": 38000,
        "bloomberg.com": 25000
    }
}
```

---

### 3. `direct-url-analysis.py` - Direct URL Verification
**Purpose**: Direct verification of URLs against Firestore using hybrid feed API

**Features**:
- Real-time URL existence checking
- Batch URL verification
- Performance comparison between methods
- API response validation

**Usage**:
```bash
# Verify specific URLs
python3 direct-url-analysis.py --urls url1,url2,url3

# Batch verification from file
python3 direct-url-analysis.py --url-file urls_to_check.txt

# Performance benchmarking
python3 direct-url-analysis.py --benchmark --sample-size 1000
```

**Verification Methods**:
```python
def verify_url_via_hybrid_feed(url: str) -> bool:
    """Verify URL exists using hybrid feed search"""

def verify_url_direct_firestore(url: str) -> bool:
    """Direct Firestore query for URL"""

def batch_verify_urls(urls: List[str], method: str = "hybrid") -> dict:
    """Batch verification with progress tracking"""
```

---

### 4. `comprehensive-verification.py` - Complete System Verification
**Purpose**: Comprehensive verification of the entire search and data system

**Features**:
- End-to-end system testing
- Search functionality verification
- Data integrity validation
- Performance benchmarking
- Comparative analysis across time periods

**Usage**:
```bash
# Full system verification
python3 comprehensive-verification.py

# Quick verification with key metrics
python3 comprehensive-verification.py --quick

# Specific search term verification
python3 comprehensive-verification.py --search-term "coinbase" --date-range "2024-01-01,2024-12-31"
```

**Verification Suite**:
```python
class SystemVerification:
    def verify_search_functionality(self) -> dict:
        """Test all search capabilities"""

    def verify_data_integrity(self) -> dict:
        """Check data consistency and completeness"""

    def benchmark_performance(self) -> dict:
        """Measure system performance metrics"""

    def verify_historical_coverage(self) -> dict:
        """Validate historical data coverage"""
```

**Verification Report**:
```json
{
  "search_verification": {
    "coinbase_2024": {"expected": 4380, "actual": 4380, "status": "✅ PASS"},
    "bitcoin_full_range": {"expected": 300000, "actual": 298756, "status": "⚠️ MINOR_GAP"},
    "case_sensitivity": {"status": "✅ PASS"}
  },
  "performance_metrics": {
    "avg_search_time": "68.5s",
    "memory_usage": "6.2GB",
    "success_rate": "99.8%"
  },
  "data_integrity": {
    "total_records": 434691,
    "search_terms_coverage": "98.5%",
    "date_range_coverage": "2011-01-01 to 2025-09-20"
  }
}
```

---

### 5. `identify-corruption-via-api.py` - Corruption Detection
**Purpose**: Identify corrupted or malformed data using API validation

**Features**:
- Automated corruption detection
- API response validation
- Data format verification
- Corrupted record isolation

**Usage**:
```bash
# Scan for corrupted data
python3 identify-corruption-via-api.py

# Target specific date ranges
python3 identify-corruption-via-api.py --start-date 2020-01-01 --end-date 2020-12-31

# Export corrupted records
python3 identify-corruption-via-api.py --export corrupted_records.csv
```

**Corruption Detection**:
```python
def detect_malformed_records(batch: List[dict]) -> List[dict]:
    """Identify records with malformed data"""

def validate_required_fields(record: dict) -> bool:
    """Validate all required fields are present and valid"""

def check_data_consistency(record: dict) -> List[str]:
    """Check for data consistency issues"""
```

## Analysis Workflows

### 1. Complete Data Audit Workflow
```bash
# Step 1: Check overall data coverage
python3 analyze-missing-records.py historical_data.csv

# Step 2: Verify URL uniqueness
python3 analyze-url-uniqueness.py historical_data.csv

# Step 3: Run comprehensive verification
python3 comprehensive-verification.py

# Step 4: Check for corruption
python3 identify-corruption-via-api.py

# Step 5: Generate final report
python3 generate-audit-report.py
```

### 2. Search Quality Analysis
```bash
# Test search term coverage
python3 comprehensive-verification.py --search-term "coinbase"
python3 comprehensive-verification.py --search-term "bitcoin"
python3 comprehensive-verification.py --search-term "ethereum"

# Verify case sensitivity
python3 comprehensive-verification.py --case-sensitivity-test

# Test date range accuracy
python3 comprehensive-verification.py --date-accuracy-test
```

### 3. Performance Benchmarking
```bash
# Benchmark different search methods
python3 direct-url-analysis.py --benchmark

# Test system under load
python3 comprehensive-verification.py --load-test

# Memory usage analysis
python3 analyze-missing-records.py --memory-profile
```

## Key Metrics and KPIs

### Data Quality Metrics
- **Completeness**: % of expected records present
- **Accuracy**: % of records with correct data
- **Consistency**: % of records following data standards
- **Uniqueness**: % of truly unique records

### Search Quality Metrics
- **Recall**: % of relevant records found
- **Precision**: % of found records that are relevant
- **Response Time**: Average search completion time
- **Coverage**: % of search terms with results

### System Performance Metrics
- **Throughput**: Records processed per second
- **Availability**: % uptime for search functionality
- **Error Rate**: % of failed operations
- **Resource Usage**: Memory, CPU, network utilization

## Common Analysis Patterns

### Missing Data Investigation
```python
# Pattern 1: Check specific date ranges
missing_in_range = check_date_range_coverage("2020-01-01", "2020-12-31")

# Pattern 2: Outlet-specific analysis
outlet_coverage = analyze_outlet_coverage(["coindesk", "bloomberg", "reuters"])

# Pattern 3: Search term validation
search_coverage = validate_search_term_coverage(["bitcoin", "coinbase", "ethereum"])
```

### Performance Analysis
```python
# Pattern 1: Response time analysis
response_times = benchmark_search_performance(search_terms, iterations=100)

# Pattern 2: Memory usage tracking
memory_usage = track_memory_usage_during_search(large_dataset)

# Pattern 3: Concurrent load testing
load_results = test_concurrent_searches(concurrent_users=10)
```

## Data Quality Standards

### Record Validation Criteria
1. **Required Fields**: Title, Content, Date, URL, Outlet
2. **Data Types**: Proper typing for dates, numbers, strings
3. **Format Standards**: Date format (ISO 8601), URL validation
4. **Business Rules**: Date ranges, content length limits

### Search Quality Standards
1. **Response Time**: < 90 seconds for full historical searches
2. **Accuracy**: > 95% relevant results for search terms
3. **Coverage**: > 98% of historical data searchable
4. **Consistency**: Identical results for identical queries

## Troubleshooting Analysis Issues

### Common Problems and Solutions

#### Slow Analysis Performance
```python
# Solution: Use sampling and parallel processing
def parallel_analysis(data_chunks):
    with ThreadPoolExecutor(max_workers=4) as executor:
        results = executor.map(analyze_chunk, data_chunks)
    return combine_results(results)
```

#### Memory Issues with Large Datasets
```python
# Solution: Stream processing and generators
def stream_analysis(file_path):
    with open(file_path, 'r') as file:
        for chunk in read_in_chunks(file, chunk_size=1000):
            yield analyze_chunk(chunk)
```

#### API Rate Limiting
```python
# Solution: Respect rate limits and implement backoff
def rate_limited_analysis(urls, rate_limit=10):
    for i, url in enumerate(urls):
        if i > 0 and i % rate_limit == 0:
            time.sleep(60)  # Wait 1 minute after every 10 requests
        analyze_url(url)
```

---

**Last Updated**: September 20, 2025
**Active Analysis**: Continuous verification of search functionality and data integrity