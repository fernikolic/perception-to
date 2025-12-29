import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Copy, Check, ArrowRight } from 'lucide-react';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';
import { toast } from 'sonner';

// Color palette data
const colors = [
  {
    name: 'Perception Black',
    hex: '#0A0A0A',
    rgb: '10, 10, 10',
    usage: 'Primary dark backgrounds, text on light',
    textColor: 'white',
  },
  {
    name: 'Off White',
    hex: '#F5F3ED',
    rgb: '245, 243, 237',
    usage: 'Primary light backgrounds',
    textColor: 'black',
  },
  {
    name: 'Cream',
    hex: '#F0EDE4',
    rgb: '240, 237, 228',
    usage: 'Secondary light backgrounds, cards',
    textColor: 'black',
  },
  {
    name: 'Accent Orange',
    hex: '#FF6B35',
    rgb: '255, 107, 53',
    usage: 'CTAs, emphasis, underlines',
    textColor: 'white',
  },
  {
    name: 'Lime',
    hex: '#C5F06A',
    rgb: '197, 240, 106',
    usage: 'Special applications only',
    textColor: 'black',
  },
  {
    name: 'Text Gray',
    hex: '#6B6B6B',
    rgb: '107, 107, 107',
    usage: 'Secondary text, captions',
    textColor: 'white',
  },
];

// Typography scale
const typeScale = [
  { level: 'Display', size: '48-72px', weight: 'Bold (700)', lineHeight: '1.1', usage: 'Hero headlines, landing pages' },
  { level: 'H1', size: '32-40px', weight: 'Bold (700)', lineHeight: '1.2', usage: 'Page titles, section headers' },
  { level: 'H2', size: '24-28px', weight: 'Bold (700)', lineHeight: '1.3', usage: 'Subsection headers, card titles' },
  { level: 'H3', size: '18-20px', weight: 'Bold (700)', lineHeight: '1.4', usage: 'Minor headers, feature titles' },
  { level: 'Body', size: '16-18px', weight: 'Regular (400)', lineHeight: '1.6', usage: 'Paragraph text, descriptions' },
  { level: 'Small', size: '12-14px', weight: 'Regular (400)', lineHeight: '1.5', usage: 'Captions, labels, metadata' },
];

// ASCII pattern types
const patternTypes = [
  { name: 'Dot Matrix Globe', meaning: 'Global coverage, worldwide monitoring' },
  { name: 'Concentric Spirals', meaning: 'Trend analysis, ripple effects' },
  { name: 'Data Streams', meaning: 'Information flow, real-time monitoring' },
  { name: 'Particle Clouds', meaning: 'Data points, analysis' },
  { name: 'Waveforms', meaning: 'Signal detection' },
];

// Logo versions
const logoVersions = [
  { name: 'Dark (Inverted)', filename: 'logo-dark.png', useCase: 'On dark/black backgrounds' },
  { name: 'Light', filename: 'logo-light.png', useCase: 'On light/white backgrounds' },
];

function ColorSwatch({ color }: { color: typeof colors[0] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      toast.success(`Copied ${color.hex}`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-left w-full"
    >
      <div
        className="h-32 sm:h-40 w-full flex items-end p-4"
        style={{ backgroundColor: color.hex }}
      >
        <div className="absolute top-3 right-3">
          {copied ? (
            <Check className="h-5 w-5" style={{ color: color.textColor }} />
          ) : (
            <Copy className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: color.textColor }} />
          )}
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="font-semibold text-black text-sm mb-1">{color.name}</div>
        <div className="font-mono text-xs text-black/60 mb-1">{color.hex}</div>
        <div className="text-xs text-black/40">RGB: {color.rgb}</div>
      </div>
    </button>
  );
}

export function BrandPage() {
  const copyFontStack = async () => {
    const fontStack = `font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;`;
    try {
      await navigator.clipboard.writeText(fontStack);
      toast.success('Font stack copied!');
    } catch {
      toast.error('Failed to copy');
    }
  };

  const copyCSSVariables = async () => {
    const cssVars = `--color-black: #0A0A0A;
--color-off-white: #F5F3ED;
--color-cream: #F0EDE4;
--color-orange: #FF6B35;
--color-lime: #C5F06A;
--color-gray: #6B6B6B;`;
    try {
      await navigator.clipboard.writeText(cssVars);
      toast.success('CSS variables copied!');
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EEE6] pt-16">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
          <div className="relative">
            <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 min-h-[200px] lg:min-h-[600px]">
              {/* ASCII Art - Left Card */}
              <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[600px] hidden lg:block">
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#000000' }}>
                  <DelicateAsciiDots />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-white text-center px-8 leading-tight">
                      Brand<br />Guidelines
                    </h1>
                  </div>
                </div>
              </div>

              {/* Content - Right Card */}
              <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-8 lg:pr-12 py-8 sm:py-12 lg:py-16 flex flex-col justify-center rounded-3xl shadow-2xl" style={{ background: '#F0EEE6' }}>
                <div className="w-full max-w-2xl">
                  <div className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                    <div className="inline-flex items-center rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold leading-6"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-40"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400"></span>
                        </span>
                        <span className="font-bold text-black">BRAND</span>
                      </span>
                      <span className="ml-2.5 text-black/80">Visual Identity</span>
                    </div>
                  </div>

                  <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-black mb-4">
                      Visual identity system for Perception.
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                      The Intelligence Layer for New Finance. Our brand embodies precision, clarity, and sophisticated simplicity.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                      asChild
                    >
                      <a href="/brand/Perception_Brand_Guidelines.pdf" download>
                        <Download className="mr-2 h-5 w-5" />
                        Download PDF
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-black hover:bg-white transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-2xl"
                      onClick={() => {
                        document.getElementById('colors')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Explore guidelines
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Palette Section */}
      <section id="colors" className="py-12 sm:py-16 lg:py-20 bg-[#F0EEE6]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-4 sm:mb-6 px-2">
              Color Palette
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-light text-black/60 px-2 max-w-2xl mx-auto">
              Built on sophisticated contrast between deep black and warm off-white. Click any swatch to copy the hex code.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
            {colors.map((color) => (
              <ColorSwatch key={color.hex} color={color} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="rounded-full px-6 py-3 border-black/20 hover:bg-black hover:text-white transition-all"
              onClick={copyCSSVariables}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy CSS Variables
            </Button>
          </div>
        </div>
      </section>

      {/* Logo Section - Split Layout */}
      <section className="py-0">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Dark Panel - Logo Variations */}
          <div className="w-full lg:w-1/2 bg-black p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 sm:mb-8">
              Logo
            </h2>
            <p className="text-base sm:text-lg text-white/60 mb-8 sm:mb-12 font-light max-w-lg">
              The Perception logo is a geometric 'P' mark that represents data visualization and structured information. The negative space creates a window, symbolizing clarity and insight.
            </p>

            <div className="space-y-8">
              {logoVersions.map((logo) => (
                <div key={logo.filename} className="flex items-center gap-6 group">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-2xl p-4 flex items-center justify-center">
                    <img
                      src={`/brand/${logo.filename}`}
                      alt={logo.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">{logo.name}</div>
                    <div className="text-white/50 text-sm">{logo.useCase}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Light Panel - Usage Guidelines & Download */}
          <div className="w-full lg:w-1/2 bg-[#F0EEE6] p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mb-6">
              Usage Guidelines
            </h3>

            <div className="space-y-6 mb-10">
              <div className="border-l-2 border-orange-500 pl-4">
                <div className="font-semibold text-black mb-1">Clear Space</div>
                <p className="text-black/60 text-sm">Maintain minimum clear space equal to the height of the small pixel element (bottom-left square).</p>
              </div>
              <div className="border-l-2 border-orange-500 pl-4">
                <div className="font-semibold text-black mb-1">Minimum Size</div>
                <p className="text-black/60 text-sm">Digital: 24px height minimum. Print: 8mm height minimum.</p>
              </div>
            </div>

            <div className="bg-white/50 rounded-2xl p-6 mb-8">
              <div className="font-semibold text-black mb-3">Logo Don'ts</div>
              <ul className="space-y-2 text-sm text-black/60">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">x</span>
                  <span>Do not rotate or skew the logo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">x</span>
                  <span>Do not change colors outside approved palette</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">x</span>
                  <span>Do not add effects (shadows, gradients, outlines)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">x</span>
                  <span>Do not stretch or distort proportions</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              {logoVersions.map((logo) => (
                <Button
                  key={logo.filename}
                  variant="outline"
                  className="rounded-full px-5 py-2.5 border-black/20 hover:bg-black hover:text-white transition-all"
                  asChild
                >
                  <a href={`/brand/${logo.filename}`} download>
                    <Download className="mr-2 h-4 w-4" />
                    {logo.name} PNG
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F0EEE6]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-4 sm:mb-6 px-2">
              Typography
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-light text-black/60 px-2 max-w-2xl mx-auto">
              Inter is our primary typeface - a clean, geometric sans-serif that emphasizes clarity and professionalism.
            </p>
          </div>

          {/* Type Scale Demo */}
          <div className="bg-white/50 rounded-3xl p-8 sm:p-12 mb-8">
            <div className="space-y-8">
              <div>
                <div className="text-xs uppercase tracking-wider text-black/40 mb-2 font-semibold">DISPLAY</div>
                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-tight">
                  The Intelligence Layer
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-black/40 mb-2 font-semibold">HEADING 1</div>
                <div className="text-3xl sm:text-4xl font-bold text-black">
                  Track sectors. Spot trends.
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-black/40 mb-2 font-semibold">HEADING 2</div>
                <div className="text-2xl sm:text-3xl font-bold text-black">
                  From Monitoring to Deliverables
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-black/40 mb-2 font-semibold">BODY TEXT</div>
                <div className="text-base sm:text-lg text-black/80 leading-relaxed max-w-2xl">
                  We monitor 650+ sources across Bitcoin, stablecoins, and tokenized finance. Track with watchlists, organize in <em className="font-serif">Spaces</em>, generate with <em className="font-serif">Recipes</em>.
                </div>
              </div>
            </div>
          </div>

          {/* Type Scale Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="py-4 px-4 text-xs uppercase tracking-wider text-black/40 font-semibold">Level</th>
                  <th className="py-4 px-4 text-xs uppercase tracking-wider text-black/40 font-semibold">Size</th>
                  <th className="py-4 px-4 text-xs uppercase tracking-wider text-black/40 font-semibold">Weight</th>
                  <th className="py-4 px-4 text-xs uppercase tracking-wider text-black/40 font-semibold hidden sm:table-cell">Line Height</th>
                  <th className="py-4 px-4 text-xs uppercase tracking-wider text-black/40 font-semibold hidden md:table-cell">Usage</th>
                </tr>
              </thead>
              <tbody>
                {typeScale.map((row) => (
                  <tr key={row.level} className="border-b border-black/5">
                    <td className="py-4 px-4 font-semibold text-black">{row.level}</td>
                    <td className="py-4 px-4 text-black/60 font-mono text-sm">{row.size}</td>
                    <td className="py-4 px-4 text-black/60 text-sm">{row.weight}</td>
                    <td className="py-4 px-4 text-black/60 text-sm hidden sm:table-cell">{row.lineHeight}</td>
                    <td className="py-4 px-4 text-black/40 text-sm hidden md:table-cell">{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="rounded-full px-6 py-3 border-black/20 hover:bg-black hover:text-white transition-all"
              onClick={copyFontStack}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Font Stack
            </Button>
          </div>
        </div>
      </section>

      {/* ASCII Art Patterns Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mb-4 sm:mb-6 px-2">
              ASCII Art Patterns
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/60 px-2 max-w-2xl mx-auto">
              Our most distinctive visual element. Generative patterns constructed from text characters that form abstract shapes, globes, and data visualizations.
            </p>
          </div>

          {/* Live Pattern Demo */}
          <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden mb-12">
            <DelicateAsciiDots />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="text-center">
                <div className="text-white/60 text-sm uppercase tracking-wider mb-2">Interactive Demo</div>
                <div className="text-white text-xl sm:text-2xl font-medium">Move your mouse to interact</div>
              </div>
            </div>
          </div>

          {/* Character Density Scale */}
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-6">Character Density Scale</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-white/40 text-sm w-20">Light</div>
                  <div className="font-mono text-white/60 text-lg tracking-widest">. . ' ` ,</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-white/40 text-sm w-20">Medium</div>
                  <div className="font-mono text-white/80 text-lg tracking-widest">- ~ : ; | /</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-white/40 text-sm w-20">Dense</div>
                  <div className="font-mono text-white text-lg tracking-widest"># @ M W</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-white/40 text-sm w-20">Structural</div>
                  <div className="font-mono text-white/90 text-lg tracking-widest">[ ] { } ( ) &lt; &gt;</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-6">Color Treatment</h3>
              <div className="space-y-4 text-white/60">
                <p className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">&#10003;</span>
                  <span>Always render as Off White/Cream on Black background</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">&#10003;</span>
                  <span>Vary opacity between 30-100% for depth</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">&#10003;</span>
                  <span>Brighter characters = closer to focal point</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">x</span>
                  <span>Never use colored ASCII art</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">x</span>
                  <span>Never use on light backgrounds</span>
                </p>
              </div>
            </div>
          </div>

          {/* Pattern Types */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 text-center">Pattern Types & Semantic Meaning</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {patternTypes.map((pattern) => (
                <div key={pattern.name} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-white font-semibold mb-2 text-sm">{pattern.name}</div>
                  <div className="text-white/40 text-xs">{pattern.meaning}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UI Components Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F0EEE6]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-4 sm:mb-6 px-2">
              UI Components
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-light text-black/60 px-2 max-w-2xl mx-auto">
              Core components that define the Perception interface.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Buttons */}
            <div className="bg-white/50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-black mb-6">Buttons</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <button className="bg-black text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-black/90 transition-colors">
                    Start free trial
                  </button>
                  <span className="text-black/40 text-sm">Primary</span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="bg-white text-black font-bold text-sm px-6 py-3 rounded-full border border-black/20 hover:bg-black/5 transition-colors">
                    Learn more
                  </button>
                  <span className="text-black/40 text-sm">Secondary</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-black/10">
                <div className="font-mono text-xs text-black/40">
                  border-radius: 999px (full pill)<br />
                  font-weight: 700<br />
                  padding: 12px 24px
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white/50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-black mb-6">Badges & Pills</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-black/10">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span className="font-bold text-sm">NEW</span>
                    <span className="text-black/60 text-sm">Announcing Beta</span>
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-600 text-xs font-semibold rounded-md border border-orange-500/30">
                    USE CASE
                  </span>
                  <span className="px-3 py-1 bg-black/10 text-black text-xs font-semibold rounded-md">
                    PRESS
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-black/10">
                <div className="font-mono text-xs text-black/40">
                  Orange dot indicator for "new" items<br />
                  ALL-CAPS labels with bold weight<br />
                  letter-spacing: 0.05-0.1em
                </div>
              </div>
            </div>

            {/* Orange Underline Accent */}
            <div className="bg-white/50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-black mb-6">Underline Accents</h3>
              <div className="space-y-4">
                <div className="text-2xl sm:text-3xl font-bold text-black">
                  The <span className="relative inline-block">
                    Intelligence
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500"></span>
                  </span> Layer
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-black/10">
                <div className="font-mono text-xs text-black/40">
                  Orange #FF6B35 underlines<br />
                  Thickness: 2-3px<br />
                  Use sparingly for emphasis
                </div>
              </div>
            </div>

            {/* Spacing Scale */}
            <div className="bg-white/50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-black mb-6">Spacing Scale</h3>
              <div className="space-y-3">
                {[
                  { size: '4px', usage: 'Micro (icon padding)' },
                  { size: '8px', usage: 'Small (inline elements)' },
                  { size: '16px', usage: 'Base unit' },
                  { size: '24px', usage: 'Medium (between components)' },
                  { size: '32px', usage: 'Large (section padding)' },
                  { size: '48px', usage: 'XL (major sections)' },
                  { size: '64-80px', usage: 'XXL (page sections)' },
                ].map((item) => (
                  <div key={item.size} className="flex items-center justify-between">
                    <span className="font-mono text-sm text-orange-600">{item.size}</span>
                    <span className="text-black/40 text-sm">{item.usage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-black">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mb-4 sm:mb-6 px-2">
              Downloads
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-light text-white/60 px-2">
              Get all brand assets in one place.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Full Guidelines PDF */}
            <a
              href="/brand/Perception_Brand_Guidelines.pdf"
              download
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Brand Guidelines PDF</h3>
              <p className="text-white/60 text-sm mb-4">Complete brand guidelines document with all specifications.</p>
              <div className="text-orange-400 text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Download PDF
                <ArrowRight className="h-4 w-4" />
              </div>
            </a>

            {/* Logo Dark */}
            <a
              href="/brand/logo-dark.png"
              download
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 p-2">
                <img src="/brand/logo-dark.png" alt="Logo Dark" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Logo (Dark Version)</h3>
              <p className="text-white/60 text-sm mb-4">For use on dark backgrounds. PNG format.</p>
              <div className="text-orange-400 text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Download PNG
                <ArrowRight className="h-4 w-4" />
              </div>
            </a>

            {/* Logo Light */}
            <a
              href="/brand/logo-light.png"
              download
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-4 p-2">
                <img src="/brand/logo-light.png" alt="Logo Light" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Logo (Light Version)</h3>
              <p className="text-white/60 text-sm mb-4">For use on light backgrounds. PNG format.</p>
              <div className="text-orange-400 text-sm font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Download PNG
                <ArrowRight className="h-4 w-4" />
              </div>
            </a>
          </div>

          <div className="text-center mt-12">
            <p className="text-white/40 text-sm">
              Need additional assets or formats? <a href="mailto:press@perception.to" className="text-orange-400 hover:underline">Contact us</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
