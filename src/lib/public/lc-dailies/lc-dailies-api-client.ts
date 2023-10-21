import type { Season } from 'lc-dailies';

const DEFAULT_API_URL = 'https://lc-dailies.deno.dev';

/**
 * LCDailiesAPIClient is the HTTP client for the LC-Dailies API.
 */
export class LCDailiesAPIClient {
  constructor(
    private readonly fetch = window.fetch.bind(window),
    private readonly apiURL = DEFAULT_API_URL
  ) {}

  getLatestSeason(): Promise<Season | null> {
    return this.fetch(makeGetLatestSeasonURL(this.apiURL)).then((response) => response.json());
  }

  getSeason(seasonID: string): Promise<Season | null> {
    return this.fetch(makeGetSeasonURL(seasonID, this.apiURL)).then((response) => response.json());
  }

  listSeasons(): Promise<Season[]> {
    return this.fetch(makeListSeasonsURL(this.apiURL)).then((response) => response.json());
  }
}

function makeGetLatestSeasonURL(apiURL = DEFAULT_API_URL): string {
  return makeGetSeasonURL('latest', apiURL);
}

function makeGetSeasonURL(seasonID: string, apiURL = DEFAULT_API_URL): string {
  return `${makeListSeasonsURL(apiURL)}/${seasonID}`;
}

function makeListSeasonsURL(apiURL = DEFAULT_API_URL): string {
  return `${apiURL}/seasons`;
}
