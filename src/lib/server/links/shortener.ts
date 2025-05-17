import type { Handle } from "@sveltejs/kit";
import { LINKS } from "$lib/public/links";
import { resolve as resolveShortlink } from "$lib/server/links/resolve";

export function shortener(): Handle {
  return async ({ event, resolve }) => {
    try {
      const url = new URL(event.request.url);

      // Pass to QR code generation endpoint.
      if (url.pathname.toLowerCase().endsWith(".svg")) {
        return resolve(event);
      }

      const destination = resolveShortlink(url, LINKS);
      if (destination.toString() === url.toString()) {
        return resolve(event);
      }

      // Redirect to destination.
      return Response.redirect(destination, 302);
    } catch {
      return resolve(event);
    }
  };
}
