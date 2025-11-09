import React, { useEffect, useRef } from 'react';

// Themes: simple truth, inner understanding, heart wisdom
// Visualization: Delicate patterns that reveal meaning through simplicity, showing how truth emerges from the heart

const GRID_SIZE = 60; // Reduced grid size for better performance
const CHARS = '⠁⠂⠄⠈⠐⠠⡀⢀⠃⠅⠘⠨⠊⠋⠌⠍⠎⠏';

interface Wave {
  x: number;
  y: number;
  frequency: number;
  amplitude: number;
  phase: number;
  speed: number;
}

const DelicateAsciiDots: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const wavesRef = useRef<Wave[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Begin with the simplest elements
    const waves: Wave[] = [];
    const numWaves = 3;  // Truth needs few words

    for (let i = 0; i < numWaves; i++) {
      waves.push({
        x: GRID_SIZE * (0.25 + Math.random() * 0.5),      // Finding natural place
        y: GRID_SIZE * (0.25 + Math.random() * 0.5),      // In open space
        frequency: 0.2 + Math.random() * 0.3,             // Each with its rhythm
        amplitude: 0.5 + Math.random() * 0.5,             // And presence
        phase: Math.random() * Math.PI * 2,               // In its time
        speed: 0.5 + Math.random() * 0.5                  // At its pace
      });
    }

    wavesRef.current = waves;

    // Create canvas for rendering
    const canvas = document.createElement('canvas');
    canvas.width = containerRef.current.offsetWidth;
    canvas.height = containerRef.current.offsetHeight;
    const ctx = canvas.getContext('2d')!;
    containerRef.current.appendChild(canvas);

    // Set up text rendering
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const update = (delta: number) => {
      timeRef.current += delta * 0.75; // Increased speed by 50%

      const newGrid: any[][] = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(' '));

      // Convert pointer to grid space
      const mouseX = (mouseRef.current.x + 1) * GRID_SIZE / 2;
      const mouseY = (1 - mouseRef.current.y) * GRID_SIZE / 2;

      // Add mouse as dynamic wave source
      const mouseWave: Wave = {
        x: mouseX,
        y: mouseY,
        frequency: 0.3,
        amplitude: 1,
        phase: timeRef.current * 2,
        speed: 1
      };

      // Calculate wave interference
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          let totalWave = 0;

          // Sum all wave contributions
          const allWaves = wavesRef.current.concat([mouseWave]);
          allWaves.forEach(wave => {
            const dx = x - wave.x;
            const dy = y - wave.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Calculate wave value with distance falloff
            const falloff = 1 / (1 + dist * 0.1);
            const value = Math.sin(
              dist * wave.frequency -
              timeRef.current * wave.speed +
              wave.phase
            ) * wave.amplitude * falloff;

            totalWave += value;
          });

          // Map interference pattern to characters and opacity
          const normalizedWave = (totalWave + 2) / 4; // Map -2..2 to 0..1
          if (Math.abs(totalWave) > 0.2) {
            // Ensure we get a valid character
            const charIndex = Math.min(CHARS.length - 1, Math.max(0,
              Math.floor(normalizedWave * (CHARS.length - 1))
            ));

            // Map wave amplitude to opacity range 0.4 to 0.9
            const opacity = Math.min(0.9, Math.max(0.4,
              0.4 + (normalizedWave * 0.5)
            ));

            // Create cell with guaranteed valid character
            newGrid[y][x] = {
              char: CHARS[charIndex] || CHARS[0],
              opacity: opacity
            };
          } else {
            newGrid[y][x] = null;
          }
        }
      }

      // Draw wave sources
      wavesRef.current.forEach(wave => {
        const x = Math.floor(wave.x);
        const y = Math.floor(wave.y);
        if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
          // Create pulsing effect
          const pulse = Math.sin(timeRef.current * wave.speed + wave.phase);
          const charIndex = Math.floor((pulse + 1) * CHARS.length / 2);
          newGrid[y][x] = CHARS[charIndex];

          // Add source pattern
          for (let i = 0; i < Math.PI * 2; i += Math.PI / 4) {
            const px = x + Math.round(Math.cos(i));
            const py = y + Math.round(Math.sin(i));
            if (px >= 0 && px < GRID_SIZE && py >= 0 && py < GRID_SIZE) {
              newGrid[py][px] = CHARS[Math.floor(i * CHARS.length / (Math.PI * 2))];
            }
          }
        }
      });

      // Draw characters
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cellWidth = canvas.width / GRID_SIZE;
      const cellHeight = canvas.height / GRID_SIZE;

      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const cell = newGrid[y][x];
          if (cell && cell.char && CHARS.includes(cell.char)) {
            ctx.fillStyle = `rgba(255, 255, 255, ${cell.opacity || 0.4})`;
            ctx.fillText(
              cell.char,
              x * cellWidth + cellWidth / 2,
              y * cellHeight + cellHeight / 2
            );
          }
        }
      }
    };

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      mouseRef.current = { x: x * 2 - 1, y: y * 2 - 1 };
    };

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    handleResize();

    // Animation loop
    let lastTime = 0;
    let animationFrameId: number;

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      update(delta);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && canvas.parentNode === containerRef.current) {
        containerRef.current.removeChild(canvas);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        margin: 0,
        background: '#000000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    />
  );
};

export default DelicateAsciiDots;
