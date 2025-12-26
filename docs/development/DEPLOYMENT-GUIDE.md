# Bitcoin Perception Dashboard - Deployment Guide

**Note:** For staging environment setup and workflow, see [Staging Environment Guide](../deployment/STAGING-ENVIRONMENT.md).

## Prerequisites

Before deploying, ensure you have:

1. **Accounts & Access**:
   - Google Cloud Platform account with billing enabled
   - Firebase project created
   - Stripe account (production keys)
   - SendGrid account for emails
   - OpenAI API key with GPT-4o-mini access
   - Domain name (optional, for custom domain)

2. **Tools Installed**:
   ```bash
   # Install required CLIs
   npm install -g firebase-tools
   brew install google-cloud-sdk  # macOS
   # or
   curl https://sdk.cloud.google.com | bash  # Linux

   # Authenticate
   firebase login
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Service Account**:
   ```bash
   # Create service account for BigQuery/Cloud Run
   gcloud iam service-accounts create bitcoin-data-chat \
     --display-name="Bitcoin Data Chat Service Account"

   # Download key
   gcloud iam service-accounts keys create bitcoin-data-chat-key.json \
     --iam-account=bitcoin-data-chat@YOUR_PROJECT_ID.iam.gserviceaccount.com
   ```

## Environment Configuration

### 1. Frontend Environment Variables

Create `.env.production` in the root directory:

```env
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_key
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/123456
VITE_API_URL=https://api.perception.to
```

### 2. Backend Environment Variables

Create `functions/.env`:

```env
# Payment Processing
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Services
SENDGRID_API_KEY=SG.your_sendgrid_key
BREVO_API_KEY=xkeysib-your_brevo_key

# AI Services
OPENAI_API_KEY=sk-proj-your_openai_key
OPENAI_API_KEY_V2=sk-proj-your_openai_key_for_trends

# Data APIs
COINGECKO_API_KEY=CG-your_coingecko_key
GOOGLE_TRENDS_API_KEY=your_google_trends_key

# Service Account
GOOGLE_APPLICATION_CREDENTIALS=/path/to/bitcoin-data-chat-key.json
```

## Database Setup

### 1. Firestore

```bash
# Create Firestore database
firebase init firestore

# Deploy security rules
firebase deploy --only firestore:rules
```

### 2. BigQuery

```sql
-- Create dataset
CREATE SCHEMA IF NOT EXISTS `btcp_main_dataset`
OPTIONS(
  location="us-central1"
);

-- Create tables
CREATE TABLE IF NOT EXISTS `btcp_main_dataset.all_channels_data` (
  Title STRING,
  Content STRING,
  Outlet STRING,
  URL STRING,
  Date TIMESTAMP,
  Sentiment STRING
);

CREATE TABLE IF NOT EXISTS `btcp_main_dataset.ai_trends_tracking` (
  trend_id STRING,
  title STRING,
  summary STRING,
  key_highlights STRING,
  categories STRING,
  articles STRING,
  article_count INT64,
  signal_strength STRING,
  confidence_score FLOAT64,
  business_implications STRING,
  impact_tags STRING,
  generated_at TIMESTAMP,
  prompt_version STRING
);
```

### 3. Firestore Indexes

Create composite indexes for efficient queries:

```bash
# Deploy indexes
firebase deploy --only firestore:indexes
```

## Deployment Steps

### 1. Build Frontend

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test build locally
npm run preview
```

### 2. Deploy Frontend

#### Option A: Firebase Hosting

```bash
# Initialize hosting
firebase init hosting

# Deploy
firebase deploy --only hosting

# With custom domain
firebase hosting:channel:deploy production
```

#### Option B: Cloudflare Pages

```bash
# Connect GitHub repo to Cloudflare Pages
# Build command: npm run build
# Build output directory: dist
# Environment variables: Add all VITE_* variables
```

### 3. Deploy Firebase Functions

```bash
cd functions

# Install dependencies
npm install

# Build TypeScript
npm run build

# Deploy all functions
firebase deploy --only functions

# Or deploy specific function
firebase deploy --only functions:api
```

### 4. Deploy Cloud Run Service (Trends)

```bash
cd functions/btc-trends-ui-deployment

# Deploy service
gcloud run deploy btcpapifunction3-1-final \
  --source . \
  --region=us-central1 \
  --project=YOUR_PROJECT_ID \
  --memory=2GB \
  --timeout=300s \
  --allow-unauthenticated \
  --set-env-vars="OPENAI_API_KEY_V2=$OPENAI_API_KEY_V2"

# Get service URL
gcloud run services describe btcpapifunction3-1-final \
  --region=us-central1 \
  --format="value(status.url)"
```

### 5. Set Up Scheduled Jobs

```bash
# Create hourly trends extraction job
gcloud scheduler jobs create http trends-hourly-update \
  --location=us-central1 \
  --schedule="0 * * * *" \
  --uri="https://YOUR_CLOUD_RUN_URL/extract" \
  --http-method=POST \
  --headers="Content-Type=application/json" \
  --message-body='{"hours_back": 168}' \
  --time-zone="UTC"

# Start the scheduler
gcloud scheduler jobs resume trends-hourly-update --location=us-central1
```

### 6. Configure Stripe Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://app.perception.to/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## Post-Deployment

### 1. Verify Services

```bash
# Check Firebase Functions
firebase functions:log --only api

# Check Cloud Run
gcloud run services logs read btcpapifunction3-1-final \
  --region=us-central1 \
  --limit=10

# Check scheduler
gcloud scheduler jobs list --location=us-central1

# Test trends endpoint
curl https://YOUR_CLOUD_RUN_URL/trends
```

### 2. Set Up Monitoring

```bash
# Enable monitoring APIs
gcloud services enable monitoring.googleapis.com
gcloud services enable logging.googleapis.com
gcloud services enable error-reporting.googleapis.com

# Create uptime checks
gcloud monitoring uptime-check-configs create \
  --display-name="Bitcoin Perception API" \
  --resource-type="uptime-url" \
  --uri="https://YOUR_API_URL/health"
```

### 3. Configure Alerts

```bash
# CPU usage alert
gcloud alpha monitoring policies create \
  --notification-channels=YOUR_CHANNEL_ID \
  --display-name="High CPU Usage" \
  --condition-display-name="CPU > 80%" \
  --condition-threshold-value=0.8

# Error rate alert
gcloud alpha monitoring policies create \
  --notification-channels=YOUR_CHANNEL_ID \
  --display-name="High Error Rate" \
  --condition-display-name="Errors > 1%" \
  --condition-threshold-value=0.01
```

## Domain Configuration

### 1. Firebase Hosting Custom Domain

```bash
# Add custom domain
firebase hosting:sites:create app.perception.to

# Connect domain
firebase hosting:channel:deploy production --expires 30d
```

### 2. Cloud Run Custom Domain

```bash
# Map custom domain
gcloud beta run domain-mappings create \
  --service=btcpapifunction3-1-final \
  --domain=api.perception.to \
  --region=us-central1
```

## Security Hardening

### 1. API Keys Rotation

```bash
# Rotate service account key
gcloud iam service-accounts keys create new-key.json \
  --iam-account=bitcoin-data-chat@YOUR_PROJECT_ID.iam.gserviceaccount.com

# Update environment variable
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/new-key.json

# Delete old key
gcloud iam service-accounts keys delete OLD_KEY_ID \
  --iam-account=bitcoin-data-chat@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

### 2. Firestore Security Rules

Update `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Subscriptions are read-only for users
    match /subscriptions/{subId} {
      allow read: if request.auth != null &&
        request.auth.uid == resource.data.userId;
    }

    // Public read for trends
    match /trends/{trendId} {
      allow read: if true;
    }
  }
}
```

### 3. CORS Configuration

CORS configuration is centralized in `functions/src/config/cors.ts`:

```typescript
const ALLOWED_ORIGINS = [
  'https://app.perception.to',
  'https://perception.to',
  'https://www.perception.to',
  'https://perception-app-3db34.web.app',
  'https://perception-app-3db34.firebaseapp.com',
  // Staging domain
  'https://staging.perception-app.pages.dev',
  // Development origins
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];
```

**Note:** See [Staging Environment Guide](../deployment/STAGING-ENVIRONMENT.md) for details on staging URL configuration.

## Backup & Recovery

### 1. Automated Backups

```bash
# Enable Firestore backups
gcloud firestore backups schedules create \
  --database=default \
  --recurrence=daily \
  --retention=7d

# BigQuery backups
bq mk --transfer_config \
  --data_source=scheduled_query \
  --display_name="Daily Backup" \
  --schedule="every day 02:00" \
  --destination_dataset=backups
```

### 2. Manual Backup

```bash
# Export Firestore
gcloud firestore export gs://YOUR_BUCKET/firestore-backup

# Export BigQuery
bq extract \
  --destination_format=AVRO \
  btcp_main_dataset.ai_trends_tracking \
  gs://YOUR_BUCKET/bigquery-backup/trends*.avro
```

## Rollback Procedures

### 1. Frontend Rollback

```bash
# Firebase Hosting
firebase hosting:rollback

# Cloudflare Pages
# Use dashboard to rollback to previous deployment
```

### 2. Cloud Run Rollback

```bash
# List revisions
gcloud run revisions list \
  --service=btcpapifunction3-1-final \
  --region=us-central1

# Rollback to specific revision
gcloud run services update-traffic \
  btcpapifunction3-1-final \
  --to-revisions=REVISION_NAME=100 \
  --region=us-central1
```

## Performance Optimization

### 1. Enable CDN

```bash
# Firebase Hosting automatically uses CDN

# For Cloud Run, use Cloud CDN
gcloud compute backend-services create bitcoin-api-backend \
  --global \
  --load-balancing-scheme=EXTERNAL \
  --protocol=HTTPS
```

### 2. Configure Caching

```javascript
// Add cache headers in Cloud Run
app.get('/trends', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
  // ... rest of handler
});
```

## Cost Management

### 1. Set Budget Alerts

```bash
gcloud billing budgets create \
  --billing-account=YOUR_BILLING_ACCOUNT \
  --display-name="Monthly Bitcoin App Budget" \
  --budget-amount=500 \
  --threshold-rule=percent=50 \
  --threshold-rule=percent=90 \
  --threshold-rule=percent=100
```

### 2. Resource Limits

```yaml
# Cloud Run configuration
spec:
  template:
    spec:
      containers:
      - image: IMAGE_URL
        resources:
          limits:
            cpu: "2"
            memory: "2Gi"
      containerConcurrency: 100
      timeoutSeconds: 300
```

## Troubleshooting

### Common Issues

1. **Trends not updating**
   - Check scheduler: `gcloud scheduler jobs list`
   - Check Cloud Run logs for errors
   - Verify OpenAI API key is valid

2. **High latency**
   - Check Cloud Run cold starts
   - Review BigQuery query performance
   - Enable Cloud CDN for static content

3. **Authentication errors**
   - Verify service account permissions
   - Check CORS configuration
   - Review Firebase Auth settings

## Support Contacts

- **Technical Issues**: dev-team@perception.to
- **Billing Questions**: billing@perception.to
- **Security Concerns**: security@perception.to

---

For development setup, see [README.md](../README.md)
For trends system details, see [TRENDS-SYSTEM.md](./TRENDS-SYSTEM.md)