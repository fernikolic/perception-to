import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Zap, Clock, Users, TrendingUp, Shield } from 'lucide-react';

export default function SlackIntegrationPage() {
  return (
    <div className="min-h-screen bg-background pt-28">
      {/* Hero Section with Card Design */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
        {/* Subtle radial background like homepage */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_50%)]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Card with Background Image (matches homepage) */}
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src="/images/hero_image.avif"
                alt="Bitcoin sentiment analysis dashboard background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
              <div className="mx-auto max-w-3xl text-center">
                {/* Segment badge */}
                <div className="mb-6 sm:mb-8">
                  <span className="inline-flex items-center rounded-full bg-transparent px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium leading-6 text-black ring-1 ring-inset ring-black/30 hover:ring-black/50 transition-all duration-300">
                    For digital asset companies
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-black max-w-4xl mx-auto">
                  Digital asset intelligence delivered to your workspace
                </h1>
                
                <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light max-w-3xl mx-auto">
                  Get real-time digital asset narratives, sentiment shifts, and market intelligence delivered directly to your Slack channels. No more manual research.
                </p>

                <div className="mt-6 sm:mt-8 lg:mt-10 flex items-center justify-center">
                  <a 
                    href="https://slack.com/oauth/v2/authorize?client_id=268627365575.8796942905360&scope=incoming-webhook,chat:write&redirect_uri=https://us-central1-triple-upgrade-245423.cloudfunctions.net/btcpApiFunction3-1/slack/oauth_redirect" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-black text-white hover:bg-black/90 transition-all font-normal px-6 lg:px-8 text-sm sm:text-base shadow-lg hover:shadow-xl py-3 lg:py-4 rounded-lg inline-flex items-center"
                  >
                    <img 
                      src="/logos/Slack_icon_2019.svg.png" 
                      alt="Slack" 
                      className="w-5 h-5 mr-2 filter brightness-0 invert"
                    />
                    Connect to Slack
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-6">
              Everything You Need to Stay Ahead
            </h2>
            <p className="text-lg text-muted-foreground">
              Transform your Slack workspace into a digital asset intelligence hub
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 to-gray-100 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Real-Time Alerts</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get instant notifications when major digital asset narratives break,
                  sentiment shifts occur, or institutional developments emerge.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-400 to-gray-200 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Daily Digests</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receive curated summaries of the day's most important digital asset
                  developments, delivered at your preferred time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black dark:from-gray-200 to-white rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Trend Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track emerging narratives and sentiment shifts across 200+ 
                  sources with intelligent trend detection.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 dark:from-gray-500 to-gray-300 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Team Collaboration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Share insights with your team instantly. Perfect for 
                  investment teams, research groups, and trading desks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-black dark:from-gray-100 to-white rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Enterprise Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bank-grade security with enterprise SSO support. 
                  Your data stays private and secure.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-600 to-gray-400 rounded-xl flex items-center justify-center mb-6">
                  <Check className="w-6 h-6 text-white dark:text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Zero Setup</h3>
                <p className="text-muted-foreground leading-relaxed">
                  One-click integration. No technical setup required. 
                  Start receiving intelligence in seconds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-black dark:from-gray-200 to-white rounded-3xl p-12 md:p-16 text-white dark:text-gray-900 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-6">
              Ready to transform your digital asset intelligence?
            </h2>
            <p className="text-xl text-gray-200 dark:text-gray-700 mb-8 max-w-2xl mx-auto">
              Join hundreds of professionals who are already saving hours every week 
              with automated digital asset intelligence delivered to their Slack.
            </p>
            
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="https://slack.com/oauth/v2/authorize?client_id=268627365575.8796942905360&scope=incoming-webhook,chat:write&redirect_uri=https://us-central1-triple-upgrade-245423.cloudfunctions.net/btcpApiFunction3-1/slack/oauth_redirect" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/logos/Slack_icon_2019.svg.png" 
                  alt="Slack" 
                  className="w-5 h-5 mr-2 filter brightness-0 invert dark:brightness-0 dark:invert-0"
                />
                Connect Your Workspace
              </a>
            </Button>
            
            <p className="text-sm text-gray-300 dark:text-gray-600 mt-4">
              Free forever • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 