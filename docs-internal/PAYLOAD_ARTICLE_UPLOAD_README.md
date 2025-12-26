# Payload CMS Article Upload & Management Guide

This guide provides a complete walkthrough for uploading multiple articles from JSON files to Payload CMS, converting content formats, and managing publication status.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [File Structure](#file-structure)
- [JSON Article Format](#json-article-format)
- [Step-by-Step Process](#step-by-step-process)
- [Scripts Reference](#scripts-reference)
- [Troubleshooting](#troubleshooting)
- [API Reference](#api-reference)
- [Common Issues & Solutions](#common-issues--solutions)

## 🎯 Overview

This process allows you to:
1. **Bulk upload** articles from JSON files to Payload CMS
2. **Convert HTML content** to Payload's Slate JSON format for proper admin panel display
3. **Manage publication status** (draft → published)
4. **Handle content formatting** automatically (categories, tags, difficulty levels)

### What Gets Accomplished
- ✅ Upload 50+ articles in minutes
- ✅ Proper content formatting for rich text editor
- ✅ Automatic category and tag mapping
- ✅ Bulk publishing capabilities
- ✅ Full API accessibility

## 🔧 Prerequisites

### Required Setup
1. **Payload CMS server** running on `localhost:3000`
2. **MongoDB connection** established
3. **Admin user credentials** for authentication
4. **Node.js** with `fetch` support (Node 18+)
5. **JSON article files** in the correct format

### Payload CMS Collection Schema
Your `Learn` collection should have these fields:
```javascript
{
  title: 'text',
  slug: 'text',
  excerpt: 'textarea',
  content: 'richText',
  category: 'select', // Options: bitcoin-basics, market-analysis, technical-guides, policy-regulation, defi-stablecoins, data-research
  tags: 'array', // Array of objects with 'tag' property
  readTime: 'number',
  difficulty: 'select', // Options: beginner, intermediate, advanced
  featured: 'checkbox',
  published: 'checkbox',
  publishedAt: 'date',
  updatedAt: 'date'
}
```

## 📁 File Structure

```
your-project/
├── JSON-files-directory/           # Directory containing article JSON files
│   ├── article-1.json
│   ├── article-2.json
│   └── ...
├── upload-learn-drafts.cjs         # Main upload script
├── fix-content-format.cjs          # Content conversion script
├── publish-all-articles.cjs        # Publishing script
└── PAYLOAD_ARTICLE_UPLOAD_README.md # This guide
```

## 📝 JSON Article Format

Each JSON file should follow this structure:

```json
{
  "title": "Your Article Title",
  "slug": "your-article-slug",
  "excerpt": "Brief description of the article content",
  "content": "<p>HTML content with <strong>formatting</strong> and <h2>headers</h2></p>",
  "category": "Data & Research",
  "difficulty": "Advanced",
  "tags": [
    "bitcoinAnalysis",
    "marketTrends",
    "dataResearch"
  ],
  "readingTime": 5,
  "featured": false,
  "published": false
}
```

### Field Mappings

#### Categories (Label → Value)
- `"Bitcoin Basics"` → `"bitcoin-basics"`
- `"Market Analysis"` → `"market-analysis"`
- `"Technical Guides"` → `"technical-guides"`
- `"Policy & Regulation"` → `"policy-regulation"`
- `"DeFi & Stablecoins"` → `"defi-stablecoins"`
- `"Data & Research"` → `"data-research"`

#### Difficulty Levels (Label → Value)
- `"Beginner"` → `"beginner"`
- `"Intermediate"` → `"intermediate"`
- `"Advanced"` → `"advanced"`

#### Field Transformations
- `readingTime` → `readTime` (field name change)
- `tags: ["tag1", "tag2"]` → `tags: [{tag: "tag1"}, {tag: "tag2"}]` (format change)
- HTML content → Slate JSON (format change)

## 🚀 Step-by-Step Process

### Step 1: Prepare Your Environment

1. **Start Payload CMS server:**
   ```bash
   cd payload-v1
   npm run dev
   ```

2. **Verify server is running:**
   - Server should be accessible at `http://localhost:3000`
   - Admin panel at `http://localhost:3000/admin`
   - API at `http://localhost:3000/api/learn`

3. **Get your admin credentials:**
   - Email address for Payload admin
   - Password for admin account

### Step 2: Prepare Article Files

1. **Organize JSON files:**
   - Place all article JSON files in a single directory
   - Example: `/Users/username/Downloads/learn-drafts/`

2. **Verify JSON format:**
   - Each file should follow the format above
   - Check for valid JSON syntax
   - Ensure required fields are present

### Step 3: Configure Upload Script

1. **Update credentials in `upload-learn-drafts.cjs`:**
   ```javascript
   const EMAIL = 'your-email@example.com';
   const PASSWORD = 'your-password';
   ```

2. **Update file path:**
   ```javascript
   const FILES_DIRECTORY = '/full/path/to/your/json/files';
   ```

### Step 4: Run Upload Process

1. **Upload articles:**
   ```bash
   node upload-learn-drafts.cjs
   ```

2. **Expected output:**
   ```
   🔐 Authenticating with Payload CMS...
   ✅ Authentication successful
   📁 Found X JSON files to process
   🚀 Starting article upload process...
   ✅ Successfully uploaded: Article Title (ID: ...)
   📊 Upload Summary:
   ✅ Successful uploads: X
   ❌ Failed uploads: 0
   ```

### Step 5: Fix Content Format (If Needed)

If content appears as HTML strings in admin panel:

1. **Run content conversion:**
   ```bash
   node fix-content-format.cjs
   ```

2. **Expected output:**
   ```
   🔄 Starting content format conversion...
   🔄 Converting: Article Title
   ✅ Successfully updated: Article Title
   📊 Conversion Summary:
   ✅ Successfully converted: X
   ```

### Step 6: Publish Articles

1. **Publish all drafts:**
   ```bash
   node publish-all-articles.cjs
   ```

2. **Expected output:**
   ```
   📊 Article Status:
   📝 Draft articles: X
   ✅ Already published: 0
   🚀 Starting publishing process...
   ✅ Successfully published: Article Title
   🎉 All articles have been successfully published!
   ```

## 📜 Scripts Reference

### 1. upload-learn-drafts.cjs

**Purpose:** Upload JSON articles to Payload CMS as drafts

**Key Functions:**
- `authenticateWithPayload()` - Login to Payload CMS
- `transformArticleData()` - Convert JSON format to Payload schema
- `htmlToSlate()` - Convert HTML to Slate JSON format
- `uploadArticle()` - Upload single article via API

**Configuration:**
```javascript
const EMAIL = 'your-email@example.com';
const PASSWORD = 'your-password';
const FILES_DIRECTORY = '/path/to/json/files';
```

### 2. fix-content-format.cjs

**Purpose:** Convert HTML content to Slate JSON format for proper admin display

**Key Functions:**
- `htmlToSlate()` - Convert HTML to Slate nodes
- `parseInlineElements()` - Handle bold, italic, links
- `extractListItems()` - Process lists and list items
- `updateArticle()` - Update existing articles

**When to Use:**
- Content appears as HTML strings in admin panel
- Rich text editor shows raw HTML instead of formatted content
- After initial upload with HTML content

### 3. publish-all-articles.cjs

**Purpose:** Publish all draft articles to make them live

**Key Functions:**
- `getAllArticles()` - Fetch all articles from API
- `publishArticle()` - Set published: true for single article
- Filter and process only unpublished articles

**Result:**
- Articles become accessible via public API
- `published: true` and `publishedAt` timestamp set

## 🔧 Troubleshooting

### Authentication Issues

**Problem:** `AuthenticationError: The email or password provided is incorrect`

**Solutions:**
1. Verify email/password in Payload admin panel
2. Check credentials in script files
3. Ensure Payload server is running

### Upload Failures

**Problem:** Articles fail to upload with schema errors

**Common Issues:**
- Category values not matching schema options
- Invalid difficulty levels
- Missing required fields
- Incorrect tag format

**Solutions:**
1. Check field mappings in `transformArticleData()`
2. Verify JSON file format
3. Add validation for required fields

### Content Display Issues

**Problem:** Content appears as HTML strings in admin panel

**Solution:** Run `fix-content-format.cjs` to convert to Slate JSON

### File Path Issues

**Problem:** `ENOENT: no such file or directory`

**Solutions:**
1. Use absolute file paths
2. Check directory exists and contains JSON files
3. Verify file permissions

## 📡 API Reference

### Authentication
```javascript
POST /api/users/login
{
  "email": "user@example.com",
  "password": "password"
}
```

### Get Articles
```javascript
GET /api/learn
GET /api/learn?published=true
GET /api/learn?limit=100
GET /api/learn?category=data-research
```

### Upload Article
```javascript
POST /api/learn
Authorization: JWT <token>
{
  "title": "Article Title",
  "slug": "article-slug",
  "content": [...], // Slate JSON
  // ... other fields
}
```

### Update Article
```javascript
PATCH /api/learn/{id}
Authorization: JWT <token>
{
  "published": true,
  "publishedAt": "2025-01-01T00:00:00.000Z"
}
```

## ⚠️ Common Issues & Solutions

### 1. Slate Content Format

**Issue:** Content stored as HTML strings instead of Slate JSON

**Symptoms:**
- Admin panel shows raw HTML
- Rich text editor doesn't work properly

**Solution:**
- Run `fix-content-format.cjs` after upload
- Update `upload-learn-drafts.cjs` to use `htmlToSlate()` function

### 2. Category Mapping

**Issue:** Invalid category values causing upload failures

**Error:** `"Cannot create property 'id' on string 'categoryName'"`

**Solution:**
- Ensure categories map to valid schema values
- Update `categoryMap` in `transformArticleData()`

### 3. Tag Format

**Issue:** Tags uploaded as strings instead of objects

**Error:** Tag field expects `[{tag: "value"}]` format

**Solution:**
- Transform tags: `data.tags.map(tag => ({ tag }))`

### 4. Large File Batches

**Issue:** Timeout or memory issues with many files

**Solutions:**
- Process files in smaller batches
- Add delay between uploads
- Increase Node.js memory limit: `node --max-old-space-size=4096`

## 🎯 Best Practices

### Before Upload
1. **Validate JSON files** for syntax errors
2. **Check required fields** are present
3. **Verify file paths** are correct
4. **Test with small batch** first

### During Upload
1. **Monitor console output** for errors
2. **Don't interrupt** the process
3. **Keep Payload server running**

### After Upload
1. **Verify content** in admin panel
2. **Run content fix** if needed
3. **Test API endpoints**
4. **Publish when ready**

## 📊 Expected Performance

- **Upload Speed:** ~1-2 articles per second
- **Content Conversion:** ~59 articles in ~30 seconds
- **Publishing:** ~59 articles in ~45 seconds
- **Total Time:** 50+ articles in under 5 minutes

## 🔄 For Next Batch

To upload a new batch of articles:

1. **Update file directory** in `upload-learn-drafts.cjs`
2. **Place new JSON files** in designated directory
3. **Run upload script:** `node upload-learn-drafts.cjs`
4. **Fix content format:** `node fix-content-format.cjs` (if needed)
5. **Publish articles:** `node publish-all-articles.cjs`

That's it! The entire process is now documented and ready for reuse. 🚀 