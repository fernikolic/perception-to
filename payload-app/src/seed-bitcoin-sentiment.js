require('dotenv').config();
const mongoose = require('mongoose');

const seedBitcoinSentiment = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/payload');
    console.log('Connected to MongoDB');

    // Define schema matching Payload CMS structure
    const glossarySchema = new mongoose.Schema({
      title: String,
      slug: String,
      description: String,
      category: String,
      published: { type: Boolean, default: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }, { collection: 'glossaries' });

    const learnSchema = new mongoose.Schema({
      title: String,
      slug: String,
      excerpt: String,
      content: String,
      category: String,
      tags: [{ tag: String }],
      readTime: Number,
      difficulty: String,
      featured: { type: Boolean, default: false },
      published: { type: Boolean, default: true },
      publishedAt: { type: Date, default: Date.now },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }, { collection: 'learns' });

    const Glossary = mongoose.model('Glossary', glossarySchema);
    const Learn = mongoose.model('Learn', learnSchema);

    // Bitcoin Sentiment Glossary Entry
    const bitcoinSentimentGlossary = {
      title: 'Bitcoin Sentiment',
      slug: 'bitcoin-sentiment',
      description: 'Bitcoin sentiment refers to the overall market psychology and emotional state of investors, traders, and market participants toward Bitcoin. This sentiment can range from extreme fear to extreme greed and is influenced by various factors including price movements, news events, regulatory developments, and market conditions. Understanding Bitcoin sentiment is crucial for making informed investment decisions and predicting market trends. Sentiment analysis combines both quantitative metrics like the Fear and Greed Index, social media sentiment, and on-chain data with qualitative factors such as news sentiment and institutional adoption. Key sentiment indicators include social media mentions, trading volume patterns, options positioning, and surveys of market participants.',
      category: 'bitcoin',
      published: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Bitcoin Sentiment Analysis Learn Article
    const bitcoinSentimentLearn = {
      title: 'Bitcoin Sentiment Analysis: A Complete Guide',
      slug: 'bitcoin-sentiment-analysis',
      excerpt: 'Learn how to analyze Bitcoin market sentiment using various indicators, tools, and methodologies. This comprehensive guide covers everything from social media sentiment to on-chain metrics and institutional sentiment indicators.',
      content: `# Bitcoin Sentiment Analysis: A Complete Guide

## Introduction

Bitcoin sentiment analysis is a crucial tool for understanding market psychology and predicting potential price movements. This comprehensive guide will teach you how to analyze Bitcoin market sentiment using various indicators, tools, and methodologies.

## What is Bitcoin Sentiment Analysis?

Bitcoin sentiment analysis involves evaluating the overall market psychology and emotional state of participants in the Bitcoin market. It combines quantitative data with qualitative insights to gauge whether the market is bullish (optimistic) or bearish (pessimistic).

## Key Sentiment Indicators

### 1. Fear and Greed Index
The Fear and Greed Index is one of the most popular sentiment indicators for Bitcoin. It ranges from 0 (extreme fear) to 100 (extreme greed) and is calculated using:
- Volatility (25%)
- Market momentum/volume (25%)
- Social media sentiment (15%)
- Surveys (15%)
- Bitcoin dominance (10%)
- Google Trends (10%)

### 2. Social Media Sentiment
Social media platforms provide real-time insights into market sentiment:
- **Twitter sentiment analysis**: Monitoring Bitcoin-related tweets for positive/negative language
- **Reddit discussions**: Analyzing r/Bitcoin and r/CryptoCurrency for community sentiment
- **Telegram channels**: Tracking sentiment in crypto trading groups

### 3. On-Chain Metrics
Blockchain data provides objective sentiment indicators:
- **HODL waves**: Long-term holders vs short-term speculators
- **Exchange inflows/outflows**: Selling pressure vs accumulation
- **MVRV ratio**: Market value to realized value ratio
- **Net unrealized profit/loss (NUPL)**: Overall profit/loss of holders

## Tools for Sentiment Analysis

### Professional Platforms
1. **Santiment**: On-chain and social sentiment data
2. **LunarCrush**: Social media sentiment aggregation
3. **The TIE**: Institutional-grade sentiment data
4. **Glassnode**: On-chain analytics and sentiment metrics

### Free Resources
1. **Alternative.me Fear & Greed Index**: Daily sentiment readings
2. **Crypto Fear & Greed Index**: Historical sentiment data
3. **Google Trends**: Search volume for Bitcoin-related terms
4. **Social media monitoring**: Manual tracking of key influencers

## Trading Strategies Based on Sentiment

### Contrarian Strategy
- Buy when sentiment is extremely negative (fear)
- Sell when sentiment is extremely positive (greed)
- Works best at market extremes
- Requires patience and strong conviction

### Trend Following
- Buy when sentiment turns positive with confirmation
- Sell when sentiment deteriorates with volume
- Use sentiment as trend confirmation
- Combine with technical indicators

## Best Practices

### Risk Management
- Never rely solely on sentiment for trading decisions
- Use sentiment as one factor among many
- Set stop-losses regardless of sentiment
- Size positions appropriately

### Data Quality
- Use multiple sentiment sources
- Verify sentiment data accuracy
- Understand methodology behind indicators
- Account for data lag and revisions

## Conclusion

Bitcoin sentiment analysis is a powerful tool when used correctly. It provides insights into market psychology that can help inform trading and investment decisions. However, it should never be used in isolation and must be combined with technical analysis, fundamental analysis, and proper risk management.`,
      category: 'market-analysis',
      tags: [
        { tag: 'sentiment' },
        { tag: 'analysis' },
        { tag: 'bitcoin' },
        { tag: 'trading' },
        { tag: 'psychology' }
      ],
      readTime: 8,
      difficulty: 'intermediate',
      featured: false,
      published: true,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Check if entries already exist
    const existingGlossary = await Glossary.findOne({ slug: 'bitcoin-sentiment' });
    const existingLearn = await Learn.findOne({ slug: 'bitcoin-sentiment-analysis' });

    if (existingGlossary) {
      console.log('❓ Bitcoin Sentiment glossary entry already exists');
    } else {
      await Glossary.create(bitcoinSentimentGlossary);
      console.log('✅ Created Bitcoin Sentiment glossary entry');
    }

    if (existingLearn) {
      console.log('❓ Bitcoin Sentiment Analysis learn article already exists');
    } else {
      await Learn.create(bitcoinSentimentLearn);
      console.log('✅ Created Bitcoin Sentiment Analysis learn article');
    }

    console.log('\n🎉 Seeding completed!');
    console.log('\n🔗 Test these URLs:');
    console.log('   - https://perception.to/glossary/bitcoin-sentiment');
    console.log('   - https://perception.to/learn/bitcoin-sentiment-analysis');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedBitcoinSentiment();