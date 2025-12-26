# Email Design System

## Overview

Perception uses two email systems to keep users informed about their watchlist activity:

1. **Real-time Alerts** - Immediate notifications for urgent/time-sensitive content
2. **Weekly Digest** - Comprehensive summary reports sent on a schedule

---

## Email Templates

### 1. Real-time Alert Email

**File:** `functions/src/utils/realtime-alert-email.ts`

**Purpose:** Send immediate alerts when high-impact, breaking, or time-sensitive articles are found for a user's watchlist keywords.

**Design Philosophy:**
- Professional, clean aesthetic
- No emojis
- Muted color palette (grays, blacks, whites)
- Fast-scanning layout for busy executives

**Color Palette:**
| Element | Color | Hex |
|---------|-------|-----|
| Header background | Dark gray | `#111827` |
| Body background | Light gray | `#f9fafb` |
| Card background | White | `#ffffff` |
| Primary text | Dark gray | `#111827` |
| Secondary text | Medium gray | `#374151` |
| Muted text | Light gray | `#6b7280` |
| Card border | Light border | `#e5e7eb` |
| CTA button | Dark gray | `#111827` |

**Layout Structure:**
```
+------------------------------------------+
|           HEADER (dark gray)             |
|  [URGENCY LABEL]                         |
|  Watchlist Item Name                     |
|  Timestamp                               |
+------------------------------------------+
|                                          |
|  Hi [Name], we detected [N] important    |
|  articles about [Keyword]...             |
|                                          |
|  +------------------------------------+  |
|  | ARTICLE CARD                       |  |
|  | Outlet           Time ago          |  |
|  |                                    |  |
|  | Title                              |  |
|  | Summary text...                    |  |
|  | Why this matters: [reason]         |  |
|  |                                    |  |
|  | [Read Article]    Sentiment: X     |  |
|  +------------------------------------+  |
|                                          |
|           [View in Dashboard]            |
|                                          |
+------------------------------------------+
|           FOOTER (light gray)            |
|  [Logo] Perception                       |
|  Real-time intelligence for [keyword]    |
|  Manage preferences | Pause alerts       |
+------------------------------------------+
```

**Subject Line Format:**
```
[Urgency Label] Keyword: Article Headline...
```

Example: `[High Impact] Blockstream: Adam Back says, "Ultimately, every company becomes a Bitc...`

**Urgency Types:**
| Type | Label |
|------|-------|
| `breaking` | Breaking News |
| `regulatory` | Regulatory Update |
| `major_outlet` | Major Coverage |
| `high_impact` | High Impact |

---

### 2. Weekly Digest Email

**File:** `functions/src/utils/weekly-report-email-enhanced.ts`

**Purpose:** Comprehensive weekly summary of all watchlist activity, with AI-generated analysis.

**Features:**
- Executive summary per watchlist item
- Week-over-week comparison metrics
- AI-powered analysis (GPT-4o)
- Top outlets breakdown
- Sentiment distribution
- Opportunity classification

---

## Technical Implementation

### Sending Infrastructure

Both email types use **Brevo** (formerly Sendinblue) transactional email API:
- API URL: `https://api.brevo.com/v3/smtp/email`
- Sender: `Perception Alerts <alerts@perception.to>`

### Scheduling

| Email Type | Schedule | Function |
|------------|----------|----------|
| Real-time Alerts | Every 30 minutes | `realtimeWatchlistAlerts` |
| Weekly Digest | Every hour (checks user timezone) | `sendWeeklyWatchlistReports` |

### User Preferences

User email preferences are stored in Firestore at `users/{uid}.persona.communicationPreferences`:

```typescript
{
  emailFrequency: 'weekly' | 'daily' | 'realtime_weekly',
  alertThreshold: 'all' | 'medium' | 'high'
}
```

- `weekly` - Weekly digest only
- `daily` - Daily digest
- `realtime_weekly` - Real-time alerts + weekly digest

---

## Testing

### Test Scripts

Located in `functions/`:

| Script | Purpose |
|--------|---------|
| `test-realtime-alert-professional.js` | Test real-time alert with professional design |
| `test-realtime-alert-fernando.js` | Test with Fernando's actual watchlist data |
| `test-realtime-alert-real.js` | Test with real BigQuery articles |
| `test-realtime-alert.js` | Basic test with sample data |

### Running Tests

```bash
# Set API key and run
BREVO_API_KEY="your-key" node test-realtime-alert-professional.js
```

---

## Rate Limiting

Real-time alerts include rate limiting to prevent alert fatigue:

- **Max 5 alerts per day** per user
- **2-hour gap** between alerts for the same keyword
- State stored in `users/{uid}/realtimeAlertState`

---

## Design Guidelines

### Do:
- Keep subject lines concise (under 80 characters)
- Use professional, muted colors
- Prioritize scanability
- Include "Why this matters" context
- Always include unsubscribe/manage preferences links

### Don't:
- Use emojis in subject lines or body
- Use bright or saturated colors
- Include more than 3 articles per alert
- Send duplicate alerts within 2-hour window

---

## Deployment Configuration

### Required Secrets

The real-time alerts function requires access to `BREVO_API_KEY` from GCP Secret Manager. This is configured in the function definition:

```typescript
// functions/src/realtime-watchlist-alerts.ts
export const realtimeWatchlistAlerts = onSchedule(
  {
    schedule: 'every 30 minutes',
    timeZone: 'UTC',
    region: 'us-central1',
    memory: '512MiB',
    timeoutSeconds: 300,
    maxInstances: 3,
    secrets: ['BREVO_API_KEY'],  // Required for Brevo API access
  },
  // ...
);
```

### Deployment Commands

```bash
# Deploy real-time alerts function
firebase deploy --only functions:realtimeWatchlistAlerts

# Verify secret is configured
gcloud run services describe realtimewatchlistalerts \
  --region=us-central1 \
  --project=perception-app-3db34 \
  --format="yaml(spec.template.spec.containers[0].env)"
```

---

## Admin Dashboard

The Watchlist Alerts admin page (`/admin/watchlist-alerts`) provides monitoring capabilities:

- **User Overview**: Shows all users with their email preferences and subscription status
- **Real-time Alerts**: Logs of all real-time alerts sent, with open/click rates
- **Weekly Reports**: Logs of weekly digest emails

**File:** `src/components/admin/pages/watchlist-alerts-admin.tsx`

---

## Future Improvements

- [ ] A/B test subject line formats
- [ ] Add click tracking
- [ ] Personalize based on engagement history
- [ ] Add "snooze" functionality
- [ ] Mobile-optimized templates
