#!/usr/bin/env node
/**
 * Fetch Conference Data using Perplexity API
 *
 * Uses Perplexity's search API to find the latest crypto conferences
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const API_URL = 'https://api.perplexity.ai/chat/completions';

async function fetchConferences() {
  if (!PERPLEXITY_API_KEY) {
    console.error('❌ PERPLEXITY_API_KEY environment variable not set');
    console.log('💡 Set it with: export PERPLEXITY_API_KEY=your-key-here');
    return null;
  }

  console.log('📡 Fetching conferences from Perplexity API...');

  const currentDate = new Date().toISOString().split('T')[0];

  const query = `Find all major cryptocurrency, blockchain, and Bitcoin conferences scheduled from ${currentDate} through December 2026. Include:

MAJOR CONFERENCES:
- Bitcoin conferences (Bitcoin 2025/2026, BTC Prague, Bitcoin Amsterdam, etc.)
- TOKEN2049 (all locations)
- Consensus
- Korea Blockchain Week
- Paris Blockchain Week
- Solana Breakpoint
- EthCC, Devcon
- Permissionless
- Mining conferences (Mining Disrupt, etc.)
- Enterprise blockchain events

INSTITUTIONAL & FINANCE:
- Stablecoin conferences
- CBDC summits
- Traditional finance crypto events (Money20/20, etc.)
- Digital asset institutional conferences
- Crypto banking summits

REGIONAL EVENTS:
- Asian crypto events
- European blockchain conferences
- Americas crypto conferences
- Middle East blockchain events

For each event, provide EXACTLY this JSON format:
{
  "name": "Event Name",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "location": "City, Country",
  "type": "Bitcoin|Blockchain|Institutional|Academic|etc",
  "duration": "Mon DD-DD",
  "description": "Brief description"
}

Return ONLY a valid JSON array with 60+ upcoming events. Sort by date.`;

  const payload = {
    model: 'sonar',
    messages: [
      {
        role: 'system',
        content: 'You are a crypto events researcher. Return ONLY a valid JSON array. No explanatory text before or after. Just the JSON array starting with [ and ending with ].'
      },
      {
        role: 'user',
        content: query
      }
    ],
    max_tokens: 8000,
    temperature: 0.1
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const content = result.choices[0].message.content;

    // Extract JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('❌ No JSON array found in response');
      return null;
    }

    const events = JSON.parse(jsonMatch[0]);
    console.log(`✅ Fetched ${events.length} events from Perplexity`);

    return events;
  } catch (error) {
    console.error('❌ Error fetching conferences:', error.message);
    return null;
  }
}

// Transform to site format
function transformEvents(events) {
  return events.map(event => {
    const startDate = new Date(event.start_date);
    const month = startDate.toLocaleString('en-US', { month: 'long' });
    const year = startDate.getFullYear();

    // Auto-generate duration if not provided
    let duration = event.duration;
    if (!duration && event.end_date && event.end_date !== event.start_date) {
      const endDate = new Date(event.end_date);
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();
      const monthAbbr = startDate.toLocaleString('en-US', { month: 'short' });
      duration = `${monthAbbr} ${startDay}-${endDay}`;
    } else if (!duration) {
      duration = startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    }

    return {
      date: event.start_date,
      name: event.name,
      location: event.location,
      type: event.type || 'Blockchain',
      duration: duration,
      monthYear: `${month} ${year}`,
      dateDisplay: startDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  }).filter(event => {
    // Filter out past events
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate >= now;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Save to TypeScript file
function saveConferences(events) {
  const tsCode = `// Auto-generated conference data
// Last updated: ${new Date().toISOString()}
// Source: Perplexity API
// DO NOT EDIT MANUALLY - This file is automatically updated weekly

export interface Conference {
  date: string;
  name: string;
  location: string;
  type: string;
  duration: string;
  monthYear: string;
  dateDisplay: string;
}

export const allConferences: Conference[] = ${JSON.stringify(events, null, 2)};

// Filter out NFT/DeFi/Metaverse/Ethereum focused conferences
// Focus on Bitcoin, institutional blockchain, and enterprise events
export const conferences: Conference[] = allConferences.filter(conf => {
  const lowerType = conf.type.toLowerCase();
  const lowerName = conf.name.toLowerCase();

  return !lowerType.includes('nft') &&
         !lowerType.includes('defi') &&
         !lowerType.includes('metaverse') &&
         !lowerName.includes('nft') &&
         !lowerName.includes('defi') &&
         !lowerName.includes('ethereum') &&
         !(lowerType === 'nft' || lowerType === 'defi' || lowerType === 'web3' ||
           lowerType === 'ethereum' || lowerType === 'metaverse');
});
`;

  const outputPath = path.join(__dirname, '..', 'src', 'data', 'conferences.ts');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, tsCode);

  console.log(`✅ Saved ${events.length} conferences to ${outputPath}`);

  return events;
}

// Main
async function main() {
  console.log('🚀 Starting conference data fetch...\n');

  const events = await fetchConferences();

  if (!events || events.length === 0) {
    console.error('❌ No events fetched');
    process.exit(1);
  }

  const transformed = transformEvents(events);
  saveConferences(transformed);

  console.log(`\n✅ Success! Updated ${transformed.length} conferences`);
  console.log('💡 Next: Run npm run sitemap:conferences to update sitemap');
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});