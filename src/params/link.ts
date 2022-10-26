import type { ParamMatcher } from '@sveltejs/kit';
import { LINKS } from '$lib/server/links/data';

function makeLinkMatcher(): ParamMatcher {
  return (param: string): boolean => {
    while (param.length > 0) {
      if (Object.hasOwn(LINKS, param)) {
        return true;
      }
      param = param.slice(0, param.lastIndexOf('/'));
    }
    return false;
  };
}

export function match(param: string): boolean {
  const matcher = makeLinkMatcher();
  return matcher(param);
}
