import type { PageLoadEvent } from "./$types";
import type { BlogPost } from "$lib/public/blog/types";
import { parseQuery } from "$lib/public/blog/utils";
import { makeBlogPostsPageDataURL } from "$lib/public/blog/urls";

export async function load({ fetch, url }: PageLoadEvent) {
  const query = parseQuery(url.searchParams.get("l") || "");
  const target = makeBlogPostsPageDataURL(query.labels ?? []);

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
