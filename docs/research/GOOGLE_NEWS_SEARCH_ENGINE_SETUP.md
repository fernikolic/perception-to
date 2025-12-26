# Setting Up a Dedicated Google News Search Engine

Your current search engine (`a53c03b716ca54d64`) is configured for image search.
For the Company Research Pipeline, you need a **dedicated News Search Engine**.

## Quick Setup Guide (5 minutes)

### Step 1: Create New Programmable Search Engine

1. Go to: https://programmablesearchengine.google.com/controlpanel/create

2. Fill in:
   - **Name**: `Bitcoin Company News Search`
   - **What to search**: Select **"Search specific sites or pages"**

3. Add these news domains (copy/paste each one):
   ```
   news.google.com
   reuters.com
   bloomberg.com
   wsj.com
   nytimes.com
   ft.com
   cnbc.com
   forbes.com
   businessinsider.com
   marketwatch.com
   theguardian.com
   bbc.com
   cnn.com
   coindesk.com
   cointelegraph.com
   decrypt.co
   bitcoinmagazine.com
   theblock.co
   techcrunch.com
   theverge.com
   wired.com
   fortune.com
   barrons.com
   ```

4. Click **Create**

### Step 2: Get Your New Search Engine ID

1. After creation, you'll see your new search engine
2. Click **"Copy"** next to the **Search Engine ID** (looks like: `xyz123abc456def`)
3. Save this ID

### Step 3: Configure Settings

1. Click **"Customize"** or go to **Control Panel**
2. Enable these settings:
   - **SafeSearch**: OFF (to get all results)
   - **Search the entire web**: OFF (keep it to specific sites only for better quality)

3. Click **Update**

### Step 4: Update Your Environment

Add the new ID to `/functions/.env`:

```bash
# Existing (for image search)
GOOGLE_SEARCH_ENGINE_ID=a53c03b716ca54d64

# NEW - for news search
GOOGLE_NEWS_SEARCH_ENGINE_ID=YOUR_NEW_ID_HERE
```

---

## Alternative: Use news.google.com Only

For the purest Google News results, you can create an engine that searches ONLY:
- `news.google.com/*`

This will return actual Google News aggregated results.

---

## Verify It Works

After setup, test with:

```bash
curl "https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=YOUR_NEW_CX&q=MicroStrategy+Bitcoin+news&num=5"
```

You should see news article results with proper news sources.

---

## Cost Reminder

- **Free tier**: 100 searches/day
- **Paid**: $5 per 1,000 searches
- Your API key works with multiple search engines

---

## After Setup

Once you have the new Search Engine ID, tell me and I'll update the pipeline script to use it.

Example:
```
My new News Search Engine ID is: xyz123abc456def
```
