import SEO from '@/components/SEO';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample report content
const sampleReport = {
  title: "MicroStrategy Media Intelligence Brief",
  subtitle: "Stakeholder Communications Report",
  date: "January 24, 2025",
  timeRange: "Last 30 Days",
  dataPoints: "2,847 articles analyzed",
  executiveSummary: `MicroStrategy continues to dominate Bitcoin corporate treasury coverage, with media sentiment showing a notable positive shift following the company's inclusion in the Nasdaq 100. Coverage volume increased 34% month-over-month, driven primarily by institutional investor interest and comparisons to emerging competitors like Metaplanet.`,
  articles: [
    { number: 1, title: "MicroStrategy Joins Nasdaq 100, Cementing Bitcoin Strategy's Mainstream Acceptance", outlet: "Bloomberg", date: "Dec 14, 2024", sentiment: "positive" as const, sentimentScore: 82 },
    { number: 2, title: "Why Institutions Are Using MicroStrategy as a Bitcoin Proxy", outlet: "Financial Times", date: "Jan 8, 2025", sentiment: "positive" as const, sentimentScore: 78 },
    { number: 3, title: "MicroStrategy's Bitcoin Bet: A Year in Review", outlet: "CoinDesk", date: "Jan 15, 2025", sentiment: "positive" as const, sentimentScore: 75 },
    { number: 4, title: "The Risks of MicroStrategy's Leveraged Bitcoin Strategy", outlet: "The Block", date: "Jan 18, 2025", sentiment: "neutral" as const, sentimentScore: 52 },
    { number: 5, title: "Metaplanet: Japan's Answer to MicroStrategy", outlet: "Forbes", date: "Jan 20, 2025", sentiment: "positive" as const, sentimentScore: 71 },
  ]
};

export function StakeholderCommunicationsReportPage() {
  return (
    <>
      <SEO
        title="Stakeholder Communications Report | Sample Reports | Perception"
        description="See a real example of Perception's stakeholder communications intelligence report. Board-ready media briefings with sentiment analysis, narrative tracking, and strategic recommendations."
        url="https://perception.to/sample-reports/stakeholder-communications"
        keywords={['stakeholder communications', 'media intelligence', 'board report', 'sentiment analysis', 'PR intelligence']}
      />

      <div className="min-h-screen bg-white">
        {/* Navigation Bar */}
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-black/[0.06] mt-8">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/sample-reports/sector-deep-dive" className="flex items-center gap-3 text-black/40 hover:text-black transition-colors group">
              <ArrowLeft className="w-5 h-5" />
              <div className="hidden sm:block">
                <div className="text-xs text-black/30 group-hover:text-black/50">Previous</div>
                <div className="text-sm font-medium">Sector Analysis</div>
              </div>
            </a>
            <div className="text-center">
              <div className="text-xs font-medium text-black/30 uppercase tracking-wide">Sample Report</div>
              <div className="text-sm font-semibold text-black">Stakeholder Communications</div>
            </div>
            <a href="/sample-reports/pr-pitch-intelligence" className="flex items-center gap-3 text-black/40 hover:text-black transition-colors group">
              <div className="hidden sm:block text-right">
                <div className="text-xs text-black/30 group-hover:text-black/50">Next</div>
                <div className="text-sm font-medium">PR Pitch Intelligence</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Report Content */}
        <article className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          {/* Report Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Live Sample
              </span>
              <span className="text-sm text-black/40">{sampleReport.date}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-black leading-tight mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {sampleReport.title}
            </h1>
            <p className="text-lg text-black/50" style={{ fontFamily: 'Georgia, serif' }}>
              {sampleReport.subtitle}
            </p>
          </header>

          {/* Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-4 px-4 sm:px-5 mb-10 bg-[#fafafa] border border-black/[0.06] rounded">
            <div>
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-1">Time Range</div>
              <div className="text-sm font-medium text-black">{sampleReport.timeRange}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-1">Articles Analyzed</div>
              <div className="text-sm font-medium text-black">2,847</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-1">Sentiment Score</div>
              <div className="text-sm font-medium text-[#0d7a3f]">72 (+8 vs last month)</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-1">Volume Change</div>
              <div className="text-sm font-medium text-[#0d7a3f]">+34%</div>
            </div>
          </div>

          {/* Executive Summary */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Executive Summary
            </h2>
            <p className="text-[17px] leading-relaxed text-black/80" style={{ fontFamily: 'Georgia, serif' }}>
              {sampleReport.executiveSummary}
            </p>

            {/* Key Narrative */}
            <div className="relative mt-6 p-5 bg-[#fafafa] border border-black/[0.1] rounded">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-black rounded-t"></div>
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-2">Dominant Narrative (43% of coverage)</div>
              <p className="text-lg text-black/90 italic" style={{ fontFamily: 'Georgia, serif' }}>
                "MicroStrategy as the institutional gateway to Bitcoin exposure"
              </p>
              <p className="text-sm text-black/50 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
                The Nasdaq 100 inclusion has fundamentally shifted how mainstream financial media covers MicroStrategy.
              </p>
            </div>
          </section>

          {/* Sentiment Drivers */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Sentiment Drivers
            </h2>

            <div className="p-5 bg-[#fafafa] border border-black/[0.1] rounded border-l-[3px] border-l-[#0d7a3f]">
              <div className="text-[11px] font-semibold text-[#0d7a3f] uppercase tracking-widest mb-4">Positive Factors</div>
              <ul className="space-y-3" style={{ fontFamily: 'Georgia, serif' }}>
                <li className="flex items-start gap-3 text-[15px] text-black/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-2 flex-shrink-0"></span>
                  Nasdaq 100 inclusion validating Bitcoin treasury strategy
                </li>
                <li className="flex items-start gap-3 text-[15px] text-black/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-2 flex-shrink-0"></span>
                  Strong Q4 2024 earnings beat expectations
                </li>
                <li className="flex items-start gap-3 text-[15px] text-black/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-2 flex-shrink-0"></span>
                  Bitcoin price appreciation enhancing balance sheet optics
                </li>
                <li className="flex items-start gap-3 text-[15px] text-black/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-2 flex-shrink-0"></span>
                  Growing "copycat" narrative positioning MSTR as pioneer
                </li>
              </ul>
            </div>
          </section>

          {/* Coverage by Outlet Type */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Coverage by Outlet Type
            </h2>

            <div className="overflow-x-auto rounded border border-black/[0.06]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-black/[0.08]">
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Outlet Type</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Examples</th>
                    <th className="text-center px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Articles</th>
                    <th className="text-center px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Change</th>
                    <th className="text-center px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Sentiment</th>
                  </tr>
                </thead>
                <tbody style={{ fontFamily: 'Georgia, serif' }}>
                  <tr className="border-b border-black/[0.04]">
                    <td className="px-4 py-4 font-medium text-black">Tier 1 Financial</td>
                    <td className="px-4 py-4 text-black/60 text-xs">Bloomberg, Reuters, WSJ</td>
                    <td className="px-4 py-4 text-center text-black/80">342</td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-[#0d7a3f] font-medium">+12%</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-[#0d7a3f]/10 text-[#0d7a3f]">78</span>
                    </td>
                  </tr>
                  <tr className="border-b border-black/[0.04]">
                    <td className="px-4 py-4 font-medium text-black">Crypto Native</td>
                    <td className="px-4 py-4 text-black/60 text-xs">CoinDesk, The Block, Decrypt</td>
                    <td className="px-4 py-4 text-center text-black/80">1,247</td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-[#0d7a3f] font-medium">+8%</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-[#0d7a3f]/10 text-[#0d7a3f]">74</span>
                    </td>
                  </tr>
                  <tr className="border-b border-black/[0.04]">
                    <td className="px-4 py-4 font-medium text-black">Business/Tech</td>
                    <td className="px-4 py-4 text-black/60 text-xs">Forbes, TechCrunch, Fortune</td>
                    <td className="px-4 py-4 text-center text-black/80">524</td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-black/50 font-medium">+3%</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-black/5 text-black/60">65</span>
                    </td>
                  </tr>
                  <tr className="border-b border-black/[0.04] last:border-b-0">
                    <td className="px-4 py-4 font-medium text-black">Mainstream</td>
                    <td className="px-4 py-4 text-black/60 text-xs">CNN, CNBC, BBC</td>
                    <td className="px-4 py-4 text-center text-black/80">287</td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-black/40 font-medium">0%</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-black/5 text-black/60">58</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Risk & Opportunity Signals */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Risk & Opportunity Signals
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Risk Signals */}
              <div className="p-5 bg-[#fafafa] border border-black/[0.1] rounded border-l-[3px] border-l-[#c41e3a]">
                <div className="text-[11px] font-semibold text-[#c41e3a] uppercase tracking-widest mb-4">Risk Signals to Monitor</div>
                <ul className="space-y-4" style={{ fontFamily: 'Georgia, serif' }}>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a] mt-2 flex-shrink-0"></span>
                    <div>
                      <div className="font-medium text-black">Leverage concerns</div>
                      <div className="text-sm text-black/50 mt-0.5">12% of coverage mentions convertible note structure</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a] mt-2 flex-shrink-0"></span>
                    <div>
                      <div className="font-medium text-black">Regulatory exposure</div>
                      <div className="text-sm text-black/50 mt-0.5">8% reference potential SEC scrutiny</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a] mt-2 flex-shrink-0"></span>
                    <div>
                      <div className="font-medium text-black">Concentration risk</div>
                      <div className="text-sm text-black/50 mt-0.5">Growing discussion of single-asset dependency</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Opportunity Signals */}
              <div className="p-5 bg-[#fafafa] border border-black/[0.1] rounded border-l-[3px] border-l-[#0d7a3f]">
                <div className="text-[11px] font-semibold text-[#0d7a3f] uppercase tracking-widest mb-4">Opportunity Signals</div>
                <ul className="space-y-4" style={{ fontFamily: 'Georgia, serif' }}>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-2 flex-shrink-0"></span>
                    <div>
                      <div className="font-medium text-black">Thought leadership</div>
                      <div className="text-sm text-black/50 mt-0.5">High demand for executive commentary</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-2 flex-shrink-0"></span>
                    <div>
                      <div className="font-medium text-black">ESG narrative</div>
                      <div className="text-sm text-black/50 mt-0.5">Opportunity to lead Bitcoin sustainability conversation</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-2 flex-shrink-0"></span>
                    <div>
                      <div className="font-medium text-black">Institutional education</div>
                      <div className="text-sm text-black/50 mt-0.5">Growing appetite for treasury mechanics content</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Strategic Recommendations */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Strategic Recommendations
            </h2>

            <ol className="space-y-4" style={{ fontFamily: 'Georgia, serif' }}>
              <li className="flex gap-3 p-4 bg-[#fafafa] border border-black/[0.06] rounded">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs font-bold">1</span>
                <div>
                  <div className="font-medium text-black">Amplify Nasdaq 100 narrative</div>
                  <div className="text-sm text-black/60 mt-0.5">This validation story has strong legs; ensure it's prominently featured in all investor communications</div>
                </div>
              </li>
              <li className="flex gap-3 p-4 bg-[#fafafa] border border-black/[0.06] rounded">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs font-bold">2</span>
                <div>
                  <div className="font-medium text-black">Prepare leverage talking points</div>
                  <div className="text-sm text-black/60 mt-0.5">Proactively address convertible note concerns before they become dominant narratives</div>
                </div>
              </li>
              <li className="flex gap-3 p-4 bg-[#fafafa] border border-black/[0.06] rounded">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs font-bold">3</span>
                <div>
                  <div className="font-medium text-black">Engage Tier 1 financial press</div>
                  <div className="text-sm text-black/60 mt-0.5">Schedule briefings with Bloomberg and Reuters to maintain positive coverage momentum</div>
                </div>
              </li>
              <li className="flex gap-3 p-4 bg-[#fafafa] border border-black/[0.06] rounded">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs font-bold">4</span>
                <div>
                  <div className="font-medium text-black">Monitor competitor coverage</div>
                  <div className="text-sm text-black/60 mt-0.5">Track Metaplanet and other followers to understand competitive positioning</div>
                </div>
              </li>
            </ol>
          </section>

          {/* Key Sources */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Key Sources
            </h2>
            <p className="text-[15px] text-black/60 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Top 5 articles by influence and reach.
            </p>

            <div className="overflow-x-auto rounded border border-black/[0.06]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-black/[0.08]">
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest w-8">#</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Article</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Outlet</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Date</th>
                    <th className="text-center px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Sentiment</th>
                  </tr>
                </thead>
                <tbody style={{ fontFamily: 'Georgia, serif' }}>
                  {sampleReport.articles.map((article) => (
                    <tr key={article.number} className="border-b border-black/[0.04] last:border-b-0 hover:bg-[#fafafa]/50 transition-colors">
                      <td className="px-4 py-4 text-black/40 font-medium">{article.number}</td>
                      <td className="px-4 py-4">
                        <div className="text-black/80 leading-snug">{article.title}</div>
                      </td>
                      <td className="px-4 py-4 text-black/60">{article.outlet}</td>
                      <td className="px-4 py-4 text-black/50 text-xs whitespace-nowrap">{article.date}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                          article.sentiment === 'positive' ? 'bg-[#0d7a3f]/10 text-[#0d7a3f]' :
                          article.sentiment === 'negative' ? 'bg-[#c41e3a]/10 text-[#c41e3a]' :
                          'bg-black/5 text-black/50'
                        }`}>
                          {article.sentiment} ({article.sentimentScore})
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 pt-10 border-t border-black/[0.06]">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-black mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Generate reports like this for your company
              </h2>
              <p className="text-black/50 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Perception monitors 450+ sources and generates board-ready intelligence reports.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <BookDemoButton className="h-11 px-6 rounded-full" />
                <Button
                  variant="outline"
                  className="h-11 px-6 rounded-full border-black/20 text-black hover:bg-black/5"
                  asChild
                >
                  <a href="/sample-reports/pr-pitch-intelligence">
                    View PR Pitch Report <ArrowRight className="w-4 h-4 ml-2" />
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

export default StakeholderCommunicationsReportPage;
