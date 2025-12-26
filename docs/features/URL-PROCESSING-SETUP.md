# URL Processing & AI Analysis Setup Guide

## Overview

The URL Processing feature allows users to submit multiple URLs for comprehensive scraping and AI-powered analysis. The system uses:

- **WebScraping.AI** for content extraction from URLs
- **OpenAI GPT-4** for generating comprehensive analysis reports
- **Firebase Functions** for serverless processing
- **Firestore** for storing results and job status

## Environment Variables Setup

### Firebase Functions Environment Variables

You need to set the following environment variables in your Firebase project:

```bash
# Set OpenAI API Key
firebase functions:config:set openai.api_key="your-openai-api-key"

# Set WebScraping.AI API Key
firebase functions:config:set webscraping.api_key="your-webscraping-ai-api-key"
```

### Alternative: Direct Environment Variables

If you prefer to set environment variables directly in the Firebase console:

1. Go to Firebase Console → Functions → Configuration
2. Add the following environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `WEBSCRAPING_AI_API_KEY`: Your WebScraping.AI API key

## API Keys Setup

### 1. OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Ensure you have access to GPT-4 models
4. Copy the API key and set it as an environment variable

### 2. WebScraping.AI API Key

1. Go to [WebScraping.AI](https://webscraping.ai/)
2. Sign up for an account
3. Get your API key from the dashboard
4. Copy the API key and set it as an environment variable

## Deployment

### 1. Install Dependencies

```bash
cd functions
npm install
```

### 2. Deploy Functions

```bash
firebase deploy --only functions
```

### 3. Deploy Frontend

```bash
npm run build
firebase deploy --only hosting
```

## Features

### URL Processing Capabilities

- **Content Scraping**: Extracts content from blogs, press releases, and social media
- **6-Month History**: Scrapes content from the last 6 months
- **Structured Data**: Extracts titles, authors, publication dates, and content
- **Error Handling**: Graceful handling of failed scrapes

### AI Analysis

- **Comprehensive Reports**: Detailed analysis covering multiple aspects
- **Sentiment Analysis**: Overall sentiment and trend analysis
- **Key Insights**: Important findings and revelations
- **Strategic Recommendations**: Actionable insights for stakeholders
- **Source Analysis**: Credibility and influence assessment

### User Interface

- **Tabbed Interface**: Input, Processing, and Results tabs
- **Real-time Progress**: Live updates during processing
- **Bulk Import**: Add multiple URLs at once
- **Download Reports**: Export AI analysis as text files
- **Individual Results**: Detailed results for each URL

## Usage

### 1. Adding URLs

Users can add URLs in two ways:
- **Individual URLs**: Add one by one with optional descriptions
- **Bulk Import**: Paste multiple URLs (one per line)

### 2. Processing

- Click "Submit for Processing"
- System scrapes content from each URL
- Generates comprehensive AI analysis
- Stores results in Firestore

### 3. Results

- View processing summary with statistics
- Read the AI-generated analysis report
- Download the report as a text file
- Review individual URL results

## Technical Architecture

### Backend (Firebase Functions)

- `processUrls`: Main processing function
- `getProcessingStatus`: Check job status
- `getProcessingResults`: Retrieve completed results

### Frontend (React)

- `useUrlProcessor`: Custom hook for API interactions
- `Input` component: Main UI component
- Real-time status polling

### Data Storage (Firestore)

- `urlProcessingJobs`: Job status and progress
- `urlProcessingResults`: Completed results and reports

## Limitations

- Maximum 20 URLs per request
- 9-minute timeout for processing
- Rate limiting on external APIs
- Content availability depends on source websites

## Troubleshooting

### Common Issues

1. **API Key Errors**: Ensure environment variables are set correctly
2. **Timeout Errors**: Processing may take longer for many URLs
3. **Scraping Failures**: Some websites may block automated scraping
4. **Rate Limiting**: Respect API rate limits

### Monitoring

- Check Firebase Functions logs for errors
- Monitor API usage and costs
- Review processing success rates

## Cost Considerations

- **OpenAI API**: Costs per token for GPT-4 analysis
- **WebScraping.AI**: Costs per successful scrape
- **Firebase Functions**: Execution time and memory usage
- **Firestore**: Data storage and read/write operations

## Security

- All functions require user authentication
- Users can only access their own processing jobs
- API keys are stored securely in environment variables
- Input validation prevents malicious URLs 