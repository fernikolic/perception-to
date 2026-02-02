# Perception Remotion Videos

Video production toolkit for Perception marketing and promotional content.

## Quick Start

```bash
# From project root

# Preview in Remotion Studio (opens browser at localhost:3001)
npm run remotion:studio

# Render a specific composition
npx remotion render remotion/src/index.ts <CompositionId> remotion/out/<filename>.mp4
```

## Project Structure

```
remotion/
├── src/
│   ├── index.ts              # Entry point (exports RemotionRoot)
│   ├── Root.tsx              # Composition registry
│   ├── index.css             # Global styles
│   ├── compositions/         # Video compositions (the actual videos)
│   │   └── [VideoName].tsx
│   ├── components/
│   │   ├── devices/          # Device frames (MacBook, iPhone, Browser)
│   │   └── effects/          # Reusable effects (TextReveal, Spotlight, etc.)
│   └── lib/
│       ├── colors.ts         # Perception brand colors
│       └── easing.ts         # Premium easing curves & spring configs
├── public/
│   ├── recordings/           # Screen recordings for editorial videos
│   ├── *.woff2               # Perception brand fonts (Ronzino, Newsreader, Necto Mono)
│   └── [other assets]
├── out/                      # Rendered video outputs
└── remotion.config.ts        # Remotion configuration
```

## Design System

### Brand Colors (`src/lib/colors.ts`)

```typescript
perception = {
  cream: "#F0EEE6",      // Primary background
  black: "#1a1a1a",      // Primary text
  gray: "#666666",       // Secondary text
  lightGray: "#999999",  // Tertiary text
  accent: "#2ecc71",     // Green accent
  white: "#FFFFFF",
}
```

### Brand Fonts

- **Ronzino** - Display/headlines (weights: 400, 500, 700)
- **Newsreader** - Serif/body (variable weight, supports italic)
- **Necto Mono** - Monospace/code

Load fonts in compositions:
```typescript
import { staticFile } from "remotion";

const fontCSS = `
  @font-face {
    font-family: 'Ronzino';
    src: url('${staticFile("Ronzino-Medium.woff2")}') format('woff2');
    font-weight: 500;
  }
`;

// In component:
<style>{fontCSS}</style>
```

### Easing & Animation (`src/lib/easing.ts`)

Premium easing curves:
- `appleEaseOut` - Apple's signature ease-out (entrances)
- `cinematicEase` - Slow, deliberate reveals
- `dramaticEntrance` - Bold entrances
- `linearEase` - Linear app's smooth ease

Spring configs:
- `springConfigs.cinematic` - Slow, deliberate
- `springConfigs.gentle` - Professional UI elements
- `springConfigs.snappy` - Buttons/cards

---

## Style Guidelines

### Current Direction: Editorial + Bold

The videos should feel like **Apple product videos** meets **energetic brand content**:

1. **Minimal & Editorial**
   - Generous whitespace around content
   - One focal point at a time
   - Clean typography with clear hierarchy
   - Subtle shadows and depth

2. **Bold & Energetic**
   - Confident, purposeful animations
   - Not slow/boring - maintain rhythm
   - Strong visual moments
   - Clear value communication

3. **NOT These Things**
   - Full-page screenshots floating in browser windows
   - Cheap-looking generic transitions
   - Cluttered frames with too much happening
   - Generic "SaaS promo" aesthetics

### Recording-Based Workflow

Instead of static screenshots, use **screen recordings of specific micro-interactions**:

**What to Record:**
- Searching and getting instant results
- Hovering over data points (tooltip reveals)
- Filtering/sorting data
- Charts animating in
- Clicking into detail views
- Real-time updates appearing

**Recording Tips:**
- Use clean browser (hide bookmarks, extensions)
- Record at 2x resolution for crisp zoom-ins
- Slow down actions slightly - more intentional
- Record individual actions separately

**Implementation:**
- Tight crops on the action (not full page)
- Subtle Ken Burns effect (slow zoom/pan)
- Generous whitespace around each clip
- Clean typography labels
- Smooth crossfades between moments

---

## Creating a New Video

### 1. Create the Composition File

```typescript
// src/compositions/MyVideo.tsx
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { perception } from "../lib/colors";
import { cinematicInterpolate } from "../lib/easing";

export const MyVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: perception.cream }}>
      {/* Scenes go here */}
    </AbsoluteFill>
  );
};
```

### 2. Register in Root.tsx

```typescript
import { MyVideo } from "./compositions/MyVideo";

// Inside RemotionRoot:
<Composition
  id="MyVideo"
  component={MyVideo}
  durationInFrames={300}  // 10 seconds at 30fps
  fps={30}
  width={1920}
  height={1080}
/>
```

### 3. Using Screen Recordings

```typescript
import { Video, staticFile } from "remotion";

// Place recording in public/recordings/
<Video
  src={staticFile("recordings/search-interaction.mp4")}
  style={{
    width: 800,
    borderRadius: 12,
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  }}
/>
```

### 4. Preview & Render

```bash
# Preview
npm run remotion:studio

# Render
npx remotion render remotion/src/index.ts MyVideo remotion/out/my-video.mp4
```

---

## Reusable Components

### Device Frames

```typescript
import { MacBookFrame, BrowserFrame, iPhoneFrame } from "../components/devices";

<MacBookFrame variant="space-gray">
  <Video src={staticFile("recordings/demo.mp4")} />
</MacBookFrame>
```

### Effects

```typescript
import { TextReveal, Spotlight, AnimatedCursor } from "../components/effects";

<TextReveal text="Hello World" startFrame={0} />
<Spotlight x={500} y={300} radius={200} />
```

---

## Rendering Options

### Standard 1080p
```bash
npx remotion render remotion/src/index.ts CompositionId out/video.mp4
```

### Square (Social)
Register a square version in Root.tsx with `width={1080} height={1080}`

### With Options
```bash
npx remotion render remotion/src/index.ts CompositionId out/video.mp4 \
  --codec h264 \
  --crf 18 \
  --fps 30
```

### GIF
```bash
npx remotion render remotion/src/index.ts CompositionId out/video.gif \
  --codec gif
```

---

## Common Patterns

### Scene Sequencing

```typescript
const sceneDurations = {
  intro: 90,      // 3s at 30fps
  feature1: 120,  // 4s
  feature2: 120,  // 4s
  cta: 90,        // 3s
};

let frame = 0;
const starts = {
  intro: (frame += 0, frame),
  feature1: (frame += sceneDurations.intro, frame),
  feature2: (frame += sceneDurations.feature1, frame),
  cta: (frame += sceneDurations.feature2, frame),
};

// Total: 420 frames (14s)

<Sequence from={starts.intro} durationInFrames={sceneDurations.intro}>
  <IntroScene />
</Sequence>
```

### Ken Burns Effect on Video

```typescript
const scale = interpolate(frame, [0, durationInFrames], [1, 1.1], {
  easing: Easing.linear,
});
const translateX = interpolate(frame, [0, durationInFrames], [0, -20]);

<Video
  src={staticFile("recordings/demo.mp4")}
  style={{
    transform: `scale(${scale}) translateX(${translateX}px)`,
  }}
/>
```

### Fade Transitions Between Scenes

Use `<Sequence>` with overlapping frames and opacity interpolation, or use the Transitions component from `components/effects`.

---

## Troubleshooting

### Fonts not loading
- Ensure font files are in `public/` folder
- Use `staticFile()` for the URL
- Check font-face CSS is injected via `<style>` tag

### Video not playing in preview
- Check file path is correct
- Ensure video is in `public/` and accessed via `staticFile()`
- Try different codec if rendering issues

### Studio not starting
- Default port is 3001 (configured in remotion.config.ts)
- Check if port is already in use
- Run from project root, not remotion folder
