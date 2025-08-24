import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_METADATA = {
  title: 'Perception',
  description: 'Track Bitcoin trends. Decode market sentiment. Uncover narratives. All in one place.',
  type: 'website' as const
};

const PAGE_METADATA: Record<string, any> = {
  '/': {
    title: 'Perception - Bitcoin Trend Analysis & Market Sentiment',
    description: 'Track Bitcoin trends. Decode market sentiment. Uncover narratives. All in one place.',
    type: 'website'
  },
  '/methodology': {
    title: 'Methodology - Perception', 
    description: 'Learn how our AI analyzes Bitcoin sentiment across social media, news, and market indicators',
    type: 'article'
  },
  '/journalist': {
    title: 'For Journalists - Perception',
    description: 'Access real-time Bitcoin sentiment data and insights for your reporting',
    type: 'website'
  },
  '/investor': {
    title: 'For Investors - Perception',
    description: 'Make informed Bitcoin investment decisions with AI-powered sentiment analysis',
    type: 'website'
  },
  '/researcher': {
    title: 'For Researchers - Perception',
    description: 'Academic-grade Bitcoin sentiment data and analysis tools for research',
    type: 'website'
  },
  '/about': {
    title: 'About Us - Perception',
    description: 'Learn about our mission to democratize Bitcoin sentiment analysis through AI',
    type: 'website'
  },
  '/pricing': {
    title: 'Pricing - Perception',
    description: 'Choose the right Bitcoin sentiment analysis plan for your needs',
    type: 'website'
  },
  '/docs': {
    title: 'Documentation - Perception',
    description: 'Complete guide to using Perception APIs and tools',
    type: 'article'
  },
  '/api': {
    title: 'API Reference - Perception',
    description: 'Comprehensive API documentation for Bitcoin sentiment data',
    type: 'article'
  },
  '/learn': {
    title: 'Learn - Perception',
    description: 'Educational resources about Bitcoin sentiment analysis and market psychology',
    type: 'website'
  },
  '/bitcoin-media-research': {
    title: 'Bitcoin Media Research - Perception',
    description: 'Unlock insights into Bitcoin media trends and bias. Weekly intelligence on narrative shifts, sentiment analysis, and market implications.',
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
    const finalUrl = url || `https://perception.to${currentPath}`;
    
    // Generate dynamic image URL
    const finalImage = image || pageMetadata.image || generateSocialImage({
      title: finalTitle,
      description: finalDescription,
      path: currentPath
    });

    // Update meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('og:title', finalTitle, 'property');
    updateMetaTag('og:description', finalDescription, 'property');
    updateMetaTag('og:type', finalType, 'property');
    updateMetaTag('og:url', finalUrl, 'property');
    updateMetaTag('og:image', finalImage, 'property');
    updateMetaTag('og:image:secure_url', finalImage, 'property');
    updateMetaTag('og:image:type', 'image/png', 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:image:alt', finalTitle, 'property');
    updateMetaTag('og:site_name', 'Perception', 'property');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);
    updateMetaTag('twitter:image:alt', finalTitle);
    updateMetaTag('twitter:site', '@perception', 'name');
    
    // Additional fallback tags
    updateMetaTag('image', finalImage, 'itemprop');
    updateMetaTag('thumbnailUrl', finalImage, 'itemprop');
    
  }, [location.pathname, title, description, image, type, url]);

  return null;
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

function generateSocialImage({ title, description, path }: { 
  title: string; 
  description: string; 
  path: string; 
}) {
  const params = new URLSearchParams({
    title: title.slice(0, 60),
    description: description.slice(0, 120),
    path: path,
    theme: 'dark'
  });
  
  const isDevelopment = import.meta.env.DEV;
  const baseUrl = isDevelopment 
    ? 'http://localhost:3001' 
    : 'https://perception.to';
    
  return `${baseUrl}/api/og-image?${params.toString()}`;
} 