import React, { useState, useEffect, useRef } from 'react';

// Themes: return to origin, knowing mother and child, finding inexhaustible energy
// Visualization: A pulsing ASCII form that emerges from and returns to emptiness, showing the cycle of manifestation

const AsciiBlob = () => {
  const [frame, setFrame] = useState(60); // Start at frame 60
  const densityRef = useRef(0); // Use ref to avoid dependency issues

  // Characters representing the stages of manifestation
  const simpleChars = '░▒▓█';  // From emptiness to form

  // Canvas dimensions - the space of potential (increased width to fill container)
  const width = 80;
  const height = 22;

  useEffect(() => {
    let animationFrameId: number | null = null;
    let lastFrameTime = 0;
    const targetFPS = 10; // Increased from 2 FPS to 10 FPS
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastFrameTime;

      // Only update if enough time has passed
      if (deltaTime >= frameInterval) {
        // Calculate remainder to prevent drift
        const remainder = deltaTime % frameInterval;

        // Update lastFrameTime with the time that's been processed
        lastFrameTime = currentTime - remainder;

        setFrame(prevFrame => {
          const newFrame = prevFrame + 1;
          // Update density value in ref (adjusted time factor for 10 FPS)
          densityRef.current = 27.5 + 22.5 * Math.sin(newFrame * 0.002); // Reduced from 0.01 to 0.002 (1/5)
          return newFrame;
        });
      }
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      // Clean up the animation frame to stop the animation
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Reset frame and density
      setFrame(60); // Reset to frame 60
      densityRef.current = 0;
    };
  }, []); // Empty dependency array to run only once on mount

  // Pre-calculate center and distance values for performance
  const centerX = width / 2;
  const centerY = height / 2;
  const distanceCache = React.useMemo(() => {
    const cache = [];
    for (let y = 0; y < height; y++) {
      cache[y] = [];
      for (let x = 0; x < width; x++) {
        const dx = (x - centerX) / centerX;
        const dy = (y - centerY) / centerY;
        cache[y][x] = Math.sqrt(dx * dx + dy * dy);
      }
    }
    return cache;
  }, [width, height]);

  // Generate ASCII art
  const generateArt = () => {
    const canvas = [];
    const currentDensity = densityRef.current;

    for (let y = 0; y < height; y++) {
      let row = '';
      for (let x = 0; x < width; x++) {
        // Use pre-calculated distance
        const distFromCenter = distanceCache[y][x];

        // Simpler, more ordered pattern (adjusted time factors for 10 FPS)
        let noiseValue = Math.sin(distFromCenter * 3 - frame * 0.002);
        noiseValue += Math.cos(x * 0.1 - y * 0.1 + frame * 0.0008) * 0.3;
        noiseValue = (noiseValue + 1) / 2; // Normalize to 0-1

        // Apply density adjustment
        noiseValue = noiseValue * (currentDensity / 100);

        // Select character based on value
        const charIndex = Math.floor(noiseValue * simpleChars.length);
        let char = simpleChars[Math.min(Math.max(0, charIndex), simpleChars.length - 1)];

        // As we approach non-action, introduce more empty space
        if (currentDensity < 30 && Math.random() > currentDensity / 30) {
          char = ' ';
        }

        row += char;
      }
      canvas.push(row);
    }

    return canvas;
  };

  const canvas = generateArt();

  const containerStyle = {
    backgroundColor: '#000000',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute' as const,
    top: 0,
    left: 0
  };

  return (
    <div style={containerStyle}>
      <pre className="font-mono text-white text-center whitespace-pre" style={{ lineHeight: '1.2', fontSize: '7px', width: '100%' }}>
        {canvas.join('\n')}
      </pre>
    </div>
  );
};

export default AsciiBlob;
