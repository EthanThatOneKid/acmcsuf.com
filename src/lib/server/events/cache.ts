import type { ClubEvent } from "$lib/public/events/event";
import { Cache } from "$lib/server/cache/cache";

// Make this false to disable server-side caching in development.
export const allEvents = Cache.create<ClubEvent[]>(/* CACHING=*/ true);
