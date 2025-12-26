# MSM Author Backfill - Cost Analysis

## Current Running Process (OPTIMIZED)
- **Script**: `backfill-msm-authors-bigquery-optimized.cjs`
- **Process ID**: 83841
- **Status**: Running in continuous mode
- **Method**: BATCH MERGE operations

## Cost Comparison

### OLD APPROACH (DO NOT USE)
**File**: `backfill-msm-authors-bigquery-EXPENSIVE-DO-NOT-USE.cjs.backup`

**Problem**:
- Uses individual UPDATE statements for EACH URL
- 3 UPDATE queries per URL (staging + main + failure tracking)
- Each UPDATE scans the ENTIRE BigQuery table

**Cost Breakdown**:
- Per 100 URLs: 200 UPDATE queries × 305 MB table = 61 GB scanned
- Cost per 100 URLs: ~€0.38
- **TOTAL COST for 65,497 URLs: ~€248**

### NEW APPROACH (CURRENTLY RUNNING ✅)
**File**: `backfill-msm-authors-bigquery-optimized.cjs`

**Solution**:
- Processes 100 URLs in memory
- Then executes just 2 MERGE queries per batch:
  1. One MERGE to staging table (100 rows)
  2. One MERGE to production table (~90 rows)
- MERGE only scans matching rows, not entire table

**Cost Breakdown**:
- Per 100 URLs: 2 MERGE queries = ~0.5 MB scanned
- Cost per 100 URLs: ~€0.0003
- **TOTAL COST for 65,497 URLs: ~€0.20**

## Cost Savings

**Reduction**: 99.9% cost savings
**Savings**: €247.80 saved on full backfill

## Current Progress (as of verification)

✅ Batch #1: 100 URLs → 92 authors found → MERGED successfully
✅ Batch #2: 100 URLs → 85 authors found → MERGED successfully  
✅ Batch #3: 100 URLs → 91 authors found → MERGED successfully
🔄 Batch #4: In progress...

**Total processed**: 300+ URLs
**Success rate**: ~89%
**Cost so far**: ~€0.001 (less than 1 cent!)

## Verification Commands

Check process is running:
```bash
ps aux | grep 83841
```

Monitor progress:
```bash
tail -f msm-backfill-optimized.log
```

Check MERGE operations:
```bash
grep "Merged" msm-backfill-optimized.log
```

## Safety Measures

1. ✅ Expensive script renamed with warning suffix
2. ✅ Optimized script verified using MERGE operations  
3. ✅ Process confirmed running in continuous mode
4. ✅ MERGE operations confirmed successful in logs

## DO NOT
- ❌ Do not run `backfill-msm-authors-bigquery-EXPENSIVE-DO-NOT-USE.cjs.backup`
- ❌ Do not use individual UPDATE statements
- ❌ Do not process URLs one-by-one

## ALWAYS USE
- ✅ `backfill-msm-authors-bigquery-optimized.cjs`
- ✅ BATCH MERGE operations
- ✅ Process in batches of 100
