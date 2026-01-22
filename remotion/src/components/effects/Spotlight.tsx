import React from "react";
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import { cinematicInterpolate, appleEaseOut } from "../../lib/easing";

interface SpotlightProps {
  /** X position (0-100%) */
  x: number;
  /** Y position (0-100%) */
  y: number;
  /** Radius of the spotlight in pixels */
  radius?: number;
  /** Color of the spotlight glow */
  color?: string;
  /** Intensity of the darkness outside spotlight (0-1) */
  darkness?: number;
  /** Blur amount for soft edges */
  blur?: number;
  /** Animation delay in frames */
  delay?: number;
  /** Pulse animation */
  pulse?: boolean;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  x,
  y,
  radius = 150,
  color = "rgba(255, 255, 255, 0.1)",
  darkness = 0.7,
  blur = 60,
  delay = 0,
  pulse = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  // Fade in the spotlight
  const opacity = cinematicInterpolate(
    adjustedFrame,
    [0, fps * 0.8],
    [0, 1]
  );

  // Subtle pulse effect
  const pulseScale = pulse
    ? 1 + Math.sin(adjustedFrame / fps * Math.PI) * 0.05
    : 1;

  const actualRadius = radius * pulseScale;

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(
            circle ${actualRadius}px at ${x}% ${y}%,
            transparent 0%,
            transparent 60%,
            rgba(0, 0, 0, ${darkness * opacity}) 100%
          )
        `,
        pointerEvents: "none",
      }}
    >
      {/* Inner glow */}
      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          transform: "translate(-50%, -50%)",
          width: actualRadius * 2,
          height: actualRadius * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          opacity: opacity * 0.5,
        }}
      />
    </AbsoluteFill>
  );
};
