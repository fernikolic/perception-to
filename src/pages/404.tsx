import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Perception</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Perception's Bitcoin sentiment analysis platform." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/docs">
                <Search className="mr-2 h-4 w-4" />
                View Docs
              </Link>
            </Button>
            
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/pricing" className="text-sm hover:underline">Pricing</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/api" className="text-sm hover:underline">API</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/docs" className="text-sm hover:underline">Docs</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/about" className="text-sm hover:underline">About</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}