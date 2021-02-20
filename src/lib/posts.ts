import { posts } from "./post-data";
import { allOfficers, officers } from "./officers";

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

export const getPosts = () => {
  return (posts as BlogPost[])
  .filter(({filename}) => !filename.startsWith("_"))
  .map(getMetadataFromFrontmatter);
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

const getSlugFromFilename = (filename: string) => filename.replace(/\.md$/, "");

const getMetadataFromFrontmatter = (frontmatter: any): BlogPostMeta => {
  const slug = getSlugFromFilename(frontmatter.filename);
  const title = (frontmatter.metadata.title as string | undefined) ?? slug;
  const description = frontmatter.metadata.description as string | undefined;
  const authorName = frontmatter.metadata.author as string | undefined;
  const author =
    authorName === undefined
      ? undefined
      : {
          name: authorName,
          picture: allOfficers.find(
            ({ name }) => name === frontmatter.metadata.author
          )?.picture as string | undefined,
        };
  return {
    slug,
    title,
    description,
    author,
  };
};
