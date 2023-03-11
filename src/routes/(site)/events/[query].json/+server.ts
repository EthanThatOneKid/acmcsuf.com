import type { RequestEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';
import { DEBUG_FLAG_ENABLED } from '$lib/server/flags';
import { SAMPLE_EVENTS } from '$lib/server/events/data/club-events';
import { fromGCal, listUpcomingEvents } from '$lib/server/events/gcal';
import { allEvents } from '$lib/server/events/cache';
import type { ClubEvent } from '$lib/public/events/event';
import { ALL } from '$lib/public/blog/utils';

export async function GET({ params }: RequestEvent<RouteParams>) {
  const events = await getData();

  if (events.length === 0) {
    return new Response('[]', { status: 204 });
  }

  const filteredEvents =
    params.query === ALL ? events : events.filter((event) => event.id === params.query);

  return new Response(JSON.stringify(filteredEvents), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * getData is a helper function that returns the relevant data from the
 * cache or the API. It automatically updates the cache if the data is
 * stale.
 */
async function getData(): Promise<ClubEvent[]> {
  if (DEBUG_FLAG_ENABLED) {
    return SAMPLE_EVENTS;
  }

  let data = allEvents.get();
  if (!data) {
    const upcomingEvents = await listUpcomingEvents();
    // To generate 'src/lib/server/events/data/gcal-events.json', uncomment the
    // following lines of code then visit http://localhost:5173/events/:
    //
    // const { writeFileSync } = await import('node:fs');
    // writeFileSync(
    //   'src/lib/server/events/data/gcal-events.json',
    //   JSON.stringify(upcomingEvents, null, 2),
    // );
    //
    // Remember to comment out the above lines of code before committing.
    data = fromGCal(upcomingEvents);
    allEvents.set(data);
  }

  return data;
}
