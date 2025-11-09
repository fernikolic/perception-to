import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpIcon, ArrowDownIcon, TwitterIcon, CalendarIcon, ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon, Loader2, X, Lock } from 'lucide-react';
import { getCachedData, setCachedData } from '@/lib/firebase-cache';

interface Tweet {
  content: string;
  sentiment: string;
  date: string;
  url: string;
}

interface TwitterAccount {
  name: string;
  handle: string;
  sentimentScore: number;
  totalMentions: number;
  positivePercentage: number;
  negativePercentage: number;
  neutralPercentage: number;
  lastUpdate: string;
  tweets: Tweet[];
}

interface FeedData {
  Content: string;
  Title: string;
  Sentiment: string;
  Outlet: string;
  Date: string;
  URL: string;
  Category?: string;
}

interface FeedResponse {
  data: FeedData[];
}

const API_BASE = 'https://btcpapifunction-45998414364.us-central1.run.app/btcpapifunction';
const USER_ID = 'perception';

function getSentimentColor(score: number) {
  if (score >= 70) return 'text-green-600 bg-green-50 border-green-200';
  if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-red-600 bg-red-50 border-red-200';
}

function getSentimentIcon(score: number) {
  if (score >= 50) return <ArrowUpIcon className="w-4 h-4" />;
  return <ArrowDownIcon className="w-4 h-4" />;
}

function formatPrettyDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function LeaderboardCardSkeleton({ rank }: { rank: number }) {
  return (
    <Card className="bg-white border-gray-100 rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
              <Skeleton className="w-6 h-6 bg-gray-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <TwitterIcon className="w-4 h-4 text-blue-500" />
                <Skeleton className="h-5 w-32 bg-gray-200" />
              </div>
              <Skeleton className="h-4 w-24 mt-1 bg-gray-200" />
            </div>
          </div>
          <Skeleton className="h-7 w-20 rounded-lg bg-gray-200" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Positive</div>
            <Skeleton className="h-6 w-16 mx-auto bg-gray-200" />
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Neutral</div>
            <Skeleton className="h-6 w-16 mx-auto bg-gray-200" />
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Negative</div>
            <Skeleton className="h-6 w-16 mx-auto bg-gray-200" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <Skeleton className="h-4 w-32 bg-gray-200" />
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <Skeleton className="h-8 w-full bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
}

function LeaderboardCard({ account, rank, isTop }: { account: TwitterAccount; rank: number; isTop: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative group">
      <Card className="relative bg-white border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-gray-100 text-gray-700 text-sm font-medium">
                {rank}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <TwitterIcon className="w-3.5 h-3.5 text-blue-500" />
                  <h3 className="font-medium text-gray-900 text-sm">{account.name}</h3>
                </div>
                <p className="text-gray-500 text-xs">@{account.handle}</p>
              </div>
            </div>

            <div className="px-2 py-1 rounded bg-gray-100">
              <span className="text-xs text-gray-900 font-medium">{account.positivePercentage.toFixed(1)}%</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-0.5">Positive</div>
              <div className="text-sm font-medium text-gray-900">{account.positivePercentage.toFixed(1)}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-0.5">Neutral</div>
              <div className="text-sm font-medium text-gray-600">{account.neutralPercentage.toFixed(1)}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-0.5">Negative</div>
              <div className="text-sm font-medium text-gray-900">{account.negativePercentage.toFixed(1)}%</div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{account.totalMentions} mentions</span>
            <span className="text-xs">{formatPrettyDate(account.lastUpdate)}</span>
          </div>

          {/* View Tweets Button */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="w-full justify-between text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <span>View Tweets ({account.tweets.length})</span>
              {expanded ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Expanded Tweets Section */}
          {expanded && (
            <div className="mt-4 space-y-3 max-h-80 overflow-y-auto">
              {account.tweets.slice(0, 5).map((tweet, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="outline"
                      className="text-xs border-gray-300 text-gray-700"
                    >
                      {tweet.sentiment}
                    </Badge>
                    <a
                      href={tweet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <ExternalLinkIcon className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    {tweet.content.length > 200
                      ? `${tweet.content.substring(0, 200)}...`
                      : tweet.content}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatPrettyDate(tweet.date)}
                  </p>
                </div>
              ))}
              {account.tweets.length > 5 && (
                <p className="text-xs text-gray-500 text-center py-2">
                  Showing latest 5 of {account.tweets.length} tweets
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SignupPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Premium Feature
          </h3>

          <p className="text-slate-600 mb-6">
            Access extended historical data (7 days & 30 days) with a Perception platform account
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Extended sentiment analysis history
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Advanced filtering and insights
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              API access for developers
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={() => window.open('https://perception.to', '_blank')}
            >
              Sign Up for Perception
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              Continue with 24 hours
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TwitterSentimentLeaderboard() {
  const [accounts, setAccounts] = useState<TwitterAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'positive' | 'negative'>('positive');
  const [timePeriod, setTimePeriod] = useState<'24h' | 'weekly' | 'monthly'>('24h');
  const [displayCount, setDisplayCount] = useState(20); // Start with 20 items
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    async function fetchSentimentData() {
      try {
        // Cancel any previous request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create new abort controller for this request
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        setLoading(true);
        setDisplayCount(20); // Reset display count when fetching new data

        // Calculate date range based on selected time period
        const endDate = new Date().toISOString().slice(0, 10);
        let daysBack: number;

        console.log('Current timePeriod:', timePeriod);

        switch (timePeriod) {
          case '24h':
            daysBack = 1;
            break;
          case 'weekly':
            daysBack = 7;
            break;
          case 'monthly':
            daysBack = 30;
            break;
          default:
            daysBack = 7;
        }

        const startDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        const params = new URLSearchParams({
          userId: USER_ID,
          startDate,
          endDate
        });

        // Create a cache key based on date range
        const cacheKey = `twitter-sentiment-${startDate}-${endDate}`;

        let feedResponse: FeedResponse;

        // Try to get from Firestore cache first
        const cachedData = await getCachedData(cacheKey, timePeriod);

        if (cachedData) {
          feedResponse = cachedData;
          console.log('Using Firestore cached data');
        } else {
          console.log('Fetching fresh data from API');
          const response = await fetch(`${API_BASE}/feed?${params}`, {
            signal: abortController.signal
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          feedResponse = await response.json();

          // Save to Firestore cache
          await setCachedData(cacheKey, feedResponse, timePeriod);
        }

        const data = feedResponse.data;

        // Filter for Twitter/X content and extract account information
        const twitterData = new Map<string, {
          totalMentions: number;
          positiveMentions: number;
          neutralMentions: number;
          negativeMentions: number;
          lastUpdate: string;
          realHandle: string;
          realName: string;
          tweets: Tweet[];
        }>();

        // Process Twitter/X data
        data.forEach(item => {
          if (item.Outlet === 'X' || item.Outlet === 'Twitter') {
            // Extract Twitter handle from URL or title
            let handle = '';
            let name = '';

            // Try to extract from URL first
            if (item.URL && (item.URL.includes('twitter.com/') || item.URL.includes('x.com/'))) {
              const urlParts = item.URL.split('/');
              const handleIndex = urlParts.findIndex(part => part === 'twitter.com' || part === 'x.com') + 1;
              if (urlParts[handleIndex] && !urlParts[handleIndex].includes('status')) {
                handle = urlParts[handleIndex].split('?')[0]; // Remove query params
                name = handle;
              }
            }

            // If no handle from URL, try to extract from title (e.g., @username)
            if (!handle && item.Title) {
              const atMatch = item.Title.match(/@(\w+)/);
              if (atMatch) {
                handle = atMatch[1];
                name = handle;
              }
            }

            // Skip if we couldn't extract a handle
            if (!handle) return;

            const key = handle.toLowerCase();
            const existing = twitterData.get(key) || {
              totalMentions: 0,
              positiveMentions: 0,
              neutralMentions: 0,
              negativeMentions: 0,
              lastUpdate: item.Date,
              realHandle: handle,
              realName: name,
              tweets: []
            };

            existing.totalMentions += 1;
            if (item.Sentiment === 'Positive') {
              existing.positiveMentions += 1;
            } else if (item.Sentiment === 'Negative') {
              existing.negativeMentions += 1;
            } else {
              existing.neutralMentions += 1;
            }

            // Add the tweet to the collection
            existing.tweets.push({
              content: item.Content,
              sentiment: item.Sentiment,
              date: item.Date,
              url: item.URL
            });

            // Keep the most recent date
            if (new Date(item.Date) > new Date(existing.lastUpdate)) {
              existing.lastUpdate = item.Date;
            }

            twitterData.set(key, existing);
          }
        });

        // Set minimum post thresholds based on time period to filter out false signals
        let minPosts: number;
        switch (timePeriod) {
          case '24h':
            minPosts = 5;
            break;
          case 'weekly':
            minPosts = 10;
            break;
          case 'monthly':
            minPosts = 15;
            break;
          default:
            minPosts = 5;
        }

        console.log(`Filtering accounts with at least ${minPosts} posts for ${timePeriod}`);

        // Convert to TwitterAccount format with minimum post filtering
        const accountsData: TwitterAccount[] = Array.from(twitterData.entries())
          .filter(([_, data]) => data.totalMentions >= minPosts)
          .map(([key, data]) => ({
            name: data.realName || data.realHandle,
            handle: data.realHandle,
            sentimentScore: (data.positiveMentions / data.totalMentions) * 100,
            totalMentions: data.totalMentions,
            positivePercentage: (data.positiveMentions / data.totalMentions) * 100,
            neutralPercentage: (data.neutralMentions / data.totalMentions) * 100,
            negativePercentage: (data.negativeMentions / data.totalMentions) * 100,
            lastUpdate: data.lastUpdate,
            tweets: data.tweets.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort tweets by date (newest first)
          }))
          .sort((a, b) => filter === 'positive' ? b.positivePercentage - a.positivePercentage : a.positivePercentage - b.positivePercentage);


        setAccounts(accountsData);
        setError(null);
      } catch (err: any) {
        // Ignore abort errors
        if (err.name === 'AbortError') {
          return;
        }
        console.error('Error fetching sentiment data:', err);
        setError('Failed to load sentiment data');
      } finally {
        setLoading(false);
      }
    }

    fetchSentimentData();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [timePeriod]); // Remove filter from dependencies since it only affects sorting

  // Memoize sorted accounts
  const sortedAccounts = useMemo(() => {
    return [...accounts].sort((a, b) =>
      filter === 'positive'
        ? b.positivePercentage - a.positivePercentage
        : a.positivePercentage - b.positivePercentage
    );
  }, [accounts, filter]);

  // Memoize displayed accounts
  const displayedAccounts = useMemo(() => {
    return sortedAccounts.slice(0, displayCount);
  }, [sortedAccounts, displayCount]);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + 20, sortedAccounts.length));
      setIsLoadingMore(false);
    }, 100); // Small delay to show loading state
  }, [sortedAccounts.length]);

  // Check if there are more accounts to load
  const hasMore = displayCount < sortedAccounts.length;

  if (error) {
    return (
      <>
        <Helmet>
          <title>Error Loading Leaderboard | Bitcoin Perception</title>
        </Helmet>
        <div className="min-h-screen bg-white py-24">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
                <p className="text-gray-900 text-lg font-medium mb-2">Unable to Load Data</p>
                <p className="text-gray-600 text-sm mb-6">{error}</p>
                <Button onClick={() => window.location.reload()} className="bg-black text-white hover:bg-gray-800">
                  Retry Loading
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Bitcoin Twitter Sentiment Leaderboard | Bitcoin Perception</title>
        <meta name="description" content="Discover all Bitcoin Twitter accounts with real tweets - based on real-time sentiment analysis from 100+ sources." />
        <meta name="keywords" content="Bitcoin, Twitter, X, sentiment analysis, leaderboard, crypto, social media, tweets" />
        <meta property="og:title" content="Bitcoin Twitter Sentiment Leaderboard with Real Tweets" />
        <meta property="og:description" content="Real-time ranking of all Bitcoin Twitter accounts with actual tweets and sentiment analysis" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bitcoin Twitter Sentiment Leaderboard with Real Tweets" />
        <meta name="twitter:description" content="Real-time ranking of all Bitcoin Twitter accounts with actual tweets and sentiment analysis" />
      </Helmet>

      <div className="min-h-screen bg-white pt-16">
        {/* Leaderboard Section */}
        <section className="relative py-8 sm:py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Bitcoin Influence Index</h1>
              <p className="text-sm text-gray-600">Ranked by positive sentiment from 100+ sources</p>
            </div>

            <div className="mb-8">
              {!loading && sortedAccounts.length > 0 && (
                <p className="text-xs text-gray-500 mb-4">
                  {displayedAccounts.length} accounts
                  {timePeriod === '24h' && ' • min. 5 posts'}
                  {timePeriod === 'weekly' && ' • min. 10 posts'}
                  {timePeriod === 'monthly' && ' • min. 15 posts'}
                </p>
              )}

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {/* Sentiment Filter Buttons */}
              <Button
                variant={filter === 'positive' ? 'default' : 'outline'}
                onClick={() => setFilter('positive')}
                size="sm"
                className={filter === 'positive' ? 'bg-black text-white hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
                disabled={loading}
              >
                <ArrowUpIcon className="w-3 h-3 mr-1" />
                Positive
              </Button>
              <Button
                variant={filter === 'negative' ? 'default' : 'outline'}
                onClick={() => setFilter('negative')}
                size="sm"
                className={filter === 'negative' ? 'bg-black text-white hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
                disabled={loading}
              >
                <ArrowDownIcon className="w-3 h-3 mr-1" />
                Negative
              </Button>

              <div className="w-px h-4 bg-gray-300 mx-1"></div>

              {/* Time Period Selector */}
              <Button
                variant={timePeriod === '24h' ? 'default' : 'outline'}
                onClick={() => setTimePeriod('24h')}
                size="sm"
                className={timePeriod === '24h' ? 'bg-black text-white hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}
                disabled={loading}
              >
                24h
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSignupPopup(true)}
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                disabled={loading}
              >
                <Lock className="w-3 h-3 mr-1" />
                7d
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSignupPopup(true)}
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                disabled={loading}
              >
                <Lock className="w-3 h-3 mr-1" />
                30d
              </Button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="space-y-6">
                {[...Array(10)].map((_, index) => (
                  <LeaderboardCardSkeleton key={index} rank={index + 1} />
                ))}
              </div>
            ) : displayedAccounts.length > 0 ? (
              <>
                <div className="space-y-6">
                  {displayedAccounts.map((account, index) => (
                    <LeaderboardCard
                      key={`${account.handle}-${index}`}
                      account={account}
                      rank={index + 1}
                      isTop={index < 3}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-8 text-center">
                    <Button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      variant="outline"
                      size="lg"
                      className="min-w-[200px] border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          Load More
                          <span className="ml-2 text-sm text-gray-500">
                            ({displayCount} of {sortedAccounts.length})
                          </span>
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No data available for the selected period</p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="text-center mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
              Data updated every 24 hours • Based on Twitter/X posts from the {
                timePeriod === '24h' ? 'last 24 hours' :
                timePeriod === 'weekly' ? 'past week' :
                'past month'
              }
            </p>
            <p className="text-xs text-gray-400 mb-2">
              Real Twitter accounts with expandable tweet viewing and sentiment analysis
            </p>
            <p className="text-xs text-gray-400">
              Powered by Bitcoin Perception Feed API analyzing real-time social media data
            </p>
          </div>
          </div>
        </section>
        <SignupPopup isOpen={showSignupPopup} onClose={() => setShowSignupPopup(false)} />
      </div>
    </>
  );
}