#!/usr/bin/env node

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

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
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n')
    .trim();
};

// Helper function to extract meta tags
const extractMetaTags = ($) => {
  const meta = {};
  $('meta').each((i, el) => {
    const name = $(el).attr('name') || $(el).attr('property');
    const content = $(el).attr('content');
    if (name && content) {
      meta[name] = content;
    }
  });
  return meta;
};

// Helper function to extract structured data
const extractStructuredData = ($) => {
  const structuredData = [];
  $('script[type="application/ld+json"]').each((i, el) => {
    try {
      const data = JSON.parse($(el).html());
      structuredData.push(data);
    } catch (e) {
      // Skip invalid JSON
    }
  });
  return structuredData;
};

// Helper function to extract navigation links
const extractNavigation = ($) => {
  const nav = {
    main: [],
    footer: [],
    social: []
  };

  // Main navigation
  $('nav a, .navbar a, header a').each((i, el) => {
    const href = $(el).attr('href');
    const text = cleanText($(el).text());
    if (href && text && !nav.main.find(item => item.href === href)) {
      nav.main.push({ href, text });
    }
  });

  // Footer links
  $('footer a').each((i, el) => {
    const href = $(el).attr('href');
    const text = cleanText($(el).text());
    if (href && text && !nav.footer.find(item => item.href === href)) {
      nav.footer.push({ href, text });
    }
  });

  // Social links
  $('a[href*="twitter"], a[href*="linkedin"], a[href*="github"], a[href*="youtube"]').each((i, el) => {
    const href = $(el).attr('href');
    const text = cleanText($(el).text());
    if (href && !nav.social.find(item => item.href === href)) {
      nav.social.push({ href, text });
    }
  });

  return nav;
};

// Helper function to extract features
const extractFeatures = ($) => {
  const features = [];
  
  // Look for feature sections
  $('.feature, .feature-card, [class*="feature"], .card').each((i, el) => {
    const title = cleanText($(el).find('h2, h3, h4, .title').first().text());
    const description = cleanText($(el).find('p, .description').first().text());
    
    if (title && description) {
      features.push({ title, description });
    }
  });

  return features;
};

// Helper function to extract testimonials
const extractTestimonials = ($) => {
  const testimonials = [];
  
  $('.testimonial, .quote, blockquote').each((i, el) => {
    const text = cleanText($(el).text());
    const author = cleanText($(el).find('.author, cite, .name').text());
    
    if (text) {
      testimonials.push({ text, author });
    }
  });

  return testimonials;
};

// Helper function to extract pricing information
const extractPricing = ($) => {
  const pricing = [];
  
  $('.pricing-card, .price-card, .plan').each((i, el) => {
    const name = cleanText($(el).find('.plan-name, .name, h3').first().text());
    const price = cleanText($(el).find('.price, .amount').first().text());
    const features = [];
    
    $(el).find('li, .feature-item').each((j, featureEl) => {
      const feature = cleanText($(featureEl).text());
      if (feature) features.push(feature);
    });
    
    if (name) {
      pricing.push({ name, price, features });
    }
  });

  return pricing;
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

    const $ = cheerio.load(response.data);
    
    // Extract page information
    const title = cleanText($('title').text());
    const meta = extractMetaTags($);
    const structuredData = extractStructuredData($);
    const navigation = extractNavigation($);
    const features = extractFeatures($);
    const testimonials = extractTestimonials($);
    const pricing = extractPricing($);
    
    // Extract main content
    const mainContent = cleanText($('main, .main, #main, .content').text());
    const heroContent = cleanText($('.hero, .hero-section, .banner').text());
    
    // Extract headings for structure
    const headings = [];
    $('h1, h2, h3, h4, h5, h6').each((i, el) => {
      const level = el.name;
      const text = cleanText($(el).text());
      if (text) {
        headings.push({ level, text });
      }
    });

    return {
      url,
      title,
      meta,
      structuredData,
      navigation,
      features,
      testimonials,
      pricing,
      mainContent,
      heroContent,
      headings,
      fullUrl
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return {
      url,
      error: error.message,
      fullUrl: url.startsWith('http') ? url : `${BASE_URL}${url}`
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

    markdown += `#### ${index + 1}. ${page.title || page.url}\n`;
    markdown += `**URL:** ${page.fullUrl}\n\n`;

    if (page.meta.description) {
      markdown += `**Description:** ${page.meta.description}\n\n`;
    }

    if (page.heroContent) {
      markdown += `**Hero Content:** ${page.heroContent.substring(0, 200)}...\n\n`;
    }

    if (page.headings.length > 0) {
      markdown += `**Page Structure:**\n`;
      page.headings.slice(0, 10).forEach(heading => {
        const indent = '  '.repeat(parseInt(heading.level) - 1);
        markdown += `${indent}- ${heading.text}\n`;
      });
      markdown += '\n';
    }

    if (page.features.length > 0) {
      markdown += `**Features Found:**\n`;
      page.features.slice(0, 5).forEach(feature => {
        markdown += `- **${feature.title}:** ${feature.description}\n`;
      });
      markdown += '\n';
    }

    if (page.testimonials.length > 0) {
      markdown += `**Testimonials:**\n`;
      page.testimonials.slice(0, 3).forEach(testimonial => {
        markdown += `> "${testimonial.text}"`;
        if (testimonial.author) {
          markdown += ` - ${testimonial.author}`;
        }
        markdown += '\n\n';
      });
    }

    if (page.pricing.length > 0) {
      markdown += `**Pricing Plans:**\n`;
      page.pricing.forEach(plan => {
        markdown += `- **${plan.name}:** ${plan.price}\n`;
        if (plan.features.length > 0) {
          plan.features.slice(0, 3).forEach(feature => {
            markdown += `  - ${feature}\n`;
          });
        }
      });
      markdown += '\n';
    }

    markdown += '---\n\n';
  });

  // Add navigation summary
  const allNav = scrapedData
    .filter(page => page.navigation)
    .map(page => page.navigation)
    .flat();

  if (allNav.length > 0) {
    markdown += `## Navigation Structure

### Main Navigation Links
`;
    const mainLinks = [...new Set(allNav.map(nav => nav.main).flat().map(link => link.href))];
    mainLinks.forEach(link => {
      markdown += `- ${link}\n`;
    });

    markdown += `\n### Footer Links
`;
    const footerLinks = [...new Set(allNav.map(nav => nav.footer).flat().map(link => link.href))];
    footerLinks.forEach(link => {
      markdown += `- ${link}\n`;
    });

    markdown += `\n### Social Media Links
`;
    const socialLinks = [...new Set(allNav.map(nav => nav.social).flat().map(link => link.href))];
    socialLinks.forEach(link => {
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
    const uniqueFeatures = [];
    allFeatures.forEach(feature => {
      const key = feature.title.toLowerCase();
      if (!uniqueFeatures.find(f => f.title.toLowerCase() === key)) {
        uniqueFeatures.push(feature);
      }
    });

    uniqueFeatures.slice(0, 20).forEach(feature => {
      markdown += `### ${feature.title}\n${feature.description}\n\n`;
    });
  }

  // Add testimonials summary
  const allTestimonials = scrapedData
    .filter(page => page.testimonials)
    .map(page => page.testimonials)
    .flat();

  if (allTestimonials.length > 0) {
    markdown += `## Customer Testimonials

`;
    const uniqueTestimonials = [];
    allTestimonials.forEach(testimonial => {
      const key = testimonial.text.substring(0, 50).toLowerCase();
      if (!uniqueTestimonials.find(t => t.text.substring(0, 50).toLowerCase() === key)) {
        uniqueTestimonials.push(testimonial);
      }
    });

    uniqueTestimonials.slice(0, 10).forEach(testimonial => {
      markdown += `> "${testimonial.text}"`;
      if (testimonial.author) {
        markdown += `\n> — ${testimonial.author}`;
      }
      markdown += '\n\n';
    });
  }

  // Add pricing summary
  const allPricing = scrapedData
    .filter(page => page.pricing)
    .map(page => page.pricing)
    .flat();

  if (allPricing.length > 0) {
    markdown += `## Pricing Information

`;
    const uniquePricing = [];
    allPricing.forEach(plan => {
      const key = plan.name.toLowerCase();
      if (!uniquePricing.find(p => p.name.toLowerCase() === key)) {
        uniquePricing.push(plan);
      }
    });

    uniquePricing.forEach(plan => {
      markdown += `### ${plan.name}\n`;
      if (plan.price) {
        markdown += `**Price:** ${plan.price}\n\n`;
      }
      if (plan.features.length > 0) {
        markdown += `**Features:**\n`;
        plan.features.forEach(feature => {
          markdown += `- ${feature}\n`;
        });
      }
      markdown += '\n';
    });
  }

  markdown += `## Technical Notes

- **Base URL:** ${BASE_URL}
- **Total Pages Scraped:** ${scrapedData.length}
- **Successful Scrapes:** ${scrapedData.filter(page => !page.error).length}
- **Failed Scrapes:** ${scrapedData.filter(page => page.error).length}
- **Scraping Date:** ${new Date().toISOString()}

## Summary

Perception.to is a sophisticated Bitcoin market sentiment analysis platform that provides:

1. **Real-time market sentiment tracking** with fear & greed indices
2. **Institutional sentiment analysis** from various market participants
3. **Educational content** through their learn section and glossary
4. **Integration capabilities** with Slack and other platforms
5. **Comprehensive data visualization** and charting tools
6. **API access** for developers and data analysts

The platform serves various user types including investors, journalists, researchers, and institutional players in the cryptocurrency space.

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
    const totalTestimonials = successfulPages
      .map(page => page.testimonials?.length || 0)
      .reduce((sum, count) => sum + count, 0);

    console.log(`   - Features found: ${totalFeatures}`);
    console.log(`   - Testimonials found: ${totalTestimonials}`);

  } catch (error) {
    console.error('❌ Scraping failed:', error.message);
    process.exit(1);
  }
};

// Run the script
main(); 