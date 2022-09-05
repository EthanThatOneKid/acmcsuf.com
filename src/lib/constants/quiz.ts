export interface QuizData {
  questions: Question[];
}

interface Question {
  prompt: string;
  choices: Choice[];
}

interface Choice {
  content: string;
  // Where color is a valid HTML color
  color: string;
  // Where the choice is an index number for use in quiz.svelte
  // ai => 0, dev => 1, design => 2, algo => 3, N/A => 4
  match: string;
}

export const QUIZ_DATA: QuizData = {
  questions: [
    {
      prompt: "What's your favorite color",
      choices: [
        {
          content: 'ai',
          color: '#21D19F',
          match: 'aiChoice',
        },
        {
          content: 'algo',
          color: '#9D35E7',
          match: 'algoChoice',
        },
        {
          content: 'design',
          color: '#FF4365',
          match: 'designChoice',
        },
        {
          content: 'dev',
          color: '#1E6CFF',
          match: 'devChoice',
        },
      ],
    },
    {
      prompt: 'What is your favorite bruh moment',
      choices: [
        {
          content: 'ai 2',
          color: '#21D19F',
          match: 'aiChoice',
        },
        {
          content: 'algo 2',
          color: '#9D35E7',
          match: 'algoChoice',
        },
        {
          content: 'design 2',
          color: '#FF4365',
          match: 'designChoice',
        },
        {
          content: 'dev 2',
          color: '#1E6CFF',
          match: 'devChoice',
        },
      ],
    },
    {
      prompt: 'What should our third question be',
      choices: [
        {
          content: 'ai 3',
          color: '#21D19F',
          match: 'aiChoice',
        },
        {
          content: 'algo 3',
          color: '#9D35E7',
          match: 'algoChoice',
        },
        {
          content:
            'design 3aaaaaaaa aaaa aaaaa aaaaaaaaa aaaa aaaaaaaa aaaaaa aaaa aaaaa aaaaaaaaaa aaaa aaaaaaa aaaa aaaaa aaaaaaa aaaaaaa',
          color: '#FF4365',
          match: 'designChoice',
        },
        {
          content: 'dev 3',
          color: '#1E6CFF',
          match: 'devChoice',
        },
      ],
    },
  ],
};
