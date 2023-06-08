export const LATEST = 'latest';

export function makeCertificatePageDataURL(username: string, release = LATEST): string {
  return `/@${username}/${release}.json`;
}

export function makeCertificatePageURL(username: string, release = LATEST): string {
  return `/@${username}?release=${release}`;
}
