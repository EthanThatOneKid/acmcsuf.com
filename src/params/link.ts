import type { ParamMatcher } from '@sveltejs/kit';
import { parseLinkId } from '$lib/server/links/utils';
import { LINKS } from '$lib/server/links/data';

function makeLinkMatcher(): ParamMatcher {
  return (param: string): boolean => !!parseLinkId(param, LINKS);
}

export function match(param: string): boolean {
  const matcher = makeLinkMatcher();
  return matcher(param);
}
