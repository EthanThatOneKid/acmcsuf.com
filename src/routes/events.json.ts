import type { Request } from "polka";
import type { ServerResponse  as Response } from "http";
import { AcmEvent, parseIcalData } from "../lib/parse-ical-data";
import fetch from "node-fetch";

const ICAL_TARGET_URL =
    "https://calendar.google.com/calendar/ical/738lnit63cr2lhp7jtduvj0c9g%40group.calendar.google.com/public/basic.ics";

const expirationTimeout = 1e3 * 60 * 30; // Fetch updates every 30 minutes.
let eventExpirationTimestamp = 0;
let events: AcmEvent[] = [];

export async function get(req: Request, res: Response) {
    const now = Date.now();
    if (now > eventExpirationTimestamp) {
        const data = await fetch(ICAL_TARGET_URL).then(response => response.text());
        events = parseIcalData(data);
        eventExpirationTimestamp = now + expirationTimeout;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(events));
}