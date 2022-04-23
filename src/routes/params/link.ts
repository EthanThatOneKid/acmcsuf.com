import type { ParamMatcher } from '@sveltejs/kit';
import { links } from '$lib/constants/links';
import { clean } from '$lib/constants/utils';

function makeLinkMatcher(): ParamMatcher {
  return (param: string): boolean => clean(param) in links;
}

export function match(param: string): boolean {
  const matcher = makeLinkMatcher();
  return matcher(param);
}
