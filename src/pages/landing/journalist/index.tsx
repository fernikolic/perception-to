import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowRight } from 'lucide-react';
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

// Typing animation component (scroll-triggered)
function TypedText({ text, delay = 0 }: { text: string, delay?: number }) {
  const { ref, isInView } = useInView<HTMLSpanElement>();
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isInView) return;

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
  }, [text, delay, isInView]);

  return (
    <span ref={ref}>
      {displayedText}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
}

// Animated bar component (scroll-triggered)
function AnimatedBar({ width, delay = 0, className, isInView = false }: { width: number, delay?: number, className: string, isInView?: boolean }) {
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      setCurrentWidth(width);
    }, delay);
    return () => clearTimeout(timeout);
  }, [width, delay, isInView]);

  return (
    <div
      className={`h-full rounded-full transition-all duration-1000 ease-out ${className}`}
      style={{ width: `${currentWidth}%` }}
    />
  );
}

// Animated chart bar (scroll-triggered)
function AnimatedChartBar({ height, delay = 0, isInView = false }: { height: number, delay?: number, isInView?: boolean }) {
  const [currentHeight, setCurrentHeight] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      setCurrentHeight(height);
    }, delay);
    return () => clearTimeout(timeout);
  }, [height, delay, isInView]);

  return (
    <div
      className="flex-1 rounded-t bg-emerald-500 transition-all duration-700 ease-out"
      style={{ height: `${currentHeight}%` }}
    />
  );
}

// Animated chart wrapper with scroll trigger
function AnimatedChart({ data }: { data: number[] }) {
  const { ref, isInView } = useInView();
  return (
    <div ref={ref} className="h-32 flex items-end justify-between gap-0.5">
      {data.map((val, i) => (
        <AnimatedChartBar key={i} height={val} delay={100 + i * 20} isInView={isInView} />
      ))}
    </div>
  );
}

// Animated number display (scroll-triggered)
function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number, suffix?: string, prefix?: string }) {
  const { ref, isInView } = useInView<HTMLSpanElement>();
  const count = useCounter(value, 1500, isInView);
  return <span ref={ref} className="tabular-nums">{prefix}{count.toLocaleString()}{suffix}</span>;
}

// Story row component (scroll-triggered)
function StoryRow({ story, index }: { story: typeof trendingStories[0], index: number }) {
  const { ref, isInView } = useInView();
  const velocityNum = parseInt(story.velocity.replace(/[^0-9]/g, ''));
  const animatedVelocity = useCounter(velocityNum, 1500, isInView);

  return (
    <div ref={ref} className="flex items-center justify-between px-5 py-3.5 hover:bg-black/[0.02] transition-colors group cursor-pointer">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ring-4 ${
          story.sentiment === 'positive' ? 'bg-emerald-500 ring-emerald-500/20' :
          story.sentiment === 'negative' ? 'bg-red-500 ring-red-500/20' : 'bg-yellow-500 ring-yellow-500/20'
        }`} />
        <span className="text-sm text-black/80 group-hover:text-black transition-colors truncate">{story.title}</span>
        {story.hot && (
          <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-100 text-orange-600">Hot</span>
        )}
      </div>
      <div className="flex items-center gap-5 text-xs flex-shrink-0 ml-4">
        <span className="text-black/40">{story.outlets} outlets</span>
        <span className="text-emerald-600 font-semibold tabular-nums">+{animatedVelocity}%</span>
      </div>
    </div>
  );
}

// Velocity row component for dark section (scroll-triggered)
function VelocityRow({ label, velocity, trendNum, index }: { label: string, velocity: number, trendNum: number, index: number }) {
  const { ref, isInView } = useInView();
  const animatedTrend = useCounter(trendNum, 1500, isInView);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/80">{label}</span>
        <span className="text-xs text-emerald-400 font-medium tabular-nums">+{animatedTrend}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <AnimatedBar width={velocity} delay={100 + index * 100} className="bg-white/60" isInView={isInView} />
      </div>
    </div>
  );
}

// Simulated data for journalist use case
const trendingStories = [
  { title: 'Bitcoin ETF inflows hit $2.1B this week', sentiment: 'positive', outlets: 34, velocity: '+420%', hot: true },
  { title: 'MicroStrategy announces new BTC purchase', sentiment: 'positive', outlets: 28, velocity: '+280%' },
  { title: 'Regulatory hearing scheduled for March', sentiment: 'neutral', outlets: 19, velocity: '+145%' },
  { title: 'Mining difficulty reaches all-time high', sentiment: 'neutral', outlets: 15, velocity: '+89%' },
];

const sourceResults = [
  { outlet: 'Bloomberg', headline: 'Bitcoin ETFs See Record Inflows Amid Institutional Demand', time: '2h ago', sentiment: 'positive' },
  { outlet: 'Reuters', headline: 'Cryptocurrency Markets Rally as ETF Momentum Builds', time: '4h ago', sentiment: 'positive' },
  { outlet: 'WSJ', headline: 'Wall Street Warms to Bitcoin as Asset Class Matures', time: '6h ago', sentiment: 'positive' },
];

const chartData = [
  { label: 'Positive', value: 64, color: 'bg-emerald-500' },
  { label: 'Neutral', value: 28, color: 'bg-yellow-500' },
  { label: 'Negative', value: 8, color: 'bg-red-500' },
];

const sources = [
  { name: 'Bloomberg', type: 'tier1' },
  { name: 'Reuters', type: 'tier1' },
  { name: 'WSJ', type: 'tier1' },
  { name: 'CoinDesk', type: 'crypto' },
  { name: 'The Block', type: 'crypto' },
  { name: 'Decrypt', type: 'crypto' },
];

export function JournalistLanding() {
  return (
    <>
      <SEO
        title="Bitcoin Media Intelligence for Journalists | Perception"
        description="Find the next big story before it breaks. Track trending narratives, research companies, and get up to speed instantly with 450+ sources."
        url="https://perception.to/journalist"
        keywords={['Bitcoin journalism', 'cryptocurrency news', 'media research', 'story discovery', 'Bitcoin trends']}
      />

      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Hero */}
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-20 bg-white border-b border-black/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
              {/* Left: Copy */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <p className="text-sm font-medium text-black/40 mb-4 tracking-wide uppercase">For journalists & editors</p>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.08] mb-6">
                  Your competitors are already writing that story
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  Every journalist is watching the same feeds. Perception shows you what's accelerating before it peaks—so you're first, not fifth.
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

              {/* Right: Trending stories preview */}
              <div className="lg:col-span-7">
                {/* Background container */}
                <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-orange-50/50 to-rose-50/50 p-5 sm:p-6 border border-black/[0.04]">
                  {/* Browser window container */}
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-rose-500/20 to-purple-500/20 rounded-3xl blur-3xl opacity-60" />

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
                        {/* Trending stories panel */}
                        <div className="rounded-xl bg-[#1a1a1a] border border-white/[0.06] overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                            <p className="text-xs font-medium text-white">Trending Stories</p>
                            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Live
                            </span>
                          </div>
                          <div className="divide-y divide-white/[0.04]">
                            {trendingStories.map((story, i) => {
                              const velocityNum = parseInt(story.velocity.replace(/[^0-9]/g, ''));
                              return (
                                <div key={i} className="flex items-center justify-between px-4 py-2.5">
                                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                    <span className={`flex-shrink-0 w-2 h-2 rounded-full ${
                                      story.sentiment === 'positive' ? 'bg-emerald-400' :
                                      story.sentiment === 'negative' ? 'bg-red-400' : 'bg-yellow-400'
                                    }`} />
                                    <span className="text-xs text-white/70 truncate">{story.title}</span>
                                    {story.hot && (
                                      <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-orange-500/20 text-orange-400">Hot</span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-4 text-[10px] flex-shrink-0 ml-3">
                                    <span className="text-white/30">{story.outlets} outlets</span>
                                    <span className="text-emerald-400 font-semibold tabular-nums">+{velocityNum}%</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Sentiment bar */}
                        <div className="rounded-xl bg-[#1a1a1a] border border-white/[0.06] p-4">
                          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3">Today's Sentiment</p>
                          <div className="flex items-center gap-1.5 mb-3 h-2">
                            {chartData.map((item, i) => (
                              <AnimatedBar
                                key={i}
                                width={item.value}
                                delay={800 + i * 200}
                                className={item.color}
                              />
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-[10px]">
                            {chartData.map((item, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                                <span className="text-white/40">{item.label}</span>
                                <span className="text-white font-medium"><AnimatedNumber value={item.value} suffix="%" /></span>
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

        {/* Feature 1: Research */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <p className="text-xs font-medium text-black/40 uppercase tracking-wide mb-4">Background Research</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-5">
                  The research that usually takes all morning
                </h2>
                <p className="text-lg text-black/50 leading-relaxed mb-8">
                  Editor assigns a story at 9am. By 9:15 you know every angle that's been covered, who the key sources are, and what hasn't been written yet.
                </p>
                <Link to="/features/research" className="group inline-flex items-center gap-2 text-sm font-medium text-black">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Research UI */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-orange-50/50 to-rose-50/50 p-5 sm:p-6 border border-black/[0.04]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 via-rose-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
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
                            <TypedText text="Bitcoin ETF inflows" delay={1000} />
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[10px] text-white/30 uppercase tracking-wider">Top results</p>
                          <span className="text-[10px] text-white/40"><AnimatedNumber value={847} suffix=" articles" /></span>
                        </div>
                        <div className="space-y-2">
                          {sourceResults.map((result, i) => (
                            <div key={i} className="p-3 rounded-lg bg-[#1a1a1a] border border-white/[0.04]">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-medium text-white/50">{result.outlet}</span>
                                <span className="text-[10px] text-white/30">{result.time}</span>
                              </div>
                              <p className="text-xs text-white/70">{result.headline}</p>
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

        {/* Feature 2: Trends - Dark section */}
        <section className="py-24 sm:py-32 bg-black">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Trends UI */}
              <div className="order-2 lg:order-1 rounded-3xl bg-gradient-to-br from-white/[0.04] via-orange-500/[0.03] to-rose-500/[0.03] p-5 sm:p-6 border border-white/[0.06]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-rose-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
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
                          <p className="text-xs font-medium text-white">Narrative Velocity</p>
                          <span className="text-[10px] text-white/30">Last 24 hours</span>
                        </div>
                        <div className="space-y-3">
                          {[
                            { label: 'ETF Inflows', velocity: 94, trendNum: 340 },
                            { label: 'Institutional Adoption', velocity: 78, trendNum: 180 },
                            { label: 'Mining Economics', velocity: 45, trendNum: 67 },
                          ].map((item, i) => (
                            <VelocityRow key={i} label={item.label} velocity={item.velocity} trendNum={item.trendNum} index={i} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-4">Story Discovery</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  See what's accelerating, not what's already peaked
                </h2>
                <p className="text-lg text-white/50 leading-relaxed mb-8">
                  ETF inflows up 340% in mentions today. That's a story. By the time it's on everyone's front page, you've already filed.
                </p>
                <Link to="/features/trends" className="group inline-flex items-center gap-2 text-sm font-medium text-white">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3: Data visualization */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <p className="text-xs font-medium text-black/40 uppercase tracking-wide mb-4">Citations & Data</p>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-5">
                  Every claim backed by a source
                </h2>
                <p className="text-lg text-black/50 leading-relaxed mb-8">
                  "Sentiment shifted bullish after the ETF news" isn't a claim—it's data you can cite. Export charts for your piece. Link every statement to its source.
                </p>
                <Link to="/features/research" className="group inline-flex items-center gap-2 text-sm font-medium text-black">
                  See sample exports
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Chart preview */}
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
                          <p className="text-xs font-medium text-white">Bitcoin Sentiment - 30 Days</p>
                          <button className="h-7 px-3 text-[10px] font-medium bg-white text-black hover:bg-white/90 rounded-full">
                            Export
                          </button>
                        </div>
                        {/* Simulated chart */}
                        <AnimatedChart data={[45, 52, 48, 55, 62, 58, 64, 68, 72, 65, 70, 75, 78, 74, 80, 76, 82, 85, 79, 83, 88, 84, 90, 86, 92, 88, 94, 90, 95, 92]} />
                        <div className="flex items-center justify-between mt-3 text-[10px] text-white/30">
                          <span>30 days ago</span>
                          <span>Today</span>
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
                { value: '2M+', label: 'Articles indexed' },
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
                  See what's trending in your beat right now
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  15-minute demo. Tell us what you cover and we'll show you the stories accelerating today.
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

export default JournalistLanding;
