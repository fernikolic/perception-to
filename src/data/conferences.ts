// Auto-generated conference data
// Last updated: 2025-09-29T22:39:30.094Z
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
    "date": "2025-10-01",
    "name": "Bitcoin 2025",
    "location": "Miami, USA",
    "type": "Bitcoin",
    "duration": "Oct 01-03",
    "monthYear": "September 2025",
    "dateDisplay": "Sep 30, 2025"
  },
  {
    "date": "2025-10-10",
    "name": "TOKEN2049 Singapore",
    "location": "Singapore",
    "type": "Blockchain",
    "duration": "Oct 10-11",
    "monthYear": "October 2025",
    "dateDisplay": "Oct 9, 2025"
  },
  {
    "date": "2025-11-01",
    "name": "Consensus 2025",
    "location": "New York, USA",
    "type": "Blockchain",
    "duration": "Nov 01-03",
    "monthYear": "October 2025",
    "dateDisplay": "Oct 31, 2025"
  },
  {
    "date": "2025-11-15",
    "name": "Korea Blockchain Week 2025",
    "location": "Seoul, South Korea",
    "type": "Blockchain",
    "duration": "Nov 15-17",
    "monthYear": "November 2025",
    "dateDisplay": "Nov 14, 2025"
  },
  {
    "date": "2025-12-01",
    "name": "Paris Blockchain Week 2025",
    "location": "Paris, France",
    "type": "Blockchain",
    "duration": "Dec 01-03",
    "monthYear": "November 2025",
    "dateDisplay": "Nov 30, 2025"
  },
  {
    "date": "2025-12-10",
    "name": "Solana Breakpoint 2025",
    "location": "Lisbon, Portugal",
    "type": "Blockchain",
    "duration": "Dec 10-12",
    "monthYear": "December 2025",
    "dateDisplay": "Dec 9, 2025"
  },
  {
    "date": "2026-03-01",
    "name": "EthCC 2026",
    "location": "Paris, France",
    "type": "Blockchain",
    "duration": "Mar 01-03",
    "monthYear": "February 2026",
    "dateDisplay": "Feb 28, 2026"
  },
  {
    "date": "2026-04-15",
    "name": "Devcon 2026",
    "location": "Bogotá, Colombia",
    "type": "Blockchain",
    "duration": "Apr 15-18",
    "monthYear": "April 2026",
    "dateDisplay": "Apr 14, 2026"
  },
  {
    "date": "2026-05-05",
    "name": "Permissionless 2026",
    "location": "Austin, USA",
    "type": "Blockchain",
    "duration": "May 05-07",
    "monthYear": "May 2026",
    "dateDisplay": "May 4, 2026"
  },
  {
    "date": "2026-06-20",
    "name": "Mining Disrupt 2026",
    "location": "Miami, USA",
    "type": "Mining",
    "duration": "Jun 20-22",
    "monthYear": "June 2026",
    "dateDisplay": "Jun 19, 2026"
  },
  {
    "date": "2026-07-10",
    "name": "Stablecoin Summit 2026",
    "location": "London, UK",
    "type": "Institutional",
    "duration": "Jul 10-11",
    "monthYear": "July 2026",
    "dateDisplay": "Jul 9, 2026"
  },
  {
    "date": "2026-08-15",
    "name": "CBDC Summit 2026",
    "location": "Tokyo, Japan",
    "type": "Institutional",
    "duration": "Aug 15-16",
    "monthYear": "August 2026",
    "dateDisplay": "Aug 14, 2026"
  },
  {
    "date": "2026-09-01",
    "name": "Money20/20 USA 2026",
    "location": "Las Vegas, USA",
    "type": "Institutional",
    "duration": "Sep 01-03",
    "monthYear": "August 2026",
    "dateDisplay": "Aug 31, 2026"
  },
  {
    "date": "2026-09-15",
    "name": "Digital Asset Summit 2026",
    "location": "New York, USA",
    "type": "Institutional",
    "duration": "Sep 15-16",
    "monthYear": "September 2026",
    "dateDisplay": "Sep 14, 2026"
  },
  {
    "date": "2026-10-05",
    "name": "Crypto Banking Summit 2026",
    "location": "Zurich, Switzerland",
    "type": "Institutional",
    "duration": "Oct 05-06",
    "monthYear": "October 2026",
    "dateDisplay": "Oct 4, 2026"
  },
  {
    "date": "2026-10-20",
    "name": "Asian Crypto Week 2026",
    "location": "Hong Kong, China",
    "type": "Blockchain",
    "duration": "Oct 20-25",
    "monthYear": "October 2026",
    "dateDisplay": "Oct 19, 2026"
  },
  {
    "date": "2026-11-10",
    "name": "European Blockchain Convention 2026",
    "location": "Barcelona, Spain",
    "type": "Blockchain",
    "duration": "Nov 10-12",
    "monthYear": "November 2026",
    "dateDisplay": "Nov 9, 2026"
  },
  {
    "date": "2026-11-20",
    "name": "Blockchain Expo North America 2026",
    "location": "Santa Clara, USA",
    "type": "Blockchain",
    "duration": "Nov 20-21",
    "monthYear": "November 2026",
    "dateDisplay": "Nov 19, 2026"
  },
  {
    "date": "2026-12-05",
    "name": "Middle East Blockchain Summit 2026",
    "location": "Dubai, UAE",
    "type": "Blockchain",
    "duration": "Dec 05-06",
    "monthYear": "December 2026",
    "dateDisplay": "Dec 4, 2026"
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
