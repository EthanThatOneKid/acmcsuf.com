import { test, expect } from 'vitest';

import type { GCalEvent } from './gcal';
import { fromGCal } from './gcal';
import GCAL_EVENTS from './data/gcal-events.json?raw';
import CLUB_EVENTS from './data/club-events.json?raw';

test('transforms GCalEvent list to ClubEvent list', async () => {
  const input = JSON.parse(GCAL_EVENTS) as GCalEvent[];
  const actual = fromGCal(input);

  // To generate 'src/lib/server/events/data/club-events.json', uncomment the
  // following lines of code then run 'npm t' (and 'npm run all'):
  //
  // const { writeFileSync } = await import('node:fs');
  // writeFileSync(
  //   'src/lib/server/events/data/club-events.json',
  //   JSON.stringify(actual, null, 2) + '\n',
  // );
  //
  // Remember to comment out the above lines of code before committing.

  expect(JSON.stringify(actual, null, 2) + '\n').toBe(CLUB_EVENTS);
});
