import type { LoadEvent } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
import type { RouteParams } from "./$types";
import type { BlogPost } from "$lib/public/blog/types";

export async function load({ fetch, params, url }: LoadEvent<RouteParams>) {
  // TODO: Rename directory to [id=integer] <https://kit.svelte.dev/docs/advanced-routing#matching>
  if (!params.id || !Number.isInteger(+params.id)) {
    throw error(404, "Not found");
  }

  const target = new URL(`/blog/${params.id}.json`, url);
  const response = await fetch(target.toString());
  const output = await response.json();

  const post = ((output.posts ?? []) as BlogPost[]).shift();

  if (!post) {
    throw error(404, "Not found");
  }

  return {
    post,
  };
}
