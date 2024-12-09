import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Menu, X } from 'lucide-react';

const useCases = [
  {
    title: "For Investors",
    href: "/investor",
    description: "Make data-driven decisions with real-time market insights",
    image: "https://images.unsplash.com/photo-1642790551116-18e4f8f6c637?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "For Researchers",
    href: "/researcher",
    description: "Analyze trends and narratives across the Bitcoin ecosystem",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "For Journalists",
    href: "/journalist",
    description: "Discover emerging stories and create data-backed content",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
  },
];

const resources = [
  { title: "Documentation", href: "/docs", description: "Learn how to integrate and use our platform" },
  { title: "API Reference", href: "/api", description: "Detailed API documentation for developers" },
];

const company = [
  { title: "About", href: "/about", description: "Learn about our mission and team" },
  { title: "Careers", href: "/careers", description: "Join our growing team" },
  { title: "Press", href: "/press", description: "Latest news and media resources" },
  { title: "Announcements", href: "/announcements", description: "Product updates and company news" },
  { title: "Roadmap", href: "/roadmap", description: "See what we're building" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full transition-all duration-300">
      <nav 
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
          isScrolled 
            ? "bg-background/80 backdrop-blur-xl shadow-lg" 
            : "bg-transparent"
        )}
      >
        <a href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-2xl font-bold">Perception</span>
        </a>

        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Use Cases
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[calc(100vw-2rem)] max-w-[90vw] md:max-w-[1200px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-3 relative">
                    {useCases.map((useCase) => (
                      <NavigationMenuLink
                        key={useCase.title}
                        href={useCase.href}
                        className="block space-y-1 rounded-lg p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex flex-col gap-2">
                          <img
                            src={useCase.image}
                            alt={useCase.title}
                            className="h-28 w-full rounded-lg object-cover"
                          />
                          <div>
                            <div className="text-lg font-medium leading-none">
                              {useCase.title}
                            </div>
                            <p className="mt-2 line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {useCase.description}
                            </p>
                          </div>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[calc(100vw-2rem)] max-w-[400px] gap-3 p-4">
                    {resources.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[calc(100vw-2rem)] max-w-[400px] gap-3 p-4">
                    {company.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <a href="/pricing" className="text-sm hover:text-primary">
                  Pricing
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-6">
          <a 
            href="https://app.perception.to/auth/login" 
            className="text-sm hover:text-primary"
          >
            Login
          </a>
          <Button 
            className="bg-white text-black hover:bg-white/90 transition-all"
            onClick={() => window.location.href = 'https://app.perception.to/auth/signup'}
          >
            Get Started
          </Button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium px-3">Use Cases</div>
                {useCases.map((useCase) => (
                  <a
                    key={useCase.title}
                    href={useCase.href}
                    className="block px-3 py-2 text-sm hover:bg-accent rounded-lg"
                  >
                    {useCase.title}
                  </a>
                ))}
              </div>

              <div className="space-y-2">
                <div className="font-medium px-3">Resources</div>
                {resources.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block px-3 py-2 text-sm hover:bg-accent rounded-lg"
                  >
                    {item.title}
                  </a>
                ))}
              </div>

              <div className="space-y-2">
                <div className="font-medium px-3">Company</div>
                {company.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block px-3 py-2 text-sm hover:bg-accent rounded-lg"
                  >
                    {item.title}
                  </a>
                ))}
              </div>

              <a
                href="/pricing"
                className="block px-3 py-2 text-sm hover:bg-accent rounded-lg"
              >
                Pricing
              </a>

              <div className="space-y-2 pt-4">
                <a
                  href="https://app.perception.to/auth/login"
                  className="block px-3 py-2 text-sm hover:bg-accent rounded-lg"
                >
                  Login
                </a>
                <div className="px-3">
                  <Button 
                    className="w-full bg-white text-black hover:bg-white/90 transition-all"
                    onClick={() => window.location.href = 'https://app.perception.to/auth/signup'}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}