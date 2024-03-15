import { GDRIVE_GALLERY_API_KEY, GDRIVE_GALLERY_FOLDER_ID } from '$lib/server/env';
import type { Gallery, GalleryItem } from '$lib/public/gallery';
import { getDrive, listFiles } from './drive';

export async function getGallery(): Promise<Gallery> {
  const drive = getDrive(GDRIVE_GALLERY_API_KEY);
  const files = await listFiles(drive, GDRIVE_GALLERY_FOLDER_ID);
  return files
    .filter((file) => file.mimeType?.startsWith('image/'))
    .map(
      (file): GalleryItem => ({
        id: String(file.id),
        webContentLink: String(file.webContentLink),
        mimeType: String(file.mimeType),
        name: String(file.name),
      })
    );
}
