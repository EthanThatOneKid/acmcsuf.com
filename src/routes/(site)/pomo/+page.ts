import type { PageLoadEvent } from './$types';
import type { GetPomoOutput } from 'pomo/src/server/pomo/types'
import { DEFAULT_PATTERNS } from './patterns';
/* To do - finish this file now. */

export async function load({ fetch, url }: PageLoadEvent) {
  // const target = makePomoJsonUrl(url);
  // console.log(target.toString());
  // const response = await fetch(target);
 
  const pomoOutput = JSON.parse(`{"20-5-10":{"elapsed":2160036,"cycle":0,"remainder":2160036,"period":2,"work":true,"break":false,"timeout":539964,"duration":1200000,"start":1679099100000,"end":1679100300000,"timing":{"periods":[{"index":3,"timeout":539964},{"index":4,"timeout":839964},{"index":5,"timeout":2039964},{"index":0,"timeout":2639964},{"index":1,"timeout":3839964},{"index":2,"timeout":4139964}],"interval":4800000},"timestamp":1679099760036,"dayStart":1679097600000,"text":"00:08:59.964"},"50-10":{"elapsed":2160036,"cycle":0,"remainder":2160036,"period":0,"work":true,"break":false,"timeout":839964,"duration":3000000,"start":1679097600000,"end":1679100600000,"timing":{"periods":[{"index":1,"timeout":839964},{"index":0,"timeout":1439964}],"interval":3600000},"timestamp":1679099760036,"dayStart":1679097600000,"text":"00:13:59.964"}}`) as GetPomoOutput;
  // console.log({ pomoOutput });

  return {
    pomoOutput
  };
}


const POMO_API = 'https://pomo.acmcsuf.com/';

function makePomoJsonUrl(url : URL) : URL {
  const result = new URL(POMO_API);
  const patterns = (url.searchParams.get("patterns") || url.searchParams.get('p') || DEFAULT_PATTERNS);
  result.searchParams.append("patterns", patterns);
  /* Appending patterns --> https://pomo.acmcsuf.com/patterns?w=25&b=10&b=10 */
  return result;
}