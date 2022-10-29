import { test, expect } from 'vitest';
import { resolve } from './resolve';

test('resolve throws for circularly recursive shortlinks', () => {
  expect(() =>
    resolve(new URL('https://acmcsuf.com/zig'), { zig: '/zag', zag: '/zig' })
  ).toThrowError(/too many internal redirects/);
});

test('resolve properly combines queries', () => {
  const out = resolve(new URL('https://acmcsuf.com/example?foo=bar'), {
    example: 'https://example.com?baz=qux',
  });
  expect(out).toStrictEqual(new URL('https://example.com/?baz=qux&foo=bar'));
});

test('resolve properly overwrites hash', () => {
  const out = resolve(new URL('https://acmcsuf.com/example#yang'), {
    example: 'https://example.com#yin',
  });
  expect(out).toStrictEqual(new URL('https://example.com/#yang'));
});

test('resolve overwrites hash (2)', () => {
  const out = resolve(new URL('https://acmcsuf.com/one#uno'), {
    one: '/two',
    two: '/three#dos',
    three: '/example#tres',
    example: 'https://example.com',
  });
  expect(out).toStrictEqual(new URL('https://example.com/#uno'));
});

test('resolve appends pathnames', () => {
  const out = resolve(new URL('https://acmcsuf.com/example/baz/qux'), {
    example: 'https://example.com/foo/bar',
  });
  expect(out).toStrictEqual(new URL('https://example.com/foo/bar/baz/qux'));
});

const TEST_SHORTLINKS = {
  github: 'https://github.com/ethanthatonekid/acmcsuf.com',
  issues: '/github/issues',
  gfi: '/issues/?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22',
  bug: '/issues/new/?labels=bug&template=bug_report.md',
  'dev/template': 'https://example.com/dev-template',
};

const VALID_TESTCASES: Array<[URL, ReturnType<typeof resolve>]> = [
  [
    new URL('https://acmcsuf.com/github'),
    new URL('https://github.com/ethanthatonekid/acmcsuf.com'),
  ],
  [
    new URL('https://acmcsuf.com/issues'),
    new URL('https://github.com/ethanthatonekid/acmcsuf.com/issues'),
  ],
  [
    new URL('https://acmcsuf.com/gfi'),
    new URL(
      'https://github.com/ethanthatonekid/acmcsuf.com/issues/?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22'
    ),
  ],
  [
    new URL('https://acmcsuf.com/bug'),
    new URL(
      'https://github.com/ethanthatonekid/acmcsuf.com/issues/new/?labels=bug&template=bug_report.md'
    ),
  ],
  [
    new URL('https://acmcsuf.com/issues/new'),
    new URL('https://github.com/ethanthatonekid/acmcsuf.com/issues/new'),
  ],
  [
    new URL('https://acmcsuf.com/dev/template/new'),
    new URL('https://example.com/dev-template/new'),
  ],
];

test('resolve resolves valid URLs', () => {
  for (const [inURL, outURL] of VALID_TESTCASES) {
    expect(resolve(inURL, TEST_SHORTLINKS), `failed on ${inURL}`).toStrictEqual(outURL);
  }
});
