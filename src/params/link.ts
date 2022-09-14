import type { ParamMatcher } from '@sveltejs/kit';
import { parseLink } from '$lib/links/utils';

function makeLinkMatcher(): ParamMatcher {
  return (param: string): boolean => !!parseLink(param);
}

export function match(param: string): boolean {
  const matcher = makeLinkMatcher();
  return matcher(param);
}
