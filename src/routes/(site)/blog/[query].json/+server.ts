import type { RequestEvent } from "@sveltejs/kit";
import type { RouteParams } from "./$types";
import { fetchBlogPosts } from "$lib/server/blog/posts";
import { parseQuery } from "$lib/public/blog/utils";

/**
 * The server-side load function for the blog page.
 *
 * If id is 'all', then it will fetch all blog posts.
 * If id is a number, then it will fetch a single blog post.
 * If id is a string, then it will fetch all blog posts with the given label.
 */
export async function GET({ params }: RequestEvent<RouteParams>) {
  const options = parseQuery(params.query);
  const output = await fetchBlogPosts(options);

  return new Response(JSON.stringify(output), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
