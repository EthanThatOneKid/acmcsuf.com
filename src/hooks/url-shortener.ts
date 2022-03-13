import { links } from '$lib/constants/links';
import type { Handle } from '@sveltejs/kit';

export function urlShortener(): Handle {
  return async ({ event, resolve }) => {
    const slug = event.url.pathname.replace(/^\/+|\/+$/g, '');
    const url = links[slug];

    if (!url) {
      return resolve(event);
    }

    const message = `Redirecting to ${url}...`;
    return new Response(message, {
      status: 302,
      headers: {
        Location: url,
        'Content-Type': 'text/plain',
        'Content-Length': message.length.toString(),
      },
    });
  };
}
