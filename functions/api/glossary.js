// Cloudflare Worker API endpoint for glossary entries
// This connects directly to MongoDB Atlas to serve glossary data

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
    // For now, return mock data until we set up MongoDB connection
    // TODO: Replace with actual MongoDB connection using env.MONGODB_URI
    
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Parse query parameters
    const search = searchParams.get('where[or][0][title][contains]') || 
                  searchParams.get('where[or][1][description][contains]');
    const category = searchParams.get('where[category][equals]');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    
    // Mock glossary data (replace with MongoDB query)
    const mockEntries = [
      {
        id: '1',
        title: 'Bitcoin',
        slug: 'bitcoin',
        description: 'A decentralized digital currency that operates without a central bank or single administrator.',
        category: 'bitcoin',
        published: true,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Blockchain',
        slug: 'blockchain',
        description: 'A distributed ledger technology that maintains a continuously growing list of records.',
        category: 'bitcoin',
        published: true,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Stablecoin',
        slug: 'stablecoin',
        description: 'A cryptocurrency designed to maintain a stable value relative to a reference asset.',
        category: 'stablecoins',
        published: true,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'CBDC',
        slug: 'cbdc',
        description: 'Central Bank Digital Currency - a digital form of fiat money issued by a central bank.',
        category: 'regulation',
        published: true,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Market Cap',
        slug: 'market-cap',
        description: 'The total value of all coins in circulation for a particular cryptocurrency.',
        category: 'macro',
        published: true,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }
    ];
    
    // Filter entries based on search and category
    let filteredEntries = mockEntries.filter(entry => entry.published);
    
    if (search) {
      filteredEntries = filteredEntries.filter(entry =>
        entry.title.toLowerCase().includes(search.toLowerCase()) ||
        entry.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category) {
      filteredEntries = filteredEntries.filter(entry => entry.category === category);
    }
    
    // Sort by updatedAt descending
    filteredEntries.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEntries = filteredEntries.slice(startIndex, endIndex);
    
    const totalDocs = filteredEntries.length;
    const totalPages = Math.ceil(totalDocs / limit);
    
    const response = {
      docs: paginatedEntries,
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
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
} 