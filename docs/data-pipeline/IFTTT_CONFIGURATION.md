# IFTTT Configuration Guide

## Overview

This document details the IFTTT (If This Then That) configuration for automatically collecting Bitcoin-related content from various sources and sending it to Google Sheets.

## IFTTT Applet Structure

Each IFTTT applet follows the pattern:
- **IF**: Content is published on a source platform (Reddit, X, News sites, etc.)
- **THEN**: Send structured data to a specific Google Sheets spreadsheet

## Data Sources and Applets

### 1. Reddit Integration
- **Source**: Reddit r/Bitcoin subreddit
- **Trigger**: New posts in subreddit
- **Destination**: Reddit Google Sheet
- **Data Captured**: Post title, content, URL, author, publication time

### 2. X (Twitter) Integration
- **Source**: Bitcoin-related tweets
- **Trigger**: Tweets with specific hashtags or from monitored accounts
- **Destination**: X Google Sheet
- **Data Captured**: Tweet text, URL, author, timestamp

### 3. News Sources
- **Sources**: Various Bitcoin news outlets via RSS/Feedly
- **Trigger**: New articles published
- **Destination**: All Media Google Sheet
- **Data Captured**: Article title, content, URL, image, author, publication time

### 4. YouTube Integration
- **Source**: Bitcoin-related YouTube channels
- **Trigger**: New video uploads
- **Destination**: YouTube Google Sheet
- **Data Captured**: Video title, description, URL, thumbnail, channel name

### 5. GitHub Integration
- **Source**: Bitcoin repositories
- **Trigger**: New pull requests or issues
- **Destination**: GitHub PRs Google Sheet
- **Data Captured**: PR/issue title, description, URL, author

### 6. Research Sources
- **Sources**: Academic papers and research publications
- **Trigger**: New research published
- **Destination**: Research Google Sheet
- **Data Captured**: Paper title, abstract, URL, authors

### 7. Hacker News Integration
- **Source**: Hacker News Bitcoin-related posts
- **Trigger**: New posts with Bitcoin keywords
- **Destination**: Hacker News Google Sheet
- **Data Captured**: Post title, URL, comments URL, score

### 8. Spotify Integration
- **Source**: Bitcoin podcast episodes
- **Trigger**: New episodes from monitored podcasts
- **Destination**: Spotify Google Sheet
- **Data Captured**: Episode title, description, URL, podcast name

## IFTTT Template Format

### Current Template (Updated)
```
{{ArticlePublishedAt}} ||| {{ArticleTitle}} ||| {{ArticleContent}} ||| {{ArticleURL}} ||| ||| ||| {{ArticleFirstImageURL}} ||| {{ArticleAuthor}} ||| ||| ||| ||| ||| ||| ||| ||| |||
```

### Column Mapping
The template maps to Google Sheets columns as follows:

| Position | Field | Google Sheets Column | BigQuery Column |
|----------|-------|---------------------|-----------------|
| 1 | {{ArticlePublishedAt}} | A: Date | Date |
| 2 | {{ArticleTitle}} | B: Title | Title |
| 3 | {{ArticleContent}} | C: Content | Content |
| 4 | {{ArticleURL}} | D: URL | URL |
| 5 | (empty) | E: Outlet | Outlet |
| 6 | (empty) | F: Sentiment | Sentiment |
| 7 | {{ArticleFirstImageURL}} | G: Image URL | Image_URL |
| 8 | {{ArticleAuthor}} | H: Author Name | author_name |
| 9-17 | (empty) | I-Q: Various | Various |

### Template Evolution

#### Previous Template (Problematic)
```
{{ArticlePublishedAt}} ||| {{ArticleTitle}} ||| {{ArticleContent}} ||| {{ArticleURL}} ||| ||| ||| {{ArticleFirstImageURL}} ||| ||| ||| ||| ||| ||| ||| ||| ||| ||| ||| {{ArticleAuthor}}
```

**Issues:**
- Author name was in position 18 (column R)
- Long chain of empty fields between image URL and author
- Inconsistent with Apps Script expectations

#### Current Template (Fixed)
```
{{ArticlePublishedAt}} ||| {{ArticleTitle}} ||| {{ArticleContent}} ||| {{ArticleURL}} ||| ||| ||| {{ArticleFirstImageURL}} ||| {{ArticleAuthor}} ||| ||| ||| ||| ||| ||| ||| ||| |||
```

**Improvements:**
- Author name moved to position 8 (column H)
- Consistent with BigQuery schema
- Matches Apps Script processing logic

## IFTTT Field Mapping

### Available IFTTT Fields
Different sources provide different fields:

#### RSS/Feedly Sources
- `{{EntryTitle}}` / `{{ArticleTitle}}`
- `{{EntryContent}}` / `{{ArticleContent}}`
- `{{EntryUrl}}` / `{{ArticleURL}}`
- `{{EntryImageUrl}}` / `{{ArticleFirstImageURL}}`
- `{{EntryAuthor}}` / `{{ArticleAuthor}}`
- `{{EntryPublished}}` / `{{ArticlePublishedAt}}`

#### Reddit Sources
- `{{Title}}` → Article title
- `{{Url}}` → Post URL
- `{{PostContent}}` → Post text
- `{{Author}}` → Reddit username
- `{{CreatedAt}}` → Publication time
- `{{Thumbnail}}` → Post thumbnail (if available)

#### Twitter/X Sources
- `{{Text}}` → Tweet text
- `{{LinkToTweet}}` → Tweet URL
- `{{UserName}}` → Twitter handle
- `{{CreatedAt}}` → Tweet timestamp
- `{{EmbeddedImageURL}}` → Attached image

## Configuration Best Practices

### 1. Consistent Field Mapping
- Use the same template format across all applets
- Ensure field positions match Google Sheets columns
- Handle missing fields gracefully (empty strings)

### 2. Data Quality
- Filter for relevant content using keywords
- Set appropriate triggers to avoid spam
- Monitor for duplicate content

### 3. Rate Limiting
- Be aware of IFTTT execution limits
- Don't create too many applets for the same source
- Monitor applet performance regularly

### 4. Error Handling
- Check IFTTT activity logs regularly
- Set up notifications for failed applets
- Have backup methods for critical data sources

## Setup Instructions

### Creating a New IFTTT Applet

1. **Choose Trigger Service**
   - Select appropriate service (RSS, Reddit, Twitter, etc.)
   - Configure trigger conditions (keywords, accounts, etc.)

2. **Configure Trigger**
   - Set specific parameters (subreddit, hashtags, RSS URL)
   - Test trigger to ensure it works

3. **Choose Action Service**
   - Select "Google Sheets"
   - Choose "Add row to spreadsheet"

4. **Configure Action**
   - Select target spreadsheet
   - Use the standard template format
   - Map IFTTT fields to template positions

5. **Test and Deploy**
   - Run test to verify data format
   - Enable applet
   - Monitor for proper operation

### Template Customization

For different sources, adapt the template:

#### Reddit-specific
```
{{CreatedAt}} ||| {{Title}} ||| {{PostContent}} ||| {{Url}} ||| Reddit ||| ||| {{Thumbnail}} ||| {{Author}} ||| ||| ||| ||| ||| ||| ||| ||| |||
```

#### Twitter-specific
```
{{CreatedAt}} ||| {{Text}} ||| {{Text}} ||| {{LinkToTweet}} ||| X ||| ||| {{EmbeddedImageURL}} ||| {{UserName}} ||| ||| ||| ||| ||| ||| ||| ||| |||
```

## Monitoring and Maintenance

### Regular Checks
1. **Activity Monitoring**: Check IFTTT activity dashboard weekly
2. **Data Flow**: Verify data is reaching Google Sheets
3. **Error Rates**: Monitor failed applet executions
4. **Data Quality**: Review incoming data for accuracy

### Common Issues

#### Applet Stops Working
- **Cause**: Source API changes, authentication issues
- **Solution**: Reconnect services, update applet configuration

#### Missing Data Fields
- **Cause**: Source doesn't provide expected fields
- **Solution**: Update template to handle missing fields

#### Duplicate Content
- **Cause**: Multiple applets capturing same content
- **Solution**: Refine trigger conditions, deduplicate in processing

#### Rate Limiting
- **Cause**: Too many requests to source APIs
- **Solution**: Reduce applet frequency, spread across multiple applets

### Troubleshooting Steps

1. **Check IFTTT Activity**
   - Go to "My Applets" in IFTTT
   - Click on specific applet
   - Review activity log

2. **Verify Google Sheets**
   - Check if data is appearing in sheets
   - Verify column format matches template

3. **Test Template**
   - Use IFTTT's "Check now" feature
   - Verify data format in Google Sheets

4. **Update Configuration**
   - Modify trigger conditions if needed
   - Update template format if required

## Advanced Configuration

### Multi-Stage Processing

Some sources (like Reddit) use a two-stage process:

1. **Stage 1**: IFTTT → Temporary Google Sheet
2. **Stage 2**: Apps Script moves data to main sheet

#### Reddit Sync Script
```javascript
function checkAndSyncSheets() {
  // Process from bottom to top to avoid index issues
  for (var row = lastRow; row >= 2; row--) {
    // Copy data to main sheet
    // Delete from temporary sheet after successful copy
  }
}
```

### Custom Processing

For specialized sources, you may need custom Apps Script processing:

```javascript
// Custom processing for specific outlet types
if (outlet === 'Reddit') {
  // Extract Reddit-specific metadata
  content = extractRedditMetadata(content);
} else if (outlet === 'X') {
  // Process tweet-specific formatting
  content = cleanTweetContent(content);
}
```

## Future Enhancements

### Potential Improvements
1. **Enhanced Filtering**: More sophisticated content filtering
2. **Real-time Processing**: Faster data pipeline
3. **Data Enrichment**: Add sentiment analysis, topic detection
4. **Multi-language Support**: Handle non-English content
5. **Image Processing**: Extract and analyze images

### Integration Opportunities
1. **Slack/Discord**: Monitor community discussions
2. **Telegram**: Track crypto channels
3. **LinkedIn**: Professional Bitcoin content
4. **Medium**: Long-form Bitcoin articles
5. **Substack**: Newsletter content