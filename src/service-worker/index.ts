/// <reference lib="webworker" />
import { CURRENT_CACHE_NAME, BUILD_FILES, cacheRequest } from './common';
import { fromCache } from './from/cache';
import { fromNetwork } from './from/network';

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        // Delete old caches with an expired cache name
        cacheNames.map((cacheName) => cacheName !== CURRENT_CACHE_NAME && caches.delete(cacheName))
      )
    )
  );
});

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    // Cache known build output and static files
    // @see <https://kit.svelte.dev/docs/modules#$service-worker-build>
    caches.open(CURRENT_CACHE_NAME).then((cache) => cache.addAll(BUILD_FILES))
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  // If online, try to fetch from network with a timeout.
  // If anything fails, try to serve from cache.
  event.respondWith(fromNetwork(event.request, 10e3).catch(() => fromCache(event.request)));
});
