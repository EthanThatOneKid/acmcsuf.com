import type { RequestEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';
import {
  getRepositoryCertificatePageData,
  cachedPageData,
  makeCacheKey,
  getReleaseCertificatePageData,
} from '$lib/server/certificates';
import { LATEST } from '$lib/public/certificates';

/**
 * The server-side load function for the certificate page.
 */
export async function GET({ params, url }: RequestEvent<RouteParams>) {
  const release = url.searchParams.get('release') ?? LATEST;
  if (params.repo_name === '~') {
    return handleGetReleaseCertificatePageData(params.username, release);
  }

  return handleGetRepositoryCertificatePageData(params.repo_name, params.username);
}

async function handleGetRepositoryCertificatePageData(repoName: string, username: string) {
  const key = makeCacheKey(repoName, username);
  let cache = cachedPageData.get();

  let data = cache?.get(key);
  if (data) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  data = await getRepositoryCertificatePageData(makeRepositoryCertificateQuery(repoName, username));
  cache ??= new Map();
  cache.set(key, data);
  cachedPageData.set(cache);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function makeRepositoryCertificateQuery(repoName: string, username: string) {
  return {
    // Org <https://github.com/acmcsufoss/>.
    owner: 'acmcsufoss',
    name: repoName,

    // User-provided parameters.
    username,
  };
}

async function handleGetReleaseCertificatePageData(username: string, release: string) {
  const key = makeCacheKey('~', username, release);
  let cache = cachedPageData.get();

  let data = cache?.get(key);
  if (data) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  data = await getReleaseCertificatePageData(makeReleaseCertificateQuery(username, release));
  cache ??= new Map();
  cache.set(key, data);
  cachedPageData.set(cache);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function makeReleaseCertificateQuery(username: string, release: string) {
  return {
    // Repository <https://github.com/ethanthatonekid/acmcsuf.com>.
    owner: 'EthanThatOneKid',
    name: 'acmcsuf.com',

    // User-provided parameters.
    username,
    release: release.toLowerCase() === LATEST ? 0 : release,
  };
}
