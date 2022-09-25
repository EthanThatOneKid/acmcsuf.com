/// <reference lib="webworker" />
import { CURRENT_CACHE_NAME } from './common';
import { build } from '$service-worker';

export function handleInstall(event: ExtendableEvent): void {
  event.waitUntil(
    // Cache known build output and static files
    // @see <https://kit.svelte.dev/docs/modules#$service-worker-build>
    caches.open(CURRENT_CACHE_NAME).then((cache) => {
      // Open a cache and cache our files
      cache.addAll(build);

      return true;
    })
  );
}
