import { TeamMatch } from '$lib/public/quiz/questions/types';

export interface TeamReport {
  blurb: string;
  blurbRecommend: string;
  workshopPictures: string[];
}

export function getTeamReport(id: string): TeamReport {
  return REPORTS[id as Exclude<TeamMatch, TeamMatch.TEAMLESS>];
}

export const REPORTS: Record<Exclude<TeamMatch, TeamMatch.TEAMLESS>, TeamReport> = {
  [TeamMatch.AI]: {
    blurb:
      'acmAI is focused on introducing Artificial Intelligence and Machine Learning in a beginner friendly way. Workshops are project based and are centered around interactivity. We have a keen eye for problem solving and solution-based programming.',
    blurbRecommend: 'Check out #🦾ai-resources in our Discord server for more resources.',
    workshopPictures: ['/assets/ai-workshop.jpg'],
  },
  [TeamMatch.DEV]: {
    blurb:
      'acmDev aims to have weekly meetings to work on projects as a way to improve our members’ skills at working in groups as well as introduce them to new technologies to make their ideas into software.',
    blurbRecommend: 'Check out #🌐dev-resources in our Discord server for more resources.',
    workshopPictures: ['/assets/dev-workshop.jpg'],
  },
  [TeamMatch.DESIGN]: {
    blurb:
      'acmDesign is all about exposing you to the elements of UI/UX. We go over good practices to follow when starting a project, interesting frontend tips, and show that anyone can design.',
    blurbRecommend: 'Check out #🎨design-resources in our Discord server for more resources.',
    workshopPictures: ['/assets/design-workshop.jpg'],
  },
  [TeamMatch.ALGO]: {
    blurb:
      "acmAlgo focuses on data structures, algorithms, and technical interview prep. School doesn't give us everything we need and Algo is here to fill in the holes!",
    blurbRecommend: 'Check out #📑algo-resources in our Discord server for more resources.',
    workshopPictures: ['/assets/algo-workshop.jpg'],
  },
  [TeamMatch.OSS]: {
    blurb:
      "acmOSS team is all about contributing to open source projects. We're here to help you get started with your first PR and to guide you through the process of contributing to a project.",
    blurbRecommend:
      'Check out #💖announcements under Open Source Software Team in our Discord server for more resources.',
    workshopPictures: ['/assets/oss-workshop.jpg'],
  },
  [TeamMatch.GAMEDEV]: {
    blurb:
      "acmGameDev is all about creating games and learning about the game development process. We're here to help you get started with game development and to guide you through the process of creating your first game.",
    blurbRecommend: 'Check out #🖇gamedev-resources in our Discord server for more resources.',
    workshopPictures: ['/assets/gamedev-workshop.jpg'],
  },
  [TeamMatch.ICPC]: {
    blurb:
      'acmICPC (The International Collegiate Programming Contest) team is all about competitive programming. We compete in regional and international contests and help our members improve their problem-solving skills.',
    blurbRecommend: 'Check out #💪icpc-resources in our Discord server for more resources.',
    workshopPictures: ['/assets/icpc-workshop.jpg'],
  },
};
