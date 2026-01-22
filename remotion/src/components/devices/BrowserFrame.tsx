import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { cinematicInterpolate, cinematicSpring } from "../../lib/easing";
import { device, perception } from "../../lib/colors";

interface BrowserFrameProps {
  /** Screenshot or image source */
  screenshot?: string;
  /** Children to render as browser content */
  children?: React.ReactNode;
  /** URL to display in address bar */
  url?: string;
  /** Browser theme */
  theme?: "light" | "dark";
  /** Width of the browser frame */
  width?: number;
  /** Height of the browser frame */
  height?: number;
  /** Show shadow */
  showShadow?: boolean;
  /** Rotation on Y axis */
  rotateY?: number;
  /** Rotation on X axis */
  rotateX?: number;
  /** Scale */
  scale?: number;
  /** Animation delay in frames */
  delay?: number;
  /** Enable entrance animation */
  animate?: boolean;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  screenshot,
  children,
  url = "perception.to",
  theme = "light",
  width = 1000,
  height = 650,
  showShadow = true,
  rotateY = 0,
  rotateX = 0,
  scale = 1,
  delay = 0,
  animate = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const animatedScale = animate
    ? cinematicInterpolate(adjustedFrame, [0, fps * 1], [0.9, 1]) * scale
    : scale;

  const animatedY = animate
    ? cinematicInterpolate(adjustedFrame, [0, fps * 1], [60, 0])
    : 0;

  const animatedOpacity = animate
    ? cinematicInterpolate(adjustedFrame, [0, fps * 0.4], [0, 1])
    : 1;

  const isDark = theme === "dark";
  const bgColor = isDark ? device.browserDark : device.browserChrome;
  const textColor = isDark ? "#e8eaed" : "#5f6368";
  const borderColor = isDark ? "#3c4043" : "#dadce0";

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
          width,
          height,
          backgroundColor: bgColor,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: showShadow
            ? `
              0 25px 50px -12px rgba(0, 0, 0, 0.25),
              0 12px 24px -8px rgba(0, 0, 0, 0.15),
              0 0 0 1px ${borderColor}
            `
            : `0 0 0 1px ${borderColor}`,
        }}
      >
        {/* Browser chrome/toolbar */}
        <div
          style={{
            height: 52,
            backgroundColor: bgColor,
            borderBottom: `1px solid ${borderColor}`,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 12,
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#febc2e",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#28c840",
              }}
            />
          </div>

          {/* Address bar */}
          <div
            style={{
              flex: 1,
              height: 32,
              backgroundColor: isDark ? "#202124" : "#f1f3f4",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 16px",
            }}
          >
            {/* Lock icon */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginRight: 8 }}
            >
              <path
                d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                stroke={textColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                stroke={textColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 14,
                color: textColor,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              {url}
            </span>
          </div>

          {/* Menu dots */}
          <div style={{ display: "flex", gap: 4 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  backgroundColor: textColor,
                }}
              />
            ))}
          </div>
        </div>

        {/* Browser content */}
        <div
          style={{
            height: height - 52,
            backgroundColor: "#fff",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {screenshot ? (
            <Img
              src={screenshot}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
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
        </div>
      </div>
    </div>
  );
};
