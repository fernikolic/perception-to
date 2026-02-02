import { Brain, BarChart3, MessageSquare, Newspaper, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LearnArticleLayout,
  Section,
  Paragraph,
  Callout,
  InfoCard,
  CardGrid,
  StepList,
  ComparisonGrid,
  Stack,
  InternalLink,
} from '@/components/learn';

export default function WhatIsCryptoSentimentAnalysisPage() {
  return (
    <LearnArticleLayout
      title="What is Crypto Sentiment Analysis?"
      metaTitle="What is Crypto Sentiment Analysis? Complete Guide 2025 | Perception"
      description="A complete guide to understanding market sentiment, how it's measured, and why it matters for your crypto trading and investment decisions."
      keywords={[
        'what is crypto sentiment analysis',
        'crypto sentiment explained',
        'bitcoin sentiment analysis',
        'market sentiment crypto',
        'sentiment trading crypto'
      ]}
      url="https://perception.to/learn/what-is-crypto-sentiment-analysis"
      category="Fundamentals"
      categoryIcon={Brain}
      readTime="8 min read"
      tableOfContents={[
        { id: 'what-is-sentiment', title: 'What is Crypto Sentiment Analysis?' },
        { id: 'why-it-matters', title: 'Why Sentiment Analysis Matters' },
        { id: 'types-of-sentiment', title: 'Types of Sentiment Data' },
        { id: 'how-its-measured', title: 'How Sentiment is Measured' },
        { id: 'using-sentiment', title: 'Using Sentiment in Your Strategy' },
        { id: 'tools', title: 'Best Sentiment Analysis Tools' },
      ]}
      nextArticle={{ slug: 'how-to-read-fear-greed-index', title: 'How to Read the Fear & Greed Index' }}
      relatedArticles={[
        { slug: 'how-to-read-fear-greed-index', title: 'How to Read the Fear & Greed Index', description: 'Learn to interpret each score range and use it in your trading.' },
        { slug: 'bitcoin-market-psychology', title: 'Bitcoin Market Psychology', description: 'Understand FOMO, FUD, and market cycles.' },
        { slug: 'crypto-narrative-trading', title: 'Crypto Narrative Trading', description: 'Identify and trade emerging market narratives.' },
      ]}
    >
      {/* Section 1: What is Sentiment */}
      <Section id="what-is-sentiment" title="What is Crypto Sentiment Analysis?">
        <Paragraph>
          <strong>Crypto sentiment analysis</strong> is the process of measuring and interpreting the collective mood,
          emotions, and opinions of market participants toward cryptocurrencies. It answers the question:
          <em> "What does the market feel about Bitcoin right now?"</em>
        </Paragraph>
        <Paragraph>
          Unlike technical analysis (which looks at price charts) or fundamental analysis (which examines
          underlying value), sentiment analysis focuses on <strong>market psychology</strong>, the fear,
          greed, optimism, and pessimism that drive buying and selling decisions.
        </Paragraph>
        <Callout type="insight" title="Key Insight">
          Markets are driven by emotions. Fear causes panic selling. Greed inflates bubbles.
          Sentiment analysis helps you understand these emotional cycles and make better-informed decisions.
        </Callout>
      </Section>

      {/* Section 2: Why it Matters */}
      <Section id="why-it-matters" title="Why Sentiment Analysis Matters">
        <Paragraph>
          In traditional finance, legendary investors like Warren Buffett have long advised to
          "be fearful when others are greedy and greedy when others are fearful." Sentiment analysis
          gives you the data to actually measure when others are fearful or greedy.
        </Paragraph>

        <ComparisonGrid
          left={{
            title: 'What Sentiment Shows',
            items: [
              'Market extremes (fear/greed peaks)',
              'Sentiment shifts before price moves',
              'Narrative momentum and trends',
              'Contrarian opportunities',
            ],
          }}
          right={{
            title: "What It Doesn't Show",
            items: [
              'Guaranteed price direction',
              'Exact entry/exit points',
              'Long-term fundamental value',
              'Black swan events',
            ],
          }}
          leftColor="green"
          rightColor="red"
        />

        <Paragraph>
          Crypto markets are particularly sentiment-driven because they trade 24/7, attract retail investors,
          and are heavily influenced by social media. A single tweet can move markets. Understanding
          sentiment gives you an edge in this environment.
        </Paragraph>
      </Section>

      {/* Section 3: Types of Sentiment */}
      <Section id="types-of-sentiment" title="Types of Sentiment Data">
        <Paragraph>
          Not all sentiment data is created equal. Different sources tell you different things
          about different market participants.
        </Paragraph>

        <Stack gap="md">
          <InfoCard title="Social Sentiment" icon={MessageSquare}>
            <p className="mb-2">What retail traders are saying on Twitter, Reddit, Telegram, and Discord.</p>
            <ul className="text-sm space-y-1">
              <li><strong>Pros:</strong> High volume, real-time, shows retail mood</li>
              <li><strong>Cons:</strong> Noisy, bot activity, echo chambers</li>
              <li><strong>Best tools:</strong> LunarCrush, Santiment</li>
            </ul>
          </InfoCard>

          <InfoCard title="Media Sentiment" icon={Newspaper}>
            <p className="mb-2">What journalists, analysts, and publications are reporting, from Bloomberg to CoinDesk.</p>
            <ul className="text-sm space-y-1">
              <li><strong>Pros:</strong> Higher signal quality, institutional focus, narrative tracking</li>
              <li><strong>Cons:</strong> Slower than social, requires AI to process at scale</li>
              <li><strong>Best tools:</strong> Perception (450+ sources)</li>
            </ul>
          </InfoCard>

          <InfoCard title="On-Chain Sentiment" icon={BarChart3}>
            <p className="mb-2">What blockchain data reveals about holder behavior, accumulation, distribution, whale movements.</p>
            <ul className="text-sm space-y-1">
              <li><strong>Pros:</strong> Shows actual behavior, not just talk</li>
              <li><strong>Cons:</strong> Complex to interpret, lagging indicator</li>
              <li><strong>Best tools:</strong> Santiment, Glassnode</li>
            </ul>
          </InfoCard>

          <InfoCard title="Composite Indices" icon={TrendingUp}>
            <p className="mb-2">Aggregated scores like the Fear & Greed Index that combine multiple sentiment signals.</p>
            <ul className="text-sm space-y-1">
              <li><strong>Pros:</strong> Easy to understand, single score</li>
              <li><strong>Cons:</strong> Loses nuance, methodology varies</li>
              <li><strong>Best tools:</strong> Perception, Alternative.me</li>
            </ul>
          </InfoCard>
        </Stack>
      </Section>

      {/* Section 4: How it's Measured */}
      <Section id="how-its-measured" title="How Sentiment is Measured">
        <Paragraph>
          Modern sentiment analysis uses a combination of techniques to process vast amounts of data:
        </Paragraph>

        <StepList
          steps={[
            {
              title: 'Data Collection',
              description: 'Crawling social media, news sites, forums, and other sources to gather text data. Tools like Perception monitor 650+ media sources in real-time.',
            },
            {
              title: 'Natural Language Processing (NLP)',
              description: 'AI models analyze text to understand context, tone, and meaning. Is a tweet positive, negative, or neutral? Is an article bullish or bearish?',
            },
            {
              title: 'Scoring & Weighting',
              description: "Not all sources are equal. A Bloomberg article carries more weight than a random tweet. Professional tools weight sources by credibility and reach.",
            },
            {
              title: 'Index Calculation',
              description: 'Individual sentiment scores are aggregated into indices like Fear & Greed (0-100). Velocity metrics show how fast sentiment is changing.',
            },
          ]}
        />
      </Section>

      {/* Section 5: Using Sentiment */}
      <Section id="using-sentiment" title="Using Sentiment in Your Strategy">
        <Paragraph>
          Sentiment data is most powerful when combined with other analysis. Here's how traders use it:
        </Paragraph>

        <Stack gap="sm">
          <InfoCard title="Contrarian Signals">
            Extreme fear often precedes bottoms. Extreme greed often precedes tops. Use sentiment
            extremes as contrarian indicators, but always confirm with price action.
          </InfoCard>

          <InfoCard title="Sentiment Divergence">
            When price is rising but sentiment is falling (or vice versa), a reversal may be coming.
            This divergence can signal that the current trend is losing steam.
          </InfoCard>

          <InfoCard title="Narrative Tracking">
            Identify emerging narratives before they go mainstream. If media coverage of a topic
            is accelerating, related assets may follow. Early narrative detection = early positioning.
          </InfoCard>

          <InfoCard title="Risk Management">
            Extreme greed = time to reduce position size or take profits. Extreme fear = time to
            look for opportunities, but don't catch falling knives without confirmation.
          </InfoCard>
        </Stack>

        <Callout type="warning" title="Important Warning">
          Sentiment analysis is one tool among many. It should never be your only decision factor.
          Markets can remain irrational longer than you can remain solvent. Always use proper risk management.
        </Callout>
      </Section>

      {/* Section 6: Tools */}
      <Section id="tools" title="Best Sentiment Analysis Tools">
        <Paragraph>
          Different tools excel at different types of sentiment data. Here's how to choose:
        </Paragraph>

        <div className="overflow-x-auto mb-6 sm:mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Tool</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Best For</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-orange-50 dark:bg-orange-900/10">
                <td className="py-3 px-4 font-semibold">Perception</td>
                <td className="py-3 px-4">Media sentiment, narrative tracking</td>
                <td className="py-3 px-4">From $49/mo</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-3 px-4">LunarCrush</td>
                <td className="py-3 px-4">Social media metrics</td>
                <td className="py-3 px-4">From $99/mo</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-3 px-4">Santiment</td>
                <td className="py-3 px-4">On-chain + social data</td>
                <td className="py-3 px-4">From $49/mo</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Alternative.me</td>
                <td className="py-3 px-4">Free basic Fear & Greed</td>
                <td className="py-3 px-4">Free</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Paragraph>
          For a complete comparison, see our <InternalLink to="/compare/best-crypto-sentiment-tools">Best Crypto Sentiment Tools guide</InternalLink>.
        </Paragraph>
      </Section>
    </LearnArticleLayout>
  );
}
