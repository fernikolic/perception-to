import { PriceList } from '@/components/pricing/price-list';
import { Button } from '@/components/ui/button';
import { FaqList } from '@/components/faq/faq-list';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <section id="pricing" className="relative overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl md:text-5xl font-extralight tracking-tight sm:text-6xl mb-6">
              Choose your signal depth
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-2">
              Free access with self-serve cancellation
            </p>
            <p className="text-sm text-muted-foreground/80 max-w-md mx-auto">
              Pro guarantee: 5-hour time savings in week one or cancel
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="free-banner bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 py-5 md:py-6 px-5 md:px-8 text-center rounded-xl mb-10 md:mb-14 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-center md:space-x-6">
              <div>
                <h2 className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-100">Try our free Slack integration</h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Instant updates and multiple daily digests delivered right to your workspace</p>
              </div>
              <Button 
                variant="outline" 
                size="lg" 
                className="mt-4 md:mt-0 w-full md:w-auto border-foreground/20 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white group font-normal"
                asChild
              >
                <a href="https://slack.com/oauth/v2/authorize?client_id=268627365575.8796942905360&scope=incoming-webhook,chat:write&redirect_uri=https://us-central1-triple-upgrade-245423.cloudfunctions.net/btcpApiFunction3-1/slack/oauth_redirect" target="_blank" rel="noopener noreferrer">
                  Connect to Slack{' '}
                  <img 
                    src="/logos/Slack_icon_2019.svg.png" 
                    alt="Slack logo" 
                    className="ml-2 h-5 w-5 inline-block"
                  />
                </a>
              </Button>
            </div>
          </div>
          
          <PriceList />
          
          <div className="mt-24 md:mt-32">
            <h2 className="text-2xl md:text-3xl font-extralight text-center mb-10 md:mb-14">
              Frequently Asked Questions
            </h2>
            <FaqList />
          </div>
        </div>
      </section>
    </div>
  );
}