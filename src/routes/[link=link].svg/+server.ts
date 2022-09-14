import type { RequestHandler } from './$types';
import { LINKS } from '$lib/links/data';
import { parseLink, genQRCodeSvg } from '$lib/links/utils';

export const GET = handler();

function handler(): RequestHandler {
  return async function (event) {
    const link = parseLink(event.params.link);

    if (!link) {
      throw new Error('Invalid link');
    }

    const destination = LINKS[link];
    const qrCodeSvg = await genQRCodeSvg(destination);

    return new Response(qrCodeSvg, {
      status: 200,
      headers: { 'Content-Type': 'image/svg+xml' },
    });
  };
}
