import type { PageLoadEvent } from './$types';
import type { CertificatePageData } from '$lib/public/certificates';
import { LATEST, makeCertificateJsonUrl } from '$lib/public/certificates/urls';

export async function load({ fetch, params, url }: PageLoadEvent) {
  const release = url.searchParams.get('release') ?? LATEST;
  const response = await fetch(makeCertificateJsonUrl(params.username, release));
  return (await response.json()) as CertificatePageData;
}
