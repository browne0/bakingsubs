import { NewsletterPopup } from '@/app/components/NewsletterPopup';
import { getAllTags, getPostsByTag } from '@/lib/ghost';
import { Cake } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Helper function to format the tag for display (reused from your navigation)
function formatTag(tag: string) {
  return tag
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to format dates (reused from blog page)
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
  });
}

function formatFullDate(dateString: string) {
  const date = new Date(dateString);
  return date
    .toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
    })
    .toUpperCase();
}

type Props = {
  params: { tag: string };
};

// Generate static metadata for each tag page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tagName = formatTag(params.tag);

  return {
    title: `${tagName} - Baking Substitutions Blog`,
    description: `Expert advice and insights about ${tagName.toLowerCase()} substitutions and techniques in baking`,
  };
}

// Generate static paths for all tags
export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: tag.slug,
  }));
}

export default async function TagPage({ params }: Props) {
  const posts = await getPostsByTag(params.tag);
  const tagName = formatTag(params.tag);

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <Cake className="w-16 h-16 text-gray-400" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            No Posts in {tagName}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            We're currently working on creating amazing content about {tagName.toLowerCase()}{' '}
            substitutions. Check back soon!
          </p>
          <Link href="/blog" className="text-red-600 dark:text-red-400 hover:underline">
            View all articles
          </Link>
        </div>
      </div>
    );
  }

  const [featuredPost, ...remainingPosts] = posts;
  const sidebarPosts = remainingPosts.slice(0, 5);
  const gridPosts = remainingPosts.slice(5);

  return (
    <div className="bg-white dark:bg-gray-950">
      <NewsletterPopup />

      {/* Tag Header */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif mb-4 text-gray-900 dark:text-gray-100">{tagName}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {tagName} tips, guides, substitutions and techniques.
        </p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Featured Post */}
          <div className="lg:col-span-2">
            <article>
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="relative">
                  <div className="absolute top-6 left-0 bg-white/90 dark:bg-gray-900 px-4 py-2 text-2xl font-serif">
                    {formatDate(featuredPost.published_at)}
                  </div>
                  <Image
                    src={featuredPost.feature_image || 'https://placehold.co/800x600'}
                    alt={featuredPost.feature_image_alt || featuredPost.title}
                    width={800}
                    height={600}
                    className="w-full rounded-lg object-cover aspect-square md:aspect-[10/5]"
                    priority
                  />
                </div>
                <div className="mt-6">
                  <div className="text-sm text-red-600 dark:text-red-400 mb-2">
                    {featuredPost.primary_tag
                      ? `— ${featuredPost.primary_tag.name.toUpperCase()} —`
                      : ''}
                  </div>
                  <h2 className="text-4xl font-serif mb-4 text-gray-900 dark:text-gray-100">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{featuredPost.excerpt}</p>
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    BY {featuredPost.primary_author.name.toUpperCase()}
                  </p>
                </div>
              </Link>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {sidebarPosts.map((post) => (
              <article key={post.id}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    — {formatFullDate(post.published_at)} —
                  </div>
                  <h2 className="font-serif text-xl mb-2 text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    BY {post.primary_author.name.toUpperCase()}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Grid Posts */}
        {gridPosts.length > 0 && (
          <section>
            <h2 className="text-3xl font-serif mb-8 text-gray-900 dark:text-gray-100">
              More {tagName} Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {gridPosts.map((post) => (
                <article key={post.id} className="flex flex-col">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative mb-4">
                      <Image
                        src={post.feature_image || 'https://placehold.co/600x400'}
                        alt={post.feature_image_alt || post.title}
                        width={600}
                        height={400}
                        className="w-full rounded-lg object-cover aspect-[3/2]"
                      />
                      <div className="absolute top-4 left-0 bg-white/90 dark:bg-gray-900 px-4 py-2 text-xl font-serif">
                        {formatDate(post.published_at)}
                      </div>
                    </div>
                    <div>
                      {post.primary_tag && (
                        <div className="text-sm text-red-600 dark:text-red-400 mb-2">
                          — {post.primary_tag.name.toUpperCase()} —
                        </div>
                      )}
                      <h3 className="text-2xl font-serif mb-3 text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <p className="text-red-600 dark:text-red-400 text-sm">
                        BY {post.primary_author.name.toUpperCase()}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
