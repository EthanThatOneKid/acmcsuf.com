import { Temporal } from '@js-temporal/polyfill';
import { TEAMS } from '$lib/public/board/data';
import type { ClubEvent } from '$lib/public/events/event';
import { google } from 'googleapis';
import { config } from 'dotenv';
import { destroy_each } from 'svelte/internal';

export interface ICALParseOptions {
  filterBefore?: boolean;
  referenceDate?: Temporal.ZonedDateTime;
  maxEvents?: number;
}

export async function fromGCal(
  events: GCalEvent[],
  options?: ICALParseOptions
): Promise<ClubEvent[]> {
  var sortedEvents = [];
  const refDate = options?.referenceDate ?? Temporal.Now.zonedDateTimeISO('America/Los_Angeles');

  for (const event of events) {
    const clubEvent = makeClubEvent(event, refDate);
    if (clubEvent !== null) {
      sortedEvents.push(clubEvent);
    }
  }

  // serve a set amount of events when in debug mode
  // @see <https://etok.codes/acmcsuf.com/pull/329>
  if (options?.maxEvents) {
    const eventsAmt = options.maxEvents ?? 5;
    return sortedEvents.slice(0, eventsAmt);
  }

  return sortedEvents;
}

function makeClubEvent(event: GCalEvent, refDate: Temporal.ZonedDateTime): ClubEvent | null {
  if (
    event.summary == undefined ||
    event.location == undefined ||
    event.start?.timeZone == undefined ||
    event.start.dateTime == undefined ||
    event.end?.timeZone == undefined ||
    event.end.dateTime == undefined ||
    event.description == undefined
  ) {
    return null;
  }

  const dtStart = zonedDateTimeFromICALDateTime(new Date(event.start.dateTime), refDate.timeZone);
  const dtEnd = zonedDateTimeFromICALDateTime(new Date(event.end.dateTime), refDate.timeZone);
  const date = dtStart.toString();
  const month = dtStart.toLocaleString('en-US', { month: 'long' });
  const day = dtStart.day;
  const startTime = dtStart.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
  const endTime = dtEnd.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
  const hasStarted = Temporal.ZonedDateTime.compare(refDate, dtStart) >= 0;
  const hasEnded = Temporal.ZonedDateTime.compare(refDate, dtEnd) >= 0;

  const { location, meetingLink } = parseLocation(event.location);
  const title = event.summary;
  const { description, variables } = parseDescription(event.description);
  const id = makeEventId(title, dtStart);
  const selfLink = makeEventLink(id);
  const recurring = event.recurringEventId != null;
  const summary = produceSummary(title, description, selfLink);
  console.log(description);
  const teamId = (variables.get('ACM_TEAM') ?? variables.get('ACM_PATH'))?.toLowerCase().trim();

  let team = TEAMS.general;
  switch (teamId) {
    case 'ai': {
      team = TEAMS.ai;
      break;
    }
    case 'algo': {
      team = TEAMS.algo;
      break;
    }
    case 'design': {
      team = TEAMS.design;
      break;
    }
    case 'dev': {
      team = TEAMS.dev;
      break;
    }
    case 'special-events': {
      team = TEAMS['special-events'];
      break;
    }
  }

  const thirdPartyCalendarLocation = location === 'Discord' ? selfLink : location;
  const thirdPartyCalendarArgs = [
    title,
    summary,
    thirdPartyCalendarLocation,
    dtStart,
    dtEnd,
  ] as const;

  const calendarLinks = {
    google: makeGoogleCalendarLink(...thirdPartyCalendarArgs).toString(),
    outlook: makeOutlookCalendarLink(...thirdPartyCalendarArgs).toString(),
  };

  return {
    month,
    day,
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

function parseDescription(
  content?: string,
  varPrefix = 'ACM_'
): {
  description: string;
  variables: Map<string, string>;
} {
  if (content === undefined) return { description: '', variables: new Map() };

  const variables = new Map<string, string>();
  
  let description = content.replace(/\\n/g, '<br>');
  
  // Extract variables from the description until there are no more.
  while (description.includes(varPrefix)) {
    const start = description.indexOf(varPrefix);
    const nextTag = description.indexOf('<', start);
    const end =
      nextTag > -1
        ? nextTag // Stop at next HTML tag (e.g. '<br>')
        : description.length; // Or stop at end of string

    const variable = description.substring(start, end);

    const splitAt = variable.indexOf('=');
    const key = variable.substring(0, splitAt).trim();
    const value = variable.substring(splitAt + 1);

    variables.set(key, value);
    description = (description.substring(0, start) + description.substring(end)).trim();
  }
  
  description = replaceHtmlLinkTargets(description);

  return { description, variables };
}

function replaceHtmlLinkTargets(html: string, withTarget = '_blank'): string {
  return html.replace(/<a\W.*?href=".*?".*?>/gm, (match: string): string => {
    match = match.replace(/target=".*?"\W*/gm, '');
    return match.slice(0, match.length - 1) + ` target="${withTarget}">`;
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

function thirdPartyCalendarDateTimeFromZonedDateTime(dt: Temporal.ZonedDateTimeLike): string {
  const yyyyMMdd = [dt.year, dt.month, dt.day].map((d) => Number(d).toString().padStart(2, '0'));
  const hhMMss = [dt.hour, dt.minute, dt.day].map((d) => Number(d).toString().padStart(2, '0'));
  const yyyyMMddThhMMss = `${yyyyMMdd.join('')}T${hhMMss.join('')}`;
  return yyyyMMddThhMMss;
}

function makeEventLink(slug?: string, baseURL = 'https://acmcsuf.com/events') {
  if (slug === undefined) return baseURL;
  return baseURL + '#' + slug;
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
  startTime: Temporal.ZonedDateTime,
  endTime: Temporal.ZonedDateTime
) {
  const url = new URL('https://calendar.google.com/calendar/render');

  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', title);
  url.searchParams.set('details', summary);
  url.searchParams.set('location', location);

  const dateOne = thirdPartyCalendarDateTimeFromZonedDateTime(startTime);
  const dateTwo = thirdPartyCalendarDateTimeFromZonedDateTime(endTime);
  url.searchParams.set('dates', dateOne + '/' + dateTwo);

  return url;
}

export function makeOutlookCalendarLink(
  title: string,
  summary: string,
  location: string,
  dtStart: Temporal.ZonedDateTime,
  dtEnd: Temporal.ZonedDateTime
) {
  const url = new URL('https://outlook.live.com/calendar/0/deeplink/compose');

  url.searchParams.set('path', '/calendar/action/compose');
  url.searchParams.set('rru', 'addevent');
  url.searchParams.set('startdt', thirdPartyCalendarDateTimeFromZonedDateTime(dtStart));
  url.searchParams.set('enddt', thirdPartyCalendarDateTimeFromZonedDateTime(dtEnd));
  url.searchParams.set('subject', title);
  url.searchParams.set('body', summary);
  url.searchParams.set('location', location);

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

function zonedDateTimeFromICALDateTime(
  gcalDate: Date,
  timeZone: Temporal.TimeZoneLike
): Temporal.ZonedDateTime {
  const dtICAL = gcalDate.toISOString();

  const options: Temporal.ZonedDateTimeLike = {
    year: Number(dtICAL.slice(0, 4)),
    month: Number(dtICAL.slice(5, 7)),
    day: Number(dtICAL.slice(8, 10)),
    hour: Number(dtICAL.slice(11, 13)),
    minute: Number(dtICAL.slice(14, 16)),
    second: Number(dtICAL.slice(18, 20)),
  };

  // dtICAL is in terms of +00:00 when 'Z' is present
  if (dtICAL.at(-1) === 'Z') {
    options.timeZone = Temporal.TimeZone.from('+00:00');
    return Temporal.ZonedDateTime.from(options).withTimeZone(timeZone);
  }

  // dtICAL is often already in terms of our desired timeZone
  return Temporal.PlainDateTime.from(options).toZonedDateTime(timeZone);
}

export async function listUpcomingEvents() {
  config();
  const calendar = google.calendar({
    version: 'v3',
    auth: process.env.GCAL_API_KEY,
  });
  return await calendar.events.list({
    calendarId: '738lnit63cr2lhp7jtduvj0c9g@group.calendar.google.com',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    showDeleted: false,
  });
}

export type GCalEvent = Exclude<
  Awaited<ReturnType<typeof listUpcomingEvents>>['data']['items'],
  undefined
>[number];
