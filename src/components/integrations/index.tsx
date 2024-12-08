import { IntegrationCard } from "./integration-card";

const integrations = [
  {
    name: "React",
    icon: "https://api.iconify.design/logos:react.svg",
    description: "Build interactive UIs with ease",
  },
  {
    name: "Vue",
    icon: "https://api.iconify.design/logos:vue.svg",
    description: "Progressive JavaScript framework",
  },
  {
    name: "Angular",
    icon: "https://api.iconify.design/logos:angular-icon.svg",
    description: "Platform for building web applications",
  },
  {
    name: "Svelte",
    icon: "https://api.iconify.design/logos:svelte-icon.svg",
    description: "Cybernetically enhanced web apps",
  },
  {
    name: "Next.js",
    icon: "https://api.iconify.design/logos:nextjs-icon.svg",
    description: "The React Framework for Production",
  },
  {
    name: "Nuxt",
    icon: "https://api.iconify.design/logos:nuxt-icon.svg",
    description: "The Intuitive Vue Framework",
  },
  {
    name: "Astro",
    icon: "https://api.iconify.design/logos:astro-icon.svg",
    description: "Build faster websites with less client-side JavaScript",
  },
  {
    name: "Remix",
    icon: "https://api.iconify.design/logos:remix-icon.svg",
    description: "Full stack web framework",
  },
  {
    name: "SolidJS",
    icon: "https://api.iconify.design/logos:solidjs-icon.svg",
    description: "Simple and performant reactivity",
  },
];

// Split integrations into three rows
const rows = [
  integrations.slice(0, 3),
  integrations.slice(3, 6),
  integrations.slice(6, 9),
];

export function Integrations() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.05),transparent)]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Monitor media sentiment across channels
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