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
    // Rewrite the request to the Pages domain if coming from custom domain
    if (url.hostname === 'perception.to') {
      const pagesUrl = new URL(url.pathname, 'https://perception-to.pages.dev');
      return fetch(pagesUrl);
    }
    return context.next();
  }
  
  try {
    // For all other routes, serve index.html from the Pages domain
    const indexUrl = new URL('/index.html', 'https://perception-to.pages.dev');
    const response = await fetch(indexUrl);
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