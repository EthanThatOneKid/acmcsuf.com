import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    env: { publicPrefix: '' },
  },

  vitePlugin: {
    experimental: {
      inspector: {
        toggleKeyCombo: 'meta-shift',
        boldMode: true,
        showToggleButton: 'always',
        toggleButtonPosition: 'bottom-left',
      },
    },
  },
};

export default config;
