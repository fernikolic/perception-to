export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // If requesting a static asset, serve it directly
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico')
  ) {
    return context.next();
  }
  
  try {
    // For all other routes, serve index.html
    const response = await fetch(new URL('/index.html', url.origin));
    const html = await response.text();
    
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    return new Response('Error loading the application', { status: 500 });
  }
} 