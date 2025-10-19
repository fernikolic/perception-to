// Auto-generated conference data
// Last updated: 2025-10-19T01:53:25.153Z
// Source: Perplexity API (Sonar with real-time web search)
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

export const allConferences: Conference[] = [
  {
    "date": "2025-11-13",
    "name": "Bitcoin Amsterdam",
    "location": "Amsterdam, Netherlands",
    "type": "Bitcoin",
    "duration": "Nov 13-14",
    "monthYear": "November 2025",
    "dateDisplay": "Nov 13, 2025"
  },
  {
    "date": "2025-12-08",
    "name": "Bitcoin Abu Dhabi",
    "location": "Abu Dhabi, UAE",
    "type": "Bitcoin",
    "duration": "Dec 8-9",
    "monthYear": "December 2025",
    "dateDisplay": "Dec 8, 2025"
  },
  {
    "date": "2026-04-27",
    "name": "Bitcoin 2026",
    "location": "Las Vegas, USA",
    "type": "Bitcoin",
    "duration": "Apr 27-29",
    "monthYear": "April 2026",
    "dateDisplay": "Apr 27, 2026"
  },
  {
    "date": "2026-08-27",
    "name": "Bitcoin Hong Kong",
    "location": "Hong Kong, China",
    "type": "Bitcoin",
    "duration": "Aug 27-28",
    "monthYear": "August 2026",
    "dateDisplay": "Aug 27, 2026"
  }
];

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
