import type { CollagePageData } from '../collage';
import { pageDataFrom } from '../collage';

import { default as GENUARY_2024_PIECES } from './data.json' assert { type: 'json' };

const GENUARY_2024_PAGE_DATA = pageDataFrom(GENUARY_2024_PIECES as CollagePageData['pieces']);

export async function load(): Promise<CollagePageData> {
  return GENUARY_2024_PAGE_DATA;
}
