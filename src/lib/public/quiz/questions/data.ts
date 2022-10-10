import type { QuizData } from './types';
import { TeamMatch } from './types';

export const QUIZ_DATA: QuizData = {
  questions: [
    {
      prompt: 'What is your biggest career interest?',
      choices: [
        {
          content: 'Publishing research that will help millions.',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Making the next generation of computer intelligence.',
          match: TeamMatch.AI,
        },
        {
          content: 'I want to learn every single thing about the web.',
          match: TeamMatch.DEV,
        },
        {
          content: 'I love to wow people with the things I create.',
          match: TeamMatch.DESIGN,
        },
      ],
    },
    {
      prompt: 'What do you prefer to do in your free time?',
      choices: [
        {
          content: 'Talking to digital assitant.',
          match: TeamMatch.AI,
        },
        {
          content: 'Solving a 1,000,000 piece puzzle.',
          match: TeamMatch.ALGO,
        },
        {
          content: "Correcting people's design and art on the internet.",
          match: TeamMatch.DESIGN,
        },
        {
          content: 'Making websites/apps.',
          match: TeamMatch.DEV,
        },
      ],
    },
    {
      prompt: 'What is the most fun part of a project for you?',
      choices: [
        {
          content: 'Optimizing the project.',
          match: TeamMatch.ALGO,
        },
        {
          content: 'The final product interaction.',
          match: TeamMatch.AI,
        },
        {
          content: 'Creating the project',
          match: TeamMatch.DEV,
        },
        {
          content: 'Planning out the project.',
          match: TeamMatch.DESIGN,
        },
      ],
    },
    {
      prompt: 'What is the coolest sounding language?',
      choices: [
        {
          content: 'Julia',
          match: TeamMatch.AI,
        },
        {
          content: 'Python',
          match: TeamMatch.DEV,
        },
        {
          content: 'JavaScript',
          match: TeamMatch.DESIGN,
        },

        {
          content: 'Assembly',
          match: TeamMatch.ALGO,
        },
      ],
    },
    {
      prompt: "When you are playing a videogame, what get's on your nerves?",
      choices: [
        {
          content: 'The enemies are waaayyy too dumb.',
          match: TeamMatch.AI,
        },
        {
          content: "I don't like games, they take way too much of my time.",
          match: TeamMatch.ALGO,
        },

        {
          content: 'The game is too unpolished for my taste.',
          match: TeamMatch.DEV,
        },
        {
          content: 'My grandma can draw better on ms paint compared to these graphics.',
          match: TeamMatch.DESIGN,
        },
      ],
    },
    {
      prompt: 'What do you do when your project’s deadline is tomorrow?',
      choices: [
        {
          content: 'I will not sleep until this is done.',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Let GitHub Copilot will finish my project.',
          match: TeamMatch.AI,
        },

        {
          content: 'IF IT LOOKS LIKE IT WORKS THEN IT WORKS.',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'Yeah it doesn’t matter, we’ll push what we have.',
          match: TeamMatch.DEV,
        },
      ],
    },
    {
      prompt: 'What’s your opinion on Object Oriented Programming?',
      choices: [
        {
          content: 'I fear OOP.',
          match: TeamMatch.ALGO,
        },
        {
          content: 'What does that mean?',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'OOP is necessary.',
          match: TeamMatch.DEV,
        },
        {
          content: 'Don’t need it.',
          match: TeamMatch.AI,
        },
      ],
    },
    {
      prompt: 'What is the best ACM team color?',
      choices: [
        {
          content: 'Peaceful Purple',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Emerald Green',
          match: TeamMatch.AI,
        },
        {
          content: 'Electric Blue',
          match: TeamMatch.DEV,
        },
        {
          content: 'Precious Pink',
          match: TeamMatch.DESIGN,
        },
      ],
    },
    {
      prompt: 'If you got a job offer from these companies below, which one will you accept?',
      choices: [
        {
          content: 'Google',
          match: TeamMatch.AI,
        },
        {
          content: 'Amazon',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Apple',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'SpaceX',
          match: TeamMatch.DEV,
        },
      ],
    },
    {
      prompt: 'What is your favorite IDE/text editor to code on?',
      choices: [
        {
          content: 'VIM',
          match: TeamMatch.AI,
        },
        {
          content: 'Google Docs',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Notepad',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'Visual Studio Code',
          match: TeamMatch.DEV,
        },
      ],
    },
    {
      prompt: 'Why are robots awesome?',
      choices: [
        {
          content: 'They can think faster than I do.',
          match: TeamMatch.ALGO,
        },

        {
          content: 'They are our successors.',
          match: TeamMatch.AI,
        },
        {
          content: 'They are quite robust if I do say so myself.',
          match: TeamMatch.DEV,
        },
        {
          content: 'THEY LOOK SO DAMN AWESOME',
          match: TeamMatch.DESIGN,
        },
      ],
    },
    {
      prompt: 'What’s your favorite chair?',
      choices: [
        {
          content: 'Anything will do',
          match: TeamMatch.AI,
        },
        {
          content: 'Herman Miller',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Yoga Ball',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'GAMING CHAIR',
          match: TeamMatch.DEV,
        },
      ],
    },
    {
      prompt: 'Favorite drink?',
      choices: [
        {
          content: 'Water',
          match: TeamMatch.AI,
        },
        {
          content: 'Soda',
          match: TeamMatch.ALGO,
        },
        {
          content: 'Boba',
          match: TeamMatch.DESIGN,
        },
        {
          content: 'Coffee',
          match: TeamMatch.DEV,
        },
      ],
    },
  ],
};
