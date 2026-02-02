// Auto-generated conference data
// Last updated: 2026-01-18T02:07:35.893Z
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
    "date": "2026-02-17",
    "name": "ETHDenver Innovation Festival",
    "location": "Denver, CO, USA",
    "type": "Ethereum|Web3",
    "duration": "Feb 17-21",
    "monthYear": "February 2026",
    "dateDisplay": "Feb 17, 2026"
  },
  {
    "date": "2026-03-17",
    "name": "DC Blockchain Summit",
    "location": "Washington DC, USA",
    "type": "Blockchain|Policy",
    "duration": "Mar 17-18",
    "monthYear": "March 2026",
    "dateDisplay": "Mar 17, 2026"
  },
  {
    "date": "2026-03-30",
    "name": "Ethereum Community Conference (EthCC)",
    "location": "Cannes, France",
    "type": "Ethereum|Web3",
    "duration": "Mar 30-Apr 2",
    "monthYear": "March 2026",
    "dateDisplay": "Mar 30, 2026"
  },
  {
    "date": "2026-04-27",
    "name": "Bitcoin 2026",
    "location": "Las Vegas, NV, USA",
    "type": "Bitcoin",
    "duration": "Apr 27-29",
    "monthYear": "April 2026",
    "dateDisplay": "Apr 27, 2026"
  },
  {
    "date": "2026-05-05",
    "name": "Consensus Miami 2026",
    "location": "Miami, FL, USA",
    "type": "Blockchain|Web3|Institutional",
    "duration": "May 5-7",
    "monthYear": "May 2026",
    "dateDisplay": "May 5, 2026"
  },
  {
    "date": "2026-06-01",
    "name": "IEEE ICBC 2026",
    "location": "Brisbane, Australia",
    "type": "Blockchain|Technical",
    "duration": "Jun 1-5",
    "monthYear": "June 2026",
    "dateDisplay": "Jun 1, 2026"
  },
  {
    "date": "2026-06-08",
    "name": "ETHConf",
    "location": "Javits Center, New York, NY, USA",
    "type": "Ethereum|Web3",
    "duration": "Jun 8-10",
    "monthYear": "June 2026",
    "dateDisplay": "Jun 8, 2026"
  },
  {
    "date": "2026-07-21",
    "name": "Blockchain Futurist Conference",
    "location": "Toronto, Canada",
    "type": "Blockchain|Web3",
    "duration": "Jul 21-22",
    "monthYear": "July 2026",
    "dateDisplay": "Jul 21, 2026"
  },
  {
    "date": "2026-09-14",
    "name": "Splunk .conf26",
    "location": "Denver, Colorado, USA",
    "type": "Security|Blockchain",
    "duration": "Sep 14-17",
    "monthYear": "September 2026",
    "dateDisplay": "Sep 14, 2026"
  },
  {
    "date": "2026-12-01",
    "name": "Blockchain Life Forum 2026",
    "location": "Dubai, UAE",
    "type": "Blockchain|Web3",
    "duration": "Dec 1-2",
    "monthYear": "December 2026",
    "dateDisplay": "Dec 1, 2026"
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
