import GhostContentAPI from '@tryghost/content-api';

if (!process.env.GHOST_URL || !process.env.GHOST_CONTENT_API_KEY) {
  throw new Error('Ghost credentials not found');
}

const ghost = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: 'v5.0',
  makeRequest: async ({ url, method, params, headers }) => {
    const searchParams = new URLSearchParams(params);
    const finalUrl = `${url}${params ? `?${searchParams}` : ''}`;

    const response = await fetch(finalUrl, {
      method,
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Ghost API error: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  },
});

export type GhostAuthor = {
  id: string;
  name: string;
  slug: string;
  profile_image: string | null;
  cover_image: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  facebook: string | null;
  twitter: string | null;
  meta_title: string | null;
  meta_description: string | null;
  url: string;
};

export type GhostTag = {
  id: string;
  name: string;
  slug: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  feature_image?: string;
  feature_image_alt?: string;
  excerpt?: string;
  custom_excerpt?: string;
  reading_time: number;
};

export type GhostPost = {
  id: string;
  slug: string;
  title: string;
  feature_image: string | null;
  feature_image_alt: string | null;
  excerpt: string | null;
  custom_excerpt: string | null;
  reading_time: number;
};

export async function getPosts() {
  return (await ghost.posts.browse({
    limit: 'all',
    include: ['tags', 'authors'],
  })) as GhostPost[];
}

export async function getPost(slug: string) {
  return (await ghost.posts.read(
    {
      slug,
    },
    {
      include: ['tags', 'authors'],
    }
  )) as GhostPost;
}

export async function getPostsBySlugs(slugs: string[]): Promise<Post[]> {
  // Create a filter string for Ghost API that matches any of the provided slugs
  const slugFilter = `slug:[${slugs.join(',')}]`;

  const posts = (await ghost.posts.browse({
    limit: 'all',
    include: ['tags', 'authors'],
    filter: slugFilter,
  })) as GhostPost[];

  // Ensure posts are returned in the same order as requested slugs
  const orderedPosts = slugs
    .map((slug) => {
      const post = posts.find((p) => p.slug === slug);
      if (!post) {
        console.warn(`Post with slug "${slug}" not found`);
        return null;
      }
      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        feature_image: post.feature_image || undefined,
        feature_image_alt: post.feature_image_alt || undefined,
        excerpt: post.excerpt || post.custom_excerpt || undefined,
        reading_time: post.reading_time,
      } as Post;
    })
    .filter((post): post is Post => post !== null);

  return orderedPosts;
}

export async function getRecentPosts(limit: number = 3) {
  return (await ghost.posts.browse({
    limit: limit,
    include: ['tags', 'authors'],
  })) as GhostPost[];
}

export async function getPostsByTag(tag: string) {
  return (await ghost.posts.browse({
    limit: 'all',
    include: ['tags', 'authors'],
    filter: `tag:${tag}`,
  })) as GhostPost[];
}

export async function getAllTags() {
  return (await ghost.tags.browse({
    limit: 'all',
  })) as GhostTag[];
}
