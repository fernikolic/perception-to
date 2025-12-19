import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, BarChart3, Clock, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SEO from '@/components/SEO';
import LayeredSineWaves from '@/components/LayeredSineWaves';

// Types for API response
interface DailySentimentData {
  date: string;
  positive_percentage: number;
  neutral_percentage: number;
  negative_percentage: number;
}

interface FearGreedData {
  date: string;
  fear_greed_index: number;
  positive_count: number;
  neutral_count: number;
  negative_count: number;
  total_count: number;
}

interface MonthlySentimentData {
  month: string;
  year: string;
  slug: string;
  isCurrent: boolean;
  averageSentiment: number;
  fearDays: number;
  greedDays: number;
  neutralDays: number;
  monthlySummary: {
    totalPositive: number;
    totalNeutral: number;
    totalNegative: number;
  };
  dailyData: DailySentimentData[];
  loading?: boolean;
  error?: string;
}

// Utility function to generate monthly links
const generateMonthlyLinks = () => {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  
  const currentYear = new Date().getFullYear();
  const links: Array<{ month: string; year: string; slug: string; isCurrent: boolean }> = [];
  
  // Generate links for current year and previous 2 years
  for (let year = currentYear - 2; year <= currentYear; year++) {
    months.forEach(month => {
      // Skip future months in current year
      if (year === currentYear) {
        const currentMonth = new Date().getMonth();
        const monthIndex = months.indexOf(month);
        if (monthIndex > currentMonth) return;
      }
      
      // Skip future years
      if (year > currentYear) return;
      
      links.push({
        month: month.charAt(0).toUpperCase() + month.slice(1),
        year: year.toString(),
        slug: `${month}-${year}`,
        isCurrent: year === currentYear && month === months[new Date().getMonth()]
      });
    });
  }
  
  return links.reverse(); // Most recent first
};

// Utility function to get start and end dates for a month
const getMonthDateRange = (month: string, year: string) => {
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const startDate = new Date(parseInt(year), monthIndex, 1);
  const endDate = new Date(parseInt(year), monthIndex + 1, 0); // Last day of month
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};

// Fetch sentiment data for a specific month
const fetchMonthlySentimentData = async (month: string, year: string): Promise<MonthlySentimentData> => {
  const { startDate, endDate } = getMonthDateRange(month, year);
  
  try {
    // Use the correct API base URL and endpoint structure
    const API_BASE = 'https://btcpapifunction-45998414364.us-central1.run.app';
    const ENDPOINT = '/btcpapifunction/fear-greed-index';
    
    const params = new URLSearchParams({
      startDate: startDate,
      endDate: endDate
    });
    
    const response = await fetch(`${API_BASE}${ENDPOINT}?${params}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API returned non-JSON response. Endpoint may not be available.');
    }
    
    const dailyData: FearGreedData[] = await response.json();
    
    if (!dailyData || dailyData.length === 0) {
      throw new Error('No data available for this month');
    }
    
    // Transform fear-greed data to sentiment percentages
    const transformedData: DailySentimentData[] = dailyData.map(day => {
      const total = day.total_count;
      return {
        date: day.date,
        positive_percentage: total > 0 ? (day.positive_count / total) * 100 : 0,
        neutral_percentage: total > 0 ? (day.neutral_count / total) * 100 : 0,
        negative_percentage: total > 0 ? (day.negative_count / total) * 100 : 0
      };
    });
    
    // Calculate monthly averages and summaries
    const totalDays = transformedData.length;
    const totalPositive = transformedData.reduce((sum, day) => sum + day.positive_percentage, 0) / totalDays;
    const totalNeutral = transformedData.reduce((sum, day) => sum + day.neutral_percentage, 0) / totalDays;
    const totalNegative = transformedData.reduce((sum, day) => sum + day.negative_percentage, 0) / totalDays;
    
    // Calculate sentiment score (0-100 scale) - use average fear-greed index
    const averageFearGreedIndex = dailyData.reduce((sum, day) => sum + day.fear_greed_index, 0) / totalDays;
    const averageSentiment = Math.round(averageFearGreedIndex);
    
    // Count days by sentiment category
    const fearDays = dailyData.filter(day => day.fear_greed_index < 30).length;
    const greedDays = dailyData.filter(day => day.fear_greed_index > 70).length;
    const neutralDays = dailyData.filter(day => 
      day.fear_greed_index >= 30 && day.fear_greed_index <= 70
    ).length;
    
    return {
      month,
      year,
      slug: `${month.toLowerCase()}-${year}`,
      isCurrent: false,
      averageSentiment,
      fearDays,
      greedDays,
      neutralDays,
      dailyData: transformedData,
      monthlySummary: {
        totalPositive: Math.round(totalPositive),
        totalNeutral: Math.round(totalNeutral),
        totalNegative: Math.round(totalNegative)
      }
    };
  } catch (error) {
    console.error(`Failed to load data for ${month} ${year}:`, error);
    throw error;
  }
};

// Chart colors - Apple-inspired palette
const CHART_COLORS = {
  positive: '#34C759',
  neutral: '#8E8E93',
  negative: '#FF3B30',
  fear: '#FF453A',
  greed: '#FF9F0A',
  neutral_days: '#007AFF'
};

// Add this helper function near the top (after CHART_COLORS)
const getSentimentCategory = (value: number) => {
  if (value >= 90) return { label: 'Extreme Greed', color: 'bg-transparent border-green-700 text-green-700 dark:text-green-400 border' };
  if (value >= 76) return { label: 'Greed', color: 'bg-transparent border-green-500 text-green-600 dark:text-green-400 border' };
  if (value >= 61) return { label: 'Moderate Greed', color: 'bg-transparent border-green-400 text-green-600 dark:text-green-400 border' };
  if (value >= 46) return { label: 'Neutral', color: 'bg-transparent border-slate-400 text-slate-600 dark:text-slate-300 border' };
  if (value >= 31) return { label: 'Moderate Fear', color: 'bg-transparent border-yellow-400 text-yellow-600 dark:text-yellow-400 border' };
  if (value >= 16) return { label: 'Fear', color: 'bg-transparent border-yellow-500 text-yellow-600 dark:text-yellow-400 border' };
  return { label: 'Extreme Fear', color: 'bg-transparent border-red-600 text-red-600 dark:text-red-400 border' };
};

export default function BitcoinMarketSentimentIndexPage() {
  const [monthlyData, setMonthlyData] = useState<MonthlySentimentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<MonthlySentimentData | null>(null);

  useEffect(() => {
    const loadAllMonthlyData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const monthlyLinks = generateMonthlyLinks();
        const dataPromises = monthlyLinks.map(async (link) => {
          try {
            return await fetchMonthlySentimentData(link.month, link.year);
          } catch (err) {
            console.error(`Failed to load data for ${link.month} ${link.year}:`, err);
            // Skip months with no data instead of showing placeholder
            return null;
          }
        });
        
        const results = await Promise.all(dataPromises);
        const validResults = results.filter(result => result !== null) as MonthlySentimentData[];
        
        if (validResults.length === 0) {
          setError('The sentiment analysis API is currently unavailable. Please check back later or contact support if this issue persists.');
        } else {
          setMonthlyData(validResults);
          // Set the most recent month as selected by default
          setSelectedMonth(validResults[0]);
        }
      } catch (err) {
        setError('Unable to connect to the sentiment analysis service. Please check your internet connection and try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAllMonthlyData();
  }, []);

  // Prepare chart data for selected month
  const getChartData = (monthData: MonthlySentimentData) => {
    if (!monthData.dailyData || monthData.dailyData.length === 0) {
      return { areaChartData: [], pieChartData: [] };
    }

    const areaChartData = monthData.dailyData.map(day => ({
      date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      positive: day.positive_percentage,
      neutral: day.neutral_percentage,
      negative: day.negative_percentage
    }));

    const pieChartData = [
      { name: 'Positive', value: monthData.monthlySummary.totalPositive, color: CHART_COLORS.positive },
      { name: 'Neutral', value: monthData.monthlySummary.totalNeutral, color: CHART_COLORS.neutral },
      { name: 'Negative', value: monthData.monthlySummary.totalNegative, color: CHART_COLORS.negative }
    ];

    return { areaChartData, pieChartData };
  };

  // Get navigation months (previous and next)
  const getNavigationMonths = (currentMonth: MonthlySentimentData) => {
    const currentIndex = monthlyData.findIndex(m => m.slug === currentMonth.slug);
    const prevMonth = currentIndex < monthlyData.length - 1 ? monthlyData[currentIndex + 1] : null;
    const nextMonth = currentIndex > 0 ? monthlyData[currentIndex - 1] : null;
    return { prevMonth, nextMonth };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-300 dark:border-slate-700 border-t-slate-700 dark:border-t-slate-300 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-slate-600 dark:border-t-slate-400 rounded-full animate-spin mx-auto" style={{ animationDelay: '-0.5s' }}></div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-light tracking-wide">Loading sentiment data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900/50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-300 dark:border-slate-700">
            <Sparkles className="w-12 h-12 text-slate-700 dark:text-slate-300" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">API Service Unavailable</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">{error}</p>

          <div className="space-y-4 mb-8">
            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-xl p-6 border border-slate-300 dark:border-slate-700/30">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">What this means:</h3>
              <ul className="text-slate-600 dark:text-slate-400 space-y-2 text-left">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                  The sentiment analysis API endpoint is not currently accessible
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                  Historical data may be temporarily unavailable
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                  This is likely a temporary service issue
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.reload()}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-medium shadow-lg"
            >
              Try Again
            </Button>
            <Link to="/bitcoin-fear-greed-index">
              <Button variant="outline" className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900/50 px-8 py-3 rounded-full font-medium">
                View Live Fear & Greed Index
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { areaChartData, pieChartData } = selectedMonth ? getChartData(selectedMonth) : { areaChartData: [], pieChartData: [] };
  const { prevMonth, nextMonth } = selectedMonth ? getNavigationMonths(selectedMonth) : { prevMonth: null, nextMonth: null };

  return (
    <>
      <SEO
        title="Bitcoin Market Sentiment Analysis - Monthly Reports & Trends"
        description="Comprehensive Bitcoin market sentiment analysis with monthly reports, fear & greed index tracking, and market psychology insights. Stay ahead of market trends."
        keywords={[
          "Bitcoin market sentiment",
          "Bitcoin fear greed index",
          "crypto sentiment analysis",
          "Bitcoin price prediction",
          "market psychology",
          "trading signals",
          "monthly sentiment reports"
        ]}
        url="https://perception.to/bitcoin-market-sentiment"
        image="/images/bitcoin.png"
      />
      
      <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95 pt-16">
          {/* Base Gradient */}
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
            {/* Hero Card with Side-by-Side Layout */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* Layered Sine Waves - Left Side (50%) */}
                <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
                  <LayeredSineWaves />
                </div>

                {/* Content - Right Side (50%) */}
                <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 flex flex-col justify-center" style={{ background: '#F0EEE6' }}>
                  <div className="mx-auto max-w-2xl">
                    <div className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      <div className="group relative inline-flex items-center rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold leading-6"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <span className="relative flex items-center gap-2">
                          <span className="relative font-bold text-black">MONTHLY ANALYSIS</span>
                        </span>
                      </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-black mb-5 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      Bitcoin Market Sentiment
                    </h1>

                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                      <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 font-semibold mb-3">
                        Monthly sentiment trends and market{'\u00A0'}psychology.
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        Historical data from 650+ sources. Track how sentiment evolves{'\u00A0'}month-to-month.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                        asChild
                      >
                        <Link to="/bitcoin-fear-greed-index">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Live Fear & Greed Index
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-black hover:bg-white transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-2xl"
                        onClick={() => {
                          document.querySelector('section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Explore Data
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 lg:pb-32 space-y-12 sm:space-y-16 lg:space-y-24">

            {/* Monthly Selection */}
            <section>
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white px-2">
                  Historical Sentiment Data
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2">
                  Explore sentiment trends across all available months with interactive visualizations
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
                {monthlyData.map((monthData) => (
                  <button
                    key={monthData.slug}
                    onClick={() => setSelectedMonth(monthData)}
                    className={`group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                      selectedMonth?.slug === monthData.slug
                        ? 'border-slate-400 bg-slate-100 dark:bg-slate-800/40 shadow-lg'
                        : 'border-slate-300 dark:border-slate-700/30 bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md'
                    }`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span className="font-semibold text-slate-900 dark:text-white text-base sm:text-lg">
                          {monthData.month} {monthData.year}
                        </span>
                        {monthData.isCurrent && (
                          <span className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 sm:px-3 py-1 rounded-full border border-slate-400 dark:border-slate-600">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white group-hover:scale-105 transition-transform duration-300">
                          {monthData.averageSentiment}
                        </span>
                        {(() => { const cat = getSentimentCategory(monthData.averageSentiment); return (
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${cat.color}`}>{cat.label}</span>
                        ); })()}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        Fear & Greed Index
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Selected Month Details */}
            {selectedMonth && (
              <section>
                <div className="bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-slate-300 dark:border-slate-700/30 p-12 mb-16 shadow-lg">
                  {/* Month Header with Navigation */}
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-6">
                      {prevMonth && (
                        <button
                          onClick={() => setSelectedMonth(prevMonth)}
                          className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300 border border-slate-300 dark:border-slate-600"
                        >
                          <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-white" />
                        </button>
                      )}
                      <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                        {selectedMonth.month} {selectedMonth.year} Analysis
                      </h3>
                      {nextMonth && (
                        <button
                          onClick={() => setSelectedMonth(nextMonth)}
                          className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300 border border-slate-300 dark:border-slate-600"
                        >
                          <ChevronRight className="w-6 h-6 text-slate-700 dark:text-white" />
                        </button>
                      )}
                    </div>
                    <Link to={`/bitcoin-market-sentiment/${selectedMonth.year}/${selectedMonth.month.toLowerCase()}`}>
                      <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-medium shadow-lg">
                        View Full Report
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Monthly Overview Cards */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-slate-100 dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-300 dark:border-slate-600">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-semibold">Average Sentiment</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{selectedMonth.averageSentiment}</div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 border border-red-200 dark:border-red-900/30">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <span className="text-red-700 dark:text-red-300 font-semibold">Fear Days</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{selectedMonth.fearDays}</div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-900/30">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <span className="text-yellow-700 dark:text-yellow-300 font-semibold">Greed Days</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{selectedMonth.greedDays}</div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950/20 rounded-2xl p-6 border border-green-200 dark:border-green-900/30">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-green-700 dark:text-green-300 font-semibold">Neutral Days</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{selectedMonth.neutralDays}</div>
                    </div>
                  </div>

                  {/* Charts */}
                  {selectedMonth.dailyData && selectedMonth.dailyData.length > 0 ? (
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Area Chart */}
                      <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-300 dark:border-slate-700/30">
                        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Daily Sentiment Progression</h4>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">How sentiment changed throughout {selectedMonth.month} {selectedMonth.year}</p>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaChartData}>
                              <defs>
                                <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={CHART_COLORS.positive} stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor={CHART_COLORS.positive} stopOpacity={0.1}/>
                                </linearGradient>
                                <linearGradient id="neutralGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={CHART_COLORS.neutral} stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor={CHART_COLORS.neutral} stopOpacity={0.1}/>
                                </linearGradient>
                                <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={CHART_COLORS.negative} stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor={CHART_COLORS.negative} stopOpacity={0.1}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2) dark:rgba(255,255,255,0.1)" />
                              <XAxis dataKey="date" stroke="rgba(100,116,139,0.6) dark:rgba(255,255,255,0.6)" />
                              <YAxis stroke="rgba(100,116,139,0.6) dark:rgba(255,255,255,0.6)" />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'rgba(255,255,255,0.95) dark:rgba(0,0,0,0.9)', 
                                  border: '1px solid rgba(100,116,139,0.2) dark:rgba(255,255,255,0.2)',
                                  borderRadius: '12px',
                                  color: 'rgb(15,23,42) dark:white'
                                }}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="positive" 
                                stackId="1" 
                                stroke={CHART_COLORS.positive} 
                                fill="url(#positiveGradient)"
                                strokeWidth={2}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="neutral" 
                                stackId="1" 
                                stroke={CHART_COLORS.neutral} 
                                fill="url(#neutralGradient)"
                                strokeWidth={2}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="negative" 
                                stackId="1" 
                                stroke={CHART_COLORS.negative} 
                                fill="url(#negativeGradient)"
                                strokeWidth={2}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Pie Chart */}
                      <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-300 dark:border-slate-700/30">
                        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Monthly Sentiment Distribution</h4>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">Average sentiment breakdown for {selectedMonth.month} {selectedMonth.year}</p>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {pieChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'rgba(255,255,255,0.95) dark:rgba(0,0,0,0.9)', 
                                  border: '1px solid rgba(100,116,139,0.2) dark:rgba(255,255,255,0.2)',
                                  borderRadius: '12px',
                                  color: 'rgb(15,23,42) dark:white'
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-slate-600 dark:text-slate-400 text-lg">No daily data available for {selectedMonth.month} {selectedMonth.year}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* What We Track */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                  What We Track Monthly
                </h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                  Advanced sentiment analysis across multiple data sources for comprehensive market insights
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group bg-slate-50 dark:bg-slate-900/30 rounded-2xl p-8 border border-slate-300 dark:border-slate-700/30 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <TrendingUp className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white">Fear & Greed Index</h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Daily sentiment scores from 0 (extreme fear) to 100 (extreme greed),
                    averaged monthly to show overall market psychology trends.
                  </p>
                </div>

                <div className="group bg-slate-50 dark:bg-slate-900/30 rounded-2xl p-8 border border-slate-300 dark:border-slate-700/30 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <BarChart3 className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white">Social Media Sentiment</h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Analysis of Twitter, Reddit, and other social platforms to gauge
                    retail investor sentiment and community mood.
                  </p>
                </div>

                <div className="group bg-slate-50 dark:bg-slate-900/30 rounded-2xl p-8 border border-slate-300 dark:border-slate-700/30 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Clock className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white">News & Media Analysis</h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Sentiment analysis of major financial publications, crypto media,
                    and institutional reports to track professional sentiment.
                  </p>
                </div>
              </div>
            </section>

            {/* Key Benefits */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                  Why Track Monthly Sentiment?
                </h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                  Advanced insights for strategic market analysis and predictive trading
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/30 rounded-3xl p-12 border border-slate-300 dark:border-slate-700/30">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Identify Market Cycles</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      Monthly sentiment analysis helps identify recurring patterns and market cycles.
                      Understanding when fear or greed typically peaks can improve your trading timing.
                    </p>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        Seasonal sentiment patterns
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        Market cycle identification
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                        Historical trend analysis
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Predictive Insights</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                      Sentiment often leads price movements. By tracking monthly sentiment trends,
                      you can anticipate market shifts before they appear in traditional metrics.
                    </p>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        Early warning signals
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        Contrarian opportunities
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                        Risk management insights
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Daily Analysis Navigation */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                  Daily Sentiment Analysis
                </h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                  Get granular insights with daily sentiment tracking. Every day gets its own comprehensive analysis page.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/30 rounded-3xl p-12 border border-slate-300 dark:border-slate-700/30 shadow-lg mb-16">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Recent Daily Analysis</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                      Access detailed sentiment analysis for individual days. Track hourly progression, key events, and market psychology.
                    </p>
                    <div className="space-y-3">
                      {(() => {
                        const recentDays = Array.from({ length: 7 }, (_, i) => {
                          const date = new Date();
                          date.setDate(date.getDate() - i);
                          return date;
                        });

                        return recentDays.map((date) => {
                          const dateStr = date.toISOString().split('T')[0];
                          const formattedDate = date.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          });

                          return (
                            <Link
                              key={dateStr}
                              to={`/bitcoin-market-sentiment/${date.getFullYear()}/${date.toLocaleDateString('en-US', { month: 'long' }).toLowerCase()}/${date.getDate()}`}
                              className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300 group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-slate-700 dark:bg-slate-400 rounded-full"></div>
                                <span className="font-medium text-slate-900 dark:text-white">{formattedDate}</span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                            </Link>
                          );
                        });
                      })()}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Browse by Date</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                      Jump to any specific date to see detailed sentiment analysis. Use the format YYYY-MM-DD in the URL.
                    </p>

                    <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-300 dark:border-slate-700">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-3 font-medium">URL Format:</div>
                      <div className="font-mono text-sm bg-slate-100 dark:bg-slate-900 rounded-lg p-3 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 mb-4">
                        /bitcoin-market-sentiment/year/month/day
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">Example:</div>
                      <Link
                        to="/bitcoin-market-sentiment/2025/july/19"
                        className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 font-medium"
                      >
                        July 19, 2025 Analysis
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Resources */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                  Related Bitcoin Resources
                </h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12">
                  Explore our comprehensive Bitcoin and cryptocurrency analysis tools and resources
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl p-8 border border-slate-300 dark:border-slate-700/30 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    <Link to="/crypto-conferences" className="hover:text-orange-500 transition-colors">
                      Crypto Conferences 2025-2026
                    </Link>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Stay updated on Bitcoin, blockchain, and Web3 conferences worldwide. Network with industry leaders and track sentiment at major crypto events.
                  </p>
                  <Link to="/crypto-conferences" className="text-orange-500 hover:text-orange-600 font-medium">
                    View Conference Calendar →
                  </Link>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl p-8 border border-slate-300 dark:border-slate-700/30 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    <Link to="/bitcoin-fear-greed-index" className="hover:text-orange-500 transition-colors">
                      Bitcoin Fear & Greed Index
                    </Link>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Real-time Bitcoin market sentiment indicator combining multiple data sources for comprehensive market emotion analysis.
                  </p>
                  <Link to="/bitcoin-fear-greed-index" className="text-orange-500 hover:text-orange-600 font-medium">
                    View Live Index →
                  </Link>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl p-8 border border-slate-300 dark:border-slate-700/30 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    <Link to="/bitcoin-media-research" className="hover:text-orange-500 transition-colors">
                      Bitcoin Media Research
                    </Link>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Weekly research newsletter analyzing Bitcoin media coverage, sentiment trends, and narrative shifts across 650+ sources.
                  </p>
                  <Link to="/bitcoin-media-research" className="text-orange-500 hover:text-orange-600 font-medium">
                    Subscribe to Research →
                  </Link>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center">
              <div className="bg-slate-50 dark:bg-slate-900/30 rounded-3xl p-16 border border-slate-300 dark:border-slate-700/30 shadow-lg">
                <h3 className="text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                  Get Real-Time Sentiment Data
                </h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
                  Don't wait for monthly reports. Get live sentiment data and instant alerts
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link to="/bitcoin-fear-greed-index">
                    <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 rounded-full font-medium shadow-lg">
                      View Live Fear & Greed Index
                    </Button>
                  </Link>
                  <Link to="https://app.perception.to/auth/sign-up" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 px-10 py-4 rounded-full font-medium">
                      Get Access to Data
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
} 