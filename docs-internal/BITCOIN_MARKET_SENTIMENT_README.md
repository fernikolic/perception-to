# Bitcoin Market Sentiment - Monthly URL System

This system automatically creates dynamic URLs for monthly Bitcoin market sentiment analysis, targeting SEO keywords like "bitcoin market sentiment april 2025". **Now with real-time API integration and interactive charts!**

## How It Works

### URL Structure
- **Main Hub**: `/bitcoin-market-sentiment`
- **Monthly Pages**: `/bitcoin-market-sentiment/{month}-{year}`
- **Examples**:
  - `/bitcoin-market-sentiment/april-2025`
  - `/bitcoin-market-sentiment/may-2025`
  - `/bitcoin-market-sentiment/january-2024`

### Automatic URL Generation
The system automatically:
1. **Validates URL format** - Only accepts `month-year` format (e.g., `april-2025`)
2. **Fetches real data** - Calls the daily sentiment percentages API for each month
3. **Generates dynamic content** - Each page shows month-specific sentiment data with interactive charts
4. **Optimizes SEO** - Each page has unique title, description, and keywords
5. **Prevents future dates** - Only shows past and current months

## Features

### 1. Real-Time Data Integration
Each monthly page now includes:
- **API Integration**: Fetches data from `/btcpapifunction/daily-sentiment-percentages`
- **Daily Sentiment Trends**: Interactive area chart showing positive, neutral, and negative sentiment
- **Monthly Distribution**: Pie chart showing overall sentiment breakdown
- **Real-time Updates**: Data updates daily as new sentiment information becomes available

### 2. Interactive Charts
- **Area Chart**: Shows daily sentiment progression throughout the month
- **Pie Chart**: Displays monthly sentiment distribution (positive, neutral, negative)
- **Responsive Design**: Charts adapt to different screen sizes
- **Color-coded**: Green for positive, gray for neutral, red for negative

### 3. Dynamic Content Generation
Each monthly page includes:
- **Monthly Overview**: Average sentiment, fear/greed days, neutral days
- **Key Market Events**: Month-specific events and trends
- **Market Metrics**: Social media mentions, news articles, institutional interest
- **SEO Optimization**: Unique meta tags for each month

### 4. SEO Benefits
- **Targeted Keywords**: Each page targets "bitcoin market sentiment [month] [year]"
- **Unique Content**: Different data and analysis for each month
- **Internal Linking**: Links between monthly pages and main sentiment hub
- **Sitemap Ready**: URLs can be easily added to sitemap

### 5. User Experience
- **Loading States**: Shows loading spinner while fetching data
- **Error Handling**: Graceful error handling with fallback data
- **Navigation**: Easy navigation between months
- **Current Month Highlighting**: Current month is visually highlighted
- **Responsive Design**: Works on all devices
- **Fast Loading**: Optimized data fetching and rendering

## API Integration

### Daily Sentiment Percentages Endpoint
The system integrates with your existing API endpoint:

```
GET /btcpapifunction/daily-sentiment-percentages?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
```

**Response Format:**
```json
[
  {
    "date": "2024-11-01",
    "positive_percentage": 60.0,
    "neutral_percentage": 25.0,
    "negative_percentage": 15.0
  }
]
```

### Data Processing
The system automatically:
1. **Calculates date ranges** for each month (first to last day)
2. **Fetches daily data** from the API
3. **Processes sentiment metrics**:
   - Average sentiment score (0-100 scale)
   - Fear days (negative > 50%)
   - Greed days (positive > 60%)
   - Neutral days (balanced sentiment)
4. **Generates charts** from the processed data

## Usage

### For Users
1. Visit `/bitcoin-market-sentiment` to see all available monthly reports
2. Click on any month to view detailed analysis with interactive charts
3. Use the "Back to Bitcoin Market Sentiment" link to return to the hub

### For Developers

#### Adding New Routes
The routes are already configured in `src/App.tsx`:
```tsx
<Route path="/bitcoin-market-sentiment" element={<BitcoinMarketSentimentIndexPage />} />
<Route path="/bitcoin-market-sentiment/:month" element={<BitcoinMarketSentimentPage />} />
```

#### API Configuration
The API endpoint is configured in `src/pages/bitcoin-market-sentiment/[month].tsx`:
```tsx
const response = await fetch(`/btcpapifunction/daily-sentiment-percentages?startDate=${startDate}&endDate=${endDate}`);
```

#### Customizing Charts
Modify the chart components in the monthly page:
```tsx
// Area chart for daily trends
<AreaChart data={areaChartData}>
  <Area dataKey="positive" fill={CHART_COLORS.positive} />
  <Area dataKey="neutral" fill={CHART_COLORS.neutral} />
  <Area dataKey="negative" fill={CHART_COLORS.negative} />
</AreaChart>

// Pie chart for monthly distribution
<PieChart>
  <Pie data={pieChartData} />
</PieChart>
```

#### Error Handling
The system includes robust error handling:
```tsx
try {
  const data = await fetchSentimentData(monthName, year);
  setSentimentData(data);
} catch (err) {
  setError('Failed to load sentiment data');
  // Fallback to mock data
}
```

## Utility Scripts

### Generate All URLs
Use the utility script to generate all possible monthly URLs:

```bash
# Generate JSON list of all URLs
node scripts/generate-monthly-urls.js 2020 2025 json

# Generate sitemap entries
node scripts/generate-monthly-urls.js 2020 2025 sitemap

# Generate CSV export
node scripts/generate-monthly-urls.js 2020 2025 csv

# Generate simple URL list
node scripts/generate-monthly-urls.js 2020 2025 urls
```

### Example Output
```json
[
  {
    "slug": "december-2024",
    "month": "December",
    "year": "2024",
    "url": "https://perception.to/bitcoin-market-sentiment/december-2024",
    "title": "Bitcoin Market Sentiment December 2024 - Analysis & Trends",
    "description": "Comprehensive analysis of Bitcoin market sentiment for December 2024..."
  }
]
```

## SEO Strategy

### Keyword Targeting
Each page targets specific long-tail keywords:
- Primary: "bitcoin market sentiment [month] [year]"
- Secondary: "bitcoin fear greed index [month] [year]"
- Tertiary: "crypto sentiment analysis [month] [year]"

### Content Strategy
- **Unique Analysis**: Each month has different market events and trends
- **Historical Data**: Include past months for comprehensive coverage
- **Future Planning**: System automatically handles new months as they come
- **Real-time Data**: Charts update daily with fresh sentiment data

### Technical SEO
- **Meta Tags**: Unique title, description, and keywords for each page
- **Structured Data**: Ready for schema markup addition
- **Internal Linking**: Strong internal link structure
- **Mobile Optimization**: Responsive design for all devices
- **Fast Loading**: Optimized API calls and data processing

## Maintenance

### Adding New Months
The system automatically handles new months as they become available. No manual intervention needed.

### API Monitoring
- Monitor API response times and availability
- Check for data quality issues
- Verify date range calculations
- Test error handling scenarios

### Updating Content
1. Modify the data processing logic for new metrics
2. Update the UI components for new data fields
3. Add new chart types as needed
4. Enhance error handling for edge cases

### Monitoring
- Track page performance in Google Analytics
- Monitor keyword rankings for monthly variations
- Check for 404 errors on invalid month formats
- Monitor API usage and performance

## Future Enhancements

### Potential Additions
1. **Real-time Updates**: WebSocket integration for live data updates
2. **Advanced Charts**: More sophisticated chart types and interactions
3. **Comparison Tools**: Compare sentiment across months or years
4. **Email Alerts**: Notify users of new monthly reports
5. **Social Sharing**: Optimized social media cards for each month
6. **Export Features**: Allow users to download chart data
7. **Custom Date Ranges**: Let users select custom date ranges

### API Enhancements
```tsx
// Example: Add more API endpoints
const fetchAdvancedMetrics = async (month: string, year: string) => {
  const response = await fetch(`/btcpapifunction/advanced-metrics?month=${month}&year=${year}`);
  return response.json();
};

// Example: Add caching for better performance
const cachedFetch = async (url: string) => {
  const cacheKey = `sentiment-${url}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);
  
  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify(data));
  return data;
};
```

## Troubleshooting

### Common Issues
1. **Invalid URL Format**: Ensure URLs follow `month-year` pattern
2. **Future Dates**: System prevents access to future months
3. **API Errors**: Check API endpoint availability and response format
4. **Missing Data**: Verify date range calculations and API parameters

### Debug Mode
Add debug logging to the monthly page component:
```tsx
console.log('Month param:', month);
console.log('Date range:', getMonthDateRange(monthName, year));
console.log('API response:', dailyData);
console.log('Processed data:', sentimentData);
```

### API Testing
Test the API endpoint directly:
```bash
curl "https://your-domain.com/btcpapifunction/daily-sentiment-percentages?startDate=2024-11-01&endDate=2024-11-30"
```

## Support

For questions or issues with the Bitcoin Market Sentiment system:
1. Check this README for common solutions
2. Review the component code in `src/pages/bitcoin-market-sentiment/`
3. Test URL generation with the utility script
4. Verify routing configuration in `src/App.tsx`
5. Check API endpoint availability and response format
6. Monitor browser console for error messages 