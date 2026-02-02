import { PieChart, TrendingUp, TrendingDown, BarChart3, AlertTriangle, Target, Layers, ArrowRightLeft } from 'lucide-react';
import {
  LearnArticleLayout,
  Section,
  Paragraph,
  Callout,
  InfoCard,
  CardGrid,
  StepList,
  PhaseCard,
  StrategyCard,
  CheckList,
  Stack,
  FAQItem,
  InternalLink,
} from '@/components/learn';

export default function UnderstandingBitcoinDominancePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Bitcoin dominance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bitcoin dominance is the percentage of the total cryptocurrency market capitalization that Bitcoin represents. If the total crypto market cap is $2 trillion and Bitcoin is worth $1 trillion, Bitcoin dominance is 50%.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is high Bitcoin dominance bullish or bearish?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends on context. Rising Bitcoin dominance during a market downturn often signals a flight to safety (bearish for altcoins). Rising dominance during a bull market can signal early cycle strength. Falling dominance during a bull run often indicates "alt season" where altcoins outperform Bitcoin.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is a good Bitcoin dominance level?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There is no universally "good" level. Bitcoin dominance has ranged from 33% (January 2018) to over 70% (2019-2020). Most traders watch for extremes and trend changes rather than absolute levels.'
        }
      }
    ]
  };

  return (
    <LearnArticleLayout
      title="Understanding Bitcoin Dominance"
      metaTitle="Understanding Bitcoin Dominance: Complete Guide 2025 | Perception"
      description="Learn what Bitcoin dominance means, how to interpret changes in BTC.D, and how to use this metric in your trading strategy for better market timing."
      keywords={[
        'bitcoin dominance',
        'btc dominance',
        'bitcoin dominance explained',
        'btc.d trading',
        'bitcoin market cap',
        'altcoin season indicator'
      ]}
      url="https://perception.to/learn/understanding-bitcoin-dominance"
      category="Fundamentals"
      categoryIcon={PieChart}
      readTime="8 min read"
      tableOfContents={[
        { id: 'what-is-btc-dominance', title: 'What is Bitcoin Dominance?' },
        { id: 'how-its-calculated', title: 'How Bitcoin Dominance is Calculated' },
        { id: 'interpreting-changes', title: 'Interpreting Dominance Changes' },
        { id: 'dominance-and-cycles', title: 'Dominance and Market Cycles' },
        { id: 'trading-strategies', title: 'Trading Strategies Using BTC.D' },
        { id: 'faq', title: 'Frequently Asked Questions' },
      ]}
      nextArticle={{ slug: 'crypto-social-sentiment', title: 'Understanding Crypto Social Sentiment' }}
      relatedArticles={[
        { slug: 'bitcoin-market-psychology', title: 'Bitcoin Market Psychology', description: 'Understand FOMO, FUD, and market cycles.' },
        { slug: 'crypto-narrative-trading', title: 'Crypto Narrative Trading', description: 'Identify and trade emerging market narratives.' },
        { slug: 'what-is-crypto-sentiment-analysis', title: 'What is Crypto Sentiment Analysis?', description: 'Complete guide to understanding market sentiment.' },
      ]}
      additionalSchema={[faqSchema]}
    >
      {/* Section 1: What is Bitcoin Dominance */}
      <Section id="what-is-btc-dominance" title="What is Bitcoin Dominance?">
        <Paragraph>
          <strong>Bitcoin dominance</strong> (often abbreviated as BTC.D) is a metric that shows
          Bitcoin's market capitalization as a percentage of the total cryptocurrency market cap.
          It tells you how much of the crypto market's total value is concentrated in Bitcoin versus
          all other cryptocurrencies combined.
        </Paragraph>

        <div className="bg-gradient-to-br from-orange-500/15 via-slate-600/10 to-zinc-700/15 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 my-6 sm:my-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Simple Formula</p>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              Bitcoin Dominance = (Bitcoin Market Cap / Total Crypto Market Cap) × 100
            </p>
          </div>
        </div>

        <Paragraph>
          For example, if the total crypto market cap is $2 trillion and Bitcoin's market cap
          is $1 trillion, Bitcoin dominance would be <strong>50%</strong>. This means Bitcoin
          represents half of all value in the cryptocurrency market.
        </Paragraph>

        <Callout type="insight" title="Why It Matters">
          Bitcoin dominance is a key indicator of <strong>risk appetite</strong> in crypto markets.
          When dominance rises, investors are favoring the "safer" asset (Bitcoin). When it falls,
          capital is flowing into riskier altcoins, often a sign of speculative excess or "alt season."
        </Callout>
      </Section>

      {/* Section 2: How It's Calculated */}
      <Section id="how-its-calculated" title="How Bitcoin Dominance is Calculated">
        <Paragraph>
          The calculation is straightforward, but there are some nuances to understand:
        </Paragraph>

        <StepList
          steps={[
            {
              title: 'Bitcoin Market Cap',
              description: 'Current BTC price × circulating supply of Bitcoin (~19.5 million BTC as of 2025).'
            },
            {
              title: 'Total Crypto Market Cap',
              description: 'Sum of market caps of all cryptocurrencies. Different data providers may include different coins.'
            },
            {
              title: 'Calculate Percentage',
              description: 'Divide Bitcoin market cap by total market cap and multiply by 100.'
            },
          ]}
        />

        <Callout type="warning" title="Data Provider Differences">
          Different platforms (CoinGecko, CoinMarketCap, TradingView) may show slightly different
          Bitcoin dominance figures. This is because they track different numbers of coins and have
          different criteria for what they include. Always use the same data source for consistency.
        </Callout>

        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 mt-6 sm:mt-8">Historical Range</h3>

        <CardGrid columns={2}>
          <InfoCard title="All-Time High: ~95%" icon={TrendingUp}>
            In Bitcoin's early years (2013-2014), it dominated the market almost entirely. Few
            altcoins existed with meaningful market caps.
          </InfoCard>
          <InfoCard title="All-Time Low: ~33%" icon={TrendingDown}>
            During the January 2018 altcoin mania, Bitcoin dominance fell to around 33% as
            ICO tokens and altcoins exploded in value.
          </InfoCard>
        </CardGrid>
      </Section>

      {/* Section 3: Interpreting Changes */}
      <Section id="interpreting-changes" title="Interpreting Dominance Changes">
        <Paragraph>
          Bitcoin dominance changes tell you where capital is flowing within the crypto market.
          Here's how to interpret different scenarios:
        </Paragraph>

        <Stack gap="md">
          <StrategyCard
            title="Rising Dominance + Rising BTC Price"
            icon={TrendingUp}
            color="green"
            description="Capital is flowing into Bitcoin specifically. Often seen in early bull markets or during 'flight to quality' moves. Altcoins may lag or underperform."
          >
            <CheckList items={[
              'Early bull market signal - Bitcoin leads, alts follow later',
              'Institutional buying (they prefer BTC)',
              'Consider overweighting Bitcoin vs altcoins',
            ]} />
          </StrategyCard>

          <StrategyCard
            title="Falling Dominance + Rising Prices"
            icon={Layers}
            color="blue"
            description="'Alt season' - capital rotating from Bitcoin into altcoins. Altcoins outperforming Bitcoin. Often seen in mid-to-late bull markets."
          >
            <CheckList items={[
              'Risk appetite increasing',
              'Speculation heating up',
              'Consider taking some BTC profits into select alts',
              'Watch for euphoria signals (may indicate cycle peak)',
            ]} />
          </StrategyCard>

          <StrategyCard
            title="Rising Dominance + Falling Prices"
            icon={AlertTriangle}
            color="orange"
            description="'Flight to safety' - market is crashing but Bitcoin is holding better than alts. Classic bear market behavior."
          >
            <CheckList items={[
              'Bear market signal - alts getting crushed',
              'Reduce altcoin exposure',
              'Bitcoin is the "safe haven" within crypto',
              'Wait for dominance to stabilize before buying alts',
            ]} />
          </StrategyCard>

          <StrategyCard
            title="Falling Dominance + Falling Prices"
            icon={TrendingDown}
            color="purple"
            description="Rare scenario - both Bitcoin and total market falling, but alts falling less. Can signal Bitcoin-specific FUD or unusual market dynamics."
          >
            <CheckList items={[
              'Unusual - investigate the cause',
              'May be Bitcoin-specific news (regulation, etc.)',
              'Not typically a good entry point for either',
            ]} />
          </StrategyCard>
        </Stack>
      </Section>

      {/* Section 4: Dominance and Market Cycles */}
      <Section id="dominance-and-cycles" title="Dominance and Market Cycles">
        <Paragraph>
          Bitcoin dominance follows predictable patterns within crypto market cycles. Understanding
          these patterns helps you anticipate market rotations.
        </Paragraph>

        <Stack gap="sm">
          <PhaseCard
            number={1}
            title="Bear Market Bottom"
            color="slate"
            icon={BarChart3}
            description="Bitcoin dominance typically rises as weak altcoins die off and capital consolidates in BTC. Dominance often peaks around 60-70% at cycle bottoms."
            signal="High dominance (60%+), low prices, extreme fear sentiment"
          />
          <PhaseCard
            number={2}
            title="Early Bull Market"
            color="blue"
            icon={TrendingUp}
            description="Bitcoin leads the recovery. Dominance stays high or rises slightly as BTC outperforms. Smart money accumulates Bitcoin first."
            signal="Rising BTC price, stable/rising dominance, improving sentiment"
          />
          <PhaseCard
            number={3}
            title="Mid Bull Market"
            color="green"
            icon={ArrowRightLeft}
            description="Capital starts rotating into large-cap altcoins (ETH, SOL). Dominance begins declining. 'Alt season' narratives emerge."
            signal="Falling dominance, rising altcoin prices, increasing speculation"
          />
          <PhaseCard
            number={4}
            title="Late Bull Market / Euphoria"
            color="yellow"
            icon={AlertTriangle}
            description="Dominance falls sharply as retail piles into small-cap altcoins and meme coins. Peak speculation. Often marks the cycle top."
            signal="Low dominance (40-45%), extreme greed, 'this time is different' narratives"
          />
          <PhaseCard
            number={5}
            title="Bear Market Begins"
            color="red"
            icon={TrendingDown}
            description="Dominance rises sharply as altcoins crash harder than Bitcoin. Flight to quality. The cycle resets."
            signal="Rising dominance, falling prices, denial turning to fear"
          />
        </Stack>

        <Callout type="tip" title="Pro Tip">
          Combine Bitcoin dominance with the <InternalLink to="/bitcoin-fear-greed-index">Fear & Greed Index</InternalLink> for
          better cycle timing. Low dominance + extreme greed often signals cycle tops. High dominance +
          extreme fear often signals cycle bottoms.
        </Callout>
      </Section>

      {/* Section 5: Trading Strategies */}
      <Section id="trading-strategies" title="Trading Strategies Using BTC.D">
        <Paragraph>
          Here's how traders use Bitcoin dominance in their strategies:
        </Paragraph>

        <Stack gap="md">
          <InfoCard title="Portfolio Rotation Strategy" icon={ArrowRightLeft}>
            <p className="mb-3">
              Adjust your Bitcoin vs altcoin allocation based on dominance trends:
            </p>
            <ul className="text-sm space-y-1">
              <li><strong>Rising dominance:</strong> Increase BTC allocation to 60-80%</li>
              <li><strong>Stable dominance:</strong> Balanced allocation 50/50</li>
              <li><strong>Falling dominance:</strong> Increase altcoin allocation to 60-70%</li>
            </ul>
          </InfoCard>

          <InfoCard title="Altcoin Entry Timing" icon={Target}>
            <p className="mb-3">
              Use dominance to time altcoin entries:
            </p>
            <ul className="text-sm space-y-1">
              <li><strong>Best altcoin entries:</strong> When dominance peaks and starts falling</li>
              <li><strong>Avoid altcoin entries:</strong> When dominance is rising sharply</li>
              <li><strong>Take altcoin profits:</strong> When dominance reaches cycle lows (40-45%)</li>
            </ul>
          </InfoCard>

          <InfoCard title="Pairs Trading" icon={BarChart3}>
            <p className="mb-3">
              Trade the BTC/altcoin relationship:
            </p>
            <ul className="text-sm space-y-1">
              <li><strong>Long BTC/Short Alts:</strong> When dominance is rising</li>
              <li><strong>Long Alts/Short BTC:</strong> When dominance is falling (advanced)</li>
              <li>Use ETH/BTC ratio as a proxy for this trade</li>
            </ul>
          </InfoCard>
        </Stack>

        <Callout type="warning" title="Risk Warning">
          Bitcoin dominance is one indicator among many. Don't make allocation decisions based on
          dominance alone. Combine with price action, sentiment data, and fundamental analysis.
          Past cycles don't guarantee future patterns.
        </Callout>
      </Section>

      {/* Section 6: FAQ */}
      <Section id="faq" title="Frequently Asked Questions">
        <Stack gap="sm">
          <FAQItem question="What is Bitcoin dominance?">
            Bitcoin dominance is the percentage of the total cryptocurrency market capitalization
            that Bitcoin represents. If the total crypto market cap is $2 trillion and Bitcoin is
            worth $1 trillion, Bitcoin dominance is 50%.
          </FAQItem>

          <FAQItem question="Is high Bitcoin dominance bullish or bearish?">
            It depends on context. Rising Bitcoin dominance during a market downturn often signals
            a flight to safety (bearish for altcoins). Rising dominance during a bull market can
            signal early cycle strength. Falling dominance during a bull run often indicates
            "alt season" where altcoins outperform Bitcoin.
          </FAQItem>

          <FAQItem question="What is a good Bitcoin dominance level?">
            There is no universally "good" level. Bitcoin dominance has ranged from 33% (January 2018)
            to over 70% (2019-2020). Most traders watch for extremes and trend changes rather than
            absolute levels.
          </FAQItem>

          <FAQItem question="Where can I track Bitcoin dominance?">
            You can track BTC dominance on TradingView (symbol: BTC.D), CoinGecko, CoinMarketCap,
            or most crypto data platforms. TradingView allows you to chart it with technical indicators.
          </FAQItem>

          <FAQItem question="Does Bitcoin dominance include stablecoins?">
            This varies by platform. Some include stablecoins (USDT, USDC) in total market cap,
            others exclude them. Including stablecoins can make dominance appear lower. Check your
            data source's methodology.
          </FAQItem>
        </Stack>
      </Section>
    </LearnArticleLayout>
  );
}
