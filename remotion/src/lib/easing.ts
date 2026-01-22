import { Easing, interpolate, spring } from "remotion";

/**
 * Premium Easing Library
 * Cinematic, Apple-style easing curves for professional animations
 */

// Apple's signature easing - used in iOS animations
export const appleEase = Easing.bezier(0.25, 0.1, 0.25, 1.0);

// Apple's "ease out" - great for entrances
export const appleEaseOut = Easing.bezier(0.16, 1, 0.3, 1);

// Apple's "ease in" - great for exits
export const appleEaseIn = Easing.bezier(0.4, 0, 1, 1);

// Linear's signature smooth ease
export const linearEase = Easing.bezier(0.22, 1, 0.36, 1);

// Arc browser's playful ease
export const arcEase = Easing.bezier(0.34, 1.56, 0.64, 1);

// Notion's subtle ease
export const notionEase = Easing.bezier(0.4, 0, 0.2, 1);

// Cinematic slow reveal
export const cinematicEase = Easing.bezier(0.16, 1, 0.3, 1);

// Elastic for playful bounces (subtle)
export const subtleElastic = Easing.elastic(0.8);

// Smooth deceleration
export const smoothDecel = Easing.bezier(0, 0, 0.2, 1);

// Dramatic entrance
export const dramaticEntrance = Easing.bezier(0.19, 1, 0.22, 1);

/**
 * Premium spring configurations for different use cases
 */
export const springConfigs = {
  // Gentle, professional - good for UI elements
  gentle: { damping: 20, stiffness: 100, mass: 1 },

  // Smooth and slow - good for hero elements
  smooth: { damping: 30, stiffness: 80, mass: 1.2 },

  // Snappy but controlled - good for buttons/cards
  snappy: { damping: 25, stiffness: 200, mass: 0.8 },

  // Cinematic - slow and deliberate
  cinematic: { damping: 40, stiffness: 60, mass: 1.5 },

  // Apple-style bounce
  appleBounce: { damping: 15, stiffness: 150, mass: 1 },

  // No bounce, just smooth
  noBounce: { damping: 200, stiffness: 100, mass: 1 },

  // Dramatic entrance
  dramatic: { damping: 35, stiffness: 50, mass: 2 },
} as const;

/**
 * Duration presets in seconds (multiply by fps for frames)
 */
export const durations = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  cinematic: 1.2,
  dramatic: 1.8,
  epic: 2.5,
} as const;

/**
 * Delay presets for staggered animations
 */
export const staggerDelays = {
  tight: 0.05,
  normal: 0.1,
  relaxed: 0.15,
  dramatic: 0.25,
} as const;

/**
 * Premium interpolation helper with cinematic defaults
 */
export function cinematicInterpolate(
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number],
  options?: {
    easing?: (t: number) => number;
    extrapolateLeft?: "clamp" | "extend";
    extrapolateRight?: "clamp" | "extend";
  }
) {
  return interpolate(frame, inputRange, outputRange, {
    easing: options?.easing ?? cinematicEase,
    extrapolateLeft: options?.extrapolateLeft ?? "clamp",
    extrapolateRight: options?.extrapolateRight ?? "clamp",
  });
}

/**
 * Create a cinematic spring animation
 */
export function cinematicSpring(
  frame: number,
  fps: number,
  config: keyof typeof springConfigs = "cinematic"
) {
  return spring({
    frame,
    fps,
    config: springConfigs[config],
  });
}

/**
 * Staggered delay calculator
 */
export function getStaggerDelay(
  index: number,
  fps: number,
  delayType: keyof typeof staggerDelays = "normal"
): number {
  return Math.floor(index * staggerDelays[delayType] * fps);
}
