'use client';

import { useRef, useEffect, useState } from 'react';
import { Globe, Zap, GitBranch, TrendingUp, Target, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const valuePropItems = [
  {
    title: "Cross-regional<br/>opportunity mapping",
    description: "Connect developments across APAC, LATAM, EMEA, MENA and North America that individually look unrelated but together signal major market opportunities before competitors see the pattern.",
    image: "/images/Value Props/Cross-Regional Opportunity Mapping.png",
    Icon: Globe,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    delay: 0
  },
  {
    title: "Signal intelligence over noise",
    description: "Stop drowning in 500 daily articles and social posts. Get the signal that actually matters.",
    image: "/images/Value Props/Signal Intelligence Over Noise.png",
    Icon: Zap,
    gradient: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
    delay: 0.1
  },
  {
    title: "Custom entity intelligence",
    description: "Group related topics with entities you track and generate comprehensive custom briefs in seconds. Turn scattered information into focused intelligence reports tailored to your specific interests.",
    image: "/images/Value Props/Custom Entity Intelligence.png",
    Icon: GitBranch,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    delay: 0.2
  },
  {
    title: "Trend intelligence",
    description: "Track competitors, partners, industry segments and detect emerging trends before they become obvious to everyone else.",
    image: "/images/Value Props/Trend Intelligence.png",
    Icon: TrendingUp,
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    delay: 0.3
  },
  {
    title: "Actionable intelligence, not data",
    description: "Translate scattered information into specific opportunities - saving hours of research while surfacing moves competitors will miss.",
    image: "/images/Value Props/Actionable Intelligence, Not Data.png",
    Icon: Target,
    gradient: "from-red-500/20 to-rose-500/20",
    iconColor: "text-red-400",
    delay: 0.4
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

    // Initial states
    gsap.set(title, { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    });

    gsap.set(cards.children, { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotateX: 15
    });

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    // Title animation with Apple-like precision
    tl.to(title, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out"
    })
    
    // Staggered card animations
    .to(cards.children, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: {
        amount: 0.3,
        from: "start"
      }
    }, "-=0.3");

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-20 pb-0 bg-black"
    >

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-12 lg:mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-[1.1] mb-6 value-props-main-title"
            style={{ color: '#ffffff !important', fontWeight: '300' }}
          >
            See how peers get ahead
            <br />
            by spotting info <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">others miss</span>
          </h2>
        </div>

        {/* Value Props Grid - Simplified for larger screenshots */}
        <div 
          ref={cardsRef}
          className="grid gap-6 lg:gap-8"
        >
          {valuePropItems.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-700 ease-out hover:scale-[1.01] p-8 sm:p-10 lg:p-12"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))`
              }}
            >
              {/* Card glow effect */}
              <div 
                className={`
                  absolute inset-0 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-700 ease-out
                  bg-gradient-to-br ${item.gradient} blur-xl
                `}
              />
              
              {/* Content - Adjusted for larger screenshots */}
              <div className="relative z-10 grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                {/* Text Content - Takes 2 columns */}
                <div className={`lg:col-span-2 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <h3 
                    className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium mb-6 lg:mb-8 leading-tight value-prop-title" 
                    style={{ 
                      color: '#ffffff !important',
                      fontWeight: '500 !important'
                    }}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <p className="text-lg sm:text-xl lg:text-2xl text-white/70 font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Large Screenshot Area - Takes 3 columns */}
                <div className={`lg:col-span-3 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div 
                    className="overflow-hidden rounded-2xl border border-white/[0.1] group-hover:border-white/[0.2] transition-all duration-500 shadow-2xl cursor-pointer hover:scale-[1.02]"
                    onClick={() => {
                      setSelectedImage(item.image);
                      setSelectedTitle(item.title);
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute -top-4 -right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all duration-300"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <img
              src={selectedImage}
              alt={selectedTitle}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}