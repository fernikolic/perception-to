import { BlogCard } from './blog-card';

const posts = [
  {
    title: 'Maximizing Productivity with Automation',
    excerpt: 'Learn how to leverage our automation features to streamline your workflow and boost team productivity.',
    date: 'March 15, 2024',
    author: {
      name: 'David Kim',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    slug: 'maximizing-productivity-automation',
  },
  // Add more blog posts
];

export function BlogPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">
            Latest Updates
          </h1>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}