import { sequence } from '@sveltejs/kit/hooks';
import { shortener } from '$lib/server/links/shortener';
import type { Handle } from '@sveltejs/kit';

/**
 * Handle the site's theme (light/dark) via cookies
 */
const handleTheme = (async ({ event, resolve }) => {
  const theme = event.cookies.get('theme');

  if (theme) {
    return await resolve(event, {
      transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`),
    });
  }
  return await resolve(event);
}) satisfies Handle;

/** See: <https://kit.svelte.dev/docs/hooks#server-hooks> */
export const handle = sequence(shortener(), handleTheme);
