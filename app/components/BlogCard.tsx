import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  featureImage?: string;
  author?: string;
  category?: string;
}

export function BlogCard({
  title,
  slug,
  publishedAt,
  excerpt,
  featureImage,
  author,
  category,
}: BlogCardProps) {
  return (
    <article className="group flex flex-col space-y-4">
      {/* Date Label */}
      <div className="relative">
        {featureImage && (
          <Link href={`/blog/${slug}`}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image
                src={featureImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {category && (
          <Badge variant="outline" className="text-xs font-medium uppercase tracking-wider">
            {category}
          </Badge>
        )}
        <h2 className="text-2xl font-semibold leading-tight hover:text-primary">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
        {author && <p className="text-sm text-muted-foreground">BY {author.toUpperCase()}</p>}
      </div>
    </article>
  );
}
