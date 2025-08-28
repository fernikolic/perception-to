// Utility to validate and ensure proper social images are used

export interface SocialImageConfig {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
}

export const DEFAULT_SOCIAL_IMAGE: SocialImageConfig = {
  url: 'https://perception.to/logos/Perception-logo-social-og.png',
  width: 1200,
  height: 630,
  alt: 'Perception - Bitcoin Trend Analysis & Market Sentiment',
  type: 'image/png'
};

export const SOCIAL_IMAGES: Record<string, SocialImageConfig> = {
  // Default for all pages
  default: DEFAULT_SOCIAL_IMAGE,
  
  // Home page
  '/': {
    ...DEFAULT_SOCIAL_IMAGE,
    alt: 'Perception - Bitcoin Trend Analysis & Market Sentiment Platform'
  },
  
  // Feature pages
  '/bitcoin-fear-greed-index': {
    ...DEFAULT_SOCIAL_IMAGE,
    alt: 'Bitcoin Fear & Greed Index - Real-time Market Psychology Analysis'
  },
  
  '/bitcoin-market-sentiment': {
    ...DEFAULT_SOCIAL_IMAGE,
    alt: 'Bitcoin Market Sentiment Analysis - Live Data & Insights'
  },
  
  // API and technical pages  
  '/api': {
    ...DEFAULT_SOCIAL_IMAGE,
    alt: 'Bitcoin Sentiment API - Real-time Data & Market Intelligence'
  },
  
  '/docs': {
    ...DEFAULT_SOCIAL_IMAGE,
    alt: 'Perception API Documentation - Bitcoin Sentiment Analysis Guide'
  }
};

export function getSocialImageForPath(path: string): SocialImageConfig {
  return SOCIAL_IMAGES[path] || SOCIAL_IMAGES.default;
}

export function validateSocialImage(imageUrl: string): boolean {
  try {
    new URL(imageUrl);
    return imageUrl.includes('perception.to') && 
           (imageUrl.endsWith('.png') || imageUrl.endsWith('.jpg') || imageUrl.endsWith('.jpeg'));
  } catch {
    return false;
  }
}

export function getOptimizedSocialImageUrl(path: string, _title?: string): string {
  const config = getSocialImageForPath(path);
  
  // For dynamic pages, you could generate custom images
  // For now, we'll use the standard featured image
  return config.url;
}

// Helper to generate social image meta tags
export function generateSocialImageTags(path: string, customTitle?: string) {
  const config = getSocialImageForPath(path);
  const altText = customTitle || config.alt;
  
  return {
    'og:image': config.url,
    'og:image:secure_url': config.url,
    'og:image:type': config.type,
    'og:image:width': config.width.toString(),
    'og:image:height': config.height.toString(),
    'og:image:alt': altText,
    'twitter:image': config.url,
    'twitter:image:alt': altText
  };
}