import type { PageLoadEvent } from "./$types";
import type { RepositoryCertificatePageData } from "$lib/public/certificates";
import { makeRepositoryCertificatePageDataURL } from "$lib/public/certificates/urls";

export async function load({ fetch, params }: PageLoadEvent) {
  const response = await fetch(
    makeRepositoryCertificatePageDataURL(params.username, params.repo_name),
  );
  const data: RepositoryCertificatePageData = await response.json();
  return data;
}
