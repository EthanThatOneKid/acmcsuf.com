import { expect, test } from 'vitest';
import { resolve } from './resolve';

test('resolve resolves shortlinks', () => {
  const actual = resolve(new URL('https://acmcsuf.com/github'), {
    github: 'https://github.com/ethanthatonekid/acmcsuf.com',
  });
  const expected = new URL('https://github.com/ethanthatonekid/acmcsuf.com');
  expect(actual.href).toStrictEqual(expected.href);
});

test('resolve throws for circularly recursive shortlinks', () => {
  function testCircularShortlinks() {
    return resolve(new URL('https://acmcsuf.com/zig'), {
      zig: '/zag',
      zag: '/zig',
    });
  }

  expect(testCircularShortlinks).toThrowError(/too many internal redirects/);
});

test('resolve properly combines queries', () => {
  const actual = resolve(new URL('https://acmcsuf.com/example?foo=bar'), {
    example: 'https://example.com?baz=qux',
  });
  const expected = new URL('https://example.com/?baz=qux&foo=bar');
  expect(actual.href).toStrictEqual(expected.href);
});

test('resolve properly overwrites hash', () => {
  const actual = resolve(new URL('https://acmcsuf.com/example#yang'), {
    example: 'https://example.com#yin',
  });
  expect(actual).toStrictEqual(new URL('https://example.com/#yang'));
});

test('resolve overwrites hash (2)', () => {
  const actual = resolve(new URL('https://acmcsuf.com/one#uno'), {
    one: '/two',
    two: '/three#dos',
    three: '/example#tres',
    example: 'https://example.com',
  });
  const expected = new URL('https://example.com/#uno');
  expect(actual.href).toStrictEqual(expected.href);
});

test('resolve appends pathnames', () => {
  const actual = resolve(new URL('https://acmcsuf.com/example/baz/qux'), {
    example: 'https://example.com/foo/bar',
  });
  const expected = new URL('https://example.com/foo/bar/baz/qux');
  expect(actual.href).toStrictEqual(expected.href);
});

test('resolve appends pathnames only if separated by / or end of string', () => {
  const shortlinks = { c: 'https://example.com/calendar' };
  const actual1 = resolve(new URL('https://acmcsuf.com/colors'), shortlinks);
  const expected1 = new URL('https://acmcsuf.com/colors');
  expect(actual1.href).toStrictEqual(expected1.href);

  const actual2 = resolve(new URL('https://acmcsuf.com/c'), shortlinks);
  const expected2 = new URL('https://example.com/calendar');
  expect(actual2.href).toStrictEqual(expected2.href);
});

test('resolve resolves relative paths', () => {
  const actual = resolve(new URL('https://acmcsuf.com/student-pack'), {
    'student-pack': '/blog/806',
  });
  const expected = new URL('https://acmcsuf.com/blog/806');
  expect(actual.href).toStrictEqual(expected.href);
});

test('resolve resolves alias shortlink', () => {
  const expected = new URL('https://acmcsuf.com/blog/806');
  const input = new URL('https://acmcsuf.com/student-pack');
  const actual = resolve(input, { 'student-pack': '/blog/806' });
  expect(actual.href).toStrictEqual(expected.href);
});

test('resolve returns passed URL if invalid or not found', () => {
  [
    new URL('https://acmcsuf.com/doesnotexist'),
    new URL('https://acmcsuf.com/does/not/exist'),
    new URL('https://acmcsuf.com/<invalid>'),
  ].forEach((input) => {
    expect(resolve(input, {}), `failed on ${input}`).toStrictEqual(input);
  });
});
