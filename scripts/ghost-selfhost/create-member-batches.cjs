/**
 * Ghost Member Batch Creator
 *
 * Creates batch labels for Ghost members sorted by email engagement.
 * Useful for sending newsletters in batches when on Mailgun probation.
 *
 * Usage:
 *   node scripts/ghost-selfhost/create-member-batches.cjs [options]
 *
 * Options:
 *   --dry-run    Preview changes without applying them
 *   --batch-size Set custom batch size (default: 50)
 *   --cleanup    Remove all batch labels from members
 */

require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// ======================
// CONFIGURATION
// ======================
const GHOST_URL = process.env.GHOST_URL;
const ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY;
const LABEL_PREFIX = 'batch';

// Parse CLI arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const CLEANUP_MODE = args.includes('--cleanup');
const batchSizeArg = args.find(a => a.startsWith('--batch-size='));
const BATCH_SIZE = batchSizeArg ? parseInt(batchSizeArg.split('=')[1], 10) : 50;

// Validate configuration
if (!GHOST_URL || !ADMIN_API_KEY) {
  console.error('Error: Missing required environment variables.');
  console.error('Please set GHOST_URL and GHOST_ADMIN_API_KEY in your .env file');
  process.exit(1);
}

// ======================
// JWT TOKEN GENERATION
// ======================
let serverTimeOffset = 0; // Will be calculated on first request

async function syncServerTime() {
  const response = await fetch(`${GHOST_URL}/ghost/api/admin/site/`, {
    method: 'HEAD'
  });
  const serverDate = response.headers.get('date');
  if (serverDate) {
    const serverTime = Math.floor(new Date(serverDate).getTime() / 1000);
    const localTime = Math.floor(Date.now() / 1000);
    serverTimeOffset = serverTime - localTime;
    if (Math.abs(serverTimeOffset) > 60) {
      console.log(`Clock offset detected: ${serverTimeOffset}s (adjusting automatically)`);
    }
  }
}

function generateGhostToken() {
  const [id, secret] = ADMIN_API_KEY.split(':');

  if (!id || !secret) {
    throw new Error('Invalid GHOST_ADMIN_API_KEY format. Expected {id}:{secret}');
  }

  // Use server-adjusted time for JWT
  const now = Math.floor(Date.now() / 1000) + serverTimeOffset;
  return jwt.sign(
    {
      iat: now,
      exp: now + 300, // 5 minutes
      aud: '/admin/'
    },
    Buffer.from(secret, 'hex'),
    {
      keyid: id,
      algorithm: 'HS256'
    }
  );
}

// ======================
// API HELPERS
// ======================
async function fetchAllMembers() {
  const allMembers = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const token = generateGhostToken();
    const url = `${GHOST_URL}/ghost/api/admin/members/?limit=100&page=${page}&include=labels`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Ghost ${token}`,
        'Accept-Version': 'v5.0'
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch members: ${response.status} ${error}`);
    }

    const data = await response.json();
    allMembers.push(...data.members);

    if (data.meta?.pagination?.next) {
      page++;
    } else {
      hasMore = false;
    }
  }

  return allMembers;
}

async function updateMemberLabels(memberId, labels) {
  const token = generateGhostToken();
  const url = `${GHOST_URL}/ghost/api/admin/members/${memberId}/`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Ghost ${token}`,
      'Content-Type': 'application/json',
      'Accept-Version': 'v5.0'
    },
    body: JSON.stringify({
      members: [{ labels }]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update member: ${response.status} ${error}`);
  }

  return response.json();
}

// ======================
// CLEANUP FUNCTION
// ======================
async function removeBatchLabels() {
  await syncServerTime();
  console.log('Fetching all members for cleanup...');
  const members = await fetchAllMembers();
  console.log(`Found ${members.length} total members\n`);

  let cleanedCount = 0;

  for (const member of members) {
    const originalLabels = member.labels || [];
    const filteredLabels = originalLabels.filter(l => !l.name.startsWith(`${LABEL_PREFIX}-`));

    if (filteredLabels.length !== originalLabels.length) {
      if (DRY_RUN) {
        console.log(`[DRY RUN] Would clean labels for ${member.email}`);
      } else {
        await updateMemberLabels(member.id, filteredLabels.map(l => ({ name: l.name })));
        console.log(`Cleaned labels for ${member.email}`);
      }
      cleanedCount++;
    }
  }

  console.log(`\n${DRY_RUN ? '[DRY RUN] Would clean' : 'Cleaned'} ${cleanedCount} members`);
}

// ======================
// MAIN FUNCTION
// ======================
async function createMemberBatches() {
  try {
    await syncServerTime();

    if (DRY_RUN) {
      console.log('=== DRY RUN MODE - No changes will be made ===\n');
    }

    console.log('Fetching all members...');
    const members = await fetchAllMembers();
    console.log(`Found ${members.length} total members`);

    // Filter to only members with email enabled (subscribed)
    const subscribedMembers = members.filter(m => m.email_suppression?.suppressed !== true);
    console.log(`${subscribedMembers.length} members are subscribed to emails`);

    // Load engaged emails list (>40% open rate from old Ghost instance)
    const engagedEmailsPath = path.join(__dirname, 'engaged-emails.txt');
    let engagedEmails = new Set();
    if (fs.existsSync(engagedEmailsPath)) {
      const emailList = fs.readFileSync(engagedEmailsPath, 'utf-8').split('\n').filter(e => e.trim());
      engagedEmails = new Set(emailList.map(e => e.toLowerCase().trim()));
      console.log(`Loaded ${engagedEmails.size} engaged emails from legacy data`);
    }

    // Sort: engaged members first (by signup date), then others (by signup date)
    const sorted = subscribedMembers.sort((a, b) => {
      const aEngaged = engagedEmails.has(a.email.toLowerCase());
      const bEngaged = engagedEmails.has(b.email.toLowerCase());

      // Engaged members come first
      if (aEngaged && !bEngaged) return -1;
      if (!aEngaged && bEngaged) return 1;

      // Within same group, sort by signup date (oldest first)
      return new Date(a.created_at) - new Date(b.created_at);
    });

    const engagedCount = sorted.filter(m => engagedEmails.has(m.email.toLowerCase())).length;
    console.log(`${engagedCount} members matched as engaged, ${sorted.length - engagedCount} others`);

    // Calculate number of batches needed
    const totalBatches = Math.ceil(sorted.length / BATCH_SIZE);
    console.log(`Creating ${totalBatches} batches of ${BATCH_SIZE} members each\n`);

    // Process each batch
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const batchNumber = batchIndex + 1;
      const batchLabel = `${LABEL_PREFIX}-${batchNumber}`;
      const startIndex = batchIndex * BATCH_SIZE;
      const batchMembers = sorted.slice(startIndex, startIndex + BATCH_SIZE);

      console.log(`\n--- Processing ${batchLabel} (${batchMembers.length} members) ---`);

      // Log engagement stats for this batch
      const engagedInBatch = batchMembers.filter(m => engagedEmails.has(m.email.toLowerCase())).length;
      console.log(`Engaged: ${engagedInBatch}/${batchMembers.length}`);

      // Update each member with the batch label
      for (const member of batchMembers) {
        try {
          const existingLabels = (member.labels || [])
            .filter(l => !l.name.startsWith(`${LABEL_PREFIX}-`))
            .map(l => ({ name: l.name }));
          const newLabels = [...existingLabels, { name: batchLabel }];
          const isEngaged = engagedEmails.has(member.email.toLowerCase());

          if (DRY_RUN) {
            console.log(`  [DRY RUN] ${member.email} ${isEngaged ? '(engaged)' : ''}`);
          } else {
            await updateMemberLabels(member.id, newLabels);
            console.log(`  + ${member.email} ${isEngaged ? '(engaged)' : ''}`);
          }
        } catch (err) {
          console.error(`  x Failed to update ${member.email}: ${err.message}`);
        }
      }
    }

    // Summary
    console.log('\n========================================');
    console.log('SUMMARY');
    console.log('========================================');
    console.log(`Total members processed: ${sorted.length}`);
    console.log(`Batches created: ${totalBatches}`);
    console.log(`Labels created: ${LABEL_PREFIX}-1 through ${LABEL_PREFIX}-${totalBatches}`);
    console.log('\nBatch sending order (most engaged first):');
    for (let i = 1; i <= Math.min(totalBatches, 5); i++) {
      console.log(`  Day ${i}: Send to "${LABEL_PREFIX}-${i}"`);
    }
    if (totalBatches > 5) {
      console.log(`  ... and so on until ${LABEL_PREFIX}-${totalBatches}`);
    }

    if (DRY_RUN) {
      console.log('\n=== DRY RUN COMPLETE - No changes were made ===');
      console.log('Run without --dry-run to apply changes.');
    }

  } catch (error) {
    console.error('Script failed:', error.message);
    process.exit(1);
  }
}

// ======================
// RUN SCRIPT
// ======================
if (CLEANUP_MODE) {
  removeBatchLabels();
} else {
  createMemberBatches();
}
