import { useLocation } from 'react-router-dom';
import { getSocialImageForPath } from '@/utils/social-image-validator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SocialGraphPreview() {
  const location = useLocation();
  const socialImage = getSocialImageForPath(location.pathname);
  
  // Get current page meta
  const title = document.title;
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="border shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Social Graph Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Facebook/LinkedIn Preview */}
          <div className="border rounded p-2">
            <p className="text-xs text-gray-500 mb-1">Facebook/LinkedIn</p>
            {ogImage && (
              <img 
                src={ogImage} 
                alt="Social preview" 
                className="w-full h-20 object-cover rounded mb-2"
                onError={(e) => {
                  console.error('Social image failed to load:', ogImage);
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
            <p className="text-xs text-gray-600 line-clamp-2 mt-1">{description}</p>
            <p className="text-xs text-gray-400 mt-1">perception.to</p>
          </div>
          
          {/* Twitter Preview */}
          <div className="border rounded p-2">
            <p className="text-xs text-gray-500 mb-1">Twitter</p>
            {ogImage && (
              <img 
                src={ogImage} 
                alt="Twitter preview" 
                className="w-full h-20 object-cover rounded mb-2"
                onError={(e) => {
                  console.error('Social image failed to load:', ogImage);
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
            <p className="text-xs text-gray-600 line-clamp-2 mt-1">{description}</p>
            <p className="text-xs text-gray-400 mt-1">perception.to</p>
          </div>
          
          {/* Debug Info */}
          <div className="text-xs text-gray-500 pt-2 border-t">
            <p>Path: {location.pathname}</p>
            <p>Image: {socialImage.url.split('/').pop()}</p>
            <p>Dimensions: {socialImage.width}×{socialImage.height}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}