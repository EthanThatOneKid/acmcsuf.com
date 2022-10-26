import type { Link } from './types';

/**
 * Validate and construct recursive Link object given path and subCollection.
 * @returns type Link given valid input, undefined if path is invalid.
 */
export function validate<ID extends string>(
  path: string,
  subCollection: Record<ID, string>,
  maxInternalRedirects = 25,
  internalRedirectsCount = 0
): Link<ID> | undefined {
  if (internalRedirectsCount > maxInternalRedirects) {
    throw new Error(`too many internal redirects (max: ${maxInternalRedirects})`);
  }

  const link = fromPath(path, subCollection);
  if (link.origin) {
    return link;
  }

  if (!link.id) {
    return undefined;
  }

  link.next = validate(
    subCollection[link.id],
    subCollection,
    maxInternalRedirects,
    internalRedirectsCount + 1
  );

  return link;
}

/** Host value used to construct a URL object for relative paths. */
const NULL_ORIGIN = 'https://nullorig.in';

function fromPath<ID extends string>(path: string, subCollection: Record<ID, string>): Link<ID> {
  if (path.startsWith('//') || path.startsWith('http')) {
    return fromUrl(new URL(path));
  }

  if (!path.startsWith('/')) {
    throw new Error(`invalid path: ${path}`);
  }

  const link = fromUrl<ID>(new URL(path, NULL_ORIGIN));
  link.origin = '';

  link.id = link.pathname.slice(1) as ID;
  while (link.id.length > 0) {
    if (subCollection[link.id]) {
      break;
    }

    link.id = link.id.slice(0, link.id.lastIndexOf('/')) as ID;
  }

  if (link.id.length > 0) {
    link.relativePathname = link.pathname.slice(link.id.length + 1);
  }

  return link;
}

function fromUrl<ID extends string>(url: URL): Link<ID> {
  const { origin, pathname, search, hash } = url;

  return {
    origin,
    pathname,
    relativePathname: '',
    query: search,
    hash,
  };
}
