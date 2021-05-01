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
  isHappening: boolean;
}

const convertIcalDateTime = (datetime: string): Date => {
  const characters = datetime.split("");
  const fullYear = characters.splice(0, 4).join("");
  const month = characters.splice(0, 2).join("");
  const day = characters.splice(0, 2).join("");
  characters.shift();
  const hours = characters.splice(0, 2).join("");
  const minutes = characters.splice(0, 2).join("");
  const seconds = characters.splice(0, 2).join("");
  const date = new Date();
  date.setFullYear(Number(fullYear), Number(month) - 1, Number(day));
  date.setHours(Number(hours), Number(minutes), Number(seconds));
  return date;
}

export const parseIcalData = (icalData: string): AcmEvent[] => {
  const now = Date.now();
  const output = convert(icalData);
  const events = output["VCALENDAR"][0]["VEVENT"]
    .reduce((collection: AcmEvent[], event: any) => {
      const summary = event["SUMMARY"];
      const location = event["LOCATION"];
      if (event["DTSTART"] === undefined || event["DTEND"] === undefined) {
        return collection;
      }
      const date = convertIcalDateTime(event["DTSTART"]);
      const endDate = convertIcalDateTime(event["DTEND"]);
      const month = date.toLocaleString(acmLocale, { month: "long" });
      const day = date.getDate();
      const time = date.toLocaleTimeString(acmLocale, { hour: "numeric", minute: "numeric" });
      const isHappening = now >= date.valueOf() && now < endDate.valueOf();
      collection.push({ month, day, time, location, summary, date, endDate, isHappening });
      return collection;
    }, [])
    .filter(({ endDate }) => endDate.valueOf() > now) // Comment out this filter statement to show a longer list of events for testing purposes.
    .sort(({ date: date1 }, { date: date2 }) => date1.valueOf() > date2.valueOf() ? 1 : -1);
  return events;
};