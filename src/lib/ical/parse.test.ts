import { test, expect } from 'vitest';
import { readFileSync } from 'fs';
import { parse } from '$lib/ical/parse';
import { events as EVENT_DATA } from '../../routes/events/_testdata/events';

test('ICAL parser integration test', () => {
  const MAX_EVENTS = 10;
  const ICAL_DATA = readFileSync('./src/routes/events/_testdata/events.ics', 'utf-8');

  const events = parse(ICAL_DATA, {
    maxEvents: MAX_EVENTS,
    filterBefore: false,
  });

  // To generate './src/routes/events/_testdata/events.ts', uncomment
  // the following lines of code then run 'npm t' (and 'npm run all'):
  // writeFileSync(
  //   './src/routes/events/_testdata/events.ts',
  //   `export const events = ${JSON.stringify(events)};`
  // );

  expect(JSON.stringify(events)).toBe(JSON.stringify(EVENT_DATA));
});
