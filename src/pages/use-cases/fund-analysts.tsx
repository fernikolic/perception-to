import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowRight, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

// Hook to detect when element is in viewport
function useInView<T extends Element = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Animation hook that triggers immediately (for hero elements visible on load)
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  return count;
}

// Animated stat component with scroll trigger
function AnimatedStat({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, isInView } = useInView<HTMLSpanElement>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1500, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

// Sparkline component with scroll trigger
function Sparkline({ trend }: { trend: 'up' | 'down' }) {
  const { ref, isInView } = useInView<SVGSVGElement>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 4;
        });
      }, 30);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timeout);
  }, [isInView]);

  const points = trend === 'up'
    ? [12, 10, 14, 11, 15, 13, 18, 16, 20]
    : [18, 20, 16, 19, 14, 17, 12, 15, 10];

  const pathD = points.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * 5} ${24 - y}`).join(' ');

  return (
    <svg ref={ref} width="40" height="24" className="overflow-visible">
      <path
        d={pathD}
        fill="none"
        stroke={trend === 'up' ? '#10b981' : '#ef4444'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="100"
        strokeDashoffset={100 - progress}
      />
    </svg>
  );
}

// Sample data
const watchlistCompanies = [
  { ticker: 'MSTR', name: 'MicroStrategy', sentiment: 72, change: '+8%', trend: 'up' as const },
  { ticker: 'MARA', name: 'Marathon Digital', sentiment: 58, change: '-3%', trend: 'down' as const },
  { ticker: 'COIN', name: 'Coinbase', sentiment: 65, change: '+12%', trend: 'up' as const },
];

const recentSearches = [
  { query: 'MSTR treasury strategy', results: 234, sentiment: 'positive', trend: '+24%' },
  { query: 'Bitcoin ETF flows Q1', results: 1847, sentiment: 'positive', trend: '+156%' },
  { query: 'Mining economics halving', results: 892, sentiment: 'neutral', trend: '+45%' },
];

const briefSections = [
  { title: 'Market Positioning', preview: 'MSTR sentiment up 23% WoW driven by treasury announcement coverage...', citations: 12 },
  { title: 'Competitive Analysis', preview: 'Marathon gaining share of voice in mining efficiency narrative...', citations: 8 },
  { title: 'Risk Factors', preview: 'Regulatory concerns around custody requirements surfacing...', citations: 5 },
];

export function FundAnalystsPage() {
  const indexCount = useCounter(72, 1500);

  return (
    <>
      <SEO
        title="Bitcoin Research Platform for Fund Analysts | Perception"
        description="Track media sentiment, analyze earnings calls, and generate investment memos with full citations. Research digital asset companies in minutes, not hours."
        url="https://perception.to/use-cases/fund-analysts"
        keywords={['fund analyst research', 'Bitcoin equity research', 'MSTR analysis', 'earnings call analysis', 'Bitcoin sentiment tracking']}
      />

      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Hero */}
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20 bg-white border-b border-black/5">
          <div className="mx-auto max-w-6xl px-6">
            <Link to="/use-cases" className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-black transition-colors mb-8">
              <span>←</span>
              <span>Use Cases</span>
            </Link>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div className="lg:col-span-5">
                <p className="text-sm font-medium text-black/40 mb-4 tracking-wide uppercase">For Fund Analysts</p>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  Research any Bitcoin equity in minutes.
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  Your IC wants to know why MSTR sentiment shifted. You need the answer in 15 minutes, not 3 hours of reading. Research any digital asset company with full citations.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <BookDemoButton className="h-12 px-8 rounded-full" />
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-black/60 hover:text-black hover:bg-black/5 h-12 px-6 rounded-full font-medium"
                    asChild
                  >
                    <Link to="/sample-reports/stakeholder-communications">
                      See sample brief
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: Dashboard preview */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-blue-50/50 to-purple-50/50 p-5 sm:p-6 border border-black/[0.04]">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl blur-3xl opacity-60" />
                    <div className="relative rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-200 p-[1px] shadow-2xl shadow-black/20">
                      <div className="rounded-2xl bg-[#1a1a1a] overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border-b border-white/5">
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                          </div>
                          <div className="flex-1 flex justify-center">
                            <div className="px-4 py-1 rounded-md bg-[#1a1a1a] text-[11px] text-white/40 font-medium">
                              app.perception.to/watchlist
                            </div>
                          </div>
                          <div className="w-16" />
                        </div>

                        <div className="p-4 space-y-3 bg-[#0f0f0f]">
                          {/* Watchlist */}
                          <div className="rounded-xl bg-[#1a1a1a] border border-white/[0.06] overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                              <p className="text-xs font-medium text-white">Your Watchlist</p>
                              <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Live
                              </span>
                            </div>
                            <div className="divide-y divide-white/[0.04]">
                              {watchlistCompanies.map((company, i) => (
                                <div key={i} className="flex items-center justify-between px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/60">{company.ticker}</span>
                                    <span className="text-xs text-white/70">{company.name}</span>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <Sparkline trend={company.trend} />
                                    <div className="text-right">
                                      <p className={`text-sm font-semibold tabular-nums ${company.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {company.sentiment}
                                      </p>
                                      <div className="flex items-center gap-1 justify-end">
                                        {company.trend === 'up' ? (
                                          <TrendingUp className="h-2.5 w-2.5 text-emerald-400" />
                                        ) : (
                                          <TrendingDown className="h-2.5 w-2.5 text-red-400" />
                                        )}
                                        <span className={`text-[10px] ${company.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                                          {company.change}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Quick stats */}
                          <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 rounded-xl bg-[#1a1a1a] border border-white/[0.06]">
                              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Avg Sentiment</p>
                              <p className="text-xl font-semibold text-emerald-400 tabular-nums">{indexCount}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-[#1a1a1a] border border-white/[0.06]">
                              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Alerts Today</p>
                              <p className="text-xl font-semibold text-white tabular-nums">7</p>
                            </div>
                            <div className="p-3 rounded-xl bg-[#1a1a1a] border border-white/[0.06]">
                              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">New Stories</p>
                              <p className="text-xl font-semibold text-white tabular-nums">142</p>
                            </div>
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

        {/* Feature 1: Research */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <p className="text-xs font-medium text-black/40 uppercase tracking-wide mb-4">Research Hub</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-5">
                  Due diligence in minutes, not days
                </h2>
                <p className="text-lg text-black/50 leading-relaxed mb-8">
                  Search any company, topic, or narrative across 450+ sources. See sentiment trends, key sources, and generate cited briefs your IC will actually read.
                </p>
                <Link to="/features/research" className="group inline-flex items-center gap-2 text-sm font-medium text-black">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-purple-50/50 to-pink-50/50 p-5 sm:p-6 border border-black/[0.04]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
                  <div className="relative rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-200 p-[1px] shadow-2xl shadow-black/10">
                    <div className="rounded-2xl bg-[#1a1a1a] overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2a] border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                        </div>
                      </div>
                      <div className="p-4 bg-[#0f0f0f]">
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/10 bg-[#1a1a1a] mb-4">
                          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <span className="text-white/70 text-sm">MSTR treasury strategy analysis</span>
                        </div>
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3">Recent searches</p>
                        <div className="space-y-2">
                          {recentSearches.map((search, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a] border border-white/[0.04]">
                              <div className="flex items-center gap-2.5">
                                <span className={`w-2 h-2 rounded-full ${
                                  search.sentiment === 'positive' ? 'bg-emerald-400' :
                                  search.sentiment === 'negative' ? 'bg-red-400' : 'bg-yellow-400'
                                }`} />
                                <span className="text-xs text-white/60">{search.query}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] text-white/30 tabular-nums">{search.results.toLocaleString()} results</span>
                                <span className="text-[10px] font-medium text-emerald-400 tabular-nums">{search.trend}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2: Briefs - Dark section */}
        <section className="py-24 sm:py-32 bg-black">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 lg:order-1 rounded-3xl bg-gradient-to-br from-white/[0.04] via-emerald-500/[0.03] to-blue-500/[0.03] p-5 sm:p-6 border border-white/[0.06]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
                  <div className="relative rounded-2xl bg-gradient-to-b from-white/20 to-white/5 p-[1px] shadow-2xl">
                    <div className="rounded-2xl bg-[#0a0a0a] overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#151515] border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-xs font-medium text-white">Investment Brief: MSTR</p>
                            <p className="text-[10px] text-white/40 mt-0.5">Generated Jan 27, 2025 • 25 citations</p>
                          </div>
                          <button className="h-7 px-3 text-[10px] font-medium bg-white text-black hover:bg-white/90 rounded-full">
                            Export PDF
                          </button>
                        </div>
                        <div className="space-y-2">
                          {briefSections.map((section, i) => (
                            <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                              <div className="flex items-center justify-between mb-1.5">
                                <p className="text-xs font-medium text-white">{section.title}</p>
                                <span className="text-[9px] text-white/30 font-medium">{section.citations} citations</span>
                              </div>
                              <p className="text-[11px] text-white/50 leading-relaxed">{section.preview}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-4">Investment Memos</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  Briefs your IC will actually read
                </h2>
                <p className="text-lg text-white/50 leading-relaxed mb-8">
                  Generate cited research briefs on any company or narrative. Every claim links to its source. The kind of analysis that used to require a junior analyst and a weekend.
                </p>
                <Link to="/sample-reports/stakeholder-communications" className="group inline-flex items-center gap-2 text-sm font-medium text-white">
                  See sample brief
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-white border-y border-black/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight"><AnimatedStat value={15} suffix="+" /></p>
                <p className="text-sm text-black/40 mt-3">Bitcoin equities tracked</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight"><AnimatedStat value={90} suffix="s" /></p>
                <p className="text-sm text-black/40 mt-3">Update frequency</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight"><AnimatedStat value={450} suffix="+" /></p>
                <p className="text-sm text-black/40 mt-3">Sources tracked</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight">24/7</p>
                <p className="text-sm text-black/40 mt-3">Coverage</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl bg-black p-12 sm:p-16">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  See it with your portfolio
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  15-minute demo. Tell us what you're covering and we'll show you the sentiment landscape.
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

export default FundAnalystsPage;
