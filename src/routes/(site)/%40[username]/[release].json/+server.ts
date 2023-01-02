import type { RequestEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';
import { getCertificatePageData } from '$lib/server/certificates/certificates';
import { LATEST } from '$lib/public/certificates/urls';

/**
 * The server-side load function for the certificate page.
 */
export async function GET({ params }: RequestEvent<RouteParams>) {
  const data = await getCertificatePageData({
    owner: 'ethanthatonekid',
    name: 'acmcsuf.com',
    username: params.username,
    release: params.release.toLowerCase() === LATEST ? 0 : params.release,
  });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
