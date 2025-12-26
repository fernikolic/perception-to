# Bitcoin Perception Dashboard - Documentation

Welcome to the comprehensive documentation for the Bitcoin Perception Dashboard.

## 🌐 Production URLs
- **Application**: [app.perception.to](https://app.perception.to)
- **API**: [api.perception.to](https://api.perception.to)
- **Website**: [perception.to](https://perception.to)

## 📖 Documentation Structure

### 🚀 Getting Started
- [**Project Overview**](./development/PROJECT-OVERVIEW.md) - Introduction to the platform and its features
- [**Quick Start Guide**](./development/PROJECT-OVERVIEW.md#quick-start) - Get up and running quickly
- [**Backend Functions**](../functions/README.md) - Firebase Functions and Cloud Run services

### 🔧 Technical Documentation
- [**Architecture & Specifications**](./technical/CLAUDE.md) - Complete technical documentation
- [**API Reference**](./technical/API-REFERENCE.md) - Complete API documentation
- [**AI Trends System**](./technical/TRENDS-SYSTEM.md) - Automated trend extraction system

### 🛠 Development & Deployment
- [**Deployment Guide**](./development/DEPLOYMENT-GUIDE.md) - Complete deployment instructions
- [**Environment Setup**](./development/DEPLOYMENT-GUIDE.md#environment-configuration) - Configuration guide
- [**Media Radar Optimization**](./backend/MEDIA_RADAR_OPTIMIZATION.md) - ⚡ **NEW** Performance optimization guide

### ✨ Features Documentation
- [**Chart to Report**](./features/CHART-TO-REPORT-FEATURE.md) - Chart capture and reporting features
- [**Support System Improvements**](./features/SUPPORT_SYSTEM_IMPROVEMENTS.md) - User support enhancements
- [**Saved Searches**](./features/SAVED_SEARCHES_FEATURE.md) - Search functionality
- [**Contact System**](./features/CONTACT_SYSTEM_AUDIT.md) - Communication features
- [**Social Images**](./features/SOCIAL-IMAGES-SETUP.md) - Social media integration
- [**Webscraping Optimization**](./features/WEBSCRAPING_OPTIMIZATION_GUIDE.md) - Data collection improvements

### 🏗 Infrastructure & Setup
- [**Security Implementation**](./infrastructure/SECURITY.md) - Comprehensive security measures
- [**Elasticsearch Setup**](./infrastructure/ELASTICSEARCH-SETUP.md) - Search infrastructure
- [**Firebase Analytics**](./infrastructure/FIREBASE_ANALYTICS_SETUP.md) - Analytics configuration
- [**Billing Setup**](./infrastructure/setup-billing-export.md) - Cost monitoring
- [**Hybrid Search System**](./hybrid-search/README.md) - Advanced search capabilities

### 💰 Subscription & Payments
- [**Subscription System**](./subscription-system/SUBSCRIPTION-IMPLEMENTATION.md) - Payment integration
- [**Stripe Setup**](./subscription-system/STRIPE-PRICING-SETUP.md) - Stripe configuration
- [**Portal Setup**](./subscription-system/STRIPE-PORTAL-SETUP.md) - Customer portal
- [**Testing Guide**](./subscription-system/manual-subscription-tests.md) - Manual testing procedures

### 🎯 Pricing & Marketing (October 2025 Update)
- [**Pricing & Plans**](./business/PRICING_AND_PLANS.md) - 📋 **Complete pricing documentation** with beta pricing strategy
- [**Trial & Email System**](./business/TRIAL_AND_EMAIL_SYSTEM.md) - 📧 **Trial flow & email sequence** technical docs
- [**Marketing Copy**](./business/MARKETING_COPY.md) - 📝 **All marketing copy** for website, ads, emails
- [**October 2025 Updates**](./changelog/OCTOBER_2025_UPDATES.md) - 🚀 **Latest deployment summary** and changes

### 📊 AI Trends System (v4.0 - October 2025)
- [**Trends System**](./technical/TRENDS-SYSTEM.md) - ✅ **Complete technical documentation** for v4.0
- [**Trends Changelog**](./technical/trends/CHANGELOG-TRENDS-V4.md) - 🎯 **Version 4.0 release notes** with performance metrics
- [**Quick Reference**](./technical/trends/TRENDS-QUICK-REFERENCE.md) - ⚡ **Fast lookup** for commands and queries

### 🚀 Deployment Options
- [**Cloudflare Deployment**](./deployment/CLOUDFLARE-DEPLOYMENT.md) - Cloudflare Pages setup
- [**Firebase Deployment**](./deployment/STRIPE-FIREBASE-DEPLOYMENT.md) - Firebase hosting

## 🏗 Architecture Overview

### Frontend Stack
- React 18 with TypeScript
- Vite build system
- Tailwind CSS styling
- Recharts/D3 visualizations
- Zustand state management

### Backend Services
- Firebase Functions (Node.js 20)
- Google Cloud Run (Trends service)
- BigQuery (Data warehouse)
- Firestore (Real-time database)

### AI & Analytics
- OpenAI GPT-4o-mini for trend extraction
- Custom NLP for sentiment analysis
- BigQuery ML for pattern detection

### Infrastructure
- Google Cloud Platform
- Cloudflare CDN
- Cloud Scheduler for automation
- Stripe for payments

## 🔑 Key Services

### Trend Extraction Service
- **Frequency**: Every hour
- **Endpoint**: `https://btcpapifunction3-1-final-45998414364.us-central1.run.app`
- **Documentation**: [Trends System](./technical/TRENDS-SYSTEM.md)

### Key API Endpoints
- **Trends**: `/trends` - AI-extracted business trends
- **Media Radar**: `/media-radar` - ⚡ **NEW** Blazingly fast optimized endpoint for Media Radar page
- **Authentication**: `/api/auth` - User management
- **Sentiment**: `/api/sentiment` - Historical sentiment data
- **Feed**: `/api/feed` - Article search and filtering
- **Market**: `/api/market` - Real-time Bitcoin data
- **Research**: `/api/research/*` - AI briefs and exports

See [API Reference](./technical/API-REFERENCE.md) for complete documentation.

### Scheduled Jobs
- `trends-hourly-update` - Extracts new trends every hour
- Configured via Google Cloud Scheduler

## 🛠 Common Commands

### Development
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run test          # Run tests
npm run lint          # Run linter
```

### Deployment
```bash
firebase deploy       # Deploy everything
gcloud run deploy     # Deploy Cloud Run service
```

### Monitoring
```bash
# Check trends scheduler
gcloud scheduler jobs list --location=us-central1

# View Cloud Run logs
gcloud run services logs read btcpapifunction3-1-final --limit=20

# Test Media Radar endpoint
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/media-radar?outlet=CoinDesk&pageSize=5"

# Check BigQuery trends
bq query --use_legacy_sql=false \
  'SELECT * FROM btcp_main_dataset.ai_trends_tracking LIMIT 10'
```

## 📊 Data Flow

1. **Article Ingestion** → BigQuery (`all_channels_data`)
2. **Trend Extraction** → Cloud Run service (hourly)
3. **AI Analysis** → OpenAI GPT-4o-mini
4. **Storage** → BigQuery (`ai_trends_tracking`)
5. **Frontend Display** → React app at app.perception.to

## 🔒 Security

- Firebase Auth for user management
- Stripe for secure payments
- Service account authentication for GCP
- Environment variables for secrets
- CORS configured for production domains

## 🚨 Troubleshooting

### Common Issues
1. **Trends not updating**: Check scheduler status
2. **API errors**: Review Cloud Run logs
3. **Payment issues**: Check Stripe dashboard
4. **Search problems**: Verify BigQuery indexes

### Support Contacts
- Technical: dev@perception.to
- Billing: billing@perception.to
- Security: security@perception.to

## 📚 Additional Resources

- [Google Cloud Console](https://console.cloud.google.com)
- [Firebase Console](https://console.firebase.google.com)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [OpenAI Platform](https://platform.openai.com)

---

## 📋 Quick Reference: Current Pricing

### Beta Pricing (Active Now)
- **Pro**: $49/month (regular $99) - 3 watchlist items, 10 AI briefs/month
- **Premium**: $99/month (regular $199) - 10 watchlist items, unlimited AI briefs
- **Trial**: 7 days free, no credit card required
- **Lock-in**: Beta users keep 50% off forever

See [PRICING_AND_PLANS.md](./business/PRICING_AND_PLANS.md) for complete details.

---

Last updated: October 2025
Version: 2.1.0