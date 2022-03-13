import { build, files, version } from '$service-worker';

export const CURRENT_CACHE_NAME = 'acmcsuf-' + version;
export const BUILD_FILES = build.concat(files);

export function cacheRequest(request: Request): void {
  caches
    .open(CURRENT_CACHE_NAME)
    .then((cache) => fetch(request).then((response) => cache.put(request, response)));
}
