import { test, expect } from 'vitest';
import { parseLinkId } from './utils';

test('parses shortlinks', () => {
  expect(parseLinkId('missing-link')).toBe(undefined);
  expect(parseLinkId('GitHub')).toBe('github');
});
