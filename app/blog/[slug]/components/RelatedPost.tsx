import Link from 'next/link';

interface RelatedPostProps {
  title: string;
  excerpt: string;
  slug: string;
}

export default function RelatedPost({ title, excerpt, slug }: RelatedPostProps) {
  return (
    <div className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
      <Link href={`/blog/${slug}`} className="block group">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">{excerpt}</p>
      </Link>
    </div>
  );
}
