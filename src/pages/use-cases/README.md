# Use Cases Landing Page

## Overview
The Use Cases landing page showcases how different audiences use Perception to track market narratives and sentiment. The design follows Apple-inspired principles with clean typography, plenty of white space, and minimal decoration.

## Design Principles
- **Clean & Minimalist**: Inspired by Jony Ive's design philosophy
- **Plenty of White Space**: Generous spacing between sections and elements
- **Perfect Typography**: Using the existing font system with extralight weights for headlines
- **No Gradients/Noise**: Subtle backgrounds only, no decorative elements
- **Visual Hierarchy**: Achieved through font size, layout, and contrast
- **Every Section Breathes**: Ample padding and margins throughout

## Page Structure

### 1. Hero Section
- **Headline**: "Track the narrative before it moves the market."
- **Subheadline**: Explains the value proposition for different audiences
- **CTA Buttons**: "Book a Demo" (primary) and "See Plans" (secondary)
- **Background**: Subtle grid pattern overlay

### 2. Use Case Grid
- **Layout**: 2-column grid on desktop, single column on mobile
- **Cards**: Each use case has:
  - Persona tag (e.g., "PR & Comms Leads")
  - Job-to-be-done headline
  - Supporting description
  - Feature tags
  - Icon with hover effects
- **Animations**: Staggered slide-up animations with delays

### 3. Testimonial Section
- **Quote**: Customer testimonial with attribution
- **Design**: Centered layout with subtle background
- **Avatar**: Placeholder icon with name and title

### 4. CTA Footer
- **Background**: Dark background with white text
- **Headline**: "Know the narrative. Shape the response."
- **Buttons**: Inverted color scheme for contrast

## Technical Implementation

### Components Used
- `Button` from `@/components/ui/button`
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle` from `@/components/ui/card`
- `Badge` from `@/components/ui/badge`
- Lucide React icons

### Styling
- Uses existing Tailwind CSS classes
- Leverages the design system's color tokens
- Responsive design with mobile-first approach
- Smooth transitions and hover effects

### Animations
- `animate-fade-in` for the badge
- `animate-slide-up` for content with staggered delays
- Hover effects on cards and buttons
- Smooth transitions throughout

## Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## Future Enhancements
- Add real customer testimonials with photos
- Include actual dashboard screenshots
- Add more specific use case examples
- Consider adding interactive elements
- A/B test different headlines and CTAs 