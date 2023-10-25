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

  private async fetchJSON<T>(url: string): Promise<T> {
    const response = await this.fetch(url);
    return response.json();
  }

  private async fetchText(url: string): Promise<string> {
    const response = await this.fetch(url);
    return response.text();
  }

  public async getLatestSeason(): Promise<Season | null> {
    return await this.fetchJSON(makeGetLatestSeasonURL(this.apiURL));
  }

  public async getSeason(seasonID: string): Promise<Season | null> {
    return await this.fetchJSON(makeGetSeasonURL(seasonID, this.apiURL));
  }

  public async listSeasons(): Promise<Season[]> {
    return await this.fetchJSON(makeListSeasonsURL(this.apiURL));
  }

  public async getSeasonText(seasonID: string): Promise<string | null> {
    return await this.fetchText(makeGetSeasonTextURL(seasonID, this.apiURL));
  }
}

function makeGetLatestSeasonURL(apiURL = DEFAULT_API_URL): string {
  return makeGetSeasonURL('latest', apiURL);
}

function makeGetSeasonTextURL(seasonID: string, apiURL = DEFAULT_API_URL): string {
  return `${makeGetSeasonURL(seasonID, apiURL)}.txt`;
}

function makeGetSeasonURL(seasonID: string, apiURL = DEFAULT_API_URL): string {
  return `${makeListSeasonsURL(apiURL)}/${seasonID}`;
}

function makeListSeasonsURL(apiURL = DEFAULT_API_URL): string {
  return `${apiURL}/seasons`;
}
