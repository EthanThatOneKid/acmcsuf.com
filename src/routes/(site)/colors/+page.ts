import type { PageLoadEvent } from './$types';
import type { Color } from './colors';

export async function load({ fetch }: PageLoadEvent) {
  const colors: Color[] = await fetch('/global.json').then((r) => r.json());
  return { colors };
}
