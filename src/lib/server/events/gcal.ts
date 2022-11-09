import * as RRule from 'rrule/dist/es5/rrule.min.js';
import { Temporal } from '@js-temporal/polyfill';
import { TEAMS } from '$lib/public/board/data';
import { parseBool } from '$lib/server/parse-bool/parse-bool';
import type { ClubEvent } from '$lib/public/events/event';
import { google } from 'googleapis';

export interface ICALParseOptions {
  filterBefore?: boolean;
  referenceDate?: Temporal.ZonedDateTime;
  maxEvents?: number;
}

export async function fromGCal(events: GCalEvent[]): Promise<ClubEvent[]> {
  for (const event of events) {
    const event = makeClubEvent(icalEvent as { [k: string]: string }, refDate);

    // skip events that have already ended (except when in debug mode)
    if (!event || (filterBefore && event.hasEnded)) {
      continue;
    }

    events.push(event);
  }

  const sortedEvents = events.sort((one, two) =>
    Temporal.ZonedDateTime.compare(one.date, two.date)
  );

  // serve a set amount of events when in debug mode
  // @see <https://etok.codes/acmcsuf.com/pull/329>
  if (options?.maxEvents) {
    const eventsAmt = options.maxEvents ?? 5;
    return sortedEvents.slice(0, eventsAmt);
  }

  return sortedEvents;
}

function makeClubEvent(event: GCalEvent) {
  const month = event.start?.date?.substring(5, 7) ?? '';
  const day = event.start?.date?.substring(9) ?? '';
  const start = new Date(event.start?.dateTime ?? '');
  const end = new Date(event.end?.dateTime ?? '');
  const title = event.summary;

  if (title != null && event.location != null) {
    const id = makeEventId(title, start);
    const selfLink = makeEventLink(id);
    const { location, meetingLink } = parseLocation(event.location);
    const summary = produceSummary(title, description, selfLink);
  }
  
  const clubEvent = {
    month,
    day,
    startTime: start,
    endTime: end,
    hasStarted: start > new Date(),
    hasEnded: end > new Date(),
    date: start.toDateString(),
    location: location,
    title: ,
    description: event.description,
    summary: string, // make func plz
    meetingLink: meetingLink,
    id: string,
    selfLink: makeEventLink(),
    recurring: boolean,
    team: Team,
    calendarLinks: {
      google: string,
      outlook: string,
    };
  };  
}

async function listUpcomingEvents() {
  const calendar = google.calendar({version: 'v3', auth: 'AIzaSyBiRLf9k54vpJD83KE2HosoLEiP7TIg7To'});
  return await calendar.events.list({
    calendarId: '738lnit63cr2lhp7jtduvj0c9g@group.calendar.google.com',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    showDeleted: false,
  });
}

function parseLocation(
  rawLocation?: string,
  defaultLocation = 'TBD',
  defaultLink = '/discord'
): { location: string; meetingLink: string } {
  rawLocation = rawLocation?.trim() ?? '';

  if (rawLocation.includes('zoom.us')) {
    return { location: 'Zoom', meetingLink: rawLocation };
  }

  if (rawLocation.startsWith('https://')) {
    return { location: defaultLocation, meetingLink: rawLocation };
  }

  if (rawLocation.length > 0) {
    return { location: rawLocation, meetingLink: defaultLink };
  }

  return { location: defaultLocation, meetingLink: defaultLink };
}

function makeEventLink(slug?: string, baseURL = 'https://acmcsuf.com/events') {
  if (slug === undefined) return baseURL;
  return baseURL + '#' + slug;
}

function thirdPartyCalendarDateTimeFromZonedDateTime(
  dt: Temporal.ZonedDateTimeLike
): string {
  const yyyyMMdd = [dt.year, dt.month, dt.day].map((d) => Number(d).toString().padStart(2, '0'));
  const hhMMss = [dt.hour, dt.minute, dt.day].map((d) => Number(d).toString().padStart(2, '0'));
  const yyyyMMddThhMMss = `${yyyyMMdd.join('')}T${hhMMss.join('')}`;
  return yyyyMMddThhMMss;
}

function makeEventId(title: string, date: Temporal.ZonedDateTime): string {
  const normalizedTitle = title.replace(/[^\w\s-_]/g, '').replace(/(\s|-|_)+/g, '-');
  return [
    normalizedTitle,
    date.year,
    date.toLocaleString('en-US', { month: 'long' }).toLowerCase(),
    date.day,
  ]
    .join('-')
    .toLowerCase();
}

function makeGoogleCalendarLink(
  title: string,
  summary: string,
  location: string,
  dtStart: Temporal.ZonedDateTime,
  dtEnd: Temporal.ZonedDateTime
) {
  const url = new URL('https://calendar.google.com/calendar/render');

  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', title);
  url.searchParams.set('details', summary);
  url.searchParams.set('location', location);

  const dateOne = thirdPartyCalendarDateTimeFromZonedDateTime(dtStart);
  const dateTwo = thirdPartyCalendarDateTimeFromZonedDateTime(dtEnd);
  url.searchParams.set('dates', dateOne + '/' + dateTwo);

  return url;
}

function produceSummary(title: string, description: string, selfLink: string): string {
  return description.length > 0
    ? [title, '='.repeat(title.length), '', ...wrapText(description), '', selfLink].join('\n')
    : title + ' — ' + selfLink;
}

export function wrapText(text: string, width = 100) {
  const lines: string[] = [];

  while (text.length > width) {
    const index = text.lastIndexOf(' ', width);
    if (index === -1) {
      lines.push(text.substring(0, width));
      text = text.substring(width);
    } else {
      lines.push(text.substring(0, index));
      text = text.substring(index + 1);
    }
  }

  lines.push(text);
  return lines;
}

type GCalEvent = Exclude<Awaited<ReturnType<typeof listUpcomingEvents>>["data"]["items"], undefined>[number];