import { test, expect } from 'vitest';

import { PomoPattern } from './pomo';

test('at should calculate the correct PomoInfo for a given timestamp', () => {
  const pattern = new PomoPattern([25, 5, 25, 5, 25, 20]);
  const base = new Date();
  const timestamp = new Date(base.getTime() + 1000 * 60 * 30); // 30 minutes after base
const d = timestamp.getTime() - base.getTime();
console.log({d, d2: d/1000/60})
  const pomoInfo = pattern.at(timestamp, base);

  expect(pomoInfo.elapsedCycles).toBe(0);
  expect(pomoInfo.working).toBe(true);
  expect(pomoInfo.remainingMs).toBe(1000 * 60 * 5); // 5 minutes remaining in work state
});

test('toShortString should return a string representation of the pattern', () => {
  const pattern = new PomoPattern([25, 5, 25, 5, 25, 20]);

  expect(pattern.toShortString()).toBe('25-5-25-5-25-20');
});

test('fromString should parse the pattern of integers from a given pattern string', () => {
  const patternString = '25-5-25-5-25-20';

  const pattern = PomoPattern.fromString(patternString);

  expect(pattern.data).toEqual([25, 5, 25, 5, 25, 20]);
});

test('at should return the correct PomoInfo for a given timestamp', () => {
  const pattern = new PomoPattern([25, 5, 25, 5, 25, 20]);
  const base = new Date('2022-01-01T00:00:00.000Z');
  const timestamp = new Date('2022-01-01T00:20:00.000Z');
  const pomoInfo = pattern.at(timestamp, base);

  expect(pomoInfo.elapsedCycles).toBe(0);
  expect(pomoInfo.working).toBe(false);
  expect(pomoInfo.remainingMs).toBe(120000);
  expect(pomoInfo.period.index).toBe(1);
  expect(pomoInfo.period.minutes).toBe(5);
});

test('at should return the correct PomoInfo for a given timestamp in a different cycle', () => {
  const pattern = new PomoPattern([25, 5, 25, 5, 25, 20]);
  const base = new Date('2022-01-01T00:00:00.000Z');
  const timestamp = new Date('2022-01-01T01:10:00.000Z');
  const pomoInfo = pattern.at(timestamp, base);

  expect(pomoInfo.elapsedCycles).toBe(1);
  expect(pomoInfo.working).toBe(true);
  expect(pomoInfo.remainingMs).toBe(300000);
  expect(pomoInfo.period.index).toBe(0);
  expect(pomoInfo.period.minutes).toBe(25);
});

test('at should return the correct PomoInfo for the end of a cycle', () => {
  const pattern = new PomoPattern([25, 5, 25, 5, 25, 20]);
  const base = new Date('2022-01-01T00:00:00.000Z');
  const timestamp = new Date('2022-01-01T01:55:00.000Z');
  const pomoInfo = pattern.at(timestamp, base);

  expect(pomoInfo.elapsedCycles).toBe(1);
  expect(pomoInfo.working).toBe(false);
  expect(pomoInfo.remainingMs).toBe(0);
  expect(pomoInfo.period.index).toBe(5);
  expect(pomoInfo.period.minutes).toBe(20);
});
