import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Lightbulb, BookOpen } from 'lucide-react';
import ghostData from '@/data/ghost-posts.json';
import { GhostPost, formatReadingTime, formatPostDate, getExcerpt } from '@/lib/ghost';

const posts = ghostData.posts as GhostPost[];

interface PostCardProps {
  post: GhostPost;
}

function PostCard({ post }: PostCardProps) {
  const primaryTag = post.primary_tag || post.tags?.[0];

  return (
    <Link
      to={`/research/${post.slug}`}
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

export default function ResearchIndexPage() {
  // Get counts for each category
  const reportsPosts = posts.filter(p => p.tags?.some(t => t.slug === 'reports'));
  const opinionPosts = posts.filter(p => p.tags?.some(t => t.slug === 'opinion'));

  // Get featured posts (first 2)
  const featuredPosts = posts.slice(0, 2);
  const remainingPosts = posts.slice(2);

  return (
    <>
      <SEO
        title="Research & Reports - Bitcoin Perception Analysis"
        description="In-depth research reports, quarterly analyses, and expert opinion on Bitcoin market perception, media coverage, and sentiment trends."
        keywords={[
          'bitcoin research',
          'bitcoin reports',
          'crypto analysis',
          'market sentiment research',
          'bitcoin media coverage',
          'quarterly reports'
        ]}
        url="https://perception.to/research"
      />

      <div className="min-h-screen bg-[#F0EEE6]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                Research Hub
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6">
                Research &{' '}
                <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Reports</em>
              </h1>

              <p className="text-lg sm:text-xl text-black/70 font-light leading-relaxed mb-8">
                In-depth analysis of Bitcoin market perception, media coverage trends, and sentiment patterns. Quarterly reports, research papers, and expert opinion.
              </p>
            </div>

            {/* Category Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mt-12">
              <Link
                to="/research"
                className="group bg-black rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              >
                <BookOpen className="w-8 h-8 text-orange-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-1">All Research</h3>
                <p className="text-sm text-white/60 mb-3">Complete archive</p>
                <span className="text-2xl font-bold text-white">{posts.length}</span>
              </Link>

              <Link
                to="/research/reports"
                className="group bg-white rounded-2xl p-6 border-2 border-black/10 transition-all duration-300 hover:border-black/30 hover:scale-[1.02]"
              >
                <FileText className="w-8 h-8 text-black mb-4" />
                <h3 className="text-lg font-semibold text-black mb-1">Reports</h3>
                <p className="text-sm text-black/60 mb-3">Quarterly analyses</p>
                <span className="text-2xl font-bold text-black">{reportsPosts.length}</span>
              </Link>

              <Link
                to="/research/opinion"
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
                    to={`/research/${post.slug}`}
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
        <section className="py-16 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-medium text-black mb-8">
              All{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Posts</em>
            </h2>

            {remainingPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-black/60 text-lg">No posts available yet. Check back soon!</p>
              </div>
            ) : null}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-medium text-white mb-6">
              Get research{' '}
              <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>delivered</em>
            </h2>
            <p className="text-xl text-white/60 mb-10">
              Subscribe to receive our latest reports and analysis directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 rounded-2xl px-8 py-6 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/bitcoin-media-research">
                  Subscribe to Newsletter
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
