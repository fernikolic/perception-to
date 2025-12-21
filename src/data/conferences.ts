// Auto-generated conference data
// Last updated: 2025-12-21T02:01:27.016Z
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
    "date": "2026-04-27",
    "name": "Bitcoin 2026",
    "location": "Las Vegas, USA",
    "type": "Bitcoin",
    "duration": "Apr 27-29",
    "monthYear": "April 2026",
    "dateDisplay": "Apr 27, 2026"
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
