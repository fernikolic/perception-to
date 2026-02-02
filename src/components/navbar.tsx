import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { BookDemoButton } from '@/components/calendar-modal';
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

const product: {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
  badge?: string;
  className?: string;
}[] = [
  {
    title: "Trends Dashboard",
    href: "/features/trends",
    description: "Surface emerging narratives in real-time"
  },
  {
    title: "Research Hub",
    href: "/features/research",
    description: "Search 450+ sources simultaneously"
  },
  {
    title: "Journalist Intelligence",
    href: "/features/journalist-intelligence",
    description: "Track reporter sentiment and coverage"
  },
  {
    title: "Spaces & Reports",
    href: "/features/spaces",
    description: "Organized workspaces and briefs"
  },
  {
    title: "Alerts",
    href: "/features/alerts",
    description: "Real-time mention and sentiment alerts"
  },
  {
    title: "Weekly Reports",
    href: "/features/weekly-reports",
    description: "Automated weekly intelligence digests"
  },
  {
    title: "Media Intelligence",
    href: "/features/sources",
    description: "450+ monitored sources"
  },
  {
    title: "Earnings Analysis",
    href: "/features/earnings-analysis",
    description: "Automated earnings call summaries"
  },
  {
    title: "Sample Report",
    href: "/features/sample-report",
    description: "See our intelligence in action"
  },
];

const resources: {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
  badge?: string;
  className?: string;
}[] = [
  {
    title: "Documentation",
    href: "/documentation",
    description: "Platform integration guides"
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
    href: "/bitcoin-media-research",
    description: "Join 2,000+ subscribers",
    className: "text-orange-500"
  },
  {
    title: "Methodology",
    href: "/methodology",
    description: "Our data collection process"
  },
];

const useCases: {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
  badge?: string;
  className?: string;
}[] = [
  {
    title: "Fund Analysts",
    href: "/use-cases/fund-analysts",
    description: "Research Bitcoin companies in minutes"
  },
  {
    title: "IR & Communications",
    href: "/use-cases/ir-communications",
    description: "Track coverage, prepare executives"
  },
  {
    title: "Family Offices",
    href: "/use-cases/family-offices",
    description: "Navigate your digital asset allocation"
  },
  {
    title: "Financial Journalists",
    href: "/use-cases/journalists",
    description: "Get up to speed on any story"
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
  {
    title: "Press",
    href: "/press",
    description: "Latest news and media resources"
  },
  {
    title: "Advisory",
    href: "#",
    description: "Strategic advisory services",
    disabled: true,
    badge: "Coming Soon"
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);

  useEffect(() => {
    // Helper function to check if an element at a point has dark background
    const isDarkAtPoint = (x: number, y: number): boolean | null => {
      const element = document.elementFromPoint(x, y);
      if (!element) return null;

      // First check for explicit dark section markers
      const parent = element.closest('[data-dark-section="true"]') ||
                    element.closest('.bg-black') ||
                    element.closest('.bg-gray-900') ||
                    element.closest('.dark\\:bg-black');

      if (parent) return true;

      // Check the actual background color of the element and its parents
      let currentElement: HTMLElement | null = element as HTMLElement;

      while (currentElement && currentElement !== document.body) {
        const bgColor = window.getComputedStyle(currentElement).backgroundColor;

        // Parse RGB values
        const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (rgbMatch) {
          const r = parseInt(rgbMatch[1]);
          const g = parseInt(rgbMatch[2]);
          const b = parseInt(rgbMatch[3]);

          // Calculate luminance (perceived brightness)
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

          // Only consider if background is not transparent
          if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            return luminance < 128;
          }
        }

        currentElement = currentElement.parentElement;
      }

      return false;
    };

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 0);

        // Sample multiple points across the navbar height
        // Header: pt-6 (24px) + nav h-16 (64px) = ~88px total
        // Sample at top (30px), middle (50px), and bottom (70px) of the visible header
        const samplePoints = [30, 50, 70];
        const centerX = window.innerWidth / 2;

        let darkCount = 0;
        let totalSamples = 0;

        for (const y of samplePoints) {
          const isDark = isDarkAtPoint(centerX, y);
          if (isDark !== null) {
            totalSamples++;
            if (isDark) darkCount++;
          }
        }

        // Only switch to dark mode when ALL sample points are over dark background
        // This ensures the entire header is covered before switching colors
        const allDark = totalSamples > 0 && darkCount === totalSamples;
        setIsOverDarkSection(allDark);

        ticking = false;
      });
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <header className="fixed top-0 z-50 w-full transition-all duration-500 px-8 sm:px-16 lg:px-32 xl:px-40 2xl:px-48 pt-6">
      <nav
        className={cn(
          "w-full rounded-full transition-all duration-500 border",
          isScrolled
            ? "bg-background/40 backdrop-blur-2xl shadow-2xl border-white/20 dark:border-white/10"
            : "bg-background/30 backdrop-blur-xl shadow-xl border-white/10 dark:border-white/5"
        )}
        style={{
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        <div className="mx-auto max-w-5xl flex h-16 items-center justify-between px-8 lg:px-10">
          <a href="/" className="flex items-center gap-2 group">
            <Logo white={isOverDarkSection} />
            <span className={cn(
              "text-xl font-bold tracking-tight transition-colors group-hover:text-primary",
              isOverDarkSection ? "text-white" : "text-black dark:text-white"
            )}>Perception</span>
          </a>

        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent font-medium text-sm hover:text-primary transition-colors",
                  isOverDarkSection ? "text-white" : "text-black dark:text-white"
                )}>
                  Product
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 bg-background rounded-lg border shadow-lg w-[700px]">
                    <ul className="grid grid-cols-3 gap-2">
                      {product.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className={cn(
                                "block rounded-lg p-3 transition-colors",
                                item.disabled ? "cursor-not-allowed opacity-70" : "hover:bg-accent/10",
                                item.className
                              )}
                              onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                            >
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={cn("text-sm font-medium", item.className)}>
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <Badge variant="secondary" className="text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground leading-tight">
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
                <NavigationMenuTrigger className={cn(
                  "bg-transparent font-medium text-sm hover:text-primary transition-colors",
                  isOverDarkSection ? "text-white" : "text-black dark:text-white"
                )}>
                  Use Cases
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 bg-background rounded-lg border shadow-lg w-[500px]">
                    <ul className="grid grid-cols-2 gap-2">
                      {useCases.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className={cn(
                                "block rounded-lg p-3 transition-colors",
                                item.disabled ? "cursor-not-allowed opacity-70" : "hover:bg-accent/10",
                                item.className
                              )}
                              onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                            >
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={cn("text-sm font-medium", item.className)}>
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <Badge variant="secondary" className="text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground leading-tight">
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
                <NavigationMenuTrigger className={cn(
                  "bg-transparent font-medium text-sm hover:text-primary transition-colors",
                  isOverDarkSection ? "text-white" : "text-black dark:text-white"
                )}>
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 bg-background rounded-lg border shadow-lg w-[400px]">
                    <ul className="grid grid-cols-2 gap-2">
                      {resources.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className={cn(
                                "block rounded-lg p-3 transition-colors",
                                item.disabled ? "cursor-not-allowed opacity-70" : "hover:bg-accent/10",
                                item.className
                              )}
                              onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                            >
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={cn("text-sm font-medium", item.className)}>
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <Badge variant="secondary" className="text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground leading-tight">
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
                <NavigationMenuTrigger className={cn(
                  "bg-transparent font-medium text-sm hover:text-primary transition-colors",
                  isOverDarkSection ? "text-white" : "text-black dark:text-white"
                )}>
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 bg-background rounded-lg border shadow-lg w-[300px]">
                    <ul className="space-y-1">
                      {company.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className={cn(
                                "block rounded-lg p-3 transition-colors",
                                item.disabled ? "cursor-not-allowed opacity-70" : "hover:bg-accent/10",
                                item.className
                              )}
                              onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                            >
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={cn("text-sm font-medium", item.className)}>
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <Badge variant="secondary" className="text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground leading-tight">
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
                <a href="/pricing" className={cn(
                  "text-sm font-medium hover:text-primary transition-colors px-4 py-2",
                  isOverDarkSection ? "text-white" : "text-black dark:text-white"
                )}>
                  Pricing
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-8">
          <a
            href="https://app.perception.to/auth/sign-in"
            className={cn(
              "text-sm font-medium hover:text-primary transition-colors",
              isOverDarkSection ? "text-white" : "text-black dark:text-white"
            )}
          >
            Login
          </a>
          <BookDemoButton
            size="default"
            className="rounded-full px-6 h-10 text-sm font-medium shadow-md hover:shadow-lg"
          />
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
        </div>
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
            {/* Product Section */}
            <div>
              <button
                className="flex w-full items-center justify-between text-lg font-medium"
                onClick={() => toggleSection('product')}
              >
                Product
                {expandedSection === 'product' ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {expandedSection === 'product' && (
                <div className="mt-4 space-y-4 pl-4">
                  {product.map((item) => (
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

            {/* Use Cases Section */}
            <div>
              <button
                className="flex w-full items-center justify-between text-lg font-medium"
                onClick={() => toggleSection('usecases')}
              >
                Use Cases
                {expandedSection === 'usecases' ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {expandedSection === 'usecases' && (
                <div className="mt-4 space-y-4 pl-4">
                  {useCases.map((item) => (
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
            <div className="space-y-2">
              <a 
                href="https://app.perception.to/auth/sign-in" 
                className="block w-full text-center text-sm hover:text-primary"
              >
                Login
              </a>
              <BookDemoButton
                size="default"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}