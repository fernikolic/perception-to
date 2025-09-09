import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FearGreedData {
  date: string;
  fear_greed_index: number;
  positive_count: number;
  neutral_count: number;
  negative_count: number;
  total_count: number;
}

interface FearGreedCard {
  label: string;
  days: number;
  value: number | string;
  date: string;
}

const API_BASE = 'https://btcpapifunction-45998414364.us-central1.run.app';
const ENDPOINT = '/btcpapifunction/fear-greed-index';

// Utility: return date string 'YYYY-MM-DD' offset by n days
function formatDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

// Helper to format date as 'Month Day, Year' with ordinal suffix
function formatPrettyDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  // Ordinal suffix
  const j = day % 10, k = day % 100;
  let suffix = 'th';
  if (j === 1 && k !== 11) suffix = 'st';
  else if (j === 2 && k !== 12) suffix = 'nd';
  else if (j === 3 && k !== 13) suffix = 'rd';
  return `${month} ${day}${suffix}, ${year}`;
}

// Get sentiment label and color based on value
function getSentimentInfo(value: number) {
  if (value >= 0 && value <= 14) {
    return {
      label: 'Extreme Fear',
      color: 'from-red-600 to-red-700',
      textColor: 'text-red-700',
      bgColor: 'bg-gradient-to-br from-red-100 to-red-200/70',
    };
  } else if (value >= 15 && value <= 29) {
    return {
      label: 'Moderately Fear',
      color: 'from-orange-400 to-orange-500',
      textColor: 'text-orange-500',
      bgColor: 'bg-gradient-to-br from-orange-100 to-orange-200/70',
    };
  } else if (value >= 30 && value <= 49) {
    return {
      label: 'Fear',
      color: 'from-yellow-400 to-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200/70',
    };
  } else if (value >= 50 && value <= 69) {
    return {
      label: 'Greed',
      color: 'from-blue-400 to-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200/70',
    };
  } else if (value >= 70 && value <= 84) {
    return {
      label: 'Moderately Greed',
      color: 'from-green-400 to-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200/70',
    };
  } else {
    return {
      label: 'Extreme Greed',
      color: 'from-green-600 to-green-700',
      textColor: 'text-green-700',
      bgColor: 'bg-gradient-to-br from-green-200 to-green-300/70',
    };
  }
}

function findValueForDate(data: FearGreedData[], targetDate: string): number | string {
  // find exact match, or fallback to closest earlier
  const sorted = data.slice().sort((a, b) => a.date > b.date ? 1 : -1);
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].date <= targetDate) return sorted[i].fear_greed_index;
  }
  return '—';
}

// Helper to get delta (change) between today and yesterday
function getDelta(today: number | string, yesterday: number | string): number | null {
  if (typeof today === 'number' && typeof yesterday === 'number') {
    return +(today - yesterday).toFixed(2);
  }
  return null;
}

// Visually stunning TodayCard component
function TodayCard({ value, delta, date }: { value: number; delta: number | null; date: string }) {
  // For the scale pointer
  const percent = Math.max(0, Math.min(100, value));
  const pointerLeft = `calc(${percent}% - 16px)`; // 16px is half the pointer width
  const isDeltaNegative = delta !== null && delta < 0;
  const isDeltaPositive = delta !== null && delta > 0;

  return (
    <div className="rounded-2xl shadow-xl bg-white dark:bg-black/40 border border-slate-100 dark:border-white/10 p-8 flex flex-col justify-between min-h-[340px] max-w-[340px] mx-auto relative backdrop-blur-2xl">
      <div>
        <div className="text-slate-500 dark:text-white/60 text-sm font-semibold tracking-wide mb-2">PERCEPTION INDEX</div>
        <div className="flex items-end gap-3 mb-2">
          <span className="text-6xl font-semibold text-slate-900 dark:text-white leading-none">{value.toFixed(1)}</span>
          {delta !== null && (
            <span className={`flex items-center text-lg font-medium ${isDeltaNegative ? 'text-red-500' : isDeltaPositive ? 'text-green-500' : 'text-slate-400'}`}>
              {isDeltaNegative && <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>}
              {isDeltaPositive && <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>}
              {Math.abs(delta).toFixed(2)}
            </span>
          )}
        </div>
        <div className="text-slate-400 dark:text-white/50 text-xs font-medium mb-4">Index Scale</div>
        <div className="relative h-6 mb-2">
          {/* Gradient scale */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500" />
          {/* Pointer */}
          <div
            className="absolute top-0 w-8 h-8 flex flex-col items-center"
            style={{ left: pointerLeft }}
          >
            <div className="w-3 h-3 bg-slate-900 rounded-full border-2 border-white shadow-lg" />
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-slate-900 mt-1" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-slate-400 dark:text-white/60 font-medium mb-2">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10 mt-4">
        <span className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-white/80">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" /> LIVE DATA
        </span>
        <span className="text-xs text-slate-400 dark:text-white/60 font-medium">{formatPrettyDate(date)}</span>
      </div>
    </div>
  );
}

export function FearGreedIndex() {
  const [cards, setCards] = useState<FearGreedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const targets = [
    { label: 'Today', days: 0 },
    { label: 'Yesterday', days: -1 },
    { label: '7 Days Ago', days: -7 },
    { label: '1 Month Ago', days: -30 },
    { label: '3 Months Ago', days: -90 },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Calculate date range for the last 3 months
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 90); // 3 months ago
        
        const params = new URLSearchParams({
          startDate: startDate.toISOString().slice(0, 10),
          endDate: endDate.toISOString().slice(0, 10)
        });
        
        const response = await fetch(`${API_BASE}${ENDPOINT}?${params}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: FearGreedData[] = await response.json();
        
        const cardData = targets.map(({ label, days }) => {
          const dateStr = formatDate(days);
          const value = findValueForDate(data, dateStr);
          return { label, days, value, date: dateStr };
        });
        
        setCards(cardData);
        setError(null);
      } catch (err) {
        console.error('Error fetching Fear & Greed data:', err);
        setError('Failed to load Fear & Greed Index data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-slate-200 dark:border-white/20 border-t-blue-500 dark:border-t-white rounded-full animate-spin mb-6"></div>
          <p className="text-lg text-slate-600 dark:text-white/80 font-light">Loading Fear & Greed Index...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-6">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-medium shadow-xl"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Find today and yesterday values for delta
  const today = cards[0]?.value;
  const yesterday = cards[1]?.value;
  const todayDelta = getDelta(today, yesterday);
  const todayDate = cards[0]?.date;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Today card - visually stunning */}
      <div className="flex justify-center mb-12">
        {typeof today === 'number' && todayDate ? (
          <TodayCard value={today} delta={todayDelta} date={todayDate} />
        ) : (
          <Card className="h-full flex items-center justify-center bg-white/80 dark:bg-white/5 dark:border-white/10">
            <CardContent>
              <span className="text-slate-400 dark:text-white/60">No data</span>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Other cards below Today card */}
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        {cards.slice(1).map((card, index) => {
          const sentiment = typeof card.value === 'number' ? getSentimentInfo(card.value) : null;
          return (
            <Card 
              key={index} 
              className={`w-64 border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${sentiment?.bgColor || 'bg-white/80'} dark:bg-white/5 backdrop-blur-sm`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-medium text-slate-600 uppercase tracking-wider">
                  {card.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-4xl font-light text-slate-900 mb-4">
                  {typeof card.value === 'number' ? card.value : card.value}
                </div>
                {sentiment && (
                  <Badge 
                    className={`${sentiment.textColor} border-current mb-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm font-medium px-3 py-1 rounded-full`}
                  >
                    {sentiment.label}
                  </Badge>
                )}
                <p className="text-xs text-slate-500 dark:text-white/60 font-light">{formatPrettyDate(card.date)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 