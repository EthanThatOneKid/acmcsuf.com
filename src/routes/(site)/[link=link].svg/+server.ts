import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { LINKS } from '$lib/server/links/data';
import { parseLinkId, genQRCodeSvg } from '$lib/server/links/utils';

export async function GET(event: RequestEvent) {
  const link = parseLinkId(event.params.link, LINKS);

  if (!link) {
    throw error(404, 'Invalid link');
  }

  const qrCodeSvg = await genQRCodeSvg(link.destination);

  return new Response(qrCodeSvg, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
