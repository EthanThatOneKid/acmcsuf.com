import type { RequestEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';
import { fetchContributor } from '$lib/server/contributors/contributors';

/**
 * The server-side load function for the contributor page.
 */
export async function GET({ params }: RequestEvent<RouteParams>) {
  const data = await fetchContributor(params.tag);
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
