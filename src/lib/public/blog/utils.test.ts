import { test, expect } from 'vitest';
import { discernLabels } from './utils';

test('discerns no labels from empty input', () => {
  const output = discernLabels([]);
  expect(output).toEqual([]);
});

test('discerns one label from length-1 input', () => {
  const input = [{ labels: ['a'] }];
  const expected = ['a'];
  const output = discernLabels(input);
  expect(output).toEqual(expected);
});

test('discerns unique labels from list in alphabetical order', () => {
  const input = [
    { labels: [] },
    { labels: ['abc def'] },
    { labels: ['d', 'c', 'c', 'c'] },
    { labels: ['e', 'd'] },
    { labels: ['c', 'a', 'b'] },
  ];
  const expected = ['a', 'abc def', 'b', 'c', 'd', 'e'];
  const output = discernLabels(input);
  expect(output).toEqual(expected);
});
