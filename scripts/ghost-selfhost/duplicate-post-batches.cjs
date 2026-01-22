/**
 * Duplicate Ghost post for batch sending
 *
 * Deletes old batch posts and creates new ones for each batch label
 */

require('dotenv').config();
const jwt = require('jsonwebtoken');

const GHOST_URL = process.env.GHOST_URL;
const ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY;
const ORIGINAL_POST_ID = '6958f73cec37692f72a5978e'; // Standing on a Shrinking Island
const NUM_BATCHES = 128;

let serverTimeOffset = 0;

async function syncServerTime() {
  const response = await fetch(`${GHOST_URL}/ghost/api/admin/site/`, { method: 'HEAD' });
  const serverDate = response.headers.get('date');
  if (serverDate) {
    const serverTime = Math.floor(new Date(serverDate).getTime() / 1000);
    const localTime = Math.floor(Date.now() / 1000);
    serverTimeOffset = serverTime - localTime;
    if (Math.abs(serverTimeOffset) > 60) {
      console.log(`Clock offset: ${serverTimeOffset}s`);
    }
  }
}

function generateToken() {
  const [id, secret] = ADMIN_API_KEY.split(':');
  const now = Math.floor(Date.now() / 1000) + serverTimeOffset;
  return jwt.sign({ iat: now, exp: now + 300, aud: '/admin/' }, Buffer.from(secret, 'hex'), { keyid: id, algorithm: 'HS256' });
}

async function apiRequest(endpoint, options = {}) {
  const url = `${GHOST_URL}/ghost/api/admin${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Ghost ${generateToken()}`,
      'Accept-Version': 'v5.0',
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  return response;
}

async function deleteOldBatchPosts() {
  console.log('Fetching existing draft posts...');

  const response = await apiRequest('/posts/?limit=all&filter=status:draft');
  if (!response.ok) {
    console.log('Error fetching posts:', await response.text());
    return;
  }

  const data = await response.json();
  const batchPosts = (data.posts || []).filter(p =>
    p.title &&
    p.title.includes('[Batch') &&
    p.title.includes('Standing on a Shrinking Island')
  );

  console.log(`Found ${batchPosts.length} old batch posts to delete`);

  for (const post of batchPosts) {
    const delResponse = await apiRequest(`/posts/${post.id}/`, { method: 'DELETE' });
    if (delResponse.ok) {
      console.log(`Deleted: ${post.title}`);
    } else {
      console.log(`Failed to delete: ${post.title}`);
    }
  }

  return batchPosts.length;
}

async function getOriginalPost() {
  console.log('Fetching original post...');

  const response = await apiRequest(`/posts/${ORIGINAL_POST_ID}/?formats=lexical`);
  if (!response.ok) {
    throw new Error(`Failed to fetch original post: ${await response.text()}`);
  }

  const data = await response.json();
  return data.posts[0];
}

async function createBatchPost(original, batchNumber) {
  const newTitle = `${original.title} [Batch ${batchNumber}]`;

  const postData = {
    posts: [{
      title: newTitle,
      slug: `${original.slug}-batch-${batchNumber}`,
      lexical: original.lexical,
      feature_image: original.feature_image,
      status: 'draft',
      authors: original.authors?.map(a => ({ id: a.id })) || [],
      tags: original.tags?.map(t => ({ id: t.id })) || []
    }]
  };

  const response = await apiRequest('/posts/', {
    method: 'POST',
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create post: ${error}`);
  }

  return response.json();
}

async function main() {
  try {
    await syncServerTime();

    // Step 1: Delete old batch posts
    const deletedCount = await deleteOldBatchPosts();
    console.log(`\nDeleted ${deletedCount} old batch posts\n`);

    // Step 2: Get original post
    const original = await getOriginalPost();
    console.log(`Original: ${original.title}`);
    console.log(`Lexical content length: ${original.lexical?.length || 0} chars\n`);

    // Step 3: Create new batch posts
    console.log(`Creating ${NUM_BATCHES} batch drafts...`);

    for (let i = 1; i <= NUM_BATCHES; i++) {
      try {
        await createBatchPost(original, i);
        console.log(`Created: [Batch ${i}]`);
      } catch (err) {
        console.error(`Failed batch ${i}: ${err.message}`);
      }

      // Small delay to avoid rate limiting
      if (i % 10 === 0) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    console.log('\n========================================');
    console.log('DONE');
    console.log('========================================');
    console.log(`Created ${NUM_BATCHES} draft posts`);
    console.log(`\nEach post is named "Standing on a Shrinking Island [Batch X]"`);
    console.log(`Send each post to the corresponding "batch-X" label in Ghost`);

  } catch (error) {
    console.error('Script failed:', error.message);
    process.exit(1);
  }
}

main();
