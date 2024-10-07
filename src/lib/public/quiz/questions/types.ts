export interface QuizData {
  questions: Question[];
}

interface Question {
  prompt: string;
  choices: Choice[];
}

export interface QuizResponse {
  choiceIndex: number;
  matches: TeamMatch[];
}

export enum TeamMatch {
  ALGO = 'Algo',
  DEV = 'Dev',
  DESIGN = 'Design',
  AI = 'AI',
  OSS = 'OSS',
  GAMEDEV = 'GameDev',
  ICPC = 'ICPC',
  TEAMLESS = 'N/A',
}

export interface Choice {
  content: string;
  // Where the choice is an index number for use in quiz.svelte
  // ai => 0, dev => 1, design => 2, algo => 3, N/A => 4
  match: TeamMatch[];
}
