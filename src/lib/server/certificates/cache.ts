import { Cache } from '$lib/server/cache/cache';
import type { CertificatePageData } from '$lib/public/certificates';

export const cachedPageData = new Cache(new Map<string, CertificatePageData>());

export function makeCacheKey(username: string, version: string) {
  return `${version}-${username}`;
}
