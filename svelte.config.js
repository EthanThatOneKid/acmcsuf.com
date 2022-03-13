import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: { test: { environment: 'jsdom' } },
    prerender: {
      // Provide a custom error message when the prerender fails on pages
      // beyond /blog. See <https://kit.svelte.dev/docs#configuration-prerender>.
      /** @type {import('@sveltejs/kit').PrerenderErrorHandler} */
      onError({ status, path, referrer, referenceType }) {
        if (path.startsWith('/blog')) throw new Error('Missing a newsletter!');
        console.warn(`${status} ${path}${referrer ? ` (${referenceType} from ${referrer})` : ''}`);
      },
    },
  },
};

export default config;
