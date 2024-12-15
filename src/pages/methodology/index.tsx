import { Navbar } from "@/components/navbar";
import { FooterLinks } from "@/components/footer/footer-links";

const usOutlets = [
  "CBS News", "Vice", "NBC News", "CNBC", "The Wall Street Journal",
  "Barron's", "Rolling Stone", "The New Yorker", "Fortune",
  "The New York Times", "Los Angeles Times", "The Atlantic", "CNN",
  "Bloomberg", "Vox", "The Boston Globe", "Fox News", "Fox Business",
  "Politico", "Time", "New York Post", "Forbes", "Newsweek",
  "ABC News", "Associated Press", "MSNBC", "NPR", "PBS",
  "Vanity Fair", "Chicago Tribune"
];

const europeanOutlets = [
  "Daily Mail", "The Economist", "Reuters", "Financial Times", 
  "The Guardian", "The Telegraph", "BBC", 
  "Frankfurter Allgemeine Zeitung", "Corriere della Sera", 
  "La Repubblica", "Agence France-Presse", "Le Figaro", 
  "France Télévisions", "Le Monde", "ZDF", "Al Jazeera", 
  "El País", "La Sexta", "ABC", "El Periódico", "La Vanguardia", 
  "El Mundo", "Antena 3", "RTVE", "Telecinco",
  "vg.no", "nrk.no", "tv2.dk", "tv2.no", "finans.dk",
  "dr.dk", "politiken.dk", "jyllands-posten.dk", "nyheter24.se",
  "sydsvenskan.se", "svt.se", "aftonbladet.se", "expressen.se",
  "aftenposten.no", "dagbladet.no", "dn.no", "bt.no",
  "e24.no", "morgenbladet.no", "finansavisen.no"
];

const latinAmericanOutlets = [
  "Milenio", "TV Azteca", "El Financiero", "El Comercio",
  "Página/12", "Clarín", "El Tiempo", "La Nación",
  "El Universal", "Todo Noticias", "Excélsior", "Reforma",
  "Crónica", "El Universal", "El Nacional", "El Debate"
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Methodology</h1>
          
          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Scope and Selection of Sources</h2>
            <p className="mb-6">
              Bitcoin Perception tracks a curated list of 91 renowned media outlets, each selected for their impact 
              and audience size, as well as popular social and web platforms.
            </p>

            <h3 className="text-xl font-semibold mb-4">Media Outlets Tracked (updated December 2024):</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-2">US:</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {usOutlets.map((outlet) => (
                    <li key={outlet}>{outlet}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Europe:</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {europeanOutlets.map((outlet) => (
                    <li key={outlet}>{outlet}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Latin America:</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {latinAmericanOutlets.map((outlet) => (
                    <li key={outlet}>{outlet}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Expanded Social and Web Metrics</h2>
              <p className="mb-4">
                In addition to traditional media outlets, Bitcoin Perception tracks influential sources across 
                social and web platforms to provide a more comprehensive view of Bitcoin's market perception.
              </p>

              <h3 className="text-xl font-semibold mb-4">Sources Tracked:</h3>
              <ul className="list-disc pl-4 space-y-2 mb-8">
                <li>Reddit: Monitoring discussions and trends in key Bitcoin subreddits.</li>
                <li>Twitter/X: Tracking tweets from influential accounts.</li>
                <li>Hacker News: Analyzing Bitcoin-related posts and comments.</li>
                <li>GitHub: Monitoring activity and discussions in the Bitcoin repository.</li>
                <li>YouTube: Tracking popular videos and channels discussing Bitcoin.</li>
                <li>Crypto Outlets: Including leading sources like Cointelegraph, CoinDesk, Bitcoin Magazine, and others.</li>
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Data Collection Process</h2>
              <p className="mb-6">
                Every mention of Bitcoin across these platforms and media outlets is included in our analysis. 
                This approach ensures a holistic view of Bitcoin's presence in both traditional and modern media, 
                capturing dedicated articles, social media posts, and incidental mentions.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Human Review and Analysis</h2>
              <p className="mb-6">
                A team of expert analysts reviews each piece of content. They delve into the context and sentiment 
                of the Bitcoin mentions, whether it's the focal point or a peripheral mention. This human element 
                is crucial for an accurate and nuanced understanding of Bitcoin's portrayal across different platforms.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Labeling Criteria</h2>
              <p className="mb-6">
                Content is categorized as positive, negative, or balanced based on a detailed assessment. 
                This includes examining the tone, context, and specific language used in relation to Bitcoin. 
                Such a comprehensive review allows for a more refined and accurate categorization than automated systems.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Data Integrity and Accessibility</h2>
              <p className="mb-6">
                Bitcoin Perception's commitment to ethical data practices is exemplified by its reliance on 
                publicly available sources. There is no use of invasive data scraping, ensuring respect for 
                both the integrity of the data and the content creators. The data collected is made accessible 
                for free for a transparent insight into Bitcoin's media and social portrayal.
              </p>
            </div>

            <div className="mt-12 mb-16">
              <h2 className="text-2xl font-semibold mb-4">Implications and Uses of the Data</h2>
              <p className="mb-6">
                The data from Bitcoin Perception serves as a valuable resource for businesses, researchers, 
                and Bitcoin enthusiasts. It offers a window into public sentiment and media trends surrounding 
                Bitcoin, helping stakeholders make informed decisions and understanding.
              </p>
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t border-white/10 bg-background">
        <div className="container mx-auto px-4 py-16">
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
} 