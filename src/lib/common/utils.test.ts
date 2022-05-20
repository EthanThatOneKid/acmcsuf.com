import { test, expect } from 'vitest';
import * as utils from './utils';

const TRUTHY_INPUT_DATA = ['TRUE', String(true), String(1)];
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
