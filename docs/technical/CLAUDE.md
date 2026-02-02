# Bitcoin Perception Dashboard - Technical Documentation

## Live Application
🌐 **Production**: [app.perception.to](https://app.perception.to)
🔧 **API**: [api.perception.to](https://api.perception.to)
📊 **Website**: [perception.to](https://perception.to)

## Project Overview
A comprehensive Bitcoin perception tracking dashboard that monitors market sentiment, media coverage, and social sentiment around Bitcoin across multiple sources and timeframes.

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom UI library
- **State Management**: Zustand + React Query
- **Routing**: React Router DOM
- **Charts**: Recharts, Nivo, D3
- **Authentication**: Firebase Auth

### Backend
- **Runtime**: Firebase Functions (Node.js 20) + Google Cloud Run
- **Database**: Firestore + BigQuery
- **Payment Processing**: Stripe
- **Email**: SendGrid + Brevo
- **AI Integration**: OpenAI API (GPT-4o-mini)
- **Search**: Hybrid search with Firestore + BigQuery

### Deployment
- **Frontend**: Firebase Hosting / Cloudflare Pages
- **Backend**: Firebase Functions + Google Cloud Run
- **Database**: Firestore + BigQuery
- **CDN**: Cloudflare
- **Scheduled Jobs**: Google Cloud Scheduler

## Key Features

### 1. Market Sentiment Analysis
- Real-time sentiment tracking across news outlets
- Comparative sentiment analysis
- Sentiment vs price correlation
- Historical sentiment trends

### 2. Media Coverage Tracking
- Multi-outlet coverage monitoring
- Volume and sentiment metrics
- Outlet-specific performance analysis
- Breaking news detection

### 3. Topic Analysis
- Trending topic identification
- Topic correlation analysis
- Narrative evolution tracking
- Topic-specific sentiment analysis

### 4. Price Integration
- Real-time Bitcoin price data
- Price vs sentiment correlation
- Market metrics integration
- Fear & Greed Index integration

### 5. Research Tools
- Saved searches and bookmarks
- Custom research briefs
- Data export capabilities
- Advanced filtering options
- Watchlist with keyword tracking

### 6. AI-Powered Trends Analysis
- Automated trend extraction every hour
- **Batched processing**: Analyzes ALL 2000 articles per run (5 batches of 400 each)
- Business-focused trend identification
- Article consolidation and deduplication (within-batch + cross-batch)
- Emerging vs established trend categorization
- Signal strength and confidence scoring
- Comprehensive source coverage (5-10+ sources per trend)

## Development Commands

```bash
# Frontend Development
npm run dev              # Start development server
npm run build           # Build for production
npm run lint            # Run ESLint
npm run preview         # Preview production build

# Backend Development
cd functions
npm run build           # Compile TypeScript
npm run serve           # Run local emulator
npm run deploy          # Deploy to Firebase

# Testing
npm run test-api        # Test API endpoints
npm run og-preview      # Preview social images
```

## Project Structure

```
perception/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── dashboard/           # Dashboard-specific components
│   │   ├── ui/                  # Reusable UI components
│   │   ├── auth/                # Authentication components
│   │   ├── subscription/        # Subscription management
│   │   └── trends/              # Trends visualization components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility libraries
│   │   ├── api/                 # API integration
│   │   ├── firebase/            # Firebase configuration
│   │   └── stores/              # State management
│   ├── pages/                   # Page components
│   └── types/                   # TypeScript type definitions
├── functions/                   # Firebase Functions
│   ├── src/                     # Function source code
│   │   ├── api.ts               # API endpoints
│   │   ├── stripe.ts            # Stripe integration
│   │   ├── process-emails.ts    # Email processing
│   │   └── utils/               # Utility functions
│   ├── btc-trends-ui-deployment/ # Cloud Run deployment
│   │   └── index.js             # Trends extraction service
│   └── lib/                     # Compiled functions
├── public/                      # Static assets
└── scripts/                     # Build and deployment scripts
```

## API Endpoints

### Authentication
- `/api/auth` - User authentication
- `/api/users` - User management

### Subscription Management
- `/api/stripe/create-checkout-session` - Create payment session
- `/api/stripe/create-portal-session` - Billing portal access
- `/api/stripe/webhook` - Stripe webhook handler

### Data APIs
- `/api/sentiment` - Sentiment data
- `/api/volume` - Volume metrics
- `/api/trends` - AI-extracted business trends (established & emerging)
- `/api/feed` - Article feed with hybrid search
- `/media-radar` - ⚡ **NEW** Blazingly fast optimized endpoint for Media Radar page
- `/api/market` - Market data
- `/extract` - Trigger trend extraction (scheduled hourly, batched processing of 2000 articles)

### Research APIs
- `/api/research/brief` - Generate research briefs
- `/api/research/export` - Export research data
- `/api/research/save` - Save research items

## Environment Variables

### Frontend (.env.development / .env.production)
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_STRIPE_PUBLIC_KEY=
VITE_SENTRY_DSN=
VITE_API_URL=https://api.perception.to
```

### Backend (functions/.env)
```
STRIPE_SECRET_KEY=
SENDGRID_API_KEY=
BREVO_API_KEY=
OPENAI_API_KEY=
OPENAI_API_KEY_V2=  # For trends extraction
COINGECKO_API_KEY=
GOOGLE_TRENDS_API_KEY=
GOOGLE_APPLICATION_CREDENTIALS=  # Service account key path
```

## Database Schema

### Users Collection
- `uid` - Firebase Auth UID
- `email` - User email
- `stripeCustomerId` - Stripe customer ID
- `subscription` - Subscription details
- `preferences` - User preferences
- `createdAt` - Account creation timestamp

### Subscriptions Collection
- `userId` - Reference to user
- `stripeSubscriptionId` - Stripe subscription ID
- `planId` - Current plan identifier
- `status` - Subscription status
- `currentPeriodEnd` - Billing period end
- `trialEnd` - Trial end date

### Research Collection
- `userId` - Reference to user
- `title` - Research item title
- `content` - Research content
- `tags` - Associated tags
- `bookmarked` - Bookmark status
- `createdAt` - Creation timestamp

### AI Trends Collection (BigQuery: btcp_main_dataset.ai_trends_tracking)
- `trend_id` - Unique trend identifier
- `title` - Specific trend title
- `summary` - 2-3 sentence business-focused summary
- `key_highlights` - Array of key data points
- `categories` - Business impact categories (max 2)
- `articles` - Source articles array
- `article_count` - Number of related articles
- `signal_strength` - 'strong', 'moderate', or 'emerging'
- `confidence_score` - 0.0 to 1.0 confidence rating
- `business_implications` - Business impact statement
- `first_seen` - **Immutable** timestamp when trend was first created (v3.4+)
- `generated_at` - Trend creation timestamp (immutable since v3.4)
- `last_updated` - Timestamp when articles were last added to trend
- `update_count` - Number of times trend has been updated with new articles
- `prompt_version` - AI prompt version used

## Deployment

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Firebase Hosting: `firebase deploy --only hosting`
3. Or deploy to Cloudflare Pages via Git integration
4. Custom domain configured at: `app.perception.to`

### Backend Deployment

#### Firebase Functions
1. Navigate to functions: `cd functions`
2. Build functions: `npm run build`
3. Deploy to Firebase: `firebase deploy --only functions`

#### Cloud Run Services (Trends)
1. Navigate to deployment folder: `cd functions/btc-trends-ui-deployment`
2. Deploy to Cloud Run:
```bash
GOOGLE_APPLICATION_CREDENTIALS=path/to/key.json gcloud run deploy btcpapifunction3-1-final \
  --source . \
  --region=us-central1 \
  --project=triple-upgrade-245423 \
  --memory=2GB \
  --timeout=300s \
  --allow-unauthenticated
```

### Scheduled Jobs
- **trends-hourly-update**: Runs every hour at :00
  - Endpoint: `https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract`
  - Fetches 2000 most recent articles from BigQuery
  - **Batched processing**: Analyzes in 5 batches of 400 articles each (~4.5 min total)
  - Cross-batch deduplication merges similar trends
  - Extracts business trends using OpenAI (gpt-4o-mini)
  - Stores in BigQuery for frontend display
  - **Result**: Comprehensive trend coverage with 5-10+ sources per trend

### Database Rules
Firestore security rules are defined in `firestore.rules`

## Security Considerations

### Authentication
- Firebase Auth for user management
- JWT tokens for API authentication
- Role-based access control

### Data Protection
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- CSP headers for XSS protection

### Payment Security
- Stripe for secure payment processing
- Webhook signature verification
- PCI compliance through Stripe

## Monitoring and Analytics

### Error Tracking
- Sentry integration for error monitoring
- Firebase Crashlytics for crash reporting
- Custom error logging

### Performance Monitoring
- React Query for data fetching optimization
- Code splitting for bundle optimization
- Image optimization and lazy loading

### User Analytics
- Custom analytics events
- Subscription conversion tracking
- Feature usage analytics

## Code Quality

### Linting and Formatting
- ESLint for code linting
- TypeScript for type safety
- Consistent code formatting

### Testing
- Unit tests for utility functions
- Integration tests for API endpoints
- E2E tests for critical user flows

### Code Organization
- Modular component architecture
- Custom hooks for reusable logic
- Centralized state management
- Type-safe API integration

## Common Tasks

### Adding New Features
1. Create components in appropriate directories
2. Add API endpoints if needed
3. Update types and interfaces
4. Add to navigation/routing
5. Test and deploy

### Managing Trends System
1. **View scheduler status**:
   ```bash
   gcloud scheduler jobs list --location=us-central1
   ```
2. **Resume/pause trend generation**:
   ```bash
   gcloud scheduler jobs resume trends-hourly-update --location=us-central1
   gcloud scheduler jobs pause trends-hourly-update --location=us-central1
   ```
3. **Check Cloud Run logs**:
   ```bash
   gcloud run services logs read btcpapifunction3-1-final --region=us-central1 --limit=20
   ```
4. **Manual trend extraction** (batched processing):
   ```bash
   curl -X POST https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract \
     -H "Content-Type: application/json" \
     -d '{"hours_back": 168}'
   # Note: Takes ~4.5 minutes to process 2000 articles in 5 batches
   # Returns comprehensive trends with many sources (5-10+)
   ```
5. **Test Media Radar endpoint**:
   ```bash
   curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/media-radar?outlet=CoinDesk&pageSize=5"
   ```

### Debugging Issues
1. Check browser console for errors
2. Review Firebase Function logs
3. Check Cloud Run service logs for trends
4. Verify API responses
5. Check Stripe dashboard for payment issues
6. Monitor BigQuery for data ingestion

#### Common Trends System Issues

**Categories showing only 4 items with low counts:**
- **Cause**: Frontend using short timeframe (24 hours) or wrong API URL
- **Fix**: Ensure `fetchCategories` in `trends.tsx` uses `hours: 8760` (1 year)
- **Verify**: Test API directly: `curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/intelligence/categories?hours=8760"`

**New trends not appearing:**
- **Cause**: API URLs pointing to inactive service instances
- **Check**: Verify all these URLs point to `45998414364` (not `293695725781`):
  - `API_BASE_URL_V3` in `/src/lib/api/trends.ts`
  - `TRENDS_API_URL` in `/src/lib/api/base.ts`
- **Test**: `curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?hours=24&limit=5"`

**Missing scheduler job:**
- **Check**: `gcloud scheduler jobs list --location=us-central1`
- **Create**: `gcloud scheduler jobs create http trends-hourly-update --location=us-central1 --schedule="0 * * * *" --uri="https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract"`

**OpenAI API errors in extraction:**
- **Check logs**: `gcloud run services logs read btcpapifunction3-1-final --region=us-central1 --limit=10`
- **Fix**: `gcloud run services update btcpapifunction3-1-final --region=us-central1 --update-env-vars="OPENAI_API_KEY_V2=your_key_here"`

**Trends showing only 2-3 sources (should be 5-10+):**
- **Cause**: Batching not working, service running old code (only processing 500 articles)
- **Check**: `curl -X POST "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/extract" -d '{}'` should show `"analysisArticleCount": 2000`
- **Fix**: Redeploy service: `cd /Users/fernandonikolic/perception/functions && bash deploy-ui-compatible-service.sh`
- **Verify**: Check logs for "Batching 2000 articles into 5 batch(es)" message

### Performance Optimization
1. Analyze bundle size
2. Optimize images and assets
3. Implement code splitting
4. Cache API responses appropriately
5. Monitor OpenAI API usage for cost optimization

## Support and Maintenance

### Regular Tasks
- Monitor subscription metrics
- Review error logs
- Update dependencies
- Performance monitoring

### Backup and Recovery
- Firestore automatic backups
- Code repository in Git
- Environment variable backups
- Stripe data export capabilities

## Contributing

### Development Workflow
1. Create feature branch
2. Implement changes
3. Run tests and linting
4. Create pull request
5. Deploy after review

### Code Standards
- Follow TypeScript best practices
- Use consistent naming conventions
- Write clear commit messages
- Document complex logic
- Maintain type safety

---

## Remotion Video Production

The `/remotion` folder contains a video production toolkit for marketing and promotional content.

### Quick Reference

```bash
# Preview videos in browser (localhost:3001)
npm run remotion:studio

# Render a video
npx remotion render remotion/src/index.ts <CompositionId> remotion/out/<filename>.mp4
```

### Structure

```
remotion/
├── src/
│   ├── Root.tsx              # Composition registry
│   ├── compositions/         # Video files
│   ├── components/           # Reusable components (devices, effects)
│   └── lib/                  # Colors, easing curves
├── public/
│   ├── recordings/           # Screen recordings for videos
│   └── *.woff2               # Brand fonts
└── out/                      # Rendered outputs
```

### Design Direction

**Style**: Apple-style editorial + bold energy
- Minimal whitespace, one focal point at a time
- Screen recordings of micro-interactions (not full-page screenshots)
- Tight crops with subtle Ken Burns effects
- Perception brand fonts: Ronzino (display), Newsreader (serif), Necto Mono (mono)

**Full documentation**: See `/remotion/README.md`

---

For more information, refer to the individual component documentation or contact the development team.