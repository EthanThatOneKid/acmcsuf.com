import { build, files, timestamp } from '$service-worker';

export const CURRENT_CACHE_NAME = 'acmcsuf-' + timestamp;

export function cacheRequest(request) {
  caches
    .open(CURRENT_CACHE_NAME)
    .then((cache) => fetch(request).then((response) => cache.put(request, response)));
}
