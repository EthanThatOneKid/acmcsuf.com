// import { Time, ACM_LOCALE } from '$lib/constants/time';
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

export interface ICALParseOptions {
  referenceDate?: Date;
  maxEvents?: number;
}

export function makeAcmEvent(icalEvent: ICALOutput): AcmEvent|null {
  if (icalEvent['DTSTART'] === undefined || icalEvent['DTEND'] === undefined) {
    return null;
  }

  const recurring = checkForRecurrence(String(icalEvent['RRULE']));
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

  const item:  = {
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
