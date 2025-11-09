import { motion } from 'framer-motion';
import './hero-conveyor.css';

const sourceLogos = [
  '/source-logos/twitter-x.svg',
  '/source-logos/reddit.svg',
  '/source-logos/github.svg',
  '/source-logos/bloomberg.svg',
  '/source-logos/reuters.svg',
  '/source-logos/youtube.svg',
];

// Create continuous stream with 18 logos
const createLogoStream = () => {
  const stream = [];
  for (let i = 0; i < 3; i++) {
    sourceLogos.forEach(logo => stream.push(logo));
  }
  return stream;
};

export function HeroConveyor() {
  const logoStream = createLogoStream();
  return (
    <div className="hero-conveyor-simple">
      <div className="conveyor-content-simple">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            From Data to Intelligence
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            140+ sources continuously processed into actionable insights
          </p>
        </div>

        {/* Flow Line */}
        <div className="flow-line">
          {/* Sources Queue - Moving horizontally into grinder */}
          <div className="sources-section">
            <div className="section-label">Sources</div>
            <div className="sources-queue">
              {logoStream.map((logo, i) => (
                <div
                  key={i}
                  className="queue-item"
                >
                  <div className="logo-box">
                    <img src={logo} alt="Source" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grinder */}
          <div className="grinder-section">
            <div className="section-label">Process</div>
            <div className="processor-logo">
              <img src="/logos/perception-logo-dark.png" alt="Perception" />
            </div>
          </div>

          {/* Output */}
          <div className="output-section">
            <div className="section-label">Intelligence</div>
            <div className="output-items">
              <div className="output-box output-box-1" style={{ left: '-250px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>Reports</span>
              </div>
              <div className="output-box output-box-2" style={{ left: '-460px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="9" y1="9" x2="9" y2="15"/>
                </svg>
                <span>Analytics</span>
              </div>
              <div className="output-box output-box-3" style={{ left: '-670px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18"/>
                  <path d="m19 9-5 5-4-4-3 3"/>
                </svg>
                <span>Insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-simple">
          <div className="stat">
            <div className="stat-value">140+</div>
            <div className="stat-label">Sources</div>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <div className="stat-value">Real-time</div>
            <div className="stat-label">Processing</div>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <div className="stat-value">5 min</div>
            <div className="stat-label">Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
}
