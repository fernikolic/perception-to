/**
 * Fetch and cache historical sentiment data for SEO
 *
 * This script runs once at build time to fetch all historical sentiment data
 * and save it to a static JSON file. The middleware reads from this cache
 * to inject real data into SSR content for search engines.
 *
 * Usage: node scripts/fetch-sentiment-cache.js
 */

const fs = require('fs');
const path = require('path');

const API_BASE = 'https://btcpapifunction-45998414364.us-central1.run.app';
const ENDPOINT = '/btcpapifunction/fear-greed-index';

// Output path for cached data
const OUTPUT_PATH = path.join(__dirname, '../functions/sentiment-cache.json');

// Fetch sentiment data for a date range
async function fetchSentimentData(startDate, endDate) {
  const params = new URLSearchParams({ startDate, endDate });
  const url = `${API_BASE}${ENDPOINT}?${params}`;

  console.log(`Fetching: ${startDate} to ${endDate}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// Get sentiment category from score
function getSentimentCategory(score) {
  if (score <= 20) return 'Extreme Fear';
  if (score <= 40) return 'Fear';
  if (score <= 60) return 'Neutral';
  if (score <= 80) return 'Greed';
  return 'Extreme Greed';
}

// Format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

async function main() {
  console.log('🔄 Fetching historical sentiment data...\n');

  // Fetch data from January 2023 to today
  const startDate = '2023-01-01';
  const endDate = formatDate(new Date());

  try {
    const rawData = await fetchSentimentData(startDate, endDate);

    if (!rawData || rawData.length === 0) {
      console.log('⚠️  No data returned from API');
      return;
    }

    console.log(`✅ Fetched ${rawData.length} days of sentiment data\n`);

    // Transform to a lookup object keyed by date
    const sentimentCache = {};

    rawData.forEach(day => {
      const dateKey = day.date; // Already in YYYY-MM-DD format

      sentimentCache[dateKey] = {
        score: day.fear_greed_index,
        category: getSentimentCategory(day.fear_greed_index),
        positive: day.positive_count,
        neutral: day.neutral_count,
        negative: day.negative_count,
        total: day.total_count
      };
    });

    // Calculate monthly aggregates
    const monthlyCache = {};
    const monthlyData = {};

    rawData.forEach(day => {
      const [year, month] = day.date.split('-');
      const monthKey = `${year}-${month}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          scores: [],
          totalSources: 0,
          days: 0
        };
      }

      monthlyData[monthKey].scores.push(day.fear_greed_index);
      monthlyData[monthKey].totalSources += day.total_count;
      monthlyData[monthKey].days++;
    });

    // Calculate monthly averages
    Object.entries(monthlyData).forEach(([monthKey, data]) => {
      const avgScore = Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length);
      const fearDays = data.scores.filter(s => s < 30).length;
      const greedDays = data.scores.filter(s => s > 70).length;

      monthlyCache[monthKey] = {
        avgScore,
        category: getSentimentCategory(avgScore),
        totalSources: data.totalSources,
        days: data.days,
        fearDays,
        greedDays,
        neutralDays: data.days - fearDays - greedDays
      };
    });

    // Build final cache object
    const cache = {
      generated: new Date().toISOString(),
      dataRange: { start: startDate, end: endDate },
      totalDays: Object.keys(sentimentCache).length,
      daily: sentimentCache,
      monthly: monthlyCache
    };

    // Write to file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(cache, null, 2));

    console.log(`📁 Saved to: ${OUTPUT_PATH}`);
    console.log(`📊 Total days: ${cache.totalDays}`);
    console.log(`📅 Date range: ${startDate} to ${endDate}`);
    console.log(`📆 Months: ${Object.keys(monthlyCache).length}`);

    // Show sample data
    const sampleDate = Object.keys(sentimentCache)[Math.floor(Object.keys(sentimentCache).length / 2)];
    console.log(`\n📝 Sample data for ${sampleDate}:`);
    console.log(JSON.stringify(sentimentCache[sampleDate], null, 2));

  } catch (error) {
    console.error('❌ Error fetching sentiment data:', error.message);
    process.exit(1);
  }
}

main();
