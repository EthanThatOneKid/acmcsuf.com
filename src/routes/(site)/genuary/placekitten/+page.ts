import type { CollagePageData } from '../collage';

import { pageDataFrom } from '../collage';

import { default as GENUARY_PLACEKITTEN_PIECES } from './data.json' assert { type: 'json' };

const GENUARY_PLACEKITTEN_PAGE_DATA = pageDataFrom(
  GENUARY_PLACEKITTEN_PIECES as CollagePageData['pieces']
);

export async function load(): Promise<CollagePageData> {
  return GENUARY_PLACEKITTEN_PAGE_DATA;
}
