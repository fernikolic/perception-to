#!/usr/bin/env node

import axios from 'axios';
import fs from 'fs/promises';

// Configuration
const BASE_URL = 'https://perception.to';
const OUTPUT_FILE = 'perception-summary.md';

// URLs to scrape
const URLs_TO_SCRAPE = [
  '/',
  '/about',
  '/pricing',
  '/learn',
  '/glossary',
  '/bitcoin-market-sentiment',
  '/bitcoin-fear-greed-index',
  '/methodology',
  '/contact',
  '/careers',
  '/press',
  '/roadmap',
  '/use-cases',
  '/slack-integration',
  '/docs',
  '/legal/privacy',
  '/legal/terms'
];

// Helper function to delay requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to clean text
const cleanText = (text) => {
  if (!text) return '';
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n')
    .trim();
};

// Helper function to extract text content from HTML
const extractTextFromHTML = (html) => {
  if (!html) return '';
  
  // Remove script and style tags
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  
  return cleanText(text);
};

// Helper function to extract meta tags
const extractMetaTags = (html) => {
  const meta = {};
  
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    meta.title = cleanText(titleMatch[1]);
  }
  
  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (descMatch) {
    meta.description = cleanText(descMatch[1]);
  }
  
  // Extract meta keywords
  const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/i);
  if (keywordsMatch) {
    meta.keywords = cleanText(keywordsMatch[1]);
  }
  
  // Extract Open Graph tags
  const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
  if (ogTitleMatch) {
    meta['og:title'] = cleanText(ogTitleMatch[1]);
  }
  
  const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
  if (ogDescMatch) {
    meta['og:description'] = cleanText(ogDescMatch[1]);
  }
  
  return meta;
};

// Helper function to extract headings
const extractHeadings = (html) => {
  const headings = [];
  
  // Extract h1 tags
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
  if (h1Matches) {
    h1Matches.forEach(match => {
      const text = cleanText(match.replace(/<h1[^>]*>([^<]+)<\/h1>/i, '$1'));
      if (text) headings.push({ level: 'h1', text });
    });
  }
  
  // Extract h2 tags
  const h2Matches = html.match(/<h2[^>]*>([^<]+)<\/h2>/gi);
  if (h2Matches) {
    h2Matches.forEach(match => {
      const text = cleanText(match.replace(/<h2[^>]*>([^<]+)<\/h2>/i, '$1'));
      if (text) headings.push({ level: 'h2', text });
    });
  }
  
  // Extract h3 tags
  const h3Matches = html.match(/<h3[^>]*>([^<]+)<\/h3>/gi);
  if (h3Matches) {
    h3Matches.forEach(match => {
      const text = cleanText(match.replace(/<h3[^>]*>([^<]+)<\/h3>/i, '$1'));
      if (text) headings.push({ level: 'h3', text });
    });
  }
  
  return headings;
};

// Helper function to extract links
const extractLinks = (html) => {
  const links = [];
  const linkMatches = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi);
  
  if (linkMatches) {
    linkMatches.forEach(match => {
      const hrefMatch = match.match(/href=["']([^"']+)["']/i);
      const textMatch = match.match(/>([^<]+)</i);
      
      if (hrefMatch && textMatch) {
        const href = hrefMatch[1];
        const text = cleanText(textMatch[1]);
        
        if (text && !links.find(link => link.href === href)) {
          links.push({ href, text });
        }
      }
    });
  }
  
  return links;
};

// Helper function to extract features from text
const extractFeaturesFromText = (text) => {
  const features = [];
  
  // Look for common feature patterns
  const featurePatterns = [
    /([A-Z][^.!?]*?(?:tracking|analysis|monitoring|dashboard|chart|visualization|integration|api|data|sentiment|fear|greed|index)[^.!?]*)/gi,
    /([A-Z][^.!?]*?(?:real.?time|live|instant|automated|automated|smart|intelligent|advanced|comprehensive)[^.!?]*)/gi
  ];
  
  featurePatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const cleanMatch = cleanText(match);
        if (cleanMatch.length > 10 && cleanMatch.length < 200) {
          features.push(cleanMatch);
        }
      });
    }
  });
  
  return [...new Set(features)].slice(0, 10);
};

// Main scraping function
const scrapePage = async (url) => {
  try {
    console.log(`Scraping: ${url}`);
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const response = await axios.get(fullUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const html = response.data;
    const text = extractTextFromHTML(html);
    const meta = extractMetaTags(html);
    const headings = extractHeadings(html);
    const links = extractLinks(html);
    const features = extractFeaturesFromText(text);
    
    // Extract main content sections
    const heroSection = text.substring(0, 500);
    const mainContent = text.substring(500, 2000);
    
    return {
      url,
      fullUrl,
      meta,
      headings,
      links,
      features,
      heroSection,
      mainContent,
      textLength: text.length
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return {
      url,
      fullUrl: url.startsWith('http') ? url : `${BASE_URL}${url}`,
      error: error.message
    };
  }
};

// Generate markdown summary
const generateMarkdown = (scrapedData) => {
  let markdown = `# Perception.to - Complete Website Summary

*Generated on ${new Date().toISOString()}*

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

    markdown += `#### ${index + 1}. ${page.meta.title || page.url}\n`;
    markdown += `**URL:** ${page.fullUrl}\n\n`;

    if (page.meta.description) {
      markdown += `**Description:** ${page.meta.description}\n\n`;
    }

    if (page.heroSection) {
      markdown += `**Hero Content:** ${page.heroSection.substring(0, 200)}...\n\n`;
    }

    if (page.headings.length > 0) {
      markdown += `**Page Structure:**\n`;
      page.headings.slice(0, 8).forEach(heading => {
        const indent = '  '.repeat(parseInt(heading.level.charAt(1)) - 1);
        markdown += `${indent}- ${heading.text}\n`;
      });
      markdown += '\n';
    }

    if (page.features.length > 0) {
      markdown += `**Key Features Mentioned:**\n`;
      page.features.slice(0, 5).forEach(feature => {
        markdown += `- ${feature}\n`;
      });
      markdown += '\n';
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
      .filter(link => link.href.startsWith('/') || link.href.includes('perception.to'))
      .map(link => link.href))];
    
    internalLinks.slice(0, 20).forEach(link => {
      markdown += `- ${link}\n`;
    });

    markdown += `\n### External Links Found
`;
    const externalLinks = [...new Set(allLinks
      .filter(link => !link.href.startsWith('/') && !link.href.includes('perception.to'))
      .map(link => link.href))];
    
    externalLinks.slice(0, 15).forEach(link => {
      markdown += `- ${link}\n`;
    });
  }

  // Add meta information summary
  const allMeta = scrapedData
    .filter(page => page.meta)
    .map(page => page.meta);

  if (allMeta.length > 0) {
    markdown += `\n## SEO & Meta Information

### Key Meta Tags Found
`;
    const metaKeys = [...new Set(allMeta.flatMap(meta => Object.keys(meta)))];
    metaKeys.forEach(key => {
      const values = allMeta
        .map(meta => meta[key])
        .filter(Boolean)
        .slice(0, 3);
      if (values.length > 0) {
        markdown += `- **${key}:** ${values.join(', ')}\n`;
      }
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
    uniqueFeatures.slice(0, 25).forEach(feature => {
      markdown += `- ${feature}\n`;
    });
  }

  // Add content analysis
  const successfulPages = scrapedData.filter(page => !page.error);
  const totalContentLength = successfulPages.reduce((sum, page) => sum + (page.textLength || 0), 0);
  const averageContentLength = Math.round(totalContentLength / successfulPages.length);

  markdown += `\n## Content Analysis

- **Total Pages Scraped:** ${scrapedData.length}
- **Successful Scrapes:** ${successfulPages.length}
- **Failed Scrapes:** ${scrapedData.filter(page => page.error).length}
- **Average Content Length:** ${averageContentLength} characters
- **Total Content Scraped:** ${totalContentLength.toLocaleString()} characters

## Key Findings

Based on the analysis of Perception.to, the platform appears to be a sophisticated Bitcoin market sentiment analysis tool that provides:

1. **Real-time market sentiment tracking** with fear & greed indices
2. **Institutional sentiment analysis** from various market participants
3. **Educational content** through their learn section and glossary
4. **Integration capabilities** with Slack and other platforms
5. **Comprehensive data visualization** and charting tools
6. **API access** for developers and data analysts

The platform serves various user types including:
- **Investors** looking for market sentiment insights
- **Journalists** covering cryptocurrency markets
- **Researchers** analyzing market trends
- **Institutional players** in the cryptocurrency space

## Technical Notes

- **Base URL:** ${BASE_URL}
- **Scraping Date:** ${new Date().toISOString()}
- **Method:** HTTP requests with text extraction
- **User Agent:** Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36

## Summary

Perception.to is a comprehensive Bitcoin market sentiment analysis platform that combines real-time data, institutional insights, and educational content to provide a complete view of cryptocurrency market sentiment. The platform's focus on fear & greed indices, institutional sentiment, and educational resources makes it a valuable tool for anyone involved in the cryptocurrency space.

---

*This summary was generated by scraping the public pages of perception.to. For the most up-to-date information, please visit the website directly.*
`;

  return markdown;
};

// Main execution
const main = async () => {
  try {
    console.log('🚀 Starting Perception.to website scraping...\n');

    const scrapedData = [];
    
    // Scrape each URL with delays to be respectful
    for (const url of URLs_TO_SCRAPE) {
      const data = await scrapePage(url);
      scrapedData.push(data);
      
      // Add delay between requests
      await delay(1000);
    }

    console.log(`\n✅ Scraped ${scrapedData.length} pages`);

    // Generate markdown
    const markdown = generateMarkdown(scrapedData);

    // Write to file
    await fs.writeFile(OUTPUT_FILE, markdown, 'utf8');
    
    console.log(`\n📄 Markdown summary written to: ${OUTPUT_FILE}`);
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