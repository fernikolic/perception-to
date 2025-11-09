import { useEffect, useRef } from 'react';

// themes: attaining oneness, wholeness through unity, integrity in humility
// visualization: Points flow together in humble unity, finding wholeness in their connection

const FlowingPattern = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 550;
    canvas.height = 550;

    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;

    // Create points that seek oneness through flow
    const flowPoints: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      angle: number;
      phase: number;
      noiseOffset: number;
    }> = [];
    const gridSize = 8;
    const totalCells = (canvas.width / gridSize) * (canvas.height / gridSize);

    // Initialize flow points
    for (let x = gridSize/2; x < canvas.width; x += gridSize) {
      for (let y = gridSize/2; y < canvas.height; y += gridSize) {
        flowPoints.push({
          x,
          y,
          vx: 0,
          vy: 0,
          angle: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
          noiseOffset: Math.random() * 1000
        });
      }
    }

    // Mouse handling
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX = x;
      mouseY = y;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Perlin-like noise function
    function noise(x: number, y: number, t: number) {
      const sin1 = Math.sin(x * 0.01 + t);
      const sin2 = Math.sin(y * 0.01 + t * 0.8);
      const sin3 = Math.sin((x + y) * 0.005 + t * 1.2);
      return (sin1 + sin2 + sin3) / 3;
    }

    // Animation loop
    let animationFrameId: number;

    function animate() {
      // Clear with slight transparency for trailing effect
      ctx.fillStyle = 'rgba(240, 238, 230, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.005;

      // Points move with humble integrity toward unity
      flowPoints.forEach(point => {
        // Calculate noise-based flow
        const noiseValue = noise(point.x, point.y, time);
        const angle = noiseValue * Math.PI * 4;

        // Mouse influence
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const pushFactor = (1 - dist / 150) * 0.5;
          point.vx += dx / dist * pushFactor;
          point.vy += dy / dist * pushFactor;
        }

        // Flow field influence
        point.vx += Math.cos(angle) * 0.1;
        point.vy += Math.sin(angle) * 0.1;

        // Damping
        point.vx *= 0.95;
        point.vy *= 0.95;

        // Update position for next frame
        const nextX = point.x + point.vx;
        const nextY = point.y + point.vy;

        // Draw line
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nextX, nextY);

        // Gradient based on speed
        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
        const alpha = Math.min(0.6, speed * 5);

        ctx.strokeStyle = `rgba(80, 80, 80, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw a small dot at the point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80, 80, 80, ${alpha * 0.5})`;
        ctx.fill();

        // Reset position to grid when it goes off screen
        if (nextX < 0) point.x = canvas.width;
        if (nextX > canvas.width) point.x = 0;
        if (nextY < 0) point.y = canvas.height;
        if (nextY > canvas.height) point.y = 0;

        // Return to original position slowly
        point.x += (point.x % gridSize === gridSize/2 ? 0 : (gridSize/2 - point.x % gridSize) * 0.01);
        point.y += (point.y % gridSize === gridSize/2 ? 0 : (gridSize/2 - point.y % gridSize) * 0.01);
      });

      // No longer drawing the concentric circles

      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      // Clear canvas context
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Clear flowPoints array to prevent memory leaks
      flowPoints.length = 0;
    };
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-[#F0EEE6]">
      <div style={{
        width: '550px',
        height: '550px',
        backgroundColor: '#F0EEE6'
      }}>
        <canvas ref={canvasRef} className="w-full h-full object-cover" style={{ display: 'block' }} />
      </div>
    </div>
  );
};

export default FlowingPattern;
