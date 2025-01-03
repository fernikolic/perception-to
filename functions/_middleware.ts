import { Context } from "@cloudflare/workers-types";

export const onRequest = async (context: Context) => {
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

  // For all other routes, serve index.html
  const response = await context.env.ASSETS.fetch(new URL('/index.html', url));
  
  // Add security headers
  const headers = new Headers(response.headers);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Content-Type', 'text/html; charset=utf-8');
  
  return new Response(response.body, {
    status: 200,
    headers
  });
}; 