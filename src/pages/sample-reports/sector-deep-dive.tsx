import SEO from '@/components/SEO';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowLeft, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample report data
const sampleReport = {
  title: "Bitcoin Treasury Companies: Sector Analysis",
  subtitle: "Competitive Intelligence & Sentiment Comparison",
  date: "January 24, 2025",
  timeRange: "Q4 2024 + January 2025",
  dataPoints: "8,432 articles analyzed across 12 companies",

  executiveSummary: `The Bitcoin treasury sector continues to evolve rapidly, with MicroStrategy maintaining dominant share of voice (62%) while new entrants like Metaplanet gain significant momentum in international markets. Overall sector sentiment has improved 15% quarter-over-quarter, driven primarily by the Nasdaq 100 inclusion narrative and growing institutional acceptance. Key competitive dynamics emerging around leverage strategies, geographic diversification, and operational transparency.`,

  companies: [
    {
      name: "MicroStrategy",
      ticker: "MSTR",
      sentiment: 72,
      sentimentChange: +8,
      shareOfVoice: 62,
      coverage: "Very High",
      btcHoldings: "189,150 BTC",
      keyNarrative: "Nasdaq 100 inclusion validates strategy",
      risk: "Leverage concerns persist",
    },
    {
      name: "Marathon Digital",
      ticker: "MARA",
      sentiment: 58,
      sentimentChange: +3,
      shareOfVoice: 14,
      coverage: "High",
      btcHoldings: "26,842 BTC",
      keyNarrative: "Mining efficiency improvements",
      risk: "Energy cost volatility",
    },
    {
      name: "Coinbase",
      ticker: "COIN",
      sentiment: 64,
      sentimentChange: -2,
      shareOfVoice: 18,
      coverage: "Very High",
      btcHoldings: "9,480 BTC",
      keyNarrative: "Regulatory navigation success",
      risk: "Trading volume dependency",
    },
    {
      name: "Block (Square)",
      ticker: "SQ",
      sentiment: 61,
      sentimentChange: +5,
      shareOfVoice: 8,
      coverage: "Medium",
      btcHoldings: "8,027 BTC",
      keyNarrative: "Bitcoin integration into Cash App",
      risk: "Fintech competition",
    },
    {
      name: "Metaplanet",
      ticker: "3350.T",
      sentiment: 78,
      sentimentChange: +22,
      shareOfVoice: 4,
      coverage: "Rising",
      btcHoldings: "1,762 BTC",
      keyNarrative: "Japan's MicroStrategy",
      risk: "Execution in new market",
    },
    {
      name: "Semler Scientific",
      ticker: "SMLR",
      sentiment: 65,
      sentimentChange: +15,
      shareOfVoice: 2,
      coverage: "Low",
      btcHoldings: "1,273 BTC",
      keyNarrative: "Medical device company pivots",
      risk: "Core business neglect narrative",
    }
  ],

  narratives: [
    { name: "Institutional Legitimization", companies: ["MSTR", "COIN"], momentum: "Strong", articles: 847 },
    { name: "Bitcoin Treasury Strategy", companies: ["MSTR", "3350.T", "SMLR"], momentum: "Growing", articles: 623 },
    { name: "Mining Efficiency", companies: ["MARA"], momentum: "Stable", articles: 412 },
    { name: "Regulatory Navigation", companies: ["COIN"], momentum: "Declining", articles: 389 },
    { name: "Geographic Expansion", companies: ["3350.T"], momentum: "Strong", articles: 287 },
  ]
};

export function SectorDeepDiveReportPage() {
  return (
    <>
      <SEO
        title="Sector Deep Dive Report | Sample Reports | Perception"
        description="See a real example of Perception's competitive intelligence report. Bloomberg-style sector analysis with sentiment comparison, narrative mapping, and share of voice analysis."
        url="https://perception.to/sample-reports/sector-deep-dive"
        keywords={['competitive analysis', 'sector report', 'company comparison', 'share of voice', 'narrative analysis']}
      />

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-black/[0.06] mt-8">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/sample-reports/pr-pitch-intelligence" className="flex items-center gap-3 text-black/40 hover:text-black transition-colors group">
              <ArrowLeft className="w-5 h-5" />
              <div className="hidden sm:block">
                <div className="text-xs text-black/30 group-hover:text-black/50">Previous</div>
                <div className="text-sm font-medium">PR Pitch Intelligence</div>
              </div>
            </a>
            <div className="text-center">
              <div className="text-[11px] font-semibold text-black/40 uppercase tracking-widest">Sample Report</div>
              <div className="text-sm font-medium text-black">Sector Deep Dive</div>
            </div>
            <a href="/sample-reports/stakeholder-communications" className="flex items-center gap-3 text-black/40 hover:text-black transition-colors group">
              <div className="hidden sm:block text-right">
                <div className="text-xs text-black/30 group-hover:text-black/50">Next</div>
                <div className="text-sm font-medium">Stakeholder Comms</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Report Content */}
        <article className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          {/* Report Header */}
          <header className="mb-12 pb-8 border-b border-black/[0.06]">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-black text-white text-[11px] font-semibold uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                Live Sample
              </span>
              <span className="text-black/30">·</span>
              <span className="text-sm text-black/50">{sampleReport.date}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight leading-tight mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {sampleReport.title}
            </h1>
            <p className="text-lg text-black/60 mb-6">
              {sampleReport.subtitle}
            </p>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 p-4 bg-[#fafafa] border border-black/[0.06] rounded">
              <div className="flex flex-col gap-0.5">
                <span className="text-lg font-bold text-black tracking-tight">62%</span>
                <span className="text-[10px] text-black/50 uppercase tracking-widest">MSTR Share</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-lg font-bold text-[#0d7a3f] tracking-tight">+15%</span>
                <span className="text-[10px] text-black/50 uppercase tracking-widest">Sector Sentiment</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-lg font-bold text-black tracking-tight">8,432</span>
                <span className="text-[10px] text-black/50 uppercase tracking-widest">Articles</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-lg font-bold text-black tracking-tight">12</span>
                <span className="text-[10px] text-black/50 uppercase tracking-widest">Companies</span>
              </div>
            </div>
          </header>

          {/* Executive Summary */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Executive Summary
            </h2>
            <p className="text-[17px] leading-relaxed text-black/80" style={{ fontFamily: 'Georgia, serif' }}>
              {sampleReport.executiveSummary}
            </p>

            {/* Key Insight Box */}
            <div className="relative mt-6 p-5 bg-[#fafafa] border border-black/[0.1] rounded">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-black rounded-t"></div>
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-2">Key Finding</div>
              <p className="text-base font-medium text-black leading-relaxed">
                Metaplanet's sentiment score (+22 points) represents the largest quarterly gain in the sector, signaling strong investor appetite for geographic diversification of the Bitcoin treasury thesis.
              </p>
            </div>
          </section>

          {/* Company Comparison */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Company Sentiment Comparison
            </h2>
            <p className="text-black/60 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Comprehensive analysis across Bitcoin treasury companies, ranked by current sentiment.
            </p>

            {/* Table */}
            <div className="overflow-x-auto rounded border border-black/[0.06]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-black/[0.08]">
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Company</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Holdings</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Sentiment</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Share of Voice</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {sampleReport.companies.map((company, index) => (
                    <tr key={index} className="hover:bg-black/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-medium text-black">{company.name}</span>
                        <span className="text-black/40 ml-2 font-mono text-xs">{company.ticker}</span>
                      </td>
                      <td className="px-4 py-3 text-black/70">{company.btcHoldings}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${
                            company.sentiment >= 70 ? 'text-[#0d7a3f]' :
                            company.sentiment >= 55 ? 'text-amber-600' : 'text-[#c41e3a]'
                          }`}>{company.sentiment}</span>
                          <span className={`flex items-center gap-0.5 text-xs font-medium ${
                            company.sentimentChange > 0 ? 'text-[#0d7a3f]' :
                            company.sentimentChange < 0 ? 'text-[#c41e3a]' : 'text-black/40'
                          }`}>
                            {company.sentimentChange > 0 ? <TrendingUp className="w-3 h-3" /> : company.sentimentChange < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                            {company.sentimentChange > 0 ? '+' : ''}{company.sentimentChange}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-black/70">{company.shareOfVoice}%</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          company.coverage === 'Very High' ? 'bg-black text-white' :
                          company.coverage === 'High' ? 'bg-[#f5f5f5] text-black border border-black/10' :
                          company.coverage === 'Rising' ? 'bg-[rgba(13,122,63,0.08)] text-[#0d7a3f]' :
                          'bg-[#f5f5f5] text-black/50'
                        }`}>
                          {company.coverage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Share of Voice */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Share of Voice Analysis
            </h2>

            <div className="p-5 bg-[#fafafa] border border-black/[0.06] rounded">
              <div className="space-y-4">
                {sampleReport.companies.slice(0, 4).map((company, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-black">{company.name}</span>
                        <span className="text-xs text-black/40 font-mono">{company.ticker}</span>
                      </div>
                      <span className="text-sm font-bold text-black">{company.shareOfVoice}%</span>
                    </div>
                    <div className="w-full h-2 bg-black/[0.06] rounded overflow-hidden">
                      <div
                        className="h-full bg-black rounded"
                        style={{ width: `${company.shareOfVoice}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-black/50">Others</span>
                    <span className="text-sm font-bold text-black/50">6%</span>
                  </div>
                  <div className="w-full h-2 bg-black/[0.06] rounded overflow-hidden">
                    <div className="h-full bg-black/30 rounded" style={{ width: '6%' }} />
                  </div>
                </div>
              </div>

              <p className="text-sm text-black/60 mt-6 pt-4 border-t border-black/[0.06]" style={{ fontFamily: 'Georgia, serif' }}>
                MicroStrategy maintains dominant media presence with 62% share of voice, though this represents a slight decline from 68% in Q3 as emerging players like Metaplanet capture growing attention.
              </p>
            </div>
          </section>

          {/* Narrative Mapping */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Narrative Mapping
            </h2>
            <p className="text-black/60 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Key themes driving sector coverage, with momentum indicators and company associations.
            </p>

            <div className="overflow-x-auto rounded border border-black/[0.06]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-black/[0.08]">
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Narrative</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Companies</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Momentum</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Articles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {sampleReport.narratives.map((narrative, index) => (
                    <tr key={index} className="hover:bg-black/[0.02] transition-colors">
                      <td className="px-4 py-3 font-medium text-black">{narrative.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {narrative.companies.map((ticker, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-[#f5f5f5] rounded text-xs font-mono text-black/60">
                              {ticker}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          narrative.momentum === 'Strong' ? 'bg-[rgba(13,122,63,0.08)] text-[#0d7a3f]' :
                          narrative.momentum === 'Growing' ? 'bg-[#f5f5f5] text-black border border-black/10' :
                          narrative.momentum === 'Declining' ? 'bg-[rgba(196,30,58,0.08)] text-[#c41e3a]' :
                          'bg-[#f5f5f5] text-black/50'
                        }`}>
                          {narrative.momentum}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-black/70">{narrative.articles.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Risk & Opportunity Signals */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-6 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Competitive Dynamics
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Opportunities */}
              <div className="p-5 bg-[#fafafa] border border-black/[0.1] rounded border-l-[3px] border-l-[#0d7a3f]">
                <div className="text-[11px] font-semibold text-[#0d7a3f] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Opportunity Signals
                </div>
                <ul className="space-y-3 text-sm text-black/70" style={{ fontFamily: 'Georgia, serif' }}>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-2 flex-shrink-0" />
                    <span><strong className="text-black">Geographic diversification:</strong> International markets showing strong appetite for Bitcoin treasury strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-2 flex-shrink-0" />
                    <span><strong className="text-black">Operational transparency:</strong> Clear disclosure of acquisition strategy gaining sentiment premium</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-2 flex-shrink-0" />
                    <span><strong className="text-black">Integration strategies:</strong> Block's Cash App integration resonating with retail investors</span>
                  </li>
                </ul>
              </div>

              {/* Risks */}
              <div className="p-5 bg-[#fafafa] border border-black/[0.1] rounded border-l-[3px] border-l-[#c41e3a]">
                <div className="text-[11px] font-semibold text-[#c41e3a] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  Risk Signals
                </div>
                <ul className="space-y-3 text-sm text-black/70" style={{ fontFamily: 'Georgia, serif' }}>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a] mt-2 flex-shrink-0" />
                    <span><strong className="text-black">Leverage scrutiny:</strong> Convertible note coverage up 23% QoQ—dilution concerns rising</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a] mt-2 flex-shrink-0" />
                    <span><strong className="text-black">Core business neglect:</strong> Semler Scientific facing questions about medical device focus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a] mt-2 flex-shrink-0" />
                    <span><strong className="text-black">Mining economics:</strong> Energy cost volatility creating headwinds for miners</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Recommendations */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Strategic Recommendations
            </h2>
            <p className="text-black/60 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Based on this competitive analysis, we recommend the following positioning strategies.
            </p>

            <ol className="space-y-4">
              {[
                { title: "Differentiate on transparency", desc: "Proactive disclosure of acquisition strategy and custody arrangements can create sentiment premium" },
                { title: "Address leverage concerns proactively", desc: "Prepare clear messaging around capital structure and risk management before analysts raise questions" },
                { title: "Monitor Metaplanet coverage", desc: "Rising competitor sentiment provides benchmark for international expansion narratives" },
                { title: "Align with institutional legitimization", desc: "Connect company narrative to broader Nasdaq 100 inclusion and ETF approval themes" },
              ].map((rec, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-black mb-0.5">{rec.title}</h4>
                    <p className="text-sm text-black/60" style={{ fontFamily: 'Georgia, serif' }}>{rec.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Methodology */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Methodology
            </h2>

            <p className="text-black/60 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              This analysis is based on natural language processing of 8,432 articles from 450+ sources:
            </p>

            <ul className="space-y-1.5 text-sm text-black/60 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <li className="flex items-start gap-2">
                <span className="text-black/30 mt-0.5">•</span>
                <span>Tier 1 financial media (Bloomberg, Reuters, WSJ, FT)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black/30 mt-0.5">•</span>
                <span>Crypto-native publications (CoinDesk, The Block, Decrypt)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black/30 mt-0.5">•</span>
                <span>Business and technology press (Forbes, TechCrunch, Fortune)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black/30 mt-0.5">•</span>
                <span>Social sentiment from X (Twitter) and Reddit</span>
              </li>
            </ul>

            <p className="text-sm text-black/50" style={{ fontFamily: 'Georgia, serif' }}>
              Sentiment scores calculated using Perception's proprietary NLP model, calibrated against human analyst ratings with 94% correlation accuracy.
            </p>
          </section>

          {/* CTA */}
          <section className="mt-16 pt-10 border-t border-black/[0.06]">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-black mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Get competitive intelligence for your sector
              </h2>
              <p className="text-black/50 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Perception delivers Bloomberg-style competitive analysis with real-time sentiment tracking across your industry.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <BookDemoButton className="h-11 px-6 rounded-full" />
                <Button
                  variant="outline"
                  className="h-11 px-6 rounded-full border-black/20 text-black hover:bg-black/5"
                  asChild
                >
                  <a href="/sample-reports/stakeholder-communications">
                    View Stakeholder Report <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}

export default SectorDeepDiveReportPage;
