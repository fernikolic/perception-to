// Utility to validate and ensure proper social images are used

import { hasCustomSocialImage, getCustomSocialImageUrl } from '../config/social-images-generated';

export interface SocialImageConfig {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
}

export const DEFAULT_SOCIAL_IMAGE: SocialImageConfig = {
  url: 'https://perception.to/social-images/default.png',
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

// Helper function to convert path to image filename
function pathToImageName(path: string): string {
  return path.replace(/^\//, '').replace(/\//g, '-') || 'home';
}

// Check if custom social image exists for a path
function findCustomSocialImage(path: string): string | null {
  // Use the generated configuration to check for existing images
  return getCustomSocialImageUrl(path);
}

export function getSocialImageForPath(path: string): SocialImageConfig {
  // First check if we have a predefined configuration
  const predefinedConfig = SOCIAL_IMAGES[path];
  if (predefinedConfig) {
    return predefinedConfig;
  }

  // Try to find a custom image for this path
  const customImageUrl = findCustomSocialImage(path);
  if (customImageUrl) {
    return {
      ...DEFAULT_SOCIAL_IMAGE,
      url: customImageUrl,
      alt: generateAltTextForPath(path)
    };
  }

  // Fall back to default
  return SOCIAL_IMAGES.default;
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

// Generate alt text based on path
function generateAltTextForPath(path: string): string {
  const pathSegments = path.split('/').filter(Boolean);

  if (pathSegments.length === 0) {
    return 'Perception - Bitcoin Trend Analysis & Market Sentiment Platform';
  }

  // Convert kebab-case to title case
  const title = pathSegments
    .join(' ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  return `${title} - Perception Bitcoin Analysis Platform`;
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