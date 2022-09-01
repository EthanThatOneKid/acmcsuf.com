import type { RequestHandlerOutput, RequestEvent } from '@sveltejs/kit/types/internal';
import { fetchNewsletters, NewsletterFetchOptions } from './_query';

export async function get(event: RequestEvent): Promise<RequestHandlerOutput> {
  const fetchOptions: NewsletterFetchOptions = { labels: [] };
  const rawLabels = event.url.searchParams.get('l');

  if (rawLabels?.length > 0) {
    fetchOptions.labels = rawLabels.split(',');
  }

  return new Response(JSON.stringify(await fetchNewsletters(fetchOptions)), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
