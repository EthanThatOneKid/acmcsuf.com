import { QuizData, TeamMatch } from './types';

export const QUIZ_DATA: QuizData = {
  questions: [
    {
      prompt: 'What is your biggest career interest?',
      choices: [
        {
          content: 'Publishing research that will help millions.',
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Making the next generation of computer intelligence.',
          color: '#21D19F',
          match: TeamMatch.AI,
        },
        {
          content: 'I want to learn every single thing about the web.',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
        {
          content: 'I love to wow people with the things I create.',
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },
      ],
    },
    {
      prompt: 'What do you prefer to do in your free time?',
      choices: [
        {
          content: 'Talking to digital assitant.',
          color: '#21D19F',
          match: TeamMatch.AI,
        },
        {
          content: 'Solving a 1,000,000 piece puzzle.',
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },
        {
          content: "Correcting people's design and art on the internet.",
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'Making websites/apps.',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
      ],
    },
    {
      prompt: 'What is the most fun part of a project for you?',
      choices: [
        {
          content: 'Optimizing the project.',
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },
        {
          content: 'The final product interaction.',
          color: '#21D19F',
          match: TeamMatch.AI,
        },
        {
          content: 'Creating the project',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
        {
          content: 'Planning out the project.',
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },
      ],
    },
    {
      prompt: 'What is the coolest sounding language?',
      choices: [
        {
          content: 'Julia',
          color: '#21D19F',
          match: TeamMatch.AI,
        },
        {
          content: 'Python',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
        {
          content: 'JavaScript',
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },

        {
          content: 'Assembly',
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },
      ],
    },
    {
      prompt: "When you are playing a videogame, what get's on your nerves?",
      choices: [
        {
          content: 'The enemies are waaayyy too dumb.',
          color: '#21D19F',
          match: TeamMatch.AI,
        },
        {
          content: "I don't like games, they take way too much of my time.",
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },

        {
          content: 'The game is too unpolished for my taste.',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
        {
          content: 'My grandma can draw better on ms paint compared to these graphics.',
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },
      ],
    },
    {
      prompt: 'What do you do when your project’s deadline is tomorrow?',
      choices: [
        {
          content: 'I will not sleep until this is done.',
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Let GitHub Copilot will finish my project.',
          color: '#21D19F',
          match: TeamMatch.AI,
        },

        {
          content: 'IF IT LOOKS LIKE IT WORKS THEN IT WORKS.',
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'Yeah it doesn’t matter, we’ll push what we have.',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
      ],
    },
    {
      prompt: 'What’s your opinion on Object Oriented Programming?',
      choices: [
        {
          content: 'I fear OOP.',
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },
        {
          content: 'What does that mean?',
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'OOP is necessary.',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
        {
          content: 'Don’t need it.',
          color: '#21D19F',
          match: TeamMatch.AI,
        },
      ],
    },
    {
      prompt: 'What is the best ACM team color?',
      choices: [
        {
          content: 'Peaceful Purple',
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Emerald Green',
          color: '#21D19F',
          match: TeamMatch.AI,
        },
        {
          content: 'Electric Blue',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
        {
          content: 'Precious Pink',
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },
      ],
    },
    {
      prompt: 'If you got a job offer from these companies below, which one will you accept?',
      choices: [
        {
          content: 'Google',
          color: '#21D19F',
          match: TeamMatch.AI,
        },
        {
          content: 'Amazon',
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Apple',
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'SpaceX',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
      ],
    },
    {
      prompt: 'What is your favorite IDE/text editor to code on?',
      choices: [
        {
          content: 'VIM',
          color: '#21D19F',
          match: TeamMatch.AI,
        },
        {
          content: 'Google Docs',
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Notepad',
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'Visual Studio Code',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
      ],
    },
    {
      prompt: 'Why are robots awesome?',
      choices: [
        {
          content: 'They can think faster than I do.',
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },

        {
          content: 'They are our successors.',
          color: '#21D19F',
          match: TeamMatch.AI,
        },
        {
          content: 'They are quite robust if I do say so myself.',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
        {
          content: 'THEY LOOK SO DAMN AWESOME',
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },
      ],
    },
    {
      prompt: 'What’s your favorite chair?',
      choices: [
        {
          content: 'Anything will do',
          color: '#21D19F',
          match: TeamMatch.AI,
        },
        {
          content: 'Herman Miller',
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Yoga Ball',
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'GAMING CHAIR',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
      ],
    },
    {
      prompt: 'Favorite drink?',
      choices: [
        {
          content: 'Water',
          color: '#21D19F',
          match: TeamMatch.AI,
        },
        {
          content: 'Soda',
          color: '#9D35E7',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Boba',
          color: '#FF4365',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'Coffee',
          color: '#1E6CFF',
          match: TeamMatch.DEV,
        },
      ],
    },
  ],
};
