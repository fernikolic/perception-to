// Cloudflare Worker API endpoint for glossary entries
// Temporary fallback with real data until MongoDB Data API is fixed

export async function onRequest(context) {
  const { request } = context;
  
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
    // Real glossary data from your Payload CMS
    const glossaryData = [
      {
        "id": "6845c5bd3e3dbc252cf34823",
        "updatedAt": "2025-06-08T17:17:49.259Z",
        "title": "Trend Velocity",
        "slug": "trend-velocity",
        "description": "A measure of how quickly a topic or narrative is gaining attention across media channels. High velocity often signals a turning point in perception or market impact.",
        "category": "bitcoin",
        "published": true,
        "createdAt": "2025-06-08T17:17:49.259Z"
      },
      {
        "id": "6845c5bd3e3dbc252cf34820",
        "updatedAt": "2025-06-08T17:17:49.026Z",
        "title": "Tokenized Assets",
        "slug": "tokenized-assets",
        "description": "Real-world assets (e.g., bonds, real estate, treasuries) issued and traded as tokens on blockchain platforms. Enables more efficient, global, and programmable finance—often on Bitcoin-adjacent chains.",
        "category": "bitcoin",
        "published": true,
        "createdAt": "2025-06-08T17:17:49.026Z"
      },
      {
        "id": "6845c5bc3e3dbc252cf3481d",
        "updatedAt": "2025-06-08T17:17:48.792Z",
        "title": "Stablecoin Policy Shifts",
        "slug": "stablecoin-policy-shifts",
        "description": "Changes in regulation, compliance, or regional legal frameworks governing fiat-pegged digital assets. Can drastically affect adoption, on/off ramps, and institutional behavior across jurisdictions.",
        "category": "bitcoin",
        "published": true,
        "createdAt": "2025-06-08T17:17:48.792Z"
      },
      {
        "id": "6845c5bc3e3dbc252cf3481a",
        "updatedAt": "2025-06-08T17:17:48.556Z",
        "title": "Sentiment Clustering",
        "slug": "sentiment-clustering",
        "description": "Grouping media mentions by tone (positive, neutral, negative) and topic to identify prevailing attitudes across news, social, and dev channels. Reveals how narratives are received—and whether they're gaining traction or facing resistance.",
        "category": "bitcoin",
        "published": true,
        "createdAt": "2025-06-08T17:17:48.556Z"
      },
      {
        "id": "6845c5bc3e3dbc252cf34817",
        "updatedAt": "2025-06-08T17:17:48.324Z",
        "title": "Regulated Tokenization",
        "slug": "regulated-tokenization",
        "description": "Issuance of digital assets (such as treasuries or funds) under jurisdictional compliance regimes. A key bridge between Bitcoin-native infrastructure and traditional finance.",
        "category": "bitcoin",
        "published": true,
        "createdAt": "2025-06-08T17:17:48.324Z"
      },
      {
        "id": "6845c5bc3e3dbc252cf34814",
        "updatedAt": "2025-06-08T17:17:48.100Z",
        "title": "Narrative Intelligence",
        "slug": "narrative-intelligence",
        "description": "The practice of monitoring, analyzing, and synthesizing market sentiment and thematic trends across media to uncover emerging narratives. Helps investors, analysts, and builders spot shifts before they hit mainstream headlines.",
        "category": "bitcoin",
        "published": true,
        "createdAt": "2025-06-08T17:17:48.100Z"
      },
      {
        "id": "6845c5bb3e3dbc252cf34811",
        "updatedAt": "2025-06-08T17:17:47.870Z",
        "title": "Media Normalization",
        "slug": "media-normalization",
        "description": "The process of scoring and weighing media sources to treat Reddit, Reuters, and GitHub with appropriate parity and context. Prevents overreliance on any one channel and ensures balanced insight.",
        "category": "bitcoin",
        "published": true,
        "createdAt": "2025-06-08T17:17:47.870Z"
      },
      {
        "id": "6845c5bb3e3dbc252cf3480e",
        "updatedAt": "2025-06-08T17:17:47.639Z",
        "title": "Fragmented Signals",
        "slug": "fragmented-signals",
        "description": "Disparate, siloed information across platforms (Reddit, Bloomberg, GitHub, etc.) that make it difficult to form a coherent market picture. Perception unifies these into a single lens for strategic clarity.",
        "category": "bitcoin",
        "published": true,
        "createdAt": "2025-06-08T17:17:47.639Z"
      },
      {
        "id": "6845c5bb3e3dbc252cf3480b",
        "updatedAt": "2025-06-08T17:17:47.394Z",
        "title": "Developer Ecosystem Monitoring",
        "slug": "developer-ecosystem-monitoring",
        "description": "Tracking GitHub commits, repo activity, and open-source contribution trends to detect infrastructure narratives. Developer attention often precedes market attention.",
        "category": "bitcoin",
        "published": true,
        "createdAt": "2025-06-08T17:17:47.394Z"
      },
      {
        "id": "6845c5bb3e3dbc252cf34808",
        "updatedAt": "2025-06-08T17:17:47.158Z",
        "title": "Cross-Channel Intelligence",
        "slug": "cross-channel-intelligence",
        "description": "Aggregated insights derived from multiple information streams—news, social, dev, podcast, newsletters. Enables a panoramic understanding of Bitcoin's narrative footprint.",
        "category": "bitcoin",
        "published": true,
        "createdAt": "2025-06-08T17:17:47.158Z"
      }
    ];

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Parse query parameters
    const search = searchParams.get('where[or][0][title][contains]') || 
                   searchParams.get('where[or][1][description][contains]');
    const category = searchParams.get('where[category][equals]');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const slug = searchParams.get('where[slug][equals]');
    
    // Filter data
    let filteredData = glossaryData.filter(doc => doc.published);
    
    if (slug) {
      filteredData = filteredData.filter(doc => doc.slug === slug);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(doc => 
        doc.title.toLowerCase().includes(searchLower) ||
        doc.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (category) {
      filteredData = filteredData.filter(doc => doc.category === category);
    }
    
    // Pagination
    const totalDocs = filteredData.length;
    const totalPages = Math.ceil(totalDocs / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    // Format response to match Payload CMS structure
    const response = {
      docs: paginatedData,
      totalDocs,
      limit,
      totalPages,
      page,
      pagingCounter: startIndex + 1,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    };

    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error) {
    console.error('Error in glossary API:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch glossary data', 
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