# Tutorial Videos System

This document describes the tutorial video system implemented in Perception to help users learn how to use different features of the application.

## Overview

Tutorial videos are hosted on Google Cloud Storage and displayed throughout the app via a reusable component system. Each major section of the app has a corresponding "How to use" button that opens a modal with the relevant tutorial video.

## Video Storage

### Google Cloud Storage Bucket

- **Bucket Name:** `perception-tutorial-videos`
- **Project:** `triple-upgrade-245423`
- **Location:** Default GCS location
- **Public Access:** Enabled (allUsers have `roles/storage.objectViewer`)

### CORS Configuration

The bucket has CORS configured to allow video playback from:
- `https://perception.to`
- `https://*.perception.to`
- `http://localhost:5173` (development)
- `http://localhost:3000` (development)

### Content Security Policy

The app's CSP includes `media-src` directive to allow video loading:
```
media-src 'self' https://storage.googleapis.com https://*.storage.googleapis.com blob:;
```

This is configured in:
- `public/_headers` (production)
- `public/_headers.dev` (development)
- `csp.config.ts` (Vite config)
- `cloudflare-deployment-package/config/_headers`

## Video URLs

Base URL: `https://storage.googleapis.com/perception-tutorial-videos/`

| Video ID | Filename | Full URL | App Location |
|----------|----------|----------|--------------|
| `home` | `homepage.mp4` | https://storage.googleapis.com/perception-tutorial-videos/homepage.mp4 | Home/Market Briefing page |
| `onboarding` | `onboarding.mp4` | https://storage.googleapis.com/perception-tutorial-videos/onboarding.mp4 | Onboarding welcome step |
| `research` | `research.mp4` | https://storage.googleapis.com/perception-tutorial-videos/research.mp4 | Research page (Search tab) |
| `trends` | `trends.mp4` | https://storage.googleapis.com/perception-tutorial-videos/trends.mp4 | Trends page |
| `coverage` | `coverage.mp4` | https://storage.googleapis.com/perception-tutorial-videos/coverage.mp4 | Coverage/Narrative Tracker page |
| `spaces` | `spaces.mp4` | https://storage.googleapis.com/perception-tutorial-videos/spaces.mp4 | Spaces page |
| `competitor-analysis` | `competitor-analysis.mp4` | https://storage.googleapis.com/perception-tutorial-videos/competitor-analysis.mp4 | Research page (Compare tab), Watchlist settings |
| `recipes` | `recipes.mp4` | https://storage.googleapis.com/perception-tutorial-videos/recipes.mp4 | Keyword Alerts settings |

## Component Architecture

### File Structure

```
src/components/tutorials/
├── index.ts                    # Exports all components
├── tutorial-config.ts          # Video configuration and URLs
├── video-tutorial-button.tsx   # Button component (3 variants)
├── video-tutorial-modal.tsx    # Modal with video player
└── video-tutorial-card.tsx     # Dismissible card component
```

### Components

#### `VideoTutorialButton`

A button that opens the tutorial video modal. Supports three variants:

1. **`chip`** (default): Compact pill-shaped button with "How to use" label
2. **`button`**: Full button with "Watch Tutorial" text
3. **`icon`**: Icon-only button with tooltip

```tsx
import { VideoTutorialButton, tutorialVideos } from '@/components/tutorials';

// Default chip variant
<VideoTutorialButton video={tutorialVideos.research} />

// Button variant (used in onboarding)
<VideoTutorialButton video={tutorialVideos.onboarding} variant="button" />

// Icon variant
<VideoTutorialButton video={tutorialVideos.home} variant="icon" />
```

#### `VideoTutorialModal`

A dialog component that displays the video player. Features:
- Auto-play when opened
- Pauses when closed
- Responsive sizing
- Dark mode support

#### `VideoTutorialCard`

A dismissible card for first-time visitors (optional, not currently used).

### Configuration

Videos are configured in `tutorial-config.ts`:

```typescript
export interface TutorialVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  route: string;
}

export const tutorialVideos: Record<string, TutorialVideo> = {
  home: {
    id: 'home',
    title: 'Market Briefing Overview',
    description: 'Learn how to navigate the Market Briefing dashboard...',
    url: 'https://storage.googleapis.com/perception-tutorial-videos/homepage.mp4',
    route: '/app/home',
  },
  // ... more videos
};
```

## Integration Points

### Pages with Tutorial Videos

| Page | Component File | Video |
|------|---------------|-------|
| Onboarding Welcome | `src/pages/onboarding/steps/welcome.tsx` | `onboarding` |
| Home | `src/components/dashboard/components/home-header.tsx` | `home` |
| Research (Search) | `src/pages/unified-research.tsx` | `research` |
| Research (Compare) | `src/pages/unified-research.tsx` | `competitor-analysis` |
| Trends | `src/components/dashboard/pages/trends-redesigned.tsx` | `trends` |
| Coverage | `src/components/dashboard/pages/narrative-tracker.tsx` | `coverage` |
| Spaces | `src/components/dashboard/pages/spaces.tsx` | `spaces` |
| Watchlist Settings | `src/components/dashboard/pages/settings/clients.tsx` | `competitor-analysis` |
| Keyword Alerts | `src/components/dashboard/pages/settings/keyword-alerts.tsx` | `recipes` |

## Adding New Videos

### 1. Upload to GCS

```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json gcloud storage cp \
  "/path/to/New Video FINAL.mp4" \
  gs://perception-tutorial-videos/new-video.mp4
```

### 2. Add Configuration

In `src/components/tutorials/tutorial-config.ts`:

```typescript
'new-video': {
  id: 'new-video',
  title: 'New Feature Tutorial',
  description: 'Learn how to use the new feature.',
  url: `${GCS_BASE_URL}/new-video.mp4`,
  route: '/app/new-feature',
},
```

### 3. Add Button to Page

```tsx
import { VideoTutorialButton, tutorialVideos } from '@/components/tutorials';

// In your component
<VideoTutorialButton video={tutorialVideos['new-video']} />
```

## Troubleshooting

### Video Not Loading

1. **Check CSP**: Ensure `media-src` includes `storage.googleapis.com`
2. **Check CORS**: Verify bucket CORS allows the origin
3. **Check URL**: Verify the video exists at the configured URL

### Button Not Visible

1. Check z-index conflicts
2. Ensure parent containers don't have `pointer-events: none`
3. Verify the video config exists in `tutorialVideos`

## GCS Management Commands

```bash
# List all videos
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json gcloud storage ls gs://perception-tutorial-videos/

# Check bucket CORS
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json gcloud storage buckets describe gs://perception-tutorial-videos --format="json(cors)"

# Update CORS (if needed)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json gcloud storage buckets update gs://perception-tutorial-videos --cors-file=cors.json

# Delete a video
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json gcloud storage rm gs://perception-tutorial-videos/old-video.mp4
```

## Source Video Files

Original video files were recorded and stored at:
```
/Users/fernandonikolic/Downloads/Perception Documentation Videos/
├── Homepage FINAL.mp4
├── Onboarding FINAL.mp4
├── Research version 2 FINAL.mp4
├── Trends FINAL.mp4
├── Media Page FINAL.mp4
├── Spaces FINAL.mp4
├── Competitor Analysis FINAL.mp4
└── Recipes FINAL.mp4
```
