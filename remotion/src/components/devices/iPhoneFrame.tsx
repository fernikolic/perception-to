import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { cinematicInterpolate, cinematicSpring } from "../../lib/easing";
import { device, perception } from "../../lib/colors";

interface iPhoneFrameProps {
  /** Screenshot or image source */
  screenshot?: string;
  /** Children to render as screen content */
  children?: React.ReactNode;
  /** Device color theme */
  theme?: "black" | "silver";
  /** Scale factor */
  scale?: number;
  /** Rotation on Y axis */
  rotateY?: number;
  /** Rotation on X axis */
  rotateX?: number;
  /** Show dynamic island */
  showDynamicIsland?: boolean;
  /** Animation delay in frames */
  delay?: number;
  /** Enable entrance animation */
  animate?: boolean;
}

export const IPhoneFrame: React.FC<iPhoneFrameProps> = ({
  screenshot,
  children,
  theme = "black",
  scale = 1,
  rotateY = 0,
  rotateX = 0,
  showDynamicIsland = true,
  delay = 0,
  animate = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const animatedScale = animate
    ? cinematicInterpolate(adjustedFrame, [0, fps * 1], [0.85, 1]) * scale
    : scale;

  const animatedY = animate
    ? cinematicInterpolate(adjustedFrame, [0, fps * 1], [80, 0])
    : 0;

  const animatedOpacity = animate
    ? cinematicInterpolate(adjustedFrame, [0, fps * 0.4], [0, 1])
    : 1;

  const frameColor = theme === "black" ? device.iphoneBlack : device.iphoneSilver;
  const bezelColor = theme === "black" ? "#000" : "#1d1d1f";

  // iPhone 15 Pro dimensions (scaled)
  const deviceWidth = 280;
  const deviceHeight = 572;
  const screenWidth = deviceWidth - 16;
  const screenHeight = deviceHeight - 16;
  const cornerRadius = 44;
  const screenRadius = 38;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        perspective: 1500,
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
        {/* iPhone body */}
        <div
          style={{
            position: "relative",
            width: deviceWidth,
            height: deviceHeight,
            backgroundColor: frameColor,
            borderRadius: cornerRadius,
            padding: 8,
            boxShadow: `
              0 50px 100px -20px rgba(0, 0, 0, 0.4),
              0 30px 60px -30px rgba(0, 0, 0, 0.5),
              inset 0 0 0 2px rgba(255, 255, 255, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
          }}
        >
          {/* Side buttons - left (mute + volume) */}
          <div
            style={{
              position: "absolute",
              left: -3,
              top: 100,
              width: 3,
              height: 24,
              backgroundColor: frameColor,
              borderRadius: "2px 0 0 2px",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -3,
              top: 140,
              width: 3,
              height: 44,
              backgroundColor: frameColor,
              borderRadius: "2px 0 0 2px",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -3,
              top: 195,
              width: 3,
              height: 44,
              backgroundColor: frameColor,
              borderRadius: "2px 0 0 2px",
            }}
          />

          {/* Side button - right (power) */}
          <div
            style={{
              position: "absolute",
              right: -3,
              top: 160,
              width: 3,
              height: 64,
              backgroundColor: frameColor,
              borderRadius: "0 2px 2px 0",
            }}
          />

          {/* Screen */}
          <div
            style={{
              width: screenWidth,
              height: screenHeight,
              backgroundColor: bezelColor,
              borderRadius: screenRadius,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Screen content */}
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

            {/* Dynamic Island */}
            {showDynamicIsland && (
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 90,
                  height: 28,
                  backgroundColor: "#000",
                  borderRadius: 14,
                }}
              />
            )}

            {/* Screen reflection */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
