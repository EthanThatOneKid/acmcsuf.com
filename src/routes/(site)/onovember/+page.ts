import type { PageLoadEvent } from './$types';
import { LCDailiesAPIClient, onovember } from '$lib/public/lc-dailies';

export async function load({ fetch }: PageLoadEvent) {
  const apiClient = new LCDailiesAPIClient(fetch);
  return {
    onovembers: onovember(await apiClient.listSeasons()),
  };
}
