import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { cinematicInterpolate, appleEaseOut } from "../../lib/easing";

interface HighlightProps {
  /** X position in pixels */
  x: number;
  /** Y position in pixels */
  y: number;
  /** Width of highlight area */
  width: number;
  /** Height of highlight area */
  height: number;
  /** Border radius */
  borderRadius?: number;
  /** Highlight color */
  color?: string;
  /** Border width */
  borderWidth?: number;
  /** Animation delay in frames */
  delay?: number;
  /** Glow effect */
  glow?: boolean;
  /** Pulse animation */
  pulse?: boolean;
}

export const Highlight: React.FC<HighlightProps> = ({
  x,
  y,
  width,
  height,
  borderRadius = 8,
  color = "#2ecc71",
  borderWidth = 3,
  delay = 0,
  glow = true,
  pulse = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  // Scale in animation
  const scale = cinematicInterpolate(
    adjustedFrame,
    [0, fps * 0.5],
    [0.8, 1]
  );

  const opacity = cinematicInterpolate(
    adjustedFrame,
    [0, fps * 0.3],
    [0, 1]
  );

  // Pulse effect
  const pulseOpacity = pulse
    ? 0.5 + Math.sin(adjustedFrame / fps * 4) * 0.3
    : 0.8;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius,
        border: `${borderWidth}px solid ${color}`,
        transform: `scale(${scale})`,
        opacity,
        boxShadow: glow
          ? `
            0 0 20px ${color}40,
            0 0 40px ${color}20,
            inset 0 0 20px ${color}10
          `
          : "none",
        pointerEvents: "none",
      }}
    >
      {/* Animated corner accents */}
      {[
        { top: -2, left: -2 },
        { top: -2, right: -2 },
        { bottom: -2, left: -2 },
        { bottom: -2, right: -2 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 12,
            height: 12,
            borderRadius: 2,
            backgroundColor: color,
            opacity: pulseOpacity,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Animated box highlight that draws itself
 */
interface AnimatedHighlightBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
}

export const AnimatedHighlightBox: React.FC<AnimatedHighlightBoxProps> = ({
  x,
  y,
  width,
  height,
  color = "#2ecc71",
  strokeWidth = 3,
  delay = 0,
  duration = 0.8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const durationFrames = fps * duration;

  // Calculate the perimeter for stroke animation
  const perimeter = 2 * (width + height);

  // Animate the stroke
  const strokeProgress = cinematicInterpolate(
    adjustedFrame,
    [0, durationFrames],
    [perimeter, 0]
  );

  const opacity = cinematicInterpolate(
    adjustedFrame,
    [0, fps * 0.2],
    [0, 1]
  );

  return (
    <svg
      style={{
        position: "absolute",
        left: x - strokeWidth,
        top: y - strokeWidth,
        width: width + strokeWidth * 2,
        height: height + strokeWidth * 2,
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <rect
        x={strokeWidth}
        y={strokeWidth}
        width={width}
        height={height}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={perimeter}
        strokeDashoffset={strokeProgress}
        strokeLinecap="round"
        rx={8}
        ry={8}
        style={{ opacity }}
      />
      {/* Glow effect */}
      <rect
        x={strokeWidth}
        y={strokeWidth}
        width={width}
        height={height}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth + 4}
        strokeDasharray={perimeter}
        strokeDashoffset={strokeProgress}
        strokeLinecap="round"
        rx={8}
        ry={8}
        style={{ opacity: opacity * 0.3, filter: "blur(4px)" }}
      />
    </svg>
  );
};
