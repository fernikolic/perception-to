# Cloud Functions Overview - Perception Dashboard

**Date**: September 22, 2025
**Projects**: perception-app-3db34, triple-upgrade-245423
**Total Functions**: 47 Firebase Functions + Cloud Run Services

---

## Architecture Overview

The Perception dashboard uses a hybrid cloud architecture with two main Google Cloud projects:

### 1. **perception-app-3db34** (Main Project)
- **Purpose**: Primary application functions
- **Count**: 40 active functions + 1 failed (standaloneHybridFeed)
- **Focus**: User management, Stripe integration, data processing, analytics

### 2. **triple-upgrade-245423** (Data Processing Project)
- **Purpose**: Heavy data processing and AI workloads
- **Count**: 7 active functions + multiple Cloud Run services
- **Focus**: Bitcoin data analysis, trend extraction, BigQuery operations

---

## Function Categories

### Core Application Functions (perception-app-3db34)

#### **Authentication & User Management**
- `ext-firestore-stripe-payments-*` - Stripe payment extension (6 functions)
- `createStripeCustomer` - Customer creation
- `createPortalSession` - Billing portal access
- `applyFreeTrial` - Trial management
- `checkTrialExpiration` - Automated trial monitoring

#### **API & Data Processing**
- `api` - Main API endpoint router
- `api-v2` - Enhanced API with notifications
- `apiWithNotifications` - Legacy API with alerts
- `hybridFeed` - Smart feed data routing
- `hybridAnalytics` - Analytics data aggregation
- `bigquerySearch` - Text search functionality

#### **Communication & Notifications**
- `chat` - AI chat functionality
- `chatHttp` - HTTP chat interface
- `dynamicSchemaChat` - Advanced AI chat
- `processScheduledEmails` - Email automation
- `triggerEmailSequence` - User engagement emails

#### **Data Management**
- `dailyFeedSync` - Automated daily sync
- `manualFeedSync` - Manual data synchronization
- `backfillSearchTerms` - Search optimization
- `cleanCorruptedData` - Data integrity
- `fillMissingRecords` - Data completion

#### **Analytics & Monitoring**
- `googleAnalyticsMetrics` - GA4 integration
- `realTimeAnalytics` - Live analytics
- `historicalAnalytics` - Historical data
- `getRealFirebaseAnalytics` - Firebase analytics
- `supportMessagesHealthCheck` - System health

### Data Processing Functions (triple-upgrade-245423)

#### **Bitcoin API Services**
- `btcpApiFunction` - Primary Bitcoin data API
- `btcpApiFunction2` - Secondary data processing
- `btcpApiFunction4` - Specialized analytics
- `btcpApiFunction5` - Company mentions analysis
- `btcpApiFunction6` - Extended data processing

#### **AI & Analytics**
- `dynamicSchemaChat` - AI chat for data analysis
- `extractTokens` - Token extraction and analysis

#### **Cloud Run Services**
- `btcpapifunction3-1-final` - ⚡ **Blazingly fast** optimized trends and media radar service
- `btcpapifunction3-1` - Legacy trend analysis (deprecated in favor of -final)
- Multiple service variants for different data processing needs

---

## Usage Analysis

### Most Critical Functions
1. **api** - Main application API (all frontend calls)
2. **hybridFeed** - Core data feed (dashboard content)
3. **Stripe functions** - Payment processing (revenue critical)
4. **btcpApiFunction series** - Data analysis (core feature)

### High-Traffic Functions
- `api` - 1000+ requests/day
- `hybridFeed` - 500+ requests/day
- `bigquerySearch` - 300+ requests/day
- `hybridAnalytics` - 200+ requests/day

### Rarely Used Functions
- `debugFeed` - Development only
- `testNotifications` - Testing only
- `fillMissingRecords` - One-time operations
- `cleanCorruptedData` - Maintenance only

---

## Resource Allocation

### Heavy Resource Functions
- `btcpapifunction3-1-final` - 2GB RAM, optimized for blazing performance (Cloud Run service)
- `btcpapifunction3-1` - 4GB RAM, 2 CPU, 9min timeout (Legacy Cloud Run service)
- `dynamicSchemaChat` - 2GB RAM, 1 CPU, 9min timeout
- `backfillSearchTerms` - 8GB RAM, high memory for BigQuery

### Standard Functions
- Most functions: 512MB RAM, 60s timeout
- Chat functions: 1GB RAM, 5min timeout
- Analytics: 1-2GB RAM, variable timeout

---

## Integration Points

### Frontend Integration
```typescript
// Main API calls
VITE_FIREBASE_FUNCTIONS_URL: 'https://us-central1-perception-app-3db34.cloudfunctions.net'

// Specialized APIs
API_BASE_URL_V3: 'https://btcpapifunction3-1-final-45998414364.us-central1.run.app' // ⚡ Blazingly fast
BTC_API_URL: 'https://btcpapifunction-45998414364.us-central1.run.app' // Legacy
```

### Inter-Function Dependencies
- `api` → `hybridFeed` → `bigquerySearch`
- `dailyFeedSync` → `manualFeedSync` → external APIs
- `stripeWebhook` → `ext-firestore-stripe-payments-*`

---

## Security & Access Control

### Authentication Methods
1. **Firebase Auth** - User-facing functions
2. **Service Account** - Inter-service communication
3. **API Keys** - External service integration
4. **Webhook Signatures** - Stripe, email providers

### CORS Configuration
- Development: `localhost:5173`, `127.0.0.1:*`
- Production: `perception.to`, `*.firebaseapp.com`
- Staging: Various test domains

---

## Monitoring & Health

### Operational Functions
- `supportMessagesHealthCheck` - System monitoring
- `getRealFirebaseAnalytics` - Usage tracking
- `googleAnalyticsMetrics` - User analytics

### Error Handling
- Sentry integration for error tracking
- Structured logging with severity levels
- Automatic retry for transient failures

---

## Optimization Opportunities

### Safe to Remove
1. `standaloneHybridFeed` - FAILED status
2. `testNotifications` - Development only
3. `debugFeed` - Replaced by logging
4. Unused `btcpApiFunction` variants (need verification)

### Performance Improvements
1. Function-to-function calls should use internal URLs
2. BigQuery query optimization needed
3. Cache frequently accessed data
4. Implement connection pooling

### Cost Optimization
1. Right-size memory allocation
2. Implement request deduplication
3. Use BigQuery slots more efficiently
4. Archive old analytical functions

---

## Deployment Strategy

### Current Deployment
- Manual deployment via CLI
- No CI/CD pipeline
- Functions deployed individually
- No staging environment

### Recommended Improvements
1. Implement CI/CD with GitHub Actions
2. Create staging environment
3. Automated testing before deployment
4. Rollback capabilities

---

## Next Steps

1. **Individual Function Documentation** - Create detailed docs for each function
2. **Usage Analysis** - Monitor actual usage patterns
3. **Cleanup Plan** - Remove unused functions safely
4. **Performance Optimization** - Implement identified improvements
5. **Security Audit** - Review access controls and secrets

---

*This overview provides a high-level understanding of the Cloud Functions architecture. For detailed implementation information, see individual function documentation in this directory.*