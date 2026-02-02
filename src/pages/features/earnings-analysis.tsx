import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

const companies = [
  { name: 'MicroStrategy', ticker: 'MSTR', logo: '/company-logos/microstrategy-com.png' },
  { name: 'Coinbase', ticker: 'COIN', logo: '/company-logos/coinbase-com.png' },
  { name: 'Marathon Digital', ticker: 'MARA', logo: '/company-logos/mara-com.png' },
  { name: 'Riot Platforms', ticker: 'RIOT', logo: '/company-logos/riotplatforms-com.png' },
  { name: 'CleanSpark', ticker: 'CLSK', logo: '/company-logos/cleanspark-com.png' },
  { name: 'Hut 8', ticker: 'HUT', logo: '/company-logos/hut8-com.png' },
  { name: 'Galaxy Digital', ticker: 'GLXY', logo: '/company-logos/galaxy-com.png' },
  { name: 'Block', ticker: 'SQ', logo: '/company-logos/block-xyz.png' },
  { name: 'Tesla', ticker: 'TSLA', logo: '/company-logos/tesla-com.png' },
  { name: 'Metaplanet', ticker: 'MTPLF', logo: '/company-logos/metaplanet-jp.png' },
];

const features = [
  {
    number: '01',
    title: 'Automated summaries',
    description: 'Get plain-English summaries of every earnings call, highlighting digital asset-related commentary and strategic shifts.',
    badge: 'Plain English',
    badgeColor: 'text-blue-600/70 bg-blue-500/10',
    theme: 'light' as const,
  },
  {
    number: '02',
    title: 'Management Tone Classification',
    description: 'We analyze executive language patterns (confident, cautious, or defensive) so you can read between the lines.',
    badge: 'Read the Room',
    badgeColor: 'text-emerald-400/90 bg-emerald-500/15',
    theme: 'dark' as const,
  },
  {
    number: '03',
    title: 'Quarter-over-Quarter Comparison',
    description: 'Track how messaging evolves. See what changed from last quarter and what it might signal.',
    badge: 'Track Changes',
    badgeColor: 'text-violet-400/90 bg-violet-500/15',
    theme: 'dark' as const,
  },
  {
    number: '04',
    title: 'Real-Time Processing',
    description: 'Earnings summaries available within hours of the call, not days. Stay ahead of the market narrative.',
    badge: 'Hours, Not Days',
    badgeColor: 'text-amber-600/70 bg-amber-500/10',
    theme: 'light' as const,
  },
];

export function EarningsAnalysisPage() {
  return (
    <>
      <SEO
        title="Earnings Call Analysis for Bitcoin Companies | Perception"
        description="Automated earnings call analysis with management tone classification, QoQ comparison, and plain-English summaries. Cover more companies in less time."
        url="https://perception.to/features/earnings-analysis"
        keywords={['earnings call analysis', 'MSTR earnings', 'Bitcoin company earnings', 'management tone analysis', 'earnings AI']}
      />

      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Hero */}
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 bg-white border-b border-black/5">
          <div className="mx-auto max-w-6xl px-6">
            {/* Back link */}
            <Link
              to="/product"
              className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-black/60 transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Product
            </Link>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-mono text-black/40 tracking-wider">08</span>
                  <span className="text-6xl font-black text-black/[0.08]">EA</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  Earnings Analysis
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-4">
                  Stop reading transcripts. Perception analyzes every earnings call from digital asset-exposed companies, classifying management tone and extracting the insights that matter.
                </p>
                <p className="text-base text-black/40 mb-8">
                  Every earnings call. Analyzed automatically.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <BookDemoButton className="h-12 px-8 rounded-full" />
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-black/60 hover:text-black hover:bg-black/5 h-12 px-6 rounded-full font-medium"
                    onClick={() => {
                      document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    See how it works
                  </Button>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="lg:col-span-7">
                <div className="relative h-[400px] sm:h-[450px]">
                  {/* ASCII background */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-black">
                      <DelicateAsciiDots />
                    </div>
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  {/* Visual: Earnings analysis cards */}
                  <div className="relative h-full p-6 sm:p-8 flex items-center justify-center">
                    <div className="w-full max-w-xs space-y-2.5">
                      {/* Earnings card 1 - highlighted/active */}
                      <div className="bg-white/[0.08] backdrop-blur border border-white/15 rounded-xl p-3.5">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-white/80">M</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-sm text-white/90 font-medium block">MicroStrategy</span>
                                <span className="text-[10px] text-white/40">MSTR · Q3 2024</span>
                              </div>
                              <span className="px-2 py-0.5 text-[9px] rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                                Confident
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1.5 mb-3">
                          <div className="h-1.5 w-full bg-white/15 rounded" />
                          <div className="h-1.5 w-4/5 bg-white/10 rounded" />
                        </div>
                        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[9px] text-white/30">2h ago</span>
                          <span className="text-[9px] text-blue-400/70">View →</span>
                        </div>
                      </div>

                      {/* Earnings card 2 */}
                      <div className="bg-white/[0.05] border border-white/10 rounded-xl p-3.5 opacity-70">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-white/60">C</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-sm text-white/70 font-medium block">Coinbase</span>
                                <span className="text-[10px] text-white/30">COIN · Q3 2024</span>
                              </div>
                              <span className="px-2 py-0.5 text-[9px] rounded-full bg-white/10 text-white/50 flex-shrink-0">
                                Cautious
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Earnings card 3 */}
                      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5 opacity-40">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-white/40">M</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="h-2 w-24 bg-white/10 rounded mb-1.5" />
                            <div className="h-1.5 w-16 bg-white/[0.06] rounded" />
                          </div>
                        </div>
                      </div>

                      {/* Companies counter */}
                      <div className="flex items-center justify-center gap-4 pt-3">
                        <div className="text-center">
                          <span className="text-xl font-semibold text-white/80">15+</span>
                          <span className="text-white/40 text-xs ml-1.5">companies</span>
                        </div>
                        <div className="w-px h-5 bg-white/20" />
                        <div className="text-center">
                          <span className="text-xl font-semibold text-white/80">Same-day</span>
                          <span className="text-white/40 text-xs ml-1.5">analysis</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features-section" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                What you get
              </h2>
              <p className="text-lg text-black/50">
                Institutional-grade earnings intelligence, automated.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.number}
                  className={`group relative rounded-2xl p-8 transition-all duration-300 overflow-hidden ${
                    feature.theme === 'light'
                      ? 'bg-gradient-to-br from-white to-zinc-100 border border-black/[0.06] hover:shadow-xl hover:shadow-black/5'
                      : 'bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:shadow-xl hover:shadow-black/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-[10px] font-mono tracking-wider ${
                      feature.theme === 'light' ? 'text-black/40' : 'text-white/40'
                    }`}>{feature.number}</span>
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${feature.badgeColor}`}>
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    feature.theme === 'light' ? 'text-black' : 'text-white'
                  }`}>{feature.title}</h3>
                  <p className={`leading-relaxed ${
                    feature.theme === 'light' ? 'text-black/60' : 'text-white/60'
                  }`}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Companies Covered */}
        <section className="py-20 sm:py-28 bg-white border-y border-black/5">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                Companies we cover
              </h2>
              <p className="text-lg text-black/50">
                Every major digital asset-exposed public company.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="group bg-[#FAFAFA] rounded-2xl p-6 border border-black/5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col items-center"
                >
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-black/80 text-center">{company.name}</span>
                  <span className="text-xs text-black/40 mt-1">{company.ticker}</span>
                </div>
              ))}
            </div>

            <p className="text-center mt-8 text-black/40 text-sm">
              And more being added regularly...
            </p>
          </div>
        </section>

        {/* Example Output */}
        <section className="py-20 sm:py-28 bg-black">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
                Example analysis
              </h2>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">MicroStrategy Q3 2024</h3>
                  <p className="text-white/50 text-sm">Earnings Call Analysis</p>
                </div>
                <span className="px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
                  Confident Tone
                </span>
              </div>

              <div className="space-y-4 text-white/70">
                <p><span className="text-white font-medium">Key Takeaway:</span> Saylor reiterated commitment to Bitcoin treasury strategy, announcing plans to raise an additional $2B for BTC purchases.</p>
                <p><span className="text-white font-medium">Tone Shift:</span> More aggressive than Q2, with increased emphasis on Bitcoin as "digital capital" vs. previous "treasury reserve" framing.</p>
                <p><span className="text-white font-medium">Notable Quote:</span> "We're not in the software business anymore. We're in the Bitcoin development company business."</p>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-white/50 text-sm">Full analysis includes: executive quotes, Q&A highlights, analyst sentiment, and quarter-over-quarter comparison.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl bg-black p-12 sm:p-16">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  Automate your earnings research
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  Cover more companies with less effort.
                </p>
                <BookDemoButton
                  variant="outline"
                  className="h-12 px-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default EarningsAnalysisPage;
