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
    const response = await fetch(DATA_API_URL, {
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
    });

    if (!response.ok) {
      throw new Error(`MongoDB API responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

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