# Testing Scripts

## Overview

Scripts for testing functionality, validating search capabilities, performing system verification, and ensuring quality across the Bitcoin Perception Dashboard system.

## Scripts

### 1. `comprehensive-verification.py` - Complete System Testing
**Purpose**: End-to-end verification of search functionality, data integrity, and system performance

**Features**:
- Full search functionality testing
- Historical data coverage verification
- Performance benchmarking
- Case sensitivity testing
- Date range accuracy validation
- Result relevance verification

**Usage**:
```bash
# Complete system verification
python3 comprehensive-verification.py

# Quick health check
python3 comprehensive-verification.py --quick

# Specific search term testing
python3 comprehensive-verification.py --search-term "coinbase" --verbose

# Performance benchmarking
python3 comprehensive-verification.py --benchmark --iterations 10
```

**Test Categories**:
```python
class ComprehensiveVerification:
    def test_search_functionality(self) -> dict:
        """Test all search capabilities and edge cases"""

    def test_historical_coverage(self) -> dict:
        """Verify complete historical data coverage"""

    def test_performance_benchmarks(self) -> dict:
        """Measure and verify performance metrics"""

    def test_case_sensitivity(self) -> dict:
        """Verify case-insensitive search works correctly"""

    def test_date_range_accuracy(self) -> dict:
        """Test date filtering accuracy"""
```

**Verification Results**:
```json
{
  "search_tests": {
    "coinbase_full_range": {
      "expected": 5581,
      "actual": 5581,
      "status": "✅ PASS",
      "execution_time": "75.2s"
    },
    "case_sensitivity": {
      "lowercase": 98,
      "uppercase": 98,
      "status": "✅ PASS"
    }
  },
  "performance_metrics": {
    "avg_response_time": "68.5s",
    "memory_usage": "6.2GB",
    "success_rate": "99.8%"
  }
}
```

---

### 2. `test_blockstream_search.py` - Specific Search Testing
**Purpose**: Test specific search patterns and validate search algorithm effectiveness

**Features**:
- Targeted search term testing
- Search algorithm validation
- Result relevance scoring
- Edge case handling verification

**Usage**:
```bash
# Test Blockstream-related searches
python3 test_blockstream_search.py

# Test with different search patterns
python3 test_blockstream_search.py --patterns "blockstream,adam back,liquid"

# Detailed result analysis
python3 test_blockstream_search.py --analyze-results --export-results
```

**Search Pattern Tests**:
```python
def test_search_patterns():
    patterns = [
        "blockstream",
        "adam back",
        "liquid network",
        "bitcoin core",
        "lightning network"
    ]

    for pattern in patterns:
        results = test_search_pattern(pattern)
        validate_result_relevance(results, pattern)
```

---

### 3. `test-upload.py` - Upload Functionality Testing
**Purpose**: Test data upload mechanisms and validate upload success

**Features**:
- Upload function testing
- Data integrity verification
- Error handling validation
- Performance measurement

**Usage**:
```bash
# Test basic upload functionality
python3 test-upload.py

# Test with sample data
python3 test-upload.py --sample-file test_data.csv

# Stress test with large dataset
python3 test-upload.py --stress-test --size 10000
```

**Upload Tests**:
```python
def test_upload_functionality():
    # Test small batch upload
    test_result = upload_test_batch(size=100)

    # Test error handling
    test_error_scenarios()

    # Test data integrity after upload
    verify_uploaded_data_integrity()

    # Test cleanup
    cleanup_test_data()
```

---

### 4. `test-fill-5k.py` - Fill Operation Testing
**Purpose**: Test missing record fill operations with 5k record batches

**Features**:
- Large batch processing testing
- Memory usage monitoring
- Error recovery testing
- Performance optimization validation

**Usage**:
```bash
# Test 5k record fill operation
python3 test-fill-5k.py

# Test with memory monitoring
python3 test-fill-5k.py --monitor-memory

# Test error recovery scenarios
python3 test-fill-5k.py --test-recovery
```

---

### 5. `quick-test-upload.py` - Rapid Upload Testing
**Purpose**: Quick validation of upload functionality for development and debugging

**Features**:
- Fast execution for development cycles
- Basic functionality validation
- Error detection and reporting
- Lightweight resource usage

**Usage**:
```bash
# Quick upload test
python3 quick-test-upload.py

# Test with specific data
python3 quick-test-upload.py --data-file small_sample.csv

# Debug mode with verbose output
python3 quick-test-upload.py --debug
```

## Test Suites and Categories

### 1. Search Functionality Tests
```python
class SearchTests:
    def test_basic_search(self):
        """Test basic keyword search functionality"""

    def test_case_insensitive_search(self):
        """Verify case-insensitive search works"""

    def test_multi_term_search(self):
        """Test searches with multiple keywords"""

    def test_date_range_filtering(self):
        """Test date range filtering accuracy"""

    def test_outlet_filtering(self):
        """Test outlet-specific filtering"""

    def test_sentiment_filtering(self):
        """Test sentiment-based filtering"""
```

### 2. Performance Tests
```python
class PerformanceTests:
    def test_response_times(self):
        """Measure and validate response times"""

    def test_memory_usage(self):
        """Monitor memory consumption during operations"""

    def test_concurrent_requests(self):
        """Test system under concurrent load"""

    def test_large_dataset_handling(self):
        """Test performance with large datasets"""
```

### 3. Data Integrity Tests
```python
class DataIntegrityTests:
    def test_upload_accuracy(self):
        """Verify uploaded data matches source"""

    def test_search_result_accuracy(self):
        """Verify search results are accurate and relevant"""

    def test_data_consistency(self):
        """Check for data consistency across operations"""

    def test_duplicate_prevention(self):
        """Verify duplicate prevention mechanisms"""
```

## Test Execution Workflows

### 1. Pre-Deployment Testing
```bash
# Complete pre-deployment test sequence
echo "🧪 Starting pre-deployment testing..."

# Test 1: Basic functionality
python3 quick-test-upload.py
python3 test_blockstream_search.py

# Test 2: Performance benchmarks
python3 comprehensive-verification.py --benchmark

# Test 3: Load testing
python3 comprehensive-verification.py --load-test

# Test 4: Data integrity
python3 test-upload.py --verify-integrity

echo "✅ Pre-deployment testing complete"
```

### 2. Post-Deployment Verification
```bash
# Post-deployment verification sequence
echo "🔍 Starting post-deployment verification..."

# Verify 1: Core functionality
python3 comprehensive-verification.py --quick

# Verify 2: Search accuracy
python3 test_blockstream_search.py --comprehensive

# Verify 3: Performance regression
python3 comprehensive-verification.py --performance-regression

# Verify 4: System health
python3 comprehensive-verification.py --health-check

echo "✅ Post-deployment verification complete"
```

### 3. Continuous Integration Testing
```bash
# CI/CD test pipeline
echo "🚀 Starting CI/CD test pipeline..."

# Stage 1: Unit tests
python3 quick-test-upload.py --unit-tests

# Stage 2: Integration tests
python3 comprehensive-verification.py --integration

# Stage 3: Performance tests
python3 comprehensive-verification.py --performance

# Stage 4: End-to-end tests
python3 comprehensive-verification.py --e2e

echo "✅ CI/CD pipeline complete"
```

## Test Result Analysis

### Key Metrics to Track
- **Test Pass Rate**: Percentage of tests passing
- **Performance Regression**: Change in performance metrics
- **Error Rate**: Frequency of test failures
- **Coverage**: Percentage of code/functionality tested

### Test Result Format
```json
{
  "test_summary": {
    "total_tests": 45,
    "passed": 43,
    "failed": 2,
    "skipped": 0,
    "pass_rate": "95.6%"
  },
  "performance_metrics": {
    "avg_response_time": "68.5s",
    "memory_usage": "6.2GB",
    "throughput": "850 req/min"
  },
  "failed_tests": [
    {
      "test_name": "test_edge_case_search",
      "error": "Timeout after 300s",
      "expected": 100,
      "actual": 0
    }
  ]
}
```

### Automated Test Reporting
```python
def generate_test_report(results: dict) -> str:
    """Generate comprehensive test report"""

    report = f"""
# Test Execution Report
**Date**: {datetime.now().isoformat()}
**Total Tests**: {results['total_tests']}
**Pass Rate**: {results['pass_rate']}

## Performance Metrics
- Response Time: {results['avg_response_time']}
- Memory Usage: {results['memory_usage']}
- Success Rate: {results['success_rate']}

## Failed Tests
{format_failed_tests(results['failed_tests'])}

## Recommendations
{generate_recommendations(results)}
    """

    return report
```

## Testing Best Practices

### Test Development Guidelines
1. **Isolation**: Each test should be independent
2. **Repeatability**: Tests should produce consistent results
3. **Fast Feedback**: Tests should complete quickly when possible
4. **Clear Assertions**: Test outcomes should be clearly defined
5. **Comprehensive Coverage**: Test both success and failure scenarios

### Test Data Management
```python
# Use dedicated test data
TEST_DATA = {
    "small_sample": "test_data_100.csv",
    "medium_sample": "test_data_1000.csv",
    "large_sample": "test_data_10000.csv"
}

# Clean up after tests
def cleanup_test_data():
    for data_file in TEST_DATA.values():
        if os.path.exists(data_file):
            os.remove(data_file)
```

### Error Handling in Tests
```python
def robust_test_execution(test_func):
    """Wrapper for robust test execution with error handling"""
    try:
        result = test_func()
        return {"status": "PASS", "result": result}
    except AssertionError as e:
        return {"status": "FAIL", "error": str(e)}
    except Exception as e:
        return {"status": "ERROR", "error": str(e)}
```

## Debugging and Troubleshooting Tests

### Common Test Issues
1. **Timeout Errors**: Increase timeout values or optimize test data
2. **Memory Issues**: Use smaller test datasets or implement cleanup
3. **Flaky Tests**: Add retry logic or fix timing dependencies
4. **Environment Issues**: Verify test environment setup

### Debug Tools and Techniques
```python
# Verbose logging for debugging
import logging
logging.basicConfig(level=logging.DEBUG)

# Performance profiling
import cProfile
cProfile.run('test_function()', 'test_profile.stats')

# Memory profiling
from memory_profiler import profile
@profile
def memory_intensive_test():
    # Test implementation
    pass
```

### Test Monitoring
```bash
# Monitor test execution
htop -p $(pgrep -f "python3.*test")

# Monitor test logs
tail -f test_execution.log

# Check test resource usage
ps aux | grep -E "python3.*test" | awk '{print $2, $3, $4, $11}'
```

---

**Last Updated**: September 20, 2025
**Test Status**: All core functionality tests passing
**Next Testing**: Scheduled performance regression testing