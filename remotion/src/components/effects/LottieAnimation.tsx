import React, { useEffect, useState } from "react";
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import {
  useCurrentFrame,
  useVideoConfig,
  delayRender,
  continueRender,
  staticFile,
} from "remotion";
import { cinematicInterpolate } from "../../lib/easing";

interface LottieAnimationProps {
  /** Path to Lottie JSON file in public folder */
  src: string;
  /** Width of the animation */
  width?: number;
  /** Height of the animation */
  height?: number;
  /** Playback speed multiplier */
  speed?: number;
  /** Loop the animation */
  loop?: boolean;
  /** Start frame delay */
  delay?: number;
  /** Fade in/out */
  fade?: boolean;
  /** Custom style */
  style?: React.CSSProperties;
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({
  src,
  width = 200,
  height = 200,
  speed = 1,
  loop = false,
  delay = 0,
  fade = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const [animationData, setAnimationData] = useState<LottieAnimationData | null>(null);
  const [handle] = useState(() => delayRender("Loading Lottie animation"));

  useEffect(() => {
    fetch(staticFile(src))
      .then((res) => res.json())
      .then((data) => {
        setAnimationData(data);
        continueRender(handle);
      })
      .catch((err) => {
        console.error("Failed to load Lottie animation:", err);
        continueRender(handle);
      });
  }, [src, handle]);

  if (!animationData) {
    return null;
  }

  const adjustedFrame = Math.max(0, frame - delay);

  // Fade in/out effect
  const opacity = fade
    ? cinematicInterpolate(
        adjustedFrame,
        [0, fps * 0.3, durationInFrames - delay - fps * 0.3, durationInFrames - delay],
        [0, 1, 1, 0]
      )
    : 1;

  return (
    <div style={{ opacity, ...style }}>
      <Lottie
        animationData={animationData}
        style={{ width, height }}
        playbackRate={speed}
        loop={loop}
      />
    </div>
  );
};

/**
 * Pre-built Lottie animation components for common use cases
 * Download animations from LottieFiles.com and place in public/lottie/
 */

interface SimpleLottieProps {
  width?: number;
  height?: number;
  delay?: number;
  style?: React.CSSProperties;
}

// Loading spinner
export const LoadingSpinner: React.FC<SimpleLottieProps> = (props) => (
  <LottieAnimation src="lottie/loading-spinner.json" loop {...props} />
);

// Success checkmark
export const SuccessCheck: React.FC<SimpleLottieProps> = (props) => (
  <LottieAnimation src="lottie/success-check.json" {...props} />
);

// Confetti celebration
export const Confetti: React.FC<SimpleLottieProps> = (props) => (
  <LottieAnimation src="lottie/confetti.json" {...props} />
);

// Arrow pointing
export const PointingArrow: React.FC<SimpleLottieProps> = (props) => (
  <LottieAnimation src="lottie/pointing-arrow.json" loop {...props} />
);
