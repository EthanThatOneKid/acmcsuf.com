import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { LINKS } from '$lib/server/links/data';
import { resolve } from '$lib/server/links/resolve';
import { genQRCodeSvg } from '$lib/server/links/qr';

function trimSuffix(str: string, suffix: string): string {
  if (str.endsWith(suffix)) {
    return str.slice(0, -suffix.length);
  }
  return str;
}

export async function GET(event: RequestEvent) {
  const { pathname } = new URL(event.request.url);

  const destination = resolve(trimSuffix(pathname, '.svg'), LINKS);
  if (!destination) {
    throw error(404, 'Invalid link');
  }

  const qrCodeSvg = await genQRCodeSvg(destination);
  return new Response(qrCodeSvg, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
