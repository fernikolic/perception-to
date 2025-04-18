import { useEffect, useRef } from 'react';
import styles from './problem-solution.module.css';

export function ProblemSolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const words = section.querySelectorAll(`.${styles.word}`);
    const totalWords = words.length;
    let isRevealed = false;

    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const sectionRect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress relative to the viewport
        const startTrigger = viewportHeight * 0.2; // Start when section is 20% into viewport
        const endTrigger = viewportHeight * 0.8; // End when section is 80% into viewport
        
        // Normalize progress between start and end triggers
        const rawProgress = (startTrigger - sectionRect.top) / (endTrigger - startTrigger);
        const progress = Math.max(0, Math.min(1, rawProgress));
        
        if (!isRevealed) {
          const wordsToShow = Math.floor(progress * totalWords);
          
          words.forEach((word, index) => {
            // Add a slight delay between each word
            const wordDelay = index * 50;
            setTimeout(() => {
              if (index <= wordsToShow) {
                word.classList.add(styles.revealed);
              } else {
                word.classList.remove(styles.revealed);
              }
            }, wordDelay);
          });

          // Check if all words are revealed
          if (progress >= 0.95) {
            isRevealed = true;
            section.classList.add(styles.revealComplete);
          }
        }
      });
    };

    // Initial check
    handleScroll();

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
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
                        style={{ transitionDelay: `${i * 50}ms` }}
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
                    <span 
                      key={i} 
                      className={styles.word}
                      style={{ transitionDelay: `${(problemText.split(' ').length + i) * 50}ms` }}
                    >
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