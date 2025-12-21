import { BarChart3, TrendingUp, TrendingDown, Minus, Zap, Target, ShieldCheck, AlertTriangle } from 'lucide-react';
import {
  LearnArticleLayout,
  Section,
  Paragraph,
  Callout,
  InfoCard,
  CardGrid,
  ScoreCard,
  StrategyCard,
  FAQItem,
  CheckList,
  Stack,
  InternalLink,
} from '@/components/learn';

export default function HowToReadFearGreedIndexPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a good Fear & Greed Index score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There is no universally "good" score. However, extreme fear (0-25) often presents buying opportunities, while extreme greed (75-100) may signal caution. Neutral scores (45-55) suggest balanced market conditions.'
        }
      },
      {
        '@type': 'Question',
        name: 'How often is the Fear & Greed Index updated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most Fear & Greed indices update daily. Perception\'s index updates every 90 seconds based on real-time media sentiment analysis from 650+ sources.'
        }
      },
      {
        '@type': 'Question',
        name: 'Should I buy when Fear & Greed shows extreme fear?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While extreme fear has historically correlated with market bottoms, it\'s not a guaranteed buy signal. Use it as one data point alongside technical analysis, fundamentals, and risk management.'
        }
      }
    ]
  };

  return (
    <LearnArticleLayout
      title="How to Read the Fear & Greed Index"
      metaTitle="How to Read the Fear & Greed Index: Bitcoin Trading Guide 2025 | Perception"
      description="A practical guide to interpreting Bitcoin's most popular sentiment indicator, understanding what each score range means, and using it in your trading strategy."
      keywords={[
        'how to read fear greed index',
        'fear and greed index explained',
        'bitcoin fear greed trading',
        'crypto sentiment indicator',
        'fear greed index interpretation'
      ]}
      url="https://perception.to/learn/how-to-read-fear-greed-index"
      category="Trading"
      categoryIcon={BarChart3}
      readTime="6 min read"
      tableOfContents={[
        { id: 'what-is-it', title: 'What is the Fear & Greed Index?' },
        { id: 'score-ranges', title: 'Understanding Score Ranges (0-100)' },
        { id: 'how-its-calculated', title: 'How the Index is Calculated' },
        { id: 'trading-strategies', title: 'Trading Strategies Using Fear & Greed' },
        { id: 'common-mistakes', title: 'Common Mistakes to Avoid' },
        { id: 'faq', title: 'Frequently Asked Questions' },
      ]}
      nextArticle={{ slug: 'bitcoin-market-psychology', title: 'Bitcoin Market Psychology Explained' }}
      relatedArticles={[
        { slug: 'what-is-crypto-sentiment-analysis', title: 'What is Crypto Sentiment Analysis?', description: 'Master the fundamentals of sentiment analysis.' },
        { slug: 'bitcoin-market-psychology', title: 'Bitcoin Market Psychology', description: 'Understand FOMO, FUD, and market cycles.' },
      ]}
      additionalSchema={[faqSchema]}
    >
      {/* Section 1: What is it */}
      <Section id="what-is-it" title="What is the Fear & Greed Index?">
        <Paragraph>
          The <strong>Bitcoin Fear & Greed Index</strong> is a sentiment indicator that measures the
          emotional state of the crypto market on a scale from 0 to 100. It quantifies whether market
          participants are feeling fearful or greedy at any given moment.
        </Paragraph>
        <Paragraph>
          The concept comes from legendary investor Warren Buffett's advice: <em>"Be fearful when others
          are greedy and greedy when others are fearful."</em> The index helps you see exactly when the
          market is experiencing these emotional extremes.
        </Paragraph>
        <Callout type="insight" title="Why It Matters">
          Markets tend to oversell during fear and overbuy during greed. By tracking sentiment,
          you can identify potential reversals and avoid buying at tops or selling at bottoms.
        </Callout>
      </Section>

      {/* Section 2: Score Ranges */}
      <Section id="score-ranges" title="Understanding Score Ranges (0-100)">
        <Paragraph>
          Each score range signals a different market emotional state. Here's how to interpret them:
        </Paragraph>

        <Stack gap="md">
          <ScoreCard
            range="0-25"
            label="Extreme Fear"
            icon={TrendingDown}
            color="red"
            description="Market participants are extremely worried. Panic selling may be occurring. Prices often feel like they'll never recover."
            note="Historical context: Extreme fear readings have historically preceded significant price recoveries. However, fear can persist for extended periods."
          />

          <ScoreCard
            range="26-45"
            label="Fear"
            icon={AlertTriangle}
            color="orange"
            description="Market is cautious and uncertain. Investors are hesitant to buy. Often seen during corrections or periods of negative news."
            note="Trading consideration: May present accumulation opportunities, but sentiment hasn't reached the extremes that typically signal bottoms."
          />

          <ScoreCard
            range="46-55"
            label="Neutral"
            icon={Minus}
            color="slate"
            description="Market sentiment is balanced. Neither fear nor greed dominates. Often a period of consolidation or indecision."
            note="Trading consideration: Watch for which direction sentiment breaks from neutral—this can signal the next trend."
          />

          <ScoreCard
            range="56-75"
            label="Greed"
            icon={Zap}
            color="lime"
            description="Optimism is building. FOMO (Fear Of Missing Out) is starting. Buyers are confident and prices are rising."
            note="Trading consideration: Trends can persist in greed zones. Consider taking partial profits if you're already in a position."
          />

          <ScoreCard
            range="76-100"
            label="Extreme Greed"
            icon={TrendingUp}
            color="green"
            description='Euphoria dominates. Everyone is bullish. New investors are rushing in. "This time is different" narratives are common.'
            note="Historical context: Extreme greed often precedes corrections. Markets rarely sustain readings above 80 for extended periods."
          />
        </Stack>
      </Section>

      {/* Section 3: How it's calculated */}
      <Section id="how-its-calculated" title="How the Index is Calculated">
        <Paragraph>
          Different providers calculate the Fear & Greed Index using various data sources.
          Here's what typically goes into the calculation:
        </Paragraph>

        <Stack gap="sm">
          <InfoCard title="Volatility (25%)">
            Measures current volatility compared to 30/90-day averages. High volatility suggests fear.
          </InfoCard>

          <InfoCard title="Market Momentum (25%)">
            Compares current price to moving averages. Strong upward momentum indicates greed.
          </InfoCard>

          <InfoCard title="Social Media Sentiment (15%)">
            Analyzes Twitter, Reddit, and other platforms for bullish/bearish sentiment.
          </InfoCard>

          <InfoCard title="Market Dominance (10%)">
            Bitcoin dominance rising can indicate fear (flight to safety). Dominance falling suggests
            risk appetite (greed for altcoins).
          </InfoCard>

          <InfoCard title="Surveys & Trends (25%)">
            Google Trends, search volume, and survey data reflecting public interest and sentiment.
          </InfoCard>
        </Stack>

        <Callout type="tip" title="Perception's Approach">
          <InternalLink to="/bitcoin-fear-greed-index">Perception's Fear & Greed Index</InternalLink> uses
          AI-powered analysis of 650+ media sources, updated every 90 seconds. This provides a unique
          "media sentiment" perspective compared to social-focused alternatives.
        </Callout>
      </Section>

      {/* Section 4: Trading Strategies */}
      <Section id="trading-strategies" title="Trading Strategies Using Fear & Greed">
        <Paragraph>
          Here are practical ways to incorporate the index into your trading approach:
        </Paragraph>

        <Stack gap="md">
          <StrategyCard
            title="Contrarian Entry Points"
            icon={Target}
            color="purple"
            description="Look for buying opportunities when fear reaches extremes (below 20) and the index starts recovering. This doesn't mean buying blindly—confirm with price action."
          >
            <CardGrid columns={2}>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <strong className="text-green-800 dark:text-green-200 text-sm">Potential Buy Signal:</strong>
                <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                  Fear below 20 + index rising for 3+ days + price finding support
                </p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                <strong className="text-red-800 dark:text-red-200 text-sm">Potential Sell Signal:</strong>
                <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                  Greed above 80 + index falling + price showing weakness
                </p>
              </div>
            </CardGrid>
          </StrategyCard>

          <StrategyCard
            title="Position Sizing by Sentiment"
            icon={ShieldCheck}
            color="blue"
            description="Adjust your position sizes based on current sentiment levels:"
          >
            <CheckList items={[
              <><strong>Extreme fear:</strong> Consider larger position sizes (if fundamentals are strong)</>,
              <><strong>Neutral:</strong> Standard position sizes, follow your normal strategy</>,
              <><strong>Extreme greed:</strong> Reduce new positions, consider taking profits</>,
            ]} />
          </StrategyCard>

          <StrategyCard
            title="Trend Confirmation"
            icon={TrendingUp}
            color="orange"
            description="Use sentiment as trend confirmation, not prediction. Strong uptrends often feature sustained greed readings. Downtrends feature sustained fear. A shift from one extreme to another often signals a major trend change."
          />
        </Stack>
      </Section>

      {/* Section 5: Common Mistakes */}
      <Section id="common-mistakes" title="Common Mistakes to Avoid">
        <Stack gap="sm">
          <InfoCard title="Mistake #1: Using It as a Standalone Indicator" gradient="from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10">
            The Fear & Greed Index should be one tool among many. Never buy or sell solely
            based on sentiment readings. Combine it with technical analysis, fundamentals, and
            proper risk management.
          </InfoCard>

          <InfoCard title="Mistake #2: Fighting Extreme Trends" gradient="from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10">
            Extreme greed can last for weeks during bull runs. Extreme fear can persist during
            bear markets. Don't assume a reversal just because sentiment is extreme—confirm with
            price action first.
          </InfoCard>

          <InfoCard title="Mistake #3: Ignoring the Trend Direction" gradient="from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10">
            A reading of 30 (fear) while sentiment is rising is very different from 30 while
            sentiment is falling. Always consider whether the index is trending up or down, not
            just the absolute number.
          </InfoCard>

          <InfoCard title="Mistake #4: Checking Too Frequently" gradient="from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10">
            Daily fluctuations are noise. Focus on sustained readings over 3-7 days or longer.
            Weekly changes matter more than hourly changes for most trading strategies.
          </InfoCard>
        </Stack>
      </Section>

      {/* Section 6: FAQ */}
      <Section id="faq" title="Frequently Asked Questions">
        <Stack gap="sm">
          <FAQItem question="What is a good Fear & Greed Index score?">
            There is no universally "good" score. Extreme fear (0-25) often presents buying
            opportunities, while extreme greed (75-100) may signal caution. Neutral scores (45-55)
            suggest balanced market conditions.
          </FAQItem>

          <FAQItem question="How often is the Fear & Greed Index updated?">
            Most Fear & Greed indices update daily. <InternalLink to="/bitcoin-fear-greed-index">Perception's index</InternalLink> updates
            every 90 seconds based on real-time media sentiment analysis from 650+ sources.
          </FAQItem>

          <FAQItem question="Should I buy when Fear & Greed shows extreme fear?">
            While extreme fear has historically correlated with market bottoms, it's not a
            guaranteed buy signal. Use it as one data point alongside technical analysis,
            fundamentals, and risk management. Never "catch a falling knife" without confirmation.
          </FAQItem>

          <FAQItem question="Why do different Fear & Greed indices show different numbers?">
            Each provider uses different data sources and methodologies. Some focus on social media,
            others on media sentiment, others on on-chain data. It's useful to compare multiple
            indices for a more complete picture.
          </FAQItem>
        </Stack>
      </Section>
    </LearnArticleLayout>
  );
}
