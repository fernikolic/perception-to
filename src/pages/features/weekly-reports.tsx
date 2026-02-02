import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

const reportSections = [
  {
    number: '01',
    title: 'Market sentiment overview',
    description: 'A snapshot of overall market sentiment with week-over-week comparisons and key drivers.',
    badge: 'Sentiment',
    badgeColor: 'text-emerald-600/70 bg-emerald-500/10',
    theme: 'light' as const,
  },
  {
    number: '02',
    title: 'Top narratives',
    description: 'The most discussed themes across all sources, ranked by volume and velocity.',
    badge: 'Narratives',
    badgeColor: 'text-orange-400/90 bg-orange-500/15',
    theme: 'dark' as const,
  },
  {
    number: '03',
    title: 'Company spotlight',
    description: 'Coverage summary for companies on your watchlist with sentiment trends and key mentions.',
    badge: 'Companies',
    badgeColor: 'text-blue-400/90 bg-blue-500/15',
    theme: 'dark' as const,
  },
  {
    number: '04',
    title: 'Notable coverage',
    description: 'Hand-picked articles and analysis worth reading, with direct links to sources.',
    badge: 'Coverage',
    badgeColor: 'text-violet-600/70 bg-violet-500/10',
    theme: 'light' as const,
  },
];

const benefits = [
  { title: 'Save hours of reading', description: 'Get a week of coverage summarized in one email', badge: 'text-blue-600/70 bg-blue-500/10' },
  { title: 'Never miss key stories', description: 'Important coverage surfaces automatically', badge: 'text-emerald-600/70 bg-emerald-500/10' },
  { title: 'Track what matters', description: 'Customize based on your watchlist', badge: 'text-violet-600/70 bg-violet-500/10' },
  { title: 'Share with your team', description: 'Forward-ready format for distribution', badge: 'text-amber-600/70 bg-amber-500/10' },
];

export function WeeklyReportsPage() {
  return (
    <>
      <SEO
        title="Weekly Intelligence Reports - Automated Market Digests | Perception"
        description="Receive automated weekly reports summarizing market sentiment, top narratives, and coverage for your watchlist. Save hours of research time."
        url="https://perception.to/features/weekly-reports"
        keywords={['weekly reports', 'market digest', 'intelligence briefing', 'automated reports', 'market summary']}
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
                  <span className="text-[10px] font-mono text-black/40 tracking-wider">06</span>
                  <span className="text-6xl font-black text-black/[0.08]">WR</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  Weekly Reports
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-4">
                  Stay informed without the daily reading. Every Monday, get a comprehensive summary of market sentiment, top narratives, and coverage for your watchlist.
                </p>
                <p className="text-base text-black/40 mb-8">
                  A week of coverage. One email.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <BookDemoButton className="h-12 px-8 rounded-full" />
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-black/60 hover:text-black hover:bg-black/5 h-12 px-6 rounded-full font-medium"
                    onClick={() => {
                      document.getElementById('report-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    See what's included
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

                  {/* Visual: Email report preview */}
                  <div className="relative h-full p-6 sm:p-8 flex items-center justify-center">
                    <div className="w-full max-w-xs">
                      {/* Email preview card */}
                      <div className="bg-white/[0.08] backdrop-blur border border-white/15 rounded-xl overflow-hidden">
                        {/* Email header */}
                        <div className="px-4 py-3 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-white/80 font-bold">P</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-white/80 font-medium">Weekly Intelligence</div>
                              <div className="text-[10px] text-white/40">Monday, 9:00 AM</div>
                            </div>
                          </div>
                        </div>

                        {/* Report sections */}
                        <div className="p-3 space-y-2.5">
                          {/* Sentiment section */}
                          <div className="flex items-center gap-3 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-base font-bold text-emerald-400">↑</span>
                            </div>
                            <div>
                              <span className="text-xs text-white/70 font-medium">Bullish</span>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-emerald-400">+12%</span>
                                <span className="text-[10px] text-white/30">vs last week</span>
                              </div>
                            </div>
                          </div>

                          {/* Narratives section */}
                          <div className="p-2.5 bg-white/[0.04] border border-white/[0.06] rounded-lg">
                            <span className="text-[10px] text-orange-400/80 font-medium block mb-2">TOP NARRATIVES</span>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-3">
                                <div className="h-1.5 flex-1 bg-white/20 rounded" />
                                <span className="text-[9px] text-emerald-400 flex-shrink-0">+180%</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="h-1.5 flex-1 bg-white/15 rounded" />
                                <span className="text-[9px] text-emerald-400/70 flex-shrink-0">+95%</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="h-1.5 flex-1 bg-white/10 rounded" />
                                <span className="text-[9px] text-white/40 flex-shrink-0">+12%</span>
                              </div>
                            </div>
                          </div>

                          {/* Watchlist preview */}
                          <div className="p-2.5 bg-white/[0.04] border border-white/[0.06] rounded-lg">
                            <span className="text-[10px] text-blue-400/80 font-medium block mb-2">YOUR WATCHLIST</span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="px-2 py-0.5 text-[9px] bg-white/10 rounded text-white/50">MSTR</span>
                              <span className="px-2 py-0.5 text-[9px] bg-white/10 rounded text-white/50">MARA</span>
                              <span className="px-2 py-0.5 text-[9px] bg-white/10 rounded text-white/50">+3</span>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="px-3 py-2.5 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[10px] text-white/40">847 articles</span>
                          <span className="text-[10px] text-blue-400/70">View report →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Report Sections Grid */}
        <section id="report-section" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                What's included
              </h2>
              <p className="text-lg text-black/50">
                Everything you need to stay current.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {reportSections.map((section) => (
                <div
                  key={section.number}
                  className={`group relative rounded-2xl p-8 transition-all duration-300 overflow-hidden ${
                    section.theme === 'light'
                      ? 'bg-gradient-to-br from-white to-zinc-100 border border-black/[0.06] hover:shadow-xl hover:shadow-black/5'
                      : 'bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:shadow-xl hover:shadow-black/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-[10px] font-mono tracking-wider ${
                      section.theme === 'light' ? 'text-black/40' : 'text-white/40'
                    }`}>{section.number}</span>
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${section.badgeColor}`}>
                      {section.badge}
                    </span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    section.theme === 'light' ? 'text-black' : 'text-white'
                  }`}>{section.title}</h3>
                  <p className={`leading-relaxed ${
                    section.theme === 'light' ? 'text-black/60' : 'text-white/60'
                  }`}>{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Report Preview */}
        <section className="py-20 sm:py-28 bg-white border-y border-black/5">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                Example report
              </h2>
            </div>

            <div className="bg-[#FAFAFA] rounded-3xl p-8 border border-black/5 shadow-xl">
              {/* Email Header */}
              <div className="pb-6 border-b border-black/10 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-black font-semibold">Weekly Intelligence Report</span>
                  <span className="text-black/40 text-sm">Jan 20, 2025</span>
                </div>
                <p className="text-black/50 text-sm">Your personalized market digest for MicroStrategy, Marathon Digital, and 3 more.</p>
              </div>

              {/* Sentiment Summary */}
              <div className="mb-6 pb-6 border-b border-black/10">
                <span className="text-xs font-medium text-emerald-600/70 bg-emerald-500/10 px-3 py-1.5 rounded-full">Market Sentiment</span>
                <div className="flex items-center gap-8 mt-4">
                  <div>
                    <span className="text-3xl font-bold text-black">Bullish</span>
                    <p className="text-black/40 text-sm">Overall sentiment</p>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-emerald-600">+12%</span>
                    <p className="text-black/40 text-sm">vs. last week</p>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-black">847</span>
                    <p className="text-black/40 text-sm">articles analyzed</p>
                  </div>
                </div>
              </div>

              {/* Top Narratives */}
              <div className="mb-6">
                <span className="text-xs font-medium text-orange-600/70 bg-orange-500/10 px-3 py-1.5 rounded-full">Top Narratives</span>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-black">Strategic Bitcoin Reserve legislation</span>
                    <span className="text-emerald-600 font-medium">+180%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black">Corporate treasury adoption</span>
                    <span className="text-emerald-600 font-medium">+95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black">Mining difficulty adjustment</span>
                    <span className="text-black/50 font-medium">+12%</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 text-center">
                <span className="text-blue-600 text-sm font-medium">View full report →</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-black">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
                Why teams love this
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${benefit.badge}`}>
                    {benefit.title}
                  </span>
                  <p className="text-white/60 text-sm mt-4">{benefit.description}</p>
                </div>
              ))}
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
                Watch a walkthrough of Report Generation.
              </p>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/OTedJvx3i3g?start=2246&rel=0&modestbranding=1"
                title="Report Generation Walkthrough"
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
                  Get your first report
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  Book a demo and we'll set up your personalized weekly digest.
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

export default WeeklyReportsPage;
