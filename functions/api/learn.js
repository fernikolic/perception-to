// Cloudflare Worker API endpoint for learn articles
// This connects directly to MongoDB Atlas to serve learn content

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
                  searchParams.get('where[or][1][excerpt][contains]');
    const category = searchParams.get('where[category][equals]');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    
    // Mock learn articles data (replace with MongoDB query)
    const mockArticles = [
      {
        id: '1',
        title: 'Understanding Bitcoin Basics',
        slug: 'understanding-bitcoin-basics',
        excerpt: 'A comprehensive introduction to Bitcoin, covering its history, technology, and economic principles.',
        content: '<p>Bitcoin is a revolutionary digital currency that operates on a decentralized network...</p>',
        category: 'Basics',
        tags: ['bitcoin', 'introduction', 'basics'],
        readTime: 5,
        difficulty: 'beginner',
        featured: true,
        published: true,
        publishedAt: new Date('2024-01-15').toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Bitcoin Mining Explained',
        slug: 'bitcoin-mining-explained',
        excerpt: 'Learn how Bitcoin mining works, including proof-of-work, mining pools, and the role of miners.',
        content: '<p>Bitcoin mining is the process by which new bitcoins are created and transactions are verified...</p>',
        category: 'Technical',
        tags: ['mining', 'proof-of-work', 'technical'],
        readTime: 8,
        difficulty: 'intermediate',
        featured: false,
        published: true,
        publishedAt: new Date('2024-01-10').toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Stablecoins and Digital Payments',
        slug: 'stablecoins-digital-payments',
        excerpt: 'Explore the world of stablecoins, their mechanisms, and their role in digital payments.',
        content: '<p>Stablecoins are cryptocurrencies designed to maintain a stable value...</p>',
        category: 'Stablecoins',
        tags: ['stablecoins', 'payments', 'USDC', 'USDT'],
        readTime: 6,
        difficulty: 'beginner',
        featured: false,
        published: true,
        publishedAt: new Date('2024-01-08').toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Regulatory Landscape for Crypto',
        slug: 'regulatory-landscape-crypto',
        excerpt: 'Navigate the complex regulatory environment surrounding cryptocurrencies and digital assets.',
        content: '<p>The regulatory landscape for cryptocurrencies is evolving rapidly...</p>',
        category: 'Regulation',
        tags: ['regulation', 'compliance', 'legal'],
        readTime: 10,
        difficulty: 'advanced',
        featured: false,
        published: true,
        publishedAt: new Date('2024-01-05').toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Macro Economics and Bitcoin',
        slug: 'macro-economics-bitcoin',
        excerpt: 'Understanding how macroeconomic factors influence Bitcoin price and adoption.',
        content: '<p>Bitcoin operates within the broader macroeconomic environment...</p>',
        category: 'Economics',
        tags: ['macro', 'economics', 'inflation', 'monetary-policy'],
        readTime: 12,
        difficulty: 'advanced',
        featured: true,
        published: true,
        publishedAt: new Date('2024-01-01').toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];
    
    // Filter articles based on search and category
    let filteredArticles = mockArticles.filter(article => article.published);
    
    if (search) {
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        article.category.toLowerCase().includes(search.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    if (category) {
      filteredArticles = filteredArticles.filter(article => article.category === category);
    }
    
    // Sort by publishedAt descending
    filteredArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
    
    const totalDocs = filteredArticles.length;
    const totalPages = Math.ceil(totalDocs / limit);
    
    const response = {
      docs: paginatedArticles,
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
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
} 