import type { PageLoadEvent } from './$types';
import type { ReleaseCertificatePageData } from '$lib/public/certificates';
import { LATEST, makeReleaseCertificatePageDataURL } from '$lib/public/certificates/urls';

export async function load({ fetch, params, url }: PageLoadEvent) {
  const release = url.searchParams.get('release') ?? LATEST;
  const response = await fetch(makeReleaseCertificatePageDataURL(params.username, release));
  const data: ReleaseCertificatePageData = await response.json();
  return data;
}
