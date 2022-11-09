import type { RequestEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';
import { DEBUG_FLAG_ENABLED } from '$lib/server/flags';
import { SAMPLE_EVENTS } from '$lib/server/events/data/sample-events';
import { fromGCal, listUpcomingEvents } from '$lib/server/events/gcal';
import { allEvents } from '$lib/server/events/cache';
import type { ClubEvent } from '$lib/public/events/event';

// const ICAL_TARGET_URL =
//   'https://calendar.google.com/calendar/ical/738lnit63cr2lhp7jtduvj0c9g%40group.calendar.google.com/public/basic.ics';

export async function GET({ params }: RequestEvent<RouteParams>) {
  var items = (await listUpcomingEvents()).data.items;

  if (items == undefined) {
    return new Response(JSON.stringify({ message: 'Error retrieving events' }), { status: 404 });
  }

  const events: ClubEvent[] = DEBUG_FLAG_ENABLED
    ? SAMPLE_EVENTS
    : allEvents.get() ?? (await fromGCal(items));

  return new Response(JSON.stringify(events), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
