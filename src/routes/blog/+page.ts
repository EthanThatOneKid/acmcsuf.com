import type { PageLoad } from './$types';

// TODO:
// - <https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/src/routes/blog/index.svelte>
// - <https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693>
// - <https://github.com/EthanThatOneKid/acmcsuf.com/blob/d489f239b8cb19c4b6ff6d5f89c3b79b9607196f/src/lib/links/shortener.ts>

export const load = loader();

function loader(): PageLoad {
  return async function load({ fetch, depends, url }) {
    depends('/blog.json');

    const target = new URL('/blog.json', url);
    const rawLabels = url.searchParams.get('l');
    const selectedLabels = [];

    if (rawLabels && rawLabels.length > 0) {
      target.searchParams.set('l', rawLabels);
      selectedLabels.push(...rawLabels.split(','));
    }

    const response = await fetch(target.toString());
    const blogOutput = await response.json();
    return { posts: blogOutput.posts, labels: blogOutput.labels, selectedLabels };
  };
}
