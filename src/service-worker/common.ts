import { timestamp, build, files } from '$service-worker';

export const CURRENT_CACHE_NAME = 'acmcsuf-' + timestamp;
export const BUILD_FILES = build.concat(files);
export const CACHE_BLOCKLIST = new Set(['/global.css', '/service-worker.js']);

export function cacheRequest(request: Request): void {
  caches.open(CURRENT_CACHE_NAME).then((cache) =>
    fetch(request).then((response) => {
      const inBlockList = CACHE_BLOCKLIST.has(request.url);
      console.log(request.url);
      if (response.ok && !inBlockList) {
        cache.put(request, response.clone());
      }
    })
  );
}
