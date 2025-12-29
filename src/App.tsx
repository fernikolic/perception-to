import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { SocialMeta } from '@/components/seo/social-meta';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { ProblemSolution } from '@/components/problem-solution';
import { ProblemCards } from '@/components/problem-cards';
import { Features } from '@/components/features';
import { ValueProps } from '@/components/value-props';
import { Integrations } from '@/components/integrations';
import { Community } from '@/components/community';
import { Pricing } from '@/components/pricing';
import { Testimonials } from '@/components/testimonials';
import { Faq } from '@/components/faq';
import { Footer } from '@/components/footer';
import { FloatingNav } from '@/components/floating-nav';
import { ExitIntentPopup } from '@/components/exit-intent-popup';
import ScrollToTop from '@/components/ScrollToTop';
import MethodologyPage from './pages/methodology';
import { JournalistLanding } from '@/pages/landing/journalist';
import { InvestorLanding } from '@/pages/landing/investor';
import { CompaniesLanding } from '@/pages/landing/companies';
import { UseCasesLanding } from '@/pages/use-cases';
import { ExecutiveIntelligencePage } from '@/pages/use-cases/executive-intelligence';
import { StakeholderCommunicationsPage } from '@/pages/use-cases/stakeholder-communications';
import { JournalismPage } from '@/pages/use-cases/journalism';
import { PRAgencyPage } from '@/pages/use-cases/pr-agency';
import { AboutPage } from '@/pages/about';
// import { CareersPage } from '@/pages/careers';
import { PressPage } from '@/pages/press';
import { AnnouncementsPage } from '@/pages/announcements';
import { BrandPage } from '@/pages/brand';
import PricingPage from '@/pages/pricing';
import BookACallPage from '@/pages/book-a-call';
import { DocsPage } from '@/pages/documentation';
import { ApiPage } from '@/pages/api';
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
import { BitcoinMediaResearchPage } from '@/pages/bitcoin-media-research';
import BitcoinBadTakes from '@/pages/bitcoin-bad-takes';
import CryptoConferencesPage from '@/pages/crypto-conferences';
import ConferencePage from '@/pages/crypto-conferences/[conference]';
import TrackedConferencePage from '@/pages/crypto-conferences/tracked/[slug]';
import TwitterSentimentLeaderboard from '@/pages/twitter-sentiment-leaderboard-apple';
import LeaderboardOGImage from '@/pages/og/leaderboard';
import NotFoundPage from '@/pages/404';
import AlternativesIndexPage from '@/pages/alternatives/index';
import LunarCrushAlternativePage from '@/pages/alternatives/lunarcrush-alternative';
import SantimentAlternativePage from '@/pages/alternatives/santiment-alternative';
import AlternativeMeAlternativePage from '@/pages/alternatives/alternative-me-alternative';
import BestCryptoSentimentToolsPage from '@/pages/compare/best-crypto-sentiment-tools';
import LearnIndexPage from '@/pages/learn/index';
import WhatIsCryptoSentimentAnalysisPage from '@/pages/learn/what-is-crypto-sentiment-analysis';
import HowToReadFearGreedIndexPage from '@/pages/learn/how-to-read-fear-greed-index';
import BitcoinMarketPsychologyPage from '@/pages/learn/bitcoin-market-psychology';
import CryptoNarrativeTradingPage from '@/pages/learn/crypto-narrative-trading';
import UnderstandingBitcoinDominancePage from '@/pages/learn/understanding-bitcoin-dominance';
import CryptoSocialSentimentPage from '@/pages/learn/crypto-social-sentiment';
import PerceptionVsGlassnodePage from '@/pages/compare/perception-vs-glassnode';
import BestCryptoNewsAggregatorsPage from '@/pages/compare/best-crypto-news-aggregators';
import ResearchSlugRedirect from '@/pages/research/slug-redirect';
import BMRReportsPage from '@/pages/bitcoin-media-research/reports';
import BMROpinionPage from '@/pages/bitcoin-media-research/opinion';
import BMRPostPage from '@/pages/bitcoin-media-research/[slug]';

function HomePage() {
  return (
    <main>
      <Hero />
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
              <Route path="/use-cases/executive-intelligence" element={<ExecutiveIntelligencePage />} />
              <Route path="/use-cases/stakeholder-communications" element={<StakeholderCommunicationsPage />} />
              <Route path="/use-cases/journalism" element={<JournalismPage />} />
              <Route path="/use-cases/pr-agency" element={<PRAgencyPage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* <Route path="/careers" element={<CareersPage />} /> */}
              <Route path="/press" element={<PressPage />} />
              <Route path="/brand" element={<BrandPage />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/book-a-call" element={<BookACallPage />} />
              <Route path="/slack-integration" element={<SlackIntegrationPage />} />
              <Route path="/documentation" element={<DocsPage />} />
              <Route path="/api" element={<ApiPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/slack-testing" element={<SlackTestingPage />} />
              <Route path="/social-preview" element={<SocialPreviewPage />} />
              <Route path="/bitcoin-fear-greed-index" element={<FearGreedIndexPage />} />
              <Route path="/bitcoin-market-sentiment" element={<BitcoinMarketSentimentIndexPage />} />
              <Route path="/bitcoin-market-sentiment/:year/:month/:day" element={<BitcoinDailySentimentPage />} />
              <Route path="/bitcoin-market-sentiment/:year/:month" element={<BitcoinMarketSentimentPage />} />
              <Route path="/bitcoin-media-research" element={<BitcoinMediaResearchPage />} />
              <Route path="/bitcoin-media-research/reports" element={<BMRReportsPage />} />
              <Route path="/bitcoin-media-research/opinion" element={<BMROpinionPage />} />
              <Route path="/bitcoin-media-research/:slug" element={<BMRPostPage />} />
              <Route path="/crypto-conferences" element={<CryptoConferencesPage />} />
              <Route
                path="/crypto-conferences/:slug"
                element={<TrackedConferencePage />}
              />
              <Route
                path="/crypto-conferences/:year/:slug"
                element={<ConferencePage />}
              />
              <Route path="/bitcoin-bad-takes/*" element={<BitcoinBadTakes />} />
              <Route path="/bitcoin-social-media-sentiment-leaderboard" element={<TwitterSentimentLeaderboard />} />
              <Route path="/og/leaderboard" element={<LeaderboardOGImage />} />

              {/* Alternative Pages */}
              <Route path="/alternatives" element={<AlternativesIndexPage />} />
              <Route path="/alternatives/lunarcrush-alternative" element={<LunarCrushAlternativePage />} />
              <Route path="/alternatives/santiment-alternative" element={<SantimentAlternativePage />} />
              <Route path="/alternatives/alternative-me-alternative" element={<AlternativeMeAlternativePage />} />

              {/* Comparison Pages */}
              <Route path="/compare/best-crypto-sentiment-tools" element={<BestCryptoSentimentToolsPage />} />
              <Route path="/compare/perception-vs-glassnode" element={<PerceptionVsGlassnodePage />} />
              <Route path="/compare/best-crypto-news-aggregators" element={<BestCryptoNewsAggregatorsPage />} />

              {/* Learn / Educational Pages */}
              <Route path="/learn" element={<LearnIndexPage />} />
              <Route path="/learn/what-is-crypto-sentiment-analysis" element={<WhatIsCryptoSentimentAnalysisPage />} />
              <Route path="/learn/how-to-read-fear-greed-index" element={<HowToReadFearGreedIndexPage />} />
              <Route path="/learn/bitcoin-market-psychology" element={<BitcoinMarketPsychologyPage />} />
              <Route path="/learn/crypto-narrative-trading" element={<CryptoNarrativeTradingPage />} />
              <Route path="/learn/understanding-bitcoin-dominance" element={<UnderstandingBitcoinDominancePage />} />
              <Route path="/learn/crypto-social-sentiment" element={<CryptoSocialSentimentPage />} />

              {/* Research Redirects - /research/* -> /bitcoin-media-research/* */}
              <Route path="/research" element={<Navigate to="/bitcoin-media-research" replace />} />
              <Route path="/research/reports" element={<Navigate to="/bitcoin-media-research/reports" replace />} />
              <Route path="/research/opinion" element={<Navigate to="/bitcoin-media-research/opinion" replace />} />
              <Route path="/research/:slug" element={<ResearchSlugRedirect />} />

              {/* Programmatic SEO Routes */}
              <Route path="/sentiment/:slug" element={<ProgrammaticRouter />} />
              <Route path="/analytics/:slug" element={<ProgrammaticRouter />} />
              <Route path="/tools/:slug" element={<ProgrammaticRouter />} />
              <Route path="/guides/:slug" element={<ProgrammaticRouter />} />
              <Route path="/api-docs/:slug" element={<ProgrammaticRouter />} />
              
              {/* Test Routes for Development */}
              <Route path="/keyword-test" element={<KeywordTest />} />
              <Route path="/content-showcase" element={<ContentShowcase />} />

              {/* 404 catch-all route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PageTransition>
          <Footer />
          <FloatingNav />
          <ExitIntentPopup />
          <Toaster position="bottom-center" />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;