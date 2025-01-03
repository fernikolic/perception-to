export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // Common security headers
  const securityHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };

  // Handle OPTIONS request for CORS
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: securityHeaders
    });
  }

  // If requesting a JavaScript file
  if (url.pathname.endsWith('.js')) {
    const response = await context.next();
    const newHeaders = new Headers(response.headers);
    Object.entries(securityHeaders).forEach(([key, value]) => {
      newHeaders.set(key, value);
    });
    newHeaders.set('content-type', 'application/javascript');
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
  }

  // If requesting other static assets
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico')
  ) {
    return context.next();
  }
  
  try {
    // For all other routes, serve index.html
    const response = await context.env.ASSETS.fetch(new URL('/index.html', url));
    const newHeaders = new Headers(response.headers);
    Object.entries(securityHeaders).forEach(([key, value]) => {
      newHeaders.set(key, value);
    });
    newHeaders.set('content-type', 'text/html;charset=UTF-8');
    
    return new Response(response.body, {
      status: 200,
      headers: newHeaders
    });
  } catch (error) {
    return new Response('Error loading the application', { 
      status: 500,
      headers: securityHeaders
    });
  }
} 