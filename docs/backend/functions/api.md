# API Function Documentation

**Function Name**: `api`
**Project**: perception-app-3db34
**Type**: HTTP Trigger (onRequest)
**Runtime**: Node.js 20
**Status**: ✅ Active

---

## Overview

The main API function serves as the central HTTP endpoint router for the Perception dashboard. It handles authentication, Stripe integration, user management, and data retrieval operations.

## Configuration

- **Memory**: 512MB
- **Timeout**: 60 seconds
- **Max Instances**: 100
- **Concurrency**: 1000
- **Runtime**: Node.js 20

## Environment Variables

```bash
STRIPE_SECRET_KEY=sk_test_*
OPENAI_API_KEY=sk-*
GCLOUD_PROJECT=perception-app-3db34
```

## Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "stripe": "^13.0.0",
  "@google-cloud/bigquery": "^7.6.0",
  "openai": "^4.1.0",
  "firebase-admin": "^11.0.0"
}
```

## Endpoints

### Authentication Endpoints

#### `GET /user`
- **Purpose**: Get current user profile and subscription status
- **Auth**: Required (Firebase ID token)
- **Response**: User data with subscription details

#### `POST /create-stripe-customer`
- **Purpose**: Create Stripe customer for new users
- **Auth**: Required
- **Body**: `{ email: string, name?: string }`
- **Response**: Stripe customer object

### Subscription Management

#### `POST /create-stripe-portal-session`
- **Purpose**: Create Stripe billing portal session
- **Auth**: Required
- **Body**: `{ return_url: string }`
- **Response**: `{ url: string }` - Portal session URL

#### `GET /stripe-customer`
- **Purpose**: Get Stripe customer details
- **Auth**: Required
- **Response**: Customer data with subscription status

### Notification Endpoints

#### `GET /notifications`
- **Purpose**: Get user notifications
- **Auth**: Required
- **Response**: Array of user notifications

#### `POST /notifications/:notificationId/dismiss`
- **Purpose**: Dismiss a notification
- **Auth**: Required
- **Response**: Success confirmation

### Admin Endpoints

#### `POST /admin/notifications`
- **Purpose**: Create admin notifications
- **Auth**: Admin required
- **Body**: Notification data
- **Response**: Created notification

#### `GET /admin/notifications`
- **Purpose**: Get all admin notifications
- **Auth**: Admin required
- **Response**: Array of notifications

### Chat & AI Endpoints

#### `POST /chat`
- **Purpose**: Process AI chat requests with BigQuery integration
- **Auth**: Required
- **Body**: `{ question: string }`
- **Response**: AI-generated response with data context

#### `POST /simple-chat`
- **Purpose**: Simple AI chat without data integration
- **Auth**: Required
- **Body**: `{ question: string }`
- **Response**: Basic AI response

#### `POST /generate-talking-points`
- **Purpose**: Generate AI talking points from data
- **Auth**: Required
- **Body**: Report data and context
- **Response**: Generated talking points

#### `POST /generate-report`
- **Purpose**: Generate data analysis reports
- **Auth**: Required
- **Body**: Report parameters
- **Response**: Generated report

#### `POST /generate-insights`
- **Purpose**: Generate market insights
- **Auth**: Required
- **Body**: Analysis parameters
- **Response**: Market insights

### Revenue Endpoints

#### `GET /stripe/revenue`
- **Purpose**: Get Stripe revenue analytics
- **Auth**: Required
- **Query Params**: Period filters
- **Response**: Revenue data and metrics

## Usage Analysis

### Frontend Integration

```typescript
// Main API configuration
const API_BASE_URL = 'https://us-central1-perception-app-3db34.cloudfunctions.net/api';

// Example usage
const response = await fetch(`${API_BASE_URL}/feed?page=1&limit=20`, {
  headers: {
    'Authorization': `Bearer ${idToken}`,
    'Content-Type': 'application/json'
  }
});
```

### Usage Patterns

1. **High Traffic Endpoints**:
   - `/feed` - ~500 requests/day
   - `/sentiment-metrics` - ~200 requests/day
   - `/user` - ~300 requests/day

2. **Authentication Flow**:
   - All endpoints require Firebase ID token
   - Automatic user creation on first API call
   - Stripe customer creation for new users

3. **Error Handling**:
   - 401 for authentication failures
   - 403 for subscription access issues
   - 500 for internal errors with detailed logging

## Implementation Details

### Route Handler Structure

```typescript
// Authentication middleware
app.use(authenticate);

// Route definitions
app.get('/feed', async (req, res) => {
  // Route to appropriate data source
  if (useDatabase) {
    // Query Firestore
  } else {
    // Call external API
  }
});
```

### Data Flow

1. **Request Authentication**:
   ```
   Client → Firebase ID Token → API Function → Admin SDK Verification
   ```

2. **Data Routing**:
   ```
   API Function → BigQuery/Firestore → External APIs → Response
   ```

3. **Error Handling**:
   ```
   Error → Structured Logging → Sentry → Client Response
   ```

## Security Implementation

### Authentication
- Firebase Admin SDK for token verification
- User context attached to all requests
- Automatic user document creation

### Authorization
- Subscription status checked for premium features
- Rate limiting via Firebase Functions quotas
- Input validation on all endpoints

### Data Protection
- Sensitive data filtered from responses
- Stripe customer data handled securely
- BigQuery access via service account

## Performance Considerations

### Optimization Strategies
1. **Caching**: Implement response caching for analytics endpoints
2. **Connection Pooling**: Reuse BigQuery and Firestore connections
3. **Async Processing**: Use background functions for heavy operations

### Current Bottlenecks
1. BigQuery queries can take 2-5 seconds
2. External API calls add latency
3. No caching layer implemented

## Error Handling

### Common Errors
- **401 Unauthorized**: Invalid or missing Firebase token
- **403 Forbidden**: Subscription required
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Error**: Service unavailable

### Logging Strategy
```typescript
console.error('API Error:', {
  endpoint: req.path,
  userId: req.user?.uid,
  error: error.message,
  timestamp: new Date().toISOString()
});
```

## Dependencies on Other Functions

### Direct Dependencies
- `createStripeCustomer` - For new user Stripe setup
- `createPortalSession` - For billing portal access

### Data Dependencies
- `hybridFeed` - For article feed data
- `bigquerySearch` - For search functionality
- `hybridAnalytics` - For analytics data

## Monitoring & Health

### Key Metrics
- Request latency (target: <2s)
- Error rate (target: <1%)
- Authentication success rate
- Subscription conversion tracking

### Health Checks
```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.FUNCTION_VERSION
  });
});
```

## Future Improvements

### Immediate (Next 30 days)
1. Add response caching for analytics endpoints
2. Implement request deduplication
3. Add comprehensive input validation

### Medium-term (3 months)
1. Split into microservices by domain
2. Add OpenAPI documentation
3. Implement WebSocket for real-time updates

### Long-term (6+ months)
1. GraphQL API layer
2. Advanced caching strategy
3. Multi-region deployment

---

## Related Documentation

- [Stripe Integration](./stripe.md)
- [Hybrid Feed System](./hybrid-feed.md)
- [Authentication Flow](../auth/README.md)
- [BigQuery Integration](../data/bigquery-search.md)

---

**Last Updated**: September 22, 2025
**Maintainer**: Development Team
**Status**: ✅ Production Ready