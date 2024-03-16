import type { PageLoadEvent } from './$types';
import type { Gallery } from '$lib/public/gallery';

export async function load({ fetch }: PageLoadEvent) {
  const response = await fetch('/gallery/files');
  const gallery = (await response.json()) as Gallery;
  return { gallery };
}
