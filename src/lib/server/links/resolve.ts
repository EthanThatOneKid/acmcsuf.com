import type { Link } from './types';

/**
 * # Shortlink recursive algorithm
 *
 * ## Sample link collection
 *
 * | ID     | Destination                                               |
 * | ------ | --------------------------------------------------------- |
 * | github | https://github.com/ethanthatonekid/acmcsuf.com            |
 * | arch   | /github/blob/main/ARCHITECTURE.md                         |
 * | issues | /github/issues                                            |
 * | gfi    | /issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue" |
 *
 * ## Example shortlink invocations
 *
 * ### `/github`
 *
 * 1. Enter `parseRedirect('/github')`
 * 1. Find ID `github`, destination `https://github.com/ethanthatonekid/acmcsuf.com`
 * 1. Destination does not begin with `/`, so build and return the final destination
 * 1. Final destination `https://github.com/ethanthatonekid/acmcsuf.com`
 *
 * ### `/github?a=1&b=2`
 *
 * 1. Enter `parseRedirect('/github?a=1&b=2')` find destination
 * 1. Enter `parseLink('/github?a=1&b=2')`, find query `a=1&b=2`
 * 1. Find ID `github`, destination `https://github.com/ethanthatonekid/acmcsuf.com`
 * 1. Destination does not begin with `/`, so build and return the final destination
 * 1. Final destination `https://github.com/ethanthatonekid/acmcsuf.com` + `?a=1&b=2`
 *
 * ### `/issues`
 *
 * 1. Enter `parseRedirect('/issues')`
 * 1. Find ID `issues`, destination `/github/issues`, relative pathname `/issues`
 * 1. Enter `parseRedirect('/github')`
 * 1. Find ID `github`, destination `https://github.com/ethanthatonekid/acmcsuf.com`
 * 1. Destination does not begin with `/`, so build and return the final destination
 * 1. Final destination `https://github.com/ethanthatonekid/acmcsuf.com` + `/issues`
 *
 * ### `/gfi`
 *
 * 1. Enter `parseRedirect('/gfi')`
 * 1. Find ID `gfi`, destination `/issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue"`, empty relative pathname
 * 1. Find query `q=is%3Aopen+is%3Aissue+label%3A"good+first+issue"`
 * 1. Enter `parseRedirect('/issues')`
 * 1. Find ID `issues`, destination `/github/issues`, relative pathname `/issues`
 * 1. Enter `parseRedirect('/github')`
 * 1. Find ID `github`, destination `https://github.com/ethanthatonekid/acmcsuf.com`
 * 1. Destination does not begin with `/`, so build and return the final destination
 * 1. Final destination `https://github.com/ethanthatonekid/acmcsuf.com` + `/issues` + `?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue"`
 *
 * ---
 *
 * @see https://go.dev/play/p/aDO_YJWrT_C
 */
export function resolve<ID extends string>(
  source: string,
  subCollection: Record<ID, string>,
  maxInternalRedirects = 25,
  internalRedirectsCount = 0
): [string, Link<ID>] {
  if (internalRedirectsCount > maxInternalRedirects) {
    throw new Error(`too many internal redirects (max: ${maxInternalRedirects})`);
  }

  let srcLink = parsePath(source, subCollection);
  if (!srcLink.id) throw new Error('shortlink not found');

  const curLink = parsePath(subCollection[srcLink.id], subCollection);
  let dstLink = combineLinks(curLink, srcLink);

  // If the destination is not a shortlink, return the final destination.
  if (!dstLink.id) {
    if (!dstLink.base) {
      throw new Error('shortlink destination is invalid');
    }
    const destination = dstLink.base + dstLink.relativePathname + dstLink.query + dstLink.hash;
    return [destination, dstLink];
  }

  // If the destination is a shortlink, recursively resolve it.
  const [, rdrLink] = resolve(
    dstLink.pathname,
    subCollection,
    maxInternalRedirects,
    internalRedirectsCount + 1
  );
  if (!rdrLink.base) {
    throw new Error('internal redirect base cannot be empty');
  }

  // Reset the relative pathname to the source relative pathname.
  if (dstLink.relativePathname !== srcLink.relativePathname) {
    dstLink.relativePathname = srcLink.relativePathname;
  }

  // // Remove irrelevant query from the destination link.
  // if (dstLink.query !== srcLink.query) {
  //   dstLink.query = srcLink.query;
  // }

  // // Remove irrelevant hash from the destination link.
  // if (dstLink.hash !== srcLink.hash) {
  //   dstLink.hash = srcLink.hash;
  // }

  dstLink = combineLinks(rdrLink, dstLink);
  const destination = dstLink.base + dstLink.relativePathname + dstLink.query + dstLink.hash;
  return [destination, dstLink];
}

/** combineLinks */
function combineLinks<T extends string>(dst: Link<T>, src: Link<T>): Link<T> {
  dst.relativePathname += src.relativePathname;

  if (src.query && dst.query) {
    dst.query += `&${src.query}`;
  } else if (src.query && !dst.query) {
    dst.query = src.query;
  }

  if (src.hash) {
    dst.hash = src.hash;
  }

  return dst;
}

const NULL_HOST = 'nullorig.in';

/** parseUrl */
function parseUrl(url: string): URL | undefined {
  if (url.startsWith('/')) {
    url = `https://${NULL_HOST}${url}`;
  }
  try {
    return new URL(url);
  } catch {
    return undefined;
  }
}

/** parsePath */
function parsePath<ID extends string>(path: string, subCollection: Record<ID, string>): Link<ID> {
  const url = parseUrl(path);
  if (!url) {
    return { pathname: path, base: '', relativePathname: '', query: '', hash: '' };
  }

  let id: ID | undefined;
  if (url.host === NULL_HOST) {
    id = url.pathname.slice(1) as ID;
    while (id.length > 0) {
      if (subCollection[id]) break;
      id = id.slice(0, id.lastIndexOf('/')) as ID;
    }
  }

  return {
    id,
    base: url.host === NULL_HOST ? '' : url.origin,
    pathname: url.pathname,
    relativePathname: url.pathname.slice(id ? id.length + 1 : 0),
    query: url.search,
    hash: url.hash,
  };
}
