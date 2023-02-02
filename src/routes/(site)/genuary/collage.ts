/**
 * This is the output of the Genuary page.
 */
export interface CollagePageData {
  pieces: CollagePiece[];
}

/**
 * This is a piece on the Genuary page.
 */
export interface CollagePiece {
  src: string;
  during_challenge?: boolean;
  view?: 'normal' | 'wide' | 'tall' | 'big';
  alt?: string;
}

/**
 * pageDataFrom is a helper function to create a page data object from a list of
 * pieces.
 */
export function pageDataFrom(pieces: CollagePiece[]): CollagePageData {
  return {
    pieces: pieces.map(({ src, alt, view, during_challenge }) => {
      const data: CollagePiece = { src, alt, during_challenge: during_challenge ?? false };
      switch (view) {
        case 'normal':
        case 'wide':
        case 'tall':
        case 'big': {
          data.view = view;
        }
      }

      return data;
    }),
  };
}
