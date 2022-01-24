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
      // Provide a custom error message when the prerender fails on pages
      // beyond /blog. See <https://kit.svelte.dev/docs#configuration-prerender>.
      // Note: Eslint-disabling next line allows use of any argument/return types.
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      onError: ({ status, path, referrer, referenceType }) => {
        if (path.startsWith('/blog')) throw new Error('Missing a newsletter!');
        console.warn(`${status} ${path}${referrer ? ` (${referenceType} from ${referrer})` : ''}`);
      },
    },
  },
};

export default config;
