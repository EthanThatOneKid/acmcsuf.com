/// <reference lib="webworker" />

export function handleFetch(event: FetchEvent): void {
  // If online, try to fetch from network with a timeout.
  // If anything fails, try to serve from cache.
  event.respondWith(fetch(event.request));
}
