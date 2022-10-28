export class Manager<ID extends string> {
  public readonly collection: Map<ID, URL>;

  constructor(private readonly shortlinks: Record<ID, string>) {
    this.collection = fromShortlinks(this.shortlinks);
  }

  /**
   * resolve a link from the collection.
   * @param url of incoming request.
   * @returns computed destination url.
   */
  resolve(url: URL): URL | undefined {
    let id = url.pathname.slice(1) as ID;
    let destination: URL;
    while (true) {
      const dst = this.collection.get(id);
      if (dst) {
        destination = dst;
        break;
      }

      const idEndIdx = id.lastIndexOf('/');
      if (idEndIdx === -1) {
        return undefined;
      }

      id = id.slice(0, idEndIdx) as ID;
    }

    const relativePathname = url.pathname.slice(id.length + 1);
    const derived = new URL(relativePathname + url.search + url.hash, destination);
    console.log({ derived, relativePathname, destination, url });
    return derived;
  }
}

/**
 * fromShortlinks - Expands aliases in a collection of links.
 * @param collection - The collection of links to expand.
 * @returns The collection of links with aliases expanded.
 */
function fromShortlinks<ID extends string>(
  shortlinks: Record<ID, string>,
  loopBudget = 256
): Map<ID, URL> {
  const collection = new Map<ID, URL>();

  const shortlinkIds = Object.keys(shortlinks) as ID[];
  while (shortlinkIds.length > collection.size && loopBudget-- > 0) {
    for (
      let i = 0, id = shortlinkIds[i];
      shortlinkIds.length > collection.size && i < shortlinkIds.length;
      id = shortlinkIds[++i]
    ) {
      if (collection.has(id)) {
        continue;
      }

      let dst = shortlinks[id];
      if (dst.startsWith('http')) {
        collection.set(id, new URL(dst));
        loopBudget++;
        continue;
      }

      if (!dst.startsWith('/')) {
        throw new Error(`invalid path: ${dst}`);
      }

      let hash = '';
      let hashIdx = dst.indexOf('#');
      if (hashIdx > -1) {
        hash = dst.slice(hashIdx);
        dst = dst.slice(0, hashIdx);
      }

      let query = '';
      let queryIdx = dst.indexOf('?');
      if (queryIdx > -1) {
        query = dst.slice(queryIdx);
        dst = dst.slice(0, queryIdx);
      }

      let dstId = dst.slice(1) as ID;
      while (dstId.length > 0 && !shortlinks[dstId]) {
        dstId = dstId.slice(0, dstId.lastIndexOf('/')) as ID;
      }

      let relativePath = dst.slice(dstId.length + 1);
      dst = shortlinks[dstId];
      if (!dst) {
        throw new Error(`unknown path: ${shortlinks[id]}`);
      }

      hashIdx = dst.lastIndexOf('#');
      if (hashIdx > -1) {
        if (!hash) {
          hash = dst.slice(hashIdx);
        }

        dst = dst.slice(0, hashIdx);
      }

      queryIdx = dst.lastIndexOf('?');
      if (queryIdx > -1) {
        query = `${dst.slice(queryIdx)}&${query.slice(1)}`;
        dst = dst.slice(0, queryIdx);
      }

      shortlinks[id] = dst + relativePathname + query + hash;
    }
  }

  if (loopBudget === 0) {
    throw new Error('invalid shortlink collection: too many redirects');
  }

  return collection;
}
