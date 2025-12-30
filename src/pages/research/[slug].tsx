import { useParams, Navigate, Link } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import SEO from '@/components/SEO';
import '@/styles/ghost-cards.css';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, User, Tag } from 'lucide-react';
import ghostData from '@/data/ghost-posts.json';
import { GhostPost, formatReadingTime, formatPostDate, getPostBySlug, getExcerpt } from '@/lib/ghost';
import DOMPurify from 'dompurify';
import { ArticleTableOfContents, extractHeadings, useHeadingIds } from '@/components/ArticleTableOfContents';

const allPosts = ghostData.posts as GhostPost[];

// Sanitize HTML content from Ghost
function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      // Text elements
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'a', 'strong', 'em', 'b', 'i', 'u', 's', 'strike', 'mark', 'small', 'sub', 'sup',
      'blockquote', 'pre', 'code',
      // Media
      'img', 'figure', 'figcaption', 'picture', 'source',
      'video', 'audio',
      'iframe', // For embeds (YouTube, etc.)
      // Tables
      'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
      // Layout
      'div', 'span', 'section', 'article', 'aside', 'header', 'footer', 'nav', 'main',
      // Forms (for Ghost signup cards)
      'form', 'input', 'button', 'label', 'textarea', 'select', 'option',
      // SVG (for icons)
      'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'g', 'use', 'defs', 'symbol'
    ],
    ALLOWED_ATTR: [
      // Links
      'href', 'target', 'rel',
      // Media
      'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading', 'decoding',
      'poster', 'controls', 'autoplay', 'loop', 'muted', 'playsinline', 'preload',
      'type', 'media',
      // Layout
      'class', 'id', 'style',
      // Iframe
      'frameborder', 'allowfullscreen', 'allow', 'sandbox',
      // Form
      'name', 'value', 'placeholder', 'required', 'disabled', 'readonly',
      'action', 'method', 'enctype', 'for', 'maxlength', 'minlength', 'pattern',
      // SVG
      'd', 'fill', 'stroke', 'stroke-width', 'viewBox', 'xmlns', 'cx', 'cy', 'r', 'x', 'y',
      'x1', 'y1', 'x2', 'y2', 'points', 'transform', 'opacity',
      // Data attributes for Ghost cards
      'data-lexical-text', 'data-kg-card'
    ],
    ALLOW_DATA_ATTR: true // Allow data-* attributes for Ghost functionality
  });
}

export default function ResearchPostPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/research" replace />;
  }

  const post = getPostBySlug(allPosts, slug);

  if (!post) {
    return <Navigate to="/research" replace />;
  }

  // Extract headings for ToC
  const headings = useMemo(() => extractHeadings(post.html), [post.html]);

  // Sanitize HTML content
  const sanitizedContent = useMemo(() => sanitizeHtml(post.html), [post.html]);

  const sanitizedCaption = useMemo(
    () => post.feature_image_caption ? sanitizeHtml(post.feature_image_caption) : '',
    [post.feature_image_caption]
  );

  // Add IDs to headings in DOM after render for ToC navigation
  useHeadingIds(headings, 'article');

  // Load Twitter widget script for embedded tweets
  useEffect(() => {
    // Check if there are any twitter embeds in the content
    if (sanitizedContent.includes('twitter-tweet')) {
      // Load Twitter widget script
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);

      return () => {
        // Cleanup script on unmount
        const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [sanitizedContent]);

  // Find related posts (same tag, different post)
  const relatedPosts = allPosts
    .filter(p =>
      p.id !== post.id &&
      p.tags?.some(t => post.tags?.some(pt => pt.slug === t.slug))
    )
    .slice(0, 3);

  // Find previous and next posts
  const currentIndex = allPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const primaryTag = post.primary_tag || post.tags?.[0];

  return (
    <>
      <SEO
        title={post.meta_title || post.title}
        description={post.meta_description || getExcerpt(post, 160)}
        image={post.og_image || post.feature_image}
        url={`https://perception.to/research/${post.slug}`}
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
        {/* Article Header */}
        <article>
          <header className="pt-32 pb-16 px-6 sm:px-16 lg:px-32">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <Link
                to="/research"
                className="group inline-flex items-center gap-2 text-sm font-medium text-black/50 hover:text-black transition-all duration-300 mb-10"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <ArrowLeft className="w-4 h-4" />
                </span>
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">Research</span>
              </Link>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <Link
                      key={tag.id}
                      to={`/research/${tag.slug === 'reports' ? 'reports' : tag.slug === 'opinion' ? 'opinion' : ''}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-full transition-colors"
                    >
                      <Tag className="w-3 h-3" />
                      {tag.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-black mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-10">
                {post.primary_author && (
                  <div className="flex items-center gap-3">
                    {post.primary_author.profile_image ? (
                      <img
                        src={post.primary_author.profile_image}
                        alt={post.primary_author.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-black/5"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-black/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-black/40" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-semibold text-black text-sm">{post.primary_author.name}</span>
                      <div className="flex items-center gap-2 text-xs text-black/50">
                        <span>{formatPostDate(post.published_at)}</span>
                        <span className="w-1 h-1 rounded-full bg-black/30" />
                        <span>{formatReadingTime(post.reading_time)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Feature Image */}
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

          {/* Article Content with ToC */}
          <div className="bg-white border-y border-black/5">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
              <div className="flex gap-16">
                {/* Table of Contents - Left Sidebar */}
                <ArticleTableOfContents headings={headings} />

                {/* Main Content */}
                <div className="flex-1 min-w-0 max-w-3xl">
                  <article
                    className="prose prose-lg prose-stone max-w-none font-reading
                      prose-headings:font-sans prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-28
                      prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                      prose-p:text-black/80 prose-p:leading-[1.8] prose-p:text-[1.0625rem]
                      prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-black prose-strong:font-semibold
                      prose-blockquote:border-l-orange-400 prose-blockquote:bg-orange-50/50 prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:font-sans prose-blockquote:italic
                      prose-img:rounded-xl prose-img:shadow-md
                      prose-code:bg-black/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                      prose-pre:bg-black prose-pre:text-white prose-pre:rounded-xl
                      prose-ul:list-disc prose-ol:list-decimal
                      prose-li:text-black/80 prose-li:leading-[1.8]"
                  >
                    {/* Content sanitized with DOMPurify - see line 78 */}
                    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                  </article>

                  {/* Author Bio - inside content area */}
                  {post.primary_author?.bio && (
                    <div className="mt-16 pt-12 border-t border-black/10">
                      <div className="flex items-start gap-4">
                        {post.primary_author.profile_image && (
                          <img
                            src={post.primary_author.profile_image}
                            alt={post.primary_author.name}
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-black/5"
                          />
                        )}
                        <div>
                          <div className="text-xs text-black/40 uppercase tracking-wide mb-1">Written by</div>
                          <div className="text-base font-semibold text-black mb-1">{post.primary_author.name}</div>
                          <p className="text-black/60 text-sm leading-relaxed">{post.primary_author.bio}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Post Navigation */}
          <nav className="px-6 sm:px-16 lg:px-32 pb-16">
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    to={`/research/${prevPost.slug}`}
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
                    to={`/research/${nextPost.slug}`}
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

        {/* Related Posts */}
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
                    to={`/research/${relatedPost.slug}`}
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

        {/* CTA Section */}
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
                <Link to="/research">
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
