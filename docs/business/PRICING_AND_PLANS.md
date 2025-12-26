# Perception Pricing & Plans

**Last Updated:** October 21, 2025
**Status:** Beta Pricing Active (50% off)

---

## Overview

Perception offers two tiers designed for different use cases in Bitcoin intelligence. All plans include:
- 24/7 watchlist monitoring with smart alerts
- Weekly persona-specific intelligence reports
- Unlimited search across 100+ sources
- Trends dashboard with Bitcoin price correlation
- 7-day free trial (no credit card required)

---

## Current Pricing (Beta)

### 🎯 Pro Plan
**$49/month** ~~$99/month~~
*50% off beta pricing - locked in for life*

**Perfect for:**
- Independent researchers
- Individual investors
- Analysts tracking key companies/topics

**What's Included:**
- ✅ 3 watchlist items (companies/topics you track)
- ✅ Weekly persona-specific intelligence reports
- ✅ Smart spike/drop alerts (automatic for your watchlist)
- ✅ Trends dashboard with Bitcoin price correlation
- ✅ 10 AI briefs per month (on-demand deep dives)
- ✅ Unlimited search across all Bitcoin news/data
- ✅ Email support
- ❌ Enhanced reporter intelligence
- ❌ Custom views/filters
- ❌ Export reports (PDF/CSV)

**Technical Limits:**
```javascript
{
  watchlistItems: 3,
  briefsPerMonth: 10,
  customDashboards: false,
  exportBriefings: false,
  prioritySupport: false,
  enhancedReporterAnalysis: false
}
```

---

### ⭐ Premium Plan (Recommended)
**$99/month** ~~$199/month~~
*50% off beta pricing - locked in for life*

**Perfect for:**
- Marketing/PR professionals
- Business development teams
- Executive leadership
- Serious operators who need unlimited intelligence

**What's Included:**
- ✅ Everything in Pro, PLUS:
- ✅ 10 watchlist items (track more companies/topics)
- ✅ Enhanced reporter intelligence (for Marketing/PR personas)
- ✅ Unlimited AI briefs (ask anything, anytime)
- ✅ Export all reports (PDF/CSV for presentations)
- ✅ Custom views (filter by outlet, region, sentiment)
- ✅ Priority support (email + Slack)

**Technical Limits:**
```javascript
{
  watchlistItems: 10,
  briefsPerMonth: Number.MAX_SAFE_INTEGER, // Unlimited
  customDashboards: true,
  exportBriefings: true,
  prioritySupport: true,
  enhancedReporterAnalysis: true
}
```

---

## Trial System

### How Trials Work

1. **Selection**: Users choose Pro or Premium on sign-up
2. **Duration**: 7-day free trial (no credit card required upfront)
3. **Features**: Users get full access to their selected tier during trial
4. **Storage**:
   - `planId`: 'pro' or 'premium' (their selection)
   - `status`: 'trialing'
   - `trialEnd`: ISO date string (7 days from start)

### Trial Technical Implementation

**Firestore Structure:**
```javascript
// Collection: subscriptions/{userId}
{
  planId: 'pro' | 'premium',    // Actual plan they selected
  status: 'trialing',            // Status during trial
  trialStart: '2025-10-21T...',
  trialEnd: '2025-10-28T...',
  currentPeriodEnd: '2025-10-28T...',
  cancelAtPeriodEnd: false,
  createdAt: '2025-10-21T...',
  updatedAt: '2025-10-21T...'
}

// Collection: users/{userId}
{
  email: 'user@example.com',
  selectedPlan: 'pro' | 'premium',  // What they chose
  trialUsed: true,                   // Prevents multiple trials
  trialStart: '2025-10-21T...',
  planId: 'pro' | 'premium'          // Synced with subscription
}
```

### Trial Conversion Flow

**Day 0-7 Email Sequence:**
- Day 0: Welcome - "Your intelligence companion is ready"
- Day 1: Value demo - "Your companion found something interesting"
- Day 2: Differentiation - "Why traditional tools can't do this"
- Day 3: Social proof - "This alert would have saved me $50K"
- Day 4: Objection handling - "I already have Google Alerts"
- Day 5: Scarcity - "2 days left - Lock in beta pricing"
- Day 6: Loss aversion - "Tomorrow your companion stops watching"
- Day 7: Final push - "Your companion goes offline in hours"

All emails emphasize:
- **Beta pricing lock-in** (50% off forever)
- **Smart companion** positioning (not another dashboard)
- **Price will double** after beta ends

---

## Marketing Copy

### Value Propositions

**Pro Plan Headline:**
> Your VP of Intelligence, without the VP salary

**Premium Plan Headline:**
> The full intelligence suite for serious operators

**Overall Product Positioning:**
> Your smart companion for Bitcoin intelligence
>
> Not another dashboard. An AI co-pilot that watches your watchlist, sends you alerts when things move, and delivers VP-level analysis tailored to your role.

### Feature Comparisons

| Feature | Pro | Premium |
|---------|-----|---------|
| Watchlist Items | 3 companies/topics | 10 companies/topics |
| Smart Alerts | ✅ Automatic | ✅ Automatic |
| Weekly Reports | ✅ Persona-based | ✅ Persona-based |
| AI Briefs | 10/month | Unlimited |
| Search | Unlimited | Unlimited |
| Trends Dashboard | ✅ | ✅ |
| Reporter Intelligence | Basic | ✅ Enhanced |
| Custom Views | ❌ | ✅ |
| Export Reports | ❌ | ✅ PDF/CSV |
| Support | Email | Email + Slack |
| Price (Beta) | $49/mo | $99/mo |
| Regular Price | $99/mo | $199/mo |

### Benefit Statements

**For Pro:**
- Monitor 3 key companies or topics 24/7
- Get alerted before it hits Twitter
- Weekly intelligence briefs tailored to your role
- 10 AI-powered deep dives per month
- Perfect for independent operators

**For Premium:**
- Track 10 companies/topics simultaneously
- Unlimited on-demand intelligence
- Enhanced reporter analysis for PR professionals
- Export everything for presentations
- Built for teams and serious operators

---

## Beta Pricing Strategy

### Key Messages

1. **Lock-in Forever:**
   - "Lock in beta pricing for life"
   - "Once we're out of beta, this price doubles"
   - "Your rate stays the same forever"

2. **Scarcity:**
   - "First 100 users get 50% off for life"
   - "Beta pricing ends soon"
   - "This is your last chance at $49/$99"

3. **No Risk:**
   - "7-day free trial"
   - "No credit card required"
   - "Cancel anytime"

### When Beta Ends

After beta phase:
- Pro: $49/mo → $99/mo
- Premium: $99/mo → $199/mo
- Beta users keep their original price forever
- New signups pay full price

---

## Persona-Specific Features

### All Personas Get:
- Weekly intelligence reports tailored to their role
- Smart alerts for watchlist items
- Trends dashboard
- Unlimited search

### Premium-Only Persona Features:

**Marketing/PR Personas:**
- Enhanced reporter intelligence
- Reporter sentiment analysis
- Pitch angle recommendations
- "Who to pitch vs who to avoid"
- Media Radar integration with full features

**Other Personas (BD, VC, Executive, Corp Dev):**
- Same core Premium features
- Media Radar page hidden (not relevant)
- Focus on deal flow, investment opportunities, competitive intelligence

---

## Technical Integration Notes

### Feature Limits (functions/src/config/feature-limits.ts)

```typescript
export const TIER_LIMITS: Record<string, TierLimits> = {
  pro: {
    watchlistItems: 3,
    savedSearches: 5,              // Legacy
    alerts: 3,                     // DEPRECATED - now automatic
    briefsPerMonth: 10,
    customDashboards: false,
    exportBriefings: false,
    prioritySupport: false,
    strategyCall: false,
    enhancedReporterAnalysis: false,
  },
  premium: {
    watchlistItems: 10,
    savedSearches: 20,             // Legacy
    alerts: 10,                    // DEPRECATED - now automatic
    briefsPerMonth: Number.MAX_SAFE_INTEGER,
    customDashboards: true,
    exportBriefings: true,
    prioritySupport: true,
    strategyCall: true,
    enhancedReporterAnalysis: true,
  }
}
```

### Trial Creation Endpoint

**POST** `https://apiv2-uycbgxxglq-uc.a.run.app/trial-signup-notification`

```javascript
{
  userId: string,
  email: string,
  username: string,
  selectedPlan: 'pro' | 'premium',
  trialEnd: string  // ISO date
}
```

### Checking Feature Access

```typescript
import { getTierLimits } from '@/lib/feature-limits';

const limits = getTierLimits(user.planId);

if (limits.enhancedReporterAnalysis) {
  // Show Media Radar features
}

if (user.briefsThisMonth >= limits.briefsPerMonth) {
  // Show upgrade prompt
}
```

---

## Marketing Site Copy

### Hero Section

**Headline:**
```
Your Smart Companion for Bitcoin Intelligence
```

**Subheadline:**
```
Not another dashboard. An AI co-pilot that watches your watchlist,
sends you alerts when things move, and delivers VP-level analysis
tailored to your role.
```

**Beta Banner:**
```
🎯 Beta Pricing: 50% Off While in Beta
Lock in beta pricing for life • 7-day free trial
```

### Pricing Section

```html
<!-- Pro Plan -->
<h3>Pro</h3>
<p>Your VP of Intelligence, without the VP salary</p>
<div class="price">
  <span class="current">$49/month</span>
  <span class="original">$99</span>
</div>
<ul>
  <li>3 watchlist items (companies/topics you track)</li>
  <li>Weekly persona-specific intelligence reports</li>
  <li>Smart spike/drop alerts (automatic for your watchlist)</li>
  <li>Trends dashboard with Bitcoin price correlation</li>
  <li>10 AI briefs per month (on-demand deep dives)</li>
  <li>Unlimited search across all Bitcoin news/data</li>
</ul>
<button>Start 7-Day Trial</button>
<p class="note">No credit card required</p>

<!-- Premium Plan -->
<h3>Premium</h3>
<span class="badge">Recommended</span>
<p>The full intelligence suite for serious operators</p>
<div class="price">
  <span class="current">$99/month</span>
  <span class="original">$199</span>
</div>
<ul>
  <li>Everything in Pro, PLUS:</li>
  <li>10 watchlist items (track more companies/topics)</li>
  <li>Enhanced reporter intelligence (for Marketing/PR)</li>
  <li>Unlimited AI briefs (ask anything, anytime)</li>
  <li>Export all reports (PDF/CSV for presentations)</li>
  <li>Custom views (filter by outlet, region, sentiment)</li>
  <li>Priority support (email + Slack)</li>
</ul>
<button>Start 7-Day Trial</button>
<p class="note">No credit card required</p>
```

### Trust Badges

```
✓ 7-day free trial
✓ No credit card required
✓ Cancel anytime
✓ Beta pricing locked in for life
✓ 100+ sources monitored 24/7
```

### Comparison Table

| | Free Tier | Pro | Premium |
|---|-----------|-----|---------|
| **Price** | — | $49/mo | $99/mo |
| **Trial** | ❌ No free access | ✅ 7 days | ✅ 7 days |
| **Watchlist Items** | 0 | 3 | 10 |
| **Smart Alerts** | ❌ | ✅ Automatic | ✅ Automatic |
| **Weekly Reports** | ❌ | ✅ Persona-based | ✅ Persona-based |
| **AI Briefs** | ❌ | 10/month | Unlimited |
| **Search** | ❌ | Unlimited | Unlimited |
| **Reporter Intel** | ❌ | Basic | Enhanced |
| **Exports** | ❌ | ❌ | ✅ PDF/CSV |
| **Support** | ❌ | Email | Email + Slack |

*Note: No free tier exists - all access requires Pro or Premium trial/subscription*

---

## FAQ for Marketing Site

**Q: Do I need a credit card to start my trial?**
A: Nope. Start your 7-day trial with just your email. Add payment later if you want to continue.

**Q: What happens after my trial ends?**
A: Your companion stops watching. You'll lose access to alerts, weekly reports, and your watchlist monitoring. Add payment anytime to reactivate.

**Q: Can I change plans later?**
A: Yes. Upgrade from Pro to Premium anytime. Downgrade at the end of your billing cycle.

**Q: What is "beta pricing"?**
A: We're offering 50% off ($49 Pro / $99 Premium) while building out features. Lock in this price now and keep it forever, even after we exit beta.

**Q: When does beta pricing end?**
A: After our first 100 paid users, pricing doubles to $99 Pro / $199 Premium. Early adopters keep their beta rate forever.

**Q: What if I don't like it?**
A: Cancel anytime during your trial or after. No questions asked. No hidden fees.

**Q: What's the difference between Pro and Premium?**
A: Pro is perfect for individuals tracking 1-3 key companies/topics. Premium is for teams or power users who need 10 watchlist items, unlimited AI briefs, reporter intelligence, and export capabilities.

---

## Implementation Checklist

- [x] Trial system accepts planId parameter
- [x] Feature limits match Pro/Premium tiers
- [x] Select-plan page shows beta pricing
- [x] Email sequence emphasizes beta pricing lock-in
- [x] No free tier exists
- [x] Watchlist alerts work for all trial users
- [x] Weekly reports sent to trial users
- [x] All functions deployed
- [ ] Marketing site updated with new pricing
- [ ] Stripe products configured for $49/$99
- [ ] Analytics tracking for plan selection
- [ ] A/B test Pro vs Premium conversion rates

---

## Metrics to Track

1. **Trial Conversion Rate**: % of trials → paid
2. **Plan Selection**: Pro vs Premium choice ratio
3. **Email Engagement**: Open/click rates by sequence day
4. **Feature Usage During Trial**:
   - Watchlist items added
   - AI briefs generated
   - Weekly reports opened
   - Smart alerts triggered
5. **Upgrade Rate**: Pro → Premium after subscription
6. **Churn Rate**: By plan tier
7. **Beta Pricing Impact**: Conversion before/after messaging changes

---

## Next Steps

1. Update marketing site with new pricing copy
2. Configure Stripe products:
   - Product ID for Pro ($49/mo)
   - Product ID for Premium ($99/mo)
3. Set up analytics events:
   - `plan_selected: {plan: 'pro' | 'premium'}`
   - `trial_started: {plan: 'pro' | 'premium'}`
   - `trial_converted: {plan: 'pro' | 'premium'}`
4. Monitor email sequence performance
5. Plan for beta exit strategy (pricing increase communication)
