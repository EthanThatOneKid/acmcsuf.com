import { test, expect } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { walkICAL, parse } from './utils';

test('parses sample ICAL payload', () => {
  const rawICAL = readFileSync('./src/routes/events/_testdata/events.ics', 'utf-8');
  expect([...walkICAL(rawICAL)].length).toBeGreaterThan(0);
});

test('parses sample ICAL payload 2', () => {
  const rawICAL = readFileSync('./src/routes/events/_testdata/events.ics', 'utf-8');
  const events = parse(rawICAL);
  writeFileSync('./src/routes/events/_testdata/events.json', JSON.stringify(events, null, 2));
  expect(events.length).toBeGreaterThan(0);
});
