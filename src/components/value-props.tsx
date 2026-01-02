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
    title: "See what's heating up <em style='font-style: italic; font-family: Georgia, serif;'>first</em>",
    description: "Trends cluster automatically. MiCA compliance up 340% this week. Bitcoin treasury strategy shifting from social media to Fortune 500 boardrooms. Spot opportunities before competitors know they exist.",
    image: "/images/Value Props/Cross-Regional Opportunity Mapping.png",
    Icon: Globe,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    delay: 0,
    AsciiComponent: MoireMandalaPattern
  },
  {
    title: "One workspace for everything that <em style='font-style: italic; font-family: Georgia, serif;'>matters</em>",
    description: "Create watchlists for competitors, sectors, or people. Organize into <em style='font-style: italic; font-family: Georgia, serif;'>Spaces</em>: board prep in one, competitive intel in another, content pipeline in a third. Everything where you need it.",
    image: "/images/Value Props/Signal Intelligence Over Noise.png",
    Icon: Zap,
    gradient: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
    delay: 0.1,
    AsciiComponent: DelicateAsciiDots
  },
  {
    title: "Click once. Get it <em style='font-style: italic; font-family: Georgia, serif;'>done</em>.",
    description: "Your <em style='font-style: italic; font-family: Georgia, serif;'>Space</em> has the intel. Pick a <em style='font-style: italic; font-family: Georgia, serif;'>Recipe</em>: Board Update, Interview Prep, PR Pitch, Sector Deep Dive. Full citations included. No more starting from scratch.",
    image: "/images/Value Props/Custom Entity Intelligence.png",
    Icon: GitBranch,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    delay: 0.2,
    AsciiComponent: SlidingEaseVerticalBars
  },
  {
    title: "Know exactly where you <em style='font-style: italic; font-family: Georgia, serif;'>stand</em>",
    description: "Coverage volume. Sentiment. Share of voice. When the board asks \"How are we doing?\"—you'll have real data, not guesses.",
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
            From monitoring to{' '}
            <span className="relative inline-block">
              deliverables
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