import ICAL from "ical.js";

const getProperty = (property: string, properties: [string, any, string, string][]): string | undefined => {
  const [, , , value] = properties.find(([propertyName]) => property === propertyName);
  return value;
};

interface AcmEvent {
  startTimestamp: string;
  endTimestamp: string;
  location: string;
  summary: string;
}

export const parseIcalData = (icalData: string): AcmEvent[] => {
  const jcalData = ICAL
  .parse(icalData)[2]
  .slice(1)
  .map(([, properties]) => {
    const startTimestamp = getProperty("dtstart", properties),
          endTimestamp = getProperty("dtend", properties),
          location = getProperty("location", properties),
          summary = getProperty("summary", properties);
    return { startTimestamp, endTimestamp, location, summary };
  });
  return jcalData;
};