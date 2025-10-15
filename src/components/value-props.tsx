'use client';

import { useRef, useEffect, useState } from 'react';
import { Globe, Zap, GitBranch, TrendingUp, Target, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const valuePropItems = [
  {
    title: "See the <em style='font-style: italic; font-family: Georgia, serif;'>full picture</em><br/>in <em style='font-style: italic; font-family: Georgia, serif;'>minutes, not hours</em>",
    description: "Connect global signals across regions and spot opportunities weeks before your competitors.",
    image: "/images/Value Props/Cross-Regional Opportunity Mapping.png",
    Icon: Globe,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    delay: 0
  },
  {
    title: "Act on <em style='font-style: italic; font-family: Georgia, serif;'>intelligence</em>,<br/>not <em style='font-style: italic; font-family: Georgia, serif;'>information</em>",
    description: "Skip generic dashboards. Get actionable opportunities your competitors are missing.",
    image: "/images/Value Props/Signal Intelligence Over Noise.png",
    Icon: Zap,
    gradient: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
    delay: 0.1
  },
  {
    title: "<em style='font-style: italic; font-family: Georgia, serif;'>Custom</em> intelligence<br/>for <em style='font-style: italic; font-family: Georgia, serif;'>YOUR specific game</em>",
    description: "Track what matters to you. Custom intelligence for your competitors, regions, and targets.",
    image: "/images/Value Props/Custom Entity Intelligence.png",
    Icon: GitBranch,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    delay: 0.2
  },
  {
    title: "Replace <em style='font-style: italic; font-family: Georgia, serif;'>guesswork</em><br/>with <em style='font-style: italic; font-family: Georgia, serif;'>pattern recognition</em>",
    description: "Pattern recognition across thousands of signals. We alert you to opportunities, not data.",
    image: "/images/Value Props/Trend Intelligence.png",
    Icon: TrendingUp,
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    delay: 0.3
  }
];

export function ValueProps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');

  // Add CSS to ensure white text
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .value-prop-title {
        color: #ffffff !important;
        font-weight: 500 !important;
      }
      .value-props-main-title {
        color: #ffffff !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

    // Initial states - More dramatic
    gsap.set(title, {
      opacity: 0,
      y: 50,
      scale: 0.9
    });

    gsap.set(cards.children, {
      opacity: 0,
      y: 100,
      scale: 0.95
    });

    // Title animation - Bold entrance
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

    // Individual card animations - Each animates on scroll
    Array.from(cards.children).forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-12 sm:py-20 lg:py-32 bg-black"
    >
      <div className="relative">
        {/* Header - More dramatic */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-16 sm:mb-24 lg:mb-32 text-center">
          <h2
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] value-props-main-title"
            style={{ color: '#ffffff', fontWeight: '700' }}
          >
            How smart teams win
          </h2>
        </div>

        {/* Value Props - 2x2 Grid Layout */}
        <div
          ref={cardsRef}
          className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {valuePropItems.map((item, index) => (
              <div
                key={item.title}
                className="group relative min-h-[500px] lg:min-h-[600px] flex flex-col overflow-hidden rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(20,20,20,1) 0%, rgba(10,10,10,1) 100%)'
                }}
              >
                {/* Bold gradient overlay */}
                <div
                  className={`
                    absolute inset-0 opacity-20 group-hover:opacity-30
                    transition-opacity duration-700 ease-out
                    bg-gradient-to-br ${item.gradient}
                  `}
                />

                {/* Dramatic lighting effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)`
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-8 lg:p-10 items-center text-center">
                  {/* Text Content */}
                  <div className="space-y-6 mb-8">
                    <h3
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight value-prop-title"
                      style={{
                        color: '#ffffff',
                        fontWeight: '700'
                      }}
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p className="text-base sm:text-lg lg:text-xl text-white/70 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="flex-1 min-h-[250px] w-full flex items-center justify-center">
                    <div
                      className="relative h-full w-full overflow-hidden rounded-xl border border-white/[0.15] group-hover:border-white/[0.3] transition-all duration-700 shadow-2xl cursor-pointer transform group-hover:scale-[1.02]"
                      onClick={() => {
                        setSelectedImage(item.image);
                        setSelectedTitle(item.title);
                      }}
                      style={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {/* Gradient overlay on image */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700 mix-blend-overlay z-10`}
                      />
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute -top-4 -right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
            >
              <X className="w-8 h-8 text-white" />
            </button>
            <img
              src={selectedImage}
              alt={selectedTitle}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}