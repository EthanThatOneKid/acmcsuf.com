import { LINKS } from '$lib/links/data';
import { parseLink } from '$lib/links/utils';
import type { Handle } from '@sveltejs/kit';

export function shortener(): Handle {
  return async ({ event, resolve }) => {
    const { pathname } = new URL(event.request.url);
    const link = parseLink(pathname);
    if (!link) return resolve(event);

    const destination = LINKS[link];
    const message = `Redirecting to ${destination}...`;
    return new Response(message, {
      status: 302,
      headers: {
        Location: destination,
        'Content-Type': 'text/plain',
        'Content-Length': message.length.toString(),
      },
    });
  };
}
