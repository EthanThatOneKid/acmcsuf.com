import {
	parseRawIcal,
	parseDescription,
	convertIcalDateTime,
	slugifyEvent,
	formatRecurrence,
} from './common';

const acmLocale = 'en-us';

export interface AcmEvent {
	date: Date;
	endDate: Date;
	month: string;
	day: number;
	time: string;
	location: string;
	summary: string;
	description: string;
	meetingLink: string;
	isHappening: boolean;
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
			const date = convertIcalDateTime(event['DTSTART']);
			const endDate = convertIcalDateTime(event['DTEND']);
			const month = date.toLocaleString(acmLocale, { month: 'long' });
			const day = date.getDate();
			const time = date.toLocaleTimeString(acmLocale, { hour: 'numeric', minute: 'numeric' });
			const isHappening = now >= date.valueOf() && now < endDate.valueOf();
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
				endDate,
				isHappening,
				slug,
				recurringText,
			});
			return collection;
		}, [])
		.filter(({ endDate }) => endDate.valueOf() + 1e3 * 60 * 60 * 12 > now) // Comment out this filter statement to show a longer list of events for testing purposes.
		.sort(({ date: date1 }, { date: date2 }) => (date1.valueOf() > date2.valueOf() ? 1 : -1));
	return events;
};
