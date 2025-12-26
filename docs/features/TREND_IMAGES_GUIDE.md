# Trend Card Image System 🖼️

This guide explains the new simplified image system that creates a **clear distinction** between trends with real API images and those with default images.

## What Changed

The system now works with a simple priority:

1. **Real API Images** - `image_url` or `BTC_Price` from non-social media outlets
2. **Default Image** - Consistent fallback image for trends without real images
3. **No more auto-generated patterns** - Creates clear visual distinction

## Clear Visual Distinction

### Trends WITH API Images ✅
- Show the actual image from `image_url` or `BTC_Price`
- Display with full image quality
- No visual indicators

### Trends WITHOUT API Images 📷
- Show the **same default image** for consistency  
- Include a subtle "Default" indicator
- Easy to identify which trends lack real images

## Priority System

```typescript
1. image_url          // 🎯 Custom image URL from API
2. BTC_Price          // 📊 Article images (non-social media)
3. DEFAULT_TREND_IMAGE // 🖼️ Consistent fallback
```

## Default Image

The system uses a Bitcoin-themed default image:
```typescript
export const DEFAULT_TREND_IMAGE = 'https://images.unsplash.com/photo-1690138871287-02b2fc3b87c2?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
```

You can change this to any URL you prefer in `src/lib/utils/trend-image-helpers.ts`.

## Visual Indicators

Trends using the default image show a subtle "Default" badge:
- **Compact cards**: Small gray dot in bottom-right corner
- **Full cards**: "Default" text overlay in top-right corner

## Usage Examples

### Method 1: API Integration
```typescript
// Your API returns trends with image URLs
const trendsFromAPI = [
  {
    title: "Bitcoin Hits ATH",
    image_url: "https://example.com/real-image.jpg", // ✅ Will show real image
    // ... other fields
  },
  {
    title: "Mining Update", 
    // No image_url provided                          // 📷 Will show default image
    // ... other fields
  }
];
```

### Method 2: Check Image Source
```typescript
import { getTrendImageUrl } from '@/lib/utils/trend-image-helpers';

const { imageUrl, isFromApi } = getTrendImageUrl(trend);

if (isFromApi) {
  console.log('✅ Real image from API');
} else {
  console.log('📷 Using default image');
}
```

### Method 3: Custom Default Image
```typescript
// Change the default in trend-image-helpers.ts
export const DEFAULT_TREND_IMAGE = 'your-custom-default-image-url.jpg';
```

## Alternative Default Images

Choose from pre-configured options:

```typescript
import { defaultImageOptions } from '@/lib/utils/trend-image-helpers';

// Change DEFAULT_TREND_IMAGE to any of these:
defaultImageOptions.bitcoin_coins      // Bitcoin coins (current default)
defaultImageOptions.bitcoin_abstract   // Abstract Bitcoin art
defaultImageOptions.crypto_charts      // Chart/trading theme
defaultImageOptions.blockchain_tech    // Technology theme
defaultImageOptions.financial_data     // Financial data theme
defaultImageOptions.placeholder_simple // Simple placeholder
```

## Migration from Old System

**Before**: Auto-generated SVG patterns made it hard to distinguish real vs fake images
**After**: Clear distinction with consistent default image

Existing code continues working - no breaking changes! 🎉

## Benefits

✅ **Clear visual distinction** between real and default images  
✅ **Consistent user experience** with same default image  
✅ **Easy identification** of trends lacking real images  
✅ **Simplified codebase** - no complex pattern generation  
✅ **Better performance** - no SVG generation overhead  

## Customization

Want different behavior? Modify `getTrendImageUrl()` in `src/lib/utils/trend-image-helpers.ts`:

```typescript
export function getTrendImageUrl(trend) {
  // Your custom logic here
  if (trend.image_url) return { imageUrl: trend.image_url, isFromApi: true };
  if (hasBtcPrice(trend)) return { imageUrl: getBtcPrice(trend), isFromApi: true };
  
  // Your custom default logic
  return { imageUrl: YOUR_DEFAULT_IMAGE, isFromApi: false };
}
```

## Files Modified

- `src/lib/utils/trend-image-helpers.ts` - Main image logic
- `src/components/dashboard/components/trend-story-card.tsx` - Updated card rendering
- `src/lib/api/trends.ts` - Added `image_url` field

## Quick Test

To see the distinction in action:

1. Find trends with `image_url` or `BTC_Price` → Should show real images
2. Find trends without → Should show the same default image with "Default" indicator
3. Clear visual difference! 🎯

---

*The system now provides crystal-clear distinction between real API images and default fallbacks!* 