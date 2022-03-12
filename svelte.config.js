import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import { config as env } from 'dotenv';

// VITE_DEBUG is expected to be '0' or '1'
const DEBUG = Number(env().parsed.VITE_DEBUG);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  // Silence unwanted preprocessor warnings except in debug mode
  onwarn(warning, handler) {
    if (!DEBUG && warning.code === 'css-unused-selector') return;
    handler(warning);
  },

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter(),
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
