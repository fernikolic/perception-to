/**
 * Perception Brand Colors
 */
export const perception = {
  cream: "#F0EEE6",
  black: "#1a1a1a",
  gray: "#666666",
  lightGray: "#999999",
  accent: "#2ecc71",
  white: "#FFFFFF",
  shadow: "rgba(0, 0, 0, 0.1)",
  shadowDark: "rgba(0, 0, 0, 0.25)",
} as const;

/**
 * Device frame colors
 */
export const device = {
  macbookSilver: "#e3e4e5",
  macbookSpace: "#1d1d1f",
  iphoneBlack: "#1d1d1f",
  iphoneSilver: "#f5f5f7",
  browserChrome: "#dee1e6",
  browserDark: "#202124",
} as const;

/**
 * Gradient presets
 */
export const gradients = {
  subtle: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
  spotlight: "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)",
  vignette: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
  glow: "radial-gradient(circle at center, rgba(46,204,113,0.3) 0%, transparent 60%)",
} as const;
