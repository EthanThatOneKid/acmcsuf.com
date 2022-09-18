import { LINKS } from '$lib/links/data';
import { parseLinkId } from '$lib/links/utils';
import type { Handle } from '@sveltejs/kit';

export function shortener(): Handle {
  return async ({ event, resolve }) => {
    const { pathname } = new URL(event.request.url);
    const id = parseLinkId(pathname);
    if (!id) return resolve(event);

    const destination = LINKS[id];
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
