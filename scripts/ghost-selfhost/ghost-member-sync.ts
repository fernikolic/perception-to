/**
 * Ghost Member Sync Cloud Function
 *
 * Syncs new Perception app users to Ghost CMS as newsletter subscribers.
 * Add this to your Firebase Cloud Functions project (perception-app-3db34).
 *
 * Prerequisites:
 * 1. npm install jsonwebtoken node-fetch@2
 * 2. Add GHOST_ADMIN_API_KEY to GCP Secret Manager
 * 3. Add GHOST_URL to function config
 *
 * Deployment:
 * firebase deploy --only functions:syncUserToGhost,functions:retryGhostMemberSync
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';
import * as jwt from 'jsonwebtoken';

// Initialize Firebase Admin if not already done
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Configuration - set these in your environment
const GHOST_URL = process.env.GHOST_URL || 'https://newsletter.perception.to';
const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY;

interface GhostMember {
  email: string;
  name: string;
  subscribed: boolean;
  labels: string[];
}

interface GhostAPIResponse {
  members?: GhostMember[];
  errors?: Array<{
    type: string;
    message: string;
  }>;
}

/**
 * Generate a JWT token for Ghost Admin API authentication
 * Ghost Admin API keys are in format: {id}:{secret}
 */
function generateGhostToken(): string {
  if (!GHOST_ADMIN_API_KEY) {
    throw new Error('GHOST_ADMIN_API_KEY not configured');
  }

  const [id, secret] = GHOST_ADMIN_API_KEY.split(':');

  if (!id || !secret) {
    throw new Error('Invalid GHOST_ADMIN_API_KEY format. Expected {id}:{secret}');
  }

  const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: '/admin/'
  });

  return token;
}

/**
 * Add a member to Ghost CMS
 */
async function addGhostMember(
  email: string,
  name: string,
  labels: string[] = ['app-user']
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = generateGhostToken();

    const response = await fetch(`${GHOST_URL}/ghost/api/admin/members/`, {
      method: 'POST',
      headers: {
        'Authorization': `Ghost ${token}`,
        'Content-Type': 'application/json',
        'Accept-Version': 'v5.0'
      },
      body: JSON.stringify({
        members: [{
          email,
          name,
          subscribed: true,
          labels: labels.map(label => ({ name: label }))
        }]
      })
    });

    const data = await response.json() as GhostAPIResponse;

    if (!response.ok) {
      // Check if member already exists (ValidationError)
      if (data.errors?.[0]?.type === 'ValidationError' &&
          data.errors[0].message?.includes('already exists')) {
        console.log(`Member ${email} already exists in Ghost`);
        return { success: true }; // Consider this a success
      }

      const errorMsg = data.errors?.[0]?.message || 'Unknown Ghost API error';
      console.error(`Ghost API error for ${email}:`, errorMsg);
      return { success: false, error: errorMsg };
    }

    console.log(`Successfully added ${email} to Ghost newsletter`);
    return { success: true };

  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Failed to add ${email} to Ghost:`, errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Check if a member exists in Ghost
 */
async function checkGhostMember(email: string): Promise<boolean> {
  try {
    const token = generateGhostToken();
    const encodedEmail = encodeURIComponent(email);

    const response = await fetch(
      `${GHOST_URL}/ghost/api/admin/members/?filter=email:'${encodedEmail}'`,
      {
        headers: {
          'Authorization': `Ghost ${token}`,
          'Accept-Version': 'v5.0'
        }
      }
    );

    const data = await response.json() as GhostAPIResponse;
    return (data.members?.length || 0) > 0;

  } catch (error) {
    console.error(`Error checking Ghost member ${email}:`, error);
    return false;
  }
}

/**
 * Firestore trigger: Sync new users to Ghost
 *
 * Triggers when a new user document is created in Firestore.
 * Adds the user as a Ghost newsletter subscriber.
 */
export const syncUserToGhost = functions
  .runWith({
    secrets: ['GHOST_ADMIN_API_KEY'],
    memory: '256MB',
    timeoutSeconds: 30
  })
  .firestore
  .document('users/{userId}')
  .onCreate(async (snap, context) => {
    const userData = snap.data();
    const userId = context.params.userId;

    // Skip if user opted out of newsletter
    if (userData.newsletterOptOut === true) {
      console.log(`User ${userData.email} opted out of newsletter, skipping Ghost sync`);
      return;
    }

    // Skip if no email
    if (!userData.email) {
      console.log(`User ${userId} has no email, skipping Ghost sync`);
      return;
    }

    const email = userData.email;
    const name = userData.displayName || email.split('@')[0];

    // Determine labels based on user data
    const labels = ['app-user'];
    if (userData.selectedPlan) {
      labels.push(`plan-${userData.selectedPlan}`);
    }
    if (userData.persona?.type) {
      labels.push(`persona-${userData.persona.type}`);
    }

    const result = await addGhostMember(email, name, labels);

    if (result.success) {
      // Update user record with sync status
      await snap.ref.update({
        ghostMemberSynced: true,
        ghostSyncedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } else {
      // Mark for retry
      await snap.ref.update({
        ghostMemberSynced: false,
        ghostMemberSyncError: result.error,
        ghostMemberSyncRetry: true
      });
    }
  });

/**
 * Scheduled function: Retry failed Ghost syncs
 *
 * Runs every 6 hours to retry users who failed to sync to Ghost.
 */
export const retryGhostMemberSync = functions
  .runWith({
    secrets: ['GHOST_ADMIN_API_KEY'],
    memory: '256MB',
    timeoutSeconds: 300
  })
  .pubsub
  .schedule('every 6 hours')
  .onRun(async () => {
    console.log('Starting Ghost member sync retry job');

    // Get users who need retry
    const failedSyncs = await db.collection('users')
      .where('ghostMemberSyncRetry', '==', true)
      .limit(100)
      .get();

    console.log(`Found ${failedSyncs.size} users to retry`);

    let successCount = 0;
    let failCount = 0;

    for (const doc of failedSyncs.docs) {
      const userData = doc.data();

      if (!userData.email) {
        // Remove retry flag for invalid records
        await doc.ref.update({
          ghostMemberSyncRetry: admin.firestore.FieldValue.delete()
        });
        continue;
      }

      const labels = ['app-user'];
      if (userData.selectedPlan) {
        labels.push(`plan-${userData.selectedPlan}`);
      }

      const result = await addGhostMember(
        userData.email,
        userData.displayName || userData.email.split('@')[0],
        labels
      );

      if (result.success) {
        await doc.ref.update({
          ghostMemberSynced: true,
          ghostSyncedAt: admin.firestore.FieldValue.serverTimestamp(),
          ghostMemberSyncRetry: admin.firestore.FieldValue.delete(),
          ghostMemberSyncError: admin.firestore.FieldValue.delete()
        });
        successCount++;
      } else {
        await doc.ref.update({
          ghostMemberSyncError: result.error,
          ghostMemberSyncRetryCount: admin.firestore.FieldValue.increment(1)
        });
        failCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`Ghost sync retry complete: ${successCount} success, ${failCount} failed`);
  });

/**
 * HTTP function: Manual sync for existing users
 *
 * Call this to sync all existing users who haven't been synced yet.
 * Use sparingly - this is for initial migration only.
 *
 * curl -X POST https://your-function-url/manualGhostSync \
 *   -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
 *   -H "Content-Type: application/json" \
 *   -d '{"limit": 100}'
 */
export const manualGhostSync = functions
  .runWith({
    secrets: ['GHOST_ADMIN_API_KEY'],
    memory: '512MB',
    timeoutSeconds: 540
  })
  .https
  .onRequest(async (req, res) => {
    // Basic auth check - implement proper admin auth in production
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const limit = req.body.limit || 100;
    const dryRun = req.body.dryRun === true;

    console.log(`Starting manual Ghost sync (limit: ${limit}, dryRun: ${dryRun})`);

    // Get users who haven't been synced
    const unsyncedUsers = await db.collection('users')
      .where('ghostMemberSynced', '!=', true)
      .limit(limit)
      .get();

    const results = {
      total: unsyncedUsers.size,
      synced: 0,
      failed: 0,
      skipped: 0,
      errors: [] as string[]
    };

    for (const doc of unsyncedUsers.docs) {
      const userData = doc.data();

      if (!userData.email) {
        results.skipped++;
        continue;
      }

      if (userData.newsletterOptOut === true) {
        results.skipped++;
        continue;
      }

      if (dryRun) {
        console.log(`[DRY RUN] Would sync: ${userData.email}`);
        results.synced++;
        continue;
      }

      const labels = ['app-user', 'bulk-import'];
      if (userData.selectedPlan) {
        labels.push(`plan-${userData.selectedPlan}`);
      }

      const result = await addGhostMember(
        userData.email,
        userData.displayName || userData.email.split('@')[0],
        labels
      );

      if (result.success) {
        await doc.ref.update({
          ghostMemberSynced: true,
          ghostSyncedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        results.synced++;
      } else {
        results.failed++;
        results.errors.push(`${userData.email}: ${result.error}`);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`Manual Ghost sync complete:`, results);
    res.json(results);
  });
