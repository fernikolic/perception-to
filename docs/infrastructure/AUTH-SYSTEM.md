# Authentication System Architecture

This document describes the authentication system, user synchronization between Firebase Auth and Firestore, and the Stripe integration for handling subscriptions.

## Overview

The authentication system uses a **dual-storage pattern**:

| Storage | Purpose | Source of Truth |
|---------|---------|-----------------|
| Firebase Auth | Authentication credentials, login state | Yes (for auth) |
| Firestore `users/{userId}` | User profiles, permissions, app data | Yes (for app data) |
| Firestore `customers/{userId}` | Stripe customer ID mapping | Bridge to Stripe |
| Firestore `subscriptions/{userId}` | Subscription status, plan info | Synced from Stripe |

## Data Flow

```
User Sign-up
    │
    ├──► Firebase Auth (account created)
    │
    ├──► Firestore users/{uid} (profile created)
    │
    ├──► Stripe Customer (created if subscribing)
    │
    └──► Firestore customers/{uid} (Stripe ID stored)
```

## Firebase Auth Triggers

### `onAuthUserCreated` (functions/src/auth-user-sync.ts)

**Trigger:** Fires when a new Firebase Auth user is created (any method)

**Purpose:** Ensures every Firebase Auth user has a corresponding Firestore document

**What it does:**
1. Checks if Firestore `users/{uid}` document exists
2. If not, creates it with default fields:
   - `email`, `displayName`
   - `role: 'user'`, `permissions: ['read']`
   - `createdBy: 'auth-sync-trigger'`

### `onAuthUserDeleted` (functions/src/auth-user-sync.ts)

**Trigger:** Fires when a Firebase Auth user is deleted

**Purpose:** Marks the user as deleted in Firestore (soft delete for audit trail)

**What it does:**
1. Updates `users/{uid}` with `status: 'deleted'`
2. Logs to `admin_audit_log`

## Stripe Webhook Integration

### The Problem

Users can subscribe via multiple paths:
1. **In-app signup** → Firebase Auth → Firestore → Stripe (works fine)
2. **Stripe Checkout/Payment Links** → Stripe only (user missing in Firebase!)

When users subscribe directly through Stripe (path 2), the `checkout.session.completed` webhook should create the Firebase user. If this fails or isn't configured, we have **orphaned Stripe customers**.

### The Solution: Fallback Mechanism

The `findOrCreateUserFromStripeCustomer()` function in `functions/src/stripe.ts` provides a fallback:

```typescript
async function findOrCreateUserFromStripeCustomer(
  customerId: string,
  subscriptionId?: string
): Promise<{ userId, email, displayName, isNewUser } | null>
```

**Lookup order:**
1. Check `users` collection by `stripeCustomerId`
2. Check `customers` collection by `stripeId`
3. Fetch customer from Stripe API
4. Create Firebase Auth user + Firestore documents
5. Send welcome email with password reset link

**Used by these webhook handlers:**
- `handleSubscriptionCreated`
- `handleSubscriptionUpdated`
- `handleInvoicePaymentSucceeded`

### Webhook Events Handled

| Event | Handler | Creates User? |
|-------|---------|---------------|
| `customer.subscription.created` | `handleSubscriptionCreated` | Yes (fallback) |
| `customer.subscription.updated` | `handleSubscriptionUpdated` | Yes (fallback) |
| `customer.subscription.deleted` | `handleSubscriptionDeleted` | No |
| `customer.subscription.trial_will_end` | `handleTrialWillEnd` | No |
| `invoice.payment_succeeded` | `handleInvoicePaymentSucceeded` | Yes (fallback) |
| `invoice.payment_failed` | `handleInvoicePaymentFailed` | No |
| `checkout.session.completed` | `handleCheckoutSessionCompleted` | Yes |

## Admin Functions

### `auditAuthUsers` (Callable)

Lists orphaned users (in Firebase Auth but not Firestore).

```typescript
const result = await functions.httpsCallable('auditAuthUsers')();
// Returns: { totalAuthUsers, totalFirestoreUsers, orphanedUsers[] }
```

### `reconcileAuthUsers` (Callable)

Creates Firestore documents for all orphaned users.

```typescript
const result = await functions.httpsCallable('reconcileAuthUsers')();
// Returns: { created, failed, errors[] }
```

## Utility Scripts

### Investigate a User

Check if a user exists across all systems:

```bash
node scripts/investigate-user.cjs <email>
```

**Output:**
- Firebase Auth status
- Firestore `users` collection
- Firestore `customers` collection
- Firestore `subscriptions` collection
- Email sequences status

### Create User from Stripe Customer

Manually create a Firebase user from an existing Stripe customer:

```bash
node scripts/create-stripe-user.cjs <email> <stripeCustomerId> [stripeSubscriptionId]
```

**Example:**
```bash
node scripts/create-stripe-user.cjs user@example.com cus_ABC123 sub_XYZ789
```

**What it does:**
1. Creates Firebase Auth user (if not exists)
2. Generates password reset link
3. Creates Firestore `users/{uid}` document
4. Creates Firestore `customers/{uid}` document
5. Creates Firestore `subscriptions/{uid}` document
6. Logs to admin audit trail

### Reconcile All Users

Sync all Firebase Auth users with Firestore:

```bash
# Dry run - see what would be done
node scripts/reconcile-auth-users.cjs --dry-run

# Actually fix orphaned users
node scripts/reconcile-auth-users.cjs --verbose
```

## Firestore Collections Schema

### `users/{userId}`

```typescript
{
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  permissions: string[];  // ['read'] or ['*'] for admin
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  status?: 'active' | 'deleted';
  createdBy?: string;  // 'auth-sync-trigger', 'stripe-webhook-fallback', etc.
}
```

### `customers/{userId}`

```typescript
{
  stripeId: string;  // Stripe customer ID (cus_...)
  email: string;
  createdAt: string;
  updatedAt: string;
}
```

### `subscriptions/{userId}`

```typescript
{
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  stripeProductId: string;
  planId: 'free' | 'pro' | 'premium' | 'enterprise';
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'trial';
  currentPeriodEnd: string;
  trialEnd?: string;
  cancelAtPeriodEnd?: boolean;
  userId: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: string;
}
```

### `admin_audit_log`

```typescript
{
  action: string;
  targetUserId: string;
  userEmail: string;
  performedBy: string;
  timestamp: Timestamp;
  details: Record<string, any>;
}
```

## Troubleshooting

### User exists in Stripe but not in Firebase

**Symptoms:**
- User is paying but can't log in
- User doesn't appear in admin dashboard
- Webhook logs show "No user found for customer ID"

**Solution:**
```bash
# 1. Investigate the user
node scripts/investigate-user.cjs user@example.com

# 2. If not found, create manually
node scripts/create-stripe-user.cjs user@example.com cus_XXXXX sub_XXXXX

# 3. Send them the password reset link from the output
```

### User exists in Firebase Auth but not in Firestore

**Symptoms:**
- User can authenticate but sees errors in the app
- User doesn't appear in admin dashboard

**Solution:**
```bash
# Run reconciliation
node scripts/reconcile-auth-users.cjs
```

### Webhook not processing events

**Check logs:**
```bash
gcloud logging read 'resource.type="cloud_run_revision" AND resource.labels.service_name="stripewebhook"' \
  --project=perception-app-3db34 --limit=50
```

**Common issues:**
1. `STRIPE_SECRET_KEY` not available - check secrets configuration
2. `STRIPE_WEBHOOK_SECRET` mismatch - verify in Stripe Dashboard
3. Event type not configured - add event to webhook in Stripe Dashboard

## Security Considerations

1. **Admin role check:** Hardcoded email (`fernikolic@gmail.com`) OR `role: 'admin'` in Firestore
2. **Webhook verification:** All Stripe webhooks are verified using `STRIPE_WEBHOOK_SECRET`
3. **Audit logging:** All user creation/modification events are logged to `admin_audit_log`
4. **Soft deletes:** Users are marked as deleted, not actually removed (for audit trail)

## Deployment

### Deploy Auth Sync Functions

```bash
firebase deploy --only functions:onAuthUserCreated,functions:onAuthUserDeleted,functions:auditAuthUsers,functions:reconcileAuthUsers
```

### Deploy Stripe Webhook

```bash
firebase deploy --only functions:stripeWebhook
```

### Required Secrets

Set these in Firebase:
```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
firebase functions:secrets:set BREVO_API_KEY
```
