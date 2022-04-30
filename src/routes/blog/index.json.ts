import type { RequestHandlerOutput, RequestEvent } from '@sveltejs/kit/types/internal';
import { fetchNewsletters, NewsletterFetchOptions } from './_query';

export async function get(event: RequestEvent): Promise<RequestHandlerOutput> {
  let fetchOptions: NewsletterFetchOptions = { labels: [] };

  if (event.url.searchParams.has('l') === true && event.url.searchParams.get('l').length > 0) {
    fetchOptions.labels = event.url.searchParams.get('l').split(',');
  }

  return new Response(JSON.stringify(await fetchNewsletters(fetchOptions)), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
