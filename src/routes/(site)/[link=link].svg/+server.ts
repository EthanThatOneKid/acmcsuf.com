import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { LINKS } from '$lib/server/links/data';
import { resolve } from '$lib/server/links/resolve';
import { genQRCodeSvg } from '$lib/server/links/qr';

export async function GET(event: RequestEvent) {
  const destination = resolve(event.params.link, LINKS);

  if (!destination) {
    throw error(404, 'Invalid link');
  }

  const qrCodeSvg = await genQRCodeSvg(destination);

  return new Response(qrCodeSvg, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
