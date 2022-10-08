import QRCode from 'qrcode';
import type { Link, ParsedLink } from './types';

export function parseLink(url: string): ParsedLink | undefined {
  const hashBeginIdx = url.lastIndexOf('#');
  let hashStr = '';
  if (hashBeginIdx !== -1) {
    hashStr = url.slice(hashBeginIdx + 1);
    url = url.slice(0, hashBeginIdx);
  }

  const queryBeginIdx = url.indexOf('?');
  let queryStr = '';
  if (queryBeginIdx !== -1) {
    queryStr = queryBeginIdx === -1 ? '' : url.slice(queryBeginIdx + 1);
    url = url.slice(0, queryBeginIdx);
  }

  const relativePathnameStr = url
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-zA-Z0-9-/]/g, '')
    .toLowerCase();

  return { relativePathname: relativePathnameStr, query: queryStr, hash: hashStr };
}

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
 * Converts a URL to a link object.
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
  if (!link) return;

  const id = findLinkId(link.relativePathname.split(separator), subCollection, separator);
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
