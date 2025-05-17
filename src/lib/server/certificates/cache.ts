import { Cache } from "$lib/server/cache/cache";
import type {
  ReleaseCertificatePageData,
  RepositoryCertificatePageData,
} from "$lib/public/certificates";

export const cachedPageData = new Cache(
  new Map<string, ReleaseCertificatePageData | RepositoryCertificatePageData>(),
);

export function makeCacheKey(
  repoName: string,
  username: string,
  version?: string,
) {
  return `${repoName}-${username}${version ? `-${version}` : ""}`;
}
