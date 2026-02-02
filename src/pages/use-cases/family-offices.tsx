import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowRight, FileText, Calendar } from 'lucide-react';
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

// Sample data
const weeklyHighlights = [
  { topic: 'ETF Flows', summary: 'Record inflows of $2.1B this week. BlackRock and Fidelity leading.', sentiment: 'positive' },
  { topic: 'Regulatory', summary: 'SEC approved new custody framework. Market response positive.', sentiment: 'positive' },
  { topic: 'Mining', summary: 'Halving impact stabilizing. Hash rate at new highs.', sentiment: 'neutral' },
];

const narrativeTrends = [
  { name: 'Institutional Adoption', trend: '+45%', direction: 'up' },
  { name: 'Treasury Strategy', trend: '+28%', direction: 'up' },
  { name: 'Regulatory Clarity', trend: '+12%', direction: 'up' },
];

export function FamilyOfficesPage() {
  return (
    <>
      <SEO
        title="Digital Asset Intelligence for Family Offices | Perception"
        description="Stay informed on your digital asset allocation without reading 50 newsletters. One intelligence brief, once a week, with everything that matters."
        url="https://perception.to/use-cases/family-offices"
        keywords={['family office Bitcoin', 'Bitcoin investment intelligence', 'institutional Bitcoin', 'crypto intelligence', 'Bitcoin narrative tracking']}
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
                <p className="text-sm font-medium text-black/40 mb-4 tracking-wide uppercase">For Family Offices</p>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  Stay informed without the noise.
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  You've allocated to digital assets. You don't have time to read 50 crypto newsletters. One intelligence brief, once a week, with everything your investment committee needs to know.
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

              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-indigo-50/50 to-violet-50/50 p-5 sm:p-6 border border-black/[0.04]">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 rounded-3xl blur-3xl opacity-60" />
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
                              app.perception.to/briefs
                            </div>
                          </div>
                          <div className="w-16" />
                        </div>

                        <div className="p-4 space-y-3 bg-[#0f0f0f]">
                          {/* Weekly brief header */}
                          <div className="rounded-xl bg-[#1a1a1a] border border-white/[0.06] p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                  <FileText className="h-5 w-5 text-indigo-400" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white">Weekly Intelligence Brief</p>
                                  <p className="text-[10px] text-white/40">Week of Jan 20-27, 2025</p>
                                </div>
                              </div>
                              <button className="h-7 px-3 text-[10px] font-medium bg-white text-black hover:bg-white/90 rounded-full">
                                View Full
                              </button>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] text-white/40">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" />
                                Delivered every Monday
                              </span>
                              <span>12 key developments</span>
                              <span>3 action items</span>
                            </div>
                          </div>

                          {/* Highlights */}
                          <div className="rounded-xl bg-[#1a1a1a] border border-white/[0.06] overflow-hidden">
                            <div className="px-4 py-3 border-b border-white/[0.06]">
                              <p className="text-xs font-medium text-white">This Week's Highlights</p>
                            </div>
                            <div className="divide-y divide-white/[0.04]">
                              {weeklyHighlights.map((item, i) => (
                                <div key={i} className="px-4 py-3">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      item.sentiment === 'positive' ? 'bg-emerald-400' : 'bg-yellow-400'
                                    }`} />
                                    <span className="text-xs font-medium text-white">{item.topic}</span>
                                  </div>
                                  <p className="text-[11px] text-white/50 leading-relaxed">{item.summary}</p>
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

        {/* Feature 1: Narrative Tracking */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <p className="text-xs font-medium text-black/40 uppercase tracking-wide mb-4">Narrative Intelligence</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-5">
                  Know what's driving the market
                </h2>
                <p className="text-lg text-black/50 leading-relaxed mb-8">
                  Track the narratives that move digital asset markets. Institutional adoption accelerating? Regulatory headwinds emerging? Know before your next committee meeting.
                </p>
                <Link to="/features/trends" className="group inline-flex items-center gap-2 text-sm font-medium text-black">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-emerald-50/50 to-teal-50/50 p-5 sm:p-6 border border-black/[0.04]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />
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
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-3">Trending Narratives - 30 Days</p>
                        <div className="space-y-3">
                          {narrativeTrends.map((item, i) => (
                            <div key={i} className="p-3 rounded-lg bg-[#1a1a1a] border border-white/[0.04]">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-white">{item.name}</span>
                                <span className="text-xs font-semibold text-emerald-400 tabular-nums">{item.trend}</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-emerald-400"
                                  style={{ width: `${45 + i * 20}%` }}
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

        {/* Feature 2: Quarterly Reports - Dark section */}
        <section className="py-24 sm:py-32 bg-black">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 lg:order-1 rounded-3xl bg-gradient-to-br from-white/[0.04] via-blue-500/[0.03] to-indigo-500/[0.03] p-5 sm:p-6 border border-white/[0.06]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-violet-500/20 rounded-3xl blur-2xl" />
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
                            <p className="text-xs font-medium text-white">Q4 2024 Market Review</p>
                            <p className="text-[10px] text-white/40 mt-0.5">Quarterly intelligence report</p>
                          </div>
                          <button className="h-7 px-3 text-[10px] font-medium bg-white text-black hover:bg-white/90 rounded-full">
                            Download PDF
                          </button>
                        </div>
                        <div className="space-y-2">
                          {[
                            { section: 'Market Overview', summary: 'Bitcoin up 47% in Q4. ETF approvals drove institutional narrative to all-time highs.' },
                            { section: 'Regulatory Landscape', summary: 'US custody framework approved. EU MiCA implementation on track. Asia mixed signals.' },
                            { section: 'Allocation Considerations', summary: 'Institutional adoption accelerating. Risk-adjusted positioning considerations for Q1.' },
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
                <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-4">Quarterly Intelligence</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  Brief your committee with confidence
                </h2>
                <p className="text-lg text-white/50 leading-relaxed mb-8">
                  Quarterly reports that put digital asset developments in context. Market overview, regulatory landscape, and allocation considerations—all in plain English.
                </p>
                <Link to="/sample-reports/sector-deep-dive" className="group inline-flex items-center gap-2 text-sm font-medium text-white">
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
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight">Weekly</p>
                <p className="text-sm text-black/40 mt-3">Intelligence briefs</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight"><AnimatedStat value={450} suffix="+" /></p>
                <p className="text-sm text-black/40 mt-3">Sources monitored</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight"><AnimatedStat value={5} suffix="min" /></p>
                <p className="text-sm text-black/40 mt-3">Weekly read time</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight">Cited</p>
                <p className="text-sm text-black/40 mt-3">Every claim sourced</p>
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
                  Stay informed, not overwhelmed
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  15-minute demo. We'll show you what an institutional-grade intelligence brief looks like.
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

export default FamilyOfficesPage;
