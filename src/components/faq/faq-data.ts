export interface FaqItem {
  question: string;
  answer: string;
  linkText?: string;
  linkHref?: string;
  linkAction?: "bookDemo";
  linkSuffix?: string;
}

export const faqData: FaqItem[] = [
  {
    question: "What is Perception?",
    answer: "The research platform for professionals doing serious work in Bitcoin and digital assets. We monitor 450+ sources across media, social, and earnings calls, then generate cited intelligence briefs on demand. Board updates, competitive reports, earnings analysis in minutes, not hours."
  },
  {
    question: "Who is Perception for?",
    answer: "Professionals who need to stay informed and deliver insights:\n• Fund analysts researching digital asset-exposed equities\n• IR and communications teams tracking coverage\n• Family offices monitoring their digital asset allocations\n• Financial journalists covering the space\n• Anyone who needs cited intelligence without hours of manual research"
  },
  {
    question: "What sources does Perception track?",
    answer: "450+ sources including Bloomberg, Financial Times, CoinDesk, The Block, Bitcoin Magazine, Reddit, X, GitHub, YouTube, podcasts, and mainstream outlets like NYT, BBC, CNN, and Reuters. Full list available on the ",
    linkText: "sources page",
    linkHref: "/sources"
  },
  {
    question: "What can I create with Perception?",
    answer: "Board updates, competitive positioning reports, earnings call summaries, interview prep briefs, stakeholder communications, and more. All include full source citations you can verify."
  },
  {
    question: "How much does Perception cost?",
    answer: "Analyst is $149/month for individual researchers. Professional is $299/month for power users and small teams. Team pricing is custom for organizations. Annual plans include 2 months free."
  },
  {
    question: "Can I try before I buy?",
    answer: "Yes. Book a demo and we'll give you a personalized walkthrough. We'll set you up with access so you can explore with your own watchlist."
  },
  {
    question: "What if I need more than 50 reports/month?",
    answer: "Talk to us about the Team plan. We can customize limits based on your needs."
  },
  {
    question: "Do you offer annual pricing?",
    answer: "Yes. Annual plans include 2 months free. ",
    linkText: "Contact us",
    linkAction: "bookDemo",
    linkSuffix: " for details."
  },
  {
    question: "How is this different from Google Alerts?",
    answer: "Google Alerts tells you something was published. Perception tells you what it means: sentiment, narrative context, competitive positioning, and how it connects to everything else being said. Plus, we generate cited deliverables you can actually use."
  },
  {
    question: "How is this different from ChatGPT?",
    answer: "ChatGPT scrapes generic search results and can hallucinate. Perception is purpose-built for Bitcoin and digital assets with 450+ curated sources, real-time monitoring, and professional deliverable generation with verifiable citations. It's a complete intelligence platform, not a chat tool."
  },
  {
    question: "Can I provide feedback or request features?",
    answer: "Yes. Email support or use the in-app feedback button. User input shapes the roadmap."
  }
];
