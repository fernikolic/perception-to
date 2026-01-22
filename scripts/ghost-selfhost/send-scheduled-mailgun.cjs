/**
 * Scheduled Mailgun Send for Missed Recipients
 *
 * Sends newsletter to recipients who missed the original send.
 * Uses Mailgun's scheduled delivery feature.
 *
 * Usage:
 *   node scripts/ghost-selfhost/send-scheduled-mailgun.cjs [options]
 *
 * Options:
 *   --dry-run       Preview without sending
 *   --now           Send immediately instead of scheduled time
 */

require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// ======================
// CONFIGURATION
// ======================
const GHOST_URL = process.env.GHOST_URL;
const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY;
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || 'perception.to';

const ORIGINAL_POST_ID = '69677149ec37692f72a5b602'; // Standing on a Shrinking Island
const RECIPIENTS_FILE = path.join(__dirname, 'missed-recipients.json');

// Scheduled time: January 20, 2026 at 09:00 AM PST = 17:00 UTC
const SCHEDULED_TIME = new Date('2026-01-20T17:00:00Z');

// Newsletter settings
const FROM_NAME = 'Perception';
const FROM_EMAIL = 'letters@perception.to';

// Parse CLI arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const SEND_NOW = args.includes('--now');

// ======================
// GHOST API
// ======================
let serverTimeOffset = 0;

async function syncServerTime() {
  const response = await fetch(`${GHOST_URL}/ghost/api/admin/site/`, { method: 'HEAD' });
  const serverDate = response.headers.get('date');
  if (serverDate) {
    const serverTime = Math.floor(new Date(serverDate).getTime() / 1000);
    const localTime = Math.floor(Date.now() / 1000);
    serverTimeOffset = serverTime - localTime;
  }
}

function generateGhostToken() {
  const [id, secret] = GHOST_ADMIN_API_KEY.split(':');
  const now = Math.floor(Date.now() / 1000) + serverTimeOffset;
  return jwt.sign({ iat: now, exp: now + 300, aud: '/admin/' }, Buffer.from(secret, 'hex'), { keyid: id, algorithm: 'HS256' });
}

async function ghostApi(endpoint) {
  const response = await fetch(`${GHOST_URL}/ghost/api/admin${endpoint}`, {
    headers: {
      'Authorization': `Ghost ${generateGhostToken()}`,
      'Accept-Version': 'v5.0'
    }
  });
  if (!response.ok) throw new Error(`Ghost API error: ${response.status}`);
  return response.json();
}

async function getPostContent() {
  await syncServerTime();
  const data = await ghostApi(`/posts/${ORIGINAL_POST_ID}/?formats=html`);
  const post = data.posts[0];
  return {
    title: post.title,
    html: post.html,
    featureImage: post.feature_image,
    excerpt: post.excerpt || post.custom_excerpt || '',
    url: `https://perception.to/bitcoin-media-research/${post.slug}`
  };
}

// ======================
// MAILGUN API
// ======================
async function sendViaMailgun(to, subject, html, text, scheduledTime = null) {
  const formData = new URLSearchParams();

  formData.append('from', `${FROM_NAME} <${FROM_EMAIL}>`);
  formData.append('to', Array.isArray(to) ? to.join(',') : to);
  formData.append('subject', subject);
  formData.append('html', html);
  formData.append('text', text);

  // Schedule delivery if time provided
  if (scheduledTime) {
    // Mailgun accepts RFC 2822 format or Unix timestamp
    formData.append('o:deliverytime', scheduledTime.toUTCString());
  }

  // Headers
  formData.append('h:Reply-To', 'fernando@btcperception.com');
  formData.append('h:List-Unsubscribe', '<%unsubscribe_url%>');
  formData.append('h:List-Unsubscribe-Post', 'List-Unsubscribe=One-Click');

  // Tracking
  formData.append('o:tracking', 'yes');
  formData.append('o:tracking-clicks', 'yes');
  formData.append('o:tracking-opens', 'yes');

  // Tags
  formData.append('o:tag', 'newsletter');
  formData.append('o:tag', 'standing-shrinking-island');
  formData.append('o:tag', 'catch-up-send');

  const response = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64')
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Mailgun error ${response.status}: ${error}`);
  }

  return response.json();
}

// ======================
// EMAIL TEMPLATE (same as original)
// ======================
function htmlToText(html) {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, '\n\n$1\n\n')
    .replace(/<p[^>]*>/gi, '\n\n')
    .replace(/<\/p>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '$2 ($1)')
    .replace(/<li[^>]*>/gi, '\n• ')
    .replace(/<\/li>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function buildEmailHtml(post) {
  const styledHtml = post.html
    .replace(/<a /g, '<a style="color: #f7931a; text-decoration: underline;" ')
    .replace(/<img /g, '<img style="max-width: 100%; height: auto; border-radius: 4px;" ')
    .replace(/<p>/g, '<p style="margin: 0 0 16px 0; line-height: 1.7;">')
    .replace(/<h2>/g, '<h2 style="margin: 32px 0 16px 0; font-size: 24px; font-weight: 600; color: #1a1a1a;">')
    .replace(/<h3>/g, '<h3 style="margin: 24px 0 12px 0; font-size: 20px; font-weight: 600; color: #1a1a1a;">')
    .replace(/<blockquote>/g, '<blockquote style="margin: 20px 0; padding: 16px 20px; border-left: 4px solid #f7931a; background: #fafafa; font-style: italic;">');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${post.title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Georgia, 'Times New Roman', serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; max-width: 600px;">
          <tr>
            <td align="center" style="padding: 32px 40px; background-color: #1a1a1a;">
              <a href="https://perception.to" style="text-decoration: none;">
                <img src="https://perception.to/logos/perception-logo-light.png" alt="Perception" width="140" style="display: block; border: 0;">
              </a>
            </td>
          </tr>
          ${post.featureImage ? `
          <tr>
            <td style="padding: 0;">
              <img src="${post.featureImage}" alt="${post.title}" width="600" style="display: block; width: 100%; height: auto; border: 0;">
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              <h1 style="margin: 0; font-size: 28px; line-height: 1.3; color: #1a1a1a; font-weight: 700;">${post.title}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px 40px; font-size: 17px; line-height: 1.7; color: #333333;">
              ${styledHtml}
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 0;">
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px; text-align: center;">
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #666666; line-height: 1.5;">
                You're receiving this because you signed up at
                <a href="https://perception.to" style="color: #f7931a; text-decoration: underline;">perception.to</a>
              </p>
              <p style="margin: 0 0 16px 0; font-size: 14px;">
                <a href="%unsubscribe_url%" style="color: #999999; text-decoration: underline;">Unsubscribe</a>
                &nbsp;&bull;&nbsp;
                <a href="${post.url}" style="color: #999999; text-decoration: underline;">View online</a>
              </p>
              <p style="margin: 0; font-size: 12px; color: #999999;">
                ${new Date().getFullYear()} Perception
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

function buildEmailText(post) {
  const contentText = htmlToText(post.html);
  return `
${post.title.toUpperCase()}
${'='.repeat(post.title.length)}

${contentText}

---

Read online: ${post.url}

You're receiving this because you signed up at perception.to

Unsubscribe: %unsubscribe_url%

${new Date().getFullYear()} Perception
`.trim();
}

// ======================
// MAIN
// ======================
async function main() {
  console.log('==========================================');
  console.log('SCHEDULED MAILGUN SEND - MISSED RECIPIENTS');
  console.log('==========================================\n');

  if (!GHOST_URL || !GHOST_ADMIN_API_KEY || !MAILGUN_API_KEY) {
    console.error('Error: Missing required environment variables');
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log('DRY RUN MODE - No emails will be sent\n');
  }

  // Load recipients
  if (!fs.existsSync(RECIPIENTS_FILE)) {
    console.error('Error: Recipients file not found:', RECIPIENTS_FILE);
    process.exit(1);
  }

  const recipients = JSON.parse(fs.readFileSync(RECIPIENTS_FILE, 'utf-8'));
  console.log(`Recipients: ${recipients.length}`);

  // Determine send time
  const sendTime = SEND_NOW ? null : SCHEDULED_TIME;
  if (sendTime) {
    console.log(`Scheduled for: ${sendTime.toISOString()}`);
    console.log(`             = ${sendTime.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST`);
  } else {
    console.log('Sending: IMMEDIATELY');
  }
  console.log('');

  await syncServerTime();

  // Get post content
  console.log('Fetching post content...');
  const post = await getPostContent();
  console.log(`Post: ${post.title}\n`);

  const emailHtml = buildEmailHtml(post);
  const emailText = buildEmailText(post);

  // Send in batches of 8 (Mailgun limit per message)
  const BATCH_SIZE = 8;
  const batches = [];
  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    batches.push(recipients.slice(i, i + BATCH_SIZE));
  }

  console.log(`Sending ${batches.length} batches...\n`);

  let sentCount = 0;
  let errorCount = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`Batch ${i + 1}/${batches.length}: ${batch.join(', ')}`);

    if (DRY_RUN) {
      console.log('[DRY RUN] Would schedule send\n');
      sentCount += batch.length;
    } else {
      try {
        const result = await sendViaMailgun(batch, post.title, emailHtml, emailText, sendTime);
        console.log(`✅ Queued: ${result.id}\n`);
        sentCount += batch.length;
      } catch (err) {
        console.error(`❌ Error: ${err.message}\n`);
        errorCount += batch.length;
      }
    }

    // Small delay between API calls
    if (i < batches.length - 1) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  console.log('==========================================');
  console.log('COMPLETE');
  console.log('==========================================');
  console.log(`Queued: ${sentCount} emails`);
  console.log(`Errors: ${errorCount}`);
  if (sendTime) {
    console.log(`\nEmails will be delivered at: ${sendTime.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
