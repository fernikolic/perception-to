#!/bin/bash
# Schedule remaining warm-up days via cron

PROJECT_DIR="/Users/fernandonikolic/bitcoin-perception"
SCRIPT="node $PROJECT_DIR/scripts/ghost-selfhost/send-newsletter-mailgun.cjs"
LOG_DIR="$PROJECT_DIR/scripts/ghost-selfhost"

# Remove any existing mailgun cron jobs
crontab -l 2>/dev/null | grep -v "send-newsletter-mailgun" > /tmp/current_cron

# Add new scheduled jobs (running at 00:30 each day to be safe)
cat >> /tmp/current_cron << 'CRON'
# Mailgun warm-up Day 2 - Jan 11, 2026 at 00:30
30 0 11 1 * cd /Users/fernandonikolic/bitcoin-perception && /Users/fernandonikolic/.nvm/versions/node/v18.18.0/bin/node scripts/ghost-selfhost/send-newsletter-mailgun.cjs --resume --limit=10 >> scripts/ghost-selfhost/day2-send.log 2>&1

# Mailgun warm-up Day 3 - Jan 12, 2026 at 00:30
30 0 12 1 * cd /Users/fernandonikolic/bitcoin-perception && /Users/fernandonikolic/.nvm/versions/node/v18.18.0/bin/node scripts/ghost-selfhost/send-newsletter-mailgun.cjs --resume --limit=20 >> scripts/ghost-selfhost/day3-send.log 2>&1

# Mailgun warm-up Day 4 - Jan 13, 2026 at 00:30
30 0 13 1 * cd /Users/fernandonikolic/bitcoin-perception && /Users/fernandonikolic/.nvm/versions/node/v18.18.0/bin/node scripts/ghost-selfhost/send-newsletter-mailgun.cjs --resume --limit=40 >> scripts/ghost-selfhost/day4-send.log 2>&1

# Mailgun warm-up Day 5 - Jan 14, 2026 at 00:30 (send all remaining)
30 0 14 1 * cd /Users/fernandonikolic/bitcoin-perception && /Users/fernandonikolic/.nvm/versions/node/v18.18.0/bin/node scripts/ghost-selfhost/send-newsletter-mailgun.cjs --resume >> scripts/ghost-selfhost/day5-send.log 2>&1
CRON

# Install the new crontab
crontab /tmp/current_cron

echo "Cron jobs scheduled:"
crontab -l | grep -A1 "Mailgun"
