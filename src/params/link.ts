import type { ParamMatcher } from '@sveltejs/kit';
import { links } from '$lib/constants/links';
import { normalizeLinkName } from '$lib/qr/utils';

function makeLinkMatcher(): ParamMatcher {
  return (param: string): boolean => normalizeLinkName(param) in links;
}

export function match(param: string): boolean {
  const matcher = makeLinkMatcher();
  return matcher(param);
}
