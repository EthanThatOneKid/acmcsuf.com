import type { SiteMap } from '$lib/public/sitemap';

const siteMap: SiteMap = {
  'Main pages': [
    {
      id: 'homepage',
      title: 'Home',
      link: '/',
    },
    {
      id: 'eventspage',
      title: 'Events',
      link: 'events',
    },
    {
      id: 'teamspage',
      title: 'Teams',
      link: 'teams',
    },
    {
      id: 'blogpage',
      title: 'Blog',
      link: 'blog',
    },
  ],
  'Board Use': [
    {
      id: 'boardifypage',
      title: 'Boardify',
      link: 'boardify',
    },
    {
      id: 'colorspage',
      title: 'Colors',
      link: 'colors',
    },
    {
      id: 'shorterpage',
      title: 'Shorter',
      link: 'shorter',
    },
    {
      id: 'svgpages',
      title: 'svg',
      link: 'discord.svg',
    },
    {
      id: 'tempapppage',
      title: 'Temp-apps',
      link: 'temp-apps',
    },
  ],
  'Showcase Pages': [
    {
      id: 'gallery',
      title: 'Gallery',
      link: 'gallery',
    },
    {
      id: 'genuarypage',
      title: 'Genuary',
      link: 'genuary',
    },
    {
      id: 'onovemberpage',
      title: 'Onovember',
      link: 'onovember',
    },
  ],
  'Productivity pages': [
    {
      id: 'lcdailiespage',
      title: 'LC-dailies',
      link: 'lc-dailies',
    },
    {
      id: 'pomopage',
      title: 'Pomo',
      link: 'pomo',
    },
  ],
  'Contributing Pages': [
    {
      id: '1stpage',
      title: '1st',
      link: '1st',
    },
    {
      id: 'usernamepage',
      title: '@[username]',
      link: '@ethanthatonekid',
    },
  ],
  Miscellaneous: [
    {
      id: 'feedxmlpage',
      title: 'Feed.xml',
      link: 'feed.xml',
    },
    {
      id: 'quizpage',
      title: 'Quiz',
      link: 'quiz',
    },
    {
      id: 'randompage',
      title: 'Random',
      link: 'random',
    },
  ],
  Outdated: [
    {
      id: 'nodebudspage',
      title: 'Nodebuds',
      link: 'nodebuds',
    },
  ],
  Policies: [
    {
      id: 'privacypage',
      title: 'Privacy',
      link: 'privacy',
    },
  ],
};

export default siteMap;
