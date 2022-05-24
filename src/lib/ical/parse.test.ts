import { test, expect } from 'vitest';
import { readFileSync } from 'fs';
import { parse } from '$lib/ical/parse';
import { events as EVENT_DATA } from '../../routes/events/_testdata/events';

const ICAL_DATA = readFileSync('./src/routes/events/_testdata/events.ics', 'utf-8');

test('ICAL parser integration test', () => {
  const events = parse(ICAL_DATA, { maxEvents: 10, filterBefore: false });

  // To generate './src/routes/events/_testdata/events.ts', uncomment
  // the following lines of code then run 'npm t' (and 'npm run all'):
  // writeFileSync(
  //   './src/routes/events/_testdata/events.ts',
  //   `export const events = ${JSON.stringify(events)};`
  // );

  let i = 0;
  events.forEach((element) => {
    for (const prop in element) {
      if (
        Object.prototype.hasOwnProperty.call(element, prop) &&
        prop !== 'location' &&
        prop !== 'calendarLinks'
      ) {
        expect(element[prop]).toEqual(EVENT_DATA[i][prop]);
      }
    }
    i += 1;
  });

  //expect(JSON.stringify(events)).toBe(JSON.stringify(EVENT_DATA));
});
