'use client';

import { useRef, useEffect, useState } from 'react';
import { Globe, Zap, GitBranch, TrendingUp, Target, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const valuePropItems = [
  {
    title: "See the full picture<br/>in minutes, not hours",
    description: "We don't just track Bitcoin mentions. We connect a Singapore regulatory filing to a Brazilian bank announcement to a European fund movement - showing you the opportunity your competitors won't see for weeks.",
    image: "/images/Value Props/Cross-Regional Opportunity Mapping.png",
    Icon: Globe,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    delay: 0
  },
  {
    title: "Act on intelligence,<br/>not information",
    description: "Skip the \"Bitcoin sentiment is up 12%\" dashboards. Get \"Deutsche Bank's blockchain hire + Germany's new crypto framework = launch your institutional product there by Q2.\"",
    image: "/images/Value Props/Signal Intelligence Over Noise.png",
    Icon: Zap,
    gradient: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
    delay: 0.1
  },
  {
    title: "Custom intelligence<br/>for YOUR specific game",
    description: "Track your exact competitors, your target regions, your narrative. We turn noise into your personalized playbook - whether you're launching in LATAM or fighting for enterprise contracts.",
    image: "/images/Value Props/Custom Entity Intelligence.png",
    Icon: GitBranch,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    delay: 0.2
  },
  {
    title: "Replace guesswork<br/>with pattern recognition",
    description: "Our system has processed hundreds of thousands of signals. When three unrelated events suddenly correlate, we alert you to the opportunity - not the data points.",
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
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-16 sm:mb-24 lg:mb-32">
          <h2
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] value-props-main-title"
            style={{ color: '#ffffff', fontWeight: '700' }}
          >
            How smart teams win
          </h2>
        </div>

        {/* Value Props - Bold, full-width cards */}
        <div
          ref={cardsRef}
          className="space-y-0"
        >
          {valuePropItems.map((item, index) => (
            <div
              key={item.title}
              className="group relative min-h-[85vh] flex items-center overflow-hidden"
              style={{
                background: index % 2 === 0
                  ? 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(20,20,20,1) 100%)'
                  : 'linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(0,0,0,1) 100%)'
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
                  background: `radial-gradient(circle at ${index % 2 === 0 ? '30%' : '70%'} 50%, rgba(255,255,255,0.03) 0%, transparent 50%)`
                }}
              />

              {/* Content */}
              <div className="relative z-10 w-full mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center max-w-[1600px] mx-auto">
                  {/* Text Content - Bold and dramatic */}
                  <div className={`lg:col-span-5 space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <h3
                      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight value-prop-title"
                      style={{
                        color: '#ffffff',
                        fontWeight: '700'
                      }}
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p className="text-xl sm:text-2xl lg:text-3xl text-white/80 font-light leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                  </div>

                  {/* Image - Much larger and more prominent */}
                  <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div
                      className="relative overflow-hidden rounded-3xl border-2 border-white/[0.15] group-hover:border-white/[0.3] transition-all duration-700 shadow-2xl cursor-pointer transform group-hover:scale-[1.02] group-hover:rotate-1"
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
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom border separator */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
            </div>
          ))}
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