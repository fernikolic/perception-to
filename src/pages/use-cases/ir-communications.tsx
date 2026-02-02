import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowRight, TrendingUp, Bell } from 'lucide-react';
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

// Animation hook for hero counters (triggers immediately on load)
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

// Sample data
const recentCoverage = [
  { outlet: 'Bloomberg', headline: 'Company announces Q4 treasury expansion', time: '2h ago', sentiment: 'positive' },
  { outlet: 'CoinDesk', headline: 'CEO interview on institutional adoption', time: '4h ago', sentiment: 'positive' },
  { outlet: 'WSJ', headline: 'Industry roundup mentions company strategy', time: '6h ago', sentiment: 'neutral' },
];

const competitorMentions = [
  { company: 'Competitor A', mentions: 234, change: '+12%', sentiment: 'positive' },
  { company: 'Competitor B', mentions: 189, change: '-5%', sentiment: 'negative' },
  { company: 'Your Company', mentions: 312, change: '+28%', sentiment: 'positive' },
];

export function IRCommunicationsPage() {
  const mentionsCount = useCounter(847, 1500);
  const positiveCount = useCounter(72, 1500);

  return (
    <>
      <SEO
        title="Media Intelligence for IR & Communications Teams | Perception"
        description="Real-time coverage tracking, competitive analysis, and board-ready reports. Know exactly where you stand before your CEO asks."
        url="https://perception.to/use-cases/ir-communications"
        keywords={['IR intelligence', 'communications tracking', 'media monitoring', 'competitive analysis', 'board reports']}
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
              <div className="lg:col-span-5">
                <p className="text-sm font-medium text-black/40 mb-4 tracking-wide uppercase">For IR & Communications</p>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  Know about coverage before your CEO asks.
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  Bloomberg just mentioned your company. A competitor made an announcement. The board wants a media update. You have the answers before anyone asks the question.
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
                      See sample report
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-emerald-50/50 to-cyan-50/50 p-5 sm:p-6 border border-black/[0.04]">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl opacity-60" />
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
                              app.perception.to/coverage
                            </div>
                          </div>
                          <div className="w-16" />
                        </div>

                        <div className="p-4 space-y-3 bg-[#0f0f0f]">
                          {/* Stats row */}
                          <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 rounded-xl bg-[#1a1a1a] border border-white/[0.06]">
                              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Total Mentions</p>
                              <p className="text-xl font-semibold text-white tabular-nums">{mentionsCount}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-[#1a1a1a] border border-white/[0.06]">
                              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Positive</p>
                              <p className="text-xl font-semibold text-emerald-400 tabular-nums">{positiveCount}%</p>
                            </div>
                            <div className="p-3 rounded-xl bg-[#1a1a1a] border border-white/[0.06]">
                              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">vs Last Week</p>
                              <p className="text-xl font-semibold text-emerald-400 tabular-nums">+23%</p>
                            </div>
                          </div>

                          {/* Recent coverage */}
                          <div className="rounded-xl bg-[#1a1a1a] border border-white/[0.06] overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                              <p className="text-xs font-medium text-white">Recent Coverage</p>
                              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-[10px] text-emerald-400 font-medium">
                                <Bell className="h-2.5 w-2.5" />
                                3 new
                              </span>
                            </div>
                            <div className="divide-y divide-white/[0.04]">
                              {recentCoverage.map((item, i) => (
                                <div key={i} className="px-4 py-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-medium text-white/50">{item.outlet}</span>
                                    <span className="text-[10px] text-white/30">{item.time}</span>
                                  </div>
                                  <p className="text-xs text-white/70">{item.headline}</p>
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
            </div>
          </div>
        </section>

        {/* Feature 1: Competitor Tracking */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <p className="text-xs font-medium text-black/40 uppercase tracking-wide mb-4">Competitive Intelligence</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-5">
                  See how you stack up
                </h2>
                <p className="text-lg text-black/50 leading-relaxed mb-8">
                  Track share of voice against competitors. Know when they're getting coverage you're not. Spot narrative gaps before they become problems.
                </p>
                <Link to="/features/research" className="group inline-flex items-center gap-2 text-sm font-medium text-black">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-amber-50/50 to-orange-50/50 p-5 sm:p-6 border border-black/[0.04]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-2xl" />
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
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3">Share of Voice - This Week</p>
                        <div className="space-y-3">
                          {competitorMentions.map((item, i) => (
                            <div key={i} className="p-3 rounded-lg bg-[#1a1a1a] border border-white/[0.04]">
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-xs font-medium ${item.company === 'Your Company' ? 'text-emerald-400' : 'text-white/70'}`}>
                                  {item.company}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-white/50 tabular-nums">{item.mentions} mentions</span>
                                  <span className={`text-[10px] font-medium tabular-nums ${item.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {item.change}
                                  </span>
                                </div>
                              </div>
                              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${item.company === 'Your Company' ? 'bg-emerald-400' : 'bg-white/30'}`}
                                  style={{ width: `${(item.mentions / 312) * 100}%` }}
                                />
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

        {/* Feature 2: Board Reports - Dark section */}
        <section className="py-24 sm:py-32 bg-black">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 lg:order-1 rounded-3xl bg-gradient-to-br from-white/[0.04] via-violet-500/[0.03] to-purple-500/[0.03] p-5 sm:p-6 border border-white/[0.06]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl" />
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
                            <p className="text-xs font-medium text-white">Weekly Board Brief</p>
                            <p className="text-[10px] text-white/40 mt-0.5">Week of Jan 20-27, 2025</p>
                          </div>
                          <button className="h-7 px-3 text-[10px] font-medium bg-white text-black hover:bg-white/90 rounded-full">
                            Export PDF
                          </button>
                        </div>
                        <div className="space-y-2">
                          {[
                            { section: 'Coverage Summary', summary: 'Total mentions up 23% WoW. Key driver: product launch coverage in Bloomberg and CoinDesk.' },
                            { section: 'Competitive Position', summary: 'Leading share of voice at 42%. Competitor A down 8% following regulatory concerns.' },
                            { section: 'Narrative Trends', summary: 'Institutional adoption narrative strengthening. Treasury strategy receiving positive coverage.' },
                          ].map((item, i) => (
                            <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                              <p className="text-xs font-medium text-white mb-1">{item.section}</p>
                              <p className="text-[11px] text-white/50 leading-relaxed">{item.summary}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-4">Board Prep</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  The report your board actually wants
                </h2>
                <p className="text-lg text-white/50 leading-relaxed mb-8">
                  Generate board-ready media briefings in minutes. Coverage summary, competitive positioning, narrative trends—all cited, all current, all in one place.
                </p>
                <Link to="/sample-reports/stakeholder-communications" className="group inline-flex items-center gap-2 text-sm font-medium text-white">
                  See sample report
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
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight"><AnimatedStat value={450} suffix="+" /></p>
                <p className="text-sm text-black/40 mt-3">Sources tracked</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight"><AnimatedStat value={90} suffix="s" /></p>
                <p className="text-sm text-black/40 mt-3">Alert speed</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight"><AnimatedStat value={5} suffix="min" /></p>
                <p className="text-sm text-black/40 mt-3">Report generation</p>
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
                  See your media landscape in real-time
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  15-minute demo. We'll show you exactly what's being said about your company.
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

export default IRCommunicationsPage;
