import { TeamMatch } from '$lib/public/quiz/questions/types';

export interface TeamReport {
  blurb: string;
  blurbRecommend: string;
  recommendations: Array<{ title: string; link: string }>;
  workshopPictures: string[];
}

export function getTeamReport(id: string): TeamReport {
  return REPORTS[id as Exclude<TeamMatch, TeamMatch.TEAMLESS>];
}

export const REPORTS: Record<Exclude<TeamMatch, TeamMatch.TEAMLESS>, TeamReport> = {
  [TeamMatch.AI]: {
    blurb:
      'acmAI is focused on introducing Artificial Intelligence and Machine Learning in a beginner friendly way. Workshops are project based and are centered around interactivity. We have a keen eye for problem solving and solution-based programming.',
    blurbRecommend:
      'AI events are coming soon this semester, in the mean time keep an eye out for those and futher resources listed on this page. Addionally, becoming actively involved in our #ai-chat on the Discord will surely help in the long-run.',
    recommendations: [],
    workshopPictures: [],
  },
  [TeamMatch.DEV]: {
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
    workshopPictures: ['/assets/dev-workshop.jpg'],
  },
  [TeamMatch.DESIGN]: {
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
    workshopPictures: ['/assets/design-workshop.jpg', '/assets/quiz/figma-collage.png'],
  },
  [TeamMatch.ALGO]: {
    blurb:
      "acmAlgo focuses on data structures, algorithms, and technical interview prep. School doesn't give us everything we need and Algo is here to fill in the holes!",
    blurbRecommend:
      'Attending our events is half the battle, practice is what takes it to the next level. We recommend practicing on LeetCode and getting a good grip on the famous "The Grind 75" questions.',
    recommendations: [],
    workshopPictures: ['/assets/algo-workshop.jpg'],
  },
  [TeamMatch.OSS]: {
    blurb:
      "Our Open Source Software team is all about contributing to open source projects. We're here to help you get started with your first PR and to guide you through the process of contributing to a project.",
    blurbRecommend:
      'Get involved in our weekly meetings and start contributing to our projects. Below are some resources to help you get started with open source.',
    recommendations: [],
    workshopPictures: [],
  },
  [TeamMatch.GAMEDEV]: {
    blurb:
      "acmGameDev is all about creating games and learning about the game development process. We're here to help you get started with game development and to guide you through the process of creating your first game.",
    blurbRecommend:
      'Get involved in our weekly meetings and start creating your own games. Below are some resources to help you get started with game development.',
    recommendations: [],
    workshopPictures: [],
  },
  [TeamMatch.ICPC]: {
    blurb:
      'The International Collegiate Programming Contest (ICPC) team is all about competitive programming. We compete in regional and international contests and help our members improve their problem-solving skills.',
    blurbRecommend:
      'Get involved in our weekly meetings and start practicing for competitive programming contests. Below are some resources to help you get started with competitive programming.',
    recommendations: [],
    workshopPictures: [],
  },
};
