import preprocess from 'svelte-preprocess';
import adapter from '../packages/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    // See https://acmcsuf.com/pulls/630.
    env: { publicPrefix: 'VERCEL_' },
  },
};

export default config;
