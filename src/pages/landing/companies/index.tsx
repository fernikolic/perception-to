import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowRight, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
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

// Animation hook that triggers when visible
function useCounter(end: number, duration: number = 2000, isInView: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

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
    }, 100);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, isInView]);

  return count;
}

// Simulated data for companies use case
const watchlistCompanies = [
  { name: 'MicroStrategy', ticker: 'MSTR', sentiment: 78, change: '+12%', trend: 'up', mentions: 847 },
  { name: 'Coinbase', ticker: 'COIN', sentiment: 65, change: '+5%', trend: 'up', mentions: 623 },
  { name: 'Marathon Digital', ticker: 'MARA', sentiment: 42, change: '-8%', trend: 'down', mentions: 312 },
];

const competitorInsights = [
  { company: 'Competitor A', narrative: 'Expanding into custody services', sentiment: 'positive', coverage: 34 },
  { company: 'Competitor B', narrative: 'Leadership transition announced', sentiment: 'neutral', coverage: 28 },
  { company: 'Competitor C', narrative: 'Partnership with major bank', sentiment: 'positive', coverage: 45 },
];

const narrativeShifts = [
  { narrative: 'Institutional adoption accelerating', direction: 'up', velocity: '+180%' },
  { narrative: 'Regulatory clarity improving', direction: 'up', velocity: '+95%' },
  { narrative: 'Mining profitability concerns', direction: 'down', velocity: '-45%' },
];

const sources = [
  { name: 'Bloomberg', type: 'tier1' },
  { name: 'Reuters', type: 'tier1' },
  { name: 'CoinDesk', type: 'crypto' },
  { name: 'The Block', type: 'crypto' },
  { name: 'SEC Filings', type: 'regulatory' },
  { name: 'Earnings Calls', type: 'corporate' },
];

// Animated sparkline component (scroll-triggered)
function MiniSparkline({ trend, isInView = false }: { trend: 'up' | 'down', isInView?: boolean }) {
  const [progress, setProgress] = useState(0);
  const data = trend === 'up'
    ? [30, 35, 32, 40, 45, 42, 55, 60, 58, 70, 78]
    : [70, 65, 68, 55, 50, 52, 45, 40, 38, 42, 42];

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 1) {
            clearInterval(interval);
            return 1;
          }
          return p + 0.05;
        });
      }, 50);
      return () => clearInterval(interval);
    }, 200);
    return () => clearTimeout(timeout);
  }, [isInView]);

  const width = 48;
  const height = 20;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const visiblePoints = Math.floor(data.length * progress);
  const points = data.slice(0, visiblePoints).map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={trend === 'up' ? '#10b981' : '#ef4444'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Company row with animated values (scroll-triggered)
function CompanyRow({ company }: { company: typeof watchlistCompanies[0] }) {
  const { ref, isInView } = useInView();
  const animatedSentiment = useCounter(company.sentiment, 1500, isInView);
  const animatedMentions = useCounter(company.mentions, 1500, isInView);
  const changeNum = parseInt(company.change.replace(/[^0-9]/g, ''));
  const animatedChange = useCounter(changeNum, 1500, isInView);

  return (
    <div ref={ref} className="flex items-center justify-between px-5 py-4 hover:bg-black/[0.02] transition-colors group cursor-pointer">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm font-medium text-black group-hover:text-black/80 transition-colors">{company.name}</p>
          <p className="text-xs text-black/40">{company.ticker}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <MiniSparkline trend={company.trend as 'up' | 'down'} isInView={isInView} />
        <div className="text-right">
          <p className={`text-lg font-semibold tabular-nums ${company.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
            {animatedSentiment}
          </p>
          <div className="flex items-center gap-1 justify-end">
            {company.trend === 'up' ? (
              <ArrowUpRight className="h-3 w-3 text-emerald-500" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500" />
            )}
            <span className={`text-xs font-medium tabular-nums ${company.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
              {company.trend === 'up' ? '+' : '-'}{animatedChange}%
            </span>
          </div>
        </div>
        <span className="text-xs text-black/40 w-20 text-right tabular-nums">{animatedMentions} mentions</span>
      </div>
    </div>
  );
}

// Narrative shift row with animation (scroll-triggered)
function NarrativeRow({ shift }: { shift: typeof narrativeShifts[0] }) {
  const { ref, isInView } = useInView();
  const velocityNum = parseInt(shift.velocity.replace(/[^0-9]/g, ''));
  const animatedVelocity = useCounter(velocityNum, 1500, isInView);

  return (
    <div ref={ref} className="flex items-center justify-between">
      <span className="text-sm text-black/70">{shift.narrative}</span>
      <span className={`text-xs font-semibold tabular-nums ${shift.direction === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
        {shift.direction === 'up' ? '+' : '-'}{animatedVelocity}%
      </span>
    </div>
  );
}

// Animated number for coverage stats (scroll-triggered)
function AnimatedStat({ value, suffix = '' }: { value: number, suffix?: string }) {
  const { ref, isInView } = useInView<HTMLSpanElement>();
  const count = useCounter(value, 1500, isInView);
  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

// Hero watchlist item with scroll-triggered animation
function HeroWatchlistItem({ company }: { company: typeof watchlistCompanies[0] }) {
  const { ref, isInView } = useInView();
  const animatedSentiment = useCounter(company.sentiment, 1500, isInView);

  return (
    <div ref={ref} className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="text-xs font-medium text-white">{company.name}</p>
        <p className="text-[10px] text-white/30">{company.ticker}</p>
      </div>
      <div className="flex items-center gap-4">
        <MiniSparkline trend={company.trend as 'up' | 'down'} isInView={isInView} />
        <div className="text-right">
          <p className={`text-sm font-semibold tabular-nums ${company.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {animatedSentiment}
          </p>
          <div className="flex items-center gap-1 justify-end">
            {company.trend === 'up' ? (
              <ArrowUpRight className="h-2.5 w-2.5 text-emerald-400" />
            ) : (
              <ArrowDownRight className="h-2.5 w-2.5 text-red-400" />
            )}
            <span className={`text-[10px] font-medium tabular-nums ${company.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
              {company.change}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompaniesLanding() {
  return (
    <>
      <SEO
        title="Bitcoin Corporate Intelligence | Perception"
        description="Track competitors, monitor your coverage, and stay ahead of industry narratives. Real-time intelligence from 450+ sources for Bitcoin companies."
        url="https://perception.to/researcher"
        keywords={['Bitcoin corporate intelligence', 'competitive analysis', 'strategic insights', 'competitor monitoring']}
      />

      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Hero */}
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20 bg-white border-b border-black/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
              {/* Left: Copy */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <p className="text-sm font-medium text-black/40 mb-4 tracking-wide uppercase">For IR & communications teams</p>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.08] mb-6">
                  Your CEO shouldn't learn about coverage from Twitter
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  Every mention of your company. Every competitor move. Every narrative shift in your sector. Know it before your board asks about it.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <BookDemoButton className="h-12 px-8 rounded-full" />
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-black/60 hover:text-black hover:bg-black/5 h-12 px-6 rounded-full font-medium"
                    asChild
                  >
                    <Link to="/features/trends">
                      See how it works
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: Watchlist preview */}
              <div className="lg:col-span-7">
                {/* Background container */}
                <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-purple-50/50 to-blue-50/50 p-5 sm:p-6 border border-black/[0.04]">
                  {/* Browser window container */}
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl opacity-60" />

                    {/* Window frame */}
                    <div className="relative rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-200 p-[1px] shadow-2xl shadow-black/20">
                    <div className="rounded-2xl bg-[#1a1a1a] overflow-hidden">
                      {/* Window chrome */}
                      <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="px-4 py-1 rounded-md bg-[#1a1a1a] text-[11px] text-white/40 font-medium">
                            app.perception.to
                          </div>
                        </div>
                        <div className="w-16" />
                      </div>

                      {/* Dashboard content */}
                      <div className="p-4 space-y-3 bg-[#0f0f0f]">
                        {/* Watchlist panel */}
                        <div className="rounded-xl bg-[#1a1a1a] border border-white/[0.06] overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                            <p className="text-xs font-medium text-white">Your Watchlist</p>
                            <span className="text-[10px] text-white/30">3 companies</span>
                          </div>
                          <div className="divide-y divide-white/[0.04]">
                            {watchlistCompanies.map((company, i) => (
                              <HeroWatchlistItem key={i} company={company} />
                            ))}
                          </div>
                        </div>

                        {/* Narrative shifts */}
                        <div className="rounded-xl bg-[#1a1a1a] border border-white/[0.06] p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="h-3.5 w-3.5 text-white/30" />
                            <p className="text-[10px] text-white/40 uppercase tracking-wider">Industry Narrative Shifts</p>
                          </div>
                          <div className="space-y-2">
                            {narrativeShifts.map((shift, i) => {
                              const velocityNum = parseInt(shift.velocity.replace(/[^0-9]/g, ''));
                              return (
                                <div key={i} className="flex items-center justify-between">
                                  <span className="text-xs text-white/60">{shift.narrative}</span>
                                  <span className={`text-[10px] font-semibold tabular-nums ${shift.direction === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {shift.direction === 'up' ? '+' : '-'}{velocityNum}%
                                  </span>
                                </div>
                              );
                            })}
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

        {/* Sources */}
        <section className="py-6 bg-white border-b border-black/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-8 overflow-x-auto">
              <p className="text-xs text-black/30 uppercase tracking-wider whitespace-nowrap">450+ sources</p>
              <div className="flex items-center gap-6">
                {sources.map((source) => (
                  <span
                    key={source.name}
                    className={`text-sm font-medium whitespace-nowrap ${source.type === 'tier1' ? 'text-black/60' : 'text-black/40'}`}
                  >
                    {source.name}
                  </span>
                ))}
                <span className="text-sm text-black/30">+444 more</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 1: Competitor Intelligence */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <p className="text-xs font-medium text-black/40 uppercase tracking-wide mb-4">Competitive Intelligence</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-5">
                  "What are they saying about Coinbase?"
                </h2>
                <p className="text-lg text-black/50 leading-relaxed mb-8">
                  Your competitor just announced something. Within minutes you know the media reaction, the sentiment, and how it compares to your last announcement.
                </p>
                <Link to="/features/trends" className="group inline-flex items-center gap-2 text-sm font-medium text-black">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Competitor UI */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-amber-50/50 to-orange-50/50 p-5 sm:p-6 border border-black/[0.04]">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-red-500/15 rounded-3xl blur-2xl" />

                  {/* Window frame */}
                  <div className="relative rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-200 p-[1px] shadow-2xl shadow-black/10">
                    <div className="rounded-2xl bg-[#1a1a1a] overflow-hidden">
                      {/* Window chrome */}
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2a] border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="px-4 py-1 rounded-md bg-[#1a1a1a] text-[11px] text-white/40 font-medium">
                            app.perception.to/competitors
                          </div>
                        </div>
                        <div className="w-16" />
                      </div>

                      {/* Content */}
                      <div className="p-4 bg-[#0f0f0f]">
                        <div className="rounded-xl bg-[#1a1a1a] border border-white/[0.06] overflow-hidden">
                          <div className="px-4 py-3 border-b border-white/[0.06]">
                            <p className="text-xs font-medium text-white">Competitor Activity</p>
                          </div>
                          <div className="divide-y divide-white/[0.04]">
                            {competitorInsights.map((insight, i) => (
                              <div key={i} className="px-4 py-3 hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs font-medium text-white">{insight.company}</span>
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                    insight.sentiment === 'positive' ? 'bg-emerald-500/20 text-emerald-400' :
                                    insight.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                                  }`}>
                                    {insight.sentiment}
                                  </span>
                                </div>
                                <p className="text-xs text-white/60">{insight.narrative}</p>
                                <p className="text-[10px] text-white/30 mt-2">{insight.coverage} articles this week</p>
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
        </section>

        {/* Feature 2: Coverage Monitoring - Dark section */}
        <section className="py-24 sm:py-32 bg-black">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Coverage UI */}
              <div className="order-2 lg:order-1 rounded-3xl bg-gradient-to-br from-white/[0.04] via-emerald-500/[0.03] to-cyan-500/[0.03] p-5 sm:p-6 border border-white/[0.06]">
                <div className="relative">
                  {/* Glow effect - lighter for dark section */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50" />

                  {/* Window frame */}
                  <div className="relative rounded-2xl bg-gradient-to-b from-zinc-600 to-zinc-700 p-[1px] shadow-2xl shadow-black/30">
                    <div className="rounded-2xl bg-[#1a1a1a] overflow-hidden">
                      {/* Window chrome */}
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2a] border-b border-white/5">
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

                      {/* Content */}
                      <div className="p-4 bg-[#0f0f0f]">
                        <div className="rounded-xl bg-[#1a1a1a] border border-white/[0.06] overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                            <p className="text-xs font-medium text-white">Your Coverage</p>
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/20 text-[10px] text-emerald-400 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              12 new
                            </span>
                          </div>
                          <div className="p-4">
                            <div className="grid grid-cols-3 gap-4 mb-5">
                              <div className="text-center">
                                <p className="text-2xl font-semibold text-white"><AnimatedStat value={847} /></p>
                                <p className="text-[10px] text-white/40 mt-1">Total mentions</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-semibold text-emerald-400"><AnimatedStat value={72} suffix="%" /></p>
                                <p className="text-[10px] text-white/40 mt-1">Positive</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-semibold text-white">+<AnimatedStat value={23} suffix="%" /></p>
                                <p className="text-[10px] text-white/40 mt-1">vs last week</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {['Bloomberg featured your Q4 earnings', 'CoinDesk covered your new product', 'WSJ mentioned in industry roundup'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.04]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  <span className="text-xs text-white/70">{item}</span>
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

              <div className="order-1 lg:order-2">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-4">Media Monitoring</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  Bloomberg just mentioned you
                </h2>
                <p className="text-lg text-white/50 leading-relaxed mb-8">
                  You'll know before your CEO texts you. Every mention, every outlet, every sentiment shift—with enough context to respond intelligently.
                </p>
                <Link to="/features/alerts" className="group inline-flex items-center gap-2 text-sm font-medium text-white">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3: Executive Briefings */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <p className="text-xs font-medium text-black/40 uppercase tracking-wide mb-4">Board Prep</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-5">
                  The brief your board actually wants
                </h2>
                <p className="text-lg text-black/50 leading-relaxed mb-8">
                  "How are we being covered? What are competitors doing? What narratives should we be aware of?" One report. Every week. Fully cited.
                </p>
                <Link to="/sample-reports/stakeholder-communications" className="group inline-flex items-center gap-2 text-sm font-medium text-black">
                  See sample report
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Briefing UI */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-violet-50/50 to-purple-50/50 p-5 sm:p-6 border border-black/[0.04]">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/15 via-purple-500/15 to-fuchsia-500/15 rounded-3xl blur-2xl" />

                  {/* Window frame */}
                  <div className="relative rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-200 p-[1px] shadow-2xl shadow-black/10">
                    <div className="rounded-2xl bg-[#1a1a1a] overflow-hidden">
                      {/* Window chrome */}
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2a] border-b border-white/5">
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

                      {/* Content */}
                      <div className="p-4 bg-[#0f0f0f]">
                        <div className="rounded-xl bg-[#1a1a1a] border border-white/[0.06] overflow-hidden">
                          <div className="px-4 py-3 border-b border-white/[0.06]">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs font-medium text-white">Weekly Executive Brief</p>
                                <p className="text-[10px] text-white/30 mt-0.5">Week of Jan 20-27, 2025</p>
                              </div>
                              <Button size="sm" className="h-7 px-3 text-[10px] bg-white text-black hover:bg-white/90 rounded-full">
                                Export PDF
                              </Button>
                            </div>
                          </div>
                          <div className="p-4 space-y-3">
                            {[
                              { section: 'Market Position', summary: 'Positive coverage increased 23% week-over-week. Key driver: product launch coverage.' },
                              { section: 'Competitor Watch', summary: 'Competitor A announced custody expansion. Media response mixed.' },
                              { section: 'Narrative Trends', summary: 'Institutional adoption narrative strengthening. Consider positioning.' },
                            ].map((item, i) => (
                              <div key={i} className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.04]">
                                <p className="text-xs font-medium text-white mb-1">{item.section}</p>
                                <p className="text-[10px] text-white/50 leading-relaxed">{item.summary}</p>
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
        </section>

        {/* Stats */}
        <section className="py-20 bg-black">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '450+', label: 'Sources tracked' },
                { value: '90s', label: 'Update frequency' },
                { value: '15+', label: 'Bitcoin equities' },
                { value: '24/7', label: 'Coverage' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-5xl sm:text-6xl font-semibold text-white tracking-tight">{stat.value}</p>
                  <p className="text-sm text-white/40 mt-3">{stat.label}</p>
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
                  See what's being said about you this week
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  20-minute demo. We'll pull up your company's coverage, show you competitor sentiment, and run through a sample board brief.
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

export default CompaniesLanding;
