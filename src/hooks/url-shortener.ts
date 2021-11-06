import { links } from '$lib/constants/links';
import type { Handle } from '@sveltejs/kit';

export const urlShortener = (): Handle =>
  async ({ request, resolve }) => {
    const slug = request.path.replace(/^\/+|\/+$/g, '');
    const url = links[slug];
    if (url === undefined) return await resolve(request);
    const message = `Redirecting to ${url}...`;
    return {
      body: message,
      status: 302,
      headers: {
        Location: url,
        'Content-Type': 'text/plain',
        'Content-Length': message.length.toString(),
      },
    };
  };
