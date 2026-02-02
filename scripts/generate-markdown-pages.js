/**
 * Generate Markdown Pages for AI Agent Discovery
 *
 * This script generates markdown versions of all pages for AI agents/crawlers.
 * Run during build: npm run markdown:generate
 */

import TurndownService from 'turndown';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Initialize Turndown for HTML to Markdown conversion
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
});

// Custom rules for better Ghost HTML handling
turndown.addRule('figure', {
  filter: 'figure',
  replacement: function(content, node) {
    const img = node.querySelector('img');
    const figcaption = node.querySelector('figcaption');
    if (img) {
      const alt = img.getAttribute('alt') || '';
      const src = img.getAttribute('src') || '';
      let result = `![${alt}](${src})`;
      if (figcaption) {
        result += `\n*${figcaption.textContent.trim()}*`;
      }
      return `\n\n${result}\n\n`;
    }
    return content;
  }
});

// Remove Ghost signup forms and card elements
turndown.addRule('removeSignupCards', {
  filter: function(node) {
    return node.classList && (
      node.classList.contains('kg-signup-card') ||
      node.classList.contains('kg-signup-card-form')
    );
  },
  replacement: function() {
    return '';
  }
});

// Handle Ghost callout cards
turndown.addRule('calloutCard', {
  filter: function(node) {
    return node.classList && node.classList.contains('kg-callout-card');
  },
  replacement: function(content, node) {
    const text = node.querySelector('.kg-callout-text');
    if (text) {
      const cleaned = turndown.turndown(text.innerHTML);
      return `\n\n> ${cleaned.replace(/\n/g, '\n> ')}\n\n`;
    }
    return content;
  }
});

/**
 * Load JSON data files
 */
function loadGhostPosts() {
  const path = join(ROOT_DIR, 'src/data/ghost-posts.json');
  if (!existsSync(path)) {
    console.warn('ghost-posts.json not found, skipping research posts');
    return { posts: [] };
  }
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function loadSentimentCache() {
  const path = join(ROOT_DIR, 'functions/sentiment-cache.json');
  if (!existsSync(path)) {
    console.warn('sentiment-cache.json not found, skipping sentiment pages');
    return { daily: {}, monthly: {} };
  }
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function loadPageSeo() {
  // Import PAGE_SEO from seo-config.js
  const seoConfigPath = join(ROOT_DIR, 'functions/seo-config.js');
  const content = readFileSync(seoConfigPath, 'utf-8');

  // Extract PAGE_SEO object using regex (since we can't dynamically import ES modules easily)
  const match = content.match(/export const PAGE_SEO = ({[\s\S]*?});/);
  if (!match) {
    console.warn('Could not parse PAGE_SEO from seo-config.js');
    return {};
  }

  // This is a simplified approach - for complex objects, use dynamic import
  // For now, we'll define the pages manually based on the known structure
  return {
    '/': {
      title: 'Perception | Bitcoin & Crypto Media Intelligence Platform',
      description: 'Track Bitcoin and crypto narratives across 250+ media sources. Real-time sentiment analysis, media monitoring, and intelligence reports.'
    },
    '/bitcoin-fear-greed-index': {
      title: 'Bitcoin Fear & Greed Index - Real-Time Market Sentiment',
      description: 'Track Bitcoin market sentiment with our real-time Fear & Greed Index. Updated every 90 seconds from 450+ sources.'
    },
    '/bitcoin-market-sentiment': {
      title: 'Bitcoin Market Sentiment Analysis - Daily Updates',
      description: 'Get comprehensive Bitcoin market sentiment analysis updated daily. Track investor psychology, fear & greed, and market narratives.'
    },
    '/pricing': {
      title: 'Pricing - Perception | Crypto Media Intelligence Plans',
      description: 'Simple, transparent pricing for crypto media monitoring. Start free, upgrade when ready.'
    },
    '/about': {
      title: 'About Perception | Bitcoin & Crypto Media Intelligence',
      description: 'Learn about Perception, the intelligence workspace for Bitcoin and crypto.'
    },
    '/methodology': {
      title: 'Methodology | How Perception Analyzes Crypto Sentiment',
      description: 'Learn how Perception analyzes crypto market sentiment. Our methodology covers 450+ sources.'
    },
    '/crypto-conferences': {
      title: 'Crypto Conferences 2025-2026 | Bitcoin & Blockchain Events Calendar',
      description: 'Complete list of crypto conferences and blockchain events for 2025-2026.'
    },
    '/bitcoin-media-research': {
      title: 'Bitcoin Media Research | Analysis & Reports',
      description: 'In-depth Bitcoin media analysis and research reports from Perception.'
    },
    '/journalist': {
      title: 'Perception for Journalists | Crypto Media Monitoring Tool',
      description: 'The crypto media monitoring tool built for journalists. Track narratives and stay ahead.'
    },
    '/investor': {
      title: 'Perception for Investors | Crypto Sentiment Analysis Tool',
      description: 'Professional crypto sentiment analysis for investors. Track market psychology.'
    },
    '/docs': {
      title: 'Documentation | Perception API & Platform Guide',
      description: 'Comprehensive documentation for the Perception platform.'
    },
    '/api': {
      title: 'API | Perception Crypto Sentiment API',
      description: 'Access real-time crypto sentiment data via API. REST endpoints, webhooks, and SDKs.'
    }
  };
}

/**
 * Ensure directory exists
 */
function ensureDir(filePath) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

/**
 * Format date for frontmatter
 */
function formatDate(dateString) {
  if (!dateString) return new Date().toISOString().split('T')[0];
  return new Date(dateString).toISOString().split('T')[0];
}

/**
 * Convert Ghost post to Markdown
 */
function convertPostToMarkdown(post) {
  const title = post.title || 'Untitled';
  const date = formatDate(post.published_at);
  const author = post.primary_author?.name || 'Perception';
  const tags = (post.tags || [])
    .filter(t => t.visibility === 'public')
    .map(t => t.name);
  const description = post.custom_excerpt || post.excerpt || '';
  const url = `https://perception.to/bitcoin-media-research/${post.slug}`;
  const featureImage = post.feature_image || '';

  // Convert HTML to Markdown
  let content = '';
  if (post.html) {
    try {
      content = turndown.turndown(post.html);
    } catch (e) {
      console.warn(`Failed to convert HTML for ${post.slug}:`, e.message);
      content = post.excerpt || '';
    }
  }

  // Build frontmatter
  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: ${date}`,
    `author: ${author}`,
    `tags: [${tags.map(t => `"${t}"`).join(', ')}]`,
    `url: ${url}`,
    description ? `description: "${description.replace(/"/g, '\\"')}"` : '',
    featureImage ? `image: ${featureImage}` : '',
    '---',
  ].filter(Boolean).join('\n');

  return `${frontmatter}\n\n# ${title}\n\n${content}`;
}

/**
 * Generate Markdown for static pages
 */
function generateStaticPageMarkdown(path, seo) {
  const title = seo.title || 'Perception';
  const description = seo.description || '';
  const url = `https://perception.to${path}`;
  const date = new Date().toISOString().split('T')[0];

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: ${date}`,
    `url: ${url}`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    '---',
  ].join('\n');

  // Generate basic content structure based on page type
  let content = `# ${title.split(' | ')[0]}\n\n${description}\n\n`;
  content += `Visit the full page at: [${url}](${url})`;

  return `${frontmatter}\n\n${content}`;
}

/**
 * Generate Markdown for sentiment pages
 */
function generateSentimentMarkdown(date, data, type = 'daily') {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

  if (type === 'daily') {
    const [year, month, day] = date.split('-');
    const monthName = monthNames[parseInt(month, 10) - 1];
    const displayDate = `${monthName} ${parseInt(day, 10)}, ${year}`;
    const url = `https://perception.to/bitcoin-market-sentiment/${year}/${monthName.toLowerCase()}/${parseInt(day, 10)}`;

    const frontmatter = [
      '---',
      `title: "Bitcoin Market Sentiment - ${displayDate}"`,
      `date: ${date}`,
      `url: ${url}`,
      `score: ${Math.round(data.score)}`,
      `category: "${data.category}"`,
      `sources: ${data.total}`,
      '---',
    ].join('\n');

    let content = `# Bitcoin Market Sentiment - ${displayDate}\n\n`;
    content += `## Fear & Greed Index: ${Math.round(data.score)}/100 (${data.category})\n\n`;
    content += `Based on analysis of ${data.total.toLocaleString()} sources.\n\n`;
    content += `### Source Breakdown\n\n`;
    content += `- **Positive signals:** ${data.positive}\n`;
    content += `- **Neutral signals:** ${data.neutral}\n`;
    content += `- **Negative signals:** ${data.negative}\n\n`;
    content += `### Interpretation\n\n`;

    // Match thresholds with the sentiment cache categorization
    const score = Math.round(data.score);
    if (score < 30) {
      content += `Markets showed **fear** with a score of ${score}/100. Investors were cautious.`;
    } else if (score <= 70) {
      content += `Markets remained **neutral** with a balanced score of ${score}/100. Mixed signals were observed.`;
    } else {
      content += `Markets displayed **greed** with a score of ${score}/100. Bullish sentiment dominated.`;
    }

    content += `\n\n---\n\nData provided by [Perception](https://perception.to) - Intelligence Workspace for Bitcoin & Crypto`;

    return `${frontmatter}\n\n${content}`;
  }

  if (type === 'monthly') {
    const [year, month] = date.split('-');
    const monthName = monthNames[parseInt(month, 10) - 1];
    const displayDate = `${monthName} ${year}`;
    const url = `https://perception.to/bitcoin-market-sentiment/${year}/${monthName.toLowerCase()}`;

    const frontmatter = [
      '---',
      `title: "Bitcoin Market Sentiment - ${displayDate}"`,
      `date: ${date}-01`,
      `url: ${url}`,
      `avgScore: ${data.avgScore}`,
      `category: "${data.category}"`,
      `totalSources: ${data.totalSources}`,
      `days: ${data.days}`,
      '---',
    ].join('\n');

    let content = `# Bitcoin Market Sentiment - ${displayDate}\n\n`;
    content += `## Monthly Average: ${data.avgScore}/100 (${data.category})\n\n`;
    content += `Based on ${data.days} days of data from ${data.totalSources.toLocaleString()} total sources.\n\n`;
    content += `### Monthly Breakdown\n\n`;
    content += `- **Fear days (score < 30):** ${data.fearDays}\n`;
    content += `- **Neutral days (score 30-70):** ${data.neutralDays}\n`;
    content += `- **Greed days (score > 70):** ${data.greedDays}\n\n`;
    content += `### Summary\n\n`;
    content += `In ${displayDate}, Bitcoin market sentiment averaged **${data.avgScore}/100**, classified as **${data.category}**. `;
    content += `The month saw ${data.fearDays} days of fear, ${data.neutralDays} neutral days, and ${data.greedDays} days of greed.`;
    content += `\n\n---\n\nData provided by [Perception](https://perception.to) - Intelligence Workspace for Bitcoin & Crypto`;

    return `${frontmatter}\n\n${content}`;
  }

  return '';
}

/**
 * Slugify path for filename
 */
function slugifyPath(path) {
  if (path === '/') return 'home';
  return path.replace(/^\//, '').replace(/\//g, '-').replace(/[^a-z0-9-]/gi, '') || 'page';
}

/**
 * Main generation function
 */
async function generateMarkdownPages() {
  console.log('Generating Markdown pages for AI agents...\n');

  const outputDir = join(ROOT_DIR, 'dist/markdown');
  let totalGenerated = 0;
  let skipped = 0;

  // 1. Generate research post markdown
  console.log('1. Generating research post markdown...');
  const ghostData = loadGhostPosts();
  const researchDir = join(outputDir, 'research');

  for (const post of ghostData.posts) {
    // Skip members-only posts
    if (post.visibility === 'members') {
      skipped++;
      continue;
    }

    // Skip posts without content
    if (!post.html || post.html.trim() === '') {
      skipped++;
      continue;
    }

    const markdown = convertPostToMarkdown(post);
    const filePath = join(researchDir, `${post.slug}.md`);
    ensureDir(filePath);
    writeFileSync(filePath, markdown);
    totalGenerated++;
  }
  console.log(`   Generated ${totalGenerated} research posts (${skipped} skipped)`);

  // 2. Generate static page markdown
  console.log('2. Generating static page markdown...');
  const pageSeo = loadPageSeo();
  const pagesDir = join(outputDir, 'pages');
  let pageCount = 0;

  for (const [path, seo] of Object.entries(pageSeo)) {
    const markdown = generateStaticPageMarkdown(path, seo);
    const filename = slugifyPath(path);
    const filePath = join(pagesDir, `${filename}.md`);
    ensureDir(filePath);
    writeFileSync(filePath, markdown);
    pageCount++;
    totalGenerated++;
  }
  console.log(`   Generated ${pageCount} static pages`);

  // 3. Generate sentiment page markdown
  console.log('3. Generating sentiment page markdown...');
  const sentimentData = loadSentimentCache();
  const sentimentDir = join(outputDir, 'sentiment');
  let dailyCount = 0;
  let monthlyCount = 0;

  // Daily sentiment pages
  for (const [date, data] of Object.entries(sentimentData.daily || {})) {
    const markdown = generateSentimentMarkdown(date, data, 'daily');
    const filePath = join(sentimentDir, 'daily', `${date}.md`);
    ensureDir(filePath);
    writeFileSync(filePath, markdown);
    dailyCount++;
    totalGenerated++;
  }

  // Monthly sentiment pages
  for (const [date, data] of Object.entries(sentimentData.monthly || {})) {
    const markdown = generateSentimentMarkdown(date, data, 'monthly');
    const filePath = join(sentimentDir, 'monthly', `${date}.md`);
    ensureDir(filePath);
    writeFileSync(filePath, markdown);
    monthlyCount++;
    totalGenerated++;
  }
  console.log(`   Generated ${dailyCount} daily + ${monthlyCount} monthly sentiment pages`);

  console.log(`\nTotal: ${totalGenerated} markdown files generated in ${outputDir}`);
}

// Run the generator
generateMarkdownPages().catch(console.error);
