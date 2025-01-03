export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // If requesting static assets, let Cloudflare handle it
  if (url.pathname.startsWith('/assets/')) {
    return context.next();
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