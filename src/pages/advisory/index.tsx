import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X, Calendar, MessageSquare, FileText, BarChart3 } from 'lucide-react';
import SEO from '@/components/SEO';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

// Section Label component
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-stone-500 mb-4">
      {children}
    </span>
  );
}

const CALENDAR_URL = "https://calendar.google.com/appointments/schedules/AcZssZ3vRUqO4CmPAFPlmnyaZ_GbW6C7-hzrDu3A9hkYAcLxkEPBlyUlxhrJXxnkWwuKg_35FyqKfM93";

// CTA Button component
function CTAButton({ children, href = CALENDAR_URL, large = false }: { children: React.ReactNode; href?: string; large?: boolean }) {
  return (
    <motion.a
      href={href}
      className={`
        group inline-flex items-center gap-2
        bg-gradient-to-r from-amber-500 to-orange-500
        hover:from-amber-400 hover:to-orange-400
        text-stone-950 font-medium rounded-full
        transition-all duration-300
        shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30
        ${large ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-base'}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </motion.a>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-24">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950 to-stone-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.08),transparent_50%)]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Strategic Advisory</SectionLabel>
        </motion.div>

        <motion.h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-stone-100 leading-[1.1] tracking-tight mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Narrative intelligence from{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            Blockstream's former VP of Marketing & Communications.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CTAButton large>Book a Discovery Call</CTAButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="w-6 h-10 border-2 border-stone-700 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-stone-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// Problem Section
function ProblemSection() {
  const problems = [
    "You spend hours scanning Twitter, Telegram, and newsletters. You still miss things",
    "Competitors are moving on opportunities you didn't even know existed",
    "Regulatory windows open and close before you can position for them",
    "Your team is overwhelmed with information but lacks actionable insight",
    "You're reacting to the market instead of shaping it"
  ];

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <SectionLabel>The Problem</SectionLabel>
          </motion.div>

          <motion.h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-100 leading-tight mb-12"
            variants={staggerItem}
          >
            You can't keep up with everything happening in crypto.
          </motion.h2>

          <motion.ul className="space-y-4" variants={staggerContainer}>
            {problems.map((problem, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-4 text-stone-400 text-lg"
                variants={staggerItem}
              >
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-orange-500 rounded-full mt-3" />
                {problem}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}

// Deliverables Section
function DeliverablesSection() {
  const deliverables = [
    {
      icon: Calendar,
      title: "Monthly Strategy Session",
      description: "90-minute deep dive on narrative positioning, competitive landscape, and strategic priorities. Recorded for your team."
    },
    {
      icon: FileText,
      title: "Weekly Briefings",
      description: "What's shifting in your market. What it means for you. What to do about it. Delivered to your inbox every Monday."
    },
    {
      icon: BarChart3,
      title: "Quarterly Narrative Audit",
      description: "Comprehensive analysis of your positioning vs. market reality. Where you're winning, where you're vulnerable, and what to fix."
    },
    {
      icon: MessageSquare,
      title: "Direct Access",
      description: "Slack or Signal for time-sensitive questions. When narratives shift overnight, you'll have someone to call."
    }
  ];

  return (
    <section className="relative px-6 py-24 sm:py-32 bg-stone-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem} className="text-center mb-16">
            <SectionLabel>What You Get</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-100 leading-tight">
              Intelligence. Interpretation. Action.
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            variants={staggerContainer}
          >
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                className="group p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-stone-700 transition-all duration-300"
                variants={staggerItem}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4 group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-colors">
                  <item.icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="font-serif text-xl text-stone-100 mb-2">{item.title}</h3>
                <p className="text-stone-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Bio Section
function BioSection() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-[300px_1fr] gap-12 items-start"
        >
          <motion.div variants={staggerItem} className="md:sticky md:top-24">
            <SectionLabel>Who You're Working With</SectionLabel>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-800 mb-4">
              <img
                src="/images/fernando-nikolic.jpg"
                alt="Fernando Nikolic"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="font-serif text-2xl text-stone-100">Fernando Nikolic</h3>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p className="text-lg text-stone-300 leading-relaxed" variants={staggerItem}>
              <strong className="text-stone-100">4+ years as VP of Marketing & Communications at Blockstream</strong>, one of the most recognized Bitcoin infrastructure companies in the world. Before that, I was at Universal Music in Norway when torrents upended the industry.
            </motion.p>

            <motion.p className="text-lg text-stone-400 leading-relaxed" variants={staggerItem}>
              I've seen how narratives shape markets. How regulatory shifts create (or destroy) opportunities. How the right positioning at the right moment can define a company for years.
            </motion.p>

            <motion.p className="text-lg text-stone-400 leading-relaxed" variants={staggerItem}>
              Now I run <strong className="text-stone-300">Perception</strong>, a narrative intelligence platform tracking Bitcoin, stablecoins and tokenized finance across 650+ sources. The advisory service puts my interpretation and strategic thinking on top of that data.
            </motion.p>

            <motion.blockquote
              className="border-l-2 border-orange-500 pl-6 py-2 mt-8"
              variants={staggerItem}
            >
              <p className="font-serif text-xl text-stone-300 italic">
                "They called torrents piracy. Then they built Spotify. They'll do the same with Bitcoin."
              </p>
            </motion.blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  const included = [
    "Monthly 90-minute strategy session",
    "Weekly narrative briefings",
    "Quarterly narrative audit",
    "Direct Slack/Signal access",
    "All supporting research and documentation"
  ];

  return (
    <section className="relative px-6 py-24 sm:py-32 bg-stone-900/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={staggerItem}>
            <SectionLabel>Investment</SectionLabel>
          </motion.div>

          <motion.h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-100 leading-tight mb-4"
            variants={staggerItem}
          >
            This isn't for everyone.
          </motion.h2>

          <motion.p
            className="text-stone-400 text-lg mb-12 max-w-xl mx-auto"
            variants={staggerItem}
          >
            I cap advisory at 3 clients at a time. Quality over scale. If we work together, you get my full attention.
          </motion.p>

          <motion.div
            className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-900/80 border border-stone-800"
            variants={staggerItem}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/5 to-orange-500/5" />

            <div className="relative">
              <div className="mb-8">
                <span className="text-stone-400 text-xl">starting at</span>
                <span className="font-serif text-5xl sm:text-6xl text-stone-100 ml-2">$4,000</span>
                <span className="text-stone-400 text-xl ml-2">/month</span>
              </div>

              <p className="text-stone-500 mb-8">
                6-month minimum commitment · Invoiced monthly in advance
              </p>

              <ul className="grid sm:grid-cols-2 gap-3 text-left mb-10">
                {included.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-stone-300">
                    <Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <CTAButton large>Book a Discovery Call</CTAButton>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Best For Section
function BestForSection() {
  const audiences = [
    {
      title: "Crypto Companies",
      items: [
        "Entering new markets or jurisdictions",
        "Navigating regulatory uncertainty",
        "Pre-launch narrative positioning",
        "Competitive differentiation"
      ]
    },
    {
      title: "TradFi Entering Crypto",
      items: [
        "Building credibility with crypto natives",
        "Avoiding cultural landmines",
        "Understanding what's actually happening",
        "Moving fast without breaking things"
      ]
    },
    {
      title: "Projects Pre-Launch",
      items: [
        "Narrative architecture from day one",
        "Market timing analysis",
        "Positioning against competitors",
        "Media and messaging strategy"
      ]
    },
    {
      title: "Companies in Transition",
      items: [
        "Pivoting product or market focus",
        "Responding to regulatory shifts",
        "Countering negative narratives",
        "Rebuilding after setbacks"
      ]
    }
  ];

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem} className="text-center mb-16">
            <SectionLabel>Best For</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-stone-100 leading-tight">
              Who this works for
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {audiences.map((audience, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-stone-900/50 border border-stone-800 hover:border-stone-700 transition-colors"
                variants={staggerItem}
              >
                <h3 className="font-serif text-xl text-stone-100 mb-4">{audience.title}</h3>
                <ul className="space-y-2">
                  {audience.items.map((item, i) => (
                    <li key={i} className="text-stone-400 text-sm flex items-start gap-2">
                      <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Not For Section
function NotForSection() {
  const notFor = [
    "You're looking for someone to \"run your Twitter\"",
    "You want tactical execution without strategic thinking",
    "You need a full-service PR agency",
    "Budget is the primary decision factor",
    "You want someone to validate decisions you've already made"
  ];

  return (
    <section className="relative px-6 py-24 sm:py-32 bg-stone-900/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2
            className="font-serif text-3xl sm:text-4xl text-stone-100 leading-tight mb-4"
            variants={staggerItem}
          >
            Not a fit if...
          </motion.h2>

          <motion.p className="text-stone-400 text-lg mb-8" variants={staggerItem}>
            I'm selective about who I work with. This probably isn't right for you if:
          </motion.p>

          <motion.ul className="space-y-3 mb-8" variants={staggerContainer}>
            {notFor.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-4 text-stone-400"
                variants={staggerItem}
              >
                <X className="w-5 h-5 text-stone-600 flex-shrink-0" />
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.p className="text-stone-500" variants={staggerItem}>
            No hard feelings. There are great agencies and contractors who do those things. I'm just not one of them.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section id="book" className="relative px-6 py-32 sm:py-40">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-stone-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(251,146,60,0.1),transparent_50%)]" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-100 leading-tight mb-6"
            variants={staggerItem}
          >
            Ready to talk?
          </motion.h2>

          <motion.p
            className="text-stone-400 text-lg sm:text-xl mb-12 max-w-xl mx-auto"
            variants={staggerItem}
          >
            Book a 25-minute discovery call. No pitch, no pressure. Just a conversation to see if there's a fit.
          </motion.p>

          <motion.div variants={staggerItem}>
            <CTAButton large>
              Book Your Call
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Custom Footer for Advisory page
function AdvisoryFooter() {
  return (
    <footer className="px-6 py-12 border-t border-stone-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-serif text-stone-300">Perception</span>
          <span>Advisory</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://perception.to" className="hover:text-stone-300 transition-colors">
            perception.to
          </a>
          <a href="mailto:fernando@perception.to" className="hover:text-stone-300 transition-colors">
            fernando@perception.to
          </a>
        </div>
      </div>
    </footer>
  );
}

// Custom Nav for Advisory page
function AdvisoryNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a
          href="https://perception.to"
          className="font-serif text-xl text-stone-100 hover:text-orange-400 transition-colors"
        >
          Perception
        </a>
        <motion.a
          href={CALENDAR_URL}
          className="px-5 py-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 rounded-full text-stone-100 text-sm font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Book a Call
        </motion.a>
      </div>
    </nav>
  );
}

// Main Advisory Page
export function AdvisoryPage() {
  // Hide the main site navbar and footer on this page
  useEffect(() => {
    // Add class to body to hide main nav/footer
    document.body.classList.add('advisory-page');

    // Hide the main navbar and footer
    const navbar = document.querySelector('nav.fixed') as HTMLElement;
    const footer = document.querySelector('footer') as HTMLElement;
    const floatingNav = document.querySelector('[class*="floating-nav"]') as HTMLElement;
    const exitPopup = document.querySelector('[class*="exit-intent"]') as HTMLElement;

    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (floatingNav) floatingNav.style.display = 'none';
    if (exitPopup) exitPopup.style.display = 'none';

    return () => {
      document.body.classList.remove('advisory-page');
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
      if (floatingNav) floatingNav.style.display = '';
      if (exitPopup) exitPopup.style.display = '';
    };
  }, []);

  return (
    <>
      <SEO
        title="Perception Advisory | Strategic Narrative Intelligence for Crypto"
        description="Strategic advisory for crypto companies from the former VP of Marketing at Blockstream. Narrative intelligence that gives you an unfair advantage."
        url="https://perception.to/advisory"
        keywords={['crypto advisory', 'Bitcoin strategy', 'narrative intelligence', 'crypto marketing', 'Blockstream', 'crypto consulting']}
        image="/og/advisory.png"
      />

      {/* Force dark mode for this page - full viewport takeover */}
      <div className="fixed inset-0 bg-stone-950 text-stone-100 overflow-y-auto z-40">
        <AdvisoryNav />

        <main>
          <HeroSection />
          <ProblemSection />
          <DeliverablesSection />
          <BioSection />
          <PricingSection />
          <BestForSection />
          <NotForSection />
          <FinalCTASection />
        </main>

        <AdvisoryFooter />
      </div>
    </>
  );
}

export default AdvisoryPage;
