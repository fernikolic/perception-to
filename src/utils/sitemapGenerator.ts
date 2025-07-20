import { keywordMatrix, generateSlug } from '@/data/keywords';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export function generateSitemap(): string {
  const baseUrl = 'https://perception.to';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const entries: SitemapEntry[] = [];
  
  // Add main pages
  const mainPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' as const },
    { url: '/bitcoin-fear-greed-index', priority: '0.9', changefreq: 'hourly' as const },
    { url: '/bitcoin-market-sentiment', priority: '0.9', changefreq: 'hourly' as const },
    { url: '/pricing', priority: '0.8', changefreq: 'weekly' as const },
    { url: '/api', priority: '0.8', changefreq: 'weekly' as const },
    { url: '/docs', priority: '0.7', changefreq: 'weekly' as const },
    { url: '/about', priority: '0.6', changefreq: 'monthly' as const },
  ];
  
  mainPages.forEach(page => {
    entries.push({
      url: `${baseUrl}${page.url}`,
      lastmod: currentDate,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });
  
  // Add programmatic SEO pages
  keywordMatrix.forEach(keyword => {
    const slug = generateSlug(keyword.fullKeyword);
    const url = `${baseUrl}/${keyword.category}/${slug}`;
    
    // Set priority and change frequency based on keyword priority
    let priority = '0.5';
    let changefreq: SitemapEntry['changefreq'] = 'weekly';
    
    if (keyword.priority === 'high') {
      priority = '0.9';
      changefreq = 'daily';
    } else if (keyword.priority === 'medium') {
      priority = '0.7';
      changefreq = 'weekly';
    }
    
    entries.push({
      url,
      lastmod: currentDate,
      changefreq,
      priority
    });
  });
  
  // Generate XML sitemap
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const xmlNamespace = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const xmlUrls = entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n');
  const xmlFooter = '\n</urlset>';
  
  return xmlHeader + xmlNamespace + xmlUrls + xmlFooter;
}

export function generateSitemapIndex(): string {
  const baseUrl = 'https://perception.to';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // For large sitemaps, we could split by category
  const sitemaps = [
    'sitemap-main.xml',
    'sitemap-sentiment.xml', 
    'sitemap-analytics.xml',
    'sitemap-tools.xml',
    'sitemap-guides.xml',
    'sitemap-api.xml'
  ];
  
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const xmlNamespace = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const xmlSitemaps = sitemaps.map(sitemap => `  <sitemap>
    <loc>${baseUrl}/${sitemap}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`).join('\n');
  const xmlFooter = '\n</sitemapindex>';
  
  return xmlHeader + xmlNamespace + xmlSitemaps + xmlFooter;
}

export function generateRobotsTxt(): string {
  const baseUrl = 'https://perception.to';
  
  return `User-agent: *
Allow: /

# Disallow development/test pages
Disallow: /keyword-test
Disallow: /content-showcase

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;
}

export function getSitemapStats() {
  const totalUrls = keywordMatrix.length + 7; // programmatic + main pages
  const highPriorityUrls = keywordMatrix.filter(k => k.priority === 'high').length;
  const categoryCounts = keywordMatrix.reduce((acc, keyword) => {
    acc[keyword.category] = (acc[keyword.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalUrls,
    highPriorityUrls,
    mediumPriorityUrls: keywordMatrix.filter(k => k.priority === 'medium').length,
    lowPriorityUrls: keywordMatrix.filter(k => k.priority === 'low').length,
    categoryCounts,
    estimatedFileSize: Math.round(totalUrls * 0.2), // KB estimate
    lastGenerated: new Date().toISOString()
  };
}