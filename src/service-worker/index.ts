/// <reference lib="webworker" />
import { build, files, timestamp } from '$service-worker';
import { CURRENT_CACHE_NAME, cacheRequest } from './common';
import { fromCache } from './from/cache';
import { fromNetwork } from './from/network';

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        // Delete old caches with an expired cache name
        cacheNames.map((cacheName) => cacheName !== CURRENT_CACHE_NAME && caches.delete(cacheName))
      )
    )
  );
});

self.addEventListener('install', (event) => {
  event.wautUntil(
    // Cache known build output and static files
    // @see <https://kit.svelte.dev/docs/modules#$service-worker-build>
    caches.open(CURRENT_CACHE_NAME).then((cache) => cache.addAll([...build, ...files]))
  );
});

self.addEventListener('fetch', (event) => {
  // If online, try to fetch from network with a timeout.
  // If anything fails, try to serve from cache.
  event.respondWith(fromNetwork(event.request, 10e3).catch(() => fromCache(event.request)));

  event.waitUntil(cacheRequest(event.request));
});
