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

export type GhostPost = {
  id: string;
  slug: string;
  title: string;
  html: string;
  feature_image: string | null;
  excerpt: string;
  custom_excerpt: string;
  reading_time: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
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

export async function getRecentPosts(limit: number = 3) {
  return (await ghost.posts.browse({
    limit: limit,
    include: ['tags', 'authors'],
  })) as GhostPost[];
}
