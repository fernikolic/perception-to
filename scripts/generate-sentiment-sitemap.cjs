// Generate sitemap for bitcoin-market-sentiment pages
const fs = require('fs');
const path = require('path');

// Generate date range for sentiment pages (last 2 years + current year)
function generateSentimentDates() {
  const dates = [];
  const currentDate = new Date();
  const startDate = new Date();

  // Start from 2 years ago
  startDate.setFullYear(currentDate.getFullYear() - 2);
  startDate.setMonth(0); // January
  startDate.setDate(1);

  // Generate all dates from start to current date
  let date = new Date(startDate);
  while (date <= currentDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

// Generate URL slug from date
function getUrlPath(date) {
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' }).toLowerCase();
  const day = date.getDate();
  return `${year}/${month}/${day}`;
}

// Generate sitemap entries
const baseUrl = 'https://perception.to';
const currentDate = new Date().toISOString().split('T')[0];
const entries = [];

// Add main bitcoin-market-sentiment page
entries.push({
  url: `${baseUrl}/bitcoin-market-sentiment`,
  lastmod: currentDate,
  changefreq: 'daily',
  priority: '0.9'
});

// Add monthly summary pages
const monthlyPages = new Set();
const sentimentDates = generateSentimentDates();

sentimentDates.forEach(date => {
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' }).toLowerCase();
  monthlyPages.add(`${year}/${month}`);
});

monthlyPages.forEach(monthPath => {
  entries.push({
    url: `${baseUrl}/bitcoin-market-sentiment/${monthPath}`,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '0.7'
  });
});

// Add daily sentiment pages
sentimentDates.forEach(date => {
  const urlPath = getUrlPath(date);
  const dateStr = date.toISOString().split('T')[0];

  // More recent dates have higher priority
  const daysDiff = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
  let priority = '0.6';
  let changefreq = 'weekly';

  if (daysDiff < 7) {
    priority = '0.8';
    changefreq = 'daily';
  } else if (daysDiff < 30) {
    priority = '0.7';
    changefreq = 'daily';
  } else if (daysDiff < 90) {
    priority = '0.6';
    changefreq = 'weekly';
  } else {
    priority = '0.5';
    changefreq = 'monthly';
  }

  entries.push({
    url: `${baseUrl}/bitcoin-market-sentiment/${urlPath}`,
    lastmod: dateStr,
    changefreq,
    priority
  });
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
const outputPath = path.join(__dirname, '..', 'public', 'sitemap-sentiment.xml');
fs.writeFileSync(outputPath, sitemap);

console.log(`✅ Generated sitemap with ${entries.length} sentiment URLs`);
console.log(`   - Main page: 1`);
console.log(`   - Monthly pages: ${monthlyPages.size}`);
console.log(`   - Daily pages: ${sentimentDates.length}`);
console.log(`📄 Saved to: ${outputPath}`);
