import { Time, ACM_LOCALE } from '$lib/constants/time';
import {
	parseRawIcal,
	parseDescription,
	computeIcalDatetime,
	slugifyEvent,
	formatRecurrence,
	sortByDate,
	filterIfPassed,
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
	recurringText?: string;
}

export const parse = (icalData: string): AcmEvent[] => {
	const now = Date.now();
	const output = parseRawIcal(icalData);
	const events = output['VCALENDAR'][0]['VEVENT']
		.reduce((collection: AcmEvent[], event: any) => {
			if (event['DTSTART'] === undefined || event['DTEND'] === undefined) {
				return collection;
			}
			const summary = String(event['SUMMARY']);
			const description = String(event['DESCRIPTION']);
			const parsedDescription = parseDescription(description);
			const rawLocation = String(event['LOCATION']);
			const isZoomMeeting = rawLocation.startsWith('https://fullerton.zoom.us');
			const meetingLink = isZoomMeeting ? rawLocation : '/discord';
			const customLocationName = parsedDescription['ACM_LOCATION'];
			const location = isZoomMeeting ? 'Zoom' : customLocationName ?? rawLocation;
			const date = computeIcalDatetime(event);
			const month = date.toLocaleString(ACM_LOCALE, { month: 'long' });
			const day = date.getDate();
			const time = date.toLocaleTimeString(ACM_LOCALE, { hour: 'numeric', minute: 'numeric' });
			const slug = slugifyEvent(summary, month, day);
			const recurringText = formatRecurrence(event['RRULE']);
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
				recurringText,
			});
			return collection;
		}, [])
		.filter(filterIfPassed(now, Time.Day / 2)) // Comment out this filter statement to show a longer list of events for testing purposes.
		.sort(sortByDate());
	return events;
};
