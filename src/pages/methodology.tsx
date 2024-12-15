import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  "Verdens Gang", "Norwegian Broadcasting Corporation (NRK)", 
  "TV 2 Denmark", "TV 2 Norway", "Finans (Denmark)",
  "Danish Broadcasting Corporation (DR)", "Politiken", "Jyllands-Posten", 
  "Nyheter24", "Sydsvenskan", "Sveriges Television (SVT)", 
  "Aftonbladet", "Expressen", "Aftenposten", "Dagbladet",
  "Dagens Næringsliv", "Bergens Tidende", "E24",
  "Morgenbladet", "Finansavisen"
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
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-32 max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Research Methodology</Badge>
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Our Methodology
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive approach to tracking and analyzing Bitcoin's presence in global media
            </p>
          </div>
          
          <section className="prose prose-invert max-w-none">
            <Card className="p-6 mb-12 bg-black/50 border-white/10">
              <h2 className="text-2xl font-semibold mb-4">Scope and Selection of Sources</h2>
              <p className="text-gray-300 mb-6">
                Bitcoin Perception tracks a curated list of 91 renowned media outlets, each selected for their impact 
                and audience size, as well as popular social and web platforms.
              </p>

              <h3 className="text-xl font-semibold mb-4">Media Outlets Tracked 
                <Badge variant="outline" className="ml-2 text-xs">Updated December 2024</Badge>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="p-4 bg-black/30 border-white/10">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    US
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-gray-300">
                    {usOutlets.map((outlet) => (
                      <li key={outlet}>{outlet}</li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-4 bg-black/30 border-white/10">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Europe
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-gray-300">
                    {europeanOutlets.map((outlet) => (
                      <li key={outlet}>{outlet}</li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-4 bg-black/30 border-white/10">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Latin America
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-gray-300">
                    {latinAmericanOutlets.map((outlet) => (
                      <li key={outlet}>{outlet}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </Card>

            <Card className="p-6 mb-12 bg-black/50 border-white/10">
              <h2 className="text-2xl font-semibold mb-4">Expanded Social and Web Metrics</h2>
              <p className="text-gray-300 mb-4">
                In addition to traditional media outlets, Bitcoin Perception tracks influential sources across 
                social and web platforms to provide a more comprehensive view of Bitcoin's market perception.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {[
                  { name: "Reddit", desc: "Monitoring discussions and trends in key Bitcoin subreddits" },
                  { name: "Twitter/X", desc: "Tracking tweets from influential accounts" },
                  { name: "Hacker News", desc: "Analyzing Bitcoin-related posts and comments" },
                  { name: "GitHub", desc: "Monitoring activity and discussions in the Bitcoin repository" },
                  { name: "YouTube", desc: "Tracking popular videos and channels discussing Bitcoin" },
                  { name: "Crypto Outlets", desc: "Including leading sources like Cointelegraph, CoinDesk, Bitcoin Magazine" }
                ].map((platform) => (
                  <Card key={platform.name} className="p-4 bg-black/30 border-white/10">
                    <h4 className="font-semibold mb-2">{platform.name}</h4>
                    <p className="text-sm text-gray-400">{platform.desc}</p>
                  </Card>
                ))}
              </div>
            </Card>

            {[
              {
                title: "Data Collection Process",
                content: "Every mention of Bitcoin across these platforms and media outlets is included in our analysis..."
              },
              {
                title: "Human Review and Analysis",
                content: "A team of expert analysts reviews each piece of content..."
              },
              {
                title: "Labeling Criteria",
                content: "Content is categorized as positive, negative, or balanced based on a detailed assessment..."
              },
              {
                title: "Data Integrity and Accessibility",
                content: "Bitcoin Perception's commitment to ethical data practices..."
              },
              {
                title: "Implications and Uses of the Data",
                content: "The data from Bitcoin Perception serves as a valuable resource..."
              }
            ].map((section) => (
              <Card key={section.title} className="p-6 mb-8 bg-black/50 border-white/10 hover:bg-black/60 transition-colors">
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <p className="text-gray-300">{section.content}</p>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
} 