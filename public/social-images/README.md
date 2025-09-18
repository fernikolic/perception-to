# Social Graph Images

This directory contains custom social graph images for different landing pages and features.

## Directory Structure

```
public/social-images/
├── pages/          # Page-specific social images
├── features/       # Feature-specific social images
├── categories/     # Category-specific social images
└── README.md       # This file
```

## Image Requirements

- **Size**: 1200x630 pixels (optimal for all social platforms)
- **Format**: PNG or JPG
- **File size**: < 1MB for fast loading
- **Naming**: Use kebab-case matching your page routes

## Examples

### Page-specific images:
- `pages/bitcoin-fear-greed-index.png` - For `/bitcoin-fear-greed-index` page
- `pages/api-documentation.png` - For `/api` page
- `pages/pricing.png` - For `/pricing` page

### Feature-specific images:
- `features/sentiment-analysis.png` - For sentiment-related pages
- `features/market-data.png` - For market data pages
- `features/api-tools.png` - For API/developer pages

### Category images:
- `categories/investor.png` - For investor-focused content
- `categories/journalist.png` - For journalist-focused content
- `categories/researcher.png` - For researcher-focused content

## Usage

Images in this directory are automatically detected by the social image system. Simply:

1. Add your image to the appropriate subdirectory
2. Name it to match your page route (kebab-case)
3. The system will automatically use it for social sharing

## Testing

Test your social images using:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)