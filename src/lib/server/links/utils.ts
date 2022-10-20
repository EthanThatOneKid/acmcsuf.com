import QRCode from 'qrcode';
import type { Link, ParsedLink } from './types';

/** parseLink parses the incoming link from a request. */
export function parseLink(url: string): ParsedLink {
  const hashBeginIdx = url.lastIndexOf('#');
  let hashStr = '';
  if (hashBeginIdx !== -1) {
    hashStr = url.slice(hashBeginIdx + 1);
    url = url.slice(0, hashBeginIdx);
  }

  const queryBeginIdx = url.indexOf('?');
  let queryStr = '';

  if (queryBeginIdx !== -1) {
    queryStr = url.slice(queryBeginIdx + 1);
    url = url.slice(0, queryBeginIdx);
  }

  const relativePathnameStr = url
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-zA-Z0-9-:\./]/g, '')
    .toLowerCase();

  return { relativePathname: relativePathnameStr, query: queryStr, hash: hashStr };
}

/**
 * findLinkId finds the earliest occurring link ID in given collection of links
 * for the given relative pathname segments.
 */
export function findLinkId<ID extends string>(
  segments: string[],
  subCollection: Record<ID, string>,
  separator = '/'
): ID | undefined {
  let id = segments.join(separator) as ID;
  while (id.length > 0) {
    if (subCollection[id]) return id;
    id = id.slice(0, id.lastIndexOf(separator)) as ID;
  }
}

/**
 * parseLinkId parses the relavent info (e.g. relative pathname, query string,
 * and hash) from an absolute pathname. If no link ID is found, undefined
 * is returned.
 *
 * This function is useful for SvelteKit's server-side routes and hooks.
 *
 * @param url The URL to convert.
 * @param subCollection The collection of links to search.
 * @returns The link object.
 */
export function parseLinkId<ID extends string>(
  url: string,
  subCollection: Record<ID, string>,
  separator = '/'
): Link<ID> | undefined {
  if (!url.startsWith(separator)) return;

  const link = parseLink(url);
  const segments = link.relativePathname.split(separator);
  const id = findLinkId(segments, subCollection, separator);
  if (id === undefined) return;

  const internalRedirect = parseLinkId(subCollection[id], subCollection, separator);

  let query = link.query;
  if (internalRedirect?.query) {
    query = `${internalRedirect.query}&${query}`;
  }

  const hash = (link.hash || internalRedirect?.hash) ?? '';

  let relativePathname = link.relativePathname.slice(id.length);
  let precomputedDestination = subCollection[id];
  if (internalRedirect) {
    relativePathname = `${internalRedirect.relativePathname}${relativePathname}`;

    precomputedDestination = internalRedirect.destination;
    const lastQueryIndex = precomputedDestination.indexOf('?');
    const lastHashIndex = precomputedDestination.indexOf('#');
    if (lastQueryIndex !== -1 && lastHashIndex !== -1) {
      precomputedDestination = precomputedDestination.slice(
        0,
        Math.min(lastQueryIndex, lastHashIndex)
      );
    } else if (lastQueryIndex !== -1) {
      precomputedDestination = precomputedDestination.slice(0, lastQueryIndex);
    } else if (lastHashIndex !== -1) {
      precomputedDestination = precomputedDestination.slice(0, lastHashIndex);
    }
  }

  const destination =
    precomputedDestination +
    relativePathname +
    (query ? `?${query}` : '') +
    (hash ? `#${hash}` : '');

  return {
    id,
    query,
    hash,
    relativePathname,
    destination,
  };
}

export function genQRCodeSvg(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    QRCode.toString(url, { type: 'svg' }, (err, svg: string | PromiseLike<string>) => {
      if (err) reject(err);
      resolve(svg);
    });
  });
}
