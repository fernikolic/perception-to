import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { BrowserFrame } from "../components/devices";
import {
  Spotlight,
  Highlight,
  ClickIndicator,
  KenBurns,
  Fade,
  Slide,
  Scale,
} from "../components/effects";
import { TextReveal, HeadlineReveal, Counter } from "../components/effects/TextReveal";
import { perception } from "../lib/colors";
import { cinematicInterpolate, cinematicSpring } from "../lib/easing";

/**
 * Premium Demo - Showcases all the animation capabilities
 * This serves as both a demo and a reference for building feature videos
 */

// Scene 1: Headline reveal
const Scene1Headline: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: perception.cream,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      <HeadlineReveal
        lines={["Intelligence Workspace", "For Emerging Finance"]}
        fontSize={72}
        fontWeight={700}
        lineStagger={0.2}
        delay={15}
      />
      <Slide direction="up" delay={0.8} duration={0.6}>
        <div
          style={{
            fontSize: 24,
            color: perception.gray,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Monitor • Organize • Generate
        </div>
      </Slide>
    </AbsoluteFill>
  );
};

// Scene 2: Browser mockup with spotlight
const Scene2Browser: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: perception.cream }}>
      {/* Browser frame */}
      <BrowserFrame
        url="perception.to/dashboard"
        theme="light"
        width={900}
        height={560}
        rotateX={8}
        rotateY={-5}
        delay={0}
      >
        {/* Placeholder content - replace with screenshot */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#fafafa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: perception.gray,
            fontFamily: "system-ui",
          }}
        >
          [Drop your screenshot here]
        </div>
      </BrowserFrame>

      {/* Spotlight effect */}
      <Sequence from={45}>
        <Spotlight x={65} y={40} radius={200} darkness={0.6} pulse />
      </Sequence>

      {/* Highlight box */}
      <Sequence from={60}>
        <Highlight
          x={500}
          y={200}
          width={200}
          height={120}
          color={perception.accent}
          delay={0}
        />
      </Sequence>

      {/* Click indicator */}
      <Sequence from={90}>
        <ClickIndicator x={600} y={260} color={perception.accent} />
      </Sequence>
    </AbsoluteFill>
  );
};

// Scene 3: Stats with counters
const Scene3Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: 650, suffix: "+", label: "Sources Monitored" },
    { value: 24, suffix: "/7", label: "Continuous Coverage" },
    { value: 10, suffix: "x", label: "Faster Deliverables" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: perception.black,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
      }}
    >
      <Fade fadeIn={0.4}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: perception.cream,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          By the Numbers
        </div>
      </Fade>

      <div style={{ display: "flex", gap: 100 }}>
        {stats.map((stat, i) => (
          <Scale key={i} delay={0.3 + i * 0.15} from={0.8} to={1}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                duration={1.2}
                delay={20 + i * 8}
                fontSize={80}
                fontWeight={700}
                color={perception.accent}
              />
              <div
                style={{
                  fontSize: 18,
                  color: perception.lightGray,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {stat.label}
              </div>
            </div>
          </Scale>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: CTA
const Scene4CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buttonScale = cinematicSpring(Math.max(0, frame - 30), fps, "appleBounce");

  return (
    <AbsoluteFill
      style={{
        backgroundColor: perception.cream,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      <TextReveal
        text="Stop Starting from Scratch"
        fontSize={64}
        fontWeight={700}
        style="slide"
        by="word"
        stagger="normal"
      />

      <Slide direction="up" delay={0.6} duration={0.5}>
        <div
          style={{
            fontSize: 24,
            color: perception.gray,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Your intelligence workspace awaits
        </div>
      </Slide>

      <div
        style={{
          marginTop: 20,
          padding: "20px 48px",
          backgroundColor: perception.black,
          color: perception.cream,
          fontSize: 24,
          fontWeight: 600,
          borderRadius: 12,
          fontFamily: "system-ui, -apple-system, sans-serif",
          transform: `scale(${buttonScale})`,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        perception.to
      </div>
    </AbsoluteFill>
  );
};

export const PremiumDemo: React.FC = () => {
  const { fps } = useVideoConfig();

  // Scene durations in frames
  const scene1Duration = fps * 3;
  const scene2Duration = fps * 4;
  const scene3Duration = fps * 3.5;
  const scene4Duration = fps * 3;

  return (
    <AbsoluteFill>
      {/* Scene 1: Headline */}
      <Sequence from={0} durationInFrames={scene1Duration}>
        <Scene1Headline />
      </Sequence>

      {/* Scene 2: Browser mockup */}
      <Sequence from={scene1Duration} durationInFrames={scene2Duration}>
        <Scene2Browser />
      </Sequence>

      {/* Scene 3: Stats */}
      <Sequence from={scene1Duration + scene2Duration} durationInFrames={scene3Duration}>
        <Scene3Stats />
      </Sequence>

      {/* Scene 4: CTA */}
      <Sequence
        from={scene1Duration + scene2Duration + scene3Duration}
        durationInFrames={scene4Duration}
      >
        <Scene4CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
