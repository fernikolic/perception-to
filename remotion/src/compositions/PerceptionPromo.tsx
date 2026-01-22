import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const PERCEPTION_CREAM = "#F0EEE6";
const PERCEPTION_BLACK = "#1a1a1a";
const PERCEPTION_GRAY = "#666666";

// Perception brand headline component
const Headline: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  const opacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        fontSize: 64,
        fontWeight: 700,
        color: PERCEPTION_BLACK,
        textAlign: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {text}
    </div>
  );
};

// Animated tagline
const Tagline: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const translateY = interpolate(adjustedFrame, [0, fps * 0.5], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const opacity = interpolate(adjustedFrame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontSize: 28,
        color: PERCEPTION_GRAY,
        textAlign: "center",
        maxWidth: 800,
        fontFamily: "system-ui, -apple-system, sans-serif",
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      {text}
    </div>
  );
};

// Workflow step animation
const WorkflowStep: React.FC<{
  icon: string;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 80, stiffness: 150 },
  });

  const opacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        paddingLeft: 32,
        paddingRight: 32,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div style={{ fontSize: 48 }}>{icon}</div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: PERCEPTION_BLACK,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 14,
          color: PERCEPTION_GRAY,
          textAlign: "center",
          maxWidth: 200,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {description}
      </div>
    </div>
  );
};

// Arrow connector
const Arrow: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const opacity = interpolate(adjustedFrame, [0, fps * 0.2], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scaleX = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        fontSize: 36,
        color: "#ccc",
        opacity,
        transform: `scaleX(${scaleX})`,
      }}
    >
      →
    </div>
  );
};

export const PerceptionPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Scene timing
  const scene1End = fps * 3;
  const scene2End = fps * 7;
  const scene3End = durationInFrames;

  return (
    <AbsoluteFill style={{ backgroundColor: PERCEPTION_CREAM }}>
      {/* Scene 1: Headline */}
      <Sequence from={0} durationInFrames={scene1End}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <Headline text="Intelligence Workspace" />
          <Tagline
            text="For Bitcoin, Stablecoins & Tokenized Finance"
            delay={fps * 0.5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Workflow */}
      <Sequence from={scene1End} durationInFrames={scene2End - scene1End}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ marginBottom: 48 }}>
            <Headline text="Monitor → Organize → Generate" delay={0} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginTop: 32,
            }}
          >
            <WorkflowStep
              icon="📡"
              title="Monitor"
              description="Watchlists track 650+ sources 24/7"
              delay={fps * 0.3}
            />
            <Arrow delay={fps * 0.8} />
            <WorkflowStep
              icon="📁"
              title="Organize"
              description="Intelligence Spaces for every project"
              delay={fps * 1.0}
            />
            <Arrow delay={fps * 1.5} />
            <WorkflowStep
              icon="⚡"
              title="Generate"
              description="Pre-built Recipes for instant outputs"
              delay={fps * 1.7}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: CTA */}
      <Sequence from={scene2End} durationInFrames={scene3End - scene2End}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <Headline text="Stop Starting from Scratch" delay={0} />
          <Tagline
            text="Deliverables in minutes, not hours"
            delay={fps * 0.3}
          />
          <div
            style={{
              marginTop: 32,
              paddingLeft: 32,
              paddingRight: 32,
              paddingTop: 16,
              paddingBottom: 16,
              backgroundColor: PERCEPTION_BLACK,
              color: PERCEPTION_CREAM,
              fontSize: 24,
              fontWeight: 600,
              borderRadius: 8,
              fontFamily: "system-ui, -apple-system, sans-serif",
              opacity: interpolate(
                frame - scene2End,
                [fps * 0.5, fps * 1],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
              transform: `scale(${spring({
                frame: Math.max(0, frame - scene2End - fps * 0.5),
                fps,
                config: { damping: 80, stiffness: 200 },
              })})`,
            }}
          >
            perception.to
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
