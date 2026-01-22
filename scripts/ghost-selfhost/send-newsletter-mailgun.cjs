/**
 * Direct Mailgun Newsletter Sender
 *
 * Sends newsletter directly via Mailgun API, bypassing Ghost's batch limitations.
 * Respects Mailgun probation limits: 100 messages/hour, 9 recipients/message
 *
 * Usage:
 *   node scripts/ghost-selfhost/send-newsletter-mailgun.cjs [options]
 *
 * Options:
 *   --dry-run       Preview what would be sent without actually sending
 *   --resume        Resume from last saved progress
 *   --batch=N       Start from specific batch number
 *   --limit=N       Only send N batches (for gradual warm-up)
 *   --test-email=X  Send test to single email first
 *
 * Warm-up Schedule (3-5 days):
 *   Day 1: --limit=10  (80 emails)
 *   Day 2: --resume --limit=20  (160 emails)
 *   Day 3: --resume --limit=30  (240 emails)
 *   Day 4: --resume --limit=40  (320 emails)
 *   Day 5: --resume  (remaining ~218 emails)
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

const ORIGINAL_POST_ID = '6958f73cec37692f72a5978e';
const PROGRESS_FILE = path.join(__dirname, 'send-progress.json');

// Mailgun probation limits (extra conservative for warm-up)
// IMPORTANT: Probation = 100 messages/hour
// Sending individually: 37 seconds between each email = ~97 emails/hour (safe margin)
const DELAY_BETWEEN_SENDS_MS = 37000; // 37 seconds between each individual email

// Newsletter settings
const FROM_NAME = 'Perception';
const FROM_EMAIL = 'letters@perception.to';

// Parse CLI arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const RESUME = args.includes('--resume');
const batchArg = args.find(a => a.startsWith('--batch='));
const START_BATCH = batchArg ? parseInt(batchArg.split('=')[1], 10) : 1;
const testEmailArg = args.find(a => a.startsWith('--test-email='));
const TEST_EMAIL = testEmailArg ? testEmailArg.split('=')[1] : null;
const limitArg = args.find(a => a.startsWith('--limit='));
const BATCH_LIMIT = limitArg ? parseInt(limitArg.split('=')[1], 10) : null;

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

async function getMembersByBatch() {
  const allMembers = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const data = await ghostApi(`/members/?limit=100&page=${page}&include=labels`);
    allMembers.push(...data.members);
    hasMore = !!data.meta?.pagination?.next;
    page++;
  }

  // Group members by batch label
  const batches = {};
  for (const member of allMembers) {
    if (member.email_suppression?.suppressed) continue;

    const batchLabel = member.labels?.find(l => l.name.startsWith('batch-'));
    if (batchLabel) {
      const batchNum = parseInt(batchLabel.name.split('-')[1], 10);
      if (!batches[batchNum]) batches[batchNum] = [];
      batches[batchNum].push({
        email: member.email,
        name: member.name || ''
      });
    }
  }

  return batches;
}

// ======================
// MAILGUN API
// ======================
async function sendViaMailgun(recipient, subject, html, text) {
  const formData = new URLSearchParams();

  // Required fields - SINGLE RECIPIENT ONLY to prevent email list exposure
  formData.append('from', `${FROM_NAME} <${FROM_EMAIL}>`);
  formData.append('to', recipient);
  formData.append('subject', subject);

  // Both HTML and plain text versions (best practice for deliverability)
  formData.append('html', html);
  formData.append('text', text);

  // Headers for best practices
  formData.append('h:Reply-To', 'fernando@btcperception.com');
  formData.append('h:List-Unsubscribe', '<%unsubscribe_url%>');
  formData.append('h:List-Unsubscribe-Post', 'List-Unsubscribe=One-Click');

  // Tracking (for analytics)
  formData.append('o:tracking', 'yes');
  formData.append('o:tracking-clicks', 'yes');
  formData.append('o:tracking-opens', 'yes');

  // Tags for organization in Mailgun dashboard
  formData.append('o:tag', 'newsletter');
  formData.append('o:tag', 'standing-shrinking-island');

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
// EMAIL TEMPLATE
// ======================

// Convert HTML to plain text (simple conversion)
function htmlToText(html) {
  return html
    // Remove style and script tags
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    // Convert headers to uppercase with newlines
    .replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, '\n\n$1\n\n')
    // Convert paragraphs to double newlines
    .replace(/<p[^>]*>/gi, '\n\n')
    .replace(/<\/p>/gi, '')
    // Convert breaks to newlines
    .replace(/<br\s*\/?>/gi, '\n')
    // Convert links to text with URL
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '$2 ($1)')
    // Convert list items
    .replace(/<li[^>]*>/gi, '\n• ')
    .replace(/<\/li>/gi, '')
    // Remove all remaining HTML tags
    .replace(/<[^>]+>/g, '')
    // Decode HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Clean up whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function buildEmailHtml(post) {
  // Add inline styles to post HTML content
  const styledHtml = post.html
    // Style links
    .replace(/<a /g, '<a style="color: #f7931a; text-decoration: underline;" ')
    // Style images
    .replace(/<img /g, '<img style="max-width: 100%; height: auto; border-radius: 4px;" ')
    // Style paragraphs
    .replace(/<p>/g, '<p style="margin: 0 0 16px 0; line-height: 1.7;">')
    // Style headers
    .replace(/<h2>/g, '<h2 style="margin: 32px 0 16px 0; font-size: 24px; font-weight: 600; color: #1a1a1a;">')
    .replace(/<h3>/g, '<h3 style="margin: 24px 0 12px 0; font-size: 20px; font-weight: 600; color: #1a1a1a;">')
    // Style blockquotes
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
  <!-- Email wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Main content container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; max-width: 600px;">

          <!-- Header with logo -->
          <tr>
            <td align="center" style="padding: 32px 40px; background-color: #1a1a1a;">
              <a href="https://perception.to" style="text-decoration: none;">
                <img src="https://perception.to/logos/perception-logo-light.png" alt="Perception" width="140" style="display: block; border: 0;">
              </a>
            </td>
          </tr>

          ${post.featureImage ? `
          <!-- Feature image -->
          <tr>
            <td style="padding: 0;">
              <img src="${post.featureImage}" alt="${post.title}" width="600" style="display: block; width: 100%; height: auto; border: 0;">
            </td>
          </tr>
          ` : ''}

          <!-- Title -->
          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              <h1 style="margin: 0; font-size: 28px; line-height: 1.3; color: #1a1a1a; font-weight: 700;">${post.title}</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px 40px; font-size: 17px; line-height: 1.7; color: #333333;">
              ${styledHtml}
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 0;">
            </td>
          </tr>

          <!-- Footer -->
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
// PROGRESS TRACKING
// ======================
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
  }
  return { sentEmails: [], startedAt: null };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// ======================
// MAIN
// ======================
async function main() {
  console.log('========================================');
  console.log('MAILGUN NEWSLETTER SENDER');
  console.log('========================================\n');

  // Validate config
  if (!GHOST_URL || !GHOST_ADMIN_API_KEY) {
    console.error('Error: Missing GHOST_URL or GHOST_ADMIN_API_KEY in .env');
    process.exit(1);
  }

  if (!MAILGUN_API_KEY) {
    console.error('Error: Missing MAILGUN_API_KEY in .env');
    console.error('Add: MAILGUN_API_KEY=your-api-key');
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - No emails will be sent\n');
  }

  await syncServerTime();

  // Get post content
  console.log('Fetching post content...');
  const post = await getPostContent();
  console.log(`Post: ${post.title}`);
  console.log(`HTML length: ${post.html.length} chars\n`);

  const emailHtml = buildEmailHtml(post);
  const emailText = buildEmailText(post);

  console.log(`Plain text length: ${emailText.length} chars\n`);

  // Test email mode
  if (TEST_EMAIL) {
    console.log(`Sending test email to: ${TEST_EMAIL}`);
    if (!DRY_RUN) {
      await sendViaMailgun(TEST_EMAIL, post.title, emailHtml, emailText);
      console.log('✅ Test email sent!');
    } else {
      console.log('[DRY RUN] Would send test email');
    }
    return;
  }

  // Get members - flatten all batches into single list
  console.log('Fetching members...');
  const batches = await getMembersByBatch();
  const allMembers = Object.values(batches).flat();
  console.log(`Found ${allMembers.length} total members\n`);

  // Load or initialize progress
  let progress = RESUME ? loadProgress() : { sentEmails: [], startedAt: new Date().toISOString() };
  const alreadySent = new Set(progress.sentEmails);

  // Filter out already-sent emails
  const membersToSend = allMembers.filter(m => !alreadySent.has(m.email));
  console.log(`Already sent: ${alreadySent.size}`);
  console.log(`Remaining to send: ${membersToSend.length}`);

  if (BATCH_LIMIT) {
    console.log(`Limit: ${BATCH_LIMIT} emails (warm-up mode)`);
  }
  console.log(`Rate limit: ~97 emails/hour (${DELAY_BETWEEN_SENDS_MS / 1000}s between each send)`);
  console.log('========================================\n');

  let sentCount = 0;
  let errorCount = 0;

  for (let i = 0; i < membersToSend.length; i++) {
    // Check limit
    if (BATCH_LIMIT && sentCount >= BATCH_LIMIT) {
      console.log(`\n⏸️  Reached limit of ${BATCH_LIMIT} emails. Run with --resume to continue tomorrow.`);
      break;
    }

    const member = membersToSend[i];
    const remaining = membersToSend.length - i;
    const etaMinutes = Math.ceil((remaining * DELAY_BETWEEN_SENDS_MS) / 60000);

    if (DRY_RUN) {
      console.log(`[DRY RUN] Would send to: ${member.email}`);
      sentCount++;
    } else {
      try {
        const result = await sendViaMailgun(member.email, post.title, emailHtml, emailText);
        console.log(`✅ ${sentCount + 1}/${membersToSend.length} Sent to ${member.email} (${result.id})`);
        sentCount++;
        progress.sentEmails.push(member.email);
        saveProgress(progress);
      } catch (err) {
        console.error(`❌ Error sending to ${member.email}: ${err.message}`);
        errorCount++;
      }
    }

    // Rate limiting delay (skip on last email)
    if (i < membersToSend.length - 1 && !DRY_RUN) {
      console.log(`   Waiting ${DELAY_BETWEEN_SENDS_MS / 1000}s... (ETA: ~${etaMinutes} min remaining)`);
      await new Promise(r => setTimeout(r, DELAY_BETWEEN_SENDS_MS));
    }
  }

  // Summary
  console.log('\n========================================');
  console.log('COMPLETE');
  console.log('========================================');
  console.log(`Sent: ${sentCount} emails`);
  console.log(`Errors: ${errorCount}`);
  if (!DRY_RUN) {
    console.log(`Progress saved to: ${PROGRESS_FILE}`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
