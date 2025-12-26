import { useState, useEffect } from 'react';

interface TwitterAccount {
  name: string;
  handle: string;
  sentimentScore: number;
  totalMentions: number;
}

const API_BASE = 'https://btcpapifunction-45998414364.us-central1.run.app/btcpapifunction';
const USER_ID = 'perception';

// Simplified podium card for OG image
function OGPodiumCard({ account, rank, isBulls }: {
  account: TwitterAccount;
  rank: number;
  isBulls: boolean;
}) {
  const sizes = {
    1: { height: 'h-48', avatar: 'w-16 h-16', rank: 'text-5xl', name: 'text-base' },
    2: { height: 'h-40', avatar: 'w-14 h-14', rank: 'text-4xl', name: 'text-sm' },
    3: { height: 'h-32', avatar: 'w-12 h-12', rank: 'text-3xl', name: 'text-sm' },
  };
  const size = sizes[rank as keyof typeof sizes];
  const order = rank === 1 ? 'order-2' : rank === 2 ? 'order-1' : 'order-3';

  return (
    <div className={`flex-1 ${order}`}>
      <div
        className={`
          relative rounded-xl p-4 flex flex-col items-center justify-end
          ${size.height}
          ${isBulls ? 'bg-emerald-500' : 'bg-red-500'}
        `}
      >
        {/* Rank Badge */}
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${size.rank} font-bold text-white/20`}>
          {rank}
        </div>

        {/* Avatar placeholder */}
        <div className={`${size.avatar} rounded-full bg-white/20 flex items-center justify-center mb-2`}>
          <span className="text-white font-bold text-sm">
            {account.handle.slice(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Handle */}
        <p className={`${size.name} font-bold text-white truncate max-w-full px-1`}>
          @{account.handle}
        </p>

        {/* Score */}
        <div className="mt-1 text-sm">
          <span className="text-white font-semibold">{account.sentimentScore.toFixed(0)}/100</span>
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardOGImage() {
  const [bulls, setBulls] = useState<TwitterAccount[]>([]);
  const [bears, setBears] = useState<TwitterAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const endDate = new Date().toISOString().slice(0, 10);
        const startDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        const fetchPromises = [];
        for (let page = 1; page <= 10; page++) {
          const params = new URLSearchParams({
            userId: USER_ID,
            startDate,
            endDate,
            page: page.toString(),
            pageSize: '100'
          });
          fetchPromises.push(
            fetch(`${API_BASE}/feed?${params}`).then(r => r.json())
          );
        }

        const results = await Promise.all(fetchPromises);
        let allData: any[] = [];
        results.forEach(result => {
          if (result.data?.length > 0) {
            allData = [...allData, ...result.data];
          }
        });

        // Process Twitter data
        const twitterData = new Map<string, {
          totalMentions: number;
          positiveMentions: number;
          negativeMentions: number;
          realHandle: string;
        }>();

        allData.forEach(item => {
          if (item.Outlet === 'X' || item.Outlet === 'Twitter') {
            let handle = '';
            if (item.URL && (item.URL.includes('twitter.com/') || item.URL.includes('x.com/'))) {
              const urlParts = item.URL.split('/');
              const handleIndex = urlParts.findIndex((part: string) => part === 'twitter.com' || part === 'x.com') + 1;
              if (urlParts[handleIndex] && !urlParts[handleIndex].includes('status')) {
                handle = urlParts[handleIndex].split('?')[0];
              }
            }
            if (!handle) return;

            const key = handle.toLowerCase();
            const existing = twitterData.get(key) || {
              totalMentions: 0,
              positiveMentions: 0,
              negativeMentions: 0,
              realHandle: handle,
            };

            existing.totalMentions += 1;
            if (item.Sentiment === 'Positive') existing.positiveMentions += 1;
            else if (item.Sentiment === 'Negative') existing.negativeMentions += 1;

            twitterData.set(key, existing);
          }
        });

        // Calculate scores and sort
        const allAccounts = Array.from(twitterData.values())
          .filter(a => a.totalMentions >= 3)
          .map(a => {
            const positiveRatio = a.positiveMentions / a.totalMentions;
            const negativeRatio = a.negativeMentions / a.totalMentions;
            return {
              name: a.realHandle,
              handle: a.realHandle,
              sentimentScore: positiveRatio * 100,
              negativeSentimentScore: negativeRatio * 100,
              totalMentions: a.totalMentions,
              weightedScore: Math.floor(a.totalMentions / 10) * 1000 + positiveRatio * 100,
              negativeWeightedScore: Math.floor(a.totalMentions / 10) * 1000 + negativeRatio * 100,
            };
          });

        const positive = [...allAccounts]
          .sort((a, b) => b.weightedScore - a.weightedScore)
          .slice(0, 3);

        const negative = [...allAccounts]
          .sort((a, b) => b.negativeWeightedScore - a.negativeWeightedScore)
          .slice(0, 3)
          .map(a => ({ ...a, sentimentScore: a.negativeSentimentScore }));

        setBulls(positive);
        setBears(negative);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-[1200px] h-[630px] bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-[1200px] h-[630px] bg-black p-8 flex">
      {/* Bulls side */}
      <div className="flex-1 pr-4">
        <div className="text-center mb-4">
          <div className="text-emerald-400 text-sm font-bold uppercase tracking-wider mb-1">Most Bullish</div>
          <div className="text-white/40 text-xs">on Bitcoin Today</div>
        </div>
        <div className="flex items-end gap-3 justify-center">
          {bulls.map((account, i) => (
            <OGPodiumCard key={account.handle} account={account} rank={i + 1} isBulls={true} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-white/10 mx-4"></div>

      {/* Bears side */}
      <div className="flex-1 pl-4">
        <div className="text-center mb-4">
          <div className="text-red-400 text-sm font-bold uppercase tracking-wider mb-1">Most Bearish</div>
          <div className="text-white/40 text-xs">on Bitcoin Today</div>
        </div>
        <div className="flex items-end gap-3 justify-center">
          {bears.map((account, i) => (
            <OGPodiumCard key={account.handle} account={account} rank={i + 1} isBulls={false} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between">
        <div className="text-white/40 text-sm">
          perception.to/bitcoin-social-media-sentiment-leaderboard
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/60 text-sm font-medium">Perception</span>
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
