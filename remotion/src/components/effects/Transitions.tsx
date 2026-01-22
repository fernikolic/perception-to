import React from "react";
import { useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence } from "remotion";
import { cinematicInterpolate, appleEaseOut, linearEase } from "../../lib/easing";

/**
 * Fade transition wrapper
 */
interface FadeProps {
  children: React.ReactNode;
  /** Fade in duration in seconds */
  fadeIn?: number;
  /** Fade out duration in seconds */
  fadeOut?: number;
  /** Delay before fade in */
  delay?: number;
}

export const Fade: React.FC<FadeProps> = ({
  children,
  fadeIn = 0.5,
  fadeOut = 0.5,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeInFrames = fadeIn * fps;
  const fadeOutFrames = fadeOut * fps;
  const delayFrames = delay * fps;

  const opacity = cinematicInterpolate(
    frame,
    [
      delayFrames,
      delayFrames + fadeInFrames,
      durationInFrames - fadeOutFrames,
      durationInFrames,
    ],
    [0, 1, 1, 0]
  );

  return <div style={{ opacity }}>{children}</div>;
};

/**
 * Slide transition wrapper
 */
interface SlideProps {
  children: React.ReactNode;
  /** Direction of slide */
  direction?: "up" | "down" | "left" | "right";
  /** Distance to slide in pixels */
  distance?: number;
  /** Duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Also fade */
  fade?: boolean;
}

export const Slide: React.FC<SlideProps> = ({
  children,
  direction = "up",
  distance = 100,
  duration = 0.8,
  delay = 0,
  fade = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = delay * fps;
  const durationFrames = duration * fps;
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const progress = cinematicInterpolate(
    adjustedFrame,
    [0, durationFrames],
    [0, 1]
  );

  const opacity = fade ? progress : 1;

  let translateX = 0;
  let translateY = 0;

  switch (direction) {
    case "up":
      translateY = distance * (1 - progress);
      break;
    case "down":
      translateY = -distance * (1 - progress);
      break;
    case "left":
      translateX = distance * (1 - progress);
      break;
    case "right":
      translateX = -distance * (1 - progress);
      break;
  }

  return (
    <div
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Scale transition wrapper
 */
interface ScaleProps {
  children: React.ReactNode;
  /** Starting scale */
  from?: number;
  /** Ending scale */
  to?: number;
  /** Duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Also fade */
  fade?: boolean;
}

export const Scale: React.FC<ScaleProps> = ({
  children,
  from = 0.8,
  to = 1,
  duration = 0.8,
  delay = 0,
  fade = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = delay * fps;
  const durationFrames = duration * fps;
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const scale = cinematicInterpolate(
    adjustedFrame,
    [0, durationFrames],
    [from, to]
  );

  const opacity = fade
    ? cinematicInterpolate(adjustedFrame, [0, durationFrames * 0.5], [0, 1])
    : 1;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Ken Burns effect - cinematic pan and zoom on images
 */
interface KenBurnsProps {
  children: React.ReactNode;
  /** Starting zoom level */
  startZoom?: number;
  /** Ending zoom level */
  endZoom?: number;
  /** Pan direction */
  panDirection?: "left" | "right" | "up" | "down" | "none";
  /** Pan amount in percentage */
  panAmount?: number;
}

export const KenBurns: React.FC<KenBurnsProps> = ({
  children,
  startZoom = 1,
  endZoom = 1.1,
  panDirection = "right",
  panAmount = 5,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = frame / durationInFrames;

  const zoom = startZoom + (endZoom - startZoom) * progress;

  let translateX = 0;
  let translateY = 0;

  switch (panDirection) {
    case "left":
      translateX = panAmount * progress;
      break;
    case "right":
      translateX = -panAmount * progress;
      break;
    case "up":
      translateY = panAmount * progress;
      break;
    case "down":
      translateY = -panAmount * progress;
      break;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${zoom}) translate(${translateX}%, ${translateY}%)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Blur transition - cinematic focus/unfocus
 */
interface BlurTransitionProps {
  children: React.ReactNode;
  /** Max blur amount */
  maxBlur?: number;
  /** Blur in duration in seconds */
  blurIn?: number;
  /** Blur out duration in seconds */
  blurOut?: number;
}

export const BlurTransition: React.FC<BlurTransitionProps> = ({
  children,
  maxBlur = 20,
  blurIn = 0.5,
  blurOut = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const blurInFrames = blurIn * fps;
  const blurOutFrames = blurOut * fps;

  const blur = cinematicInterpolate(
    frame,
    [0, blurInFrames, durationInFrames - blurOutFrames, durationInFrames],
    [maxBlur, 0, 0, maxBlur]
  );

  return (
    <div style={{ filter: `blur(${blur}px)` }}>
      {children}
    </div>
  );
};

/**
 * Wipe transition overlay
 */
interface WipeTransitionProps {
  /** Direction of wipe */
  direction?: "left" | "right" | "up" | "down";
  /** Color of wipe */
  color?: string;
  /** Duration in seconds */
  duration?: number;
}

export const WipeTransition: React.FC<WipeTransitionProps> = ({
  direction = "right",
  color = "#1a1a1a",
  duration = 0.6,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const durationFrames = duration * fps;

  // Wipe in then out
  const progress = cinematicInterpolate(
    frame,
    [0, durationFrames / 2, durationFrames],
    [0, 100, 0]
  );

  let clipPath: string;

  switch (direction) {
    case "right":
      clipPath = `inset(0 ${100 - progress}% 0 0)`;
      break;
    case "left":
      clipPath = `inset(0 0 0 ${100 - progress}%)`;
      break;
    case "down":
      clipPath = `inset(0 0 ${100 - progress}% 0)`;
      break;
    case "up":
      clipPath = `inset(${100 - progress}% 0 0 0)`;
      break;
    default:
      clipPath = `inset(0 ${100 - progress}% 0 0)`;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        clipPath,
        zIndex: 1000,
      }}
    />
  );
};
