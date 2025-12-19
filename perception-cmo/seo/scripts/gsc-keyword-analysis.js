#!/usr/bin/env node
/**
 * Google Search Console Keyword Analysis Script
 *
 * Pulls ranking keywords for perception.to and outputs analysis
 *
 * Usage: node gsc-keyword-analysis.js
 *
 * Requires: gcloud auth application-default login
 */

import { google } from 'googleapis';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'sc-domain:perception.to';
const DAYS_BACK = 90; // Last 90 days of data

async function main() {
  try {
    // Use application default credentials (from gcloud auth)
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - DAYS_BACK);

    const formatDate = (d) => d.toISOString().split('T')[0];

    console.log('\n========================================');
    console.log('GOOGLE SEARCH CONSOLE KEYWORD ANALYSIS');
    console.log('========================================');
    console.log(`Property: ${SITE_URL}`);
    console.log(`Date Range: ${formatDate(startDate)} to ${formatDate(endDate)}`);
    console.log('========================================\n');

    // Query 1: Top keywords by impressions
    console.log('📊 TOP KEYWORDS BY IMPRESSIONS\n');
    const keywordResponse = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['query'],
        rowLimit: 100,
        orderBy: [{ column: 'impressions', direction: 'DESCENDING' }],
      },
    });

    if (keywordResponse.data.rows) {
      console.log('Rank | Keyword | Clicks | Impressions | CTR | Position');
      console.log('-----|---------|--------|-------------|-----|----------');
      keywordResponse.data.rows.forEach((row, i) => {
        const keyword = row.keys[0];
        const clicks = row.clicks || 0;
        const impressions = row.impressions || 0;
        const ctr = ((row.ctr || 0) * 100).toFixed(1);
        const position = (row.position || 0).toFixed(1);
        console.log(`${(i + 1).toString().padStart(4)} | ${keyword.slice(0, 50).padEnd(50)} | ${clicks.toString().padStart(6)} | ${impressions.toString().padStart(11)} | ${ctr.padStart(4)}% | ${position.padStart(8)}`);
      });
    } else {
      console.log('No keyword data available yet.');
    }

    // Query 2: Top pages by clicks
    console.log('\n\n📄 TOP PAGES BY CLICKS\n');
    const pageResponse = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['page'],
        rowLimit: 25,
        orderBy: [{ column: 'clicks', direction: 'DESCENDING' }],
      },
    });

    if (pageResponse.data.rows) {
      console.log('Rank | Page | Clicks | Impressions | CTR | Position');
      console.log('-----|------|--------|-------------|-----|----------');
      pageResponse.data.rows.forEach((row, i) => {
        const page = row.keys[0].replace(SITE_URL, '/');
        const clicks = row.clicks || 0;
        const impressions = row.impressions || 0;
        const ctr = ((row.ctr || 0) * 100).toFixed(1);
        const position = (row.position || 0).toFixed(1);
        console.log(`${(i + 1).toString().padStart(4)} | ${page.slice(0, 50).padEnd(50)} | ${clicks.toString().padStart(6)} | ${impressions.toString().padStart(11)} | ${ctr.padStart(4)}% | ${position.padStart(8)}`);
      });
    }

    // Query 3: Keywords with high impressions but low CTR (opportunities)
    console.log('\n\n🎯 OPTIMIZATION OPPORTUNITIES (High Impressions, Low CTR)\n');
    if (keywordResponse.data.rows) {
      const opportunities = keywordResponse.data.rows
        .filter(row => row.impressions > 50 && (row.ctr || 0) < 0.02)
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 20);

      if (opportunities.length > 0) {
        console.log('Keyword | Impressions | CTR | Position | Action');
        console.log('--------|-------------|-----|----------|--------');
        opportunities.forEach(row => {
          const keyword = row.keys[0];
          const impressions = row.impressions;
          const ctr = ((row.ctr || 0) * 100).toFixed(1);
          const position = (row.position || 0).toFixed(1);
          let action = 'Improve meta title/description';
          if (row.position > 10) action = 'Create dedicated content';
          if (row.position > 5 && row.position <= 10) action = 'Optimize existing page';
          console.log(`${keyword.slice(0, 40).padEnd(40)} | ${impressions.toString().padStart(11)} | ${ctr.padStart(4)}% | ${position.padStart(8)} | ${action}`);
        });
      } else {
        console.log('No significant opportunities found (good CTR across keywords)');
      }
    }

    // Query 4: Keywords close to page 1 (positions 11-20)
    console.log('\n\n🚀 QUICK WINS (Position 11-20 - Almost Page 1)\n');
    if (keywordResponse.data.rows) {
      const quickWins = keywordResponse.data.rows
        .filter(row => row.position >= 11 && row.position <= 20 && row.impressions > 20)
        .sort((a, b) => a.position - b.position)
        .slice(0, 15);

      if (quickWins.length > 0) {
        console.log('Keyword | Position | Impressions | Page Needed');
        console.log('--------|----------|-------------|-------------');
        quickWins.forEach(row => {
          const keyword = row.keys[0];
          const position = (row.position || 0).toFixed(1);
          const impressions = row.impressions;
          console.log(`${keyword.slice(0, 45).padEnd(45)} | ${position.padStart(8)} | ${impressions.toString().padStart(11)} | Optimize or create`);
        });
      } else {
        console.log('No keywords in position 11-20 range yet.');
      }
    }

    // Query 5: Brand vs non-brand split
    console.log('\n\n🏷️ BRAND VS NON-BRAND KEYWORDS\n');
    if (keywordResponse.data.rows) {
      const brandKeywords = keywordResponse.data.rows.filter(row =>
        row.keys[0].toLowerCase().includes('perception')
      );
      const nonBrandKeywords = keywordResponse.data.rows.filter(row =>
        !row.keys[0].toLowerCase().includes('perception')
      );

      const brandClicks = brandKeywords.reduce((sum, r) => sum + (r.clicks || 0), 0);
      const brandImpressions = brandKeywords.reduce((sum, r) => sum + (r.impressions || 0), 0);
      const nonBrandClicks = nonBrandKeywords.reduce((sum, r) => sum + (r.clicks || 0), 0);
      const nonBrandImpressions = nonBrandKeywords.reduce((sum, r) => sum + (r.impressions || 0), 0);

      console.log(`Brand Keywords: ${brandKeywords.length} keywords`);
      console.log(`  - Clicks: ${brandClicks}`);
      console.log(`  - Impressions: ${brandImpressions}`);
      console.log(`\nNon-Brand Keywords: ${nonBrandKeywords.length} keywords`);
      console.log(`  - Clicks: ${nonBrandClicks}`);
      console.log(`  - Impressions: ${nonBrandImpressions}`);
      console.log(`\nNon-Brand Ratio: ${((nonBrandClicks / (brandClicks + nonBrandClicks)) * 100).toFixed(1)}% of clicks`);
    }

    // Export to JSON for further analysis
    const exportData = {
      exportDate: new Date().toISOString(),
      dateRange: {
        start: formatDate(startDate),
        end: formatDate(endDate),
      },
      keywords: keywordResponse.data.rows || [],
      pages: pageResponse.data.rows || [],
    };

    const outputPath = __dirname + '/../data/gsc-export-' + formatDate(new Date()) + '.json';
    fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2));
    console.log(`\n\n✅ Data exported to: ${outputPath}`);

    console.log('\n========================================');
    console.log('ANALYSIS COMPLETE');
    console.log('========================================\n');

  } catch (error) {
    if (error.message.includes('permission') || error.message.includes('403')) {
      console.error('\n❌ Permission Error');
      console.error('Make sure the Search Console API is enabled and you have access to the property.');
      console.error('\nSteps to fix:');
      console.error('1. Run: gcloud auth application-default login');
      console.error('2. Enable Search Console API in GCP Console');
      console.error('3. Ensure you have access to the property in Search Console');
    } else if (error.message.includes('not found') || error.message.includes('404')) {
      console.error('\n❌ Property Not Found');
      console.error(`The property "${SITE_URL}" was not found in your Search Console.`);
      console.error('\nMake sure:');
      console.error('1. The property exists in Google Search Console');
      console.error('2. You have verified ownership');
      console.error('3. The URL matches exactly (including trailing slash)');
    } else {
      console.error('\n❌ Error:', error.message);
      console.error('\nFull error:', error);
    }
    process.exit(1);
  }
}

main();
