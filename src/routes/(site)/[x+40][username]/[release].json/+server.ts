import type { RequestEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';
import { getCertificatePageData, cachedPageData, makeCacheKey } from '$lib/server/certificates';
import { LATEST } from '$lib/public/certificates/urls';

/**
 * The server-side load function for the certificate page.
 */
export async function GET({ params }: RequestEvent<RouteParams>) {
  const key = makeCacheKey(params.username, params.release);
  let cache = cachedPageData.get();

  let data = cache?.get(key);
  if (data) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    data = await getCertificatePageData(makeCertificateQuery(params.username, params.release));
  } catch (err) {
    if (err instanceof Error) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  cache ??= new Map();
  cache.set(key, data!);
  cachedPageData.set(cache);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function makeCertificateQuery(username: string, release: string) {
  return {
    // Repository <https://github.com/ethanthatonekid/acmcsuf.com>.
    owner: 'ethanthatonekid',
    name: 'acmcsuf.com',

    // User-provided parameters.
    username: username,
    release: release.toLowerCase() === LATEST ? 0 : release,
  };
}
