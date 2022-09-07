export interface AcmPath {
  title: string;
  slug: string;
  picture: string;
  color: string;
  blurp: string;
  blurpRecommend: string;
  recommendations: string[];
  workshopPictures: string[];
}

export const acmAlgo: AcmPath = {
  title: 'Algo',
  slug: 'algo',
  picture: './assets/badges/algo-team.svg',
  color: 'var(--acm-purple)',
  blurp:
    "acmAlgo focuses on data structures, algorithms, and technical interview prep. School doesn't give us everything we need and Algo is here to fill in the holes!",
  blurpRecommend:
    'Attending our events is half the battle, practice is what takes it to the next level. We recommend practicing on LeetCode and getting a good grip on the famous "The Grind 75" questions.',
  recommendations: [],
  workshopPictures: ['./quiz/algo-workshop.JPG'],
};

export const acmDesign: AcmPath = {
  title: 'Design',
  slug: 'design',
  picture: './assets/badges/design-team.svg',
  color: 'var(--acm-pink)',
  blurp:
    'acmDesign is all about exposing you to the elements of UI/UX. We go over good practices to follow when starting a project, interesting frontend tips, and show that anyone can design.',
  blurpRecommend:
    "Figma is everyone's friend when it comes to designing, but sometimes it's hard to translate that onto code. That's why it is important to get a really good understanding of HTML, CSS, and Javascript. Below are some recommended resources for your journey.",
  recommendations: [
    'Kevin Powell on Youtube',
    'The Net Ninja on Youtube',
    'W3Schools Information',
    'MDN Resources',
  ],
  workshopPictures: ['./quiz/design-workshop.jpg', './quiz/Figma-collage.PNG'],
};

export const acmDev: AcmPath = {
  title: 'Dev',
  slug: 'dev',
  picture: './assets/badges/dev-team.svg',
  color: 'var(--acm-bluer)',
  blurp: 'monke monke monek monek',
  blurpRecommend: 'THE AGONY AHHHHHHHHHHH',
  recommendations: ['amongus'],
  workshopPictures: ['./quiz/dev-workshop.jpg'],
};

export const acmAI: AcmPath = {
  title: 'AI',
  slug: 'ai',
  picture: './assets/badges/ai-team.svg',
  color: 'var(--acm-emerald)',
  blurp: 'MMMM MM MMMMMM MMMMMM MMMM MMM MMMMM MMM M MMMM MM M MM MMMM MMM MMA HHHHH HHHH H',
  blurpRecommend: 'BIG BRAIN TIME',
  recommendations: ['GOOGLE IT LOL'],
  workshopPictures: [],
};

export const acmGeneral: AcmPath = {
  title: 'General',
  slug: 'general',
  picture: './assets/badges/general.svg',
  color: 'var(--acm-blue)',
  blurp:
    'Coding and classes can be a lot sometimes so blow off some steam with weekly Friday socials where we do various things.',
  blurpRecommend: 'hehe',
  recommendations: [],
  workshopPictures: [],
};

export const acmPaths = [acmAlgo, acmDesign, acmDev, acmGeneral] as const;

/** Pinned paths are featured on the landing page. */
export const pinnedPaths = [acmAI, acmAlgo, acmDesign, acmDev] as const;
