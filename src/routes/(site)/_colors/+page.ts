import type { PageLoadEvent } from './$types';
import { parseGlobalCSS } from './colors';

export async function load({ fetch }: PageLoadEvent) {
  const globalCSS = await fetch('/global.css').then((r) => r.text());
  return { colors: parseGlobalCSS(globalCSS) };
}
