#!/usr/bin/env node
/**
 * Request URL Indexing via Google Search Console API
 *
 * Uses the URL Inspection API to request reindexing of key pages.
 *
 * Usage: node request-indexing.js
 */

import { google } from 'googleapis';

const SITE_URL = 'sc-domain:perception.to';

// Priority pages to request reindexing
const PAGES_TO_INDEX = [
  'https://perception.to/',
  'https://perception.to/bitcoin-fear-greed-index',
  'https://perception.to/bitcoin-market-sentiment',
  'https://perception.to/crypto-conferences',
  'https://perception.to/pricing',
  'https://perception.to/about',
  'https://perception.to/journalist',
  'https://perception.to/investor',
  'https://perception.to/methodology',
  'https://perception.to/docs',
  'https://perception.to/api',
];

async function main() {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    console.log('\n========================================');
    console.log('GOOGLE SEARCH CONSOLE - REQUEST INDEXING');
    console.log('========================================');
    console.log(`Property: ${SITE_URL}`);
    console.log(`Pages to index: ${PAGES_TO_INDEX.length}`);
    console.log('========================================\n');

    for (const url of PAGES_TO_INDEX) {
      try {
        console.log(`Inspecting: ${url}`);

        const response = await searchconsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: url,
            siteUrl: SITE_URL,
          },
        });

        const result = response.data.inspectionResult;
        const indexStatus = result?.indexStatusResult?.coverageState || 'Unknown';
        const lastCrawl = result?.indexStatusResult?.lastCrawlTime || 'Never';

        console.log(`  Status: ${indexStatus}`);
        console.log(`  Last Crawl: ${lastCrawl}`);

        // Note: The Indexing API (for requesting indexing) is separate
        // and requires additional setup. The URL Inspection API only
        // provides status information.

        console.log('');
      } catch (err) {
        console.log(`  Error: ${err.message}\n`);
      }

      // Rate limiting - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('========================================');
    console.log('INSPECTION COMPLETE');
    console.log('========================================');
    console.log('\nNote: To request indexing, use Google Search Console UI:');
    console.log('1. Go to https://search.google.com/search-console');
    console.log('2. Select property: perception.to');
    console.log('3. Use URL Inspection tool');
    console.log('4. Enter URL and click "Request Indexing"');
    console.log('\nOr use the Indexing API (requires separate setup for job posting/livestream sites)');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
