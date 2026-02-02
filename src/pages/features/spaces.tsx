import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

const features = [
  {
    number: '01',
    title: 'Organized research workspaces',
    description: 'Create dedicated spaces for different projects, companies, or themes. Keep your research organized and accessible.',
    badge: 'Workspaces',
    badgeColor: 'text-cyan-600/70 bg-cyan-500/10',
    theme: 'light' as const,
  },
  {
    number: '02',
    title: 'Brief generation powered by Claude & Perplexity',
    description: 'Generate research briefs using frontier AI models. Turn weeks of coverage into cited, actionable insights in seconds.',
    badge: 'AI Briefs',
    badgeColor: 'text-violet-400/90 bg-violet-500/15',
    theme: 'dark' as const,
  },
  {
    number: '03',
    title: 'Report templates',
    description: 'Pre-built templates for common use cases: earnings summaries, competitor analysis, narrative tracking, and more.',
    badge: 'Templates',
    badgeColor: 'text-emerald-400/90 bg-emerald-500/15',
    theme: 'dark' as const,
  },
  {
    number: '04',
    title: 'Export and share',
    description: 'Export your research to PDF, CSV, or share directly with your team. Every insight comes with source citations.',
    badge: 'Export',
    badgeColor: 'text-amber-600/70 bg-amber-500/10',
    theme: 'light' as const,
  },
];

const workspaceTypes = [
  { name: 'Company Research', description: 'Track specific companies over time', number: '01' },
  { name: 'Competitor Analysis', description: 'Compare coverage side-by-side', number: '02' },
  { name: 'Narrative Tracking', description: 'Follow emerging themes', number: '03' },
  { name: 'Earnings Coverage', description: 'Organize quarterly research', number: '04' },
];

export function SpacesPage() {
  return (
    <>
      <SEO
        title="Spaces & Reports - Organized Research Workspaces | Perception"
        description="Create organized research workspaces, generate briefs powered by Claude and Perplexity, and export reports with full citations. Keep your research structured and shareable."
        url="https://perception.to/features/spaces"
        keywords={['research workspaces', 'AI briefs', 'report generation', 'research organization', 'market research tools']}
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
                  <span className="text-[10px] font-mono text-black/40 tracking-wider">05</span>
                  <span className="text-6xl font-black text-black/[0.08]">SP</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  Spaces
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-4">
                  Stop losing research in browser tabs. Spaces let you organize research by project, company, or theme. Save articles, generate briefs, and export reports with full citations.
                </p>
                <p className="text-base text-black/40 mb-8">
                  Research that stays organized.
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

                  {/* Visual: Workspace folders and documents */}
                  <div className="relative h-full p-6 sm:p-8 flex items-center justify-center">
                    <div className="flex gap-3 w-full max-w-md">
                      {/* Workspace sidebar */}
                      <div className="w-14 flex-shrink-0 bg-white/[0.03] border border-white/[0.06] rounded-xl flex flex-col items-center py-4 gap-3">
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/30 border border-cyan-500/40" />
                        <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30" />
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30" />
                        <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20" />
                      </div>

                      {/* Main workspace card */}
                      <div className="flex-1 bg-white/[0.08] backdrop-blur border border-white/15 rounded-xl overflow-hidden">
                        {/* Header tabs */}
                        <div className="flex border-b border-white/10">
                          <div className="py-2.5 px-3 text-[11px] text-cyan-400/90 border-b-2 border-cyan-400/60">MSTR Research</div>
                          <div className="py-2.5 px-3 text-[11px] text-white/30">Competitors</div>
                          <div className="py-2.5 px-3 text-[11px] text-white/30 hidden sm:block">Q4</div>
                        </div>

                        {/* Content */}
                        <div className="p-3 space-y-2">
                          {/* Saved article */}
                          <div className="flex items-center gap-3 p-2.5 bg-white/[0.04] rounded-lg border border-white/[0.06]">
                            <div className="w-2 h-2 rounded-full bg-emerald-400/60 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="h-2 w-full bg-white/20 rounded" />
                            </div>
                            <span className="text-[9px] text-white/30 flex-shrink-0">CoinDesk</span>
                          </div>

                          {/* Saved article */}
                          <div className="flex items-center gap-3 p-2.5 bg-white/[0.04] rounded-lg border border-white/[0.06]">
                            <div className="w-2 h-2 rounded-full bg-blue-400/60 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="h-2 w-4/5 bg-white/20 rounded" />
                            </div>
                            <span className="text-[9px] text-white/30 flex-shrink-0">Bloomberg</span>
                          </div>

                          {/* Saved article */}
                          <div className="flex items-center gap-3 p-2.5 bg-white/[0.04] rounded-lg border border-white/[0.06]">
                            <div className="w-2 h-2 rounded-full bg-white/30 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="h-2 w-3/4 bg-white/15 rounded" />
                            </div>
                            <span className="text-[9px] text-white/30 flex-shrink-0">The Block</span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="px-3 py-2.5 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[10px] text-white/40">47 saved</span>
                          <div className="px-2.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/30">
                            <span className="text-[10px] text-violet-400">Generate Brief</span>
                          </div>
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
                How it works
              </h2>
              <p className="text-lg text-black/50">
                From scattered research to structured insights.
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

        {/* Workspace Types */}
        <section className="py-20 sm:py-28 bg-white border-y border-black/5">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                Common workspace types
              </h2>
              <p className="text-lg text-black/50">
                Pre-built templates to get you started.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {workspaceTypes.map((type) => (
                <div key={type.number} className="bg-[#FAFAFA] rounded-2xl p-8 border border-black/5 hover:shadow-lg transition-all duration-300">
                  <span className="text-5xl font-light text-black/10 block mb-4">{type.number}</span>
                  <h3 className="text-xl font-semibold text-black mb-2">{type.name}</h3>
                  <p className="text-black/50 text-sm">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brief Generation */}
        <section className="py-20 sm:py-28 bg-black">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
                Powered by frontier models
              </h2>
              <p className="text-lg text-white/50">
                Brief generation uses Claude and Perplexity to synthesize your research.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex-1">
                  <span className="text-white/50 text-sm">Space: MicroStrategy Coverage</span>
                  <p className="text-white font-medium">47 articles saved</p>
                </div>
                <div className="px-4 py-2 bg-violet-500/20 text-violet-400 rounded-full text-sm font-medium">
                  Generate Brief
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold tracking-widest text-violet-400/80 uppercase">Output</span>
                  <p className="text-white/70 mt-2 leading-relaxed">
                    2-page executive summary with key themes, sentiment analysis, notable quotes, and full source citations.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-white/50 text-sm">
                  <span>Claude & Perplexity</span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>PDF export</span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>Cited sources</span>
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
                Watch a walkthrough of Spaces & Reports.
              </p>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/OTedJvx3i3g?start=1800&rel=0&modestbranding=1"
                title="Spaces & Reports Walkthrough"
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
                  Keep your research organized
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  Book a demo and we'll set up your first workspace.
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

export default SpacesPage;
