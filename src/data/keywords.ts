// Programmatic SEO Keyword Matrix
// Based on PRD requirements for 500+ unique landing pages

export interface KeywordData {
  headTerm: string;
  modifier: string;
  fullKeyword: string;
  category: string;
  intent: 'informational' | 'navigational' | 'transactional' | 'commercial';
  priority: 'high' | 'medium' | 'low';
  searchVolume?: number;
  difficulty?: number;
  templateType: string;
}

// Core head terms targeting Bitcoin/crypto sentiment space
export const headTerms = [
  "bitcoin sentiment",
  "crypto market sentiment", 
  "bitcoin fear and greed index",
  "institutional crypto sentiment",
  "bitcoin analytics",
  "crypto sentiment API",
  "bitcoin trend analysis",
  "stablecoin sentiment",
  "tokenized finance sentiment",
  "crypto data visualization",
  "bitcoin market psychology",
  "crypto sentiment dashboard",
  "bitcoin social sentiment",
  "crypto news sentiment",
  "bitcoin price sentiment",
  "ethereum sentiment",
  "defi sentiment analysis",
  "crypto sentiment tracker",
  "bitcoin sentiment indicator",
  "crypto market analysis"
] as const;

// Modifiers that create unique search intents
export const modifiers = {
  // Time-based modifiers
  temporal: [
    "today", "live", "real-time", "2025", "current", "now", "latest",
    "hourly", "daily", "weekly", "monthly", "this week", "this month"
  ],
  
  // Function-based modifiers  
  functional: [
    "dashboard", "tracker", "tool", "API", "integration", "platform",
    "software", "app", "widget", "calculator", "analyzer", "monitor"
  ],
  
  // Action-based modifiers
  educational: [
    "analysis", "explained", "guide", "tutorial", "how-to", "methodology",
    "basics", "introduction", "overview", "definition", "meaning", "calculation"
  ],
  
  // Industry-specific modifiers
  audience: [
    "for journalists", "for traders", "for investors", "for developers",
    "for institutions", "for beginners", "for professionals", "for analysts"
  ],
  
  // Feature-based modifiers
  features: [
    "free", "premium", "enterprise", "documentation", "pricing", "demo",
    "trial", "slack integration", "API access", "data export", "alerts"
  ],
  
  // Technical modifiers
  technical: [
    "API documentation", "SDK", "webhook", "JSON API", "REST API",
    "GraphQL", "Python", "JavaScript", "integration guide", "examples"
  ]
} as const;

// Page categories for URL structure - using existing SEO-friendly buckets
export const categories = {
  glossary: ['glossary'], // Leverage existing /glossary section
  learn: ['learn'], // Leverage existing /learn section
  api: ['api'], // Keep for developer docs
} as const;

// Template types for different page structures - aligned with existing content buckets
export const templateTypes = {
  GLOSSARY_ENTRY: 'glossary-entry', // For /glossary/:slug
  LEARN_ARTICLE: 'learn-article', // For /learn/:slug  
  API_DOCUMENTATION: 'api-documentation', // For /api or /docs
} as const;

// Content rules mapped to existing content buckets
export const contentRules: Record<string, {
  focus: string;
  features: string[];
  cta: string;
  templateType: string;
  category: string;
}> = {
  // Glossary entries - definitions and explanations
  "bitcoin sentiment": {
    focus: "definition and explanation",
    features: ["clear definition", "market context", "practical examples", "related terms"],
    cta: "Explore More Terms",
    templateType: templateTypes.GLOSSARY_ENTRY,
    category: "glossary"
  },
  "fear and greed index": {
    focus: "concept explanation",
    features: ["what it measures", "calculation method", "interpretation guide", "usage tips"],
    cta: "View Index",
    templateType: templateTypes.GLOSSARY_ENTRY,
    category: "glossary"
  },
  "crypto market sentiment": {
    focus: "comprehensive definition",
    features: ["market psychology", "sentiment indicators", "measurement methods", "trading applications"],
    cta: "Learn More",
    templateType: templateTypes.GLOSSARY_ENTRY,
    category: "glossary"
  },
  
  // Learn articles - guides and tutorials
  "bitcoin sentiment analysis": {
    focus: "educational guide",
    features: ["step-by-step analysis", "tools and methods", "practical examples", "best practices"],
    cta: "Start Learning",
    templateType: templateTypes.LEARN_ARTICLE,
    category: "learn"
  },
  "how to read bitcoin sentiment": {
    focus: "tutorial content",
    features: ["reading techniques", "interpretation skills", "common patterns", "actionable insights"],
    cta: "Master the Skill",
    templateType: templateTypes.LEARN_ARTICLE,
    category: "learn"
  },
  "crypto sentiment indicators explained": {
    focus: "comprehensive tutorial",
    features: ["indicator types", "signal interpretation", "combining metrics", "trading strategies"],
    cta: "Apply Knowledge",
    templateType: templateTypes.LEARN_ARTICLE,
    category: "learn"
  },
  
  // API documentation
  "crypto sentiment API": {
    focus: "technical integration",
    features: ["API documentation", "SDK", "webhooks", "code examples"],
    cta: "Get API Access",
    templateType: templateTypes.API_DOCUMENTATION,
    category: "api"
  }
};

// Function to generate keyword combinations using existing content buckets
export function generateKeywordMatrix(): KeywordData[] {
  const keywords: KeywordData[] = [];
  
  headTerms.forEach(headTerm => {
    // Educational/definitional content -> Glossary
    modifiers.educational.forEach(modifier => {
      const fullKeyword = `${headTerm} ${modifier}`;
      keywords.push(createKeywordData(headTerm, modifier, fullKeyword, 'glossary', 'informational'));
    });
    
    // How-to and guides -> Learn section
    modifiers.temporal.forEach(modifier => {
      const fullKeyword = `${headTerm} ${modifier}`;
      keywords.push(createKeywordData(headTerm, modifier, fullKeyword, 'learn', 'informational'));
    });
    
    // Audience-specific guides -> Learn section
    modifiers.audience.forEach(modifier => {
      const fullKeyword = `${headTerm} ${modifier}`;
      keywords.push(createKeywordData(headTerm, modifier, fullKeyword, 'learn', 'commercial'));
    });
    
    // Technical/API content -> API docs (but keep minimal for now)
    if (headTerm.includes('API') || headTerm.includes('api')) {
      modifiers.technical.forEach(modifier => {
        const fullKeyword = `${headTerm} ${modifier}`;
        keywords.push(createKeywordData(headTerm, modifier, fullKeyword, 'api', 'transactional'));
      });
    }
    
    // Tools and functional content -> Learn section (as tutorials)
    modifiers.functional.forEach(modifier => {
      const fullKeyword = `${headTerm} ${modifier}`;
      keywords.push(createKeywordData(headTerm, modifier, fullKeyword, 'learn', 'navigational'));
    });
  });
  
  return keywords;
}

function createKeywordData(
  headTerm: string, 
  modifier: string, 
  fullKeyword: string, 
  category: string,
  intent: KeywordData['intent']
): KeywordData {
  const templateType = determineTemplateType(fullKeyword);
  const priority = determinePriority(headTerm, modifier);
  
  return {
    headTerm,
    modifier,
    fullKeyword,
    category,
    intent,
    priority,
    templateType
  };
}

function determineTemplateType(keyword: string): string {
  // API-related content
  if (keyword.includes('API') || keyword.includes('documentation') || keyword.includes('SDK')) {
    return templateTypes.API_DOCUMENTATION;
  }
  
  // Educational/definitional content -> Glossary
  if (keyword.includes('explained') || keyword.includes('definition') || keyword.includes('meaning') || 
      keyword.includes('what is') || keyword.includes('overview') || keyword.includes('introduction')) {
    return templateTypes.GLOSSARY_ENTRY;
  }
  
  // Everything else -> Learn articles (guides, tutorials, how-to, analysis, etc.)
  return templateTypes.LEARN_ARTICLE; // Default for most content
}

function determinePriority(headTerm: string, modifier: string): KeywordData['priority'] {
  // High priority for core terms with high-intent modifiers
  const highPriorityTerms = ['bitcoin sentiment', 'crypto market sentiment', 'bitcoin fear and greed index'];
  const highPriorityModifiers = ['today', 'live', 'API', 'dashboard', 'tracker'];
  
  if (highPriorityTerms.includes(headTerm) && highPriorityModifiers.includes(modifier)) {
    return 'high';
  }
  
  if (highPriorityTerms.includes(headTerm) || highPriorityModifiers.includes(modifier)) {
    return 'medium';
  }
  
  return 'low';
}

// Generate URL slug from keyword
export function generateSlug(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate URL path based on category and keyword - using existing content buckets
export function generateURL(keyword: KeywordData): string {
  const slug = generateSlug(keyword.fullKeyword);
  
  // Map to existing URL structures
  if (keyword.category === 'glossary') {
    return `/glossary/${slug}`;
  }
  if (keyword.category === 'learn') {
    return `/learn/${slug}`;
  }
  if (keyword.category === 'api') {
    return `/api/${slug}`; // or /docs depending on your preference
  }
  
  // Fallback
  return `/${keyword.category}/${slug}`;
}

// Export the complete keyword matrix
export const keywordMatrix = generateKeywordMatrix();

// Export high-priority keywords for immediate implementation
export const highPriorityKeywords = keywordMatrix.filter(k => k.priority === 'high');

// Export by template type for easier implementation
export const keywordsByTemplate = keywordMatrix.reduce((acc, keyword) => {
  if (!acc[keyword.templateType]) {
    acc[keyword.templateType] = [];
  }
  acc[keyword.templateType].push(keyword);
  return acc;
}, {} as Record<string, KeywordData[]>);