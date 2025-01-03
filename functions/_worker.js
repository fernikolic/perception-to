export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // If the request is for a static asset, let it pass through
    if (url.pathname.startsWith('/assets/') || 
        url.pathname.endsWith('.js') || 
        url.pathname.endsWith('.css') || 
        url.pathname.endsWith('.ico')) {
      return fetch(request);
    }
    
    // For all other routes, serve index.html
    const response = await fetch(new URL('/index.html', request.url));
    return new Response(response.body, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'no-cache, no-store, must-revalidate',
      },
    });
  },
}; 