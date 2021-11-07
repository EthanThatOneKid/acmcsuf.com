import RRule from 'rrule';

export interface IcalOutput {
  [key: string]: string | string[] | IcalOutput[];
}

const cleanIcalKey = (key: string): string => {
  if (key.startsWith('DTSTART')) return 'DTSTART';
  if (key.startsWith('DTEND')) return 'DTEND';
  return key;
};

/**
 * The code in this function is derived from
 * https://github.com/adrianlee44/ical2json.
 * @param source The raw calendar data in ICAL format.
 * @returns The parsed ICAL data.
 */
export const parseRawIcal = (source: string): IcalOutput => {
  const output: IcalOutput = {};
  const lines = source.split(/\r\n|\n|\r/);
  const parents: IcalOutput[] = [];
  let parent: IcalOutput = {};
  let current: IcalOutput = output;
  let currentKey = '';

  for (const line of lines) {
    let currentValue = '';
    if (line.charAt(0) === ' ') {
      current[currentKey] += line.substr(1);
    } else {
      const splitAt = line.indexOf(':');
      if (splitAt < 0) {
        continue;
      }
      currentKey = cleanIcalKey(line.substr(0, splitAt));
      currentValue = line.substr(splitAt + 1);
      switch (currentKey) {
        case 'BEGIN': {
          parents.push(parent);
          parent = current;
          if (parent[currentValue] == null) {
            parent[currentValue] = [];
          }
          // Create a new object, store the reference for future uses.
          current = {};
          (parent[currentValue] as IcalOutput[]).push(current);
          break;
        }
        case 'END': {
          current = parent;
          parent = parents.pop() as IcalOutput;
          break;
        }
        default: {
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
  }

  return output;
};

/**
 * This function parses the raw ICAL datetime string into a Date object.
 * @param datetime Example: October 31st, 2021 = "20211031T000000"
 * @returns The parsed Date object.
 */
const parseRawIcalDatetime = (datetime: string): Date => {
  const fullYear = datetime.slice(0, 4);
  const month = datetime.slice(4, 6);
  const day = datetime.slice(6, 8);
  const hours = datetime.slice(9, 11);
  const minutes = datetime.slice(11, 13);
  const seconds = datetime.slice(13, 15);
  const date = new Date();
  date.setFullYear(Number(fullYear), Number(month) - 1, Number(day));
  date.setHours(Number(hours) - 7, Number(minutes), Number(seconds));
  return date;
};

export const computeIcalDatetime = (event: IcalOutput): Date => {
  const rawDatetime = event['DTSTART'];
  const rawRrule = event['RRULE'];
  if (rawRrule !== undefined) {
    try {
      const ruleSrc = `DTSTART:${rawDatetime}Z\nRRULE:${rawRrule}`;
      const recurrence = RRule.fromString(ruleSrc);
      const date = recurrence.after(new Date());
      date.setHours(date.getHours());
      return date;
      // eslint-disable-next-line no-empty
    } catch {}
  }
  return parseRawIcalDatetime(rawDatetime as string);
};

export const slugifyEvent = (summary: string, month: string, day: number): string => {
  const cleanedSummary = summary.replace(/[^\w\s_]/g, '').replace(/(\s|-|_)+/g, '-');
  const slug = [cleanedSummary, month, day].join('-').toLowerCase();
  return slug;
};

export const checkForRecurrence = (raw?: string): boolean => {
  if (raw === undefined) return false;
  try {
    const recurrence = RRule.fromString(raw);
    return recurrence.isFullyConvertibleToText();
    // eslint-disable-next-line no-empty
  } catch {}
  return false;
};

export const parseDescription = (content: string): Record<string, string> => {
  const result = {};
  for (const line of content.split('\n')) {
    const [key, value] = line.split('=');
    result[key.trim()] = value;
  }
  return result;
};

export const sortByDate = (): ((a: { date: Date }, b: { date: Date }) => 1 | -1) => {
  return ({ date: date1 }, { date: date2 }) => (date1.valueOf() > date2.valueOf() ? 1 : -1);
};

export const filterIfPassed = (now: number, offset = 0) => {
  return ({ date }: { date: Date }): boolean => date.valueOf() + offset > now;
};
