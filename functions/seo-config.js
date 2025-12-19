/**
 * SEO Configuration for Cloudflare Pages Middleware
 *
 * This file contains page-specific SEO data that gets injected
 * into the HTML by the middleware for search engine crawlers.
 */

// Page-specific meta tags and structured data
export const PAGE_SEO = {
  '/': {
    title: 'Perception | Bitcoin & Crypto Media Intelligence Platform',
    description: 'Track Bitcoin and crypto narratives across 250+ media sources. Real-time sentiment analysis, media monitoring, and intelligence reports. Start free trial.',
    keywords: 'crypto media monitoring, bitcoin media intelligence, crypto PR monitoring, bitcoin sentiment analysis, crypto narrative tracking',
    canonical: 'https://perception.to/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Perception',
      url: 'https://perception.to',
      logo: 'https://perception.to/logos/perception-logo-dark.png',
      description: 'Intelligence workspace for Bitcoin, stablecoins & tokenized finance',
      sameAs: [
        'https://twitter.com/perception',
        'https://linkedin.com/company/perception'
      ],
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://app.perception.to/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  },

  '/bitcoin-fear-greed-index': {
    title: 'Bitcoin Fear & Greed Index - Real-Time Market Sentiment | Perception',
    description: 'Track Bitcoin market sentiment with our real-time Fear & Greed Index. Updated every 90 seconds from 650+ sources. Get instant alerts and API access.',
    keywords: 'bitcoin fear and greed index, crypto fear greed index, bitcoin sentiment, market sentiment analysis, btc fear greed',
    canonical: 'https://perception.to/bitcoin-fear-greed-index',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Bitcoin Fear & Greed Index',
      url: 'https://perception.to/bitcoin-fear-greed-index',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150'
      },
      provider: {
        '@type': 'Organization',
        name: 'Perception',
        url: 'https://perception.to'
      }
    }
  },

  '/bitcoin-market-sentiment': {
    title: 'Bitcoin Market Sentiment Analysis - Daily Updates | Perception',
    description: 'Get comprehensive Bitcoin market sentiment analysis updated daily. Track investor psychology, fear & greed, and market narratives from 650+ sources.',
    keywords: 'bitcoin market sentiment, bitcoin sentiment analysis, btc market mood, crypto sentiment today, bitcoin investor sentiment',
    canonical: 'https://perception.to/bitcoin-market-sentiment',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Bitcoin Market Sentiment Data',
      description: 'Daily Bitcoin market sentiment analysis aggregated from 650+ media sources',
      url: 'https://perception.to/bitcoin-market-sentiment',
      license: 'https://perception.to/terms',
      creator: {
        '@type': 'Organization',
        name: 'Perception',
        url: 'https://perception.to'
      },
      temporalCoverage: '2024/..',
      distribution: {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: 'https://api.perception.to/v1/sentiment'
      }
    }
  },

  '/pricing': {
    title: 'Pricing - Perception | Crypto Media Intelligence Plans',
    description: 'Simple, transparent pricing for crypto media monitoring. Start free, upgrade when ready. Plans for individuals, teams, and enterprises.',
    keywords: 'perception pricing, crypto monitoring pricing, bitcoin intelligence cost, media monitoring plans',
    canonical: 'https://perception.to/pricing',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Perception Pricing',
      description: 'Pricing plans for Perception crypto media intelligence platform'
    }
  },

  '/about': {
    title: 'About Perception | Bitcoin & Crypto Media Intelligence',
    description: 'Learn about Perception, the intelligence workspace for Bitcoin and crypto. Our mission is to help you understand market narratives and sentiment.',
    keywords: 'about perception, crypto intelligence company, bitcoin media monitoring team',
    canonical: 'https://perception.to/about',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Perception',
      description: 'About the Perception crypto media intelligence platform'
    }
  },

  '/journalist': {
    title: 'Perception for Journalists | Crypto Media Monitoring Tool',
    description: 'The crypto media monitoring tool built for journalists. Track narratives, find sources, and stay ahead of the news. Trusted by leading crypto publications.',
    keywords: 'crypto journalist tools, bitcoin media monitoring, crypto news tracking, journalist research tool',
    canonical: 'https://perception.to/journalist',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Perception for Journalists',
      description: 'Crypto media monitoring tools for journalists and reporters'
    }
  },

  '/investor': {
    title: 'Perception for Investors | Crypto Sentiment Analysis Tool',
    description: 'Professional crypto sentiment analysis for investors. Track market psychology, institutional flows, and narrative shifts. Make data-driven decisions.',
    keywords: 'crypto investor tools, bitcoin sentiment analysis, institutional crypto data, market psychology',
    canonical: 'https://perception.to/investor',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Perception for Investors',
      description: 'Crypto sentiment analysis tools for institutional and retail investors'
    }
  },

  '/crypto-conferences': {
    title: 'Crypto Conferences 2025-2026 | Bitcoin & Blockchain Events Calendar',
    description: 'Complete list of crypto conferences and blockchain events for 2025-2026. Bitcoin Amsterdam, Consensus, Token2049, and more. Updated weekly.',
    keywords: 'crypto conferences 2025, bitcoin conferences, blockchain events, crypto events calendar',
    canonical: 'https://perception.to/crypto-conferences',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Crypto Conferences 2025-2026',
      description: 'Complete list of cryptocurrency and blockchain conferences',
      numberOfItems: 50,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Bitcoin Amsterdam 2025',
          url: 'https://perception.to/crypto-conferences/2025/bitcoin-amsterdam'
        }
      ]
    }
  },

  '/methodology': {
    title: 'Methodology | How Perception Analyzes Crypto Sentiment',
    description: 'Learn how Perception analyzes crypto market sentiment. Our methodology covers 650+ sources, NLP analysis, and real-time data processing.',
    keywords: 'crypto sentiment methodology, bitcoin analysis method, perception methodology',
    canonical: 'https://perception.to/methodology',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      name: 'Perception Sentiment Analysis Methodology',
      description: 'Technical overview of how Perception analyzes crypto market sentiment'
    }
  },

  '/docs': {
    title: 'Documentation | Perception API & Platform Guide',
    description: 'Comprehensive documentation for the Perception platform. Learn how to use dashboards, API endpoints, and advanced features.',
    keywords: 'perception docs, perception api documentation, crypto api guide',
    canonical: 'https://perception.to/docs',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      name: 'Perception Documentation',
      description: 'Documentation for the Perception crypto intelligence platform'
    }
  },

  '/api': {
    title: 'API | Perception Crypto Sentiment API',
    description: 'Access real-time crypto sentiment data via API. REST endpoints, webhooks, and SDKs. 650+ sources, enterprise-grade reliability.',
    keywords: 'crypto sentiment api, bitcoin api, perception api, crypto data api',
    canonical: 'https://perception.to/api',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebAPI',
      name: 'Perception Sentiment API',
      description: 'REST API for accessing crypto market sentiment data',
      documentation: 'https://perception.to/docs'
    }
  }
};

// Social image overrides (existing functionality)
export const SOCIAL_IMAGES = {
  '/bitcoin-media-research': 'https://perception.to/social-images/pages/bitcoin-media-research.png',
  '/bitcoin-social-media-sentiment-leaderboard': 'https://perception.to/social-images/pages/bitcoin-social-media-sentiment-leaderboard.png',
  '/bitcoin-fear-greed-index': 'https://perception.to/social-images/pages/bitcoin-fear-greed-index.png',
  '/bitcoin-market-sentiment': 'https://perception.to/social-images/pages/bitcoin-market-sentiment.png',
};

export const DEFAULT_IMAGE = 'https://perception.to/logos/Perception-logo-social-og.png';

// Default meta for pages not explicitly configured
export const DEFAULT_SEO = {
  title: 'Perception | Bitcoin & Crypto Media Intelligence Platform',
  description: 'Intelligence workspace for Bitcoin, stablecoins & tokenized finance. Monitor trends, track sentiment, and generate insights from 650+ sources.',
  keywords: 'crypto media monitoring, bitcoin media intelligence, crypto sentiment analysis',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Perception',
    description: 'Crypto media intelligence platform'
  }
};
