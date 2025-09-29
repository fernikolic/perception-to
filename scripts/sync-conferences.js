#!/usr/bin/env node
/**
 * Sync Conference Data from External API to Site
 *
 * Fetches latest conference data from crypto-conference-api
 * and updates the conference pages and TypeScript files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'https://fernikolic.github.io/crypto-conference-api/data/events.json';

// Fetch conference data
async function fetchConferenceData() {
  console.log('📡 Fetching conference data from API...');

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Fetched ${data.total_events} events`);
    return data.events;
  } catch (error) {
    console.error('❌ Error fetching conference data:', error);
    return null;
  }
}

// Transform API data to site format
function transformEvent(event) {
  const startDate = new Date(event.start_date);
  const month = startDate.toLocaleString('en-US', { month: 'long' });
  const year = startDate.getFullYear();

  // Calculate duration string
  let duration;
  if (event.end_date && event.end_date !== event.start_date) {
    const endDate = new Date(event.end_date);
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const monthAbbr = startDate.toLocaleString('en-US', { month: 'short' });
    duration = `${monthAbbr} ${startDay}-${endDay}`;
  } else {
    duration = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });
  }

  return {
    date: event.start_date,
    name: event.name,
    location: event.location,
    type: event.category || 'Blockchain',
    duration: duration,
    monthYear: `${month} ${year}`,
    dateDisplay: startDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}

// Update TypeScript conference files
async function updateConferenceFiles(events) {
  const transformedEvents = events.map(transformEvent);

  // Sort by date
  transformedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Generate TypeScript code
  const tsCode = `// Auto-generated conference data
// Last updated: ${new Date().toISOString()}
// Source: crypto-conference-api

export interface Conference {
  date: string;
  name: string;
  location: string;
  type: string;
  duration: string;
  monthYear: string;
  dateDisplay: string;
}

export const allConferences: Conference[] = ${JSON.stringify(transformedEvents, null, 2)};

// Filter out NFT/DeFi/Metaverse conferences
export const conferences: Conference[] = allConferences.filter(conf => {
  const lowerType = conf.type.toLowerCase();
  return !lowerType.includes('nft') &&
         !lowerType.includes('defi') &&
         !lowerType.includes('metaverse') &&
         !(lowerType === 'nft' || lowerType === 'defi' || lowerType === 'web3' ||
           lowerType === 'ethereum' || lowerType === 'metaverse');
});
`;

  // Write to src/data/conferences.ts
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'conferences.ts');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, tsCode);

  console.log(`✅ Updated ${outputPath}`);
  console.log(`📊 Total events: ${transformedEvents.length}`);

  return transformedEvents;
}

// Main execution
async function main() {
  console.log('🚀 Starting conference data sync...\n');

  const events = await fetchConferenceData();

  if (!events || events.length === 0) {
    console.error('❌ No events to sync');
    process.exit(1);
  }

  await updateConferenceFiles(events);

  console.log('\n✅ Conference sync complete!');
  console.log('💡 Next steps:');
  console.log('   1. Run: npm run sitemap:conferences');
  console.log('   2. Commit and push changes');
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});