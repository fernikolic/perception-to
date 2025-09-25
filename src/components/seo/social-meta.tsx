import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OrganizationSchema } from './organization-schema';
import { WebsiteSchema } from './website-schema';
import { BreadcrumbSchema } from './breadcrumb-schema';
import { getSocialImageForPath, generateSocialImageTags } from '@/utils/social-image-validator';

const DEFAULT_METADATA = {
  title: 'Perception',
  description: 'Track Bitcoin trends. Decode market sentiment. Uncover narratives. All in one place.',
  type: 'website' as const,
  image: 'https://perception.to/logos/Perception-logo-social-og.png'
};

const PAGE_METADATA: Record<string, any> = {
  '/': {
    title: 'Perception - Bitcoin Trend Analysis & Market Sentiment',
    description: 'Track Bitcoin trends. Decode market sentiment. Uncover narratives. All in one place.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/methodology': {
    title: 'Methodology - Perception', 
    description: 'Learn how our AI analyzes Bitcoin sentiment across social media, news, and market indicators',
    type: 'article',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/journalist': {
    title: 'For Journalists - Perception',
    description: 'Access real-time Bitcoin sentiment data and insights for your reporting',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/investor': {
    title: 'For Investors - Perception',
    description: 'Make informed Bitcoin investment decisions with AI-powered sentiment analysis',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/researcher': {
    title: 'For Researchers - Perception',
    description: 'Academic-grade Bitcoin sentiment data and analysis tools for research',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/about': {
    title: 'About Us - Perception',
    description: 'Learn about our mission to democratize Bitcoin sentiment analysis through AI',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/pricing': {
    title: 'Pricing - Perception',
    description: 'Choose the right Bitcoin sentiment analysis plan for your needs',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/docs': {
    title: 'Documentation - Perception',
    description: 'Complete guide to using Perception APIs and tools',
    type: 'article',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/api': {
    title: 'API Reference - Perception',
    description: 'Comprehensive API documentation for Bitcoin sentiment data',
    type: 'article',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/learn': {
    title: 'Learn - Perception',
    description: 'Educational resources about Bitcoin sentiment analysis and market psychology',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/bitcoin-media-research': {
    title: 'Bitcoin Media Research - Perception',
    description: 'Unlock insights into Bitcoin media trends and bias. Weekly intelligence on narrative shifts, sentiment analysis, and market implications.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/bitcoin-fear-greed-index': {
    title: 'Bitcoin Fear & Greed Index - Perception',
    description: 'Real-time Bitcoin Fear & Greed Index with historical data and sentiment analysis. Track market psychology and make informed decisions.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/bitcoin-market-sentiment': {
    title: 'Bitcoin Market Sentiment Analysis - Perception',
    description: 'Comprehensive Bitcoin market sentiment analysis with real-time data, historical trends, and actionable insights.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/use-cases': {
    title: 'Use Cases - Perception',
    description: 'Discover how investors, journalists, and researchers use Bitcoin sentiment analysis for better decision-making.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/testimonials': {
    title: 'Testimonials - Perception',
    description: 'See what our users say about Perception\'s Bitcoin sentiment analysis platform and data quality.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/roadmap': {
    title: 'Product Roadmap - Perception',
    description: 'See what\'s coming next for Perception\'s Bitcoin sentiment analysis platform and upcoming features.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/press': {
    title: 'Press & Media - Perception',
    description: 'Latest news, press releases, and media coverage of Perception\'s Bitcoin sentiment analysis platform.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/glossary': {
    title: 'Bitcoin Sentiment Glossary - Perception',
    description: 'Comprehensive glossary of Bitcoin sentiment analysis terms, market psychology concepts, and technical definitions.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/book-a-call': {
    title: 'Book a Call - Perception',
    description: 'Schedule a personalized demo of Perception\'s Bitcoin sentiment analysis platform with our team.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/slack-integration': {
    title: 'Slack Integration - Perception',
    description: 'Get Bitcoin sentiment alerts directly in Slack. Real-time notifications and market intelligence for your team.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/bitcoin-bad-takes': {
    title: 'Bitcoin Bad Takes - Perception',
    description: 'Track and analyze the worst Bitcoin takes on social media. Community-driven collection of FUD, misinformation, and bad predictions.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
  },
  '/search': {
    title: 'Search - Perception',
    description: 'Search Bitcoin sentiment analysis, market intelligence, and cryptocurrency insights on Perception.',
    type: 'website',
    image: 'https://perception.to/logos/Perception-logo-social-og.png'
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
    const finalImage = image || pageMetadata.image || socialImageConfig.url;

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

    // Add canonical link (this will update or create the canonical link)
    updateCanonicalLink(finalUrl);
    
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

function updateCanonicalLink(url: string) {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

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