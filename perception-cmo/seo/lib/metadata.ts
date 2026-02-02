// perception-cmo/seo/lib/metadata.ts
// Page metadata configurations for Perception marketing site

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
}

// =============================================================================
// HOMEPAGE
// =============================================================================
export const homepageMetadata: PageMetadata = {
  title: "Perception | Bitcoin & Crypto Media Intelligence Platform | 250+ Sources",
  description: "Track Bitcoin and crypto narratives across 250+ media sources. Real-time sentiment analysis, media monitoring, and intelligence reports for PR teams, analysts, and researchers. Book a Demo.",
  keywords: [
    "crypto media intelligence",
    "bitcoin media monitoring",
    "crypto narrative tracking",
    "bitcoin sentiment analysis",
    "crypto PR tools",
    "bitcoin coverage tracking",
    "crypto intelligence platform"
  ],
  canonical: "https://perception.to",
  ogTitle: "Perception | Crypto Media Intelligence Platform",
  ogDescription: "Monitor Bitcoin and crypto coverage across 250+ sources. Built for PR teams, analysts, and researchers.",
  ogImage: "https://perception.to/logos/Perception-logo-social-og.png",
  twitterCard: "summary_large_image"
};

// =============================================================================
// PRICING
// =============================================================================
export const pricingMetadata: PageMetadata = {
  title: "Pricing | Perception Crypto Intelligence Platform",
  description: "Perception pricing starts at $99/month. Get unlimited access to 250+ crypto media sources, sentiment tracking, and AI-powered intelligence reports. Start your free trial today.",
  keywords: [
    "perception pricing",
    "crypto intelligence pricing",
    "bitcoin monitoring cost",
    "crypto media monitoring price"
  ],
  canonical: "https://perception.to/pricing",
  ogTitle: "Perception Pricing - $99/month",
  ogDescription: "Unlimited access to 250+ crypto sources, sentiment tracking, and AI reports.",
  ogImage: "https://perception.to/logos/Perception-logo-social-og.png",
  twitterCard: "summary_large_image"
};

// =============================================================================
// FEATURES
// =============================================================================
export const featuresMetadata: PageMetadata = {
  title: "Features | Crypto Media Monitoring & Intelligence Tools | Perception",
  description: "Monitor 250+ crypto media sources, track Bitcoin narratives in real-time, generate intelligence reports with citations. Explore Perception's media monitoring features.",
  keywords: [
    "crypto media monitoring features",
    "bitcoin sentiment tracking tools",
    "crypto intelligence features",
    "media monitoring capabilities"
  ],
  canonical: "https://perception.to/features",
  ogTitle: "Perception Features - Crypto Media Intelligence",
  ogDescription: "250+ sources, real-time tracking, AI-powered reports, full citations.",
  ogImage: "https://perception.to/logos/Perception-logo-social-og.png",
  twitterCard: "summary_large_image"
};

// =============================================================================
// USE CASE PAGES
// =============================================================================
export const useCasePrTeamsMetadata: PageMetadata = {
  title: "Crypto PR & Communications Intelligence | Perception",
  description: "Media monitoring built for crypto PR teams. Track coverage, monitor journalists, identify newsjacking opportunities, and generate media reports across 250+ sources.",
  keywords: [
    "crypto PR tools",
    "bitcoin PR monitoring",
    "crypto communications intelligence",
    "crypto media relations",
    "bitcoin coverage tracking"
  ],
  canonical: "https://perception.to/use-cases/pr-teams",
  ogTitle: "Perception for PR Teams",
  ogDescription: "Media intelligence built for crypto communications professionals.",
  ogImage: "https://perception.to/logos/Perception-logo-social-og.png",
  twitterCard: "summary_large_image"
};

export const useCaseResearchAnalystsMetadata: PageMetadata = {
  title: "Crypto Research & Analysis Platform | Perception",
  description: "Research platform for crypto analysts. Monitor market narratives, track sentiment shifts, generate investment briefs with full citations across 250+ sources.",
  keywords: [
    "crypto research platform",
    "bitcoin analysis tools",
    "crypto analyst tools",
    "bitcoin research platform",
    "crypto intelligence research"
  ],
  canonical: "https://perception.to/use-cases/research-analysts",
  ogTitle: "Perception for Research Analysts",
  ogDescription: "Intelligence platform for crypto research professionals.",
  ogImage: "https://perception.to/logos/Perception-logo-social-og.png",
  twitterCard: "summary_large_image"
};

export const useCaseContentCreatorsMetadata: PageMetadata = {
  title: "Crypto Content Research & Trend Discovery | Perception",
  description: "Content research for crypto writers and marketers. Discover trending narratives, find story angles, and validate content ideas with data from 250+ sources.",
  keywords: [
    "crypto content research",
    "bitcoin trend discovery",
    "crypto newsletter research",
    "bitcoin content ideas",
    "crypto content marketing tools"
  ],
  canonical: "https://perception.to/use-cases/content-creators",
  ogTitle: "Perception for Content Creators",
  ogDescription: "Find stories and trends across 250+ crypto media sources.",
  ogImage: "https://perception.to/logos/Perception-logo-social-og.png",
  twitterCard: "summary_large_image"
};

export const useCaseBdTeamsMetadata: PageMetadata = {
  title: "Crypto Market Intelligence for BD Teams | Perception",
  description: "Market intelligence for crypto business development. Track partnership opportunities, monitor competitors, and identify market entry windows across 250+ sources.",
  keywords: [
    "crypto market intelligence",
    "bitcoin BD tools",
    "crypto competitive intelligence",
    "bitcoin partnership tracking",
    "crypto business development"
  ],
  canonical: "https://perception.to/use-cases/business-development",
  ogTitle: "Perception for BD Teams",
  ogDescription: "Market intelligence for crypto business development professionals.",
  ogImage: "https://perception.to/logos/Perception-logo-social-og.png",
  twitterCard: "summary_large_image"
};

// =============================================================================
// COMPARISON PAGES
// =============================================================================
export const compareVsLunarcrushMetadata: PageMetadata = {
  title: "Perception vs LunarCrush: Crypto Intelligence Comparison 2025",
  description: "Compare Perception and LunarCrush for crypto intelligence. Perception offers 250+ media sources while LunarCrush focuses on social metrics. See which is right for you.",
  keywords: [
    "perception vs lunarcrush",
    "lunarcrush alternative",
    "crypto intelligence comparison",
    "best crypto monitoring tool"
  ],
  canonical: "https://perception.to/compare/perception-vs-lunarcrush",
  ogTitle: "Perception vs LunarCrush - Which is Better?",
  ogDescription: "Complete comparison of Perception and LunarCrush for crypto intelligence.",
  ogImage: "https://perception.to/logos/Perception-logo-social-og.png",
  twitterCard: "summary_large_image"
};

export const compareVsSantimentMetadata: PageMetadata = {
  title: "Perception vs Santiment: Which Crypto Intelligence Tool? 2025",
  description: "Compare Perception and Santiment for crypto research. Perception specializes in media intelligence while Santiment focuses on on-chain data. Full comparison inside.",
  keywords: [
    "perception vs santiment",
    "santiment alternative",
    "crypto research tool comparison",
    "best crypto analysis platform"
  ],
  canonical: "https://perception.to/compare/perception-vs-santiment",
  ogTitle: "Perception vs Santiment - Full Comparison",
  ogDescription: "Media intelligence vs on-chain data. Which crypto tool is right for you?",
  ogImage: "https://perception.to/logos/Perception-logo-social-og.png",
  twitterCard: "summary_large_image"
};

export const compareBestToolsMetadata: PageMetadata = {
  title: "Best Crypto Media Monitoring Tools 2025 | Complete Comparison",
  description: "Compare the best crypto media monitoring tools for 2025. In-depth analysis of Perception, LunarCrush, Santiment, Glassnode, and more. Find the right tool for your needs.",
  keywords: [
    "best crypto media monitoring tools",
    "crypto intelligence tools comparison",
    "bitcoin monitoring platforms 2025",
    "top crypto analysis tools"
  ],
  canonical: "https://perception.to/compare/best-crypto-media-monitoring-tools",
  ogTitle: "Best Crypto Media Monitoring Tools 2025",
  ogDescription: "Complete comparison of Perception, LunarCrush, Santiment, Glassnode, and more.",
  ogImage: "https://perception.to/logos/Perception-logo-social-og.png",
  twitterCard: "summary_large_image"
};

// =============================================================================
// ALL PAGES EXPORT
// =============================================================================
export const allPagesMetadata = {
  home: homepageMetadata,
  pricing: pricingMetadata,
  features: featuresMetadata,
  useCases: {
    prTeams: useCasePrTeamsMetadata,
    researchAnalysts: useCaseResearchAnalystsMetadata,
    contentCreators: useCaseContentCreatorsMetadata,
    bdTeams: useCaseBdTeamsMetadata,
  },
  compare: {
    vsLunarcrush: compareVsLunarcrushMetadata,
    vsSantiment: compareVsSantimentMetadata,
    bestTools: compareBestToolsMetadata,
  },
};

// =============================================================================
// HELPER: Generate meta tags HTML
// =============================================================================
export function generateMetaTags(meta: PageMetadata): string {
  const tags = [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description}" />`,
    `<meta name="keywords" content="${meta.keywords.join(', ')}" />`,
    `<link rel="canonical" href="${meta.canonical}" />`,
    `<meta property="og:title" content="${meta.ogTitle || meta.title}" />`,
    `<meta property="og:description" content="${meta.ogDescription || meta.description}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Perception" />`,
    `<meta name="twitter:card" content="${meta.twitterCard || 'summary_large_image'}" />`,
    `<meta name="twitter:title" content="${meta.ogTitle || meta.title}" />`,
    `<meta name="twitter:description" content="${meta.ogDescription || meta.description}" />`,
  ];

  if (meta.ogImage) {
    tags.push(`<meta property="og:image" content="${meta.ogImage}" />`);
    tags.push(`<meta name="twitter:image" content="${meta.ogImage}" />`);
  }

  if (meta.noindex) {
    tags.push(`<meta name="robots" content="noindex, nofollow" />`);
  } else {
    tags.push(`<meta name="robots" content="index, follow" />`);
  }

  return tags.join('\n');
}
