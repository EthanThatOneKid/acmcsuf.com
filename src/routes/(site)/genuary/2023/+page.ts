import type { CollagePageData } from '../collage';
import { pageDataFrom } from '../collage';

import { default as GENUARY_2023_PIECES } from './data.json' assert { type: 'json' };

const GENUARY_2023_PAGE_DATA = pageDataFrom(GENUARY_2023_PIECES as CollagePageData['pieces']);

export async function load(): Promise<CollagePageData> {
  return GENUARY_2023_PAGE_DATA;
}
