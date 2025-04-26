import { PriceList } from './price-list';
import { Button } from '@/components/ui/button';

export function Pricing() {
  return (
    <section id="pricing" className="pt-8 pb-24 sm:pt-16 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-thin tracking-tight sm:text-6xl lg:text-7xl pb-4">
            Narratives move markets.
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-800 inline-block text-transparent bg-clip-text leading-relaxed">
              Perception tells you where they're going.
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            See real-time sentiment shifts, rising institutional narratives, and breakout themes <br /> that shape capital, policy, and adoption.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
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
        </div>
      </div>
    </section>
  );
}