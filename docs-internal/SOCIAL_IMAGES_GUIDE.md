# Custom Social Graph Images System

## Overview

You now have a complete system for managing custom social graph images for different landing pages. The system automatically detects images in organized folders and uses them for social sharing.

## Quick Start

### 1. Add Your Images

Place social images in the organized directory structure:

```
public/social-images/
├── pages/          # Page-specific images
├── features/       # Feature-specific images
├── categories/     # Category-specific images
└── README.md
```

### 2. Naming Convention

- **File format**: PNG or JPG
- **Size**: 1200x630 pixels (optimal for all platforms)
- **Naming**: Use kebab-case matching your page routes

**Examples:**
- For `/pricing` page → `pages/pricing.png`
- For `/bitcoin-fear-greed-index` → `pages/bitcoin-fear-greed-index.png`
- For `/api/documentation` → `pages/api-documentation.png`

### 3. Generate Configuration

Run the script to scan for new images:

```bash
npm run social:generate
```

This automatically runs before each build (`npm run build`).

## Directory Usage

### `pages/` - Page-specific Images
Use for specific landing pages:
- `pricing.png` - Pricing page
- `about.png` - About page
- `methodology.png` - Methodology page
- `api.png` - API documentation

### `features/` - Feature-specific Images
Use for feature categories:
- `sentiment-analysis.png` - For sentiment-related pages
- `market-data.png` - For market data pages
- `fear-greed-index.png` - For fear & greed features

### `categories/` - User Category Images
Use for user-type specific content:
- `investor.png` - For investor-focused pages
- `journalist.png` - For journalist-focused pages
- `researcher.png` - For researcher-focused pages

## How It Works

1. **Detection**: The script scans `public/social-images/` for PNG/JPG files
2. **Configuration**: Generates a TypeScript config mapping paths to images
3. **Integration**: Your existing SEO components automatically use custom images
4. **Fallback**: Falls back to default Perception logo if no custom image exists

## Example Workflow

### Adding a Custom Image for Pricing Page

1. **Create the image** (1200x630 pixels):
   ```
   pricing-social-graph.png
   ```

2. **Save in the right location**:
   ```
   public/social-images/pages/pricing.png
   ```

3. **Generate the config**:
   ```bash
   npm run social:generate
   ```

4. **Verify it's detected**:
   ```
   ✅ Generated configuration at src/config/social-images-generated.ts
   📋 Available custom social images:
     /pricing → pages/pricing
   ```

5. **Test on social platforms**:
   - [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## Generated Files

The system creates:
- `src/config/social-images-generated.ts` - Auto-generated mapping
- This file is recreated each time you run the script

## Integration with Existing Code

Your existing SEO components at `src/components/SEO.tsx` and social image validator at `src/utils/social-image-validator.ts` are enhanced to:

1. **Check for custom images first**
2. **Fall back to predefined configurations**
3. **Use default Perception logo as final fallback**

## Scripts Added

- `npm run social:generate` - Scan and generate image configuration
- `prebuild` hook - Automatically runs before builds

## Testing Your Images

### Required Image Specs
- **Dimensions**: 1200x630 pixels
- **File size**: < 1MB recommended
- **Format**: PNG (preferred) or JPG
- **Quality**: High resolution, readable text

### Social Platform Testing
1. **Facebook**: https://developers.facebook.com/tools/debug/
2. **Twitter**: https://cards-dev.twitter.com/validator
3. **LinkedIn**: https://www.linkedin.com/post-inspector/

### Debug Mode
Add to any page component for live preview:
```jsx
import { SocialGraphPreview } from '@/components/seo/social-graph-preview';

// Only show in development
{process.env.NODE_ENV === 'development' && <SocialGraphPreview />}
```

## Best Practices

### Image Design
- **Brand consistency**: Include Perception branding
- **High contrast**: Ensure text is readable
- **Mobile-friendly**: Consider how it looks on small screens
- **Clear messaging**: Convey page value proposition

### File Management
- **Organize by purpose**: Use appropriate subdirectories
- **Consistent naming**: Follow kebab-case convention
- **Optimize file sizes**: Compress images without quality loss
- **Version control**: Include images in git for team collaboration

### Performance
- **Build-time generation**: Configuration is created at build time
- **No runtime checks**: Fast social image lookups
- **Automatic fallbacks**: Always shows appropriate image

## Troubleshooting

### Image Not Showing
1. Check file exists in correct directory
2. Verify naming matches page route exactly
3. Run `npm run social:generate` to update config
4. Check browser console for 404 errors

### Wrong Image Dimensions
- Use 1200x630 pixels for optimal display
- Avoid extremely tall or wide images
- Test on multiple social platforms

### Caching Issues
- Use Facebook Debugger to force cache refresh
- Clear browser cache for local testing
- Check CDN cache if using one

### Build Errors
- Ensure script has proper permissions
- Check TypeScript compilation after config changes
- Verify all import paths are correct

---

*Your custom social graph image system is now ready! Add images to `public/social-images/` and run `npm run social:generate` to get started.*