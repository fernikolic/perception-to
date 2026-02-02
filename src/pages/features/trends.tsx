import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

const features = [
  {
    number: '01',
    title: 'Emerging narrative detection',
    description: 'Surface stories before they go mainstream. Our system identifies emerging narratives across 450+ sources in real-time.',
    badge: 'Early Signal',
    badgeColor: 'text-orange-600/70 bg-orange-500/10',
    theme: 'light' as const,
  },
  {
    number: '02',
    title: 'Signal classification',
    description: 'Every trend is classified by strength: early, emerging, or strong. Know exactly where a narrative is in its lifecycle.',
    badge: 'Lifecycle',
    badgeColor: 'text-emerald-400/90 bg-emerald-500/15',
    theme: 'dark' as const,
  },
  {
    number: '03',
    title: 'Velocity tracking',
    description: 'See how fast a narrative is spreading. Velocity spikes often precede price moves and media coverage.',
    badge: 'Speed',
    badgeColor: 'text-blue-400/90 bg-blue-500/15',
    theme: 'dark' as const,
  },
  {
    number: '04',
    title: 'Topic relationship mapping',
    description: 'Understand how trends connect. See which narratives are linked and how they influence each other.',
    badge: 'Connections',
    badgeColor: 'text-violet-600/70 bg-violet-500/10',
    theme: 'light' as const,
  },
];

const exampleTrends = [
  {
    name: 'Strategic Bitcoin Reserve',
    signal: 'Strong',
    velocity: '+340%',
    velocityWidth: '100%',
    category: 'Policy',
    number: '01',
    theme: 'dark' as const,
    badgeColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
    velocityColor: 'bg-emerald-500/60',
  },
  {
    name: 'Corporate Treasury Adoption',
    signal: 'Emerging',
    velocity: '+180%',
    velocityWidth: '65%',
    category: 'Institutional',
    number: '02',
    theme: 'light' as const,
    badgeColor: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    velocityColor: 'bg-amber-500/50',
  },
  {
    name: 'Mining Difficulty ATH',
    signal: 'Early',
    velocity: '+45%',
    velocityWidth: '25%',
    category: 'Technical',
    number: '03',
    theme: 'dark' as const,
    badgeColor: 'text-white/50 bg-white/10 border-white/20',
    velocityColor: 'bg-white/30',
  },
];

export function TrendsPage() {
  return (
    <>
      <SEO
        title="Trends Dashboard - Emerging Narrative Detection | Perception"
        description="Surface emerging narratives before they go mainstream. Real-time trend detection across 450+ sources with signal classification and velocity tracking."
        url="https://perception.to/features/trends"
        keywords={['narrative detection', 'trend analysis', 'market intelligence', 'emerging narratives', 'signal detection']}
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
                  <span className="text-[10px] font-mono text-black/40 tracking-wider">01</span>
                  <span className="text-6xl font-black text-black/[0.08]">TD</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  Trends Dashboard
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-4">
                  See what's emerging before everyone else. The Trends Dashboard surfaces narratives across 450+ sources, classifies them by signal strength, and shows you how fast they're spreading.
                </p>
                <p className="text-base text-black/40 mb-8">
                  Narratives move markets. Know which ones are building momentum.
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

                  {/* Visual: Trends list */}
                  <div className="relative h-full p-6 sm:p-8 flex items-center justify-center">
                    <div className="w-full max-w-sm space-y-2.5">
                      {/* Trend row 1 - Strong signal */}
                      <div className="bg-white/[0.08] backdrop-blur border border-white/15 rounded-xl p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-white/90 font-medium block truncate">Strategic Bitcoin Reserve</span>
                            <span className="text-[10px] text-white/40">Policy</span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-emerald-400 font-medium">+340%</span>
                            <span className="px-2 py-0.5 text-[9px] rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Strong
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Trend row 2 - Emerging signal */}
                      <div className="bg-white/[0.06] border border-white/10 rounded-xl p-3.5 opacity-85">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-amber-400/70 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-white/80 font-medium block truncate">Corporate Treasury Adoption</span>
                            <span className="text-[10px] text-white/35">Institutional</span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-amber-400/80 font-medium">+180%</span>
                            <span className="px-2 py-0.5 text-[9px] rounded-full bg-amber-500/15 text-amber-400/80 border border-amber-500/25">
                              Emerging
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Trend row 3 - Early signal */}
                      <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3.5 opacity-65">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-white/30 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-white/60 font-medium block truncate">Mining Difficulty ATH</span>
                            <span className="text-[10px] text-white/30">Technical</span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-white/40 font-medium">+45%</span>
                            <span className="px-2 py-0.5 text-[9px] rounded-full bg-white/10 text-white/40 border border-white/15">
                              Early
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Trend row 4 - Faded */}
                      <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3.5 opacity-40">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-white/20 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="h-2 w-32 bg-white/10 rounded" />
                            <div className="h-1.5 w-16 bg-white/[0.06] rounded mt-1.5" />
                          </div>
                        </div>
                      </div>

                      {/* Stats footer */}
                      <div className="flex items-center justify-center gap-4 pt-2">
                        <span className="text-[10px] text-white/40">450+ sources</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[10px] text-white/40">Updated every 90s</span>
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
                How it works
              </h2>
              <p className="text-lg text-black/50">
                From noise to signal in seconds.
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

        {/* Example Trends */}
        <section className="py-20 sm:py-28 bg-white border-y border-black/5">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                Example trends
              </h2>
              <p className="text-lg text-black/50">
                What you'd see in your dashboard right now.
              </p>
            </div>

            <div className="space-y-4">
              {exampleTrends.map((trend) => (
                <div
                  key={trend.number}
                  className={`group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 overflow-hidden hover:shadow-xl ${
                    trend.theme === 'light'
                      ? 'bg-gradient-to-br from-white to-zinc-100 border border-black/[0.06] hover:shadow-black/5'
                      : 'bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:shadow-black/20'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                    {/* Left: Number and title */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-[10px] font-mono tracking-wider ${
                          trend.theme === 'light' ? 'text-black/40' : 'text-white/40'
                        }`}>{trend.number}</span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${trend.badgeColor}`}>
                          {trend.signal}
                        </span>
                      </div>
                      <h3 className={`text-xl font-semibold mb-1 ${
                        trend.theme === 'light' ? 'text-black' : 'text-white'
                      }`}>{trend.name}</h3>
                      <span className={`text-sm ${
                        trend.theme === 'light' ? 'text-black/50' : 'text-white/50'
                      }`}>{trend.category}</span>
                    </div>

                    {/* Right: Velocity */}
                    <div className="sm:text-right flex-shrink-0">
                      <div className="flex items-baseline gap-1 sm:justify-end">
                        <span className={`text-3xl font-semibold tracking-tight ${
                          trend.signal === 'Strong' ? 'text-emerald-500' :
                          trend.signal === 'Emerging' ? 'text-amber-500' :
                          trend.theme === 'light' ? 'text-black/60' : 'text-white/60'
                        }`}>{trend.velocity}</span>
                      </div>
                      <p className={`text-xs mt-1 ${
                        trend.theme === 'light' ? 'text-black/40' : 'text-white/40'
                      }`}>7d velocity</p>
                    </div>
                  </div>

                  {/* Velocity bar */}
                  <div className="mt-5">
                    <div className={`h-1.5 rounded-full ${
                      trend.theme === 'light' ? 'bg-black/[0.06]' : 'bg-white/10'
                    }`}>
                      <div
                        className={`h-full rounded-full ${trend.velocityColor} transition-all duration-500`}
                        style={{ width: trend.velocityWidth }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center mt-10 text-black/40 text-sm">
              Live trends updated every 90 seconds across 450+ sources.
            </p>
          </div>
        </section>

        {/* Video Walkthrough */}
        <section className="py-20 sm:py-28 bg-black">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
                See it in action
              </h2>
              <p className="text-lg text-white/50">
                Watch a walkthrough of the Trends Dashboard.
              </p>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/OTedJvx3i3g?start=1135&rel=0&modestbranding=1"
                title="Trends Dashboard Walkthrough"
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
                  See what's trending now
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  Book a demo and we'll show you the live dashboard.
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

export default TrendsPage;
