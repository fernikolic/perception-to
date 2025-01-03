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

  // If requesting a static asset, serve it directly
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico')
  ) {
    const response = await context.next();
    const newHeaders = new Headers(response.headers);
    
    // Add security headers to the response
    Object.entries(securityHeaders).forEach(([key, value]) => {
      newHeaders.set(key, value);
    });

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
  }
  
  try {
    // For all other routes, serve index.html
    const response = await context.env.ASSETS.fetch(new URL('/index.html', url));
    const newHeaders = new Headers(response.headers);
    
    // Add security headers to the response
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