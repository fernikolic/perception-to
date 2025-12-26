# Stripe Integration with Firebase Functions

This document provides instructions for deploying the Stripe integration to Firebase Functions for production use.

## Overview

The Stripe integration consists of two main components:

1. **Firebase Cloud Functions**: Handles the server-side API endpoints
   - `/api/stripe-customer` - Creates a Stripe customer
   - `/api/create-stripe-portal-session` - Creates a Stripe portal session

2. **Frontend API Utilities**: Provides a consistent interface for accessing the API endpoints in both development and production environments

## Deployment Steps

### 1. Set up Stripe Secret Key

The Stripe API key needs to be securely stored in Firebase Functions configuration:

```bash
firebase functions:config:set stripe.secret_key="sk_live_your_key_here"
```

To verify the configuration:

```bash
firebase functions:config:get
```

### 2. Deploy the Firebase Functions

Navigate to the functions directory and deploy the API function:

```bash
cd functions
npm run build
firebase deploy --only functions:api
```

This will deploy the API function with the following endpoints:
- `https://us-central1-perception-app-3db34.cloudfunctions.net/api/stripe-customer`
- `https://us-central1-perception-app-3db34.cloudfunctions.net/api/create-stripe-portal-session`

### 3. Or Use the Deployment Script

We've provided a deployment script that handles setting the Stripe key and deploying the function:

```bash
cd functions
chmod +x deploy-stripe-api.sh
./deploy-stripe-api.sh
```

## Testing the Deployment

You can test the deployed function with curl:

```bash
# Test the health check endpoint
curl https://us-central1-perception-app-3db34.cloudfunctions.net/api/

# Test customer creation
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","userId":"test123","name":"Test User"}' \
  https://us-central1-perception-app-3db34.cloudfunctions.net/api/stripe-customer

# Test portal session creation
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"customerId":"cus_example","returnUrl":"https://example.com/return"}' \
  https://us-central1-perception-app-3db34.cloudfunctions.net/api/create-stripe-portal-session
```

## Frontend Integration

The frontend is already configured to use the correct API endpoints based on the environment:

- In development: Uses the Vite proxy to `/api/*` which forwards to `http://localhost:5001`
- In production: Uses the Firebase Functions URL directly

This is handled by the `src/lib/stripe-api.ts` utility which dynamically selects the appropriate base URL.

## Local Development

For local development:

1. Start the Vite dev server:
   ```bash
   npm run dev
   ```

2. Start the API server:
   ```bash
   ./run-test-api.sh
   ```

The Vite dev server will proxy API requests to the local API server running on port 5001.

## Troubleshooting

### Function Deployment Issues

If you encounter errors during deployment:

1. Check the Firebase Functions logs:
   ```bash
   firebase functions:log
   ```

2. Verify the Stripe secret key is properly set:
   ```bash
   firebase functions:config:get
   ```

### API Access Issues

If the frontend can't access the API:

1. Check CORS settings in the function
2. Verify the API URL is correct in the frontend
3. Check browser console for errors
4. Verify authentication if required

## Maintenance

To update the Stripe secret key:

```bash
firebase functions:config:set stripe.secret_key="sk_live_new_key_here"
firebase deploy --only functions:api
```

## Security Considerations

- The Stripe secret key is securely stored in Firebase Functions config
- All sensitive operations happen on the server
- API endpoints are protected by Firebase authentication (if implemented)
- CORS is properly configured to allow only your domain 