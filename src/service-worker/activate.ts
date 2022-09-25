/// <reference lib="webworker" />
import { CURRENT_CACHE_NAME } from './common';

export function handleActivate(event: ExtendableEvent): void {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        // Delete old caches with an expired cache name
        cacheNames.map((cacheName) => cacheName !== CURRENT_CACHE_NAME && caches.delete(cacheName))
      )
    )
  );
}
