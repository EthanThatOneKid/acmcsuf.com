import RRule from 'rrule';
import type { CalendarEvent } from '$lib/calendar-link';
import * as calendarLink from '$lib/calendar-link';
import type { AcmPath } from '$lib/constants/acm-paths';

export interface AcmEvent {
  date: Date;
  month: string;
  day: number;
  time: string;
  location: string;
  summary: string;
  description: string;
  meetingLink: string;
  slug: string;
  selfLink: string;
  recurring: boolean;
  acmPath: AcmPath;
  calendarLinks: {
    google: string;
    outlook: string;
  };
}

export interface IcalOutput {
  [key: string]: string | string[] | IcalOutput[];
}

function cleanIcalKey(key: string): string {
  if (key.startsWith('DTSTART')) return 'DTSTART';
  if (key.startsWith('DTEND')) return 'DTEND';
  return key;
}

/**
 * Checks to see if the given date is observing daylight savings time.
 * @param date The date to be checked
 * @returns true if the date observes daylight savings time, false otherwise.
 * @see https://stackoverflow.com/a/30280636
 */
function checkDateObservesDST(date: Date): boolean {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset()) > date.getTimezoneOffset();
}

/**
 * The code in this function is derived from
 * https://github.com/adrianlee44/ical2json.
 * @param source The raw calendar data in ICAL format.
 * @returns The parsed ICAL data.
 */
export function parseRawIcal(source: string): IcalOutput {
  const output: IcalOutput = {};
  const lines = source.split(/\r\n|\n|\r/);
  const parents: IcalOutput[] = [];
  let parent: IcalOutput = {};
  let current: IcalOutput = output;
  let currentKey = '';

  for (const line of lines) {
    let currentValue = '';
    if (line.charAt(0) === ' ') {
      current[currentKey] += line.substr(1);
    } else {
      const splitAt = line.indexOf(':');
      if (splitAt < 0) {
        continue;
      }
      currentKey = cleanIcalKey(line.substr(0, splitAt));
      currentValue = line.substr(splitAt + 1);
      switch (currentKey) {
        case 'BEGIN': {
          parents.push(parent);
          parent = current;
          if (parent[currentValue] == null) {
            parent[currentValue] = [];
          }
          // Create a new object, store the reference for future uses.
          current = {};
          (parent[currentValue] as IcalOutput[]).push(current);
          break;
        }
        case 'END': {
          current = parent;
          parent = parents.pop() as IcalOutput;
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

  return output;
}

/**
 * This function parses the raw ICAL datetime string into a Date object.
 * @param datetime Example: October 31st, 2021 = "20211031T000000"
 * @returns The parsed Date object.
 */
function parseRawIcalDatetime(datetime: string): Date {
  const fullYear = datetime.slice(0, 4);
  const month = datetime.slice(4, 6);
  const day = datetime.slice(6, 8);
  const hours = datetime.slice(9, 11);
  const minutes = datetime.slice(11, 13);
  const seconds = datetime.slice(13, 15);

  const date = new Date();
  date.setFullYear(Number(fullYear), Number(month) - 1, Number(day));

  // The timezone determines how many hours the date is relative of UTC.
  const observingDST = checkDateObservesDST(date);
  const tzHoursOffset = observingDST ? -7 : -8; // PST
  date.setHours(Number(hours) + tzHoursOffset, Number(minutes), Number(seconds));

  return date;
}

export function computeIcalDatetime(event: IcalOutput): Date {
  const rawDatetime = event['DTSTART'];
  const rawRrule = event['RRULE'];

  if (rawRrule !== undefined) {
    try {
      const ruleSrc = `DTSTART:${rawDatetime}Z\nRRULE:${rawRrule}`;
      const recurrence = RRule.fromString(ruleSrc);
      const date = recurrence.after(new Date());
      date.setHours(date.getHours());
      return date;
      // eslint-disable-next-line no-empty
    } catch {}
  }
  return parseRawIcalDatetime(rawDatetime as string);
}

export function slugifyEvent(summary: string, year: string, month: string, day: number): string {
  const cleanedSummary = summary.replace(/[^\w\s_]/g, '').replace(/(\s|-|_)+/g, '-');
  const slug = [cleanedSummary, year, month, day].join('-').toLowerCase();
  return slug;
}

export function checkForRecurrence(raw?: string): boolean {
  if (raw === undefined) return false;

  try {
    const recurrence = RRule.fromString(raw);
    return recurrence.isFullyConvertibleToText();
    // eslint-disable-next-line no-empty
  } catch {}

  return false;
}

export interface AcmEventDescription {
  description: string;
  variables: Map<string, string>;
}

export function parseDescription(content: string, varPrefix = 'ACM_'): AcmEventDescription {
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
    description = description.substring(0, start) + description.substring(end);
  }

  return { description, variables };
}

export function sortByDate(): (a: { date: Date }, b: { date: Date }) => 1 | -1 {
  return ({ date: date1 }, { date: date2 }) => (date1.valueOf() > date2.valueOf() ? 1 : -1);
}

export function filterIfPassed(now: number, offset = 0) {
  return ({ date }: { date: Date }): boolean => date.valueOf() + offset > now;
}

export function cleanSummary(summary?: string): string {
  if (summary === undefined) return 'Unnamed Event';

  return summary.replace(/\\/g, '');
}

export function makeEventLink(slug: string): string {
  return 'https://acmcsuf.com/events' + '#' + slug;
}

export function makeCalendarLink(
  type: 'google' | 'outlook' | 'office365' | 'yahoo',
  summary: string,
  description: string,
  selfLink: string,
  date: Date
): string {
  const options: CalendarEvent = {
    title: summary,
    description: description.length > 0 ? `${description}\n\n${selfLink}` : selfLink,
    start: date,
    duration: [2, 'hour'],
  };

  switch (type) {
    case 'google': {
      return calendarLink.google(options);
    }
    case 'outlook': {
      return calendarLink.outlook(options);
    }
    case 'office365': {
      return calendarLink.office365(options);
    }
    case 'yahoo': {
      return calendarLink.yahoo(options);
    }
    default: {
      return '';
    }
  }
}
