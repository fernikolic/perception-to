# Stripe Subscription Implementation Documentation

This document outlines the integration between Firebase, Stripe, and the application for managing user subscriptions.

## Architecture Overview

The subscription system integrates:

1. **Firebase Authentication** - For user accounts
2. **Firebase Firestore** - For storing user and subscription data
3. **Firebase Functions** - For secure server-side interactions with Stripe
4. **Stripe** - For payment processing and subscription management

## Key Components

### Database Structure

The system utilizes three main collections:

- **users** - Contains user profiles with stripeCustomerId
- **customers** - Managed by the Stripe extension, links Firebase users to Stripe customers
- **subscriptions** - Stores subscription details including plan, status, and expiration

### Backend Functions

1. **API Server** (`apiServer`)
   - Provides REST endpoints for subscription management
   - Handles checkout session creation
   - Authenticates users via Firebase Auth tokens

2. **Stripe Webhook Handler** (`stripeWebhook`)
   - Processes Stripe events (subscription created, updated, deleted)
   - Updates Firestore subscription records
   - Handles trial periods and subscription state changes

3. **Setup Stripe Products** (`setupStripeProducts`)
   - Administrative function for configuring Stripe products
   - Sets metadata on products to link them to application plans

### Frontend Hooks

1. **useStripePortal**
   - Redirects existing subscribers to the Stripe Customer Portal
   - Allows users to update payment methods, change plans, etc.

2. **useStripeCheckout**
   - Creates checkout sessions for new subscriptions
   - Handles redirection to the Stripe Checkout page

3. **useSubscription**
   - Provides subscription status and details to components

### Subscription Plans

| Plan ID   | Price     | Trial Period | Features                                              |
|-----------|-----------|--------------|-------------------------------------------------------|
| free      | $0        | N/A          | Basic access to market overview                       |
| pro       | $99/month | 7 days       | Real-time trend analysis, multi-channel monitoring    |
| premium   | $199/month| 7 days       | Custom views, deep analysis, Perception Index         |
| enterprise| Custom    | Custom       | Dedicated support, API access, custom reporting       |

## Implementation Details

### User Flow for New Subscriptions

1. User selects a plan on the Billing page
2. `useStripeCheckout` hook creates a checkout session
3. User is redirected to Stripe Checkout
4. User provides payment details
5. Stripe creates subscription with 7-day trial
6. Webhook updates Firebase subscription records
7. User is redirected back to the application

### User Flow for Existing Subscribers

1. User accesses Billing page
2. User clicks to change plan or update payment
3. `useStripePortal` hook redirects to Stripe Customer Portal
4. User makes changes in the Portal
5. Stripe sends webhook events
6. Webhook updates Firebase subscription records

### Free Trial Implementation

New subscriptions automatically receive a 7-day free trial. During this period:

1. Users have full access to the selected plan
2. No payment is processed until the trial ends
3. Users can cancel before the trial ends to avoid charges

### Stripe Products Configuration

Each subscription plan is linked to a Stripe product with metadata:
- `planId` - Matches the application's plan ID (e.g., "pro", "premium")
- `planTier` - Numeric value for plan hierarchy
- `description` - Human-readable description

## Deployment

The entire subscription system is deployed using Firebase:

```bash
# Deploy all subscription-related functions
firebase deploy --only functions:api,functions:apiServer,functions:stripeWebhook,functions:setupStripeProducts
```

## Troubleshooting

### Common Issues

1. **Missing Stripe Customer ID**
   - Check both `users` and `customers` collections
   - Ensure webhook is properly configured

2. **Webhook Events Not Processing**
   - Verify the webhook secret is properly set
   - Check Firebase logs for errors

3. **Subscriptions Not Updating**
   - Ensure the product metadata is correctly set
   - Check webhook logs for mapping errors

### Viewing Logs

```bash
# View logs for the webhook handler
firebase functions:log --only stripeWebhook

# View logs for the API server
firebase functions:log --only apiServer
```

## Configuration

### Required Environment Variables

- `STRIPE_SECRET_KEY` - Stripe API Secret Key
- `STRIPE_WEBHOOK_SECRET` - Signing secret for webhook verification
- `ADMIN_API_KEY` - Custom key for administrative functions 