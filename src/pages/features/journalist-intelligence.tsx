import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

const features = [
  {
    number: '01',
    title: 'Reporter sentiment tracking',
    description: 'See how each journalist covers topics over time. Some are consistently bullish, others skeptical. Know who you\'re dealing with.',
    badge: 'Sentiment',
    badgeColor: 'text-emerald-600/70 bg-emerald-500/10',
    theme: 'light' as const,
  },
  {
    number: '02',
    title: 'Coverage frequency',
    description: 'Track how often reporters cover specific topics. Find the journalists who actually write about your space.',
    badge: 'Frequency',
    badgeColor: 'text-blue-400/90 bg-blue-500/15',
    theme: 'dark' as const,
  },
  {
    number: '03',
    title: 'Outlet mapping',
    description: 'See which outlets cover what. Understand the media landscape before you pitch.',
    badge: 'Outlets',
    badgeColor: 'text-violet-400/90 bg-violet-500/15',
    theme: 'dark' as const,
  },
  {
    number: '04',
    title: 'Historical coverage',
    description: 'Pull up any reporter\'s recent articles instantly. Know their angle before you reach out.',
    badge: 'History',
    badgeColor: 'text-amber-600/70 bg-amber-500/10',
    theme: 'light' as const,
  },
];

const exampleReporters = [
  { name: 'Helene Braun', outlet: 'CoinDesk', articles: 142, sentiment: 'Neutral', topics: 'MSTR, Mining, ETFs' },
  { name: 'Aoyon Ashraf', outlet: 'CoinDesk', articles: 98, sentiment: 'Bullish', topics: 'ETFs, Institutions' },
  { name: 'Jamie Crawley', outlet: 'CoinDesk', articles: 87, sentiment: 'Neutral', topics: 'Markets, Mining' },
];

export function JournalistIntelligencePage() {
  return (
    <>
      <SEO
        title="Journalist Intelligence - Reporter Tracking & Sentiment | Perception"
        description="Track journalist sentiment, coverage patterns, and historical articles. Know who covers your space and how they cover it."
        url="https://perception.to/features/journalist-intelligence"
        keywords={['journalist tracking', 'reporter sentiment', 'media relations', 'PR intelligence', 'journalist database']}
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
                  <span className="text-[10px] font-mono text-black/40 tracking-wider">04</span>
                  <span className="text-6xl font-black text-black/[0.08]">JI</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  Journalist Intelligence
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-4">
                  Every reporter has an angle. Track journalist sentiment over time, see their coverage patterns, and understand their perspective before you reach out.
                </p>
                <p className="text-base text-black/40 mb-8">
                  Know the journalist before you pitch.
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

                  {/* Visual: Reporter profile cards */}
                  <div className="relative h-full p-6 sm:p-8 flex items-center justify-center">
                    <div className="w-full max-w-xs space-y-3">
                      {/* Reporter card 1 - highlighted */}
                      <div className="bg-white/[0.08] backdrop-blur border border-white/15 rounded-xl p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-violet-500/30 flex items-center justify-center text-white/70 text-sm font-medium">
                            HB
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-white/90 font-medium">Helene Braun</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">CoinDesk</span>
                            </div>
                            <div className="mt-2 flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                <span className="text-[10px] text-white/40">Neutral</span>
                              </div>
                              <span className="text-[10px] text-white/30">142 articles</span>
                            </div>
                            <div className="mt-2 flex gap-1.5">
                              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/40">MSTR</span>
                              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/40">Mining</span>
                              <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/40">ETFs</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reporter card 2 */}
                      <div className="bg-white/[0.05] border border-white/10 rounded-xl p-4 opacity-70 transform translate-x-2">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center text-white/50 text-sm font-medium">
                            AA
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-white/70 font-medium">Aoyon Ashraf</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">CoinDesk</span>
                            </div>
                            <div className="mt-2 flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                                <span className="text-[10px] text-emerald-400/60">Bullish</span>
                              </div>
                              <span className="text-[10px] text-white/30">98 articles</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reporter card 3 */}
                      <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 opacity-40 transform translate-x-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/30 text-sm font-medium">
                            JC
                          </div>
                          <div className="flex-1">
                            <div className="h-3 w-24 bg-white/10 rounded mb-2" />
                            <div className="h-2 w-16 bg-white/5 rounded" />
                          </div>
                        </div>
                      </div>

                      {/* Counter */}
                      <div className="text-center pt-4">
                        <span className="text-2xl font-semibold text-white/80">500+</span>
                        <span className="text-white/40 text-sm ml-2">reporters tracked</span>
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
                Media intelligence
              </h2>
              <p className="text-lg text-black/50">
                Understand the people writing the stories.
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

        {/* Example Reporters */}
        <section className="py-20 sm:py-28 bg-white border-y border-black/5">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                Example profiles
              </h2>
              <p className="text-lg text-black/50">
                What you'd see for top reporters in your space.
              </p>
            </div>

            <div className="space-y-4">
              {exampleReporters.map((reporter, index) => (
                <div key={index} className="bg-[#FAFAFA] rounded-2xl p-6 border border-black/5 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-black">{reporter.name}</h3>
                      <span className="text-sm text-black/50">{reporter.outlet}</span>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      reporter.sentiment === 'Bullish' ? 'bg-emerald-100 text-emerald-700' :
                      reporter.sentiment === 'Bearish' ? 'bg-red-100 text-red-700' :
                      'bg-zinc-100 text-zinc-700'
                    }`}>
                      {reporter.sentiment}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black/50">Articles (90d): <span className="text-black font-medium">{reporter.articles}</span></span>
                    <span className="text-black/50">Covers: <span className="text-black font-medium">{reporter.topics}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 sm:py-28 bg-black">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
                Who uses this
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'PR teams', desc: 'Find the right journalists to pitch. Know their angle before you email.' },
                { title: 'Comms teams', desc: 'Track who\'s covering your company. Monitor journalist sentiment over time.' },
                { title: 'Executives', desc: 'Prepare for interviews. Know the reporter\'s history before you sit down.' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.desc}</p>
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
                  Know the landscape
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  Book a demo and we'll show you journalists covering your topics.
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

export default JournalistIntelligencePage;
