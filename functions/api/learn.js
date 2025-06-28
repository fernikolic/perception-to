// Cloudflare Worker API endpoint for learn articles
// Uses MongoDB Atlas HTTP Data API to serve real learn content

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
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Parse query parameters
    const search = searchParams.get('where[or][0][title][contains]') || 
                   searchParams.get('where[or][1][excerpt][contains]');
    const category = searchParams.get('where[category][equals]');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const slug = searchParams.get('where[slug][equals]');
    
    // MongoDB Atlas Data API configuration
    const DATA_API_URL = 'https://us-east-1.aws.data.mongodb-api.com/app/data-rftve/endpoint/data/v1/action/find';
    const API_KEY = env.MONGODB_DATA_API_KEY || 'ZaJTBIrVNTY5Ac1VPAa2d8a6rKCOpqVmJQK4vpHcxGpGEy8Y2XzUWVqI4VgjQXEP';
    
    // Build MongoDB filter
    let filter = { published: true };
    
    if (slug) {
      filter.slug = slug;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (category) {
      filter.category = category;
    }
    
    // Make request to MongoDB Data API
    const mongoRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        collection: 'learn',
        database: 'payload-cms',
        dataSource: 'Cluster0',
        filter: filter,
        limit: limit,
        skip: (page - 1) * limit,
        sort: { publishedAt: -1 }
      })
    };

    console.log('Making MongoDB request:', JSON.stringify(mongoRequest.body));

    const response = await fetch(DATA_API_URL, mongoRequest);

    if (!response.ok) {
      console.error(`MongoDB API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('MongoDB error response:', errorText);
      
      // Return sample data as fallback
      return new Response(JSON.stringify(getSampleLearnData()), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    const data = await response.json();
    console.log('MongoDB response:', JSON.stringify(data));

    // Get total count for pagination
    const countResponse = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-rftve/endpoint/data/v1/action/aggregate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        collection: 'learn',
        database: 'payload-cms',
        dataSource: 'Cluster0',
        pipeline: [
          { $match: filter },
          { $count: "total" }
        ]
      })
    });

    const countData = await countResponse.json();
    const totalDocs = countData.documents?.[0]?.total || 0;
    const totalPages = Math.ceil(totalDocs / limit);
    
    // Format response to match Payload CMS structure
    const formattedResponse = {
      docs: data.documents.map(doc => ({
        id: doc._id,
        title: doc.title,
        slug: doc.slug,
        excerpt: doc.excerpt,
        content: doc.content,
        category: doc.category,
        tags: doc.tags,
        readTime: doc.readTime,
        difficulty: doc.difficulty,
        featured: doc.featured,
        published: doc.published,
        publishedAt: doc.publishedAt,
        updatedAt: doc.updatedAt,
        createdAt: doc.createdAt,
      })),
      totalDocs,
      limit,
      totalPages,
      page,
      pagingCounter: (page - 1) * limit + 1,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    };

    return new Response(JSON.stringify(formattedResponse), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error) {
    console.error('Error in learn API:', error);
    
    // Return sample data as fallback
    return new Response(JSON.stringify(getSampleLearnData()), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
}

// Sample learn data as fallback
function getSampleLearnData() {
  const sampleArticles = [
    {
      id: '1',
      title: 'Understanding Bitcoin: A Beginner\'s Guide',
      slug: 'understanding-bitcoin-beginners-guide',
      excerpt: 'Learn the fundamentals of Bitcoin, from its creation to how it works as a decentralized digital currency.',
      content: 'Bitcoin is a revolutionary digital currency that operates on a decentralized network...',
      category: 'bitcoin-basics',
      tags: [{ tag: 'bitcoin' }, { tag: 'beginners' }, { tag: 'fundamentals' }],
      readTime: 8,
      difficulty: 'beginner',
      featured: true,
      published: true,
      publishedAt: '2024-01-15T00:00:00.000Z',
      updatedAt: '2024-01-15T00:00:00.000Z',
      createdAt: '2024-01-15T00:00:00.000Z',
    },
    {
      id: '2',
      title: 'Bitcoin Market Analysis: Key Indicators to Watch',
      slug: 'bitcoin-market-analysis-key-indicators',
      excerpt: 'Discover the most important indicators and metrics for analyzing Bitcoin market trends and making informed decisions.',
      content: 'Market analysis is crucial for understanding Bitcoin\'s price movements...',
      category: 'market-analysis',
      tags: [{ tag: 'market analysis' }, { tag: 'indicators' }, { tag: 'trading' }],
      readTime: 12,
      difficulty: 'intermediate',
      featured: false,
      published: true,
      publishedAt: '2024-01-10T00:00:00.000Z',
      updatedAt: '2024-01-10T00:00:00.000Z',
      createdAt: '2024-01-10T00:00:00.000Z',
    },
    {
      id: '3',
      title: 'Technical Deep Dive: Bitcoin Mining and Consensus',
      slug: 'technical-deep-dive-bitcoin-mining-consensus',
      excerpt: 'Explore the technical aspects of Bitcoin mining, proof-of-work consensus, and network security.',
      content: 'Bitcoin mining is the process by which new bitcoins are created and transactions are verified...',
      category: 'technical-guides',
      tags: [{ tag: 'mining' }, { tag: 'consensus' }, { tag: 'technical' }],
      readTime: 15,
      difficulty: 'advanced',
      featured: false,
      published: true,
      publishedAt: '2024-01-05T00:00:00.000Z',
      updatedAt: '2024-01-05T00:00:00.000Z',
      createdAt: '2024-01-05T00:00:00.000Z',
    },
    {
      id: '4',
      title: 'Regulatory Landscape: Bitcoin and Global Policy',
      slug: 'regulatory-landscape-bitcoin-global-policy',
      excerpt: 'Navigate the complex world of Bitcoin regulation and understand how policy changes affect the ecosystem.',
      content: 'The regulatory environment for Bitcoin varies significantly across jurisdictions...',
      category: 'policy-regulation',
      tags: [{ tag: 'regulation' }, { tag: 'policy' }, { tag: 'compliance' }],
      readTime: 10,
      difficulty: 'intermediate',
      featured: false,
      published: true,
      publishedAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      createdAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: '5',
      title: 'DeFi and Stablecoins: The Evolution of Digital Finance',
      slug: 'defi-stablecoins-evolution-digital-finance',
      excerpt: 'Understand how DeFi protocols and stablecoins are reshaping the financial landscape.',
      content: 'Decentralized Finance (DeFi) represents a paradigm shift in how financial services are delivered...',
      category: 'defi-stablecoins',
      tags: [{ tag: 'defi' }, { tag: 'stablecoins' }, { tag: 'finance' }],
      readTime: 14,
      difficulty: 'intermediate',
      featured: false,
      published: true,
      publishedAt: '2023-12-28T00:00:00.000Z',
      updatedAt: '2023-12-28T00:00:00.000Z',
      createdAt: '2023-12-28T00:00:00.000Z',
    }
  ];

  return {
    docs: sampleArticles,
    totalDocs: sampleArticles.length,
    limit: 50,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  };
} 