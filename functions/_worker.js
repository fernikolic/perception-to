export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '*';

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

    // Handle OPTIONS (preflight) requests for CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400'
        }
      });
    }
    
    // If the request is for a static asset, let it pass through
    if (url.pathname.startsWith('/assets/') || 
        url.pathname.endsWith('.js') || 
        url.pathname.endsWith('.css') || 
        url.pathname.endsWith('.ico')) {
      const response = await fetch(request);
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...Object.fromEntries(response.headers),
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }
    
    // Handle API requests
    if (url.pathname.startsWith('/api/')) {
      // Handle learn API
      if (url.pathname === '/api/learn') {
        const { onRequest } = await import('./api/learn.js');
        return onRequest({ request, env, ctx });
      }
      
      // Handle glossary API
      if (url.pathname === '/api/glossary') {
        const { onRequest } = await import('./api/glossary.js');
        return onRequest({ request, env, ctx });
      }
      
      // Handle OG image generation
      if (url.pathname === '/api/og-image') {
        const { onRequest } = await import('./api/og-image.js');
        return onRequest({ request, env, ctx });
      }
      
      // Return 404 for unknown API endpoints
      return new Response(JSON.stringify({ 
        error: 'API endpoint not found',
        path: url.pathname
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }
    
    // For all other routes, serve index.html
    const response = await fetch(new URL('/index.html', request.url));
    return new Response(response.body, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
    });
  },
}; 