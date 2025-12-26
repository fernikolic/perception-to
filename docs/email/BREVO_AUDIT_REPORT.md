# Brevo Email System Audit Report
**Date:** November 2, 2025
**Last Updated:** December 12, 2025

## Executive Summary

Your Brevo email system is **partially working** with one critical bug affecting email delivery to new signups.

### Current Status
- ✅ Brevo API configured and authenticated
- ✅ Welcome emails (Day 0) are being sent successfully
- ⚠️ Follow-up emails (Day 1-7) are not being sent due to data structure bug
- ✅ **NEW (Dec 12):** Watchlist alerts now working - `BREVO_API_KEY` secret added to `processWatchlistAlerts`
- ✅ **NEW (Dec 12):** Email frequency UI added to notification settings

---

## System Overview

### Email Flow
1. User signs up → `triggerEmailSequence` is called
2. Day 0 (welcome) email sent immediately ✅
3. Days 1-7 scheduled in Firestore `emailSequences` collection
4. `processEmails` runs hourly to send scheduled emails
5. **BUG**: Some scheduled emails have `undefined` name field → emails not sent ❌

### Functions Deployed
| Function | Type | Status | Last Run |
|----------|------|--------|----------|
| `triggerEmailSequence` | HTTP | ✅ Working | Oct 31, 17:43 |
| `processEmails` | Scheduled (hourly) | ⚠️ Has bugs | Nov 2, 1:31am |
| `brevoWebhook` | HTTP | ✅ Deployed | - |

---

## Critical Issue

### Problem
The `processEmails` function is encountering undefined email names:

```
WARNING: ⚠️ No email function found for undefined
INFO: 📧 Attempting to send undefined to jherlihy@moorsview.com...
```

### Root Cause
When `scheduleOnboardingEmails` creates the email sequence in Firestore, some emails are being saved with `name: undefined` instead of proper names like:
- `Day1ShiftInThinking`
- `Day2SignalInNoise`
- etc.

### Impact
- New users receive the Day 0 welcome email ✅
- Follow-up emails (Days 1-7) are **not being sent** ❌
- Users are missing out on the nurture sequence

---

## Detailed Findings

### 1. Brevo API Configuration ✅
- API Key: Configured (length: 89)
- Sender: fernando@perception.to
- Location: `functions/src/utils/email.ts`

**Action Required:** Verify sender email is verified in Brevo dashboard:
👉 https://app.brevo.com/settings/senders

### 2. Email Sequence Trigger ✅
Last successful trigger on **Oct 31, 2025 17:43:50**:
```
✅ Day 0 Welcome email sent successfully
✅ Email sequence scheduled successfully
```

### 3. Scheduled Email Processor ⚠️
Running hourly as expected, but encountering errors:

**Last Run: Nov 2, 2025 1:31am**
- Processed: 479 email sequences
- Sent: 1 email
- Errors: Multiple "undefined email function" warnings

### 4. Email Templates (8-day sequence)
Location: `functions/src/utils/email-sequences.ts`

| Day | Function Name | Subject | Status |
|-----|--------------|---------|---------|
| 0 | `sendDay0WelcomeEmail` | Your intelligence companion is ready | ✅ Working |
| 1 | `sendDay1ShiftInThinking` | Your companion found something interesting | ⚠️ Not sending |
| 2 | `sendDay2SignalInNoise` | Why traditional tools can't do this | ⚠️ Not sending |
| 3 | `sendDay3ValueReinforcement` | This alert would have saved me $50K | ⚠️ Not sending |
| 4 | `sendDay4OvercomeObjections` | "I already have Google Alerts" | ⚠️ Not sending |
| 5 | `sendDay5TrialScarcity` | 2 days left - Lock in beta pricing | ⚠️ Not sending |
| 6 | `sendDay6LossAversion` | Tomorrow your companion stops watching | ⚠️ Not sending |
| 7 | `sendDay7FinalPush` | Your companion goes offline in hours | ⚠️ Not sending |

---

## Recommendations

### Immediate Actions (High Priority)

#### 1. Fix the Undefined Email Name Bug
**File:** `functions/src/utils/email-sequences.ts:666-675`

The issue is likely in how the sequence is being mapped when saved to Firestore.

**Current Code (suspected issue):**
```typescript
sequence: emailSequence.map(({ delay, name }) => ({
  name,  // <-- This might be undefined
  scheduledFor: new Date(Date.now() + delay * 24 * 60 * 60 * 1000).toISOString(),
  sent: false,
  opened: false,
  clicked: false
}))
```

**Check:** Verify `getSegmentedEmailSequence()` returns objects with proper `name` field.

#### 2. Verify Brevo Sender Email
1. Login to Brevo: https://app.brevo.com/
2. Go to Settings → Senders
3. Verify `fernando@perception.to` is **verified** (green checkmark)

If not verified:
- You'll need to verify via DNS records or email confirmation
- Emails will bounce without verification

#### 3. Check Recent Signups Are Receiving Emails
Run this to see if users from the last week got their welcome emails:

```bash
# Check function logs for recent email sends
gcloud functions logs read triggerEmailSequence \\
  --project perception-app-3db34 \\
  --region us-central1 \\
  --limit 50 | grep "successfully"
```

### Medium Priority Actions

#### 4. Add Monitoring
Create alerts for:
- Failed email sends
- processEmails errors
- Undefined email names

Location: Consider using Cloud Monitoring or add to `functions/src/alerts.ts`

#### 5. Test Email Sequence End-to-End
1. Create a test user signup
2. Monitor Firestore `emailSequences` collection
3. Check that all 8 emails have proper `name` field
4. Verify emails arrive in inbox

Test script (run from root):
```bash
# Sign up a test user, then check the sequence
firebase firestore:get emailSequences/{userId} --project perception-app-3db34
```

### Low Priority Actions

#### 6. Add Email Analytics Dashboard
You have the `getInternalEmailAnalytics` function deployed but may want to create a UI for it.

Endpoint: `https://us-central1-perception-app-3db34.cloudfunctions.net/getInternalEmailAnalytics?timeframe=30`

#### 7. Consider Brevo Webhooks
Set up webhooks in Brevo dashboard to track:
- Email opens
- Email clicks
- Bounces
- Unsubscribes

Webhook URL (already deployed):
`https://us-central1-perception-app-3db34.cloudfunctions.net/brevoWebhook`

---

## How to Verify Emails Are Being Sent

### Check Brevo Dashboard
1. Login: https://app.brevo.com/
2. Go to "Campaigns" → "Transactional"
3. View recent email sends
4. Check delivery rate, opens, clicks

### Check Firebase Function Logs
```bash
# See recent email processing
gcloud functions logs read processEmails \\
  --project perception-app-3db34 \\
  --limit 100 | grep -E "sent|error|Day"

# See recent email sequence triggers
gcloud functions logs read triggerEmailSequence \\
  --project perception-app-3db34 \\
  --limit 50
```

### Check Firestore Data
Use Firebase Console:
1. Go to Firestore Database
2. Navigate to `emailSequences` collection
3. Find a recent user
4. Check if:
   - `welcomeEmailSent: true`
   - `sequence` array has proper `name` fields (not undefined)
   - Emails are being marked as `sent: true`

---

## Testing Checklist

Before considering this issue resolved:

- [ ] Fix undefined email name bug in code
- [ ] Deploy updated function: `firebase deploy --only functions:triggerEmailSequence,functions:processEmails`
- [ ] Verify fernando@perception.to is verified sender in Brevo
- [ ] Create test user signup
- [ ] Confirm Day 0 email arrives
- [ ] Wait 1 hour and verify Day 1 email is processed
- [ ] Check Firestore that all emails have proper `name` field
- [ ] Check Brevo dashboard shows email sends
- [ ] Verify emails arrive in test user's inbox (check spam)

---

## Support Resources

- **Brevo Dashboard:** https://app.brevo.com/
- **Brevo Docs:** https://developers.brevo.com/
- **Firebase Console:** https://console.firebase.google.com/project/perception-app-3db34/functions/list
- **Email Templates:** `functions/src/utils/email-sequences.ts`
- **Email Processor:** `functions/src/email-processor.ts`
- **Sequence Trigger:** `functions/src/email-sequence.ts`

---

## Next Steps

1. **[URGENT]** Fix the undefined email name bug
2. Verify sender email in Brevo
3. Test with a new signup
4. Monitor for 7 days to ensure all emails send
5. Consider adding email analytics UI

---

## December 2025 Updates

### Watchlist Alerts Fix (December 12, 2025)

**Issue:** The `processWatchlistAlerts` function was missing the `secrets` configuration, causing `BREVO_API_KEY` to be undefined at runtime. All watchlist alert emails silently failed.

**Fix Applied:**
```typescript
export const processWatchlistAlerts = onSchedule(
  {
    schedule: 'every 15 minutes',
    secrets: ['BREVO_API_KEY'],  // ✅ Added
  },
```

**Additional Changes:**
- Added "Watchlist Alert Emails" dropdown to notification settings
- Users can now choose: Off, Weekly Only, or Real-time + Weekly
- `emailFrequency` field now saved to `persona.communicationPreferences`

**See:** [December 2025 Updates](../changelog/DECEMBER_2025_UPDATES.md)

---

*Generated by Claude Code - November 2, 2025*
*Updated: December 12, 2025*
