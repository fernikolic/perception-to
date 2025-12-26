# Stripe Customer Portal Integration Guide

This guide provides instructions for setting up the Stripe Customer Portal integration for the Perception app. The implementation includes multiple fallback mechanisms to ensure high availability of the subscription management functionality.

## Architecture Overview

Our Stripe portal integration uses a multi-layered approach:

1. **Primary Method**: Direct API calls to Firebase Functions and Stripe Extensions
2. **Fallback Method**: Cloudflare Worker proxy that can communicate with Stripe API directly
3. **Final Fallback**: In-app support options when all else fails

This architecture ensures that users can manage their subscriptions even if one or more components have issues.

## File Structure

```
├── app/routes/api/
│   ├── create-stripe-portal-session.js   # Main portal creation endpoint
│   ├── stripe-portal.js                  # Cloudflare proxy endpoint
│   ├── stripe-customer/index.js          # Customer creation endpoint
│   └── billing/
│       ├── create-customer.js            # Legacy customer creation endpoint
│       └── create-portal.js              # Legacy portal creation endpoint
├── src/
│   ├── hooks/
│   │   ├── useStripePortal.ts            # Client-side hook for portal access
│   │   └── use-subscription.ts           # Subscription management hook
│   └── components/dashboard/pages/settings/
│       └── billing.tsx                   # Billing UI component
└── functions/
    └── stripe-portal-proxy/
        └── index.js                      # Cloudflare Worker implementation
```

## Implementation Steps

### 1. Firebase Configuration

1. Ensure the Stripe Firebase Extension is properly installed:
   - Navigate to Firebase Console > Extensions
   - Install "Stripe Payments for Firebase" if not already installed
   - Configure with your Stripe API keys

2. Set up the Firebase Cloud Functions:
   - Deploy the `createStripeCustomer` function
   - Deploy the `createStripePortalLink` function

### 2. Cloudflare Worker Setup

1. Create a Cloudflare Workers account if you don't have one
2. Create a new Worker using the code from `functions/stripe-portal-proxy/index.js`
3. Configure environment variables:
   - `STRIPE_SECRET_KEY`: Your Stripe secret key

4. Update the Worker configuration:
   - In `functions/stripe-portal-proxy/index.js`, update `ALLOWED_ORIGIN` to match your app's domain
   - Deploy the Worker to your Cloudflare account

5. Configure the Worker route:
   - Set up a route like `stripe-portal-proxy.your-domain.workers.dev/*`

### 3. Application Configuration

1. Update API endpoints:
   - In `app/routes/api/stripe-portal.js`, update the Cloudflare Worker URL to your deployed worker URL

2. Test the integration:
   - Verify that customer creation works
   - Test portal access for existing customers
   - Validate fallback mechanisms by temporarily disabling primary methods

## Flow Diagrams

### Customer Creation Flow

```
┌──────────┐     ┌───────────────────┐     ┌─────────────────────┐
│  Client  │────▶│ /api/stripe-      │────▶│ Firebase Function   │
│          │     │ customer          │     │ createStripeCustomer │
└──────────┘     └───────────────────┘     └─────────────────────┘
                          │
                          │ (fallback)
                          ▼
                 ┌─────────────────────┐
                 │ Stripe Extension    │
                 │ createCustomer      │
                 └─────────────────────┘
```

### Portal Access Flow

```
┌──────────┐     ┌───────────────────┐     ┌─────────────────────┐
│  Client  │────▶│ /api/create-      │────▶│ Stripe Extension    │
│          │     │ stripe-portal-    │     │ createPortalLink    │
└──────────┘     │ session           │     └─────────────────────┘
                 └───────────────────┘             │
                          │                         │ (fallback)
                          │ (fallback)              ▼
                          ▼                ┌─────────────────────┐
                 ┌───────────────────┐    │ Firebase Function   │
                 │ /api/stripe-      │    │ createStripePortal  │
                 │ portal            │    │ Link                │
                 └───────────────────┘    └─────────────────────┘
                          │
                          │ (fallback)
                          ▼
                 ┌─────────────────────┐
                 │ Cloudflare Worker   │
                 │ Direct Stripe API   │
                 └─────────────────────┘
```

## Troubleshooting

Common issues and their solutions:

1. **CORS Errors**: Ensure that the Cloudflare Worker has the correct CORS configuration for your domain.

2. **Authentication Issues**: Verify that the Firebase JWT tokens are correctly passed to all services.

3. **Missing Customer ID**: If users don't have a Stripe customer ID, the system will try to create one automatically. Check the `handleMissingCustomer` function if this process fails.

4. **Stripe API Errors**: Verify your Stripe API keys and ensure the account is properly configured for Customer Portal access.

## Monitoring

For optimal reliability, monitor the following:

1. Success rates of portal session creation
2. Fallback mechanism usage
3. Customer creation success rates

Implement logging for all critical operations to help diagnose issues.

## Security Considerations

1. Never expose Stripe secret keys in client-side code
2. Validate authentication tokens on all API endpoints
3. Use HTTPS for all API calls
4. Restrict Cloudflare Worker access to your application domain only

## References

- [Stripe Customer Portal Documentation](https://stripe.com/docs/billing/subscriptions/customer-portal)
- [Firebase Stripe Extension](https://firebase.google.com/products/extensions/firestore-stripe-payments)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/) 