# Bitcoin Perception Dashboard

A comprehensive Bitcoin market intelligence platform that tracks sentiment, media coverage, and emerging trends across the crypto ecosystem.

![Bitcoin Perception Dashboard](https://app.perception.to)

## Features

### 📊 Real-Time Market Intelligence
- **Sentiment Analysis**: Track Bitcoin sentiment across 50+ major news outlets
- **Media Coverage**: Monitor volume and tone of Bitcoin coverage
- **Price Correlation**: Analyze sentiment vs price movements
- **Fear & Greed Index**: Real-time market psychology indicators

### 🤖 AI-Powered Trends Analysis
- **Automated Trend Extraction**: Hourly analysis of emerging Bitcoin narratives
- **Business Intelligence**: Actionable insights for decision-makers
- **Smart Categorization**: Established vs emerging trend classification
- **Signal Strength**: Confidence scoring for trend reliability

### 🔍 Advanced Research Tools
- **Hybrid Search**: Combined Firestore + BigQuery search capabilities
- **Watchlist Tracking**: Monitor specific keywords and topics
- **Research Briefs**: AI-generated summaries of key developments
- **Data Export**: Download research data in multiple formats

### 📈 Interactive Visualizations
- **Time Series Charts**: Historical sentiment and volume trends
- **Comparative Analysis**: Cross-outlet sentiment comparison
- **Heat Maps**: Topic and sentiment distribution
- **Custom Dashboards**: Personalized view configurations

## Quick Start

### Prerequisites
- Node.js 20+
- Firebase CLI
- Google Cloud SDK
- Active Firebase project
- Stripe account (for payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/perception/perception.git
cd perception

# Install dependencies
npm install

# Install function dependencies
cd functions
npm install
cd ..

# Set up environment variables
cp .env.example .env.development
# Edit .env.development with your keys

# Start development server
npm run dev
```

### Environment Setup

Create `.env.development` in the root directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

Create `functions/.env`:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
SENDGRID_API_KEY=your_sendgrid_key
OPENAI_API_KEY=your_openai_key
OPENAI_API_KEY_V2=your_openai_key_for_trends
```

## Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing fast builds
- **Tailwind CSS** for styling
- **Recharts/D3** for visualizations
- **Zustand** for state management
- **React Query** for data fetching

### Backend
- **Firebase Functions** for serverless APIs
- **Google Cloud Run** for trend extraction service
- **BigQuery** for data analytics
- **Firestore** for real-time data
- **Cloud Scheduler** for automated jobs

### AI & Data Processing
- **OpenAI GPT-4o-mini** for trend analysis
- **Custom NLP** for sentiment analysis
- **BigQuery ML** for pattern recognition

## Deployment

### Production Deployment

```bash
# Build frontend
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy Firebase Functions
cd functions
npm run deploy

# Deploy Cloud Run service
gcloud run deploy btcpapifunction3-1-final \
  --source ./btc-trends-ui-deployment \
  --region=us-central1 \
  --project=your-project-id
```

### Scheduled Jobs

The system runs automated trend extraction every hour:

```bash
# Check scheduler status
gcloud scheduler jobs list --location=us-central1

# Resume trend extraction
gcloud scheduler jobs resume trends-hourly-update --location=us-central1

# Pause if needed
gcloud scheduler jobs pause trends-hourly-update --location=us-central1
```

## API Documentation

### Public Endpoints

#### Get Trends
```http
GET /api/trends?date=2025-09-25&include_emerging=true
```

Returns AI-extracted business trends with categorization.

#### Search Articles
```http
GET /api/feed?q=bitcoin+etf&limit=50
```

Hybrid search across article database.

#### Get Sentiment Data
```http
GET /api/sentiment?outlet=Forbes&days=30
```

Historical sentiment data by outlet.

### Authenticated Endpoints

All authenticated endpoints require Firebase Auth token in headers:
```http
Authorization: Bearer {firebase_auth_token}
```

## Project Structure

```
perception/
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilities
│   └── types/             # TypeScript types
├── functions/             # Backend functions
│   ├── src/              # Source code
│   └── btc-trends-ui-deployment/  # Cloud Run service
├── public/               # Static assets
├── docs/                 # Documentation
└── scripts/             # Build scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Ensure all tests pass before PR
- Follow existing code style

## Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd functions
npm test

# E2E tests
npm run test:e2e
```

## Monitoring

### Key Metrics
- API response times
- OpenAI API usage and costs
- User engagement metrics
- Subscription conversion rates
- System error rates

### Logging
- Frontend errors: Sentry
- Backend logs: Google Cloud Logging
- Performance: Google Cloud Monitoring

## License

This project is proprietary and confidential.

## Support

For issues and questions:
- Check the [documentation](./docs/)
- Review [common issues](./docs/troubleshooting.md)
- Contact the development team

## Acknowledgments

- OpenAI for GPT-4o-mini
- Firebase team for excellent infrastructure
- The Bitcoin community for inspiration

---

Built with ❤️ for the Bitcoin ecosystem