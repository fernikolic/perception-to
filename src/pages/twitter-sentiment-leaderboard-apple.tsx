import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon, CalendarIcon, ChevronRightIcon, Activity, TrendingUp, TrendingDown, Lock, X, Share2, Check } from 'lucide-react';
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
  const isPositive = account.positivePercentage > 60;
  const isNegative = account.negativePercentage > 40;
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
      className="group relative"
    >
      {/* Top Rank Crown/Badge for #1 */}
      {isTopRank && (
        <div className={`
          absolute -top-4 left-8 z-10 px-4 py-2 rounded-full text-sm font-bold
          flex items-center gap-2 shadow-lg
          ${filter === 'negative'
            ? 'bg-red-600 text-white shadow-red-200'
            : 'bg-green-600 text-white shadow-green-200'}
        `}>
          <span className="text-base">🏆</span>
          Most {filter === 'negative' ? 'Negative' : 'Positive'}
        </div>
      )}

      <div
        className={`
          relative backdrop-blur-2xl rounded-3xl overflow-hidden
          border transition-all duration-700 ease-out cursor-pointer
          ${isTopRank && filter === 'negative'
            ? 'bg-red-50/90 border-red-200 shadow-[0_12px_48px_rgba(239,68,68,0.15)] hover:shadow-[0_16px_64px_rgba(239,68,68,0.2)]'
            : isTopRank && filter === 'positive'
            ? 'bg-green-50/90 border-green-200 shadow-[0_12px_48px_rgba(34,197,94,0.15)] hover:shadow-[0_16px_64px_rgba(34,197,94,0.2)]'
            : 'bg-white/80 border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]'}
          ${expanded ? 'bg-opacity-95' : ''}
        `}
        onClick={onToggle}
      >
        {/* Enhanced gradient overlay for top rank */}
        <div className={`
          absolute inset-0
          ${isTopRank && filter === 'negative'
            ? 'bg-gradient-to-br from-red-500/5 to-rose-600/5'
            : isTopRank && filter === 'positive'
            ? 'bg-gradient-to-br from-green-500/5 to-emerald-600/5'
            : isPositive
            ? 'bg-gradient-to-br from-green-500/[0.02] to-emerald-500/[0.02]'
            : isNegative
            ? 'bg-gradient-to-br from-red-500/[0.02] to-rose-500/[0.02]'
            : 'bg-gradient-to-br from-slate-500/[0.02] to-gray-500/[0.02]'}
        `} />

        <div className="relative p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-5">
              {/* Rank Badge */}
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-2xl
                font-bold text-lg
                ${rank === 1 && filter === 'negative' ? 'bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg shadow-red-200' :
                  rank === 1 && filter === 'positive' ? 'bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg shadow-green-200' :
                  rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-lg shadow-gray-200' :
                  rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-200' :
                  'bg-gray-100 text-gray-600'}
              `}>
                {rank}
              </div>

              {/* Profile Picture */}
              <Avatar className="w-14 h-14 ring-2 ring-white shadow-lg transition-all duration-300 hover:ring-4 hover:ring-blue-100">
                <AvatarImage
                  src={getTwitterProfileImageUrl(account.handle, 'bigger')}
                  alt={`${account.name} profile`}
                  className="object-cover"
                  loading="lazy"
                />
                <AvatarFallback className={`
                  text-white font-semibold text-lg transition-all duration-300
                  ${isTopRank && filter === 'negative'
                    ? 'bg-gradient-to-br from-red-500 to-red-700'
                    : isTopRank && filter === 'positive'
                    ? 'bg-gradient-to-br from-green-500 to-green-700'
                    : 'bg-gradient-to-br from-blue-500 to-purple-600'}
                `}>
                  {getTwitterHandleInitials(account.handle)}
                </AvatarFallback>
              </Avatar>

              {/* Account Info */}
              <div>
                <h3 className={`
                  text-xl font-semibold tracking-tight
                  ${isTopRank && filter === 'negative' ? 'text-red-900' :
                    isTopRank && filter === 'positive' ? 'text-green-900' :
                    'text-gray-900'}
                `}>
                  {account.name}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">@{account.handle}</p>
              </div>
            </div>

            {/* Sentiment Indicator */}
            <div className="flex items-center gap-3">
              <div className={`
                px-4 py-2 rounded-full flex items-center gap-2 font-semibold
                ${account.sentimentScore >= 70 ? 'bg-green-100 text-green-800' :
                  account.sentimentScore >= 50 ? 'bg-blue-100 text-blue-800' :
                  account.sentimentScore >= 30 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'}
                ${isTopRank ? 'ring-2 ring-current ring-opacity-30' : ''}
              `}>
                {account.sentimentScore >= 70 ? <TrendingUp className="w-4 h-4" /> :
                 account.sentimentScore >= 30 ? <Activity className="w-4 h-4" /> :
                 <TrendingDown className="w-4 h-4" />}
                <span className={`text-sm ${isTopRank ? 'font-bold' : 'font-medium'}`}>
                  {account.sentimentScore.toFixed(2)}/100
                </span>
              </div>

              <ChevronRightIcon className={`
                w-5 h-5 text-gray-400 transition-transform duration-300
                ${expanded ? 'rotate-90' : ''}
              `} />
            </div>
          </div>

          {/* Sentiment Bar */}
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: rank * 0.1 }}
            />
            <motion.div
              className="absolute top-0 h-full w-1 bg-white rounded-full shadow-lg border border-gray-300"
              style={{
                boxShadow: '0 0 0 1px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3)'
              }}
              initial={{ left: 0 }}
              animate={{ left: `${account.sentimentScore}%` }}
              transition={{ duration: 1, delay: rank * 0.1 + 0.3 }}
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Sentiment Score</p>
              <p className={`text-lg font-semibold ${
                account.sentimentScore >= 70 ? 'text-green-600' :
                account.sentimentScore >= 50 ? 'text-blue-600' :
                account.sentimentScore >= 30 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {account.sentimentScore.toFixed(2)}/100
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Positive</p>
              <p className="text-lg font-semibold text-green-600">
                {account.positivePercentage.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Negative</p>
              <p className="text-lg font-semibold text-red-600">
                {account.negativePercentage.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Posts</p>
              <p className="text-lg font-semibold text-gray-900">
                {account.totalMentions}
              </p>
            </div>
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
              className="border-t border-gray-100"
            >
              <div className="p-8 pt-6 space-y-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
                  Recent Tweets
                </p>
                {account.tweets.slice(0, 3).map((tweet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-50 rounded-2xl"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`
                        text-xs font-medium px-2 py-1 rounded-lg
                        ${tweet.sentiment === 'Positive' ? 'bg-green-100 text-green-700' :
                          tweet.sentiment === 'Negative' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'}
                      `}>
                        {tweet.sentiment}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatPrettyDate(tweet.date)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                      {tweet.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SkeletonCard({ rank }: { rank: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: rank * 0.05 }}
      className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/50"
    >
      <div className="animate-pulse">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gray-200 rounded-2xl" />
            <div className="w-14 h-14 bg-gray-200 rounded-full" />
            <div>
              <div className="h-5 w-32 bg-gray-200 rounded-lg mb-2" />
              <div className="h-4 w-24 bg-gray-200 rounded-lg" />
            </div>
          </div>
          <div className="h-9 w-20 bg-gray-200 rounded-full" />
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-6" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-12 bg-gray-200 rounded" />
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
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Extended sentiment analysis history
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Advanced filtering and insights
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              API access for developers
            </div>
          </div>

          <div className="space-y-3">
            <button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-full font-medium transition-all duration-200"
              onClick={() => window.open('https://app.perception.to/auth/sign-up', '_blank')}
            >
              Sign Up for Perception
            </button>
            <button
              className="w-full border border-gray-200 text-gray-700 py-3 px-6 rounded-full font-medium hover:bg-gray-50 transition-all duration-200"
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
  const [accounts, setAccounts] = useState<TwitterAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'positive' | 'negative'>('positive');
  const [timePeriod, setTimePeriod] = useState<'24h' | 'weekly' | 'monthly'>('24h');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [allAccountsData, setAllAccountsData] = useState<TwitterAccount[]>([]);
  const [copied, setCopied] = useState(false);

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

        // Comprehensive fetching strategy to get all available data
        const maxPagesToFetch = timePeriod === '24h' ? 20 : timePeriod === 'weekly' ? 40 : 60; // Increased for comprehensive data

        // Fetch first batch in parallel for faster initial load
        const initialBatchSize = Math.min(5, maxPagesToFetch);
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

        // Calculate minimum posts based on time period - reduced for more results
        const minPosts = timePeriod === '24h' ? 3 : 5; // Lower threshold for more accounts

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

        const accountsData: TwitterAccount[] = Array.from(twitterData.entries())
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
          })
          .filter(account => {
            // Filter accounts based on the selected filter - no overlap
            if (filter === 'positive') {
              return account.sentimentScore > 50; // Must be actually positive (above neutral)
            } else {
              return account.sentimentScore < 50; // Must be actually negative (below neutral)
            }
          })
          .sort((a, b) => {
            // Prioritize sentiment extremes within volume tiers
            const aVolumeTier = Math.floor(a.totalMentions / 10); // Group by volume tiers of 10
            const bVolumeTier = Math.floor(b.totalMentions / 10);

            if (aVolumeTier !== bVolumeTier) {
              return bVolumeTier - aVolumeTier; // Higher volume tier first
            }

            // Within same volume tier, prioritize extreme sentiment scores
            if (filter === 'positive') {
              return b.sentimentScore - a.sentimentScore; // Higher sentiment for positive (closer to 100)
            } else {
              return a.sentimentScore - b.sentimentScore; // Lower sentiment for negative (closer to 0)
            }
          })
          // Store all accounts without limiting

        setAllAccountsData(accountsData);
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
  }, [filter, timePeriod]);

  // Show top 20 for each filter
  const displayedAccounts = allAccountsData.slice(0, 20);

  // Share functionality
  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sentiment Leaderboard | Bitcoin Perception</title>
        <meta name="description" content="Real-time Bitcoin Twitter sentiment analysis with an elegant, Apple-inspired interface." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
          {/* Base Gradient */}
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:px-8">
            {/* Hero Card with Background Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src="/images/hero_image.avif?v=2"
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-20">
                <div className="mx-auto max-w-4xl text-center">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-black max-w-4xl mx-auto px-2">
                    The Bitcoin Toxicity Index™
                  </h1>

                  <p className="mt-3 sm:mt-4 lg:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light max-w-3xl mx-auto px-2">
                    Who's poisoning the conversation and who's actually building? Live sentiment data from{' '}
                    <a
                      href="https://perception.to"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-black/80 font-medium underline decoration-1 underline-offset-2 transition-colors duration-200"
                    >
                      Perception
                    </a>{' '}
                    reveals X's most toxic and most valuable Bitcoin voices.
                  </p>

                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-center gap-8">
              {/* Share Button */}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-black/10 text-black border border-black/20 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                {copied ? (
                  <>
                    ✅ Copied!
                  </>
                ) : (
                  <>
                    📋 Share
                  </>
                )}
              </button>

              {/* Sentiment Toggle */}
              <div className="relative bg-gray-100 rounded-full p-1">
                <div className={`
                  absolute top-1 h-[calc(100%-8px)] rounded-full bg-white shadow-sm transition-all duration-300
                  ${filter === 'positive' ? 'left-1 w-24' : 'left-[100px] w-24'}
                `} />
                <button
                  onClick={() => setFilter('positive')}
                  className={`
                    relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300
                    ${filter === 'positive' ? 'text-gray-900' : 'text-gray-500'}
                  `}
                >
                  Positive
                </button>
                <button
                  onClick={() => setFilter('negative')}
                  className={`
                    relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300
                    ${filter === 'negative' ? 'text-gray-900' : 'text-gray-500'}
                  `}
                >
                  Negative
                </button>
              </div>

              {/* Time Period Pills */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTimePeriod('24h')}
                  disabled={loading}
                  className={`
                    px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${timePeriod === '24h'
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}
                    ${loading ? 'opacity-50' : ''}
                  `}
                >
                  24 Hours
                </button>
                <button
                  onClick={() => setShowSignupPopup(true)}
                  disabled={loading}
                  className={`
                    px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                    bg-white text-gray-600 hover:bg-gray-100 border border-gray-200
                    ${loading ? 'opacity-50' : ''}
                  `}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setShowSignupPopup(true)}
                  disabled={loading}
                  className={`
                    px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                    bg-white text-gray-600 hover:bg-gray-100 border border-gray-200
                    ${loading ? 'opacity-50' : ''}
                  `}
                >
                  30 Days
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto space-y-4">
            {loading ? (
              <div className="space-y-4">
                {loadingProgress && (
                  <div className="text-center py-4">
                    <p className="text-gray-600 text-sm">{loadingProgress}</p>
                  </div>
                )}
                {[...Array(15)].map((_, index) => (
                  <SkeletonCard key={index} rank={index + 1} />
                ))}
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-500 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium"
                >
                  Retry
                </button>
              </motion.div>
            ) : displayedAccounts.length > 0 ? (
              <>
                <div className="space-y-4">
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

        {/* Footer */}
        <div className="mt-20 py-12 border-t border-gray-200">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Powered by Perception • Analyzing 100+ sources in real-time
            </p>
            <p className="text-xs text-gray-400">
              Rankings weighted by sentiment strength and engagement volume •
              High-volume negative posters prioritized for impact assessment
            </p>
          </div>
        </div>
        <SignupPopup isOpen={showSignupPopup} onClose={() => setShowSignupPopup(false)} />
      </div>
    </>
  );
}