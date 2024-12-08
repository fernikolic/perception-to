import { FooterLinks } from './footer-links';
import { FooterSocial } from './footer-social';
import { Logo } from '@/components/ui/logo';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-2xl font-bold">Perception</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Empowering businesses with innovative solutions. Transform your workflow
            and scale your operations with our comprehensive platform.
          </p>
        </div>
        
        <FooterLinks />
        
        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Perception. All rights reserved.
          </p>
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
}