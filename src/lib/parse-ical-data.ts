import { links } from "./links";

const acmLocale = "en-us";

interface IcalOutput {
  [key: string]: string | string[] | IcalOutput[];
}

/**
 * The code in this function is derived from
 * https://github.com/adrianlee44/ical2json.
 * @param source The raw calendar data in ICAL format.
 * @returns The parsed ICAL data.
 */
const convert = (source: string): IcalOutput => {
  const output: IcalOutput = {};
  const lines = source.split(/\r\n|\n|\r/);
  const parents: IcalOutput[] = [];
  let parent: IcalOutput = {};
  let current: IcalOutput = output;
  let currentKey = "";

  for (const line of lines) {
    let currentValue = "";
    if (line.charAt(0) === " ") {
      current[currentKey] += line.substr(1);
    } else {
      const splitAt = line.indexOf(":");
      if (splitAt < 0) {
        continue;
      }
      currentKey = line.substr(0, splitAt);
      currentValue = line.substr(splitAt + 1);
      switch (currentKey) {
        case 'BEGIN':
          parents.push(parent);
          parent = current;
          if (parent[currentValue] == null) {
            parent[currentValue] = [];
          }
          // Create a new object, store the reference for future uses.
          current = {};
          (parent[currentValue] as IcalOutput[]).push(current);
          break;
        case 'END':
          current = parent;
          parent = parents.pop() as IcalOutput;
          break;
        default:
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

  return output;
}

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
}

const convertIcalDateTime = (datetime: string): Date => {
  const fullYear = datetime.slice(0, 4),
        month = datetime.slice(4, 6),
        day = datetime.slice(6, 8),
        hours = datetime.slice(9, 11),
        minutes = datetime.slice(11, 13),
        seconds = datetime.slice(13, 15),
        date = new Date();
  date.setFullYear(Number(fullYear), Number(month) - 1, Number(day));
  date.setHours(Number(hours) - 7, Number(minutes), Number(seconds));
  return date;
};

const slugifyEvent = (summary: string, month: string, day: number): string => {
  const cleanedSummary = summary.replace(/[^\w\s\_]/g, "").replace(/(\s|\-|\_)+/g, "-");
  const slug = [cleanedSummary, month, day].join("-").toLowerCase();
  return slug;
};

const parseDescription = (content: string): Record<string, string> => {
  const result = {};
  for (const line of content.split("\n")) {
    const [key, value] = line.split("=");
    result[key.trim()] = value;
  }
  return result;
};

export const parseIcalData = (icalData: string): AcmEvent[] => {
  const now = Date.now();
  const output = convert(icalData);
  const events = output["VCALENDAR"][0]["VEVENT"]
    .reduce((collection: AcmEvent[], event: any) => {
      if (event["DTSTART"] === undefined || event["DTEND"] === undefined) {
        return collection;
      }
      const summary = String(event["SUMMARY"]);
      const description = String(event["DESCRIPTION"]);
      const parsedDescription = parseDescription(description);
      const rawLocation = String(event["LOCATION"]);
      const isZoomMeeting = rawLocation.startsWith("https://fullerton.zoom.us");
      const meetingLink = isZoomMeeting ? rawLocation : links.discord;
      const customLocationName = parsedDescription["ACM_LOCATION"];
      const location = isZoomMeeting ? "Zoom" : (customLocationName ?? rawLocation);
      const date = convertIcalDateTime(event["DTSTART"]);
      const endDate = convertIcalDateTime(event["DTEND"]);
      const month = date.toLocaleString(acmLocale, { month: "long" });
      const day = date.getDate();
      const time = date.toLocaleTimeString(acmLocale, { hour: "numeric", minute: "numeric" });
      const isHappening = now >= date.valueOf() && now < endDate.valueOf();
      const slug = slugifyEvent(summary, month, day);
      collection.push({ month, day, time, location, summary, description, meetingLink, date, endDate, isHappening, slug });
      return collection;
    }, [])
    .filter(({ endDate }) => endDate.valueOf() + (1e3 * 60 * 60 * 12) > now) // Comment out this filter statement to show a longer list of events for testing purposes.
    .sort(({ date: date1 }, { date: date2 }) => date1.valueOf() > date2.valueOf() ? 1 : -1);
  return events;
};