declare module '@tryghost/content-api' {
  export default class GhostContentAPI {
    constructor(config: {
      url: string;
      key: string;
      version: string;
      makeRequest?: (options: {
        url: string;
        method: string;
        params?: Record<string, string>;
        headers?: Record<string, string>;
      }) => Promise<{ data: any }>;
    });

    posts: {
      browse<T = any>(options?: {
        limit?: number | 'all';
        page?: number;
        order?: string;
        include?: string[];
      }): Promise<T[]>;
      read<T = any>(data: { slug: string }, options?: { include?: string[] }): Promise<T>;
    };
  }
}
