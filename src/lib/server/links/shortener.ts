import type { Handle } from '@sveltejs/kit';
import { LINKS } from '$lib/server/links/data';
import { parseLinkId } from '$lib/server/links/utils';

export function shortener(): Handle {
  return async ({ event, resolve }) => {
    const { pathname } = new URL(event.request.url);
    const link = parseLinkId(pathname, LINKS);
    if (!link) return resolve(event);

    const message = `Redirecting to ${link.destination}...`;
    return new Response(message, {
      status: 302,
      headers: {
        Location: link.destination,
        'Content-Type': 'text/plain',
        'Content-Length': message.length.toString(),
      },
    });
  };
}
