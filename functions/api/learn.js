// Cloudflare Worker API endpoint for learn articles
// Proxies requests to deployed Payload CMS backend

export async function onRequest(context) {
  const { request, env } = context;
  
  // Handle CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the deployed Payload CMS URL from environment variables
    const PAYLOAD_BACKEND_URL = env.PAYLOAD_BACKEND_URL || 'https://your-payload-cms.railway.app';
    
    // Forward the request to the deployed Payload CMS
    const url = new URL(request.url);
    const queryString = url.search;
    const backendUrl = `${PAYLOAD_BACKEND_URL}/api/learn${queryString}`;
    
    const response = await fetch(backendUrl, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error) {
    console.error('Error in learn API:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch from backend', 
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
} 