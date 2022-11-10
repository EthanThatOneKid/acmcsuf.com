import { Temporal } from '@js-temporal/polyfill';
import type { ClubEvent } from '$lib/public/events/event';
import { calendar } from '@googleapis/calendar';
import { makeClubEvent } from './event';
import { GCAL_API_KEY, GCAL_ID } from '$lib/server/env';

export function fromGCal(events: GCalEvent[]): ClubEvent[] {
  const sortedEvents: ClubEvent[] = [];
  const refDate = Temporal.Now.zonedDateTimeISO('America/Los_Angeles');

  for (const event of events) {
    const clubEvent = makeClubEvent(event, refDate);
    if (clubEvent !== null) {
      sortedEvents.push(clubEvent);
    }
  }

  return sortedEvents;
}

export async function listUpcomingEvents() {
  const cal = calendar({
    version: 'v3',
    auth: GCAL_API_KEY,
  });
  return (
    (
      await cal.events.list({
        calendarId: GCAL_ID,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
        showDeleted: false,
      })
    )?.data?.items ?? []
  );
}

export type GCalEvent = Exclude<Awaited<ReturnType<typeof listUpcomingEvents>>, undefined>[number];
