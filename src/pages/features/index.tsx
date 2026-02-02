import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowUpRight } from 'lucide-react';
import SEO from '@/components/SEO';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

const features = [
  {
    number: '01',
    abbrev: 'TD',
    title: 'Trends Dashboard',
    description: 'Surface emerging narratives before they go mainstream. See signal strength, velocity, and how fast stories are spreading across 450+ sources.',
    href: '/features/trends',
    badge: 'Real-time detection',
    badgeColor: 'text-orange-600/70 bg-orange-500/10',
    theme: 'light' as const,
  },
  {
    number: '02',
    abbrev: 'RH',
    title: 'Research Hub',
    description: 'Multi-keyword search across every source we track. Filter by sentiment, compare competitors side-by-side, export with full citations.',
    href: '/features/research',
    badge: '450+ sources',
    badgeColor: 'text-blue-600/70 bg-blue-500/10',
    theme: 'dark' as const,
  },
  {
    number: '03',
    abbrev: 'AL',
    title: 'Real-Time Alerts',
    description: 'Get notified the moment something happens. Mention alerts, sentiment spikes, volume changes, journalist coverage—delivered to Slack or email.',
    href: '/features/alerts',
    badge: 'Instant delivery',
    badgeColor: 'text-emerald-400/90 bg-emerald-500/15',
    theme: 'dark' as const,
  },
  {
    number: '04',
    abbrev: 'JI',
    title: 'Journalist Intelligence',
    description: 'Track which reporters cover your space, their sentiment history, and what they\'re writing about. Know who to pitch and when.',
    href: '/features/journalist-intelligence',
    badge: 'Media tracking',
    badgeColor: 'text-violet-600/70 bg-violet-500/10',
    theme: 'light' as const,
  },
  {
    number: '05',
    abbrev: 'SP',
    title: 'Spaces',
    description: 'Organize your research into workspaces. Track competitors, monitor topics, collaborate with your team—all in one place.',
    href: '/features/spaces',
    badge: 'Collaboration',
    badgeColor: 'text-cyan-600/70 bg-cyan-500/10',
    theme: 'light' as const,
  },
  {
    number: '06',
    abbrev: 'WR',
    title: 'Weekly Reports',
    description: 'Automated intelligence briefs delivered every week. Everything that matters about your topics, summarized and cited.',
    href: '/features/weekly-reports',
    badge: 'Automated',
    badgeColor: 'text-amber-400/90 bg-amber-500/15',
    theme: 'dark' as const,
  },
  {
    number: '07',
    abbrev: 'MI',
    title: 'Media Intelligence',
    description: '450+ sources monitored in real-time. Financial media, crypto news, social platforms, podcasts, and video—all indexed and searchable.',
    href: '/features/sources',
    badge: '450+ sources',
    badgeColor: 'text-rose-400/90 bg-rose-500/15',
    theme: 'dark' as const,
  },
  {
    number: '08',
    abbrev: 'EA',
    title: 'Earnings Analysis',
    description: 'Automated summaries of earnings calls and financial reports. Key metrics, sentiment shifts, and executive commentary extracted.',
    href: '/features/earnings-analysis',
    badge: 'Auto-summarized',
    badgeColor: 'text-teal-600/70 bg-teal-500/10',
    theme: 'light' as const,
  },
];

export function FeaturesIndex() {
  return (
    <>
      <SEO
        title="Product Features | Perception - Bitcoin Intelligence Platform"
        description="Explore Perception's intelligence features: trend detection, research tools, real-time alerts, journalist tracking, automated reports, and more. 450+ sources monitored."
        url="https://perception.to/product"
        keywords={['Bitcoin intelligence', 'trend detection', 'crypto research', 'media monitoring', 'sentiment analysis']}
      />

      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Hero */}
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 bg-white border-b border-black/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5">
                <p className="text-sm font-medium text-black/40 mb-4 tracking-wide uppercase">Product</p>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  From noise to signal in seconds.
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  From emerging trends to journalist coverage, from real-time alerts to automated reports. One platform that replaces your entire research stack.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <BookDemoButton className="h-12 px-8 rounded-full" />
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-black/60 hover:text-black hover:bg-black/5 h-12 px-6 rounded-full font-medium"
                    asChild
                  >
                    <Link to="/features/sample-report">
                      See a sample report
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: Feature cards with ASCII background */}
              <div className="lg:col-span-7">
                <div className="relative h-[400px] sm:h-[450px]">
                  {/* ASCII background */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-black">
                      <DelicateAsciiDots />
                    </div>
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  {/* Floating cards */}
                  <div className="relative h-full p-6 sm:p-8">
                    {/* Top row */}
                    <div className="flex gap-4 mb-4">
                      {/* Trends card */}
                      <div className="flex-1 bg-gradient-to-br from-white to-zinc-100 rounded-2xl p-5 shadow-xl border border-white/20 group hover:scale-[1.02] transition-transform">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <span className="text-[10px] font-mono text-black/40 tracking-wider">01</span>
                            <h3 className="font-semibold text-black text-lg">Trends</h3>
                          </div>
                          <span className="text-4xl font-black text-black/10">TD</span>
                        </div>
                        <p className="text-sm text-black/60 leading-relaxed">Emerging narratives in real-time</p>
                      </div>

                      {/* Research card */}
                      <div className="flex-1 bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-5 shadow-xl border border-white/10 group hover:scale-[1.02] transition-transform">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <span className="text-[10px] font-mono text-white/40 tracking-wider">02</span>
                            <h3 className="font-semibold text-white text-lg">Research</h3>
                          </div>
                          <span className="text-4xl font-black text-white/10">RH</span>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">Search 450+ sources instantly</p>
                      </div>
                    </div>

                    {/* Center stat */}
                    <div className="flex justify-center my-5">
                      <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm rounded-full px-8 py-3 border border-white/10">
                        <span className="text-white font-medium text-sm tracking-wide">8 core features <span className="text-white/40 mx-2">→</span> 1 platform</span>
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div className="flex gap-4">
                      {/* Alerts card */}
                      <div className="flex-1 bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-5 shadow-xl border border-white/10 group hover:scale-[1.02] transition-transform">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <span className="text-[10px] font-mono text-white/40 tracking-wider">03</span>
                            <h3 className="font-semibold text-white text-lg">Alerts</h3>
                          </div>
                          <span className="text-4xl font-black text-white/10">AL</span>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">Instant Slack & email notifications</p>
                      </div>

                      {/* Reports card */}
                      <div className="flex-1 bg-gradient-to-br from-white to-zinc-100 rounded-2xl p-5 shadow-xl border border-white/20 group hover:scale-[1.02] transition-transform">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <span className="text-[10px] font-mono text-black/40 tracking-wider">06</span>
                            <h3 className="font-semibold text-black text-lg">Reports</h3>
                          </div>
                          <span className="text-4xl font-black text-black/10">WR</span>
                        </div>
                        <p className="text-sm text-black/60 leading-relaxed">Automated weekly intelligence</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <Link
                  key={feature.number}
                  to={feature.href}
                  className={`group relative rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                    feature.theme === 'light'
                      ? 'bg-gradient-to-br from-white to-zinc-100 border border-black/[0.06] hover:shadow-black/10'
                      : 'bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:shadow-black/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className={`text-[10px] font-mono tracking-wider ${
                        feature.theme === 'light' ? 'text-black/40' : 'text-white/40'
                      }`}>{feature.number}</span>
                      <h3 className={`text-2xl font-semibold ${
                        feature.theme === 'light' ? 'text-black' : 'text-white'
                      }`}>{feature.title}</h3>
                    </div>
                    <span className={`text-6xl font-black transition-colors ${
                      feature.theme === 'light'
                        ? 'text-black/[0.06] group-hover:text-black/10'
                        : 'text-white/[0.06] group-hover:text-white/10'
                    }`}>{feature.abbrev}</span>
                  </div>
                  <p className={`leading-relaxed mb-6 max-w-sm ${
                    feature.theme === 'light' ? 'text-black/60' : 'text-white/60'
                  }`}>
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${feature.badgeColor}`}>
                      {feature.badge}
                    </span>
                    <div className={`flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all ${
                      feature.theme === 'light' ? 'text-black' : 'text-white'
                    }`}>
                      Learn more
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-black">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-white tracking-tight">450+</p>
                <p className="text-sm text-white/40 mt-3">Sources tracked</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-white tracking-tight">90s</p>
                <p className="text-sm text-white/40 mt-3">Update frequency</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-white tracking-tight">8</p>
                <p className="text-sm text-white/40 mt-3">Core features</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-white tracking-tight">24/7</p>
                <p className="text-sm text-white/40 mt-3">Coverage</p>
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
                  See the full platform
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  15-minute demo. We'll walk through every feature with your data.
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

export default FeaturesIndex;
