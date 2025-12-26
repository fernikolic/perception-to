# Trial & Email Sequence System

**Last Updated:** October 21, 2025

---

## System Overview

The trial system gives new users 7 days of free access to their selected plan (Pro or Premium) and guides them through a conversion-focused email sequence.

---

## Trial Architecture

### Key Principle
**Trials use the actual plan the user selects, not a separate "trial" tier.**

- User selects Pro → gets Pro features during trial → converts to Pro subscription
- User selects Premium → gets Premium features during trial → converts to Premium subscription

### Data Structure

**Firestore: `subscriptions/{userId}`**
```typescript
{
  planId: 'pro' | 'premium',     // The plan they're trialing
  status: 'trialing',             // Trial status
  trialStart: '2025-10-21T10:00:00.000Z',
  trialEnd: '2025-10-28T10:00:00.000Z',
  currentPeriodEnd: '2025-10-28T10:00:00.000Z',
  cancelAtPeriodEnd: false,
  createdAt: '2025-10-21T10:00:00.000Z',
  updatedAt: '2025-10-21T10:00:00.000Z'
}
```

**Firestore: `users/{userId}`**
```typescript
{
  email: 'user@example.com',
  displayName: 'John Doe',
  selectedPlan: 'pro' | 'premium',  // What they chose on sign-up
  trialUsed: true,                   // Prevents multiple trials
  trialStart: '2025-10-21T10:00:00.000Z',
  planId: 'pro' | 'premium',         // Synced with subscription
  persona: {
    type: 'business_development' | 'venture_capital' | 'marketing_pr' | 'executive' | 'corp_dev',
    selectedAt: '2025-10-21T10:00:00.000Z'
  },
  clients: [
    {
      id: 'uuid',
      name: 'MicroStrategy',
      topics: ['corporate strategy', 'bitcoin treasury'],
      addedAt: '2025-10-21T10:00:00.000Z'
    }
  ]
}
```

---

## Trial Flow

### 1. User Sign-Up

**File:** `src/pages/select-plan.tsx`

```typescript
const handlePlanSelect = async (planId: 'pro' | 'premium') => {
  // Store plan preference
  await setDoc(doc(db, 'users', user.uid), {
    selectedPlan: planId,
    selectedPlanAt: new Date().toISOString()
  }, { merge: true });

  // Start trial with selected plan
  const result = await startTrial(planId);

  if (result.success) {
    // Redirect to onboarding
    navigate('/onboarding');
  }
}
```

### 2. Trial Creation

**File:** `src/lib/trial-manager.ts`

```typescript
export async function startTrial(userId: string, planId?: 'pro' | 'premium') {
  const now = new Date();
  const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Get user's selected plan
  const userDoc = await getDoc(doc(db, 'users', userId));
  const selectedPlan = planId || userDoc.data()?.selectedPlan || 'pro';

  // Create subscription with ACTUAL plan (not 'trial')
  await setDoc(doc(db, 'subscriptions', userId), {
    planId: selectedPlan,  // 'pro' or 'premium'
    status: 'trialing',
    currentPeriodEnd: trialEnd.toISOString(),
    trialStart: now.toISOString(),
    trialEnd: trialEnd.toISOString(),
    createdAt: now.toISOString()
  });

  // Send trial signup notification (triggers email sequence)
  await fetch('https://apiv2-uycbgxxglq-uc.a.run.app/trial-signup-notification', {
    method: 'POST',
    body: JSON.stringify({
      userId,
      email: userDoc.data()?.email,
      username: userDoc.data()?.displayName,
      selectedPlan,
      trialEnd: trialEnd.toISOString()
    })
  });
}
```

### 3. Backend Trial Setup

**File:** `functions/src/apply-free-trial.ts`

```typescript
export const applyFreeTrial = onRequest(async (request, response) => {
  const { userId, planId = 'pro' } = request.body;

  // Validate planId
  if (!['pro', 'premium'].includes(planId)) {
    response.status(400).send({ error: 'Invalid planId' });
    return;
  }

  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 7);

  // Create subscription with user's selected plan
  await db.collection('subscriptions').doc(userId).set({
    planId: planId,        // Their actual selection
    status: 'trialing',
    currentPeriodEnd: trialEnd.toISOString(),
    trialStart: new Date().toISOString(),
    trialEnd: trialEnd.toISOString()
  }, { merge: true });

  response.send({
    success: true,
    planId: planId,
    trialEnd: trialEnd.toISOString()
  });
});
```

---

## Feature Access During Trial

**File:** `functions/src/config/feature-limits.ts`

```typescript
export function getTierLimits(planId: string): TierLimits {
  // During trial, planId is 'pro' or 'premium' (NOT 'trial')
  if (!planId || !TIER_LIMITS[planId]) {
    return TIER_LIMITS.pro;  // Default to Pro
  }
  return TIER_LIMITS[planId];
}

// Pro trial users get:
TIER_LIMITS.pro = {
  watchlistItems: 3,
  briefsPerMonth: 10,
  customDashboards: false,
  exportBriefings: false,
  enhancedReporterAnalysis: false
}

// Premium trial users get:
TIER_LIMITS.premium = {
  watchlistItems: 10,
  briefsPerMonth: Number.MAX_SAFE_INTEGER,
  customDashboards: true,
  exportBriefings: true,
  enhancedReporterAnalysis: true
}
```

---

## Email Sequence System

### Overview

**8-day sequence** (Day 0-7) with "smart companion" positioning and beta pricing emphasis.

**File:** `functions/src/utils/email-sequences.ts`

### Email Schedule

| Day | Subject | Theme | Goal |
|-----|---------|-------|------|
| 0 | Your intelligence companion is ready | Introduction | Set expectations |
| 1 | Your companion found something interesting | Value demo | Show it working |
| 2 | Why traditional tools can't do this | Differentiation | Stand out from competitors |
| 3 | This alert would have saved me $50K | Social proof | Real story (Blockstream) |
| 4 | "I already have Google Alerts" | Objection handling | Address common pushback |
| 5 | 2 days left - Lock in beta pricing | Scarcity | Beta pricing urgency |
| 6 | Tomorrow your companion stops watching | Loss aversion | FOMO on features |
| 7 | Your companion goes offline in hours | Final push | Last chance conversion |

### Email Sending Flow

**Trigger:** Trial signup notification

**File:** `functions/src/api-v2.ts`

```typescript
app.post('/trial-signup-notification', async (req, res) => {
  const { userId, email, username, selectedPlan, trialEnd } = req.body;

  // Create scheduled emails for Days 0-7
  const emailSchedule = [
    { day: 0, delay: 0 },           // Immediate
    { day: 1, delay: 1 * 24 * 60 }, // 1 day
    { day: 2, delay: 2 * 24 * 60 }, // 2 days
    { day: 3, delay: 3 * 24 * 60 }, // 3 days
    { day: 4, delay: 4 * 24 * 60 }, // 4 days
    { day: 5, delay: 5 * 24 * 60 }, // 5 days (2 days before end)
    { day: 6, delay: 6 * 24 * 60 }, // 6 days (1 day before end)
    { day: 7, delay: 7 * 24 * 60 }, // 7 days (final hours)
  ];

  for (const schedule of emailSchedule) {
    await db.collection('scheduled_emails').add({
      userId,
      email,
      username,
      planType: selectedPlan,  // Used in emails for pricing
      emailType: `day${schedule.day}`,
      scheduledFor: new Date(Date.now() + schedule.delay * 60 * 1000),
      status: 'pending',
      createdAt: new Date()
    });
  }
});
```

### Email Processing

**Function:** `processEmails` (runs every 15 minutes)

```typescript
export const processEmails = onSchedule('every 15 minutes', async () => {
  const now = new Date();

  // Get pending emails that should be sent
  const snapshot = await db.collection('scheduled_emails')
    .where('status', '==', 'pending')
    .where('scheduledFor', '<=', now)
    .limit(50)
    .get();

  for (const doc of snapshot.docs) {
    const emailData = doc.data();

    // Send the appropriate email based on type
    switch (emailData.emailType) {
      case 'day0':
        await sendDay0WelcomeEmail(emailData);
        break;
      case 'day1':
        await sendDay1ShiftInThinking(emailData);
        break;
      // ... etc
    }

    // Mark as sent
    await doc.ref.update({ status: 'sent', sentAt: new Date() });
  }
});
```

---

## Email Content Structure

### Common Elements

All emails include:
1. **Personalization**: User's name/email
2. **Sender**: fernando@perception.to
3. **Beta Pricing**: $49 Pro / $99 Premium with strikethrough original price
4. **CTA**: Link to app.perception.to
5. **Unsubscribe**: Footer link

### Email Templates

#### Day 0: Welcome Email

**Subject:** Your intelligence companion is ready

**Key Messages:**
- "I didn't build another news aggregator"
- "Think of it as your co-pilot"
- Already watching your watchlist 24/7
- Knows your role (persona-based)
- Will alert you proactively

**CTA:** Log in and explore

---

#### Day 1: Value Demo

**Subject:** Your companion found something interesting

**Key Messages:**
- Shows pattern recognition in action
- Example of cross-source connection
- "You wouldn't have seen this manually"
- Demonstrates proactive monitoring

**CTA:** See what else it found

---

#### Day 2: Differentiation

**Subject:** Why traditional tools can't do this

**Key Messages:**
- Not a passive feed reader
- Connects developments across sources
- Identifies patterns before they're trends
- Translates noise into "here's what to do"

**Comparison:**
- Google Alerts: Keyword matching
- Perception: Pattern recognition + context

**CTA:** See your trends dashboard

---

#### Day 3: Social Proof

**Subject:** This alert would have saved me $50K

**Key Messages:**
- Real story from Blockstream experience
- Regulatory filing spotted in obscure South Dakota publication
- Would have cost $50K in emergency legal fees
- "I wish I had built this 3 years ago"

**CTA:** Don't miss your next alert

---

#### Day 4: Objection Handling

**Subject:** "I already have Google Alerts"

**Key Messages:**
- Addresses common objections
- Shows what makes Perception different
- "You can keep reading 100 articles/day, or know which 3 matter"

**CTA:** Check today's opportunities

---

#### Day 5: Trial Scarcity + Beta Pricing

**Subject:** 2 days left - Lock in beta pricing

**Key Messages:**
- Trial ends in 2 days
- Companion stops watching
- Beta pricing: $49/$99 (50% off forever)
- "Once we're out of beta, this price doubles"

**Pricing Display:**
```
Beta Pricing
$49/month (or $99/month for Premium)
50% off forever • Cancel anytime
```

**CTA:** Lock In Beta Pricing →

---

#### Day 6: Loss Aversion

**Subject:** Tomorrow your companion stops watching

**Key Messages:**
- What you'll lose tomorrow:
  - No one watching watchlist overnight
  - Spikes detected when everyone else finds out
  - Back to checking 12 tabs manually
  - Weekly intelligence briefs gone
- "Going back to manual research will feel... slow"

**CTA:** Keep Companion Active →

---

#### Day 7: Final Push

**Subject:** Your companion goes offline in hours

**Key Messages:**
- Last email
- In [X] hours, companion stops watching
- No fake urgency (can sign up later)
- But won't get this price again
- Beta pricing ends today

**What you've seen this week:**
- 24/7 watchlist monitoring
- Spikes detected before Twitter
- Weekly intelligence reports
- Pattern recognition across 100+ sources

**CTA:** Add Payment • Keep Access →

**Offer:** 15-min call if still on the fence

---

## Trial Expiration Handling

**Function:** `checkTrialExpiration` (runs daily)

```typescript
export const checkTrialExpiration = onSchedule('every day 00:00', async () => {
  const now = new Date();

  // Find expired trials
  const snapshot = await db.collection('subscriptions')
    .where('status', '==', 'trialing')
    .where('trialEnd', '<=', now.toISOString())
    .get();

  for (const doc of snapshot.docs) {
    const subscription = doc.data();

    // Check if they added payment
    if (subscription.stripeCustomerId && subscription.stripeSubscriptionId) {
      // They converted! Update to active
      await doc.ref.update({
        status: 'active',
        updatedAt: now.toISOString()
      });
    } else {
      // Trial expired without conversion
      await doc.ref.update({
        status: 'trial_expired',
        updatedAt: now.toISOString()
      });

      // Send trial expired email
      await sendTrialExpiredEmail(subscription);
    }
  }
});
```

---

## Conversion Tracking

### Analytics Events

**Trial Started:**
```typescript
gtag('event', 'trial_started', {
  plan: 'pro' | 'premium',
  user_id: userId,
  trial_end: trialEnd
});
```

**Email Opened:**
```typescript
gtag('event', 'email_opened', {
  email_type: 'day0' | 'day1' | ...,
  plan: 'pro' | 'premium',
  user_id: userId
});
```

**Email Clicked:**
```typescript
gtag('event', 'email_clicked', {
  email_type: 'day0' | 'day1' | ...,
  plan: 'pro' | 'premium',
  link: 'cta_primary' | 'cta_secondary',
  user_id: userId
});
```

**Trial Converted:**
```typescript
gtag('event', 'trial_converted', {
  plan: 'pro' | 'premium',
  user_id: userId,
  days_to_convert: 3,
  converting_email: 'day5'  // Last email they clicked
});
```

---

## Key Files Reference

### Frontend
- `src/pages/select-plan.tsx` - Plan selection UI
- `src/lib/trial-manager.ts` - Trial creation logic
- `src/hooks/use-trial.ts` - Trial status hook
- `src/hooks/use-subscription.ts` - Subscription data

### Backend
- `functions/src/apply-free-trial.ts` - Trial creation endpoint
- `functions/src/config/feature-limits.ts` - Tier limits
- `functions/src/utils/email-sequences.ts` - All email content
- `functions/src/api-v2.ts` - Trial notification endpoint
- `functions/src/scheduled-emails.ts` - Email processing

---

## Testing the System

### Manual Trial Creation

```bash
# Start a Pro trial
curl -X POST https://applyfreetrial-uycbgxxglq-uc.a.run.app \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-123",
    "planId": "pro"
  }'

# Start a Premium trial
curl -X POST https://applyfreetrial-uycbgxxglq-uc.a.run.app \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-456",
    "planId": "premium"
  }'
```

### Check Email Schedule

```javascript
// In Firebase Console
db.collection('scheduled_emails')
  .where('userId', '==', 'test-user-123')
  .orderBy('scheduledFor')
  .get()
```

### Force Email Send (for testing)

```javascript
// Update scheduledFor to now
await db.collection('scheduled_emails')
  .doc('email-doc-id')
  .update({
    scheduledFor: new Date()
  });

// Wait 15 minutes for processEmails to run
// OR manually trigger:
// firebase functions:shell
// processEmails()
```

---

## Monitoring & Metrics

### Key Metrics to Track

1. **Trial Starts**: By plan (Pro vs Premium)
2. **Email Performance**:
   - Open rates by day
   - Click rates by day
   - Best converting email (which day drives most conversions)
3. **Trial Conversion Rate**: % → paid subscriber
4. **Time to Convert**: Which day of trial they convert
5. **Drop-off Points**: Where users churn in sequence

### Firestore Queries

**Active Trials:**
```javascript
db.collection('subscriptions')
  .where('status', '==', 'trialing')
  .where('trialEnd', '>', new Date().toISOString())
  .get()
```

**Converted Trials:**
```javascript
db.collection('subscriptions')
  .where('status', '==', 'active')
  .where('trialStart', '!=', null)
  .get()
```

**Email Performance:**
```javascript
db.collection('scheduled_emails')
  .where('status', '==', 'sent')
  .where('emailType', '==', 'day5')
  .get()
```

---

## Common Issues & Solutions

### Issue: User not receiving emails

**Check:**
1. Email in `scheduled_emails` collection?
2. `scheduledFor` date correct?
3. `status` = 'pending'?
4. Brevo API key configured?

**Fix:**
```javascript
// Check scheduled emails
db.collection('scheduled_emails')
  .where('email', '==', 'user@example.com')
  .orderBy('scheduledFor')
  .get()

// Manually trigger if stuck
await processEmails();
```

---

### Issue: Trial gives wrong features

**Check:**
1. `subscription.planId` = 'pro' or 'premium' (not 'trial')
2. `subscription.status` = 'trialing'
3. Feature limits query uses `planId`

**Fix:**
```javascript
// Update subscription
await db.collection('subscriptions').doc(userId).update({
  planId: 'premium',  // Correct plan
  status: 'trialing'
});
```

---

### Issue: Email says wrong pricing

**Check:**
1. `scheduled_emails` document has `planType` field
2. Email template uses `userData.planType`

**Fix:**
```javascript
// Update scheduled email
await db.collection('scheduled_emails').doc(emailId).update({
  planType: 'premium'
});
```

---

## Future Enhancements

1. **A/B Testing**: Test different email copy/timing
2. **Behavioral Triggers**: Send emails based on actions (or inaction)
3. **Win-back Campaign**: Re-engage expired trials
4. **Referral Program**: Incentivize conversions
5. **Trial Extension**: Offer +3 days for specific actions
6. **Personalized Timing**: Send emails based on user timezone
7. **SMS Alerts**: Day 6-7 SMS reminders
8. **In-App Prompts**: Contextual upgrade prompts during trial
