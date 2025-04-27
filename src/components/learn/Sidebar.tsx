import { useEffect, useState } from 'react';
import { fetchCategories, fetchTags } from '@/lib/googleSheetsClient';

export function LearnSidebar() {
  const [categories, setCategories] = useState<{name: string, count: number}[]>([]);
  const [tags, setTags] = useState<{name: string, count: number}[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [categoriesData, tagsData] = await Promise.all([
          fetchCategories(),
          fetchTags()
        ]);
        
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error loading sidebar data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  if (loading) {
    return (
      <aside className="w-full md:w-64">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <div className="animate-pulse space-y-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-6 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-8 bg-gray-200 rounded w-16"></div>
            ))}
          </div>
        </div>
      </aside>
    );
  }
  
  return (
    <aside className="w-full md:w-64">
      {categories.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.name}>
                <a 
                  href={`/learn/category/${category.name}`}
                  className="flex justify-between hover:text-primary transition-colors"
                >
                  <span className="capitalize">{category.name}</span>
                  <span className="text-muted-foreground">{category.count}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {tags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <a 
                key={tag.name}
                href={`/learn/tag/${tag.name}`}
                className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors"
              >
                {tag.name} <span className="text-secondary-foreground/70">({tag.count})</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
} 