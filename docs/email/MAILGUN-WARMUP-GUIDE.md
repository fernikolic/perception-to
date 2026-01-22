# Mailgun Warm-up & Newsletter Sending Guide

This document covers the setup for sending newsletters directly via Mailgun API, bypassing Ghost's batch limitations during the Mailgun probation period.

## Background

### The Problem

Mailgun placed our account on probation (evaluation period) which enforces:
- **Maximum 100 messages per hour**
- **Maximum 9 recipients per message**
- **Disabled email validations**

Ghost CMS tries to send newsletters in larger batches, which Mailgun blocks with error:
```
Mailgun Error 403: Domain perception.to is not allowed to send large batches yet
```

### The Solution

1. Created member batches of 8 recipients each (under the 9-recipient limit)
2. Built a direct Mailgun API sender script that respects rate limits
3. Implemented a 5-day warm-up schedule to build sending reputation

## Scripts Overview

All scripts are located in `scripts/ghost-selfhost/`:

| Script | Purpose |
|--------|---------|
| `create-member-batches.cjs` | Creates batch labels for Ghost members |
| `send-newsletter-mailgun.cjs` | Sends newsletters directly via Mailgun API |
| `duplicate-post-batches.cjs` | Creates duplicate Ghost posts for each batch |
| `schedule-warmup.sh` | Sets up cron jobs for automated warm-up |

## Configuration

### Environment Variables

Add to `.env`:
```bash
# Ghost CMS
GHOST_URL=https://cms.perception.to
GHOST_ADMIN_API_KEY=your_ghost_admin_api_key

# Mailgun
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=perception.to
```

### Current Settings (in send-newsletter-mailgun.cjs)

```javascript
// Conservative warm-up settings
const MAX_MESSAGES_PER_HOUR = 60;  // Under Mailgun's 100 limit
const DELAY_BETWEEN_SENDS_MS = 60000;  // 60 seconds between sends

// Newsletter settings
const FROM_NAME = 'Perception';
const FROM_EMAIL = 'letters@perception.to';
```

## Member Batches

### Creating Batches

```bash
# Create batches of 8 members each (default for Mailgun probation)
node scripts/ghost-selfhost/create-member-batches.cjs --batch-size=8

# Preview without making changes
node scripts/ghost-selfhost/create-member-batches.cjs --batch-size=8 --dry-run

# Remove all batch labels
node scripts/ghost-selfhost/create-member-batches.cjs --cleanup
```

### Current State

- **1,018 total members**
- **128 batches** (batch-1 through batch-128)
- **8 members per batch** (last batch has 2)
- Members sorted by engagement (most engaged first)

## Sending Newsletters

### Direct Mailgun Sender

The `send-newsletter-mailgun.cjs` script sends emails directly via Mailgun API, bypassing Ghost.

#### Usage

```bash
# Send a test email first
node scripts/ghost-selfhost/send-newsletter-mailgun.cjs --test-email=your@email.com

# Preview what would be sent (no actual sending)
node scripts/ghost-selfhost/send-newsletter-mailgun.cjs --dry-run --limit=5

# Send with a batch limit (for warm-up)
node scripts/ghost-selfhost/send-newsletter-mailgun.cjs --limit=10

# Resume from last progress
node scripts/ghost-selfhost/send-newsletter-mailgun.cjs --resume --limit=20

# Send all remaining batches
node scripts/ghost-selfhost/send-newsletter-mailgun.cjs --resume
```

#### Options

| Option | Description |
|--------|-------------|
| `--dry-run` | Preview without sending |
| `--resume` | Continue from last saved progress |
| `--limit=N` | Only send N batches |
| `--batch=N` | Start from specific batch number |
| `--test-email=X` | Send test to single email |

### Progress Tracking

Progress is saved to `scripts/ghost-selfhost/send-progress.json`:

```json
{
  "lastBatch": 5,
  "sentEmails": ["email1@example.com", "..."],
  "startedAt": "2026-01-09T15:13:34.941Z"
}
```

## Warm-up Schedule

### Recommended 5-Day Schedule

| Day | Date | Batches | Emails | Command |
|-----|------|---------|--------|---------|
| 1 | Jan 10 | 5 | ~40 | `--limit=5` |
| 2 | Jan 11 | 10 | ~80 | `--resume --limit=10` |
| 3 | Jan 12 | 20 | ~160 | `--resume --limit=20` |
| 4 | Jan 13 | 40 | ~320 | `--resume --limit=40` |
| 5 | Jan 14 | 53 | ~418 | `--resume` |

### Automated Scheduling

Cron jobs were set up to run at 00:30 JST each day:

```bash
# View scheduled jobs
crontab -l | grep -A1 "Mailgun"

# Remove scheduled jobs
crontab -e  # then delete the Mailgun lines
```

### If You Miss a Day

Cron doesn't catch up on missed jobs. If your Mac was off/asleep:

1. Check which days ran:
   ```bash
   ls -la scripts/ghost-selfhost/day*.log
   ```

2. Run manually:
   ```bash
   node scripts/ghost-selfhost/send-newsletter-mailgun.cjs --resume --limit=10
   ```

The script will resume from wherever it left off.

## Email Template

### Features

- **HTML + Plain Text** (multipart) - Better deliverability
- **Inline CSS** - Works across all email clients
- **Table-based layout** - Consistent rendering
- **Working logo** - `https://perception.to/logos/perception-logo-light.png`
- **List-Unsubscribe header** - One-click unsubscribe
- **Reply-To header** - fernando@btcperception.com
- **Tracking** - Opens and clicks tracked in Mailgun

### Customizing

Edit the `buildEmailHtml()` and `buildEmailText()` functions in `send-newsletter-mailgun.cjs`.

## Monitoring

### Log Files

```bash
# Day 1 log
cat scripts/ghost-selfhost/day1-send.log

# Day 2-5 logs (created by cron)
cat scripts/ghost-selfhost/day2-send.log
cat scripts/ghost-selfhost/day3-send.log
cat scripts/ghost-selfhost/day4-send.log
cat scripts/ghost-selfhost/day5-send.log
```

### Mailgun Dashboard

- **Logs**: https://app.mailgun.com/app/logs
- **Analytics**: https://app.mailgun.com/app/analytics
- **Domains**: https://app.mailgun.com/app/sending/domains

### Check Progress

```bash
cat scripts/ghost-selfhost/send-progress.json
```

## After Warm-up

Once the 5-day warm-up is complete:

1. **Reply to Mailgun support ticket** requesting removal of sending limitations
2. **Wait for confirmation** that probation is lifted
3. **Future newsletters** can be sent via Ghost normally, or continue using this script

### Adjusting for Normal Sending

After probation is lifted, you can increase the rate in `send-newsletter-mailgun.cjs`:

```javascript
// Normal sending (after probation)
const MAX_MESSAGES_PER_HOUR = 100;
const DELAY_BETWEEN_SENDS_MS = 36000;  // 36 seconds
```

## Troubleshooting

### "Mailgun Error 403"

Account still on probation. Continue with warm-up schedule.

### "jwt expired" errors in Ghost logs

Clock sync issue between your machine and Ghost server. The scripts handle this automatically.

### Emails not appearing in Mailgun logs

Check:
1. API key is correct in `.env`
2. Domain matches Mailgun dashboard
3. Script output for errors

### Cron job didn't run

1. Mac was asleep at scheduled time
2. Run manually: `node scripts/ghost-selfhost/send-newsletter-mailgun.cjs --resume --limit=N`

### Resuming from a specific batch

```bash
node scripts/ghost-selfhost/send-newsletter-mailgun.cjs --batch=50 --limit=10
```

## Related Files

- `scripts/ghost-selfhost/send-progress.json` - Current progress
- `scripts/ghost-selfhost/engaged-emails.txt` - List of engaged subscribers (>40% open rate)
- `scripts/ghost-selfhost/open-rates.json` - Historical open rate data
- `.env` - API keys and configuration

## Mailgun Best Practices Implemented

| Practice | Status |
|----------|--------|
| Max 100 messages/hour | ✅ 60/hour (conservative) |
| Max 9 recipients/message | ✅ 8 per batch |
| HTML + Plain text | ✅ Both versions sent |
| List-Unsubscribe header | ✅ One-click unsubscribe |
| Reply-To header | ✅ fernando@btcperception.com |
| Tracking enabled | ✅ Opens and clicks |
| Unsubscribe in footer | ✅ Mailgun's %unsubscribe_url% |
| Double opt-in recipients | ✅ Collected via perception.to |

## Support

- **Mailgun Support**: https://app.mailgun.com/support
- **Ghost Documentation**: https://ghost.org/docs/
- **Current Mailgun Ticket**: #3873031
