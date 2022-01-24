import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter(),
    prerender: {
      /** @type {import('@sveltejs/kit').PrerenderErrorHandler} */
      onError: ({ status, path, referrer, referenceType }) => {
        if (path.startsWith('/newsletters')) throw new Error('Missing a newsletter!');
        console.warn(`${status} ${path}${referrer ? ` (${referenceType} from ${referrer})` : ''}`);
      },
    },
  },
};

export default config;
