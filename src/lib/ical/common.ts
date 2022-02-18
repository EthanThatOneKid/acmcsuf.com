import RRule from 'rrule';

export interface IcalOutput {
  [key: string]: string | string[] | IcalOutput[];
}

function cleanIcalKey(key: string): string {
  if (key.startsWith('DTSTART')) return 'DTSTART';
  if (key.startsWith('DTEND')) return 'DTEND';
  return key;
}

/**
 * Checks to see if the given date is observing daylight savings time.
 * @param date The date to be checked
 * @returns true if the date observes daylight savings time, false otherwise.
 * @see https://stackoverflow.com/a/30280636
 */
function checkDateObservesDST(date: Date): boolean {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset()) > date.getTimezoneOffset();
}

/**
 * The code in this function is derived from
 * https://github.com/adrianlee44/ical2json.
 * @param source The raw calendar data in ICAL format.
 * @returns The parsed ICAL data.
 */
export function parseRawIcal(source: string): IcalOutput {
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
}

/**
 * This function parses the raw ICAL datetime string into a Date object.
 * @param datetime Example: October 31st, 2021 = "20211031T000000"
 * @returns The parsed Date object.
 */
function parseRawIcalDatetime(datetime: string): Date {
  const fullYear = datetime.slice(0, 4);
  const month = datetime.slice(4, 6);
  const day = datetime.slice(6, 8);
  const hours = datetime.slice(9, 11);
  const minutes = datetime.slice(11, 13);
  const seconds = datetime.slice(13, 15);

  const date = new Date();
  date.setFullYear(Number(fullYear), Number(month) - 1, Number(day));

  // The timezone determines how many hours the date is relative of UTC.
  const observingDST = checkDateObservesDST(date);
  const tzHoursOffset = observingDST ? -7 : -8; // PST
  date.setHours(Number(hours) + tzHoursOffset, Number(minutes), Number(seconds));

  return date;
}

export function computeIcalDatetime(event: IcalOutput): Date {
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
}

export function slugifyEvent(summary: string, month: string, day: number): string {
  const cleanedSummary = summary.replace(/[^\w\s_]/g, '').replace(/(\s|-|_)+/g, '-');
  const slug = [cleanedSummary, month, day].join('-').toLowerCase();
  return slug;
}

export function checkForRecurrence(raw?: string): boolean {
  if (raw === undefined) return false;

  try {
    const recurrence = RRule.fromString(raw);
    return recurrence.isFullyConvertibleToText();
    // eslint-disable-next-line no-empty
  } catch {}

  return false;
}

export function parseDescription(content: string): Record<string, string> {
  const result = {};

  for (const line of content.split('\n')) {
    const [key, value] = line.split('=');
    result[key.trim()] = value;
  }

  return result;
}

export function sortByDate(): (a: { date: Date }, b: { date: Date }) => 1 | -1 {
  return ({ date: date1 }, { date: date2 }) => (date1.valueOf() > date2.valueOf() ? 1 : -1);
}

export function filterIfPassed(now: number, offset = 0) {
  return ({ date }: { date: Date }): boolean => date.valueOf() + offset > now;
}

export function cleanSummary(summary?: string): string {
  if (summary === undefined) return 'Unnamed Event';

  return summary.replace(/\\/g, '');
}
