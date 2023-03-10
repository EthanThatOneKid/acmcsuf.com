import type { PageLoadEvent } from './$types';
import type { GetPomoInput } from 'pomo/src/server/pomo/types'
/* To do - finish this file now. */

export async function load({ fetch, url }: PageLoadEvent) {
  const query = parseQuery(url.searchParams.get('l') || '');
  const target = makeBlogPostsJsonUrl(query.labels ?? []);

  const response = await fetch(target);
  const blogOutput = await response.json();

  const posts = (blogOutput.posts ?? []) as BlogPost[];
  const labels = (blogOutput.labels ?? []) as string[];

  return {
    posts,
    labels,
    selectedLabels: query.labels,
  };
}

function parseInput(url : URL) : GetPomoInput {
  const patterns = url.searchParams.get("patterns");
  if(!patterns) {
    throw new Error("Missing Required URL Search Params.");
  }
}