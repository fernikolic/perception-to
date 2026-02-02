import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OrganizationSchema } from './organization-schema';
import { WebsiteSchema } from './website-schema';
import { BreadcrumbSchema } from './breadcrumb-schema';
import { getSocialImageForPath, generateSocialImageTags } from '@/utils/social-image-validator';

const DEFAULT_METADATA = {
  title: 'Perception',
  description: 'Track digital asset trends. Decode market sentiment. Uncover narratives. All in one place.',
  type: 'website' as const,
  image: 'https://perception-og-image.fernandonikolic.workers.dev'
};

const PAGE_METADATA: Record<string, any> = {
  '/': {
    title: 'Perception - Digital Asset Trend Analysis & Market Sentiment',
    description: 'Track digital asset trends. Decode market sentiment. Uncover narratives. All in one place.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/methodology': {
    title: 'Methodology - Perception', 
    description: 'Learn how we analyze digital asset sentiment across social media, news, and market indicators',
    type: 'article',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/journalist': {
    title: 'For Journalists - Perception',
    description: 'Access real-time digital asset sentiment data and insights for your reporting',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/investor': {
    title: 'For Investors - Perception',
    description: 'Make informed digital asset investment decisions with advanced sentiment analysis',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/researcher': {
    title: 'For Researchers - Perception',
    description: 'Academic-grade digital asset sentiment data and analysis tools for research',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/about': {
    title: 'About Us - Perception',
    description: 'Learn about our mission to democratize digital asset sentiment analysis',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/pricing': {
    title: 'Pricing - Perception',
    description: 'Choose the right digital asset sentiment analysis plan for your needs',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/docs': {
    title: 'Documentation - Perception',
    description: 'Complete guide to using Perception APIs and tools',
    type: 'article',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/api': {
    title: 'API Reference - Perception',
    description: 'Comprehensive API documentation for digital asset sentiment data',
    type: 'article',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/learn': {
    title: 'Learn - Perception',
    description: 'Educational resources about digital asset sentiment analysis and market psychology',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/bitcoin-media-research': {
    title: 'Bitcoin Media Research - Perception',
    description: 'Unlock insights into Bitcoin media trends and bias. Weekly intelligence on narrative shifts, sentiment analysis, and market implications.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/bitcoin-fear-greed-index': {
    title: 'Bitcoin Fear & Greed Index - Perception',
    description: 'Real-time Bitcoin Fear & Greed Index with historical data and sentiment analysis. Track market psychology and make informed decisions.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/bitcoin-market-sentiment': {
    title: 'Bitcoin Market Sentiment Analysis - Perception',
    description: 'Comprehensive Bitcoin market sentiment analysis with real-time data, historical trends, and actionable insights.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/use-cases': {
    title: 'Use Cases - Perception',
    description: 'Discover how investors, journalists, and researchers use digital asset sentiment analysis for better decision-making.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/testimonials': {
    title: 'Testimonials - Perception',
    description: 'See what leading voices in digital assets say about Perception\'s sentiment analysis platform and data quality.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/roadmap': {
    title: 'Product Roadmap - Perception',
    description: 'See what\'s coming next for Perception\'s digital asset sentiment analysis platform and upcoming features.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/press': {
    title: 'Press & Media - Perception',
    description: 'Latest news, press releases, and media coverage of Perception\'s digital asset sentiment analysis platform.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/glossary': {
    title: 'Bitcoin Sentiment Glossary - Perception',
    description: 'Comprehensive glossary of Bitcoin sentiment analysis terms, market psychology concepts, and technical definitions.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/book-a-call': {
    title: 'Book a Call - Perception',
    description: 'Schedule a personalized demo of Perception\'s digital asset sentiment analysis platform with our team.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/slack-integration': {
    title: 'Slack Integration - Perception',
    description: 'Get digital asset sentiment alerts directly in Slack. Real-time notifications and market intelligence for your team.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/bitcoin-bad-takes': {
    title: 'Bitcoin Bad Takes - Perception',
    description: 'Track and analyze the worst Bitcoin takes on social media. Community-driven collection of FUD, misinformation, and bad predictions.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  },
  '/search': {
    title: 'Search - Perception',
    description: 'Search Bitcoin sentiment analysis, market intelligence, and cryptocurrency insights on Perception.',
    type: 'website',
    image: 'https://perception-og-image.fernandonikolic.workers.dev'
  }
};

export function SocialMeta({ title, description, image, type = 'website', url }: {
  title?: string;
  description?: string; 
  image?: string;
  type?: 'website' | 'article';
  url?: string;
}) {
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = location.pathname;
    const pageMetadata = PAGE_METADATA[currentPath] || DEFAULT_METADATA;

    const finalTitle = title || pageMetadata.title;
    const finalDescription = description || pageMetadata.description;
    const finalType = type || pageMetadata.type;

    // Generate clean canonical URL (without query parameters)
    let canonicalPath = currentPath;
    // Handle special cases where query parameters should be stripped
    if (currentPath === '/' || currentPath === '/search') {
      canonicalPath = currentPath; // Keep as is, query params are automatically excluded
    }
    const finalUrl = url || `https://perception.to${canonicalPath}`;

    // Generate dynamic image URL using validator
    const socialImageConfig = getSocialImageForPath(currentPath);
    // Priority: 1) prop image, 2) custom social image, 3) page metadata image
    const finalImage = image || socialImageConfig.url || pageMetadata.image;

    // Generate comprehensive social image meta tags
    const socialImageTags = generateSocialImageTags(currentPath, finalTitle);
    
    // Update meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('og:title', finalTitle, 'property');
    updateMetaTag('og:description', finalDescription, 'property');
    updateMetaTag('og:type', finalType, 'property');
    updateMetaTag('og:url', finalUrl, 'property');
    updateMetaTag('og:site_name', 'Perception', 'property');
    
    // Apply all social image tags
    Object.entries(socialImageTags).forEach(([key, value]) => {
      if (key.startsWith('og:')) {
        updateMetaTag(key, value, 'property');
      } else if (key.startsWith('twitter:')) {
        updateMetaTag(key, value);
      }
    });
    
    // Twitter Card specific tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:site', '@perception', 'name');
    updateMetaTag('twitter:creator', '@perception', 'name');
    
    // Additional fallback tags
    updateMetaTag('image', finalImage, 'itemprop');
    updateMetaTag('thumbnailUrl', finalImage, 'itemprop');

    // Note: Canonical link is now set server-side by middleware to prevent conflicts.
    // The middleware sets both the <link rel="canonical"> tag and Link HTTP header
    // for crawlers, ensuring a single source of truth for canonical URLs.

  }, [location.pathname, title, description, image, type, url]);

  // Generate breadcrumb items based on current path
  const breadcrumbItems = generateBreadcrumbs(location.pathname);
  
  return (
    <>
      {/* Add structured data schemas */}
      {location.pathname === '/' && (
        <>
          <OrganizationSchema />
          <WebsiteSchema />
        </>
      )}
      {breadcrumbItems.length > 0 && (
        <BreadcrumbSchema items={breadcrumbItems} />
      )}
    </>
  );
}

function updateMetaTag(name: string, content: string, attr = 'name') {
  let element = document.querySelector(`meta[${attr}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

// Note: updateCanonicalLink removed - canonical is now handled server-side by middleware
// to prevent conflicts between server-set and client-set canonical URLs

// Removed generateSocialImage function - now using social-image-validator

function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ name: 'Home', url: 'https://perception.to/' }];
  
  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    items.push({
      name,
      url: `https://perception.to${currentPath}`
    });
  }
  
  // Don't include breadcrumbs for homepage
  return pathname === '/' ? [] : items;
} 