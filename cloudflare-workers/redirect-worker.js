/**
 * Cloudflare Worker to handle canonical URL redirects
 * Strips query parameters that cause Google Search Console issues
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

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
    return fetch(request);
  },
};