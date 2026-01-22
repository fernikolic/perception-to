import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
  AbsoluteFill,
} from "remotion";
import { cinematicInterpolate, cinematicSpring, appleEaseOut } from "../../lib/easing";
import { device, perception } from "../../lib/colors";

interface MacBookFrameProps {
  /** Screenshot or image source */
  screenshot?: string;
  /** Children to render as screen content */
  children?: React.ReactNode;
  /** Rotation on Y axis in degrees */
  rotateY?: number;
  /** Rotation on X axis in degrees */
  rotateX?: number;
  /** Scale factor */
  scale?: number;
  /** Color theme */
  theme?: "silver" | "space";
  /** Show reflection/gloss effect */
  showReflection?: boolean;
  /** Animation delay in frames */
  delay?: number;
  /** Enable entrance animation */
  animate?: boolean;
}

export const MacBookFrame: React.FC<MacBookFrameProps> = ({
  screenshot,
  children,
  rotateY = 0,
  rotateX = 15,
  scale = 1,
  theme = "silver",
  showReflection = true,
  delay = 0,
  animate = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  // Entrance animation
  const entrance = animate
    ? cinematicSpring(adjustedFrame, fps, "cinematic")
    : 1;

  const animatedScale = animate
    ? cinematicInterpolate(adjustedFrame, [0, fps * 1.2], [0.8, 1]) * scale
    : scale;

  const animatedY = animate
    ? cinematicInterpolate(adjustedFrame, [0, fps * 1.2], [100, 0])
    : 0;

  const animatedOpacity = animate
    ? cinematicInterpolate(adjustedFrame, [0, fps * 0.5], [0, 1])
    : 1;

  const frameColor = theme === "silver" ? device.macbookSilver : device.macbookSpace;
  const bezelColor = theme === "silver" ? "#1d1d1f" : "#000000";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        perspective: 2000,
        opacity: animatedOpacity,
      }}
    >
      <div
        style={{
          transform: `
            translateY(${animatedY}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(${animatedScale})
          `,
          transformStyle: "preserve-3d",
        }}
      >
        {/* MacBook body */}
        <div
          style={{
            position: "relative",
            width: 900,
            height: 580,
          }}
        >
          {/* Screen bezel */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 520,
              backgroundColor: bezelColor,
              borderRadius: "16px 16px 0 0",
              padding: 12,
              boxShadow: `
                0 50px 100px -20px rgba(0, 0, 0, 0.5),
                0 30px 60px -30px rgba(0, 0, 0, 0.6),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            {/* Camera notch */}
            <div
              style={{
                position: "absolute",
                top: 6,
                left: "50%",
                transform: "translateX(-50%)",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#2d2d2d",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
              }}
            />

            {/* Screen area */}
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#000",
                borderRadius: 8,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Screenshot or children */}
              {screenshot ? (
                <Img
                  src={screenshot}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : children ? (
                <div style={{ width: "100%", height: "100%", position: "relative" }}>
                  {children}
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: perception.cream,
                  }}
                />
              )}

              {/* Screen reflection */}
              {showReflection && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          </div>

          {/* Bottom chassis */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 40,
              right: 40,
              height: 60,
              backgroundColor: frameColor,
              borderRadius: "0 0 8px 8px",
              boxShadow: `
                0 4px 8px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.5)
              `,
            }}
          >
            {/* Trackpad area hint */}
            <div
              style={{
                position: "absolute",
                top: 8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 200,
                height: 4,
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: 2,
              }}
            />
          </div>

          {/* Hinge */}
          <div
            style={{
              position: "absolute",
              bottom: 56,
              left: 40,
              right: 40,
              height: 8,
              backgroundColor: theme === "silver" ? "#b8b8b8" : "#0d0d0d",
              borderRadius: "0 0 2px 2px",
            }}
          />
        </div>
      </div>
    </div>
  );
};
