import { test, expect } from 'vitest';
import { pinnedPaths } from './acm-paths';

test('At least one path is pinned', () => {
  expect(pinnedPaths.length).toBeGreaterThan(0);
});
