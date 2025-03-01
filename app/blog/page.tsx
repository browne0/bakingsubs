import { getPosts } from '@/lib/ghost';
import { ogImage } from '@/lib/metadata';
import { Cake } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NewsletterPopup } from '../components/NewsletterPopup';

export const metadata: Metadata = {
  title: 'Baking Substitutions Blog',
  description: 'Expert advice, tips, and insights about baking substitutions and techniques',
  openGraph: {
    title: 'Baking Substitutions Blog - BakingSubs',
    description: 'Expert advice, tips, and insights about baking substitutions and techniques',
    ...ogImage,
  },
};

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

// Mock data for testing layout
const mockPosts = [
  {
    id: '1',
    slug: 'perfect-buttermilk-substitute',
    title: 'The Perfect Buttermilk Substitute: 5 Options You Already Have in Your Kitchen',
    excerpt:
      'Never let the lack of buttermilk stop you from baking again! Learn how to make perfect substitutes using common ingredients like milk and lemon juice, and understand the science behind why they work.',
    feature_image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Buttermilk+Substitutes',
    feature_image_alt: 'Various buttermilk substitutes in glass containers',
    published_at: '2024-03-15T08:00:00.000Z',
    primary_tag: { name: 'Dairy Substitutes' },
    primary_author: { name: 'Sarah Baker' },
  },
  {
    id: '2',
    slug: 'egg-replacements-guide',
    title: 'Complete Guide to Egg Replacements in Baking',
    excerpt: 'Master the art of egg-free baking with our comprehensive guide to egg substitutes.',
    feature_image: null, // Testing null image scenario
    published_at: '2024-03-14T10:30:00.000Z',
    primary_tag: { name: 'Vegan Baking' },
    primary_author: { name: 'Michael Chen' },
  },
  {
    id: '3',
    slug: 'gluten-free-flour-blends',
    title: 'Creating Your Own Gluten-Free Flour Blends',
    excerpt: 'Learn the perfect ratios and combinations for homemade gluten-free flour blends.',
    feature_image: 'https://placehold.co/800x600/f8fafc/475569?text=Gluten+Free+Flours',
    published_at: '2024-03-13T09:15:00.000Z',
    primary_tag: { name: 'Gluten-Free' },
    primary_author: { name: 'Emma Wilson' },
  },
  {
    id: '4',
    slug: 'sugar-alternatives',
    title: 'Natural Sugar Alternatives for Healthier Baking',
    excerpt: 'Discover how to use honey, maple syrup, and other natural sweeteners in your baking.',
    feature_image: 'https://placehold.co/800x600/f1f5f9/334155?text=Sugar+Alternatives',
    published_at: '2024-03-12T14:20:00.000Z',
    primary_tag: { name: 'Healthy Baking' },
    primary_author: { name: 'David Thompson' },
  },
  {
    id: '5',
    slug: 'dairy-free-milk-guide',
    title: 'The Ultimate Guide to Dairy-Free Milk in Baking',
    excerpt:
      'From almond to oat milk, learn which dairy-free alternatives work best in different recipes.',
    feature_image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Dairy+Free+Milk',
    published_at: '2024-03-11T11:45:00.000Z',
    primary_tag: null, // Testing null tag scenario
    primary_author: { name: 'Lisa Martinez' },
  },
  {
    id: '6',
    slug: 'oil-substitutes',
    title: 'Best Oil Substitutes for Moist and Healthy Baked Goods',
    excerpt: 'Explore healthy alternatives to oil in your baking, from applesauce to Greek yogurt.',
    feature_image: 'https://placehold.co/800x600/f8fafc/475569?text=Oil+Substitutes',
    published_at: '2024-03-10T16:30:00.000Z',
    primary_tag: { name: 'Healthy Baking' },
    primary_author: { name: 'Alex Johnson' },
  },
  {
    id: '7',
    slug: 'nut-flour-guide',
    title: 'Complete Guide to Baking with Nut Flours',
    excerpt:
      'Master the art of baking with almond, hazelnut, and other nut flours. Learn proper ratios and techniques for perfect results every time.',
    feature_image: 'https://placehold.co/800x600/f1f5f9/334155?text=Nut+Flours',
    published_at: '2024-03-09T13:20:00.000Z',
    primary_tag: { name: 'Alternative Flours' },
    primary_author: { name: 'Rachel Green' },
  },
  {
    id: '8',
    slug: 'vegan-butter-substitutes',
    title: 'Vegan Butter Alternatives for Perfect Pastries',
    excerpt:
      'Discover the best plant-based alternatives to butter that will give you flaky, delicious pastries every time.',
    feature_image: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Vegan+Butter',
    published_at: '2024-03-08T15:10:00.000Z',
    primary_tag: { name: 'Vegan Baking' },
    primary_author: { name: 'Chris Taylor' },
  },
];

export default async function BlogPage() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <Cake className="w-16 h-16 text-gray-400" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">No Posts Yet</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            We're currently working on creating amazing content about baking substitutions. Check
            back soon!
          </p>
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
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-16">
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
                  <h1 className="text-4xl font-serif mb-4 text-gray-900 dark:text-gray-100">
                    {featuredPost.title}
                  </h1>
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
              More Articles
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
