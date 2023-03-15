import type { PageLoadEvent } from './$types';
import type { GetPomoInput } from 'pomo/src/server/pomo/types'
import { DEFAULT_PATTERNS } from './patterns';
/* To do - finish this file now. */

export async function load({ fetch, url }: PageLoadEvent) {
  const target = makePomoJsonUrl(url);
  const response = await fetch(target);
  const pomoOutput = await response.json();
  console.log({ pomoOutput });

  return {
    pomoOutput
  };
}


const POMO_API = 'https://pomo.acmcsuf.com/';

function makePomoJsonUrl(url : URL) : URL {
  const result = new URL(POMO_API);
  const patterns = (url.searchParams.get("patterns") || url.searchParams.get('p') || DEFAULT_PATTERNS);
  result.searchParams.append("patterns", patterns);
  return result;
}