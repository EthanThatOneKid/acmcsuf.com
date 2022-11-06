import type { RequestEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';
import { DEBUG_FLAG_ENABLED } from '$lib/server/flags';
import { SAMPLE_EVENTS } from '$lib/server/events/data/sample-events';
import { parse } from '$lib/server/events/ical';
import { allEvents } from '$lib/server/events/cache';
import { ALL } from '$lib/public/blog/utils';
import type { ClubEvent } from '$lib/public/events/event';

const ICAL_TARGET_URL =
  'https://calendar.google.com/calendar/ical/738lnit63cr2lhp7jtduvj0c9g%40group.calendar.google.com/public/basic.ics';

export async function GET({ params }: RequestEvent<RouteParams>) {
  const events: ClubEvent[] = DEBUG_FLAG_ENABLED
    ? SAMPLE_EVENTS
    : allEvents.get() ?? parse(await fetch(ICAL_TARGET_URL).then((r) => r.text()));

  const filteredEvents =
    params.query === ALL ? events : events.filter((event) => event.slug === params.query);

  return new Response(JSON.stringify(filteredEvents), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
