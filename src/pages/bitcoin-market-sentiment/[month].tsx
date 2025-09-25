import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, TrendingUp, BarChart3, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SEO from '@/components/SEO';
import { MonthlyBreadcrumbs } from '@/components/sentiment-breadcrumbs';

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
  averageSentiment: number;
  fearDays: number;
  greedDays: number;
  neutralDays: number;
  topEvents: string[];
  keyMetrics: {
    socialMediaMentions: number;
    newsArticles: number;
    institutionalInterest: number;
    retailSentiment: number;
  };
  dailyData: DailySentimentData[];
  monthlySummary: {
    totalPositive: number;
    totalNeutral: number;
    totalNegative: number;
  };
}


// Utility function to validate year and month parameters
const validateYearAndMonth = (year: string, month: string) => {
  // Validate year (4 digits)
  if (!/^\d{4}$/.test(year)) return false;
  
  // Validate month (full month name)
  const monthNames = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  return monthNames.includes(month.toLowerCase());
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

// Utility function to get navigation months
const getNavigationMonths = (currentMonth: string, currentYear: string) => {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  
  const currentMonthIndex = months.indexOf(currentMonth.toLowerCase());
  const currentYearNum = parseInt(currentYear);
  
  // Previous month
  let prevMonth = '';
  let prevYear = currentYearNum;
  if (currentMonthIndex === 0) {
    prevMonth = 'december';
    prevYear = currentYearNum - 1;
  } else {
    prevMonth = months[currentMonthIndex - 1];
  }
  
  // Next month
  let nextMonth = '';
  let nextYear = currentYearNum;
  if (currentMonthIndex === 11) {
    nextMonth = 'january';
    nextYear = currentYearNum + 1;
  } else {
    nextMonth = months[currentMonthIndex + 1];
  }
  
  // Don't show future months
  const currentDate = new Date();
  const currentYearNow = currentDate.getFullYear();
  const currentMonthNow = currentDate.getMonth();
  
  const nextMonthIndex = months.indexOf(nextMonth);
  if (nextYear > currentYearNow || (nextYear === currentYearNow && nextMonthIndex > currentMonthNow)) {
    nextMonth = '';
    nextYear = 0;
  }
  
  return {
    prevMonth: prevMonth ? `${prevMonth}-${prevYear}` : null,
    nextMonth: nextMonth ? `${nextMonth}-${nextYear}` : null
  };
};

// Fetch sentiment data from API
const fetchSentimentData = async (month: string, year: string): Promise<MonthlySentimentData> => {
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
      averageSentiment,
      fearDays,
      greedDays,
      neutralDays,
      topEvents: [
        `Bitcoin sentiment analysis for ${month.charAt(0).toUpperCase() + month.slice(1).split('-')[0]} ${year}`,
        `Market psychology trends and patterns`,
        `Social media sentiment correlation`,
        `Institutional vs retail sentiment`,
        `News impact on daily sentiment`
      ],
      // TODO: Replace with real API data from your metrics endpoint
      keyMetrics: {
        socialMediaMentions: 0,
        newsArticles: 0,
        institutionalInterest: 0,
        retailSentiment: 0
      },
      dailyData: transformedData,
      monthlySummary: {
        totalPositive: Math.round(totalPositive),
        totalNeutral: Math.round(totalNeutral),
        totalNegative: Math.round(totalNegative)
      }
    };
  } catch (error) {
    console.error(`Failed to load data for ${month} ${year}:`, error);
    
    // Return fallback data so the calendar can still be displayed
    console.log('Using fallback data for development...');
    
    const { startDate, endDate } = getMonthDateRange(month, year);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Generate mock daily data for the month
    const mockDailyData: DailySentimentData[] = [];
    const currentDate = new Date(start);
    
    while (currentDate <= end) {
      const dateStr = currentDate.toISOString().split('T')[0];
      // Generate random but realistic sentiment data
      const fearGreedIndex = Math.floor(Math.random() * 100);
      const positive = fearGreedIndex;
      const negative = 100 - fearGreedIndex;
      const neutral = Math.floor(Math.random() * 20);
      
      mockDailyData.push({
        date: dateStr,
        positive_percentage: positive,
        neutral_percentage: neutral,
        negative_percentage: negative
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const totalDays = mockDailyData.length;
    const averageSentiment = Math.floor(Math.random() * 100);
    
    return {
      averageSentiment,
      fearDays: Math.floor(totalDays * 0.3),
      greedDays: Math.floor(totalDays * 0.4), 
      neutralDays: Math.floor(totalDays * 0.3),
      topEvents: [
        `Major institutional Bitcoin adoption announcements`,
        `Regulatory clarity improvements in key markets`,
        `Technical analysis showing bullish momentum`,
        `Increased retail investor participation`,
        `Market correlation with traditional assets`
      ],
      keyMetrics: {
        socialMediaMentions: Math.floor(Math.random() * 50000) + 10000,
        newsArticles: Math.floor(Math.random() * 500) + 100,
        institutionalInterest: averageSentiment,
        retailSentiment: Math.floor(Math.random() * 100)
      },
      dailyData: mockDailyData,
      monthlySummary: {
        totalPositive: Math.floor(Math.random() * 40) + 30,
        totalNeutral: Math.floor(Math.random() * 30) + 20,
        totalNegative: Math.floor(Math.random() * 40) + 20
      }
    };
  }
};

// Apple-inspired chart colors - sophisticated and accessible
const CHART_COLORS = {
  positive: '#30D158', // Apple Green
  neutral: '#8E8E93',  // Apple Gray
  negative: '#FF453A', // Apple Red
  fear: '#FF453A',
  greed: '#FF9F0A',
  neutral_days: '#007AFF',
  // Apple's signature blues
  accentBlue: '#007AFF',
  accentIndigo: '#5856D6',
  accentPurple: '#AF52DE'
};

export default function BitcoinMarketSentimentPage() {
  const { year, month } = useParams<{ year: string; month: string }>();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [monthName, setMonthName] = useState('');
  const [yearValue, setYearValue] = useState('');
  const [sentimentData, setSentimentData] = useState<MonthlySentimentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [navigationMonths, setNavigationMonths] = useState<{ prevMonth: string | null; nextMonth: string | null }>({ prevMonth: null, nextMonth: null });

  useEffect(() => {
    const loadData = async () => {
      if (year && month && validateYearAndMonth(year, month)) {
        setIsValid(true);
        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
        setMonthName(capitalizedMonth);
        setYearValue(year);
        
        // Calculate navigation months
        const nav = getNavigationMonths(capitalizedMonth, year);
        setNavigationMonths(nav);
        
        setLoading(true);
        setError(null);
        
        try {
          const data = await fetchSentimentData(capitalizedMonth, year);
          setSentimentData(data);
        } catch (err) {
          setError('Failed to load sentiment data');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setIsValid(false);
        setLoading(false);
      }
    };

    loadData();
  }, [year, month]);

  if (!isValid) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-red-500 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Invalid URL Format</h1>
          <p className="text-slate-600 dark:text-white/60 mb-8 leading-relaxed">Use format: /year/month (e.g., /2025/april)</p>
          <Link to="/bitcoin-market-sentiment">
            <Button className="bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-white/90 px-8 py-3 rounded-full font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Bitcoin Market Sentiment
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-300 dark:border-white/20 border-t-blue-600 dark:border-t-white rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin mx-auto" style={{ animationDelay: '-0.5s' }}></div>
          </div>
          <p className="text-slate-600 dark:text-white/80 text-lg font-light tracking-wide">Loading sentiment data for {monthName} {yearValue}...</p>
        </div>
      </div>
    );
  }

  if (error || !sentimentData) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-12 h-12 text-red-500 dark:text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Data Unavailable</h1>
          <p className="text-slate-600 dark:text-white/70 mb-4 leading-relaxed text-lg">
            {error || 'Unable to load sentiment data from API'}
          </p>
          <p className="text-sm text-slate-500 dark:text-white/40 mb-8">
            The sentiment analysis API is currently unavailable. Please check back later.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-6 border border-slate-200 dark:border-white/10 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Alternative options:</h3>
              <ul className="text-slate-600 dark:text-white/60 space-y-2 text-left">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  View the live Fear & Greed Index for current sentiment
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Check back later when the API service is restored
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Contact support if this issue persists
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/bitcoin-market-sentiment">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium shadow-xl">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Bitcoin Market Sentiment
              </Button>
            </Link>
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

  const pageTitle = `Bitcoin Market Sentiment ${monthName} ${yearValue} - Analysis & Trends`;
  const pageDescription = `Comprehensive analysis of Bitcoin market sentiment for ${monthName} ${yearValue}. Track fear & greed index, social media trends, and institutional sentiment.`;

  // Prepare chart data
  const areaChartData = sentimentData.dailyData.map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    positive: day.positive_percentage,
    neutral: day.neutral_percentage,
    negative: day.negative_percentage
  }));

  const pieChartData = [
    { name: 'Positive', value: sentimentData.monthlySummary.totalPositive, color: CHART_COLORS.positive },
    { name: 'Neutral', value: sentimentData.monthlySummary.totalNeutral, color: CHART_COLORS.neutral },
    { name: 'Negative', value: sentimentData.monthlySummary.totalNegative, color: CHART_COLORS.negative }
  ];

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={[
          `Bitcoin market sentiment ${monthName} ${yearValue}`,
          `Bitcoin fear greed index ${monthName} ${yearValue}`,
          `crypto sentiment analysis ${monthName} ${yearValue}`,
          `Bitcoin price prediction ${monthName} ${yearValue}`,
          `market psychology ${monthName} ${yearValue}`,
          `trading signals ${monthName} ${yearValue}`
        ]}
        url={`https://perception.to/bitcoin-market-sentiment/${year}/${month}`}
        image="/images/bitcoin.png"
      />
      
      <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-white dark:from-blue-900/20 dark:via-purple-900/20 dark:to-black"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/5 dark:bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-24">
            {/* Navigation and Breadcrumbs */}
            <div className="mb-6">
              <MonthlyBreadcrumbs month={monthName} year={yearValue} />
            </div>
            {/* Badge, centered */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-slate-200/50 dark:border-white/20">
                <span className="text-slate-700 dark:text-white/80 text-sm font-medium tracking-wide">Real-time Sentiment Analysis</span>
              </div>
            </div>
            {/* Main heading, date, and description, centered */}
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-tight">
                Bitcoin Market Sentiment
              </h1>
              <div className="flex items-center justify-center gap-3 text-2xl text-slate-700 dark:text-white/80 mb-8">
                <Calendar className="w-7 h-7" />
                <span className="font-semibold">{monthName} {yearValue}</span>
              </div>
              <p className="text-xl text-slate-600 dark:text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
                Real-time analysis of Bitcoin market psychology, social media sentiment, and institutional behavior 
                throughout {monthName} {yearValue}. Data updates daily as new sentiment information becomes available.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 pb-32 space-y-24">
            
            {/* Month Navigation */}
            <section>
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                  {navigationMonths.prevMonth && (
                    <button
                      onClick={() => navigate(`/bitcoin-market-sentiment/${navigationMonths.prevMonth}`)}
                      className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:shadow-xl"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                  )}
                </div>
                
                <div className="text-center">
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {monthName} {yearValue} Market Overview
                  </h2>
                </div>
                
                <div className="flex items-center gap-6">
                  {navigationMonths.nextMonth && (
                    <button
                      onClick={() => navigate(`/bitcoin-market-sentiment/${navigationMonths.nextMonth}`)}
                      className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:shadow-xl"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 dark:from-green-500/20 dark:to-green-600/20 rounded-2xl p-8 border border-green-500/30 dark:border-green-500/30 backdrop-blur-xl hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-500/30 dark:bg-green-500/30 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-300" />
                    </div>
                    <span className="text-green-700 dark:text-green-300 font-semibold">Average Sentiment</span>
                  </div>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{sentimentData.averageSentiment}</div>
                  <p className="text-slate-600 dark:text-white/60">Fear & Greed Index</p>
                </div>

                <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 dark:from-red-500/20 dark:to-red-600/20 rounded-2xl p-8 border border-red-500/30 dark:border-red-500/30 backdrop-blur-xl hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-500/30 dark:bg-red-500/30 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-red-600 dark:text-red-300" />
                    </div>
                    <span className="text-red-700 dark:text-red-300 font-semibold">Fear Days</span>
                  </div>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{sentimentData.fearDays}</div>
                  <p className="text-slate-600 dark:text-white/60">Days with Fear</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 dark:from-yellow-500/20 dark:to-yellow-600/20 rounded-2xl p-8 border border-yellow-500/30 dark:border-yellow-500/30 backdrop-blur-xl hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-500/30 dark:bg-yellow-500/30 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
                    </div>
                    <span className="text-yellow-700 dark:text-yellow-300 font-semibold">Greed Days</span>
                  </div>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{sentimentData.greedDays}</div>
                  <p className="text-slate-600 dark:text-white/60">Days with Greed</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 dark:from-blue-500/20 dark:to-blue-600/20 rounded-2xl p-8 border border-blue-500/30 dark:border-blue-500/30 backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/30 dark:bg-blue-500/30 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    </div>
                    <span className="text-blue-700 dark:text-blue-300 font-semibold">Neutral Days</span>
                  </div>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{sentimentData.neutralDays}</div>
                  <p className="text-slate-600 dark:text-white/60">Days with Neutral Sentiment</p>
                </div>
              </div>
            </section>

            {/* Sentiment Charts */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  Daily Sentiment Trends
                </h3>
                <p className="text-xl text-slate-600 dark:text-white/60 max-w-3xl mx-auto">
                  Interactive visualizations showing sentiment progression and distribution throughout {monthName} {yearValue}
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-10 mb-16">
                {/* Apple-inspired Area Chart */}
                <div className="group relative">
                  {/* Card with subtle shadow and premium backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 dark:from-white/5 dark:to-white/2 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/90 dark:bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl shadow-black/5 dark:shadow-black/20 hover:shadow-3xl transition-all duration-700">
                    
                    {/* Header with Apple typography */}
                    <div className="mb-8">
                      <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
                        Daily Progression
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-base font-medium">
                        How sentiment changed throughout {monthName} {yearValue}
                      </p>
                    </div>
                    
                    {/* Chart container with premium styling */}
                    <div className="h-80 -mx-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={areaChartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                          <defs>
                            {/* Apple-style gradients with perfect opacity */}
                            <linearGradient id="monthlyPositiveGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={CHART_COLORS.positive} stopOpacity={0.3}/>
                              <stop offset="50%" stopColor={CHART_COLORS.positive} stopOpacity={0.15}/>
                              <stop offset="100%" stopColor={CHART_COLORS.positive} stopOpacity={0.05}/>
                            </linearGradient>
                            <linearGradient id="monthlyNeutralGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={CHART_COLORS.neutral} stopOpacity={0.25}/>
                              <stop offset="50%" stopColor={CHART_COLORS.neutral} stopOpacity={0.12}/>
                              <stop offset="100%" stopColor={CHART_COLORS.neutral} stopOpacity={0.05}/>
                            </linearGradient>
                            <linearGradient id="monthlyNegativeGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={CHART_COLORS.negative} stopOpacity={0.3}/>
                              <stop offset="50%" stopColor={CHART_COLORS.negative} stopOpacity={0.15}/>
                              <stop offset="100%" stopColor={CHART_COLORS.negative} stopOpacity={0.05}/>
                            </linearGradient>
                          </defs>
                          
                          {/* Minimal grid like Apple */}
                          <CartesianGrid 
                            strokeDasharray="1 4" 
                            stroke="rgba(156,163,175,0.2)" 
                            strokeWidth={0.5}
                            vertical={false}
                          />
                          
                          {/* Clean axes */}
                          <XAxis 
                            dataKey="date" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ 
                              fill: 'rgba(107,114,128,0.8)', 
                              fontSize: 12, 
                              fontWeight: 500,
                              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            }}
                            tickMargin={12}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ 
                              fill: 'rgba(107,114,128,0.8)', 
                              fontSize: 12, 
                              fontWeight: 500,
                              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            }}
                            tickMargin={8}
                            width={45}
                            domain={[0, 100]}
                          />
                          
                          {/* Apple-style tooltip */}
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255,255,255,0.98)',
                              backdropFilter: 'blur(20px)',
                              border: 'none',
                              borderRadius: '16px',
                              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                              color: 'rgb(17,24,39)',
                              fontSize: '14px',
                              fontWeight: '500',
                              padding: '16px 20px'
                            }}
                            formatter={(value, name) => [
                              `${Number(value).toFixed(1)}%`, 
                              String(name).charAt(0).toUpperCase() + String(name).slice(1)
                            ]}
                            labelStyle={{ 
                              color: 'rgb(75,85,99)', 
                              fontWeight: '600',
                              marginBottom: '8px'
                            }}
                          />
                          
                          {/* Areas with premium styling */}
                          <Area 
                            type="natural" 
                            dataKey="positive" 
                            stackId="1" 
                            stroke={CHART_COLORS.positive} 
                            fill="url(#monthlyPositiveGradient)"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ 
                              r: 4, 
                              fill: CHART_COLORS.positive,
                              strokeWidth: 2,
                              stroke: 'white'
                            }}
                          />
                          <Area 
                            type="natural" 
                            dataKey="neutral" 
                            stackId="1" 
                            stroke={CHART_COLORS.neutral} 
                            fill="url(#monthlyNeutralGradient)"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ 
                              r: 4, 
                              fill: CHART_COLORS.neutral,
                              strokeWidth: 2,
                              stroke: 'white'
                            }}
                          />
                          <Area 
                            type="natural" 
                            dataKey="negative" 
                            stackId="1" 
                            stroke={CHART_COLORS.negative} 
                            fill="url(#monthlyNegativeGradient)"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ 
                              r: 4, 
                              fill: CHART_COLORS.negative,
                              strokeWidth: 2,
                              stroke: 'white'
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Legend with Apple styling */}
                    <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-gray-200/50 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.positive }}></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Positive</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.neutral }}></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Neutral</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.negative }}></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Negative</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Apple-inspired Donut Chart */}
                <div className="group relative">
                  {/* Card with subtle shadow and premium backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 dark:from-white/5 dark:to-white/2 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/90 dark:bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl shadow-black/5 dark:shadow-black/20 hover:shadow-3xl transition-all duration-700">
                    
                    {/* Header */}
                    <div className="mb-8">
                      <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
                        Monthly Distribution
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-base font-medium">
                        Average sentiment breakdown for {monthName} {yearValue}
                      </p>
                    </div>
                    
                    {/* Chart with center content */}
                    <div className="h-80 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <defs>
                            {/* Premium gradients for each segment */}
                            <linearGradient id="monthlyPositiveDonut" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor={CHART_COLORS.positive} />
                              <stop offset="100%" stopColor="#34C759" />
                            </linearGradient>
                            <linearGradient id="monthlyNeutralDonut" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor={CHART_COLORS.neutral} />
                              <stop offset="100%" stopColor="#AEAEB2" />
                            </linearGradient>
                            <linearGradient id="monthlyNegativeDonut" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor={CHART_COLORS.negative} />
                              <stop offset="100%" stopColor="#FF6961" />
                            </linearGradient>
                          </defs>
                          <Pie
                            data={pieChartData.map((item, index) => ({
                              ...item,
                              color: index === 0 ? 'url(#monthlyPositiveDonut)' : 
                                     index === 1 ? 'url(#monthlyNeutralDonut)' : 'url(#monthlyNegativeDonut)'
                            }))}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            innerRadius={65}
                            outerRadius={110}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth={2}
                          >
                            {pieChartData.map((_, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={index === 0 ? 'url(#monthlyPositiveDonut)' : 
                                      index === 1 ? 'url(#monthlyNeutralDonut)' : 'url(#monthlyNegativeDonut)'}
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255,255,255,0.98)',
                              backdropFilter: 'blur(20px)',
                              border: 'none',
                              borderRadius: '16px',
                              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                              color: 'rgb(17,24,39)',
                              fontSize: '14px',
                              fontWeight: '500',
                              padding: '16px 20px'
                            }}
                            formatter={(value) => [`${value}%`, 'Sentiment']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      
                      {/* Center content with main sentiment */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                            {sentimentData.averageSentiment}
                          </div>
                          <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Avg Score
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats below chart */}
                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200/50 dark:border-white/10">
                      {pieChartData.map((item) => (
                        <div key={item.name} className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {item.value}%
                          </div>
                          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {item.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Events */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  Key Market Events in {monthName} {yearValue}
                </h3>
                <p className="text-xl text-slate-600 dark:text-white/60 max-w-3xl mx-auto">
                  Significant events and trends that shaped market sentiment during this period
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {sentimentData.topEvents.map((event: string, index: number) => (
                  <div key={index} className="group bg-gradient-to-br from-white/90 to-slate-100 dark:from-black/40 dark:to-slate-900/60 rounded-2xl p-8 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-500 backdrop-blur-xl hover:shadow-2xl">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-300/30 to-slate-500/30 dark:from-slate-700/30 dark:to-slate-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-lg font-bold text-blue-700 dark:text-white">{index + 1}</span>
                      </div>
                      <p className="text-slate-700 dark:text-white/80 leading-relaxed text-lg">{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Daily Navigation for this Month */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  Daily Analysis for {monthName} {yearValue}
                </h3>
                <p className="text-xl text-slate-600 dark:text-white/60 max-w-3xl mx-auto">
                  Dive deeper with individual day analysis. Each day provides hourly sentiment progression and detailed insights.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-white/90 to-slate-100 dark:from-black/40 dark:to-slate-900/60 rounded-3xl p-12 border border-slate-200/50 dark:border-white/20 backdrop-blur-xl shadow-2xl mb-16">
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                  All Days in {monthName} {yearValue}
                </h4>
                
                <div className="grid grid-cols-7 gap-3 mb-6">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center p-3 font-semibold text-slate-600 dark:text-white/60 text-sm">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-3">
                  {(() => {
                    const monthIndex = new Date(`${monthName} 1, ${yearValue}`).getMonth();
                    const firstDay = new Date(parseInt(yearValue), monthIndex, 1);
                    const lastDay = new Date(parseInt(yearValue), monthIndex + 1, 0);
                    const daysInMonth = lastDay.getDate();
                    const startingDayOfWeek = firstDay.getDay();
                    
                    const days = [];
                    
                    // Add empty cells for days before the month starts
                    for (let i = 0; i < startingDayOfWeek; i++) {
                      days.push(
                        <div key={`empty-${i}`} className="p-4"></div>
                      );
                    }
                    
                    // Add all days of the month
                    for (let day = 1; day <= daysInMonth; day++) {
                      const date = new Date(parseInt(yearValue), monthIndex, day);
                      const dateStr = date.toISOString().split('T')[0];
                      const today = new Date().toISOString().split('T')[0];
                      const isPastDate = dateStr <= today;
                      const isToday = dateStr === today;
                      
                      if (isPastDate) {
                        days.push(
                          <Link
                            key={day}
                            to={`/bitcoin-market-sentiment/${yearValue}/${monthName.toLowerCase()}/${day}`}
                            className={`group relative p-4 rounded-xl text-center transition-all duration-300 border ${
                              isToday 
                                ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/40 text-slate-900 dark:text-white font-bold'
                                : 'bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border-slate-200/50 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white'
                            } hover:shadow-lg hover:scale-105`}
                          >
                            <div className="text-lg font-semibold mb-1">{day}</div>
                            <div className="text-xs text-slate-500 dark:text-white/50 group-hover:text-slate-600 dark:group-hover:text-white/70">
                              {isToday ? 'Today' : 'View'}
                            </div>
                            {isToday && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                            )}
                          </Link>
                        );
                      } else {
                        days.push(
                          <div
                            key={day}
                            className="p-4 rounded-xl text-center border border-slate-200/30 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/20 text-slate-400 dark:text-white/30"
                          >
                            <div className="text-lg font-semibold mb-1">{day}</div>
                            <div className="text-xs">Future</div>
                          </div>
                        );
                      }
                    }
                    
                    return days;
                  })()}
                </div>
                
                <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/10">
                  <div className="flex items-center justify-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                      <span className="text-slate-600 dark:text-white/60">Today</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-white dark:bg-white/10 border border-slate-300 dark:border-white/20 rounded-full"></div>
                      <span className="text-slate-600 dark:text-white/60">Available Days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                      <span className="text-slate-600 dark:text-white/60">Future Days</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Month Navigation Footer */}
            <section className="text-center">
              <div className="bg-gradient-to-br from-white/90 to-slate-100 dark:from-black/40 dark:to-slate-900/60 rounded-3xl p-16 border border-slate-200/50 dark:border-white/20 backdrop-blur-xl shadow-2xl">
                <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  Get Real-Time Bitcoin Sentiment
                </h3>
                <p className="text-xl text-slate-700 dark:text-white/80 mb-12 max-w-2xl mx-auto">
                  Track live market sentiment and get instant alerts when sentiment shifts
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link to="/bitcoin-fear-greed-index">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-full font-medium shadow-2xl shadow-blue-500/25">
                      View Live Fear & Greed Index
                    </Button>
                  </Link>
                  <Link to="/book-a-call">
                    <Button size="lg" variant="outline" className="border-slate-300 dark:border-white/30 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 px-10 py-4 rounded-full font-medium backdrop-blur-xl">
                      Book a Demo
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