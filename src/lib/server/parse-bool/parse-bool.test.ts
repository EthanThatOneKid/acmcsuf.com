import { expect, test } from 'vitest';
import { parseBool } from './parse-bool';

const TRUTHY_INPUT_DATA = ['tRuThY sTrInG', 'TRUE', String(true), String(1)];
for (const input of TRUTHY_INPUT_DATA) {
  test(`correctly determines input value '${input}' as truthy`, () => {
    expect(parseBool(input)).toBe(true);
  });
}

const FALSY_INPUT_DATA = ['FALSE', '', null, undefined, String(false), String(NaN), String(0)];
for (const input of FALSY_INPUT_DATA) {
  test(`correctly determines input value '${input}' as falsy`, () => {
    expect(parseBool(input)).toBe(false);
  });
}
