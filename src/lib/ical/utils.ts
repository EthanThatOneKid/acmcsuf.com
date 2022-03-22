// import { Time, ACM_LOCALE } from '$lib/constants/time';
import *as RRule from 'rrule/dist/es5/rrule.min.js';
import { Temporal } from '@js-temporal/polyfill';
import { acmAlgo, acmCreate, acmDev, acmGeneral } from '$lib/constants/acm-paths';
// import type { IcalOutput, AcmEvent } from './common';
// import {
//   parseRawIcal,
//   parseDescription,
//   computeIcalDatetime,
//   slugifyEvent,
//   makeEventLink,
//   checkForRecurrence,
//   sortByDate,
//   filterIfPassed,
//   walkICAL,
//   makeAcmEvent,
//   cleanTitle,
//   produceSummary,
//   makeCalendarLink,
// } from './common';
import type { AcmPath } from '$lib/constants/acm-paths';

export interface AcmEvent {
  date: Date;
  month: string;
  day: number;
  time: string;
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
    outlook: string;
  };
}

export type ICALResolvable = string | string[] | ICALResolvable[] | { [k: string]: ICALResolvable };

export interface ICALParseOptions {
  referenceDate?: Date;
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
      console.log({ parents, parent, current, currentKey });
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

    return output;
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

  export function makeAcmEvent(icalEvent: ICALResolvable): AcmEvent | null {
    if (icalEvent['DTSTART'] === undefined || icalEvent['DTEND'] === undefined) {
      return null;
    }

    const recurring = parseRRULE(String(icalEvent['RRULE']));
    const date = computeIcalDatetime(icalEvent);
    const year = date.toLocaleString(ACM_LOCALE, { year: 'numeric' });
    const month = date.toLocaleString(ACM_LOCALE, { month: 'long' });
    const day = date.getDate();
    const time = date.toLocaleTimeString(ACM_LOCALE, { hour: 'numeric', minute: 'numeric' });

    const title = cleanTitle(String(event['SUMMARY']));
    const slug = slugifyEvent(title, year, month, day);
    const selfLink = makeEventLink(slug);
    const rawDescription = String(event['DESCRIPTION']);
    const { description, variables } = parseDescription(rawDescription);
    const summary = produceSummary(title, description, selfLink);

    const rawLocation = String(event['LOCATION']);
    const isZoomMeeting = rawLocation.startsWith('https://fullerton.zoom.us');
    const customLocationName = variables.get('ACM_LOCATION') ?? rawLocation;
    const location = isZoomMeeting ? 'Zoom' : customLocationName;
    const meetingLink = isZoomMeeting
      ? rawLocation
      : location.startsWith('https://')
      ? location
      : '/discord';

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

    const calendarLinks = (['google', 'outlook'] as const).reduce((links, service) => {
      links[service] = makeCalendarLink(service, title, description, selfLink, date);
      return links;
    }, {} as AcmEvent['calendarLinks']);

    const item = {
      month,
      day,
      time,
      location,
      title,
      summary,
      description,
      meetingLink,
      date,
      slug,
      selfLink,
      recurring,
      acmPath,
      calendarLinks,
    };
  }

  export function parse(rawICAL: string, options?: ICALParseOptions): AcmEvent[] {
    const acmEvents: AcmEvent = [];

    for (const icalEvent of walkICAL(rawICAL)) {
      const acmEvent = makeAcmEvent(icalEvent);
      acmEvents.push(acmEvent);
    }

    return acmEvents;
  }

  const output = parseRawIcal(icalData);

  const allEvents = output['VCALENDAR'][0]['VEVENT'].reduce(
    (collection: AcmEvent[], event: IcalOutput) => {
      collection.push(item);

      return collection;
    },
    []
  );

  const sortedEvents = allEvents.sort(sortByDate());

  // Show sample events in debug mode
  if (maxEvents !== undefined) {
    return sortedEvents.slice(sortedEvents.length - maxEvents);
  }

  // Filter out events that have passed if not in debug mode
  return sortedEvents.filter(filterIfPassed(now, Time.Day / 2));
}

export type { AcmEvent };
