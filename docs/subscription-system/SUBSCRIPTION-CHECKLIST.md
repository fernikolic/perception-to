# Subscription Access Control Checklist

This checklist helps ensure that your application's subscription system is properly implemented before deploying to production.

## Firebase Structure

- [x] User documents include `planId` field for subscription tier
- [x] User documents include `currentPeriodEnd` for subscription expiration
- [x] Beta users (`isBetaUser: true`) have proper expiration dates
- [ ] Subscription tiers are defined in the `subscriptions` collection

## Front-End Implementation

### Authentication & Access Control

- [ ] `useSubscription` hook is used in protected components
- [ ] `SubscriptionGuard` component prevents access to premium features
- [ ] Login flow sets user subscription data from Firestore
- [ ] Expired subscriptions redirect to upgrade page
- [ ] Beta users with expired subscriptions see upgrade prompt

### Routes & Navigation

- [ ] Free content is accessible to all users
- [ ] Basic tier content checks for valid `planId`
- [ ] Premium content checks for `planId === "pro"` (or equivalent)
- [ ] User profile shows subscription status
- [ ] Navigation menus adapt based on subscription level

### Subscription Management

- [ ] Checkout flow properly updates Firestore subscription data
- [ ] Users can upgrade/downgrade their subscription
- [ ] Clear messaging around tier benefits
- [ ] Subscription status visible in user dashboard
- [ ] Error handling for payment failures

## Testing

- [ ] Test with expired subscription
- [ ] Test with active subscription
- [ ] Test with free account
- [ ] Test with beta account
- [ ] Test checkout flow

## Pre-Deployment Scripts

These scripts help ensure your subscription system is properly configured:

### Fix Subscription Data

```bash
# Fix all subscription access issues (missing planId, expiry dates, beta users)
bash scripts/run-fix.sh
```

### Pre-Deployment Check

```bash
# Run pre-deployment checks to ensure subscription system is ready
bash scripts/pre-deploy.sh
```

## Post-Deployment

After deploying to production, verify:

1. Beta users see proper upgrade prompts
2. New users default to free tier
3. Subscription purchases update Firestore correctly
4. Access controls work on all protected routes
5. Error states are handled gracefully

## Monitoring

Set up monitoring for:

- Conversion rate from free to paid
- Upgrade rate for beta users
- Churn rate for paid subscriptions
- Most accessed premium features 