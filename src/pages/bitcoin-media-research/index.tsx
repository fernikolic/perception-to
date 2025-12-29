import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AsciiBlob from '@/components/AsciiBlob';
import SEO from '@/components/SEO';
import { ArrowRight, FileText, Lightbulb, BookOpen } from 'lucide-react';
import ghostData from '@/data/ghost-posts.json';
import { GhostPost, formatReadingTime, formatPostDate, getExcerpt } from '@/lib/ghost';

const posts = ghostData.posts as GhostPost[];

// TypeScript declarations for GhostSignupForm
declare global {
  interface Window {
    GhostSignupForm?: {
      init: (config: {
        site: string;
        elementId: string;
        buttonColor: string;
        buttonTextColor: string;
        locale: string;
      }) => void;
    };
  }
}

interface PostCardProps {
  post: GhostPost;
}

function PostCard({ post }: PostCardProps) {
  const primaryTag = post.primary_tag || post.tags?.[0];

  return (
    <Link
      to={`/bitcoin-media-research/${post.slug}`}
      className="group bg-black rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
    >
      {post.feature_image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={post.feature_image}
            alt={post.feature_image_alt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {primaryTag && (
            <span className="text-xs font-medium text-orange-400 uppercase tracking-wide">
              {primaryTag.name}
            </span>
          )}
          <span className="text-xs text-white/50">
            {formatReadingTime(post.reading_time)}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-white/60 line-clamp-2 mb-4">
          {getExcerpt(post, 120)}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40">
            {formatPostDate(post.published_at)}
          </span>
          <span className="text-sm text-white font-medium group-hover:text-orange-400 transition-colors flex items-center gap-1">
            Read
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BitcoinMediaResearchPage() {
  const heroSignupRef = useRef<HTMLDivElement>(null);

  // Get counts for each category
  const reportsPosts = posts.filter(p => p.tags?.some(t => t.slug === 'reports'));
  const opinionPosts = posts.filter(p => p.tags?.some(t => t.slug === 'opinion'));

  // Get featured posts (first 2)
  const featuredPosts = posts.slice(0, 2);
  const remainingPosts = posts.slice(2);

  useEffect(() => {
    let scripts: HTMLScriptElement[] = [];
    let timeoutId: NodeJS.Timeout | null = null;

    const initializeSignupForms = () => {
      const initializeForm = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return;

        try {
          // Clear any existing content
          ref.current.innerHTML = '';

          // Create and configure the script
          const formScript = document.createElement('script');
          formScript.src = 'https://cdn.jsdelivr.net/ghost/signup-form@~0.2/umd/signup-form.min.js';
          formScript.async = true;
          formScript.setAttribute('data-button-color', '#000000');
          formScript.setAttribute('data-button-text-color', '#FFFFFF');
          formScript.setAttribute('data-site', 'https://bitcoin-perception.ghost.io/');
          formScript.setAttribute('data-locale', 'en');

          // Add error handling for the script
          formScript.onerror = () => {
            console.warn('Failed to load Ghost signup form script');
          };

          // Ensure the parent element still exists before appending
          if (ref.current && ref.current.parentNode) {
            ref.current.appendChild(formScript);
            scripts.push(formScript);
          }
        } catch (error) {
          console.warn('Error initializing Ghost signup form:', error);
        }
      };

      initializeForm(heroSignupRef);
    };

    // Use a small delay to ensure DOM is ready and avoid React StrictMode conflicts
    timeoutId = setTimeout(initializeSignupForms, 100);

    return () => {
      // Cleanup function
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      scripts.forEach(script => {
        if (script?.parentNode) {
          try {
            script.parentNode.removeChild(script);
          } catch (error) {
            // Ignore cleanup errors
          }
        }
      });

      // Clear the signup container if it still exists
      if (heroSignupRef.current) {
        try {
          heroSignupRef.current.innerHTML = '';
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  return (
    <>
      <SEO
        title="Bitcoin Media Research - Newsletter & Analysis"
        description="Get cutting-edge Bitcoin media research and analysis delivered to your inbox. In-depth reports on market perception, media coverage trends, and sentiment patterns."
        keywords={[
          'bitcoin research',
          'bitcoin newsletter',
          'bitcoin media analysis',
          'crypto research',
          'bitcoin sentiment',
          'bitcoin reports',
          'bitcoin market perception'
        ]}
        url="https://perception.to/bitcoin-media-research"
      />

      <div className="min-h-screen bg-[#F0EEE6]">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95 pt-16">
          {/* Base Gradient */}
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
            <div className="relative">
              <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 min-h-[200px] lg:min-h-[600px]">
                {/* ASCII Art - Left Card (Desktop only) */}
                <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[600px] hidden lg:block">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                    <AsciiBlob />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-white text-center px-8 leading-tight">
                        Bitcoin Media<br />Research
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
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-400"></span>
                          </span>
                          <span className="font-bold text-black">NEWSLETTER</span>
                        </span>
                        <span className="ml-2.5 text-black/80">Join 2,000+ readers</span>
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-black mb-4">
                        Unlock insights into Bitcoin media{'\u00A0'}trends.
                      </h2>
                      <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 font-semibold mb-3">
                        Get cutting-edge research and analyses delivered to{'\u00A0'}your{'\u00A0'}inbox.
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        Read by professionals at Swan, Block, Cointelegraph, Forbes, CoinShares, Fidelity, and{'\u00A0'}more.
                      </p>
                    </div>

                    {/* Signup Form */}
                    <div className="mb-6 text-center lg:text-left">
                      <div
                        ref={heroSignupRef}
                        className="signup-form-container [&_input]:!text-sm [&_input]:sm:!text-base [&_button]:!text-sm [&_button]:sm:!text-base [&_button]:!px-4 [&_button]:sm:!px-8 [&_button]:!bg-black [&_button]:hover:!bg-black/90"
                        style={{
                          minHeight: '56px',
                          maxWidth: '440px',
                          margin: '0 auto',
                          width: '100%'
                        }}
                      />
                    </div>

                    {/* Author credentials */}
                    <div className="pt-4 border-t border-black/10">
                      <div className="flex items-center gap-3 justify-center lg:justify-start">
                        <img
                          src="/images/Fernando Nikolic.png"
                          alt="Fernando Nikolić"
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-black/5 flex-shrink-0"
                        />
                        <div className="text-left">
                          <p className="text-xs sm:text-sm font-semibold text-black">
                            Fernando Nikolić
                          </p>
                          <p className="text-xs text-black/60">
                            Ex Universal Music, Ex Blockstream VP
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Research Hub Section */}
        <section className="py-16 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-black mb-6">
                Research &{' '}
                <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Reports</em>
              </h2>
              <p className="text-lg text-black/70 font-light leading-relaxed">
                In-depth analysis of Bitcoin market perception, media coverage trends, and sentiment patterns. Quarterly reports, research papers, and expert opinion.
              </p>
            </div>

            {/* Category Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="group bg-black rounded-2xl p-6 transition-all duration-300">
                <BookOpen className="w-8 h-8 text-orange-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-1">All Research</h3>
                <p className="text-sm text-white/60 mb-3">Complete archive</p>
                <span className="text-2xl font-bold text-white">{posts.length}</span>
              </div>

              <Link
                to="/bitcoin-media-research/reports"
                className="group bg-white rounded-2xl p-6 border-2 border-black/10 transition-all duration-300 hover:border-black/30 hover:scale-[1.02]"
              >
                <FileText className="w-8 h-8 text-black mb-4" />
                <h3 className="text-lg font-semibold text-black mb-1">Reports</h3>
                <p className="text-sm text-black/60 mb-3">Quarterly analyses</p>
                <span className="text-2xl font-bold text-black">{reportsPosts.length}</span>
              </Link>

              <Link
                to="/bitcoin-media-research/opinion"
                className="group bg-white rounded-2xl p-6 border-2 border-black/10 transition-all duration-300 hover:border-black/30 hover:scale-[1.02]"
              >
                <Lightbulb className="w-8 h-8 text-black mb-4" />
                <h3 className="text-lg font-semibold text-black mb-1">Opinion</h3>
                <p className="text-sm text-black/60 mb-3">Expert perspectives</p>
                <span className="text-2xl font-bold text-black">{opinionPosts.length}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="py-16 px-6 sm:px-16 lg:px-32 bg-black">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-medium text-white mb-8">
                Latest{' '}
                <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Research</em>
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/bitcoin-media-research/${post.slug}`}
                    className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    {post.feature_image && (
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={post.feature_image}
                          alt={post.feature_image_alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        {post.primary_tag && (
                          <span className="text-xs font-medium text-orange-400 uppercase tracking-wide">
                            {post.primary_tag.name}
                          </span>
                        )}
                        <span className="text-xs text-white/50">
                          {formatReadingTime(post.reading_time)}
                        </span>
                      </div>

                      <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-white/60 mb-6 line-clamp-2">
                        {getExcerpt(post, 160)}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/40">
                          {formatPostDate(post.published_at)}
                        </span>
                        <span className="inline-flex items-center text-white font-medium group-hover:text-orange-400 transition-colors">
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts Grid */}
        {remainingPosts.length > 0 && (
          <section className="py-16 px-6 sm:px-16 lg:px-32">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-medium text-black mb-8">
                All{' '}
                <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Posts</em>
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default BitcoinMediaResearchPage;
