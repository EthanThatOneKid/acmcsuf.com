import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import webfontDownload from 'vite-plugin-webfont-dl';

export default defineConfig({
  plugins: [sveltekit(), webfontDownload()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
