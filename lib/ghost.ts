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

export type GhostPost = {
  id: string;
  uuid: string;
  slug: string;
  title: string;
  html: string;
  comment_id: string;
  feature_image: string | null;
  feature_image_alt: string | null;
  feature_image_caption: string | null;
  featured: boolean;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt: string | null;
  codeinjection_head: string | null;
  codeinjection_foot: string | null;
  custom_template: string | null;
  canonical_url: string | null;
  tags: GhostTag[];
  authors: GhostAuthor[];
  primary_author: GhostAuthor;
  primary_tag: GhostTag | null;
  url: string;
  excerpt: string;
  reading_time: number;
  access: boolean;
  comments: boolean;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  email_subject: string | null;
  frontmatter: string | null;
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
