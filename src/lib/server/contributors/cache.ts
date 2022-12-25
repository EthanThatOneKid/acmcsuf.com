import { Cache } from '$lib/server/cache/cache';
import type { Contributor } from '$lib/public/contributors';

export const cachedContributors = new Cache(new Map<string, Contributor>());

export function makeCacheKey({ login, version }: { login: string; version: string }) {
  return `${version}-${login}`;
}
