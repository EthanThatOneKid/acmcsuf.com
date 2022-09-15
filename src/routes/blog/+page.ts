import type { PageLoad } from './$types';

const DATA_URL = '/blog/all.json';

export const load = loader();

function loader(): PageLoad {
  return async function load({ fetch, depends, url }) {
    depends(DATA_URL);

    const target = new URL(DATA_URL, url);
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
