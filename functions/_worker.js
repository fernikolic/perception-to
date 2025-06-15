export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '*';
    
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
      // Handle OG image generation
      if (url.pathname === '/api/og-image') {
        const { onRequest } = await import('./api/og-image.js');
        return onRequest({ request, env, ctx });
      }
      
      // Proxy other API requests to the Payload CMS backend
      const payloadUrl = new URL(url.pathname + url.search, env.PAYLOAD_API_URL);
      const payloadRequest = new Request(payloadUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });
      
      try {
        const response = await fetch(payloadRequest);
        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ 
          error: 'Failed to fetch from API',
          details: error.message
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        });
      }
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