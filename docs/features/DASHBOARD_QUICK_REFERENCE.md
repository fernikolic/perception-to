# Admin Dashboard - Quick Reference Guide

## Current Architecture Overview

### Main Entry Point
- `/admin` → Routes to `SimpleDashboard` (business overview)
- `/admin/analytics` → Routes to `AdminAnalytics` (tabbed analytics view)

### Active Components

| Component | Purpose | Location | Data Source |
|-----------|---------|----------|-------------|
| SimpleDashboard | Business metrics overview | `simple-dashboard.tsx` | Stripe + GCP + Currency API |
| ConversionMetricsDashboard | Trial→Paid conversion tracking | `conversion-metrics-dashboard.tsx` | Firestore `metrics_snapshots` |
| FirebaseAnalyticsDashboard | User engagement metrics | `firebase-analytics-dashboard.tsx` | Firebase Analytics / GA4 |
| TrialSignups | Recent trial signup table | `trial-signups.tsx` | Cloud function API |
| EmailAnalyticsDashboard | Email campaign metrics | `EmailAnalyticsDashboard.tsx` | (Needs data source check) |

### Data Source Health Status

| Source | Status | Real-Time | Last Check |
|--------|--------|-----------|-----------|
| Stripe API | OK | On-demand | Oct 21 |
| Firebase Firestore | OK | Real-time | Oct 21 |
| Google Cloud Billing | OK | Daily (via BigQuery) | Oct 21 |
| Firebase Analytics / GA4 | NEEDS CHECK | Hourly | Oct 21 |
| Currency Conversion | OK | Hourly (Frankfurter API) | Oct 21 |

---

## Key Business Metrics Currently Displayed

### SimpleDashboard (Most Important)
1. **Monthly Revenue**: €459.17 (from Stripe MRR)
2. **Monthly Costs**: ~€100+ (Google Cloud + OpenAI + Subscriptions)
3. **Net Profit**: Revenue - Costs
4. **Conversion Rate**: 7 active / total users
5. **Founder Pricing Progress**: 7/100 spots filled (for 50% lifetime discount)

### ConversionMetricsDashboard
1. Trial Signups (period total)
2. Conversions (trials→paid)
3. Conversion Rate (%)
4. New MRR from conversions
5. Avg Time to Convert
6. Active Subscriptions

### FirebaseAnalyticsDashboard
1. Real-time active users
2. DAU, WAU, MAU
3. Session metrics
4. Device/Country breakdown

---

## Quick Navigation Paths

```
Admin Home (/admin)
  ├─ Dashboard (Main) → SimpleDashboard
  │
  ├─ Users Management (/admin/users) → UsersManagement
  │  ├─ Trial Signups (/admin/trial-signups) → TrialSignups
  │  └─ Analytics (/admin/analytics) → AdminAnalytics (4 tabs)
  │     ├─ Conversion Metrics
  │     ├─ Trial Signups
  │     ├─ Firebase Analytics
  │     └─ Email Analytics
  │
  ├─ Testing Ground (/admin/...)
  │  ├─ AI Chat (/admin/ai-chat)
  │  ├─ Topics (/admin/topics)
  │  ├─ Sentiment (/admin/sentiment)
  │  └─ Price (/admin/price)
  │
  └─ System (/admin/...)
     ├─ Notifications (/admin/notifications)
     └─ Messages (/admin/messages)
```

---

## Data Flow Summary

### Revenue Data Path
```
Stripe API
    ↓
stripe-revenue-tracking.ts (Cloud Function)
    ↓
use-stripe-revenue-direct.tsx (Hook)
    ↓
SimpleDashboard (Display)
```

### Trial & Conversion Data Path
```
Firestore Collections:
- subscriptions (trials)
- trial_conversions (paid)
    ↓
aggregate-metrics.ts (Daily 2AM)
    ↓
metrics_snapshots collection (stored)
    ↓
ConversionMetricsDashboard (Display)
```

### Cost Data Path
```
Google Cloud → BigQuery Billing Export
    ↓
real-cost-tracking.ts (Cloud Function)
    ↓
use-cost-tracking-dates.tsx (Hook)
    ↓
SimpleDashboard (Display)
```

### Analytics Data Path
```
Firebase Events
    ↓
analytics-api.ts OR google-analytics-api.ts
    ↓
FirebaseAnalyticsDashboard (Display)
```

---

## Critical Issues to Address

### Priority 1 (Immediate)
- [ ] **Hardcoded Fallback Data**: Stripe shows hardcoded €459.17, 7 users if API fails
  - Location: `use-stripe-revenue-direct.tsx:94-99`
  - Impact: Admin sees stale data if API fails
  - Fix: Cache last response with timestamp

- [ ] **Firebase Analytics API**: May not return real GA4 data
  - Location: `google-analytics-api.ts`
  - Impact: Analytics dashboard may show estimates instead of real data
  - Fix: Verify cloud function `getRealFirebaseAnalytics` works

### Priority 2 (High)
- [ ] **Data Fragmentation**: Trial data split between 2 Firestore collections
  - Location: `subscriptions` vs `trial_conversions`
  - Impact: Cohort analysis is approximated
  - Fix: Create unified trial user document

- [ ] **Manual Cost Input**: Not integrated into daily aggregation
  - Location: `manual-cost-input.tsx` + `aggregate-metrics.ts`
  - Impact: Daily snapshot doesn't include manually entered costs
  - Fix: Include manual costs in aggregation function

### Priority 3 (Medium)
- [ ] **Missing Key Metrics**:
  - Churn rate (cancellations per period)
  - Retention rate (% still active after X days)
  - LTV (lifetime value per user)
  - CAC (cost to acquire each customer)

- [ ] **No Real-Time Updates**:
  - Daily metrics only (2 AM aggregation)
  - Revenue/cost data on-demand only
  - No live dashboard possible

---

## Configuration Files to Know

| Config | Purpose | Path |
|--------|---------|------|
| Subscription Plans | Define tiers & features | `/src/config/subscription-plans.ts` |
| Stripe Pricing | Map plans to Stripe IDs | `/src/config/stripe-config.ts` |
| Feature Limits | Plan feature restrictions | `/src/config/feature-limits.ts` |

### Current Subscription Plans
```
Free: $0
Trial: $0 (7-day full access)
Pro: $49/month (price_1RDlLUEuKNJvNyAj6aQurNT6)
Premium: $99/month (price_1RNaIbEuKNJvNyAjr8R1LiXI)
Enterprise: Custom pricing
```

---

## How to Test Data Sources

### Test Stripe Revenue
```bash
# This should return MRR: €459.17, subscriptions: 7
curl -X GET https://us-central1-perception-app-3db34.cloudfunctions.net/api/stripe/revenue?period=month \
  -H "Authorization: Bearer $ADMIN_ID_TOKEN" \
  -H "Content-Type: application/json"
```

### Test Cost Data
```bash
# Should return Google Cloud + OpenAI breakdown
curl -X GET https://us-central1-perception-app-3db34.cloudfunctions.net/getRealCosts?period=month \
  -H "Authorization: Bearer $ADMIN_ID_TOKEN" \
  -H "Content-Type: application/json"
```

### Test Firebase Analytics
```bash
# Should return DAU, WAU, MAU, etc.
curl -X GET https://us-central1-perception-app-3db34.cloudfunctions.net/getRealFirebaseAnalytics \
  -H "Content-Type: application/json"
```

---

## Files Modified Dates (Recency Check)

Most Recent Changes:
- `simple-dashboard.tsx` - Oct 3
- `conversion-metrics-dashboard.tsx` - Oct 13
- `firebase-analytics-dashboard.tsx` - Oct 10
- `trial-signups.tsx` - Oct 9
- `use-stripe-revenue-direct.tsx` - Not recently (check logic)
- `aggregate-metrics.ts` - Oct 13

---

## For Development

### Enable/Disable Data Sources
In `firebase-analytics-dashboard.tsx`, line 36:
```typescript
const [dataSource, setDataSource] = useState<'firebase_console' | 'custom'>('firebase_console');
```

Change to `'custom'` to use fallback analytics instead of Firebase API.

### Demo Mode
In `use-cost-tracking-dates.tsx`, line 62:
```typescript
if (process.env.NODE_ENV === 'development') {
  // Uses demo data
}
```

Set `NODE_ENV=production` to use real cloud functions.

---

## Recommended Next Steps

1. **Verify Data Integrity** (Day 1)
   - Test all 4 data sources independently
   - Confirm Stripe shows €459.17 MRR
   - Confirm trial/conversion counts are accurate

2. **Create Data Source Health Dashboard** (Day 2-3)
   - Add status indicators for each source
   - Show last update time
   - Alert if data is stale (>1 hour old)

3. **Consolidate Dashboard** (Week 1)
   - Create unified aggregation function
   - Combine SimpleDashboard + ConversionMetrics
   - Add retention analysis

4. **Implement Missing Metrics** (Week 2)
   - Churn rate calculation
   - LTV/CAC analysis
   - Cohort retention curves

---

## Contact Points for Questions

### For Stripe Integration
- Main hook: `/src/hooks/use-stripe-revenue-direct.tsx`
- Backend: `/functions/src/stripe-revenue-tracking.ts`
- Config: `/src/config/stripe-config.ts`

### For Firebase Analytics
- Frontend service: `/src/lib/firebase/google-analytics-api.ts`
- Frontend fallback: `/src/lib/firebase/analytics-api.ts`
- Component: `/src/components/admin/firebase-analytics-dashboard.tsx`

### For Trial & Conversion Tracking
- Backend aggregator: `/functions/src/aggregate-metrics.ts`
- Frontend display: `/src/components/admin/conversion-metrics-dashboard.tsx`
- Data location: Firestore `metrics_snapshots` collection

### For Cost Tracking
- Backend: `/functions/src/real-cost-tracking.ts`
- Frontend hook: `/src/hooks/use-cost-tracking-dates.tsx`
- Manual input: `/src/components/admin/manual-cost-input.tsx`
- Currency conversion: `/src/hooks/use-currency-conversion.tsx`

