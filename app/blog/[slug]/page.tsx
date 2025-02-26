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

        {/* Header Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Nav, Title, Excerpt */}
            <div className="lg:col-span-7">
              <nav className="flex items-center justify-center lg:justify-start space-x-2 text-sm mb-6">
                <Link href="/blog" className="text-red-600">
                  BLOG
                </Link>
                {post.primary_tag && (
                  <>
                    <span>›</span>
                    <Link href={`/tag/${post.primary_tag.slug}`} className="text-red-600">
                      {post.primary_tag.name.toUpperCase()}
                    </Link>
                  </>
                )}
              </nav>

              <h1 className="font-serif text-4xl mb-4 text-center lg:text-left">{post.title}</h1>
              <p className="text-xl text-gray-700 mb-6 text-center lg:text-left">
                {post.custom_excerpt || post.excerpt}
              </p>

              {/* Author and Date */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between py-4 border-t space-y-4 lg:space-y-0">
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-2 lg:space-y-0 lg:space-x-4">
                  <Image
                    src={post.primary_author.profile_image || 'https://placehold.co/96x96'}
                    alt={`${post.primary_author.name}'s profile picture`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover aspect-square"
                  />
                  <div className="text-center lg:text-left">
                    <div className="font-medium text-sm text-gray-600">AUTHOR</div>
                    <h2 className="font-serif text-lg">{post.primary_author.name}</h2>
                    {post.primary_author.bio && (
                      <div className="text-xs text-gray-600">{post.primary_author.bio}</div>
                    )}
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <div className="font-medium text-sm text-gray-600">DATE</div>
                  <div>{format(new Date(post.published_at), 'MMMM d, yyyy')}</div>
                </div>
              </div>

              {/* Share Links */}
              <ShareButtons title={post.title} url={postUrl} />
            </div>

            {/* Right Column: Featured Image */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="h-full">
                <Image
                  src={post.feature_image || 'https://placehold.co/800x600'}
                  alt={post.feature_image_alt || post.title}
                  width={800}
                  height={600}
                  className=" object-cover rounded-lg aspect-[6/4]"
                  priority
                />
                {post.feature_image_caption && (
                  <figcaption className="text-center text-sm text-gray-600 mt-2">
                    {post.feature_image_caption}
                  </figcaption>
                )}
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
