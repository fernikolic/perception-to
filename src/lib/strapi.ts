const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Debug log
console.log('Strapi Config:', {
  url: STRAPI_URL,
  hasToken: !!STRAPI_API_TOKEN,
  tokenPreview: STRAPI_API_TOKEN?.substring(0, 10) + '...',
});

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

async function fetchAPI(endpoint: string, options: FetchOptions = {}) {
  const defaultOptions: FetchOptions = {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // Ensure we're using the correct API endpoint structure
  const baseUrl = STRAPI_URL.endsWith('/api') ? STRAPI_URL : `${STRAPI_URL}/api`;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const fullUrl = `${baseUrl}/${cleanEndpoint}`;
  
  console.log('Making request to:', fullUrl);
  console.log('With options:', {
    method: mergedOptions.method || 'GET',
    mode: mergedOptions.mode,
    headers: mergedOptions.headers,
  });

  try {
    const response = await fetch(fullUrl, mergedOptions);
    console.log('Response status:', response.status);
    
    const contentType = response.headers.get('content-type');
    console.log('Response content-type:', contentType);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Example functions to get data
export async function getBlogPosts() {
  console.log('Fetching blog posts...');
  return fetchAPI('articles?populate=*');
}

export async function getBlogPost(slug: string) {
  return fetchAPI(`/articles?filters[slug][$eq]=${slug}&populate=*`);
}

// Add more API functions as needed
export default fetchAPI; 