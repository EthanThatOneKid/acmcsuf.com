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
    .replace(/[^a-zA-Z0-9-/]/g, '')
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
 * parseLinkId parses the incoming link from a request and finds the highest priority link ID for
 * the given path segments and a collection of links. If no link ID is found, undefined is returned.
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
  const link = parseLink(url);
  const segments = link.relativePathname.split(separator);
  const id = findLinkId(segments, subCollection, separator);
  if (id === undefined) return;

  const relativePathname = link.relativePathname.slice(id.length);
  const { query, hash } = link;
  const destination =
    subCollection[id] + relativePathname + (query ? `?${query}` : '') + (hash ? `#${hash}` : '');

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
