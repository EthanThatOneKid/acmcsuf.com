import { validate } from './validate';

/** Validate and construct recursive Link string given path and subCollection. */
export function resolve<ID extends string>(
  path: string,
  subCollection: Record<ID, string>
): string {
  const link = validate(path, subCollection);
  if (!link) {
    return '';
  }

  const { relativePathname, query, hash } = link;
  let { next, relativePathname: dstRelativePathname, query: dstQuery, hash: dstHash } = link;
  while (next) {
    dstRelativePathname += next.relativePathname;

    if (next.query && !dstQuery) {
      dstQuery = next.query;
    }

    if (next.hash && !dstHash) {
      dstHash = next.hash;
    }

    if (!next.next) {
      break;
    }

    next = next.next;
  }

  if (!next) {
    return '';
  }

  const dst = `${next.origin}${next.pathname}${dstRelativePathname}${relativePathname}`;
  return `${dst}${combineQueries(dstQuery, query)}${hash || dstHash}`;
}

function combineQueries(one: string, two: string) {
  if (!one) {
    return two;
  }

  if (!two) {
    return one;
  }

  return `${one}${two.startsWith('?') ? two.slice(1) : two}`;
}
