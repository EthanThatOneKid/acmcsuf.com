import { ALL, queryFromLabels } from "./utils";

export function makeBlogPostsPageDataURL(labels: string[]): string {
  const query = queryFromLabels(labels);
  return `/blog/${query}.json`;
}

export function makeBlogPostsPageURL(labels: string[]): string {
  const query = queryFromLabels(labels);
  return query === ALL ? "/blog" : `/blog?l=${query}`;
}

export function makeBlogPostPageURL(id: number): string {
  return `/blog/${id}`;
}
