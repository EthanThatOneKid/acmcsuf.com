import { validate } from './validate';

/** Validate and construct recursive Link string given path and subCollection. */
export function resolve<ID extends string>(
  path: string,
  subCollection: Record<ID, string>
): string {
  const link = validate(path, subCollection);
  if (!link) {
    throw new Error(`not found: ${path}`);
  }

  const { relativePathname, query, hash } = link;
  let next = link.next;
  let dstRelativePathname = relativePathname;
  let dstQuery = '';
  let dstHash = hash;

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

  // @ts-ignore
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

  return `${one}&${two.slice(1)}`;
}
