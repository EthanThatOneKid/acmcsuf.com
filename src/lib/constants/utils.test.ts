import { test, expect } from 'vitest';
import { clean } from '$lib/constants/utils';

test('cleans shortlinks', () => {
  const actual = clean('My-Example');
  expect(actual).toBe('my-example');
});
