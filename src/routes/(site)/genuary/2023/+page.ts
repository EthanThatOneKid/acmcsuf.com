import type { CollagePageData } from '../collage';

import { default as GENUARY_2023_PIECES } from './data.json' assert { type: 'json' };

export async function load(): Promise<CollagePageData> {
  return GENUARY_2023_PAGE_DATA;
}

const GENUARY_2023_PAGE_DATA: CollagePageData = {
  pieces: GENUARY_2023_PIECES.map(({ src, alt, view }) => {
    switch (view) {
      case 'normal':
      case 'wide':
      case 'tall':
      case 'big': {
        return { src, alt, view };
      }
    }

    return { src, alt };
  }),
};
