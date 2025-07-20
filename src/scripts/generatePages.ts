import { keywordMatrix, highPriorityKeywords, generateSlug } from '@/data/keywords';
import { generatePageContent, generateMetaDescription } from '@/lib/contentGenerator';

// Track which content buckets are actually live with existing routing
function checkIfPageIsPublished(category: string): boolean {
  // Check against existing routed content buckets
  if (category === 'glossary') {
    return true; // /glossary/:slug is live and working
  }
  if (category === 'learn') {
    return true; // /learn/:slug is live and working
  }
  if (category === 'api') {
    return false; // Would need to be integrated with existing /api or /docs pages
  }
  
  return false; // All other categories are not routed to existing content systems
}

// Generate content for high-priority pages
export function generateHighPriorityPages() {
  const generatedPages = [];
  
  // Focus on the top 50 high-priority keywords for initial content production
  const topKeywords = highPriorityKeywords.slice(0, 50);
  
  for (const keyword of topKeywords) {
    const slug = generateSlug(keyword.fullKeyword);
    const content = generatePageContent(keyword);
    const metaDescription = generateMetaDescription(keyword);
    
    // Check if this page is actually routed and published
    const isPublished = checkIfPageIsPublished(keyword.category);
    
    const page = {
      keyword: keyword.fullKeyword,
      slug,
      category: keyword.category,
      templateType: keyword.templateType,
      intent: keyword.intent,
      priority: keyword.priority,
      url: `/${keyword.category}/${slug}`,
      metaDescription,
      wordCount: content.wordCount,
      uniquenessScore: content.uniquenessScore,
      sections: content.sections,
      lastGenerated: new Date().toISOString(),
      isPublished,
      status: isPublished ? 'live' : 'template-only'
    };
    
    generatedPages.push(page);
  }
  
  return generatedPages;
}

// Generate sitemap entries for SEO
export function generateSitemapEntries() {
  const entries = [];
  const baseUrl = 'https://perception.to';
  
  for (const keyword of keywordMatrix) {
    const slug = generateSlug(keyword.fullKeyword);
    const url = `${baseUrl}/${keyword.category}/${slug}`;
    
    entries.push({
      url,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: keyword.priority === 'high' ? 'daily' : 'weekly',
      priority: keyword.priority === 'high' ? '0.9' : keyword.priority === 'medium' ? '0.7' : '0.5'
    });
  }
  
  return entries;
}

// Content quality metrics
export function analyzeContentQuality() {
  const pages = generateHighPriorityPages();
  
  const metrics = {
    totalPages: pages.length,
    averageWordCount: Math.round(pages.reduce((sum, page) => sum + page.wordCount, 0) / pages.length),
    averageUniqueness: Math.round(pages.reduce((sum, page) => sum + page.uniquenessScore, 0) / pages.length * 100),
    categoryDistribution: {} as Record<string, number>,
    templateDistribution: {} as Record<string, number>,
    intentDistribution: {} as Record<string, number>
  };
  
  pages.forEach(page => {
    metrics.categoryDistribution[page.category] = (metrics.categoryDistribution[page.category] || 0) + 1;
    metrics.templateDistribution[page.templateType] = (metrics.templateDistribution[page.templateType] || 0) + 1;
    metrics.intentDistribution[page.intent] = (metrics.intentDistribution[page.intent] || 0) + 1;
  });
  
  return metrics;
}

// Sample page URLs for testing
export function getSampleUrls() {
  const samples = highPriorityKeywords.slice(0, 20).map(keyword => {
    const slug = generateSlug(keyword.fullKeyword);
    return {
      keyword: keyword.fullKeyword,
      url: `/${keyword.category}/${slug}`,
      category: keyword.category,
      template: keyword.templateType,
      intent: keyword.intent
    };
  });
  
  return samples;
}

// Export for use in build process or content management
export const contentProduction = {
  generateHighPriorityPages,
  generateSitemapEntries,
  analyzeContentQuality,
  getSampleUrls
};

// Log production metrics
if (typeof window === 'undefined') {
  console.log('=== Content Production Metrics ===');
  const metrics = analyzeContentQuality();
  console.log(`Generated ${metrics.totalPages} high-priority pages`);
  console.log(`Average word count: ${metrics.averageWordCount} words`);
  console.log(`Average uniqueness: ${metrics.averageUniqueness}%`);
  console.log('Category distribution:', metrics.categoryDistribution);
  console.log('Template distribution:', metrics.templateDistribution);
  console.log('Intent distribution:', metrics.intentDistribution);
}