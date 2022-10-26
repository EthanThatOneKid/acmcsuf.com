import { test, expect } from 'vitest';
import { resolve } from './resolve';
import { TESTLINKS } from './testdata';

test('resolve throws for circularly recursive shortlinks', () => {
  expect(() => resolve('/zig', { zig: '/zag', zag: '/zig' })).toThrowError(
    /too many internal redirects \(max: \d+\)/
  );
});

test('resolve properly combines queries', () => {
  const out = resolve('/example?foo=bar', { example: 'https://example.com?baz=qux' });
  expect(out).toBe('https://example.com/?baz=qux&foo=bar');
});

test('resolve properly overwrites hash', () => {
  const out = resolve('/example#yin', { example: 'https://example.com#yang' });
  expect(out).toBe('https://example.com/#yin');
});

test('resolve overwrites hash (2)', () => {
  const out = resolve('/one#uno', {
    example: 'https://example.com',
    one: '/two',
    two: '/three#dos',
    three: '/example#tres',
  });
  expect(out).toBe('https://example.com/#uno');
});

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
  ['', /invalid path: /],
  ['/', /not found: \//],
  ['/unknown', /not found: \/unknown/],
];

test('resolve throws validating invalid shortlinks', () => {
  for (const [invalidPath, expected] of TESTDATA_INVALID) {
    expect(() => resolve(invalidPath, TESTLINKS)).toThrowError(expected);
  }
});
