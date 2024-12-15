import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { AsSeenOn } from '@/components/as-seen-on';
import { Features } from '@/components/features';
import { Integrations } from '@/components/integrations';
import { Community } from '@/components/community';
import { Pricing } from '@/components/pricing';
import { Testimonials } from '@/components/testimonials';
import { Faq } from '@/components/faq';
import { Footer } from '@/components/footer';
import { FloatingNav } from '@/components/floating-nav';
import { useEffect, useState } from 'react';
import MethodologyPage from './pages/methodology';
import { JournalistLanding } from '@/pages/landing/journalist';
import { InvestorLanding } from '@/pages/landing/investor';
import { ResearcherLanding } from '@/pages/landing/researcher';
import { AboutPage } from '@/pages/about';
import { CareersPage } from '@/pages/careers';
import { PressPage } from '@/pages/press';
import { AnnouncementsPage } from '@/pages/announcements';
import { PricingPage } from '@/pages/pricing';
import { DocsPage } from '@/pages/docs';
import { ApiPage } from '@/pages/api';
import { RoadmapPage } from '@/pages/roadmap';
import { PrivacyPage } from '@/pages/legal/privacy';
import { TermsPage } from '@/pages/legal/terms';

const App = () => {
  const [path, setPath] = useState('/');

  useEffect(() => {
    setPath(window.location.pathname);

    const handlePathChange = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  const renderContent = () => {
    switch (path) {
      case '/methodology':
        return <MethodologyPage />;
      case '/journalist':
        return <JournalistLanding />;
      case '/investor':
        return <InvestorLanding />;
      case '/researcher':
        return <ResearcherLanding />;
      case '/about':
        return <AboutPage />;
      case '/careers':
        return <CareersPage />;
      case '/press':
        return <PressPage />;
      case '/announcements':
        return <AnnouncementsPage />;
      case '/pricing':
        return <PricingPage />;
      case '/docs':
        return <DocsPage />;
      case '/api':
        return <ApiPage />;
      case '/roadmap':
        return <RoadmapPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      default:
        return (
          <main>
            <Hero />
            <AsSeenOn />
            <Features />
            <Integrations />
            <Community />
            <Testimonials />
            <Pricing />
            <Faq />
          </main>
        );
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        {renderContent()}
        <Footer />
        <FloatingNav />
      </div>
    </ThemeProvider>
  );
};

export default App;