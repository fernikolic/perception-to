# Manual Subscription Testing

## Test 1: Content Access Based on Subscription Level

1. **Free User Test**
   - Log in with a free account
   - Verify only free content is accessible
   - Attempt to access premium features and confirm restrictions
   - Look for upgrade prompts

2. **Beta User Test**
   - Log in with a beta user account
   - Verify access to appropriate features
   - If the beta period is expired, verify you see an upgrade prompt

3. **Paid User Test**
   - Log in with a paid account (if available)
   - Verify all paid features are accessible

## Test 2: Expiration Handling

1. **Simulate Expiration**
   - In Firebase Console, change a user's `currentPeriodEnd` to yesterday
   - Log in with that account
   - Verify you see appropriate upgrade prompts
   - Verify restricted access to premium features

## Test 3: Payment Flow

1. **Test Upgrade Process**
   - Start with a free account
   - Click the upgrade button
   - Complete payment flow (use Stripe test card: 4242 4242 4242 4242)
   - Verify Firestore data is updated with new subscription details
   - Verify access to premium content after upgrade

## Test 4: New User Flow

1. **Create New Account**
   - Sign up with a new email
   - Verify the user starts with a free plan
   - Verify the correct access restrictions are in place

## Test 5: Edge Cases

1. **Test with No Plan ID**
   - If possible, create or modify a user to have no plan ID
   - Test how your app handles this case
   - Verify the user doesn't get stuck or see errors

2. **Test with Invalid Expiry Date**
   - If possible, modify a user to have an invalid expiry date format
   - Test how your app handles this case

## Tests Results

| Test | Result | Notes |
|------|--------|-------|
| Free User Access | | |
| Beta User Access | | |
| Paid User Access | | |
| Expiration Handling | | |
| Payment Flow | | |
| New User Flow | | |
| No Plan ID Edge Case | | |
| Invalid Expiry Edge Case | | | 