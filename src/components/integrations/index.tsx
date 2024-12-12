import { IntegrationCard } from "./integration-card";

const integrations = [
  {
    name: "Reddit",
    icon: "https://api.iconify.design/logos:reddit.svg",
    description: "Build interactive UIs with ease",
  },
  {
    name: "X",
    icon: "https://api.iconify.design/logos:x.svg",
    description: "Progressive JavaScript framework",
  },
  {
    name: "GitHub",
    icon: "https://api.iconify.design/logos:github.svg",
    description: "Platform for building web applications",
  },
  {
    name: "Bloomberg",
    icon: "https://api.iconify.design/logos:bloomberg.svg",
    description: "Cybernetically enhanced web apps",
  },
  {
    name: "The Block",
    icon: "https://api.iconify.design/logos:the-block.svg",
    description: "The React Framework for Production",
  },
  {
    name: "CoinDesk",
    icon: "https://api.iconify.design/logos:coindesk.svg",
    description: "The Intuitive Vue Framework",
  },
  {
    name: "MSNBC",
    icon: "https://api.iconify.design/logos:msnbc.svg",
    description: "Build faster websites with less client-side JavaScript",
  },
  {
    name: "The Financial Times",
    icon: "https://api.iconify.design/logos:the-financial-times.svg",
    description: "Full stack web framework",
  },
  {
    name: "The Guardian",
    icon: "https://api.iconify.design/logos:the-guardian.svg",
    description: "Simple and performant reactivity",
  },
  {
    name: "CNN",
    icon: "https://api.iconify.design/logos:cnn.svg",
    description: "Global news and analysis platform",
  },
  {
    name: "Forbes",
    icon: "https://api.iconify.design/logos:forbes.svg",
    description: "Business news and financial insights",
  },
  {
    name: "Reuters",
    icon: "https://api.iconify.design/logos:reuters.svg",
    description: "International news organization",
  },
  {
    name: "Wall Street Journal",
    icon: "https://api.iconify.design/logos:wsj.svg",
    description: "Business and financial news leader",
  },
  {
    name: "CNBC",
    icon: "https://api.iconify.design/logos:cnbc.svg",
    description: "Business and market news coverage",
  },
  {
    name: "BBC",
    icon: "https://api.iconify.design/logos:bbc.svg",
    description: "Global news and entertainment",
  },
  {
    name: "Yahoo Finance",
    icon: "https://api.iconify.design/logos:yahoo.svg",
    description: "Financial news and market data",
  },
  {
    name: "Decrypt",
    icon: "https://api.iconify.design/logos:decrypt.svg",
    description: "Cryptocurrency and blockchain news",
  },
  {
    name: "Cointelegraph",
    icon: "https://api.iconify.design/logos:cointelegraph.svg",
    description: "Digital asset and fintech news",
  },
];

// Update the rows split to handle 18 items (6 rows of 3)
const rows = [
  integrations.slice(0, 3),
  integrations.slice(3, 6),
  integrations.slice(6, 9),
  integrations.slice(9, 12),
  integrations.slice(12, 15),
  integrations.slice(15, 18),
];

export function Integrations() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.05),transparent)]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Monitor sentiment across 200+ channels
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Quickly track positive, negative, or neutral sentiment in the media to understand how Bitcoin is being discussed globally.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="relative flex flex-col gap-4">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex gap-4 py-4"
                style={{
                  animation: `scroll${rowIndex % 2 === 0 ? 'Left' : 'Right'} 20s linear infinite`,
                  width: 'fit-content'
                }}
              >
                {/* Double the items to create seamless loop */}
                {[...row, ...row].map((integration, index) => (
                  <div
                    key={`${integration.name}-${index}`}
                    className="w-[300px] flex-shrink-0"
                  >
                    <IntegrationCard {...integration} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}