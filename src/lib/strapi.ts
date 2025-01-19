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

  // Remove double /api if it exists
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${STRAPI_URL}${cleanEndpoint}`;
  console.log('Making request to:', fullUrl);

  try {
    console.log('Request options:', {
      ...mergedOptions,
      headers: Object.keys(mergedOptions.headers || {}),
    });

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
  return fetchAPI('/articles?populate=*');
}

export async function getBlogPost(id: string) {
  return fetchAPI(`/articles/${id}?populate=*`);
}

// Add more API functions as needed
export default fetchAPI; 