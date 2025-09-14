import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, BarChart3, Clock, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SEO from '@/components/SEO';

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
            <div className="w-16 h-16 border-4 border-slate-300 dark:border-white/20 border-t-blue-600 dark:border-t-white rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin mx-auto" style={{ animationDelay: '-0.5s' }}></div>
          </div>
          <p className="text-slate-600 dark:text-white/80 text-lg font-light tracking-wide">Loading sentiment data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-12 h-12 text-red-500 dark:text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">API Service Unavailable</h1>
          <p className="text-slate-600 dark:text-white/70 mb-8 leading-relaxed text-lg">{error}</p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 border border-slate-200 dark:border-white/10 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">What this means:</h3>
              <ul className="text-slate-600 dark:text-white/60 space-y-2 text-left">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  The sentiment analysis API endpoint is not currently accessible
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Historical data may be temporarily unavailable
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  This is likely a temporary service issue
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium shadow-xl"
            >
              Try Again
            </Button>
            <Link to="/bitcoin-fear-greed-index">
              <Button variant="outline" className="border-slate-300 dark:border-white/30 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 px-8 py-3 rounded-full font-medium backdrop-blur-xl">
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
        image="/images/bitcoin.png"
      />
      
      <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-slate-100 dark:from-black/40 dark:to-slate-900/60"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-96 h-96 bg-slate-200/10 dark:bg-slate-800/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-slate-400/10 dark:bg-slate-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-100/5 dark:bg-slate-900/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>

        {/* Hero Section with Card Design */}
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
          {/* Subtle radial background like homepage */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_50%)]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Hero Card with Background Image (matches homepage) */}
            <div className="relative rounded-2xl overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src="/images/hero_image.avif"
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-3xl text-center">
                  {/* Segment badge */}
                  <div className="mb-6 sm:mb-8">
                    <span className="inline-flex items-center rounded-full bg-transparent px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium leading-6 text-black ring-1 ring-inset ring-black/30 hover:ring-black/50 transition-all duration-300">
                      For Traders & Investors
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-black max-w-4xl mx-auto">
                    Bitcoin Market Sentiment
                  </h1>
                  
                  <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light max-w-3xl mx-auto">
                    Comprehensive monthly analysis of Bitcoin market psychology, social media sentiment, and institutional behavior. Track the fear & greed index and identify market trends.
                  </p>

                  <div className="mt-6 sm:mt-8 lg:mt-10 flex items-center justify-center gap-4">
                    <Link to="/bitcoin-fear-greed-index">
                      <button className="bg-black text-white hover:bg-black/90 transition-all font-normal px-6 lg:px-8 text-sm sm:text-base shadow-lg hover:shadow-xl py-3 lg:py-4 rounded-lg inline-flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Live Fear & Greed Index
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 pb-32 space-y-24">
            
            {/* Monthly Selection */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  Historical Sentiment Data
                </h2>
                <p className="text-xl text-slate-600 dark:text-white/60 max-w-2xl mx-auto">
                  Explore sentiment trends across all available months with interactive visualizations
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                {monthlyData.map((monthData) => (
                  <button
                    key={monthData.slug}
                    onClick={() => setSelectedMonth(monthData)}
                    className={`group relative p-6 rounded-2xl border transition-all duration-500 text-left overflow-hidden ${
                      selectedMonth?.slug === monthData.slug
                        ? 'border-slate-500/50 bg-gradient-to-br from-slate-200/60 to-slate-100/80 dark:from-slate-800/40 dark:to-slate-900/60 shadow-2xl shadow-slate-500/25'
                        : 'border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl hover:shadow-slate-500/5 dark:hover:shadow-white/5'
                    } backdrop-blur-xl`}
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200/10 to-slate-100/10 dark:from-slate-800/10 dark:to-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-slate-900 dark:text-white text-lg">
                          {monthData.month} {monthData.year}
                        </span>
                        {monthData.isCurrent && (
                          <span className="text-xs bg-slate-500/10 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-500/30">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl font-bold text-slate-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                          {monthData.averageSentiment}
                        </span>
                        {(() => { const cat = getSentimentCategory(monthData.averageSentiment); return (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cat.color}`}>{cat.label}</span>
                        ); })()}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-white/60 font-medium">
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
                <div className="bg-gradient-to-br from-slate-50/80 to-white/80 dark:from-white/5 dark:to-white/10 rounded-3xl backdrop-blur-xl border border-slate-200/50 dark:border-white/20 p-12 mb-16 shadow-2xl">
                  {/* Month Header with Navigation */}
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-6">
                      {prevMonth && (
                        <button
                          onClick={() => setSelectedMonth(prevMonth)}
                          className="p-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all duration-300 border border-slate-200 dark:border-white/20"
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
                          className="p-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all duration-300 border border-slate-200 dark:border-white/20"
                        >
                          <ChevronRight className="w-6 h-6 text-slate-700 dark:text-white" />
                        </button>
                      )}
                    </div>
                    <Link to={`/bitcoin-market-sentiment/${selectedMonth.year}/${selectedMonth.month.toLowerCase()}`}>
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium shadow-xl">
                        View Full Report
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Monthly Overview Cards */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 dark:from-green-500/20 dark:to-green-600/20 rounded-2xl p-6 border border-green-500/30 dark:border-green-500/30 backdrop-blur-xl">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-green-500/30 dark:bg-green-500/30 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-300" />
                        </div>
                        <span className="text-green-700 dark:text-green-300 font-semibold">Average Sentiment</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{selectedMonth.averageSentiment}</div>
                    </div>

                    <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 dark:from-red-500/20 dark:to-red-600/20 rounded-2xl p-6 border border-red-500/30 dark:border-red-500/30 backdrop-blur-xl">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-red-500/30 dark:bg-red-500/30 rounded-xl flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-red-600 dark:text-red-300" />
                        </div>
                        <span className="text-red-700 dark:text-red-300 font-semibold">Fear Days</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{selectedMonth.fearDays}</div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 dark:from-yellow-500/20 dark:to-yellow-600/20 rounded-2xl p-6 border border-yellow-500/30 dark:border-yellow-500/30 backdrop-blur-xl">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-yellow-500/30 dark:bg-yellow-500/30 rounded-xl flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
                        </div>
                        <span className="text-yellow-700 dark:text-yellow-300 font-semibold">Greed Days</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{selectedMonth.greedDays}</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 dark:from-blue-500/20 dark:to-blue-600/20 rounded-2xl p-6 border border-blue-500/30 dark:border-blue-500/30 backdrop-blur-xl">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-500/30 dark:bg-blue-500/30 rounded-xl flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                        </div>
                        <span className="text-blue-700 dark:text-blue-300 font-semibold">Neutral Days</span>
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{selectedMonth.neutralDays}</div>
                    </div>
                  </div>

                  {/* Charts */}
                  {selectedMonth.dailyData && selectedMonth.dailyData.length > 0 ? (
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Area Chart */}
                      <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/10 backdrop-blur-xl">
                        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Daily Sentiment Progression</h4>
                        <p className="text-slate-600 dark:text-white/60 mb-6">How sentiment changed throughout {selectedMonth.month} {selectedMonth.year}</p>
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
                      <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/10 backdrop-blur-xl">
                        <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Monthly Sentiment Distribution</h4>
                        <p className="text-slate-600 dark:text-white/60 mb-6">Average sentiment breakdown for {selectedMonth.month} {selectedMonth.year}</p>
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
                      <p className="text-slate-600 dark:text-white/60 text-lg">No daily data available for {selectedMonth.month} {selectedMonth.year}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* What We Track */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  What We Track Monthly
                </h3>
                <p className="text-xl text-slate-600 dark:text-white/60 max-w-3xl mx-auto">
                  Advanced sentiment analysis across multiple data sources for comprehensive market insights
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group bg-gradient-to-br from-slate-100/80 to-white/80 dark:from-slate-800/20 dark:to-slate-900/20 rounded-2xl p-8 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-500 backdrop-blur-xl hover:shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-400/30 to-slate-200/30 dark:from-slate-700/30 dark:to-slate-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white">Fear & Greed Index</h4>
                  </div>
                  <p className="text-slate-600 dark:text-white/70 leading-relaxed">
                    Daily sentiment scores from 0 (extreme fear) to 100 (extreme greed), 
                    averaged monthly to show overall market psychology trends.
                  </p>
                </div>

                <div className="group bg-gradient-to-br from-slate-100/80 to-white/80 dark:from-slate-800/20 dark:to-slate-900/20 rounded-2xl p-8 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-500 backdrop-blur-xl hover:shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-500/30 to-slate-300/30 dark:from-slate-700/30 dark:to-slate-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white">Social Media Sentiment</h4>
                  </div>
                  <p className="text-slate-600 dark:text-white/70 leading-relaxed">
                    Analysis of Twitter, Reddit, and other social platforms to gauge 
                    retail investor sentiment and community mood.
                  </p>
                </div>

                <div className="group bg-gradient-to-br from-slate-100/80 to-white/80 dark:from-slate-800/20 dark:to-slate-900/20 rounded-2xl p-8 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-500 backdrop-blur-xl hover:shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-300/30 to-slate-500/30 dark:from-slate-700/30 dark:to-slate-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white">News & Media Analysis</h4>
                  </div>
                  <p className="text-slate-600 dark:text-white/70 leading-relaxed">
                    Sentiment analysis of major financial publications, crypto media, 
                    and institutional reports to track professional sentiment.
                  </p>
                </div>
              </div>
            </section>

            {/* Key Benefits */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  Why Track Monthly Sentiment?
                </h3>
                <p className="text-xl text-slate-600 dark:text-white/60 max-w-3xl mx-auto">
                  Advanced insights for strategic market analysis and predictive trading
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-100/80 to-white/80 dark:from-slate-800/20 dark:to-slate-900/20 rounded-3xl p-12 border border-slate-200/50 dark:border-white/20 backdrop-blur-xl">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Identify Market Cycles</h4>
                    <p className="text-slate-600 dark:text-white/70 leading-relaxed mb-6">
                      Monthly sentiment analysis helps identify recurring patterns and market cycles. 
                      Understanding when fear or greed typically peaks can improve your trading timing.
                    </p>
                    <ul className="space-y-3 text-slate-600 dark:text-white/60">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        Seasonal sentiment patterns
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        Market cycle identification
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                        Historical trend analysis
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Predictive Insights</h4>
                    <p className="text-slate-600 dark:text-white/70 leading-relaxed mb-6">
                      Sentiment often leads price movements. By tracking monthly sentiment trends, 
                      you can anticipate market shifts before they appear in traditional metrics.
                    </p>
                    <ul className="space-y-3 text-slate-600 dark:text-white/60">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        Early warning signals
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        Contrarian opportunities
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
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
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  Daily Sentiment Analysis
                </h3>
                <p className="text-xl text-slate-600 dark:text-white/60 max-w-3xl mx-auto">
                  Get granular insights with daily sentiment tracking. Every day gets its own comprehensive analysis page.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-white/90 to-slate-100 dark:from-black/40 dark:to-slate-900/60 rounded-3xl p-12 border border-slate-200/50 dark:border-white/20 backdrop-blur-xl shadow-2xl mb-16">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Recent Daily Analysis</h4>
                    <p className="text-slate-600 dark:text-white/70 leading-relaxed mb-8">
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
                              className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border border-slate-200/50 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                                <span className="font-medium text-slate-900 dark:text-white">{formattedDate}</span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-500 dark:text-white/50 group-hover:text-slate-700 dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                            </Link>
                          );
                        });
                      })()}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Browse by Date</h4>
                    <p className="text-slate-600 dark:text-white/70 leading-relaxed mb-8">
                      Jump to any specific date to see detailed sentiment analysis. Use the format YYYY-MM-DD in the URL.
                    </p>
                    
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-white/10">
                      <div className="text-sm text-slate-600 dark:text-white/60 mb-3 font-medium">URL Format:</div>
                      <div className="font-mono text-sm bg-white dark:bg-black/30 rounded-lg p-3 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white/80 mb-4">
                        /bitcoin-market-sentiment/year/month/day
                      </div>
                      <div className="text-sm text-slate-600 dark:text-white/60 mb-4">Example:</div>
                      <Link 
                        to="/bitcoin-market-sentiment/2025/july/19"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 font-medium"
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
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  Related Bitcoin Resources
                </h3>
                <p className="text-xl text-slate-600 dark:text-white/70 max-w-3xl mx-auto mb-12">
                  Explore our comprehensive Bitcoin and cryptocurrency analysis tools and resources
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/10 backdrop-blur-xl hover:shadow-lg transition-all">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    <Link to="/crypto-conferences" className="hover:text-orange-500 transition-colors">
                      Crypto Conferences 2025-2026
                    </Link>
                  </h4>
                  <p className="text-slate-600 dark:text-white/60 mb-6">
                    Stay updated on Bitcoin, blockchain, and Web3 conferences worldwide. Network with industry leaders and track sentiment at major crypto events.
                  </p>
                  <Link to="/crypto-conferences" className="text-orange-500 hover:text-orange-600 font-medium">
                    View Conference Calendar →
                  </Link>
                </div>

                <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/10 backdrop-blur-xl hover:shadow-lg transition-all">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    <Link to="/bitcoin-fear-greed-index" className="hover:text-orange-500 transition-colors">
                      Bitcoin Fear & Greed Index
                    </Link>
                  </h4>
                  <p className="text-slate-600 dark:text-white/60 mb-6">
                    Real-time Bitcoin market sentiment indicator combining multiple data sources for comprehensive market emotion analysis.
                  </p>
                  <Link to="/bitcoin-fear-greed-index" className="text-orange-500 hover:text-orange-600 font-medium">
                    View Live Index →
                  </Link>
                </div>

                <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-8 border border-slate-200 dark:border-white/10 backdrop-blur-xl hover:shadow-lg transition-all">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    <Link to="/bitcoin-media-research" className="hover:text-orange-500 transition-colors">
                      Bitcoin Media Research
                    </Link>
                  </h4>
                  <p className="text-slate-600 dark:text-white/60 mb-6">
                    Weekly research newsletter analyzing Bitcoin media coverage, sentiment trends, and narrative shifts across 100+ sources.
                  </p>
                  <Link to="/bitcoin-media-research" className="text-orange-500 hover:text-orange-600 font-medium">
                    Subscribe to Research →
                  </Link>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center">
              <div className="bg-gradient-to-br from-white/90 to-slate-100 dark:from-black/40 dark:to-slate-900/60 rounded-3xl p-16 border border-slate-200/50 dark:border-white/20 backdrop-blur-xl shadow-2xl">
                <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  Get Real-Time Sentiment Data
                </h3>
                <p className="text-xl text-slate-700 dark:text-white/80 mb-12 max-w-2xl mx-auto">
                  Don't wait for monthly reports. Get live sentiment data and instant alerts
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link to="/bitcoin-fear-greed-index">
                    <Button size="lg" className="bg-gradient-to-r from-slate-700 to-slate-500 hover:from-slate-800 hover:to-slate-600 text-white px-10 py-4 rounded-full font-medium shadow-2xl shadow-slate-500/25">
                      View Live Fear & Greed Index
                    </Button>
                  </Link>
                  <Link to="https://app.perception.to/auth/sign-up" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="border-slate-300 dark:border-white/30 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 px-10 py-4 rounded-full font-medium backdrop-blur-xl">
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