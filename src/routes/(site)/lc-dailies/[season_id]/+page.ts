import type { PageLoadEvent } from './$types';
import { LCDailiesAPIClient } from '$lib/public/lc-dailies';

export async function load({ fetch, params }: PageLoadEvent) {
  const apiClient = new LCDailiesAPIClient(fetch);
  const season = await apiClient.getSeason(params.season_id);
  const seasonText = await apiClient.getSeasonText(params.season_id);
  return { season, seasonText };
}
