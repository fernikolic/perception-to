import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface CursorProps {
  blinking: boolean;
  color?: string;
  width?: number;
  height?: number;
}

export const Cursor: React.FC<CursorProps> = ({
  blinking,
  color = "#1a1a1a",
  width = 3,
  height = 28,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blinkDuration = fps / 2;
  const opacity = blinking
    ? interpolate(frame % blinkDuration, [0, blinkDuration / 2], [1, 0], {
        extrapolateRight: "clamp",
      }) > 0.5
      ? 1
      : 0
    : 1;

  return (
    <span
      style={{
        display: "inline-block",
        marginLeft: 2,
        width,
        height,
        backgroundColor: color,
        opacity,
      }}
    />
  );
};
