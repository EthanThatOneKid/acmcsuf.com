import { posts } from "./post-data";

export interface BlogPostMeta {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  slug?: string;
}

export interface BlogPost {
  html: string;
  filename: string;
  metadata: BlogPostMeta;
}

const getSlugFromFilename = (filename: string) => filename.replace(/\.md$/, "");

export const getPosts = () => {
  return [...(posts as BlogPost[])].map((post) => {
    post.metadata.slug = getSlugFromFilename(post.filename);
    return post;
  });
};

export const getPostBySlug = (slug: string) => {
  return (posts as BlogPost[]).find(({ filename }) => {
    if (getSlugFromFilename(filename) === slug) {
      return true;
    }
  });
};
