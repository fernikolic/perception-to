import { SocialImagePreview } from '@/components/social-image-preview';

export default function SocialPreviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Social Media Preview Testing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test and preview how your Bitcoin Perception pages will look when shared on social media platforms. 
            Generate custom Open Graph images with our automated branding.
          </p>
        </div>
        
        <SocialImagePreview />
      </div>
    </div>
  );
} 