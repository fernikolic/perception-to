# Slack Integration Documentation

## Overview

The Slack Integration allows Premium and Enterprise users to receive real-time Bitcoin trend notifications directly in their Slack workspace. This feature uses Slack's OAuth 2.0 flow with incoming webhooks to deliver beautifully formatted trend alerts.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Setup & Configuration](#setup--configuration)
- [User Flow](#user-flow)
- [Technical Implementation](#technical-implementation)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

---

## Features

### Current Capabilities

- **One-Click OAuth Setup**: Users can connect their Slack workspace with a single click
- **Automatic Trend Notifications**: Real-time notifications for early and emerging Bitcoin trends
- **Rich Formatting**: Notifications use Slack Block Kit for beautiful, interactive messages
- **Channel Selection**: Users choose which Slack channel receives notifications during OAuth setup
- **Deduplication**: Prevents sending duplicate notifications for the same trend
- **Test Functionality**: Users can send test notifications to verify their integration
- **Premium Feature**: Only available to Premium and Enterprise plan subscribers

### Notification Details

Trend notifications include:
- Trend title and summary
- Signal strength indicator (early 🔍, emerging 📈, strong 🔥)
- Article count
- Sentiment analysis (positive 🟢, neutral ⚪, negative 🔴)
- Key highlights (up to 3)
- Categories/tags
- Timestamp
- Direct link to view in Perception dashboard

### Scheduling

- **Frequency**: Every 15 minutes
- **Timezone**: America/New_York
- **Trend Types**: Only early and emerging trends (filters out strong trends)
- **Time Window**: Last 12 hours of trends
- **Rate Limiting**: 1 second delay between notifications to avoid Slack rate limits

---

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interface                           │
├─────────────────────────────────────────────────────────────────┤
│  1. Settings Page (notifications.tsx)                           │
│  2. Onboarding Flow (communication-preferences.tsx)             │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Cloud Functions (Backend)                     │
├─────────────────────────────────────────────────────────────────┤
│  1. slackOAuthCallback - Handles OAuth flow                     │
│  2. notifyNewTrendsSlack - Scheduled trend notifications        │
│  3. testSlackTrendNotification - Manual test trigger            │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      External Services                           │
├─────────────────────────────────────────────────────────────────┤
│  1. Slack OAuth API                                             │
│  2. Slack Incoming Webhooks                                     │
│  3. Trends API (btcpapifunction3-1-final)                       │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

#### OAuth Setup Flow

```
1. User clicks "Add to Slack" button
   ↓
2. Redirected to Slack OAuth (client_id + state=userId)
   ↓
3. User selects Slack workspace and channel
   ↓
4. Slack redirects to slackOAuthCallback with code
   ↓
5. Backend exchanges code for webhook URL
   ↓
6. Webhook URL saved to Firestore:
   users/{userId}/persona/communicationPreferences/
   ↓
7. User redirected back to settings with success message
```

#### Notification Flow

```
1. Cloud Scheduler triggers notifyNewTrendsSlack (every 15 min)
   ↓
2. Query all Premium/Enterprise users with Slack enabled
   ↓
3. Fetch new trends from Trends API (last 12 hours)
   ↓
4. Filter for early/emerging trends only
   ↓
5. For each user:
   - Check if trend already notified (deduplication)
   - Format trend as Slack Block Kit message
   - POST to user's webhook URL
   - Mark trend as notified in Firestore
   ↓
6. Log results and metrics
```

---

## Setup & Configuration

### Prerequisites

1. **Slack App Configuration**
   - Slack Client ID: `318613999509.9889456260501`
   - Slack Client Secret: Stored in environment variables
   - OAuth Scopes: `incoming-webhook`
   - Redirect URI: `https://us-central1-perception-app-3db34.cloudfunctions.net/slackOAuthCallback`

2. **Environment Variables**

**Backend (Cloud Functions):**
```bash
SLACK_CLIENT_ID=318613999509.9889456260501
SLACK_CLIENT_SECRET=<your-secret>
```

**Frontend (.env):**
```bash
VITE_SLACK_CLIENT_ID=318613999509.9889456260501
```

3. **Firebase Configuration**
   - Cloud Functions deployed to `us-central1`
   - Cloud Scheduler job running every 15 minutes
   - Firestore security rules allow users to update their own Slack preferences

### Slack App Setup

If you need to recreate or update the Slack app:

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Create a new app or select existing: "Perception Bitcoin Intelligence"
3. Configure OAuth & Permissions:
   - Add redirect URL: `https://us-central1-perception-app-3db34.cloudfunctions.net/slackOAuthCallback`
   - Add Bot Token Scope: `incoming-webhook`
4. Enable Incoming Webhooks
5. Copy Client ID and Client Secret to environment variables

### Deployment

**Deploy Cloud Functions:**

```bash
# Deploy OAuth callback
firebase deploy --only functions:slackOAuthCallback

# Deploy scheduled notification function
firebase deploy --only functions:notifyNewTrendsSlack

# Deploy test function
firebase deploy --only functions:testSlackTrendNotification

# Deploy all Slack functions
firebase deploy --only functions:slackOAuthCallback,functions:notifyNewTrendsSlack,functions:testSlackTrendNotification
```

**Deploy Frontend:**

```bash
npm run build
firebase deploy --only hosting
```

---

## User Flow

### Setup (Settings Page)

1. User navigates to Settings > Notifications
2. Scrolls to "Slack Integration" section
3. If Premium/Enterprise:
   - Sees "Add to Slack" button
   - Clicks button → redirected to Slack OAuth
   - Authorizes app and selects channel
   - Redirected back with success message
   - Can send test notification
   - Can disconnect Slack
4. If Free/Pro:
   - Sees upgrade prompt
   - Can upgrade to Premium/Enterprise

### Setup (Onboarding Flow)

1. During onboarding, after selecting communication preferences
2. Premium/Enterprise users see optional Slack integration step
3. Can connect immediately or skip for later
4. Completes onboarding whether connected or not

### Receiving Notifications

1. User has Slack connected and Premium/Enterprise plan
2. Every 15 minutes, system checks for new trends
3. If new early/emerging trends detected:
   - Notification posted to selected Slack channel
   - User can click "View Trends Dashboard" to see details
4. Notifications deduplicated (won't receive same trend twice)

---

## Technical Implementation

### File Structure

```
perception/
├── functions/
│   └── src/
│       ├── slack-oauth.ts              # OAuth callback handler
│       ├── slack-trend-notifications.ts # Scheduled notifications
│       └── index.ts                     # Export all functions
├── src/
│   ├── lib/
│   │   └── services/
│   │       └── slack-trend-notifications.ts  # Client-side service
│   ├── components/
│   │   └── dashboard/
│   │       └── pages/
│   │           └── settings/
│   │               └── notifications.tsx     # Settings UI
│   └── pages/
│       └── onboarding/
│           └── steps/
│               └── communication-preferences.tsx  # Onboarding UI
└── docs/
    └── features/
        └── SLACK-INTEGRATION.md         # This file
```

### Backend Functions

#### 1. slackOAuthCallback

**Location:** `functions/src/slack-oauth.ts`

**Purpose:** Handles the OAuth callback from Slack after user authorization

**Trigger:** HTTP request from Slack OAuth flow

**Process:**
1. Receives `code` and `state` (userId) from Slack
2. Exchanges code for access token via Slack API
3. Extracts webhook URL, channel name, and channel ID
4. Saves to Firestore:
   ```javascript
   users/{userId}/persona/communicationPreferences/ {
     slackEnabled: true,
     slackWebhookUrl: string,
     slackChannel: string,
     slackChannelId: string,
     slackConfiguredAt: timestamp
   }
   ```
5. Redirects user back to settings page

**Error Handling:**
- Missing code/state → redirect with error
- Slack API error → redirect with error
- No webhook URL → redirect with error
- Database error → redirect with server error

**CORS:** Allows requests from production and staging domains

#### 2. notifyNewTrendsSlack

**Location:** `functions/src/slack-trend-notifications.ts`

**Purpose:** Scheduled function to send trend notifications to Slack

**Trigger:** Cloud Scheduler (every 15 minutes)

**Configuration:**
```javascript
{
  schedule: 'every 15 minutes',
  timeZone: 'America/New_York',
  memory: '512MiB',
  maxInstances: 1
}
```

**Process:**
1. Query Premium/Enterprise users with Slack enabled
2. Fetch trends from API (last 12 hours)
3. Filter for early/emerging trends only
4. For each user:
   - For each new trend:
     - Check if already notified
     - Format as Slack blocks
     - Send to webhook URL
     - Mark as notified
     - Wait 1 second (rate limiting)
5. Log total notifications sent

**Deduplication:**
- Uses Firestore collection: `slack_notifications/{userId}/sent/{trendTitleHash}`
- Hash: Base64 of trend title (limited to 100 chars)
- Contains: `trendTitle`, `trendId`, `notifiedAt`

**Rate Limiting:**
- 1 second delay between notifications
- Single instance prevents concurrent runs

#### 3. testSlackTrendNotification

**Location:** `functions/src/slack-trend-notifications.ts`

**Purpose:** Manual test function for users to verify Slack integration

**Trigger:** Callable function (HTTP POST with auth)

**Authentication:** Requires Firebase auth token

**Process:**
1. Verify user is authenticated
2. Check user has Premium/Enterprise plan
3. Verify Slack webhook URL is configured
4. Fetch latest trends from API
5. Send first trend as test notification
6. Return success/error result

**Response:**
```typescript
{
  success: boolean,
  message: string,
  trendTitle?: string
}
```

### Frontend Components

#### 1. Settings Page

**Location:** `src/components/dashboard/pages/settings/notifications.tsx`

**Features:**
- Displays Slack integration section
- Shows "Add to Slack" button when not connected
- Shows success message and test button when connected
- Allows disconnecting Slack
- Premium/Enterprise gate (shows upgrade prompt for lower plans)

**OAuth URL Construction:**
```typescript
`https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&scope=incoming-webhook&state=${user?.uid}`
```

**Test Notification:**
```typescript
const response = await fetch(
  'https://testslacktrendnotification-uycbgxxglq-uc.a.run.app',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ data: {} })
  }
);
```

#### 2. Onboarding Flow

**Location:** `src/pages/onboarding/steps/communication-preferences.tsx`

**Features:**
- Optional Slack setup during onboarding
- Only shown to Premium/Enterprise users
- Can skip and set up later
- Shows success message if connected
- Doesn't block onboarding completion

### Slack Message Formatting

**Block Kit Structure:**

```typescript
[
  // Header
  {
    type: 'header',
    text: { type: 'plain_text', text: '🔥 New Trend Detected' }
  },

  // Branding
  {
    type: 'context',
    elements: [
      { type: 'image', image_url: 'https://app.perception.to/logo.png' },
      { type: 'mrkdwn', text: '*Perception* | Bitcoin Intelligence' }
    ]
  },

  // Trend content
  {
    type: 'section',
    text: { type: 'mrkdwn', text: '*Title*\n\nSummary...' }
  },

  // Featured image (if available)
  {
    type: 'image',
    image_url: trend.image_url
  },

  // Metadata
  {
    type: 'context',
    elements: [
      { type: 'mrkdwn', text: '📰 *5* articles • ⚡ *Emerging* signal' }
    ]
  },

  // Sentiment (if available)
  {
    type: 'context',
    elements: [
      { type: 'mrkdwn', text: '🟢 *Sentiment:* Positive (0.75)' }
    ]
  },

  // Key highlights
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*Key Highlights:*\n• Point 1\n• Point 2\n• Point 3'
    }
  },

  // Categories
  {
    type: 'context',
    elements: [
      { type: 'mrkdwn', text: '🏷️ Regulation • Adoption • Market Analysis' }
    ]
  },

  // Action button
  {
    type: 'actions',
    elements: [
      {
        type: 'button',
        text: { type: 'plain_text', text: 'View Trends Dashboard' },
        url: 'https://app.perception.to/app/trends/discovery',
        style: 'primary'
      }
    ]
  },

  // Divider
  { type: 'divider' },

  // Timestamp
  {
    type: 'context',
    elements: [
      { type: 'mrkdwn', text: '🕐 Nov 11, 2025, 3:15 PM EST' }
    ]
  }
]
```

### Data Models

#### User Document (Firestore)

```typescript
interface UserData {
  email: string;
  plan?: 'free' | 'pro' | 'premium' | 'enterprise';
  stripeCustomerId?: string;
  persona?: {
    communicationPreferences?: {
      slackEnabled?: boolean;
      slackWebhookUrl?: string;
      slackChannel?: string;
      slackChannelId?: string;
      slackConfiguredAt?: Timestamp;
    };
  };
}
```

#### Notification Tracking (Firestore)

```
Collection: slack_notifications/{userId}/sent/{trendTitleHash}

Document:
{
  trendTitle: string;
  trendId?: string;
  notifiedAt: Timestamp;
}
```

#### Trend Cluster (API Response)

```typescript
interface TrendCluster {
  id?: string;
  title: string;
  summary: string;
  key_highlights: string[];
  articles: TrendArticle[];
  generated_at: { value: string };
  sentiment_score?: number;
  signal_strength?: 'early' | 'emerging' | 'strong';
  confidence_score?: number;
  article_velocity?: number;
  categories?: string[];
  article_count?: number;
  image_url?: string;
}
```

---

## Testing

### Manual Testing

#### 1. OAuth Flow Test

```bash
# 1. Open browser to settings page
https://app.perception.to/app/settings/notifications

# 2. Ensure user has Premium/Enterprise plan
# 3. Click "Add to Slack" button
# 4. Select workspace and channel
# 5. Verify redirect back to settings with success message
# 6. Check Firestore for saved webhook URL:

firebase firestore:get users/{userId}
# Should show:
# persona.communicationPreferences.slackEnabled: true
# persona.communicationPreferences.slackWebhookUrl: https://hooks.slack.com/...
```

#### 2. Test Notification

**Via UI:**
1. Go to Settings > Notifications
2. Ensure Slack is connected
3. Click "Send Test" button
4. Check Slack channel for notification
5. Verify notification contains real trend data

**Via Direct API Call:**

```bash
# Get Firebase auth token
firebase login

# Call test function
curl -X POST \
  https://testslacktrendnotification-uycbgxxglq-uc.a.run.app \
  -H "Authorization: Bearer $(firebase auth:token)" \
  -H "Content-Type: application/json" \
  -d '{"data": {}}'
```

#### 3. Scheduled Notification Test

**Trigger manually:**

```bash
# Trigger the scheduled function manually
firebase functions:shell

# Then in the shell:
notifyNewTrendsSlack({})
```

**Check logs:**

```bash
# View function logs
firebase functions:log --only notifyNewTrendsSlack --lines 50

# Or via gcloud
gcloud functions logs read notifyNewTrendsSlack \
  --region=us-central1 \
  --limit=50
```

### Automated Testing

#### Unit Tests (Recommended to Add)

```typescript
// Test OAuth callback
describe('slackOAuthCallback', () => {
  it('should save webhook URL on successful OAuth', async () => {
    // Mock Slack API response
    // Call function
    // Verify Firestore update
  });

  it('should handle OAuth errors gracefully', async () => {
    // Test error scenarios
  });
});

// Test notification formatting
describe('formatTrendBlocks', () => {
  it('should format trend with all fields', () => {
    // Test complete trend
  });

  it('should handle missing optional fields', () => {
    // Test minimal trend
  });
});
```

### End-to-End Testing

**Test Checklist:**

- [ ] User can connect Slack workspace
- [ ] Webhook URL is saved to Firestore
- [ ] User can send test notification
- [ ] Test notification appears in Slack
- [ ] User can disconnect Slack
- [ ] Scheduled job runs every 15 minutes
- [ ] Notifications sent for new trends only
- [ ] No duplicate notifications sent
- [ ] Only Premium/Enterprise users receive notifications
- [ ] Free/Pro users see upgrade prompt
- [ ] OAuth errors redirect correctly
- [ ] Slack API errors logged properly

---

## Troubleshooting

### Common Issues

#### 1. "Add to Slack" button not working

**Symptoms:** Clicking button does nothing or gives error

**Possible Causes:**
- Missing VITE_SLACK_CLIENT_ID environment variable
- User not authenticated
- Incorrect OAuth redirect URI

**Solutions:**
```bash
# Check environment variable
echo $VITE_SLACK_CLIENT_ID

# Verify in Slack app settings
# Redirect URI should be:
https://us-central1-perception-app-3db34.cloudfunctions.net/slackOAuthCallback
```

#### 2. OAuth callback fails

**Symptoms:** Redirected back with error parameter

**Check logs:**
```bash
firebase functions:log --only slackOAuthCallback
```

**Common errors:**
- `missing_params`: Code or state missing from Slack response
- `no_webhook`: Slack didn't return webhook URL
- `server_error`: Backend exception (check logs)

**Verify:**
```bash
# Check environment variables are set
firebase functions:config:get

# Should include:
slack.client_id
slack.client_secret
```

#### 3. Notifications not being sent

**Symptoms:** No Slack messages received after 15 minutes

**Debug steps:**

1. **Check Cloud Scheduler:**
```bash
gcloud scheduler jobs list
gcloud scheduler jobs describe notifyNewTrendsSlack
```

2. **Check function logs:**
```bash
firebase functions:log --only notifyNewTrendsSlack --lines 100
```

3. **Verify user setup:**
```javascript
// In Firebase console, check user document:
users/{userId}/persona/communicationPreferences/
// Should have:
{
  slackEnabled: true,
  slackWebhookUrl: "https://hooks.slack.com/..."
}
```

4. **Check user plan:**
```javascript
// User document should have:
{
  plan: "premium" // or "enterprise"
}
```

5. **Verify trends API:**
```bash
curl "https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends?hours=12&include_emerging=true&min_article_count=1"
```

#### 4. Test notification fails

**Symptoms:** "Send Test" button shows error

**Check:**
1. User authentication token is valid
2. User has Premium/Enterprise plan
3. Webhook URL is configured
4. Trends API is returning data

**Debug:**
```javascript
// Check browser console for errors
// Test direct function call:
const token = await firebase.auth().currentUser.getIdToken();
console.log('Token:', token);

// Check function logs
firebase functions:log --only testSlackTrendNotification
```

#### 5. Slack randomly disconnects

**Symptoms:** User's Slack integration becomes disconnected without user action

**Status:** ✅ **FIXED** (December 12, 2025)

**Root Cause:** Race condition in OAuth flow. When saving any notification setting, the form could overwrite newly-saved Slack config with stale (empty) values if Firestore returned cached data.

**Fix Applied:**
- Added `?slack=success` handler to show success toast
- Protected Slack config on save by checking current values before overwriting
- Form now preserves existing webhook URL if form data is empty/stale

**See:** [December 2025 Updates](../changelog/DECEMBER_2025_UPDATES.md)

#### 6. Duplicate notifications

**Symptoms:** Same trend sent multiple times

**Status:** ✅ **FIXED** (November 13, 2025)

**Root Cause:** Backend trend clustering was creating duplicate trends when new articles were added to existing stories. The hash-based matching system only compared trends with identical title hashes, causing GPT-generated title variations to bypass consolidation.

**Fix Applied:** Implemented multi-signal trend matching in `btc-trends-ui-deployment/index.js`:
- Removed restrictive hash requirement
- Added article URL overlap detection (50%+ overlap = same trend)
- Combined title similarity (60%) + article overlap (40%) scoring
- Now queries all trends from last 72 hours instead of just hash matches

**Previous Workarounds (No Longer Needed):**
```bash
# Check maxInstances is set to 1
# In slack-trend-notifications.ts:
maxInstances: 1

# Verify notification tracking:
firebase firestore:get slack_notifications/{userId}/sent
```

**Verification:** Extract test showed 60% consolidation rate with 0 duplicate trends created.

#### 6. Rate limiting errors

**Symptoms:** Slack returns 429 error

**Solutions:**
- Increase delay between notifications (currently 1 second)
- Implement exponential backoff
- Reduce notification frequency

### Logs and Monitoring

**Key log patterns to watch:**

```bash
# Successful OAuth
"Slack configured for user {userId}"

# Notification run
"Starting Slack trend notifications check..."
"Found {N} Premium users with Slack enabled"
"Found {N} total trends"
"Found {N} new/emerging trends"
"Sent {N} notifications to {email}"
"✅ Sent {N} total Slack notifications"

# Errors
"OAuth error:"
"Failed to send Slack notification:"
"Error in Slack trend notifications:"
```

**Set up alerts:**

```bash
# Create log-based metric for errors
gcloud logging metrics create slack-errors \
  --description="Slack integration errors" \
  --log-filter='resource.type="cloud_function"
    AND (resource.labels.function_name="slackOAuthCallback"
         OR resource.labels.function_name="notifyNewTrendsSlack")
    AND severity="ERROR"'

# Create alerting policy
# (Configure in Cloud Console Monitoring)
```

---

## Future Enhancements

### Planned Improvements

1. **Customizable Notification Filters**
   - Allow users to set signal strength threshold
   - Filter by categories/topics
   - Set minimum article count
   - Sentiment-based filtering

2. **Notification Scheduling**
   - Quiet hours (don't send during specified times)
   - Timezone-aware delivery
   - Digest mode (batch notifications)

3. **Enhanced Formatting**
   - Include article snippets
   - Add author information
   - Show related trends
   - Interactive buttons (save, share, dismiss)

4. **Analytics**
   - Track notification open rates
   - Monitor engagement with trends
   - User preference learning
   - A/B test message formats

5. **Additional Integrations**
   - Microsoft Teams
   - Discord
   - Telegram
   - Custom webhooks

6. **Advanced Features**
   - Thread notifications for updates to same trend
   - @mention specific users
   - Create Slack reminders
   - Integrate with Slack workflows

7. **User Controls**
   - Pause notifications temporarily
   - Notification history in app
   - Delivery report
   - Custom notification templates

### Technical Debt

1. **Error Handling**
   - Implement retry logic for failed notifications
   - Better error messages to users
   - Automatic webhook validation

2. **Performance**
   - Cache user queries
   - Optimize Firestore reads
   - Implement batch processing
   - Use Cloud Tasks for reliable delivery

3. **Testing**
   - Add unit tests for all functions
   - Integration tests for OAuth flow
   - E2E tests for notification delivery
   - Load testing for high user counts

4. **Security**
   - Rotate client secrets regularly
   - Implement webhook signature verification
   - Add rate limiting per user
   - Audit access logs

5. **Monitoring**
   - Dashboard for notification metrics
   - Alert on high failure rates
   - Track API quota usage
   - Monitor webhook health

---

## API Reference

### Environment Variables

| Variable | Location | Purpose | Example |
|----------|----------|---------|---------|
| `SLACK_CLIENT_ID` | Cloud Functions | Slack app client ID | `318613999509.9889456260501` |
| `SLACK_CLIENT_SECRET` | Cloud Functions | Slack app client secret | `<secret>` |
| `VITE_SLACK_CLIENT_ID` | Frontend | Client ID for OAuth URL | `318613999509.9889456260501` |

### Cloud Functions

#### slackOAuthCallback

```typescript
Type: onRequest (HTTP)
URL: https://us-central1-perception-app-3db34.cloudfunctions.net/slackOAuthCallback
Method: GET
CORS: ['https://app.perception.to', 'https://perception-app-3db34.web.app']

Query Parameters:
- code: string (OAuth authorization code from Slack)
- state: string (User ID)
- error?: string (OAuth error if any)

Redirects to:
- Success: https://app.perception.to/app/settings/notifications?slack=success
- Error: https://app.perception.to/app/settings/notifications?error={errorType}
```

#### notifyNewTrendsSlack

```typescript
Type: onSchedule
Schedule: every 15 minutes
Timezone: America/New_York
Memory: 512MiB
MaxInstances: 1

Process:
1. Get Premium/Enterprise users with Slack enabled
2. Fetch trends from API (last 12 hours)
3. Filter for early/emerging trends
4. Send notifications with deduplication
5. Log results

Returns: void (logs only)
```

#### testSlackTrendNotification

```typescript
Type: onCall (Callable)
URL: https://testslacktrendnotification-uycbgxxglq-uc.a.run.app
Method: POST
Authentication: Required (Firebase Auth token)
CORS: ['http://localhost:5173', 'https://localhost:5173', 'https://perception-app-3db34.web.app']

Request:
{
  data: {}
}

Response:
{
  result: {
    success: boolean;
    message: string;
    trendTitle?: string;
  }
}

Errors:
- unauthenticated: User not logged in
- permission-denied: User not Premium/Enterprise
- failed-precondition: Slack not configured
- not-found: No trends available
- internal: Failed to send notification
```

### Firestore Schema

#### User Document

```
Collection: users
Document ID: {userId}

Schema:
{
  email: string;
  plan?: 'free' | 'pro' | 'premium' | 'enterprise';
  persona?: {
    communicationPreferences?: {
      slackEnabled: boolean;
      slackWebhookUrl: string;
      slackChannel: string;
      slackChannelId: string;
      slackConfiguredAt: Timestamp;
    }
  }
}
```

#### Notification Tracking

```
Collection: slack_notifications
Document ID: {userId}
Subcollection: sent
Document ID: {trendTitleHash} (Base64, max 100 chars)

Schema:
{
  trendTitle: string;
  trendId?: string;
  notifiedAt: Timestamp;
}
```

### External APIs

#### Slack OAuth

```
POST https://slack.com/api/oauth.v2.access
Content-Type: application/x-www-form-urlencoded

Parameters:
- client_id: Slack app client ID
- client_secret: Slack app client secret
- code: Authorization code from OAuth flow
- redirect_uri: Callback URL

Response:
{
  ok: boolean;
  access_token?: string;
  incoming_webhook?: {
    url: string;
    channel: string;
    channel_id: string;
  };
  error?: string;
}
```

#### Slack Incoming Webhook

```
POST {webhook_url}
Content-Type: application/json

Body:
{
  text: string; // Fallback text
  blocks: Array<Block>; // Slack Block Kit blocks
}

Response:
HTTP 200: "ok"
HTTP 429: Rate limited
HTTP 404: Webhook deleted/invalid
```

#### Trends API

```
GET https://btcpapifunction3-1-final-45998414364.us-central1.run.app/trends

Parameters:
- hours: number (default: 12)
- include_emerging: boolean (default: true)
- min_article_count: number (default: 1)

Response:
{
  success: boolean;
  trends: TrendCluster[];
}
```

---

## Support and Maintenance

### Ownership

- **Product Owner**: Product Team
- **Engineering Owner**: Backend Team
- **On-call Contact**: DevOps Team

### Runbooks

#### Disable Slack Notifications (Emergency)

```bash
# Pause Cloud Scheduler job
gcloud scheduler jobs pause notifyNewTrendsSlack --location=us-central1

# To resume later
gcloud scheduler jobs resume notifyNewTrendsSlack --location=us-central1
```

#### Rotate Slack Client Secret

```bash
# 1. Generate new secret in Slack app settings
# 2. Update environment variable
firebase functions:config:set slack.client_secret="NEW_SECRET"

# 3. Redeploy functions
firebase deploy --only functions:slackOAuthCallback

# 4. Update .env file for backup
```

#### Clean Up Old Notifications

```bash
# Delete notification tracking older than 30 days
# (Run as Node.js script)
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

const usersSnapshot = await db.collection('users').get();
for (const userDoc of usersSnapshot.docs) {
  const sentRef = db.collection('slack_notifications')
    .doc(userDoc.id)
    .collection('sent');

  const oldDocs = await sentRef
    .where('notifiedAt', '<', thirtyDaysAgo)
    .get();

  for (const doc of oldDocs.docs) {
    await doc.ref.delete();
  }
}
```

### Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2025-12-12 | 1.2.0 | **Bug Fix:** Fixed random disconnection issue caused by OAuth race condition. Added success toast on OAuth completion. Protected Slack config from accidental overwrites when saving other settings. |
| 2025-11-13 | 1.1.0 | **Bug Fix:** Eliminated duplicate notifications by improving backend trend consolidation. Implemented multi-signal matching with article URL overlap detection. |
| 2025-11 | 1.0.0 | Initial release with OAuth and notifications |

---

## Related Documentation

- [Trends API Documentation](../backend/CLOUD-FUNCTION-OPTIMIZATION.md)
- [Notification Settings](../features/weekly-watchlist-reports.md)
- [Premium Features](../business/PRICING_AND_PLANS.md)
- [Firebase Functions](../deployment/DEPLOY_AI_FUNCTION.md)

---

**Last Updated:** December 12, 2025
**Maintained By:** Engineering Team
**Next Review:** February 2026
