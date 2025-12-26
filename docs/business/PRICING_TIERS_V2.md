# Perception Pricing & Credit System v2

**Last Updated:** December 10, 2025
**Status:** Planning
**Version:** 2.0

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Tier Overview](#tier-overview)
3. [Feature Matrix](#feature-matrix)
4. [Volume Discounts](#volume-discounts)
5. [Credit System](#credit-system)
6. [Competitive Positioning](#competitive-positioning)
7. [Implementation Plan](#implementation-plan)
8. [Technical Architecture](#technical-architecture)
9. [Migration Strategy](#migration-strategy)

---

## Executive Summary

### The Three Tiers

| Tier | Price | Target User | Core Value |
|------|-------|-------------|------------|
| **Starter** | $49/seat/month | Content creators, researchers | Track + Reports |
| **Pro** | $99/seat/month | Agencies, PR professionals | Track + Reports + AI Briefs |
| **Premium** | $199/seat/month | Teams, power users | Unlimited everything |

### Key Principles

1. **Per-seat pricing** - Simple, scalable, enterprise-friendly
2. **Volume discounts** - 15% off at 5+ seats, 25% off at 10+ seats
3. **Credit system** - Flexibility without forced upgrades
4. **No artificial gates** - Everyone gets alerts, weekly reports, trends

---

## Tier Overview

### Starter ($49/seat/month)

**Target Audience:**
- Newsletter creators doing weekly wrap-ups
- Independent researchers
- Crypto content creators
- Freelance journalists
- Students/academics

**Value Proposition:**
> "Your weekly wrap-up, done in minutes. Track 5 topics, generate 5 reports/month. Perfect for content creators who need to stay on top of Bitcoin news without spending hours researching."

**What They Get:**
- 5 keywords/watchlist items
- 2 Spaces for organizing content
- 5 reports/month (all report types)
- Weekly email reports (AI-powered)
- Real-time alerts (spike/drop notifications)
- Full Trends dashboard access
- Email support

**What They Don't Get:**
- AI Briefs (on-demand deep dives)
- Slack support

**Why This Works:**
- Content creators need reports, not briefs
- 5 reports = 4 weekly + 1 buffer (perfect for weekly newsletters)
- $49 is accessible for individual creators
- Clear upgrade path when they need deeper analysis

**Margin Analysis:**
- 5 reports @ ~$0.75 each = $3.75/month AI cost
- Margin: ~92%

---

### Pro ($99/seat/month)

**Target Audience:**
- PR agencies
- Marketing professionals
- Business development teams
- Crypto funds (small teams)
- Consultants

**Value Proposition:**
> "Intelligence that wins pitches. Track 15 topics, generate reports and briefs on demand. Built for professionals who need to stay ahead of the narrative."

**What They Get:**
- 15 keywords/watchlist items
- 5 Spaces for organizing content
- 10 reports/month
- 10 AI briefs/month
- Weekly email reports (AI-powered)
- Real-time alerts
- Full Trends dashboard access
- Slack support

**What They Don't Get:**
- Unlimited reports/briefs

**Why This Works:**
- 15 keywords covers typical agency single-client needs
- 10 reports + 10 briefs = ~5 client deliverables/week
- Slack support differentiates from Starter
- Natural upgrade path for heavy users

**Margin Analysis:**
- 10 reports @ ~$0.75 = $7.50
- 10 briefs @ ~$0.17 = $1.70
- Total AI cost: ~$9.20/month
- Margin: ~91%

---

### Premium ($199/seat/month)

**Target Audience:**
- Large agencies (multi-client)
- Enterprise teams
- Power users with high volume needs
- Research firms
- Institutional investors

**Value Proposition:**
> "Unlimited intelligence for serious operators. No limits, no friction. Track everything, analyze anything, deliver to anyone."

**What They Get:**
- 30 keywords/watchlist items
- 10 Spaces for organizing content
- Unlimited reports
- Unlimited AI briefs
- Weekly email reports (AI-powered)
- Real-time alerts
- Full Trends dashboard access
- Slack support (priority)

**Why This Works:**
- "Unlimited" removes all friction for power users
- 30 keywords handles multi-client agencies
- 10 Spaces = serious workflow organization
- Premium users are least price-sensitive

**Margin Analysis:**
- Assuming heavy usage: 30 reports + 50 briefs/month
- 30 reports @ ~$0.75 = $22.50
- 50 briefs @ ~$0.17 = $8.50
- Total AI cost: ~$31/month
- Margin: ~84% (still healthy)

---

## Feature Matrix

| Feature | Starter ($49) | Pro ($99) | Premium ($199) |
|---------|---------------|-----------|----------------|
| **Keywords/Watchlist** | 5 | 15 | 30 |
| **Spaces** | 2 | 5 | 10 |
| **Reports/month** | 5 | 10 | Unlimited |
| **AI Briefs/month** | 0 | 10 | Unlimited |
| **Weekly Email Reports** | Yes | Yes | Yes |
| **Real-time Alerts** | Yes | Yes | Yes |
| **Trends Dashboard** | Yes | Yes | Yes |
| **Support** | Email | Slack | Slack (Priority) |

### What Everyone Gets (Not Gated)

- Weekly email reports with AI analysis
- Real-time spike/drop alerts
- Full Trends dashboard access
- Unlimited search across all sources
- All report templates (when within limits)

### What's Tiered

- Number of keywords to track
- Number of Spaces to organize
- Monthly report generation limit
- AI brief generation (Pro+ only)
- Support channel (Email vs Slack)

---

## Volume Discounts

For organizations purchasing multiple seats:

| Seats | Discount | Starter | Pro | Premium |
|-------|----------|---------|-----|---------|
| 1-4 | 0% | $49/seat | $99/seat | $199/seat |
| 5-9 | 15% | $41.65/seat | $84.15/seat | $169.15/seat |
| 10+ | 25% | $36.75/seat | $74.25/seat | $149.25/seat |

### Example Pricing

**5-seat Pro team (15% off):**
- Monthly: $84.15 x 5 = $420.75/month
- Annual: $420.75 x 12 = $5,049/year
- Savings: $445/year vs full price

**10-seat Premium team (25% off):**
- Monthly: $149.25 x 10 = $1,492.50/month
- Annual: $1,492.50 x 12 = $17,910/year
- Savings: $5,970/year vs full price

### Enterprise (Custom)

For organizations needing 20+ seats or custom requirements:

| Feature | Enterprise |
|---------|------------|
| Seats | 20+ |
| Keywords | 50+ per seat |
| Spaces | Unlimited |
| Reports/Briefs | Unlimited |
| API Access | Yes |
| SSO/SAML | Yes |
| Dedicated Account Manager | Yes |
| Custom Integrations | Yes |
| SLA | Yes |
| Pricing | Contact sales |

---

## Credit System

### Overview

Credits provide flexibility for users who occasionally exceed their plan limits without requiring a full tier upgrade.

### Credit Packs

| Pack | Price | Credits | Per-Credit | Savings |
|------|-------|---------|------------|---------|
| Small | $19 | 10 | $1.90 | - |
| Medium | $39 | 25 | $1.56 | 18% |
| Large | $79 | 60 | $1.32 | 31% |

### Credit Costs

| Action | Credits | Actual Cost | Your Margin |
|--------|---------|-------------|-------------|
| Generate 1 Report | 2 | ~$0.75 | 60%+ |
| Generate 1 AI Brief | 1 | ~$0.17 | 85%+ |
| Add 1 Keyword (monthly) | 3 | $0 | 100% |
| Add 1 Space | 2 | $0 | 100% |

### User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER HITS LIMIT                          │
│              "You've used 5/5 reports this month"           │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      OPTIONS MODAL                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │   You've reached your monthly report limit           │   │
│  │                                                      │   │
│  │   ┌──────────────────┐  ┌──────────────────────┐   │   │
│  │   │  Buy Credits     │  │  Upgrade to Pro      │   │   │
│  │   │                  │  │                      │   │   │
│  │   │  10 credits $19  │  │  $99/month           │   │   │
│  │   │  25 credits $39  │  │  10 reports/month    │   │   │
│  │   │  60 credits $79  │  │  + 10 AI briefs      │   │   │
│  │   │                  │  │  + Slack support     │   │   │
│  │   │  [Buy Credits]   │  │  [Upgrade Now]       │   │   │
│  │   └──────────────────┘  └──────────────────────┘   │   │
│  │                                                      │   │
│  │   Your balance: 0 credits                            │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Credit Rules

1. **Credits never expire** - Purchased credits remain in account indefinitely
2. **Credits don't roll over from subscription** - Plan limits reset monthly
3. **Credits used after plan limits** - Plan allocation used first
4. **Credits visible in UI** - Always show balance in header/settings
5. **Low balance alerts** - Notify when credits drop below 5

### When Credits Make Sense

| Scenario | Better Option |
|----------|---------------|
| Occasional extra report (1-2/month) | Credits |
| Consistently need 8+ reports on Starter | Upgrade to Pro |
| One-time large project | Credits |
| Agency with variable client load | Credits + Pro |
| Heavy consistent usage | Upgrade tier |

---

## Competitive Positioning

### vs Enterprise Tools

| Tool | Price | Perception Advantage |
|------|-------|---------------------|
| Meltwater | $15,000-45,000/year | 10-50x cheaper, AI reports included |
| Cision | $10,000-30,000/year | 10-30x cheaper, faster setup |
| Brandwatch | $800-3,000/month | 4-15x cheaper, Bitcoin-specific |

### vs Mid-Market Tools

| Tool | Price | Perception Advantage |
|------|-------|---------------------|
| Prowly | $258-416/month | 2-4x cheaper, AI reports included |
| Brand24 | $79-399/month | Comparable price, AI reports included |
| Messari | Custom (enterprise) | Self-serve, transparent pricing |

### vs SMB Tools

| Tool | Price | Perception Advantage |
|------|-------|---------------------|
| Syften | ~$20/month | More features, AI-powered |
| Brand24 Individual | $79/month | Cheaper ($49), includes reports |

### Key Differentiators

1. **AI-powered reports** - Not just monitoring, actual deliverables
2. **Bitcoin-specific** - Deep coverage of crypto/Bitcoin ecosystem
3. **Transparent pricing** - No sales calls required
4. **Credit flexibility** - No forced upgrades

---

## Implementation Plan

### Phase 1: Backend Foundation (Week 1-2)

#### 1.1 Database Schema Updates

**Firestore Collections:**

```typescript
// subscriptions/{userId}
interface Subscription {
  planId: 'starter' | 'pro' | 'premium';
  status: 'active' | 'trialing' | 'canceled' | 'past_due';
  seats: number;
  currentPeriodStart: Timestamp;
  currentPeriodEnd: Timestamp;
  stripeSubscriptionId: string;
  stripeCustomerId: string;

  // Usage tracking
  usage: {
    reportsThisMonth: number;
    briefsThisMonth: number;
    lastResetDate: Timestamp;
  };

  // Volume discount
  volumeDiscount: number; // 0, 0.15, or 0.25
}

// users/{userId}
interface User {
  // ... existing fields

  // Credit system
  credits: number;
  creditHistory: CreditTransaction[];
}

interface CreditTransaction {
  id: string;
  type: 'purchase' | 'spend' | 'refund' | 'bonus';
  amount: number; // positive for additions, negative for spending
  action?: 'report' | 'brief' | 'keyword' | 'space';
  packId?: 'small' | 'medium' | 'large';
  stripePaymentId?: string;
  createdAt: Timestamp;
  note?: string;
}

// New collection for credit packs
// credit_packs/{packId}
interface CreditPack {
  id: 'small' | 'medium' | 'large';
  name: string;
  credits: number;
  price: number; // in cents
  stripePriceId: string;
  active: boolean;
}
```

#### 1.2 Feature Limits Configuration

**File:** `functions/src/config/feature-limits.ts`

```typescript
export interface TierLimits {
  keywords: number;
  spaces: number;
  reportsPerMonth: number;
  briefsPerMonth: number;
  slackSupport: boolean;
  prioritySupport: boolean;
}

export const TIER_LIMITS: Record<string, TierLimits> = {
  starter: {
    keywords: 5,
    spaces: 2,
    reportsPerMonth: 5,
    briefsPerMonth: 0,
    slackSupport: false,
    prioritySupport: false,
  },
  pro: {
    keywords: 15,
    spaces: 5,
    reportsPerMonth: 10,
    briefsPerMonth: 10,
    slackSupport: true,
    prioritySupport: false,
  },
  premium: {
    keywords: 30,
    spaces: 10,
    reportsPerMonth: Number.MAX_SAFE_INTEGER,
    briefsPerMonth: Number.MAX_SAFE_INTEGER,
    slackSupport: true,
    prioritySupport: true,
  },
};

export const CREDIT_COSTS = {
  report: 2,
  brief: 1,
  keyword: 3, // per month
  space: 2,
};

export const CREDIT_PACKS = {
  small: { credits: 10, price: 1900 }, // $19
  medium: { credits: 25, price: 3900 }, // $39
  large: { credits: 60, price: 7900 }, // $79
};

export const VOLUME_DISCOUNTS = {
  5: 0.15,  // 15% off for 5-9 seats
  10: 0.25, // 25% off for 10+ seats
};
```

#### 1.3 Usage Tracking Functions

**File:** `functions/src/usage/track-usage.ts`

```typescript
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const db = getFirestore();

export async function incrementUsage(
  userId: string,
  type: 'report' | 'brief'
): Promise<{ allowed: boolean; remaining: number; usedCredits: boolean }> {
  const userDoc = await db.doc(`users/${userId}`).get();
  const subDoc = await db.doc(`subscriptions/${userId}`).get();

  const user = userDoc.data();
  const subscription = subDoc.data();

  const limits = TIER_LIMITS[subscription.planId];
  const usage = subscription.usage || { reportsThisMonth: 0, briefsThisMonth: 0 };

  const limitKey = type === 'report' ? 'reportsPerMonth' : 'briefsPerMonth';
  const usageKey = type === 'report' ? 'reportsThisMonth' : 'briefsThisMonth';

  const limit = limits[limitKey];
  const current = usage[usageKey];

  // Check if within plan limits
  if (current < limit) {
    await db.doc(`subscriptions/${userId}`).update({
      [`usage.${usageKey}`]: FieldValue.increment(1),
    });
    return {
      allowed: true,
      remaining: limit - current - 1,
      usedCredits: false
    };
  }

  // Check if user has credits
  const creditCost = CREDIT_COSTS[type];
  const userCredits = user.credits || 0;

  if (userCredits >= creditCost) {
    // Deduct credits
    await db.doc(`users/${userId}`).update({
      credits: FieldValue.increment(-creditCost),
      creditHistory: FieldValue.arrayUnion({
        id: crypto.randomUUID(),
        type: 'spend',
        amount: -creditCost,
        action: type,
        createdAt: new Date(),
      }),
    });
    return {
      allowed: true,
      remaining: userCredits - creditCost,
      usedCredits: true
    };
  }

  // No credits, not allowed
  return {
    allowed: false,
    remaining: 0,
    usedCredits: false
  };
}

export async function checkCanPerformAction(
  userId: string,
  type: 'report' | 'brief' | 'keyword' | 'space'
): Promise<{
  allowed: boolean;
  reason?: string;
  upgradeRequired?: boolean;
  creditsNeeded?: number;
}> {
  const userDoc = await db.doc(`users/${userId}`).get();
  const subDoc = await db.doc(`subscriptions/${userId}`).get();

  const user = userDoc.data();
  const subscription = subDoc.data();
  const limits = TIER_LIMITS[subscription.planId];
  const usage = subscription.usage;

  // For keywords and spaces, check current count
  if (type === 'keyword') {
    const watchlistCount = user.clients?.length || 0;
    if (watchlistCount >= limits.keywords) {
      const credits = user.credits || 0;
      if (credits >= CREDIT_COSTS.keyword) {
        return { allowed: true, creditsNeeded: CREDIT_COSTS.keyword };
      }
      return {
        allowed: false,
        reason: `You've reached your ${limits.keywords} keyword limit`,
        upgradeRequired: true,
        creditsNeeded: CREDIT_COSTS.keyword,
      };
    }
    return { allowed: true };
  }

  if (type === 'space') {
    const spacesCount = user.spacesCount || 0;
    if (spacesCount >= limits.spaces) {
      const credits = user.credits || 0;
      if (credits >= CREDIT_COSTS.space) {
        return { allowed: true, creditsNeeded: CREDIT_COSTS.space };
      }
      return {
        allowed: false,
        reason: `You've reached your ${limits.spaces} space limit`,
        upgradeRequired: true,
        creditsNeeded: CREDIT_COSTS.space,
      };
    }
    return { allowed: true };
  }

  // For reports and briefs, check monthly usage
  const limitKey = type === 'report' ? 'reportsPerMonth' : 'briefsPerMonth';
  const usageKey = type === 'report' ? 'reportsThisMonth' : 'briefsThisMonth';

  const limit = limits[limitKey];
  const current = usage?.[usageKey] || 0;

  if (current < limit) {
    return { allowed: true };
  }

  // Check credits
  const credits = user.credits || 0;
  const creditCost = CREDIT_COSTS[type];

  if (credits >= creditCost) {
    return { allowed: true, creditsNeeded: creditCost };
  }

  return {
    allowed: false,
    reason: `You've used all ${limit} ${type}s this month`,
    upgradeRequired: true,
    creditsNeeded: creditCost,
  };
}
```

#### 1.4 Monthly Usage Reset

**File:** `functions/src/scheduled/reset-monthly-usage.ts`

```typescript
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

// Run at midnight on the 1st of each month
export const resetMonthlyUsage = onSchedule({
  schedule: '0 0 1 * *',
  timeZone: 'UTC',
}, async () => {
  const subscriptions = await db.collection('subscriptions')
    .where('status', '==', 'active')
    .get();

  const batch = db.batch();

  subscriptions.docs.forEach(doc => {
    batch.update(doc.ref, {
      'usage.reportsThisMonth': 0,
      'usage.briefsThisMonth': 0,
      'usage.lastResetDate': new Date(),
    });
  });

  await batch.commit();
  console.log(`Reset usage for ${subscriptions.size} subscriptions`);
});
```

### Phase 2: Stripe Integration (Week 2-3)

#### 2.1 Create Stripe Products

```bash
# Subscription Products
stripe products create --name="Perception Starter" --description="5 keywords, 2 spaces, 5 reports/month"
stripe products create --name="Perception Pro" --description="15 keywords, 5 spaces, 10 reports + 10 briefs/month"
stripe products create --name="Perception Premium" --description="30 keywords, 10 spaces, unlimited reports + briefs"

# Subscription Prices (monthly)
stripe prices create --product="prod_starter_id" --unit-amount=4900 --currency=usd --recurring[interval]=month
stripe prices create --product="prod_pro_id" --unit-amount=9900 --currency=usd --recurring[interval]=month
stripe prices create --product="prod_premium_id" --unit-amount=19900 --currency=usd --recurring[interval]=month

# Credit Pack Products (one-time)
stripe products create --name="Credit Pack - Small" --description="10 credits"
stripe products create --name="Credit Pack - Medium" --description="25 credits"
stripe products create --name="Credit Pack - Large" --description="60 credits"

# Credit Pack Prices
stripe prices create --product="prod_credits_small_id" --unit-amount=1900 --currency=usd
stripe prices create --product="prod_credits_medium_id" --unit-amount=3900 --currency=usd
stripe prices create --product="prod_credits_large_id" --unit-amount=7900 --currency=usd
```

#### 2.2 Credit Purchase Endpoint

**File:** `functions/src/payments/purchase-credits.ts`

```typescript
import { onRequest } from 'firebase-functions/v2/https';
import Stripe from 'stripe';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const db = getFirestore();

export const createCreditCheckoutSession = onRequest({
  cors: true,
}, async (req, res) => {
  const { userId, packId } = req.body;

  const pack = CREDIT_PACKS[packId as keyof typeof CREDIT_PACKS];
  if (!pack) {
    res.status(400).json({ error: 'Invalid pack' });
    return;
  }

  // Get user's Stripe customer ID
  const userDoc = await db.doc(`users/${userId}`).get();
  const user = userDoc.data();

  const session = await stripe.checkout.sessions.create({
    customer: user?.stripeCustomerId,
    mode: 'payment',
    line_items: [{
      price: pack.stripePriceId,
      quantity: 1,
    }],
    metadata: {
      userId,
      packId,
      credits: pack.credits.toString(),
    },
    success_url: `${process.env.APP_URL}/settings/billing?credit_purchase=success`,
    cancel_url: `${process.env.APP_URL}/settings/billing?credit_purchase=canceled`,
  });

  res.json({ sessionId: session.id, url: session.url });
});

// Webhook handler for successful credit purchase
export const handleCreditPurchase = async (session: Stripe.Checkout.Session) => {
  const { userId, packId, credits } = session.metadata!;

  await db.doc(`users/${userId}`).update({
    credits: FieldValue.increment(parseInt(credits)),
    creditHistory: FieldValue.arrayUnion({
      id: crypto.randomUUID(),
      type: 'purchase',
      amount: parseInt(credits),
      packId,
      stripePaymentId: session.payment_intent,
      createdAt: new Date(),
    }),
  });

  console.log(`Added ${credits} credits to user ${userId}`);
};
```

#### 2.3 Volume Discount Handling

**File:** `functions/src/payments/subscription-helpers.ts`

```typescript
export function calculateVolumeDiscount(seats: number): number {
  if (seats >= 10) return 0.25;
  if (seats >= 5) return 0.15;
  return 0;
}

export function calculateSubscriptionPrice(
  planId: string,
  seats: number
): { unitPrice: number; totalPrice: number; discount: number } {
  const basePrices = {
    starter: 4900,
    pro: 9900,
    premium: 19900,
  };

  const basePrice = basePrices[planId as keyof typeof basePrices];
  const discount = calculateVolumeDiscount(seats);
  const discountedPrice = Math.round(basePrice * (1 - discount));

  return {
    unitPrice: discountedPrice,
    totalPrice: discountedPrice * seats,
    discount,
  };
}
```

### Phase 3: Frontend Implementation (Week 3-4)

#### 3.1 Usage Context Provider

**File:** `src/contexts/usage-context.tsx`

```typescript
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './auth-context';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface UsageState {
  planId: string;
  limits: TierLimits;
  usage: {
    reportsThisMonth: number;
    briefsThisMonth: number;
  };
  credits: number;
  loading: boolean;
}

const UsageContext = createContext<UsageState | null>(null);

export function UsageProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<UsageState>({
    planId: 'starter',
    limits: TIER_LIMITS.starter,
    usage: { reportsThisMonth: 0, briefsThisMonth: 0 },
    credits: 0,
    loading: true,
  });

  useEffect(() => {
    if (!user?.uid) return;

    const unsubUser = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      const data = doc.data();
      setState(prev => ({
        ...prev,
        credits: data?.credits || 0,
      }));
    });

    const unsubSub = onSnapshot(doc(db, 'subscriptions', user.uid), (doc) => {
      const data = doc.data();
      setState(prev => ({
        ...prev,
        planId: data?.planId || 'starter',
        limits: TIER_LIMITS[data?.planId || 'starter'],
        usage: data?.usage || { reportsThisMonth: 0, briefsThisMonth: 0 },
        loading: false,
      }));
    });

    return () => {
      unsubUser();
      unsubSub();
    };
  }, [user?.uid]);

  return (
    <UsageContext.Provider value={state}>
      {children}
    </UsageContext.Provider>
  );
}

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (!context) throw new Error('useUsage must be used within UsageProvider');
  return context;
};
```

#### 3.2 Upgrade/Credit Modal Component

**File:** `src/components/upgrade-modal.tsx`

```typescript
import { useState } from 'react';
import { useUsage } from '@/contexts/usage-context';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  limitType: 'report' | 'brief' | 'keyword' | 'space';
}

export function UpgradeModal({ open, onClose, limitType }: UpgradeModalProps) {
  const { planId, limits, credits } = useUsage();
  const [purchasing, setPurchasing] = useState(false);

  const creditCost = CREDIT_COSTS[limitType];
  const canUseCredits = credits >= creditCost;

  const handleBuyCredits = async (packId: string) => {
    setPurchasing(true);
    try {
      const response = await fetch('/api/create-credit-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId }),
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Failed to create checkout session:', error);
    } finally {
      setPurchasing(false);
    }
  };

  const limitMessages = {
    report: `You've used all ${limits.reportsPerMonth} reports this month`,
    brief: `You've used all ${limits.briefsPerMonth} briefs this month`,
    keyword: `You've reached your ${limits.keywords} keyword limit`,
    space: `You've reached your ${limits.spaces} space limit`,
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Limit Reached</DialogTitle>
        </DialogHeader>

        <p className="text-muted-foreground mb-6">
          {limitMessages[limitType]}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Credit Options */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Buy Credits</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This action costs {creditCost} credit{creditCost > 1 ? 's' : ''}
            </p>

            {canUseCredits ? (
              <Button
                onClick={() => onClose()}
                className="w-full"
              >
                Use {creditCost} Credits ({credits} available)
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => handleBuyCredits('small')}
                  disabled={purchasing}
                >
                  <span>10 credits</span>
                  <span>$19</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => handleBuyCredits('medium')}
                  disabled={purchasing}
                >
                  <span>25 credits</span>
                  <span>$39</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => handleBuyCredits('large')}
                  disabled={purchasing}
                >
                  <span>60 credits</span>
                  <span>$79</span>
                </Button>
              </div>
            )}

            <p className="text-xs text-muted-foreground mt-2">
              Your balance: {credits} credits
            </p>
          </div>

          {/* Upgrade Options */}
          <div className="border rounded-lg p-4 bg-primary/5">
            <h3 className="font-semibold mb-2">Upgrade Plan</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get more {limitType}s every month
            </p>

            {planId === 'starter' && (
              <Button className="w-full" asChild>
                <a href="/settings/billing?upgrade=pro">
                  Upgrade to Pro - $99/mo
                </a>
              </Button>
            )}

            {planId === 'pro' && (
              <Button className="w-full" asChild>
                <a href="/settings/billing?upgrade=premium">
                  Upgrade to Premium - $199/mo
                </a>
              </Button>
            )}

            {planId === 'premium' && (
              <p className="text-sm">
                You're on our highest tier. Contact support for enterprise options.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

#### 3.3 Usage Display Component

**File:** `src/components/usage-display.tsx`

```typescript
import { useUsage } from '@/contexts/usage-context';
import { Progress } from '@/components/ui/progress';
import { Coins } from 'lucide-react';

export function UsageDisplay() {
  const { planId, limits, usage, credits } = useUsage();

  const reportPercent = (usage.reportsThisMonth / limits.reportsPerMonth) * 100;
  const briefPercent = limits.briefsPerMonth > 0
    ? (usage.briefsThisMonth / limits.briefsPerMonth) * 100
    : 0;

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium capitalize">{planId} Plan</span>
        <div className="flex items-center gap-1 text-sm">
          <Coins className="h-4 w-4" />
          <span>{credits} credits</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Reports</span>
          <span>{usage.reportsThisMonth}/{limits.reportsPerMonth === Number.MAX_SAFE_INTEGER ? '∞' : limits.reportsPerMonth}</span>
        </div>
        <Progress value={Math.min(reportPercent, 100)} />
      </div>

      {limits.briefsPerMonth > 0 && (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>AI Briefs</span>
            <span>{usage.briefsThisMonth}/{limits.briefsPerMonth === Number.MAX_SAFE_INTEGER ? '∞' : limits.briefsPerMonth}</span>
          </div>
          <Progress value={Math.min(briefPercent, 100)} />
        </div>
      )}
    </div>
  );
}
```

### Phase 4: Pricing Page Update (Week 4)

#### 4.1 New Pricing Page Component

**File:** `src/components/pricing-page.tsx`

```typescript
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const tiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    description: 'Perfect for content creators and researchers',
    features: [
      { name: '5 keywords/watchlist items', included: true },
      { name: '2 Spaces', included: true },
      { name: '5 reports/month', included: true },
      { name: 'AI Briefs', included: false },
      { name: 'Weekly email reports', included: true },
      { name: 'Real-time alerts', included: true },
      { name: 'Trends dashboard', included: true },
      { name: 'Email support', included: true },
      { name: 'Slack support', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    description: 'For agencies and PR professionals',
    popular: true,
    features: [
      { name: '15 keywords/watchlist items', included: true },
      { name: '5 Spaces', included: true },
      { name: '10 reports/month', included: true },
      { name: '10 AI Briefs/month', included: true },
      { name: 'Weekly email reports', included: true },
      { name: 'Real-time alerts', included: true },
      { name: 'Trends dashboard', included: true },
      { name: 'Email support', included: true },
      { name: 'Slack support', included: true },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    description: 'Unlimited everything for power users',
    features: [
      { name: '30 keywords/watchlist items', included: true },
      { name: '10 Spaces', included: true },
      { name: 'Unlimited reports', included: true },
      { name: 'Unlimited AI Briefs', included: true },
      { name: 'Weekly email reports', included: true },
      { name: 'Real-time alerts', included: true },
      { name: 'Trends dashboard', included: true },
      { name: 'Email support', included: true },
      { name: 'Slack support (priority)', included: true },
    ],
  },
];

export function PricingPage() {
  const [seats, setSeats] = useState(1);

  const discount = seats >= 10 ? 0.25 : seats >= 5 ? 0.15 : 0;

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-muted-foreground">
          Per-seat pricing. Volume discounts at 5+ seats.
        </p>
      </div>

      {/* Seat selector */}
      <div className="max-w-md mx-auto mb-12">
        <label className="block text-sm font-medium mb-2">
          Number of seats: {seats}
          {discount > 0 && (
            <span className="ml-2 text-green-600">
              ({discount * 100}% volume discount!)
            </span>
          )}
        </label>
        <Slider
          value={[seats]}
          onValueChange={([v]) => setSeats(v)}
          min={1}
          max={20}
          step={1}
        />
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => {
          const discountedPrice = Math.round(tier.price * (1 - discount));
          const totalPrice = discountedPrice * seats;

          return (
            <div
              key={tier.id}
              className={`border rounded-xl p-6 ${
                tier.popular ? 'border-primary ring-2 ring-primary' : ''
              }`}
            >
              {tier.popular && (
                <div className="text-center text-sm font-medium text-primary mb-4">
                  Most Popular
                </div>
              )}

              <h2 className="text-2xl font-bold">{tier.name}</h2>
              <p className="text-muted-foreground mt-1">{tier.description}</p>

              <div className="mt-4">
                <span className="text-4xl font-bold">${discountedPrice}</span>
                <span className="text-muted-foreground">/seat/month</span>
                {discount > 0 && (
                  <span className="ml-2 text-sm line-through text-muted-foreground">
                    ${tier.price}
                  </span>
                )}
              </div>

              {seats > 1 && (
                <p className="text-sm text-muted-foreground mt-1">
                  ${totalPrice}/month for {seats} seats
                </p>
              )}

              <Button className="w-full mt-6" variant={tier.popular ? 'default' : 'outline'}>
                Start 7-day trial
              </Button>

              <ul className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-2">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={!feature.included ? 'text-muted-foreground' : ''}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Credit packs section */}
      <div className="mt-16 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Need more flexibility?</h2>
        <p className="text-muted-foreground mb-8">
          Buy credit packs to use when you exceed your plan limits.
          No subscription upgrade required.
        </p>

        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="text-lg font-bold">10 credits</div>
            <div className="text-2xl font-bold mt-1">$19</div>
            <div className="text-sm text-muted-foreground">$1.90/credit</div>
          </div>
          <div className="border rounded-lg p-4 border-primary">
            <div className="text-lg font-bold">25 credits</div>
            <div className="text-2xl font-bold mt-1">$39</div>
            <div className="text-sm text-muted-foreground">$1.56/credit</div>
            <div className="text-xs text-green-600">Save 18%</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-lg font-bold">60 credits</div>
            <div className="text-2xl font-bold mt-1">$79</div>
            <div className="text-sm text-muted-foreground">$1.32/credit</div>
            <div className="text-xs text-green-600">Save 31%</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          1 credit = 1 AI Brief | 2 credits = 1 Report | 3 credits = 1 extra keyword/month
        </p>
      </div>
    </div>
  );
}
```

### Phase 5: Testing & Migration (Week 5)

#### 5.1 Testing Checklist

- [ ] Subscription creation for all three tiers
- [ ] Usage tracking increments correctly
- [ ] Monthly reset triggers on schedule
- [ ] Credit purchase flow (Stripe checkout)
- [ ] Credit deduction when over limit
- [ ] Upgrade modal displays correctly
- [ ] Volume discounts calculate correctly
- [ ] Webhook handles credit purchase
- [ ] Limit checks work for all action types

#### 5.2 Migration Steps for Existing Users

1. **Map current plans to new tiers:**
   - Current "Pro" ($49) → New "Starter" ($49)
   - Current "Premium" ($99) → New "Pro" ($99)

2. **Grandfather existing users:**
   - Users on current $49 Pro keep their limits until they change plans
   - Consider giving existing users bonus credits as goodwill

3. **Communication:**
   - Email existing users about new tier structure
   - Highlight credit system as new flexibility option
   - Offer upgrade incentives for early adopters

---

## Technical Architecture

### System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           FRONTEND                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │
│  │  Pricing Page   │  │  Upgrade Modal  │  │   Usage Display     │ │
│  └────────┬────────┘  └────────┬────────┘  └──────────┬──────────┘ │
│           │                    │                       │            │
│           └──────────┬─────────┴───────────────────────┘            │
│                      │                                              │
│              ┌───────▼───────┐                                      │
│              │ Usage Context │ ◄─── Firestore Realtime Listener    │
│              └───────────────┘                                      │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                │ API Calls
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     FIREBASE FUNCTIONS                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │
│  │ Usage Tracking  │  │ Credit Purchase │  │  Monthly Reset      │ │
│  │   Functions     │  │   Functions     │  │   Scheduled Job     │ │
│  └────────┬────────┘  └────────┬────────┘  └──────────┬──────────┘ │
│           │                    │                       │            │
│           └──────────┬─────────┴───────────────────────┘            │
│                      │                                              │
└──────────────────────┼──────────────────────────────────────────────┘
                       │
           ┌───────────┴───────────┐
           │                       │
           ▼                       ▼
┌─────────────────────┐ ┌─────────────────────┐
│     FIRESTORE       │ │       STRIPE        │
│  ┌───────────────┐  │ │  ┌───────────────┐  │
│  │ subscriptions │  │ │  │   Products    │  │
│  │    users      │  │ │  │    Prices     │  │
│  │ credit_packs  │  │ │  │   Checkout    │  │
│  └───────────────┘  │ │  │   Webhooks    │  │
│                     │ │  └───────────────┘  │
└─────────────────────┘ └─────────────────────┘
```

---

## Migration Strategy

### For Existing Users

| Current Plan | Current Price | New Plan | Action |
|--------------|---------------|----------|--------|
| Pro | $49/mo | Starter | Grandfather at current limits, or upgrade to new Pro |
| Premium | $99/mo | Pro | Keep same price, same limits |

### Recommended Approach

1. **Soft launch** new pricing for new users only
2. **Communicate** changes to existing users with 30-day notice
3. **Offer** existing users choice to stay grandfathered or switch
4. **Incentivize** upgrades with bonus credits

---

## Decisions & Clarifications

### Resolved Questions

1. **Trial Period**: **7 days** for all tiers. No credit card required.

2. **Annual Pricing**: **Pay for 10 months, get 12** (2 months free = 17% off)
   - Starter Annual: $490/year ($40.83/mo effective)
   - Pro Annual: $990/year ($82.50/mo effective)
   - Premium Annual: $1,990/year ($165.83/mo effective)

3. **Beta Pricing Grandfathering**:
   - Current $49 Pro users → Upgraded to new $99 Pro (keep paying $49)
   - Current $99 Premium users → Upgraded to new $199 Premium (keep paying $99)
   - They keep their discounted rate for life as long as subscription stays active

4. **Keyword/Watchlist Definition**:
   - Users can search for anything unlimited times
   - A "watchlist item" = a saved keyword that gets tracked
   - **Multi-keyword items count as multiple**: If a watchlist item has "Bitcoin, BTC, cryptocurrency" (3 comma-separated keywords), it counts as **3** toward the limit
   - This prevents abuse of combining many keywords into one item

5. **Space Sharing**: **Deferred** - Not implementing now. Future roadmap item for team features.

6. **Report Templates**: **All templates available to all paying users**. No template gating. Users can copy/export however they want.

7. **Downgrade Behavior**:
   - Self-serve via Stripe portal
   - Excess keywords/spaces become read-only (can view but not add new)
   - User must delete excess items to add new ones
   - No automatic deletion of user content

8. **Credit Expiry**: **Credits never expire**, but:
   - Email notification when balance drops below 5 credits
   - In-app notification badge showing low balance
   - No expiry - purchased credits are permanent

9. **Proration**: Handled by Stripe automatically for upgrades/downgrades

10. **Team Billing**: **Deferred** - Single-seat billing only for now. Multi-seat/team billing is future roadmap.

### Refinements Made

1. **Removed "View Only" from Trends** - Everyone gets full Trends access
2. **Removed PDF Export gating** - Not currently a feature, don't gate phantom features
3. **Added Slack support to Pro** - Better value prop, low cost to you
4. **Kept AI Weekly Reports for all** - Retention tool, don't gate it
5. **Credits for keywords are monthly** - Clarified this costs 3 credits/month to maintain

### Edge Cases to Handle

1. **User has credits but also has plan allowance** - Use plan first, then credits
2. **User runs out of credits mid-report** - Don't start generation without sufficient credits
3. **Monthly reset timing** - Reset based on subscription start date or calendar month?
4. **Failed credit purchase** - Handle Stripe webhook failures gracefully
5. **Refund requests** - Can users get credit refunds? Under what conditions?

---

## Summary

This document outlines a three-tier pricing structure with a credit system that:

1. **Serves content creators** (Starter @ $49)
2. **Serves agencies/professionals** (Pro @ $99)
3. **Serves power users/teams** (Premium @ $199)
4. **Provides flexibility** via credit packs
5. **Scales with volume discounts** for larger teams
6. **Maintains healthy margins** (84-92% across tiers)
7. **Is competitive** vs Prowly, Brand24, Meltwater, etc.

Implementation is estimated at 5 weeks with the phases outlined above.

---

## Implementation Prompt

Use this prompt when ready to implement:

```
I want to implement a new three-tier pricing system with a credit system for Perception.

Read the full specification at /docs/business/PRICING_TIERS_V2.md

Here's a summary of what needs to be built:

## PRICING TIERS

| Tier | Monthly | Annual | Keywords | Spaces | Reports/mo | Briefs/mo | Support |
|------|---------|--------|----------|--------|------------|-----------|---------|
| Starter | $49 | $490/yr | 5 | 2 | 5 | 0 | Email |
| Pro | $99 | $990/yr | 15 | 5 | 10 | 10 | Slack |
| Premium | $199 | $1,990/yr | 30 | 10 | Unlimited | Unlimited | Slack |

Annual = pay for 10 months, get 12 (17% off)

Everyone gets: Weekly email reports, real-time alerts, trends dashboard, unlimited search, all report templates.

## CREDIT SYSTEM

Credit Packs (one-time purchase, never expire):
- Small: $19 for 10 credits ($1.90/credit)
- Medium: $39 for 25 credits ($1.56/credit)
- Large: $79 for 60 credits ($1.32/credit)

Credit Costs:
- 1 Report = 2 credits
- 1 AI Brief = 1 credit
- 1 Extra Keyword (monthly) = 3 credits
- 1 Extra Space = 2 credits

Rules:
- Plan allowance is used first, credits only when over limit
- Credits NEVER expire
- Show credit balance in UI header/settings
- Show upgrade modal when user hits limit (option to buy credits OR upgrade)
- Email + in-app notification when credits drop below 5

## KEYWORD COUNTING LOGIC

IMPORTANT: Multi-keyword watchlist items count as multiple keywords.
- "Bitcoin" = 1 keyword
- "Bitcoin, BTC" = 2 keywords
- "Bitcoin, BTC, cryptocurrency" = 3 keywords
- Count comma-separated values in each watchlist item
- This prevents abuse of combining many keywords into one item

## DOWNGRADE BEHAVIOR

When user downgrades and exceeds new tier limits:
- Excess keywords/spaces become READ-ONLY (can view, can't add new)
- User must delete excess items before adding new ones
- NO automatic deletion of user content
- Stripe handles proration automatically

## GRANDFATHERING EXISTING USERS

- Current $49 Pro → New $99 Pro features, but keeps paying $49/mo for life
- Current $99 Premium → New $199 Premium features, but keeps paying $99/mo for life
- Rate locked as long as subscription stays active (no cancellation/pause)

## DEFERRED FEATURES (NOT IN SCOPE)

- Multi-seat team billing (future)
- Space sharing between team members (future)
- Volume discounts (future - when team billing is ready)

## IMPLEMENTATION PHASES

### Phase 1: Backend Foundation
1. Update Firestore schema:
   - subscriptions/{userId}: add usage.reportsThisMonth, usage.briefsThisMonth, usage.lastResetDate
   - users/{userId}: add credits (number), creditHistory (array)

2. Create functions/src/config/feature-limits.ts:
   - TIER_LIMITS object with starter/pro/premium limits
   - CREDIT_COSTS object
   - CREDIT_PACKS object

3. Create usage tracking functions:
   - countKeywordsInWatchlist(watchlistItems) - counts comma-separated keywords
   - checkCanPerformAction(userId, type) - returns {allowed, reason, creditsNeeded}
   - incrementUsage(userId, type) - updates usage or deducts credits
   - deductCredits(userId, amount, action) - logs to creditHistory

4. Create scheduled function resetMonthlyUsage - runs 1st of each month

### Phase 2: Stripe Integration
1. Create Stripe products:
   - 3 subscription products (Starter, Pro, Premium)
   - 6 prices (monthly + annual for each)
   - 3 credit pack products (one-time)

2. Update webhook handler:
   - Handle subscription.created/updated (set planId, reset usage)
   - Handle checkout.session.completed for credit purchases

3. Create endpoint: createCreditCheckoutSession

### Phase 3: Frontend
1. Create UsageContext provider:
   - Listen to subscriptions + users docs via Firestore
   - Expose: planId, limits, usage, credits, loading

2. Create UpgradeModal component:
   - Shows when user hits any limit
   - Two columns: Buy Credits | Upgrade Plan
   - If user has credits, show "Use X credits" button

3. Create UsageDisplay component:
   - For settings/billing page
   - Shows plan name, usage bars, credit balance

4. Add limit checks before:
   - Report generation (space-detail.tsx, report-generator.ts)
   - Brief generation (quick-brief-modal.tsx)
   - Adding watchlist item (watchlist-section.tsx) - use keyword counting
   - Creating space (use-spaces.ts)

5. Credit balance in header:
   - Small badge/icon showing credit count
   - Warning state when < 5 credits

### Phase 4: Pricing Page
1. Update pricing page with 3 tiers
2. Add monthly/annual toggle
3. Add credit packs section below tiers
4. Show annual savings prominently

### Phase 5: Testing & Migration
1. Test all flows:
   - New user signup for each tier
   - Usage tracking increments
   - Hitting limits shows modal
   - Credit purchase flow
   - Credit deduction
   - Monthly reset
   - Downgrade read-only behavior

2. Migrate existing users:
   - Query all users with planId='pro' at $49 → mark as grandfathered
   - Query all users with planId='premium' at $99 → mark as grandfathered
   - Add grandfathered: true flag to subscription doc

3. Deploy & monitor

## IMPORTANT RULES

- Do NOT gate weekly email reports - everyone gets them
- Do NOT gate trends dashboard - everyone gets full access
- Do NOT gate real-time alerts - everyone gets them
- Do NOT gate report templates - all templates available to all paying users
- AI Briefs (on-demand) are the main Starter vs Pro differentiator
- Unlimited is the main Pro vs Premium differentiator

## FILES TO MODIFY/CREATE

Backend (functions/):
- src/config/feature-limits.ts (new)
- src/usage/track-usage.ts (new)
- src/usage/check-limits.ts (new)
- src/usage/count-keywords.ts (new)
- src/scheduled/reset-monthly-usage.ts (new)
- src/payments/purchase-credits.ts (new)
- src/payments/stripe-webhook.ts (modify - add credit purchase handler)
- src/index.ts (export new functions)

Frontend (src/):
- contexts/usage-context.tsx (new)
- components/upgrade-modal.tsx (new)
- components/usage-display.tsx (new)
- components/credit-balance-badge.tsx (new)
- components/pricing-page.tsx (modify or new)
- hooks/use-spaces.ts (add limit check before create)
- lib/services/report-generator.ts (add limit check)
- components/quick-brief-modal.tsx (add limit check)
- components/research/watchlist-section.tsx (add limit check + keyword counting)
- components/layout/header.tsx or similar (add credit badge)

Start with Phase 1 (backend foundation). Show me the implementation plan and let me confirm before you start coding.
```
