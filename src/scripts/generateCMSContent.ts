import { keywordMatrix, generateSlug } from '@/data/keywords';
import { generatePageContent } from '@/lib/contentGenerator';

// Generate CMS-ready content for Payload CMS integration
export interface CMSGlossaryEntry {
  title: string;
  slug: string;
  description: string;
  category: string;
  status: 'draft' | 'published';
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface CMSLearnArticle {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readingTime: number;
  status: 'draft' | 'published';
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
}

// Generate glossary entries for CMS
export function generateGlossaryEntries(): CMSGlossaryEntry[] {
  const glossaryKeywords = keywordMatrix.filter(k => k.category === 'glossary');
  
  return glossaryKeywords.slice(0, 20).map(keyword => {
    const content = generatePageContent(keyword);
    const introSection = content.sections.find(s => s.type === 'intro');
    
    return {
      title: keyword.fullKeyword,
      slug: generateSlug(keyword.fullKeyword),
      description: introSection?.content.split('\n\n')[0] || `${keyword.fullKeyword} is a key concept in cryptocurrency market analysis.`,
      category: getCMSCategory(keyword.fullKeyword),
      status: 'published' as const,
      meta: {
        title: `${keyword.fullKeyword} | Bitcoin Glossary | Perception.to`,
        description: `Learn about ${keyword.fullKeyword} - definition, practical examples, and usage in cryptocurrency market analysis.`,
        keywords: `${keyword.fullKeyword}, bitcoin, cryptocurrency, glossary, definition`
      }
    };
  });
}

// Generate learn articles for CMS
export function generateLearnArticles(): CMSLearnArticle[] {
  const learnKeywords = keywordMatrix.filter(k => k.category === 'learn');
  
  return learnKeywords.slice(0, 20).map(keyword => {
    const content = generatePageContent(keyword);
    const fullContent = content.sections.map(section => 
      `## ${section.heading}\n\n${section.content}`
    ).join('\n\n');
    
    const introSection = content.sections.find(s => s.type === 'intro');
    const excerpt = introSection?.content.split('\n\n')[0] || `Learn ${keyword.fullKeyword} with this comprehensive guide.`;
    
    return {
      title: `How to: ${keyword.fullKeyword}`,
      slug: generateSlug(keyword.fullKeyword),
      content: fullContent,
      excerpt,
      category: getCMSCategory(keyword.fullKeyword),
      difficulty: getDifficulty(keyword.fullKeyword),
      readingTime: Math.ceil(content.wordCount / 200), // Average reading speed
      status: 'published' as const,
      meta: {
        title: `${keyword.fullKeyword} Guide | Learn Bitcoin Analysis | Perception.to`,
        description: `Master ${keyword.fullKeyword} with our step-by-step guide. Practical examples and expert insights included.`,
        keywords: `${keyword.fullKeyword}, bitcoin, tutorial, guide, how-to, cryptocurrency`
      }
    };
  });
}

// Helper function to categorize content for CMS
function getCMSCategory(keyword: string): string {
  if (keyword.includes('sentiment')) return 'sentiment-analysis';
  if (keyword.includes('fear') || keyword.includes('greed')) return 'market-psychology';
  if (keyword.includes('API') || keyword.includes('technical')) return 'technical';
  if (keyword.includes('trader') || keyword.includes('trading')) return 'trading';
  if (keyword.includes('investor') || keyword.includes('institutional')) return 'investing';
  return 'general';
}

// Helper function to assign difficulty level
function getDifficulty(keyword: string): 'beginner' | 'intermediate' | 'advanced' {
  if (keyword.includes('basics') || keyword.includes('introduction') || keyword.includes('beginner')) {
    return 'beginner';
  }
  if (keyword.includes('advanced') || keyword.includes('professional') || keyword.includes('institutional')) {
    return 'advanced';
  }
  return 'intermediate';
}

// Generate JSON files for CMS import
export function generateCMSExports() {
  const glossaryEntries = generateGlossaryEntries();
  const learnArticles = generateLearnArticles();
  
  return {
    glossary: {
      filename: 'glossary-entries-import.json',
      data: glossaryEntries
    },
    learn: {
      filename: 'learn-articles-import.json', 
      data: learnArticles
    },
    summary: {
      glossaryCount: glossaryEntries.length,
      learnCount: learnArticles.length,
      totalEntries: glossaryEntries.length + learnArticles.length,
      categories: {
        glossary: [...new Set(glossaryEntries.map(e => e.category))],
        learn: [...new Set(learnArticles.map(a => a.category))]
      }
    }
  };
}

// Generate SQL/API calls for direct CMS integration (if needed)
export function generateCMSInsertStatements() {
  const glossaryEntries = generateGlossaryEntries();
  const learnArticles = generateLearnArticles();
  
  const glossarySQL = glossaryEntries.map(entry => `
INSERT INTO glossary_entries (title, slug, description, category, status, meta_title, meta_description, meta_keywords)
VALUES (
  ${JSON.stringify(entry.title)},
  ${JSON.stringify(entry.slug)},
  ${JSON.stringify(entry.description)},
  ${JSON.stringify(entry.category)},
  ${JSON.stringify(entry.status)},
  ${JSON.stringify(entry.meta.title)},
  ${JSON.stringify(entry.meta.description)},
  ${JSON.stringify(entry.meta.keywords)}
);`).join('\n');

  const learnSQL = learnArticles.map(article => `
INSERT INTO learn_articles (title, slug, content, excerpt, category, difficulty, reading_time, status, meta_title, meta_description, meta_keywords)
VALUES (
  ${JSON.stringify(article.title)},
  ${JSON.stringify(article.slug)},
  ${JSON.stringify(article.content)},
  ${JSON.stringify(article.excerpt)},
  ${JSON.stringify(article.category)},
  ${JSON.stringify(article.difficulty)},
  ${article.readingTime},
  ${JSON.stringify(article.status)},
  ${JSON.stringify(article.meta.title)},
  ${JSON.stringify(article.meta.description)},
  ${JSON.stringify(article.meta.keywords)}
);`).join('\n');

  return {
    glossary: glossarySQL,
    learn: learnSQL
  };
}

// Export for use in CMS integration
export const cmsIntegration = {
  generateGlossaryEntries,
  generateLearnArticles,
  generateCMSExports,
  generateCMSInsertStatements
};