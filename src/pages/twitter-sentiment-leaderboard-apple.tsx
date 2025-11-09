import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, Lock, X, Check } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getTwitterProfileImageUrl, getTwitterHandleInitials } from '@/lib/utils';

interface Tweet {
  content: string;
  sentiment: string;
  date: string;
  url: string;
}

interface TwitterAccount {
  name: string;
  handle: string;
  sentimentScore: number; // 0-100 where 100 is most positive
  totalMentions: number;
  positivePercentage: number;
  negativePercentage: number;
  neutralPercentage: number;
  lastUpdate: string;
  tweets: Tweet[];
  weightedScore: number; // Single weighted score for ranking
  profileImageUrl?: string; // Twitter profile image URL
  rankChange?: number; // Rank change from 24h ago (positive = moved up)
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
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  };
}

const API_BASE = 'https://btcpapifunction-45998414364.us-central1.run.app/btcpapifunction';
const USER_ID = 'perception';

function formatPrettyDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function AppleCard({ account, rank, expanded, onToggle, filter }: {
  account: TwitterAccount;
  rank: number;
  expanded: boolean;
  onToggle: () => void;
  filter: 'positive' | 'negative';
}) {
  const isTopThree = rank <= 3;
  const isTopRank = rank === 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: rank * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group relative mb-2"
    >
      <div
        className={`
          relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer
          ${isTopThree && filter === 'positive'
            ? 'bg-gradient-to-br from-emerald-900 to-gray-800 border border-emerald-800/50 shadow-lg hover:shadow-xl'
            : isTopThree && filter === 'negative'
            ? 'bg-gradient-to-br from-red-900 to-gray-800 border border-red-800/50 shadow-lg hover:shadow-xl'
            : 'bg-white border border-gray-200 hover:shadow-sm'}
        `}
        onClick={onToggle}
      >
        <div className="relative p-2.5">
          {/* Top Section - Rank and Profile */}
          <div className="flex items-center gap-2.5">
            {/* Rank Number with Change Indicator */}
            <div className="flex-shrink-0 w-12 flex items-center gap-1">
              <div className={`text-base font-bold ${
                isTopThree ? 'text-white' : 'text-gray-700'
              }`}>{rank}</div>
              {account.rankChange !== undefined && account.rankChange !== 0 && (
                <div className={`text-[10px] font-bold ${
                  account.rankChange > 0
                    ? (isTopThree ? 'text-emerald-300' : 'text-emerald-600')
                    : (isTopThree ? 'text-red-300' : 'text-red-600')
                }`}>
                  {account.rankChange > 0 ? '↑' : '↓'}{Math.abs(account.rankChange)}
                </div>
              )}
            </div>

            {/* Profile Picture */}
            <Avatar className="flex-shrink-0 w-9 h-9">
              <AvatarImage
                src={getTwitterProfileImageUrl(account.handle, 'bigger')}
                alt={`${account.name} profile`}
                className="object-cover"
                loading="lazy"
              />
              <AvatarFallback className="bg-gray-200 text-gray-700 text-sm font-medium">
                {getTwitterHandleInitials(account.handle)}
              </AvatarFallback>
            </Avatar>

            {/* Account Info */}
            <div className="flex-1 min-w-0 flex items-center">
              <p className={`text-sm font-semibold truncate ${
                isTopThree ? 'text-white' : 'text-gray-900'
              }`}>@{account.handle}</p>
            </div>

            {/* Sentiment Score */}
            <div className="flex-shrink-0 text-right">
              <div className={`text-xl font-bold ${
                isTopThree ? 'text-white' : 'text-gray-900'
              }`}>
                {account.sentimentScore.toFixed(0)}
                <span className={`text-xs font-normal ${
                  isTopThree ? 'text-white/60' : 'text-gray-500'
                }`}>/100</span>
              </div>
            </div>

            {/* Expand Icon */}
            <div className="flex-shrink-0">
              <ChevronRightIcon className={`w-4 h-4 transition-transform duration-200 ${
                isTopThree ? 'text-white/40' : 'text-gray-400'
              } ${expanded ? 'rotate-90' : ''}`} />
            </div>
          </div>

          {/* Stats Row */}
          <div className={`grid grid-cols-3 gap-2 mt-2 pt-2 ${
            isTopThree ? 'border-t border-white/10' : 'border-t border-gray-100'
          }`}>
            <div className="text-center">
              <p className={`text-[10px] uppercase tracking-wide ${
                isTopThree ? 'text-white/60' : 'text-gray-500'
              }`}>Positive</p>
              <p className={`text-xs font-semibold ${
                isTopThree ? 'text-white' : 'text-gray-900'
              }`}>{account.positivePercentage.toFixed(0)}%</p>
            </div>
            <div className="text-center">
              <p className={`text-[10px] uppercase tracking-wide ${
                isTopThree ? 'text-white/60' : 'text-gray-500'
              }`}>Negative</p>
              <p className={`text-xs font-semibold ${
                isTopThree ? 'text-white' : 'text-gray-900'
              }`}>{account.negativePercentage.toFixed(0)}%</p>
            </div>
            <div className="text-center">
              <p className={`text-[10px] uppercase tracking-wide ${
                isTopThree ? 'text-white/60' : 'text-gray-500'
              }`}>Posts</p>
              <p className={`text-xs font-semibold ${
                isTopThree ? 'text-white' : 'text-gray-900'
              }`}>{account.totalMentions}</p>
            </div>
          </div>

          {/* Expanded Tweet Section */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`border-t mt-8 pt-8 ${isTopThree ? 'border-white/10' : 'border-gray-100'}`}
              >
                <div className="space-y-4">
                  <p className={`text-sm font-semibold uppercase tracking-wider mb-6 ${
                    isTopThree ? 'text-white/60' : 'text-gray-500'
                  }`}>
                    Recent Posts
                  </p>
                  {account.tweets.slice(0, 3).map((tweet, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-5 rounded-2xl ${
                        isTopThree ? 'bg-white/5 border border-white/10' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`
                          text-xs font-semibold px-3 py-1 rounded-lg uppercase tracking-wider
                          ${tweet.sentiment === 'Positive'
                            ? (isTopThree ? 'bg-white/20 text-white' : 'bg-gray-700 text-white')
                            : tweet.sentiment === 'Negative'
                            ? (isTopThree ? 'bg-white/10 text-white/80' : 'bg-gray-500 text-white')
                            : (isTopThree ? 'bg-white/5 text-white/60' : 'bg-gray-200 text-gray-700')}
                        `}>
                          {tweet.sentiment}
                        </span>
                        <span className={`text-xs ${isTopThree ? 'text-white/40' : 'text-gray-500'}`}>
                          {formatPrettyDate(tweet.date)}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed line-clamp-2 ${
                        isTopThree ? 'text-white/80' : 'text-gray-700'
                      }`}>
                        {tweet.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonCard({ rank, filter }: { rank: number; filter?: 'positive' | 'negative' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: rank * 0.05 }}
      className="mb-2 rounded-lg border bg-white border-gray-200 p-2.5"
    >
      <div className="animate-pulse">
        {/* Top row */}
        <div className="flex items-center gap-2.5">
          {/* Rank placeholder */}
          <div className="w-7 h-5 bg-gray-200 rounded" />

          {/* Avatar */}
          <div className="w-9 h-9 bg-gray-200 rounded-full flex-shrink-0" />

          {/* Name/Handle */}
          <div className="flex-1 min-w-0">
            <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>

          {/* Score */}
          <div className="flex-shrink-0 text-right">
            <div className="h-6 w-12 bg-gray-200 rounded" />
          </div>

          {/* Arrow */}
          <div className="w-4 h-4 bg-gray-200 rounded flex-shrink-0" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-gray-100">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-2.5 w-12 bg-gray-200 rounded mx-auto mb-1" />
              <div className="h-3 w-8 bg-gray-200 rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SignupPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-200">
              <Logo />
            </div>
            <span className="text-xl font-semibold text-gray-900">Perception</span>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Start Free Trial → See Everything
          </h3>

          <p className="text-gray-600 mb-6">
            Access extended historical data <em>way beyond 7 days & 30 days</em> with a Perception account
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              Extended sentiment analysis history
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              Advanced filtering and insights
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
              API access for developers
            </div>
          </div>

          <div className="space-y-3">
            <button
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white py-4 px-6 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => window.open('https://app.perception.to/auth/sign-up', '_blank')}
            >
              Sign Up for Perception
            </button>
            <button
              className="w-full border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:scale-105"
              onClick={onClose}
            >
              Continue with 24 hours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppleTwitterSentimentLeaderboard() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'positive' | 'negative'>('positive');
  const [timePeriod, setTimePeriod] = useState<'24h' | 'weekly' | 'monthly'>('24h');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [positiveAccounts, setPositiveAccounts] = useState<TwitterAccount[]>([]);
  const [negativeAccounts, setNegativeAccounts] = useState<TwitterAccount[]>([]);
  const [copied, setCopied] = useState(false);

  // Reset expanded card when filter changes
  useEffect(() => {
    setExpandedCard(null);
  }, [filter]);

  useEffect(() => {
    async function fetchSentimentData() {
      try {
        setLoading(true);
        setLoadingProgress('Fetching data...');

        const endDate = new Date().toISOString().slice(0, 10);
        let daysBack: number;

        switch (timePeriod) {
          case '24h': daysBack = 1; break;
          case 'weekly': daysBack = 7; break;
          case 'monthly': daysBack = 30; break;
          default: daysBack = 7;
        }

        const startDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        // Comprehensive fetching strategy to get ALL available data
        const maxPagesToFetch = timePeriod === '24h' ? 50 : timePeriod === 'weekly' ? 70 : 100; // Fetch many more pages

        // Fetch first batch in parallel for faster initial load
        const initialBatchSize = Math.min(20, maxPagesToFetch); // Fetch many more pages initially
        setLoadingProgress(`Fetching ${initialBatchSize} pages in parallel...`);

        const fetchPromises = [];
        for (let page = 1; page <= initialBatchSize; page++) {
          const params = new URLSearchParams({
            userId: USER_ID,
            startDate,
            endDate,
            page: page.toString(),
            pageSize: '100'
          });

          fetchPromises.push(
            fetch(`${API_BASE}/feed?${params}`)
              .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
              })
              .then(data => ({ page, data }))
          );
        }

        const results = await Promise.all(fetchPromises);
        let allData: any[] = [];

        // Process results in order
        results
          .sort((a, b) => a.page - b.page)
          .forEach(result => {
            if (result.data.data && result.data.data.length > 0) {
              allData = [...allData, ...result.data.data];
            }
          });

        setLoadingProgress(`Processing ${allData.length} entries...`);

        console.log(`Fetched ${allData.length} entries from ${initialBatchSize} pages (${timePeriod} period)`);
        const data = allData;

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

        data.forEach(item => {
          if (item.Outlet === 'X' || item.Outlet === 'Twitter') {
            let handle = '';
            let name = '';

            if (item.URL && (item.URL.includes('twitter.com/') || item.URL.includes('x.com/'))) {
              const urlParts = item.URL.split('/');
              const handleIndex = urlParts.findIndex(part => part === 'twitter.com' || part === 'x.com') + 1;
              if (urlParts[handleIndex] && !urlParts[handleIndex].includes('status')) {
                handle = urlParts[handleIndex].split('?')[0];
                name = handle;
              }
            }

            if (!handle && item.Title) {
              const atMatch = item.Title.match(/@(\w+)/);
              if (atMatch) {
                handle = atMatch[1];
                name = handle;
              }
            }

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

            existing.tweets.push({
              content: item.Content,
              sentiment: item.Sentiment,
              date: item.Date,
              url: item.URL
            });

            if (new Date(item.Date) > new Date(existing.lastUpdate)) {
              existing.lastUpdate = item.Date;
            }

            twitterData.set(key, existing);
          }
        });

        // Calculate minimum posts based on time period - very low threshold to get more accounts
        const minPosts = timePeriod === '24h' ? 1 : 2; // Just 1 post minimum for 24h to maximize accounts

        // Calculate weighted score based on unified sentiment score (0-100) and volume
        const calculateWeightedScore = (sentimentScore: number, totalPosts: number, positivePosts: number, negativePosts: number) => {
          // Volume weight: logarithmic scale
          const volumeWeight = Math.log10(totalPosts + 1) / Math.log10(20); // Normalized to ~1 for 20 posts

          // For very negative scores (0-30), prioritize volume of negative posts heavily
          if (sentimentScore <= 30) {
            const negativeImpact = Math.log10(negativePosts + 1) / Math.log10(50);
            // High negative volume should rank higher in "most negative"
            return (1 - sentimentScore / 100) * 0.4 + negativeImpact * 0.6;
          }

          // For very positive scores (70-100), balance sentiment and total volume
          else if (sentimentScore >= 70) {
            return (sentimentScore / 100) * 0.6 + volumeWeight * 0.4;
          }

          // For neutral scores (30-70), use total volume primarily
          else {
            return volumeWeight * 0.8 + (sentimentScore / 100) * 0.2;
          }
        };

        // First, create ALL accounts data without filtering by sentiment
        const allAccountsRaw: TwitterAccount[] = Array.from(twitterData.entries())
          .filter(([_, data]) => data.totalMentions >= minPosts) // Minimum post threshold
          .map(([key, data]) => {
            const positivePercentage = (data.positiveMentions / data.totalMentions) * 100;
            const neutralPercentage = (data.neutralMentions / data.totalMentions) * 100;
            const negativePercentage = (data.negativeMentions / data.totalMentions) * 100;

            // Calculate unified sentiment score: 0 = most negative, 100 = most positive
            // Formula: (positive% - negative% + 100) / 2
            const unifiedSentimentScore = Number(((positivePercentage - negativePercentage + 100) / 2).toFixed(2));

            const weightedScore = calculateWeightedScore(
              unifiedSentimentScore,
              data.totalMentions,
              data.positiveMentions,
              data.negativeMentions
            );

            return {
              name: data.realName || data.realHandle,
              handle: data.realHandle,
              sentimentScore: unifiedSentimentScore, // 0-100 unified score
              totalMentions: data.totalMentions,
              positivePercentage,
              neutralPercentage,
              negativePercentage,
              lastUpdate: data.lastUpdate,
              tweets: data.tweets.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
              weightedScore: weightedScore,
              profileImageUrl: getTwitterProfileImageUrl(data.realHandle, 'bigger')
            };
          });

        // Filter and sort accounts by sentiment - NO OVERLAP
        // Positive: Only accounts with sentiment > 50 (actually bullish)
        const sortedByPositive = [...allAccountsRaw]
          .filter(account => account.sentimentScore > 50)
          .sort((a, b) => {
            const aVolumeTier = Math.floor(a.totalMentions / 10);
            const bVolumeTier = Math.floor(b.totalMentions / 10);
            if (aVolumeTier !== bVolumeTier) return bVolumeTier - aVolumeTier;
            return b.sentimentScore - a.sentimentScore; // Higher score first
          });

        // Negative: Only accounts with sentiment < 50 (actually bearish)
        const sortedByNegative = [...allAccountsRaw]
          .filter(account => account.sentimentScore < 50)
          .sort((a, b) => {
            const aVolumeTier = Math.floor(a.totalMentions / 10);
            const bVolumeTier = Math.floor(b.totalMentions / 10);
            if (aVolumeTier !== bVolumeTier) return bVolumeTier - aVolumeTier;
            return a.sentimentScore - b.sentimentScore; // Lower score first
          });

        console.log('Total accounts fetched:', allAccountsRaw.length);
        console.log('Positive accounts (score > 50):', sortedByPositive.length);
        console.log('Negative accounts (score < 50):', sortedByNegative.length);
        console.log('Top 5 positive:', sortedByPositive.slice(0, 5).map(a => ({ handle: a.handle, score: a.sentimentScore })));
        console.log('Top 5 negative:', sortedByNegative.slice(0, 5).map(a => ({ handle: a.handle, score: a.sentimentScore })));

        // Calculate rank changes for both positive and negative lists
        const now = Date.now();

        // Helper function to add rank changes to a list
        const addRankChanges = (accountsList: TwitterAccount[], filterType: 'positive' | 'negative') => {
          const storageKey = `leaderboard_${filterType}_${timePeriod}`;
          const previousDataStr = localStorage.getItem(storageKey);

          let accountsWithRankChange = accountsList;

          if (previousDataStr) {
            try {
              const previousData = JSON.parse(previousDataStr);
              const previousTimestamp = previousData.timestamp || 0;
              const hoursSinceLastUpdate = (now - previousTimestamp) / (1000 * 60 * 60);

              // Only use previous data if it's between 20-28 hours old (roughly 24h with some buffer)
              if (hoursSinceLastUpdate >= 20 && hoursSinceLastUpdate <= 28) {
                const previousRankings = previousData.rankings || {};

                accountsWithRankChange = accountsList.map((account, currentIndex) => {
                  const currentRank = currentIndex + 1;
                  const previousRank = previousRankings[account.handle];

                  if (previousRank) {
                    // Positive rankChange means moved UP (lower rank number = better)
                    const rankChange = previousRank - currentRank;
                    return { ...account, rankChange };
                  }

                  return account; // New entry, no rank change
                });
              }
            } catch (e) {
              console.error('Error parsing previous rankings:', e);
            }
          }

          // Store current rankings for next comparison (24h from now)
          const currentRankings: Record<string, number> = {};
          accountsList.forEach((account, index) => {
            currentRankings[account.handle] = index + 1;
          });

          localStorage.setItem(storageKey, JSON.stringify({
            timestamp: now,
            rankings: currentRankings
          }));

          return accountsWithRankChange;
        };

        // Add rank changes to both lists
        const positiveWithRankChanges = addRankChanges(sortedByPositive, 'positive');
        const negativeWithRankChanges = addRankChanges(sortedByNegative, 'negative');

        setPositiveAccounts(positiveWithRankChanges);
        setNegativeAccounts(negativeWithRankChanges);
        setError(null);
      } catch (err) {
        console.error('Error fetching sentiment data:', err);
        setError('Failed to load sentiment data');
      } finally {
        setLoading(false);
        setLoadingProgress('');
      }
    }

    fetchSentimentData();
  }, [timePeriod]); // Only refetch when time period changes, not filter

  // Get the current accounts based on filter and show top 20
  const allAccountsData = filter === 'positive' ? positiveAccounts : negativeAccounts;
  const displayedAccounts = allAccountsData.slice(0, 20);

  // Share functionality - Posts to X (Twitter)
  const handleShare = () => {
    const url = 'https://perception.to/bitcoin-social-media-sentiment-leaderboard';
    const text = `Bitcoin Influence Index: Real-time sentiment ranking of Bitcoin's most influential voices on X 📊\n\nDiscover who's shaping the Bitcoin conversation right now:`;

    // Create Twitter intent URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

    // Open in new window
    window.open(twitterUrl, '_blank', 'width=550,height=420');

    // Show feedback
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Sentiment Leaderboard | Bitcoin Perception</title>
        <meta name="description" content="Real-time Bitcoin Twitter sentiment analysis with an elegant, Apple-inspired interface." />
      </Helmet>

      <div className="min-h-screen bg-white pt-16">
        {/* Header */}
        <div className="border-b border-gray-200 mt-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Who's bullish? Who's bearish?</h1>
            <p className="text-sm text-gray-600 mb-4">Real-time sentiment ranking of Bitcoin's most influential voices on X</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-center gap-8">
              {/* Share Button */}
              <button
                onClick={handleShare}
                className={`
                  inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold
                  transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl
                  ${copied
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'}
                `}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Shared!
                  </>
                ) : (
                  <>
                    <span>Post on</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </>
                )}
              </button>

              {/* Sentiment Toggle */}
              <div className="relative bg-gradient-to-r from-gray-100 to-gray-50 rounded-full p-1.5 shadow-inner">
                <div className={`
                  absolute top-1.5 h-[calc(100%-12px)] rounded-full shadow-lg transition-all duration-300
                  ${filter === 'positive'
                    ? 'left-1.5 w-28 bg-gradient-to-r from-emerald-500 to-emerald-400'
                    : 'left-[118px] w-28 bg-gradient-to-r from-red-500 to-red-400'}
                `} />
                <button
                  onClick={() => setFilter('positive')}
                  className={`
                    relative px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-300
                    ${filter === 'positive' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
                  `}
                >
                  Positive
                </button>
                <button
                  onClick={() => setFilter('negative')}
                  className={`
                    relative px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-300
                    ${filter === 'negative' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
                  `}
                >
                  Negative
                </button>
              </div>

              {/* Time Period Pills */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTimePeriod('24h')}
                  disabled={loading}
                  className={`
                    px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105
                    ${timePeriod === '24h'
                      ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg hover:shadow-xl'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'}
                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  24 Hours
                </button>
                <button
                  onClick={() => setShowSignupPopup(true)}
                  disabled={loading}
                  className={`
                    relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105
                    bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:from-gray-200 hover:to-gray-100 border-2 border-gray-200
                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <Lock className="w-3 h-3 inline mr-1.5" />
                  7 Days
                </button>
                <button
                  onClick={() => setShowSignupPopup(true)}
                  disabled={loading}
                  className={`
                    relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105
                    bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:from-gray-200 hover:to-gray-100 border-2 border-gray-200
                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <Lock className="w-3 h-3 inline mr-1.5" />
                  30 Days
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-3xl mx-auto">
            {loading ? (
              <div className="space-y-6">
                {loadingProgress && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 text-lg font-light">{loadingProgress}</p>
                  </div>
                )}
                {[...Array(15)].map((_, index) => (
                  <SkeletonCard key={index} rank={index + 1} filter={filter} />
                ))}
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-500 text-lg mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-10 py-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white rounded-full text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Retry
                </button>
              </motion.div>
            ) : displayedAccounts.length > 0 ? (
              <>
                <div className="space-y-6">
                  {displayedAccounts.map((account, index) => (
                    <AppleCard
                      key={account.handle}
                      account={account}
                      rank={index + 1}
                      expanded={expandedCard === account.handle}
                      onToggle={() => setExpandedCard(
                        expandedCard === account.handle ? null : account.handle
                      )}
                      filter={filter}
                    />
                  ))}
                </div>

                {/* Results Info */}
                <div className="mt-8 text-center space-y-2">
                  <p className="text-sm text-gray-500">
                    Showing top {displayedAccounts.length} of {allAccountsData.length} {filter} accounts
                  </p>
                  <p className="text-sm text-gray-600">
                    Want full access to all data and advanced analytics?{' '}
                    <a
                      href="https://perception.to"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-gray-700 font-medium underline decoration-1 underline-offset-2 transition-colors duration-200"
                    >
                      Subscribe to Perception
                    </a>{' '}
                    from $45/month
                  </p>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-500">No data available for this period</p>
              </motion.div>
            )}
          </div>
        </div>

        <SignupPopup isOpen={showSignupPopup} onClose={() => setShowSignupPopup(false)} />
      </div>
    </>
  );
}