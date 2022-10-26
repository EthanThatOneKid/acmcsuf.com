import { test, expect } from 'vitest';
import { TESTLINKS } from './testdata';
import { resolve } from './resolve';

const TESTDATA_VALID: Array<[string, ReturnType<typeof resolve>]> = [
  ['/github', 'https://github.com/ethanthatonekid/acmcsuf.com'],
  ['/readme', 'https://github.com/ethanthatonekid/acmcsuf.com#readme'],
  [
    '/arch#srcroutes-',
    'https://github.com/ethanthatonekid/acmcsuf.com/blob/main/ARCHITECTURE.md#srcroutes-',
  ],
  [
    '/gfi',
    'https://github.com/ethanthatonekid/acmcsuf.com/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22',
  ],
];

test('resolve resolves valid shortlinks', () => {
  for (const [validPath, expected] of TESTDATA_VALID) {
    const out = resolve(validPath, TESTLINKS);
    expect(out).toEqual(expected);
  }
});

const TESTDATA_INVALID: Array<[string, RegExp]> = [
  ['', /Invalid path: /],
  ['invalid', /Invalid path: invalid/],
];

test('resolve throws resolving invalid shortlinks', () => {
  for (const [invalidPath, expected] of TESTDATA_INVALID) {
    expect(() => resolve(invalidPath, TESTLINKS)).toThrowError(expected);
  }
});
