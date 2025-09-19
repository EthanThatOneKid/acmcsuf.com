/**
 * CollagePageData is the output of the Genuary page.
 */
export interface CollagePageData {
  pieces: CollagePiece[];
}

/**
 * VIEW_TYPES are the possible view types for a piece.
 */
const VIEW_TYPES = ['normal', 'wide', 'tall', 'big'] as const;

/**
 * ViewType is a type for the view type of a piece.
 */
export type ViewType = (typeof VIEW_TYPES)[number];

/**
 * CollagePiece is a piece on the Genuary page.
 */
export interface CollagePiece {
  src: string;
  during_challenge?: boolean;
  view?: ViewType;
  alt?: string;
}

/**
 * pageDataFrom is a helper function to create a page data object from a list of
 * pieces.
 */
export function pageDataFrom(pieces: CollagePiece[]): CollagePageData {
  return {
    pieces: pieces.map(({ src, alt, view, during_challenge }) => {
      const data: CollagePiece = { src, alt, during_challenge };
      if (view && VIEW_TYPES.includes(view)) {
        data.view = view;
      }

      return data;
    }),
  };
}
