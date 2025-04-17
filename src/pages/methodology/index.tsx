import { Navbar } from "@/components/navbar";
import { FooterLinks } from "@/components/footer/footer-links";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-32 max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Research Methodology</Badge>
            <h1 className="text-5xl font-extralight mb-4">
              Our Methodology
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive approach to tracking and analyzing Bitcoin's presence in global media
            </p>
          </div>
          
          <section className="prose max-w-none">
            <Card className="p-6 mb-12 bg-white border">
              <h2 className="text-2xl font-semibold mb-4 mt-0">Media Outlets Tracked</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="p-4 bg-white border">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    US
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    {usOutlets.map((outlet) => (
                      <li key={outlet}>{outlet}</li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-4 bg-white border">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Europe
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    {europeanOutlets.map((outlet) => (
                      <li key={outlet}>{outlet}</li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-4 bg-white border">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Latin America
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    {latinAmericanOutlets.map((outlet) => (
                      <li key={outlet}>{outlet}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            </Card>

            <Card className="p-6 bg-white border">
              <h2 className="text-2xl font-semibold mb-4 mt-0">Social and Web Platforms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Reddit", desc: "Monitoring discussions and trends in key Bitcoin subreddits" },
                  { name: "Twitter/X", desc: "Tracking tweets from influential accounts" },
                  { name: "Hacker News", desc: "Analyzing Bitcoin-related posts and comments" },
                  { name: "GitHub", desc: "Monitoring activity and discussions in the Bitcoin repository" },
                  { name: "YouTube", desc: "Tracking popular videos and channels discussing Bitcoin" },
                  { name: "Crypto Outlets", desc: "Including leading sources like Cointelegraph, CoinDesk, Bitcoin Magazine" }
                ].map((platform) => (
                  <Card key={platform.name} className="p-4 bg-white border">
                    <h4 className="font-semibold mb-2">{platform.name}</h4>
                    <p className="text-sm text-muted-foreground">{platform.desc}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </main>
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-16">
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
} 