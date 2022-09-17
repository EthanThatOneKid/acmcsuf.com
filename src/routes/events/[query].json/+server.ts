import type { RequestEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';
import { SAMPLE_EVENTS } from '$lib/server/events/data';
import { parse } from '$lib/server/events/ical';
import { allEvents } from '$lib/server/events/cache';
import { DEBUG_FLAG_ENABLED } from '$env/static/private';

const ICAL_TARGET_URL =
  'https://calendar.google.com/calendar/ical/738lnit63cr2lhp7jtduvj0c9g%40group.calendar.google.com/public/basic.ics';

export async function GET({ params }: RequestEvent<RouteParams>) {
  const events = DEBUG_FLAG_ENABLED
    ? SAMPLE_EVENTS
    : allEvents.get() ?? parse(await fetch(ICAL_TARGET_URL).then((r) => r.text()));

  const filteredEvents =
    params.query === 'all' ? events : events.filter((event) => event.slug === params.query);

  return new Response(JSON.stringify(filteredEvents), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
