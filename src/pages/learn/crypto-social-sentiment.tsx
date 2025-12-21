import { MessageSquare, Twitter, Users, TrendingUp, AlertTriangle, BarChart3, Search, Zap, Target } from 'lucide-react';
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
  FAQItem,
  InternalLink,
} from '@/components/learn';

export default function CryptoSocialSentimentPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is crypto social sentiment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Crypto social sentiment measures the collective mood, opinions, and emotions expressed about cryptocurrencies on social media platforms like Twitter/X, Reddit, Telegram, and Discord. It helps traders gauge market psychology and potential price movements.'
        }
      },
      {
        '@type': 'Question',
        name: 'How is social sentiment measured?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Social sentiment is measured using natural language processing (NLP) and machine learning algorithms that analyze text from social media posts. These tools classify posts as positive, negative, or neutral, and aggregate the results into sentiment scores or indices.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is social sentiment a reliable trading indicator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Social sentiment can be a useful supplementary indicator but should not be used alone. It is best combined with price action, on-chain data, and media sentiment for a more complete picture. Social sentiment is particularly prone to noise, bots, and manipulation.'
        }
      }
    ]
  };

  return (
    <LearnArticleLayout
      title="Understanding Crypto Social Sentiment"
      metaTitle="Crypto Social Sentiment Analysis Guide 2025 | Perception"
      description="Learn how to analyze and interpret crypto social sentiment from Twitter, Reddit, and Telegram. Understand the signals, avoid the noise, and improve your trading decisions."
      keywords={[
        'crypto social sentiment',
        'bitcoin twitter sentiment',
        'crypto reddit sentiment',
        'social media crypto analysis',
        'crypto sentiment trading',
        'twitter crypto signals'
      ]}
      url="https://perception.to/learn/crypto-social-sentiment"
      category="Research"
      categoryIcon={MessageSquare}
      readTime="9 min read"
      tableOfContents={[
        { id: 'what-is-social-sentiment', title: 'What is Social Sentiment?' },
        { id: 'data-sources', title: 'Key Data Sources' },
        { id: 'how-its-measured', title: 'How Social Sentiment is Measured' },
        { id: 'interpreting-signals', title: 'Interpreting Social Signals' },
        { id: 'limitations', title: 'Limitations & Pitfalls' },
        { id: 'best-practices', title: 'Best Practices for Traders' },
        { id: 'faq', title: 'Frequently Asked Questions' },
      ]}
      nextArticle={undefined}
      relatedArticles={[
        { slug: 'what-is-crypto-sentiment-analysis', title: 'What is Crypto Sentiment Analysis?', description: 'Complete guide to understanding market sentiment.' },
        { slug: 'bitcoin-market-psychology', title: 'Bitcoin Market Psychology', description: 'Understand FOMO, FUD, and market cycles.' },
      ]}
      additionalSchema={[faqSchema]}
    >
      {/* Section 1: What is Social Sentiment */}
      <Section id="what-is-social-sentiment" title="What is Social Sentiment?">
        <Paragraph>
          <strong>Social sentiment</strong> refers to the collective mood, opinions, and emotions
          expressed about cryptocurrencies on social media platforms. It's a real-time pulse of
          what retail traders, influencers, and the crypto community are thinking and feeling.
        </Paragraph>
        <Paragraph>
          Unlike traditional market indicators that look at price and volume, social sentiment
          captures the <strong>human side of markets</strong>—the fear, excitement, skepticism,
          and euphoria that drive buying and selling decisions.
        </Paragraph>

        <Callout type="insight" title="Why Social Sentiment Matters">
          Crypto markets are uniquely social. A viral tweet can move prices. Reddit communities
          can coordinate buying pressure. Telegram groups spread narratives. Understanding social
          sentiment helps you anticipate these moves—or at least not be caught off guard by them.
        </Callout>

        <ComparisonGrid
          left={{
            title: 'Social Sentiment Shows',
            items: [
              'Real-time retail mood',
              'Emerging narratives and trends',
              'Influencer impact and reach',
              'Community enthusiasm levels',
              'Viral moments before price impact',
            ],
          }}
          right={{
            title: 'Social Sentiment Misses',
            items: [
              'Institutional positioning',
              'Fundamental value',
              'Long-term trends',
              'Whale behavior (they don\'t tweet)',
              'Manipulation and bot activity',
            ],
          }}
          leftColor="green"
          rightColor="red"
        />
      </Section>

      {/* Section 2: Data Sources */}
      <Section id="data-sources" title="Key Data Sources">
        <Paragraph>
          Different social platforms attract different types of crypto participants. Understanding
          each platform's characteristics helps you interpret the signals correctly.
        </Paragraph>

        <Stack gap="md">
          <InfoCard title="Twitter/X" icon={Twitter}>
            <p className="mb-3">
              The epicenter of crypto discourse. Where narratives are born, news breaks first,
              and influencers shape opinion.
            </p>
            <ul className="text-sm space-y-1">
              <li><strong>Who's there:</strong> Influencers, traders, projects, VCs, journalists</li>
              <li><strong>Signal quality:</strong> High volume, mixed quality, fast-moving</li>
              <li><strong>Best for:</strong> Breaking news, narrative tracking, influencer sentiment</li>
              <li><strong>Watch out for:</strong> Paid promotions, engagement farming, bot activity</li>
            </ul>
          </InfoCard>

          <InfoCard title="Reddit" icon={Users}>
            <p className="mb-3">
              Community-driven discussions with longer-form content. Subreddits like r/Bitcoin,
              r/CryptoCurrency, and r/ethtrader have millions of members.
            </p>
            <ul className="text-sm space-y-1">
              <li><strong>Who's there:</strong> Retail investors, enthusiasts, newcomers</li>
              <li><strong>Signal quality:</strong> Higher quality discussions, slower-moving</li>
              <li><strong>Best for:</strong> Community sentiment, retail mood, emerging interest</li>
              <li><strong>Watch out for:</strong> Echo chambers, coordinated campaigns (GME-style)</li>
            </ul>
          </InfoCard>

          <InfoCard title="Telegram & Discord" icon={MessageSquare}>
            <p className="mb-3">
              Private and semi-private communities. Project-specific groups, trading communities,
              and alpha groups.
            </p>
            <ul className="text-sm space-y-1">
              <li><strong>Who's there:</strong> Hardcore traders, project communities, insiders</li>
              <li><strong>Signal quality:</strong> Can be very high or very low depending on group</li>
              <li><strong>Best for:</strong> Project-specific sentiment, alpha leaks, community health</li>
              <li><strong>Watch out for:</strong> Pump groups, scams, insider manipulation</li>
            </ul>
          </InfoCard>
        </Stack>
      </Section>

      {/* Section 3: How It's Measured */}
      <Section id="how-its-measured" title="How Social Sentiment is Measured">
        <Paragraph>
          Social sentiment analysis uses technology to process vast amounts of text data and
          extract meaningful signals. Here's how it works:
        </Paragraph>

        <StepList
          steps={[
            {
              title: 'Data Collection',
              description: 'APIs and web scrapers collect posts, tweets, comments, and messages from social platforms. Tools may track millions of posts per day.'
            },
            {
              title: 'Natural Language Processing (NLP)',
              description: 'AI models analyze text to understand context and meaning. Is a tweet positive, negative, or neutral? Is it about price, technology, or news?'
            },
            {
              title: 'Sentiment Classification',
              description: 'Each piece of content is scored. Simple models use positive/negative/neutral. Advanced models detect emotions like fear, excitement, or skepticism.'
            },
            {
              title: 'Aggregation & Weighting',
              description: 'Individual scores are combined into aggregate metrics. Some tools weight by influence (follower count) or engagement (likes, retweets).'
            },
            {
              title: 'Visualization & Alerts',
              description: 'Results are presented as scores, charts, or alerts. Sudden spikes in sentiment can trigger notifications.'
            },
          ]}
        />

        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 mt-6 sm:mt-8">Common Metrics</h3>

        <CardGrid columns={2}>
          <InfoCard title="Sentiment Score">
            A number (often 0-100 or -100 to +100) representing overall positivity or negativity.
            Higher = more bullish sentiment.
          </InfoCard>
          <InfoCard title="Social Volume">
            Total number of mentions or posts about a coin. Spikes often precede or accompany
            price moves.
          </InfoCard>
          <InfoCard title="Social Dominance">
            What percentage of total crypto social conversation is about a specific coin.
            Similar concept to market cap dominance.
          </InfoCard>
          <InfoCard title="Weighted Sentiment">
            Sentiment weighted by influence. A bullish tweet from a major influencer counts
            more than random accounts.
          </InfoCard>
        </CardGrid>
      </Section>

      {/* Section 4: Interpreting Signals */}
      <Section id="interpreting-signals" title="Interpreting Social Signals">
        <Paragraph>
          Raw social sentiment data needs interpretation. Here's how to read the signals:
        </Paragraph>

        <Stack gap="md">
          <InfoCard title="Sentiment Spikes" icon={Zap}>
            <p className="mb-3">Sudden increases in social activity often signal something important:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Bullish spike + price rise:</strong> Confirmation of move, may continue</li>
              <li><strong>Bullish spike + flat price:</strong> Potential leading indicator, watch for breakout</li>
              <li><strong>Bearish spike + price drop:</strong> Fear spreading, may be oversold soon</li>
              <li><strong>Volume spike + neutral sentiment:</strong> News event, wait for direction</li>
            </ul>
          </InfoCard>

          <InfoCard title="Sentiment Divergence" icon={TrendingUp}>
            <p className="mb-3">When sentiment and price move in opposite directions:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Price rising + sentiment falling:</strong> Smart money selling into retail buying? Potential top.</li>
              <li><strong>Price falling + sentiment rising:</strong> Dip buyers accumulating? Potential bottom.</li>
              <li>Divergences often precede reversals but require confirmation</li>
            </ul>
          </InfoCard>

          <InfoCard title="Sentiment Extremes" icon={Target}>
            <p className="mb-3">Extreme readings often signal contrarian opportunities:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Extreme bullishness:</strong> Everyone already bought. Who's left to buy?</li>
              <li><strong>Extreme bearishness:</strong> Everyone already sold. Who's left to sell?</li>
              <li>Combine with <InternalLink to="/bitcoin-fear-greed-index">Fear & Greed Index</InternalLink> for confirmation</li>
            </ul>
          </InfoCard>
        </Stack>

        <Callout type="tip" title="Pro Tip">
          The most valuable signals come from <strong>changes</strong> in sentiment, not absolute levels.
          A shift from bearish to neutral can be more significant than sustained bullishness.
        </Callout>
      </Section>

      {/* Section 5: Limitations */}
      <Section id="limitations" title="Limitations & Pitfalls">
        <Paragraph>
          Social sentiment analysis has significant limitations. Understanding these helps you
          avoid costly mistakes:
        </Paragraph>

        <Stack gap="sm">
          <InfoCard title="Bot Activity" icon={AlertTriangle} gradient="from-red-500/15 via-slate-600/10 to-zinc-700/15">
            <p>
              A significant portion of crypto social media activity comes from bots. These can
              artificially inflate metrics and create false signals. Quality tools try to filter
              bots, but it's an ongoing arms race.
            </p>
          </InfoCard>

          <InfoCard title="Paid Promotions" icon={AlertTriangle} gradient="from-red-500/15 via-slate-600/10 to-zinc-700/15">
            <p>
              Influencers are often paid to promote projects without disclosure. This creates
              artificially positive sentiment that doesn't reflect genuine interest. Be skeptical
              of sudden coordinated bullishness.
            </p>
          </InfoCard>

          <InfoCard title="Echo Chambers" icon={AlertTriangle} gradient="from-red-500/15 via-slate-600/10 to-zinc-700/15">
            <p>
              Crypto communities tend to be echo chambers. Bullish communities stay bullish even
              as prices crash. Bearish communities miss rallies. Social sentiment often reflects
              existing beliefs, not objective reality.
            </p>
          </InfoCard>

          <InfoCard title="Lagging Indicator" icon={AlertTriangle} gradient="from-red-500/15 via-slate-600/10 to-zinc-700/15">
            <p>
              Social sentiment often peaks <em>after</em> price moves, not before. By the time
              everyone is bullish on social media, the smart money has already bought. It's often
              a lagging, not leading, indicator.
            </p>
          </InfoCard>

          <InfoCard title="Manipulation" icon={AlertTriangle} gradient="from-red-500/15 via-slate-600/10 to-zinc-700/15">
            <p>
              Bad actors can coordinate to manipulate social sentiment. Pump groups create fake
              hype. FUD campaigns spread fear. Always question sudden sentiment shifts, especially
              for smaller coins.
            </p>
          </InfoCard>
        </Stack>
      </Section>

      {/* Section 6: Best Practices */}
      <Section id="best-practices" title="Best Practices for Traders">
        <Paragraph>
          Here's how to use social sentiment effectively in your trading:
        </Paragraph>

        <CardGrid columns={2}>
          <InfoCard title="Combine Multiple Sources" icon={Layers}>
            Don't rely on social sentiment alone. Combine with media sentiment, on-chain data,
            and technical analysis. The more data points that align, the stronger the signal.
          </InfoCard>
          <InfoCard title="Focus on Changes" icon={TrendingUp}>
            Track changes in sentiment over time, not just absolute levels. A shift from -20 to +10
            is more meaningful than a steady +50. Rate of change matters.
          </InfoCard>
          <InfoCard title="Filter for Quality" icon={Search}>
            Pay more attention to sentiment from credible accounts with track records. Random
            Twitter accounts and new Reddit users are more likely to be noise or manipulation.
          </InfoCard>
          <InfoCard title="Use as Confirmation" icon={BarChart3}>
            Use social sentiment to confirm other signals, not as a primary indicator. If
            technicals and sentiment align, you have higher conviction.
          </InfoCard>
        </CardGrid>

        <Callout type="insight" title="Media Sentiment vs Social Sentiment">
          <p>
            <strong>Media sentiment</strong> (from news outlets, analysts, and publications) tends to be
            higher quality than raw social sentiment. Media has editorial standards and reputation at stake.
            <InternalLink to="/bitcoin-media-research"> Perception's Media Research</InternalLink> analyzes
            650+ sources to provide cleaner sentiment signals than social media alone.
          </p>
        </Callout>
      </Section>

      {/* Section 7: FAQ */}
      <Section id="faq" title="Frequently Asked Questions">
        <Stack gap="sm">
          <FAQItem question="What is crypto social sentiment?">
            Crypto social sentiment measures the collective mood, opinions, and emotions
            expressed about cryptocurrencies on social media platforms like Twitter/X, Reddit,
            Telegram, and Discord. It helps traders gauge market psychology and potential price movements.
          </FAQItem>

          <FAQItem question="How is social sentiment measured?">
            Social sentiment is measured using natural language processing (NLP) and machine
            learning algorithms that analyze text from social media posts. These tools classify
            posts as positive, negative, or neutral, and aggregate the results into sentiment
            scores or indices.
          </FAQItem>

          <FAQItem question="Is social sentiment a reliable trading indicator?">
            Social sentiment can be a useful supplementary indicator but should not be used alone.
            It is best combined with price action, on-chain data, and media sentiment for a more
            complete picture. Social sentiment is particularly prone to noise, bots, and manipulation.
          </FAQItem>

          <FAQItem question="What are the best social sentiment tools?">
            Popular tools include LunarCrush (social-focused), Santiment (social + on-chain),
            and The TIE. For media sentiment specifically, <InternalLink to="/compare/best-crypto-sentiment-tools">Perception</InternalLink> analyzes
            650+ news sources. See our <InternalLink to="/compare/best-crypto-sentiment-tools">comparison guide</InternalLink> for details.
          </FAQItem>

          <FAQItem question="How do I avoid false signals from social sentiment?">
            Cross-reference with multiple data sources, focus on credible accounts, look for
            sentiment changes rather than absolute levels, and be skeptical of sudden coordinated
            movements. Never trade on social sentiment alone.
          </FAQItem>
        </Stack>
      </Section>
    </LearnArticleLayout>
  );
}
