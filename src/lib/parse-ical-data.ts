import ICAL from "ical.js";

const acmLocale = "en-us";

const getProperty = (property: string, properties: [string, any, string, string][]): string | undefined => {
  const [, , , value] = properties.find(([propertyName]) => property === propertyName);
  return value;
};

export interface AcmEvent {
  date: Date;
  endDate: Date;
  month: string;
  day: number;
  time: string;
  location: string;
  summary: string;
  isHappening: boolean;
}

export const parseIcalData = (icalData: string): AcmEvent[] => {
  const now = Date.now();
  const jcalData = ICAL
    .parse(icalData)[2]
    .slice(1)
    .map(([, properties]) => {
      const startTimestamp = getProperty("dtstart", properties),
            endTimestamp = getProperty("dtend", properties),
            location = getProperty("location", properties),
            summary = getProperty("summary", properties);
      const date = new Date(startTimestamp);
      const endDate = new Date(endTimestamp);
      const month = date.toLocaleString(acmLocale, { month: "long" });
      const day = date.getDate();
      const time = date.toLocaleTimeString(acmLocale, { hour: "numeric", minute: "numeric" });
      const isHappening = now >= date.valueOf() && now < endDate.valueOf();
      return { month, day, time, location, summary, date, endDate, isHappening };
    })
    .filter(({ endDate }) => endDate.valueOf() > now) // Comment out this filter statement to show a longer list of events for testing purposes.
    .sort(({ date: date1 }, { date: date2 }) => date1.valueOf() > date2.valueOf() ? 1 : -1)
  return jcalData;
};