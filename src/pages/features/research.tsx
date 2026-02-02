import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

const features = [
  {
    number: '01',
    title: 'Multi-keyword search',
    description: 'Search across 450+ sources simultaneously. Combine keywords, filter by sentiment, and narrow by time range.',
    badge: 'Search',
    badgeColor: 'text-blue-600/70 bg-blue-500/10',
    theme: 'light' as const,
  },
  {
    number: '02',
    title: 'Sentiment filtering',
    description: 'Filter results by positive, neutral, or negative sentiment. Understand the tone of coverage at a glance.',
    badge: 'Sentiment',
    badgeColor: 'text-emerald-400/90 bg-emerald-500/15',
    theme: 'dark' as const,
  },
  {
    number: '03',
    title: 'Competitor comparison',
    description: 'Compare coverage between two topics or companies side-by-side. See share of voice, sentiment differences, and outlet breakdown.',
    badge: 'Compare',
    badgeColor: 'text-violet-400/90 bg-violet-500/15',
    theme: 'dark' as const,
  },
  {
    number: '04',
    title: 'Export everything',
    description: 'Export your research to CSV for further analysis. Full citations included so you can verify every source.',
    badge: 'Export',
    badgeColor: 'text-amber-600/70 bg-amber-500/10',
    theme: 'light' as const,
  },
];

const sourceCategories = [
  { name: 'Financial Media', count: '120+', examples: 'Bloomberg, Reuters, WSJ, FT' },
  { name: 'Crypto News', count: '180+', examples: 'CoinDesk, The Block, Decrypt' },
  { name: 'Social Media', count: '50+', examples: 'X/Twitter, Reddit, Discord' },
  { name: 'Video & Podcasts', count: '100+', examples: 'YouTube, Podcasts, Interviews' },
];

export function ResearchPage() {
  return (
    <>
      <SEO
        title="Research Hub - Search & Analyze 450+ Sources | Perception"
        description="Search and analyze coverage across 450+ sources. Filter by sentiment, compare competitors, and export with full citations."
        url="https://perception.to/features/research"
        keywords={['media research', 'sentiment analysis', 'competitor analysis', 'market research', 'media monitoring']}
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
                  <span className="text-[10px] font-mono text-black/40 tracking-wider">02</span>
                  <span className="text-6xl font-black text-black/[0.08]">RH</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  Research Hub
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-4">
                  Stop toggling between tabs. The Research Hub lets you search across all 450+ sources simultaneously, filter by sentiment, compare topics, and export with full citations.
                </p>
                <p className="text-base text-black/40 mb-8">
                  Every source. One search.
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

                  {/* Visual: Stacked source layers */}
                  <div className="relative h-full p-6 sm:p-8 flex items-center justify-center">
                    <div className="relative w-full max-w-sm">
                      {/* Search bar */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4/5 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center px-4 z-20">
                        <div className="w-4 h-4 rounded-full border-2 border-white/40" />
                        <div className="ml-3 flex-1 h-2 bg-white/20 rounded-full" />
                      </div>

                      {/* Stacked source cards */}
                      <div className="pt-16 space-y-3">
                        <div className="bg-gradient-to-r from-blue-500/20 to-blue-500/5 border border-blue-500/20 rounded-xl p-4 transform rotate-[-1deg]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-blue-500/30" />
                              <span className="text-xs text-white/70 font-medium">Financial Media</span>
                            </div>
                            <span className="text-[10px] text-blue-400/80 font-mono">120+</span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-500/20 to-orange-500/5 border border-orange-500/20 rounded-xl p-4 transform rotate-[0.5deg]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-orange-500/30" />
                              <span className="text-xs text-white/70 font-medium">Crypto News</span>
                            </div>
                            <span className="text-[10px] text-orange-400/80 font-mono">180+</span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-violet-500/20 to-violet-500/5 border border-violet-500/20 rounded-xl p-4 transform rotate-[-0.5deg]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-violet-500/30" />
                              <span className="text-xs text-white/70 font-medium">Social & Community</span>
                            </div>
                            <span className="text-[10px] text-violet-400/80 font-mono">100+</span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 transform rotate-[1deg]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-emerald-500/30" />
                              <span className="text-xs text-white/70 font-medium">Video & Podcasts</span>
                            </div>
                            <span className="text-[10px] text-emerald-400/80 font-mono">50+</span>
                          </div>
                        </div>
                      </div>

                      {/* Total indicator */}
                      <div className="mt-6 text-center">
                        <span className="text-3xl font-bold text-white/90">450+</span>
                        <span className="text-white/40 text-sm ml-2">sources indexed</span>
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
                Research, refined
              </h2>
              <p className="text-lg text-black/50">
                Everything you need to understand what's being said.
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

        {/* Sources */}
        <section className="py-20 sm:py-28 bg-white border-y border-black/5">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                What we track
              </h2>
              <p className="text-lg text-black/50">
                Coverage from every corner of the market.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sourceCategories.map((category, index) => (
                <div key={index} className="bg-[#FAFAFA] rounded-2xl p-8 border border-black/5 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-black">{category.name}</h3>
                    <span className="text-2xl font-bold text-blue-600">{category.count}</span>
                  </div>
                  <p className="text-black/50 text-sm">{category.examples}</p>
                </div>
              ))}
            </div>

            <p className="text-center mt-8 text-black/40 text-sm">
              Full source list available in the platform.
            </p>
          </div>
        </section>

        {/* Example Search */}
        <section className="py-20 sm:py-28 bg-black">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
                Example search
              </h2>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex-1 bg-white/10 rounded-xl px-4 py-3">
                  <span className="text-white/80">MicroStrategy</span>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">Positive</span>
                  <span className="px-3 py-1.5 bg-white/10 text-white/60 rounded-full text-sm">7 days</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-white/70">
                  <span>Total mentions</span>
                  <span className="text-white font-semibold">1,247</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Positive sentiment</span>
                  <span className="text-emerald-400 font-semibold">68%</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Top outlet</span>
                  <span className="text-white font-semibold">CoinDesk (142)</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Top journalist</span>
                  <span className="text-white font-semibold">Helene Braun (23)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Walkthrough */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                See it in action
              </h2>
              <p className="text-lg text-black/50">
                Watch a walkthrough of the Research Hub.
              </p>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/OTedJvx3i3g?start=522&rel=0&modestbranding=1"
                title="Research Hub Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl bg-black p-12 sm:p-16">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  Try a search
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  Book a demo and search for anything you're tracking.
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

export default ResearchPage;
