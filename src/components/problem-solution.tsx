import { useEffect, useRef } from 'react';
import styles from './problem-solution.module.css';

export function ProblemSolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const words = section.querySelectorAll(`.${styles.word}`);
    const totalWords = words.length;
    let isRevealed = false;

    const handleScroll = () => {
      const sectionRect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far down the page we've scrolled relative to the section
      const scrollProgress = -sectionRect.top / (sectionRect.height - viewportHeight);
      
      if (!isRevealed && scrollProgress >= 0 && scrollProgress <= 1) {
        // Calculate how many words to show based on scroll progress
        const wordsToShow = Math.floor(scrollProgress * totalWords);
        
        words.forEach((word, index) => {
          if (index <= wordsToShow) {
            word.classList.add(styles.revealed);
          } else {
            word.classList.remove(styles.revealed);
          }
        });

        // Check if all words are revealed
        if (wordsToShow >= totalWords - 1) {
          isRevealed = true;
          section.classList.add(styles.revealComplete);
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const problemText = "Institutional investors, analysts, and fintech operators spend 15+ hours a week scanning for market sentiment and narrative shifts.";
  const solutionText = "Perception distills that work into a real-time, trusted intelligence layer.";

  return (
    <div ref={sectionRef} className={styles.container}>
      <section ref={containerRef} className={styles.sticky}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-3xl">
            <div className="grid gap-8 sm:gap-16 lg:gap-24">
              {/* Problem */}
              <div className="space-y-4 sm:space-y-6">
                <p className={styles.textContainer}>
                  {problemText.split(' ').map((word, i) => {
                    const isHighlighted = word === '15+' || word === 'hours' || word === 'a' || word === 'week';
                    return (
                      <span 
                        key={i} 
                        className={`${styles.word} ${isHighlighted ? styles.highlighted : ''}`}
                      >
                        {word}{' '}
                      </span>
                    );
                  })}
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-4 sm:space-y-6">
                <div className="h-px w-8 sm:w-12 bg-white/20" aria-hidden="true" />
                <p className={styles.textContainer}>
                  {solutionText.split(' ').map((word, i) => (
                    <span key={i} className={styles.word}>
                      {word}{' '}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 