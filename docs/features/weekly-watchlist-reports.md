# Weekly Watchlist Reports System

**Version:** 2.1
**Last Updated:** December 12, 2025
**Status:** ✅ Deployed and Active

> **Related:** For real-time alerts (immediate notifications), see [Email Design System](../email/EMAIL_DESIGN_SYSTEM.md)

---

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [User Experience](#user-experience)
4. [Technical Implementation](#technical-implementation)
5. [File Structure](#file-structure)
6. [Configuration](#configuration)
7. [Deployment](#deployment)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)
10. [Future Enhancements](#future-enhancements)

---

## Overview

### What It Does

The Weekly Watchlist Reports system automatically sends email summaries to users (customizable day/time) containing:

- **Week-over-week analysis** of all watchlist items they're tracking
- **Mention volume comparison** (this week vs. last week)
- **Sentiment breakdown** (positive, neutral, negative percentages)
- **Top 5 media outlets** covering each topic
- **AI-generated professional analysis** powered by GPT-4o
- **Archived HTML reports** - View past reports in-app anytime

### Key Features

- ✅ **Customizable delivery** - Choose any day of week and time
- ✅ **Global timezone support** - 70+ timezones worldwide
- ✅ **Report history archive** - View past 20 reports in web app
- ✅ **Minimum mention threshold** - Only send when items meet criteria
- ✅ **No payment restrictions** - Available to ALL users (retention tool)
- ✅ **Duplicate prevention** - Won't send the same report twice
- ✅ **Professional AI insights** - Deloitte/EY quality analysis (with fallback)
- ✅ **Beautiful HTML emails** - Mobile-responsive design
- ✅ **Robust error handling** - BigQuery retry logic, graceful degradation
- ✅ **User control** - Toggle on/off, full customization

---

## System Architecture

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────┐
│ Cloud Scheduler (Every Hour on Mondays, UTC)               │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ Cloud Function: sendWeeklyWatchlistReports                 │
│ - Checks if it's Monday                                     │
│ - Loops through all users (filters out email-based IDs)    │
│ - For each user:                                            │
│   ├── Get timezone (or default America/New_York)           │
│   ├── Calculate current time in user's timezone            │
│   ├── If Monday 9am → proceed, else skip                   │
│   └── Check if already sent today → skip if yes            │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ Data Fetching & Processing                                  │
│ - Get user's watchlist items (userData.clients)            │
│ - For each watchlist item:                                  │
│   ├── Query BigQuery for past 7 days                       │
│   ├── Query BigQuery for previous 7 days (comparison)      │
│   ├── Calculate metrics:                                    │
│   │   ├── Mention count (this week)                        │
│   │   ├── Mention count (last week)                        │
│   │   ├── Percentage change                                │
│   │   ├── Top 5 outlets                                    │
│   │   └── Sentiment breakdown                              │
│   └── Generate AI analysis via OpenAI GPT-4o               │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ Email Generation & Delivery                                 │
│ - Build HTML email from template                            │
│ - Include all watchlist items with data                     │
│ - Send via Brevo API                                        │
│ - Record in weekly_report_history collection                │
└─────────────────────────────────────────────────────────────┘
```

### Components

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Scheduler** | Cloud Scheduler | Triggers function every hour |
| **Processor** | Cloud Functions v2 | Main logic for report generation |
| **History API** | Cloud Functions v2 (HTTP) | Fetch report history for users |
| **Content API** | Cloud Functions v2 (HTTP) | Retrieve archived report HTML |
| **Data Source** | BigQuery | Historical article data (with retry logic) |
| **AI Analysis** | OpenAI GPT-4o | Professional insights generation (with fallback) |
| **Email Delivery** | Brevo API | Email sending service |
| **User Data** | Firestore | User preferences, watchlist items |
| **History Tracking** | Firestore | Prevent duplicate sends + archive storage |
| **Web Archive** | React SPA | View past reports interface |

---

## User Experience

### Settings UI

**Location:** Settings → Notifications
**URL:** `https://app.perception.to/app/settings/notifications`

**Available Controls:**

1. **Weekly Watchlist Report Toggle**
   - Default: Enabled (ON)
   - Field: `weeklyReportEnabled` (boolean)
   - Description: "Get a summary of all your tracked watchlist items from the past week."

2. **Delivery Day Selector**
   - Default: Monday
   - Field: `weeklyReportDay` (number: 0-6, where 0=Sunday)
   - Options: Sunday through Saturday

3. **Delivery Time Selector**
   - Default: 9am
   - Field: `weeklyReportHour` (number: 0-23)
   - Options: 12am through 11pm (24 hour options)

4. **Minimum Mentions Threshold**
   - Default: 0 (no minimum)
   - Field: `weeklyReportMinMentions` (number)
   - Description: "Only send report if at least this many watchlist items meet the mention threshold"

5. **Timezone Selector**
   - Default: Auto-detected or `America/New_York`
   - Field: `timezone` (string)
   - Options: 70+ timezones organized by region:
     - **UTC**
     - **North America**: New York, Chicago, Denver, Phoenix, Los Angeles, Vancouver, Toronto, etc.
     - **South America**: São Paulo, Buenos Aires, Lima, Santiago, Bogotá, etc.
     - **Europe**: London, Paris, Berlin, Rome, Madrid, Amsterdam, etc.
     - **Middle East & Africa**: Dubai, Jerusalem, Istanbul, Cairo, Johannesburg, etc.
     - **Asia**: Tokyo, Singapore, Hong Kong, Shanghai, Mumbai, Seoul, Bangkok, etc.
     - **Australia & Pacific**: Sydney, Melbourne, Auckland, Fiji, etc.

6. **View Past Reports Link**
   - Button: "View Reports"
   - Action: Navigate to `/app/weekly-reports`
   - Icon: Mail envelope
   - Description: "Access your weekly report history and view past emails"

### Weekly Reports Archive Page

**Location:** Weekly Reports Page
**URL:** `https://app.perception.to/app/weekly-reports`

**Access Points:**
1. Settings → Notifications → "View Reports" button
2. Intelligence Tab → "Insights" section → Weekly Reports stats card

**Features:**
- **Report List**: Display up to 20 most recent reports
- **Date Range**: Shows week covered (e.g., "Oct 14 - Oct 21, 2025")
- **Sent Date**: When the report was emailed
- **Item Count**: Number of watchlist items tracked
- **Metrics Preview**: Mentions count and percent change for each item
- **View Button**: Opens archived HTML in new window
- **Empty State**: Helpful message if no reports exist with link to settings

**Example Display:**

```
┌─────────────────────────────────────────────────┐
│ Oct 14 - Oct 21, 2025                          │
│ Sent Oct 21, 2025 at 9:00 am                   │
│                                                 │
│ 3 watchlist items tracked                      │
│                                                 │
│ • Bitcoin - 2,898 mentions ↑ 12%              │
│ • Ethereum - 1,543 mentions ↓ 8%              │
│ • DeFi - 789 mentions ↑ 23%                   │
│                                                 │
│                          [View Report]          │
└─────────────────────────────────────────────────┘
```

### Email Template

**Subject:** `Your Weekly Watchlist Report (Oct 14 - Oct 21, 2025)`

**Sections:**

1. **Header**
   - Perception logo
   - "Weekly Watchlist Report" title
   - Date range

2. **Greeting**
   - Personalized with user's name
   - Brief intro

3. **Watchlist Item Cards** (one per tracked item)
   - Item name (e.g., "Bitcoin")
   - Change indicator (↑/↓ with percentage)
   - This week mentions count
   - Last week mentions count
   - Sentiment breakdown chart
   - Top 5 outlets table
   - AI-generated analysis (blue box with lightbulb icon)

4. **Call-to-Action**
   - Button: "View full details in Perception"
   - Links to: `https://app.perception.to/app/watchlist`

5. **Footer**
   - "Perception Smart Alerts" branding
   - Links to manage preferences and unsubscribe

### Example Email Flow

**User: Fernando Nikolic**
**Timezone:** America/Los_Angeles (UTC-7)
**Watchlist Items:** Treasuries, AI, Quantum

**Timeline:**

| UTC Time | LA Time | System Action |
|----------|---------|---------------|
| Mon 15:00 | Mon 8am | Function runs, checks Fernando's timezone, not 9am yet → skip |
| Mon 16:00 | Mon 9am | Function runs, checks Fernando's timezone, **IT'S 9AM!** → Send report |
| Mon 17:00 | Mon 10am | Function runs, checks history, already sent today → skip |

**Email Content:**

```
Subject: Your Weekly Watchlist Report (Oct 14 - Oct 21, 2025)

Hi Fernando,

Here's your weekly summary of all the watchlist items you're tracking.

┌─────────────────────────────────────┐
│ Treasuries                    ↓ 8% │
├─────────────────────────────────────┤
│ This Week: 287 mentions            │
│ Last Week: 312 mentions            │
│                                     │
│ Sentiment: 35% Positive            │
│           51% Neutral              │
│           14% Negative             │
│                                     │
│ Top Outlets:                       │
│ 1. Financial Times - 45            │
│ 2. Bloomberg - 38                  │
│ ...                                │
│                                     │
│ 💡 Professional Analysis:          │
│ Treasury coverage declined 8%      │
│ this week, reflecting...           │
└─────────────────────────────────────┘

[Additional cards for AI and Quantum...]

[View full details in Perception]
```

---

## Technical Implementation

### Cloud Functions

#### 1. `sendWeeklyWatchlistReports`

**File:** `/Users/fernandonikolic/perception/functions/src/weekly-watchlist-reports.ts`

**Schedule:** Every hour (UTC)
**Memory:** 512 MiB
**Max Instances:** 5
**Region:** us-central1

**Trigger:**
```typescript
export const sendWeeklyWatchlistReports = onSchedule({
  schedule: 'every hour',
  timeZone: 'UTC',
  region: 'us-central1',
  memory: '512MiB',
  maxInstances: 5,
}, async (event) => {
  // Only run on Mondays
  const now = new Date();
  const day = now.getUTCDay();
  if (day !== 1) {
    logger.info('Skipping: Not Monday');
    return;
  }

  await processWeeklyReports();
});
```

**Main Logic:**

```typescript
async function processWeeklyReports() {
  // 1. Get all users
  const usersSnapshot = await getDb().collection('users').get();

  // 2. Filter out legacy docs (email-based IDs)
  const validUserDocs = usersSnapshot.docs.filter(doc => !doc.id.includes('@'));

  // 3. For each user:
  for (const userDoc of validUserDocs) {
    const userData = userDoc.data();

    // Skip if disabled
    if (userData.weeklyReportEnabled === false) continue;

    // Get timezone
    const timezone = userData.timezone || 'America/New_York';

    // Check if Monday 9am in user's timezone
    const currentDay = getCurrentDayInTimezone(timezone);
    const currentHour = getCurrentHourInTimezone(timezone);

    if (currentDay !== 1 || currentHour !== 9) continue;

    // Check if already sent today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const recentReportCheck = await getDb()
      .collection('weekly_report_history')
      .where('userId', '==', userDoc.id)
      .where('sentAt', '>=', admin.firestore.Timestamp.fromDate(today))
      .limit(1)
      .get();

    if (!recentReportCheck.empty) continue;

    // Get watchlist items
    const watchlistItems = userData.clients || [];
    if (watchlistItems.length === 0) continue;

    // Fetch data for each item
    const reportData = await Promise.all(
      watchlistItems.map(item => fetchWeeklyData(item, startDate, endDate))
    );

    // Send email
    await sendWeeklyReportEmail({
      to: userData.email,
      userName: userData.displayName || userData.email.split('@')[0],
      reportData,
      weekStartDate: startDate,
      weekEndDate: endDate,
    });

    // Record history
    await getDb().collection('weekly_report_history').add({
      userId: userDoc.id,
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
      itemCount: reportData.length,
    });
  }
}
```

**Helper Functions:**

```typescript
// Get current hour in specific timezone
function getCurrentHourInTimezone(timezone: string): number {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    timeZone: timezone,
  });
  const hourStr = formatter.format(now);
  return parseInt(hourStr, 10);
}

// Get current day of week (0=Sunday, 1=Monday, etc.)
function getCurrentDayInTimezone(timezone: string): number {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: timezone
  });
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days.indexOf(dateStr);
}
```

#### 2. `sendWeeklyReportsManual`

**File:** Same as above
**Schedule:** Every 24 hours (effectively disabled - for testing only)
**Purpose:** Manual testing/emergency trigger

### Weekly Report History API Endpoints

#### 1. `weeklyReportHistory`

**File:** `/Users/fernandonikolic/perception/functions/src/weekly-report-history-api.ts`

**Type:** HTTP GET endpoint
**Region:** us-central1
**Memory:** 256 MiB
**Max Instances:** 10
**URL:** `https://weeklyreporthistory-uycbgxxglq-uc.a.run.app`

**Purpose:** Fetch list of past weekly reports for authenticated user

**Authentication:** Firebase ID Token (Bearer)

**Query Parameters:**
- `limit` (optional): Number of reports to fetch (default: 10, max: 20)

**Request Example:**
```bash
curl -H "Authorization: Bearer ${FIREBASE_ID_TOKEN}" \
  "https://weeklyreporthistory-uycbgxxglq-uc.a.run.app?limit=20"
```

**Response:**
```json
{
  "success": true,
  "reports": [
    {
      "id": "abc123",
      "sentAt": "2025-10-21T16:00:00.000Z",
      "weekStartDate": "2025-10-14T00:00:00.000Z",
      "weekEndDate": "2025-10-21T00:00:00.000Z",
      "itemCount": 3,
      "reportData": [
        {
          "watchlistItemName": "Bitcoin",
          "thisWeekMentions": 2898,
          "lastWeekMentions": 2587,
          "percentChange": 12.0
        }
      ]
    }
  ]
}
```

**Security:**
- Verifies Firebase ID token
- Only returns reports for authenticated user
- Returns 401 if token invalid
- Returns 403 if accessing other user's reports

**Required Firestore Index:**
```json
{
  "collectionGroup": "weekly_report_history",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "userId", "order": "ASCENDING" },
    { "fieldPath": "sentAt", "order": "DESCENDING" }
  ]
}
```

#### 2. `weeklyReportContent`

**File:** Same as above
**Type:** HTTP GET endpoint
**Region:** us-central1
**Memory:** 256 MiB
**Max Instances:** 10
**URL:** `https://weeklyreportcontent-uycbgxxglq-uc.a.run.app/{reportId}`

**Purpose:** Retrieve archived HTML content of a specific report

**Authentication:** Firebase ID Token (Bearer)

**Path Parameter:**
- `reportId`: Document ID from weekly_report_history collection

**Request Example:**
```bash
curl -H "Authorization: Bearer ${FIREBASE_ID_TOKEN}" \
  "https://weeklyreportcontent-uycbgxxglq-uc.a.run.app/abc123"
```

**Response:**
```html
<!DOCTYPE html>
<html>
<body>
  <!-- Full HTML email content -->
</body>
</html>
```

**Security:**
- Verifies Firebase ID token
- Checks report ownership (reportData.userId === token.uid)
- Returns 401 if token invalid
- Returns 403 if accessing other user's report
- Returns 404 if report doesn't exist

**Frontend Usage:**
```typescript
async function viewReport(reportId: string) {
  const token = await user.getIdToken();
  const response = await fetch(
    `https://weeklyreportcontent-uycbgxxglq-uc.a.run.app/${reportId}`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  const htmlContent = await response.text();
  const newWindow = window.open('', '_blank');
  newWindow.document.write(htmlContent);
  newWindow.document.close();
}
```

#### 3. Data Fetching: `fetchWeeklyData`

**Purpose:** Fetch and process data for a single watchlist item

**Steps:**

1. **Query This Week's Data**
   ```typescript
   const thisWeekResults = await queryKeywordMentions(
     keyword,
     startDate,  // 7 days ago
     endDate     // today
   );
   ```

2. **Query Last Week's Data**
   ```typescript
   const lastWeekStart = new Date(startDate);
   lastWeekStart.setDate(lastWeekStart.getDate() - 7);
   const lastWeekEnd = new Date(endDate);
   lastWeekEnd.setDate(lastWeekEnd.getDate() - 7);

   const lastWeekResults = await queryKeywordMentions(
     keyword,
     lastWeekStart,
     lastWeekEnd
   );
   ```

3. **Calculate Metrics**
   ```typescript
   const thisWeekMentions = thisWeekResults.articles.length;
   const lastWeekMentions = lastWeekResults.articles.length;

   const percentChange = lastWeekMentions > 0
     ? ((thisWeekMentions - lastWeekMentions) / lastWeekMentions) * 100
     : thisWeekMentions > 0 ? 100 : 0;
   ```

4. **Aggregate Top Outlets**
   ```typescript
   const outletCounts: { [key: string]: number } = {};
   thisWeekResults.articles.forEach(article => {
     const outlet = article.outlet || 'Unknown';
     outletCounts[outlet] = (outletCounts[outlet] || 0) + 1;
   });

   const topOutlets = Object.entries(outletCounts)
     .map(([outlet, count]) => ({ outlet, count }))
     .sort((a, b) => b.count - a.count)
     .slice(0, 5);
   ```

5. **Calculate Sentiment Breakdown**
   ```typescript
   const total = thisWeekMentions || 1;
   const sentimentBreakdown = {
     positive: Math.round((thisWeekResults.sentimentCounts.positive / total) * 100),
     neutral: Math.round((thisWeekResults.sentimentCounts.neutral / total) * 100),
     negative: Math.round((thisWeekResults.sentimentCounts.negative / total) * 100),
   };
   ```

6. **Generate AI Analysis**
   ```typescript
   const aiAnalysis = await generateProfessionalAnalysis(
     keyword,
     thisWeekMentions,
     lastWeekMentions,
     percentChange,
     topOutlets,
     sentimentBreakdown
   );
   ```

#### 4. AI Analysis: `generateProfessionalAnalysis`

**Model:** GPT-4o
**Temperature:** 0.7
**Max Tokens:** 250

**System Prompt:**
```
You are a senior research analyst at a top-tier consulting firm.
Provide concise, professional media analysis with strategic insights.
```

**User Prompt:**
```
You are a senior research analyst at a top-tier consulting firm
(Deloitte, EY, McKinsey level). Analyze the following weekly media
coverage data for "[keyword]" and provide a concise, professional analysis.

Data Summary:
- This week: X mentions (+/-Y% vs last week)
- Last week: Z mentions
- Sentiment: A% positive, B% neutral, C% negative
- Top outlets: Outlet1, Outlet2, Outlet3

Provide a 2-3 sentence professional analysis that includes:
1. Key trend observation (growth/decline and significance)
2. Strategic implications or market narrative
3. Forward-looking insight or recommendation

Write in a professional, authoritative tone. Be specific and data-driven.
Do NOT use bullet points or formatting - write in flowing prose.
```

**Example Output:**
```
The 12% increase in quantum computing coverage reflects heightened
investor interest following recent breakthroughs in error correction.
This upward trend suggests the technology is transitioning from pure
research to commercial viability, with mainstream outlets like Forbes
and CNBC now dedicating more editorial space to the sector. Organizations
should monitor this space closely as quantum capabilities could disrupt
cryptography and drug discovery markets within 18-24 months.
```

**Graceful Fallback Handling (v2.0):**

The AI analysis function now includes comprehensive error handling:

```typescript
async function generateProfessionalAnalysis(...): Promise<string> {
  // Check if API key is configured
  if (!process.env.OPENAI_API_KEY) {
    logger.warn(`[AI Analysis] OpenAI API key not configured - skipping AI analysis for "${keyword}"`);
    return ''; // Return empty string, email will still be sent
  }

  try {
    logger.info(`[AI Analysis] Generating analysis for "${keyword}"...`);
    const completion = await getOpenAI().chat.completions.create({...});
    const analysis = completion.choices[0]?.message?.content?.trim() || '';

    if (analysis) {
      logger.info(`[AI Analysis] Successfully generated analysis for "${keyword}" (${analysis.length} chars)`);
    } else {
      logger.warn(`[AI Analysis] OpenAI returned empty analysis for "${keyword}"`);
    }

    return analysis;
  } catch (error: any) {
    // Log detailed error but DON'T throw
    logger.error(`[AI Analysis] Failed to generate analysis for "${keyword}"`, {
      error: error.message,
      errorCode: error.code,
      errorType: error.type,
      keyword,
    });

    logger.info(`[AI Analysis] Continuing without AI analysis for "${keyword}" - email will still be sent`);
    return ''; // Return empty string instead of throwing
  }
}
```

**Benefits:**
- Email always sends even if OpenAI fails
- Detailed error logging with error codes
- User still receives valuable data (mentions, sentiment, outlets)
- Only AI analysis section is omitted from email
- No user-facing errors or failures

### Email Template

**File:** `/Users/fernandonikolic/perception/functions/src/utils/weekly-report-email.ts`

**Key Design Decisions:**

1. **Table-Based Layout** (not flexbox)
   - Reason: Better email client compatibility
   - All containers use `<table>` elements

2. **Inline Styles**
   - Reason: Most email clients strip `<style>` tags
   - All CSS is inline

3. **Gradient Backgrounds**
   - Header: Black gradient (`#000000` to `#2d2d2d`)
   - Card backgrounds: Light gray gradient
   - AI analysis box: Blue gradient (`#f0f9ff` to `#e0f2fe`)

4. **Mobile Responsiveness**
   - Max width: 600px
   - Padding adjusts for smaller screens

**HTML Structure:**

```html
<!DOCTYPE html>
<html>
<body style="background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600">
          <!-- Header -->
          <tr><td style="background: gradient...">
            <table>
              <tr><td align="center">[Logo SVG]</td></tr>
              <tr><td align="center"><h1>Perception</h1></td></tr>
              <tr><td align="center"><h2>Weekly Watchlist Report</h2></td></tr>
              <tr><td align="center"><p>Oct 14 - Oct 21, 2025</p></td></tr>
            </table>
          </td></tr>

          <!-- Greeting -->
          <tr><td>
            <p>Hi Fernando,</p>
            <p>Here's your weekly summary...</p>
          </td></tr>

          <!-- Watchlist Cards -->
          <tr><td>
            [For each watchlist item:]
            <div style="card styles...">
              <!-- Item Header -->
              <div>
                <h3>Bitcoin</h3>
                <div>↑ 12%</div>
              </div>

              <!-- Metrics Grid -->
              <div style="grid...">
                <div>This Week: 2,898</div>
                <div>Last Week: 2,587</div>
              </div>

              <!-- Sentiment Breakdown -->
              <table>
                <tr>
                  <td>✓ 32% Positive</td>
                  <td>― 46% Neutral</td>
                  <td>20% Negative</td>
                </tr>
              </table>

              <!-- Top Outlets -->
              <table>
                <tr><td>CoinDesk</td><td>67</td></tr>
                <tr><td>Bloomberg</td><td>45</td></tr>
                ...
              </table>

              <!-- AI Analysis -->
              <div style="blue gradient...">
                <div>[Lightbulb Icon] Professional Analysis</div>
                <p>[AI-generated text]</p>
              </div>
            </div>
          </td></tr>

          <!-- CTA -->
          <tr><td align="center">
            <a href="https://app.perception.to/app/watchlist">
              View full details in Perception
            </a>
          </td></tr>

          <!-- Footer -->
          <tr><td>
            <p>Perception Smart Alerts</p>
            <p>
              <a href="...">Manage preferences</a> |
              <a href="...">Unsubscribe</a>
            </p>
          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

**Color Palette:**

| Element | Color | Hex |
|---------|-------|-----|
| Background | Light Gray | `#f3f4f6` |
| Card Background | White | `#ffffff` |
| Card Border | Gray | `#e5e7eb` |
| Primary Text | Dark Gray | `#111827` |
| Secondary Text | Medium Gray | `#6b7280` |
| Success (↑) | Green | `#10b981` |
| Error (↓) | Red | `#ef4444` |
| Neutral (—) | Gray | `#6b7280` |
| AI Box Background | Light Blue Gradient | `#f0f9ff` to `#e0f2fe` |
| AI Box Border | Blue | `#bae6fd` |
| AI Box Text | Dark Blue | `#0c4a6e` |

### Firestore Schema

#### Users Collection

**Collection:** `users`
**Document ID:** User UID (e.g., `s2GeCRR0boNVEB5PXID4po3L21p2`)

**Fields:**

```typescript
{
  email: string;                     // "fernikolic@gmail.com"
  displayName?: string;              // "Fernando Nikolic"
  timezone?: string;                 // "America/Los_Angeles" (default: "America/New_York")
  weeklyReportEnabled?: boolean;     // true (default) | false
  weeklyReportDay?: number;          // 0-6 (0=Sunday, 1=Monday, etc.) - default: 1
  weeklyReportHour?: number;         // 0-23 (hour of day) - default: 9
  weeklyReportMinMentions?: number;  // Minimum mentions threshold - default: 0
  clients: Array<{                   // Watchlist items
    id: string;                      // "item-123"
    name: string;                    // "Bitcoin"
    searchTerms: string;             // "bitcoin,BTC"
    exactMatch?: boolean;            // false (default)
    topics?: string[];               // ["crypto", "finance"]
    goals?: string;                  // "Track adoption trends"
    createdAt: string;               // ISO timestamp
    logoUrl?: string;                // Optional logo
  }>;
  // ... other user fields
}
```

**Important Notes:**

1. **Legacy Documents:** Some users may have duplicate documents where the document ID is their email address (e.g., `fernikolic@gmail.com`). The system now filters these out using:
   ```typescript
   const validUserDocs = usersSnapshot.docs.filter(doc => !doc.id.includes('@'));
   ```

2. **Default Values:**
   - `weeklyReportEnabled`: `true` (enabled by default)
   - `timezone`: Auto-detected or defaults to `America/New_York`

#### Weekly Report History Collection

**Collection:** `weekly_report_history`
**Document ID:** Auto-generated

**Fields:**

```typescript
{
  userId: string;                    // User document ID
  userEmail: string;                 // User email address
  userName: string;                  // User display name
  sentAt: Timestamp;                 // Server timestamp
  weekStartDate: Timestamp;          // Start of report period
  weekEndDate: Timestamp;            // End of report period
  itemCount: number;                 // Number of watchlist items included
  reportData: Array<{                // Summary data for each item
    watchlistItemName: string;       // "Bitcoin"
    thisWeekMentions: number;        // 2898
    lastWeekMentions: number;        // 2587
    percentChange: number;           // 12.0
  }>;
  htmlContent: string;               // Full HTML email content (archived)
}
```

**Purpose:**
1. Prevent sending duplicate reports on the same day
2. Archive HTML content for in-app viewing
3. Provide report metadata for history API

**Required Composite Index:**
```json
{
  "collectionGroup": "weekly_report_history",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "userId", "order": "ASCENDING" },
    { "fieldPath": "sentAt", "order": "DESCENDING" }
  ]
}
```

**Deployment Command:**
```bash
firebase deploy --only firestore:indexes
```

**Query Example (Duplicate Check):**
```typescript
const recentReportCheck = await db
  .collection('weekly_report_history')
  .where('userId', '==', userId)
  .where('sentAt', '>=', todayMidnight)
  .limit(1)
  .get();

if (!recentReportCheck.empty) {
  // Already sent today, skip
}
```

**Query Example (Fetch History):**
```typescript
const historySnapshot = await db
  .collection('weekly_report_history')
  .where('userId', '==', userId)
  .orderBy('sentAt', 'desc')
  .limit(20)
  .get();
```

### BigQuery Integration

**Helper Function:** `queryKeywordMentions`
**File:** `/Users/fernandonikolic/perception/functions/src/utils/bigquery-helpers.ts`

**Purpose:** Query historical article data from BigQuery with automatic retry logic

**Parameters:**
- `keyword`: Search term (e.g., "bitcoin")
- `startDate`: Start of date range
- `endDate`: End of date range

**Returns:**
```typescript
{
  articles: Array<{
    title: string;
    content: string;
    date: string;
    url: string;
    outlet: string;
    sentiment: 'Positive' | 'Neutral' | 'Negative';
    // ... other fields
  }>;
  sentimentCounts: {
    positive: number;
    neutral: number;
    negative: number;
  };
}
```

**Retry Logic (v2.0):**

Wrapped in exponential backoff retry handler:

```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000,
  operationName: string = 'operation'
): Promise<T> {
  let lastError: any;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      logger.info(`[Retry] Attempting ${operationName} (attempt ${attempt}/${maxRetries})`);
      return await fn();
    } catch (error: any) {
      lastError = error;
      logger.warn(`[Retry] ${operationName} failed on attempt ${attempt}/${maxRetries}`);
      if (attempt === maxRetries) break;
      const delay = initialDelay * Math.pow(2, attempt - 1); // 1s, 2s, 4s
      logger.info(`[Retry] Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  logger.error(`[Retry] All ${maxRetries} attempts failed for ${operationName}`);
  throw lastError;
}

// Usage
return await retryWithBackoff(
  async () => {
    const [rows] = await bigquery.query(options);
    return processResults(rows);
  },
  3,              // maxRetries
  1000,           // initialDelay (1 second)
  `BigQuery query for keyword "${keyword}"`
);
```

**Benefits:**
- Handles transient network failures
- Exponential backoff prevents overwhelming BigQuery
- Detailed logging for each attempt
- Throws error only after all retries exhausted

**Example Query:**
```sql
SELECT
  title,
  content,
  date,
  url,
  outlet,
  sentiment
FROM
  `perception-app-3db34.news_data.articles`
WHERE
  LOWER(title) LIKE '%bitcoin%'
  OR LOWER(content) LIKE '%bitcoin%'
  AND date BETWEEN '2025-10-14' AND '2025-10-21'
ORDER BY date DESC
```

### Environment Variables & Secrets

**Required Secrets (Cloud Functions):**

1. **BREVO_API_KEY**
   - Service: Brevo (email delivery)
   - Storage: Cloud Secret Manager
   - Access: `firebase functions:secrets:access BREVO_API_KEY`

2. **OPENAI_API_KEY**
   - Service: OpenAI GPT-4o
   - Storage: Cloud Secret Manager
   - Access: `firebase functions:secrets:access OPENAI_API_KEY`

3. **GCLOUD_PROJECT**
   - Value: `perception-app-3db34`
   - Set automatically by Firebase

**Local Testing:**

For local testing with `test-weekly-report.cjs`:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
export BREVO_API_KEY="xkeysib-..."
export OPENAI_API_KEY="sk-proj-..."
node test-weekly-report.cjs
```

---

## File Structure

### Cloud Functions

```
functions/
├── src/
│   ├── weekly-watchlist-reports.ts        # Main scheduler function
│   ├── weekly-report-history-api.ts       # NEW: Report history API endpoints
│   ├── utils/
│   │   ├── weekly-report-email.ts         # Email template generator (returns HTML)
│   │   └── bigquery-helpers.ts            # BigQuery data fetching (with retry)
│   ├── config/
│   │   └── feature-limits.ts              # Tier limits (copied from root)
│   └── index.ts                           # Exports all functions
├── lib/                                   # Compiled JavaScript (gitignored)
├── package.json
├── tsconfig.json
└── bitcoin-data-chat-key.json            # Service account key (gitignored)
```

### Frontend

```
src/
├── components/
│   └── dashboard/
│       └── pages/
│           ├── weekly-reports.tsx         # NEW: Report history page
│           └── settings/
│               └── notifications.tsx      # Settings UI with all preferences
├── pages/
│   └── personalized-home.tsx             # Intelligence page with stats card
├── routes.tsx                            # Route definitions
├── hooks/
│   ├── use-watchlist.ts                   # Fetch watchlist items
│   └── use-enhanced-watchlist.ts          # Enhanced watchlist data
└── lib/
    └── firebase/
        └── config.ts                      # Firestore config
```

### Documentation

```
docs/
└── weekly-watchlist-reports.md            # This file
```

### Test Scripts

```
Root directory:
├── test-weekly-report.cjs                 # Manual test script
├── check-user-watchlist.cjs               # Debug: View user watchlist
├── add-temp-test-item.cjs                 # Debug: Add test data
├── clear-test-watchlist.cjs               # Debug: Clear test data
├── check-all-watchlist-data.cjs           # Debug: View all user data
├── find-all-user-docs.cjs                 # Debug: Find duplicate docs
└── delete-duplicate-user-doc.cjs          # Debug: Clean up duplicates
```

---

## Configuration

### Cloud Scheduler Jobs

**Job Name:** `firebase-schedule-sendWeeklyWatchlistReports-us-central1`

**Configuration:**
- **Schedule:** `every hour` (UTC)
- **Timezone:** UTC
- **Target:** Cloud Function `sendWeeklyWatchlistReports`
- **Region:** us-central1
- **State:** ENABLED

**View in Console:**
```bash
gcloud scheduler jobs list \
  --project=perception-app-3db34 \
  --location=us-central1 \
  | grep weekly
```

### Cloud Functions Configuration

**Function:** `sendWeeklyWatchlistReports`

```typescript
{
  schedule: 'every hour',
  timeZone: 'UTC',
  region: 'us-central1',
  memory: '512MiB',
  maxInstances: 5,
  runtime: 'nodejs18',
  secrets: ['BREVO_API_KEY', 'OPENAI_API_KEY']
}
```

**Deployment Command:**
```bash
firebase deploy --only functions:sendWeeklyWatchlistReports --project perception-app-3db34
```

### Settings Form Schema

**File:** `/Users/fernandonikolic/perception/src/components/dashboard/pages/settings/notifications.tsx`

```typescript
const notificationsFormSchema = z.object({
  weeklyReportEnabled: z.boolean().default(true),
  timezone: z.string().default('America/New_York'),
  // ... other notification settings
});
```

**Timezone Options:**

```typescript
const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Phoenix', label: 'Arizona (MST)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HST)' },
  { value: 'UTC', label: 'UTC' },
];
```

---

## Deployment

### Prerequisites

1. **Firebase CLI** installed and authenticated
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Service Account Key** in place
   - File: `functions/bitcoin-data-chat-key.json`
   - Permissions: Firestore, BigQuery, Secret Manager

3. **Secrets Configured**
   ```bash
   firebase functions:secrets:set BREVO_API_KEY --project perception-app-3db34
   firebase functions:secrets:set OPENAI_API_KEY --project perception-app-3db34
   ```

### Deployment Steps

#### 1. Build Functions

```bash
cd /Users/fernandonikolic/perception/functions
npm run build
```

**Expected Output:**
```
> functions@1.0.0 build
> tsc
```

**Verify Build:**
```bash
ls -la lib/weekly-watchlist-reports.js
# Should show compiled JavaScript file
```

#### 2. Deploy to Production

**Deploy Specific Function:**
```bash
firebase deploy \
  --only functions:sendWeeklyWatchlistReports \
  --project perception-app-3db34
```

**Deploy All Functions:**
```bash
firebase deploy --only functions --project perception-app-3db34
```

**Expected Output:**
```
=== Deploying to 'perception-app-3db34'...

i  deploying functions
✔  functions: Loaded environment variables from .env.
i  functions: preparing functions directory for uploading...
i  functions: packaged functions (1.69 MB) for uploading
✔  functions: functions folder uploaded successfully

i  functions: updating Node.js 18 (2nd Gen) function
   sendWeeklyWatchlistReports(us-central1)...
✔  functions[sendWeeklyWatchlistReports(us-central1)]
   Successful update operation.

✔  Deploy complete!
```

#### 3. Verify Deployment

**Check Function Status:**
```bash
firebase functions:list --project perception-app-3db34 | grep weekly
```

**Expected Output:**
```
│ sendWeeklyWatchlistReports  │ v2  │ scheduled  │ us-central1 │ 512 │ nodejs18 │
│ sendWeeklyReportsManual     │ v2  │ scheduled  │ us-central1 │ 256 │ nodejs18 │
```

**Check Scheduler Jobs:**
```bash
gcloud scheduler jobs list \
  --project=perception-app-3db34 \
  --location=us-central1 \
  | grep weekly
```

**Expected Output:**
```
firebase-schedule-sendWeeklyWatchlistReports-us-central1
  us-central1  every hour (UTC)  HTTP  ENABLED

firebase-schedule-sendWeeklyReportsManual-us-central1
  us-central1  every 24 hours (UTC)  HTTP  ENABLED
```

#### 4. Monitor Logs

**View Function Logs:**
```bash
firebase functions:log --project perception-app-3db34 --only sendWeeklyWatchlistReports
```

**Or via gcloud:**
```bash
gcloud functions logs read sendWeeklyWatchlistReports \
  --region=us-central1 \
  --project=perception-app-3db34 \
  --limit=50
```

**Key Log Messages to Look For:**

```
✅ Success:
"🔍 Checking for users who should receive weekly reports..."
"✅ Sent weekly report to user@example.com"
"✅ Weekly report processing complete. Processed: X, Sent: Y"

⚠️ Expected Skips:
"Skipping: Not Monday"
"Already sent weekly report to userID today"

❌ Errors:
"❌ Error in weekly report processing: [error details]"
"Failed to send weekly report to user@example.com: [error]"
```

### Rollback Procedure

If something goes wrong:

**1. Disable the Scheduler**
```bash
gcloud scheduler jobs pause \
  firebase-schedule-sendWeeklyWatchlistReports-us-central1 \
  --location=us-central1 \
  --project=perception-app-3db34
```

**2. Revert to Previous Version**
```bash
# Check deployment history
firebase functions:list --project perception-app-3db34

# Delete current version
firebase functions:delete sendWeeklyWatchlistReports \
  --region us-central1 \
  --project perception-app-3db34

# Redeploy from previous commit
git checkout <previous-commit-hash>
firebase deploy --only functions:sendWeeklyWatchlistReports
```

**3. Re-enable Scheduler**
```bash
gcloud scheduler jobs resume \
  firebase-schedule-sendWeeklyWatchlistReports-us-central1 \
  --location=us-central1 \
  --project=perception-app-3db34
```

---

## Testing

### Manual Test Script

**File:** `test-weekly-report.cjs`

**Usage:**
```bash
cd /Users/fernandonikolic/perception

# Set environment variables
export GOOGLE_APPLICATION_CREDENTIALS="./functions/bitcoin-data-chat-key.json"
export BREVO_API_KEY="xkeysib-..."
export OPENAI_API_KEY="sk-proj-..."

# Run test
node test-weekly-report.cjs
```

**What It Does:**
1. Connects to Firestore
2. Gets your user document (by UID: `s2GeCRR0boNVEB5PXID4po3L21p2`)
3. Fetches your watchlist items
4. Queries BigQuery for past 7 days of data
5. Generates AI analysis for each item
6. Sends email via Brevo
7. Outputs results to console

**Expected Output:**
```
📧 Testing Weekly Watchlist Report...

✅ Found user: fernikolic@gmail.com
👤 Display name: Fernando Nikolic
🌍 Timezone: America/Los_Angeles
📊 Watchlist items: 3

Watchlist items:
  1. Treasuries (treasury, treasuries)
  2. AI (AI, artificial intelligence)
  3. Quantum (QC, quantum, quantum computing)

📅 Report period: 10/14/2025 - 10/21/2025

📊 Fetching data for "Treasuries"...
  ✅ 287 mentions (-8% vs last week)
  🤖 Generating AI analysis...
  ✅ AI analysis generated

📊 Fetching data for "AI"...
  ✅ 196 mentions (-15% vs last week)
  🤖 Generating AI analysis...
  ✅ AI analysis generated

📊 Fetching data for "Quantum"...
  ✅ 28 mentions (+12% vs last week)
  🤖 Generating AI analysis...
  ✅ AI analysis generated

✅ Successfully gathered data for 3 watchlist items

📧 Sending email...

✅ Weekly report email sent successfully!
📬 Check your inbox at: fernikolic@gmail.com
```

### Unit Testing (Future Enhancement)

**Recommended Test Cases:**

1. **Timezone Calculation**
   ```typescript
   describe('getCurrentHourInTimezone', () => {
     it('should return correct hour for LA timezone', () => {
       // Test implementation
     });
   });
   ```

2. **Duplicate Detection**
   ```typescript
   describe('Weekly Report History', () => {
     it('should not send duplicate reports on same day', () => {
       // Test implementation
     });
   });
   ```

3. **Email Generation**
   ```typescript
   describe('generateWeeklyReportHTML', () => {
     it('should generate valid HTML', () => {
       // Test implementation
     });
   });
   ```

### Integration Testing

**Test Scenarios:**

| Scenario | Expected Behavior |
|----------|-------------------|
| User has no watchlist items | Skip, don't send email |
| User disabled reports | Skip, don't send email |
| Not Monday | Skip all users |
| User timezone not 9am | Skip user |
| Already sent today | Skip user |
| Valid user at 9am Monday | Send email, record in history |
| BigQuery returns no data | Send email with 0 mentions |
| OpenAI API fails | Send email without AI analysis |
| Email delivery fails | Log error, don't record in history |

---

## Troubleshooting

### Common Issues

#### 1. **No Emails Being Sent**

**Symptoms:**
- It's Monday but no emails arrive
- Logs show "Skipping: Not Monday" even on Monday

**Diagnosis:**
```bash
# Check if scheduler is running
gcloud scheduler jobs list \
  --project=perception-app-3db34 \
  --location=us-central1

# Check function logs
firebase functions:log --only sendWeeklyWatchlistReports
```

**Possible Causes & Fixes:**

| Cause | Fix |
|-------|-----|
| Scheduler paused | `gcloud scheduler jobs resume firebase-schedule-sendWeeklyWatchlistReports-us-central1 --location=us-central1` |
| Function checking UTC day, not local | This is expected - function runs every hour and checks user timezones |
| User timezone not set | User should set timezone in Settings > Notifications |
| `weeklyReportEnabled` is false | User should enable in Settings > Notifications |
| No watchlist items | User needs to add items in Intelligence page |

#### 2. **Duplicate Emails**

**Symptoms:**
- User receives same report multiple times in one day

**Diagnosis:**
```bash
# Check weekly_report_history collection
node check-weekly-history.cjs  # Create this script if needed
```

**Possible Causes & Fixes:**

| Cause | Fix |
|-------|-----|
| History check failing | Verify Firestore permissions |
| Multiple user documents | Delete duplicate doc (email-based ID) |
| Race condition | Unlikely with current implementation, but add transaction if needed |

#### 3. **Wrong Watchlist Items**

**Symptoms:**
- Email shows different items than what user sees in UI
- Email shows test data (Bitcoin, MicroStrategy)

**Diagnosis:**
```bash
# Check for duplicate user documents
node find-all-user-docs.cjs
```

**Possible Causes & Fixes:**

| Cause | Fix |
|-------|-----|
| Duplicate user doc (email as ID) | Delete the email-based doc: `node delete-duplicate-user-doc.cjs` |
| Function querying wrong doc | Function now filters out email-based IDs: `docs.filter(doc => !doc.id.includes('@'))` |
| Cache issue | Clear and redeploy function |

#### 4. **Missing AI Analysis**

**Symptoms:**
- Email shows data but no AI analysis section

**Diagnosis:**
```bash
# Check OpenAI API key
firebase functions:secrets:access OPENAI_API_KEY

# Check function logs for OpenAI errors
firebase functions:log --only sendWeeklyWatchlistReports | grep -i "openai\|analysis"
```

**Possible Causes & Fixes:**

| Cause | Fix |
|-------|-----|
| OpenAI API key not set | `firebase functions:secrets:set OPENAI_API_KEY` |
| OpenAI API quota exceeded | Check OpenAI dashboard, upgrade plan |
| OpenAI API error | Check logs, implement retry logic |
| `OPENAI_API_KEY` env var not set | Ensure secret is configured in Cloud Function |

#### 5. **Email Formatting Issues**

**Symptoms:**
- Email looks broken in certain email clients
- Spacing is off
- Colors don't render

**Diagnosis:**
- Test in multiple email clients (Gmail, Outlook, Apple Mail)
- Use email testing tool like Litmus or Email on Acid

**Possible Causes & Fixes:**

| Cause | Fix |
|-------|-----|
| Using flexbox | ✅ Already fixed - using table-based layout |
| Using external CSS | ✅ Already fixed - all inline styles |
| Unsupported HTML tags | Stick to basic tags: table, tr, td, div, p, a, h1-h3 |
| Missing DOCTYPE | ✅ Already included: `<!DOCTYPE html>` |

#### 6. **Timezone Issues**

**Symptoms:**
- Email arrives at wrong time
- User says it's 9am but no email

**Diagnosis:**
```bash
# Check user's saved timezone
node check-user-watchlist.cjs
```

**Possible Causes & Fixes:**

| Cause | Fix |
|-------|-----|
| User timezone not set | Defaults to `America/New_York` |
| User set wrong timezone | User should update in Settings |
| Daylight saving time | `Intl.DateTimeFormat` handles this automatically |
| User timezone not in supported list | Add to `TIMEZONE_OPTIONS` array |

### Debug Scripts

#### Check User Watchlist
```bash
node check-user-watchlist.cjs
```

**Shows:**
- User's watchlist items (`userData.clients`)
- Active keyword alerts
- User document location

#### Find Duplicate User Documents
```bash
node find-all-user-docs.cjs
```

**Shows:**
- All user documents matching email
- Document IDs (email vs. UID)
- Watchlist items in each doc

#### Delete Duplicate Document
```bash
node delete-duplicate-user-doc.cjs
```

**Deletes:**
- User document with email as ID (legacy)
- Keeps UID-based document (correct one)

### Monitoring & Alerts

**Key Metrics to Monitor:**

1. **Success Rate**
   - Expected: 90%+ of eligible users receive emails
   - Alert if: < 80% success rate

2. **Delivery Time**
   - Expected: Within 5 minutes of 9am local time
   - Alert if: > 15 minutes delay

3. **Error Rate**
   - Expected: < 5% of executions have errors
   - Alert if: > 10% error rate

4. **Cost**
   - Expected: ~$0.10-0.50 per week (for 100 users)
   - Alert if: Sudden spike > 500%

**Recommended Monitoring Setup:**

1. **Cloud Monitoring Dashboard**
   - Function invocations per hour
   - Error rate
   - Execution time (p50, p95, p99)
   - Memory usage

2. **Email Alerts**
   - Set up alerts for function failures
   - Alert on Brevo API errors
   - Alert on OpenAI API errors

3. **Weekly Manual Check**
   - Verify own email received
   - Check a few other users
   - Review logs for patterns

---

## Future Enhancements

### Completed in v2.0 ✅

1. ~~**Fix Email Links**~~ ✅
   - ✅ Updated to `https://app.perception.to/app/settings/notifications`
   - ✅ Implemented proper unsubscribe with query parameter

2. ~~**Better Error Handling**~~ ✅
   - ✅ Exponential backoff retry logic for BigQuery (3 attempts)
   - ✅ Graceful fallback if OpenAI fails (email sends without AI analysis)
   - ✅ Enhanced logging with user context and operation details

3. ~~**Report History Archive**~~ ✅
   - ✅ Store HTML of sent emails in Firestore
   - ✅ In-app "Weekly Reports" page to view past reports
   - ✅ API endpoints for fetching history and content
   - ✅ Up to 20 most recent reports displayed

4. ~~**Email Preferences**~~ ✅
   - ✅ Choose day of week (Sunday-Saturday)
   - ✅ Choose delivery time (12am-11pm, 24 hour options)
   - ✅ Set minimum mention threshold (only send if items meet criteria)

5. ~~**Global Timezone Support**~~ ✅
   - ✅ Expanded from 8 to 70+ timezones
   - ✅ Organized by region (UTC, Americas, Europe, Asia, etc.)
   - ✅ City-based labels for clarity

### Short-Term (Next Month)

1. **Send Test Report Button**
   - Add button in Settings UI: "Send Test Report Now"
   - Allows users to preview without waiting for scheduled time
   - Bypasses duplicate check

2. **Enhanced Metrics**
   - Trending authors/journalists
   - Geographic distribution
   - Article type breakdown (news, analysis, opinion)

3. **A/B Testing**
   - Test different email formats
   - Test different subject lines
   - Optimize for open rates and click-through

### Long-Term (3-6 Months)

1. **Additional Frequencies**
   - Daily watchlist report
   - Monthly watchlist report
   - Quarterly watchlist report

2. **In-App Version**
   - Dashboard widget showing weekly summary
   - Push notifications
   - Slack/Teams integration

3. **Customization**
   - Choose which sections to include
   - Custom branding for agencies
   - White-label options

4. **Advanced Analytics**
   - Share of voice vs. competitors
   - Prediction models (will coverage increase?)
   - Anomaly detection (unusual spike/drop)

5. **Multi-Language Support**
   - Translate emails to user's preferred language
   - Support non-English news sources

6. **API Access**
   - Programmatic access to weekly data
   - Webhooks for report generation
   - Export to CSV/PDF

---

## Appendix

### Related Features

**Smart Alerts** (separate from Weekly Reports)
- **Purpose:** Real-time conditional notifications
- **Frequencies:** 15m, 30m, 1h, 6h, 24h (Premium)
- **Trigger:** Only when conditions met (volume spike, sentiment shift)
- **File:** `/Users/fernandonikolic/perception/functions/src/alert-processor.ts`

**Weekly Digest** (placeholder, not active)
- **Purpose:** General market insights
- **Status:** Code exists but not scheduled
- **File:** `/Users/fernandonikolic/perception/functions/src/utils/email.ts`

### Key Learnings

1. **Lazy Initialization Critical**
   - Firebase Admin must not initialize at module load time
   - Use `getDb()` function instead of `const db = admin.firestore()`
   - Prevents deployment errors

2. **Email-Compatible HTML**
   - Always use table-based layouts
   - Inline all styles
   - Test in multiple email clients

3. **Timezone Handling**
   - Running every hour is more reliable than complex cron
   - `Intl.DateTimeFormat` handles DST automatically
   - Always store timezone in user preferences

4. **Duplicate Prevention**
   - Always check history before sending
   - Use server timestamps for consistency
   - Filter out legacy documents

5. **Cost Optimization**
   - Exit early (Monday check at start)
   - Batch process users
   - Cache expensive queries when possible

### Contact & Support

**Project Owner:** Fernando Nikolic
**Email:** fernikolic@gmail.com
**Last Updated:** December 12, 2025

**For Issues:**
1. Check logs first
2. Review troubleshooting section
3. Run debug scripts
4. Contact project owner

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Oct 21, 2025 | Initial release with full implementation |
| 2.0 | Oct 21, 2025 | Major enhancements: report history archive, customizable delivery (day/time/threshold), global timezone support, error handling improvements, API endpoints for history/content viewing, navigation integration |
| 2.1 | Dec 12, 2025 | Added email frequency control to Settings. Users can now choose Off, Weekly Only, or Real-time + Weekly. Fixed `processWatchlistAlerts` missing BREVO_API_KEY secret. |

---

## Related: Watchlist Alert Emails

As of December 2025, users can control their watchlist email preferences via a new "Watchlist Alert Emails" dropdown in Settings > Notifications:

| Option | Description |
|--------|-------------|
| **Off** | No alert emails (only manual reports in dashboard) |
| **Weekly Only** | Weekly summary reports only (this system) |
| **Real-time + Weekly** | Instant alerts for breaking news, spikes, anomalies + weekly reports |

The `emailFrequency` setting is stored at `persona.communicationPreferences.emailFrequency` in Firestore.

**See:** [December 2025 Updates](../changelog/DECEMBER_2025_UPDATES.md)

---

**End of Documentation**
