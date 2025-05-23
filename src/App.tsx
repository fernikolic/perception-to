import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { ProblemSolution } from '@/components/problem-solution';
import { ProblemCards } from '@/components/problem-cards';
import { AsSeenOn } from '@/components/as-seen-on';
import { Features } from '@/components/features';
import { Integrations } from '@/components/integrations';
import { Community } from '@/components/community';
import { Pricing } from '@/components/pricing';
import { Testimonials } from '@/components/testimonials';
import { Faq } from '@/components/faq';
import { Footer } from '@/components/footer';
import { FloatingNav } from '@/components/floating-nav';
import ScrollToTop from '@/components/ScrollToTop';
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
import CategoryPage from '@/pages/learn/category/[slug]';
import TagPage from '@/pages/learn/tag/[slug]';
import TestimonialsPage from '@/pages/testimonials';
import PageTransition from '@/components/PageTransition';

function HomePage() {
  return (
    <main>
      <Hero />
      <ProblemSolution />
      <AsSeenOn />
      <ProblemCards />
      <Features />
      <Integrations />
      <Community />
      <Testimonials />
      <Pricing />
      <Faq />
    </main>
  );
}

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <ScrollToTop />
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/methodology" element={<MethodologyPage />} />
            <Route path="/journalist" element={<JournalistLanding />} />
            <Route path="/investor" element={<InvestorLanding />} />
            <Route path="/researcher" element={<CompaniesLanding />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/category/:slug" element={<CategoryPage />} />
            <Route path="/learn/tag/:slug" element={<TagPage />} />
            <Route path="/learn/:category/:slug" element={<ArticlePage />} />
            <Route path="/learn//:slug" element={<ArticlePage />} />
            <Route path="/learn/:slug" element={<ArticlePage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
          </Routes>
        </PageTransition>
        <Footer />
        <FloatingNav />
      </div>
    </ThemeProvider>
  );
};

export default App;