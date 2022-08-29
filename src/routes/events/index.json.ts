import type { RequestHandlerOutput } from '@sveltejs/kit/types/internal';
import type { AcmEvent } from '$lib/ical';
import { parse } from '$lib/ical';
import { DEBUG } from '$lib/constants';
import { events as SAMPLE_EVENTS } from '../../routes/events/_testdata/events';

// Constants
const caching = false; // Make this false to disable server-side caching in development.
const expirationTimeout = 1e3 * 60 * 1; // Fetch updates every 1 minute.
const ICAL_TARGET_URL =
  'https://calendar.google.com/calendar/ical/738lnit63cr2lhp7jtduvj0c9g%40group.calendar.google.com/public/basic.ics';

// Globals
let eventExpirationTimestamp = 0;
let events: AcmEvent[] = [];

async function setCache(timestamp: number): Promise<AcmEvent[]> {
  const data = await fetch(ICAL_TARGET_URL).then((response) => response.text());
  events = parse(data, { maxEvents: DEBUG ? 10 : undefined });

  if (DEBUG && events.length === 0) {
    events = SAMPLE_EVENTS as AcmEvent[];
  }

  eventExpirationTimestamp = timestamp + expirationTimeout;
  return events;
}

async function getCache() {
  const now = Date.now();
  if (caching && eventExpirationTimestamp > now) {
    return events;
  }
  return await setCache(now);
}

export async function get(): Promise<RequestHandlerOutput> {
  return new Response(JSON.stringify(await getCache()), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
