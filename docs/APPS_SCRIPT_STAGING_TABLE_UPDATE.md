# Apps Script Update: Switch to Staging Table

## Instructions for Coder

**Goal:** Modify the `sendDataToBigQuery()` function to send data to the new staging table instead of directly to `all_channels_data`.

---

## What Needs to Change

In your Google Apps Script, find the function called `sendDataToBigQuery()`.

### Current Behavior (OLD):
```javascript
// Currently sends to: btcp_main_dataset.all_channels_data
```

### New Behavior (REQUIRED):
```javascript
// Should send to: btcp_main_dataset.staging_table
```

---

## Step-by-Step Instructions

### 1. Locate the BigQuery Configuration

Find where the BigQuery table is defined. It will look something like this:

```javascript
var projectId = 'triple-upgrade-245423';
var datasetId = 'btcp_main_dataset';
var tableId = 'all_channels_data';  // ⬅️ THIS LINE NEEDS TO CHANGE
```

### 2. Change the Table Name

Replace `all_channels_data` with `staging_table`:

```javascript
var projectId = 'triple-upgrade-245423';
var datasetId = 'btcp_main_dataset';
var tableId = 'staging_table';  // ✅ NEW TABLE NAME
```

### 3. Verify the Schema

The staging table expects these columns (in this exact order):

```javascript
// Required columns for staging_table
[
  'Date',              // TIMESTAMP
  'Title',             // STRING
  'Content',           // STRING
  'URL',               // STRING
  'Outlet',            // STRING
  'Image_URL',         // STRING
  'author_name',       // STRING
  'BPI',               // FLOAT
  'Country',           // STRING
  'Funding',           // STRING
  'Outlet_Category',   // STRING
  'Political_Leaning'  // STRING
]
```

**Important:**
- Do NOT include `Sentiment`, `Topic_1`, `Topic_2`, `Topic_3`, `Topic_4`, `All_Topics`, or `row_num`
- These will be added automatically by the enrichment service

### 4. Example: Full Before/After

**BEFORE:**
```javascript
function sendDataToBigQuery() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var data = sheet.getDataRange().getValues();

  var projectId = 'triple-upgrade-245423';
  var datasetId = 'btcp_main_dataset';
  var tableId = 'all_channels_data';  // ❌ OLD

  // ... rest of the function
}
```

**AFTER:**
```javascript
function sendDataToBigQuery() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var data = sheet.getDataRange().getValues();

  var projectId = 'triple-upgrade-245423';
  var datasetId = 'btcp_main_dataset';
  var tableId = 'staging_table';  // ✅ NEW

  // ... rest of the function (no other changes needed)
}
```

---

## What Happens After This Change

### Data Flow:
1. **Apps Script** → Inserts raw data into `staging_table`
2. **Enrichment Service** (runs every 60 seconds) →
   - Reads from `staging_table`
   - Enriches with OpenAI (sentiment + topics)
   - Inserts enriched data into `all_channels_data`
   - Deletes processed rows from `staging_table`

### Timeline:
- Apps Script sends data → **Instant**
- Data appears in staging_table → **Instant**
- Enrichment service processes → **Within 1 minute**
- Fully enriched data in all_channels_data → **1-2 minutes total**

---

## Testing

After making the change, test it:

1. **Run** `sendDataToBigQuery()` manually in Apps Script
2. **Verify** data appears in staging table:
   ```sql
   SELECT COUNT(*) FROM `triple-upgrade-245423.btcp_main_dataset.staging_table`
   ```
3. **Wait 1 minute**
4. **Check** enriched data in main table:
   ```sql
   SELECT URL, Sentiment, Topic_1
   FROM `triple-upgrade-245423.btcp_main_dataset.all_channels_data`
   ORDER BY Date DESC
   LIMIT 5
   ```

---

## Important Notes

✅ **Keep the same trigger schedule** - Don't change when/how often Apps Script runs

✅ **No schema changes needed** - Just change the table name

✅ **No enrichment logic needed** - Remove any sentiment/topic code from Apps Script if it exists

❌ **Don't send to both tables** - Only send to `staging_table`, not both

---

## Rollback Plan

If something goes wrong, simply change the table name back:

```javascript
var tableId = 'all_channels_data';  // Rollback to old table
```

---

## Questions?

Contact the DevOps team if you encounter any issues during implementation.

**BigQuery Tables:**
- Staging: `triple-upgrade-245423.btcp_main_dataset.staging_table`
- Production: `triple-upgrade-245423.btcp_main_dataset.all_channels_data`

**Enrichment Service:**
- URL: `https://enrichment-service-45998414364.us-central1.run.app`
- Schedule: Every minute
- Status: ENABLED
