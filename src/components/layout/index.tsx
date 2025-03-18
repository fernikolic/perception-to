import Nav from './nav';
import Footer from './footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Nav />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
} 