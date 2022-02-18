import { Time, ACM_LOCALE } from '$lib/constants/time';
import type { AcmPath } from '$lib/constants/acm-paths';
import { acmAlgo, acmCreate, acmDev, acmGeneral } from '$lib/constants/acm-paths';
import type { IcalOutput } from './common';
import {
  parseRawIcal,
  parseDescription,
  computeIcalDatetime,
  slugifyEvent,
  checkForRecurrence,
  sortByDate,
  filterIfPassed,
  cleanSummary,
} from './common';

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
  recurring: boolean;
  acmPath: AcmPath;
}

export function parse(icalData: string): AcmEvent[] {
  const now = Date.now();
  const output = parseRawIcal(icalData);

  const events = output['VCALENDAR'][0]['VEVENT']
    .reduce((collection: AcmEvent[], event: IcalOutput) => {
      if (event['DTSTART'] === undefined || event['DTEND'] === undefined) {
        return collection;
      }

      const summary = cleanSummary(String(event['SUMMARY']));
      const rawDescription = String(event['DESCRIPTION']);
      const { description, variables } = parseDescription(rawDescription);

      const rawLocation = String(event['LOCATION']);
      const isZoomMeeting = rawLocation.startsWith('https://fullerton.zoom.us');
      const customLocationName = variables.get('ACM_LOCATION') ?? rawLocation;
      const location = isZoomMeeting ? 'Zoom' : customLocationName;
      const meetingLink = isZoomMeeting
        ? rawLocation
        : location.startsWith('https://')
        ? location
        : '/discord';

      const date = computeIcalDatetime(event);
      const month = date.toLocaleString(ACM_LOCALE, { month: 'long' });
      const day = date.getDate();
      const time = date.toLocaleTimeString(ACM_LOCALE, { hour: 'numeric', minute: 'numeric' });

      const slug = slugifyEvent(summary, month, day);

      const recurring = checkForRecurrence(String(event['RRULE']));

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

      collection.push({
        month,
        day,
        time,
        location,
        summary,
        description,
        meetingLink,
        date,
        slug,
        recurring,
        acmPath,
      });

      return collection;
    }, [])
    .filter(filterIfPassed(now, Time.Day / 2)) // Comment out this filter statement to show a longer list of events for testing purposes.
    .sort(sortByDate());

  return events;
}
