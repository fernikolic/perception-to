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
  relatedArticles?: LearnArticle[];
  keywordFocus?: string;
  metaDescription?: string;
  strategicValue?: 'high' | 'medium' | 'low';
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
const PAYLOAD_BASE_URL = window.location.hostname === 'localhost' 
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
    case 'bitcoin-basics':
      return 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 border border-orange-200 dark:border-orange-800';
    case 'stablecoins':
    case 'defi-stablecoins':
      return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
    case 'regulation':
    case 'policy-regulation':
    case 'regulatory-intelligence':
      return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800';
    case 'macro':
    case 'market-analysis':
    case 'market-timing':
      return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
    case 'opportunity-intelligence':
      return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border border-purple-200 dark:border-purple-800';
    case 'competitive-intelligence':
      return 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800';
    case 'strategic-frameworks':
      return 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400 border border-violet-200 dark:border-violet-800';
    case 'partnership-intelligence':
      return 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400 border border-teal-200 dark:border-teal-800';
    case 'geographic-intelligence':
      return 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800';
    case 'sector-intelligence':
      return 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400 border border-pink-200 dark:border-pink-800';
    case 'technical-guides':
    case 'data-research':
      return 'bg-slate-50 text-slate-600 dark:bg-slate-900/20 dark:text-slate-400 border border-slate-200 dark:border-slate-800';
    default:
      return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400 border border-gray-200 dark:border-gray-800';
  }
}

export function formatCategoryName(category?: string): string {
  switch (category) {
    case 'bitcoin':
    case 'bitcoin-basics':
      return 'Bitcoin Basics';
    case 'stablecoins':
    case 'defi-stablecoins':
      return 'DeFi & Stablecoins';
    case 'regulation':
    case 'policy-regulation':
      return 'Policy & Regulation';
    case 'regulatory-intelligence':
      return 'Regulatory Intelligence';
    case 'macro':
    case 'market-analysis':
      return 'Market Analysis';
    case 'market-timing':
      return 'Market Timing';
    case 'opportunity-intelligence':
      return 'Opportunity Intelligence';
    case 'competitive-intelligence':
      return 'Competitive Intelligence';
    case 'strategic-frameworks':
      return 'Strategic Frameworks';
    case 'partnership-intelligence':
      return 'Partnership Intelligence';
    case 'geographic-intelligence':
      return 'Geographic Intelligence';
    case 'sector-intelligence':
      return 'Sector Intelligence';
    case 'technical-guides':
      return 'Technical Guides';
    case 'data-research':
      return 'Data & Research';
    default:
      return 'General';
  }
} 