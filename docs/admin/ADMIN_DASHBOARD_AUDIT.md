# Comprehensive Admin Dashboard Audit Report
## Perception App - Dashboard & Business Metrics Integration

Generated: October 21, 2025

---

## EXECUTIVE SUMMARY

The admin dashboard is fragmented across multiple components and data sources. Currently, there is:
- **No unified dashboard** consolidating all metrics
- **Multiple separate dashboards** handling different data (Firebase, Stripe, Google Analytics, Firestore)
- **Disconnected data flow** from Firebase → Stripe → Google Analytics
- **Redundant components** with overlapping functionality
- **Incomplete data aggregation** at the function level

### Current Status:
- 7 active paying subscribers (Stripe tracked)
- €459.17 monthly recurring revenue (EUR, needs USD conversion)
- Trial user tracking is fragmented
- Conversion rate calculation exists but not displayed prominently

---

## DIRECTORY STRUCTURE

### Admin Component Files (Frontend)
```
/Users/fernandonikolic/perception/src/components/admin/
├── pages/
│   ├── admin-dashboard.tsx                    (Entry point - delegates to SimpleDashboard)
│   ├── admin-analytics.tsx                    (Tab-based analytics with 4 sections)
│   ├── users-management.tsx                   (User admin panel)
│   ├── sentiment-analysis.tsx                 (Sentiment tools)
│   ├── sentiment-dashboard.tsx                (Sentiment metrics)
│   ├── price-analytics.tsx                    (Price correlation)
│   ├── ai-chat-page.tsx                       (AI assistant testing)
│   ├── notifications-management.tsx           (Notification system)
│   ├── research-content-management.tsx        (Content management)
│   ├── topics-management.tsx                  (Topic management)
│   ├── social-media-management.tsx            (Social media management)
│   ├── research-tools.tsx                     (Research tools)
│   ├── messages-management.tsx                (Support messages)
│
├── layout/
│   ├── admin-layout.tsx                       (Main layout wrapper)
│   ├── admin-header.tsx                       (Header component)
│   ├── admin-sidebar.tsx                      (Navigation sidebar with 4 sections)
│
├── simple-dashboard.tsx                       (MAIN: Business overview + revenue)
├── conversion-metrics-dashboard.tsx           (Trial→paid metrics)
├── firebase-analytics-dashboard.tsx           (Firebase/GA4 analytics)
├── trial-signups.tsx                          (Recent trial signups table)
├── revenue-analytics.tsx                      (Revenue & plan breakdown)
├── real-time-dashboard.tsx                    (Real-time metrics)
├── user-usage-analytics.tsx                   (User engagement metrics)
├── users-table.tsx                            (User management table)
├── profitability-dashboard.tsx                (Profitability metrics)
├── EmailAnalyticsDashboard.tsx                (Email campaign metrics)
├── admin-navigation.tsx                       (Dropdown navigation)
├── view-switcher.tsx                          (Tab switcher)
├── subscription-tracker.tsx                   (Subscription tracking)
├── messages-admin.tsx                         (Message admin view)
├── research-content.tsx                       (Content admin)
├── topics.tsx                                 (Topics admin)
├── manual-cost-input.tsx                      (Manual cost entry)
├── add-user-dialog.tsx                        (User creation dialog)
```

---

## DATA SOURCES & INTEGRATIONS

### 1. FIREBASE (Primary User Data Source)
**Location**: `/Users/fernandonikolic/perception/src/lib/firebase/`

**Collections Being Used**:
- `users` - User accounts (base user count)
- `subscriptions` - Trial & paid subscription tracking
- `trial_conversions` - Conversion records with MRR
- `metrics_snapshots` - Daily aggregated metrics
- `user_analytics` - User activity tracking
- `analytics_events` - Event tracking
- `subscriptions` - Subscription status tracking

**Analytics Service**: `analytics-api.ts`
- Fetches DAU, WAU, MAU (Daily/Weekly/Monthly Active Users)
- Counts new users and returning users
- Calculates session metrics
- **Issue**: Falls back to estimates if data unavailable

**Access Method**: Direct Firestore queries in hooks

---

### 2. STRIPE (Payment & Revenue Data)
**Location**: `/Users/fernandonikolic/perception/functions/src/`

**Data Points Tracked**:
- Active subscriptions count (7 paying users)
- Monthly Recurring Revenue (MRR): €459.17
- Subscription status (active, trialing, canceled)
- Plan breakdown (Pro: $49/mo, Premium: $99/mo)
- Total customer count
- Average revenue per user (ARPU)

**Plans Configured**:
```
- Free: $0
- Trial: $0 (7-day free access)
- Pro: $49/month (price_1RDlLUEuKNJvNyAj6aQurNT6)
- Premium: $99/month (price_1RNaIbEuKNJvNyAjr8R1LiXI)
- Enterprise: Custom pricing
```

**Backend Functions**:
- `stripe-revenue-tracking.ts` - Fetches Stripe API data
- `/api/stripe/revenue` endpoint - Returns: MRR, total customers, active subscriptions

**Current Hook**: `use-stripe-revenue-direct.tsx`
- Hardcoded fallback: €459.17 MRR, 7 paying customers
- Total user count from Firestore
- Conversion rate: 7/total_users

---

### 3. GOOGLE ANALYTICS 4 (User Behavior Analytics)
**Location**: `/Users/fernandonikolic/perception/src/lib/firebase/`

**Service**: `google-analytics-api.ts`
- GA Property ID: `445998414364` (from G-KP9HFWD6X9)
- **Data Points**:
  - DAU (Daily Active Users)
  - WAU (Weekly Active Users)
  - MAU (Monthly Active Users)
  - New users vs returning users
  - Session count & duration
  - Page views & bounce rate
  - Device breakdown (mobile/desktop/tablet)
  - Country breakdown

**Fallback Strategy**:
1. Try Firebase Analytics Cloud Function (`getRealFirebaseAnalytics`)
2. Fall back to Firestore user data with estimates
3. Final fallback: Basic placeholder data

**Issues**: 
- Relies on cloud function that may not return real GA4 data
- Falls back to rough estimates based on user count
- No real-time sync

---

### 4. GOOGLE CLOUD (Infrastructure Costs)
**Location**: `/Users/fernandonikolic/perception/functions/src/real-cost-tracking.ts`

**Data Points**:
- Google Cloud billing (compute, storage, networking, other)
- OpenAI costs (GPT-4, GPT-3.5, embeddings)
- Cost breakdowns by service
- Monthly vs previous month comparison
- Currency: EUR (converted to USD)

**Data Source**: BigQuery billing export
- Query: `gcp_billing_export_v1_*` tables
- Costs categorized by service type

**Hook**: `use-cost-tracking-dates.tsx`
- In development: Uses demo data
- In production: Calls cloud function `getRealCosts`
- Manual cost input available

---

### 5. CURRENCY CONVERSION
**Hook**: `use-currency-conversion.tsx`

**Source**: Frankfurter API (free, no key required)
- EUR ↔ USD conversion
- Live exchange rates
- Fallback rate: 1 EUR = $1.10 if API fails
- Refreshes hourly

---

## CURRENT DASHBOARD COMPONENTS

### 1. SimpleDashboard (MAIN DASHBOARD)
**File**: `/Users/fernandonikolic/perception/src/components/admin/simple-dashboard.tsx`

**Metrics Displayed**:
- Monthly Revenue (from Stripe, EUR converted to USD)
- Monthly Costs (Google Cloud + OpenAI + Subscriptions)
- Net Profit (Revenue - Costs)
- Conversion Rate (active subscriptions / total users)

**Breakdown Cards**:
- Infrastructure costs (Google Cloud, OpenAI)
- Subscriptions (Claude Max, Google Workspace, Ghost Pro, Feedly, IFTTT)
- Business Status (Profitability, Margin, Next milestone)

**Special Feature**: Founder Pricing Progress
- Tracks 100-user limit for 50% lifetime discount
- Shows milestone indicators (25, 50, 75, 100 users)
- Current: ~7 users (if showing active subscriptions as founder pricing)

**Period Selection**: This Month, Last Month, This Quarter

---

### 2. AdminAnalytics (Tab-Based Aggregator)
**File**: `/Users/fernandonikolic/perception/src/components/admin/pages/admin-analytics.tsx`

**Tabs**:
1. **Conversion Metrics** → ConversionMetricsDashboard
2. **Trial Signups** → TrialSignups
3. **Firebase Analytics** → FirebaseAnalyticsDashboard
4. **Email Analytics** → EmailAnalyticsDashboard

---

### 3. ConversionMetricsDashboard
**File**: `/Users/fernandonikolic/perception/src/components/admin/conversion-metrics-dashboard.tsx`

**Key Metrics**:
- Trial Signups (total)
- Conversions (trials→paid)
- Conversion Rate (%)
- New MRR ($)
- Avg. Time to Convert (days)
- Active Subscriptions

**Charts**:
- Trial Signups & Conversions timeline (area chart)
- Conversion Funnel (bar chart):
  - Signed Up → Started Trial → Active Users → Converted to Paid
- Cohort Analysis (table by week)
- Revenue Growth (new MRR over time)

**Data Source**: `metrics_snapshots` collection (Firestore)

---

### 4. FirebaseAnalyticsDashboard
**File**: `/Users/fernandonikolic/perception/src/components/admin/firebase-analytics-dashboard.tsx`

**Metrics**:
- Real-time active users
- DAU, WAU, MAU
- New users, returning users
- Sessions, avg session duration
- Page views, bounce rate

**Breakdown**:
- Device category distribution
- Country distribution
- Top pages

**Data**: Real Firebase Analytics via Google Analytics API

---

### 5. TrialSignups
**File**: `/Users/fernandonikolic/perception/src/components/admin/trial-signups.tsx`

**Stats**:
- Today's signups
- This week's signups
- Active trials
- Total signups

**Table**: Recent trial signups with:
- Username & email
- Selected plan
- Trial status (days remaining)
- Signup time

---

## SIDEBAR NAVIGATION STRUCTURE

Located in `/Users/fernandonikolic/perception/src/components/admin/layout/admin-sidebar.tsx`

```
Admin Dashboard
├── Overview
│   └── Dashboard (/)
├── User Management
│   ├── Users (/users)
│   ├── Trial Signups (/trial-signups)
│   └── Analytics (/analytics)
├── Testing Ground
│   ├── AI Chat Assistant (/ai-chat)
│   ├── Topics (/topics)
│   ├── Sentiment (/sentiment)
│   ├── Sentiment Dashboard (/sentiment-dashboard)
│   └── Price (/price)
└── System
    ├── Notifications (/notifications)
    └── Support Messages (/messages)
```

---

## BACKEND CLOUD FUNCTIONS

### Key Functions for Dashboard Data

**Location**: `/Users/fernandonikolic/perception/functions/src/`

1. **aggregate-metrics.ts** (Daily Scheduler)
   - Runs: Every day at 2:00 AM EST
   - Calculates daily metrics snapshots
   - Stores to `metrics_snapshots` collection
   - Tracks: Trials started, conversions, MRR, expiring trials, subscriptions

2. **stripe-revenue-tracking.ts**
   - Endpoint: `/api/stripe/revenue`
   - Returns: MRR, active subscriptions, customer count, ARPU
   - Compares current vs previous period

3. **real-cost-tracking.ts**
   - Endpoints: `/getRealCosts`, `/refreshRealCosts`
   - Queries BigQuery billing export
   - Returns: Google Cloud + OpenAI costs breakdown

4. **real-firebase-analytics.ts** (Planned)
   - Endpoint: `/getRealFirebaseAnalytics`
   - Supposed to return real GA4 data
   - Status: May not be properly configured

5. **api.ts** (Main API Router)
   - Routes requests to various endpoints
   - Handles authentication & authorization

---

## CURRENT METRICS BEING TRACKED

### Business Metrics
✓ Monthly Recurring Revenue (MRR)
✓ Total Revenue
✓ Monthly Costs (Infrastructure + Subscriptions)
✓ Gross Profit / Net Profit
✓ Profit Margin %
✓ Active Subscriptions Count
✓ Total Customers/Users
✓ Average Revenue Per User (ARPU)
✓ Conversion Rate (%)
✓ Trial → Paid Conversion Count
✗ Churn Rate (not calculated)
✗ Customer Lifetime Value (partial calculation)
✗ Retention Rate (by cohort)
✗ CAC (Customer Acquisition Cost) - not tracked
✗ LTV/CAC Ratio - not tracked

### User Metrics
✓ DAU (Daily Active Users)
✓ WAU (Weekly Active Users)
✓ MAU (Monthly Active Users)
✓ New Users
✓ Returning Users
✓ Sessions
✓ Avg Session Duration
✓ Page Views
✓ Bounce Rate
✓ Device Breakdown
✓ Country Breakdown
✗ Feature adoption rates
✗ User journey/funnel analysis

### Trial Metrics
✓ Trial Signups (today, this week, total)
✓ Active Trials
✓ Trials Expired
✓ Trials Expiring (3 days, 7 days)
✓ Trial Duration
✓ Time to Conversion
✗ Trial completion rate by plan type
✗ Trial dropout reasons

### Financial Metrics
✓ Subscription plan breakdown (Pro vs Premium)
✓ Revenue by plan
✓ Google Cloud costs
✓ OpenAI costs
✓ Subscription costs (manual list)
✓ Cost trends (current vs previous period)
✗ Cost per active user
✗ Gross margin per plan
✗ LTV:CAC ratio

---

## ISSUES & REDUNDANCIES IDENTIFIED

### 1. Multiple Dashboard Components with Overlapping Functionality

**Problem**: Multiple files doing similar things:
- `simple-dashboard.tsx` - Main business overview
- `revenue-analytics.tsx` - Revenue specific
- `profitability-dashboard.tsx` - Profit specific
- `real-time-dashboard.tsx` - Real-time metrics

**Impact**: Maintenance burden, inconsistent data sources, different update frequencies

**Recommendation**: Consolidate into single unified dashboard with modular sections

### 2. Fragmented Data Sources

**Problem**:
- Trial data: `subscriptions` collection + `trial_conversions`
- Revenue data: Stripe API + Firestore subscriptions
- Analytics data: Firebase Analytics API + Firestore estimates
- Cost data: BigQuery + manual input

**Impact**: 
- Multiple points of truth
- Inconsistent data formats
- Race conditions with manual updates
- Fallback cascades can return stale data

**Recommendation**: Create unified data aggregation function that:
- Fetches from all sources in parallel
- Normalizes data format
- Caches results with TTL
- Returns complete dataset or error

### 3. Incomplete Metrics Aggregation

**Problem**: `aggregate-metrics.ts` stores daily snapshots but:
- Runs only once per day
- Doesn't include all important metrics (churn, LTV, CAC, etc.)
- No real-time version available
- Manual cost input not integrated into daily aggregation

**Recommendation**: 
- Create real-time aggregation endpoint
- Expand metrics to include cohort analysis
- Create retention rate calculations
- Calculate cost per user

### 4. Hardcoded Data Fallbacks

**Problem** (in `use-stripe-revenue-direct.tsx`):
```typescript
monthlyRecurringRevenue: 459.17, // Hardcoded
activeSubscriptions: 7,           // Hardcoded
```

**Impact**: If Stripe API fails, old data is shown

**Recommendation**: 
- Cache last successful response with timestamp
- Show data freshness indicator
- Alert admin if data is stale

### 5. Currency Inconsistency

**Problem**: 
- Stripe revenue: €459.17 (EUR)
- Costs: EUR + USD mixed
- Dashboard: Converts EUR→USD for display only
- No clear currency tracking in backend

**Impact**: Potential rounding errors, conversion rate volatility affects metrics

**Recommendation**: 
- Store all amounts in base currency (EUR or USD)
- Track conversion rate at time of transaction
- Display both currencies with conversion rate

### 6. Trial Tracking Disconnected from Conversion

**Problem**:
- Trial signups in `subscriptions` collection
- Conversions in separate `trial_conversions` collection
- No single source of truth for trial→paid journey
- Cohort analysis is approximated

**Recommendation**: 
- Create unified trial user profile object
- Link conversions to trial records
- Calculate accurate cohort metrics

### 7. Missing Key Business Metrics

**Not Currently Tracked**:
- **Churn Rate**: Number of paying users who canceled in period
- **Retention Rate**: % of users still active after X days
- **LTV (Lifetime Value)**: Average revenue per user over lifetime
- **CAC (Customer Acquisition Cost)**: How much spent to acquire each customer
- **Magic Number**: MRR Growth / Sales & Marketing Spend
- **Time to Payback**: How long to recover CAC
- **Monthly Cohort Retention**: % retention by signup cohort

**Recommendation**: Create retention module:
```typescript
- Track user creation date
- Track subscription cancellation date
- Calculate retention curves by cohort
- Calculate LTV from historical data
```

### 8. Real-Time vs Batch Updates

**Problem**:
- Daily metrics run at 2 AM
- Revenue data updated on-demand only
- Cost data semi-manual
- No real-time dashboard possible

**Recommendation**:
- Scheduled updates: Every 6 hours for forecasts
- Real-time events for trial conversions
- Streaming cost updates from GCP APIs
- WebSocket updates for live dashboard

### 9. Admin Access Control

**Current**: Checks `isAdmin` flag in user document

**Issue**: No granular permissions (view all, edit costs, etc.)

**Recommendation**: Role-based access control (RBAC)

---

## DATA FLOW ARCHITECTURE

### Current State (Fragmented)
```
Firebase Firestore ─→ analytics-api.ts ──→ firebase-analytics-dashboard.tsx
                  ├→ Direct queries ────────→ conversion-metrics-dashboard.tsx
                  └→ Direct queries ────────→ trial-signups.tsx

Stripe API ───────────→ stripe-revenue-tracking.ts ──→ use-stripe-revenue-direct.tsx ──→ simple-dashboard.tsx

BigQuery ──────────────→ real-cost-tracking.ts ───────→ use-cost-tracking-dates.tsx ───→ simple-dashboard.tsx

Google Analytics ──────→ google-analytics-api.ts ─────→ firebase-analytics-dashboard.tsx
```

### Recommended Unified Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                  Admin Dashboard (React)                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
        ┌──────────────────────────────────────┐
        │  Unified Metrics Aggregation Service │
        │  (Cloud Function: aggregateAllMetrics)
        └──────────────────┬───────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
    ┌────────┐         ┌────────┐        ┌──────────┐
    │Firebase│         │ Stripe │        │BigQuery &│
    │        │         │        │        │Google    │
    │- Users │         │- MRR   │        │Analytics │
    │- Trials│         │- Subs  │        │          │
    │- Conv  │         │- Cust  │        │- Costs   │
    │- Events│         │        │        │- Analytics
    └────────┘         └────────┘        └──────────┘
```

---

## CONSOLIDATION RECOMMENDATIONS

### 1. Create Unified Dashboard Component
**File**: `unified-dashboard.tsx`

```typescript
export function UnifiedDashboard() {
  const [period, setPeriod] = useState('month');
  const { metrics, loading } = useUnifiedMetrics(period);

  return (
    <div>
      {/* Key Metrics Row */}
      <MetricsGrid metrics={metrics} />
      
      {/* Revenue Section */}
      <RevenueSection data={metrics.revenue} />
      
      {/* Conversion & Trial Section */}
      <ConversionSection data={metrics.conversion} />
      
      {/* Cost Analysis Section */}
      <CostSection data={metrics.costs} />
      
      {/* Retention & Cohort Section */}
      <RetentionSection data={metrics.retention} />
    </div>
  );
}
```

### 2. Create Unified Metrics Hook
**File**: `hooks/use-unified-metrics.ts`

```typescript
export interface UnifiedMetrics {
  revenue: {
    mrr: number;
    arr: number;
    totalRevenue: number;
    lastUpdated: Date;
  };
  users: {
    totalUsers: number;
    activeSubscriptions: number;
    trialUsers: number;
    dau: number;
    wau: number;
    mau: number;
  };
  conversion: {
    rate: number;
    trialsStarted: number;
    conversions: number;
    avgTimeToConvert: number;
  };
  costs: {
    totalMonthly: number;
    breakdown: {...};
  };
  retention: {
    churnRate: number;
    retentionByCohort: {...};
  };
}
```

### 3. Create Backend Aggregation Function
**File**: `functions/src/unified-metrics.ts`

- Runs every 6 hours or on-demand
- Calls all data sources in parallel
- Normalizes and validates data
- Stores to `unified_metrics` collection
- Returns complete metrics object

### 4. Organize Sidebar Navigation
**Current Issue**: 4 different navigation systems

**Recommendation**: Single navigation with sections:
- Overview (Unified Dashboard)
- Metrics
  - Revenue
  - Users & Engagement
  - Conversions & Trials
  - Costs
- User Management
  - Users
  - Trial Signups
- System
  - Notifications
  - Messages

---

## IMPLEMENTATION PRIORITY

### Phase 1: Data Foundation (Week 1-2)
- [ ] Fix Stripe API integration (ensure real data)
- [ ] Fix Firebase Analytics API cloud function
- [ ] Create data source health checks
- [ ] Implement data freshness timestamps

### Phase 2: Unified Aggregation (Week 2-3)
- [ ] Create backend aggregation function
- [ ] Implement caching strategy
- [ ] Add fallback mechanisms
- [ ] Test all data sources

### Phase 3: Unified Dashboard (Week 3-4)
- [ ] Create main unified dashboard component
- [ ] Consolidate trial & conversion metrics
- [ ] Add retention analysis section
- [ ] Implement cost breakdown charts

### Phase 4: Advanced Metrics (Week 4-5)
- [ ] Calculate churn rate
- [ ] Calculate LTV & CAC
- [ ] Create cohort retention table
- [ ] Add forecasting/projections

### Phase 5: Optimization (Week 5-6)
- [ ] Implement real-time updates (WebSocket)
- [ ] Add data export functionality
- [ ] Create admin alerts for anomalies
- [ ] Performance optimization

---

## NEXT STEPS

1. **Immediate**: Test all data source integrations
   - Verify Stripe API returns correct MRR (€459.17)
   - Verify Firebase Analytics returns GA4 data
   - Verify BigQuery costs are accurate

2. **Short-term**: Create unified metrics endpoint
   - Add to `functions/src/api.ts`
   - Test with all combinations

3. **Mid-term**: Build unified dashboard
   - Replace simple-dashboard with consolidated version
   - Remove redundant components

4. **Long-term**: Implement advanced analytics
   - Retention curves
   - Cohort analysis
   - Forecasting

---

## FILES LOCATION REFERENCE

| Purpose | File Path |
|---------|-----------|
| Main Business Dashboard | `/src/components/admin/simple-dashboard.tsx` |
| Conversion Metrics | `/src/components/admin/conversion-metrics-dashboard.tsx` |
| Firebase Analytics | `/src/components/admin/firebase-analytics-dashboard.tsx` |
| Trial Signups | `/src/components/admin/trial-signups.tsx` |
| Admin Pages Router | `/src/components/admin/pages/admin-analytics.tsx` |
| Stripe Revenue Hook | `/src/hooks/use-stripe-revenue-direct.tsx` |
| Cost Tracking Hook | `/src/hooks/use-cost-tracking-dates.tsx` |
| Currency Conversion | `/src/hooks/use-currency-conversion.tsx` |
| Firebase Analytics Service | `/src/lib/firebase/analytics-api.ts` |
| Google Analytics Service | `/src/lib/firebase/google-analytics-api.ts` |
| Trial Signups API | `/src/lib/api/trial-signups.ts` |
| Metrics Aggregation Function | `/functions/src/aggregate-metrics.ts` |
| Stripe Revenue Function | `/functions/src/stripe-revenue-tracking.ts` |
| Cost Tracking Function | `/functions/src/real-cost-tracking.ts` |
| Subscription Plans Config | `/src/config/subscription-plans.ts` |
| Stripe Config | `/src/config/stripe-config.ts` |
| Admin Sidebar Navigation | `/src/components/admin/layout/admin-sidebar.tsx` |

