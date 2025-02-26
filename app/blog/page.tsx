import { getPosts } from '@/lib/ghost';
import { format } from 'date-fns';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles about baking substitutions and techniques',
};

export default async function BlogPage() {
  const posts = await getPosts();

  console.log(posts);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col bg-card rounded-lg shadow-lg overflow-hidden"
          >
            {post.feature_image && (
              <div className="relative h-48 w-full">
                <Image src={post.feature_image} alt={post.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-6 flex-1">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                {format(new Date(post.published_at), 'MMMM d, yyyy')}
                {post.reading_time && ` · ${post.reading_time} min read`}
              </p>
              <p className="text-muted-foreground line-clamp-3">
                {post.custom_excerpt || post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
