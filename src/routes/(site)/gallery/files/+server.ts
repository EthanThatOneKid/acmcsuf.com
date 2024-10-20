import { getGallery } from '$lib/server/gallery';

export async function GET() {
  const gallery = await getGallery();
  return Response.json(gallery);
}
