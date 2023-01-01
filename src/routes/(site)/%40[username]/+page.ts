import type { PageLoadEvent } from './$types';
import type { Certificate } from '$lib/public/certificates';
import { makeCertificateJsonUrl } from '$lib/public/certificates/urls';

export async function load({ fetch, params }: PageLoadEvent) {
  const response = await fetch(makeCertificateJsonUrl(params.username));
  return (await response.json()) as { certificate: Certificate };
}
