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
      title: 'Photo Gallery',
      link: 'gallery',
    },
    {
      id: 'portfoliospage',
      title: 'Member Portfolios',
      link: 'portfolios',
    },
    {
      id: 'genuarypage',
      title: 'Genuary',
      link: 'genuary',
    },
    {
      id: 'designgallery',
      title: 'Design Gallery',
      link: 'design-gallery',
    },
  ],
  'Productivity pages': [
    {
      id: 'lcdailiespage',
      title: 'LC-dailies',
      link: 'lc-dailies',
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
  Policies: [
    {
      id: 'privacypage',
      title: 'Privacy',
      link: 'privacy',
    },
  ],
};

export default siteMap;
