export interface GalleryItem {
  id: string;
  webContentLink: string;
  mimeType: string;
  name: string;
}

export type Gallery = GalleryItem[];
