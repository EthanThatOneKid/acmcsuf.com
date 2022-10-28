/**
 * resolve a link from the collection.
 * @param url of incoming request.
 * @param shortlinks collection of shortlinks.
 * @returns computed destination url.
 */
export function resolve<ID extends string>(url: URL, shortlinks: Record<ID, string>): URL {
  const [computedPathname, dst] = findURL(url.pathname, shortlinks);
  // const relativePathname = computedPathname + url.pathname.slice(id.length + 1);
  const hash = url.hash || dst.hash;
  const query = combineQueries(dst.search, url.search);
  // console.log({ url, id, computedPathname, dst, relativePathname, hash, query });
  return new URL(`${dst.origin}${dst.pathname}${computedPathname}${query}${hash}`);
}

function findURL<ID extends string>(
  pathname: string,
  shortlinks: Record<ID, string>,
  maxInternalRedirects = 256
): [string, URL] {
  let initialId: ID | undefined;
  while (maxInternalRedirects-- > 0) {
    const irrelevantIdx = Math.max(pathname.lastIndexOf('?'), pathname.lastIndexOf('#'));
    if (irrelevantIdx > -1) {
      pathname = pathname.slice(0, irrelevantIdx);
    }

    let id = pathname.slice(1) as ID;
    let relativePathname = '';
    while (id.length > 0 && !shortlinks[id]) {
      id = id.slice(0, id.lastIndexOf('/')) as ID;
    }

    if (!shortlinks[id]) {
      throw new Error(`unknown path: ${pathname}`);
    }

    if (shortlinks[id].startsWith('http')) {
      relativePathname += pathname.slice(id.length + 1);
      console.log({ id, pathname, shortlinks, relativePathname, irrelevantIdx });
      return [/*initialId ?? id,*/ relativePathname, new URL(shortlinks[id])];
    }

    if (shortlinks[id].startsWith('/')) {
      relativePathname += pathname.slice(id.length + 1);
      pathname = shortlinks[id];

      if (!initialId) {
        initialId = id;
      }

      continue;
    }

    throw new Error(`invalid path: ${shortlinks[id]}`);
  }

  throw new Error('too many internal redirects');
}

function combineQueries(baseQuery: string, query: string): string {
  if (!query) {
    return baseQuery;
  }

  return `${baseQuery}${baseQuery ? '&' : '?'}${query.slice(1)}`;
}
