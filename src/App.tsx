import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/theme-provider';
import { SocialMeta } from '@/components/seo/social-meta';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { ProblemSolution } from '@/components/problem-solution';
import { ProblemCards } from '@/components/problem-cards';
import { AsSeenOn } from '@/components/as-seen-on';
import { Features } from '@/components/features';
import { ValueProps } from '@/components/value-props';
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
import { UseCasesLanding } from '@/pages/use-cases';
import { AboutPage } from '@/pages/about';
// import { CareersPage } from '@/pages/careers';
import { PressPage } from '@/pages/press';
import { AnnouncementsPage } from '@/pages/announcements';
import PricingPage from '@/pages/pricing';
import BookACallPage from '@/pages/book-a-call';
import { DocsPage } from '@/pages/docs';
import { ApiPage } from '@/pages/api';
import { RoadmapPage } from '@/pages/roadmap';
import { PrivacyPage } from '@/pages/legal/privacy';
import { TermsPage } from '@/pages/legal/terms';
import TestimonialsPage from '@/pages/testimonials';
import SlackTestingPage from '@/pages/slack-testing';
import SlackIntegrationPage from '@/pages/slack-integration';
import SocialPreviewPage from '@/pages/social-preview';
import FearGreedIndexPage from '@/pages/bitcoin-fear-greed-index';
import BitcoinMarketSentimentIndexPage from '@/pages/bitcoin-market-sentiment';
import BitcoinMarketSentimentPage from '@/pages/bitcoin-market-sentiment/[month]';
import BitcoinDailySentimentPage from '@/pages/bitcoin-market-sentiment/[date]';
import PageTransition from '@/components/PageTransition';
import ProgrammaticRouter from '@/components/programmatic-seo/ProgrammaticRouter';
import KeywordTest from '@/components/programmatic-seo/KeywordTest';
import ContentShowcase from '@/components/programmatic-seo/ContentShowcase';
import CMSIntegration from '@/components/programmatic-seo/CMSIntegration';
import { BitcoinMediaResearchPage } from '@/pages/bitcoin-media-research';
import BitcoinBadTakes from '@/pages/bitcoin-bad-takes';
import NotFoundPage from '@/pages/404';

function HomePage() {
  return (
    <main>
      <Hero />
      <AsSeenOn />
      <ProblemSolution />
      <ProblemCards />
      <ValueProps />
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
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <div className="min-h-screen bg-background text-foreground">
          <SocialMeta />
          <Navbar />
          <ScrollToTop />
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/methodology" element={<MethodologyPage />} />
              <Route path="/journalist" element={<JournalistLanding />} />
              <Route path="/investor" element={<InvestorLanding />} />
              <Route path="/researcher" element={<CompaniesLanding />} />
              <Route path="/use-cases" element={<UseCasesLanding />} />
              <Route path="/about" element={<AboutPage />} />
              {/* <Route path="/careers" element={<CareersPage />} /> */}
              <Route path="/press" element={<PressPage />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/book-a-call" element={<BookACallPage />} />
              <Route path="/slack-integration" element={<SlackIntegrationPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/api" element={<ApiPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/slack-testing" element={<SlackTestingPage />} />
              <Route path="/social-preview" element={<SocialPreviewPage />} />
              <Route path="/bitcoin-fear-greed-index" element={<FearGreedIndexPage />} />
              <Route path="/bitcoin-market-sentiment" element={<BitcoinMarketSentimentIndexPage />} />
              <Route path="/bitcoin-market-sentiment/:year/:month" element={<BitcoinMarketSentimentPage />} />
              <Route path="/bitcoin-market-sentiment/:year/:month/:day" element={<BitcoinDailySentimentPage />} />
              <Route path="/bitcoin-media-research" element={<BitcoinMediaResearchPage />} />
              <Route path="/bitcoin-bad-takes/*" element={<BitcoinBadTakes />} />
              
              {/* Programmatic SEO Routes */}
              <Route path="/sentiment/:slug" element={<ProgrammaticRouter />} />
              <Route path="/analytics/:slug" element={<ProgrammaticRouter />} />
              <Route path="/tools/:slug" element={<ProgrammaticRouter />} />
              <Route path="/guides/:slug" element={<ProgrammaticRouter />} />
              <Route path="/api-docs/:slug" element={<ProgrammaticRouter />} />
              
              {/* Test Routes for Development */}
              <Route path="/keyword-test" element={<KeywordTest />} />
              <Route path="/content-showcase" element={<ContentShowcase />} />
              <Route path="/cms-integration" element={<CMSIntegration />} />
              
              {/* 404 catch-all route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PageTransition>
          <Footer />
          <FloatingNav />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;