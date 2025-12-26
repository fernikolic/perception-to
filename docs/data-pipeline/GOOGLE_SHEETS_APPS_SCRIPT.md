# Google Sheets Apps Script Documentation

## Overview

Each Google Sheet in the data pipeline contains an Apps Script that processes data and sends it to BigQuery. This document provides the complete script code and implementation details.

## Complete Apps Script Code

```javascript
function sendDataToBigQuery() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return Logger.log("No data to process.");

  const dataRange = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn());
  const data = dataRange.getValues();
  const properties = PropertiesService.getScriptProperties();
  const serviceAccountKey = JSON.parse(properties.getProperty('SERVICE_ACCOUNT_KEY'));

  const projectId = 'triple-upgrade-245423';
  const datasetId = 'btcp_main_dataset';
  const tableId = 'all_channels_data';
  const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/datasets/${datasetId}/tables/${tableId}/insertAll`;

  const lastSentTimestamp = new Date(properties.getProperty('LAST_SENT_TIMESTAMP') || 0);
  Logger.log("🚀 Last Sent Timestamp: " + lastSentTimestamp.toISOString());

  let maxTimestamp = lastSentTimestamp;
  let rows = [];
  let originals = [];
  let sheetRowIndexes = [];
  let totalProcessed = 0;
  let totalSent = 0;
  let totalSkipped = 0;

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    totalProcessed++;

    const dateValue = new Date(row[0]);
    const title = row[1];
    const content = row[2];
    const urlField = row[3];
    const outlet = row[4];
    const sentiment = row[5];
    const imageUrl = row[6];
    const authorName = row[7];
    const bpi = row[8];
    const topic1 = row[9];
    const topic2 = row[10];
    const topic3 = row[11];
    const topic4 = row[12];
    const country = row[13];
    const funding = row[14];
    const category = row[15];
    const political = row[16];

    if (isNaN(dateValue.getTime())) {
      Logger.log("⏱️ Invalid date in row " + (i + 2));
      totalSkipped++;
      continue;
    }

    if (dateValue <= lastSentTimestamp) {
      Logger.log("📉 Row " + (i + 2) + " already sent, skipping.");
      totalSkipped++;
      continue;
    }

    if (!urlField || !title || !outlet) {
      Logger.log("⚠️ Incomplete row " + (i + 2) + " - Missing: " +
                (urlField ? "" : "URL ") +
                (title ? "" : "Title ") +
                (outlet ? "" : "Outlet"));
      totalSkipped++;
      continue;
    }

    for (let j = 0; j < row.length; j++) {
      if (typeof row[j] === 'string') {
        row[j] = row[j].replace(/[^\x00-\x7F]/g, "");
      }
    }

    let cleanedImageUrl = isValidUrl(imageUrl) ? imageUrl : null;

    const formattedRow = {
      "json": {
        "Date": dateValue.toISOString(),
        "Title": title,
        "Content": content,
        "URL": urlField,
        "Outlet": outlet,
        "Sentiment": sentiment || null,
        "Image_URL": cleanedImageUrl || null,
        "author_name": authorName || null,
        "BPI": bpi !== "" ? parseFloat(bpi) : null,
        "Topic_1": topic1,
        "Topic_2": topic2,
        "Topic_3": topic3,
        "Topic_4": topic4,
        "Country": country,
        "Funding": funding,
        "Outlet_Category": category,
        "Political_Leaning": political
      }
    };

    rows.push(formattedRow);
    originals.push([...row, new Date()]);
    sheetRowIndexes.push(i + 2);
    totalSent++;

    if (dateValue > maxTimestamp) maxTimestamp = dateValue;

    if (rows.length >= 500) {
      handleBatch(rows, originals, sheetRowIndexes, url, serviceAccountKey, sheet);
      rows = [];
      originals = [];
      sheetRowIndexes = [];
    }
  }

  if (rows.length > 0) {
    handleBatch(rows, originals, sheetRowIndexes, url, serviceAccountKey, sheet);
  }

  if (maxTimestamp > lastSentTimestamp) {
    properties.setProperty('LAST_SENT_TIMESTAMP', maxTimestamp.toISOString());
  }

  Logger.log("----- CLEAN COLUMN MAPPING -----");
  Logger.log("📦 Total Processed: " + totalProcessed);
  Logger.log("✅ Sent to BQ: " + totalSent);
  Logger.log("⚠️ Skipped: " + totalSkipped);
  Logger.log("🔄 Column G → Image_URL");
  Logger.log("🔄 Column H → author_name");
  Logger.log("⏱️ New LAST_SENT_TIMESTAMP: " + maxTimestamp.toISOString());
}

function handleBatch(rows, originals, sheetRowIndexes, url, serviceAccountKey, sheet) {
  const token = getOAuthTokenFromServiceAccount(serviceAccountKey);
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: { 'Authorization': 'Bearer ' + token },
    payload: JSON.stringify({ rows: rows }),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const responseText = response.getContentText();
    const responseJson = JSON.parse(responseText);

    const errorIndexes = new Set((responseJson.insertErrors || []).map(e => e.index));
    const backupSheet = SpreadsheetApp.openById("1O6qoHGzoa4sgAKsitI-2yus6jiCIRZT5yKaNz9sObIw").getSheets()[0];

    for (let i = rows.length - 1; i >= 0; i--) {
      if (!errorIndexes.has(i)) {
        backupSheet.appendRow(originals[i]);
        sheet.deleteRow(sheetRowIndexes[i]);
      } else {
        Logger.log("❌ Skipping deletion of row " + sheetRowIndexes[i] + " due to insert error.");
      }
    }
  } catch (e) {
    Logger.log("🚨 Failed batch insert or backup: " + e.message);
  }
}

function isValidUrl(url) {
  if (!url || typeof url !== "string") return false;
  const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
  return pattern.test(url);
}

function getOAuthTokenFromServiceAccount(serviceAccount) {
  const url = 'https://oauth2.googleapis.com/token';
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claimSet = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/bigquery https://www.googleapis.com/auth/drive",
    aud: url,
    exp: now + 3600,
    iat: now
  };

  const jwt = Utilities.base64EncodeWebSafe(JSON.stringify(header)) + '.' +
              Utilities.base64EncodeWebSafe(JSON.stringify(claimSet));
  const signature = Utilities.computeRsaSha256Signature(jwt, serviceAccount.private_key);
  const signedJwt = jwt + '.' + Utilities.base64EncodeWebSafe(signature);

  const payload = {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: signedJwt
  };

  const options = {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    payload: payload
  };

  const response = UrlFetchApp.fetch(url, options);
  return JSON.parse(response.getContentText()).access_token;
}

function sendNewRowsToBigQuery() {
  return sendDataToBigQuery();
}
```

## Column Mapping

### Google Sheets Columns
```
A: Date
B: Title
C: Content
D: URL
E: Outlet
F: Sentiment
G: Image URL
H: Author Name
I: BPI
J: Topic 1
K: Topic 2
L: Topic 3
M: Topic 4
N: Country
O: Funding
P: Outlet Category
Q: Political Leaning
```

### BigQuery Mapping
```javascript
const formattedRow = {
  "json": {
    "Date": dateValue.toISOString(),           // Column A
    "Title": title,                            // Column B
    "Content": content,                        // Column C
    "URL": urlField,                           // Column D
    "Outlet": outlet,                          // Column E
    "Sentiment": sentiment || null,            // Column F
    "Image_URL": cleanedImageUrl || null,      // Column G
    "author_name": authorName || null,         // Column H
    "BPI": bpi !== "" ? parseFloat(bpi) : null,// Column I
    "Topic_1": topic1,                         // Column J
    "Topic_2": topic2,                         // Column K
    "Topic_3": topic3,                         // Column L
    "Topic_4": topic4,                         // Column M
    "Country": country,                        // Column N
    "Funding": funding,                        // Column O
    "Outlet_Category": category,               // Column P
    "Political_Leaning": political             // Column Q
  }
};
```

## Setup Instructions

### 1. Service Account Configuration
1. Store the BigQuery service account key in Script Properties
2. Key name: `SERVICE_ACCOUNT_KEY`
3. Value: Complete JSON service account key

### 2. Backup Sheet Configuration
- Backup Sheet ID: `1O6qoHGzoa4sgAKsitI-2yus6jiCIRZT5yKaNz9sObIw`
- All successfully sent data is copied here before deletion

### 3. Triggers
- **Manual**: `sendDataToBigQuery()`
- **Legacy**: `sendNewRowsToBigQuery()` (alias for backward compatibility)

## Key Features

### Incremental Processing
- Uses `LAST_SENT_TIMESTAMP` to track progress
- Only processes new data since last successful run
- Prevents duplicate data in BigQuery

### Batch Processing
- Processes up to 500 rows per batch
- Reduces API calls and improves performance
- Handles large datasets efficiently

### Data Validation
- Validates required fields (URL, Title, Outlet)
- Checks date formats
- Skips invalid rows with detailed logging

### Error Handling
- Logs all errors with row numbers
- Continues processing even if some rows fail
- Maintains data integrity

### Data Cleaning
- Removes non-ASCII characters
- Validates URL formats
- Handles empty/null values appropriately

## Troubleshooting

### Common Issues

1. **"SERVICE_ACCOUNT_KEY not found"**
   - Solution: Add the service account JSON to Script Properties

2. **"Invalid date in row X"**
   - Solution: Check date format in column A

3. **"Incomplete row X - Missing: URL/Title/Outlet"**
   - Solution: Ensure required columns are populated

4. **OAuth authentication errors**
   - Solution: Verify service account permissions

### Monitoring
- Check execution logs in Apps Script editor
- Monitor backup sheet for successful transfers
- Verify BigQuery for data arrival

## Performance Considerations

- **Batch Size**: 500 rows per batch (configurable)
- **API Limits**: Respects BigQuery API quotas
- **Memory Usage**: Processes data in chunks
- **Execution Time**: Usually completes within Apps Script limits

## Security

- Service account key stored securely in Script Properties
- Limited BigQuery permissions (insert only)
- No sensitive data logged
- Backup data stored in secure Google Sheets