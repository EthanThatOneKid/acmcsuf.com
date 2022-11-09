import * as RRule from 'rrule/dist/es5/rrule.min.js';
import { Temporal } from '@js-temporal/polyfill';
import { TEAMS } from '$lib/public/board/data';
import { parseBool } from '$lib/server/parse-bool/parse-bool';
import type { ClubEvent } from '$lib/public/events/event';

export interface ICALParseOptions {
  filterBefore?: boolean;
  referenceDate?: Temporal.ZonedDateTime;
  maxEvents?: number;
}

export function parse(rawICAL: string, options?: ICALParseOptions): ClubEvent[] {
  const events: ClubEvent[] = [];

  const refDate = options?.referenceDate ?? Temporal.Now.zonedDateTimeISO('America/Los_Angeles');
  const filterBefore = options?.filterBefore !== undefined ? options.filterBefore : true;

  for (const icalEvent of walkICAL(rawICAL)) {
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

export interface ICALResolvable {
  [k: string | number]: ICALResolvable | ICALResolvable[] | string;
}

/**
 * The code in this function is derived from
 * <https://github.com/adrianlee44/ical2json>.
 * @param rawICAL The raw calendar data in ICAL format.
 * @returns The parsed ICAL data.
 */
export function* walkICAL(rawICAL: string) {
  const output: ICALResolvable = {};
  const lines = rawICAL.split(/\r\n|\n|\r/);
  const parents: ICALResolvable[] = [];
  let parent: ICALResolvable = {};
  let current = output;
  let currentKey = '';

  for (const line of lines) {
    let currentValue = '';
    if (line.charAt(0) === ' ') {
      current[currentKey] += line.substring(1);
    } else {
      const splitAt = line.indexOf(':');
      if (splitAt < 0) {
        continue;
      }
      currentKey = ((key: string) => {
        if (key.startsWith('DTSTART')) return 'DTSTART';
        if (key.startsWith('DTEND')) return 'DTEND';
        return key;
      })(line.substring(0, splitAt));
      currentValue = line.substring(splitAt + 1);
      switch (currentKey) {
        case 'BEGIN': {
          parents.push(parent);
          parent = current;
          if (parent[currentValue] == null) {
            parent[currentValue] = [];
          }
          // Create a new object, store the reference for future uses.
          current = {};
          (parent[currentValue] as ICALResolvable[]).push(current);
          break;
        }
        case 'END': {
          current = parent;
          parent = parents.pop() as ICALResolvable;
          break;
        }
        default: {
          if (current[currentKey]) {
            if (!Array.isArray(current[currentKey])) {
              current[currentKey] = [current[currentKey]] as ICALResolvable[];
            }
            (current[currentKey] as ICALResolvable[]).push(
              currentValue as unknown as ICALResolvable
            );
          } else {
            (current[currentKey] as string) = currentValue;
          }
        }
      }
    }
  }

  for (const icalEvent of (output['VCALENDAR'][0] as ICALResolvable)[
    'VEVENT'
  ] as ICALResolvable[]) {
    yield icalEvent;
  }
}

export function parseRRULE(rawRRULE: string): boolean {
  if (rawRRULE === undefined) return false;

  try {
    const recurrence = RRule.fromString(rawRRULE);
    return recurrence.isFullyConvertibleToText();
  } catch {
    return false;
  }
}

export function makeEventSlug(title: string, date: Temporal.ZonedDateTime): string {
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

export function makeEventLink(slug?: string, baseURL = 'https://acmcsuf.com/events') {
  if (slug === undefined) return baseURL;
  return baseURL + '#' + slug;
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

export function produceSummary(title: string, description: string, selfLink: string): string {
  return description.length > 0
    ? [title, '='.repeat(title.length), '', ...wrapText(description), '', selfLink].join('\n')
    : title + ' — ' + selfLink;
}

export function replaceHtmlLinkTargets(html: string, withTarget = '_blank'): string {
  return html.replace(/<a\W.*?href=".*?".*?>/gm, (match: string): string => {
    match = match.replace(/target=".*?"\W*/gm, '');
    return match.slice(0, match.length - 1) + ` target="${withTarget}">`;
  });
}

export function parseDescription(
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

export function thirdPartyCalendarDateTimeFromZonedDateTime(
  dt: Temporal.ZonedDateTimeLike
): string {
  const yyyyMMdd = [dt.year, dt.month, dt.day].map((d) => Number(d).toString().padStart(2, '0'));
  const hhMMss = [dt.hour, dt.minute, dt.day].map((d) => Number(d).toString().padStart(2, '0'));
  const yyyyMMddThhMMss = `${yyyyMMdd.join('')}T${hhMMss.join('')}`;
  return yyyyMMddThhMMss;
}

export function makeGoogleCalendarLink(
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

export function parseLocation(
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

export function zonedDateTimeFromICALDateTime(
  dtICAL: string,
  timeZone: Temporal.TimeZoneLike
): Temporal.ZonedDateTime {
  const options: Temporal.ZonedDateTimeLike = {
    year: Number(dtICAL.slice(0, 4)),
    month: Number(dtICAL.slice(4, 6)),
    day: Number(dtICAL.slice(6, 8)),
    hour: Number(dtICAL.slice(9, 11)),
    minute: Number(dtICAL.slice(11, 13)),
    second: Number(dtICAL.slice(13, 15)),
  };

  // dtICAL is in terms of +00:00 when 'Z' is present
  if (dtICAL[15] === 'Z') {
    options.timeZone = Temporal.TimeZone.from('+00:00');
    return Temporal.ZonedDateTime.from(options).withTimeZone(timeZone);
  }

  // dtICAL is often already in terms of our desired timeZone
  return Temporal.PlainDateTime.from(options).toZonedDateTime(timeZone);
}

export function makeClubEvent(
  icalEvent: Record<string, string>,
  referenceDate: Temporal.ZonedDateTime
): ClubEvent | null {
  if (icalEvent['DTSTART'] === undefined || icalEvent['DTEND'] === undefined) {
    return null;
  }

  const title =
    icalEvent['SUMMARY'] !== undefined ? icalEvent['SUMMARY'].replace(/\\/g, '') : 'Unnamed Event';

  const recurring = parseRRULE(icalEvent['RRULE']);

  const dtStart = zonedDateTimeFromICALDateTime(icalEvent['DTSTART'], referenceDate.timeZone);
  const dtEnd = zonedDateTimeFromICALDateTime(icalEvent['DTEND'], referenceDate.timeZone);
  const date = dtStart.toString();
  const month = dtStart.toLocaleString('en-US', { month: 'long' });
  const day = dtStart.day;

  const startTime = dtStart.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
  const endTime = dtEnd.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });

  const hasStarted = Temporal.ZonedDateTime.compare(referenceDate, dtStart) >= 0;
  const hasEnded = Temporal.ZonedDateTime.compare(referenceDate, dtEnd) >= 0;
  const duration = dtEnd.since(dtStart).minutes + ' minutes';

  const { description, variables } = parseDescription(icalEvent['DESCRIPTION']);

  const { location, meetingLink } = parseLocation(
    icalEvent['LOCATION'],
    variables.get('ACM_LOCATION')
  );

  const isPinned = parseBool(variables.get('ACM_PINNED'));

  const slug = makeEventSlug(title, dtStart);

  const selfLink = makeEventLink(slug);

  const summary = produceSummary(title, description, selfLink);

  /**
   * Team ID hosting the event is stored in the description. If it's not there,
   * it's a "general" event.
   *
   * We check the variable name `ACM_TEAM` first, then fall back to `ACM_PATH` which is deprecated.
   * We expect new events to use `ACM_TEAM` and ancient events to use `ACM_PATH`.
   */
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
    date,
    hasStarted,
    hasEnded,
    isPinned,
    duration,
    location,
    title,
    summary,
    description,
    meetingLink,
    slug,
    selfLink,
    recurring,
    team,
    calendarLinks,
  };
}
