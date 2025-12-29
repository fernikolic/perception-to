import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';
import ghostData from '@/data/ghost-posts.json';
import { GhostPost, formatReadingTime, formatPostDate, getExcerpt, getPostsByTag } from '@/lib/ghost';

const allPosts = ghostData.posts as GhostPost[];
const posts = getPostsByTag(allPosts, 'opinion');

interface PostCardProps {
  post: GhostPost;
}

function PostCard({ post }: PostCardProps) {
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
          <span className="text-xs font-medium text-orange-400 uppercase tracking-wide">
            Opinion
          </span>
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

export default function BMROpinionPage() {
  return (
    <>
      <SEO
        title="Opinion - Expert Perspectives on Bitcoin Market Trends"
        description="Expert opinion and perspectives on Bitcoin market perception, industry trends, and the evolving narrative landscape from Bitcoin Perception."
        keywords={[
          'bitcoin opinion',
          'bitcoin perspectives',
          'crypto expert analysis',
          'bitcoin market commentary',
          'bitcoin industry insights'
        ]}
        url="https://perception.to/bitcoin-media-research/opinion"
      />

      <div className="min-h-screen bg-[#F0EEE6]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <Link
              to="/bitcoin-media-research"
              className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research
            </Link>

            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 bg-black rounded-2xl">
                <Lightbulb className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black mb-4">
                  <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Opinion</em>
                </h1>
                <p className="text-lg text-black/70 font-light leading-relaxed max-w-2xl">
                  Expert perspectives and commentary on Bitcoin market perception, industry trends, and the evolving narrative landscape.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 text-sm font-medium">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="pb-24 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            {posts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Lightbulb className="w-16 h-16 text-black/20 mx-auto mb-4" />
                <p className="text-black/60 text-lg mb-6">No opinion pieces available yet.</p>
                <Button asChild variant="outline" className="rounded-2xl">
                  <Link to="/bitcoin-media-research">View All Research</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-medium text-white mb-6">
              Get insights{' '}
              <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>delivered</em>
            </h2>
            <p className="text-xl text-white/60 mb-10">
              Subscribe to receive our latest opinions and analysis directly in your inbox.
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
