/**
 * Google Sheets CMS Client
 * 
 * This client fetches data from a published Google Sheet.
 * It assumes the sheet is published to the web as CSV or JSON.
 */

interface SheetContentOptions {
  sheetId: string;  // The ID of the Google Sheet
  sheetName?: string; // Optional sheet name within the spreadsheet
  format?: 'csv' | 'json'; // Format to fetch the data in
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  imageUrl: string;
  category: string;
  tags: string | string[];
  [key: string]: any; // Allow for additional fields
}

/**
 * Check if running in a Cloudflare Workers environment
 */
function isCloudflareEnvironment(): boolean {
  return typeof globalThis.caches !== 'undefined' && 
         typeof (globalThis.caches as any).default !== 'undefined';
}

/**
 * Fetches content from a published Google Sheet
 */
export async function fetchSheetContent<T>({ 
  sheetId, 
  sheetName = 'Sheet1', 
  format = 'json' 
}: SheetContentOptions): Promise<T[]> {
  // For JSON format
  if (format === 'json') {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?alt=json&key=${import.meta.env.VITE_GOOGLE_SHEETS_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet content: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Convert the raw data into an array of objects
    const headers = data.values[0];
    const rows = data.values.slice(1);
    
    return rows.map((row: any[]) => {
      const item: Record<string, any> = {};
      headers.forEach((header: string, index: number) => {
        item[header] = row[index] || '';
      });
      return item as T;
    });
  }
  
  // For CSV format
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet content: ${response.statusText}`);
  }
  
  const csvText = await response.text();
  return parseCSV<T>(csvText);
}

/**
 * Simple CSV parser that converts CSV to an array of objects
 */
function parseCSV<T>(csv: string): T[] {
  const lines = csv.split('\n');
  const headers = parseCSVLine(lines[0]);
  
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj: Record<string, any> = {};
    
    headers.forEach((header, index) => {
      const value = values[index] || '';
      // Try to convert to appropriate types
      if (value === 'true' || value === 'false') {
        obj[header] = value === 'true';
      } else if (!isNaN(Number(value)) && value !== '') {
        obj[header] = Number(value);
      } else {
        obj[header] = value;
      }
    });
    
    return obj as T;
  });
}

/**
 * Parse a single CSV line handling quotes and commas
 */
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (i < line.length - 1 && line[i + 1] === '"') {
        // Handle escaped quotes
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  if (current) {
    values.push(current.trim());
  }
  
  return values;
}

/**
 * Try to get a value from cache
 */
async function getFromCache<T>(key: string): Promise<T | null> {
  if (!isCloudflareEnvironment()) {
    return null;
  }
  
  try {
    const response = await (globalThis.caches as any).default.match(key);
    if (response) {
      return await response.json();
    }
  } catch (err) {
    console.error('Cache retrieval error:', err);
  }
  
  return null;
}

/**
 * Store a value in cache
 */
async function storeInCache(key: string, value: any, maxAge = 3600): Promise<void> {
  if (!isCloudflareEnvironment()) {
    return;
  }
  
  try {
    const response = new Response(JSON.stringify(value), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${maxAge}`
      }
    });
    
    await (globalThis.caches as any).default.put(key, response.clone());
  } catch (err) {
    console.error('Cache storage error:', err);
  }
}

/**
 * Fetches all articles from the Google Sheet
 */
export async function fetchArticles(): Promise<Article[]> {
  // Try to get from cache first
  const cachedArticles = await getFromCache<Article[]>('all-articles');
  if (cachedArticles) {
    return cachedArticles;
  }
  
  // Check if we have API credentials
  if (!import.meta.env.VITE_GOOGLE_SHEETS_ARTICLES_ID || !import.meta.env.VITE_GOOGLE_SHEETS_API_KEY) {
    console.warn('Google Sheets API credentials not found. Using mock data for development.');
    return getMockArticles();
  }
  
  // Not in cache, fetch from source
  try {
    const articles = await fetchSheetContent<Article>({
      sheetId: import.meta.env.VITE_GOOGLE_SHEETS_ARTICLES_ID || '',
      sheetName: 'Articles'
    });
    
    // Process the article data
    const processedArticles = articles.map(article => ({
      ...article,
      tags: typeof article.tags === 'string' 
        ? article.tags.split(',').map((tag: string) => tag.trim()) 
        : article.tags || []
    }));
    
    // Store in cache
    await storeInCache('all-articles', processedArticles);
    
    return processedArticles;
  } catch (error) {
    console.error('Error fetching articles from Google Sheets:', error);
    console.warn('Falling back to mock data');
    return getMockArticles();
  }
}

/**
 * Fetch a single article by slug
 */
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  // Try to get from cache first
  const cachedArticle = await getFromCache<Article | null>(`article:${slug}`);
  if (cachedArticle) {
    return cachedArticle;
  }
  
  // Not in cache, fetch from source
  const articles = await fetchArticles();
  const article = articles.find(article => article.slug === slug) || null;
  
  // Store in cache if found
  if (article) {
    await storeInCache(`article:${slug}`, article);
  }
  
  return article;
}

/**
 * Fetch articles by tag
 */
export async function fetchArticlesByTag(tag: string): Promise<Article[]> {
  // Try to get from cache first
  const cachedArticles = await getFromCache<Article[]>(`tag:${tag}`);
  if (cachedArticles) {
    return cachedArticles;
  }
  
  // Not in cache, fetch from source
  const articles = await fetchArticles();
  const filteredArticles = articles.filter(article => 
    Array.isArray(article.tags) && article.tags.includes(tag)
  );
  
  // Store in cache
  await storeInCache(`tag:${tag}`, filteredArticles);
  
  return filteredArticles;
}

/**
 * Fetch articles by category
 */
export async function fetchArticlesByCategory(category: string): Promise<Article[]> {
  // Try to get from cache first
  const cachedArticles = await getFromCache<Article[]>(`category:${category}`);
  if (cachedArticles) {
    return cachedArticles;
  }
  
  // Not in cache, fetch from source
  const articles = await fetchArticles();
  const filteredArticles = articles.filter(article => 
    article.category?.toLowerCase() === category.toLowerCase()
  );
  
  // Store in cache
  await storeInCache(`category:${category}`, filteredArticles);
  
  return filteredArticles;
}

/**
 * Get all available categories with counts
 */
export async function fetchCategories(): Promise<{name: string, count: number}[]> {
  // Try to get from cache first
  const cachedCategories = await getFromCache<{name: string, count: number}[]>('categories');
  if (cachedCategories) {
    return cachedCategories;
  }
  
  // Not in cache, generate categories
  const articles = await fetchArticles();
  const categoryMap = new Map<string, number>();
  
  articles.forEach(article => {
    if (article.category) {
      const category = article.category.toString().toLowerCase();
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    }
  });
  
  const categories = Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
  
  // Store in cache
  await storeInCache('categories', categories);
  
  return categories;
}

/**
 * Get all available tags with counts
 */
export async function fetchTags(): Promise<{name: string, count: number}[]> {
  // Try to get from cache first
  const cachedTags = await getFromCache<{name: string, count: number}[]>('tags');
  if (cachedTags) {
    return cachedTags;
  }
  
  // Not in cache, generate tags
  const articles = await fetchArticles();
  const tagMap = new Map<string, number>();
  
  articles.forEach(article => {
    if (Array.isArray(article.tags)) {
      article.tags.forEach(tag => {
        const normalizedTag = tag.toLowerCase();
        tagMap.set(normalizedTag, (tagMap.get(normalizedTag) || 0) + 1);
      });
    }
  });
  
  const tags = Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
  
  // Store in cache
  await storeInCache('tags', tags);
  
  return tags;
}

/**
 * Generate mock articles for development
 */
function getMockArticles(): Article[] {
  return [
    {
      id: '1',
      title: 'Understanding Bitcoin Perception in Media',
      slug: 'understanding-bitcoin-perception-media',
      description: 'How mainstream media portrays Bitcoin and what it means for adoption.',
      content: `# Understanding Bitcoin Perception in Media
      
Media coverage significantly impacts how Bitcoin is perceived by the general public. This article explores the evolving media narrative around Bitcoin.

## Historical Coverage

Since its inception, Bitcoin has been portrayed in various ways:
- Initially as a tool for illicit activities
- Later as a speculative investment
- More recently as a legitimate asset class

## Current Trends

Today's media coverage is more nuanced, with increasing focus on:
- Institutional adoption
- Environmental concerns
- Regulatory developments

## Impact on Public Perception

Media framing continues to shape how people view Bitcoin, influencing:
- Investment decisions
- Regulatory attitudes
- Mainstream adoption`,
      author: 'Sarah Johnson',
      publishedAt: '2023-01-15',
      updatedAt: '2023-02-10',
      imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
      category: 'media',
      tags: ['bitcoin', 'media', 'perception']
    },
    {
      id: '2',
      title: 'Bitcoin Sentiment Analysis Methodology',
      slug: 'bitcoin-sentiment-analysis-methodology',
      description: 'A deep dive into the methods used to analyze Bitcoin sentiment across different sources.',
      content: `# Bitcoin Sentiment Analysis Methodology

This article explains our approach to quantifying and analyzing Bitcoin sentiment across various information sources.

## Data Sources

Our analysis incorporates data from:
- Social media platforms
- News articles
- Financial reports
- Forum discussions

## Technical Approach

We employ several natural language processing techniques:
- Named entity recognition
- Sentiment classification
- Topic modeling
- Temporal analysis

## Interpretation Framework

Results are interpreted through:
- Historical context comparison
- Cross-source correlation
- Market price relationship
- Regional variations`,
      author: 'Michael Chen',
      publishedAt: '2023-03-05',
      updatedAt: '2023-03-20',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
      category: 'methodology',
      tags: ['methodology', 'sentiment', 'analysis']
    },
    {
      id: '3',
      title: 'Regulatory Impact on Bitcoin Narrative',
      slug: 'regulatory-impact-bitcoin-narrative',
      description: 'How regulatory announcements shape the Bitcoin conversation in public discourse.',
      content: `# Regulatory Impact on Bitcoin Narrative

Regulatory developments have profound effects on how Bitcoin is discussed and perceived.

## Major Regulatory Events

Several key regulatory moments have shifted the Bitcoin narrative:
- The 2013 Senate hearings
- China's periodic ban announcements
- SEC Bitcoin ETF decisions
- FATF travel rule implementation

## Narrative Shifts

Each regulatory wave changes how Bitcoin is framed:
- From "criminal tool" to "innovative technology"
- From "unregulated" to "regulated"
- From "concerning" to "interesting" to "important"

## Future Regulatory Influence

Upcoming regulatory fronts that may shape the narrative:
- Central Bank Digital Currencies
- Global cryptocurrency regulations
- DeFi-specific frameworks
- Environmental regulations`,
      author: 'David Williams',
      publishedAt: '2023-04-12',
      updatedAt: '2023-05-01',
      imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
      category: 'regulation',
      tags: ['regulation', 'policy', 'government']
    }
  ];
} 