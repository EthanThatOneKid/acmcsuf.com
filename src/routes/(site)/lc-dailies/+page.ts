import type { PageLoadEvent } from './$types';
import { LCDailiesAPIClient } from '$lib/public/lc-dailies';

export async function load({ fetch }: PageLoadEvent) {
  const apiClient = new LCDailiesAPIClient(fetch);
  const seasons = await apiClient.listSeasons();
  return { seasons };
}
