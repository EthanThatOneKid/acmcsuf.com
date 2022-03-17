import { Time, ACM_LOCALE } from '$lib/constants/time';
import { acmAlgo, acmCreate, acmDev, acmGeneral } from '$lib/constants/acm-paths';
import type { IcalOutput, AcmEvent } from './common';
import {
  parseRawIcal,
  parseDescription,
  computeIcalDatetime,
  slugifyEvent,
  makeEventLink,
  checkForRecurrence,
  sortByDate,
  filterIfPassed,
  cleanTitle,
  produceSummary,
  makeCalendarLink,
} from './common';

export function parse(icalData: string): AcmEvent[] {
  const now = Date.now();
  const output = parseRawIcal(icalData);

  const events = output['VCALENDAR'][0]['VEVENT']
    .reduce((collection: AcmEvent[], event: IcalOutput) => {
      if (event['DTSTART'] === undefined || event['DTEND'] === undefined) {
        return collection;
      }

      const recurring = checkForRecurrence(String(event['RRULE']));
      const date = computeIcalDatetime(event);
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

      const item: AcmEvent = {
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

      collection.push(item);

      return collection;
    }, [])
    .filter(filterIfPassed(now, Time.Day / 2)) // Comment out this filter statement to show a longer list of events for testing purposes.
    .sort(sortByDate());

  return events;
}

export type { AcmEvent };
