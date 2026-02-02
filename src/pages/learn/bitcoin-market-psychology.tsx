import { Brain, Zap, Users, LineChart, RefreshCw, TrendingUp, TrendingDown, Target, AlertTriangle, Search } from 'lucide-react';
import {
  LearnArticleLayout,
  Section,
  Paragraph,
  Callout,
  InfoCard,
  CardGrid,
  StepList,
  PhaseCard,
  Stack,
  InternalLink,
} from '@/components/learn';

export default function BitcoinMarketPsychologyPage() {
  return (
    <LearnArticleLayout
      title="Bitcoin Market Psychology Explained"
      metaTitle="Bitcoin Market Psychology Explained: FOMO, FUD & Cycles | Perception"
      description="Understanding the emotional forces that move markets, FOMO, FUD, herd behavior, and cycle psychology, is essential for making rational decisions in irrational markets."
      keywords={[
        'bitcoin market psychology',
        'crypto fomo',
        'bitcoin fud',
        'market cycle psychology',
        'crypto trading psychology',
        'bitcoin herd behavior'
      ]}
      url="https://perception.to/learn/bitcoin-market-psychology"
      category="Psychology"
      categoryIcon={Brain}
      readTime="10 min read"
      tableOfContents={[
        { id: 'why-psychology-matters', title: 'Why Psychology Matters in Crypto' },
        { id: 'fomo', title: 'FOMO: Fear of Missing Out' },
        { id: 'fud', title: 'FUD: Fear, Uncertainty, Doubt' },
        { id: 'herd-behavior', title: 'Herd Behavior & Social Proof' },
        { id: 'market-cycles', title: 'Psychology of Market Cycles' },
        { id: 'rational-trading', title: 'Staying Rational in Emotional Markets' },
      ]}
      nextArticle={{ slug: 'crypto-narrative-trading', title: 'Crypto Narrative Trading Guide' }}
      relatedArticles={[
        { slug: 'how-to-read-fear-greed-index', title: 'How to Read the Fear & Greed Index', description: 'Practical guide to interpreting sentiment scores.' },
        { slug: 'crypto-narrative-trading', title: 'Crypto Narrative Trading', description: 'Identify and trade emerging market narratives.' },
        { slug: 'what-is-crypto-sentiment-analysis', title: 'What is Crypto Sentiment Analysis?', description: 'Complete guide to understanding market sentiment.' },
      ]}
    >
      {/* Section 1: Why Psychology Matters */}
      <Section id="why-psychology-matters" title="Why Psychology Matters in Crypto">
        <Paragraph>
          Bitcoin and cryptocurrency markets are uniquely psychological. Unlike traditional markets
          with centuries of historical data, institutional frameworks, and valuation models, crypto
          markets are driven primarily by <strong>narrative, sentiment, and human emotion</strong>.
        </Paragraph>
        <Paragraph>
          Consider these factors that amplify psychological effects:
        </Paragraph>

        <CardGrid columns={2}>
          <InfoCard title="24/7 Markets" icon={Zap}>
            No closing bell means no forced breaks from emotional decision-making.
            Price moves happen while you sleep.
          </InfoCard>
          <InfoCard title="Retail-Dominated" icon={Users}>
            Individual investors are more susceptible to emotional trading than
            institutional algorithms.
          </InfoCard>
          <InfoCard title="Extreme Volatility" icon={LineChart}>
            10-20% daily moves trigger fight-or-flight responses and impulsive
            decisions.
          </InfoCard>
          <InfoCard title="Social Media Loops" icon={RefreshCw}>
            Twitter, Telegram, and Discord create echo chambers that amplify
            sentiment extremes.
          </InfoCard>
        </CardGrid>

        <Callout type="insight" title="The Bottom Line">
          The best traders aren't the smartest, they're the most emotionally disciplined.
          Understanding market psychology gives you an edge over those trading on pure emotion.
        </Callout>
      </Section>

      {/* Section 2: FOMO */}
      <Section id="fomo" title="FOMO: Fear of Missing Out">
        <Paragraph>
          <strong>FOMO</strong> is the anxiety that others are experiencing profitable opportunities
          that you're missing. In crypto, FOMO is the primary driver of buying pressure during
          rallies and bubble formations.
        </Paragraph>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-green-200 dark:border-green-800 mb-6 sm:mb-8">
          <div className="flex items-start gap-3 sm:gap-4">
            <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-green-500 flex-shrink-0" />
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-green-800 dark:text-green-200 mb-2">How FOMO Manifests</h4>
              <ul className="text-green-700 dark:text-green-300 text-sm space-y-2">
                <li>• Buying after a 50% pump because "it's going to 100x"</li>
                <li>• Seeing friends post gains on social media and rushing to invest</li>
                <li>• Adding to positions at all-time highs instead of waiting for pullbacks</li>
                <li>• Buying meme coins because "everyone else is getting rich"</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">The FOMO Cycle</h3>

        <StepList
          accentColor="bg-green-500"
          steps={[
            { title: 'Initial Price Move', description: 'Bitcoin or an altcoin starts rising. Early investors celebrate.' },
            { title: 'Social Proof Amplifies', description: '"I made 10x!" posts go viral. Gains are shared on social media.' },
            { title: 'Media Coverage', description: 'Mainstream media covers the rally. Your uncle asks about Bitcoin.' },
            { title: 'FOMO Peak', description: 'Maximum buying pressure from latecomers. Usually near the top.' },
            { title: 'Reversal', description: 'Early investors sell to FOMO buyers. Price crashes. Regret follows.' },
          ]}
        />

        <Callout type="warning" title="FOMO Defense Strategy">
          Have a pre-defined investment thesis and position sizes BEFORE rallies happen.
          If you missed the initial move, wait for a pullback rather than chasing. The best
          opportunities come when everyone has given up, not when everyone is excited.
        </Callout>
      </Section>

      {/* Section 3: FUD */}
      <Section id="fud" title="FUD: Fear, Uncertainty, Doubt">
        <Paragraph>
          <strong>FUD</strong> is negative sentiment, real or manufactured, that causes fear and selling
          pressure. In crypto, FUD can be legitimate concerns (regulation, hacks) or deliberate
          manipulation to drive prices down.
        </Paragraph>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-red-200 dark:border-red-800 mb-6 sm:mb-8">
          <div className="flex items-start gap-3 sm:gap-4">
            <TrendingDown className="w-7 h-7 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Common FUD Triggers</h4>
              <ul className="text-red-700 dark:text-red-300 text-sm space-y-2">
                <li>• Government bans or regulatory crackdowns</li>
                <li>• Exchange hacks or insolvency (Mt. Gox, FTX)</li>
                <li>• "Bitcoin is dead" media narratives</li>
                <li>• Whale wallets moving to exchanges</li>
                <li>• Environmental concerns (proof of work debate)</li>
                <li>• Celebrity/influencer criticisms</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Separating Legitimate Concerns from Noise</h3>

        <CardGrid columns={2}>
          <InfoCard title="Worth Taking Seriously" gradient="from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50">
            <ul className="text-sm space-y-1">
              <li>• Actual regulatory legislation (not rumors)</li>
              <li>• Protocol vulnerabilities/exploits</li>
              <li>• Major exchange insolvencies</li>
              <li>• Fundamental changes to monetary policy</li>
            </ul>
          </InfoCard>
          <InfoCard title="Usually Noise" gradient="from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50">
            <ul className="text-sm space-y-1">
              <li>• "China bans Bitcoin" (has happened 20+ times)</li>
              <li>• "Bitcoin is dead" articles (400+ obituaries)</li>
              <li>• Random influencer opinions</li>
              <li>• Unsubstantiated rumors on social media</li>
            </ul>
          </InfoCard>
        </CardGrid>

        <Callout type="tip" title="Pro Tip: Sentiment Tracking">
          Use tools like <InternalLink to="/bitcoin-fear-greed-index">Perception's Fear & Greed Index</InternalLink> to
          gauge whether FUD has reached capitulation levels. Extreme fear readings during FUD events
          have historically been buying opportunities, after verifying the concerns aren't existential.
        </Callout>
      </Section>

      {/* Section 4: Herd Behavior */}
      <Section id="herd-behavior" title="Herd Behavior & Social Proof">
        <Paragraph>
          Humans are social creatures. We look to others for validation, especially when uncertain.
          In markets, this creates <strong>herd behavior</strong>, the tendency to follow the crowd
          regardless of individual analysis.
        </Paragraph>

        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 mb-6 sm:mb-8">
          <div className="flex items-start gap-3 sm:gap-4">
            <Users className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2">How Herd Behavior Works</h4>
              <p className="text-muted-foreground text-sm mb-3">
                When uncertain, people assume the crowd knows something they don't. If everyone
                is buying, it must be a good investment. If everyone is selling, there must be
                a problem.
              </p>
              <p className="text-muted-foreground text-sm">
                This creates self-reinforcing loops: buying creates more buying (FOMO), selling
                creates more selling (panic). Prices overshoot in both directions.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Social Proof Amplifiers in Crypto</h3>

        <ul className="space-y-2 sm:space-y-3 text-muted-foreground mb-6 sm:mb-8">
          <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span><span><strong>Influencer endorsements:</strong> Followers copy trades without analysis</span></li>
          <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span><span><strong>Gain screenshots:</strong> Survivorship bias, you see wins, not losses</span></li>
          <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span><span><strong>Group chats:</strong> Echo chambers reinforce existing beliefs</span></li>
          <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span><span><strong>Trading volume:</strong> High volume feels like validation</span></li>
        </ul>

        <Callout type="insight" title="Contrarian Advantage">
          The crowd is usually right during trends but catastrophically wrong at turning points.
          When <em>everyone</em> agrees on something, the trade is usually already priced in.
          The most profitable opportunities come from being right when the crowd is wrong.
        </Callout>
      </Section>

      {/* Section 5: Market Cycles */}
      <Section id="market-cycles" title="Psychology of Market Cycles">
        <Paragraph>
          Market cycles follow predictable emotional phases. Understanding where we are in the
          cycle helps you avoid buying at euphoria and selling at despair.
        </Paragraph>

        <Stack gap="sm">
          <PhaseCard number={1} title="Disbelief" color="slate" description="Early stage of recovery. Smart money accumulating. Public sentiment still negative from previous crash. 'This rally is just a dead cat bounce.'" />
          <PhaseCard number={2} title="Hope" color="blue" description="Price confirms uptrend. Media narrative shifts from bearish to cautiously optimistic. Early believers start buying. 'Maybe this is real.'" />
          <PhaseCard number={3} title="Optimism" color="green" description="Institutional interest grows. Mainstream coverage increases. New investors enter the market. 'This is going to work out.'" />
          <PhaseCard number={4} title="Belief" color="lime" description="Confidence is high. Price targets keep getting raised. Bears are dismissed. 'We are in a new paradigm.'" />
          <PhaseCard number={5} title="Euphoria (Peak)" color="yellow" description="Maximum greed. 'This time is different' narratives dominate. Everyone is a genius. This is the point of maximum financial risk." />
          <PhaseCard number={6} title="Complacency" color="orange" description="Price drops but buyers expect recovery. 'Buy the dip' mentality. Smart money quietly exits. 'Just a normal pullback.'" />
          <PhaseCard number={7} title="Anxiety" color="orange" description="Losses mount. Denial sets in. Holders convince themselves it is temporary. 'Something feels wrong.'" />
          <PhaseCard number={8} title="Denial to Panic" color="red" description="'I will just wait for it to come back' becomes 'Get me out at any price!' Capitulation selling. Volume spikes. Headlines are apocalyptic." />
          <PhaseCard number={9} title="Depression (Bottom)" color="slate" description="Maximum despair. No one wants to talk about crypto. This is the point of maximum opportunity. 'Crypto is dead.'" />
        </Stack>

        <Callout type="insight" title="Key Insight">
          The best buying opportunities occur during depression and disbelief. The best selling
          opportunities occur during belief and euphoria. Track sentiment using tools like the
          <InternalLink to="/bitcoin-fear-greed-index"> Fear & Greed Index</InternalLink>
          to identify which phase the market is in.
        </Callout>
      </Section>

      {/* Section 6: Staying Rational */}
      <Section id="rational-trading" title="Staying Rational in Emotional Markets">
        <Paragraph>
          Knowing about market psychology isn't enough, you need systems to prevent yourself from
          falling into the same traps. Here are practical strategies:
        </Paragraph>

        <Stack gap="md">
          <InfoCard title="Have a Written Plan" icon={Target}>
            Define your entry criteria, position sizes, profit targets, and stop losses BEFORE
            you see a price move. Emotional decisions made in real-time are almost always wrong.
          </InfoCard>

          <InfoCard title="Question the Crowd" icon={AlertTriangle}>
            When everyone agrees on something, ask: "What would have to be true for this to be wrong?"
            The most crowded trades are the most dangerous at turning points.
          </InfoCard>

          <InfoCard title="Use Dollar-Cost Averaging" icon={RefreshCw}>
            Remove timing decisions by investing fixed amounts at regular intervals. This
            naturally buys more when prices are low (fear) and less when prices are high (greed).
          </InfoCard>

          <InfoCard title="Track Your Emotions" icon={Brain}>
            Keep a trading journal. Note how you felt when making decisions. Review your worst trades, 
            you'll find they were often made during emotional extremes.
          </InfoCard>

          <InfoCard title="Monitor Sentiment Data" icon={LineChart}>
            Use objective sentiment tools like the <InternalLink to="/bitcoin-fear-greed-index">Fear & Greed Index</InternalLink> to
            gauge market emotions. When fear is extreme and you feel like selling, that's often
            when you should be buying.
          </InfoCard>
        </Stack>
      </Section>
    </LearnArticleLayout>
  );
}
