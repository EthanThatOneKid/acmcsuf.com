import { ALL, queryFromLabels } from './utils';

export function makeBlogPostsJsonUrl(labels: string[]): string {
  const query = queryFromLabels(labels);
  return `/blog/${query}.json`;
}

export function makeBlogPostsPageUrl(labels: string[]): string {
  const query = queryFromLabels(labels);
  return query === ALL ? '/blog' : `/blog?l=${query}`;
}

export function makeBlogPostPageUrl(id: number): string {
  return `/blog/${id}`;
}
