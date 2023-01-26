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
  view?: 'normal' | 'wide' | 'tall' | 'big';
  alt?: string;
}
