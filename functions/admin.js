export async function onRequest(context) {
  const { request, env } = context;
  
  // Check authentication
  const auth = request.headers.get('Authorization');
  if (!auth) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Handle admin operations
  if (request.method === 'POST') {
    const body = await request.json();
    
    // Insert new content
    await env.DB.prepare(
      'INSERT INTO posts (title, content) VALUES (?, ?)'
    ).bind(body.title, body.content).run();

    return new Response('Created', { status: 201 });
  }
} 