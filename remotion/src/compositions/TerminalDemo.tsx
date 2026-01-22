import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { MacTerminal } from "../components/MacTerminal";
import { Cursor } from "../components/Cursor";

const SKILLS_LOGO = `███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
███████╗█████╔╝ ██║██║     ██║     ███████╗
╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
███████║██║  ██╗██║███████╗███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`;

const OUTPUT_LINES = [
  "",
  "┌  skills",
  "│",
  "◇  Source: https://github.com/perception-to/skills.git",
  "│",
  "◇  Repository cloned",
  "│",
  "◇  Found 3 skills",
  "│",
  "●  perception-intelligence",
  "│  Intelligence workspace for Bitcoin & tokenized finance",
  "│",
  "└  Installation complete",
];

const TerminalContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const command = "npx skills add perception-to/skills";
  const charsPerSecond = 15;
  const framesPerChar = fps / charsPerSecond;
  const typingEndFrame = command.length * framesPerChar;
  const outputStartFrame = typingEndFrame + fps * 0.5;
  const framesPerLine = fps * 0.08;
  const linesStartFrame = outputStartFrame + framesPerLine;

  const visibleChars = Math.floor(
    interpolate(frame, [0, typingEndFrame], [0, command.length], {
      extrapolateRight: "clamp",
    })
  );

  const displayedText = command.slice(0, visibleChars);
  const isTyping = visibleChars < command.length;
  const showOutput = frame >= outputStartFrame;

  const visibleLines = Math.floor(
    interpolate(
      frame,
      [linesStartFrame, linesStartFrame + OUTPUT_LINES.length * framesPerLine],
      [0, OUTPUT_LINES.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", color: "#333" }}>
      <div style={{ display: "flex", alignItems: "center", fontSize: 28 }}>
        <span style={{ color: "#2ecc71", fontWeight: 600 }}>~</span>
        <span style={{ color: "#333", marginLeft: 8, marginRight: 8 }}>$</span>
        <span>{displayedText}</span>
        {!showOutput && <Cursor blinking={!isTyping} />}
      </div>

      {showOutput && (
        <div style={{ marginTop: 16, fontSize: 16, lineHeight: 1.6 }}>
          <pre style={{ color: "#333", fontSize: 12, margin: 0 }}>
            {SKILLS_LOGO}
          </pre>
          {OUTPUT_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} style={{ color: "#333" }}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const TerminalDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 100 },
  });

  const translateY = interpolate(slideIn, [0, 1], [700, 50]);
  const rotateY = interpolate(frame, [0, durationInFrames], [10, -10]);
  const scale = interpolate(frame, [0, durationInFrames], [0.95, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#f8fafc", perspective: 1000 }}>
      <Sequence durationInFrames={durationInFrames}>
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `translateY(${translateY}px) rotateX(15deg) rotateY(${rotateY}deg) scale(${scale})`,
          }}
        >
          <MacTerminal>
            <TerminalContent />
          </MacTerminal>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
