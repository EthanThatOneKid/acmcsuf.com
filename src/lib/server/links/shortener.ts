import type { Handle } from '@sveltejs/kit';
import { LINKS } from '$lib/server/links/data';
import { resolve as resolveShortlink } from '$lib/server/links/resolve';

export function shortener(): Handle {
  return async ({ event, resolve }) => {
    const { pathname } = new URL(event.request.url);
    const destination = resolveShortlink(pathname, LINKS);
    if (!destination) {
      return resolve(event);
    }

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
