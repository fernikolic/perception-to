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

  // Continue to next middleware or handler
  return context.next();
}