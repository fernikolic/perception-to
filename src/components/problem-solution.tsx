import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Text for each paragraph
const paragraph1 = "Finding information isn't hard. Making it useful is.";

const paragraph2 = "Perception turns raw coverage into polished, cited deliverables.";

const paragraph3 = "Board updates. Interview prep. Competitive reports. Minutes, not days.";

export function ProblemSolution() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Word highlight animation on scroll
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content) return;

    // Get all word spans
    const wordSpans = content.querySelectorAll('.ps-word') as NodeListOf<HTMLElement>;
    const allWords = Array.from(wordSpans);

    let ticking = false;
    let lastHighlightedIndex = -1;

    const updateWords = () => {
      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate progress: 0 when section enters, 1 when it leaves
      const scrollableDistance = wrapperHeight - viewportHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      // Calculate which word should be highlighted
      const totalWords = allWords.length;
      const targetIndex = Math.floor(progress * totalWords);

      // Only update DOM if the highlighted index changed
      if (targetIndex !== lastHighlightedIndex) {
        allWords.forEach((word, index) => {
          const shouldHighlight = index < targetIndex;
          const isHighlighted = word.classList.contains('ps-word-active');

          if (shouldHighlight && !isHighlighted) {
            word.classList.add('ps-word-active');
          } else if (!shouldHighlight && isHighlighted) {
            word.classList.remove('ps-word-active');
          }
        });
        lastHighlightedIndex = targetIndex;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateWords);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateWords();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Video animation on scroll
  useEffect(() => {
    const video = videoContainerRef.current;
    if (!video) return;

    gsap.set(video, {
      opacity: 0,
      y: 80,
      scale: 0.95
    });

    gsap.to(video, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: video,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Helper to render paragraph with word spans
  const renderParagraph = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => (
      <span key={index} className="ps-word">
        {word}{' '}
      </span>
    ));
  };

  return (
    <>
      {/* Sticky Scroll Text Section */}
      <div ref={wrapperRef} className="relative" style={{ background: '#000000', height: '250vh' }}>
        {/* Subtle grid background like Dovetail */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div
          className="sticky top-0 min-h-screen flex items-center justify-center"
          style={{ background: 'transparent' }}
        >
          <div className="mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="mx-auto w-full max-w-4xl py-16 sm:py-20 lg:py-24">
              {/* Text Content */}
              <div ref={contentRef} className="space-y-10 sm:space-y-12 lg:space-y-14">
                {/* Paragraph 1: Problem */}
                <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium leading-[1.3] tracking-tight">
                  {renderParagraph(paragraph1)}
                </p>

                {/* Paragraph 2: Mindset shift */}
                <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium leading-[1.3] tracking-tight">
                  {renderParagraph(paragraph2)}
                </p>

                {/* Paragraph 3: Solution */}
                <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium leading-[1.3] tracking-tight">
                  {renderParagraph(paragraph3)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CSS for word highlighting */}
        <style>{`
          .ps-word {
            color: rgba(255, 255, 255, 0.3);
            transition: color 0.15s ease-out;
            display: inline;
          }
          .ps-word.ps-word-active {
            color: rgba(255, 255, 255, 1);
          }
        `}</style>
      </div>

      {/* Video Demo Section */}
      <section className="relative py-20 sm:py-28 lg:py-32" style={{ background: '#000000' }}>
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div
            ref={videoContainerRef}
            className="relative aspect-video rounded-3xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl"
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
      </section>
    </>
  );
}
