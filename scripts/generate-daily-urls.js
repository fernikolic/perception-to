#!/usr/bin/env node

/**
 * Utility script to generate all possible daily URLs for Bitcoin Market Sentiment pages
 * This can be used for sitemap generation, SEO optimization, or content planning
 */

/**
 * Generate all daily URLs for a given date range
 * @param {string} startDate - Starting date in YYYY-MM-DD format
 * @param {string} endDate - Ending date in YYYY-MM-DD format (optional, defaults to today)
 * @returns {Array} Array of URL objects with date, formatted date, and full URL
 */
function generateDailyUrls(startDate = '2020-01-01', endDate = null) {
  const urls = [];
  
  // Default end date to today
  if (!endDate) {
    endDate = new Date().toISOString().split('T')[0];
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Validate date range
  if (start > end) {
    throw new Error('Start date must be before or equal to end date');
  }
  
  // Generate URLs for each day
  const currentDate = new Date(start);
  while (currentDate <= end) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const formattedDate = currentDate.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const monthName = currentDate.toLocaleDateString('en-US', { month: 'long' }).toLowerCase();
    const year = currentDate.getFullYear();
    const day = currentDate.getDate();
    
    urls.push({
      date: dateStr,
      formattedDate,
      year,
      month: monthName,
      day,
      url: `https://perception.to/bitcoin-market-sentiment/${year}/${monthName}/${day}`,
      title: `Bitcoin Market Sentiment ${formattedDate} - Daily Analysis`,
      description: `Detailed analysis of Bitcoin market sentiment for ${formattedDate}. Track fear & greed index, social media trends, and institutional sentiment.`,
      monthNumber: currentDate.getMonth() + 1
    });
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return urls.reverse(); // Most recent first
}

/**
 * Generate URLs for the last N days
 * @param {number} days - Number of days to generate URLs for
 * @returns {Array} Array of URL objects
 */
function generateRecentDailyUrls(days = 365) {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
  
  return generateDailyUrls(
    startDate.toISOString().split('T')[0],
    endDate.toISOString().split('T')[0]
  );
}

/**
 * Generate URLs for a specific month
 * @param {number} year - Year (e.g., 2025)
 * @param {number} month - Month (1-12)
 * @returns {Array} Array of URL objects
 */
function generateMonthlyDailyUrls(year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0); // Last day of the month
  
  return generateDailyUrls(
    startDate.toISOString().split('T')[0],
    endDate.toISOString().split('T')[0]
  );
}

/**
 * Generate sitemap XML entries for the daily URLs
 * @param {Array} urls - Array of URL objects
 * @returns {string} XML sitemap entries
 */
function generateSitemapEntries(urls) {
  return urls.map(url => {
    return `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('\n');
}

/**
 * Generate a simple CSV export of all URLs
 * @param {Array} urls - Array of URL objects
 * @returns {string} CSV content
 */
function generateCSV(urls) {
  const headers = ['URL', 'Date', 'Year', 'Month', 'Day', 'Formatted Date', 'Title', 'Description'];
  const rows = urls.map(url => [
    url.url,
    url.date,
    url.year,
    url.month,
    url.day,
    url.formattedDate,
    url.title,
    url.description
  ]);
  
  return [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
}

/**
 * Generate a simplified URL list grouped by month
 * @param {Array} urls - Array of URL objects
 * @returns {Object} URLs grouped by month
 */
function generateGroupedUrls(urls) {
  const grouped = {};
  
  urls.forEach(url => {
    const monthKey = `${url.year}-${url.month.toString().padStart(2, '0')}`;
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(url);
  });
  
  return grouped;
}

// Main execution
if (require.main === module) {
  const command = process.argv[2] || 'recent';
  const format = process.argv[3] || 'json';
  
  let urls = [];
  
  switch (command.toLowerCase()) {
    case 'recent':
      const days = parseInt(process.argv[4]) || 365;
      console.log(`Generating Bitcoin Market Sentiment URLs for last ${days} days...\n`);
      urls = generateRecentDailyUrls(days);
      break;
      
    case 'range':
      const startDate = process.argv[4] || '2020-01-01';
      const endDate = process.argv[5] || new Date().toISOString().split('T')[0];
      console.log(`Generating Bitcoin Market Sentiment URLs from ${startDate} to ${endDate}...\n`);
      urls = generateDailyUrls(startDate, endDate);
      break;
      
    case 'month':
      const year = parseInt(process.argv[4]) || new Date().getFullYear();
      const month = parseInt(process.argv[5]) || new Date().getMonth() + 1;
      console.log(`Generating Bitcoin Market Sentiment URLs for ${year}-${month.toString().padStart(2, '0')}...\n`);
      urls = generateMonthlyDailyUrls(year, month);
      break;
      
    default:
      console.log(`Usage: node generate-daily-urls.js <command> [format] [options]

Commands:
  recent [days]           Generate URLs for last N days (default: 365)
  range <start> <end>     Generate URLs between two dates (YYYY-MM-DD)
  month <year> <month>    Generate URLs for specific month

Formats:
  json                    JSON output (default)
  sitemap                 XML sitemap entries
  csv                     CSV export
  urls                    Plain URL list
  grouped                 URLs grouped by month

Examples:
  node generate-daily-urls.js recent 30
  node generate-daily-urls.js range 2025-01-01 2025-01-31
  node generate-daily-urls.js month 2025 7
  node generate-daily-urls.js recent 365 sitemap
`);
      process.exit(1);
  }
  
  switch (format.toLowerCase()) {
    case 'sitemap':
      console.log('<!-- Sitemap entries for Bitcoin Market Sentiment daily pages -->');
      console.log(generateSitemapEntries(urls));
      break;
      
    case 'csv':
      console.log(generateCSV(urls));
      break;
      
    case 'urls':
      urls.forEach(url => console.log(url.url));
      break;
      
    case 'grouped':
      console.log(JSON.stringify(generateGroupedUrls(urls), null, 2));
      break;
      
    case 'json':
    default:
      console.log(JSON.stringify(urls, null, 2));
      break;
  }
  
  console.log(`\nGenerated ${urls.length} URLs`);
}

module.exports = {
  generateDailyUrls,
  generateRecentDailyUrls,
  generateMonthlyDailyUrls,
  generateSitemapEntries,
  generateCSV,
  generateGroupedUrls
};