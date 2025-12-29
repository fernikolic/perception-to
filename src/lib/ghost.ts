/**
 * Ghost Content API Client
 * Fetches posts from Ghost CMS at build time
 */

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  profile_image?: string;
  bio?: string;
}

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt?: string;
  custom_excerpt?: string;
  feature_image?: string;
  feature_image_alt?: string;
  feature_image_caption?: string;
  featured: boolean;
  published_at: string;
  updated_at: string;
  created_at: string;
  reading_time: number;
  tags: GhostTag[];
  primary_tag?: GhostTag;
  authors: GhostAuthor[];
  primary_author: GhostAuthor;
  url: string;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
}

export interface GhostPostsResponse {
  posts: GhostPost[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      pages: number;
      total: number;
      next: number | null;
      prev: number | null;
    };
  };
}

// For build-time data that gets cached
export interface CachedGhostData {
  posts: GhostPost[];
  fetchedAt: string;
  totalPosts: number;
}

// Helper to format reading time
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return '< 1 min read';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
}

// Helper to format date
export function formatPostDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Get posts by tag slug
export function getPostsByTag(posts: GhostPost[], tagSlug: string): GhostPost[] {
  return posts.filter(post =>
    post.tags.some(tag => tag.slug === tagSlug)
  );
}

// Get post by slug
export function getPostBySlug(posts: GhostPost[], slug: string): GhostPost | undefined {
  return posts.find(post => post.slug === slug);
}

// Get excerpt with fallback
export function getExcerpt(post: GhostPost, maxLength: number = 160): string {
  const excerpt = post.custom_excerpt || post.excerpt || '';
  if (excerpt.length <= maxLength) return excerpt;
  return excerpt.substring(0, maxLength).trim() + '...';
}
