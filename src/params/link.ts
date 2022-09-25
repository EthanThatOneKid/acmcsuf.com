import type { ParamMatcher } from '@sveltejs/kit';
import { parseLinkId } from '$lib/server/links/utils';

function makeLinkMatcher(): ParamMatcher {
  return (param: string): boolean => !!parseLinkId(param);
}

export function match(param: string): boolean {
  const matcher = makeLinkMatcher();
  return matcher(param);
}
