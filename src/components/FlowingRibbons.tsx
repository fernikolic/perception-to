import React, { useEffect, useRef } from 'react';

// themes: true power needs no power, nothing left undone, depth over surface
// visualization: Forms emerge effortlessly from depth, achieving completeness without force

const MorphingShapesStipple = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    const width = canvas.width;
    const height = canvas.height;

    // Setup - transparent background
    ctx.clearRect(0, 0, width, height);

    // Parameters
    const numPoints = 25000;
    const points = [];
    let time = 0;

    // Define shapes that achieve their form without force
    const shapes = [
      // Organic blob with protrusions
      (x, y, t) => {
        const cx = width / 2;
        const cy = height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const angle = Math.atan2(dy, dx);

        // Add noise to create organic shape
        const noise =
          Math.sin(angle * 2 + t * 0.25) * 15 +
          Math.sin(angle * 4 + t * 0.15) * 10 +
          Math.sin(angle * 6 + t * 0.1) * 5;

        const radius = 150 + noise;
        const dist = Math.sqrt(dx * dx + dy * dy);

        return dist < radius;
      },

      // Star-like shape
      (x, y, t) => {
        const cx = width / 2;
        const cy = height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const angle = Math.atan2(dy, dx);

        // Star with varying points
        const points = 5 + Math.floor(t % 3);
        const radius = 120 + Math.sin(angle * points + t * 0.5) * 60;
        const dist = Math.sqrt(dx * dx + dy * dy);

        return dist < radius;
      },

      // Multiple circles arranged in pattern
      (x, y, t) => {
        const cx = width / 2;
        const cy = height / 2;

        // Create several overlapping circles
        for (let i = 0; i < 5; i++) {
          const angle = t * 0.1 + i * Math.PI * 2 / 5;
          const circleX = cx + Math.cos(angle) * 70;
          const circleY = cy + Math.sin(angle) * 70;

          const dx = x - circleX;
          const dy = y - circleY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) return true;
        }
        return false;
      }
    ];

    // Initialize points randomly across canvas
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        size: 0.5 + Math.random() * 1,
        opacity: 0.2 + Math.random() * 0.4,
        speed: 0.00075 + Math.random() * 0.00175, // Halved from original values
        inside: false
      });
    }

    // Let points find their depth, leaving nothing undone
    const updateTargets = (shapeIndex, t) => {
      const shape = shapes[shapeIndex];

      // Set targets for points
      let insideCount = 0;

      // First assign points that are already inside
      for (const point of points) {
        if (shape(point.x, point.y, t)) {
          point.inside = true;
          insideCount++;
        } else {
          point.inside = false;
        }
      }

      // If we need more points inside
      const desiredInside = numPoints * 0.7; // Target 70% of points inside
      if (insideCount < desiredInside) {
        // Assign more random targets inside the shape
        for (const point of points) {
          if (!point.inside && insideCount < desiredInside) {
            // Try to find a point inside the shape
            let attempts = 0;
            let foundInside = false;

            while (attempts < 5 && !foundInside) {
              const newX = Math.random() * width;
              const newY = Math.random() * height;

              if (shape(newX, newY, t)) {
                point.targetX = newX;
                point.targetY = newY;
                point.inside = true;
                insideCount++;
                foundInside = true;
              }

              attempts++;
            }
          }
        }
      }

      // Distribute remaining points outside but near the shape
      for (const point of points) {
        if (!point.inside) {
          // Create targets outside but not too far
          const angle = Math.random() * Math.PI * 2;
          const distance = 160 + Math.random() * 80;

          point.targetX = width / 2 + Math.cos(angle) * distance;
          point.targetY = height / 2 + Math.sin(angle) * distance;
        }
      }
    };

    // Animation timing control variables
    let animationFrameId = null;
    let lastFrameTime = 0;
    const FRAME_RATE = 30; // 30fps for smooth animation
    const frameInterval = 1000 / FRAME_RATE;

    // Animation function with time delta control
    const animate = (currentTime) => {
      // Initialize lastFrameTime on first frame
      if (!lastFrameTime) {
        lastFrameTime = currentTime;
      }

      const deltaTime = currentTime - lastFrameTime;

      // Only update animation when enough time has passed (mimics setInterval at 33.3ms)
      if (deltaTime >= frameInterval) {
        ctx.clearRect(0, 0, width, height);

        time += 0.0025; // Reduced from 0.005 for more deliberate animation

        // Determine current shape (change every 10 seconds)
        const cycleTime = 10;
        const shapeCycle = (time / cycleTime) % shapes.length;
        const currentShape = Math.floor(shapeCycle);
        const nextShape = (currentShape + 1) % shapes.length;
        const blendFactor = (shapeCycle - currentShape); // 0 to 1 for morphing

        // Every few frames, update target positions
        if (Math.floor(time * 60) % 20 === 0) {
          updateTargets(currentShape, time);
        }

        // Update and draw points
        for (const point of points) {
          // Move towards target with easing
          point.x += (point.targetX - point.x) * point.speed;
          point.y += (point.targetY - point.y) * point.speed;

          // Add subtle flow movement
          point.x += Math.sin(time * 0.15 + point.y * 0.005) * 0.05;
          point.y += Math.cos(time * 0.15 + point.x * 0.005) * 0.05;

          // Check if point is inside current or next shape for smooth morphing
          const insideCurrent = shapes[currentShape](point.x, point.y, time);
          const insideNext = shapes[nextShape](point.x, point.y, time);

          // Blend opacity based on morphing state
          let targetOpacity;

          if (insideCurrent && insideNext) {
            targetOpacity = 0.7; // Inside both shapes
          } else if (insideCurrent) {
            targetOpacity = 0.7 * (1 - blendFactor); // Fading out
          } else if (insideNext) {
            targetOpacity = 0.7 * blendFactor; // Fading in
          } else {
            targetOpacity = 0.1; // Outside both shapes
          }

          // Adjust point opacity with smooth transition
          point.opacity += (targetOpacity - point.opacity) * 0.05;

          // Draw point with white color for black background
          ctx.fillStyle = `rgba(255, 255, 255, ${point.opacity})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Update lastFrameTime, accounting for any remainder to prevent drift
        lastFrameTime = currentTime - (deltaTime % frameInterval);
      }

      // Continue animation loop
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      // Cancel animation frame to prevent memory leaks
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      // Clear canvas context
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }

      // Clear points array to prevent memory leaks
      points.length = 0;
    };
  }, []);

  return (
    <div style={{
      margin: 0,
      background: 'transparent',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    }}>
      <canvas
        ref={canvasRef}
        width={550}
        height={550}
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default MorphingShapesStipple;
