import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X, Calendar, MessageSquare, FileText, BarChart3, Monitor } from 'lucide-react';
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
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-stone-100 leading-[1.1] tracking-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Brand positioning based on{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            data, not gut feel.
          </span>
        </motion.h1>

        <motion.p
          className="text-stone-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Strategic advisory from Blockstream's former VP of Marketing & Communications. 450+ sources tracked in real-time. Narrative intelligence that helps you position before your competitors see the opportunity.
        </motion.p>

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
    "You don't know which narratives are gaining traction until it's too late",
    "Competitors are positioning around opportunities you haven't identified",
    "Your brand blends in when it should stand out",
    "You're reacting to conversations instead of shaping them",
    "Every positioning decision feels like an educated guess"
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
            You're making positioning decisions without complete information.
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
      description: "90 minutes. Your positioning, your competitive landscape, your next moves. Recorded for your team."
    },
    {
      icon: FileText,
      title: "Weekly Briefings",
      description: "Which narratives are rising. Which are fading. Where the gaps are. What to do about it. Every Monday."
    },
    {
      icon: BarChart3,
      title: "Quarterly Narrative Audit",
      description: "A comprehensive analysis of how you're positioned versus market reality. Where you're winning. Where you're exposed."
    },
    {
      icon: MessageSquare,
      title: "Direct Access",
      description: "Slack or Signal. When a narrative shifts overnight or an opportunity emerges, you'll have someone to call."
    },
    {
      icon: Monitor,
      title: "Perception Platform",
      description: "Full access to the intelligence platform tracking 450+ sources in real-time. See what I see. ($199/month value, included.)"
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
              Intelligence. Interpretation. Positioning.
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
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
              <strong className="text-stone-100">4+ years as VP of Marketing & Communications at Blockstream</strong>, one of the most recognized Bitcoin infrastructure companies in the world.
            </motion.p>

            <motion.p className="text-lg text-stone-400 leading-relaxed" variants={staggerItem}>
              Before that, I watched the music industry collapse from inside Universal Music during the torrents era. I've seen what happens when companies misread narratives. I've also seen what happens when they get it right.
            </motion.p>

            <motion.p className="text-lg text-stone-400 leading-relaxed" variants={staggerItem}>
              Now I run <strong className="text-stone-300">Perception</strong>, a narrative intelligence platform tracking Bitcoin, stablecoins, and tokenized finance across 450+ sources. The advisory service puts my interpretation and strategic thinking on top of that data.
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
    "Quarterly positioning audit",
    "Direct Slack/Signal access",
    "Full Perception platform access",
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
            Five clients. That's the cap.
          </motion.h2>

          <motion.p
            className="text-stone-400 text-lg mb-12 max-w-xl mx-auto"
            variants={staggerItem}
          >
            I don't scale. I go deep. If we work together, you get my full attention and the complete intelligence infrastructure behind Perception.
          </motion.p>

          <motion.div
            className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-900/80 border border-stone-800"
            variants={staggerItem}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/5 to-orange-500/5" />

            <div className="relative">
              <div className="mb-4">
                <span className="font-serif text-5xl sm:text-6xl text-stone-100">$30,000</span>
                <span className="text-stone-400 text-xl ml-2">for six months</span>
              </div>

              <p className="text-orange-400 font-medium mb-8">
                2 slots available
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
      title: "Need to position a new product or company",
      items: [
        "Launching into a crowded market",
        "Entering new jurisdictions",
        "Building a brand from scratch",
        "Differentiating against entrenched players"
      ]
    },
    {
      title: "Are entering crypto from traditional finance",
      items: [
        "Need credibility with crypto natives",
        "Want to avoid cultural landmines",
        "Must move fast without missteps",
        "Require strategic context, not just tactics"
      ]
    },
    {
      title: "Are repositioning or pivoting",
      items: [
        "Responding to regulatory shifts",
        "Countering negative narratives",
        "Rebuilding after setbacks",
        "Pivoting product or market focus"
      ]
    },
    {
      title: "Want to build a personal brand alongside their company",
      items: [
        "Founders who want to be the face of their thesis",
        "Executives building thought leadership",
        "Teams where personal and company brands must align"
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
              This works for founders who:
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
    "You want someone to run your social media",
    "You need tactical execution, not strategic thinking",
    "You're looking for a full-service PR agency",
    "Price is the primary decision factor",
    "You want validation, not honest assessment"
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
            className="font-serif text-3xl sm:text-4xl text-stone-100 leading-tight mb-8"
            variants={staggerItem}
          >
            Not a fit if:
          </motion.h2>

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
            No hard feelings. There are agencies that do those things well. I'm not one of them.
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
            One conversation. No pitch.
          </motion.h2>

          <motion.p
            className="text-stone-400 text-lg sm:text-xl mb-6 max-w-xl mx-auto"
            variants={staggerItem}
          >
            25 minutes. I'll ask about your positioning challenges. You'll ask about how I work. We'll both know quickly if there's a fit.
          </motion.p>

          <motion.p
            className="text-orange-400 font-medium text-lg mb-12 max-w-xl mx-auto"
            variants={staggerItem}
          >
            2 spots left. When they're gone, they're gone.
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
        title="Perception Advisory | Brand Positioning Based on Data"
        description="Strategic advisory for crypto founders. 450+ sources tracked in real-time. Positioning strategy based on narrative intelligence, not guesswork."
        url="https://perception.to/advisory"
        keywords={['crypto advisory', 'Bitcoin strategy', 'narrative intelligence', 'crypto marketing', 'Blockstream', 'crypto consulting', 'brand positioning']}
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
