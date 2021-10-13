import { AcmEvent, parseIcalData } from '$lib/parse-ical-data';

const ICAL_TARGET_URL =
	'https://calendar.google.com/calendar/ical/738lnit63cr2lhp7jtduvj0c9g%40group.calendar.google.com/public/basic.ics';

const caching = false; // Make this false to disable server-side caching in development.
const expirationTimeout = 1e3 * 60 * 3; // Fetch updates every 2 minutes.
let eventExpirationTimestamp = 0;
let events: AcmEvent[] = [];

const setCache = async (timestamp: number) => {
	const data = await fetch(ICAL_TARGET_URL).then((response) => response.text());
	events = parseIcalData(data);
	eventExpirationTimestamp = timestamp + expirationTimeout;
	return events;
};

const getCache = async () => {
	const now = Date.now();
	if (caching && eventExpirationTimestamp > now) {
		return events;
	}
	return await setCache(now);
};

export const get = async () => ({ body: await getCache() });
