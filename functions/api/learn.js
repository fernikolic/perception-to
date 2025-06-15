// Cloudflare Worker API endpoint for learn articles
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
    // Real learn data (fallback)
    const learnData = [
      {
        id: '1',
        title: 'What is Bitcoin?',
        slug: 'what-is-bitcoin',
        excerpt: 'A primer on the basics of Bitcoin and why it matters.',
        content: 'Bitcoin is a decentralized digital currency...',
        category: 'bitcoin',
        tags: ['basics', 'introduction'],
        readTime: 5,
        difficulty: 'beginner',
        featured: true,
        published: true,
        publishedAt: '2024-06-01T12:00:00Z',
        updatedAt: '2024-06-01T12:00:00Z',
        createdAt: '2024-06-01T12:00:00Z',
      },
      {
        id: '2',
        title: 'Stablecoins Explained',
        slug: 'stablecoins-explained',
        excerpt: 'How stablecoins work and their role in the crypto ecosystem.',
        content: 'Stablecoins are cryptocurrencies pegged to stable assets...',
        category: 'stablecoins',
        tags: ['stablecoins', 'explainer'],
        readTime: 7,
        difficulty: 'beginner',
        featured: false,
        published: true,
        publishedAt: '2024-06-02T12:00:00Z',
        updatedAt: '2024-06-02T12:00:00Z',
        createdAt: '2024-06-02T12:00:00Z',
      },
      // Add more articles as needed
    ];

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Parse query parameters
    const search = searchParams.get('where[or][0][title][contains]') || 
                   searchParams.get('where[or][1][excerpt][contains]');
    const category = searchParams.get('where[category][equals]');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const slug = searchParams.get('where[slug][equals]');
    
    // Filter data
    let filteredData = learnData.filter(doc => doc.published);
    
    if (slug) {
      filteredData = filteredData.filter(doc => doc.slug === slug);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(doc => 
        doc.title.toLowerCase().includes(searchLower) ||
        doc.excerpt.toLowerCase().includes(searchLower) ||
        (doc.category && doc.category.toLowerCase().includes(searchLower)) ||
        (Array.isArray(doc.tags) && doc.tags.some(tag => tag.toLowerCase().includes(searchLower)))
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
    console.error('Error in learn API:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch learn data', 
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