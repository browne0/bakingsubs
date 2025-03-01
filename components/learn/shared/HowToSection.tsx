import { Post } from '@/lib/ghost';
import Link from 'next/link';

interface HowToSectionProps {
  posts: Post[];
  title?: string;
  description?: string;
}

export default function HowToSection({
  posts,
  title = 'How To Use Substitutes',
  description = 'Essential guides about ingredient substitutions in baking.',
}: HowToSectionProps) {
  return (
    <section id="how-to" className="py-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden 
                       shadow-sm hover:shadow-md transition-all border border-gray-200 
                       dark:border-gray-700"
            >
              <div className="aspect-video relative">
                <img
                  src={post.feature_image || 'https://placehold.co/800x400'}
                  alt={post.feature_image_alt || post.title}
                  className="object-cover w-full h-full"
                />
                <div
                  className="absolute top-2 right-2 bg-black/70 px-2 py-1 
                             rounded text-xs text-white"
                >
                  {post.reading_time} min read
                </div>
              </div>

              <div className="p-6">
                <h3
                  className="text-xl font-semibold text-gray-900 dark:text-white 
                             group-hover:text-blue-600 dark:group-hover:text-blue-400 
                             transition-colors mb-3"
                >
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.custom_excerpt || post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
