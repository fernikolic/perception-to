'use client';

import { useRef, useEffect } from 'react';
import { Globe, Zap, GitBranch, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MoireMandalaPattern from '@/components/MoireMandalaPattern';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';
import SlidingEaseVerticalBars from '@/components/SlidingEaseVerticalBars';
import AsciiBlob from '@/components/AsciiBlob';

gsap.registerPlugin(ScrollTrigger);

const valuePropItems = [
  {
    title: "Board updates that write <em style='font-style: italic; font-family: Georgia, serif;'>themselves</em>",
    description: "Pull sentiment trends, coverage volume, and competitive positioning into a cited executive summary. Ready for your next board meeting or investor call.",
    image: "/images/Value Props/Cross-Regional Opportunity Mapping.png",
    Icon: Globe,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    delay: 0,
    AsciiComponent: MoireMandalaPattern
  },
  {
    title: "Competitive intel on <em style='font-style: italic; font-family: Georgia, serif;'>demand</em>",
    description: "Track what's being said about competitors, partners, or acquisition targets. Generate comparison reports with share of voice, narrative shifts, and source breakdowns.",
    image: "/images/Value Props/Signal Intelligence Over Noise.png",
    Icon: Zap,
    gradient: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
    delay: 0.1,
    AsciiComponent: DelicateAsciiDots
  },
  {
    title: "Interview and meeting prep in <em style='font-style: italic; font-family: Georgia, serif;'>minutes</em>",
    description: "Meeting with a journalist? Investor? Potential partner? Get a brief on their recent coverage, positions, and talking points, complete with citations you can reference.",
    image: "/images/Value Props/Custom Entity Intelligence.png",
    Icon: GitBranch,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    delay: 0.2,
    AsciiComponent: SlidingEaseVerticalBars
  },
  {
    title: "Know exactly where you <em style='font-style: italic; font-family: Georgia, serif;'>stand</em>",
    description: "Coverage volume. Sentiment. Share of voice. When the board asks \"How are we doing?\" you'll have real data, not guesses.",
    image: "/images/Value Props/Trend Intelligence.png",
    Icon: TrendingUp,
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    delay: 0.3,
    AsciiComponent: AsciiBlob
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
            const AsciiComponent = item.AsciiComponent;
            return (
              <div
                key={item.title}
                className="group overflow-hidden rounded-2xl shadow-2xl border border-black/10 flex flex-col"
                style={{
                  background: '#FFFFFF'
                }}
              >
                {/* ASCII Art - Top Half */}
                <div className="w-full h-64 lg:h-72 relative overflow-hidden">
                  {AsciiComponent && <AsciiComponent />}
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
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p
                      className="text-sm sm:text-base lg:text-lg text-black/70 font-light leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
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