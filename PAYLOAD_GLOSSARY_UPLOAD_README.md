# Payload CMS Glossary Upload & Management Guide

This guide provides a complete walkthrough for uploading multiple glossary items from JSON files to Payload CMS and managing their publication status.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [File Structure](#file-structure)
- [JSON Glossary Format](#json-glossary-format)
- [Step-by-Step Process](#step-by-step-process)
- [Scripts Reference](#scripts-reference)
- [Troubleshooting](#troubleshooting)
- [API Reference](#api-reference)
- [Common Issues & Solutions](#common-issues--solutions)

## 🎯 Overview

This process allows you to:
1. **Bulk upload** glossary items from JSON files to Payload CMS
2. **Manage publication status** (draft → published)
3. **Handle category mapping** automatically
4. **Simple format** - no complex content conversion needed

### What Gets Accomplished
- ✅ Upload 10+ glossary items in seconds
- ✅ Automatic category mapping
- ✅ Auto-generated slugs from titles
- ✅ Bulk publishing capabilities
- ✅ Full API accessibility

## 🔧 Prerequisites

### Required Setup
1. **Payload CMS server** running on `localhost:3000`
2. **MongoDB connection** established
3. **Admin user credentials** for authentication
4. **Node.js** with `fetch` support (Node 18+)
5. **JSON glossary files** in the correct format

### Payload CMS Collection Schema
Your `Glossary` collection should have these fields:
```javascript
{
  title: 'text',           // required
  slug: 'text',            // required, unique, auto-generated
  description: 'textarea', // required
  category: 'select',      // Options: bitcoin, stablecoins, regulation, macro
  published: 'checkbox',   // default: true
  updatedAt: 'date'        // auto-generated
}
```

## 📁 File Structure

```
your-project/
├── glossary-json-directory/         # Directory containing glossary JSON files
│   ├── glossary-item-1.json
│   ├── glossary-item-2.json
│   └── ...
├── upload-glossary-items.cjs        # Main upload script
├── publish-glossary-items.cjs       # Publishing script (optional)
└── PAYLOAD_GLOSSARY_UPLOAD_README.md # This guide
```

## 📝 JSON Glossary Format

Each JSON file should follow this simple structure:

```json
{
  "title": "Bitcoin",
  "slug": "bitcoin",
  "description": "A decentralized digital currency that operates without a central bank or single administrator, using peer-to-peer technology and cryptography.",
  "category": "Bitcoin",
  "published": true
}
```

### Required Fields
- **`title`**: The term being defined (required)
- **`description`**: Clear explanation of the term (required)

### Optional Fields
- **`slug`**: URL-friendly version (auto-generated from title if not provided)
- **`category`**: Classification (defaults to "Bitcoin" if not specified)
- **`published`**: Publication status (defaults to `true`)

### Field Mappings

#### Categories (Label → Value)
- `"Bitcoin"` → `"bitcoin"`
- `"Stablecoins"` → `"stablecoins"`
- `"Regulation"` → `"regulation"`
- `"Macro"` → `"macro"`

#### Auto-Generated Fields
- **Slug**: Auto-created from title if not provided
- **UpdatedAt**: Automatically set by Payload CMS

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
   - API at `http://localhost:3000/api/glossary`

3. **Get your admin credentials:**
   - Email address for Payload admin
   - Password for admin account

### Step 2: Prepare Glossary Files

1. **Organize JSON files:**
   - Place all glossary JSON files in a single directory
   - Example: `/Users/username/Downloads/glossary-items/`

2. **Verify JSON format:**
   - Each file should follow the format above
   - Check for valid JSON syntax
   - Ensure required fields (`title`, `description`) are present

### Step 3: Configure Upload Script

1. **Update credentials in `upload-glossary-items.cjs`:**
   ```javascript
   const EMAIL = 'your-email@example.com';
   const PASSWORD = 'your-password';
   ```

2. **Update file path:**
   ```javascript
   const FILES_DIRECTORY = '/full/path/to/your/glossary/json/files';
   ```

### Step 4: Run Upload Process

1. **Upload glossary items:**
   ```bash
   node upload-glossary-items.cjs
   ```

2. **Expected output:**
   ```
   📁 Found X JSON files to process
   🔐 Authenticating with Payload CMS...
   ✅ Authentication successful
   🚀 Starting glossary item upload process...
   ✅ Successfully uploaded: filename.json (ID: ...)
   📊 Upload Summary:
   ✅ Successful uploads: X
   ❌ Failed uploads: 0
   🎉 All glossary items uploaded successfully!
   ```

### Step 5: Publish Items (If Needed)

**Note:** Glossary items are published by default, but if you need to publish drafts:

1. **Publish all drafts:**
   ```bash
   node publish-glossary-items.cjs
   ```

2. **Expected output:**
   ```
   📊 Glossary Item Status:
   📝 Draft items: X
   ✅ Already published: Y
   🎉 All glossary items are already published!
   ```

## 📜 Scripts Reference

### 1. upload-glossary-items.cjs

**Purpose:** Upload JSON glossary items to Payload CMS

**Key Functions:**
- `authenticateWithPayload()` - Login to Payload CMS
- `transformGlossaryData()` - Convert JSON format to Payload schema
- `uploadGlossaryItem()` - Upload single glossary item via API

**Configuration:**
```javascript
const EMAIL = 'your-email@example.com';
const PASSWORD = 'your-password';
const FILES_DIRECTORY = '/path/to/glossary/json/files';
```

**Features:**
- Automatic slug generation from title
- Category mapping from labels to values
- Default value handling
- Error handling and logging

### 2. publish-glossary-items.cjs

**Purpose:** Publish all draft glossary items to make them live

**Key Functions:**
- `getAllGlossaryItems()` - Fetch all items from API
- `publishGlossaryItem()` - Set published: true for single item
- Filter and process only unpublished items

**When to Use:**
- Items uploaded as drafts (`published: false`)
- Batch publishing after review
- Usually not needed (items published by default)

## 🔧 Troubleshooting

### Authentication Issues

**Problem:** `AuthenticationError: The email or password provided is incorrect`

**Solutions:**
1. Verify email/password in Payload admin panel
2. Check credentials in script files
3. Ensure Payload server is running

### Upload Failures

**Problem:** Glossary items fail to upload with schema errors

**Common Issues:**
- Invalid category values
- Missing required fields (`title`, `description`)
- Duplicate slugs
- Invalid JSON format

**Solutions:**
1. Check field mappings in `transformGlossaryData()`
2. Verify JSON file format
3. Ensure unique titles/slugs
4. Validate required fields

### File Path Issues

**Problem:** `ENOENT: no such file or directory`

**Solutions:**
1. Use absolute file paths
2. Check directory exists and contains JSON files
3. Verify file permissions

### Duplicate Content

**Problem:** Attempting to upload items that already exist

**Solution:** 
- Payload will reject duplicates based on unique slug
- Check existing items via admin panel or API

## 📡 API Reference

### Authentication
```javascript
POST /api/users/login
{
  "email": "user@example.com",
  "password": "password"
}
```

### Get Glossary Items
```javascript
GET /api/glossary
GET /api/glossary?published=true
GET /api/glossary?category=bitcoin
GET /api/glossary?limit=100
```

### Upload Glossary Item
```javascript
POST /api/glossary
Authorization: JWT <token>
{
  "title": "Term Title",
  "slug": "term-slug",
  "description": "Clear explanation of the term",
  "category": "bitcoin",
  "published": true
}
```

### Update Glossary Item
```javascript
PATCH /api/glossary/{id}
Authorization: JWT <token>
{
  "published": true,
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

## ⚠️ Common Issues & Solutions

### 1. Category Mapping

**Issue:** Invalid category values causing upload failures

**Error:** Category not matching schema options

**Solution:**
- Ensure categories map to valid schema values: `bitcoin`, `stablecoins`, `regulation`, `macro`
- Update `categoryMap` in `transformGlossaryData()`

### 2. Slug Conflicts

**Issue:** Duplicate slug errors

**Error:** `"Slug must be unique"`

**Solution:**
- Use unique titles
- Manually specify slugs in JSON files
- Check existing glossary items for conflicts

### 3. Missing Required Fields

**Issue:** Upload fails due to missing data

**Error:** `"Title is required"` or `"Description is required"`

**Solution:**
- Validate JSON files have `title` and `description`
- Check for empty or null values

### 4. JSON Format Issues

**Issue:** Invalid JSON syntax

**Error:** `"Invalid JSON in filename.json"`

**Solution:**
- Validate JSON syntax using online tools
- Check for trailing commas, missing quotes
- Ensure proper escaping of special characters

## 🎯 Best Practices

### Before Upload
1. **Validate JSON files** for syntax errors
2. **Check required fields** (`title`, `description`) are present
3. **Verify file paths** are correct
4. **Test with small batch** first

### JSON Content Guidelines
1. **Clear descriptions** - Write for your target audience
2. **Consistent formatting** - Use same style across all items
3. **Unique titles** - Avoid duplicates
4. **Proper categories** - Use appropriate classification

### During Upload
1. **Monitor console output** for errors
2. **Don't interrupt** the process
3. **Keep Payload server running**

### After Upload
1. **Verify content** in admin panel
2. **Test API endpoints**
3. **Check public accessibility**

## 📊 Expected Performance

- **Upload Speed:** ~3-5 items per second
- **Processing Time:** 10 items in ~5-10 seconds
- **Error Rate:** <1% with proper JSON formatting
- **Memory Usage:** Minimal (simple text content)

## 🔄 For Next Batch

To upload a new batch of glossary items:

1. **Update file directory** in `upload-glossary-items.cjs`
2. **Place new JSON files** in designated directory
3. **Run upload script:** `node upload-glossary-items.cjs`
4. **Publish if needed:** `node publish-glossary-items.cjs` (usually not required)

## 📋 Quick Reference

### Minimal JSON Format
```json
{
  "title": "Your Term",
  "description": "Clear explanation of the term"
}
```

### Full JSON Format
```json
{
  "title": "Your Term",
  "slug": "your-term",
  "description": "Clear explanation of the term",
  "category": "Bitcoin",
  "published": true
}
```

### Upload Command
```bash
node upload-glossary-items.cjs
```

### Verification Commands
```bash
curl http://localhost:3000/api/glossary
curl http://localhost:3000/api/glossary?category=bitcoin
```

That's it! The glossary upload process is much simpler than articles - just prepare your JSON files and run the script! 🚀 