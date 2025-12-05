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
import BouncingPointCloud from '@/components/BouncingPointCloud';
import WavyYinYangNoDots from '@/components/WavyYinYangNoDots';
import PineconeDelicate from '@/components/PineconeDelicate';
import WaterAscii from '@/components/WaterAscii';
import Metamorphosis from '@/components/Metamorphosis';
import VerticalBarsNoise from '@/components/VerticalBarsNoise';
import FlowingPattern from '@/components/FlowingPattern';
import KaleidoscopeVariation3 from '@/components/KaleidoscopeVariation3';

const resources: {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
  badge?: string;
  className?: string;
  animation?: React.ComponentType;
}[] = [
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
    href: "/bitcoin-media-research",
    description: "Join 2,000+ subscribers",
    className: "text-orange-500",
    animation: WaterAscii
  },
  {
    title: "Methodology",
    href: "/methodology",
    description: "Our data collection process",
    animation: Metamorphosis
  },
];

const useCases: {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
  badge?: string;
  className?: string;
  animation?: React.ComponentType;
}[] = [
  {
    title: "Executive Intelligence",
    href: "/use-cases/executive-intelligence",
    description: "Board-ready competitive intelligence",
    animation: BouncingPointCloud
  },
  {
    title: "Stakeholder Communications",
    href: "/use-cases/stakeholder-communications",
    description: "Automated stakeholder reports",
    animation: PineconeDelicate
  },
  {
    title: "Data-Backed Journalism",
    href: "/use-cases/journalism",
    description: "Quantifiable media intelligence",
    animation: KaleidoscopeVariation3
  },
  {
    title: "PR Intelligence",
    href: "/use-cases/pr-agency",
    description: "Reporter targeting & client tracking",
    animation: WavyYinYangNoDots
  },
];

const company: {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
  badge?: string;
  className?: string;
  animation?: React.ComponentType;
}[] = [
  {
    title: "About",
    href: "/about",
    description: "Learn about our mission and team",
    animation: VerticalBarsNoise
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
    animation: FlowingPattern
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      // Check if navbar is over a dark section
      const navbarHeight = 100; // approximate navbar height including padding
      const elementAtNavbar = document.elementFromPoint(window.innerWidth / 2, navbarHeight);

      if (elementAtNavbar) {
        // First check for explicit dark section markers
        const parent = elementAtNavbar.closest('[data-dark-section="true"]') ||
                      elementAtNavbar.closest('.bg-black') ||
                      elementAtNavbar.closest('.bg-gray-900') ||
                      elementAtNavbar.closest('.dark\\:bg-black');

        if (parent) {
          setIsOverDarkSection(true);
          return;
        }

        // Check the actual background color of the element and its parents
        let currentElement: HTMLElement | null = elementAtNavbar as HTMLElement;
        let isDark = false;

        while (currentElement && currentElement !== document.body) {
          const bgColor = window.getComputedStyle(currentElement).backgroundColor;

          // Parse RGB values
          const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);

            // Calculate luminance (perceived brightness)
            // Using the formula: 0.299*R + 0.587*G + 0.114*B
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

            // If luminance is less than 128 (out of 255), it's dark
            // Only set if the background is not transparent
            if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
              isDark = luminance < 128;
              console.log(`Navbar detection - BG: ${bgColor}, Luminance: ${luminance.toFixed(2)}, isDark: ${isDark}`);
              break;
            }
          }

          currentElement = currentElement.parentElement;
        }

        setIsOverDarkSection(isDark);
      }
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll);
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
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 bg-background rounded-lg border shadow-lg min-w-[500px] max-w-[700px]">
                    <ul className="space-y-3">
                      {resources.map((item) => {
                        const AnimationComponent = item.animation;
                        return (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={item.href}
                                className={cn(
                                  "block rounded-md transition-colors overflow-hidden",
                                  item.disabled ? "cursor-not-allowed opacity-70" : "hover:bg-accent/5 hover:text-foreground",
                                  item.className
                                )}
                                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                              >
                                <div className="flex items-center gap-3">
                                  {/* ASCII Animation Preview */}
                                  {AnimationComponent && (
                                    <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden relative bg-[#F0EEE6]">
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-[200%] h-[200%] scale-[0.35] origin-center">
                                          <AnimationComponent />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {/* Text Content */}
                                  <div className={cn("flex-1 py-3", AnimationComponent ? "pr-3" : "px-3")}>
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
                                  </div>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
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
                  <div className="p-4 bg-background rounded-lg border shadow-lg min-w-[500px] max-w-[700px]">
                    <ul className="space-y-3">
                      {company.map((item) => {
                        const AnimationComponent = item.animation;
                        return (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={item.href}
                                className={cn(
                                  "block rounded-md transition-colors overflow-hidden",
                                  item.disabled ? "cursor-not-allowed opacity-70" : "hover:bg-accent/5 hover:text-foreground",
                                  item.className
                                )}
                                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                              >
                                <div className="flex items-center gap-3">
                                  {/* ASCII Animation Preview */}
                                  {AnimationComponent && (
                                    <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden relative bg-[#F0EEE6]">
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-[200%] h-[200%] scale-[0.35] origin-center">
                                          <AnimationComponent />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {/* Text Content */}
                                  <div className={cn("flex-1 py-3", AnimationComponent ? "pr-3" : "px-3")}>
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
                                  </div>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
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
                  <div className="p-4 bg-background rounded-lg border shadow-lg min-w-[500px] max-w-[700px]">
                    <ul className="space-y-3">
                      {useCases.map((item) => {
                        const AnimationComponent = item.animation;
                        return (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={item.href}
                                className={cn(
                                  "block rounded-md transition-colors overflow-hidden",
                                  item.disabled ? "cursor-not-allowed opacity-70" : "hover:bg-accent/5 hover:text-foreground",
                                  item.className
                                )}
                                onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                              >
                                <div className="flex items-center gap-3">
                                  {/* ASCII Animation Preview */}
                                  {AnimationComponent && (
                                    <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden relative bg-[#F0EEE6]">
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-[200%] h-[200%] scale-[0.35] origin-center">
                                          <AnimationComponent />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {/* Text Content */}
                                  <div className="flex-1 py-3 pr-3">
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
                                  </div>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
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
          <Button
            className="bg-black text-white hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-900 transition-all shadow-md hover:shadow-lg rounded-full px-6 h-10 text-sm font-medium"
            asChild
          >
            <a href="https://app.perception.to/auth/sign-up">
              Start here
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
              <Button 
                className="w-full bg-black text-white hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-900"
                asChild
              >
                <a href="https://app.perception.to/auth/sign-up">
                  Start here
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}