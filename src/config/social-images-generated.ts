// Auto-generated file - do not edit manually
// Generated on: 2025-12-29T15:46:03.466Z

export interface AvailableSocialImage {
  url: string;
  filename: string;
  directory: string;
  exists: boolean;
}

export const AVAILABLE_SOCIAL_IMAGES: Record<string, AvailableSocialImage> = {
  "/bitcoin-media-research": {
    "url": "https://perception.to/social-images/pages/bitcoin-media-research.png",
    "filename": "bitcoin-media-research",
    "directory": "pages",
    "exists": true
  },
  "/bitcoin-social-media-sentiment-leaderboard": {
    "url": "https://perception.to/social-images/pages/bitcoin-social-media-sentiment-leaderboard.png",
    "filename": "bitcoin-social-media-sentiment-leaderboard",
    "directory": "pages",
    "exists": true
  }
};

export function hasCustomSocialImage(path: string): boolean {
  return path in AVAILABLE_SOCIAL_IMAGES;
}

export function getCustomSocialImageUrl(path: string): string | null {
  const image = AVAILABLE_SOCIAL_IMAGES[path];
  return image ? image.url : null;
}
