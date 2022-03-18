import type { RequestHandlerOutput } from '@sveltejs/kit/types/internal';
import type { AcmEvent } from '$lib/ical/common';
import { parse } from '$lib/ical/parse';

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
  events = parse(data);
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
