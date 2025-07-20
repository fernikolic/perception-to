import { useParams } from 'react-router-dom';
import { keywordMatrix } from '@/data/keywords';
import EnhancedSentimentPage from './EnhancedSentimentPage';
import AnalyticsPage from './AnalyticsPage';
import ToolsPage from './ToolsPage';
import GuidesPage from './GuidesPage';
import APIPage from './APIPage';

export default function ProgrammaticRouter() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  
  // Find the keyword that matches this category and slug
  const keyword = keywordMatrix.find(k => {
    const keywordSlug = k.fullKeyword
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    return k.category === category && keywordSlug === slug;
  });

  if (!keyword) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-zinc-400">The requested page could not be found.</p>
        </div>
      </div>
    );
  }

  // Route to the appropriate template based on category and template type
  switch (keyword.category) {
    case 'sentiment':
      return <EnhancedSentimentPage />;
    case 'analytics':
      return <AnalyticsPage />;
    case 'tools':
      return <ToolsPage />;
    case 'guides':
      return <GuidesPage />;
    case 'api':
      return <APIPage />;
    default:
      // Fallback based on template type
      switch (keyword.templateType) {
        case 'sentiment-dashboard':
          return <EnhancedSentimentPage />;
        case 'analytics-page':
          return <AnalyticsPage />;
        case 'tool-page':
          return <ToolsPage />;
        case 'educational-guide':
          return <GuidesPage />;
        case 'api-documentation':
          return <APIPage />;
        default:
          return <EnhancedSentimentPage />; // Default fallback
      }
  }
}