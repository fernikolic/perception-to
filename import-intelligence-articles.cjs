const fs = require('fs');
const path = require('path');

// Read the generated articles
const articlesPath = './intelligence-articles-export.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

console.log('Intelligence Articles Import Script');
console.log('=' .repeat(50));
console.log(`Found ${articles.length} articles to import`);
console.log('');

// Create Payload CMS import format
const payloadImport = {
  collections: {
    learn: articles.map(article => ({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: article.tags ? article.tags.map(tag => ({ tag })) : [],
      keywordFocus: article.keywordFocus,
      metaDescription: article.metaDescription,
      strategicValue: article.strategicValue,
      readTime: article.readTime,
      difficulty: article.difficulty,
      featured: article.featured || false,
      published: true,
      publishedAt: new Date().toISOString(),
    }))
  }
};

// Write Payload import file
fs.writeFileSync('./payload-intelligence-import.json', JSON.stringify(payloadImport, null, 2));

// Create individual article files for manual import
const articlesDir = './intelligence-articles';
if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir);
}

articles.forEach(article => {
  const filename = `${article.slug}.json`;
  const filepath = path.join(articlesDir, filename);
  
  const articleData = {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    tags: article.tags ? article.tags.map(tag => ({ tag })) : [],
    keywordFocus: article.keywordFocus,
    metaDescription: article.metaDescription,
    strategicValue: article.strategicValue,
    readTime: article.readTime,
    difficulty: article.difficulty,
    featured: article.featured || false,
    published: true,
    publishedAt: new Date().toISOString(),
  };
  
  fs.writeFileSync(filepath, JSON.stringify(articleData, null, 2));
});

// Create internal linking mapping
const linkingMap = {
  'opportunity-intelligence': [
    'competitive-intelligence-emerging-finance-complete-guide',
    'strategic-market-timing-emerging-finance-opportunities',
    'strategic-decision-making-frameworks-emerging-finance-leaders'
  ],
  'competitive-intelligence': [
    'identify-emerging-finance-opportunities-before-competitors',
    'partnership-intelligence-strategic-alliance-opportunities', 
    'regulatory-intelligence-system-emerging-finance'
  ],
  'market-timing': [
    'identify-emerging-finance-opportunities-before-competitors',
    'competitive-intelligence-emerging-finance-complete-guide',
    'geographic-intelligence-regional-opportunities-emerging-finance'
  ],
  'regulatory-intelligence': [
    'competitive-intelligence-emerging-finance-complete-guide',
    'geographic-intelligence-regional-opportunities-emerging-finance',
    'strategic-decision-making-frameworks-emerging-finance-leaders'
  ],
  'partnership-intelligence': [
    'competitive-intelligence-emerging-finance-complete-guide',
    'geographic-intelligence-regional-opportunities-emerging-finance',
    'sector-intelligence-industry-vertical-analysis-emerging-finance'
  ],
  'geographic-intelligence': [
    'regulatory-intelligence-system-emerging-finance',
    'sector-intelligence-industry-vertical-analysis-emerging-finance',
    'strategic-market-timing-emerging-finance-opportunities'
  ],
  'sector-intelligence': [
    'partnership-intelligence-strategic-alliance-opportunities',
    'competitive-intelligence-emerging-finance-complete-guide',
    'strategic-decision-making-frameworks-emerging-finance-leaders'
  ],
  'strategic-frameworks': [
    'identify-emerging-finance-opportunities-before-competitors',
    'competitive-intelligence-emerging-finance-complete-guide',
    'strategic-market-timing-emerging-finance-opportunities'
  ]
};

fs.writeFileSync('./internal-linking-map.json', JSON.stringify(linkingMap, null, 2));

// Create SEO keyword mapping
const seoKeywords = articles.reduce((acc, article) => {
  acc[article.slug] = {
    primary: article.keywordFocus,
    secondary: article.tags,
    category: article.category,
    difficulty: article.difficulty,
    strategicValue: article.strategicValue,
    metaDescription: article.metaDescription
  };
  return acc;
}, {});

fs.writeFileSync('./seo-keyword-mapping.json', JSON.stringify(seoKeywords, null, 2));

// Generate content statistics
const stats = {
  totalArticles: articles.length,
  byCategory: articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {}),
  byDifficulty: articles.reduce((acc, article) => {
    acc[article.difficulty] = (acc[article.difficulty] || 0) + 1;
    return acc;
  }, {}),
  byStrategicValue: articles.reduce((acc, article) => {
    acc[article.strategicValue] = (acc[article.strategicValue] || 0) + 1;
    return acc;
  }, {}),
  totalReadTime: articles.reduce((acc, article) => acc + article.readTime, 0),
  averageReadTime: Math.round(articles.reduce((acc, article) => acc + article.readTime, 0) / articles.length),
  featuredArticles: articles.filter(article => article.featured).length
};

console.log('Content Statistics:');
console.log('-'.repeat(30));
console.log(`Total Articles: ${stats.totalArticles}`);
console.log(`Total Read Time: ${stats.totalReadTime} minutes`);
console.log(`Average Read Time: ${stats.averageReadTime} minutes`);
console.log(`Featured Articles: ${stats.featuredArticles}`);
console.log('');

console.log('By Category:');
Object.entries(stats.byCategory).forEach(([category, count]) => {
  console.log(`  ${category}: ${count} articles`);
});
console.log('');

console.log('By Difficulty:');
Object.entries(stats.byDifficulty).forEach(([difficulty, count]) => {
  console.log(`  ${difficulty}: ${count} articles`);
});
console.log('');

console.log('By Strategic Value:');
Object.entries(stats.byStrategicValue).forEach(([value, count]) => {
  console.log(`  ${value}: ${count} articles`);
});
console.log('');

console.log('Files Generated:');
console.log('- payload-intelligence-import.json (Payload CMS batch import)');
console.log('- intelligence-articles/ (Individual article files)');
console.log('- internal-linking-map.json (Internal linking strategy)');
console.log('- seo-keyword-mapping.json (SEO optimization data)');
console.log('');

console.log('Import Instructions:');
console.log('1. Update your Payload CMS configuration with new fields');
console.log('2. Import articles using payload-intelligence-import.json');
console.log('3. Configure internal linking using internal-linking-map.json');
console.log('4. Implement SEO optimizations using seo-keyword-mapping.json');
console.log('5. Set up category navigation and learning paths');
console.log('');

console.log('Next Steps for SEO Optimization:');
console.log('- Set up category-based URL structure (/learn/[category]/[slug])');
console.log('- Implement schema markup for articles and learning paths');
console.log('- Create XML sitemap with strategic priorities');
console.log('- Set up internal linking automation based on categories and tags');
console.log('- Configure social media sharing optimization');

fs.writeFileSync('./content-stats.json', JSON.stringify(stats, null, 2));