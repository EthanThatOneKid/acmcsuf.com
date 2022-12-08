import type { PageLoadEvent } from './$types';
import type { Contributor } from '$lib/public/contributors';
import { makeContributorJsonUrl } from '$lib/public/contributors';

export async function load({ fetch, params }: PageLoadEvent) {
  const target = makeContributorJsonUrl(params.tag);
  const response = await fetch(target);
  const contributor = await response.json()as Contributor;

  return {    contributor  };
}
