#!/usr/bin/env node

/**
 * Utility script to generate all possible monthly URLs for Bitcoin Market Sentiment pages
 * This can be used for sitemap generation, SEO optimization, or content planning
 */

const months = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

/**
 * Generate all monthly URLs for a given year range
 * @param {number} startYear - Starting year (inclusive)
 * @param {number} endYear - Ending year (inclusive)
 * @returns {Array} Array of URL objects with slug, month, year, and full URL
 */
function generateMonthlyUrls(startYear = 2020, endYear = 2025) {
  const urls = [];
  
  for (let year = startYear; year <= endYear; year++) {
    months.forEach(month => {
      // Skip future months in current year
      if (year === new Date().getFullYear()) {
        const currentMonth = new Date().getMonth();
        const monthIndex = months.indexOf(month);
        if (monthIndex > currentMonth) return;
      }
      
      // Skip future years
      if (year > new Date().getFullYear()) return;
      
      const slug = `${month}-${year}`;
      const monthName = month.charAt(0).toUpperCase() + month.slice(1);
      
      urls.push({
        slug,
        month: monthName,
        year: year.toString(),
        url: `https://perception.to/bitcoin-market-sentiment/${slug}`,
        title: `Bitcoin Market Sentiment ${monthName} ${year} - Analysis & Trends`,
        description: `Comprehensive analysis of Bitcoin market sentiment for ${monthName} ${year}. Track fear & greed index, social media trends, and institutional sentiment.`
      });
    });
  }
  
  return urls.reverse(); // Most recent first
}

/**
 * Generate sitemap XML entries for the monthly URLs
 * @param {Array} urls - Array of URL objects
 * @returns {string} XML sitemap entries
 */
function generateSitemapEntries(urls) {
  return urls.map(url => {
    return `  <url>
    <loc>${url.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n');
}

/**
 * Generate a simple CSV export of all URLs
 * @param {Array} urls - Array of URL objects
 * @returns {string} CSV content
 */
function generateCSV(urls) {
  const headers = ['URL', 'Month', 'Year', 'Title', 'Description'];
  const rows = urls.map(url => [
    url.url,
    url.month,
    url.year,
    url.title,
    url.description
  ]);
  
  return [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
}

// Main execution
if (require.main === module) {
  const startYear = parseInt(process.argv[2]) || 2020;
  const endYear = parseInt(process.argv[3]) || 2025;
  const format = process.argv[4] || 'json';
  
  console.log(`Generating Bitcoin Market Sentiment URLs from ${startYear} to ${endYear}...\n`);
  
  const urls = generateMonthlyUrls(startYear, endYear);
  
  switch (format.toLowerCase()) {
    case 'sitemap':
      console.log('<!-- Sitemap entries for Bitcoin Market Sentiment pages -->');
      console.log(generateSitemapEntries(urls));
      break;
      
    case 'csv':
      console.log(generateCSV(urls));
      break;
      
    case 'urls':
      urls.forEach(url => console.log(url.url));
      break;
      
    case 'json':
    default:
      console.log(JSON.stringify(urls, null, 2));
      break;
  }
  
  console.log(`\nGenerated ${urls.length} URLs`);
}

module.exports = {
  generateMonthlyUrls,
  generateSitemapEntries,
  generateCSV
}; 