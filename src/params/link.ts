import type { ParamMatcher } from '@sveltejs/kit';
import { LINKS } from '$lib/server/links/data';

function makeLinkMatcher(): ParamMatcher {
  return (param: string): boolean => Object.hasOwn(LINKS, param);
}

export function match(param: string): boolean {
  const matcher = makeLinkMatcher();
  return matcher(param);
}
