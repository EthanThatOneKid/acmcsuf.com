import { test, expect } from 'vitest';
import { resolve } from './resolve';

const TEST_LINKS = {
  github: 'https://github.com/ethanthatonekid/acmcsuf.com#readme',
  arch: '/github/blob/main/ARCHITECTURE.md',
  issues: '/github/issues',
  gfi: '/issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue"',
};

test('resolve combines queries', () => {
  const [result] = resolve('/gfi?foo=bar', TEST_LINKS);
  expect(result).toBe(
    'https://github.com/ethanthatonekid/acmcsuf.com/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22&?foo=bar#readme'
  );
});

test('resolve overwrites hash', () => {
  const [result] = resolve('/github#develop-', TEST_LINKS);
  expect(result).toBe('https://github.com/ethanthatonekid/acmcsuf.com#develop-');
});

test('resolve resolves known shortlinks', () => {
  const TESTS: [string, string][] = [
    ['/github', 'https://github.com/ethanthatonekid/acmcsuf.com#readme'],
    ['/github?a=1&b=2', 'https://github.com/ethanthatonekid/acmcsuf.com?a=1&b=2#readme'],
    ['/issues', 'https://github.com/ethanthatonekid/acmcsuf.com/issues'],
    [
      '/gfi',
      'https://github.com/ethanthatonekid/acmcsuf.com/issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue"',
    ],
  ];

  for (const [data, want] of TESTS) {
    const [out] = resolve(data, TEST_LINKS);
    expect(out, `failed on ${data}`).toStrictEqual(want);
  }
});

test('resolve throws for circularly recursive shortlinks', () => {
  expect(() =>
    resolve('/abc', {
      abc: '/def',
      def: '/abc',
    })
  ).toThrowError(/too many internal redirects \(max: \d+\)/);
});
