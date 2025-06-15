export interface GlossaryEntry {
  id: string;
  title: string;
  slug: string;
  description: string;
  category?: 'bitcoin' | 'stablecoins' | 'regulation' | 'macro';
  published?: boolean;
  updatedAt?: string;
  createdAt?: string;
}

export interface LearnArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category?: string;
  tags?: string[];
  readTime?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  featured?: boolean;
  published?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface GlossaryResponse {
  docs: GlossaryEntry[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface LearnResponse {
  docs: LearnArticle[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// Use Cloudflare Workers for API endpoints
const PAYLOAD_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/api'
  : 'https://perception.to/api';

export async function fetchGlossaryEntries(params?: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<GlossaryResponse> {
  try {
    const searchParams = new URLSearchParams();
    
    if (params?.search) {
      searchParams.append('where[or][0][title][contains]', params.search);
      searchParams.append('where[or][1][description][contains]', params.search);
    }
    
    if (params?.category) {
      searchParams.append('where[category][equals]', params.category);
    }
    
    if (params?.page) {
      searchParams.append('page', params.page.toString());
    }
    
    if (params?.limit) {
      searchParams.append('limit', params.limit.toString());
    }
    
    // Only show published entries
    searchParams.append('where[published][equals]', 'true');
    
    // Sort by updatedAt descending
    searchParams.append('sort', '-updatedAt');
    
    const url = `${PAYLOAD_BASE_URL}/glossary${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching glossary entries:', error);
    throw error;
  }
}

export async function fetchLearnArticles(params?: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<LearnResponse> {
  try {
    const searchParams = new URLSearchParams();
    
    if (params?.search) {
      searchParams.append('where[or][0][title][contains]', params.search);
      searchParams.append('where[or][1][excerpt][contains]', params.search);
    }
    
    if (params?.category) {
      searchParams.append('where[category][equals]', params.category);
    }
    
    if (params?.page) {
      searchParams.append('page', params.page.toString());
    }
    
    if (params?.limit) {
      searchParams.append('limit', params.limit.toString());
    }
    
    // Only show published entries
    searchParams.append('where[published][equals]', 'true');
    
    // Sort by publishedAt descending
    searchParams.append('sort', '-publishedAt');
    
    const url = `${PAYLOAD_BASE_URL}/learn${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching learn articles:', error);
    throw error;
  }
}

export async function fetchGlossaryEntry(slug: string): Promise<GlossaryEntry | null> {
  try {
    const response = await fetch(`${PAYLOAD_BASE_URL}/glossary?where[slug][equals]=${slug}&where[published][equals]=true`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: GlossaryResponse = await response.json();
    return data.docs.length > 0 ? data.docs[0] : null;
  } catch (error) {
    console.error('Error fetching glossary entry:', error);
    throw error;
  }
}

export async function fetchLearnArticle(slug: string): Promise<LearnArticle | null> {
  try {
    const response = await fetch(`${PAYLOAD_BASE_URL}/learn?where[slug][equals]=${slug}&where[published][equals]=true`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: LearnResponse = await response.json();
    return data.docs.length > 0 ? data.docs[0] : null;
  } catch (error) {
    console.error('Error fetching learn article:', error);
    throw error;
  }
}

export function getCategoryColor(category?: string): string {
  switch (category) {
    case 'bitcoin':
      return 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 border border-orange-200 dark:border-orange-800';
    case 'stablecoins':
      return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
    case 'regulation':
      return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800';
    case 'macro':
      return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
    default:
      return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400 border border-gray-200 dark:border-gray-800';
  }
}

export function formatCategoryName(category?: string): string {
  switch (category) {
    case 'bitcoin':
      return 'Bitcoin';
    case 'stablecoins':
      return 'Stablecoins';
    case 'regulation':
      return 'Regulation';
    case 'macro':
      return 'Macro';
    default:
      return 'General';
  }
} 