import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import SEO from '@/components/SEO';
import { Search, Clock, FileText, ExternalLink } from 'lucide-react';

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
    }
  }, [startOnView]);

  useEffect(() => {
    if (startOnView && ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, ref };
}

// Animated bar chart for narrative section
function AnimatedNarrativeChart({ data }: { data: number[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [heights, setHeights] = useState<number[]>(data.map(() => 0));

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
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      setHeights(data);
    }, 200);

    return () => clearTimeout(timeout);
  }, [isInView, data]);

  const maxHeight = Math.max(...data);

  return (
    <div ref={ref} className="flex items-end justify-between h-16">
      {data.map((height, i) => {
        const barHeight = (heights[i] / maxHeight) * 100;
        return (
          <div key={i} className="flex-1 h-full flex items-end justify-center">
            <div
              className="w-6 bg-gradient-to-t from-amber-500 to-orange-400 rounded-[2px] transition-all duration-700 ease-out"
              style={{ height: `${barHeight}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}

export function JournalistsPage() {
  const { count: sourcesCount, ref: sourcesRef } = useCounter(450, 2000);
  const { count: hoursCount, ref: hoursRef } = useCounter(3, 1500);
  const { count: citationsCount, ref: citationsRef } = useCounter(98, 1800);

  return (
    <>
      <SEO
        title="Bitcoin Research for Financial Journalists | Perception"
        description="Get up to speed on any story, instantly. Research companies, track narratives, and find sources faster so you can focus on writing, not searching."
        url="https://perception.to/use-cases/journalists"
        keywords={['journalist research tools', 'financial journalism', 'Bitcoin news research', 'crypto journalism', 'source research']}
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
              {/* Left: Content */}
              <div className="lg:col-span-5">
                <p className="text-sm font-medium text-black/40 mb-4 tracking-wide uppercase">For Financial Journalists</p>

                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  Get up to speed on any story, instantly.
                </h1>

                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  Research companies, track narratives, and find sources faster. Perception helps you file better stories with cited research instead of endless browser tabs.
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

              {/* Right: Breaking Story Research Preview */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-orange-50/50 to-amber-50/50 p-5 sm:p-6 border border-black/[0.04]">
                  <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 rounded-3xl blur-3xl opacity-60" />

                  {/* Browser window */}
                  <div className="relative rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-200 p-[1px] shadow-2xl shadow-black/20">
                    <div className="rounded-2xl bg-[#1a1a1a] overflow-hidden">
                      {/* Window chrome */}
                      <div className="flex items-center gap-2 px-4 py-3 bg-[#0f0f0f] border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="px-4 py-1 bg-white/5 rounded-md text-[10px] text-white/40 font-mono">
                            perception.to/research
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-white/40" />
                            <span className="text-white/80 text-sm font-medium">Quick Research</span>
                          </div>
                          <span className="text-[10px] text-white/30 font-mono">⌘K</span>
                        </div>

                        {/* Search box */}
                        <div className="bg-white/5 rounded-lg p-3 mb-4 border border-white/10">
                          <div className="flex items-center gap-2">
                            <span className="text-white/90 text-sm">MicroStrategy Bitcoin holdings</span>
                            <span className="animate-pulse text-orange-400">|</span>
                          </div>
                        </div>

                        {/* Results preview */}
                        <div className="space-y-2">
                          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Top Results</div>

                          <div className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-orange-500/30 transition-colors cursor-pointer">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="text-xs text-white/90 font-medium mb-1">MicroStrategy Acquires Additional 12,000 BTC</div>
                                <div className="text-[10px] text-white/50">Bloomberg • 2 hours ago</div>
                              </div>
                              <ExternalLink className="w-3 h-3 text-white/30" />
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-orange-500/30 transition-colors cursor-pointer">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="text-xs text-white/90 font-medium mb-1">MSTR Stock Rises on Bitcoin Strategy Expansion</div>
                                <div className="text-[10px] text-white/50">Reuters • 4 hours ago</div>
                              </div>
                              <ExternalLink className="w-3 h-3 text-white/30" />
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-orange-500/30 transition-colors cursor-pointer">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="text-xs text-white/90 font-medium mb-1">Saylor: "Bitcoin is the Exit"</div>
                                <div className="text-[10px] text-white/50">Twitter/X • 6 hours ago</div>
                              </div>
                              <ExternalLink className="w-3 h-3 text-white/30" />
                            </div>
                          </div>
                        </div>

                        {/* Quick actions */}
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                          <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-orange-500/20 text-orange-400 rounded-md text-[10px] font-medium">
                            <FileText className="w-3 h-3" />
                            Generate Brief
                          </button>
                          <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 text-white/60 rounded-md text-[10px]">
                            <Clock className="w-3 h-3" />
                            View Timeline
                          </button>
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

        {/* Data Featured In */}
        <section className="py-16 sm:py-20 bg-white border-y border-black/5">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-sm font-medium tracking-wider text-black/40 mb-8 text-center uppercase">
              Data featured in
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 items-center justify-items-center gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-8 sm:gap-y-10">
              <a
                href="https://cointelegraph.com/news/bitcoin-legacy-media-sentiment-surged-2024"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center transition-all duration-300 hover:opacity-70"
              >
                <img
                  className="w-32 sm:w-36 lg:w-40 h-auto object-contain transition-all duration-300 group-hover:scale-105 brightness-0 opacity-60"
                  src="/logos/Cointelegraph Logo.png"
                  alt="Cointelegraph"
                  loading="lazy"
                />
              </a>
              <a
                href="https://www.coindesk.com/markets/2026/01/05/asia-morning-briefing-data-shows-legacy-media-took-a-more-balanced-view-of-bitcoin-in-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center transition-all duration-300 hover:opacity-70"
              >
                <img
                  className="w-32 sm:w-36 lg:w-40 h-auto object-contain transition-all duration-300 group-hover:scale-105 brightness-0 opacity-60"
                  src="/logos/coindesk-logo-white.png"
                  alt="CoinDesk"
                  loading="lazy"
                />
              </a>
              <a
                href="https://bitcoinmagazine.com/culture/left-leaning-outlets-amplify-their-anti-bitcoin-bias-following-trumps-endorsement-"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center transition-all duration-300 hover:opacity-70"
              >
                <img
                  className="w-32 sm:w-36 lg:w-40 h-auto object-contain transition-all duration-300 group-hover:scale-105 brightness-0 opacity-60"
                  src="/logos/BTC_Mag_Logo-removebg-preview.png"
                  alt="Bitcoin Magazine"
                  loading="lazy"
                />
              </a>
              <a
                href="https://web.archive.org/web/20240904132826/https://www.forbes.com/sites/digital-assets/2024/09/04/bbc-bitcoin-coverage-raises-concern-over-its-journalism-and-trust/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center transition-all duration-300 hover:opacity-70"
              >
                <img
                  className="w-32 sm:w-36 lg:w-40 h-auto object-contain transition-all duration-300 group-hover:scale-105 brightness-0 opacity-60"
                  src="/logos/Forbes-logo-white.png"
                  alt="Forbes"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </section>

        {/* Feature 1: Narrative Tracking */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div>
                <p className="text-xs font-medium text-black/40 uppercase tracking-wide mb-4">Narrative Intelligence</p>

                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-5">
                  See how stories evolved, not just what's trending now
                </h2>

                <p className="text-lg text-black/60 mb-8 leading-relaxed">
                  Track narrative shifts over days, weeks, or months. Understand the full context before you write: what's been said, who said it, and how the conversation changed.
                </p>

                <ul className="space-y-4">
                  {[
                    'Timeline view of narrative evolution',
                    'Key inflection points highlighted',
                    'Source sentiment tracking over time',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      </div>
                      <span className="text-black/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Narrative Timeline Preview */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-amber-50/50 to-orange-50/50 p-5 sm:p-6 border border-black/[0.04]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-3xl opacity-60" />

                  <div className="relative rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-200 p-[1px] shadow-2xl shadow-black/20">
                    <div className="rounded-2xl bg-[#1a1a1a] overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-[#0f0f0f] border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="px-4 py-1 bg-white/5 rounded-md text-[10px] text-white/40 font-mono">
                            Narrative Timeline
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-white/80 text-sm font-medium">Bitcoin ETF Narrative</span>
                          <span className="text-[10px] text-white/40">Mention volume by year</span>
                        </div>

                        {/* Simple trend visualization */}
                        <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                          <AnimatedNarrativeChart data={[15, 25, 40, 65, 100]} />
                          <div className="flex mt-2 text-[9px] text-white/30">
                            <span className="flex-1 text-center">2021</span>
                            <span className="flex-1 text-center">2022</span>
                            <span className="flex-1 text-center">2023</span>
                            <span className="flex-1 text-center">2024</span>
                            <span className="flex-1 text-center">2025</span>
                          </div>
                        </div>

                        {/* Key moments */}
                        <div className="space-y-2">
                          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Key Moments</div>

                          <div className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-green-400 mt-1 flex-shrink-0" />
                            <div>
                              <div className="text-xs text-white/80">SEC Approval Announced</div>
                              <div className="text-[10px] text-white/40">+340% mention volume • Jan 10</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
                            <div>
                              <div className="text-xs text-white/80">BlackRock Inflows Record</div>
                              <div className="text-[10px] text-white/40">+180% mention volume • Jan 22</div>
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

        {/* Feature 2: Research Briefs - Dark Section */}
        <section className="py-20 sm:py-28 bg-[#0a0a0a]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Brief Preview */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 rounded-3xl blur-3xl opacity-60" />

                  <div className="relative rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-900 p-[1px] shadow-2xl">
                    <div className="rounded-2xl bg-[#141414] overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-[#0f0f0f] border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="px-4 py-1 bg-white/5 rounded-md text-[10px] text-white/40 font-mono">
                            Research Brief
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl overflow-hidden">
                            <img
                              src="/company-logos/strategy-logo.jpg"
                              alt="Strategy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">Strategy Analysis</div>
                            <div className="text-white/40 text-xs">Generated brief • Ready to cite</div>
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
                          <div className="text-xs text-white/80 leading-relaxed mb-3">
                            <span className="text-orange-400 font-medium">Key Finding:</span> MicroStrategy has accumulated 439,000 BTC since August 2020, making it the largest corporate holder of Bitcoin globally...
                          </div>
                          <div className="text-xs text-white/80 leading-relaxed mb-3">
                            <span className="text-orange-400 font-medium">Market Context:</span> The company's stock has become a de facto Bitcoin proxy, with 0.89 correlation to BTC price movements...
                          </div>
                          <div className="text-xs text-white/50">
                            [1] Bloomberg, Jan 2025 • [2] SEC Filing 10-K • [3] Company Earnings Call
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="flex-1 py-2 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors">
                            Copy with Citations
                          </button>
                          <button className="px-3 py-2 bg-white/5 text-white/60 rounded-lg text-xs hover:bg-white/10 transition-colors">
                            Export
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="order-1 lg:order-2">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-4">Deadline Ready</p>

                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  Research briefs that cite themselves
                </h2>

                <p className="text-lg text-white/60 mb-8 leading-relaxed">
                  Generate structured research briefs with full citations in seconds. Every claim linked to its source. Every source ready to verify. Copy straight into your story.
                </p>

                <ul className="space-y-4">
                  {[
                    'Auto-generated citations with source links',
                    'Key findings extracted and summarized',
                    'Export to Word, Google Docs, or plain text',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      </div>
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3: Source Discovery */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div>
                <p className="text-xs font-medium text-black/40 uppercase tracking-wide mb-4">Source Intelligence</p>

                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-5">
                  Find who's talking and what they're saying
                </h2>

                <p className="text-lg text-black/60 mb-8 leading-relaxed">
                  Discover the voices shaping every narrative. See who's bullish, who's skeptical, and who has the context you need for your story.
                </p>

                <ul className="space-y-4">
                  {[
                    'Key voices identified per topic',
                    'Historical positions and statements',
                    'Social reach and influence metrics',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      </div>
                      <span className="text-black/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Source Discovery Preview */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-100 via-blue-50/50 to-indigo-50/50 p-5 sm:p-6 border border-black/[0.04]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl opacity-60" />

                  <div className="relative rounded-2xl bg-gradient-to-b from-zinc-100 to-zinc-200 p-[1px] shadow-2xl shadow-black/20">
                    <div className="rounded-2xl bg-[#1a1a1a] overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-[#0f0f0f] border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="px-4 py-1 bg-white/5 rounded-md text-[10px] text-white/40 font-mono">
                            Key Voices
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-white/80 text-sm font-medium">Bitcoin ETF Discussion</span>
                          <span className="text-[10px] text-white/40">23 voices tracked</span>
                        </div>

                        {/* Voice cards */}
                        <div className="space-y-2">
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="flex items-center gap-3">
                              <img
                                src="/avatars/michael-saylor.webp"
                                alt="Michael Saylor"
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="text-xs text-white/90 font-medium">Michael Saylor</div>
                                <div className="text-[10px] text-white/50">@saylor • 3.2M followers</div>
                              </div>
                              <div className="text-[10px] px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                                Bullish
                              </div>
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="flex items-center gap-3">
                              <img
                                src="/avatars/larry-fink.jpg"
                                alt="Larry Fink"
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="text-xs text-white/90 font-medium">Larry Fink</div>
                                <div className="text-[10px] text-white/50">BlackRock CEO</div>
                              </div>
                              <div className="text-[10px] px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                                Neutral
                              </div>
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="flex items-center gap-3">
                              <img
                                src="/avatars/cathie-wood.webp"
                                alt="Cathie Wood"
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="text-xs text-white/90 font-medium">Cathie Wood</div>
                                <div className="text-[10px] text-white/50">@CathieDWood • ARK Invest</div>
                              </div>
                              <div className="text-[10px] px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                                Bullish
                              </div>
                            </div>
                          </div>
                        </div>

                        <button className="w-full mt-3 py-2 bg-white/5 text-white/60 rounded-lg text-[10px] hover:bg-white/10 transition-colors">
                          View all voices →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-white border-y border-black/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div ref={sourcesRef} className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight">{sourcesCount}+</p>
                <p className="text-sm text-black/40 mt-3">Sources monitored</p>
              </div>
              <div ref={hoursRef} className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight">{hoursCount}+ hrs</p>
                <p className="text-sm text-black/40 mt-3">Saved per story</p>
              </div>
              <div ref={citationsRef} className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight">{citationsCount}%</p>
                <p className="text-sm text-black/40 mt-3">Citation accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-black tracking-tight">24/7</p>
                <p className="text-sm text-black/40 mt-3">Coverage</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                From breaking news to filed story
              </h2>
              <p className="text-lg text-black/50 max-w-2xl mx-auto">
                The research workflow that keeps up with your deadline
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Search', desc: 'Query any company, topic, or narrative' },
                { step: '02', title: 'Research', desc: 'Get historical context and key sources' },
                { step: '03', title: 'Generate', desc: 'Create a brief with full citations' },
                { step: '04', title: 'File', desc: 'Copy to your story, ready to publish' },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-black/5 h-full">
                    <div className="text-4xl font-light text-black/10 mb-2">{item.step}</div>
                    <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
                    <p className="text-sm text-black/50">{item.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-black/20">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl bg-black p-12 sm:p-16">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  Research any story in minutes
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  The same research platform trusted by Cointelegraph, CoinDesk, and Forbes. Join journalists who never miss a deadline.
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

export default JournalistsPage;
