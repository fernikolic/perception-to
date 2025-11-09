import React, { useEffect, useRef } from 'react';

// themes: excess leads to failure, power undermines itself, let go of clinging
// visualization: Bars rise and fall naturally, finding balance by letting go of extremes

const SlidingEaseVerticalBars = () => {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const animationFrameId = useRef(null);

  // Simple noise function
  const noise = (x, y, t) => {
    const n = Math.sin(x * 0.02 + t) * Math.cos(y * 0.02 + t) +
             Math.sin(x * 0.03 - t) * Math.cos(y * 0.01 + t);
    return (n + 1) / 2;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 550;
    canvas.height = 550;

    const numLines = 30; // Reduced from 50
    const lineSpacing = canvas.width / numLines;

    // Pre-calculate noise values for performance
    const noiseCache = new Map();
    const getCachedNoise = (x, y, t) => {
      const key = `${Math.round(x)},${Math.round(y)},${t}`;
      if (!noiseCache.has(key)) {
        noiseCache.set(key, noise(x, y, t));
      }
      return noiseCache.get(key);
    };

    // Generate patterns that avoid extremes (optimized)
    const generatePattern = (seed) => {
      const pattern = [];
      for (let i = 0; i < numLines; i++) {
        const lineBars = [];
        // Reduced sampling - check every 30px instead of 15
        for (let currentY = 0; currentY < canvas.height; currentY += 30) {
          const noiseVal = getCachedNoise(i * lineSpacing, currentY, seed);

          if (noiseVal > 0.5) {
            lineBars.push({
              y: currentY,
              height: 10 + noiseVal * 30,
              width: 2 + noiseVal * 3
            });
          }
        }
        pattern.push(lineBars);
      }
      return pattern;
    };

    // Use setTimeout to defer pattern generation
    let pattern1, pattern2;
    setTimeout(() => {
      pattern1 = generatePattern(0);
      pattern2 = generatePattern(5);
    }, 0);

    const animate = () => {
      // Don't animate until patterns are ready
      if (!pattern1 || !pattern2) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += 0.005; // Cut speed in half

      // Create a cycle with pauses
      const cycleTime = timeRef.current % (Math.PI * 2);
      let easingFactor;

      if (cycleTime < Math.PI * 0.1) {
        // Pause at pattern 1
        easingFactor = 0;
      } else if (cycleTime < Math.PI * 0.9) {
        // Transition to pattern 2
        const transitionProgress = (cycleTime - Math.PI * 0.1) / (Math.PI * 0.8);
        easingFactor = transitionProgress;
      } else if (cycleTime < Math.PI * 1.1) {
        // Pause at pattern 2
        easingFactor = 1;
      } else if (cycleTime < Math.PI * 1.9) {
        // Transition back to pattern 1
        const transitionProgress = (cycleTime - Math.PI * 1.1) / (Math.PI * 0.8);
        easingFactor = 1 - transitionProgress;
      } else {
        // Pause at pattern 1 again
        easingFactor = 0;
      }

      // Let go of clinging to any one state
      const smoothEasing = easingFactor < 0.5
        ? 4 * easingFactor * easingFactor * easingFactor
        : 1 - Math.pow(-2 * easingFactor + 2, 3) / 2;

      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw lines and interpolated bars
      for (let i = 0; i < numLines; i++) {
        const x = i * lineSpacing + lineSpacing / 2;

        // Draw vertical line
        ctx.beginPath();
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 1;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

        // Interpolate between pattern1 and pattern2
        const bars1 = pattern1[i];
        const bars2 = pattern2[i];

        // Match bars between patterns
        const maxBars = Math.max(bars1.length, bars2.length);

        for (let j = 0; j < maxBars; j++) {
          let bar1 = bars1[j];
          let bar2 = bars2[j];

          // If one pattern has fewer bars, create a dummy bar
          if (!bar1) bar1 = { y: bar2.y - 100, height: 0, width: 0 };
          if (!bar2) bar2 = { y: bar1.y + 100, height: 0, width: 0 };

          // Add some wave motion during transition
          const waveOffset = Math.sin(i * 0.3 + j * 0.5 + timeRef.current * 2) * 10 *
                           (smoothEasing * (1 - smoothEasing) * 4); // Peak in middle of transition

          // Interpolate properties with wave offset
          const y = bar1.y + (bar2.y - bar1.y) * smoothEasing + waveOffset;
          const height = bar1.height + (bar2.height - bar1.height) * smoothEasing;
          const width = bar1.width + (bar2.width - bar1.width) * smoothEasing;

          // Only draw if bar has size
          if (height > 0.1 && width > 0.1) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x - width/2, y - height/2, width, height);
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      // Clear canvas context
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Reset refs to prevent memory leaks
      timeRef.current = 0;
      animationFrameId.current = null;
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
    </div>
  );
};

export default SlidingEaseVerticalBars;
