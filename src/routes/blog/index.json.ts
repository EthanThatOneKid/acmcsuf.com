import type { RequestHandlerOutput, RequestEvent } from '@sveltejs/kit/types/internal';
import { fetchNewsletters, NewsletterFetchOptions } from './_query';
import { DEBUG } from '$lib/constants';
import { posts } from './_testdata/posts';

const SAMPLE_POSTS = JSON.stringify(posts);

export async function get(event: RequestEvent): Promise<RequestHandlerOutput> {
  const fetchOptions: NewsletterFetchOptions = { labels: [] };
  const rawLabels = event.url.searchParams.get('l');

  if (rawLabels?.length > 0) {
    fetchOptions.labels = rawLabels.split(',');
  }

  // Uses sample data when DEBUG = 1 or env variables are not satisfied.
  const isSatisfied =
    import.meta.env.VITE_GH_ACCESS_TOKEN !== undefined &&
    import.meta.env.VITE_GH_DISCUSSION_CATEGORY_ID !== undefined;

  return new Response(
    DEBUG || !isSatisfied ? SAMPLE_POSTS : JSON.stringify(await fetchNewsletters(fetchOptions)),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
