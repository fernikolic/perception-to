// Social image configuration - maps routes to custom images
const SOCIAL_IMAGES = {
  '/bitcoin-media-research': 'https://perception.to/social-images/pages/bitcoin-media-research.png',
  '/bitcoin-social-media-sentiment-leaderboard': 'https://perception.to/social-images/pages/bitcoin-social-media-sentiment-leaderboard.png',
};

const DEFAULT_IMAGE = 'https://perception.to/logos/Perception-logo-social-og.png';

// Check if request is from a social media crawler
function isSocialCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return (
    ua.includes('facebookexternalhit') ||
    ua.includes('twitterbot') ||
    ua.includes('linkedinbot') ||
    ua.includes('slackbot') ||
    ua.includes('whatsapp') ||
    ua.includes('telegrambot') ||
    ua.includes('pinterest') ||
    ua.includes('discordbot')
  );
}

// Inject custom meta tags into HTML
function injectMetaTags(html, path) {
  const customImage = SOCIAL_IMAGES[path] || DEFAULT_IMAGE;

  // Replace og:image meta tags
  html = html.replace(
    /<meta property="og:image" content="[^"]*">/g,
    `<meta property="og:image" content="${customImage}">`
  );
  html = html.replace(
    /<meta property="og:image:secure_url" content="[^"]*">/g,
    `<meta property="og:image:secure_url" content="${customImage}">`
  );
  html = html.replace(
    /<meta property="twitter:image" content="[^"]*">/g,
    `<meta property="twitter:image" content="${customImage}">`
  );

  return html;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Handle canonical URL redirects (strip query parameters that Google flagged)
  if (url.search) {
    const params = new URLSearchParams(url.search);

    // Strip 'ref' query parameter (e.g., ?ref=bitcoinperception.com)
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

  // Only process HTML responses for social crawlers
  const userAgent = context.request.headers.get('user-agent');
  const contentType = response.headers.get('content-type');

  if (isSocialCrawler(userAgent) && contentType && contentType.includes('text/html')) {
    // Check if this path has a custom social image
    const path = url.pathname;

    if (SOCIAL_IMAGES[path]) {
      // Read the HTML
      const html = await response.text();

      // Inject the custom meta tags
      const modifiedHtml = injectMetaTags(html, path);

      // Return modified response
      return new Response(modifiedHtml, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
    }
  }

  // Continue to next middleware or handler
  return response;
}
