'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

gsap.registerPlugin(ScrollTrigger);

// Visual component for Board Updates (Weekly Reports style)
function WeeklyReportVisual() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center p-6">
      <DelicateAsciiDots />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-xs">
        <div className="bg-white/[0.08] backdrop-blur border border-white/15 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] text-white/80 font-bold">P</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white/80 font-medium">Board Update Brief</div>
                <div className="text-[10px] text-white/40">Ready to export</div>
              </div>
            </div>
          </div>
          <div className="p-3 space-y-2">
            <div className="flex items-center gap-3 p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-emerald-400">↑</span>
              </div>
              <div>
                <span className="text-xs text-white/70 font-medium">Bullish</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-emerald-400">+12%</span>
                  <span className="text-[10px] text-white/30">sentiment</span>
                </div>
              </div>
            </div>
            <div className="p-2.5 bg-white/[0.04] border border-white/[0.06] rounded-lg">
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-white/20 rounded" />
                <div className="h-1.5 w-4/5 bg-white/15 rounded" />
                <div className="h-1.5 w-3/5 bg-white/10 rounded" />
              </div>
            </div>
          </div>
          <div className="px-3 py-2.5 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-white/40">12 sources cited</span>
            <span className="text-[10px] text-blue-400/70">Export PDF →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Visual component for Competitive Intel (Trends style)
function TrendsVisual() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center p-6">
      <DelicateAsciiDots />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-xs space-y-2">
        <div className="bg-white/[0.08] backdrop-blur border border-white/15 rounded-xl p-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
            <div className="flex-1 min-w-0">
              <span className="text-sm text-white/90 font-medium block truncate">Your Company</span>
              <span className="text-[10px] text-white/40">Coverage leader</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-emerald-400 font-medium">68%</span>
              <span className="px-2 py-0.5 text-[9px] rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Lead
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white/[0.05] border border-white/10 rounded-xl p-3 opacity-80">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-400/70 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-sm text-white/70 font-medium block truncate">Competitor A</span>
              <span className="text-[10px] text-white/35">Rising coverage</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-amber-400/80 font-medium">24%</span>
            </div>
          </div>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 opacity-50">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white/30 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-sm text-white/50 font-medium block truncate">Competitor B</span>
            </div>
            <span className="text-xs text-white/40 font-medium">8%</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 pt-1">
          <span className="text-[10px] text-white/40">Share of voice</span>
        </div>
      </div>
    </div>
  );
}

// Visual component for Meeting Prep (Journalist Intelligence style)
function JournalistVisual() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center p-6">
      <DelicateAsciiDots />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-xs space-y-2">
        <div className="bg-white/[0.08] backdrop-blur border border-white/15 rounded-xl p-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-violet-500/30 flex items-center justify-center text-white/70 text-sm font-medium flex-shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-white/90 font-medium">Jane Doe</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">Bloomberg</span>
              </div>
              <div className="mt-1.5 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                  <span className="text-[10px] text-emerald-400/70">Bullish</span>
                </div>
                <span className="text-[10px] text-white/30">42 articles</span>
              </div>
              <div className="mt-2 flex gap-1.5">
                <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/40">Bitcoin</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/40">ETFs</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/40">Mining</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3">
          <span className="text-[10px] text-white/50 font-medium block mb-2">RECENT COVERAGE</span>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-white/15 rounded" />
            <div className="h-1.5 w-4/5 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Visual component for Know Where You Stand (Earnings style)
function EarningsVisual() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center p-6">
      <DelicateAsciiDots />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-xs space-y-2">
        <div className="bg-white/[0.08] backdrop-blur border border-white/15 rounded-xl p-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white/80">You</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm text-white/90 font-medium block">Your Coverage</span>
              <span className="text-[10px] text-white/40">This quarter</span>
            </div>
            <span className="px-2 py-0.5 text-[9px] rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              +18%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-white/[0.04] rounded-lg">
              <span className="text-lg font-semibold text-white/80 block">847</span>
              <span className="text-[9px] text-white/40">Mentions</span>
            </div>
            <div className="text-center p-2 bg-white/[0.04] rounded-lg">
              <span className="text-lg font-semibold text-emerald-400 block">72%</span>
              <span className="text-[9px] text-white/40">Positive</span>
            </div>
            <div className="text-center p-2 bg-white/[0.04] rounded-lg">
              <span className="text-lg font-semibold text-white/80 block">1st</span>
              <span className="text-[9px] text-white/40">SOV Rank</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 pt-1">
          <span className="text-[10px] text-white/40">Real-time metrics</span>
        </div>
      </div>
    </div>
  );
}

const valuePropItems = [
  {
    title: "Board updates that write <em style='font-style: italic; font-family: Georgia, serif;'>themselves</em>",
    description: "Pull sentiment trends, coverage volume, and competitive positioning into a cited executive summary. Ready for your next board meeting or investor call.",
    delay: 0,
    Visual: WeeklyReportVisual
  },
  {
    title: "Competitive intel on <em style='font-style: italic; font-family: Georgia, serif;'>demand</em>",
    description: "Track what's being said about competitors, partners, or acquisition targets. Generate comparison reports with share of voice, narrative shifts, and source breakdowns.",
    delay: 0.1,
    Visual: TrendsVisual
  },
  {
    title: "Interview and meeting prep in <em style='font-style: italic; font-family: Georgia, serif;'>minutes</em>",
    description: "Meeting with a journalist? Investor? Potential partner? Get a brief on their recent coverage, positions, and talking points, complete with citations you can reference.",
    delay: 0.2,
    Visual: JournalistVisual
  },
  {
    title: "Know exactly where you <em style='font-style: italic; font-family: Georgia, serif;'>stand</em>",
    description: "Coverage volume. Sentiment. Share of voice. When the board asks \"How are we doing?\" you'll have real data, not guesses.",
    delay: 0.3,
    Visual: EarningsVisual
  }
];

export function ValueProps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Add CSS to ensure black text on cream background + shimmer animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .value-prop-title {
        color: #000000 !important;
        font-weight: 500 !important;
      }
      .value-props-main-title {
        color: #000000 !important;
      }
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      @keyframes draw-underline {
        0% { transform: scaleX(0); }
        100% { transform: scaleX(1); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!title || !cards) return;

    // Initial states
    gsap.set(title, {
      opacity: 0,
      y: 50,
      scale: 0.9
    });

    // Title animation
    gsap.to(title, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate cards staggered on scroll
    const cardElements = Array.from(cards.children) as HTMLElement[];

    cardElements.forEach((card, index) => {
      gsap.set(card, {
        opacity: 0,
        y: 50,
        scale: 0.95
      });

      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        delay: index * 0.1
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-12 sm:py-20 lg:py-32"
      style={{ background: '#F0EEE6' }}
    >
      <div className="relative">
        {/* Header - More dramatic */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-16 sm:mb-24 lg:mb-32 text-center">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-[0.95] value-props-main-title"
            style={{ color: '#000000', fontWeight: '500' }}
          >
            What you can deliver{' '}
            <span className="relative inline-block">
              this week
              <span
                className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full animate-pulse"
                style={{
                  background: 'linear-gradient(90deg, #fb923c, #f97316, #ea580c, #f97316, #fb923c)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s ease-in-out infinite'
                }}
              />
            </span>
          </h2>
        </div>

        {/* Value Props - 2x2 Grid Layout */}
        <div
          ref={cardsRef}
          className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {valuePropItems.map((item) => {
            const VisualComponent = item.Visual;
            return (
              <div
                key={item.title}
                className="group overflow-hidden rounded-2xl shadow-2xl border border-black/10 flex flex-col"
                style={{
                  background: '#FFFFFF'
                }}
              >
                {/* Visual - Top Half */}
                <div className="w-full h-64 lg:h-72 relative overflow-hidden rounded-t-2xl">
                  {VisualComponent && <VisualComponent />}
                </div>

                {/* Content - Bottom Half */}
                <div className="p-8 lg:p-10 flex flex-col justify-center flex-grow"
                     style={{ background: '#FFFFFF' }}>
                  <div className="space-y-4">
                    <h3
                      className="text-xl sm:text-2xl lg:text-3xl font-medium leading-tight tracking-tight value-prop-title"
                      style={{
                        color: '#000000',
                        fontWeight: '500'
                      }}
                    >
                      <span dangerouslySetInnerHTML={{ __html: item.title }} />
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-black/70 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}