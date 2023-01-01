export const LATEST = 'latest';

export function makeCertificateJsonUrl(username: string, release = LATEST): string {
  return `/@${username}/${release}.json`;
}
