import { useRef, useEffect } from 'react';

// themes: the formless and intangible, merging into oneness, return to nothingness
// visualization: Waves of varying opacity merge and dissolve, revealing the formless nature beneath form

const LayeredSineWaves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Parameters
    const layers = 80;
    const points = 200;
    const waveAmplitude = 40;
    let time = 0;
    let animationId: number | null = null;

    function draw() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      time += 0.01;

      // Draw each layer - forms emerging from the formless
      for (let layer = 0; layer < layers; layer++) {
        const layerPosition = (layer / layers) * height * 0.8 + height * 0.1;
        const layerFrequency = 0.5 + layer * 0.03;
        const layerPhase = time * 0.2 + layer * 0.05;
        const layerAmplitude = waveAmplitude * (0.5 + 0.5 * Math.sin(layer * 0.1 + time * 0.3));

        // Set opacity based on layer position and time
        const baseOpacity = 0.2 + 0.6 * Math.pow(Math.sin((layer / layers) * Math.PI), 2);
        const timeEffect = 0.2 * Math.sin(time * 0.4 + layer * 0.1);
        const opacity = Math.min(0.9, Math.max(0.1, baseOpacity + timeEffect));

        ctx.beginPath();
        // Use white for visibility on black background
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 0.6;

        // Generate points along the wave
        for (let i = 0; i <= points; i++) {
          const x = (i / points) * width;

          // Create complex wave with multiple sine components
          let y = layerPosition;

          // Primary wave
          y += layerAmplitude * Math.sin(x * 0.01 * layerFrequency + layerPhase);

          // Secondary waves for complexity
          y += layerAmplitude * 0.3 * Math.sin(x * 0.02 * layerFrequency + layerPhase * 1.5);
          y += layerAmplitude * 0.2 * Math.sin(x * 0.04 * layerFrequency - layerPhase * 0.7);

          // Tertiary high-frequency detail
          y += layerAmplitude * 0.1 * Math.sin(x * 0.08 * layerFrequency + layerPhase * 2.3);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      // Draw connecting lines - all merging into oneness
      for (let i = 0; i < width; i += 20) {
        if (Math.random() < 0.4) { // Only draw some vertical lines
          ctx.beginPath();

          const opacity = 0.1 + 0.2 * Math.sin(i * 0.05 + time);
          // Use white for visibility on black background
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.3;

          // Vary the line height
          const startY = height * 0.1 + Math.random() * height * 0.2;
          const endY = height * 0.7 + Math.random() * height * 0.2;

          ctx.moveTo(i, startY);
          ctx.lineTo(i, endY);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    // Animation loop
    animationId = requestAnimationFrame(draw);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-[#000000]">
      <canvas
        ref={canvasRef}
        width={550}
        height={550}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default LayeredSineWaves;
