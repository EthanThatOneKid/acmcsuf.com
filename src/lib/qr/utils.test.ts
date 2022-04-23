import { test, expect } from 'vitest';
import { normalizeLinkName } from '$lib/qr/utils';

test('cleans shortlinks', () => {
  const actual = normalizeLinkName('My-Example');
  expect(actual).toBe('my-example');
});
