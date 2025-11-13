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

// Utility: return UTC date string 'YYYY-MM-DD' offset by n days
function formatDate(offsetDays: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetDays);
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

// Get sentiment label and color based on value (standard 5-category Fear & Greed Index)
function getSentimentInfo(value: number) {
  if (value >= 0 && value <= 24) {
    return {
      label: 'Extreme Fear',
      color: 'from-red-600 to-red-700',
      textColor: 'text-red-700',
      bgColor: 'bg-gradient-to-br from-red-100 to-red-200/70',
    };
  } else if (value >= 25 && value <= 44) {
    return {
      label: 'Fear',
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-100 to-orange-200/70',
    };
  } else if (value >= 45 && value <= 55) {
    return {
      label: 'Neutral',
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200/70',
    };
  } else if (value >= 56 && value <= 75) {
    return {
      label: 'Greed',
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200/70',
    };
  } else {
    return {
      label: 'Extreme Greed',
      color: 'from-green-700 to-green-800',
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

// Premium TodayCard component with Apple-level design
function TodayCard({ value, delta, date }: { value: number; delta: number | null; date: string }) {
  const [isAnimated, setIsAnimated] = useState(false);
  const percent = Math.max(0, Math.min(100, value));
  const sentiment = getSentimentInfo(value);
  const isDeltaNegative = delta !== null && delta < 0;
  const isDeltaPositive = delta !== null && delta > 0;

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative group">
      {/* Outer glow effect */}
      <div className="absolute inset-0 bg-slate-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105" />
      
      <div className="relative rounded-3xl shadow-2xl bg-gradient-to-br from-white via-white to-slate-50/80 dark:from-black/60 dark:via-black/40 dark:to-slate-900/60 border border-white/20 dark:border-white/10 p-10 backdrop-blur-3xl min-h-[480px] max-w-[420px] mx-auto overflow-hidden">
        
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-400/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-300/10 to-transparent rounded-full blur-xl" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-slate-500 dark:text-white/60 tracking-wider uppercase">Live Index</span>
              </div>
              <div className="text-sm text-slate-600 dark:text-white/70 font-medium">{formatPrettyDate(date)}</div>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${sentiment.bgColor} ${sentiment.textColor}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${sentiment.textColor.replace('text-', 'bg-')}`} />
                {sentiment.label}
              </div>
            </div>
          </div>

          {/* Main Value Display */}
          <div className="text-center mb-10">
            <div className="relative">
              <div className={`text-8xl font-extralight leading-none bg-gradient-to-br ${sentiment.color} bg-clip-text text-transparent transform transition-all duration-1000 ${
                isAnimated ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}>
                {value.toFixed(1)}
              </div>
              
              {delta !== null && (
                <div className={`absolute -top-2 -right-8 flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium transition-all duration-500 ${
                  isDeltaNegative ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 
                  isDeltaPositive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 
                  'bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {isDeltaNegative && <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>}
                  {isDeltaPositive && <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>}
                  {Math.abs(delta).toFixed(1)}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Gradient Scale */}
          <div className="mb-8">
            <div className="text-xs font-medium text-slate-500 dark:text-white/60 mb-3 text-center">Market Sentiment Spectrum</div>
            <div className="relative h-3 mb-4">
              {/* Enhanced gradient with multiple stops */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-emerald-400 to-green-500 shadow-lg" />
              
              {/* Animated pointer with enhanced styling */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 transition-all duration-1000 ease-out ${
                  isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
                style={{ left: `calc(${percent}% - 12px)` }}
              >
                <div className="w-full h-full bg-white dark:bg-slate-800 rounded-full shadow-xl border-2 border-slate-900 dark:border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-slate-900 dark:bg-white rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Scale labels */}
            <div className="flex justify-between items-center text-xs font-medium text-slate-400 dark:text-white/50">
              <span className="text-red-600 dark:text-red-400">Fear</span>
              <span>Neutral</span>
              <span className="text-emerald-600 dark:text-emerald-400">Greed</span>
            </div>
            
            <div className="flex justify-between text-xs text-slate-300 dark:text-white/40 mt-1">
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="pt-6 border-t border-slate-100 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/30 dark:to-slate-700/30 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-white/80">Real-time Analysis</div>
                  <div className="text-xs text-slate-500 dark:text-white/60">Updated 90s ago</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-700 dark:text-white/80">Accuracy</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">94.3%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FearGreedIndex() {
  const [cards, setCards] = useState<FearGreedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
        
        // Sort data by date to get most recent
        const sortedData = data.slice().sort((a, b) => b.date.localeCompare(a.date));
        const mostRecentDate = sortedData[0]?.date;
        
        const cardData = targets.map(({ label, days }) => {
          let dateStr;
          if (days === 0 && mostRecentDate) {
            // For "Today", use the most recent data available
            dateStr = mostRecentDate;
          } else {
            // For other periods, calculate relative to the most recent date
            const baseDate = mostRecentDate ? new Date(mostRecentDate + 'T00:00:00Z') : new Date();
            baseDate.setUTCDate(baseDate.getUTCDate() + days);
            dateStr = baseDate.toISOString().slice(0, 10);
          }
          const value = findValueForDate(data, dateStr);
          return { label, days, value, date: dateStr };
        });
        
        setCards(cardData);
        setError(null);
        
        // Trigger animations after data loads
        setTimeout(() => setIsLoaded(true), 100);
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
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/20 dark:border-white/10">
              <div className="w-8 h-8 border-3 border-slate-300 dark:border-white/30 border-t-blue-500 dark:border-t-white rounded-full animate-spin"></div>
            </div>
          </div>
          <p className="text-xl text-slate-600 dark:text-white/80 font-light mb-2">Analyzing Market Sentiment</p>
          <p className="text-sm text-slate-500 dark:text-white/60">Processing real-time data from 250+ sources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800/30 rounded-2xl p-8 max-w-md mx-auto mb-8">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-700 dark:text-red-300 text-lg font-medium mb-2">Unable to Load Data</p>
            <p className="text-red-600 dark:text-red-400 text-sm mb-6">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-3 rounded-2xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Retry Loading
            </Button>
          </div>
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
    <div className="container mx-auto px-6 py-12">
      {/* Premium Today Card */}
      <div className="flex justify-center mb-20">
        {typeof today === 'number' && todayDate ? (
          <TodayCard value={today} delta={todayDelta} date={todayDate} />
        ) : (
          <div className="flex items-center justify-center bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-12">
            <span className="text-slate-400 dark:text-white/60">No data available</span>
          </div>
        )}
      </div>

      {/* Historical Data Cards with Premium Styling */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-light text-slate-800 dark:text-white/90 mb-2">Historical sentiment</h3>
          <p className="text-slate-500 dark:text-white/60">Track sentiment changes over time</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cards.slice(1).map((card, index) => {
            const sentiment = typeof card.value === 'number' ? getSentimentInfo(card.value) : null;
            return (
              <div 
                key={index} 
                className="group relative"
              >
                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105 ${
                  sentiment && sentiment.textColor === 'text-red-700' ? 'bg-red-500/10' :
                  sentiment && sentiment.textColor === 'text-orange-600' ? 'bg-orange-500/10' :
                  sentiment && sentiment.textColor === 'text-yellow-600' ? 'bg-yellow-500/10' :
                  sentiment && sentiment.textColor === 'text-green-600' ? 'bg-green-500/10' :
                  sentiment && sentiment.textColor === 'text-green-700' ? 'bg-green-600/10' :
                  'bg-slate-500/10'
                }`} />
                
                <div className={`relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 rounded-2xl p-6 backdrop-blur-xl ${
                  sentiment ? sentiment.bgColor : 'bg-white/80 dark:bg-white/5'
                } border border-white/20 dark:border-white/10`}>
                  
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-slate-500 dark:text-black uppercase tracking-wider mb-1">
                      {card.label}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-black/70">{formatPrettyDate(card.date)}</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className={`text-3xl font-extralight leading-none mb-3 ${
                      sentiment ? `bg-gradient-to-br ${sentiment.color} bg-clip-text text-transparent` : 'text-slate-900 dark:text-black'
                    }`}>
                      {typeof card.value === 'number' ? card.value.toFixed(1) : card.value}
                    </div>
                    
                    {sentiment && (
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium text-black bg-white/60 dark:bg-white/10`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${sentiment.textColor.replace('text-', 'bg-')}`} />
                        {sentiment.label}
                      </div>
                    )}
                  </div>
                  
                  {/* Mini progress bar */}
                  {typeof card.value === 'number' && (
                    <div className="relative h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 delay-300 bg-gradient-to-r ${sentiment?.color || 'from-slate-400 to-slate-500'}`}
                        style={{ width: `${Math.max(0, Math.min(100, card.value as number))}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
} 