# Perception Design System - Complete Developer Specification

> **AI Developer Reference Guide**
> This document provides complete, copy-paste ready specifications for implementing any landing page or component following the Perception design system.

## Table of Contents
1. [Design Tokens](#1-design-tokens)
2. [Typography System](#2-typography-system)
3. [Color Palette](#3-color-palette)
4. [Spacing & Layout](#4-spacing--layout)
5. [Components](#5-components)
6. [Animations & Transitions](#6-animations--transitions)
7. [Responsive Breakpoints](#7-responsive-breakpoints)
8. [ASCII Art Specifications](#8-ascii-art-specifications)
9. [Page Templates](#9-page-templates)

---

## 1. Design Tokens

### CSS Custom Properties (Root Variables)

```css
:root {
  /* Colors - HSL Format */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 1rem;
}
```

### Tailwind Config Extensions

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary
        'perception-black': '#000000',
        'perception-white': '#FFFFFF',

        // Backgrounds
        'perception-cream': '#F0EEE6',      // rgb(240, 238, 230)
        'perception-cream-light': '#F5F3EF',

        // Accent Colors
        'perception-orange': '#FB923C',     // rgb(251, 146, 60)
        'perception-orange-dark': '#F97316', // rgb(249, 115, 22)

        // Grays
        'perception-gray-50': '#F4F4F5',    // rgb(244, 244, 245)
        'perception-gray-100': '#E4E4E7',   // rgb(228, 228, 231)
        'perception-gray-400': '#9CA3AF',   // rgb(156, 163, 175)
        'perception-gray-700': '#374151',   // rgb(55, 65, 81)
        'perception-gray-800': '#1F2937',   // rgb(31, 41, 55)
        'perception-gray-900': '#18181B',   // rgb(24, 24, 27)

        // Text Colors
        'perception-text-primary': '#09090B',       // rgb(9, 9, 11)
        'perception-text-muted': 'rgba(0,0,0,0.7)', // 70% black
        'perception-text-light': 'rgba(255,255,255,0.6)', // 60% white
      },
      borderRadius: {
        'perception-sm': '12px',
        'perception-md': '14px',
        'perception-lg': '16px',
        'perception-full': '9999px',
      },
      boxShadow: {
        'perception-sm': 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px',
        'perception-md': 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px',
        'perception-lg': 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
      },
      fontFamily: {
        'perception': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

---

## 2. Typography System

### Font Family

```css
font-family: Inter, system-ui, sans-serif;
```

### Type Scale Reference

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| display-1 | 60px | 500 | 60px | -1.2px | Section headings (dark sections) |
| display-2 | 48px | 500 | 48px | -0.96px | Hero H1 |
| heading-1 | 48px | 600 | 48px | -0.96px | Pricing numbers |
| heading-2 | 36px | 500 | 40px | -0.72px | Card titles |
| heading-3 | 24px | 500 | 32px | -0.48px | Subsection titles |
| body-large | 20px | 600 | 28px | -0.2px | Hero subheadlines |
| body | 18px | 700 | 28px | -0.4px | Emphasized body text |
| body-default | 16px | 400 | 24px | normal | Regular body text |
| body-small | 14px | 500 | 18.9px | 0.14px | Buttons, nav, captions |
| caption | 12px | 500 | 16px | normal | Badges, small labels |
| micro | 10px | 500 | 14px | normal | "Coming Soon" badges |

### CSS Implementation

```css
/* Display 1 - Section Headings */
.text-display-1 {
  font-family: Inter, system-ui, sans-serif;
  font-size: 60px;
  font-weight: 500;
  line-height: 60px;
  letter-spacing: -1.2px;
}

/* Display 2 - Hero H1 */
.text-display-2 {
  font-family: Inter, system-ui, sans-serif;
  font-size: 48px;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: -0.96px;
}

/* Body Large */
.text-body-large {
  font-family: Inter, system-ui, sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.2px;
}

/* Body Default */
.text-body {
  font-family: Inter, system-ui, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: normal;
}

/* Body Small (Buttons/Nav) */
.text-body-small {
  font-family: Inter, system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 18.9px;
  letter-spacing: 0.14px;
}
```

### Text Color Classes

```css
/* Light backgrounds */
.text-primary { color: rgb(0, 0, 0); }
.text-primary-muted { color: rgba(0, 0, 0, 0.85); }
.text-secondary { color: rgba(0, 0, 0, 0.7); }
.text-tertiary { color: rgba(0, 0, 0, 0.6); }
.text-disabled { color: rgba(0, 0, 0, 0.5); }

/* Dark backgrounds */
.text-on-dark { color: rgb(255, 255, 255); }
.text-on-dark-muted { color: rgba(255, 255, 255, 0.8); }
.text-on-dark-secondary { color: rgba(255, 255, 255, 0.7); }
.text-on-dark-tertiary { color: rgba(255, 255, 255, 0.6); }
.text-on-dark-disabled { color: rgba(255, 255, 255, 0.3); }

/* Accent */
.text-accent { color: rgb(249, 115, 22); } /* Orange for highlights */
```

---

## 3. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Black | `#000000` | rgb(0, 0, 0) | Primary buttons, headings, dark sections |
| White | `#FFFFFF` | rgb(255, 255, 255) | Text on dark, button text, backgrounds |

### Background Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Cream | `#F0EEE6` | rgb(240, 238, 230) | Primary page background |
| Cream Light | `#F5F3EF` | rgb(245, 243, 239) | Alternative light background |
| White 95% | - | rgba(255, 255, 255, 0.95) | Card backgrounds on dark |
| White 80% | - | rgba(255, 255, 255, 0.8) | Secondary cards, badges |
| White 30% | - | rgba(255, 255, 255, 0.3) | Nav background (glass) |
| White 20% | - | rgba(255, 255, 255, 0.2) | Borders on dark |
| White 10% | - | rgba(255, 255, 255, 0.1) | Subtle dark mode cards |
| White 8% | - | rgba(255, 255, 255, 0.08) | Dark section badges |

### Accent Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Orange Primary | `#FB923C` | rgb(251, 146, 60) | Accent highlights, dots |
| Orange Dark | `#F97316` | rgb(249, 115, 22) | Text accents, key numbers |

### Gray Scale

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Gray 50 | `#F4F4F5` | rgb(244, 244, 245) | Toggle active state |
| Gray 100 | `#E4E4E7` | rgb(228, 228, 231) | Borders, dividers |
| Gray 400 | `#9CA3AF` | rgb(156, 163, 175) | Muted text, "Most Popular" badge |
| Gray 700 | `#374151` | rgb(55, 65, 81) | Card borders (dark) |
| Gray 800 | `#1F2937` | rgb(31, 41, 55) | Dark card backgrounds |
| Gray 900 | `#18181B` | rgb(24, 24, 27) | Near-black text |

---

## 4. Spacing & Layout

### Spacing Scale

```css
/* Base spacing unit: 4px */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
--space-48: 192px;
```

### Container Widths

```css
/* Max widths */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* Content max-width */
--content-max-width: 1024px;

/* Card widths */
--pricing-card-width: 313px;
--dropdown-width: 500px;
--dropdown-max-width: 700px;
```

### Section Padding

```css
/* Hero section */
.section-hero {
  padding: 128px 0; /* Horizontal padding handled by container */
}

/* Standard section */
.section-standard {
  padding: 192px 0;
}

/* Compact section */
.section-compact {
  padding: 80px 0;
}

/* Container padding */
.container {
  padding-left: 128px;
  padding-right: 128px;
}

/* Responsive container padding */
@media (max-width: 1024px) {
  .container {
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (max-width: 640px) {
  .container {
    padding-left: 24px;
    padding-right: 24px;
  }
}
```

### Grid System

```css
/* Feature cards grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

/* Pricing cards grid */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Logo grid */
.logo-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px 16px;
}

/* Footer grid */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
}
```

---

## 5. Components

### 5.1 Navigation Header

```css
/* Fixed header container */
.header {
  position: fixed;
  top: 0;
  z-index: 50;
  width: 100%;
  padding: 24px 128px 0;
  background-color: transparent;
}

/* Nav pill container */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  backdrop-filter: blur(24px) saturate(1.8);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
              rgba(0, 0, 0, 0.1) 0px 8px 10px -6px;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Nav link */
.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: rgb(9, 9, 11);
  padding: 8px 16px;
  border-radius: 14px;
  transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover {
  color: rgba(0, 0, 0, 0.7);
}
```

**Tailwind Classes:**

```html
<nav class="w-full rounded-full transition-all duration-500 border bg-background/40 backdrop-blur-2xl shadow-2xl border-white/20">
```

### 5.2 Dropdown Menu

```css
/* Dropdown container */
.dropdown-menu {
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
              rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  border: 1px solid rgb(228, 228, 231);
  min-width: 500px;
  max-width: 700px;
}

/* Dropdown item */
.dropdown-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 14px;
  transition: background-color 0.15s;
}

.dropdown-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Dropdown item title */
.dropdown-item-title {
  font-size: 16px;
  font-weight: 500;
  color: rgb(9, 9, 11);
}

/* Dropdown item description */
.dropdown-item-description {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
}
```

### 5.3 Buttons

#### Primary Button (Black Filled)

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 500;
  padding: 8px 24px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px;
}

.btn-primary:hover {
  background-color: rgb(31, 41, 55);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 15px -3px;
}
```

**Tailwind Classes:**

```html
<button class="inline-flex items-center justify-center whitespace-nowrap py-2 bg-black text-white hover:bg-gray-900 transition-all shadow-md hover:shadow-lg rounded-full px-6 h-10 text-sm font-medium">
```

#### Secondary Button (Outlined)

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: rgb(0, 0, 0);
  font-size: 14px;
  font-weight: 500;
  padding: 8px 24px;
  border-radius: 9999px;
  border: 1px solid rgb(0, 0, 0);
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
```

#### Large CTA Button

```css
.btn-cta-large {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 600;
  padding: 24px 32px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
}

.btn-cta-large:hover {
  transform: scale(1.02);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 30px 60px -15px;
}
```

#### Pricing CTA Button (Full Width)

```css
.btn-pricing {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 600;
  padding: 16px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-pricing:hover {
  background-color: rgb(244, 244, 245);
}

/* Premium variant (outline) */
.btn-pricing-outline {
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
}
```

### 5.4 Badges

#### Category Badge (Hero)

```css
.badge-category {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.08);
  color: rgb(9, 9, 11);
  font-size: 16px;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 9999px;
}

/* Indicator dot */
.badge-category::before {
  content: '';
  width: 8px;
  height: 8px;
  background-color: rgb(251, 146, 60); /* Orange */
  border-radius: 50%;
}
```

#### "Coming Soon" Badge

```css
.badge-coming-soon {
  display: inline-flex;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 10px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 14px;
}

/* Light background variant */
.badge-coming-soon-light {
  background-color: rgb(244, 244, 245);
  color: rgb(156, 163, 175);
}
```

#### "Most Popular" Badge

```css
.badge-popular {
  display: inline-flex;
  background-color: rgb(156, 163, 175);
  color: rgb(0, 0, 0);
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 9999px;
}
```

#### "Save" Badge

```css
.badge-save {
  display: inline-flex;
  background-color: rgba(255, 255, 255, 0.2);
  color: rgb(255, 255, 255);
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 8px;
}
```

### 5.5 Cards

#### Feature Card (Dark)

```css
.card-feature {
  background-color: rgb(0, 0, 0);
  border-radius: 16px;
  padding: 0;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
}

.card-feature-image {
  width: 100%;
  height: 200px;
  background-color: rgb(31, 41, 55);
  /* ASCII art rendered here */
}

.card-feature-content {
  padding: 24px 32px;
}

.card-feature-title {
  font-size: 24px;
  font-weight: 500;
  color: rgb(255, 255, 255);
  margin-bottom: 16px;
}

/* Italic emphasis for brand terms */
.card-feature-title em {
  font-style: italic;
  color: rgb(255, 255, 255);
}

.card-feature-body {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  line-height: 24px;
}
```

#### Pricing Card

```css
.card-pricing {
  background-color: rgb(0, 0, 0);
  border-radius: 12px;
  padding: 32px;
  border: 1px solid rgb(55, 65, 81);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
              rgba(0, 0, 0, 0.1) 0px 8px 10px -6px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Highlighted card (Premium) */
.card-pricing-featured {
  border: 2px solid rgb(156, 163, 175);
}

.card-pricing-header {
  margin-bottom: 24px;
}

.card-pricing-name {
  font-size: 20px;
  font-weight: 600;
  color: rgb(255, 255, 255);
}

.card-pricing-price {
  font-size: 48px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  line-height: 48px;
}

.card-pricing-period {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
}

.card-pricing-features {
  flex: 1;
  margin-bottom: 24px;
}

.card-pricing-feature {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.card-pricing-feature-icon {
  width: 20px;
  height: 20px;
  color: rgb(156, 163, 175);
  flex-shrink: 0;
  margin-top: 2px;
}

.card-pricing-feature-text {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 20px;
}
```

#### Info Card (Beta Pricing)

```css
.card-info {
  background-color: rgb(0, 0, 0);
  border-radius: 16px;
  padding: 24px 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.card-info-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.08);
  padding: 8px 16px;
  border-radius: 9999px;
  margin-bottom: 16px;
}

.card-info-title {
  font-size: 24px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  margin-bottom: 8px;
}

.card-info-description {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
}
```

### 5.6 Toggle/Tabs (Pricing)

```css
.toggle-container {
  display: inline-flex;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 4px;
}

.toggle-option {
  font-size: 18px;
  font-weight: 700;
  padding: 16px 32px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-option-active {
  background-color: rgb(244, 244, 245);
  color: rgb(24, 24, 27);
}

.toggle-option-inactive {
  background-color: transparent;
  color: rgb(255, 255, 255);
}
```

### 5.7 FAQ Accordion

```css
.accordion-container {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.accordion-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.accordion-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 500;
  color: rgb(0, 0, 0);
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
}

.accordion-trigger:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.accordion-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s;
}

.accordion-item[data-state="open"] .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  padding: 0 24px 16px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);
  line-height: 22px;
}
```

### 5.8 Footer

```css
.footer {
  background-color: rgb(0, 0, 0);
  padding: 80px 128px 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  margin-bottom: 60px;
}

.footer-column-title {
  font-size: 14px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  margin-bottom: 20px;
}

.footer-link {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 18.9px;
  margin-bottom: 12px;
  transition: color 0.15s;
}

.footer-link:hover {
  color: rgb(255, 255, 255);
}

.footer-copyright {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
}

.footer-social-icon {
  width: 24px;
  height: 24px;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.15s;
}

.footer-social-icon:hover {
  color: rgb(255, 255, 255);
}
```

### 5.9 Scroll-to-Top Button

```css
.scroll-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  background-color: rgb(255, 255, 255);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 40;
}

.scroll-to-top:hover {
  transform: translateY(-4px);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 20px 25px -5px;
}

.scroll-to-top-icon {
  width: 24px;
  height: 24px;
  color: rgb(0, 0, 0);
}
```

---

## 6. Animations & Transitions

### Transition Presets

```css
/* Quick interactions (buttons, links) */
.transition-quick {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Standard interactions (cards, menus) */
.transition-standard {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Slow/emphasis animations */
.transition-slow {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Color transitions only */
.transition-colors {
  transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
              background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Easing Functions

```css
/* Default easing */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);

/* Enter (elements appearing) */
--ease-in: cubic-bezier(0.4, 0, 1, 1);

/* Exit (elements disappearing) */
--ease-out: cubic-bezier(0, 0, 0.2, 1);
```

### Scroll-Triggered Text Animation

For the problem/solution section with word-by-word fade:

```css
/* Container */
.scroll-text-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Individual word */
.scroll-word {
  display: inline;
  opacity: 0.3;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-word.active {
  opacity: 1;
}
```

### Hover Effects

```css
/* Button lift effect */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 20px 25px -5px;
}

/* Card hover */
.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 25px 50px -12px;
}

/* Link underline */
.hover-underline {
  position: relative;
}

.hover-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: currentColor;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-underline:hover::after {
  width: 100%;
}
```

---

## 7. Responsive Breakpoints

### Breakpoint Values

```css
/* Tailwind default breakpoints */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Common Responsive Patterns

```css
/* Container padding */
.container {
  padding-left: 24px;
  padding-right: 24px;
}

@media (min-width: 640px) {
  .container {
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 128px;
    padding-right: 128px;
  }
}

/* Typography scaling */
.heading-hero {
  font-size: 32px;
}

@media (min-width: 640px) {
  .heading-hero {
    font-size: 36px;
  }
}

@media (min-width: 768px) {
  .heading-hero {
    font-size: 48px;
  }
}

@media (min-width: 1024px) {
  .heading-hero {
    font-size: 60px;
  }
}

/* Grid columns */
.grid-features {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid-features {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Logo grid */
.grid-logos {
  grid-template-columns: repeat(3, 1fr);
}

@media (min-width: 640px) {
  .grid-logos {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-logos {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* Hero layout */
.hero-layout {
  flex-direction: column;
}

@media (min-width: 1024px) {
  .hero-layout {
    flex-direction: row;
  }
}
```

### Common Responsive Class Patterns (Tailwind)

```
/* Padding */
sm:px-16 lg:px-32 xl:px-40 2xl:px-48
sm:px-8 lg:px-12
sm:py-12 lg:py-16

/* Display */
md:flex md:hidden lg:block

/* Grid */
sm:grid-cols-3 lg:grid-cols-5

/* Typography */
sm:text-3xl md:text-4xl lg:text-5xl
```

---

## 8. ASCII Art Specifications

### Character Sets Used

```
~  (tilde)
0  (zero)
≋  (triple tilde)
⊱  (right arrow with hook)
◟  (arc)
○  (circle)
●  (filled circle)
│  (vertical line)
─  (horizontal line)
╭  (top-left corner)
╮  (top-right corner)
╰  (bottom-left corner)
╯  (bottom-right corner)
```

### Pattern Types

1. **Globe/World** - For global/international concepts
2. **Waves** - For data flow/streaming concepts
3. **Molecules** - For connection/network concepts
4. **Fingerprint** - For identity/unique concepts
5. **Abstract Grid** - For data/information concepts

### Implementation

ASCII art is rendered in a monospace font within a container with:
- `font-family: monospace`
- `white-space: pre`
- `line-height: 1.2`
- Background: `rgb(31, 41, 55)` (dark gray)
- Text color: `rgba(255, 255, 255, 0.3)` to `rgba(255, 255, 255, 0.8)`

---

## 9. Page Templates

### Hero Section Pattern

Every landing page follows this hero structure:

```
┌─────────────────────────────────────────────────┐
│                  [NAVBAR]                        │
├──────────────────────┬──────────────────────────┤
│                      │                          │
│    [ASCII ART]       │  [Category Badge]        │
│    (40-50% width)    │  [H1 Headline]           │
│                      │  [H2 Subheadline]        │
│                      │  [Body paragraph]        │
│                      │  [CTA Primary] [CTA Sec] │
│                      │                          │
├──────────────────────┴──────────────────────────┤
│              [LOGO STRIP - Optional]            │
└─────────────────────────────────────────────────┘
```

### Section Background Alternation

```
Section 1: Cream background (#F0EEE6)
Section 2: Black background (#000000)
Section 3: Cream background (#F0EEE6)
Section 4: Black background (#000000)
... and so on
```

### Content Hierarchy

1. **Category Label** (uppercase, small)
2. **Primary Heading** (large, bold)
3. **Subheading** (medium, semi-bold)
4. **Body Copy** (regular, with italic brand terms)
5. **CTAs** (primary + secondary)

---

## Brand Voice in Design

### Typography Reinforces:
- **Authority**: Large, bold headlines
- **Clarity**: Clean, readable body text
- **Expertise**: Technical terminology in *italics*
- **Urgency**: Orange accents on key metrics

### Visual Tone:
- Professional yet modern
- Data-driven and intelligent
- Clean but distinctive (ASCII art differentiator)
- Dark themes convey sophistication
- Light themes convey clarity and trust

---

## Quick Reference: Tailwind Classes

### Common Component Classes

```html
<!-- Primary Button -->
<button class="inline-flex items-center justify-center bg-black text-white hover:bg-gray-900 transition-all shadow-md hover:shadow-lg rounded-full px-6 h-10 text-sm font-medium">

<!-- Secondary Button -->
<button class="inline-flex items-center justify-center border border-black text-black hover:bg-black/5 transition-all rounded-full px-6 h-10 text-sm font-medium">

<!-- Badge with Dot -->
<span class="inline-flex items-center gap-2 bg-white/8 text-zinc-900 text-base font-semibold px-6 py-2.5 rounded-full">
  <span class="w-2 h-2 bg-orange-400 rounded-full"></span>
  Badge Text
</span>

<!-- Card (Dark) -->
<div class="bg-black rounded-2xl overflow-hidden shadow-2xl">
  <div class="h-48 bg-gray-800"></div>
  <div class="p-6">
    <h3 class="text-white text-2xl font-medium mb-4">Title</h3>
    <p class="text-white/70 text-base">Description</p>
  </div>
</div>

<!-- Section (Cream) -->
<section class="bg-[#F0EEE6] py-32 px-6 lg:px-32">

<!-- Section (Dark) -->
<section class="bg-black py-48 px-6 lg:px-32">
```

---

*This design system creates a cohesive, professional SaaS landing page experience that balances technical credibility with modern aesthetics.*
