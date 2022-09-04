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
}

export const QUIZ_DATA: QuizData = {
  questions: [
    {
      prompt: "What's your favorite color",
      choices: [
        {
          content: 'purple',
          color: 'rebeccapurple',
        },
        {
          content: 'pink',
          color: 'taylorpink',
        },
        {
          content: 'orange',
          color: 'coral',
        },
        {
          content: 'off-white',
          color: 'aliceblue',
        },
      ],
    },
    {
      prompt: 'What is your favorite bruh moment',
      choices: [
        {
          content: '1',
          color: 'rebeccapurple',
        },
        {
          content: '2',
          color: 'taylorpink',
        },
        {
          content: '3',
          color: 'coral',
        },
        {
          content: 'off-4',
          color: 'aliceblue',
        },
      ],
    },
    {
      prompt: 'What should our third question be',
      choices: [
        {
          content: 'yeah',
          color: 'rebeccapurple',
        },
        {
          content: 'nah',
          color: 'taylorpink',
        },
        {
          content: 'orange',
          color: 'coral',
        },
        {
          content: 'wa-white',
          color: 'aliceblue',
        },
      ],
    },
  ],
};
