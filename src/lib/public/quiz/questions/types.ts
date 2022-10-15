export interface QuizData {
  questions: Question[];
}

interface Question {
  prompt: string;
  choices: Choice[];
}

export enum TeamMatch {
  ALGO = 'Algo',
  DEV = 'Dev',
  DESIGN = 'Design',
  AI = 'AI',
  TEAMLESS = 'N/A',
}

export interface Choice {
  content: string;
  // Where the choice is an index number for use in quiz.svelte
  // ai => 0, dev => 1, design => 2, algo => 3, N/A => 4
  match: TeamMatch;
}
