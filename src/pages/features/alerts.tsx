import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

const alertTypes = [
  {
    number: '01',
    title: 'Mention alerts',
    description: 'Get notified when specific companies, topics, or keywords appear across any of our 450+ sources.',
    badge: 'Mentions',
    badgeColor: 'text-blue-600/70 bg-blue-500/10',
    theme: 'light' as const,
  },
  {
    number: '02',
    title: 'Sentiment spike alerts',
    description: 'Know immediately when sentiment shifts dramatically. Catch narrative changes before they hit mainstream.',
    badge: 'Sentiment',
    badgeColor: 'text-emerald-400/90 bg-emerald-500/15',
    theme: 'dark' as const,
  },
  {
    number: '03',
    title: 'Volume spike alerts',
    description: 'See when coverage volume increases significantly. Often an early indicator of breaking news.',
    badge: 'Volume',
    badgeColor: 'text-orange-400/90 bg-orange-500/15',
    theme: 'dark' as const,
  },
  {
    number: '04',
    title: 'Journalist alerts',
    description: 'Track when specific reporters publish new coverage. Stay on top of key voices in your space.',
    badge: 'Journalists',
    badgeColor: 'text-violet-600/70 bg-violet-500/10',
    theme: 'light' as const,
  },
];

const deliveryChannels = [
  { name: 'Email', description: 'Digest or real-time delivery to your inbox', badge: 'text-blue-600/70 bg-blue-500/10' },
  { name: 'Slack', description: 'Direct integration with your team channels', badge: 'text-emerald-600/70 bg-emerald-500/10' },
  { name: 'Dashboard', description: 'Centralized alert feed in the platform', badge: 'text-violet-600/70 bg-violet-500/10' },
];

export function AlertsPage() {
  return (
    <>
      <SEO
        title="Real-Time Alerts - Sentiment & Coverage Monitoring | Perception"
        description="Get instant alerts for company mentions, sentiment spikes, and volume changes across 450+ sources. Deliver to email, Slack, or your dashboard."
        url="https://perception.to/features/alerts"
        keywords={['media alerts', 'sentiment monitoring', 'coverage alerts', 'mention tracking', 'real-time alerts']}
      />

      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Hero */}
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 bg-white border-b border-black/5">
          <div className="mx-auto max-w-6xl px-6">
            {/* Back link */}
            <Link
              to="/product"
              className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-black/60 transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Product
            </Link>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-mono text-black/40 tracking-wider">03</span>
                  <span className="text-6xl font-black text-black/[0.08]">AL</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  Real-Time Alerts
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-4">
                  Stop refreshing. Let the news come to you. Set up alerts for mentions, sentiment shifts, and volume spikes. Get notified via email, Slack, or your dashboard.
                </p>
                <p className="text-base text-black/40 mb-8">
                  Know first. React faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <BookDemoButton className="h-12 px-8 rounded-full" />
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-black/60 hover:text-black hover:bg-black/5 h-12 px-6 rounded-full font-medium"
                    onClick={() => {
                      document.getElementById('alerts-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    See alert types
                  </Button>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="lg:col-span-7">
                <div className="relative h-[400px] sm:h-[450px]">
                  {/* ASCII background */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-black">
                      <DelicateAsciiDots />
                    </div>
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  {/* Visual: Cascading notification cards */}
                  <div className="relative h-full p-6 sm:p-8 flex items-center justify-center">
                    <div className="relative w-full max-w-sm">
                      {/* Stacked alert cards with perspective */}
                      <div className="space-y-3">
                        {/* Alert 1 - Sentiment spike */}
                        <div className="bg-white/[0.08] backdrop-blur border border-white/10 rounded-xl p-4 transform translate-x-4 opacity-40">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-white/30 mt-1.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="h-2 w-24 bg-white/20 rounded mb-2" />
                              <div className="h-2 w-full bg-white/10 rounded" />
                            </div>
                          </div>
                        </div>

                        {/* Alert 2 - Volume spike */}
                        <div className="bg-white/[0.08] backdrop-blur border border-white/10 rounded-xl p-4 transform translate-x-2 opacity-60">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-amber-400/60 mt-1.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="h-2 w-20 bg-white/20 rounded mb-2" />
                              <div className="h-2 w-3/4 bg-white/10 rounded" />
                            </div>
                          </div>
                        </div>

                        {/* Alert 3 - Active/highlighted */}
                        <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-4 relative">
                          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-400 rounded-full" />
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0 animate-pulse" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-white/80 font-medium">Sentiment Spike</span>
                                <span className="text-[10px] text-white/40">now</span>
                              </div>
                              <p className="text-[11px] text-white/50 leading-relaxed">
                                <span className="text-white/70">MSTR</span> sentiment shifted to <span className="text-emerald-400">Bullish</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Alert 4 */}
                        <div className="bg-white/[0.08] backdrop-blur border border-white/10 rounded-xl p-4 transform -translate-x-1 opacity-80">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-400/60 mt-1.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-white/60 font-medium">New Mention</span>
                                <span className="text-[10px] text-white/30">2m</span>
                              </div>
                              <div className="h-2 w-full bg-white/10 rounded" />
                            </div>
                          </div>
                        </div>

                        {/* Alert 5 */}
                        <div className="bg-white/[0.08] backdrop-blur border border-white/10 rounded-xl p-4 transform -translate-x-2 opacity-50">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-white/30 mt-1.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="h-2 w-16 bg-white/15 rounded mb-2" />
                              <div className="h-2 w-2/3 bg-white/10 rounded" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alert Types Grid */}
        <section id="alerts-section" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                Alert types
              </h2>
              <p className="text-lg text-black/50">
                Monitor what matters. Ignore what doesn't.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {alertTypes.map((alert) => (
                <div
                  key={alert.number}
                  className={`group relative rounded-2xl p-8 transition-all duration-300 overflow-hidden ${
                    alert.theme === 'light'
                      ? 'bg-gradient-to-br from-white to-zinc-100 border border-black/[0.06] hover:shadow-xl hover:shadow-black/5'
                      : 'bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:shadow-xl hover:shadow-black/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-[10px] font-mono tracking-wider ${
                      alert.theme === 'light' ? 'text-black/40' : 'text-white/40'
                    }`}>{alert.number}</span>
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${alert.badgeColor}`}>
                      {alert.badge}
                    </span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    alert.theme === 'light' ? 'text-black' : 'text-white'
                  }`}>{alert.title}</h3>
                  <p className={`leading-relaxed ${
                    alert.theme === 'light' ? 'text-black/60' : 'text-white/60'
                  }`}>{alert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Channels */}
        <section className="py-20 sm:py-28 bg-white border-y border-black/5">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black mb-4">
                Delivery channels
              </h2>
              <p className="text-lg text-black/50">
                Get alerts where you work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deliveryChannels.map((channel, index) => (
                <div key={index} className="bg-[#FAFAFA] rounded-2xl p-8 border border-black/5 hover:shadow-lg transition-all duration-300 text-center">
                  <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${channel.badge}`}>
                    {channel.name}
                  </span>
                  <p className="text-black/60 text-sm mt-4">{channel.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Alert */}
        <section className="py-20 sm:py-28 bg-black">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
                Example alert
              </h2>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Sentiment Spike Alert</span>
                    <span className="text-white/40 text-sm">2 min ago</span>
                  </div>
                  <p className="text-white/70 mb-4">
                    <span className="text-white font-medium">MicroStrategy</span> sentiment shifted from <span className="text-white/50">Neutral</span> to <span className="text-emerald-400">Bullish</span> across 12 articles in the last hour.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-white/40">Top outlets: CoinDesk (4), Bloomberg (3), The Block (2)</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-white/40 text-sm">Delivered via Slack #market-alerts</span>
                <span className="text-orange-400 text-sm font-medium">View full coverage →</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl bg-black p-12 sm:p-16">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  Never miss a story again
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  Book a demo and we'll set up your first alerts.
                </p>
                <BookDemoButton
                  variant="outline"
                  className="h-12 px-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AlertsPage;
