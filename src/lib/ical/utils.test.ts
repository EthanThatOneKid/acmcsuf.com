import { test } from 'vitest';
import { readFileSync } from 'fs';
import { walkICAL } from './utils';

// test('slugifies simple event details', () => {
//   const actual = slugifyEvent('test-event', '2000', 'january', 1);
//   const expected = 'test-event-2000-january-1';
//   expect(actual).toBe(expected);
// });

test('parses sample ICAL payload', () => {
  const rawICAL = readFileSync('./src/routes/events/_testdata/events.ics', 'utf-8');
  const output = [...walkICAL(rawICAL)];
  console.log({ output });
});
