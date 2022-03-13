import { assert, expect, test } from 'vitest';

import {
  slugifyEvent,
  parseDescription,
  sortByDate,
  filterIfPassed,
  makeEventLink,
  wrapText,
} from './common';

test('slugifies simple event details', () => {
  const actual = slugifyEvent('test-event', '2000', 'january', 1);
  const expected = 'test-event-2000-january-1';
  expect(actual).toBe(expected);
});

test('slugifies capitalized event details', () => {
  const actual = slugifyEvent('Test Event', '2000', 'January', 1);
  const expected = 'test-event-2000-january-1';
  expect(actual).toBe(expected);
});

test('parses empty event description', () => {
  const { description, variables } = parseDescription('');
  expect(description).toBe('');
  expect(variables).toEqual(new Map());
});

test('parses text-only event description', () => {
  const { description, variables } = parseDescription('Hello, world!');
  expect(description).toBe('Hello, world!');
  expect(variables).toEqual(new Map());
});

test('parses variable-only event description', () => {
  const { description, variables } = parseDescription('ACM_TEST=test');
  expect(description).toBe('');
  expect(variables).toEqual(new Map([['ACM_TEST', 'test']]));
});

test('parses variables and text in event description', () => {
  const { description, variables } = parseDescription('Hello, world! ACM_TEST=test');
  expect(description).toBe('Hello, world!');
  expect(variables).toEqual(new Map([['ACM_TEST', 'test']]));
});

test('sorts array by date', () => {
  const testEventsAscending = Array.from({ length: 5 }, (_, i) => ({ date: new Date(i) }));
  const result = testEventsAscending.sort(sortByDate());
  const expected = testEventsAscending.reverse();
  expect(result, 'latest events are shown first').toEqual(expected);
});

test('filters if event has passed', () => {
  const testEvents = Array.from({ length: 5 }, () => ({ date: new Date(0) }));
  const result = testEvents.filter(filterIfPassed(1));
  expect(result, 'only events in the future are shown').toEqual([]);
});

test('makes a link out of event slug and base URL', () => {
  const result = makeEventLink('test-event-2000-january-1', 'https://example.com/');
  expect(result).toEqual('https://example.com/#test-event-2000-january-1');
});

test('wraps long text into lines broken at column 100 3 times', () => {
  const lines = wrapText('*'.repeat(301), 100);
  assert(lines.length === 4, 'wraps text into 3 times, making 4 lines');
  assert(lines.at(-1).length === 1, 'where the last line is a single asterisk');
});
