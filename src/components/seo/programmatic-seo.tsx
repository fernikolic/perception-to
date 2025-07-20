import { KeywordData } from '@/data/keywords';

interface ProgrammaticSEOProps {
  keyword: KeywordData;
  children?: React.ReactNode;
}

// Generate dynamic meta tags based on keyword data
export function generateMeta(keyword: KeywordData) {
  const { fullKeyword, headTerm, intent } = keyword;
  
  // Dynamic title generation
  const title = generateTitle(fullKeyword, intent);
  
  // Dynamic description generation
  const description = generateDescription(fullKeyword, intent);
  
  // Keywords for meta tags
  const keywords = [
    fullKeyword,
    headTerm,
    'bitcoin sentiment',
    'crypto market analysis',
    'real-time data',
    'Perception.to'
  ].join(', ');
  
  return {
    title,
    description,
    keywords,
    ogTitle: `${title} | Perception.to`,
    ogDescription: description,
    ogType: 'website',
    ogImage: `/api/og?keyword=${encodeURIComponent(fullKeyword)}`,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    canonical: `https://perception.to${generateURL(keyword)}`,
    schema: generateSchema(keyword)
  };
}

function generateTitle(keyword: string, intent: string): string {
  const keywordCapitalized = keyword
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  switch (intent) {
    case 'informational':
      return `${keywordCapitalized} - Real-time Bitcoin Market Intelligence | Perception.to`;
    case 'navigational':
      return `${keywordCapitalized} Dashboard - Live Crypto Sentiment | Perception.to`;
    case 'transactional':
      return `${keywordCapitalized} API - Get Started Free | Perception.to`;
    case 'commercial':
      return `${keywordCapitalized} - Professional Bitcoin Analysis | Perception.to`;
    default:
      return `${keywordCapitalized} | Perception.to`;
  }
}

function generateDescription(keyword: string, intent: string): string {
  const baseDescription = `Get ${keyword} with real-time data from 200+ sources.`;
  
  switch (intent) {
    case 'informational':
      return `${baseDescription} Track Bitcoin market sentiment, fear & greed index, and institutional insights with professional-grade analytics.`;
    case 'navigational':
      return `${baseDescription} Access live dashboards, sentiment tracking, and comprehensive market analysis tools.`;
    case 'transactional':
      return `${baseDescription} Integrate Bitcoin sentiment data into your applications with our robust API. Start free.`;
    case 'commercial':
      return `${baseDescription} Professional Bitcoin sentiment analysis trusted by institutions, journalists, and traders.`;
    default:
      return `${baseDescription} Professional Bitcoin market sentiment analysis and real-time data.`;
  }
}

function generateURL(keyword: KeywordData): string {
  const slug = keyword.fullKeyword
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
  return `/${keyword.category}/${slug}`;
}

function generateSchema(keyword: KeywordData) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": keyword.fullKeyword,
    "description": generateDescription(keyword.fullKeyword, keyword.intent),
    "url": `https://perception.to${generateURL(keyword)}`,
    "publisher": {
      "@type": "Organization",
      "name": "Perception.to",
      "url": "https://perception.to"
    }
  };
  
  // Add specific schema based on template type
  switch (keyword.templateType) {
    case 'api-documentation':
      return {
        ...baseSchema,
        "@type": "TechArticle",
        "about": "Bitcoin sentiment API documentation"
      };
    case 'educational-guide':
      return {
        ...baseSchema,
        "@type": "HowTo",
        "about": keyword.fullKeyword
      };
    case 'tool-page':
      return {
        ...baseSchema,
        "@type": "SoftwareApplication",
        "applicationCategory": "Financial Analysis",
        "operatingSystem": "Web Browser"
      };
    default:
      return baseSchema;
  }
}

// Dynamic content generation based on keyword intent
export function generateHeroContent(keyword: KeywordData) {
  const { fullKeyword, intent, templateType } = keyword;
  
  const headlines = {
    'informational': `Everything you need to know about ${fullKeyword}`,
    'navigational': `Access ${fullKeyword} with professional tools`,
    'transactional': `Get ${fullKeyword} API access in minutes`,
    'commercial': `Professional ${fullKeyword} for your business`
  };
  
  const subheadlines = {
    'informational': 'Comprehensive analysis with real-time data from 200+ sources',
    'navigational': 'Live dashboards, tracking tools, and comprehensive analytics',
    'transactional': 'Robust API with real-time data, webhooks, and enterprise support',
    'commercial': 'Trusted by institutions, journalists, and professional traders'
  };
  
  return {
    headline: headlines[intent] || headlines['informational'],
    subheadline: subheadlines[intent] || subheadlines['informational'],
    primaryCTA: generateCTA(intent, templateType),
    secondaryCTA: 'View Documentation'
  };
}

function generateCTA(intent: string, templateType: string): string {
  if (templateType === 'api-documentation') {
    return 'Get API Access';
  }
  
  switch (intent) {
    case 'informational':
      return 'Learn More';
    case 'navigational':
      return 'Open Dashboard';
    case 'transactional':
      return 'Start Free Trial';
    case 'commercial':
      return 'Get Started';
    default:
      return 'Explore Now';
  }
}

// Feature list generation based on keyword type
export function generateFeatures(keyword: KeywordData) {
  const baseFeatures = [
    'Real-time sentiment data',
    'Professional analytics',
    '200+ data sources',
    'Enterprise-grade reliability'
  ];
  
  const templateFeatures = {
    'sentiment-dashboard': [
      'Live sentiment tracking',
      'Fear & Greed Index',
      'Social media analysis',
      'Institutional indicators'
    ],
    'api-documentation': [
      'REST API access',
      'Real-time webhooks',
      'SDKs & libraries',
      'Comprehensive docs'
    ],
    'educational-guide': [
      'Step-by-step guides',
      'Best practices',
      'Case studies',
      'Expert insights'
    ],
    'tool-page': [
      'Interactive dashboards',
      'Custom alerts',
      'Data export',
      'Historical analysis'
    ],
    'analytics-page': [
      'Advanced analytics',
      'Trend analysis',
      'Correlation insights',
      'Predictive indicators'
    ]
  };
  
  return [
    ...baseFeatures,
    ...(templateFeatures[keyword.templateType as keyof typeof templateFeatures] || [])
  ];
}

// Use case generation based on audience and intent
export function generateUseCases(keyword: KeywordData) {
  const useCases = [];
  
  if (keyword.modifier.includes('journalist')) {
    useCases.push({
      title: 'For Crypto Journalists',
      description: 'Real-time sentiment data for accurate market reporting',
      features: ['Breaking news alerts', 'Market context', 'Data visualization']
    });
  }
  
  if (keyword.modifier.includes('trader')) {
    useCases.push({
      title: 'For Crypto Traders',
      description: 'Sentiment-driven trading insights and market psychology',
      features: ['Trading signals', 'Market timing', 'Risk assessment']
    });
  }
  
  if (keyword.modifier.includes('developer')) {
    useCases.push({
      title: 'For Developers',
      description: 'Robust API for integrating sentiment data into applications',
      features: ['REST API', 'Webhooks', 'SDKs', 'Documentation']
    });
  }
  
  if (keyword.modifier.includes('investor')) {
    useCases.push({
      title: 'For Institutional Investors',
      description: 'Professional-grade sentiment analysis for investment decisions',
      features: ['Institutional data', 'Risk analysis', 'Portfolio insights']
    });
  }
  
  // Default use cases if no specific audience
  if (useCases.length === 0) {
    useCases.push(
      {
        title: 'Real-time Monitoring',
        description: 'Track Bitcoin sentiment across all major channels',
        features: ['Live updates', 'Multi-source data', 'Historical trends']
      },
      {
        title: 'Professional Analysis',
        description: 'Institutional-grade sentiment analysis tools',
        features: ['Advanced metrics', 'Custom dashboards', 'Export data']
      },
      {
        title: 'API Integration',
        description: 'Integrate sentiment data into your applications',
        features: ['REST API', 'Real-time feeds', 'Developer tools']
      }
    );
  }
  
  return useCases;
}

export default function ProgrammaticSEO({ keyword, children }: ProgrammaticSEOProps) {
  const meta = generateMeta(keyword);
  
  return (
    <>
      <head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:image" content={meta.ogImage} />
        <meta name="twitter:card" content={meta.twitterCard} />
        <meta name="twitter:title" content={meta.twitterTitle} />
        <meta name="twitter:description" content={meta.twitterDescription} />
        <link rel="canonical" href={meta.canonical} />
        <script type="application/ld+json">
          {JSON.stringify(meta.schema)}
        </script>
      </head>
      {children}
    </>
  );
}