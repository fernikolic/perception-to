// Generate sitemap for crypto conference pages
const fs = require('fs');
const path = require('path');

const conferences = [
  { date: '2025-01-14', name: 'CfC St. Moritz', location: 'St. Moritz, Switzerland', type: 'Digital Assets/Institutional', duration: 'Jan 14-16', monthYear: 'January 2025', dateDisplay: 'Jan 14, 2025' },
  { date: '2025-01-21', name: 'Institutional Investor Summit: UK & Ireland', location: 'Bagshot, UK', type: 'Institutional Investment', duration: 'Jan 21', monthYear: 'January 2025', dateDisplay: 'Jan 21, 2025' },
  { date: '2025-03-14', name: 'Canadian Bitcoin Conference', location: 'Montreal, Canada', type: 'Bitcoin', duration: 'Mar 14', monthYear: 'March 2025', dateDisplay: 'Mar 14, 2025' },
  { date: '2025-03-19', name: 'Next Block Expo', location: 'Warsaw, Poland', type: 'Blockchain', duration: 'Mar 19-20', monthYear: 'March 2025', dateDisplay: 'Mar 19, 2025' },
  { date: '2025-03-26', name: 'DC Blockchain Summit', location: 'Washington, DC, USA', type: 'Blockchain Policy', duration: 'Mar 26', monthYear: 'March 2025', dateDisplay: 'Mar 26, 2025' },
  { date: '2025-03-26', name: 'Real World Crypto Symposium', location: 'Sofia, Bulgaria', type: 'Cryptography', duration: 'Mar 26-28', monthYear: 'March 2025', dateDisplay: 'Mar 26, 2025' },
  { date: '2025-04-04', name: 'MIT Bitcoin Hackathon', location: 'Cambridge, Massachusetts, USA', type: 'Bitcoin Technical', duration: 'Apr 04-06', monthYear: 'April 2025', dateDisplay: 'Apr 04, 2025' },
  { date: '2025-04-05', name: 'MIT Bitcoin Expo', location: 'Cambridge, Massachusetts, USA', type: 'Bitcoin Technical', duration: 'Apr 05-06', monthYear: 'April 2025', dateDisplay: 'Apr 05, 2025' },
  { date: '2025-04-08', name: 'Paris Blockchain Week', location: 'Paris, France', type: 'Blockchain', duration: 'Apr 08-11', monthYear: 'April 2025', dateDisplay: 'Apr 08, 2025' },
  { date: '2025-04-24', name: 'Bitcoin Standard Corporations Investor Day', location: 'New York City, USA', type: 'Corporate Bitcoin', duration: 'Apr 24', monthYear: 'April 2025', dateDisplay: 'Apr 24, 2025' },
  { date: '2025-04-24', name: 'AIMA Digital Assets Conference', location: 'New York City, USA', type: 'Institutional Digital Assets', duration: 'Apr 24', monthYear: 'April 2025', dateDisplay: 'Apr 24, 2025' },
  { date: '2025-04-25', name: 'Cornell Blockchain Conference', location: 'New York City, USA', type: 'Academic Blockchain', duration: 'Apr 25', monthYear: 'April 2025', dateDisplay: 'Apr 25, 2025' },
  { date: '2025-04-25', name: 'Harvard Blockchain Conference', location: 'Cambridge, USA', type: 'Academic Blockchain', duration: 'Apr 25', monthYear: 'April 2025', dateDisplay: 'Apr 25, 2025' },
  { date: '2025-04-25', name: 'ONCHAIN 2025 - Real World Assets Conference', location: 'Hong Kong', type: 'RWA/Traditional Finance', duration: 'Apr 25-26', monthYear: 'April 2025', dateDisplay: 'Apr 25, 2025' },
  { date: '2025-05-06', name: 'Bitcoin for Corporations', location: 'Orlando, Florida, USA', type: 'Bitcoin Corporate', duration: 'May 06-07', monthYear: 'May 2025', dateDisplay: 'May 06, 2025' },
  { date: '2025-05-07', name: 'Bitcoin++ Austin', location: 'Austin, Texas, USA', type: 'Bitcoin Technical', duration: 'May 07-08', monthYear: 'May 2025', dateDisplay: 'May 07, 2025' },
  { date: '2025-05-13', name: 'Blockchain Futurist Conference', location: 'Toronto, Canada', type: 'Blockchain', duration: 'May 13-14', monthYear: 'May 2025', dateDisplay: 'May 13, 2025' },
  { date: '2025-05-14', name: 'Consensus Toronto', location: 'Toronto, Canada', type: 'Blockchain/Institutional', duration: 'May 14-16', monthYear: 'May 2025', dateDisplay: 'May 14, 2025' },
  { date: '2025-05-14', name: 'HODL Summit', location: 'Dubai, UAE', type: 'Institutional Blockchain', duration: 'May 14-15', monthYear: 'May 2025', dateDisplay: 'May 14, 2025' },
  { date: '2025-05-26', name: 'Oslo Freedom Forum', location: 'Oslo, Norway', type: 'Bitcoin/Freedom', duration: 'May 26-28', monthYear: 'May 2025', dateDisplay: 'May 26, 2025' },
  { date: '2025-05-27', name: 'Bitcoin Conference 2025', location: 'Las Vegas, Nevada, USA', type: 'Bitcoin', duration: 'May 27-29', monthYear: 'May 2025', dateDisplay: 'May 27, 2025' },
  { date: '2025-06-02', name: 'ICBC 2025', location: 'Pisa, Italy', type: 'Academic Blockchain', duration: 'Jun 02-04', monthYear: 'June 2025', dateDisplay: 'Jun 02, 2025' },
  { date: '2025-06-02', name: 'Canadian Finance Summit', location: 'Toronto, Canada', type: 'Banking/FinTech', duration: 'Jun 02-03', monthYear: 'June 2025', dateDisplay: 'Jun 02, 2025' },
  { date: '2025-06-03', name: 'Money20/20 Europe', location: 'Amsterdam, Netherlands', type: 'FinTech/Payments', duration: 'Jun 03-05', monthYear: 'June 2025', dateDisplay: 'Jun 03, 2025' },
  { date: '2025-06-05', name: 'Crypto Valley Conference', location: 'Rotkreuz, Switzerland', type: 'Institutional Crypto', duration: 'Jun 05-06', monthYear: 'June 2025', dateDisplay: 'Jun 05, 2025' },
  { date: '2025-06-12', name: 'Blockchain Finance Summit', location: 'London, UK', type: 'Traditional Finance/Blockchain', duration: 'Jun 12', monthYear: 'June 2025', dateDisplay: 'Jun 12, 2025' },
  { date: '2025-06-19', name: 'BTC Prague', location: 'Prague, Czech Republic', type: 'Bitcoin', duration: 'Jun 19-21', monthYear: 'June 2025', dateDisplay: 'Jun 19, 2025' },
  { date: '2025-07-03', name: 'Blockchain Expo World', location: 'Istanbul, Turkey', type: 'Blockchain', duration: 'Jul 03-04', monthYear: 'July 2025', dateDisplay: 'Jul 03, 2025' },
  { date: '2025-07-07', name: 'UBC Blockchain Summer Institute', location: 'Vancouver, Canada', type: 'Academic Blockchain', duration: 'Jul 07-18', monthYear: 'July 2025', dateDisplay: 'Jul 07, 2025' },
  { date: '2025-07-24', name: 'Injective Summit: Bridging TradFi & Blockchain', location: 'New York City, USA', type: 'Traditional Finance/Blockchain', duration: 'Jul 24', monthYear: 'July 2025', dateDisplay: 'Jul 24, 2025' },
  { date: '2025-08-04', name: 'Science of Blockchain Conference', location: 'Berkeley, California, USA', type: 'Academic Blockchain', duration: 'Aug 04-06', monthYear: 'August 2025', dateDisplay: 'Aug 04, 2025' },
  { date: '2025-08-07', name: 'Bitcoin++ Riga', location: 'Riga, Latvia', type: 'Bitcoin Technical', duration: 'Aug 07-08', monthYear: 'August 2025', dateDisplay: 'Aug 07, 2025' },
  { date: '2025-08-07', name: 'BitBlockBoom', location: 'Fort Worth, Texas, USA', type: 'Bitcoin', duration: 'Aug 07-09', monthYear: 'August 2025', dateDisplay: 'Aug 07, 2025' },
  { date: '2025-08-09', name: 'Baltic Honeybadger', location: 'Riga, Latvia', type: 'Bitcoin', duration: 'Aug 09-10', monthYear: 'August 2025', dateDisplay: 'Aug 09, 2025' },
  { date: '2025-08-13', name: 'Blockchain Futurist Conference Toronto', location: 'Toronto, Canada', type: 'Blockchain', duration: 'Aug 13-14', monthYear: 'August 2025', dateDisplay: 'Aug 13, 2025' },
  { date: '2025-08-27', name: 'Stablecoin Conference Mexico', location: 'Mexico City, Mexico', type: 'Stablecoin', duration: 'Aug 27-28', monthYear: 'August 2025', dateDisplay: 'Aug 27, 2025' },
  { date: '2025-09-02', name: 'Finance & Crypto Day', location: 'London, UK', type: 'Traditional Finance/Crypto', duration: 'Sep 02', monthYear: 'September 2025', dateDisplay: 'Sep 02, 2025' },
  { date: '2025-09-03', name: 'CONF3RENCE', location: 'Dortmund, Germany', type: 'Blockchain', duration: 'Sep 03-04', monthYear: 'September 2025', dateDisplay: 'Sep 03, 2025' },
  { date: '2025-09-09', name: 'CBDC Conference', location: 'Nassau, Bahamas', type: 'CBDC/Institutional', duration: 'Sep 09-11', monthYear: 'September 2025', dateDisplay: 'Sep 09, 2025' },
  { date: '2025-09-16', name: 'Digital Assets and Blockchain Day', location: 'Toronto, Canada', type: 'Institutional Digital Assets', duration: 'Sep 16', monthYear: 'September 2025', dateDisplay: 'Sep 16, 2025' },
  { date: '2025-09-18', name: 'CBC Summit USA', location: 'Washington, DC, USA', type: 'Crypto Banking', duration: 'Sep 18', monthYear: 'September 2025', dateDisplay: 'Sep 18, 2025' },
  { date: '2025-09-22', name: 'Korea Blockchain Week', location: 'Seoul, South Korea', type: 'Blockchain', duration: 'Sep 22-27', monthYear: 'September 2025', dateDisplay: 'Sep 22, 2025' },
  { date: '2025-09-24', name: 'Global Blockchain & Crypto Symposium', location: 'London, UK', type: 'Institutional Blockchain', duration: 'Sep 24', monthYear: 'September 2025', dateDisplay: 'Sep 24, 2025' },
  { date: '2025-10-01', name: 'TOKEN2049 Singapore', location: 'Singapore', type: 'Institutional Crypto', duration: 'Oct 01-02', monthYear: 'October 2025', dateDisplay: 'Oct 01, 2025' },
  { date: '2025-10-07', name: 'Future of Asset Management North America', location: 'USA', type: 'Asset Management/Digital Assets', duration: 'Oct 07', monthYear: 'October 2025', dateDisplay: 'Oct 07, 2025' },
  { date: '2025-10-12', name: 'Future Blockchain Summit', location: 'Dubai, UAE', type: 'Blockchain/FinTech', duration: 'Oct 12-13', monthYear: 'October 2025', dateDisplay: 'Oct 12, 2025' },
  { date: '2025-10-13', name: 'TABConf', location: 'Georgia, USA', type: 'Bitcoin Technical', duration: 'Oct 13-16', monthYear: 'October 2025', dateDisplay: 'Oct 13, 2025' },
  { date: '2025-10-16', name: 'European Blockchain Convention', location: 'Barcelona, Spain', type: 'Blockchain', duration: 'Oct 16-17', monthYear: 'October 2025', dateDisplay: 'Oct 16, 2025' },
  { date: '2025-10-28', name: 'Blockchain Life', location: 'Dubai, UAE', type: 'Blockchain', duration: 'Oct 28-29', monthYear: 'October 2025', dateDisplay: 'Oct 28, 2025' },
  { date: '2025-10-30', name: 'Blockchain Africa Conference', location: 'Gauteng, South Africa', type: 'Blockchain', duration: 'Oct 30', monthYear: 'October 2025', dateDisplay: 'Oct 30, 2025' },
  { date: '2025-11-03', name: 'OMFIF Public Blockchain Working Group Report Launch', location: 'Virtual', type: 'Banking/Public Blockchain', duration: 'Nov 03', monthYear: 'November 2025', dateDisplay: 'Nov 03, 2025' },
  { date: '2025-11-05', name: 'Blockchain Futurist Conference Miami', location: 'Miami, Florida, USA', type: 'Blockchain', duration: 'Nov 05-06', monthYear: 'November 2025', dateDisplay: 'Nov 05, 2025' },
  { date: '2025-11-07', name: 'SatsConf', location: 'São Paulo, Brazil', type: 'Bitcoin', duration: 'Nov 07-08', monthYear: 'November 2025', dateDisplay: 'Nov 07, 2025' },
  { date: '2025-11-11', name: 'Mining Disrupt', location: 'Dallas, Texas, USA', type: 'Bitcoin Mining', duration: 'Nov 11-13', monthYear: 'November 2025', dateDisplay: 'Nov 11, 2025' },
  { date: '2025-11-13', name: 'Bitcoin Amsterdam', location: 'Amsterdam, Netherlands', type: 'Bitcoin', duration: 'Nov 13-14', monthYear: 'November 2025', dateDisplay: 'Nov 13, 2025' },
  { date: '2025-12-08', name: 'Blockchain Association Policy Summit', location: 'Washington, DC, USA', type: 'Policy/Regulation', duration: 'Dec 08', monthYear: 'December 2025', dateDisplay: 'Dec 08, 2025' },
  { date: '2025-12-08', name: 'Bitcoin Abu Dhabi', location: 'Abu Dhabi, UAE', type: 'Bitcoin', duration: 'Dec 08-09', monthYear: 'December 2025', dateDisplay: 'Dec 08, 2025' },
  { date: '2026-03-17', name: 'CBC Summit Europe', location: 'London, UK', type: 'Crypto Banking', duration: 'Mar 17', monthYear: 'March 2026', dateDisplay: 'Mar 17, 2026' },
  { date: '2026-04-27', name: 'Bitcoin Conference 2026', location: 'Las Vegas, Nevada, USA', type: 'Bitcoin', duration: 'Apr 27-29', monthYear: 'April 2026', dateDisplay: 'Apr 27, 2026' },
  { date: '2026-08-27', name: 'Bitcoin Hong Kong', location: 'Hong Kong', type: 'Bitcoin', duration: 'Aug 27-28', monthYear: 'August 2026', dateDisplay: 'Aug 27, 2026' },
  { date: '2026-09-09', name: 'Stablecon', location: 'Washington, DC, USA', type: 'Stablecoin', duration: 'Sep 09-11', monthYear: 'September 2026', dateDisplay: 'Sep 09, 2026' }
];

// Filter out NFT/DeFi/Metaverse conferences
const filteredConferences = conferences.filter(conf => {
  const lowerType = conf.type.toLowerCase();
  return !lowerType.includes('nft') &&
         !lowerType.includes('defi') &&
         !lowerType.includes('metaverse') &&
         !(lowerType === 'nft' || lowerType === 'defi' || lowerType === 'web3' ||
           lowerType === 'ethereum' || lowerType === 'metaverse');
});

// Generate URL slug from conference name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Generate sitemap entries
const baseUrl = 'https://perception.to';
const currentDate = new Date().toISOString().split('T')[0];
const entries = [];

// Add main crypto-conferences page
entries.push({
  url: `${baseUrl}/crypto-conferences`,
  lastmod: currentDate,
  changefreq: 'weekly',
  priority: '0.8'
});

// Add monthly pages - only include FUTURE/CURRENT months with conferences
const today = new Date();
today.setHours(0, 0, 0, 0);

const monthlyPages = new Set();
const monthlyConferenceCounts = new Map();

filteredConferences.forEach(conf => {
  const date = new Date(conf.date);

  // Only include if conference is today or in the future
  if (date >= today) {
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' }).toLowerCase();
    const monthKey = `${year}/${month}`;

    monthlyPages.add(monthKey);
    monthlyConferenceCounts.set(monthKey, (monthlyConferenceCounts.get(monthKey) || 0) + 1);
  }
});

// Only add monthly pages that have at least one future conference
monthlyPages.forEach(monthPath => {
  const conferenceCount = monthlyConferenceCounts.get(monthPath) || 0;
  if (conferenceCount > 0) {
    entries.push({
      url: `${baseUrl}/crypto-conferences/${monthPath}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    });
  }
});

// Add individual conference pages - only future/current conferences
filteredConferences.forEach(conf => {
  const conferenceDate = new Date(conf.date);

  // Only include if conference is today or in the future
  if (conferenceDate >= today) {
    const year = conferenceDate.getFullYear();
    const slug = generateSlug(conf.name);
    entries.push({
      url: `${baseUrl}/crypto-conferences/${year}/${slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.5'
    });
  }
});

// Generate XML
const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
const xmlNamespace = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
const xmlUrls = entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n');
const xmlFooter = '\n</urlset>';

const sitemap = xmlHeader + xmlNamespace + xmlUrls + xmlFooter;

// Write to file
const outputPath = path.join(__dirname, '..', 'public', 'sitemap-conferences.xml');
fs.writeFileSync(outputPath, sitemap);

console.log(`✅ Generated sitemap with ${entries.length} conference URLs`);
console.log(`📄 Saved to: ${outputPath}`);