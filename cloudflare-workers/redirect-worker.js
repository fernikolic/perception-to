/**
 * Cloudflare Worker to handle canonical URL redirects
 * Strips query parameters that cause Google Search Console issues
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Skip processing for static files (especially sitemaps)
    if (url.pathname.endsWith('.xml') ||
        url.pathname.endsWith('.txt') ||
        url.pathname.endsWith('.ico') ||
        url.pathname.startsWith('/assets/') ||
        url.pathname.startsWith('/js/') ||
        url.pathname.startsWith('/css/')) {
      return fetch(request);
    }

    // Handle canonical URL redirects (strip query parameters that Google flagged)
    if (url.search) {
      const params = new URLSearchParams(url.search);

      // Redirect search template URL to clean search page (check this first)
      if (url.pathname === '/search' && params.get('q') === '{search_term_string}') {
        return Response.redirect(new URL('/search', url.origin).toString(), 301);
      }

      let shouldRedirect = false;

      // Strip 'ref' query parameter (e.g., ?ref=bitcoinperception.com)
      if (params.has('ref')) {
        params.delete('ref');
        shouldRedirect = true;
      }

      // If we removed parameters, redirect to the clean URL
      if (shouldRedirect) {
        const newUrl = new URL(url);
        newUrl.search = params.toString();
        return Response.redirect(newUrl.toString(), 301);
      }
    }

    // Pass through to origin (your Pages deployment)
    // Note: For SPA SEO issues (crawled but not indexed), consider:
    // 1. Using a prerendering service like Prerender.io
    // 2. Implementing SSR (Next.js, Remix, etc.)
    // 3. Using Cloudflare Browser Rendering API to generate static HTML for bots
    // 4. Submitting a dynamic sitemap that only includes generated pages
    return fetch(request);
  },
};