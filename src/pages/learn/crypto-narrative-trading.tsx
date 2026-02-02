import { Newspaper, TrendingUp, Search, Zap, Target, AlertTriangle, MessageSquare, Globe, Layers } from 'lucide-react';
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
  InternalLink,
} from '@/components/learn';

export default function CryptoNarrativeTradingPage() {
  return (
    <LearnArticleLayout
      title="Crypto Narrative Trading Guide"
      metaTitle="Crypto Narrative Trading: Identify & Trade Market Narratives | Perception"
      description="Learn to identify emerging narratives before they go mainstream, understand how narratives evolve, and position yourself ahead of the crowd."
      keywords={[
        'crypto narrative trading',
        'bitcoin narratives',
        'crypto market trends',
        'narrative trading strategy',
        'crypto trend identification',
        'market narrative analysis'
      ]}
      url="https://perception.to/learn/crypto-narrative-trading"
      category="Advanced"
      categoryIcon={Newspaper}
      readTime="12 min read"
      tableOfContents={[
        { id: 'what-are-narratives', title: 'What Are Crypto Narratives?' },
        { id: 'why-narratives-matter', title: 'Why Narratives Drive Prices' },
        { id: 'narrative-lifecycle', title: 'The Narrative Lifecycle' },
        { id: 'identifying-narratives', title: 'How to Identify Emerging Narratives' },
        { id: 'trading-strategies', title: 'Narrative Trading Strategies' },
        { id: 'current-narratives', title: 'Major Narratives to Watch' },
      ]}
      nextArticle={undefined}
      relatedArticles={[
        { slug: 'bitcoin-market-psychology', title: 'Bitcoin Market Psychology', description: 'Understand FOMO, FUD, and market cycles.' },
        { slug: 'how-to-read-fear-greed-index', title: 'How to Read the Fear & Greed Index', description: 'Practical guide to sentiment indicators.' },
      ]}
    >
      {/* Section 1: What Are Narratives */}
      <Section id="what-are-narratives" title="What Are Crypto Narratives?">
        <Paragraph>
          A <strong>narrative</strong> in crypto is a story or theme that the market collectively
          believes and trades on. Narratives are the "why" behind price movements, they explain
          why people are buying or selling.
        </Paragraph>
        <Paragraph>
          Unlike traditional markets where fundamentals (earnings, cash flow) drive prices,
          crypto markets are largely driven by <strong>narrative momentum</strong>. The assets that
          capture attention and tell compelling stories outperform, regardless of technical merit.
        </Paragraph>

        <Callout type="insight" title="Key Insight">
          In crypto, <strong>perception often matters more than reality</strong>. A mediocre project with
          a great narrative can outperform a great project with no narrative. Understanding this
          is essential for profitable trading.
        </Callout>

        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 mt-6 sm:mt-8">Examples of Past Narratives</h3>

        <CardGrid columns={2}>
          <InfoCard title="DeFi Summer (2020)">
            "Banks are obsolete. DeFi protocols will replace all financial services."
            UNI, AAVE, COMP pumped 10-50x.
          </InfoCard>
          <InfoCard title="NFT Boom (2021)">
            "Digital art will transform ownership and creativity."
            JPEGs sold for millions. OpenSea became a unicorn.
          </InfoCard>
          <InfoCard title="L1 Wars (2021)">
            "Ethereum is too expensive. The next L1 will flip ETH."
            SOL, AVAX, LUNA saw massive gains.
          </InfoCard>
          <InfoCard title="AI + Crypto (2023)">
            "AI will revolutionize crypto. AI tokens are the future."
            AI-related tokens outperformed the market.
          </InfoCard>
        </CardGrid>
      </Section>

      {/* Section 2: Why Narratives Matter */}
      <Section id="why-narratives-matter" title="Why Narratives Drive Prices">
        <Paragraph>
          Narratives move prices because they coordinate attention and capital. When a narrative
          gains traction, it creates a self-reinforcing cycle:
        </Paragraph>

        <StepList
          steps={[
            { title: 'Narrative Emerges', description: 'A new story or theme starts gaining traction among early adopters.' },
            { title: 'Capital Flows In', description: 'Traders position in tokens related to the narrative. Prices rise.' },
            { title: 'Media Amplification', description: 'Price action generates media coverage. More people learn about the narrative.' },
            { title: 'FOMO Kicks In', description: 'Mainstream investors pile in. "Everyone is talking about X."' },
            { title: 'Narrative Peak', description: 'Maximum attention. Maximum prices. Early traders exit to latecomers.' },
          ]}
        />

        <Callout type="tip" title="The Edge">
          If you can identify narratives in steps 1-2, you can position before the crowd arrives
          in steps 3-5. This is the core of narrative trading, being early, not first.
        </Callout>
      </Section>

      {/* Section 3: Narrative Lifecycle */}
      <Section id="narrative-lifecycle" title="The Narrative Lifecycle">
        <Paragraph>
          Every narrative follows a predictable lifecycle. Understanding where a narrative is
          in its lifecycle helps you time entries and exits.
        </Paragraph>

        <Stack gap="sm">
          <PhaseCard
            number={1}
            title="Inception"
            color="slate"
            icon={Search}
            description="Only insiders and researchers are aware. Price hasn't moved yet. Information is scattered across niche Twitter accounts, Discord servers, or research papers."
            signal="Low social volume, minimal media coverage, high conviction among small group"
          />
          <PhaseCard
            number={2}
            title="Early Adoption"
            color="blue"
            icon={TrendingUp}
            description="Crypto Twitter influencers start discussing it. First price moves occur. Early threads and articles appear. This is the optimal entry point."
            signal="Rising social mentions, first media articles, 2-5x price moves"
          />
          <PhaseCard
            number={3}
            title="Mainstream Attention"
            color="green"
            icon={Zap}
            description="Major crypto media covers it. YouTubers make videos. Retail traders pile in. Prices accelerate. Still profitable but getting crowded."
            signal="CoinDesk/Decrypt articles, YouTube explainers, high social volume"
          />
          <PhaseCard
            number={4}
            title="Peak Hype"
            color="yellow"
            icon={Globe}
            description="Everyone is talking about it. Mainstream media (CNBC, Bloomberg) covers it. Time to exit or reduce exposure."
            signal="Mainstream media, celebrities involved, euphoric sentiment"
          />
          <PhaseCard
            number={5}
            title="Exhaustion"
            color="red"
            icon={AlertTriangle}
            description="Attention fades. Price declines as early buyers exit. Media coverage turns negative. Survivors may become the next cycle's leaders."
            signal="Declining social volume, bearish media, contrarian sentiment"
          />
        </Stack>
      </Section>

      {/* Section 4: Identifying Narratives */}
      <Section id="identifying-narratives" title="How to Identify Emerging Narratives">
        <Paragraph>
          The earlier you spot a narrative, the more profit potential. Here's where to look:
        </Paragraph>

        <Stack gap="md">
          <InfoCard title="Crypto Twitter (X)" icon={MessageSquare}>
            <p className="mb-3">
              The epicenter of crypto narratives. Follow smart money accounts, researchers,
              and builders, not just influencers chasing engagement.
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
              <p className="text-xs">
                <strong>Tip:</strong> Look for topics that smart accounts are discussing but haven't
                gone viral yet. When the ratio of quality accounts to engagement farmers shifts,
                the narrative is maturing.
              </p>
            </div>
          </InfoCard>

          <InfoCard title="Media Sentiment Tracking" icon={Newspaper}>
            <p className="mb-3">
              Monitor what crypto media is covering. Rising coverage of a topic often
              precedes price moves by days or weeks.
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
              <p className="text-xs">
                <strong>Tool:</strong> <InternalLink to="/bitcoin-media-research">Perception's Media Research</InternalLink> tracks
                450+ sources in real-time, showing you what topics are gaining momentum.
              </p>
            </div>
          </InfoCard>

          <InfoCard title="On-Chain Data" icon={Layers}>
            <p className="mb-3">
              Smart money often moves before narratives become public. Watch for unusual
              accumulation patterns in sectors or specific tokens.
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
              <p className="text-xs">
                <strong>Signal:</strong> When sophisticated wallets are accumulating tokens in a sector
                while social volume is low, they may know something the market doesn't.
              </p>
            </div>
          </InfoCard>

          <InfoCard title="Ecosystem Developments" icon={Target}>
            <p className="mb-3">
              Major protocol upgrades, regulatory changes, and macro events often spawn
              narratives. Anticipate what stories will emerge from upcoming catalysts.
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
              <p className="text-xs">
                <strong>Examples:</strong> ETH merge spawned staking narratives. Bitcoin halving spawns
                supply shock narratives. Rate cuts spawn "risk-on" narratives.
              </p>
            </div>
          </InfoCard>
        </Stack>
      </Section>

      {/* Section 5: Trading Strategies */}
      <Section id="trading-strategies" title="Narrative Trading Strategies">
        <Paragraph>
          Here's how to translate narrative identification into profitable trades:
        </Paragraph>

        <Stack gap="md">
          <StrategyCard
            title="The Basket Approach"
            icon={Target}
            color="green"
            description="When you identify an emerging narrative, don't bet on a single token. Build a basket of 3-5 tokens in the sector. This diversifies project-specific risk while capturing narrative beta."
          >
            <CheckList items={[
              'Identify 3-5 tokens most directly exposed to the narrative',
              'Weight by conviction and liquidity (more liquid = more weight)',
              'Set portfolio-level stop loss and take-profit targets',
            ]} />
          </StrategyCard>

          <StrategyCard
            title="Lead/Lag Rotation"
            icon={TrendingUp}
            color="blue"
            description="In every narrative, some tokens lead and some lag. Early in the cycle, buy leaders. As the narrative matures, capital rotates to laggers seeking 'cheaper' plays."
          >
            <CheckList items={[
              <><strong>Phase 1-2:</strong> Buy narrative leaders (highest quality, most liquid)</>,
              <><strong>Phase 3:</strong> Rotate some profits into laggers with catch-up potential</>,
              <><strong>Phase 4:</strong> Take profits on laggers, exit entirely or hedge</>,
            ]} />
          </StrategyCard>

          <StrategyCard
            title="Narrative Pairs Trading"
            icon={Layers}
            color="purple"
            description="Long the emerging narrative, short the dying narrative. This reduces market exposure while betting on relative performance."
          >
            <CheckList items={[
              'Long: Tokens in Phase 1-3 narratives (rising attention)',
              'Short: Tokens in Phase 5 narratives (fading attention)',
              'Rebalance as narrative positions evolve',
            ]} />
          </StrategyCard>
        </Stack>

        <Callout type="warning" title="Risk Warning">
          Narrative trading is high-risk. Narratives can collapse suddenly (LUNA, FTX).
          Never bet more than you can lose. Use stop losses. Don't marry your positions, 
          if the narrative thesis breaks, exit quickly.
        </Callout>
      </Section>

      {/* Section 6: Current Narratives */}
      <Section id="current-narratives" title="Major Narratives to Watch (2025)">
        <Paragraph>
          Here are some of the dominant narratives shaping the current market:
        </Paragraph>

        <CardGrid columns={2}>
          <InfoCard title="Bitcoin Strategic Reserve">
            Nation-state and corporate Bitcoin adoption as reserve asset. Driven by
            regulatory clarity and institutional infrastructure.
          </InfoCard>
          <InfoCard title="AI x Crypto">
            Decentralized AI compute, AI agents with wallets, and crypto-native
            AI applications. Intersection of two megatrends.
          </InfoCard>
          <InfoCard title="Real World Assets (RWA)">
            Tokenization of traditional assets, treasuries, real estate, private credit.
            Bridging TradFi and DeFi.
          </InfoCard>
          <InfoCard title="Restaking & AVS">
            Extending Ethereum security to new applications. EigenLayer ecosystem
            and competing restaking protocols.
          </InfoCard>
          <InfoCard title="DePIN">
            Decentralized physical infrastructure networks. Crypto-incentivized
            hardware networks for compute, storage, wireless, and more.
          </InfoCard>
          <InfoCard title="Modular Scaling">
            Specialized chains for execution, data availability, and settlement.
            The unbundling of blockchain architecture.
          </InfoCard>
        </CardGrid>

        <Callout type="insight" title="Stay Updated">
          Narratives evolve quickly. Use <InternalLink to="/bitcoin-market-sentiment">Perception's daily sentiment reports</InternalLink> to
          track which narratives are gaining or losing momentum in real-time.
        </Callout>
      </Section>
    </LearnArticleLayout>
  );
}
