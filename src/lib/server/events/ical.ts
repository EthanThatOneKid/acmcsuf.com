import { TEAMS } from '$lib/public/board/data';
import { Temporal } from '@js-temporal/polyfill';
import * as ical from 'node-ical';
import knownICS from './data/known-ics';
import type { Team } from '$lib/public/board/types';
import type { ClubEvent } from '$lib/public/events/event';

import {
  parseLocation,
  makeEventLink,
  produceSummary,
  makeGoogleCalendarLink,
  makeOutlookCalendarLink,
} from './event';

async function downloadOneICS(url: string) {
  const ics = await fetch(url).then((res) => res.text());
  return ical.sync.parseICS(ics);
}

// Download and parse the ICS files from the given URLs. All events are merged
// into a single calendar.
export async function downloadICS(urls: string[]): Promise<ical.CalendarResponse> {
  const icses = await Promise.all(urls.map(downloadOneICS));
  const calendar: ical.CalendarResponse = {};
  for (const ics of icses) {
    Object.assign(calendar, ics);
  }
  return calendar;
}

// Download and parse the ICS files from the known URLs. All events are merged
// into a single calendar.
export async function downloadKnownICS(): Promise<ical.CalendarResponse> {
  return downloadICS(knownICS);
}

export type ExtendedClubEvent = ClubEvent & {
  dtStart: Temporal.ZonedDateTime;
  dtEnd: Temporal.ZonedDateTime;
};

export function fromICal(calendar: ical.CalendarResponse, timezone: string): ClubEvent[] {
  const events: ExtendedClubEvent[] = [];
  const refDate = Temporal.Now.zonedDateTimeISO(timezone);
  for (const uid in calendar) {
    const event = calendar[uid];
    if (event.type != 'VEVENT') {
      continue;
    }
    const clubEvent = makeClubEvent(uid, event, refDate);
    if (clubEvent) {
      events.push(clubEvent);
    }
  }
  events.sort((a, b) => Temporal.ZonedDateTime.compare(a.dtStart, b.dtStart));
  return events;
}

function toTemporalDateTime(date: ical.DateWithTimeZone): Temporal.ZonedDateTime {
  return Temporal.Instant.fromEpochMilliseconds(date.getTime()).toZonedDateTimeISO(date.tz);
}

function makeClubEvent(
  uid: string,
  event: ical.VEvent,
  refDate: Temporal.ZonedDateTime
): ExtendedClubEvent | null {
  console.log('evnet starts at', event.start, event.summary);

  const tz = refDate.getTimeZone();
  const dtStart = toTemporalDateTime(event.start).withTimeZone(tz);
  const dtEnd = toTemporalDateTime(event.end).withTimeZone(tz);

  const date = dtStart.toString();
  const month = dtStart.toLocaleString('en-US', { month: 'long' });
  const day = dtStart.day;

  const startTime = dtStart
    .toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })
    .replace(' ', ' ');
  const endTime = dtEnd
    .toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })
    .replace(' ', ' ');

  const hasStarted = Temporal.ZonedDateTime.compare(refDate, dtStart) >= 0;
  const hasEnded = Temporal.ZonedDateTime.compare(refDate, dtEnd) >= 0;

  const { location, meetingLink } = parseLocation(event.location);
  const title = event.summary ?? 'TBD';
  const description = event.description ?? '';
  const id = 'ical-' + uid;
  const selfLink = makeEventLink(id);
  const recurring = false; // currently unsupported by Discord
  const summary = produceSummary(title, description, selfLink);
  const team = guessTeam(summary);

  const makeCalendarArgs = [title, summary, location, dtStart, dtEnd] as const;
  const calendarLinks = {
    google: makeGoogleCalendarLink(...makeCalendarArgs).toString(),
    outlook: makeOutlookCalendarLink(...makeCalendarArgs).toString(),
  };

  return {
    month,
    day,
    dtStart,
    dtEnd,
    startTime,
    endTime,
    hasStarted,
    hasEnded,
    date,
    location,
    title,
    description,
    summary,
    meetingLink,
    id,
    selfLink,
    recurring,
    team,
    calendarLinks,
  };
}

const prefixMap = {
  AI: TEAMS.ai,
  Algo: TEAMS.algo,
  Design: TEAMS.design,
  Dev: TEAMS.dev,
  ICPC: TEAMS.icpc,
  'Game Dev': TEAMS.gamedev,
};

function guessTeam(summary: string): Team {
  for (const [prefix, team] of Object.entries(prefixMap)) {
    if (summary.startsWith(prefix + ' ')) {
      return team;
    }
  }
  return TEAMS.general;
}
