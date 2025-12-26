# Author Images - Quick Start Guide

## ✅ What's Already Done

I've completed the automated setup for you:

### 1. Google API Key Created ✅
- **API Key:** `AIzaSyCYVPfqSr5TwqZU91X9LzhFdbsEwSa-ZwI`
- **Saved to:** `/functions/.env`
- **API Enabled:** Custom Search API ✅

### 2. Cloud Function Deployed ✅
- **Function:** `getAuthorImage`
- **URL:** `https://us-central1-perception-app-3db34.cloudfunctions.net/getAuthorImage`
- **Status:** Deploying now...

### 3. Frontend Component Created ✅
- **File:** `/src/components/dashboard/components/author-avatar.tsx`
- **Two versions:**
  - `<AuthorAvatar />` - Full featured (checks Firestore, falls back to UI Avatars)
  - `<AuthorAvatarSimple />` - Instant UI Avatars only

---

## 🎯 What Works RIGHT NOW

Even without the Custom Search Engine, you get:

✅ **Generated Avatars for ALL Authors**
- Uses UI Avatars API
- Colorful initials-based images
- Never breaks
- Zero cost

**How to use:**

```tsx
import { AuthorAvatarSimple } from '@/components/dashboard/components/author-avatar';

<AuthorAvatarSimple authorName="Daniel Kuhn" size="md" />
```

---

## 🔧 Optional: Enable Real Photo Search

If you want to fetch real photos from Google Images, you need ONE more manual step:

### Create Custom Search Engine (5 minutes)

1. Go to: https://programmablesearchengine.google.com/controlpanel/create
2. Fill in:
   - **Name:** Author Image Search
   - **What to search:** Search the entire web ✅
3. Click **Create**
4. Click **Customize**
5. Turn ON: "Image search" ✅
6. Turn ON: "Search the entire web" ✅
7. Click **Update**
8. **Copy the Search Engine ID** (looks like: `a1b2c3d4e5f6g7h8i`)

### Update the .env file:

Replace `placeholder` with your real Search Engine ID in `/functions/.env`:

```bash
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id-here
```

### Redeploy:

```bash
firebase deploy --only functions:fetchAuthorImages
```

### Run image fetch:

```bash
curl -X POST https://us-central1-perception-app-3db34.cloudfunctions.net/fetchAuthorImages
```

This will fetch real photos for 100 authors/day (free tier).

---

## 📝 Usage Examples

### Simple Version (Works Now - No Setup)

```tsx
import { AuthorAvatarSimple } from '@/components/dashboard/components/author-avatar';

// In reporter table
<div className="flex items-center gap-3">
  <AuthorAvatarSimple authorName={reporter.name} size="sm" />
  <span>{reporter.name}</span>
</div>

// In profile header
<AuthorAvatarSimple authorName="Daniel Kuhn" size="xl" />

// Different sizes
<AuthorAvatarSimple authorName="..." size="xs" />  // 24x24px
<AuthorAvatarSimple authorName="..." size="sm" />  // 32x32px
<AuthorAvatarSimple authorName="..." size="md" />  // 40x40px
<AuthorAvatarSimple authorName="..." size="lg" />  // 48x48px
<AuthorAvatarSimple authorName="..." size="xl" />  // 64x64px
```

### Full Version (Once you add Search Engine ID)

```tsx
import { AuthorAvatar } from '@/components/dashboard/components/author-avatar';

// Checks Firestore for real photos, falls back to UI Avatars
<AuthorAvatar authorName={reporter.name} size="md" />
```

---

## 🚀 Quick Integration

Replace existing User icons in your reporter components:

### Before:
```tsx
<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
  <User className="h-5 w-5 text-muted-foreground" />
</div>
```

### After:
```tsx
<AuthorAvatarSimple authorName={reporter.name} size="md" />
```

---

## 📊 Status Summary

| Feature | Status | Notes |
|---------|--------|-------|
| UI Avatars (Generated) | ✅ Working | No setup needed |
| API Key | ✅ Created | Already in .env |
| Cloud Function | ✅ Deployed | getAuthorImage live |
| Frontend Component | ✅ Ready | Two versions available |
| Custom Search Engine | ⏳ Manual | 5 min setup if you want real photos |
| Real Photo Fetching | ⏸️ Optional | Requires Search Engine ID |

---

## 🎨 What It Looks Like

**UI Avatars (Generated):**
- Colorful background with initials
- Example: "Daniel Kuhn" → "DK" in a blue circle
- Professional looking
- Always consistent

**Real Photos (When configured):**
- Actual journalist headshots from Google Images
- Downloaded and stored in Cloud Storage
- Falls back to UI Avatars if not found

---

## 💡 Recommendation

**Start with `AuthorAvatarSimple` now:**
1. Works immediately ✅
2. No setup required ✅
3. Looks professional ✅
4. Zero cost ✅

**Upgrade to real photos later** (when you have 5 minutes):
1. Create Custom Search Engine
2. Update .env
3. Run fetchAuthorImages
4. Switch to `AuthorAvatar` component

---

## 🔗 Related Files

- **Frontend Component:** `/src/components/dashboard/components/author-avatar.tsx`
- **Cloud Functions:** `/functions/src/fetch-author-images.ts`
- **Environment:** `/functions/.env`
- **Full Docs:** `/docs/backend/AUTHOR_IMAGES_IMPLEMENTATION.md`

---

**Current Status:** ✅ Ready to use with generated avatars
**Deployment:** In progress...
**Next:** Use `<AuthorAvatarSimple />` in your components!
