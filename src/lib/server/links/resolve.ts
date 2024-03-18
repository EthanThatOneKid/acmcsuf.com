/**
 * resolve a link from the collection.
 * @param url of incoming request.
 * @param shortlinks collection of shortlinks.
 * @returns computed destination url.
 */
export function resolve<ID extends string>(url: URL, shortlinks: Record<ID, string>): URL {
  const foundURL = findURL(url.pathname, shortlinks, url.origin);
  if (!foundURL) {
    return url;
  }

  const { pathname, query: initialQuery, hash: initialHash, destination: dst } = foundURL;
  const hash = url.hash || initialHash || dst.hash;
  const query = combineQueries(dst.search, initialQuery, url.search);
  return new URL(`${dst.origin}${dst.pathname}${pathname}${query}${hash}`);
}

interface FoundURL {
  pathname: string;
  query: string;
  hash: string;
  destination: URL;
}

function findURL<ID extends string>(
  pathname: string,
  shortlinks: Record<ID, string>,
  destinationOrigin: string,
  maxInternalRedirects = 256
): FoundURL {
  let initialId: ID | undefined;
  let initialHash: string | undefined;
  let initialQuery: string | undefined;
  let relativePathname = '';
  while (maxInternalRedirects-- > 0) {
    const hashIdx = pathname.lastIndexOf('#');
    if (hashIdx > -1) {
      if (initialHash === undefined) {
        initialHash = pathname.slice(hashIdx);
      }

      pathname = pathname.slice(0, hashIdx);
    }

    const queryIdx = pathname.lastIndexOf('?');
    if (queryIdx > -1) {
      if (initialQuery === undefined) {
        initialQuery = pathname.slice(queryIdx);
      }

      pathname = pathname.slice(0, queryIdx);
    }

    let id = pathname.slice(1) as ID;
    while (id.length > 0 && !shortlinks[id]) {
      const slashIndex = id.lastIndexOf('/');
      if (slashIndex === -1) {
        break;
      }

      id = id.slice(0, slashIndex) as ID;
    }

    if (!shortlinks[id]) {
      return {
        pathname: relativePathname,
        query: initialQuery || '',
        hash: initialHash || '',
        destination: new URL(pathname, destinationOrigin),
      };
    }

    if (shortlinks[id].startsWith('http')) {
      relativePathname = pathname.slice(id.length + 1) + relativePathname;

      return {
        pathname: relativePathname,
        query: initialQuery || '',
        hash: initialHash || '',
        destination: new URL(shortlinks[id]),
      };
    }

    if (shortlinks[id].startsWith('/')) {
      relativePathname = pathname.slice(id.length + 1) + relativePathname;
      pathname = shortlinks[id];

      if (!initialId) {
        initialId = id;
      }

      continue;
    }
  }

  throw new Error('too many internal redirects');
}

function combineQueries(baseQuery: string, ...queries: string[]): string {
  const baseQueryParams = new URLSearchParams(baseQuery);

  const queryParams = queries.map((q) => new URLSearchParams(q));
  for (const params of queryParams) {
    for (const [key, value] of params) {
      baseQueryParams.set(key, value);
    }
  }

  const query = baseQueryParams.toString();
  return query.length > 0 ? `?${query}` : '';
}
