import { getPost, getPosts } from '@/lib/ghost';
import { format } from 'date-fns';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getPost(params.slug);
    return {
      title: post.title,
      description: post.custom_excerpt || post.excerpt,
      openGraph: post.feature_image
        ? {
            images: [
              {
                url: post.feature_image,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ],
          }
        : undefined,
    };
  } catch {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getPost(params.slug);

    return (
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-muted-foreground mb-6">
            <time dateTime={post.published_at}>
              {format(new Date(post.published_at), 'MMMM d, yyyy')}
            </time>
            {post.reading_time && ` · ${post.reading_time} min read`}
          </div>
          {post.feature_image && (
            <div className="relative h-[400px] w-full mb-8">
              <Image
                src={post.feature_image}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}
        </header>

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    );
  } catch (error) {
    notFound();
  }
}
