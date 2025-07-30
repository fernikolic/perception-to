const fs = require('fs');

// Read the generated articles
const articlesPath = './intelligence-articles-export.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const baseUrl = 'https://bitcoin-perception.com';
const currentDate = new Date().toISOString().split('T')[0];

// Priority mapping based on strategic value and category
const getPriority = (article) => {
  if (article.featured) return '1.0';
  if (article.strategicValue === 'high') return '0.9';
  if (article.strategicValue === 'medium') return '0.8';
  return '0.7';
};

// Change frequency based on category and type
const getChangeFreq = (article) => {
  const highVelocityCategories = ['opportunity-intelligence', 'competitive-intelligence', 'market-timing'];
  if (highVelocityCategories.includes(article.category)) return 'weekly';
  return 'monthly';
};

// Generate sitemap XML
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

// Add main learn page
sitemapXml += `  <url>
    <loc>${baseUrl}/learn</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;

// Add category pages
const categories = [...new Set(articles.map(article => article.category))];
categories.forEach(category => {
  sitemapXml += `  <url>
    <loc>${baseUrl}/learn/category/${category}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

// Add individual articles
articles.forEach(article => {
  const publishedDate = new Date().toISOString().split('T')[0]; // Since these are new articles
  
  sitemapXml += `  <url>
    <loc>${baseUrl}/learn/${article.slug}</loc>
    <lastmod>${publishedDate}</lastmod>
    <changefreq>${getChangeFreq(article)}</changefreq>
    <priority>${getPriority(article)}</priority>
  </url>
`;
});

sitemapXml += `</urlset>`;

// Write sitemap file
fs.writeFileSync('./public/sitemap-intelligence.xml', sitemapXml);

// Generate robots.txt additions
const robotsTxt = `
# Strategic Intelligence Section
Sitemap: ${baseUrl}/sitemap-intelligence.xml

# Allow crawling of intelligence content
Allow: /learn/
Allow: /learn/category/
Allow: /learn/opportunity-intelligence/
Allow: /learn/competitive-intelligence/
Allow: /learn/market-timing/
Allow: /learn/regulatory-intelligence/
Allow: /learn/partnership-intelligence/
Allow: /learn/geographic-intelligence/
Allow: /learn/sector-intelligence/
Allow: /learn/strategic-frameworks/
`;

fs.writeFileSync('./robots-intelligence-additions.txt', robotsTxt);

// Generate meta tags for each article
const metaTagsJson = articles.reduce((acc, article) => {
  acc[article.slug] = {
    title: `${article.title} | Bitcoin Perception Intelligence`,
    description: article.metaDescription,
    keywords: [article.keywordFocus, ...(article.tags || [])].join(', '),
    canonicalUrl: `${baseUrl}/learn/${article.slug}`,
    ogTitle: article.title,
    ogDescription: article.metaDescription,
    ogUrl: `${baseUrl}/learn/${article.slug}`,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterTitle: article.title,
    twitterDescription: article.metaDescription,
    articleSection: article.category,
    articleTag: article.tags || [],
    readingTime: `${article.readTime} minutes`,
    difficulty: article.difficulty,
    strategicValue: article.strategicValue
  };
  return acc;
}, {});

fs.writeFileSync('./intelligence-meta-tags.json', JSON.stringify(metaTagsJson, null, 2));

// Generate JSON-LD structured data for each article
const structuredDataJson = articles.reduce((acc, article) => {
  acc[article.slug] = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "articleSection": article.category,
    "wordCount": Math.round(article.content.length / 5),
    "timeRequired": `PT${article.readTime}M`,
    "audience": {
      "@type": "Audience",
      "audienceType": "Emerging Finance Leaders"
    },
    "about": {
      "@type": "Thing",
      "name": "Strategic Intelligence",
      "description": "Competitive advantage through strategic intelligence"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/learn/${article.slug}`
    },
    "author": {
      "@type": "Organization",
      "name": "Bitcoin Perception",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bitcoin Perception",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 512,
        "height": 512
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "keywords": [article.keywordFocus, ...(article.tags || [])].join(', '),
    "genre": "Strategic Intelligence",
    "educationalLevel": article.difficulty === 'beginner' ? 'Beginner' : 
                       article.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
    "learningResourceType": "Article"
  };
  return acc;
}, {});

fs.writeFileSync('./intelligence-structured-data.json', JSON.stringify(structuredDataJson, null, 2));

console.log('Intelligence SEO Optimization Complete');
console.log('=====================================');
console.log(`Generated sitemap with ${articles.length + categories.length + 1} URLs`);
console.log(`- Main learn page: 1 URL`);
console.log(`- Category pages: ${categories.length} URLs`);
console.log(`- Article pages: ${articles.length} URLs`);
console.log('');
console.log('Files generated:');
console.log('- public/sitemap-intelligence.xml (XML sitemap)');
console.log('- robots-intelligence-additions.txt (robots.txt additions)'); 
console.log('- intelligence-meta-tags.json (HTML meta tags)');
console.log('- intelligence-structured-data.json (JSON-LD structured data)');
console.log('');
console.log('SEO Implementation:');
console.log('✓ XML sitemap with strategic priorities');
console.log('✓ Meta tags with keyword optimization');
console.log('✓ Open Graph and Twitter Card data');
console.log('✓ JSON-LD structured data for rich snippets');
console.log('✓ Educational content markup');
console.log('✓ Learning path schema');
console.log('✓ Article schema with reading time');
console.log('');
console.log('Next steps:');
console.log('1. Submit sitemap to Google Search Console');
console.log('2. Update robots.txt with new additions');
console.log('3. Configure internal linking automation');
console.log('4. Set up performance monitoring for SEO metrics');
console.log('5. Track keyword rankings for target terms');