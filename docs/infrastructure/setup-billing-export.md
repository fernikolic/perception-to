# Setup Real Cost Tracking

To get actual cost data instead of estimates, you need to set up Google Cloud Billing Export to BigQuery.

## Step 1: Enable Billing Export to BigQuery

1. Go to the [Google Cloud Console Billing Export page](https://console.cloud.google.com/billing/export)
2. Select your billing account
3. Click "CREATE EXPORT" 
4. Configure the export:
   - **Export type**: Choose "Standard usage cost data"
   - **Projects**: Select "triple-upgrade-245423"
   - **BigQuery dataset**: 
     - Project: `triple-upgrade-245423`
     - Dataset: `billing_export` (this will be created automatically)
   - **Table name prefix**: `gcp_billing_export_v1`

5. Click "CREATE EXPORT"

## Step 2: Wait for Data Collection

- Billing data will start populating within 24 hours
- Historical data (up to 13 months) will be backfilled
- The export runs daily and includes usage from the previous day

## Step 3: Verify the Setup

Once data starts flowing, you can verify it works by running this BigQuery query:

```sql
SELECT 
  service.description as service_name,
  sku.description as sku_description,
  SUM(cost) as total_cost,
  currency
FROM `triple-upgrade-245423.billing_export.gcp_billing_export_v1_*`
WHERE usage_start_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
  AND project.id = 'triple-upgrade-245423'
GROUP BY service.description, sku.description, currency
ORDER BY total_cost DESC
LIMIT 10
```

## Step 4: Deploy the Real Cost Tracking Functions

The functions have been implemented to:

1. **Query BigQuery billing data** for actual Google Cloud costs
2. **Track OpenAI usage** from your Firebase Functions calls  
3. **Calculate real costs** based on current API pricing
4. **Provide detailed breakdowns** by service type

### API Endpoints:

- `getRealCosts` - Get current real cost data (cached for 4 hours)
- `refreshRealCosts` - Force refresh cost data immediately
- `updateRealCostsScheduled` - Daily scheduled update at 6 AM EST

## Step 5: Enhanced Usage Tracking

The system now includes:

### Google Cloud Cost Breakdown:
- **Compute**: Firebase Functions, Cloud Run
- **Storage**: Firestore, Cloud Storage  
- **Networking**: CDN, data transfer
- **Other**: Auth, Analytics, etc.

### OpenAI Cost Breakdown:
- **GPT-4**: Chat and complex analysis ($0.03-$0.06/1K tokens)
- **GPT-3.5**: Simple analysis ($0.001-$0.002/1K tokens)
- **Embeddings**: Vector embeddings for search
- **Other**: Misc AI services

## Fallback Behavior

If BigQuery billing export isn't set up yet, the system will:
1. Try to query BigQuery first
2. Fall back to resource-based cost estimation
3. Still provide meaningful cost insights

## Admin Dashboard

The admin dashboard will show:
- **Real monthly costs** from actual billing data
- **Detailed breakdowns** by service category
- **Month-over-month comparisons**
- **Last updated timestamps**
- **Refresh controls** for immediate updates

This gives you accurate, real-time visibility into your Google Cloud and OpenAI spending directly in your admin dashboard.