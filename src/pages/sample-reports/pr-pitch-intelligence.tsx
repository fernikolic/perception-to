import SEO from '@/components/SEO';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample report content
const sampleReport = {
  title: "Bitcoin Treasury PR Pitch Intelligence",
  subtitle: "Journalist Targeting & Story Angle Recommendations",
  date: "January 24, 2025",
  timeRange: "Rolling 90-Day Analysis",
  dataPoints: "1,247 journalist profiles analyzed",
  executiveSummary: `The Bitcoin treasury narrative is experiencing peak media interest following MicroStrategy's Nasdaq 100 inclusion and growing corporate adoption. Analysis of 1,247 journalist profiles reveals strong receptivity to stories around institutional legitimization, regulatory clarity, and competitive dynamics. Optimal pitch timing aligns with Q1 earnings season and anticipated SEC guidance on Bitcoin accounting rules.`,
  journalists: [
    { name: "Sarah Chen", outlet: "Bloomberg", beat: "Corporate Treasury / Digital Assets", matchScore: 94, recentArticles: 12, avgSentiment: 72, lastPublished: "2 days ago", preferredAngles: ["Institutional adoption", "Treasury strategy"], openToOutreach: true },
    { name: "Michael Torres", outlet: "Wall Street Journal", beat: "Crypto Markets & Policy", matchScore: 89, recentArticles: 8, avgSentiment: 68, lastPublished: "1 week ago", preferredAngles: ["Regulatory developments", "Corporate governance"], openToOutreach: true },
    { name: "Emma Richardson", outlet: "Financial Times", beat: "Digital Finance", matchScore: 86, recentArticles: 6, avgSentiment: 65, lastPublished: "3 days ago", preferredAngles: ["Global markets", "Institutional investors"], openToOutreach: true },
    { name: "David Park", outlet: "CoinDesk", beat: "Bitcoin / Macro", matchScore: 82, recentArticles: 24, avgSentiment: 75, lastPublished: "Today", preferredAngles: ["Technical analysis", "On-chain data"], openToOutreach: false },
  ],
  storyAngles: [
    { title: "Nasdaq 100 Inclusion: Institutional Legitimization", interestLevel: "Very High", coverageGap: "Low", timing: "Immediate", description: "Frame your company's Bitcoin treasury strategy as part of the broader institutional acceptance narrative.", targetOutlets: ["Bloomberg", "WSJ", "FT"] },
    { title: "Q1 2025 Earnings Season: Bitcoin Impact on Balance Sheets", interestLevel: "High", coverageGap: "Medium", timing: "February 2025", description: "Position for earnings coverage by preparing commentary on how Bitcoin holdings affect financial reporting.", targetOutlets: ["Reuters", "MarketWatch", "CNBC"] },
    { title: "The Japan Phenomenon: Global Bitcoin Treasury Adoption", interestLevel: "High", coverageGap: "High", timing: "Next 30 days", description: "Metaplanet's rise creates opportunity for comparative analysis pieces. Position as part of global trend.", targetOutlets: ["Bloomberg", "Forbes", "CoinDesk"] },
    { title: "Bitcoin Accounting Rules: SEC FASB Update", interestLevel: "Medium", coverageGap: "Very High", timing: "March 2025", description: "New fair value accounting rules create opportunity for thought leadership on treasury management.", targetOutlets: ["CFO Magazine", "WSJ", "Accounting Today"] },
  ]
};

export function PRPitchIntelligenceReportPage() {
  return (
    <>
      <SEO
        title="PR Pitch Intelligence Report | Sample Reports | Perception"
        description="See a real example of Perception's PR pitch intelligence report. Journalist targeting, story angle recommendations, and optimal timing insights for media outreach."
        url="https://perception.to/sample-reports/pr-pitch-intelligence"
        keywords={['PR pitch', 'journalist targeting', 'media outreach', 'story angles', 'press relations']}
      />

      <div className="min-h-screen bg-white">
        {/* Navigation Bar */}
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-black/[0.06] mt-8">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/sample-reports/stakeholder-communications" className="flex items-center gap-3 text-black/40 hover:text-black transition-colors group">
              <ArrowLeft className="w-5 h-5" />
              <div className="hidden sm:block">
                <div className="text-xs text-black/30 group-hover:text-black/50">Previous</div>
                <div className="text-sm font-medium">Stakeholder Comms</div>
              </div>
            </a>
            <div className="text-center">
              <div className="text-xs font-medium text-black/30 uppercase tracking-wide">Sample Report</div>
              <div className="text-sm font-semibold text-black">PR Pitch Intelligence</div>
            </div>
            <a href="/sample-reports/sector-deep-dive" className="flex items-center gap-3 text-black/40 hover:text-black transition-colors group">
              <div className="hidden sm:block text-right">
                <div className="text-xs text-black/30 group-hover:text-black/50">Next</div>
                <div className="text-sm font-medium">Sector Analysis</div>
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-medium border border-orange-100">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
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
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-1">Profiles Analyzed</div>
              <div className="text-sm font-medium text-black">1,247 journalists</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-1">Response Rate</div>
              <div className="text-sm font-medium text-[#0d7a3f]">83% (timing aligned)</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-1">Media Interest</div>
              <div className="text-sm font-medium text-black">Peak</div>
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

            {/* Key Finding */}
            <div className="relative mt-6 p-5 bg-[#fafafa] border border-black/[0.1] rounded">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-black rounded-t"></div>
              <div className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-2">Key Finding</div>
              <p className="text-[15px] text-black/80" style={{ fontFamily: 'Georgia, serif' }}>
                83% of journalists covering Bitcoin treasury topics responded positively to pitches within 72 hours when timing aligned with earnings announcements or regulatory news.
              </p>
            </div>
          </section>

          {/* Top Journalist Matches */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Top Journalist Matches
            </h2>
            <p className="text-[15px] text-black/60 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Ranked by relevance, coverage patterns, and responsiveness to Bitcoin treasury stories.
            </p>

            <div className="overflow-x-auto rounded border border-black/[0.06]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-black/[0.08]">
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Journalist</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Outlet / Beat</th>
                    <th className="text-center px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Match</th>
                    <th className="text-center px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Articles</th>
                    <th className="text-center px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody style={{ fontFamily: 'Georgia, serif' }}>
                  {sampleReport.journalists.map((journalist, index) => (
                    <tr key={index} className="border-b border-black/[0.04] last:border-b-0 hover:bg-[#fafafa]/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-medium text-black">{journalist.name}</div>
                        <div className="text-xs text-black/40 mt-0.5">{journalist.lastPublished}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-black/80">{journalist.outlet}</div>
                        <div className="text-xs text-black/50">{journalist.beat}</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded text-xs font-semibold ${
                          journalist.matchScore >= 90 ? 'bg-[#0d7a3f]/10 text-[#0d7a3f]' :
                          journalist.matchScore >= 80 ? 'bg-blue-500/10 text-blue-600' :
                          'bg-black/5 text-black/60'
                        }`}>
                          {journalist.matchScore}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-black/70">{journalist.recentArticles}</td>
                      <td className="px-4 py-4 text-center">
                        {journalist.openToOutreach ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-[#0d7a3f]/10 text-[#0d7a3f]">
                            <span className="w-1 h-1 rounded-full bg-[#0d7a3f]"></span>
                            Open
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-black/5 text-black/40">
                            Unavailable
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-black/40 mt-4" style={{ fontFamily: 'Georgia, serif' }}>
              Preferred angles for top matches: Institutional adoption, Treasury strategy, Regulatory developments, Corporate governance
            </p>
          </section>

          {/* Story Angle Recommendations */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Story Angle Recommendations
            </h2>

            <div className="overflow-x-auto rounded border border-black/[0.06]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-black/[0.08]">
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Angle</th>
                    <th className="text-center px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Interest</th>
                    <th className="text-center px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Coverage Gap</th>
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-black/50 uppercase tracking-widest">Timing</th>
                  </tr>
                </thead>
                <tbody style={{ fontFamily: 'Georgia, serif' }}>
                  {sampleReport.storyAngles.map((angle, index) => (
                    <tr key={index} className="border-b border-black/[0.04] last:border-b-0">
                      <td className="px-4 py-4">
                        <div className="font-medium text-black mb-1">{angle.title}</div>
                        <div className="text-xs text-black/50">{angle.description}</div>
                        <div className="text-xs text-black/40 mt-1">Target: {angle.targetOutlets.join(', ')}</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                          angle.interestLevel === 'Very High' ? 'bg-[#0d7a3f]/10 text-[#0d7a3f]' :
                          angle.interestLevel === 'High' ? 'bg-blue-500/10 text-blue-600' :
                          'bg-amber-500/10 text-amber-600'
                        }`}>
                          {angle.interestLevel}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                          angle.coverageGap === 'Very High' ? 'bg-[#0d7a3f]/10 text-[#0d7a3f]' :
                          angle.coverageGap === 'High' ? 'bg-[#0d7a3f]/10 text-[#0d7a3f]' :
                          angle.coverageGap === 'Medium' ? 'bg-amber-500/10 text-amber-600' :
                          'bg-black/5 text-black/50'
                        }`}>
                          {angle.coverageGap === 'Very High' ? 'Wide Open' :
                           angle.coverageGap === 'High' ? 'Good Opportunity' :
                           angle.coverageGap === 'Medium' ? 'Some Competition' : 'Competitive'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-black/70">{angle.timing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Optimal Timing */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Optimal Timing
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Best Days & Times */}
              <div className="p-5 bg-[#fafafa] border border-black/[0.06] rounded">
                <div className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-4">Best Pitch Windows</div>
                <div className="grid grid-cols-2 gap-4" style={{ fontFamily: 'Georgia, serif' }}>
                  <div>
                    <div className="text-sm font-medium text-black mb-2">Days</div>
                    <ul className="space-y-1.5 text-sm text-black/70">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f]"></span>
                        Tuesday (highest)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/30"></span>
                        Wednesday
                      </li>
                      <li className="flex items-center gap-2 text-black/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a]"></span>
                        Avoid Fridays
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-black mb-2">Times (ET)</div>
                    <ul className="space-y-1.5 text-sm text-black/70">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f]"></span>
                        9:00 - 10:30 AM
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/30"></span>
                        2:00 - 3:30 PM
                      </li>
                      <li className="flex items-center gap-2 text-black/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a]"></span>
                        Avoid lunch
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Upcoming News Hooks */}
              <div className="p-5 bg-[#fafafa] border border-black/[0.06] rounded">
                <div className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-4">Upcoming News Hooks</div>
                <ul className="space-y-3" style={{ fontFamily: 'Georgia, serif' }}>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-1.5 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-black">Feb 3-7:</span>
                      <span className="text-black/70 ml-1">MicroStrategy Q4 earnings</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-1.5 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-black">Feb 14:</span>
                      <span className="text-black/70 ml-1">Bitcoin ETF 1-year anniversary</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d7a3f] mt-1.5 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-black">March TBD:</span>
                      <span className="text-black/70 ml-1">FASB accounting implementation</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pitch Strategy */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-black mb-4 pb-3 border-b border-black/[0.06]" style={{ fontFamily: 'system-ui, sans-serif' }}>
              Pitch Strategy Recommendations
            </h2>

            <div className="p-5 bg-[#fafafa] border border-black/[0.1] rounded border-l-[3px] border-l-[#0d7a3f]">
              <div className="text-[11px] font-semibold text-[#0d7a3f] uppercase tracking-widest mb-4">Recommended Actions</div>
              <ol className="space-y-4" style={{ fontFamily: 'Georgia, serif' }}>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <div className="font-medium text-black">Lead with data</div>
                    <div className="text-sm text-black/60 mt-0.5">Journalists respond 3x better to pitches with exclusive data or research</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs font-bold">2</span>
                  <div>
                    <div className="font-medium text-black">Personalize by beat</div>
                    <div className="text-sm text-black/60 mt-0.5">Reference journalist's recent work—47% vs 12% response rate</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs font-bold">3</span>
                  <div>
                    <div className="font-medium text-black">Align with news cycle</div>
                    <div className="text-sm text-black/60 mt-0.5">Pitch within 24-48 hours of relevant news events for maximum pickup</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded bg-black text-white flex items-center justify-center text-xs font-bold">4</span>
                  <div>
                    <div className="font-medium text-black">Offer exclusives strategically</div>
                    <div className="text-sm text-black/60 mt-0.5">Reserve exclusives for Tier 1; broader distribution for secondary angles</div>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 pt-10 border-t border-black/[0.06]">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-black mb-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Get journalist intelligence for your story
              </h2>
              <p className="text-black/50 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Perception identifies the right journalists, angles, and timing for maximum pickup.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <BookDemoButton className="h-11 px-6 rounded-full" />
                <Button
                  variant="outline"
                  className="h-11 px-6 rounded-full border-black/20 text-black hover:bg-black/5"
                  asChild
                >
                  <a href="/sample-reports/sector-deep-dive">
                    View Sector Analysis <ArrowRight className="w-4 h-4 ml-2" />
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

export default PRPitchIntelligenceReportPage;
