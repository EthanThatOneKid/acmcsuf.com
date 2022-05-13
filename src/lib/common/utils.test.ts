import { test, expect } from 'vitest';
import * as utils from './utils';

test('checks correct discernTags output', () => {
  expect(utils.discernTags([{ labels: [] }])).toEqual([]);
  expect(utils.discernTags([{ labels: ['algo'] }])).toEqual(['algo']);
  expect(
    utils.discernTags([
      { labels: [] },
      { labels: ['george washington'] },
      { labels: ['victor', 'delta', 'delta', 'delta'] },
      { labels: ['kilo', 'victor'] },
      { labels: ['delta', 'alpha', 'bravo'] },
    ])
  ).toEqual(['alpha', 'bravo', 'delta', 'george washington', 'kilo', 'victor']);
});
