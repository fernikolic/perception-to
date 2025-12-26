# Dark Mode Styling Guide

This document outlines the styling conventions for dark mode in the Perception dashboard. Following these guidelines ensures a consistent, professional appearance across all components.

## Core Principle: Use `neutral` Instead of `slate` for Dark Mode

The key insight is that Tailwind's `slate` color palette has a **blue tint**, which can feel cold and disruptive in dark mode. Instead, use the `neutral` palette for dark mode, which provides **true gray tones** without any color bias.

### Color Palette Comparison

| Purpose | Light Mode (slate) | Dark Mode (neutral) |
|---------|-------------------|---------------------|
| Background | `bg-white` | `dark:bg-neutral-900` |
| Background subtle | `bg-slate-50` | `dark:bg-neutral-900/50` |
| Border | `border-slate-200` | `dark:border-neutral-800` |
| Border hover | `hover:border-slate-300` | `dark:hover:border-neutral-700` |
| Text primary | `text-slate-900` | `dark:text-neutral-100` or `dark:text-white` |
| Text secondary | `text-slate-600` | `dark:text-neutral-400` |
| Text muted | `text-slate-500` | `dark:text-neutral-500` |
| Icon | `text-slate-600` | `dark:text-neutral-400` |

## Hex Color Reference for Charts

When using libraries like Recharts that require hex colors, use these values:

### Grid Lines & Axes
```javascript
// Grid lines
stroke={theme === 'dark' ? '#404040' : '#cbd5e1'}  // neutral-700 vs slate-300

// Axis text/ticks
stroke={theme === 'dark' ? '#a3a3a3' : '#64748b'}  // neutral-400 vs slate-500

// Axis labels
fill={theme === 'dark' ? '#737373' : '#94a3b8'}    // neutral-500 vs slate-400
```

### Gradients
```javascript
// Area fill gradient
<linearGradient id="volumeAreaGradient" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor={theme === 'dark' ? '#525252' : '#334155'} stopOpacity={0.15}/>
  <stop offset="100%" stopColor={theme === 'dark' ? '#525252' : '#334155'} stopOpacity={0.02}/>
</linearGradient>
```

### Line/Area Strokes
```javascript
// Primary line stroke
stroke={theme === 'dark' ? '#a3a3a3' : '#475569'}  // neutral-400 vs slate-600

// Active dot fill (background)
fill={theme === 'dark' ? '#171717' : '#ffffff'}    // neutral-900 vs white
```

## Component Examples

### Card Container
```tsx
<div className={cn(
  "group relative overflow-hidden rounded-xl p-4",
  "bg-white dark:bg-neutral-900",
  "border border-slate-200 dark:border-neutral-800",
  "transition-all duration-200",
  "hover:border-slate-300 dark:hover:border-neutral-700"
)}>
```

### Section Header
```tsx
<div className="border-b border-slate-200 dark:border-neutral-800">
  <h3 className="text-sm font-semibold text-slate-800 dark:text-neutral-100">
    Title
  </h3>
  <p className="text-xs text-slate-500 dark:text-neutral-400">
    Subtitle
  </p>
</div>
```

### Button/Toggle Control
```tsx
<div className="flex items-center gap-1 p-1 bg-slate-50 dark:bg-neutral-800/50 rounded-lg border border-slate-200/60 dark:border-neutral-700/40">
  <button
    className={cn(
      "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
      isActive
        ? "bg-white dark:bg-neutral-700 text-slate-900 dark:text-white shadow-sm"
        : "text-slate-500 dark:text-neutral-400 hover:text-slate-700 dark:hover:text-neutral-300"
    )}
  >
    Button Text
  </button>
</div>
```

### Tooltip
```tsx
<div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-slate-200 dark:border-neutral-700 rounded-xl p-4 shadow-xl">
  <p className="text-slate-800 dark:text-neutral-100 font-semibold">{title}</p>
  <span className="text-slate-600 dark:text-neutral-400">{label}</span>
</div>
```

### Skeleton Loading
```tsx
<div className="p-4 rounded-lg bg-white dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800">
  <div className="h-4 bg-slate-200 dark:bg-neutral-700 rounded animate-pulse w-3/4" />
  <div className="h-3 bg-slate-100 dark:bg-neutral-800 rounded animate-pulse w-full" />
</div>
```

### Feed Item
```tsx
<div className={cn(
  "group p-4 rounded-lg",
  "bg-white dark:bg-neutral-900/50",
  "border border-slate-200 dark:border-neutral-800",
  "transition-colors duration-150",
  "hover:border-slate-300 dark:hover:border-neutral-700"
)}>
  <h4 className="text-sm text-slate-800 dark:text-neutral-100">{title}</h4>
  <p className="text-xs text-slate-500 dark:text-neutral-400">{content}</p>
  <span className="text-slate-300 dark:text-neutral-600">·</span>
</div>
```

## Monotone Design Principle

**IMPORTANT: Keep UI elements monotone for a professional appearance.**

Do NOT use colorful palettes (blue, purple, pink, amber, emerald, cyan, etc.) for:
- Card backgrounds
- Icon backgrounds
- Borders
- Badges or tags (unless they have semantic meaning)

Instead, use the slate/neutral grayscale palette consistently:

### Correct - Monotone Card
```tsx
<div className={cn(
  "group cursor-pointer rounded-xl p-4",
  "bg-white dark:bg-neutral-900",
  "border border-slate-200 dark:border-neutral-800",
  "transition-all duration-200",
  "hover:border-slate-300 dark:hover:border-neutral-700",
  "hover:shadow-sm"
)}>
  <div className="p-2 rounded-lg bg-slate-100 dark:bg-neutral-800">
    <Icon className="w-5 h-5 text-slate-600 dark:text-neutral-400" />
  </div>
</div>
```

### Incorrect - Colorful Card (Don't do this)
```tsx
// ❌ AVOID: Using color palettes for UI chrome
<div className="bg-blue-50 dark:bg-blue-950/30 border-blue-200">
  <div className="bg-purple-100 text-purple-600">
    <Icon />
  </div>
</div>
```

### When Colors ARE Appropriate

Colors should only be used for **semantic meaning**:

1. **Sentiment indicators**: positive (emerald), negative (rose)
2. **Status badges**: success (green), warning (amber), error (red)
3. **Brand elements**: Primary brand color in specific contexts
4. **Data visualization**: Charts with multiple series that need differentiation

## Semantic Colors (Sentiment)

For semantic colors like sentiment indicators, continue using the standard Tailwind color palettes:

- **Positive**: `emerald` - `text-emerald-600 dark:text-emerald-400`
- **Negative**: `rose` - `text-rose-600 dark:text-rose-400`
- **Neutral**: Use `neutral` for dark mode - `text-slate-500 dark:text-neutral-400`

## Tailwind Neutral Palette Reference

| Class | Hex Value | Usage |
|-------|-----------|-------|
| `neutral-100` | `#f5f5f5` | Lightest background |
| `neutral-200` | `#e5e5e5` | Light borders |
| `neutral-300` | `#d4d4d4` | Hover borders |
| `neutral-400` | `#a3a3a3` | Secondary text |
| `neutral-500` | `#737373` | Muted text/labels |
| `neutral-600` | `#525252` | Separator dots |
| `neutral-700` | `#404040` | Grid lines |
| `neutral-800` | `#262626` | Borders, backgrounds |
| `neutral-900` | `#171717` | Primary dark background |

## Files Updated with This Pattern

- `src/components/dashboard/components/watchlist-view.tsx` - Full implementation of neutral dark mode

## Summary

1. **Light mode**: Use `slate` palette (has subtle blue undertones, looks professional)
2. **Dark mode**: Use `neutral` palette (true grays, no color bias, clean appearance)
3. **Charts**: Use hex values from the neutral palette for dark mode
4. **Semantic colors**: Keep using `emerald`, `rose`, etc. for sentiment/status indicators ONLY
5. **Monotone UI**: Keep cards, icons, borders, and badges monotone (slate/neutral) - avoid colorful palettes for UI chrome
