import type { LoadEvent } from '@sveltejs/kit';
import type { BlogPost } from '$lib/public/blog/types';
import { parseQuery, ALL } from '$lib/public/blog/utils';

export async function load({ fetch, url }: LoadEvent) {
  const query = url.searchParams.get('l');
  const target = `/blog/${query ?? ALL}.json`;

  const response = await fetch(target);
  const blogOutput = await response.json();

  const { labels: selectedLabels } = parseQuery(query ?? ALL);
  const posts = (blogOutput.posts ?? []) as BlogPost[];
  const labels = (blogOutput.labels ?? []) as string[];

  return {
    posts,
    labels,
    selectedLabels,
  };
}
