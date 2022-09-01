import { test, expect } from 'vitest';
import * as utils from './utils';

const TRUTHY_INPUT_DATA = ['tRuThY sTrInG', 'TRUE', String(true), String(1)];
for (const input of TRUTHY_INPUT_DATA) {
  test(`correctly determines input value '${input}' as truthy`, () => {
    expect(utils.parseBool(input)).toBe(true);
  });
}

const FALSY_INPUT_DATA = ['FALSE', '', null, undefined, String(false), String(NaN), String(0)];
for (const input of FALSY_INPUT_DATA) {
  test(`correctly determines input value '${input}' as falsy`, () => {
    expect(utils.parseBool(input)).toBe(false);
  });
}

test('discerns no labels from empty input', () => {
  const input = [];
  const expected = [];
  const output = utils.discernLabels(input);
  expect(output).toEqual(expected);
});

test('discerns one label from length-1 input', () => {
  const input = [{ labels: ['a'] }];
  const expected = ['a'];
  const output = utils.discernLabels(input);
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
  const output = utils.discernLabels(input);
  expect(output).toEqual(expected);
});
