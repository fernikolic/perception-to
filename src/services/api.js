const API_URL = import.meta.env.VITE_API_URL || 'https://your-worker.workers.dev';

export const getPages = async () => {
  const response = await fetch(`${API_URL}/pages`);
  return response.json();
};

export const getBlogPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
}; 