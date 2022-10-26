import { test, expect } from 'vitest';
import { TESTLINKS } from './testdata';
import { validate } from './validate';

const TESTDATA_VALID: Array<[string, ReturnType<typeof validate>]> = [
  [
    '/github',
    {
      id: 'github',
      pathname: '/github',
      origin: '',
      relativePathname: '',
      query: '',
      hash: '',
      next: {
        origin: 'https://github.com',
        pathname: '/ethanthatonekid/acmcsuf.com',
        query: '',
        hash: '',
        relativePathname: '',
      },
    },
  ],
  [
    '/readme',
    {
      id: 'readme',
      pathname: '/readme',
      origin: '',
      relativePathname: '',
      query: '',
      hash: '',
      next: {
        id: 'github',
        pathname: '/github',
        origin: '',
        query: '',
        hash: '#readme',
        relativePathname: '',
        next: {
          origin: 'https://github.com',
          pathname: '/ethanthatonekid/acmcsuf.com',
          query: '',
          hash: '',
          relativePathname: '',
        },
      },
    },
  ],
  [
    '/arch#srcroutes-',
    {
      id: 'arch',
      pathname: '/arch',
      origin: '',
      relativePathname: '',
      query: '',
      hash: '#srcroutes-',
      next: {
        id: 'github',
        pathname: '/github/blob/main/ARCHITECTURE.md',
        origin: '',
        relativePathname: '/blob/main/ARCHITECTURE.md',
        query: '',
        hash: '',
        next: {
          origin: 'https://github.com',
          pathname: '/ethanthatonekid/acmcsuf.com',
          query: '',
          hash: '',
          relativePathname: '',
        },
      },
    },
  ],
  [
    '/gfi',
    {
      id: 'gfi',
      pathname: '/gfi',
      relativePathname: '',
      origin: '',
      query: '',
      hash: '',
      next: {
        id: 'issues',
        pathname: '/issues',
        relativePathname: '',
        origin: '',
        query: '?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22',
        hash: '',
        next: {
          id: 'github',
          pathname: '/github/issues',
          relativePathname: '/issues',
          origin: '',
          query: '',
          hash: '',
          next: {
            origin: 'https://github.com',
            pathname: '/ethanthatonekid/acmcsuf.com',
            query: '',
            hash: '',
            relativePathname: '',
          },
        },
      },
    },
  ],
];

test('validate validates valid shortlinks', () => {
  for (const [validPath, expected] of TESTDATA_VALID) {
    const out = validate(validPath, TESTLINKS);
    expect(out).toEqual(expected);
  }
});

const TESTDATA_INVALID: Array<[string, RegExp]> = [
  ['', /Invalid path: /],
  ['invalid', /Invalid path: invalid/],
];

test('validate throws validating invalid shortlinks', () => {
  for (const [invalidPath, expected] of TESTDATA_INVALID) {
    expect(() => validate(invalidPath, TESTLINKS)).toThrowError(expected);
  }
});
