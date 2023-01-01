import type { RequestEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';
import { getCertificate } from '$lib/server/certificates/certificates';
import { LATEST } from '$lib/public/certificates/urls';

/**
 * The server-side load function for the contributor page.
 */
export async function GET({ params }: RequestEvent<RouteParams>) {
  // Get the contributor's certificate.
  const certificate = await getCertificate({
    owner: 'ethanthatonekid',
    name: 'acmcsuf.com',
    username: params.username,
    release: params.version.toLowerCase() === LATEST ? 0 : params.version,
  });

  return new Response(JSON.stringify({ certificate }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
