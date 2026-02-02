import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AsciiDiagonalPetals from '@/components/AsciiDiagonalPetals';

gsap.registerPlugin(ScrollTrigger);

export function ProblemCards() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Force white text color
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .problem-section-title {
        color: #ffffff !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);


  // Scroll-triggered animations
  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const video = videoContainerRef.current;

    if (!title || !subtitle || !video) return;

    // Set initial states
    gsap.set([title, subtitle], {
      opacity: 0,
      y: 50
    });

    gsap.set(video, {
      opacity: 0,
      y: 80,
      scale: 0.9
    });

    // Animate title and subtitle
    gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: subtitle,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate video with scale effect
    gsap.to(video, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: video,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="relative py-32 sm:py-40 lg:py-48" style={{
      background: '#000000'
    }}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header Section - Side by Side Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-24 sm:mb-32">

          {/* ASCII Animation - Left Side (30%) */}
          <div className="w-full lg:w-[30%] h-64 sm:h-80 md:h-96 lg:h-[500px]">
            <AsciiDiagonalPetals />
          </div>

          {/* Text Content - Right Side (70%) */}
          <div className="w-full lg:w-[70%] text-center lg:text-left">
            <h2
              ref={titleRef}
              className="problem-section-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight mb-10 sm:mb-12 leading-[1.05]"
              style={{ color: '#ffffff !important' }}
            >
              Every Deliverable
              <br />
              Starts From Scratch
            </h2>
            <p
              ref={subtitleRef}
              className="text-xl sm:text-2xl lg:text-3xl text-blue-100/80 leading-relaxed font-light"
            >
              3+ hours a day monitoring sources. Then the board wants competitive intel: start over. CEO has a podcast tomorrow: start over. PR needs journalist targets: start over.
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-16 sm:mt-20 lg:mt-28 max-w-6xl mx-auto">
          <div
            ref={videoContainerRef}
            className="relative aspect-video rounded-3xl overflow-hidden bg-black/50 border-4 border-white/10 shadow-2xl hover:shadow-3xl transition-shadow duration-500"
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/OTedJvx3i3g?autoplay=0&mute=0&playsinline=1&enablejsapi=1"
              title="Perception Platform Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
} 