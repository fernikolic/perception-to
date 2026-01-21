/**
 * Cloudflare Pages Middleware for SEO
 *
 * Injects page-specific meta tags and structured data for search engine crawlers.
 * This ensures proper SEO even for a client-side React SPA.
 */

import { PAGE_SEO, SOCIAL_IMAGES, DEFAULT_IMAGE, DEFAULT_SEO } from './seo-config.js';
import { RESEARCH_OG_DATA, DEFAULT_RESEARCH_IMAGE } from './research-og-data.js';
import sentimentCache from './sentiment-cache.json' assert { type: 'json' };

// Month names for URL parsing
const MONTH_NAMES = ['january', 'february', 'march', 'april', 'may', 'june',
                     'july', 'august', 'september', 'october', 'november', 'december'];

/**
 * Resolve a URL path to its corresponding markdown file path
 * @param {string} path - The URL path (without .md suffix)
 * @returns {string} - The path to the markdown file in /markdown/
 */
function resolveMarkdownPath(path) {
  // Research posts: /bitcoin-media-research/slug → /markdown/research/slug.md
  const researchMatch = path.match(/^\/(research|bitcoin-media-research)\/([^/]+)$/);
  if (researchMatch) {
    return `/markdown/research/${researchMatch[2]}.md`;
  }

  // Daily sentiment: /bitcoin-market-sentiment/2025/january/15 → /markdown/sentiment/daily/2025-01-15.md
  const monthPattern = MONTH_NAMES.join('|');
  const dailyMatch = path.match(new RegExp(`^/bitcoin-market-sentiment/(\\d{4})/(${monthPattern})/(\\d{1,2})$`, 'i'));
  if (dailyMatch) {
    const [, year, month, day] = dailyMatch;
    const monthIndex = MONTH_NAMES.indexOf(month.toLowerCase()) + 1;
    const isoDate = `${year}-${String(monthIndex).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return `/markdown/sentiment/daily/${isoDate}.md`;
  }

  // Monthly sentiment: /bitcoin-market-sentiment/2025/january → /markdown/sentiment/monthly/2025-01.md
  const monthlyMatch = path.match(new RegExp(`^/bitcoin-market-sentiment/(\\d{4})/(${monthPattern})$`, 'i'));
  if (monthlyMatch) {
    const [, year, month] = monthlyMatch;
    const monthIndex = MONTH_NAMES.indexOf(month.toLowerCase()) + 1;
    return `/markdown/sentiment/monthly/${year}-${String(monthIndex).padStart(2, '0')}.md`;
  }

  // Static pages: /methodology → /markdown/pages/methodology.md
  // Handle root path specially
  if (path === '/' || path === '') {
    return '/markdown/pages/home.md';
  }

  // Other static pages
  const slug = path.replace(/^\//, '').replace(/\//g, '-').replace(/[^a-z0-9-]/gi, '') || 'home';
  return `/markdown/pages/${slug}.md`;
}

/**
 * Get the markdown URL for a given path (for alternate link)
 * @param {string} path - The URL path
 * @returns {string} - The .md URL
 */
function getMarkdownUrl(path) {
  // Normalize path
  const normalizedPath = path === '/' ? '' : path.replace(/\/$/, '');
  return `${normalizedPath}.md`;
}

// Escape HTML entities to prevent breaking meta tags
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Check if request is from a search engine or social crawler
function isBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return (
    // Search engines
    ua.includes('googlebot') ||
    ua.includes('bingbot') ||
    ua.includes('yandex') ||
    ua.includes('baiduspider') ||
    ua.includes('duckduckbot') ||
    ua.includes('slurp') ||
    ua.includes('ia_archiver') ||
    // Social media
    ua.includes('facebookexternalhit') ||
    ua.includes('twitterbot') ||
    ua.includes('linkedinbot') ||
    ua.includes('slackbot') ||
    ua.includes('whatsapp') ||
    ua.includes('telegrambot') ||
    ua.includes('pinterest') ||
    ua.includes('discordbot') ||
    // AI crawlers
    ua.includes('gptbot') ||
    ua.includes('chatgpt') ||
    ua.includes('anthropic') ||
    ua.includes('claude') ||
    ua.includes('perplexity')
  );
}

// Get SEO config for a path (handles dynamic routes)
function getSeoConfig(path) {
  // Exact match first
  if (PAGE_SEO[path]) {
    return PAGE_SEO[path];
  }

  // Handle dynamic routes
  if (path.startsWith('/bitcoin-market-sentiment/')) {
    // Match URLs like /bitcoin-market-sentiment/2025/july/20 (daily) or /bitcoin-market-sentiment/2025/july (monthly)
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const monthPattern = monthNames.join('|');

    // Try daily pattern first: /year/month/day
    const dailyMatch = path.match(new RegExp(`/bitcoin-market-sentiment/(\\d{4})/(${monthPattern})/(\\d{1,2})$`, 'i'));
    if (dailyMatch) {
      const [, year, month, day] = dailyMatch;
      const normalizedMonth = month.toLowerCase();
      const capitalizedMonth = normalizedMonth.charAt(0).toUpperCase() + normalizedMonth.slice(1);
      const displayDate = `${capitalizedMonth} ${day}, ${year}`;
      // Canonical should always use lowercase month
      const canonicalPath = `/bitcoin-market-sentiment/${year}/${normalizedMonth}/${day}`;

      return {
        title: `Bitcoin Market Sentiment ${displayDate} - Daily Analysis | Perception`,
        description: `Detailed Bitcoin market sentiment analysis for ${displayDate}. Track fear & greed index, social media trends, and institutional sentiment.`,
        keywords: `bitcoin market sentiment ${displayDate}, bitcoin fear greed index ${displayDate}, crypto sentiment analysis`,
        canonical: `https://perception.to${canonicalPath}`,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `Bitcoin Market Sentiment ${displayDate}`,
          description: `Bitcoin market sentiment data for ${displayDate}`,
          datePublished: `${year}-${String(monthNames.indexOf(normalizedMonth) + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          author: {
            '@type': 'Organization',
            name: 'Perception',
            url: 'https://perception.to'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Perception',
            logo: {
              '@type': 'ImageObject',
              url: 'https://perception.to/logos/perception-logo-dark.png'
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://perception.to${canonicalPath}`
          }
        }
      };
    }

    // Try monthly pattern: /year/month
    const monthlyMatch = path.match(new RegExp(`/bitcoin-market-sentiment/(\\d{4})/(${monthPattern})$`, 'i'));
    if (monthlyMatch) {
      const [, year, month] = monthlyMatch;
      const normalizedMonth = month.toLowerCase();
      const capitalizedMonth = normalizedMonth.charAt(0).toUpperCase() + normalizedMonth.slice(1);
      const displayDate = `${capitalizedMonth} ${year}`;
      // Canonical should always use lowercase month
      const canonicalPath = `/bitcoin-market-sentiment/${year}/${normalizedMonth}`;

      return {
        title: `Bitcoin Market Sentiment ${displayDate} - Monthly Analysis | Perception`,
        description: `Comprehensive Bitcoin market sentiment analysis for ${displayDate}. Track fear & greed index, social media trends, and institutional sentiment.`,
        keywords: `bitcoin market sentiment ${displayDate}, bitcoin fear greed index ${displayDate}, crypto sentiment analysis`,
        canonical: `https://perception.to${canonicalPath}`,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Dataset',
          name: `Bitcoin Market Sentiment ${displayDate}`,
          description: `Bitcoin market sentiment data for ${displayDate}`,
          temporalCoverage: `${year}-${String(monthNames.indexOf(normalizedMonth) + 1).padStart(2, '0')}`
        }
      };
    }
  }

  if (path.startsWith('/crypto-conferences/')) {
    // Handle conference pages like /crypto-conferences/2025/bitcoin-amsterdam
    const match = path.match(/\/crypto-conferences\/(\d{4})\/(.+)/);
    if (match) {
      const [, year, slug] = match;
      const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return {
        title: `${name} ${year} | Crypto Conference Details | Perception`,
        description: `Complete guide to ${name} ${year}. Dates, location, speakers, tickets, and everything you need to know.`,
        keywords: `${name} ${year}, ${slug} conference, crypto conference ${year}`,
        canonical: `https://perception.to${path}`,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: `${name} ${year}`,
          url: `https://perception.to${path}`
        }
      };
    }
  }

  // Handle research post pages: /research/[slug] and /bitcoin-media-research/[slug]
  const researchMatch = path.match(/^\/(research|bitcoin-media-research)\/([^/]+)$/);
  if (researchMatch) {
    const [, section, slug] = researchMatch;
    const postData = RESEARCH_OG_DATA[slug];

    if (postData) {
      return {
        title: `${postData.title} | Perception Research`,
        description: postData.description,
        keywords: postData.tags?.join(', ') || 'bitcoin research, crypto analysis',
        canonical: `https://perception.to/${section}/${slug}`,
        image: postData.image || DEFAULT_RESEARCH_IMAGE,
        isArticle: true,
        article: {
          publishedTime: postData.publishedAt,
          modifiedTime: postData.updatedAt,
          author: postData.author,
          tags: postData.tags
        },
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: postData.title,
          description: postData.description,
          image: postData.image || DEFAULT_RESEARCH_IMAGE,
          datePublished: postData.publishedAt,
          dateModified: postData.updatedAt,
          author: {
            '@type': 'Person',
            name: postData.author
          },
          publisher: {
            '@type': 'Organization',
            name: 'Perception',
            url: 'https://perception.to',
            logo: {
              '@type': 'ImageObject',
              url: 'https://perception.to/logos/perception-logo-dark.png'
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://perception.to/${section}/${slug}`
          }
        }
      };
    }
  }

  // Return default for unconfigured pages
  return {
    ...DEFAULT_SEO,
    canonical: `https://perception.to${path}`
  };
}

// Generate SSR content for sentiment pages (visible to crawlers)
// Uses real cached data from sentiment-cache.json
function generateSentimentPageContent(path) {
  // Only generate for sentiment pages
  if (!path.startsWith('/bitcoin-market-sentiment/')) {
    return '';
  }

  const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const monthPattern = monthNames.join('|');

  // Check for daily page
  const dailyMatch = path.match(new RegExp(`/bitcoin-market-sentiment/(\\d{4})/(${monthPattern})/(\\d{1,2})$`, 'i'));
  if (dailyMatch) {
    const [, year, month, day] = dailyMatch;
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    const displayDate = `${capitalizedMonth} ${day}, ${year}`;
    const monthIndex = monthNames.indexOf(month.toLowerCase());
    const isoDate = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Get real data from cache
    const dayData = sentimentCache.daily?.[isoDate];
    const hasData = dayData && dayData.score !== undefined;

    // Build data-driven content
    const score = hasData ? Math.round(dayData.score) : null;
    const category = hasData ? dayData.category : null;
    const totalSources = hasData ? dayData.total : null;
    const positive = hasData ? dayData.positive : null;
    const negative = hasData ? dayData.negative : null;

    // Generate sentiment-specific description
    let sentimentDescription = '';
    if (hasData) {
      if (score <= 25) {
        sentimentDescription = `Markets showed <strong>extreme fear</strong> with a score of ${score}/100. Investors were highly cautious, with ${negative} negative signals out of ${totalSources} sources analyzed.`;
      } else if (score <= 45) {
        sentimentDescription = `Markets displayed <strong>fear</strong> with a score of ${score}/100. Cautious sentiment prevailed across ${totalSources} analyzed sources.`;
      } else if (score <= 55) {
        sentimentDescription = `Markets remained <strong>neutral</strong> with a balanced score of ${score}/100. Mixed signals were observed across ${totalSources} sources.`;
      } else if (score <= 75) {
        sentimentDescription = `Markets showed <strong>greed</strong> with an optimistic score of ${score}/100. Bullish sentiment dominated with ${positive} positive signals from ${totalSources} sources.`;
      } else {
        sentimentDescription = `Markets displayed <strong>extreme greed</strong> with a score of ${score}/100. Strong bullish sentiment was detected across ${totalSources} sources with ${positive} positive signals.`;
      }
    }

    // Score display section
    const scoreSection = hasData ? `
        <section style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 32px; margin-bottom: 32px; color: white; text-align: center;">
          <h2 style="font-size: 1.25rem; font-weight: 500; margin-bottom: 16px; opacity: 0.9;">Fear & Greed Index</h2>
          <div style="font-size: 4rem; font-weight: 700; margin-bottom: 8px;">${score}</div>
          <div style="font-size: 1.5rem; font-weight: 600; color: ${score <= 45 ? '#f87171' : score >= 55 ? '#4ade80' : '#fbbf24'};">${category}</div>
          <p style="margin-top: 16px; opacity: 0.8; font-size: 0.875rem;">Based on analysis of ${totalSources.toLocaleString()} sources</p>
        </section>` : '';

    return `
    <article id="ssr-content" style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, -apple-system, sans-serif;">
      <header style="text-align: center; margin-bottom: 40px;">
        <nav style="margin-bottom: 20px;">
          <a href="/bitcoin-market-sentiment" style="color: #3b82f6; text-decoration: none;">Bitcoin Market Sentiment</a>
          <span style="margin: 0 8px; color: #64748b;">›</span>
          <a href="/bitcoin-market-sentiment/${year}/${month.toLowerCase()}" style="color: #3b82f6; text-decoration: none;">${capitalizedMonth} ${year}</a>
          <span style="margin: 0 8px; color: #64748b;">›</span>
          <span style="color: #64748b;">${displayDate}</span>
        </nav>
        <h1 style="font-size: 2.5rem; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Bitcoin Market Sentiment - ${displayDate}${hasData ? `: ${category} (${score}/100)` : ''}</h1>
        <p style="font-size: 1.25rem; color: #64748b; max-width: 800px; margin: 0 auto;">
          ${hasData ? `Bitcoin Fear & Greed Index was <strong>${score}</strong> (${category}) on ${displayDate}, based on ${totalSources.toLocaleString()} sources.` : `Daily Bitcoin sentiment analysis for ${displayDate}.`}
        </p>
        <time datetime="${isoDate}" style="display: block; margin-top: 16px; color: #94a3b8; font-size: 0.875rem;">Published: ${displayDate}</time>
      </header>

      <main>
        ${scoreSection}

        <section style="background: #f8fafc; border-radius: 16px; padding: 32px; margin-bottom: 32px;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #0f172a; margin-bottom: 16px;">Daily Sentiment Analysis</h2>
          <p style="color: #475569; line-height: 1.75;">
            ${hasData ? sentimentDescription : `This page provides Bitcoin market sentiment analysis for ${displayDate}.`}
          </p>
          <p style="color: #475569; line-height: 1.75; margin-top: 16px;">
            The Bitcoin Fear & Greed Index measures investor sentiment on a scale of 0-100, where 0 represents
            extreme fear and 100 represents extreme greed. ${hasData ? `On ${displayDate}, the market sentiment was classified as <strong>${category}</strong>.` : ''}
          </p>
        </section>

        ${hasData ? `
        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #0f172a; margin-bottom: 16px;">Source Breakdown</h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
            <div style="background: #dcfce7; padding: 20px; border-radius: 12px; text-align: center;">
              <div style="font-size: 2rem; font-weight: 700; color: #16a34a;">${positive}</div>
              <div style="color: #15803d; font-size: 0.875rem;">Positive Signals</div>
            </div>
            <div style="background: #fef3c7; padding: 20px; border-radius: 12px; text-align: center;">
              <div style="font-size: 2rem; font-weight: 700; color: #ca8a04;">${dayData.neutral}</div>
              <div style="color: #a16207; font-size: 0.875rem;">Neutral Signals</div>
            </div>
            <div style="background: #fee2e2; padding: 20px; border-radius: 12px; text-align: center;">
              <div style="font-size: 2rem; font-weight: 700; color: #dc2626;">${negative}</div>
              <div style="color: #b91c1c; font-size: 0.875rem;">Negative Signals</div>
            </div>
          </div>
        </section>` : ''}

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #0f172a; margin-bottom: 16px;">Related Analysis</h2>
          <ul style="color: #475569; line-height: 2; padding-left: 24px;">
            <li><a href="/bitcoin-market-sentiment/${year}/${month.toLowerCase()}" style="color: #3b82f6;">${capitalizedMonth} ${year} Monthly Overview</a></li>
            <li><a href="/bitcoin-fear-greed-index" style="color: #3b82f6;">Live Bitcoin Fear & Greed Index</a></li>
            <li><a href="/bitcoin-market-sentiment" style="color: #3b82f6;">Historical Sentiment Archive</a></li>
            <li><a href="/bitcoin-media-research" style="color: #3b82f6;">Bitcoin Media Research</a></li>
          </ul>
        </section>
      </main>

      <footer style="text-align: center; padding-top: 32px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 0.875rem;">
        <p>Data provided by <a href="https://perception.to" style="color: #3b82f6;">Perception</a> - Intelligence Workspace for Bitcoin & Crypto</p>
        <p style="margin-top: 8px;">Updated daily from 650+ sources</p>
      </footer>
    </article>
    <script>
      // Hide SSR content once React app loads
      if (document.getElementById('root')) {
        var observer = new MutationObserver(function(mutations) {
          var root = document.getElementById('root');
          if (root && root.children.length > 0) {
            var ssrContent = document.getElementById('ssr-content');
            if (ssrContent) ssrContent.style.display = 'none';
            observer.disconnect();
          }
        });
        observer.observe(document.getElementById('root'), { childList: true });
      }
    </script>`;
  }

  // Check for monthly page
  const monthlyMatch = path.match(new RegExp(`/bitcoin-market-sentiment/(\\d{4})/(${monthPattern})$`, 'i'));
  if (monthlyMatch) {
    const [, year, month] = monthlyMatch;
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    const displayDate = `${capitalizedMonth} ${year}`;
    const monthIndex = monthNames.indexOf(month.toLowerCase());
    const monthKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;

    // Get real monthly data from cache
    const monthData = sentimentCache.monthly?.[monthKey];
    const hasData = monthData && monthData.avgScore !== undefined;

    const avgScore = hasData ? monthData.avgScore : null;
    const category = hasData ? monthData.category : null;
    const totalSources = hasData ? monthData.totalSources : null;
    const fearDays = hasData ? monthData.fearDays : null;
    const greedDays = hasData ? monthData.greedDays : null;
    const neutralDays = hasData ? monthData.neutralDays : null;
    const totalDays = hasData ? monthData.days : null;

    const scoreSection = hasData ? `
        <section style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 32px; margin-bottom: 32px; color: white; text-align: center;">
          <h2 style="font-size: 1.25rem; font-weight: 500; margin-bottom: 16px; opacity: 0.9;">Monthly Average</h2>
          <div style="font-size: 4rem; font-weight: 700; margin-bottom: 8px;">${avgScore}</div>
          <div style="font-size: 1.5rem; font-weight: 600; color: ${avgScore <= 45 ? '#f87171' : avgScore >= 55 ? '#4ade80' : '#fbbf24'};">${category}</div>
          <p style="margin-top: 16px; opacity: 0.8; font-size: 0.875rem;">Based on ${totalDays} days of data from ${totalSources.toLocaleString()} total sources</p>
        </section>` : '';

    return `
    <article id="ssr-content" style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, -apple-system, sans-serif;">
      <header style="text-align: center; margin-bottom: 40px;">
        <nav style="margin-bottom: 20px;">
          <a href="/bitcoin-market-sentiment" style="color: #3b82f6; text-decoration: none;">Bitcoin Market Sentiment</a>
          <span style="margin: 0 8px; color: #64748b;">›</span>
          <span style="color: #64748b;">${displayDate}</span>
        </nav>
        <h1 style="font-size: 2.5rem; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Bitcoin Market Sentiment - ${displayDate}${hasData ? `: ${category} (Avg: ${avgScore}/100)` : ''}</h1>
        <p style="font-size: 1.25rem; color: #64748b; max-width: 800px; margin: 0 auto;">
          ${hasData ? `Bitcoin averaged a Fear & Greed score of <strong>${avgScore}</strong> (${category}) in ${displayDate}, with ${fearDays} fear days, ${greedDays} greed days, and ${neutralDays} neutral days.` : `Monthly Bitcoin sentiment analysis for ${displayDate}.`}
        </p>
      </header>

      <main>
        ${scoreSection}

        ${hasData ? `
        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #0f172a; margin-bottom: 16px;">Monthly Breakdown</h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
            <div style="background: #fee2e2; padding: 20px; border-radius: 12px; text-align: center;">
              <div style="font-size: 2rem; font-weight: 700; color: #dc2626;">${fearDays}</div>
              <div style="color: #b91c1c; font-size: 0.875rem;">Fear Days</div>
              <div style="color: #64748b; font-size: 0.75rem; margin-top: 4px;">Score below 30</div>
            </div>
            <div style="background: #fef3c7; padding: 20px; border-radius: 12px; text-align: center;">
              <div style="font-size: 2rem; font-weight: 700; color: #ca8a04;">${neutralDays}</div>
              <div style="color: #a16207; font-size: 0.875rem;">Neutral Days</div>
              <div style="color: #64748b; font-size: 0.75rem; margin-top: 4px;">Score 30-70</div>
            </div>
            <div style="background: #dcfce7; padding: 20px; border-radius: 12px; text-align: center;">
              <div style="font-size: 2rem; font-weight: 700; color: #16a34a;">${greedDays}</div>
              <div style="color: #15803d; font-size: 0.875rem;">Greed Days</div>
              <div style="color: #64748b; font-size: 0.75rem; margin-top: 4px;">Score above 70</div>
            </div>
          </div>
        </section>` : ''}

        <section style="background: #f8fafc; border-radius: 16px; padding: 32px; margin-bottom: 32px;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #0f172a; margin-bottom: 16px;">Monthly Analysis</h2>
          <p style="color: #475569; line-height: 1.75;">
            ${hasData ? `In ${displayDate}, Bitcoin market sentiment averaged <strong>${avgScore}/100</strong>, classified as <strong>${category}</strong>. The month saw ${fearDays} days of fear (score below 30), ${neutralDays} neutral days, and ${greedDays} days of greed (score above 70).` : `This page provides Bitcoin market sentiment analysis for ${displayDate}.`}
          </p>
          <p style="color: #475569; line-height: 1.75; margin-top: 16px;">
            Click on any day in the calendar to see detailed sentiment analysis including source breakdown,
            hourly progression, and key market events.
          </p>
        </section>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #0f172a; margin-bottom: 16px;">Related Analysis</h2>
          <ul style="color: #475569; line-height: 2; padding-left: 24px;">
            <li><a href="/bitcoin-fear-greed-index" style="color: #3b82f6;">Live Bitcoin Fear & Greed Index</a></li>
            <li><a href="/bitcoin-market-sentiment" style="color: #3b82f6;">All Monthly Reports</a></li>
            <li><a href="/bitcoin-media-research" style="color: #3b82f6;">Bitcoin Media Research</a></li>
          </ul>
        </section>
      </main>

      <footer style="text-align: center; padding-top: 32px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 0.875rem;">
        <p>Data provided by <a href="https://perception.to" style="color: #3b82f6;">Perception</a> - Intelligence Workspace for Bitcoin & Crypto</p>
      </footer>
    </article>
    <script>
      if (document.getElementById('root')) {
        var observer = new MutationObserver(function(mutations) {
          var root = document.getElementById('root');
          if (root && root.children.length > 0) {
            var ssrContent = document.getElementById('ssr-content');
            if (ssrContent) ssrContent.style.display = 'none';
            observer.disconnect();
          }
        });
        observer.observe(document.getElementById('root'), { childList: true });
      }
    </script>`;
  }

  return '';
}

// Inject SEO meta tags into HTML
function injectSeoTags(html, path) {
  const seo = getSeoConfig(path);
  // Use SEO-specific image if available, then check SOCIAL_IMAGES, then fallback
  const socialImage = seo.image || SOCIAL_IMAGES[path] || DEFAULT_IMAGE;

  // Escape values for safe HTML insertion
  const safeTitle = escapeHtml(seo.title);
  const safeDescription = escapeHtml(seo.description);
  const safeKeywords = escapeHtml(seo.keywords || '');

  // Build article-specific meta tags if this is an article
  let articleMeta = '';
  if (seo.isArticle && seo.article) {
    if (seo.article.publishedTime) {
      articleMeta += `\n    <meta property="article:published_time" content="${seo.article.publishedTime}">`;
    }
    if (seo.article.modifiedTime) {
      articleMeta += `\n    <meta property="article:modified_time" content="${seo.article.modifiedTime}">`;
    }
    if (seo.article.author) {
      articleMeta += `\n    <meta property="article:author" content="${escapeHtml(seo.article.author)}">`;
    }
    if (seo.article.tags && seo.article.tags.length > 0) {
      seo.article.tags.forEach(tag => {
        articleMeta += `\n    <meta property="article:tag" content="${escapeHtml(tag)}">`;
      });
    }
  }

  const ogType = seo.isArticle ? 'article' : 'website';

  // Generate markdown alternate URL
  const markdownUrl = getMarkdownUrl(path);

  // Build the replacement meta block
  const metaBlock = `
    <!-- SEO Meta Tags - Injected by Cloudflare Middleware -->
    <title>${safeTitle}</title>
    <meta name="title" content="${safeTitle}">
    <meta name="description" content="${safeDescription}">
    <meta name="keywords" content="${safeKeywords}">
    <link rel="canonical" href="${seo.canonical}" />
    <link rel="alternate" type="text/markdown" href="${markdownUrl}" title="Markdown">

    <!-- Open Graph -->
    <meta property="og:type" content="${ogType}">
    <meta property="og:url" content="${seo.canonical}">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDescription}">
    <meta property="og:image" content="${socialImage}">
    <meta property="og:image:secure_url" content="${socialImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Perception">${articleMeta}

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${seo.canonical}">
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDescription}">
    <meta name="twitter:image" content="${socialImage}">

    <!-- Structured Data -->
    <script type="application/ld+json">${JSON.stringify(seo.schema)}</script>
  `;

  // Remove existing meta tags that we'll replace
  html = html.replace(/<title>.*?<\/title>/i, '');
  html = html.replace(/<meta name="title"[^>]*>/gi, '');
  html = html.replace(/<meta name="description"[^>]*>/gi, '');
  html = html.replace(/<meta name="keywords"[^>]*>/gi, '');
  html = html.replace(/<link rel="canonical"[^>]*>/gi, '');
  html = html.replace(/<meta property="og:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta property="article:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta property="twitter:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta name="twitter:[^"]*"[^>]*>/gi, '');

  // Inject new meta block after <head>
  html = html.replace(/<head>/i, `<head>${metaBlock}`);

  // Inject SSR content for crawlers (sentiment pages)
  const ssrContent = generateSentimentPageContent(path);
  if (ssrContent) {
    // Insert SSR content right after the opening body tag, before the React root
    html = html.replace(/<body>/i, `<body>${ssrContent}`);
  }

  return html;
}

// Check if a path is a valid route (returns false for known 404 patterns)
function isValidRoute(path) {
  // Non-existent sections - return 404
  if (path.startsWith('/glossary')) return false;
  if (path.startsWith('/learn/category')) return false;

  // Valid learn paths (explicit list)
  const validLearnPaths = [
    '/learn',
    '/learn/what-is-crypto-sentiment-analysis',
    '/learn/how-to-read-fear-greed-index',
    '/learn/bitcoin-market-psychology',
    '/learn/crypto-narrative-trading',
    '/learn/understanding-bitcoin-dominance',
    '/learn/crypto-social-sentiment'
  ];
  if (path.startsWith('/learn/') && !validLearnPaths.includes(path)) {
    return false;
  }

  // Year-only sentiment URLs are invalid (need /year/month)
  if (/^\/bitcoin-market-sentiment\/\d{4}$/.test(path)) {
    return false;
  }

  // Year-only conference URLs are invalid
  if (/^\/crypto-conferences\/\d{4}$/.test(path)) {
    return false;
  }

  return true;
}

// Generate 404 page HTML
function generate404Html(path) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found | Perception</title>
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="The page you're looking for doesn't exist.">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .container { text-align: center; padding: 40px 20px; max-width: 600px; }
    h1 { font-size: 6rem; font-weight: 700; color: #0f172a; margin-bottom: 16px; }
    h2 { font-size: 1.5rem; font-weight: 600; color: #475569; margin-bottom: 24px; }
    p { color: #64748b; margin-bottom: 32px; line-height: 1.6; }
    .links { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    a { display: inline-block; padding: 12px 24px; background: #0f172a; color: white; text-decoration: none; border-radius: 8px; font-weight: 500; transition: background 0.2s; }
    a:hover { background: #1e293b; }
    a.secondary { background: transparent; color: #0f172a; border: 1px solid #e2e8f0; }
    a.secondary:hover { background: #f1f5f9; }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page <code>${path}</code> doesn't exist. It may have been moved or removed.</p>
    <div class="links">
      <a href="/">Go to Homepage</a>
      <a href="/bitcoin-market-sentiment" class="secondary">Market Sentiment</a>
      <a href="/bitcoin-fear-greed-index" class="secondary">Fear & Greed Index</a>
    </div>
  </div>
</body>
</html>`;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const monthPattern = monthNames.join('|');

  // ===== MARKDOWN HANDLING FOR AI AGENTS =====

  // Check if request is for markdown (either .md suffix or Accept: text/markdown)
  const acceptHeader = context.request.headers.get('accept') || '';
  const wantsMarkdown = url.pathname.endsWith('.md') || acceptHeader.includes('text/markdown');

  if (wantsMarkdown) {
    // Get the base path (remove .md suffix if present)
    const basePath = url.pathname.endsWith('.md')
      ? url.pathname.slice(0, -3)
      : url.pathname;

    // Resolve to markdown file path
    const markdownPath = resolveMarkdownPath(basePath);

    try {
      // Fetch the pre-generated markdown file from assets
      const mdResponse = await context.env.ASSETS.fetch(
        new Request(`${url.origin}${markdownPath}`)
      );

      if (mdResponse.ok) {
        const mdContent = await mdResponse.text();
        return new Response(mdContent, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': 'public, max-age=3600'
          }
        });
      }
    } catch (e) {
      // Markdown file not found, continue to serve regular HTML
      console.log(`Markdown not found for ${basePath}: ${e.message}`);
    }

    // If Accept header requested markdown but we couldn't serve it,
    // fall through to serve HTML (only block if .md suffix was used)
    if (url.pathname.endsWith('.md')) {
      return new Response('Markdown version not available', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }

  // ===== REDIRECTS FOR MALFORMED URLS =====

  // Redirect malformed sentiment URLs like /bitcoin-market-sentiment/july-2025 to /bitcoin-market-sentiment/2025/july
  if (url.pathname.startsWith('/bitcoin-market-sentiment/')) {
    const malformedMatch = url.pathname.match(new RegExp(`^/bitcoin-market-sentiment/(${monthPattern})-(\\d{4})$`, 'i'));
    if (malformedMatch) {
      const [, month, year] = malformedMatch;
      const canonicalPath = `/bitcoin-market-sentiment/${year}/${month.toLowerCase()}`;
      return Response.redirect(new URL(canonicalPath, url).toString(), 301);
    }

    // Check for daily URLs with any case month - normalize to lowercase
    const dailyMatch = url.pathname.match(new RegExp(`^/bitcoin-market-sentiment/(\\d{4})/(${monthPattern})/(\\d{1,2})$`, 'i'));
    if (dailyMatch) {
      const [, year, month, day] = dailyMatch;
      const normalizedMonth = month.toLowerCase();
      if (month !== normalizedMonth) {
        const canonicalPath = `/bitcoin-market-sentiment/${year}/${normalizedMonth}/${day}`;
        return Response.redirect(new URL(canonicalPath, url).toString(), 301);
      }
    }

    // Check for monthly URLs with any case month - normalize to lowercase
    const monthlyMatch = url.pathname.match(new RegExp(`^/bitcoin-market-sentiment/(\\d{4})/(${monthPattern})$`, 'i'));
    if (monthlyMatch) {
      const [, year, month] = monthlyMatch;
      const normalizedMonth = month.toLowerCase();
      if (month !== normalizedMonth) {
        const canonicalPath = `/bitcoin-market-sentiment/${year}/${normalizedMonth}`;
        return Response.redirect(new URL(canonicalPath, url).toString(), 301);
      }
    }
  }

  // Handle canonical URL redirects (strip tracking query parameters)
  if (url.search) {
    const params = new URLSearchParams(url.search);

    // List of tracking parameters to strip for canonical URLs
    const trackingParams = [
      'ref',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'fbclid',
      'gclid',
      'gclsrc',
      'dclid',
      'msclkid',
      'twclid',
      'li_fat_id',
      '_ga',
      '_gl',
      'mc_cid',
      'mc_eid'
    ];

    // Check if any tracking parameters exist
    const hasTrackingParams = trackingParams.some(param => params.has(param));

    if (hasTrackingParams) {
      // Remove all tracking parameters
      trackingParams.forEach(param => params.delete(param));
      const newUrl = new URL(url);
      newUrl.search = params.toString();
      return Response.redirect(newUrl.toString(), 301);
    }

    // Redirect search template URL to clean search page
    if (url.pathname === '/search' && params.get('q') === '{search_term_string}') {
      return Response.redirect(new URL('/search', url).toString(), 301);
    }
  }

  // ===== 404 HANDLING FOR NON-EXISTENT PAGES =====

  // Check if this is a known invalid route - return proper 404
  if (!isValidRoute(url.pathname)) {
    return new Response(generate404Html(url.pathname), {
      status: 404,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'X-Robots-Tag': 'noindex'
      }
    });
  }

  // Get the response
  const response = await context.next();

  // Only process HTML responses
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('text/html')) {
    return response;
  }

  // Check if this is a bot
  const userAgent = context.request.headers.get('user-agent');
  const isBotRequest = isBot(userAgent);

  // For bots, inject SEO-optimized meta tags
  if (isBotRequest) {
    const html = await response.text();
    const path = url.pathname;

    // Normalize path (remove trailing slash except for root)
    const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');

    const modifiedHtml = injectSeoTags(html, normalizedPath);

    // Get the canonical URL for HTTP header
    const seoConfig = getSeoConfig(normalizedPath);
    const canonicalUrl = seoConfig.canonical || `https://perception.to${normalizedPath}`;

    // Create new headers with canonical link header
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Link', `<${canonicalUrl}>; rel="canonical"`);

    return new Response(modifiedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }

  return response;
}
