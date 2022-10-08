import { TeamMatch } from '$lib/public/quiz/questions/types';

export interface TeamReport {
  picture: string;
  color: string;
  blurb: string;
  blurbRecommend: string;
  recommendations: Array<{ title: string; link: string }>;
  workshopPictures: string[];
}

export const TEAMS: Record<Exclude<TeamMatch, TeamMatch.TEAMLESS>, TeamReport> = {
  [TeamMatch.AI]: {
    picture: './assets/badges/ai-team.svg',
    color: 'var(--acm-emerald)',
    blurb:
      'acmAI is focused on introducing Artificial Intelligence and Machine Learning in a beginner friendly way. Workshops are project based and are centered around interactivity. We have a keen eye for problem solving and solution-based programming.',
    blurbRecommend:
      'AI events are coming soon this semester, in the mean time keep an eye out for those and futher resources listed on this page. Addionally, becoming actively involved in our #ai-chat on the Discord will surely help in the long-run.',
    recommendations: [],
    workshopPictures: [],
  },
  [TeamMatch.DEV]: {
    picture: './assets/badges/dev-team.svg',
    color: 'var(--acm-bluer)',
    blurb:
      'acmDev aims to have weekly meetings to work on projects as a way to improve our members’ skills at working in groups as well as introduce them to new technologies to make their ideas into software.',
    blurbRecommend:
      'The Dev hosts weekly project workshops this semester that go over various practices and ideas, more info about those can be found on our socials. However, below will be some resources which the Dev team recommends to kick off your project career.',
    recommendations: [
      {
        title: 'Svelte Basics',
        link: 'https://svelte.dev/tutorial/basics',
      },
    ],
    workshopPictures: ['/assets/quiz/dev-workshop.jpg'],
  },
  [TeamMatch.DESIGN]: {
    picture: './assets/badges/design-team.svg',
    color: 'var(--acm-pink)',
    blurb:
      'acmDesign is all about exposing you to the elements of UI/UX. We go over good practices to follow when starting a project, interesting frontend tips, and show that anyone can design.',
    blurbRecommend:
      "Figma is everyone's friend when it comes to designing, but sometimes it's hard to translate that onto code. That's why it is important to get a really good understanding of HTML, CSS, and Javascript. Below are some recommended resources for your journey.",
    recommendations: [
      {
        title: "Kevin Powell's neat css tricks",
        link: 'https://www.youtube.com/kepowob',
      },
      {
        title: "The Net Ninja's beginner playlists",
        link: 'https://www.youtube.com/c/TheNetNinja',
      },
      {
        title: 'W3Schools CSS',
        link: 'https://www.w3schools.com/w3css/',
      },
      {
        title: 'MDN Resources',
        link: 'https://developer.mozilla.org/en-US/',
      },
    ],
    workshopPictures: ['/assets/quiz/design-workshop.jpg', '/assets/quiz/figma-collage.png'],
  },
  [TeamMatch.ALGO]: {
    picture: './assets/badges/algo-team.svg',
    color: 'var(--acm-purple)',
    blurb:
      "acmAlgo focuses on data structures, algorithms, and technical interview prep. School doesn't give us everything we need and Algo is here to fill in the holes!",
    blurbRecommend:
      'Attending our events is half the battle, practice is what takes it to the next level. We recommend practicing on LeetCode and getting a good grip on the famous "The Grind 75" questions.',
    recommendations: [],
    workshopPictures: ['/assets/quiz/algo-workshop.jpg'],
  },
};
