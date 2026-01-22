import { AbsoluteFill } from "remotion";
import React from "react";

interface MacTerminalProps {
  children: React.ReactNode;
  title?: string;
}

export const MacTerminal: React.FC<MacTerminalProps> = ({
  children,
  title = "Terminal",
}) => {
  return (
    <AbsoluteFill style={{ padding: 32 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: 56,
            backgroundColor: "#f6f6f6",
            display: "flex",
            alignItems: "center",
            paddingLeft: 20,
            paddingRight: 20,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "#febc2e",
              }}
            />
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "#28c840",
              }}
            />
          </div>
          {/* Title */}
          <div style={{ flex: 1, textAlign: "center" }}>
            <span
              style={{
                color: "#4d4d4d",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {title}
            </span>
          </div>
          {/* Spacer */}
          <div style={{ width: 64 }} />
        </div>

        {/* Terminal content */}
        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: 24,
            fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace",
            fontSize: 24,
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
