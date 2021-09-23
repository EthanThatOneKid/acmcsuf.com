import type { Request } from "polka";
import type { ServerResponse  as Response } from "http";
import { AcmEvent, parseIcalData } from "../lib/parse-ical-data";
import fetch from "node-fetch";

const ICAL_TARGET_URL =
    "https://calendar.google.com/calendar/ical/738lnit63cr2lhp7jtduvj0c9g%40group.calendar.google.com/public/basic.ics";

const caching = false; // Make this false to disable server-side caching in development.
const expirationTimeout = 1e3 * 60 * 3; // Fetch updates every 2 minutes.
let eventExpirationTimestamp = 0;
let events: AcmEvent[] = [];

export async function get(req: Request, res: Response) {
    const now = Date.now();
    if (caching && now > eventExpirationTimestamp) {
        const data = await fetch(ICAL_TARGET_URL).then(response => response.text());
        events = parseIcalData(data);
        eventExpirationTimestamp = now + expirationTimeout;
    } else {
        const data = await fetch(ICAL_TARGET_URL).then(response => response.text());
        events = parseIcalData(data);
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(events));
}