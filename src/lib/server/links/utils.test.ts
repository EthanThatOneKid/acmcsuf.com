import { test, expect } from 'vitest';
import { parseLinkId, parseLink, findLinkId } from './utils';

const TEST_LINKS = {
  example: 'https://example.com',
  'example/abc': 'https://example.com/123/',
};

test('findLinkId finds the correct link ID', () => {
  expect(findLinkId(['example'], TEST_LINKS)).toBe('example');
  expect(findLinkId(['example', 'abc'], TEST_LINKS)).toBe('example/abc');
  expect(findLinkId(['example', 'abc', 'def'], TEST_LINKS)).toBe('example/abc');
  expect(findLinkId(['example', 'xyz'], TEST_LINKS)).toBe('example');
});

const PARSE_LINK_TESTS: [string, ReturnType<typeof parseLink>][] = [
  [
    'example',
    {
      relativePathname: 'example',
      query: '',
      hash: '',
    },
  ],
  [
    'example?foo=bar',
    {
      relativePathname: 'example',
      query: 'foo=bar',
      hash: '',
    },
  ],
  [
    'example?foo=bar&baz=qux',
    {
      relativePathname: 'example',
      query: 'foo=bar&baz=qux',
      hash: '',
    },
  ],
  [
    'example?foo=bar&baz=qux#hash',
    {
      relativePathname: 'example',
      query: 'foo=bar&baz=qux',
      hash: 'hash',
    },
  ],
  [
    'example#hash',
    {
      relativePathname: 'example',
      query: '',
      hash: 'hash',
    },
  ],
];

test('parseLink parses stripped URLs', () => {
  for (const [data, want] of PARSE_LINK_TESTS) {
    const out = parseLink(data);
    expect(out, `failed on '${data}'`).toStrictEqual(want);
  }
});

const PARSE_LINK_ID_TESTS: [string, ReturnType<typeof parseLinkId>][] = [
  [
    '/example',
    {
      id: 'example',
      destination: 'https://example.com',
      relativePathname: '',
      query: '',
      hash: '',
    },
  ],
  ['/unknown', undefined],
  [
    '/example?foo=bar',
    {
      id: 'example',
      relativePathname: '',
      query: 'foo=bar',
      hash: '',
      destination: 'https://example.com?foo=bar',
    },
  ],
  [
    '/example?foo=bar&baz=qux',
    {
      id: 'example',
      relativePathname: '',
      query: 'foo=bar&baz=qux',
      hash: '',
      destination: 'https://example.com?foo=bar&baz=qux',
    },
  ],
  [
    '/example?foo=bar&baz=qux#hash',
    {
      id: 'example',
      relativePathname: '',
      query: 'foo=bar&baz=qux',
      hash: 'hash',
      destination: 'https://example.com?foo=bar&baz=qux#hash',
    },
  ],
  [
    '/example#hash',
    {
      id: 'example',
      relativePathname: '',
      query: '',
      hash: 'hash',
      destination: 'https://example.com#hash',
    },
  ],
  [
    '/example/abc/',
    {
      id: 'example/abc',
      relativePathname: '',
      query: '',
      hash: '',
      destination: 'https://example.com/123/',
    },
  ],
  [
    '/example/abc/?foo=bar',
    {
      id: 'example/abc',
      relativePathname: '',
      query: 'foo=bar',
      hash: '',
      destination: 'https://example.com/123/?foo=bar',
    },
  ],
  [
    '/example/abc/?foo=bar&baz=qux',
    {
      id: 'example/abc',
      relativePathname: '',
      query: 'foo=bar&baz=qux',
      hash: '',
      destination: 'https://example.com/123/?foo=bar&baz=qux',
    },
  ],
  [
    '/example/abc/?foo=bar&baz=qux#hash',
    {
      id: 'example/abc',
      relativePathname: '',
      query: 'foo=bar&baz=qux',
      hash: 'hash',
      destination: 'https://example.com/123/?foo=bar&baz=qux#hash',
    },
  ],
  [
    '/example/abc/#hash',
    {
      id: 'example/abc',
      relativePathname: '',
      query: '',
      hash: 'hash',
      destination: 'https://example.com/123/#hash',
    },
  ],
  [
    '/example/xyz',
    {
      id: 'example',
      relativePathname: '/xyz',
      query: '',
      hash: '',
      destination: 'https://example.com/xyz',
    },
  ],
  [
    '/example/xyz?foo=bar',
    {
      id: 'example',
      relativePathname: '/xyz',
      query: 'foo=bar',
      hash: '',
      destination: 'https://example.com/xyz?foo=bar',
    },
  ],
  [
    '/example/xyz?foo=bar&baz=qux',
    {
      id: 'example',
      relativePathname: '/xyz',
      query: 'foo=bar&baz=qux',
      hash: '',
      destination: 'https://example.com/xyz?foo=bar&baz=qux',
    },
  ],
  [
    '/example/xyz?foo=bar&baz=qux#hash',
    {
      id: 'example',
      relativePathname: '/xyz',
      query: 'foo=bar&baz=qux',
      hash: 'hash',
      destination: 'https://example.com/xyz?foo=bar&baz=qux#hash',
    },
  ],
  ['/', undefined],
];

test('parseLinkId parses known shortlinks', () => {
  for (const [data, want] of PARSE_LINK_ID_TESTS) {
    const out = parseLinkId(data, TEST_LINKS);
    expect(out, `failed on ${data}`).toStrictEqual(want);
  }
});
