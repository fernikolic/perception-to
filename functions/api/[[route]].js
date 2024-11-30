export async function onRequest(context) {
  const { env, params } = context;
  const { route } = params;

  // Basic CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  // Handle different routes
  switch (route) {
    case 'posts':
      const posts = await env.DB.prepare(
        'SELECT * FROM posts ORDER BY created_at DESC'
      ).all();
      return new Response(JSON.stringify(posts), { headers });

    case 'pages':
      const pages = await env.DB.prepare(
        'SELECT * FROM pages ORDER BY title ASC'
      ).all();
      return new Response(JSON.stringify(pages), { headers });

    default:
      return new Response('Not found', { status: 404 });
  }
} 