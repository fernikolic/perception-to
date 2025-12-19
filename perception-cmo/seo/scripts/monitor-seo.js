#!/usr/bin/env node
/**
 * SEO Monitoring Script
 *
 * Compares current GSC data with previous exports to track position changes.
 * Run weekly to monitor the impact of SEO fixes.
 *
 * Usage: node monitor-seo.js
 */

import { google } from 'googleapis';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'sc-domain:perception.to';
const DATA_DIR = __dirname + '/../data';

// Key pages to monitor
const KEY_PAGES = [
  '/bitcoin-fear-greed-index',
  '/bitcoin-market-sentiment',
  '/crypto-conferences',
  '/',
];

// Target keywords to track
const TARGET_KEYWORDS = [
  'bitcoin fear and greed index',
  'bitcoin fear greed index',
  'bitcoin market sentiment',
  'bitcoin sentiment',
  'bitcoin sentiment analysis',
  'crypto fear greed',
  'crypto sentiment',
  'crypto conferences 2025',
  'bitcoin amsterdam 2025',
];

async function main() {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Get data for the last 7 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const formatDate = (d) => d.toISOString().split('T')[0];

    console.log('\n========================================');
    console.log('SEO MONITORING REPORT');
    console.log('========================================');
    console.log(`Property: ${SITE_URL}`);
    console.log(`Period: ${formatDate(startDate)} to ${formatDate(endDate)}`);
    console.log('========================================\n');

    // Get current data for target keywords
    console.log('📊 TARGET KEYWORD PERFORMANCE (Last 7 Days)\n');

    const keywordResponse = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['query'],
        rowLimit: 500,
      },
    });

    const keywordData = keywordResponse.data.rows || [];

    // Filter for target keywords
    console.log('Keyword | Clicks | Impressions | CTR | Position | Change');
    console.log('--------|--------|-------------|-----|----------|--------');

    for (const targetKw of TARGET_KEYWORDS) {
      const match = keywordData.find(row =>
        row.keys[0].toLowerCase().includes(targetKw.toLowerCase())
      );

      if (match) {
        const clicks = match.clicks || 0;
        const impressions = match.impressions || 0;
        const ctr = ((match.ctr || 0) * 100).toFixed(1);
        const position = (match.position || 0).toFixed(1);

        // Load previous data if exists
        let change = 'N/A';
        const prevFiles = fs.readdirSync(DATA_DIR).filter(f => f.startsWith('gsc-export-'));
        if (prevFiles.length > 1) {
          prevFiles.sort().reverse();
          const prevFile = prevFiles[1]; // Second most recent
          try {
            const prevData = JSON.parse(fs.readFileSync(`${DATA_DIR}/${prevFile}`, 'utf8'));
            const prevMatch = prevData.keywords?.find(r =>
              r.keys[0].toLowerCase().includes(targetKw.toLowerCase())
            );
            if (prevMatch) {
              const posDiff = prevMatch.position - match.position;
              change = posDiff > 0 ? `↑ ${posDiff.toFixed(1)}` : posDiff < 0 ? `↓ ${Math.abs(posDiff).toFixed(1)}` : '—';
            }
          } catch (e) {
            // Ignore errors reading prev file
          }
        }

        console.log(`${targetKw.slice(0, 35).padEnd(35)} | ${clicks.toString().padStart(6)} | ${impressions.toString().padStart(11)} | ${ctr.padStart(4)}% | ${position.padStart(8)} | ${change}`);
      } else {
        console.log(`${targetKw.slice(0, 35).padEnd(35)} | ${'-'.padStart(6)} | ${'-'.padStart(11)} | ${'-'.padStart(5)} | ${'-'.padStart(8)} | N/A`);
      }
    }

    // Get page performance
    console.log('\n\n📄 KEY PAGE PERFORMANCE (Last 7 Days)\n');

    const pageResponse = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['page'],
        rowLimit: 100,
      },
    });

    const pageData = pageResponse.data.rows || [];

    console.log('Page | Clicks | Impressions | CTR | Position');
    console.log('-----|--------|-------------|-----|----------');

    for (const keyPage of KEY_PAGES) {
      const fullUrl = `https://perception.to${keyPage}`;
      const match = pageData.find(row => row.keys[0] === fullUrl);

      if (match) {
        const clicks = match.clicks || 0;
        const impressions = match.impressions || 0;
        const ctr = ((match.ctr || 0) * 100).toFixed(1);
        const position = (match.position || 0).toFixed(1);
        console.log(`${keyPage.padEnd(40)} | ${clicks.toString().padStart(6)} | ${impressions.toString().padStart(11)} | ${ctr.padStart(4)}% | ${position.padStart(8)}`);
      } else {
        console.log(`${keyPage.padEnd(40)} | ${'-'.padStart(6)} | ${'-'.padStart(11)} | ${'-'.padStart(5)} | ${'-'.padStart(8)}`);
      }
    }

    // Save current data
    const exportData = {
      exportDate: new Date().toISOString(),
      period: {
        start: formatDate(startDate),
        end: formatDate(endDate),
      },
      keywords: keywordData,
      pages: pageData,
    };

    const outputPath = `${DATA_DIR}/gsc-monitor-${formatDate(endDate)}.json`;
    fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2));

    console.log('\n\n========================================');
    console.log('MONITORING COMPLETE');
    console.log('========================================');
    console.log(`\nData saved to: ${outputPath}`);
    console.log('\nRun this script weekly to track SEO progress.');
    console.log('Compare position changes after SSR fix takes effect (1-2 weeks).\n');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
