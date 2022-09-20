import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { LINKS } from '$lib/server/links/data';
import { parseLinkId, genQRCodeSvg } from '$lib/server/links/utils';

export async function GET(event: RequestEvent) {
  const id = parseLinkId(event.params.link);

  if (!id) {
    throw error(404, 'Invalid link');
  }

  const destination = LINKS[id];
  const qrCodeSvg = await genQRCodeSvg(destination);

  return new Response(qrCodeSvg, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
