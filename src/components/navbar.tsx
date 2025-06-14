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
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';

const resources: {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
  badge?: string;
  className?: string;
}[] = [
  { 
    title: "Learn", 
    href: "/learn",
    description: "Guides and market analysis"
  },
  { 
    title: "Glossary", 
    href: "/glossary",
    description: "Terminology and concepts"
  },
  { 
    title: "Documentation", 
    href: "#",
    description: "Platform integration guides",
    disabled: true,
    badge: "Coming Soon"
  },
  { 
    title: "API Reference", 
    href: "#",
    description: "Developer documentation",
    disabled: true,
    badge: "Coming Soon"
  },
  { 
    title: "Bitcoin Media Research", 
    href: "https://bitcoinperception.com", 
    description: "Join 1,500+ subscribers",
    className: "text-orange-500"
  },
  { 
    title: "Methodology", 
    href: "/methodology", 
    description: "Our data collection process"
  },
];

const company: {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
  badge?: string;
  className?: string;
}[] = [
  { 
    title: "About", 
    href: "/about", 
    description: "Learn about our mission and team"
  },
  // { 
  //   title: "Careers", 
  //   href: "#",
  //   description: "Join our growing team",
  //   disabled: true,
  //   badge: "Coming Soon"
  // },
  { 
    title: "Press", 
    href: "/press", 
    description: "Latest news and media resources",
    disabled: true,
    badge: "Coming Soon"
  },
  { 
    title: "Announcements", 
    href: "/announcements", 
    description: "Product updates and company news",
    disabled: true,
    badge: "Coming Soon"
  },
  { 
    title: "Roadmap", 
    href: "/roadmap",
    description: "See what we're building"
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <header className="fixed top-0 z-50 w-full transition-all duration-300">
      <nav 
        className={cn(
          "mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8",
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
          <NavigationMenu className="w-full">
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 bg-background rounded-lg border shadow-lg min-w-[500px] max-w-[600px]">
                    <ul className="space-y-3">
                      {resources.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className={cn(
                                "block rounded-md p-3 transition-colors",
                                item.disabled ? "cursor-not-allowed opacity-70" : "hover:bg-accent/5 hover:text-foreground",
                                item.className
                              )}
                              onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                            >
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={cn("text-sm font-medium", item.className)}>
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <Badge variant="secondary" className="text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              <div 
                                className="text-sm text-muted-foreground" 
                                style={{ 
                                  whiteSpace: 'normal', 
                                  wordWrap: 'break-word', 
                                  overflowWrap: 'break-word',
                                  maxWidth: '100%',
                                  width: '100%',
                                  lineHeight: '1.4'
                                }}
                              >
                                {item.description}
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 bg-background rounded-lg border shadow-lg min-w-[500px] max-w-[600px]">
                    <ul className="space-y-3">
                      {company.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className={cn(
                                "block rounded-md p-3 transition-colors",
                                item.disabled ? "cursor-not-allowed opacity-70" : "hover:bg-accent/5 hover:text-foreground",
                                item.className
                              )}
                              onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                            >
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={cn("text-sm font-medium", item.className)}>
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <Badge variant="secondary" className="text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              <div 
                                className="text-sm text-muted-foreground" 
                                style={{ 
                                  whiteSpace: 'normal', 
                                  wordWrap: 'break-word', 
                                  overflowWrap: 'break-word',
                                  maxWidth: '100%',
                                  width: '100%',
                                  lineHeight: '1.4'
                                }}
                              >
                                {item.description}
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
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
          <ThemeToggle />
          <a 
            href="https://app.perception.to/auth/sign-in" 
            className="text-sm hover:text-primary"
          >
            Login
          </a>
          <Button 
            className="bg-black text-white hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl"
            asChild
          >
            <a href="https://app.perception.to/auth/sign-up">
              Get Instant Access
            </a>
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

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            {/* Resources Section */}
            <div>
              <button
                className="flex w-full items-center justify-between text-lg font-medium"
                onClick={() => toggleSection('resources')}
              >
                Resources
                {expandedSection === 'resources' ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {expandedSection === 'resources' && (
                <div className="mt-4 space-y-4 pl-4">
                  {resources.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "block text-muted-foreground hover:text-foreground transition-colors",
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Company Section */}
            <div>
              <button
                className="flex w-full items-center justify-between text-lg font-medium"
                onClick={() => toggleSection('company')}
              >
                Company
                {expandedSection === 'company' ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {expandedSection === 'company' && (
                <div className="mt-4 space-y-4 pl-4">
                  {company.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "block text-muted-foreground hover:text-foreground transition-colors",
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/pricing" className="block text-lg font-medium">
              Pricing
            </a>
          </div>

          <div className="mt-auto p-4 space-y-4 border-t">
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
            <div className="space-y-2">
              <a 
                href="https://app.perception.to/auth/sign-in" 
                className="block w-full text-center text-sm hover:text-primary"
              >
                Login
              </a>
              <Button 
                className="w-full bg-black text-white hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-900"
                asChild
              >
                <a href="https://app.perception.to/auth/sign-up">
                  Get Instant Access
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}