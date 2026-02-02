import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import AsciiBlob from '@/components/AsciiBlob';
import { useState } from 'react';

const reportHighlights = [
  { text: 'Executive summary with key takeaways', highlight: 'Summary' },
  { text: 'Sentiment analysis across 450+ sources', highlight: 'Sentiment' },
  { text: 'Narrative trend identification', highlight: 'Narratives' },
  { text: 'Competitive positioning insights', highlight: 'Competitive' },
  { text: 'Management tone analysis from earnings calls', highlight: 'Tone' },
  { text: 'Full citations to original sources', highlight: 'Citations' }
];

export function SampleReportPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <>
      <SEO
        title="Sample Intelligence Report | Perception"
        description="See Perception's intelligence in action. Download a sample report showing our sentiment analysis, narrative tracking, and earnings insights."
        url="https://perception.to/features/sample-report"
        keywords={['Bitcoin intelligence report', 'crypto sentiment report', 'Bitcoin analysis sample', 'market intelligence example']}
      />
      <div className="min-h-screen bg-[#F0EEE6]">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95 pt-28">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
            <div className="relative">
              <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 min-h-[200px] lg:min-h-[600px]">
                {/* ASCII Art - Left Card */}
                <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[600px] hidden lg:block">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#000000' }}>
                    <AsciiBlob />
                    <div className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none px-8 py-12">
                      <div className="flex-1 flex items-center justify-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-white text-center leading-tight">
                          See our intelligence in action.
                        </h1>
                      </div>
                      <div className="flex items-center gap-6 text-white/60 text-sm">
                        <span>MicroStrategy</span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>Q4 2024</span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>Full Report</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content - Right Card */}
                <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-8 lg:pr-12 py-8 sm:py-12 lg:py-16 flex flex-col justify-center rounded-3xl shadow-2xl" style={{ background: '#F0EEE6' }}>
                  <div className="w-full max-w-2xl">
                    <div className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      <div className="inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400"></span>
                          </span>
                          <span className="font-bold text-black">SAMPLE</span>
                        </span>
                        <span className="ml-2.5 text-black/80">Intelligence Report</span>
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                      <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-black mb-4">
                        Download a real Perception report
                      </h2>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        See exactly what our platform delivers: sentiment analysis, narrative tracking, competitive insights, and fully-cited research, all in one comprehensive report.
                      </p>
                    </div>

                    {/* Download Form or Success Message */}
                    {!isSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-black/70 mb-2">
                            Work email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                          />
                        </div>
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isLoading}
                          className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl disabled:opacity-50"
                        >
                          {isLoading ? 'Sending...' : 'Get the Sample Report →'}
                        </Button>
                        <p className="text-xs text-black/50 mt-2">
                          We'll send the report to your email. No spam, ever.
                        </p>
                      </form>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">✓</span>
                        </div>
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Check your inbox!</h3>
                        <p className="text-green-700 text-sm">
                          We've sent the sample report to <strong>{email}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's in the Report */}
        <section className="py-24 sm:py-32 bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-8 text-center">
                What's in the Report
              </h2>
              <p className="text-xl text-white/50 text-center mb-16 font-light">
                A comprehensive intelligence brief demonstrating Perception's full capabilities.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportHighlights.map((highlight, index) => (
                  <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                    <span className="text-xs font-bold tracking-widest text-orange-400 uppercase mb-3 block">{highlight.highlight}</span>
                    <span className="text-white/70 text-sm">{highlight.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Report Preview */}
        <section className="py-24 sm:py-32 bg-[#F0EEE6]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-12 text-center">
                Report Preview
              </h2>

              {/* Mock Report Card */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-black/5">
                {/* Report Header */}
                <div className="bg-black px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/50 text-sm mb-1">PERCEPTION INTELLIGENCE REPORT</p>
                      <h3 className="text-2xl font-semibold text-white">MicroStrategy (MSTR)</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-white/50 text-sm">Report Period</p>
                      <p className="text-white font-medium">Q4 2024</p>
                    </div>
                  </div>
                </div>

                {/* Report Content Preview */}
                <div className="p-8">
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-black mb-4">
                      Executive Summary
                    </h4>
                    <p className="text-black/60 leading-relaxed">
                      MicroStrategy maintained strong positive media sentiment throughout Q4 2024, driven primarily by continued Bitcoin accumulation announcements and Saylor's increasingly bullish public commentary. Coverage volume increased 34% QoQ, with institutional media outlets (Bloomberg, WSJ) showing notably more favorable coverage compared to Q3...
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-black mb-4">Sentiment Overview</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-green-50 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-green-600">67%</p>
                        <p className="text-sm text-green-700">Positive</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-gray-600">24%</p>
                        <p className="text-sm text-gray-700">Neutral</p>
                      </div>
                      <div className="bg-red-50 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-red-600">9%</p>
                        <p className="text-sm text-red-700">Negative</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-black/10 pt-6">
                    <p className="text-black/40 text-sm text-center italic">
                      Download the full report to see narrative trends, competitive analysis, earnings insights, and more...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-black">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-6">
              Want custom reports for your portfolio?
            </h2>
            <p className="text-lg text-white/60 mb-10">
              Book a demo to see how Perception can generate intelligence reports for any digital asset-exposed company.
            </p>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-6 rounded-2xl"
              asChild
            >
              <a href="/book-a-call">
                Book a Demo →
              </a>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

export default SampleReportPage;
