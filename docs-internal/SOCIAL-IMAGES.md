# Social Image Management Guide

This guide explains how social sharing images (Open Graph/Twitter Cards) work on perception.to and how to manage them.

## Table of Contents

- [Overview](#overview)
- [Current Status](#current-status)
- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Creating Custom Images](#creating-custom-images)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Overview

Social images (also called Open Graph images or Twitter Cards) are the preview images that appear when someone shares a link from your site on social media platforms like Twitter, Facebook, LinkedIn, etc.

**Default behavior:** All pages use the Perception logo unless a custom image is specified.

**Custom images:** High-priority pages can have custom 1200x630 images that better represent their content.

## Current Status

Run this command anytime to see current status:

```bash
npm run social:audit
```

This will show:
- Which pages have custom images ✅
- Which priority pages are missing custom images ❌
- Recommendations for which pages would benefit most

## Quick Start

### 1. Check Current Status

```bash
npm run social:audit
```

### 2. Create a Custom Image

1. Design a 1200x630px image in your tool of choice (Figma, Canva, Photoshop, etc.)
2. Save it as PNG: `public/social-images/pages/[page-name].png`
3. Regenerate config: `npm run social:generate`
4. Build and deploy: `npm run build`

**Example:** For `/bitcoin-fear-greed-index`:
- Create: `public/social-images/pages/bitcoin-fear-greed-index.png`
- For homepage (`/`): `public/social-images/pages/home.png`

### 3. Test Your Image

Test on these validators before deploying:
- Twitter: https://cards-dev.twitter.com/validator
- Facebook: https://developers.facebook.com/tools/debug/
- LinkedIn: https://www.linkedin.com/post-inspector/

## How It Works

### System Architecture

```
1. Static HTML (index.html)
   └─> Sets default Open Graph tags for initial load

2. React Component (SocialMeta)
   └─> Updates meta tags dynamically as user navigates

3. Social Image Validator (social-image-validator.ts)
   └─> Checks for custom images and provides URLs

4. Generated Config (social-images-generated.ts)
   └─> Auto-generated list of available custom images
```

### Image Priority

When determining which image to show, the system uses this priority:

1. **Prop-passed image** - Manually specified image (highest priority)
2. **Custom social image** - From `/public/social-images/pages/`
3. **Page metadata image** - Default fallback from PAGE_METADATA
4. **Default image** - Perception logo (ultimate fallback)

### File Structure

```
public/
└── social-images/
    ├── README.md                    # Basic info
    ├── default.png                  # Default image (Perception logo)
    ├── pages/                       # Page-specific images
    │   ├── bitcoin-media-research.png
    │   └── bitcoin-social-media-sentiment-leaderboard.png
    ├── features/                    # Feature-specific (future use)
    └── categories/                  # Category-specific (future use)

src/
├── config/
│   ├── seo.config.ts               # SEO configuration
│   └── social-images-generated.ts  # Auto-generated (don't edit!)
├── utils/
│   └── social-image-validator.ts   # Image selection logic
└── components/
    └── seo/
        ├── social-meta.tsx          # Dynamic meta tag updater
        └── enhanced-meta.tsx        # Helmet-based meta component

scripts/
├── generate-social-images-config.js  # Scans and generates config
└── social-image-helper.cjs           # Audit tool (npm run social:audit)
```

## Creating Custom Images

### Image Specifications

- **Size:** 1200 x 630 pixels (required)
- **Format:** PNG (recommended) or JPG
- **File size:** < 1MB (recommended for fast loading)
- **Color mode:** RGB
- **Naming:** kebab-case matching the route path

### Design Guidelines

1. **Branding**
   - Include Perception logo
   - Use brand colors consistently
   - Maintain visual identity

2. **Content**
   - Add page title or key value proposition
   - Use large, readable text (min 40px font size)
   - Keep important content in "safe zone" (100px from edges)

3. **Visual Design**
   - High contrast for readability
   - Avoid small text or intricate details
   - Test at different sizes (preview will vary by platform)
   - Consider dark mode compatibility

4. **Safe Zones**
   - Some platforms crop differently
   - Keep critical content centered
   - Leave 100px margin on all sides for safety

### Priority Pages for Custom Images

#### Tier 1 (Create ASAP)
1. **Homepage** (`/`) - Brand identity, first impression
2. **Fear & Greed Index** (`/bitcoin-fear-greed-index`) - Major feature
3. **Market Sentiment** (`/bitcoin-market-sentiment`) - Major feature
4. **Pricing** (`/pricing`) - Conversion page

#### Tier 2 (Create Soon)
5. **API Reference** (`/api`) - Developer marketing
6. **About Us** (`/about`) - Brand credibility
7. **Use Cases** (`/use-cases`) - Marketing hub
8. **Journalist Landing** (`/journalist`) - Targeted audience
9. **Investor Landing** (`/investor`) - Targeted audience

#### Tier 3 (Nice to Have)
10. **Bitcoin Bad Takes** (`/bitcoin-bad-takes`) - Viral potential
11. **Slack Integration** (`/slack-integration`) - Feature marketing
12. **Crypto Conferences** (`/crypto-conferences`) - Feature marketing

### Tools & Resources

**Design Tools:**
- Figma (recommended) - https://figma.com
- Canva - https://canva.com/templates/social-media/
- Photoshop
- Sketch

**Templates:**
- Search for "Open Graph template 1200x630"
- Use Perception brand guidelines
- Reference existing social images for consistency

**Inspiration:**
- Look at competitors' social images
- Check popular Bitcoin/crypto sites
- Browse Dribbble/Behance for OG image designs

## Testing

### Before Deployment

1. **Local Testing**
   ```bash
   npm run social:generate  # Regenerate config
   npm run build           # Build site
   npm run preview         # Preview locally
   ```

2. **Verify URLs**
   - Check that images are accessible at: `https://perception.to/social-images/pages/[name].png`

### After Deployment

1. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Paste your page URL
   - Check image preview

2. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Paste your page URL
   - Click "Scrape Again" to refresh cache
   - Verify image appears correctly

3. **LinkedIn Post Inspector**
   - URL: https://www.linkedin.com/post-inspector/
   - Paste your page URL
   - Check preview

4. **Slack**
   - Paste URL in a Slack message (don't send)
   - Verify preview looks good

### Cache Issues

Social platforms cache images. If your image doesn't update:

1. **Facebook:** Use "Scrape Again" button in debugger
2. **Twitter:** May take 24-48 hours to update
3. **LinkedIn:** Use Post Inspector to refresh
4. Add cache-busting query param: `?v=2` to image URL

## Troubleshooting

### Image not appearing

**Check 1:** Does the file exist?
```bash
ls -la public/social-images/pages/[your-page].png
```

**Check 2:** Did you regenerate the config?
```bash
npm run social:generate
```

**Check 3:** Did you rebuild?
```bash
npm run build
```

**Check 4:** Check the generated config
```bash
cat src/config/social-images-generated.ts
```

**Check 5:** Is the URL accessible?
```bash
curl -I https://perception.to/social-images/pages/[your-page].png
```

### Wrong image showing

**Issue:** Default logo showing instead of custom image

**Solution:** The bug where PAGE_METADATA took priority over custom images has been fixed in `social-meta.tsx:178`. Make sure you have the latest code:

```typescript
// Correct priority:
const finalImage = image || socialImageConfig.url || pageMetadata.image;
```

**Solution 2:** Clear platform cache (see Cache Issues above)

### Image looks wrong on social media

**Issue:** Image is cropped or blurry

**Cause:** Wrong dimensions or file size

**Solution:**
- Ensure exact dimensions: 1200x630px
- Export at 2x resolution if possible
- Keep file size under 1MB
- Use PNG for best quality

### Image not updating after changes

**Cause:** Browser or CDN cache

**Solution:**
```bash
# 1. Clear local cache
npm run build

# 2. Deploy with cache busting
# Cloudflare should auto-purge, but you can manually purge if needed

# 3. Force refresh on social platforms (see Testing section)
```

## Scripts Reference

### `npm run social:audit`
Shows status of all custom social images, identifies missing images, and provides recommendations.

### `npm run social:generate`
Scans `public/social-images/` directory and generates the config file at `src/config/social-images-generated.ts`. Run this after adding/removing images.

### `npm run build`
Builds the production site. Automatically runs `social:generate` as part of prebuild.

## Best Practices

1. **Always use the audit tool** before creating new images
   ```bash
   npm run social:audit
   ```

2. **Focus on high-priority pages first** (Tier 1 > Tier 2 > Tier 3)

3. **Keep branding consistent** across all custom images

4. **Test on multiple platforms** before considering it complete

5. **Update images** when page content significantly changes

6. **Document custom images** - add notes in design files about which page they're for

7. **Keep source files** - Save Figma/Sketch files for future updates

8. **Monitor performance** - Keep images under 1MB

## FAQ

**Q: Should every page have a custom image?**
A: No. Only high-value marketing pages benefit from custom images. Legal pages, testing pages, and low-traffic pages should use the default.

**Q: Can I use the same custom image for multiple pages?**
A: Technically yes, but it's better to create unique images that represent each page's unique value.

**Q: What if I want to temporarily use a different image?**
A: You can pass an `image` prop to the `SocialMeta` component:
```tsx
<SocialMeta image="https://perception.to/special-image.png" />
```

**Q: How do I update an existing custom image?**
A:
1. Replace the PNG file in `public/social-images/pages/`
2. Run `npm run build`
3. Deploy
4. Clear cache on social platforms

**Q: What about dynamic routes like `/bitcoin-market-sentiment/2024/10`?**
A: These inherit the parent page's image. You can create logic to generate dynamic images, but start with the main pages first.

## Additional Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/webmasters/)
- [LinkedIn Share Best Practices](https://www.linkedin.com/help/linkedin/answer/46687)

---

**Need help?** Contact the development team or create an issue in the repo.
