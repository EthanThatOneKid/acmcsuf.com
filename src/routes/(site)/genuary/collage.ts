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
  during_challenge: boolean;
  view?: 'normal' | 'wide' | 'tall' | 'big';
  alt?: string;
}
