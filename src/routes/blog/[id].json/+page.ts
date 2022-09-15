import type { RequestHandlerOutput, RequestEvent } from './$types';
import { fetchNewsletters, NewsletterFetchOptions } from '$lib/';

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
