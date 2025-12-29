import { useEffect, useRef } from 'react';

export function ProblemSolution() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  const problemText = "You're managing 30+ tabs, manually tracking competitors, rebuilding the same decks every quarter. Hours pulling trends together. Every deliverable? Start from scratch.";
  const solutionText = "Perception monitors everything for you through watchlists, keeps it organized in Spaces, and lets you generate any deliverable with Recipes. Turn weeks of monitoring into ready-to-send outputs.";

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const problemContainer = problemRef.current;
    const solutionContainer = solutionRef.current;

    if (!wrapper || !problemContainer || !solutionContainer) return;

    // Clear any existing content safely
    while (problemContainer.firstChild) {
      problemContainer.removeChild(problemContainer.firstChild);
    }
    while (solutionContainer.firstChild) {
      solutionContainer.removeChild(solutionContainer.firstChild);
    }

    // Split problem text and create DOM elements
    const problemWords = problemText.split(' ');
    problemWords.forEach((word) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.marginRight = '0.3em';
      wordSpan.textContent = word;
      problemContainer.appendChild(wordSpan);
    });

    // Split solution text and create DOM elements
    const solutionWords = solutionText.split(' ');
    solutionWords.forEach((word) => {
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
    ] as HTMLElement[];

    // Initially set all words to greyed out
    allWords.forEach(word => {
      word.style.color = 'rgba(255, 255, 255, 0.3)';
    });

    // Use native scroll listener for smooth animation with CSS sticky
    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate progress: 0 when section enters, 1 when it leaves
      const scrollableDistance = wrapperHeight - viewportHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      // Animate words based on progress
      const totalWords = allWords.length;
      allWords.forEach((word, index) => {
        const wordProgress = index / totalWords;
        if (progress > wordProgress) {
          word.style.color = 'rgba(255, 255, 255, 1)';
        } else {
          word.style.color = 'rgba(255, 255, 255, 0.3)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative" style={{ background: '#000000', height: '250vh' }}>
      <div
        className="sticky top-0 min-h-screen flex items-center justify-center"
        style={{ background: '#000000' }}
      >
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
      </div>
    </div>
  );
} 