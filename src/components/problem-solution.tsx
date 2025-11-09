import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function ProblemSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  const problemText = "You're managing 30+ tabs, manually tracking competitors, and rebuilding the same decks every quarter. Spend hours pulling trends together just to create one update. Every single deliverable? You start from scratch.";
  const solutionText = "Perception monitors everything for you through watchlists, keeps it organized in Spaces, and lets you generate any deliverable with Recipes. Turn weeks of monitoring into ready-to-send outputs.";

  useEffect(() => {
    const section = sectionRef.current;
    const problemContainer = problemRef.current;
    const solutionContainer = solutionRef.current;

    if (!section || !problemContainer || !solutionContainer) return;

    // Clear any existing content
    problemContainer.innerHTML = '';
    solutionContainer.innerHTML = '';

    // Split problem text and create DOM elements
    const problemWords = problemText.split(' ');
    problemWords.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.marginRight = '0.3em';
      wordSpan.textContent = word;
      problemContainer.appendChild(wordSpan);
    });

    // Split solution text and create DOM elements
    const solutionWords = solutionText.split(' ');
    solutionWords.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.marginRight = '0.3em';
      wordSpan.textContent = word;
      solutionContainer.appendChild(wordSpan);
    });

    // Get all word elements for animation
    const allWords = [
      ...Array.from(problemContainer.children),
      ...Array.from(solutionContainer.children)
    ];

    // Initially set all words to greyed out
    gsap.set(allWords, {
      color: 'rgba(255, 255, 255, 0.3)'
    });

    // Create timeline
    const tl = gsap.timeline({ paused: true });

    // Animate words appearing one by one
    allWords.forEach((word, index) => {
      tl.to(word, {
        color: 'rgba(255, 255, 255, 1)',
        duration: 0.3,
        ease: 'power2.out'
      }, index * 0.05);
    });

    // Scroll-pinning effect
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: true,
      scrub: 1,
      animation: tl,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
    });

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center" style={{ background: '#000000' }}>
      <div className="mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="mx-auto w-full max-w-[600px] min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center py-12 sm:py-16 lg:py-20">
          <div className="space-y-8 sm:space-y-10 lg:space-y-12 text-center">
            {/* Problem */}
            <div ref={problemRef} className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight leading-tight text-white px-4"></div>

            {/* Divider */}
            <div className="h-px w-8 sm:w-10 lg:w-12 bg-white/20 mx-auto" aria-hidden="true" />

            {/* Solution */}
            <div ref={solutionRef} className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight leading-tight text-white px-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 