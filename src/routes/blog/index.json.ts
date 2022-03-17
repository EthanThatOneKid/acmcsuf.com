import type { RequestHandlerOutput } from '@sveltejs/kit/types/internal';
import { fetchNewsletters } from './_query';

export async function get(): Promise<RequestHandlerOutput> {
  return new Response(JSON.stringify(await fetchNewsletters()), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
