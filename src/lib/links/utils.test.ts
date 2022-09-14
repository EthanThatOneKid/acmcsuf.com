import { test, expect } from 'vitest';
import { parseLink } from './utils';

test('parses shortlinks', () => {
  expect(parseLink('missing-link')).toBe(undefined);
  expect(parseLink('GitHub')).toBe('github');
});
