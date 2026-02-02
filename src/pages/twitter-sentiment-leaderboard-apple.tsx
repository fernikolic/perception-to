import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Download } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getTwitterProfileImageUrl, getTwitterHandleInitials } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';

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
  weightedScore: number;
  profileImageUrl?: string;
  rankChange?: number;
}

const API_BASE = 'https://btcpapifunction-45998414364.us-central1.run.app/btcpapifunction';
const USER_ID = 'perception';

// Share individual ranking
function shareRanking(account: TwitterAccount, rank: number, filter: 'bulls' | 'bears') {
  const emoji = filter === 'bulls' ? '🟢' : '🔴';
  const label = filter === 'bulls' ? 'BULLISH' : 'BEARISH';
  const url = 'https://perception.to/bitcoin-social-media-sentiment-leaderboard';

  const text = `${emoji} @${account.handle} is #${rank} most ${label} on Bitcoin right now

Sentiment Score: ${account.sentimentScore.toFixed(0)}/100
Based on ${account.totalMentions} recent posts

See the full leaderboard:`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
}

// Top 3 Podium Card
function PodiumCard({ account, rank, filter, forDownload = false, avatarDataUrl }: {
  account: TwitterAccount;
  rank: number;
  filter: 'bulls' | 'bears';
  forDownload?: boolean;
  avatarDataUrl?: string;
}) {
  const isBulls = filter === 'bulls';
  const sizes = {
    1: { card: 'order-2', height: forDownload ? 'h-56' : 'h-48 sm:h-64', avatar: forDownload ? 'w-16 h-16' : 'w-14 h-14 sm:w-20 sm:h-20', rank: forDownload ? 'text-5xl' : 'text-4xl sm:text-6xl', name: forDownload ? 'text-base' : 'text-sm sm:text-lg' },
    2: { card: 'order-1', height: forDownload ? 'h-48' : 'h-40 sm:h-52', avatar: forDownload ? 'w-14 h-14' : 'w-12 h-12 sm:w-16 sm:h-16', rank: forDownload ? 'text-4xl' : 'text-3xl sm:text-5xl', name: forDownload ? 'text-sm' : 'text-xs sm:text-base' },
    3: { card: 'order-3', height: forDownload ? 'h-40' : 'h-36 sm:h-44', avatar: forDownload ? 'w-12 h-12' : 'w-10 h-10 sm:w-14 sm:h-14', rank: forDownload ? 'text-3xl' : 'text-2xl sm:text-4xl', name: forDownload ? 'text-sm' : 'text-xs sm:text-base' },
  };
  const size = sizes[rank as keyof typeof sizes];

  const cardContent = (
    <div
      className={`
        relative rounded-xl sm:rounded-2xl p-4 sm:p-6 pb-6 flex flex-col items-center justify-end cursor-pointer
        transition-all duration-300 ${forDownload ? '' : 'hover:scale-105'}
        ${size.height}
        ${isBulls ? 'bg-emerald-500' : 'bg-red-500'}
      `}
      onClick={forDownload ? undefined : () => shareRanking(account, rank, filter)}
    >
      {/* Rank Badge */}
      <div className={`absolute top-3 left-1/2 -translate-x-1/2 ${size.rank} font-bold text-white/20`}>
        {rank}
      </div>

      {/* Avatar */}
      {forDownload ? (
        avatarDataUrl ? (
          <img
            src={avatarDataUrl}
            alt={account.handle}
            className={`${size.avatar} rounded-full border-2 border-white/30 mb-3 object-cover`}
          />
        ) : (
          <div className={`${size.avatar} rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center mb-3`}>
            <span className="text-white font-bold text-lg">
              {getTwitterHandleInitials(account.handle)}
            </span>
          </div>
        )
      ) : (
        <Avatar className={`${size.avatar} border-2 sm:border-4 border-white/20 mb-2 sm:mb-3`}>
          <AvatarImage
            src={getTwitterProfileImageUrl(account.handle, 'bigger')}
            alt={account.handle}
          />
          <AvatarFallback className="bg-white/20 text-white font-bold text-xs sm:text-base">
            {getTwitterHandleInitials(account.handle)}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Handle */}
      <p className={`${size.name} font-bold text-white text-center w-full px-2`} style={{ wordBreak: 'break-all' }}>
        @{account.handle}
      </p>

      {/* Score + Posts */}
      <div className={`mt-2 flex items-center gap-2 ${forDownload ? 'text-sm' : 'text-xs sm:text-sm'}`}>
        <span className="text-white font-semibold">{account.sentimentScore.toFixed(0)}/100</span>
        <span className="text-white/60">{account.totalMentions} posts</span>
      </div>

      {/* Share hint - hidden on mobile and in download */}
      {!forDownload && (
        <div className="absolute bottom-2 right-2 text-white/40 text-xs hidden sm:block">
          tap to share
        </div>
      )}
    </div>
  );

  if (forDownload) {
    return <div className={`flex-1 min-w-0 ${size.card}`}>{cardContent}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1, duration: 0.5 }}
      className={`flex-1 min-w-0 ${size.card}`}
    >
      {cardContent}
    </motion.div>
  );
}

// Leaderboard Row
function LeaderboardRow({ account, rank, filter }: {
  account: TwitterAccount;
  rank: number;
  filter: 'bulls' | 'bears';
}) {
  const isBulls = filter === 'bulls';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.03, duration: 0.3 }}
      className="group"
    >
      <div
        className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
        onClick={() => shareRanking(account, rank, filter)}
      >
        {/* Rank */}
        <div className="w-6 sm:w-8 text-center flex-shrink-0">
          <span className="text-base sm:text-lg font-bold text-white/60">{rank}</span>
        </div>

        {/* Avatar */}
        <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
          <AvatarImage
            src={getTwitterProfileImageUrl(account.handle, 'bigger')}
            alt={account.handle}
          />
          <AvatarFallback className="bg-white/10 text-white text-xs sm:text-sm">
            {getTwitterHandleInitials(account.handle)}
          </AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold truncate text-sm sm:text-base">@{account.handle}</p>
          <p className="text-white/50 text-xs sm:text-sm">{account.totalMentions} posts</p>
        </div>

        {/* Score */}
        <div className="text-right flex-shrink-0">
          <div className={`text-lg sm:text-xl font-bold ${isBulls ? 'text-emerald-400' : 'text-red-400'}`}>
            {account.sentimentScore.toFixed(0)}
          </div>
          <div className="text-white/40 text-xs">/100</div>
        </div>

        {/* Share indicator - hidden on mobile */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
          <svg className="w-5 h-5 text-white/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function SignupPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F0EEE6] rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black/40 hover:text-black/60"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-black mb-2">
            Unlock Full History
          </h3>

          <p className="text-black/60 mb-6">
            Access 7-day and 30-day sentiment data with a Perception account
          </p>

          <div className="space-y-3 mb-6 text-left">
            <div className="flex items-center text-sm text-black/70">
              <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
              Extended historical analysis
            </div>
            <div className="flex items-center text-sm text-black/70">
              <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
              API access for developers
            </div>
            <div className="flex items-center text-sm text-black/70">
              <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
              650+ media sources
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-base font-semibold"
              onClick={() => window.open('/book-a-call', '_blank')}
            >
              Book a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <button
              className="w-full text-black/60 hover:text-black py-2 text-sm"
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
  const [filter, setFilter] = useState<'bulls' | 'bears'>('bulls');
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [positiveAccounts, setPositiveAccounts] = useState<TwitterAccount[]>([]);
  const [negativeAccounts, setNegativeAccounts] = useState<TwitterAccount[]>([]);
  const podiumRef = useRef<HTMLDivElement>(null);

  const [avatarDataUrls, setAvatarDataUrls] = useState<Record<string, string>>({});

  // Pre-load avatar images as data URLs for download
  useEffect(() => {
    const loadAvatars = async () => {
      const accounts = filter === 'bulls' ? positiveAccounts : negativeAccounts;
      const top3Accounts = accounts.slice(0, 3);

      const newDataUrls: Record<string, string> = {};

      for (const account of top3Accounts) {
        try {
          const imageUrl = getTwitterProfileImageUrl(account.handle, 'bigger');
          // Use a CORS proxy to fetch the image
          const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`;
          const response = await fetch(proxyUrl);
          const blob = await response.blob();
          const dataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          newDataUrls[account.handle] = dataUrl;
        } catch (err) {
          console.log(`Failed to load avatar for ${account.handle}`);
        }
      }

      setAvatarDataUrls(newDataUrls);
    };

    if (positiveAccounts.length > 0 || negativeAccounts.length > 0) {
      loadAvatars();
    }
  }, [filter, positiveAccounts, negativeAccounts]);

  const downloadPodiumImage = async () => {
    if (!podiumRef.current) return;

    try {
      const canvas = await html2canvas(podiumRef.current, {
        backgroundColor: '#000000',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement('a');
      link.download = `bitcoin-${filter}-leaderboard-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate image:', err);
    }
  };

  useEffect(() => {
    async function fetchSentimentData() {
      try {
        setLoading(true);
        setLoadingProgress('Loading leaderboard...');

        const endDate = new Date().toISOString().slice(0, 10);
        const startDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        const initialBatchSize = 20;
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
              .then(response => response.json())
              .then(data => ({ page, data }))
          );
        }

        const results = await Promise.all(fetchPromises);
        let allData: any[] = [];

        results
          .sort((a, b) => a.page - b.page)
          .forEach(result => {
            if (result.data.data && result.data.data.length > 0) {
              allData = [...allData, ...result.data.data];
            }
          });

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

        allData.forEach(item => {
          if (item.Outlet === 'X' || item.Outlet === 'Twitter') {
            let handle = '';
            let name = '';

            if (item.URL && (item.URL.includes('twitter.com/') || item.URL.includes('x.com/'))) {
              const urlParts = item.URL.split('/');
              const handleIndex = urlParts.findIndex((part: string) => part === 'twitter.com' || part === 'x.com') + 1;
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

        const allAccountsRaw: TwitterAccount[] = Array.from(twitterData.entries())
          .filter(([_, data]) => data.totalMentions >= 1)
          .map(([key, data]) => {
            const positivePercentage = (data.positiveMentions / data.totalMentions) * 100;
            const neutralPercentage = (data.neutralMentions / data.totalMentions) * 100;
            const negativePercentage = (data.negativeMentions / data.totalMentions) * 100;
            const unifiedSentimentScore = Number(((positivePercentage - negativePercentage + 100) / 2).toFixed(2));

            return {
              name: data.realName || data.realHandle,
              handle: data.realHandle,
              sentimentScore: unifiedSentimentScore,
              totalMentions: data.totalMentions,
              positivePercentage,
              neutralPercentage,
              negativePercentage,
              lastUpdate: data.lastUpdate,
              tweets: data.tweets.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
              weightedScore: 0,
              profileImageUrl: getTwitterProfileImageUrl(data.realHandle, 'bigger')
            };
          });

        const sortedByPositive = [...allAccountsRaw]
          .filter(account => account.sentimentScore > 50)
          .sort((a, b) => {
            const aVolumeTier = Math.floor(a.totalMentions / 10);
            const bVolumeTier = Math.floor(b.totalMentions / 10);
            if (aVolumeTier !== bVolumeTier) return bVolumeTier - aVolumeTier;
            return b.sentimentScore - a.sentimentScore;
          });

        const sortedByNegative = [...allAccountsRaw]
          .filter(account => account.sentimentScore < 50)
          .sort((a, b) => {
            const aVolumeTier = Math.floor(a.totalMentions / 10);
            const bVolumeTier = Math.floor(b.totalMentions / 10);
            if (aVolumeTier !== bVolumeTier) return bVolumeTier - aVolumeTier;
            return a.sentimentScore - b.sentimentScore;
          });

        setPositiveAccounts(sortedByPositive);
        setNegativeAccounts(sortedByNegative);
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
  }, []);

  const accounts = filter === 'bulls' ? positiveAccounts : negativeAccounts;
  const top3 = accounts.slice(0, 3);
  const rest = accounts.slice(3, 20);

  return (
    <>
      <Helmet>
        <title>Bitcoin Bulls vs Bears - Who's Bullish? Who's Bearish? | Perception</title>
        <meta name="description" content="Real-time leaderboard of who's most bullish and bearish on Bitcoin. See which influencers are pumping or dumping sentiment right now." />
        <meta property="og:title" content="Bitcoin Bulls vs Bears Leaderboard" />
        <meta property="og:description" content="Who's the most bullish on Bitcoin right now? Who's the most bearish? Find out in real-time." />
        <meta property="og:image" content="https://perception-og-image.fernandonikolic.workers.dev" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://perception-og-image.fernandonikolic.workers.dev" />
        <meta name="twitter:title" content="Bitcoin Bulls vs Bears Leaderboard" />
        <meta name="twitter:description" content="Who's the most bullish on Bitcoin right now? Who's the most bearish? Find out in real-time." />
      </Helmet>

      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 sm:px-16 lg:px-32 bg-[#F0EEE6]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
              Live • Last 24 Hours
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6">
              Who's{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>bullish</em>?{' '}
              Who's{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>bearish</em>?
            </h1>

            <p className="text-lg sm:text-xl text-black/70 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              Real-time sentiment ranking of Bitcoin's most influential voices.
            </p>

            {/* Filter Toggle */}
            <div className="inline-flex items-center bg-black rounded-full p-1.5">
              <button
                onClick={() => setFilter('bulls')}
                className={`
                  px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300
                  ${filter === 'bulls'
                    ? 'bg-emerald-500 text-white'
                    : 'text-white/60 hover:text-white'}
                `}
              >
                BULLS
              </button>
              <button
                onClick={() => setFilter('bears')}
                className={`
                  px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300
                  ${filter === 'bears'
                    ? 'bg-red-500 text-white'
                    : 'text-white/60 hover:text-white'}
                `}
              >
                BEARS
              </button>
            </div>

            {/* How it works - hover tooltip */}
            <div className="relative group mt-3">
              <button className="text-sm text-black/40 hover:text-black/60 underline decoration-dotted underline-offset-4 transition-colors">
                How are rankings calculated?
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 sm:w-80 bg-black text-white text-sm rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl">
                <p className="text-white/90">
                  We rank by <span className="font-semibold">influence first</span> (post volume), then by sentiment score. This surfaces the most active voices, not just extreme opinions from low-activity accounts.
                </p>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-black"></div>
              </div>
            </div>

            {/* Time period buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
              <span className="px-4 py-2 rounded-full text-sm font-bold bg-black text-white">
                24 Hours
              </span>
              <button
                onClick={() => setShowSignupPopup(true)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-black/5 text-black/50 hover:bg-black/10"
              >
                7 Days (Pro)
              </button>
              <button
                onClick={() => setShowSignupPopup(true)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-black/5 text-black/50 hover:bg-black/10"
              >
                30 Days (Pro)
              </button>
            </div>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section className="py-16 px-6 sm:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                <p className="text-white/60">{loadingProgress}</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-white/60 mb-4">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-white text-black hover:bg-white/90 rounded-2xl"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Top 3 Podium */}
                  {top3.length >= 3 && (
                    <div className="mb-8 sm:mb-12">
                      {/* Header with download button */}
                      <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <h2 className="text-white/40 text-xs sm:text-sm uppercase tracking-wider">
                          Top 3 Most {filter === 'bulls' ? 'Bullish' : 'Bearish'}
                        </h2>
                        <button
                          onClick={downloadPodiumImage}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-sm font-medium transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>

                      {/* Visible interactive podium */}
                      <div className="flex items-end gap-2 sm:gap-4 justify-center px-2">
                        {top3.map((account, index) => (
                          <PodiumCard
                            key={account.handle}
                            account={account}
                            rank={index + 1}
                            filter={filter}
                          />
                        ))}
                      </div>

                      {/* Hidden downloadable version (positioned off-screen) */}
                      <div
                        ref={podiumRef}
                        className="absolute -left-[9999px] bg-black rounded-2xl p-8"
                        style={{ width: '800px' }}
                      >
                        {/* Card header */}
                        <div className="text-center mb-8">
                          <div className="text-sm text-white/40 uppercase tracking-wider mb-2">
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <h2 className="text-3xl font-bold text-white">
                            Top 3 Most {filter === 'bulls' ? 'Bullish' : 'Bearish'} on Bitcoin
                          </h2>
                        </div>

                        {/* Podium for download */}
                        <div className="flex items-end gap-4 justify-center px-4">
                          {top3.map((account, index) => (
                            <PodiumCard
                              key={`dl-${account.handle}`}
                              account={account}
                              rank={index + 1}
                              filter={filter}
                              forDownload={true}
                              avatarDataUrl={avatarDataUrls[account.handle]}
                            />
                          ))}
                        </div>

                        {/* Card footer - branding */}
                        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                          <div className="text-white/40 text-sm">
                            perception.to/bitcoin-social-media-sentiment-leaderboard
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-white/60 text-sm font-medium">Perception</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rest of Leaderboard */}
                  {rest.length > 0 && (
                    <div className="space-y-2">
                      <h2 className="text-white/40 text-sm uppercase tracking-wider mb-4">
                        Rankings 4-{rest.length + 3}
                      </h2>
                      {rest.map((account, index) => (
                        <LeaderboardRow
                          key={account.handle}
                          account={account}
                          rank={index + 4}
                          filter={filter}
                        />
                      ))}
                    </div>
                  )}

                  {/* Results count */}
                  <div className="mt-12 text-center">
                    <p className="text-white/40 text-sm">
                      Showing top {Math.min(20, accounts.length)} of {accounts.length} {filter === 'bulls' ? 'bullish' : 'bearish'} accounts
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 sm:px-16 lg:px-32 bg-[#F0EEE6]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-medium text-black mb-4">
              Want{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>deeper</em>{' '}
              insights?
            </h2>
            <p className="text-black/60 mb-8">
              450+ sources. Real-time updates. Full sentiment analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-base font-semibold"
                asChild
              >
                <a href="/book-a-call">
                  Book a Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/80 text-black hover:bg-white rounded-2xl px-8 py-6 text-base font-semibold border-2 border-black/20"
                asChild
              >
                <Link to="/bitcoin-fear-greed-index">
                  See Fear & Greed Index
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <SignupPopup isOpen={showSignupPopup} onClose={() => setShowSignupPopup(false)} />
      </div>
    </>
  );
}
