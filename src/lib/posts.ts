import { posts } from "./post-data";

export interface BlogPostMeta {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  slug?: string;
  author?: {
    name: string;
    picture?: string;
  };
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

export const getPostBySlug = (slug: string) =>
  (posts as BlogPost[]).find(({ filename }) => {
    if (getSlugFromFilename(filename) === slug) {
      return true;
    }
  }) || {
    html: "",
    filename: slug,
    metadata: {
      slug,
      title: `"${slug}"`,
      description: `we do not have a blog post called "${slug}"`,
      author: {
        name: "ACM Officers",
        picture: "placeholder.png",
      },
    },
  };
