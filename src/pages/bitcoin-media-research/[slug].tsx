import { useParams, Navigate, Link } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import SEO from '@/components/SEO';
import '@/styles/ghost-cards.css';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Tag } from 'lucide-react';
import ghostData from '@/data/ghost-posts.json';
import { GhostPost, formatReadingTime, formatPostDate, getPostBySlug, getExcerpt } from '@/lib/ghost';
import DOMPurify from 'dompurify';

const allPosts = ghostData.posts as GhostPost[];

// Sanitize HTML content from Ghost using DOMPurify
function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'a', 'strong', 'em', 'b', 'i', 'u', 's', 'strike', 'mark', 'small', 'sub', 'sup',
      'blockquote', 'pre', 'code',
      'img', 'figure', 'figcaption', 'picture', 'source',
      'video', 'audio',
      'iframe',
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
      'div', 'span', 'section', 'article', 'aside', 'header', 'footer', 'nav', 'main',
      'form', 'input', 'button', 'label', 'textarea', 'select', 'option',
      'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'g', 'use', 'defs', 'symbol'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel',
      'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading', 'decoding',
      'poster', 'controls', 'autoplay', 'loop', 'muted', 'playsinline', 'preload',
      'type', 'media',
      'class', 'id', 'style',
      'frameborder', 'allowfullscreen', 'allow', 'sandbox',
      'name', 'value', 'placeholder', 'required', 'disabled', 'readonly',
      'action', 'method', 'enctype', 'for', 'maxlength', 'minlength', 'pattern',
      'd', 'fill', 'stroke', 'stroke-width', 'viewBox', 'xmlns', 'cx', 'cy', 'r', 'x', 'y',
      'x1', 'y1', 'x2', 'y2', 'points', 'transform', 'opacity',
      'data-lexical-text', 'data-kg-card'
    ],
    ALLOW_DATA_ATTR: true
  });
}

export default function BMRPostPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/bitcoin-media-research" replace />;
  }

  const post = getPostBySlug(allPosts, slug);

  if (!post) {
    return <Navigate to="/bitcoin-media-research" replace />;
  }

  // Content is sanitized with DOMPurify before rendering
  const sanitizedContent = useMemo(() => sanitizeHtml(post.html), [post.html]);
  const sanitizedCaption = useMemo(
    () => post.feature_image_caption ? sanitizeHtml(post.feature_image_caption) : '',
    [post.feature_image_caption]
  );

  useEffect(() => {
    if (sanitizedContent.includes('twitter-tweet')) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);

      return () => {
        const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [sanitizedContent]);

  const relatedPosts = allPosts
    .filter(p =>
      p.id !== post.id &&
      p.tags?.some(t => post.tags?.some(pt => pt.slug === t.slug))
    )
    .slice(0, 3);

  const currentIndex = allPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <>
      <SEO
        title={post.meta_title || post.title}
        description={post.meta_description || getExcerpt(post, 160)}
        image={post.og_image || post.feature_image}
        url={`https://perception.to/bitcoin-media-research/${post.slug}`}
        type="article"
        article={{
          publishedTime: post.published_at,
          modifiedTime: post.updated_at,
          author: post.primary_author?.name,
          tags: post.tags?.map(t => t.name)
        }}
        keywords={post.tags?.map(t => t.name) || []}
      />

      <div className="min-h-screen bg-[#F0EEE6]">
        <article>
          <header className="pt-32 pb-16 px-6 sm:px-16 lg:px-32">
            <div className="max-w-4xl mx-auto">
              <Link
                to="/bitcoin-media-research"
                className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Research
              </Link>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <Link
                      key={tag.id}
                      to={`/bitcoin-media-research/${tag.slug === 'reports' ? 'reports' : tag.slug === 'opinion' ? 'opinion' : ''}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-full transition-colors"
                    >
                      <Tag className="w-3 h-3" />
                      {tag.name}
                    </Link>
                  ))}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-black mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-black/60 mb-8">
                {post.primary_author && (
                  <div className="flex items-center gap-2">
                    {post.primary_author.profile_image ? (
                      <img
                        src={post.primary_author.profile_image}
                        alt={post.primary_author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="font-medium text-black">{post.primary_author.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatPostDate(post.published_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatReadingTime(post.reading_time)}</span>
                </div>
              </div>

              {post.feature_image && (
                <figure className="mb-8">
                  <img
                    src={post.feature_image}
                    alt={post.feature_image_alt || post.title}
                    className="w-full rounded-2xl shadow-lg"
                  />
                  {sanitizedCaption && (
                    <figcaption
                      className="text-sm text-black/50 text-center mt-3"
                      dangerouslySetInnerHTML={{ __html: sanitizedCaption }}
                    />
                  )}
                </figure>
              )}
            </div>
          </header>

          <div className="px-6 sm:px-16 lg:px-32 pb-16">
            <div className="max-w-3xl mx-auto">
              <div
                className="prose prose-lg prose-stone max-w-none
                  prose-headings:font-medium prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-black/80 prose-p:leading-relaxed
                  prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-black prose-strong:font-semibold
                  prose-blockquote:border-l-orange-400 prose-blockquote:bg-black/5 prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:px-4
                  prose-img:rounded-xl prose-img:shadow-md
                  prose-code:bg-black/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-black prose-pre:text-white prose-pre:rounded-xl
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-li:text-black/80"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            </div>
          </div>

          {post.primary_author?.bio && (
            <div className="px-6 sm:px-16 lg:px-32 pb-16">
              <div className="max-w-3xl mx-auto">
                <div className="bg-black rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    {post.primary_author.profile_image && (
                      <img
                        src={post.primary_author.profile_image}
                        alt={post.primary_author.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="text-xs text-white/50 uppercase tracking-wide mb-1">Written by</div>
                      <div className="text-lg font-semibold text-white mb-2">{post.primary_author.name}</div>
                      <p className="text-white/70 text-sm">{post.primary_author.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <nav className="px-6 sm:px-16 lg:px-32 pb-16">
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    to={`/bitcoin-media-research/${prevPost.slug}`}
                    className="group p-6 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-sm text-black/50 mb-2">
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </div>
                    <div className="font-medium text-black group-hover:text-orange-600 transition-colors line-clamp-2">
                      {prevPost.title}
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost && (
                  <Link
                    to={`/bitcoin-media-research/${nextPost.slug}`}
                    className="group p-6 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors text-right"
                  >
                    <div className="flex items-center justify-end gap-2 text-sm text-black/50 mb-2">
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="font-medium text-black group-hover:text-orange-600 transition-colors line-clamp-2">
                      {nextPost.title}
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </article>

        {relatedPosts.length > 0 && (
          <section className="py-16 px-6 sm:px-16 lg:px-32 bg-black">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-medium text-white mb-8">
                Related{' '}
                <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Research</em>
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/bitcoin-media-research/${relatedPost.slug}`}
                    className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    {relatedPost.feature_image && (
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={relatedPost.feature_image}
                          alt={relatedPost.feature_image_alt || relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-2">
                        {getExcerpt(relatedPost, 100)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-24 px-6 sm:px-16 lg:px-32 bg-[#F0EEE6]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-medium text-black mb-6">
              Get research{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>delivered</em>
            </h2>
            <p className="text-xl text-black/60 mb-10">
              Subscribe to receive our latest research and analysis directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/bitcoin-media-research">
                  Subscribe to Newsletter
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-black hover:bg-black/5 rounded-2xl px-8 py-6 text-lg font-semibold border-2 border-black/20 transition-all duration-300"
                asChild
              >
                <Link to="/bitcoin-media-research">
                  View All Research
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
