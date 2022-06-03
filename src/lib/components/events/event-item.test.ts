import { expect, test } from 'vitest';
import { formatLocation } from './utils';

test('can format bad locations', () => {
  expect(formatLocation(null)).toBe('TBD');
  expect(formatLocation('')).toBe('TBD');
  expect(formatLocation(undefined)).toBe('TBD');
  expect(formatLocation("   Your mom's house  ")).toBe("Your mom's house");
});

test('can format online locations', () => {
  expect(formatLocation('Discord')).toBe('Hosted on Discord');
  expect(formatLocation('Zoom')).toBe('Hosted on Zoom');
});
