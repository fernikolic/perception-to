import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
  interpolate,
  Easing,
  spring,
} from "remotion";
import { perception } from "../lib/colors";

/**
 * Premium Feature Showcase - Cinematic tour with varied animations
 * Uses Perception brand fonts: Ronzino (display), Newsreader (serif), Necto Mono (mono)
 */

// Font definitions - custom Perception fonts
const fonts = {
  display: "'Ronzino', 'Inter', system-ui, sans-serif",
  serif: "'Newsreader', Georgia, serif",
  mono: "'Necto Mono', 'SF Mono', monospace",
  body: "'Inter', system-ui, sans-serif",
};

// Generate font-face CSS using staticFile URLs
const getFontCSS = () => `
  @font-face {
    font-family: 'Ronzino';
    src: url('${staticFile("Ronzino-Regular.woff2")}') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Ronzino';
    src: url('${staticFile("Ronzino-Medium.woff2")}') format('woff2');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Ronzino';
    src: url('${staticFile("Ronzino-Bold.woff2")}') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Newsreader';
    src: url('${staticFile("Newsreader-Variable.woff2")}') format('woff2');
    font-weight: 200 800;
    font-style: normal;
  }
  @font-face {
    font-family: 'Newsreader';
    src: url('${staticFile("Newsreader-VariableItalic.woff2")}') format('woff2');
    font-weight: 200 800;
    font-style: italic;
  }
  @font-face {
    font-family: 'Necto Mono';
    src: url('${staticFile("NectoMono-Regular.woff2")}') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
`;

// Ease presets
const smoothOut = Easing.bezier(0.16, 1, 0.3, 1);
const dramaticOut = Easing.bezier(0.22, 1, 0.36, 1);
const bouncy = Easing.bezier(0.34, 1.56, 0.64, 1);

// ============================================
// Scene 1: Cinematic Opening with Split Text
// ============================================
const SceneOpening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Background gradient rotation
  const gradientAngle = interpolate(frame, [0, 120], [135, 180], {
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });

  // Split line animations
  const line1Progress = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: dramaticOut,
  });

  const line2Progress = interpolate(frame, [25, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: dramaticOut,
  });

  // Accent line
  const accentWidth = interpolate(frame, [50, 85], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: smoothOut,
  });

  // Tagline fade
  const taglineOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 73.7) % 100,
    size: 2 + (i % 4),
    delay: i * 3,
    speed: 0.3 + (i % 5) * 0.1,
  }));

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Animated grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(46,204,113,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(46,204,113,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translateY(${interpolate(frame, [0, 120], [0, -30])}px)`,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => {
        const particleY = interpolate(
          frame,
          [p.delay, p.delay + 200],
          [height + 20, -20],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const particleOpacity = interpolate(
          frame,
          [p.delay, p.delay + 30, p.delay + 170, p.delay + 200],
          [0, 0.6, 0.6, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: particleY,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: perception.accent,
              opacity: particleOpacity,
              filter: "blur(0.5px)",
            }}
          />
        );
      })}

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 24,
        }}
      >
        {/* Line 1 - Split reveal */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontSize: 120,
              fontFamily: fonts.display,
              fontWeight: 500,
              color: perception.cream,
              letterSpacing: -4,
              transform: `translateY(${(1 - line1Progress) * 120}px)`,
              opacity: line1Progress,
            }}
          >
            PERCEPTION
          </div>
        </div>

        {/* Accent line */}
        <div
          style={{
            width: accentWidth,
            height: 3,
            backgroundColor: perception.accent,
            borderRadius: 2,
          }}
        />

        {/* Line 2 - Split reveal */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontSize: 42,
              fontFamily: fonts.serif,
              fontWeight: 400,
              fontStyle: "italic",
              color: perception.lightGray,
              transform: `translateY(${(1 - line2Progress) * 60}px)`,
              opacity: line2Progress,
            }}
          >
            Intelligence Workspace
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 40,
            fontSize: 18,
            fontFamily: fonts.mono,
            color: perception.accent,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: taglineOpacity,
          }}
        >
          Bitcoin • Stablecoins • Tokenized Finance
        </div>
      </div>

      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          opacity: taglineOpacity,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontFamily: fonts.mono,
            color: perception.gray,
            letterSpacing: 2,
          }}
        >
          perception.to
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 2: Dashboard - Perspective Reveal
// ============================================
const SceneDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3D perspective entrance
  const rotateX = interpolate(frame, [0, 45], [25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: dramaticOut,
  });

  const rotateY = interpolate(frame, [0, 45], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: dramaticOut,
  });

  const translateZ = interpolate(frame, [0, 45], [-400, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: dramaticOut,
  });

  const scale = interpolate(frame, [0, 45], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: dramaticOut,
  });

  // Subtle float after entrance
  const floatY = interpolate(frame, [45, 120], [0, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });

  // Label animations
  const labelOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelSlide = interpolate(frame, [35, 55], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: smoothOut,
  });

  // Glow pulse
  const glowOpacity = interpolate(
    frame,
    [60, 80, 100, 120],
    [0.2, 0.5, 0.3, 0.4],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Radial gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 120%, ${perception.accent}15 0%, transparent 70%)`,
        }}
      />

      {/* 3D Container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          perspective: 2000,
        }}
      >
        <div
          style={{
            transform: `
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              translateZ(${translateZ}px)
              translateY(${floatY}px)
              scale(${scale})
            `,
            transformStyle: "preserve-3d",
            position: "relative",
          }}
        >
          {/* Glow behind */}
          <div
            style={{
              position: "absolute",
              inset: -40,
              background: perception.accent,
              filter: "blur(80px)",
              opacity: glowOpacity,
              borderRadius: 40,
            }}
          />

          {/* Browser frame */}
          <div
            style={{
              width: 1200,
              height: 720,
              backgroundColor: "#1a1a1a",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 60px 120px rgba(0,0,0,0.6), 0 20px 40px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Browser chrome */}
            <div
              style={{
                height: 36,
                backgroundColor: "#2a2a2a",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                gap: 8,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
              <div
                style={{
                  marginLeft: 20,
                  flex: 1,
                  height: 24,
                  backgroundColor: "#1a1a1a",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  color: perception.gray,
                }}
              >
                perception.to/dashboard
              </div>
            </div>

            {/* Screenshot */}
            <Img
              src={staticFile("screenshots/home-dashboard.png")}
              style={{
                width: "100%",
                height: "calc(100% - 36px)",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 100,
          opacity: labelOpacity,
          transform: `translateY(${labelSlide}px)`,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontFamily: fonts.mono,
            color: perception.accent,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          01 — Dashboard
        </div>
        <div
          style={{
            fontSize: 48,
            fontFamily: fonts.display,
            fontWeight: 500,
            color: perception.cream,
            letterSpacing: -1,
          }}
        >
          Your Command Center
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 3: Trends - Horizontal Scroll Reveal
// ============================================
const SceneTrends: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Horizontal scroll from right
  const scrollX = interpolate(frame, [0, 60], [400, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: dramaticOut,
  });

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Continuous subtle drift
  const drift = interpolate(frame, [60, 150], [0, -20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });

  // Data visualization overlay
  const dataPoints = [
    { x: 200, y: 400, delay: 40 },
    { x: 500, y: 300, delay: 50 },
    { x: 800, y: 350, delay: 60 },
    { x: 1100, y: 250, delay: 70 },
    { x: 1400, y: 320, delay: 80 },
  ];

  // Label stagger
  const labelOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: perception.cream }}>
      {/* Subtle texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${perception.black}05 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          paddingLeft: 100,
        }}
      >
        {/* Left text */}
        <div
          style={{
            width: 400,
            zIndex: 10,
            opacity: labelOpacity,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontFamily: fonts.mono,
              color: perception.accent,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            02 — Trends
          </div>
          <div
            style={{
              fontSize: 56,
              fontFamily: fonts.display,
              fontWeight: 500,
              color: perception.black,
              letterSpacing: -2,
              lineHeight: 1.1,
            }}
          >
            Real-Time
            <br />
            Market Pulse
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 18,
              fontFamily: fonts.serif,
              fontStyle: "italic",
              color: perception.gray,
              lineHeight: 1.6,
            }}
          >
            Track what's happening now across 650+ sources
          </div>
        </div>

        {/* Scrolling screenshot */}
        <div
          style={{
            position: "absolute",
            right: -100,
            opacity,
            transform: `translateX(${scrollX + drift}px)`,
          }}
        >
          <div
            style={{
              width: 1100,
              height: 700,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "-40px 40px 80px rgba(0,0,0,0.15)",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <Img
              src={staticFile("screenshots/trends-happening-now.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Floating data points */}
          {dataPoints.map((point, i) => {
            const pointOpacity = interpolate(
              frame,
              [point.delay, point.delay + 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const pointScale = interpolate(
              frame,
              [point.delay, point.delay + 20],
              [0.5, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bouncy }
            );
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: point.x,
                  top: point.y,
                  opacity: pointOpacity,
                  transform: `scale(${pointScale})`,
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: perception.accent,
                    boxShadow: `0 0 20px ${perception.accent}`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Accent corner */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 300,
          height: 300,
          background: `linear-gradient(45deg, ${perception.accent}10 0%, transparent 70%)`,
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================
// Scene 4: Research - Parallax Depth
// ============================================
const SceneResearch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Multi-layer parallax
  const bgLayer = interpolate(frame, [0, 120], [0, -15], {
    extrapolateRight: "clamp",
  });
  const midLayer = interpolate(frame, [0, 120], [0, -30], {
    extrapolateRight: "clamp",
  });
  const fgLayer = interpolate(frame, [0, 120], [0, -50], {
    extrapolateRight: "clamp",
  });

  // Entry animation
  const entryScale = interpolate(frame, [0, 40], [1.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: smoothOut,
  });

  const entryOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating badges
  const badges = [
    { label: "Sentiment", x: 150, y: 200, delay: 30 },
    { label: "Analysis", x: 200, y: 700, delay: 45 },
    { label: "AI-Powered", x: 1500, y: 300, delay: 60 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0d0d0d", overflow: "hidden" }}>
      {/* Background layer - subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${bgLayer}px)`,
          backgroundImage: `
            linear-gradient(rgba(46,204,113,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(46,204,113,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Mid layer - gradient orbs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${midLayer}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "30%",
            width: 600,
            height: 600,
            background: `radial-gradient(circle, ${perception.accent}08 0%, transparent 60%)`,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            right: "20%",
            width: 800,
            height: 800,
            background: `radial-gradient(circle, ${perception.accent}05 0%, transparent 60%)`,
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Main content layer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          transform: `translateY(${fgLayer}px) scale(${entryScale})`,
          opacity: entryOpacity,
        }}
      >
        <div
          style={{
            width: 1150,
            height: 700,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
            position: "relative",
          }}
        >
          <Img
            src={staticFile("screenshots/research-sentiment.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Overlay gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.3) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Floating badges */}
      {badges.map((badge, i) => {
        const badgeOpacity = interpolate(
          frame,
          [badge.delay, badge.delay + 25],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const badgeY = interpolate(
          frame,
          [badge.delay, badge.delay + 25],
          [20, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothOut }
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: badge.x,
              top: badge.y,
              opacity: badgeOpacity,
              transform: `translateY(${badgeY}px)`,
            }}
          >
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "rgba(46,204,113,0.15)",
                border: `1px solid ${perception.accent}40`,
                borderRadius: 100,
                fontFamily: fonts.mono,
                fontSize: 14,
                color: perception.accent,
                letterSpacing: 1,
                backdropFilter: "blur(10px)",
              }}
            >
              {badge.label}
            </div>
          </div>
        );
      })}

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 100,
          opacity: entryOpacity,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontFamily: fonts.mono,
            color: perception.accent,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          03 — Research
        </div>
        <div
          style={{
            fontSize: 42,
            fontFamily: fonts.display,
            fontWeight: 500,
            color: perception.cream,
            letterSpacing: -1,
          }}
        >
          Sentiment Analysis
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 5: Earnings - Card Flip
// ============================================
const SceneEarnings: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card flip animation
  const rotateY = interpolate(frame, [0, 50], [-90, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: dramaticOut,
  });

  const cardOpacity = frame > 10 ? 1 : 0;

  // Staggered data cards
  const dataCards = [
    { label: "$MSTR", value: "+12.4%", delay: 50 },
    { label: "$COIN", value: "+8.7%", delay: 60 },
    { label: "$SQ", value: "+5.2%", delay: 70 },
  ];

  // Background pulse
  const pulseScale = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.05, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: perception.cream }}>
      {/* Dynamic background */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 800,
          height: 800,
          transform: `translate(-50%, -50%) scale(${pulseScale})`,
          background: `radial-gradient(circle, ${perception.accent}08 0%, transparent 60%)`,
          borderRadius: "50%",
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          perspective: 2000,
        }}
      >
        {/* Flipping card */}
        <div
          style={{
            transform: `rotateY(${rotateY}deg)`,
            transformStyle: "preserve-3d",
            opacity: cardOpacity,
          }}
        >
          <div
            style={{
              width: 1100,
              height: 680,
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 50px 100px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.05)",
              backfaceVisibility: "hidden",
            }}
          >
            <Img
              src={staticFile("screenshots/earnings-intelligence.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating data cards */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {dataCards.map((card, i) => {
          const cardScale = interpolate(
            frame,
            [card.delay, card.delay + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: bouncy }
          );
          return (
            <div
              key={i}
              style={{
                transform: `scale(${cardScale})`,
                padding: "16px 24px",
                backgroundColor: perception.black,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 16,
                  color: perception.cream,
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 20,
                  fontWeight: 600,
                  color: perception.accent,
                }}
              >
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 100,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontFamily: fonts.mono,
            color: perception.accent,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          04 — Earnings
        </div>
        <div
          style={{
            fontSize: 48,
            fontFamily: fonts.display,
            fontWeight: 500,
            color: perception.black,
            letterSpacing: -1,
          }}
        >
          Corporate Intelligence
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 6: Stats - Morphing Counter
// ============================================
const SceneStats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: 650, suffix: "+", label: "Data Sources", delay: 15 },
    { value: 24, suffix: "/7", label: "Coverage", delay: 30 },
    { value: 10, suffix: "x", label: "Faster Research", delay: 45 },
  ];

  // Animated background bars
  const bars = Array.from({ length: 8 }, (_, i) => ({
    height: 100 + (i * 50),
    delay: i * 5,
  }));

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0a0a0a 0%, #111 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Animated bars */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
          height: "40%",
          opacity: 0.1,
        }}
      >
        {bars.map((bar, i) => {
          const barHeight = interpolate(
            frame,
            [bar.delay, bar.delay + 40],
            [0, bar.height],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothOut }
          );
          return (
            <div
              key={i}
              style={{
                width: 80,
                height: barHeight,
                backgroundColor: perception.accent,
                borderRadius: "8px 8px 0 0",
              }}
            />
          );
        })}
      </div>

      {/* Stats content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 60,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 24,
            fontFamily: fonts.mono,
            color: perception.gray,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Intelligence at Scale
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 140 }}>
          {stats.map((stat, i) => {
            // Animated counter
            const countProgress = interpolate(
              frame,
              [stat.delay, stat.delay + 45],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothOut }
            );
            const displayValue = Math.round(stat.value * countProgress);

            const statOpacity = interpolate(
              frame,
              [stat.delay, stat.delay + 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const statY = interpolate(
              frame,
              [stat.delay, stat.delay + 25],
              [40, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothOut }
            );

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  opacity: statOpacity,
                  transform: `translateY(${statY}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 96,
                    fontFamily: fonts.display,
                    fontWeight: 600,
                    color: perception.accent,
                    letterSpacing: -4,
                    lineHeight: 1,
                  }}
                >
                  {displayValue}{stat.suffix}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.mono,
                    color: perception.lightGray,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Scene 7: CTA - Convergent Animation
// ============================================
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Lines converging from edges
  const lineProgress = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: dramaticOut,
  });

  // Text reveal
  const line1Y = interpolate(frame, [20, 50], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: dramaticOut,
  });
  const line1Opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const line2Y = interpolate(frame, [35, 65], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: dramaticOut,
  });
  const line2Opacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Button
  const buttonScale = interpolate(frame, [60, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: bouncy,
  });

  const buttonGlow = interpolate(frame, [85, 105], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Converging lines */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {/* Top line */}
        <line
          x1={width / 2}
          y1={0}
          x2={width / 2}
          y2={height * 0.35 * lineProgress}
          stroke={perception.accent}
          strokeWidth={2}
          strokeOpacity={0.3}
        />
        {/* Bottom line */}
        <line
          x1={width / 2}
          y1={height}
          x2={width / 2}
          y2={height - height * 0.25 * lineProgress}
          stroke={perception.accent}
          strokeWidth={2}
          strokeOpacity={0.3}
        />
        {/* Left line */}
        <line
          x1={0}
          y1={height / 2}
          x2={width * 0.3 * lineProgress}
          y2={height / 2}
          stroke={perception.accent}
          strokeWidth={2}
          strokeOpacity={0.3}
        />
        {/* Right line */}
        <line
          x1={width}
          y1={height / 2}
          x2={width - width * 0.3 * lineProgress}
          y2={height / 2}
          stroke={perception.accent}
          strokeWidth={2}
          strokeOpacity={0.3}
        />
      </svg>

      {/* Center content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 20,
        }}
      >
        {/* Line 1 */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontSize: 72,
              fontFamily: fonts.display,
              fontWeight: 500,
              color: perception.cream,
              letterSpacing: -2,
              transform: `translateY(${line1Y}px)`,
              opacity: line1Opacity,
            }}
          >
            Stop Searching.
          </div>
        </div>

        {/* Line 2 */}
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontSize: 72,
              fontFamily: fonts.display,
              fontWeight: 500,
              color: perception.accent,
              letterSpacing: -2,
              transform: `translateY(${line2Y}px)`,
              opacity: line2Opacity,
            }}
          >
            Start Perceiving.
          </div>
        </div>

        {/* Button */}
        <div
          style={{
            marginTop: 50,
            position: "relative",
            transform: `scale(${buttonScale})`,
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              inset: -30,
              background: perception.accent,
              filter: "blur(40px)",
              opacity: buttonGlow,
              borderRadius: 30,
            }}
          />
          {/* Button */}
          <div
            style={{
              position: "relative",
              padding: "24px 64px",
              backgroundColor: perception.accent,
              borderRadius: 14,
              fontFamily: fonts.display,
              fontSize: 26,
              fontWeight: 600,
              color: perception.black,
              letterSpacing: -0.5,
            }}
          >
            perception.to
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 20,
            fontSize: 18,
            fontFamily: fonts.serif,
            fontStyle: "italic",
            color: perception.gray,
            opacity: line2Opacity,
          }}
        >
          Your intelligence workspace awaits
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// Main Export
// ============================================
export const FeatureShowcase: React.FC = () => {
  const { fps } = useVideoConfig();

  // Scene durations (in frames at 30fps)
  const sceneDurations = {
    opening: 120,      // 4s
    dashboard: 130,    // ~4.3s
    trends: 130,       // ~4.3s
    research: 120,     // 4s
    earnings: 110,     // ~3.7s
    stats: 100,        // ~3.3s
    cta: 120,          // 4s
  };

  // Calculate cumulative start frames
  let cumulative = 0;
  const starts = {
    opening: cumulative,
    dashboard: cumulative += sceneDurations.opening,
    trends: cumulative += sceneDurations.dashboard,
    research: cumulative += sceneDurations.trends,
    earnings: cumulative += sceneDurations.research,
    stats: cumulative += sceneDurations.earnings,
    cta: cumulative += sceneDurations.stats,
  };

  // Font CSS for custom Perception fonts (static content, safe for inline style)
  const fontStyles = getFontCSS();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Load custom fonts via staticFile URLs */}
      <style>{fontStyles}</style>

      <Sequence from={starts.opening} durationInFrames={sceneDurations.opening}>
        <SceneOpening />
      </Sequence>

      <Sequence from={starts.dashboard} durationInFrames={sceneDurations.dashboard}>
        <SceneDashboard />
      </Sequence>

      <Sequence from={starts.trends} durationInFrames={sceneDurations.trends}>
        <SceneTrends />
      </Sequence>

      <Sequence from={starts.research} durationInFrames={sceneDurations.research}>
        <SceneResearch />
      </Sequence>

      <Sequence from={starts.earnings} durationInFrames={sceneDurations.earnings}>
        <SceneEarnings />
      </Sequence>

      <Sequence from={starts.stats} durationInFrames={sceneDurations.stats}>
        <SceneStats />
      </Sequence>

      <Sequence from={starts.cta} durationInFrames={sceneDurations.cta}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
