import { NewsletterPopup } from '@/app/components/NewsletterPopup';
import { getPost, getRecentPosts } from '@/lib/ghost';
import { format } from 'date-fns';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NewsletterSignup } from './components/NewsletterSignup';
import { ShareButtons } from './components/ShareButtons';

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const post = await getPost(slug);
  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`;

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    authors: [
      {
        name: post.primary_author.name,
        url: post.primary_author.website || undefined,
      },
    ],
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      url: postUrl,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: post.primary_author.name,
      images: [
        {
          url: post.feature_image || 'https://placehold.co/1200x630',
          width: 1200,
          height: 630,
          alt: post.feature_image_alt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitter_title || post.title,
      description: post.twitter_description || post.excerpt,
      images: [post.feature_image || 'https://placehold.co/1200x630'],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const recentPosts = await getRecentPosts(3);
  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`;
  return (
    <div className="min-h-screen bg-white">
      <NewsletterPopup />
      <main className="container mx-auto px-4 py-8">
        {/* Featured Image for Mobile */}
        <div className="lg:hidden mb-8">
          <Image
            src={post.feature_image || 'https://placehold.co/800x600'}
            alt={post.feature_image_alt || post.title}
            width={800}
            height={600}
            className="w-full rounded-lg"
          />
        </div>

        {/* Desktop Header Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Nav, Title, Excerpt */}
            <div className="lg:col-span-7">
              <nav className="flex items-center space-x-2 text-sm mb-8">
                <Link
                  href="/blog"
                  className="text-red-600 hover:text-red-700 transition-colors uppercase tracking-wider font-medium"
                >
                  Blog
                </Link>
                {post.primary_tag && (
                  <>
                    <span className="text-gray-400">›</span>
                    <Link
                      href={`/blog/tags/${post.primary_tag.slug}`}
                      className="text-red-600 hover:text-red-700 transition-colors uppercase tracking-wider font-medium"
                    >
                      {post.primary_tag.name}
                    </Link>
                  </>
                )}
              </nav>

              <h1 className="font-serif text-5xl leading-tight mb-6 tracking-tight">
                {post.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.custom_excerpt || post.excerpt}
              </p>

              {/* Author and Date */}
              <div className="flex items-center justify-between py-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <Image
                    src={post.primary_author.profile_image || 'https://placehold.co/96x96'}
                    alt={`${post.primary_author.name}'s profile picture`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover aspect-square"
                  />
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Author
                    </div>
                    <h2 className="font-serif text-lg">{post.primary_author.name}</h2>
                    {post.primary_author.bio && (
                      <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {post.primary_author.bio}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Date
                  </div>
                  <div className="text-gray-900">
                    {format(new Date(post.published_at), 'MMMM d, yyyy')}
                  </div>
                </div>
              </div>

              {/* Share Links */}
              <ShareButtons title={post.title} url={postUrl} />
            </div>

            {/* Right Column: Featured Image */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-8">
                <figure>
                  <Image
                    src={post.feature_image || 'https://placehold.co/800x600'}
                    alt={post.feature_image_alt || post.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover rounded-lg"
                    priority
                  />
                  {post.feature_image_caption && (
                    <figcaption className="text-center text-sm text-gray-600 mt-2">
                      {post.feature_image_caption}
                    </figcaption>
                  )}
                </figure>
              </div>
            </div>
          </div>
        </div>

        {/* Post Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 mt-8 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-1">
            <div className="prose prose-lg max-w-none blog-content">
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
            <NewsletterSignup />
          </div>

          {/* Recent Posts Sidebar */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="sticky top-8">
              <h2 className="font-serif text-2xl mb-6">Recent Posts</h2>
              <div className="space-y-6">
                {recentPosts.map((recentPost) => (
                  <article key={recentPost.id} className="flex space-x-4">
                    <Image
                      src={recentPost.feature_image || 'https://placehold.co/120x120'}
                      alt={recentPost.feature_image_alt || recentPost.title}
                      width={120}
                      height={120}
                      className="rounded-lg object-cover aspect-square"
                    />
                    <div>
                      <Link href={`/blog/${recentPost.slug}`}>
                        <h3 className="font-serif text-lg hover:text-red-600 transition-colors">
                          {recentPost.title}
                        </h3>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
