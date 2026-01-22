import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Cursor } from "./Cursor";

interface TypewriterTextProps {
  text: string;
  startFrame?: number;
  charsPerSecond?: number;
  showCursor?: boolean;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame = 0,
  charsPerSecond = 15,
  showCursor = true,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const framesPerChar = fps / charsPerSecond;
  const adjustedFrame = Math.max(0, frame - startFrame);
  const typingEndFrame = text.length * framesPerChar;

  const visibleChars = Math.floor(
    interpolate(adjustedFrame, [0, typingEndFrame], [0, text.length], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  const displayedText = text.slice(0, visibleChars);
  const isTyping = visibleChars < text.length && adjustedFrame > 0;
  const hasStarted = frame >= startFrame;

  if (!hasStarted) {
    return null;
  }

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <Cursor blinking={!isTyping} />}
    </span>
  );
};
