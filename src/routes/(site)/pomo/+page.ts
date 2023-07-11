import type { PageLoadEvent } from './$types';
import type { GetPomoOutput } from 'pomo/src/server/pomo/types';
import { DEFAULT_PATTERNS } from './patterns';

export async function load({ fetch, url }: PageLoadEvent) {
  const target = makePomoPageDataURL(url);
  const response = await fetch(target);
  const pomoOutput = (await response.json()) as GetPomoOutput;
  return { pomoOutput };
}

const POMO_API = 'https://pomo.acmcsuf.com/';

function makePomoPageDataURL(url: URL): URL {
  const result = new URL(POMO_API);
  const patterns =
    url.searchParams.get('patterns') || url.searchParams.get('p') || DEFAULT_PATTERNS;
  result.searchParams.append('patterns', patterns);
  /* Appending patterns --> https://pomo.acmcsuf.com/?patterns=... */
  return result;
}
