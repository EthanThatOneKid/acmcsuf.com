import * as RRule from 'rrule/dist/es5/rrule.min.js';
import { Temporal } from '@js-temporal/polyfill';
import type { AcmPath } from '$lib/constants/acm-paths';
import { acmAlgo, acmCreate, acmDev, acmGeneral } from '$lib/constants/acm-paths';
import { DEBUG } from '$lib/constants';

export interface AcmEvent {
  month: string;
  day: number;
  time: string;
  hasStarted: boolean;
  hasEnded: boolean;
  duration: string;
  date: string;
  location: string;
  title: string;
  description: string;
  summary: string;
  meetingLink: string;
  slug: string;
  selfLink: string;
  recurring: boolean;
  acmPath: AcmPath;
  calendarLinks: {
    google: string;
  };
}

export type ICALResolvable = string | string[] | ICALResolvable[] | { [k: string]: ICALResolvable };

export interface ICALParseOptions {
  referenceDate?: Temporal.ZonedDateTime;
  maxEvents?: number;
}

/**
 * The code in this function is derived from
 * <https://github.com/adrianlee44/ical2json>.
 * @param source The raw calendar data in ICAL format.
 * @returns The parsed ICAL data.
 */
export function* walkICAL(rawICAL: string) {
  const output: ICALResolvable = {};
  const lines = rawICAL.split(/\r\n|\n|\r/);
  const parents: ICALResolvable[] = [];
  let parent: ICALResolvable = {};
  let current: ICALResolvable = output;
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
              current[currentKey] = [current[currentKey]] as string[];
            }
            (current[currentKey] as string[]).push(currentValue);
          } else {
            (current[currentKey] as string) = currentValue;
          }
        }
      }
    }
  }

  for (const icalEvent of output['VCALENDAR'][0]['VEVENT'] as ICALResolvable[]) {
    yield icalEvent;
  }
}

// export function parseRRULE(rawRRULE: string): boolean {
//   if (rawRRULE === undefined) return false;

//   try {
//     const recurrence = RRule.fromString(rawRRULE);
//     return recurrence.isFullyConvertibleToText();
//   } catch {
//     return false;
//   }
// }

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

export function parseDescription(
  content?: string,
  varPrefix = 'ACM_'
): {
  description: string;
  variables: Map<string, string>;
} {
  if (content === undefined) return { description: '', variables: new Map() };

  const variables = new Map<string, string>();

  let description = content.replace(/\\n/g, '<br>').replace(/\\/g, '');

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

  return { description, variables };
}

export function makeGoogleCalendarLink(
  title: string,
  summary: string,
  selfLink: string,
  dtStart: Temporal.ZonedDateTime,
  dtEnd: Temporal.ZonedDateTime
) {
  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', title);
  url.searchParams.set('details', summary);
  url.searchParams.set('location', selfLink);
  url.searchParams.set('dates', [dtStart, dtEnd].map((d) => d.epochSeconds).join('/'));

  return url;
}

export function parseLocation(
  rawLocation?: string,
  defaultLocation = 'Discord',
  defaultLink = '/discord'
): { location: string; meetingLink: string } {
  if (rawLocation?.includes('zoom.us')) {
    return { location: 'Zoom', meetingLink: rawLocation };
  }

  if (rawLocation?.startsWith('https://')) {
    return { location: defaultLocation, meetingLink: rawLocation };
  }

  return { location: defaultLocation, meetingLink: defaultLink };
}

export function zonedDateFromICALDateTime(dtICAL: string): Temporal.ZonedDateTime {
  return Temporal.ZonedDateTime.from({
    timeZone: 'America/Los_Angeles',
    year: Number(dtICAL.slice(0, 4)),
    month: Number(dtICAL.slice(4, 6)),
    day: Number(dtICAL.slice(6, 8)),
    hour: Number(dtICAL.slice(9, 11)),
    minute: Number(dtICAL.slice(11, 13)),
    second: Number(dtICAL.slice(13, 15)),
  });
}

export function makeAcmEvent(
  icalEvent: ICALResolvable,
  referenceDate: Temporal.ZonedDateTime
): AcmEvent | null {
  if (icalEvent['DTSTART'] === undefined || icalEvent['DTEND'] === undefined) {
    return null;
  }

  const title =
    icalEvent['SUMMARY'] !== undefined ? icalEvent['SUMMARY'].replace(/\\/g, '') : 'Unnamed Event';

  const recurring = false; // parseRRULE(icalEvent['RRULE']);

  const dtStart = zonedDateFromICALDateTime(icalEvent['DTSTART']);
  const dtEnd = zonedDateFromICALDateTime(icalEvent['DTEND']);
  const date = dtStart.toString();
  const month = dtStart.toLocaleString('en-US', { month: 'long' });
  const day = dtStart.day;
  const time = dtStart.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
  const hasStarted = Temporal.PlainDateTime.compare(referenceDate, dtStart) >= 0;
  const hasEnded = Temporal.PlainDateTime.compare(referenceDate, dtEnd) >= 0;
  const duration = dtEnd.since(dtStart).minutes + ' minutes';

  const { description, variables } = parseDescription(icalEvent['DESCRIPTION']);

  const { location, meetingLink } = parseLocation(
    icalEvent['LOCATION'],
    variables.get('ACM_LOCATION')
  );

  const slug = makeEventSlug(title, dtStart);

  const selfLink = makeEventLink(slug);

  const summary = produceSummary(title, description, selfLink);

  const rawAcmPath = variables.get('ACM_PATH')?.toLowerCase();
  const acmPath =
    rawAcmPath === undefined
      ? acmGeneral
      : rawAcmPath === acmAlgo.slug
      ? acmAlgo
      : rawAcmPath === acmCreate.slug
      ? acmCreate
      : rawAcmPath === acmDev.slug
      ? acmDev
      : acmGeneral;

  const calendarLinks = {
    google: makeGoogleCalendarLink(title, summary, selfLink, dtStart, dtEnd).toString(),
  };

  return {
    month,
    day,
    time,
    date,
    hasStarted,
    hasEnded,
    duration,
    location,
    title,
    summary,
    description,
    meetingLink,
    slug,
    selfLink,
    recurring,
    acmPath,
    calendarLinks,
  };
}

export function parse(rawICAL: string, options?: ICALParseOptions): AcmEvent[] {
  const acmEvents: AcmEvent[] = [];

  const refDate =
    options.referenceDate ??
    Temporal.Now.zonedDateTimeISO(options.referenceDate?.timeZone ?? 'America/Los_Angeles');

  for (const icalEvent of walkICAL(rawICAL)) {
    const acmEvent = makeAcmEvent(icalEvent, refDate);

    // skip events that have already ended (except when in debug mode)
    if (!acmEvent.hasEnded || DEBUG) {
      acmEvents.push(acmEvent);
    }
  }

  const sortedAcmEvents = acmEvents.sort((one, two) =>
    Temporal.ZonedDateTime.compare(one.date, two.date)
  );

  // serve set amount of events in debug mode
  // @see <https://etok.codes/acmcsuf.com/pull/329>
  if (DEBUG) {
    return sortedAcmEvents.slice(-1 * (options.maxEvents ?? 5));
  }

  return sortedAcmEvents;
}
