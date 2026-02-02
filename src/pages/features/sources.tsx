import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

const sourceCategories = [
  {
    title: 'Mainstream Financial Media',
    count: '50+',
    examples: ['Bloomberg', 'Reuters', 'Wall Street Journal', 'Financial Times', 'CNBC', 'Forbes'],
    number: '01',
    theme: 'light' as const,
    badgeColor: 'text-blue-600/70 bg-blue-500/10',
  },
  {
    title: 'Crypto-Native Publications',
    count: '80+',
    examples: ['CoinDesk', 'The Block', 'Decrypt', 'Cointelegraph', 'Bitcoin Magazine', 'Blockworks'],
    number: '02',
    theme: 'dark' as const,
    badgeColor: 'text-orange-400/90 bg-orange-500/15',
  },
  {
    title: 'Social & Community',
    count: '100+',
    examples: ['Bitcoin Twitter', 'Crypto influencers', 'Company accounts', 'Analyst commentary'],
    number: '03',
    theme: 'dark' as const,
    badgeColor: 'text-violet-400/90 bg-violet-500/15',
  },
  {
    title: 'Podcasts & Video',
    count: '60+',
    examples: ['What Bitcoin Did', 'Unchained', 'The Pomp Podcast', 'Bankless', 'YouTube'],
    number: '04',
    theme: 'light' as const,
    badgeColor: 'text-emerald-600/70 bg-emerald-500/10',
  },
  {
    title: 'Research & Reports',
    count: '40+',
    examples: ['Analyst reports', 'Academic papers', 'Industry research', 'On-chain analysis'],
    number: '05',
    theme: 'light' as const,
    badgeColor: 'text-cyan-600/70 bg-cyan-500/10',
  },
  {
    title: 'Company & Regulatory',
    count: '120+',
    examples: ['SEC filings', 'Press releases', 'Earnings calls', 'Conference presentations'],
    number: '06',
    theme: 'dark' as const,
    badgeColor: 'text-rose-400/90 bg-rose-500/15',
  },
];

const stats = [
  { label: 'Total Sources', value: '450+' },
  { label: 'Articles Daily', value: '2,000+' },
  { label: 'Historical Data', value: '700K+' },
  { label: 'Update Frequency', value: '90s' },
];

export function SourcesPage() {
  return (
    <>
      <SEO
        title="450+ Sources Monitored | Perception"
        description="Perception monitors 450+ sources across mainstream media, crypto publications, social platforms, podcasts, and regulatory filings. See what we cover."
        url="https://perception.to/features/sources"
        keywords={['Bitcoin news sources', 'crypto media monitoring', 'Bitcoin coverage tracking', 'crypto news aggregation']}
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
                  <span className="text-[10px] font-mono text-black/40 tracking-wider">07</span>
                  <span className="text-6xl font-black text-black/[0.08]">MI</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  Media Intelligence
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-4">
                  We monitor the sources that matter so you don't have to. From Bloomberg to Bitcoin Twitter, from SEC filings to podcast transcripts—everything indexed and searchable.
                </p>
                <p className="text-base text-black/40 mb-8">
                  450+ sources. One platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <BookDemoButton className="h-12 px-8 rounded-full" />
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

                  {/* Visual: Radial source network */}
                  <div className="relative h-full p-6 sm:p-8 flex items-center justify-center">
                    <div className="relative">
                      {/* Center hub */}
                      <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white/90">450+</span>
                      </div>

                      {/* Orbiting source indicators */}
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                          <span className="text-[10px] text-blue-400 font-mono">FIN</span>
                        </div>
                        <span className="text-[9px] text-white/40">Financial</span>
                      </div>

                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                          <span className="text-[10px] text-violet-400 font-mono">SOC</span>
                        </div>
                        <span className="text-[9px] text-white/40">Social</span>
                      </div>

                      <div className="absolute top-1/2 -translate-y-1/2 -left-20 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                          <span className="text-[10px] text-orange-400 font-mono">CRY</span>
                        </div>
                        <span className="text-[9px] text-white/40">Crypto</span>
                      </div>

                      <div className="absolute top-1/2 -translate-y-1/2 -right-20 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                          <span className="text-[10px] text-emerald-400 font-mono">POD</span>
                        </div>
                        <span className="text-[9px] text-white/40">Podcasts</span>
                      </div>

                      <div className="absolute -top-8 -left-12 flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                          <span className="text-[8px] text-cyan-400 font-mono">RSH</span>
                        </div>
                      </div>

                      <div className="absolute -top-8 -right-12 flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                          <span className="text-[8px] text-rose-400 font-mono">SEC</span>
                        </div>
                      </div>

                      <div className="absolute -bottom-8 -left-12 flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                          <span className="text-[8px] text-amber-400 font-mono">VID</span>
                        </div>
                      </div>

                      <div className="absolute -bottom-8 -right-12 flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                          <span className="text-[8px] text-indigo-400 font-mono">EAR</span>
                        </div>
                      </div>

                      {/* Connection lines (decorative) */}
                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full" style={{ position: 'absolute', top: '-80px', left: '-80px', width: '200px', height: '200px' }}>
                          <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
                          <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-black">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-semibold text-white mb-2">{stat.value}</div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Source Categories */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                What we monitor
              </h2>
              <p className="text-lg text-black/50">
                Comprehensive coverage across every channel that matters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sourceCategories.map((category) => (
                <div
                  key={category.number}
                  className={`group relative rounded-2xl p-8 transition-all duration-300 overflow-hidden ${
                    category.theme === 'light'
                      ? 'bg-gradient-to-br from-white to-zinc-100 border border-black/[0.06] hover:shadow-xl hover:shadow-black/5'
                      : 'bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:shadow-xl hover:shadow-black/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-[10px] font-mono tracking-wider ${
                      category.theme === 'light' ? 'text-black/40' : 'text-white/40'
                    }`}>{category.number}</span>
                    <span className={`text-2xl font-bold ${
                      category.theme === 'light' ? 'text-black' : 'text-white'
                    }`}>{category.count}</span>
                  </div>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    category.theme === 'light' ? 'text-black' : 'text-white'
                  }`}>{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example, i) => (
                      <span
                        key={i}
                        className={`text-xs px-3 py-1.5 rounded-full ${category.badgeColor}`}
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-black">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
                How we process sources
              </h2>
            </div>

            <div className="space-y-8">
              {[
                { step: '1', title: 'Continuous Monitoring', desc: 'Our crawlers continuously monitor every source, capturing new content as it publishes.' },
                { step: '2', title: 'AI Processing', desc: 'Each piece is analyzed for sentiment, entities, topics, and relevance to specific companies.' },
                { step: '3', title: 'Trend Extraction', desc: 'We identify emerging narratives, sentiment shifts, and notable coverage patterns.' },
                { step: '4', title: 'Delivery', desc: 'Insights surface through your dashboard, alerts, and reports with full citations.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">{item.step}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl bg-black p-12 sm:p-16">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  Missing a source?
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  Enterprise customers can request custom sources to be added.
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

export default SourcesPage;
