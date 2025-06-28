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
import { LearnPage } from '@/pages/learn';
import { ArticlePage } from '@/pages/learn/[slug]';
import CategoryPage from '@/pages/learn/category/[slug]';
import TagPage from '@/pages/learn/tag/[slug]';
import { GlossaryPage } from '@/pages/glossary';
import { GlossaryEntryPage } from '@/pages/glossary/[slug]';
import { CmsLearnPage } from '@/pages/cms-learn';
import { LearnArticlePage } from '@/pages/cms-learn/[slug]';
import TestimonialsPage from '@/pages/testimonials';
import SlackTestingPage from '@/pages/slack-testing';
import SlackIntegrationPage from '@/pages/slack-integration';
import SocialPreviewPage from '@/pages/social-preview';
import FearGreedIndexPage from '@/pages/bitcoin-fear-greed-index';
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
              <Route path="/static-learn" element={<LearnPage />} />
              <Route path="/static-learn/category/:slug" element={<CategoryPage />} />
              <Route path="/static-learn/tag/:slug" element={<TagPage />} />
              <Route path="/static-learn/:category/:slug" element={<ArticlePage />} />
              <Route path="/static-learn//:slug" element={<ArticlePage />} />
              <Route path="/static-learn/:slug" element={<ArticlePage />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/glossary/:slug" element={<GlossaryEntryPage />} />
              <Route path="/learn" element={<CmsLearnPage />} />
              <Route path="/learn/:slug" element={<LearnArticlePage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/slack-testing" element={<SlackTestingPage />} />
              <Route path="/social-preview" element={<SocialPreviewPage />} />
              <Route path="/bitcoin-fear-greed-index" element={<FearGreedIndexPage />} />
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