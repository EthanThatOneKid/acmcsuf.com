import type { PageServerLoad } from './$types';
import type { BlogFetchOptions } from '$lib/public/blog/types';
import { fetchBlogPosts } from '$lib/server/blog/posts';

export const load = loader();

function loader(): PageServerLoad {
  return async function load({ url }) {
    const fetchOptions: BlogFetchOptions = { labels: [] };
    const rawLabels = url.searchParams.get('l');

    if (rawLabels && rawLabels.length > 0) {
      fetchOptions.labels = rawLabels.split(',');
    }

    const posts = await fetchBlogPosts(fetchOptions);
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
}
