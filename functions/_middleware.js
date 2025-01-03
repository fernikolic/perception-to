export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // Handle all assets directly through ASSETS
  if (url.pathname.startsWith('/assets/')) {
    const response = await context.env.ASSETS.fetch(url);
    const newHeaders = new Headers(response.headers);
    
    // Set content type based on file extension
    if (url.pathname.endsWith('.js')) {
      newHeaders.set('content-type', 'application/javascript; charset=utf-8');
    } else if (url.pathname.endsWith('.css')) {
      newHeaders.set('content-type', 'text/css; charset=utf-8');
    }
    
    newHeaders.set('cache-control', 'public, max-age=31536000, immutable');
    return new Response(response.body, {
      headers: newHeaders
    });
  }

  // For all other routes, serve index.html
  try {
    const response = await context.env.ASSETS.fetch(new URL('/index.html', url));
    return new Response(response.body, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'no-cache',
        'x-content-type-options': 'nosniff'
      }
    });
  } catch (error) {
    return new Response('Error loading the application', { 
      status: 500,
      headers: {
        'content-type': 'text/plain'
      }
    });
  }
} 