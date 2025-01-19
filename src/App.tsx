import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { CompaniesLanding } from '@/pages/landing/companies';
import { AboutPage } from '@/pages/about';
import { CareersPage } from '@/pages/careers';
import { PressPage } from '@/pages/press';
import { AnnouncementsPage } from '@/pages/announcements';
import PricingPage from '@/pages/pricing';
import { DocsPage } from '@/pages/docs';
import { ApiPage } from '@/pages/api';
import { RoadmapPage } from '@/pages/roadmap';
import { PrivacyPage } from '@/pages/legal/privacy';
import { TermsPage } from '@/pages/legal/terms';
import { LearnPage } from '@/pages/learn';
import { ArticlePage } from '@/pages/learn/[slug]';
import PageTransition from '@/components/PageTransition';

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
        return <CompaniesLanding />;
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
      case '/learn':
        return <LearnPage />;
      case '/learn/:slug':
        return <ArticlePage />;
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
      <Router>
        <div className="min-h-screen bg-background text-foreground dark">
          <Navbar />
          <PageTransition>
            <Routes>
              <Route path="/" element={renderContent()} />
              <Route path="/about" element={renderContent()} />
              <Route path="/press" element={renderContent()} />
              <Route path="/api" element={renderContent()} />
              <Route path="/docs" element={renderContent()} />
              <Route path="/announcements" element={renderContent()} />
              <Route path="/roadmap" element={renderContent()} />
              <Route path="/privacy" element={renderContent()} />
              <Route path="/terms" element={renderContent()} />
              <Route path="/learn" element={renderContent()} />
              <Route path="/learn/:slug" element={renderContent()} />
            </Routes>
          </PageTransition>
          <Footer />
          <FloatingNav />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;