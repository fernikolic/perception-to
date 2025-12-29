/**
 * Build-time Ghost Content API Fetcher
 * Fetches all posts from Ghost CMS and saves to src/data/ghost-posts.json
 *
 * Usage: node scripts/fetch-ghost-posts.js
 *
 * Required environment variables:
 * - GHOST_API_URL: Your Ghost site URL (e.g., https://bitcoin-perception.ghost.io)
 * - GHOST_CONTENT_API_KEY: Your Ghost Content API key
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GHOST_API_URL = process.env.GHOST_API_URL || 'https://bitcoin-perception.ghost.io';
const GHOST_CONTENT_API_KEY = process.env.GHOST_CONTENT_API_KEY;

// Note: Don't use 'fields' parameter when you need html content
// Ghost requires 'formats=html' to include the full post content

async function fetchAllPosts() {
  if (!GHOST_CONTENT_API_KEY) {
    console.log('⚠️  GHOST_CONTENT_API_KEY not set - skipping Ghost fetch');
    console.log('   Using existing cached posts if available');
    return null; // Signal to skip
  }

  const allPosts = [];
  let page = 1;
  let hasMore = true;
  const limit = 15; // Ghost's default

  console.log('🔄 Fetching posts from Ghost...');
  console.log(`   API URL: ${GHOST_API_URL}`);

  while (hasMore) {
    const url = new URL(`${GHOST_API_URL}/ghost/api/content/posts/`);
    url.searchParams.set('key', GHOST_CONTENT_API_KEY);
    url.searchParams.set('include', 'tags,authors');
    url.searchParams.set('formats', 'html');
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('page', page.toString());

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ghost API error: ${response.status} ${response.statusText}\n${errorText}`);
      }

      const data = await response.json();

      if (data.posts && data.posts.length > 0) {
        allPosts.push(...data.posts);
        console.log(`   Page ${page}: fetched ${data.posts.length} posts (total: ${allPosts.length})`);
      }

      // Check if there are more pages
      if (data.meta?.pagination) {
        const { pages, next } = data.meta.pagination;
        hasMore = next !== null && page < pages;
        page++;
      } else {
        hasMore = false;
      }

    } catch (error) {
      console.error(`❌ Error fetching page ${page}:`, error.message);
      throw error;
    }
  }

  return allPosts;
}

async function main() {
  try {
    const posts = await fetchAllPosts();

    // If no API key, skip but don't fail
    if (posts === null) {
      const dataPath = path.join(__dirname, '..', 'src', 'data', 'ghost-posts.json');
      if (fs.existsSync(dataPath)) {
        const existing = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        console.log(`   Found ${existing.totalPosts || 0} cached posts`);
      }
      return;
    }

    // Create the cached data structure
    const cachedData = {
      posts,
      fetchedAt: new Date().toISOString(),
      totalPosts: posts.length
    };

    // Ensure data directory exists
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write to JSON file
    const outputPath = path.join(dataDir, 'ghost-posts.json');
    fs.writeFileSync(outputPath, JSON.stringify(cachedData, null, 2));

    console.log(`✅ Successfully fetched ${posts.length} posts`);
    console.log(`   Saved to: ${outputPath}`);

    // Show tag breakdown
    const tagCounts = {};
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagCounts[tag.slug] = (tagCounts[tag.slug] || 0) + 1;
      });
    });

    console.log('\n📊 Posts by tag:');
    Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([tag, count]) => {
        console.log(`   ${tag}: ${count}`);
      });

  } catch (error) {
    console.error('❌ Failed to fetch Ghost posts:', error.message);
    process.exit(1);
  }
}

main();
