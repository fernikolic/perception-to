/**
 * Google Sheets CMS Client
 *
 * This client fetches data from a published Google Sheet.
 * It now loads *all* tabs in the spreadsheet and merges them.
 */

interface SheetContentOptions {
  sheetId: string;            // Spreadsheet ID
  sheetName?: string;         // Tab name
  format?: 'csv' | 'json';    // Fetch format
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
  [key: string]: any;         // Allow additional fields
}

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

// TTL for caching
const META_TTL = 86400;  // 24 h
const TAB_TTL = 900;     // 15 min
const ALL_ARTICLES_TTL = 900; // 15 min

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function isCloudflareEnvironment(): boolean {
  return typeof globalThis.caches !== 'undefined' &&
         typeof (globalThis.caches as any).default !== 'undefined';
}

/**
 * Simple retry function with exponential backoff 
 */
async function fetchWithRetry<T>(fetcher: () => Promise<T>, retries = 1, delay = 2000): Promise<T> {
  try {
    return await fetcher();
  } catch (error: unknown) {
    if (retries <= 0) throw error;
    
    // Check if it's a rate limit error (429)
    const isRateLimit = error instanceof Error && (
      error.message.includes('429') || 
      error.message.includes('rate limit')
    );
      
    if (isRateLimit) {
      console.warn(`Rate limit hit, retrying after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(fetcher, retries - 1, delay * 2);
    }
    
    throw error;
  }
}

/* ------------------------------------------------------------------ */
/*  Core fetchers                                                     */
/* ------------------------------------------------------------------ */

/**
 * Fetch a *single* tab in JSON or CSV
 */
export async function fetchSheetContent<T>({
  sheetId,
  sheetName = 'Sheet1',
  format = 'json'
}: SheetContentOptions): Promise<T[]> {
  /* ---------- JSON ---------- */
  if (format === 'json') {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      sheetName
    )}?alt=json&key=${import.meta.env.VITE_GOOGLE_SHEETS_API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) {
      console.error('Sheets error payload:', await res.text());
      throw new Error(`Failed to fetch sheet content: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const [headers, ...rows] = data.values;

    return rows.map((row: any[]) => {
      const obj: Record<string, any> = {};
      headers.forEach((h: string, i: number) => (obj[h] = row[i] ?? ''));
      return obj as T;
    });
  }

  /* ---------- CSV ---------- */
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    sheetName
  )}`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error('Sheets error payload:', await res.text());
    throw new Error(`Failed to fetch sheet content: ${res.status} ${res.statusText}`);
  }

  return parseCSV<T>(await res.text());
}

/**
 * Cached version of fetchSheetContent with retry
 */
async function fetchSheetContentCached<T>(opts: SheetContentOptions): Promise<T[]> {
  const key = `tab:${opts.sheetId}:${opts.sheetName}`;
  const cached = await getFromCache<T[]>(key);
  if (cached) return cached;

  const rows = await fetchWithRetry(
    () => fetchSheetContent<T>(opts),
    1 // retry once
  );
  
  await storeInCache(key, rows, TAB_TTL);
  return rows;
}

/**
 * Pulls the spreadsheet metadata (tab titles)
 */
async function fetchSpreadsheetMeta(sheetId: string): Promise<string[]> {
  const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties.title&key=${import.meta.env.VITE_GOOGLE_SHEETS_API_KEY}`;
  const res = await fetch(metaUrl);
  if (!res.ok) {
    console.error('Meta error payload:', await res.text());
    throw new Error(`Failed to fetch sheet meta: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.sheets.map((s: any) => s.properties.title as string);
}

/**
 * Cached version of fetchSpreadsheetMeta with retry
 */
async function fetchSpreadsheetMetaCached(sheetId: string): Promise<string[]> {
  const key = `meta:${sheetId}`;
  const cached = await getFromCache<string[]>(key);
  if (cached) return cached;

  const titles = await fetchWithRetry(
    () => fetchSpreadsheetMeta(sheetId),
    1 // retry once
  );
  
  await storeInCache(key, titles, META_TTL);
  return titles;
}

/**
 * Fetch **every** tab and flatten into one list
 */
export async function fetchAllSheets(): Promise<Article[]> {
  const sheetId = import.meta.env.VITE_GOOGLE_SHEETS_ARTICLES_ID || '';
  if (!sheetId) throw new Error('VITE_GOOGLE_SHEETS_ARTICLES_ID not set');

  const titles = await fetchSpreadsheetMetaCached(sheetId);

  // Fetch each tab in parallel
  const pages = await Promise.all(
    titles.map((title) =>
      fetchSheetContentCached<Article>({ sheetId, sheetName: title }).catch((err) => {
        console.warn(`Tab "${title}" skipped due to error:`, err.message);
        return [] as Article[];
      })
    )
  );

  return pages.flat();
}

/* ------------------------------------------------------------------ */
/*  CSV helper                                                        */
/* ------------------------------------------------------------------ */

function parseCSV<T>(csv: string): T[] {
  const lines = csv.split('\n').filter(Boolean);
  const headers = parseCSVLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const obj: Record<string, any> = {};
    headers.forEach((h, i) => {
      const val = values[i] ?? '';
      if (val === 'true' || val === 'false') obj[h] = val === 'true';
      else if (!isNaN(Number(val)) && val !== '') obj[h] = Number(val);
      else obj[h] = val;
    });
    return obj as T;
  });
}

function parseCSVLine(line: string): string[] {
  const out: string[] = [];
  let cur = '';
  let q = false;

  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (i < line.length - 1 && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else q = !q;
    } else if (c === ',' && !q) {
      out.push(cur.trim());
      cur = '';
    } else cur += c;
  }
  out.push(cur.trim());
  return out;
}

/* ------------------------------------------------------------------ */
/*  Cache helpers                                                     */
/* ------------------------------------------------------------------ */

async function getFromCache<T>(key: string): Promise<T | null> {
  if (!isCloudflareEnvironment()) return null;
  try {
    const res = await (globalThis.caches as any).default.match(key);
    return res ? await res.json() : null;
  } catch (err) {
    console.error('Cache retrieval error:', err);
    return null;
  }
}

async function storeInCache(key: string, value: any, maxAge = 3600): Promise<void> {
  if (!isCloudflareEnvironment()) return;
  try {
    const res = new Response(JSON.stringify(value), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=${maxAge}`
      }
    });
    await (globalThis.caches as any).default.put(key, res.clone());
  } catch (err) {
    console.error('Cache storage error:', err);
  }
}

/* ------------------------------------------------------------------ */
/*  Public API functions                                              */
/* ------------------------------------------------------------------ */

/**
 * Fetches *all* articles (now from every tab)
 */
export async function fetchArticles(): Promise<Article[]> {
  // 1️⃣ cache first
  const cached = await getFromCache<Article[]>('all-articles');
  if (cached) return cached;

  // 2️⃣ credentials check
  if (
    !import.meta.env.VITE_GOOGLE_SHEETS_ARTICLES_ID ||
    !import.meta.env.VITE_GOOGLE_SHEETS_API_KEY
  ) {
    console.warn('Google Sheets creds missing. Using mock data.');
    return getMockArticles();
  }

  // 3️⃣ fetch everything
  try {
    const raw = await fetchWithRetry(
      () => fetchAllSheets(),
      1 // retry once on failure
    );

    // Normalise tags to array
    const articles = raw.map((a) => ({
      ...a,
      tags: typeof a.tags === 'string' ? a.tags.split(',').map((t: string) => t.trim()) : a.tags || []
    }));

    await storeInCache('all-articles', articles, ALL_ARTICLES_TTL);
    return articles;
  } catch (err) {
    console.error('Error fetching all sheets:', err);
    console.warn('Falling back to mock data');
    return getMockArticles();
  }
}

/* ------------------------------------------------------------------ */
/*  Single-article helpers (unchanged)                                */
/* ------------------------------------------------------------------ */

export async function fetchArticleBySlug(raw: string): Promise<Article | null> {
  // Allow "metrics/bitcoin-sopr" OR "bitcoin-sopr" to resolve
  const wanted = raw.trim().toLowerCase();
  
  // Try to get from cache first
  const cached = await getFromCache<Article | null>(`article:${wanted}`);
  if (cached) return cached;

  const articles = await fetchArticles();
  const article = articles.find((a) => {
    const full  = a.slug?.toString().trim().toLowerCase();          // e.g. metrics/bitcoin-sopr
    const short = full?.split('/').pop();                           // e.g. bitcoin-sopr
    return full === wanted || short === wanted;
  }) || null;

  if (!article) console.warn('Article not found for slug:', wanted);
  else await storeInCache(`article:${wanted}`, article);

  return article;
}

export async function fetchArticlesByTag(tag: string): Promise<Article[]> {
  const key = `tag:${tag}`;
  const cached = await getFromCache<Article[]>(key);
  if (cached) return cached;

  const out = (await fetchArticles()).filter(
    (a) => Array.isArray(a.tags) && a.tags.includes(tag)
  );
  await storeInCache(key, out);
  return out;
}

export async function fetchArticlesByCategory(category: string): Promise<Article[]> {
  const key = `category:${category.toLowerCase()}`;
  const cached = await getFromCache<Article[]>(key);
  if (cached) return cached;

  const out = (await fetchArticles()).filter(
    (a) => a.category?.toLowerCase() === category.toLowerCase()
  );
  await storeInCache(key, out);
  return out;
}

export async function fetchCategories(): Promise<{ name: string; count: number }[]> {
  const cached = await getFromCache<{ name: string; count: number }[]>('categories');
  if (cached) return cached;

  const map = new Map<string, number>();
  (await fetchArticles()).forEach((a) => {
    if (a.category) {
      const c = a.category.toString().toLowerCase();
      map.set(c, (map.get(c) || 0) + 1);
    }
  });

  const out = [...map].map(([name, count]) => ({ name, count })).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  await storeInCache('categories', out);
  return out;
}

export async function fetchTags(): Promise<{ name: string; count: number }[]> {
  const cached = await getFromCache<{ name: string; count: number }[]>('tags');
  if (cached) return cached;

  const map = new Map<string, number>();
  (await fetchArticles()).forEach((a) => {
    if (Array.isArray(a.tags)) {
      a.tags.forEach((t) => {
        const n = t.toLowerCase();
        map.set(n, (map.get(n) || 0) + 1);
      });
    }
  });

  const out = [...map].map(([name, count]) => ({ name, count })).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  await storeInCache('tags', out);
  return out;
}

/* ------------------------------------------------------------------ */
/*  Mock data (unchanged)                                             */
/* ------------------------------------------------------------------ */

function getMockArticles(): Article[] {
  return [
    /* … same three placeholder articles … */
  ];
}