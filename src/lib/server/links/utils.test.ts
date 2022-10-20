import { test, expect } from 'vitest';
import { parseLinkId, parseLink, findLinkId } from './utils';

const TEST_LINKS = {
  example: 'https://example.com',
  'example/abc': 'https://example.com/123/',
  'example/xyz': '/example/789',
  'example/double-redirect': '/example/xyz/456',
};

test('findLinkId finds the correct link ID', () => {
  expect(findLinkId(['example'], TEST_LINKS)).toBe('example');
  expect(findLinkId(['example', 'abc'], TEST_LINKS)).toBe('example/abc');
  expect(findLinkId(['example', 'abc', 'def'], TEST_LINKS)).toBe('example/abc');
  expect(findLinkId(['example', 'unknown'], TEST_LINKS)).toBe('example');
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
    '/example/path/to/greatness',
    {
      id: 'example',
      relativePathname: '/path/to/greatness',
      query: '',
      hash: '',
      destination: 'https://example.com/path/to/greatness',
    },
  ],
  [
    '/example/path/to/greatness?foo=bar',
    {
      id: 'example',
      relativePathname: '/path/to/greatness',
      query: 'foo=bar',
      hash: '',
      destination: 'https://example.com/path/to/greatness?foo=bar',
    },
  ],
  [
    '/example/path/to/greatness?foo=bar&baz=qux',
    {
      id: 'example',
      relativePathname: '/path/to/greatness',
      query: 'foo=bar&baz=qux',
      hash: '',
      destination: 'https://example.com/path/to/greatness?foo=bar&baz=qux',
    },
  ],
  [
    '/example/path/to/greatness?foo=bar&baz=qux#hash',
    {
      id: 'example',
      relativePathname: '/path/to/greatness',
      query: 'foo=bar&baz=qux',
      hash: 'hash',
      destination: 'https://example.com/path/to/greatness?foo=bar&baz=qux#hash',
    },
  ],
  ['/', undefined],
  [
    '/example/xyz',
    {
      id: 'example/xyz',
      relativePathname: '',
      query: '',
      hash: '',
      destination: 'https://example.com/789',
    },
  ],
  [
    '/example/xyz?foo=bar',
    {
      id: 'example/xyz',
      relativePathname: '',
      query: 'foo=bar',
      hash: '',
      destination: 'https://example.com/789?foo=bar',
    },
  ],
  [
    '/example/xyz?foo=bar&baz=qux',
    {
      id: 'example/xyz',
      relativePathname: '',
      query: 'foo=bar&baz=qux',
      hash: '',
      destination: 'https://example.com/789?foo=bar&baz=qux',
    },
  ],
  [
    '/example/xyz?foo=bar&baz=qux#hash',
    {
      id: 'example/xyz',
      relativePathname: '',
      query: 'foo=bar&baz=qux',
      hash: 'hash',
      destination: 'https://example.com/789?foo=bar&baz=qux#hash',
    },
  ],
  [
    '/example/xyz#hash',
    {
      id: 'example/xyz',
      relativePathname: '',
      query: '',
      hash: 'hash',
      destination: 'https://example.com/789#hash',
    },
  ],
  [
    '/example/xyz/path/to/greatness',
    {
      id: 'example/xyz',
      relativePathname: '/path/to/greatness',
      query: '',
      hash: '',
      destination: 'https://example.com/789/path/to/greatness',
    },
  ],
  [
    '/example/xyz/path/to/greatness?foo=bar',
    {
      id: 'example/xyz',
      relativePathname: '/path/to/greatness',
      query: 'foo=bar',
      hash: '',
      destination: 'https://example.com/789/path/to/greatness?foo=bar',
    },
  ],
  [
    '/example/xyz/path/to/greatness?foo=bar&baz=qux',
    {
      id: 'example/xyz',
      relativePathname: '/path/to/greatness',
      query: 'foo=bar&baz=qux',
      hash: '',
      destination: 'https://example.com/789/path/to/greatness?foo=bar&baz=qux',
    },
  ],
  [
    '/example/xyz/path/to/greatness?foo=bar&baz=qux#hash',
    {
      id: 'example/xyz',
      relativePathname: '/path/to/greatness',
      query: 'foo=bar&baz=qux',
      hash: 'hash',
      destination: 'https://example.com/789/path/to/greatness?foo=bar&baz=qux#hash',
    },
  ],
  [
    '/example/xyz/path/to/greatness#hash',
    {
      id: 'example/xyz',
      relativePathname: '/path/to/greatness',
      query: '',
      hash: 'hash',
      destination: 'https://example.com/789/path/to/greatness#hash',
    },
  ],
  [
    '/example/double-redirect',
    {
      id: 'example/double-redirect',
      relativePathname: '',
      query: '',
      hash: '',
      destination: 'https://example.com/789/456',
    },
  ],
  [
    '/example/double-redirect?foo=bar',
    {
      id: 'example/double-redirect',
      relativePathname: '',
      query: 'foo=bar',
      hash: '',
      destination: 'https://example.com/789/456?foo=bar',
    },
  ],
  [
    '/example/double-redirect?foo=bar&baz=qux',
    {
      id: 'example/double-redirect',
      relativePathname: '',
      query: 'foo=bar&baz=qux',
      hash: '',
      destination: 'https://example.com/789/456?foo=bar&baz=qux',
    },
  ],
  [
    '/example/double-redirect?foo=bar&baz=qux#hash',
    {
      id: 'example/double-redirect',
      relativePathname: '',
      query: 'foo=bar&baz=qux',
      hash: 'hash',
      destination: 'https://example.com/789/456?foo=bar&baz=qux#hash',
    },
  ],
  [
    '/example/double-redirect#hash',
    {
      id: 'example/double-redirect',
      relativePathname: '',
      query: '',
      hash: 'hash',
      destination: 'https://example.com/789/456#hash',
    },
  ],
];

test('parseLinkId parses known shortlinks', () => {
  for (const [data, want] of PARSE_LINK_ID_TESTS) {
    const out = parseLinkId(data, TEST_LINKS);
    expect(out, `failed on ${data}`).toStrictEqual(want);
  }
});

test('parseLinkId combines queries', () => {
  expect(
    parseLinkId('/example/abc?baz=qux', {
      example: 'https://example.com?foo=bar',
    })
  ).toStrictEqual({
    id: 'example',
    relativePathname: '/abc',
    query: 'baz=qux',
    hash: '',
    destination: 'https://example.com/abc?foo=bar&baz=qux',
  });
});

test('parseLinkId overwrites hash', () => {
  expect(
    parseLinkId('/example/abc#overwrite_hash', {
      example: 'https://example.com#default_hash',
    })
  ).toStrictEqual({
    id: 'example',
    relativePathname: '/abc',
    query: '',
    hash: 'overwrite_hash',
    destination: 'https://example.com/abc#overwrite_hash',
  });
});
