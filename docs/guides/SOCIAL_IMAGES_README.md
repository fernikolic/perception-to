# 🚀 Auto-Generated Social Graph Images

## Overview
This implementation provides automatic Open Graph image generation for social media previews, similar to GitHub's dynamic social cards. When users share any page from your Perception app, it automatically generates a branded preview image with page-specific content.

## ✨ Features
- **Dynamic Image Generation**: Creates unique images for each page
- **Apple-Inspired Design**: Clean, sophisticated design with premium typography
- **Bitcoin-Themed Branding**: Custom orange gradient logo with Bitcoin-focused iconography
- **Page-Specific Icons**: Different emojis for different sections (₿, 🔬, 📈, etc.)
- **Multiple Themes**: Dark and light theme support
- **Social Platform Support**: Optimized for Twitter, Facebook, LinkedIn
- **Development Preview**: Inline SVG generation for testing
- **Testing Tools**: Built-in preview component with validation links

## 🛠️ Technical Implementation

### Components Created:
1. **SocialMeta Component** (`src/components/seo/social-meta.tsx`)
   - Automatically updates meta tags based on current route
   - Generates dynamic image URLs
   - Handles Open Graph and Twitter Card meta tags

2. **Cloudflare Worker** (`functions/api/og-image.js`)
   - Production image generation using `@vercel/og`
   - Bitcoin-themed design with gradients and branding
   - Dynamic content based on URL parameters

3. **Preview Component** (`src/components/social-image-preview.tsx`)
   - Testing interface for developers
   - Real-time preview generation
   - Social media platform mockups
   - Direct sharing links

4. **Inline SVG Generation** (built into preview component)
   - Lightweight SVG-based image generation for development
   - Matches production design
   - No additional server required

## 🎨 Design System

### Colors
- **Bitcoin Orange**: `#f97316`
- **Bitcoin Yellow**: `#facc15`
- **Dark Theme**: `#0a0a0a` background
- **Light Theme**: `#ffffff` background

### Page Icons
- Home: ₿
- Methodology: 🔬
- Journalists: 📰
- Investors: 📈
- Researchers: 🎓
- About: 🏢
- Pricing: 💰
- Docs: 📚
- API: ⚡
- Learn: 🎯

## 🚀 Usage

### Development Testing
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit the test page:
   ```
   http://localhost:5173/social-preview
   ```

3. Generate and test different combinations (uses inline SVG generation for development)

### Production
Images are automatically generated when pages are shared on social media. The system:
1. Detects the current page route
2. Uses predefined metadata for that page
3. Generates a unique image URL
4. Updates meta tags dynamically

### Custom Images
You can override the automatic generation by passing props to `SocialMeta`:

```tsx
<SocialMeta 
  title="Custom Title"
  description="Custom description"
  image="/custom-image.png"
  type="article"
/>
```

## 🧪 Testing

### Validation Tools
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Inspector](https://www.linkedin.com/post-inspector/)

### Test URLs
- Development: Use the `/social-preview` page for testing
- Production: `https://perception.to/api/og-image?title=Test&description=Description&path=/&theme=dark`

## 📱 Social Media Preview

The generated images appear as:
- **Twitter**: Large image card with title, description, and domain
- **Facebook**: Image preview with title, description, and branding
- **LinkedIn**: Professional card format with company branding
- **Discord**: Rich embed with image and metadata

## 🔧 Configuration

### Adding New Pages
Update the `PAGE_METADATA` object in `social-meta.tsx`:

```tsx
'/new-page': {
  title: 'New Page - Bitcoin Perception',
  description: 'Description for the new page',
  type: 'website'
}
```

Add corresponding icon in `PAGE_ICONS`:

```tsx
'/new-page': '🆕'
```

### Customizing Design
Modify the image generation in both:
- `functions/api/og-image.js` (production)
- `scripts/og-preview-server.js` (development)

## 📊 Performance
- Images are cached by social platforms
- Generation is optimized for speed
- CDN distribution via Cloudflare
- Lazy loading for preview component

## 🔍 SEO Benefits
- Improved click-through rates on social media
- Professional brand presentation
- Consistent visual identity
- Enhanced social media engagement

## 🎯 Next Steps
1. Test the implementation by visiting `/social-preview`
2. Validate with social media debugging tools
3. Deploy to production
4. Monitor social sharing metrics
5. A/B test different designs

## 🤝 Contributing
When adding new pages or features:
1. Update the metadata mappings
2. Add appropriate icons
3. Test with the preview component
4. Validate on social platforms
5. Update documentation

---

🎉 **Your Perception social sharing is now powered by dynamic, beautiful Apple-inspired images that represent your brand professionally across all social platforms!** 