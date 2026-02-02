import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

// Simulated live data
const liveMetrics = [
  {
    label: 'Perception Index',
    value: 67,
    change: '+4.2%',
    trend: 'up',
    color: 'emerald',
    sparkline: [40, 45, 42, 50, 55, 52, 60, 67]
  },
  {
    label: 'Stories Today',
    value: 2847,
    change: '+12%',
    trend: 'up',
    color: 'blue',
    sparkline: [1800, 2100, 1900, 2400, 2200, 2600, 2500, 2847]
  },
  {
    label: 'Sentiment',
    value: 'Bullish',
    change: 'from Neutral',
    trend: 'up',
    color: 'emerald',
    badge: true
  },
];

const trendingNarratives = [
  { title: 'ETF inflows accelerate', sentiment: 'positive', sources: 47, velocity: 340, hot: true },
  { title: 'Regulatory clarity in EU', sentiment: 'positive', sources: 31, velocity: 180 },
  { title: 'Mining difficulty adjustment', sentiment: 'neutral', sources: 24, velocity: 95 },
  { title: 'Exchange reserves declining', sentiment: 'positive', sources: 19, velocity: 67 },
];

const recentSearches = [
  { query: 'MicroStrategy Bitcoin holdings', results: 847, sentiment: 'positive', trend: '+23%' },
  { query: 'SEC ETF decision timeline', results: 1243, sentiment: 'neutral', trend: '+8%' },
  { query: 'Mining profitability 2024', results: 312, sentiment: 'negative', trend: '-12%' },
];

const recentAlerts = [
  { company: 'MSTR', event: 'Sentiment spike detected', time: '2m ago', type: 'sentiment', urgent: true },
  { company: 'COIN', event: 'New coverage from Bloomberg', time: '8m ago', type: 'coverage' },
  { company: 'RIOT', event: 'Narrative shift: Mining costs', time: '23m ago', type: 'narrative' },
];

const briefSections = [
  { title: 'Executive Summary', preview: 'Bitcoin sentiment shifted bullish following ETF inflow data. Key drivers include...', citations: 12 },
  { title: 'Key Narratives', preview: '3 emerging themes across institutional coverage this week require attention...', citations: 8 },
  { title: 'Risk Factors', preview: 'Regulatory uncertainty in 2 jurisdictions. Mining cost pressures in Q4...', citations: 5 },
];

const sources = [
  { name: 'Bloomberg', type: 'tier1' },
  { name: 'Reuters', type: 'tier1' },
  { name: 'WSJ', type: 'tier1' },
  { name: 'FT', type: 'tier1' },
  { name: 'CoinDesk', type: 'crypto' },
  { name: 'The Block', type: 'crypto' },
];

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnMount: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!startOnMount || hasStarted) return;
    setHasStarted(true);

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
  }, [end, duration, startOnMount, hasStarted]);

  return count;
}

// Animated sparkline component
function Sparkline({ data, color }: { data: number[], color: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const width = 60;
  const height = 24;

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
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Typing animation component
function TypedText({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, 80);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayedText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
}

// Animated velocity bar
function VelocityBar({ velocity, delay = 0 }: { velocity: number, delay?: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth(velocity);
    }, delay);
    return () => clearTimeout(timeout);
  }, [velocity, delay]);

  return (
    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-white/60 transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export function InvestorLanding() {
  const indexCount = useCounter(67);
  const storiesCount = useCounter(2847);

  return (
    <>
      <SEO
        title="Market Intelligence for Investors | Perception"
        description="Track sentiment shifts, surface emerging narratives, and generate cited research briefs. 450+ sources updated every 90 seconds."
        url="https://perception.to/investor"
        keywords={['market intelligence', 'sentiment analysis', 'investment research', 'narrative tracking']}
      />

      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Hero */}
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20 bg-white border-b border-black/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
              {/* Left: Copy */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <p className="text-sm font-medium text-black/40 mb-4 tracking-wide uppercase">
                  For investors & analysts
                </p>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.08] mb-6">
                  The narrative moves first. Then the price.
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  Institutional investors are using media narrative shifts as leading indicators. Perception surfaces these signals from 450+ sources before they're priced in.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-black/90 h-12 px-8 rounded-full font-medium shadow-lg shadow-black/20"
                    asChild
                  >
                    <Link to="/book-a-call">
                      Book a demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
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

              {/* Right: Live dashboard preview */}
              <div className="lg:col-span-7">
                {/* Background container */}
                <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-blue-50/50 to-purple-50/50 p-5 sm:p-6 border border-black/[0.04]">
                  {/* Browser window container */}
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl blur-3xl opacity-60" />

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
                        {/* Metric cards */}
                        <div className="grid grid-cols-3 gap-3">
                          {liveMetrics.map((metric, idx) => (
                            <div
                              key={metric.label}
                              className="p-4 rounded-xl bg-[#1a1a1a] border border-white/[0.06]"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-[10px] text-white/40 uppercase tracking-wider">{metric.label}</p>
                                {metric.sparkline && (
                                  <Sparkline
                                    data={metric.sparkline}
                                    color={metric.color === 'emerald' ? '#10b981' : '#3b82f6'}
                                  />
                                )}
                              </div>
                              {metric.badge ? (
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    {metric.value}
                                  </span>
                                </div>
                              ) : (
                                <p className={`text-2xl font-semibold tracking-tight tabular-nums ${metric.color === 'emerald' ? 'text-emerald-400' : 'text-white'}`}>
                                  {idx === 0 ? indexCount : idx === 1 ? storiesCount.toLocaleString() : metric.value}
                                </p>
                              )}
                              <div className="flex items-center gap-1 mt-1.5">
                                {metric.trend === 'up' ? (
                                  <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 text-red-400" />
                                )}
                                <span className={`text-[10px] font-medium ${metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                                  {metric.change}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Trending narratives */}
                        <div className="rounded-xl bg-[#1a1a1a] border border-white/[0.06] overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                            <p className="text-xs font-medium text-white">Trending Narratives</p>
                            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Live
                            </span>
                          </div>
                          <div className="divide-y divide-white/[0.04]">
                            {trendingNarratives.map((narrative, i) => {
                              const velocityCount = useCounter(narrative.velocity, 1500);
                              return (
                                <div
                                  key={i}
                                  className="flex items-center justify-between px-4 py-2.5"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className={`w-2 h-2 rounded-full ${
                                      narrative.sentiment === 'positive' ? 'bg-emerald-400' :
                                      narrative.sentiment === 'negative' ? 'bg-red-400' : 'bg-yellow-400'
                                    }`} />
                                    <span className="text-xs text-white/70">{narrative.title}</span>
                                    {narrative.hot && (
                                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-orange-500/20 text-orange-400">Hot</span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-4 text-[10px]">
                                    <span className="text-white/30">{narrative.sources} sources</span>
                                    <span className="text-emerald-400 font-semibold tabular-nums">+{velocityCount}%</span>
                                  </div>
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

        {/* Feature 1: Research Hub */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <p className="text-xs font-medium text-black/40 uppercase tracking-wide mb-4">Deep Research</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-5">
                  Due diligence that used to take days
                </h2>
                <p className="text-lg text-black/50 leading-relaxed mb-8">
                  What's the media saying about a potential investment? Search everything written in the last year, filtered by sentiment. Export with citations for your IC memo.
                </p>
                <Link to="/features/research" className="group inline-flex items-center gap-2 text-sm font-medium text-black">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Research UI */}
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
                          <span className="text-white/70 text-sm">
                            <TypedText text="Bitcoin ETF institutional flows" delay={1000} />
                          </span>
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
                                <span className={`text-[10px] font-medium tabular-nums ${search.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                                  {search.trend}
                                </span>
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

        {/* Feature 2: Alerts */}
        <section className="py-24 sm:py-32 bg-black">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Alerts UI */}
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
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs font-medium text-white">Recent Alerts</p>
                          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-[10px] text-emerald-400 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            3 new
                          </span>
                        </div>
                        <div className="space-y-2">
                          {recentAlerts.map((alert, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                              <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${alert.urgent ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/50'}`}>
                                  {alert.company}
                                </span>
                                <span className="text-xs text-white/70">{alert.event}</span>
                              </div>
                              <span className="text-[10px] text-white/30">{alert.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-4">Portfolio Monitoring</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  Your watchlist, watched
                </h2>
                <p className="text-lg text-white/50 leading-relaxed mb-8">
                  MSTR sentiment spiked 40% this morning. MARA is getting mentioned alongside regulatory concerns. Your Slack lights up before the market opens.
                </p>
                <Link to="/features/alerts" className="group inline-flex items-center gap-2 text-sm font-medium text-white">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3: Intelligence Briefs */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <p className="text-xs font-medium text-black/40 uppercase tracking-wide mb-4">Investment Memos</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-5">
                  Research briefs your IC will actually read
                </h2>
                <p className="text-lg text-black/50 leading-relaxed mb-8">
                  Generate cited briefs on any company or narrative. Every claim links to its source. The kind of research that used to require a junior analyst and a weekend.
                </p>
                <Link to="/sample-reports/stakeholder-communications" className="group inline-flex items-center gap-2 text-sm font-medium text-black">
                  See sample brief
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Brief UI */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-cyan-50/50 to-emerald-50/50 p-5 sm:p-6 border border-black/[0.04]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl" />
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
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-xs font-medium text-white">Weekly Intelligence Brief</p>
                            <p className="text-[10px] text-white/40 mt-0.5">Generated Jan 27, 2025 • 25 citations</p>
                          </div>
                          <button className="h-7 px-3 text-[10px] font-medium bg-white text-black hover:bg-white/90 rounded-full">
                            Export PDF
                          </button>
                        </div>
                        <div className="space-y-2">
                          {briefSections.map((section, i) => (
                            <div key={i} className="p-3 rounded-lg bg-[#1a1a1a] border border-white/[0.04]">
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
                { value: '24/7', label: 'Coverage' },
                { value: '2M+', label: 'Articles indexed' },
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
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                    See it with your own watchlist
                  </h2>
                  <p className="text-lg text-white/60 mb-8">
                    Book a 20-minute demo. We'll set you up with the companies you actually track and show you how the sentiment has moved.
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 h-12 px-8 rounded-full font-medium shadow-lg"
                    asChild
                  >
                    <Link to="/book-a-call">
                      Book a demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    'Live sentiment data for your portfolio companies',
                    'Trending narratives and emerging stories',
                    'Research hub with your first custom brief',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-white">
                        {i + 1}
                      </span>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default InvestorLanding;
