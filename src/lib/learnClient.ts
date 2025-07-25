export interface LearnArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Rich text content
  category: 'bitcoin-basics' | 'market-analysis' | 'technical-guides' | 'policy-regulation' | 'defi-stablecoins' | 'data-research';
  tags?: Array<{ tag: string }>;
  readTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  featured?: boolean;
  published?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  createdAt?: string;
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
const PAYLOAD_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api'
  : 'https://perception.to/api';

export async function fetchLearnArticles(params?: {
  search?: string;
  category?: string;
  difficulty?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}): Promise<LearnResponse> {
  try {
    const searchParams = new URLSearchParams();
    
    if (params?.search) {
      searchParams.append('where[or][0][title][contains]', params.search);
      searchParams.append('where[or][1][excerpt][contains]', params.search);
      searchParams.append('where[or][2][content][contains]', params.search);
    }
    
    if (params?.category) {
      searchParams.append('where[category][equals]', params.category);
    }
    
    if (params?.difficulty) {
      searchParams.append('where[difficulty][equals]', params.difficulty);
    }
    
    if (params?.featured) {
      searchParams.append('where[featured][equals]', 'true');
    }
    
    if (params?.page) {
      searchParams.append('page', params.page.toString());
    }
    
    if (params?.limit) {
      searchParams.append('limit', params.limit.toString());
    }
    
    // Only show published articles
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

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'bitcoin-basics':
      return 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 border border-orange-200 dark:border-orange-800';
    case 'market-analysis':
      return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
    case 'technical-guides':
      return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border border-purple-200 dark:border-purple-800';
    case 'policy-regulation':
      return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800';
    case 'defi-stablecoins':
      return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
    case 'data-research':
      return 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800';
    default:
      return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400 border border-gray-200 dark:border-gray-800';
  }
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800';
    case 'intermediate':
      return 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800';
    case 'advanced':
      return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800';
    default:
      return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400 border border-gray-200 dark:border-gray-800';
  }
}

export function formatCategoryName(category: string): string {
  switch (category) {
    case 'bitcoin-basics':
      return 'Bitcoin Basics';
    case 'market-analysis':
      return 'Market Analysis';
    case 'technical-guides':
      return 'Technical Guides';
    case 'policy-regulation':
      return 'Policy & Regulation';
    case 'defi-stablecoins':
      return 'DeFi & Stablecoins';
    case 'data-research':
      return 'Data & Research';
    default:
      return 'General';
  }
}

export function formatDifficultyName(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'Beginner';
    case 'intermediate':
      return 'Intermediate';
    case 'advanced':
      return 'Advanced';
    default:
      return 'General';
  }
} 