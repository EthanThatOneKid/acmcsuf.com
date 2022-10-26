import type { Handle } from '@sveltejs/kit';
import { LINKS } from '$lib/server/links/data';
import { resolve as resolveShortlink } from '$lib/server/links/resolve';

export function shortener(): Handle {
  return async ({ event, resolve }) => {
    try {
      const { pathname } = new URL(event.request.url);

      const destination = resolveShortlink(pathname, LINKS);
      if (!destination) {
        return resolve(event);
      }

      // Pass to QR code generation endpoint.
      if (pathname.toLowerCase().endsWith('.svg')) {
        return resolve(event);
      }

      // Redirect to destination.
      return Response.redirect(destination, 302);
    } catch (error) {
      return resolve(event);
    }
  };
}
