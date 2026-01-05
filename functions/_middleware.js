/**
 * Cloudflare Pages Middleware for SEO
 *
 * Injects page-specific meta tags and structured data for search engine crawlers.
 * This ensures proper SEO even for a client-side React SPA.
 */

import { PAGE_SEO, SOCIAL_IMAGES, DEFAULT_IMAGE, DEFAULT_SEO } from './seo-config.js';
import { RESEARCH_OG_DATA, DEFAULT_RESEARCH_IMAGE } from './research-og-data.js';

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
        <h1 style="font-size: 2.5rem; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Bitcoin Market Sentiment - ${displayDate}</h1>
        <p style="font-size: 1.25rem; color: #64748b; max-width: 800px; margin: 0 auto;">
          Daily Bitcoin sentiment analysis tracking fear & greed index, social media trends, and market psychology for ${displayDate}.
        </p>
        <time datetime="${isoDate}" style="display: block; margin-top: 16px; color: #94a3b8; font-size: 0.875rem;">Published: ${displayDate}</time>
      </header>

      <main>
        <section style="background: #f8fafc; border-radius: 16px; padding: 32px; margin-bottom: 32px;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #0f172a; margin-bottom: 16px;">Daily Sentiment Overview</h2>
          <p style="color: #475569; line-height: 1.75;">
            This page provides comprehensive Bitcoin market sentiment analysis for ${displayDate}.
            Our sentiment data is aggregated from over 650 sources including social media platforms,
            news outlets, and financial publications to give you a complete picture of market psychology.
          </p>
          <p style="color: #475569; line-height: 1.75; margin-top: 16px;">
            The Bitcoin Fear & Greed Index measures investor sentiment on a scale of 0-100, where 0 represents
            extreme fear and 100 represents extreme greed. This daily analysis helps traders and investors
            understand market conditions and make informed decisions.
          </p>
        </section>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #0f172a; margin-bottom: 16px;">What We Track</h2>
          <ul style="color: #475569; line-height: 2; padding-left: 24px;">
            <li><strong>Fear & Greed Index:</strong> Real-time sentiment score from 0-100</li>
            <li><strong>Social Media Sentiment:</strong> Analysis of Twitter, Reddit, and other platforms</li>
            <li><strong>News Sentiment:</strong> Coverage from major crypto and financial publications</li>
            <li><strong>Market Psychology:</strong> Investor behavior patterns and trends</li>
            <li><strong>Hourly Progression:</strong> How sentiment evolved throughout ${displayDate}</li>
          </ul>
        </section>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #0f172a; margin-bottom: 16px;">Related Analysis</h2>
          <p style="color: #475569; line-height: 1.75;">
            Explore more Bitcoin sentiment data:
          </p>
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

    return `
    <article id="ssr-content" style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, -apple-system, sans-serif;">
      <header style="text-align: center; margin-bottom: 40px;">
        <nav style="margin-bottom: 20px;">
          <a href="/bitcoin-market-sentiment" style="color: #3b82f6; text-decoration: none;">Bitcoin Market Sentiment</a>
          <span style="margin: 0 8px; color: #64748b;">›</span>
          <span style="color: #64748b;">${displayDate}</span>
        </nav>
        <h1 style="font-size: 2.5rem; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Bitcoin Market Sentiment - ${displayDate}</h1>
        <p style="font-size: 1.25rem; color: #64748b; max-width: 800px; margin: 0 auto;">
          Monthly Bitcoin sentiment analysis with daily breakdowns, fear & greed trends, and comprehensive market psychology data for ${displayDate}.
        </p>
      </header>

      <main>
        <section style="background: #f8fafc; border-radius: 16px; padding: 32px; margin-bottom: 32px;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #0f172a; margin-bottom: 16px;">Monthly Overview</h2>
          <p style="color: #475569; line-height: 1.75;">
            This page provides comprehensive Bitcoin market sentiment analysis for ${displayDate}.
            Track daily sentiment progression, identify fear and greed patterns, and understand
            how market psychology evolved throughout the month.
          </p>
        </section>

        <section style="margin-bottom: 32px;">
          <h2 style="font-size: 1.5rem; font-weight: 600; color: #0f172a; margin-bottom: 16px;">Monthly Metrics</h2>
          <ul style="color: #475569; line-height: 2; padding-left: 24px;">
            <li><strong>Average Sentiment Score:</strong> Monthly fear & greed average</li>
            <li><strong>Fear Days:</strong> Days with sentiment below 30</li>
            <li><strong>Greed Days:</strong> Days with sentiment above 70</li>
            <li><strong>Neutral Days:</strong> Days with balanced sentiment</li>
            <li><strong>Daily Breakdown:</strong> Click any day to see detailed analysis</li>
          </ul>
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

  // Build the replacement meta block
  const metaBlock = `
    <!-- SEO Meta Tags - Injected by Cloudflare Middleware -->
    <title>${safeTitle}</title>
    <meta name="title" content="${safeTitle}">
    <meta name="description" content="${safeDescription}">
    <meta name="keywords" content="${safeKeywords}">
    <link rel="canonical" href="${seo.canonical}" />

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

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Redirect sentiment URLs with uppercase months to lowercase (canonical URL enforcement)
  if (url.pathname.startsWith('/bitcoin-market-sentiment/')) {
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const monthPattern = monthNames.join('|');

    // Check for daily URLs with any case month
    const dailyMatch = url.pathname.match(new RegExp(`^/bitcoin-market-sentiment/(\\d{4})/(${monthPattern})/(\\d{1,2})$`, 'i'));
    if (dailyMatch) {
      const [, year, month, day] = dailyMatch;
      const normalizedMonth = month.toLowerCase();
      if (month !== normalizedMonth) {
        const canonicalPath = `/bitcoin-market-sentiment/${year}/${normalizedMonth}/${day}`;
        return Response.redirect(new URL(canonicalPath, url).toString(), 301);
      }
    }

    // Check for monthly URLs with any case month
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

  // Handle canonical URL redirects (strip query parameters)
  if (url.search) {
    const params = new URLSearchParams(url.search);

    // Strip 'ref' query parameter
    if (params.has('ref')) {
      params.delete('ref');
      const newUrl = new URL(url);
      newUrl.search = params.toString();
      return Response.redirect(newUrl.toString(), 301);
    }

    // Redirect search template URL to clean search page
    if (url.pathname === '/search' && params.get('q') === '{search_term_string}') {
      return Response.redirect(new URL('/search', url).toString(), 301);
    }
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

    return new Response(modifiedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  }

  return response;
}
