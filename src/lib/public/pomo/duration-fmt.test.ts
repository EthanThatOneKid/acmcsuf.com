import { test, expect } from 'vitest';
import { durationFmt } from './duration-fmt';

test('formats milliseconds to hours, minutes and seconds', () => {
  expect(durationFmt(0)).toBe('00:00:00:000');
  expect(durationFmt(1234)).toBe('00:00:01:234');
  expect(durationFmt(12345678)).toBe('03:25:45:678');
  expect(durationFmt(3600000)).toBe('01:00:00:000');
});
