import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}

/**
 * Generates a Twitter profile image URL for a given handle
 * Uses Twitter's public profile image API endpoint
 * @param handle - Twitter handle without the @ symbol
 * @param size - Image size (normal, bigger, mini, or original)
 * @returns Twitter profile image URL
 */
export function getTwitterProfileImageUrl(
  handle: string,
  size: 'normal' | 'bigger' | 'mini' | 'original' = 'normal'
): string {
  const cleanHandle = handle.replace('@', '');
  // Twitter's profile image API endpoint
  return `https://unavatar.io/twitter/${cleanHandle}?fallback=https://ui-avatars.com/api/?name=${cleanHandle}&background=random&color=fff&size=128`;
}

/**
 * Generates initials from a Twitter handle for fallback avatars
 * @param handle - Twitter handle (with or without @)
 * @returns Two-letter initials
 */
export function getTwitterHandleInitials(handle: string): string {
  const cleanHandle = handle.replace('@', '');
  if (cleanHandle.length >= 2) {
    return cleanHandle.substring(0, 2).toUpperCase();
  }
  return cleanHandle.toUpperCase();
}
