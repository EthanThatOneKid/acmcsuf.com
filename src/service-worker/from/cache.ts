import { CURRENT_CACHE_NAME } from '../common';

export async function fromCache(request: Request): Promise<Response> {
  const cache = await caches.open(CURRENT_CACHE_NAME);
  const matching = await cache.match(request);
  return matching || cache.match('/');
}
