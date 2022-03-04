import { CURRENT_CACHE_NAME } from '../common';

export function fromCache(request) {
  caches
    .open(CURRENT_CACHE_NAME)
    .then((cache) => cache.match(request).then((matching) => matching || cache.match('/')));
}
