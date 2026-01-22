import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { cinematicInterpolate, cinematicSpring, getStaggerDelay } from "../../lib/easing";
import { perception } from "../../lib/colors";

interface TextRevealProps {
  /** Text to reveal */
  text: string;
  /** Font size */
  fontSize?: number;
  /** Font weight */
  fontWeight?: number;
  /** Text color */
  color?: string;
  /** Animation style */
  style?: "fade" | "slide" | "scale" | "blur" | "clip";
  /** Reveal by character or word */
  by?: "character" | "word";
  /** Stagger delay type */
  stagger?: "tight" | "normal" | "relaxed" | "dramatic";
  /** Initial delay in frames */
  delay?: number;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Line height */
  lineHeight?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  fontSize = 48,
  fontWeight = 600,
  color = perception.black,
  style = "fade",
  by = "word",
  stagger = "normal",
  delay = 0,
  align = "center",
  lineHeight = 1.2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const units = by === "character" ? text.split("") : text.split(" ");

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily: "system-ui, -apple-system, sans-serif",
        textAlign: align,
        lineHeight,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        gap: by === "word" ? "0.3em" : 0,
      }}
    >
      {units.map((unit, index) => {
        const unitDelay = delay + getStaggerDelay(index, fps, stagger);
        const adjustedFrame = Math.max(0, frame - unitDelay);

        let opacity = 1;
        let transform = "none";
        let filter = "none";
        let clipPath = "none";

        const animDuration = fps * 0.5;

        switch (style) {
          case "fade":
            opacity = cinematicInterpolate(adjustedFrame, [0, animDuration], [0, 1]);
            break;

          case "slide":
            opacity = cinematicInterpolate(adjustedFrame, [0, animDuration], [0, 1]);
            const slideY = cinematicInterpolate(adjustedFrame, [0, animDuration], [30, 0]);
            transform = `translateY(${slideY}px)`;
            break;

          case "scale":
            opacity = cinematicInterpolate(adjustedFrame, [0, animDuration], [0, 1]);
            const scale = cinematicInterpolate(adjustedFrame, [0, animDuration], [0.5, 1]);
            transform = `scale(${scale})`;
            break;

          case "blur":
            opacity = cinematicInterpolate(adjustedFrame, [0, animDuration], [0, 1]);
            const blur = cinematicInterpolate(adjustedFrame, [0, animDuration], [10, 0]);
            filter = `blur(${blur}px)`;
            break;

          case "clip":
            const clipProgress = cinematicInterpolate(adjustedFrame, [0, animDuration], [100, 0]);
            clipPath = `inset(0 0 ${clipProgress}% 0)`;
            break;
        }

        return (
          <span
            key={index}
            style={{
              opacity,
              transform,
              filter,
              clipPath,
              display: "inline-block",
              whiteSpace: by === "character" ? "pre" : "normal",
            }}
          >
            {unit}
            {by === "character" && unit === " " ? "\u00A0" : ""}
          </span>
        );
      })}
    </div>
  );
};

/**
 * Headline with line-by-line reveal
 */
interface HeadlineRevealProps {
  /** Array of lines */
  lines: string[];
  /** Font size */
  fontSize?: number;
  /** Font weight */
  fontWeight?: number;
  /** Text color */
  color?: string;
  /** Stagger between lines in seconds */
  lineStagger?: number;
  /** Initial delay in frames */
  delay?: number;
  /** Text alignment */
  align?: "left" | "center" | "right";
}

export const HeadlineReveal: React.FC<HeadlineRevealProps> = ({
  lines,
  fontSize = 64,
  fontWeight = 700,
  color = perception.black,
  lineStagger = 0.15,
  delay = 0,
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        gap: 8,
      }}
    >
      {lines.map((line, index) => {
        const lineDelay = delay + index * lineStagger * fps;
        const adjustedFrame = Math.max(0, frame - lineDelay);

        const opacity = cinematicInterpolate(adjustedFrame, [0, fps * 0.4], [0, 1]);
        const translateY = cinematicInterpolate(adjustedFrame, [0, fps * 0.6], [40, 0]);
        const clipPath = `inset(0 0 ${cinematicInterpolate(adjustedFrame, [0, fps * 0.5], [100, 0])}% 0)`;

        return (
          <div
            key={index}
            style={{
              fontSize,
              fontWeight,
              color,
              fontFamily: "system-ui, -apple-system, sans-serif",
              opacity,
              transform: `translateY(${translateY}px)`,
              clipPath,
              lineHeight: 1.1,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Counter animation for numbers
 */
interface CounterProps {
  /** Target number */
  to: number;
  /** Starting number */
  from?: number;
  /** Duration in seconds */
  duration?: number;
  /** Delay in frames */
  delay?: number;
  /** Number of decimal places */
  decimals?: number;
  /** Prefix (e.g., "$") */
  prefix?: string;
  /** Suffix (e.g., "%", "+") */
  suffix?: string;
  /** Font size */
  fontSize?: number;
  /** Font weight */
  fontWeight?: number;
  /** Text color */
  color?: string;
}

export const Counter: React.FC<CounterProps> = ({
  to,
  from = 0,
  duration = 1.5,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  fontSize = 64,
  fontWeight = 700,
  color = perception.black,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const durationFrames = duration * fps;

  const value = cinematicInterpolate(
    adjustedFrame,
    [0, durationFrames],
    [from, to]
  );

  const displayValue = value.toFixed(decimals);

  return (
    <span
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
