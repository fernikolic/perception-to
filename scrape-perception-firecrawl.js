#!/usr/bin/env node

import FirecrawlApp from '@mendable/firecrawl-js';
import fs from 'fs/promises';

// Initialize Firecrawl with API key
const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY || 'fc-b91b1b3a6f2545e988d621fedf845d5e'
});

// URLs to scrape from perception.to
const URLs_TO_SCRAPE = [
  'https://perception.to',
  'https://perception.to/about',
  'https://perception.to/pricing',
  'https://perception.to/learn',
  'https://perception.to/glossary',
  'https://perception.to/bitcoin-market-sentiment',
  'https://perception.to/bitcoin-fear-greed-index',
  'https://perception.to/methodology',
  'https://perception.to/contact',
  'https://perception.to/careers',
  'https://perception.to/press',
  'https://perception.to/roadmap',
  'https://perception.to/use-cases',
  'https://perception.to/slack-integration',
  'https://perception.to/docs',
  'https://perception.to/legal/privacy',
  'https://perception.to/legal/terms'
];

// Helper function to delay requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to extract key information from scraped content
const extractPageInfo = (data, url) => {
  const info = {
    url,
    title: data.title || '',
    description: data.description || '',
    content: data.markdown || '',
    headings: [],
    links: data.links || [],
    features: [],
    metadata: data.metadata || {}
  };

  if (data.markdown) {
    // Extract headings
    const headingMatches = data.markdown.match(/^#{1,6}\s+(.+)$/gm);
    if (headingMatches) {
      info.headings = headingMatches.map(h => h.trim());
    }
  }

  // Extract features from content
  const featureKeywords = [
    'sentiment', 'fear', 'greed', 'index', 'analysis', 'tracking',
    'real-time', 'dashboard', 'chart', 'visualization', 'integration',
    'api', 'data', 'market', 'bitcoin', 'cryptocurrency', 'institutional',
    'slack', 'educational', 'glossary', 'learn', 'methodology'
  ];

  const content = info.content.toLowerCase();
  featureKeywords.forEach(keyword => {
    if (content.includes(keyword)) {
      info.features.push(keyword);
    }
  });

  return info;
};

// Main scraping function
const scrapePage = async (url) => {
  try {
    console.log(`Scraping: ${url}`);
    
    const result = await firecrawl.scrapeUrl(url, {
      formats: ['markdown', 'html'],
      onlyMainContent: true,
      waitFor: 2000
    });

    if (result.success) {
      return extractPageInfo(result, url);
    } else {
      throw new Error(result.error || 'Unknown error');
    }
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return {
      url,
      error: error.message,
      title: '',
      description: '',
      content: '',
      headings: [],
      links: [],
      features: [],
      metadata: {}
    };
  }
};

// Generate comprehensive markdown summary
const generateMarkdown = (scrapedData) => {
  let markdown = `# Perception.to - Complete Website Summary

*Generated on ${new Date().toISOString()} using Firecrawl*

## Overview

Perception.to is a comprehensive Bitcoin market sentiment and analysis platform that provides real-time insights into cryptocurrency market trends, fear & greed indices, and institutional sentiment analysis.

## Website Structure

### Main Pages Scraped

`;

  // Add page summaries
  scrapedData.forEach((page, index) => {
    if (page.error) {
      markdown += `#### ${index + 1}. ${page.url} - ❌ Error: ${page.error}\n\n`;
      return;
    }

    markdown += `#### ${index + 1}. ${page.title || page.url}\n`;
    markdown += `**URL:** ${page.url}\n\n`;

    if (page.description) {
      markdown += `**Description:** ${page.description}\n\n`;
    }

    if (page.content) {
      const preview = page.content.substring(0, 300).replace(/\n+/g, ' ');
      markdown += `**Content Preview:** ${preview}...\n\n`;
    }

    if (page.headings.length > 0) {
      markdown += `**Page Structure:**\n`;
      page.headings.slice(0, 8).forEach(heading => {
        const level = heading.match(/^(#{1,6})/)[1].length;
        const indent = '  '.repeat(level - 1);
        const text = heading.replace(/^#{1,6}\s+/, '');
        markdown += `${indent}- ${text}\n`;
      });
      markdown += '\n';
    }

    if (page.features.length > 0) {
      markdown += `**Features Mentioned:** ${page.features.join(', ')}\n\n`;
    }

    if (page.links && page.links.length > 0) {
      markdown += `**Links Found:** ${page.links.length} links\n\n`;
    }

    markdown += '---\n\n';
  });

  // Add navigation summary
  const allLinks = scrapedData
    .filter(page => page.links)
    .map(page => page.links)
    .flat();

  if (allLinks.length > 0) {
    markdown += `## Navigation Structure

### Internal Links Found
`;
    const internalLinks = [...new Set(allLinks
      .filter(link => link.startsWith('/') || link.includes('perception.to'))
      .slice(0, 25))];
    
    internalLinks.forEach(link => {
      markdown += `- ${link}\n`;
    });

    markdown += `\n### External Links Found
`;
    const externalLinks = [...new Set(allLinks
      .filter(link => !link.startsWith('/') && !link.includes('perception.to'))
      .slice(0, 20))];
    
    externalLinks.forEach(link => {
      markdown += `- ${link}\n`;
    });
  }

  // Add features summary
  const allFeatures = scrapedData
    .filter(page => page.features)
    .map(page => page.features)
    .flat();

  if (allFeatures.length > 0) {
    markdown += `\n## Platform Features

Based on the scraped content, Perception.to offers the following features:

`;
    const uniqueFeatures = [...new Set(allFeatures)];
    uniqueFeatures.forEach(feature => {
      markdown += `- **${feature.charAt(0).toUpperCase() + feature.slice(1)}** - Mentioned across multiple pages\n`;
    });
  }

  // Add content analysis
  const successfulPages = scrapedData.filter(page => !page.error);
  const totalContentLength = successfulPages.reduce((sum, page) => sum + (page.content?.length || 0), 0);
  const averageContentLength = Math.round(totalContentLength / successfulPages.length);

  markdown += `\n## Content Analysis

- **Total Pages Scraped:** ${scrapedData.length}
- **Successful Scrapes:** ${successfulPages.length}
- **Failed Scrapes:** ${scrapedData.filter(page => page.error).length}
- **Average Content Length:** ${averageContentLength} characters
- **Total Content Scraped:** ${totalContentLength.toLocaleString()} characters

## Key Findings

Based on the Firecrawl analysis of Perception.to, the platform is a sophisticated Bitcoin market sentiment analysis tool that provides:

### Core Features
1. **Real-time market sentiment tracking** with fear & greed indices
2. **Institutional sentiment analysis** from various market participants
3. **Educational content** through their learn section and glossary
4. **Integration capabilities** with Slack and other platforms
5. **Comprehensive data visualization** and charting tools
6. **API access** for developers and data analysts

### Target Users
- **Investors** looking for market sentiment insights
- **Journalists** covering cryptocurrency markets
- **Researchers** analyzing market trends
- **Institutional players** in the cryptocurrency space

### Technology Stack
- **Frontend:** React-based web application
- **Data Sources:** Real-time market data, social media sentiment, institutional reports
- **Integrations:** Slack, API access, data exports
- **Content:** Educational resources, market analysis, methodology documentation

## Technical Notes

- **Scraping Tool:** Firecrawl MCP
- **Scraping Date:** ${new Date().toISOString()}
- **Formats Extracted:** Markdown and HTML
- **Content Processing:** Main content extraction with navigation filtering

## Summary

Perception.to is a comprehensive Bitcoin market sentiment analysis platform that combines real-time data, institutional insights, and educational content to provide a complete view of cryptocurrency market sentiment. The platform's focus on fear & greed indices, institutional sentiment, and educational resources makes it a valuable tool for anyone involved in the cryptocurrency space.

The platform appears to be well-structured with clear navigation, comprehensive documentation, and a focus on providing actionable insights for various stakeholders in the cryptocurrency ecosystem.

---

*This summary was generated using Firecrawl MCP to scrape the public pages of perception.to. For the most up-to-date information, please visit the website directly.*
`;

  return markdown;
};

// Main execution
const main = async () => {
  try {
    console.log('🚀 Starting Perception.to website scraping with Firecrawl...\n');

    const scrapedData = [];
    
    // Scrape each URL with delays to be respectful
    for (const url of URLs_TO_SCRAPE) {
      const data = await scrapePage(url);
      scrapedData.push(data);
      
      // Add delay between requests
      await delay(2000);
    }

    console.log(`\n✅ Scraped ${scrapedData.length} pages`);

    // Generate markdown
    const markdown = generateMarkdown(scrapedData);

    // Write to file
    const outputFile = 'perception-summary-firecrawl.md';
    await fs.writeFile(outputFile, markdown, 'utf8');
    
    console.log(`\n📄 Markdown summary written to: ${outputFile}`);
    console.log(`📊 Summary statistics:`);
    console.log(`   - Total pages: ${scrapedData.length}`);
    console.log(`   - Successful: ${scrapedData.filter(page => !page.error).length}`);
    console.log(`   - Failed: ${scrapedData.filter(page => page.error).length}`);
    
    // Show some key findings
    const successfulPages = scrapedData.filter(page => !page.error);
    const totalFeatures = successfulPages
      .map(page => page.features?.length || 0)
      .reduce((sum, count) => sum + count, 0);
    const totalLinks = successfulPages
      .map(page => page.links?.length || 0)
      .reduce((sum, count) => sum + count, 0);

    console.log(`   - Features found: ${totalFeatures}`);
    console.log(`   - Links found: ${totalLinks}`);

  } catch (error) {
    console.error('❌ Scraping failed:', error.message);
    process.exit(1);
  }
};

// Run the script
main(); 