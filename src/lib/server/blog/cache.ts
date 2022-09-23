import type { BlogPost } from '$lib/public/blog/types';

const EXPIRATION_TIMEOUT = 1e3 * 60 * 1; // Cache updates every 1 minute.

interface BlogPostsCacheInterface {
  setAllPosts(posts: BlogPost[]): void;
  getAllPosts(): BlogPost[] | undefined;
}

export class BlogPostsCache implements BlogPostsCacheInterface {
  constructor(private data: BlogPost[] = [], private lastUpdated = 0) {}

  setAllPosts(posts: BlogPost[], timestamp = Date.now()) {
    this.data = posts;
    this.lastUpdated = timestamp;
  }

  getAllPosts() {
    if (Date.now() > this.lastUpdated + EXPIRATION_TIMEOUT) {
      return;
    }

    return this.data;
  }

  static create(caching = true): BlogPostsCacheInterface {
    return caching ? new BlogPostsCache() : new NoopBlogPostsCache();
  }
}

export class NoopBlogPostsCache implements BlogPostsCacheInterface {
  setAllPosts(p: BlogPost[]) {
    return p;
  }

  getAllPosts() {
    return undefined;
  }
}
