import type { Season } from 'lc-dailies';
import type { PageLoadEvent } from './$types';
import { LCDailiesAPIClient } from '$lib/public/lc-dailies';

export async function load({ fetch }: PageLoadEvent) {
  const apiClient = new LCDailiesAPIClient(fetch);
  const seasons = await apiClient.listSeasons();
  const seasonsMap = categorizeByMonth(seasons, 10);
  return { seasonsMap };
}

/**
 * categorizeByMonth categorizes seasons by month. Returns a record of years to seasons.
 */
function categorizeByMonth(seasons: Season[], month: number): Record<number, Season[]> {
  const result: Record<number, Season[]> = {};
  for (const season of seasons) {
    const date = new Date(season.start_date);
    if (date.getMonth() === month) {
      const year = date.getFullYear();
      result[year] ??= [];
      const index = result[year].findIndex((s) => s.start_date > season.start_date);
      if (index === -1) {
        result[year].push(season);
      } else {
        result[year].splice(index, 0, season);
      }
    }
  }

  return result;
}
