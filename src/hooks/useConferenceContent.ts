import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for fetching conference content from the media-radar API
 * Includes localStorage caching with 30-minute TTL
 */

const MEDIA_RADAR_API_URL = 'https://btcpapifunction3-1-final-45998414364.us-central1.run.app/media-radar';
const CACHE_KEY_PREFIX = 'conf_v2_'; // Changed to invalidate old cache
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export interface ConferenceArticle {
  title: string;
  date: string;
  url: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  imageUrl?: string;
  author?: string;
}

export interface ConferenceStats {
  totalArticles: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

interface CachedData {
  articles: ConferenceArticle[];
  stats: ConferenceStats;
  timestamp: number;
}

interface UseConferenceContentReturn {
  articles: ConferenceArticle[];
  stats: ConferenceStats;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
}

// Get cached data from localStorage
function getCachedData(key: string): CachedData | null {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const data: CachedData = JSON.parse(cached);
    if (Date.now() - data.timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

// Set cached data in localStorage
function setCachedData(key: string, articles: ConferenceArticle[], stats: ConferenceStats): void {
  try {
    const data: CachedData = {
      articles,
      stats,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore localStorage errors (quota exceeded, etc.)
  }
}

// Format date for API query (YYYY-MM-DD)
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Get default date range (last 90 days)
function getDefaultDateRange(): { startDate: string; endDate: string } {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 90);

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  };
}

// Parse sentiment from API response
function parseSentiment(sentiment: string): 'Positive' | 'Neutral' | 'Negative' {
  const lower = sentiment?.toLowerCase();
  if (lower === 'positive') return 'Positive';
  if (lower === 'negative') return 'Negative';
  return 'Neutral';
}

// Parse API response into articles
// API returns aggregated data with sampleArticles nested within each period
function parseArticles(data: any): ConferenceArticle[] {
  if (!data?.articles || !Array.isArray(data.articles)) {
    console.log('[ConferenceContent] No articles array in response');
    return [];
  }

  console.log('[ConferenceContent] Parsing', data.articles.length, 'periods');

  // Flatten sampleArticles from all periods
  const allArticles: ConferenceArticle[] = [];

  for (const period of data.articles) {
    // API returns sampleArticles array within each period
    const samples = period.sampleArticles;

    if (Array.isArray(samples) && samples.length > 0) {
      for (const article of samples) {
        // API uses lowercase field names: title, url, date, sentiment, imageUrl, author
        const parsed: ConferenceArticle = {
          title: article.title || '',
          date: article.date || '',
          url: article.url || '',
          sentiment: parseSentiment(article.sentiment),
          imageUrl: article.imageUrl || undefined,
          author: article.author || undefined
        };

        // Only add if we have at least a title or URL
        if (parsed.title || parsed.url) {
          allArticles.push(parsed);
        }
      }
    }
  }

  console.log('[ConferenceContent] Parsed', allArticles.length, 'articles');
  if (allArticles.length > 0) {
    console.log('[ConferenceContent] First article:', allArticles[0]);
  }

  // Sort by date, most recent first
  allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allArticles;
}

// Parse stats from API response
function parseStats(data: any): ConferenceStats {
  // API returns stats in a nested structure: data.stats.sentimentBreakdown
  const stats = data?.stats || {};
  const breakdown = stats?.sentimentBreakdown || data?.sentiment_breakdown || data?.sentimentBreakdown || {};

  return {
    totalArticles: stats?.totalArticles || data?.total_count || data?.totalCount || 0,
    sentimentBreakdown: {
      positive: breakdown.positive || 0,
      neutral: breakdown.neutral || 0,
      negative: breakdown.negative || 0
    }
  };
}

export function useConferenceContent(
  outletName: string,
  dateRange?: { startDate: string; endDate: string }
): UseConferenceContentReturn {
  const [articles, setArticles] = useState<ConferenceArticle[]>([]);
  const [stats, setStats] = useState<ConferenceStats>({
    totalArticles: 0,
    sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const { startDate, endDate } = dateRange || getDefaultDateRange();
  const cacheKey = `${CACHE_KEY_PREFIX}${outletName}_${startDate}_${endDate}`;

  const fetchContent = useCallback(async () => {
    if (!outletName) {
      setError('No outlet name provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Check cache first
    const cached = getCachedData(cacheKey);
    if (cached) {
      setArticles(cached.articles);
      setStats(cached.stats);
      setLastUpdated(new Date(cached.timestamp));
      setLoading(false);
      return;
    }

    try {
      const url = `${MEDIA_RADAR_API_URL}?outlet=${encodeURIComponent(outletName)}&startDate=${startDate}&endDate=${endDate}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const parsedArticles = parseArticles(data);
      const parsedStats = parseStats(data);

      setArticles(parsedArticles);
      setStats(parsedStats);
      setLastUpdated(new Date());

      // Cache the results
      setCachedData(cacheKey, parsedArticles, parsedStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch conference content');
    } finally {
      setLoading(false);
    }
  }, [outletName, startDate, endDate, cacheKey]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return {
    articles,
    stats,
    loading,
    error,
    lastUpdated,
    refetch: fetchContent
  };
}

// Hook for fetching content for a specific time period around a conference
export function useConferenceEventContent(
  outletName: string,
  eventStartDate: string,
  eventEndDate: string,
  daysBeforeAfter: number = 7
): UseConferenceContentReturn {
  const start = new Date(eventStartDate);
  const end = new Date(eventEndDate);

  start.setDate(start.getDate() - daysBeforeAfter);
  end.setDate(end.getDate() + daysBeforeAfter);

  return useConferenceContent(outletName, {
    startDate: formatDate(start),
    endDate: formatDate(end)
  });
}

// Hook for fetching all-time content for a conference
export function useConferenceAllContent(outletName: string): UseConferenceContentReturn {
  const startDate = '2020-01-01'; // Start from 2020
  const endDate = formatDate(new Date());

  return useConferenceContent(outletName, { startDate, endDate });
}
