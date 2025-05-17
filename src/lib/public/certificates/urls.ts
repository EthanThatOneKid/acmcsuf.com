export const LATEST = "latest";

export function makeReleaseCertificatePageDataURL(
  username: string,
  release = LATEST,
): string {
  return `${
    makeRepositoryCertificatePageDataURL(username, "~")
  }?release=${release}`;
}

export function makeReleaseCertificatePageURL(
  username: string,
  release = LATEST,
): string {
  return `/@${username}?release=${release}`;
}

export function makeRepositoryCertificatePageDataURL(
  username: string,
  repoName: string,
): string {
  return `/@${username}/${repoName}.json`;
}

export function makeRepositoryCertificatePageURL(
  username: string,
  repoName: string,
): string {
  return `/@${username}/${repoName}`;
}
