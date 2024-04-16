import type { SiteMap } from '$lib/public/sitemap';

export default [
  {
    id: 'eventspage',
    category: 'Main pages',
    link: 'events',
  },
] as const satisfies SiteMap;
