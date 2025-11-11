import type { Branding } from '$lib/public/branding/index';

export default [
  {
    title: 'General',
    description:
      'The ACM general team is a dynamic group of individuals driving the success of our organization.' +
      ' ACM General manages operations, organizes events, and ensure the smooth functioning of ACM.' +
      'They are the backbone of our community, fostering collaboration and innovation among members.',
    teamLogo: {
      image: '/assets/general-logo.svg',
      alt: 'General Team Logo',
      title: 'General Logo',
      svg: '/assets/general-logo.svg',
      png: '/assets/general-logo.png',
    },
    teamColor: {
      name: 'Primary Blue',
      hex: '#06a3ff',
      rgb: '6, 163, 255',
    },
  },
  {
    title: 'AI',
    description:
      'The artificial intelligence team is dedicated to providing accessible information' +
      'about artificial intelligence and machine learning to all. AI focuses on fun projects ' +
      'geared towards beginners in the field.',
    teamLogo: {
      image: '/assets/ai-logo.svg',
      alt: 'AI Team Logo',
      title: 'AI Logo',
      svg: '/assets/ai-logo.svg',
      png: '/assets/ai-logo.png',
    },
    teamColor: {
      name: 'AI Green',
      hex: '#35e792',
      rgb: '53, 231, 146',
    },
  },
  {
    title: 'Algo',
    description:
      'The algorithm team is dedicated to building programming fundamentals within students. ' +
      'Algo focuses on mastering data structures and algorithms, enhancing problem solving abilities, and' +
      ' exploration of competitive programming.',
    teamLogo: {
      image: '/assets/algo-logo.svg',
      alt: 'Algo Team Logo',
      title: 'Algo Logo',
      svg: '/assets/algo-logo.svg',
      png: '/assets/algo-logo.png',
    },
    teamColor: {
      name: 'Algo Purple',
      hex: '#af3fff',
      rgb: '175, 63, 255',
    },
  },
  {
    title: 'Design',
    description:
      'The design team is dedicated to emphasizing the importance of product design ' +
      'and product management in the tech industry. Design focuses on educating students about ' +
      'design principles, design tools, and the intricacies of conceptualization, development, ' +
      'and management of a product.',
    teamLogo: {
      image: '/assets/design-logo.svg',
      alt: 'Design Team Logo',
      title: 'Design Logo',
      svg: '/assets/design-logo.svg',
      png: '/assets/design-logo.png',
    },
    teamColor: {
      name: 'Design Red',
      hex: '#ff406d',
      rgb: '255, 64, 109',
    },
  },
  {
    title: 'Dev',
    description:
      'The development team is dedicated to giving students the opportunity to explore tech ' +
      'via hands-on projects and activities. Dev focuses on introducing students to software development, and' +
      ' the various tech stacks used in the industry.',
    teamLogo: {
      image: '/assets/dev-logo.svg',
      alt: 'Dev Team Logo',
      title: 'Dev Logo',
      svg: '/assets/dev-logo.svg',
      png: '/assets/dev-logo.png',
    },
    teamColor: {
      name: 'Dev Blue',
      hex: '#1F6CFF',
      rgb: '31, 108, 255',
    },
  },
  {
    title: 'Game Dev',
    description:
      'The game development team is dedicated to teaching the basics of programming in the ' +
      'gaming industry. Gamedev focuses on educating students about design principles, design tools,' +
      ' and the development process of a project.',
    teamLogo: {
      image: '/assets/gamedev-logo.svg',
      alt: 'Game Dev Team Logo',
      title: 'Game Dev Logo',
      svg: '/assets/gamedev-logo.svg',
      png: '/assets/gamedev-logo.png',
    },
    teamColor: {
      name: 'Game Dev Red',
      hex: '#D41253',
      rgb: '212, 18, 83',
    },
  },
  {
    title: 'ICPC',
    description:
      'The Intercollegiate Competitive Programming Competition is a contest to challenge students on their algorithms' +
      ' and problem solving skills. The ICPC Team is dedicated to preparing students for the competition by hosting ' +
      'weekly practice sessions and mock contests.',
    teamLogo: {
      image: '/assets/icpc-logo.svg',
      alt: 'ICPC Team Logo',
      title: 'ICPC Logo',
      svg: '/assets/icpc-logo.svg',
      png: '/path-to-download/general-logo2.png',
    },
    teamColor: {
      name: 'ICPC Orange',
      hex: '#FF7918',
      rgb: '255, 121, 24',
    },
  },
  {
    title: 'Marketing',
    description:
      'The marketing team has a strong passion towards advertising and spreading word on ' +
      ' all our ACM events. Marketing utilizes their expertise in digital strategies and creative storytelling ' +
      'to display a welcoming environment to all students.',
    teamLogo: {
      image: '/assets/marketing-logo.svg',
      alt: 'Marketing Logo',
      title: 'Marketing Logo ',
      svg: '/assets/marketing-logo.svg',
      png: '/assets/marketing-logo.png',
    },
    teamColor: {
      name: 'Marketing Pink',
      hex: '#FE0FC9',
      rgb: '254, 15, 201',
    },
  },
  {
    title: 'Node Buds',
    description:
      'Connect & grow with node buds! Our big-little program pairs you with an experienced club ' +
      'officer for social events, workshops, and guidance as you navigate the tech world. Build friendships, ' +
      'skills, and have a blast!',
    teamLogo: {
      image: '/assets/nodebuds-logo-old.svg',
      alt: 'Nodebuds Team Logo',
      title: 'Node Buds Logo',
      svg: '/assets/nodebuds-logo-old.svg',
      png: '/assets/nodebuds-logo-old.png',
    },
    teamColor: {
      name: 'Node Buds Red',
      hex: '#D41253',
      rgb: '212, 18, 83',
    },
  },
  {
    title: 'Open Source',
    description:
      'Our inspiration for this team surrounds this area of exploring space.' +
      'The world of open source programming is endless and diving into it might seem ' +
      'scary at first, but we find that discovering new things to be exciting. To best ' +
      'represent this, our logo was designed as a rocket ship to represent the ability to launch' +
      'into the vast expanse of collaborative development, exploring new frontiers and ' +
      'innovating together',
    teamLogo: {
      image: '/assets/oss-logo.svg',
      alt: 'Open Source Logo',
      title: 'Open Source Logo',
      svg: '/assets/oss-logo.svg',
      png: '/assets/oss-logo.png',
    },
    teamColor: {
      name: 'OSS Green',
      hex: '#13d4b1',
      rgb: '19, 212, 177)',
    },
  },
] as const satisfies Branding[];
