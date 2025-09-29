// Auto-generated conference data
// Last updated: 2025-09-29T22:44:53.833Z
// Source: OpenAI API (GPT-4)
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
    "date": "2025-10-15",
    "name": "Bitcoin 2025",
    "location": "Miami, USA",
    "type": "Bitcoin",
    "duration": "Oct 15-17",
    "monthYear": "October 2025",
    "dateDisplay": "Oct 15, 2025"
  },
  {
    "date": "2025-11-10",
    "name": "TOKEN2049 Singapore",
    "location": "Singapore",
    "type": "Blockchain",
    "duration": "Nov 10-11",
    "monthYear": "November 2025",
    "dateDisplay": "Nov 10, 2025"
  },
  {
    "date": "2025-11-20",
    "name": "Consensus 2025",
    "location": "New York, USA",
    "type": "Blockchain",
    "duration": "Nov 20-22",
    "monthYear": "November 2025",
    "dateDisplay": "Nov 20, 2025"
  },
  {
    "date": "2025-12-01",
    "name": "Korea Blockchain Week 2025",
    "location": "Seoul, South Korea",
    "type": "Blockchain",
    "duration": "Dec 1-5",
    "monthYear": "December 2025",
    "dateDisplay": "Dec 1, 2025"
  },
  {
    "date": "2026-03-18",
    "name": "Paris Blockchain Week 2026",
    "location": "Paris, France",
    "type": "Blockchain",
    "duration": "Mar 18-22",
    "monthYear": "March 2026",
    "dateDisplay": "Mar 18, 2026"
  },
  {
    "date": "2026-04-10",
    "name": "Solana Breakpoint 2026",
    "location": "Lisbon, Portugal",
    "type": "Blockchain",
    "duration": "Apr 10-12",
    "monthYear": "April 2026",
    "dateDisplay": "Apr 10, 2026"
  },
  {
    "date": "2026-07-15",
    "name": "EthCC 2026",
    "location": "Paris, France",
    "type": "Blockchain",
    "duration": "Jul 15-17",
    "monthYear": "July 2026",
    "dateDisplay": "Jul 15, 2026"
  },
  {
    "date": "2026-08-10",
    "name": "Devcon 2026",
    "location": "Bogotá, Colombia",
    "type": "Blockchain",
    "duration": "Aug 10-13",
    "monthYear": "August 2026",
    "dateDisplay": "Aug 10, 2026"
  },
  {
    "date": "2026-09-05",
    "name": "Permissionless 2026",
    "location": "Austin, USA",
    "type": "Blockchain",
    "duration": "Sep 5-7",
    "monthYear": "September 2026",
    "dateDisplay": "Sep 5, 2026"
  },
  {
    "date": "2026-09-20",
    "name": "Mining Disrupt 2026",
    "location": "Miami, USA",
    "type": "Mining",
    "duration": "Sep 20-22",
    "monthYear": "September 2026",
    "dateDisplay": "Sep 20, 2026"
  },
  {
    "date": "2026-10-10",
    "name": "Stablecoin Summit 2026",
    "location": "Zurich, Switzerland",
    "type": "Institutional",
    "duration": "Oct 10-11",
    "monthYear": "October 2026",
    "dateDisplay": "Oct 10, 2026"
  },
  {
    "date": "2026-11-15",
    "name": "CBDC Summit 2026",
    "location": "London, UK",
    "type": "Institutional",
    "duration": "Nov 15-16",
    "monthYear": "November 2026",
    "dateDisplay": "Nov 15, 2026"
  },
  {
    "date": "2026-11-20",
    "name": "Money20/20 USA 2026",
    "location": "Las Vegas, USA",
    "type": "Institutional",
    "duration": "Nov 20-23",
    "monthYear": "November 2026",
    "dateDisplay": "Nov 20, 2026"
  },
  {
    "date": "2026-12-05",
    "name": "Digital Asset Summit 2026",
    "location": "New York, USA",
    "type": "Institutional",
    "duration": "Dec 5-6",
    "monthYear": "December 2026",
    "dateDisplay": "Dec 5, 2026"
  },
  {
    "date": "2026-12-15",
    "name": "Crypto Banking Summit 2026",
    "location": "Frankfurt, Germany",
    "type": "Institutional",
    "duration": "Dec 15-16",
    "monthYear": "December 2026",
    "dateDisplay": "Dec 15, 2026"
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
