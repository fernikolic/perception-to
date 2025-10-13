import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon, CalendarIcon, ChevronRightIcon, Activity, TrendingUp, TrendingDown, Lock, X, Check } from 'lucide-react';
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
      className={`group relative ${isTopThree ? 'mb-8' : 'mb-4'}`}
    >
      <div
        className={`
          relative backdrop-blur-2xl rounded-3xl overflow-hidden
          border transition-all duration-700 ease-out cursor-pointer
          ${isTopRank && filter === 'positive'
            ? 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-gray-900 border-emerald-900/50 shadow-[0_20px_60px_rgba(16,185,129,0.3)] hover:shadow-[0_24px_80px_rgba(16,185,129,0.4)]'
            : isTopRank && filter === 'negative'
            ? 'bg-gradient-to-br from-red-950 via-red-900 to-gray-900 border-red-900/50 shadow-[0_20px_60px_rgba(127,29,29,0.4)] hover:shadow-[0_24px_80px_rgba(127,29,29,0.5)]'
            : isTopThree && filter === 'positive'
            ? 'bg-gradient-to-br from-emerald-900 to-gray-800 border-emerald-800/50 shadow-[0_16px_48px_rgba(16,185,129,0.2)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.3)]'
            : isTopThree && filter === 'negative'
            ? 'bg-gradient-to-br from-red-900 to-gray-800 border-red-800/50 shadow-[0_16px_48px_rgba(127,29,29,0.3)] hover:shadow-[0_20px_60px_rgba(127,29,29,0.4)]'
            : 'bg-white border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]'}
          ${expanded ? 'bg-opacity-95' : ''}
        `}
        onClick={onToggle}
      >
        <div className={`relative ${isTopThree ? 'p-10' : 'p-8'}`}>
          {/* Top Section - Rank and Profile */}
          <div className="flex items-start gap-8 mb-8">
            {/* MASSIVE Rank Number */}
            <div className="flex-shrink-0">
              <div className={`
                font-bold tracking-tighter leading-none
                ${isTopThree ? 'text-8xl' : 'text-6xl'}
                ${isTopThree ? 'text-white' : 'text-gray-900'}
                ${isTopRank && filter === 'positive' ? 'drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]' : ''}
                ${isTopRank && filter === 'negative' ? 'drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]' : ''}
              `}>
                {rank}
              </div>
              {isTopRank && (
                <div className={`mt-2 text-sm font-semibold tracking-wider uppercase ${
                  filter === 'positive' ? 'text-emerald-300' :
                  filter === 'negative' ? 'text-red-300' : 'text-white/60'
                }`}>
                  #1
                </div>
              )}
            </div>

            {/* Profile and Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-5 mb-6">
                {/* Profile Picture */}
                <Avatar className={`flex-shrink-0 ring-4 shadow-xl transition-all duration-300 ${
                  isTopThree && filter === 'positive'
                    ? 'w-20 h-20 ring-emerald-500/30 hover:ring-emerald-500/50'
                    : isTopThree && filter === 'negative'
                    ? 'w-20 h-20 ring-red-500/30 hover:ring-red-500/50'
                    : isTopThree
                    ? 'w-20 h-20 ring-white/20 hover:ring-white/40'
                    : 'w-16 h-16 ring-gray-200 hover:ring-gray-300'
                }`}>
                  <AvatarImage
                    src={getTwitterProfileImageUrl(account.handle, 'bigger')}
                    alt={`${account.name} profile`}
                    className="object-cover"
                    loading="lazy"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-800 text-white font-semibold text-2xl">
                    {getTwitterHandleInitials(account.handle)}
                  </AvatarFallback>
                </Avatar>

                {/* Account Info */}
                <div className="flex-1 min-w-0">
                  {isTopThree ? (
                    <>
                      <h3
                        className="font-bold tracking-tight mb-2 text-3xl [&]:!text-white"
                        style={{ color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                      >
                        {account.name}
                      </h3>
                      <p
                        className="text-base font-medium [&]:!text-white"
                        style={{ color: '#ffffff', opacity: 0.9 }}
                      >
                        @{account.handle}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold tracking-tight mb-2 text-gray-900">
                        {account.name}
                      </h3>
                      <p className="text-base font-medium text-gray-500">
                        @{account.handle}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Massive Sentiment Score */}
              <div className="mb-6">
                <div className={`
                  text-6xl font-bold tracking-tighter mb-2
                  ${isTopThree ? 'text-white' : 'text-gray-900'}
                  ${isTopThree && filter === 'positive' ? 'drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]' : ''}
                  ${isTopThree && filter === 'negative' ? 'drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]' : ''}
                `}>
                  {account.sentimentScore.toFixed(0)}
                  <span className={`text-3xl font-light ${
                    isTopThree && filter === 'positive' ? 'text-emerald-300' :
                    isTopThree && filter === 'negative' ? 'text-red-300' :
                    isTopThree ? 'text-white/60' : 'text-gray-500'
                  }`}>/100</span>
                </div>
                <div className={`text-sm font-medium uppercase tracking-wider ${
                  isTopThree && filter === 'positive' ? 'text-emerald-300/80' :
                  isTopThree && filter === 'negative' ? 'text-red-300/80' :
                  isTopThree ? 'text-white/60' : 'text-gray-500'
                }`}>
                  Sentiment Score
                </div>
              </div>

              {/* Stats Grid - Simplified */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className={`text-sm font-medium uppercase tracking-wider mb-2 ${
                    isTopThree ? 'text-white/60' : 'text-gray-500'
                  }`}>
                    Positive
                  </p>
                  <p className={`text-2xl font-bold ${isTopThree ? 'text-white' : 'text-gray-900'}`}>
                    {account.positivePercentage.toFixed(0)}%
                  </p>
                </div>
                <div>
                  <p className={`text-sm font-medium uppercase tracking-wider mb-2 ${
                    isTopThree ? 'text-white/60' : 'text-gray-500'
                  }`}>
                    Negative
                  </p>
                  <p className={`text-2xl font-bold ${isTopThree ? 'text-white' : 'text-gray-900'}`}>
                    {account.negativePercentage.toFixed(0)}%
                  </p>
                </div>
                <div>
                  <p className={`text-sm font-medium uppercase tracking-wider mb-2 ${
                    isTopThree ? 'text-white/60' : 'text-gray-500'
                  }`}>
                    Posts
                  </p>
                  <p className={`text-2xl font-bold ${isTopThree ? 'text-white' : 'text-gray-900'}`}>
                    {account.totalMentions}
                  </p>
                </div>
              </div>
            </div>

            {/* Expand Icon */}
            <div className="flex-shrink-0">
              <ChevronRightIcon className={`
                w-6 h-6 transition-transform duration-300
                ${isTopThree ? 'text-white/40' : 'text-gray-400'}
                ${expanded ? 'rotate-90' : ''}
              `} />
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
  const isTopThree = rank <= 3;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: rank * 0.05 }}
      className={`rounded-3xl border ${
        isTopThree && filter === 'positive'
          ? 'bg-gradient-to-br from-emerald-950 to-gray-900 border-emerald-900/50 p-10'
          : isTopThree && filter === 'negative'
          ? 'bg-gradient-to-br from-red-950 to-gray-900 border-red-900/50 p-10'
          : isTopThree
          ? 'bg-gray-900 border-gray-800 p-10'
          : 'bg-white border-gray-200 p-8'
      }`}
    >
      <div className="animate-pulse">
        <div className="flex items-start gap-8 mb-8">
          {/* Rank placeholder */}
          <div className={`
            rounded-lg
            ${isTopThree ? 'w-24 h-24 bg-gray-800' : 'w-20 h-20 bg-gray-200'}
          `} />

          <div className="flex-1">
            <div className="flex items-start gap-5 mb-6">
              {/* Avatar */}
              <div className={`
                rounded-full
                ${isTopThree ? 'w-20 h-20 bg-gray-800' : 'w-16 h-16 bg-gray-200'}
              `} />
              {/* Name */}
              <div className="flex-1">
                <div className={`
                  rounded-lg mb-2
                  ${isTopThree ? 'h-8 w-48 bg-gray-800' : 'h-7 w-40 bg-gray-200'}
                `} />
                <div className={`
                  rounded-lg
                  ${isTopThree ? 'h-5 w-32 bg-gray-800' : 'h-5 w-28 bg-gray-200'}
                `} />
              </div>
            </div>

            {/* Score */}
            <div className={`
              rounded-lg mb-6
              ${isTopThree ? 'h-16 w-36 bg-gray-800' : 'h-14 w-32 bg-gray-200'}
            `} />

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className={`
                    rounded mb-2
                    ${isTopThree ? 'h-4 w-16 bg-gray-800' : 'h-3 w-14 bg-gray-200'}
                  `} />
                  <div className={`
                    rounded
                    ${isTopThree ? 'h-7 w-12 bg-gray-800' : 'h-6 w-10 bg-gray-200'}
                  `} />
                </div>
              ))}
            </div>
          </div>
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
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
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
              <div className="relative z-10 px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-24">
                <div className="mx-auto max-w-5xl text-center">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight sm:leading-[0.95] text-black mb-6 sm:mb-10 lg:mb-14 max-w-4xl mx-auto px-2">
                    Bitcoin Influence Index
                  </h1>

                  <p className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed text-black/70 max-w-4xl mx-auto px-2">
                    Real-time sentiment ranking of Bitcoin's most influential voices on X, powered by 100+ data sources
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
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
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