# Conversion Tracking System - Deployment Guide

## Overview

Your new conversion tracking system provides comprehensive analytics for trial signups, conversions, and revenue growth. This guide will walk you through deployment and testing.

## What's Been Implemented

### 1. **Data Model** (`src/types/metrics.ts`)
- `DailyMetrics` - Daily aggregated metrics
- `WeeklyMetrics` - Weekly rollups with cohort analysis
- `MonthlyMetrics` - Monthly summaries with churn rates
- `TrialConversionEvent` - Individual conversion tracking
- `TrialExpirationEvent` - Trial expiration tracking

### 2. **Stripe Webhook Updates** (`functions/src/stripe.ts`)
- **Conversion Tracking**: Automatically tracks when Firebase trial users convert to paid Stripe subscriptions
- **MRR Calculation**: Calculates Monthly Recurring Revenue from subscription data
- **Time-to-Convert**: Tracks how long it takes users to convert from trial to paid
- **Trial Detection**: Identifies both Firebase trials and Stripe trials

**Key Functions:**
- `trackTrialConversion()` - Records conversion events to `trial_conversions` collection
- Enhanced `handleSubscriptionCreated()` - Detects Firebase trial → Stripe conversion
- Enhanced `handleSubscriptionUpdated()` - Detects Stripe trial → Active conversion

### 3. **Conversion Metrics Dashboard** (`src/components/admin/conversion-metrics-dashboard.tsx`)

**Features:**
- **Real-time Metrics Cards**: Trial signups, conversions, conversion rate, MRR, time-to-convert, active subscriptions
- **Conversion Timeline**: Daily chart showing trials started vs. conversions
- **Conversion Funnel**: Visual funnel from signup → trial → conversion
- **Cohort Analysis**: Week-by-week conversion rates
- **Revenue Growth**: MRR growth chart

**Views:**
- 7-day, 30-day, and 90-day timeframes
- Auto-refreshing data
- Beautiful charts using Recharts

### 4. **Cloud Function for Metrics Aggregation** (`functions/src/aggregate-metrics.ts`)

**Scheduled Function:**
- Runs daily at 2:00 AM EST
- Calculates and stores daily metrics snapshots
- Auto-aggregates weekly metrics (every Monday)
- Auto-aggregates monthly metrics (1st of month)

**Metrics Calculated:**
- Trial starts, conversions, expirations
- Active subscriptions and new subscriptions
- MRR, ARR, and churn
- Conversion rates and time-to-convert
- User counts by tier (free, trial, paid)

### 5. **Historical Data Backfill Script** (`scripts/backfill-metrics-data.js`)

**What it does:**
- Creates `trial_conversions` documents for existing converted trials
- Backfills 90 days of historical `metrics_snapshots`
- Marks backfilled data for tracking
- Provides progress reporting

### 6. **Updated Admin Navigation** (`src/components/admin/pages/admin-analytics.tsx`)
- New "Conversion Metrics" tab (default view)
- Integrated with existing analytics tabs

## Deployment Steps

### Step 1: Install Dependencies (if needed)

```bash
# Check if recharts is installed
npm list recharts

# If not installed:
npm install recharts date-fns
```

### Step 2: Deploy Cloud Functions

```bash
# Deploy all functions (includes webhooks and scheduled aggregation)
firebase deploy --only functions

# Or deploy specific functions only:
firebase deploy --only functions:stripeWebhook,functions:aggregateDailyMetrics
```

**Expected Output:**
```
✔  Deploy complete!
Functions deployed:
- stripeWebhook (updated)
- aggregateDailyMetrics (new)
```

### Step 3: Verify Stripe Webhook Configuration

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Ensure your webhook endpoint is configured:
   - URL: `https://us-central1-perception-app-3db34.cloudfunctions.net/stripeWebhook`
   - Events: Select all subscription and invoice events

3. Required events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `customer.subscription.trial_will_end`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `checkout.session.completed`

### Step 4: Run Historical Data Backfill

**Important**: You need a service account key to run the backfill script.

```bash
# Make sure you have service-account-key.json in the project root
# If not, download it from Firebase Console → Project Settings → Service Accounts

# Run the backfill script
node scripts/backfill-metrics-data.js
```

**Expected Output:**
```
🚀 Starting Metrics Data Backfill...

📊 Backfilling Trial Conversions...
  ✅ Created conversion event for user@example.com - 48h to convert, $29.00 MRR
  ✅ Created conversion event for user2@example.com - 120h to convert, $99.00 MRR
  ...
✅ Backfill complete!
   - Processed: 50 subscriptions
   - Created: 12 conversion events
   - Skipped: 0 (already tracked)

📊 Backfilling Historical Metrics (90 days)...
  ✅ Created metrics for 2025-07-15 - 5 trials, 2 conversions
  ✅ Created metrics for 2025-07-16 - 3 trials, 1 conversions
  ...
✅ Historical metrics backfill complete!
   - Created: 90 daily metrics
   - Skipped: 0 (already exist)

✅ All backfill operations complete!
```

### Step 5: Deploy Frontend Changes

```bash
# Build and deploy the frontend
npm run build
firebase deploy --only hosting
```

### Step 6: Test the Dashboard

1. Navigate to your admin dashboard: `https://app.perception.to/admin/analytics`
2. Click on "Conversion Metrics" tab
3. You should see:
   - Metric cards with your current numbers
   - Charts with historical data
   - Conversion funnel
   - Cohort analysis table

## Firestore Collections

Your system now uses these collections:

### `trial_conversions`
```javascript
{
  userId: "abc123",
  email: "user@example.com",
  trialStartDate: "2025-10-01T00:00:00Z",
  trialEndDate: "2025-10-08T00:00:00Z",
  trialPlanSelected: "trial",
  conversionDate: "2025-10-06T15:30:00Z",
  convertedToPlan: "pro",
  timeToConvert: 138, // hours
  stripeCustomerId: "cus_...",
  stripeSubscriptionId: "sub_...",
  stripePriceId: "price_...",
  mrr: 2900, // $29.00 in cents
  createdAt: "2025-10-06T15:30:00Z",
  backfilled: false // or true for historical data
}
```

### `metrics_snapshots`
```javascript
{
  date: "2025-10-13", // For daily metrics
  type: "daily", // or "weekly", "monthly"
  trialsStarted: 15,
  trialsActive: 45,
  trialsConverted: 3,
  trialsExpired: 5,
  trialsExpiring3Days: 8,
  trialsExpiring7Days: 12,
  activeSubscriptions: 28,
  newSubscriptions: 3,
  canceledSubscriptions: 1,
  pausedSubscriptions: 0,
  mrr: 81200, // in cents
  arr: 974400,
  newMrr: 8700,
  churnedMrr: 2900,
  conversionRate: 20.0, // percentage
  avgTimeToConvert: 96, // hours
  freeUsers: 120,
  trialUsers: 45,
  paidUsers: 28,
  totalUsers: 193,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  backfilled: false
}
```

### Updated `subscriptions` Collection
New fields added to track conversions:
```javascript
{
  // ... existing fields ...
  convertedFromTrial: true,
  trialConversionDate: "2025-10-06T15:30:00Z",
  previousTrialStart: "2025-10-01T00:00:00Z",
  previousTrialEnd: "2025-10-08T00:00:00Z"
}
```

## Testing the Complete Flow

### Test 1: New Trial Signup → Conversion

1. **Start a new trial** (as a user):
   ```
   - Sign up for account
   - Start 7-day trial (no credit card)
   - Verify trial status in Firebase
   ```

2. **Convert to paid**:
   ```
   - Go to billing page
   - Subscribe to Pro plan via Stripe
   - Complete checkout
   ```

3. **Verify tracking**:
   ```
   Check Firestore:
   - `trial_conversions` should have new document
   - `subscriptions/{userId}` should have convertedFromTrial=true
   - Check conversion time and MRR values
   ```

4. **Check dashboard**:
   ```
   - Go to Admin → Analytics → Conversion Metrics
   - Should see +1 in "Conversions" card
   - Timeline chart should show the conversion
   - MRR should increase
   ```

### Test 2: Webhook Receiving

1. **Trigger a Stripe event** (test mode):
   ```bash
   # Using Stripe CLI
   stripe trigger customer.subscription.created
   ```

2. **Check Cloud Functions logs**:
   ```bash
   firebase functions:log --only stripeWebhook
   ```

   Look for:
   ```
   [Stripe Webhook] Processing subscription created: sub_...
   [Metrics] Tracked trial conversion for user abc123: 48.5 hours to convert
   ```

### Test 3: Daily Aggregation

**Option A: Wait for scheduled run (2 AM EST)**

**Option B: Manually trigger the function**:
```bash
# Using Firebase Console → Functions → aggregateDailyMetrics → Test
# Or using local emulator
```

Check logs:
```bash
firebase functions:log --only aggregateDailyMetrics
```

Expected:
```
[Metrics Aggregation] Starting daily metrics aggregation
[Metrics] Calculating metrics for 2025-10-12
[Metrics Aggregation] Successfully aggregated metrics for 2025-10-12
```

## Monitoring & Maintenance

### Daily Checks
1. **Dashboard Health**: Check that new data appears daily
2. **Conversion Events**: Monitor `trial_conversions` collection growth
3. **Metrics Snapshots**: Verify daily snapshots are created

### Weekly Reviews
1. **Conversion Rates**: Are they trending as expected?
2. **MRR Growth**: Is new MRR coming in?
3. **Cohort Performance**: Which weeks had best conversion rates?

### Common Issues & Solutions

#### Issue: No conversion events appearing
**Solution**:
- Check that Stripe webhooks are firing
- Verify webhook endpoint is correct
- Check Cloud Functions logs for errors
- Ensure users have `trialStart` field in subscriptions

#### Issue: Dashboard shows no data
**Solution**:
- Run the backfill script again
- Check Firestore rules allow read access
- Verify metrics_snapshots collection exists
- Check browser console for errors

#### Issue: MRR numbers seem wrong
**Solution**:
- MRR is calculated from Stripe price data
- Verify your Stripe products have correct pricing
- Check that price intervals are normalized (yearly → monthly)
- Re-run backfill if needed

#### Issue: Scheduled function not running
**Solution**:
- Check Functions → Logs in Firebase Console
- Verify function deployed successfully
- Check timezone (should be America/New_York)
- Manually trigger to test

## Next Steps

### Recommended Enhancements

1. **Email Alerts**: Get notified when conversion rate drops
2. **Cohort Deep Dive**: Add more detailed cohort analysis
3. **Revenue Forecasting**: Predict MRR based on trends
4. **A/B Test Tracking**: Track conversion rates by experiments
5. **Churn Prediction**: Identify at-risk subscriptions

### Firestore Indexes

You may need to create composite indexes for some queries. If you see errors like:

```
The query requires an index
```

Firebase will provide a link to create the index automatically, or add to `firestore.indexes.json`:

```json
{
  "indexes": [
    {
      "collectionGroup": "subscriptions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "trialEnd", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "trial_conversions",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "conversionDate", "order": "ASCENDING" },
        { "fieldPath": "mrr", "order": "DESCENDING" }
      ]
    }
  ]
}
```

## Support

If you encounter issues:

1. Check Cloud Functions logs: `firebase functions:log`
2. Check Firestore data manually in Firebase Console
3. Review Stripe webhook logs in Stripe Dashboard
4. Test with Stripe CLI in test mode first

## Summary

You now have a complete conversion tracking system that:

✅ Tracks every trial signup
✅ Records all conversions with timing and revenue
✅ Calculates daily/weekly/monthly metrics automatically
✅ Provides beautiful dashboards with charts
✅ Gives you accurate MRR, ARR, and conversion rates
✅ Shows cohort analysis for optimization

**Your funnel is now fully visible from trial start to paid subscription!**
