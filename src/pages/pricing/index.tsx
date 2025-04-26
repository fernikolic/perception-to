import { PriceList } from '@/components/pricing/price-list';
import { Button } from '@/components/ui/button';
import { FaqList } from '@/components/faq/faq-list';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <section id="pricing" className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight sm:text-6xl">
              Choose the depth of signal you need.
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg leading-7 md:leading-8 text-muted-foreground">
              All paid plans start with a 7-day free trial & self-serve cancel.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="free-banner bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 py-4 md:py-5 px-4 md:px-6 text-center rounded-lg mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-center md:space-x-4">
              <div>
                <h2 className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-100">Get a delayed daily snapshot free.</h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Slack Pulse (1 digest / day, 24-h lag) + Weekly email.</p>
              </div>
              <Button 
                variant="outline" 
                size="lg" 
                className="mt-3 md:mt-0 w-full md:w-auto border-foreground/20 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white group font-normal"
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
          
          <div className="mt-12 md:mt-16 text-center">
            <p className="text-xs md:text-sm text-muted-foreground">
              Guarantee: If Pro doesn't save you at least five hours in week one, cancel in-app — no forms, no emails.
            </p>
          </div>
          
          <div className="mt-20 md:mt-24">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">Frequently Asked Questions</h2>
            <FaqList />
          </div>
        </div>
      </section>
    </div>
  );
}