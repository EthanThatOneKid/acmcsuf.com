import { test, expect } from 'vitest';
import { Manager } from './manager';

test('Manager throws for circularly recursive shortlinks', () => {
  expect(() => new Manager({ zig: '/zag', zag: '/zig' })).toThrowError(
    /invalid shortlink collection: too many redirects/
  );
});

test('Manager expands valid shortlinks to URL map', () => {
  expect(
    new Manager({
      github: 'https://github.com/ethanthatonekid/acmcsuf.com',
      readme: '/github#readme',
      arch: '/github/blob/main/ARCHITECTURE.md',
      issues: '/github/issues',
      gfi: '/issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue"',
    }).collection
  ).toStrictEqual(
    new Map([
      ['github', new URL('https://github.com/ethanthatonekid/acmcsuf.com')],
      ['issues', new URL('https://github.com/ethanthatonekid/acmcsuf.com/issues')],
      ['arch', new URL('https://github.com/ethanthatonekid/acmcsuf.com/blob/main/ARCHITECTURE.md')],
      ['readme', new URL('https://github.com/ethanthatonekid/acmcsuf.com#readme')],
      [
        'gfi',
        new URL(
          'https://github.com/ethanthatonekid/acmcsuf.com/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22'
        ),
      ],
    ])
  );
});

test('Manager resolve properly combines queries', () => {
  const manager = new Manager({ example: 'https://example.com?baz=qux' });
  const out = manager.resolve(new URL('https://acmcsuf.com/example?foo=bar'));
  expect(out).toStrictEqual(new URL('https://example.com/?baz=qux&foo=bar'));
});

test('Manager resolve properly overwrites hash', () => {
  const manager = new Manager({ example: 'https://example.com#yang' });
  const out = manager.resolve(new URL('https://acmcsuf.com/example#yin'));
  expect(out).toStrictEqual(new URL('https://example.com/#yang'));
});

test('Manager resolve overwrites hash (2)', () => {
  const manager = new Manager({
    one: '/two',
    two: '/three#dos',
    three: '/example#tres',
    example: 'https://example.com',
  });
  expect(manager.collection).toEqual(
    new Map([
      ['example', new URL('https://example.com/')],
      ['three', new URL('https://example.com/#tres')],
      ['one', new URL('https://example.com/')],
      ['two', new URL('https://example.com/#dos')],
    ])
  );

  const out = manager.resolve(new URL('https://acmcsuf.com/one#uno'));
  expect(out).toStrictEqual(new URL('https://example.com/#uno'));
});

test('Manager resolve appends pathnames', () => {
  const manager = new Manager({ example: 'https://example.com/foo/bar' });
  const out = manager.resolve(new URL('https://acmcsuf.com/example/baz/qux'));
  expect(out).toStrictEqual(new URL('https://example.com/foo/bar/baz/qux'));
});
