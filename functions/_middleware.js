/**
 * Cloudflare Pages Middleware for SEO
 *
 * Injects page-specific meta tags and structured data for search engine crawlers.
 * This ensures proper SEO even for a client-side React SPA.
 */

import { PAGE_SEO, SOCIAL_IMAGES, DEFAULT_IMAGE, DEFAULT_SEO } from './seo-config.js';

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
    // Extract date from path like /bitcoin-market-sentiment/2025/12/15
    const match = path.match(/\/bitcoin-market-sentiment\/(\d{4})\/(\d{2})(?:\/(\d{2}))?/);
    if (match) {
      const [, year, month, day] = match;
      const dateStr = day ? `${year}-${month}-${day}` : `${year}-${month}`;
      return {
        title: `Bitcoin Market Sentiment ${dateStr} | Perception`,
        description: `Bitcoin market sentiment analysis for ${dateStr}. Track investor psychology, fear & greed index, and market narratives.`,
        keywords: `bitcoin sentiment ${dateStr}, bitcoin market analysis ${dateStr}`,
        canonical: `https://perception.to${path}`,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Dataset',
          name: `Bitcoin Market Sentiment ${dateStr}`,
          description: `Bitcoin market sentiment data for ${dateStr}`,
          temporalCoverage: dateStr
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

  // Return default for unconfigured pages
  return {
    ...DEFAULT_SEO,
    canonical: `https://perception.to${path}`
  };
}

// Inject SEO meta tags into HTML
function injectSeoTags(html, path) {
  const seo = getSeoConfig(path);
  const socialImage = SOCIAL_IMAGES[path] || DEFAULT_IMAGE;

  // Build the replacement meta block
  const metaBlock = `
    <!-- SEO Meta Tags - Injected by Cloudflare Middleware -->
    <title>${seo.title}</title>
    <meta name="title" content="${seo.title}">
    <meta name="description" content="${seo.description}">
    <meta name="keywords" content="${seo.keywords || ''}">
    <link rel="canonical" href="${seo.canonical}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${seo.canonical}">
    <meta property="og:title" content="${seo.title}">
    <meta property="og:description" content="${seo.description}">
    <meta property="og:image" content="${socialImage}">
    <meta property="og:image:secure_url" content="${socialImage}">
    <meta property="og:site_name" content="Perception">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${seo.canonical}">
    <meta name="twitter:title" content="${seo.title}">
    <meta name="twitter:description" content="${seo.description}">
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
  html = html.replace(/<meta property="twitter:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta name="twitter:[^"]*"[^>]*>/gi, '');

  // Inject new meta block after <head>
  html = html.replace(/<head>/i, `<head>${metaBlock}`);

  return html;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);

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
