import type { CollagePageData } from '../collage';

// TODO: Apply this to the other Genuary pages.
// import { pageDataFrom } from "../collage";

import { default as GENUARY_PLACEKITTEN_PIECES } from './data.json' assert { type: 'json' };

export async function load(): Promise<CollagePageData> {
  return GENUARY_PLACEKITTEN_PAGE_DATA;
}

const GENUARY_PLACEKITTEN_PAGE_DATA: CollagePageData = {
  pieces: GENUARY_PLACEKITTEN_PIECES.map(({ src, alt, view }) => {
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
