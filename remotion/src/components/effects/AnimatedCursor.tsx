import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { cinematicInterpolate, cinematicSpring, appleEaseOut, springConfigs } from "../../lib/easing";

interface CursorPosition {
  x: number;
  y: number;
  frame: number;
}

interface AnimatedCursorProps {
  /** Array of positions with frame timings */
  positions: CursorPosition[];
  /** Cursor style */
  style?: "pointer" | "default" | "click";
  /** Cursor color */
  color?: string;
  /** Show click animation at each position */
  showClicks?: boolean;
  /** Click duration in frames */
  clickDuration?: number;
  /** Cursor size */
  size?: number;
  /** Trail effect */
  showTrail?: boolean;
}

export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  positions,
  style = "pointer",
  color = "#1a1a1a",
  showClicks = true,
  clickDuration = 15,
  size = 24,
  showTrail = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (positions.length === 0) return null;

  // Find current position based on frame
  let currentX = positions[0].x;
  let currentY = positions[0].y;
  let isClicking = false;

  for (let i = 0; i < positions.length - 1; i++) {
    const current = positions[i];
    const next = positions[i + 1];

    if (frame >= current.frame && frame < next.frame) {
      // Interpolate between positions with smooth easing
      const progress = cinematicInterpolate(
        frame,
        [current.frame, next.frame],
        [0, 1]
      );
      currentX = current.x + (next.x - current.x) * progress;
      currentY = current.y + (next.y - current.y) * progress;
      break;
    } else if (frame >= next.frame && i === positions.length - 2) {
      currentX = next.x;
      currentY = next.y;
    }
  }

  // Check if we're at a click moment (arrived at a position)
  positions.forEach((pos) => {
    if (frame >= pos.frame && frame < pos.frame + clickDuration) {
      isClicking = true;
    }
  });

  // Click animation scale
  const clickScale = isClicking ? 0.85 : 1;

  return (
    <>
      {/* Trail effect */}
      {showTrail && (
        <div
          style={{
            position: "absolute",
            left: currentX,
            top: currentY,
            width: size * 0.5,
            height: size * 0.5,
            borderRadius: "50%",
            backgroundColor: color,
            opacity: 0.2,
            filter: "blur(8px)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Cursor */}
      <div
        style={{
          position: "absolute",
          left: currentX,
          top: currentY,
          transform: `translate(-4px, -2px) scale(${clickScale})`,
          pointerEvents: "none",
          transition: "transform 0.1s ease",
        }}
      >
        {style === "pointer" ? (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path
              d="M5.5 3.21V20.8C5.5 21.3 5.94 21.54 6.31 21.23L10.5 17.5H18C18.55 17.5 19 17.05 19 16.5V4.5C19 3.95 18.55 3.5 18 3.5H6.31C5.94 3.5 5.5 3.74 5.5 3.21Z"
              fill={color}
              stroke="white"
              strokeWidth="1.5"
            />
            {/* Pointer cursor shape */}
            <path
              d="M5 3L5 21L10 16H12L5 3Z"
              fill={color}
              stroke="white"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Default arrow cursor
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path
              d="M4 4L4 20L9 15L12 22L15 21L12 14L19 14L4 4Z"
              fill={color}
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Click ripple effect */}
      {showClicks &&
        positions.map((pos, i) => {
          const clickFrame = frame - pos.frame;
          if (clickFrame >= 0 && clickFrame < clickDuration * 2) {
            const rippleScale = cinematicInterpolate(
              clickFrame,
              [0, clickDuration * 2],
              [0, 2]
            );
            const rippleOpacity = cinematicInterpolate(
              clickFrame,
              [0, clickDuration * 2],
              [0.6, 0]
            );

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: pos.x,
                  top: pos.y,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: `2px solid ${color}`,
                  transform: `translate(-50%, -50%) scale(${rippleScale})`,
                  opacity: rippleOpacity,
                  pointerEvents: "none",
                }}
              />
            );
          }
          return null;
        })}
    </>
  );
};

/**
 * Simple click indicator that shows a click at a position
 */
interface ClickIndicatorProps {
  x: number;
  y: number;
  delay?: number;
  color?: string;
}

export const ClickIndicator: React.FC<ClickIndicatorProps> = ({
  x,
  y,
  delay = 0,
  color = "#2ecc71",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  if (adjustedFrame < 0) return null;

  const ripple1Scale = cinematicInterpolate(adjustedFrame, [0, fps * 0.6], [0, 2.5]);
  const ripple1Opacity = cinematicInterpolate(adjustedFrame, [0, fps * 0.6], [0.8, 0]);

  const ripple2Scale = cinematicInterpolate(adjustedFrame, [fps * 0.1, fps * 0.7], [0, 2]);
  const ripple2Opacity = cinematicInterpolate(adjustedFrame, [fps * 0.1, fps * 0.7], [0.6, 0]);

  const dotScale = cinematicInterpolate(adjustedFrame, [0, fps * 0.15, fps * 0.3], [0, 1.2, 1]);

  return (
    <>
      {/* Center dot */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: color,
          transform: `translate(-50%, -50%) scale(${dotScale})`,
          boxShadow: `0 0 20px ${color}`,
          pointerEvents: "none",
        }}
      />

      {/* Ripple 1 */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `2px solid ${color}`,
          transform: `translate(-50%, -50%) scale(${ripple1Scale})`,
          opacity: ripple1Opacity,
          pointerEvents: "none",
        }}
      />

      {/* Ripple 2 */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `2px solid ${color}`,
          transform: `translate(-50%, -50%) scale(${ripple2Scale})`,
          opacity: ripple2Opacity,
          pointerEvents: "none",
        }}
      />
    </>
  );
};
