# Stripe Pricing Setup Guide

This guide will walk you through the steps needed to ensure your Stripe products and pricing plans are properly synchronized with your Firebase application.

## Overview

The pricing structure consists of:

1. **Free Plan** - Basic access to market overview
2. **Pro Plan** ($99/month) - For journalists, content creators, and independent researchers
   - Product ID: `prod_RuIjl6Gaf0NWfd`
3. **Premium Plan** ($199/month) - For analysts, market researchers, and strategic planners
   - Product ID: `prod_RuIjF0wTVVQzEP`
4. **Enterprise Plan** (Custom pricing) - For institutions, funds, and high-stakes decision-makers

## Step 1: Set Up Your Environment

Before starting, make sure you have:

- Firebase CLI installed and authenticated
- Stripe CLI installed (optional but helpful)
- Access to both your Firebase and Stripe dashboards

## Step 2: Configure Stripe Webhook

1. In your Stripe dashboard, go to **Developers > Webhooks**
2. Click **Add Endpoint**
3. Enter your webhook URL (after deploying your functions):
   ```
   https://us-central1-perception-app-3db34.cloudfunctions.net/stripeWebhook
   ```
4. For events to listen to, select:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `customer.subscription.trial_will_end`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

5. Copy the webhook secret and set it in Firebase:
   ```bash
   firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
   ```

## Step 3: Update Product Metadata

To ensure proper mapping between Stripe products and your application plans, set up metadata on your Stripe products:

1. Deploy the setup function:
   ```bash
   firebase deploy --only functions:setupStripeProducts
   ```

2. Set the admin API key in Firebase:
   ```bash
   firebase functions:secrets:set ADMIN_API_KEY
   ```

3. Call the function with your admin API key:
   ```bash
   curl -X POST "https://us-central1-perception-app-3db34.cloudfunctions.net/setupStripeProducts" \
     -H "x-api-key: YOUR_ADMIN_API_KEY" \
     -H "Content-Type: application/json"
   ```

This will automatically add the following metadata to your products:
- Pro Plan (`prod_RuIjl6Gaf0NWfd`) → `plan_id: 'pro'`
- Premium Plan (`prod_RuIjF0wTVVQzEP`) → `plan_id: 'premium'`

## Step 4: Set Up Stripe Pricing

1. In your Stripe dashboard, go to **Products**
2. For each product, make sure there's a corresponding price:

   **Pro Plan**:
   - Regular Price: $99/month
   - Beta Price: $49.50/month

   **Premium Plan**:
   - Regular Price: $199/month 
   - Beta Price: $99.50/month

3. For Beta pricing, you can create additional prices and use them conditionally in your checkout

## Step 5: Configure Trial Periods

1. In Stripe, edit each price to add a trial period:
   - Select "Add a trial period"
   - Set it to 7 days

2. Make sure your webhook is properly handling trial-related events

## Step 6: Verify Subscription Flow

Test the complete subscription flow:

1. Sign up as a new user → They should get automatic 7-day trial
2. Check the Firestore `subscriptions` collection → Should have status `trialing`
3. Upgrade to a paid plan → Should see proper plan_id and status in Firestore
4. Cancel subscription → Should properly revert to free plan

## Step 7: Monitoring and Management

For ongoing management:

1. Use the Stripe dashboard to monitor subscriptions, trials, and payments
2. Use Firebase Authentication and Firestore to track user status
3. For bulk operations (like applying trial to all users), use the provided admin functions:
   ```bash
   curl -X POST "https://us-central1-perception-app-3db34.cloudfunctions.net/applyFreeTrial" \
     -H "x-api-key: YOUR_ADMIN_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"userId": "user_id_here"}'
   ```

## Troubleshooting

If you encounter issues:

1. **Webhook Errors**: Check Cloud Functions logs for detailed error messages
2. **Missing Customer ID**: Make sure `users` collection documents have `stripeCustomerId` field
3. **Incorrect Plan Access**: Verify product metadata has correct `plan_id` values
4. **Billing Portal Issues**: Ensure your Stripe Customer Portal settings are configured correctly

## Collection Structure

Your Firestore collections should follow this structure:

1. **users**
   - Basic user profile information
   - Contains `stripeCustomerId` field referencing Stripe customer

2. **customers**
   - Created by Stripe Firebase Extension
   - Contains mapping between Firebase users and Stripe customers
   - Has `stripeId` field (same as `stripeCustomerId` in users collection)

3. **subscriptions**
   - Stores subscription status for each user
   - Used to determine feature access in the application
   - Fields include: `planId`, `status`, `currentPeriodEnd`, etc.

## Important Notes

- Always test webhook handling to ensure proper synchronization
- Keep your API keys and secrets secure
- Consider setting up monitoring for subscription events
- Make sure all environment variables are properly set in Firebase Functions 