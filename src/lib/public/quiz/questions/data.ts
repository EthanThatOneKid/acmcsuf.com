import type { QuizData } from './types';
import { TeamMatch } from './types';

export const QUIZ_DATA: QuizData = {
  questions: [
    {
      prompt: 'What is your biggest career interest?',
      choices: [
        {
          content: 'Leverage algorithms and competitive programming to solve complex problems.',
          match: [TeamMatch.ALGO, TeamMatch.ICPC],
        },
        {
          content: 'Making the next generation of computer intelligence.',
          match: [TeamMatch.AI],
        },
        {
          content: 'I want to learn every single thing about the web.',
          match: [TeamMatch.DEV, TeamMatch.OSS],
        },
        {
          content: 'I love to wow people with the things I create.',
          match: [TeamMatch.DESIGN, TeamMatch.GAMEDEV],
        },
      ],
    },
    {
      prompt: 'What do you prefer to do in your free time?',
      choices: [
        {
          content: 'Talking to digital assitant.',
          match: [TeamMatch.AI],
        },
        {
          content: 'Solving a 1,000,000 piece puzzle.',
          match: [TeamMatch.ALGO, TeamMatch.ICPC],
        },
        {
          content: "Correcting people's design and art on the internet.",
          match: [TeamMatch.DESIGN, TeamMatch.GAMEDEV],
        },
        {
          content: 'Making websites/apps.',
          match: [TeamMatch.DEV, TeamMatch.OSS],
        },
      ],
    },
    {
      prompt: 'What is the most fun part of a project for you?',
      choices: [
        {
          content: 'Optimizing the project.',
          match: [TeamMatch.ALGO, TeamMatch.OSS],
        },
        {
          content: 'The final product interaction.',
          match: [TeamMatch.AI, TeamMatch.DESIGN],
        },
        {
          content: 'Creating the project.',
          match: [TeamMatch.DEV, TeamMatch.GAMEDEV],
        },
        {
          content: 'Planning out the project.',
          match: [TeamMatch.DESIGN, TeamMatch.ICPC],
        },
      ],
    },
    {
      prompt: 'If you could choose one programming language, which would you choose?',
      choices: [
        {
          content: 'JavaScript',
          match: [TeamMatch.OSS, TeamMatch.DESIGN],
        },
        {
          content: 'C++/Python',
          match: [TeamMatch.ICPC, TeamMatch.ALGO, TeamMatch.AI],
        },
        {
          content: 'C#',
          match: [TeamMatch.GAMEDEV],
        },

        {
          content: 'Only one? What am i supposed to do with that?',
          match: [TeamMatch.OSS, TeamMatch.DEV],
        },
      ],
    },
    {
      prompt: 'How much collaboration do you prefer when working on projects?',
      choices: [
        {
          content: 'I love working with people!',
          match: [
            TeamMatch.GAMEDEV,
            TeamMatch.ICPC,
            TeamMatch.OSS,
            TeamMatch.DESIGN,
            TeamMatch.DEV,
          ],
        },
        {
          content: 'I will work with others if asked.',
          match: [TeamMatch.GAMEDEV, TeamMatch.OSS, TeamMatch.DEV],
        },

        {
          content: 'I would rather work solo.',
          match: [TeamMatch.DEV, TeamMatch.ALGO],
        },
        {
          content: 'I do not care.',
          match: [TeamMatch.DESIGN, TeamMatch.OSS],
        },
      ],
    },
    {
      prompt: 'What do you do when your project’s deadline is tomorrow?',
      choices: [
        {
          content: 'I will not sleep until this is done.',
          match: [TeamMatch.ALGO, TeamMatch.ICPC],
        },
        {
          content: 'Let GitHub Copilot will finish my project.',
          match: [TeamMatch.AI, TeamMatch.DEV],
        },
        {
          content: 'IF IT LOOKS LIKE IT WORKS THEN IT WORKS.',
          match: [TeamMatch.DESIGN, TeamMatch.GAMEDEV],
        },
        {
          content: 'Yeah it doesn’t matter, we’ll push what we have.',
          match: [TeamMatch.DEV],
        },
      ],
    },
    {
      prompt: 'What’s your opinion on Object Oriented Programming?',
      choices: [
        {
          content: 'I fear OOP.',
          match: [TeamMatch.ALGO, TeamMatch.ICPC],
        },
        {
          content: 'What does that mean?',
          match: [TeamMatch.DESIGN],
        },
        {
          content: 'OOP is necessary.',
          match: [TeamMatch.DEV, TeamMatch.OSS, TeamMatch.GAMEDEV],
        },
        {
          content: 'Don’t need it.',
          match: [TeamMatch.AI],
        },
      ],
    },
    {
      prompt: 'What is your favorite way to run code?',
      choices: [
        {
          content: 'On my own machine/on a server',
          match: [TeamMatch.GAMEDEV, TeamMatch.OSS, TeamMatch.DEV],
        },
        {
          content: 'In Google Collab',
          match: [TeamMatch.AI],
        },
        {
          content: 'In a JsFiddle',
          match: [TeamMatch.DESIGN],
        },
        {
          content: 'On leetcode/kattis/codeforce',
          match: [TeamMatch.ALGO, TeamMatch.ICPC],
        },
      ],
    },
    {
      prompt: 'If you got a job offer from these companies below, which one will you accept?',
      choices: [
        {
          content: 'Google',
          match: [TeamMatch.AI],
        },
        {
          content: 'Amazon',
          match: [TeamMatch.ALGO, TeamMatch.ICPC],
        },
        {
          content: 'Apple',
          match: [TeamMatch.DESIGN],
        },
        {
          content: 'SpaceX',
          match: [TeamMatch.DEV, TeamMatch.OSS],
        },
      ],
    },
    {
      prompt: 'What is your favorite IDE/text editor to code on?',
      choices: [
        {
          content: 'VIM',
          match: [TeamMatch.AI, TeamMatch.DEV],
        },
        {
          content: 'Google Docs',
          match: [TeamMatch.ALGO, TeamMatch.ICPC],
        },
        {
          content: 'Notepad',
          match: [TeamMatch.DESIGN],
        },
        {
          content: 'Visual Studio Code',
          match: [TeamMatch.OSS],
        },
      ],
    },
    {
      prompt: 'When you hear about a bug in someone’s code you…',
      choices: [
        {
          content: 'Suggest “Ask ChatGPT!”',
          match: [TeamMatch.AI],
        },
        {
          content:
            'Break down the problem, and offer three possible solutions before returning to your one-liner',
          match: [TeamMatch.ALGO, TeamMatch.ICPC],
        },
        {
          content: 'Say “Damn that sucks” and keep working on making your project beautiful',
          match: [TeamMatch.DESIGN, TeamMatch.GAMEDEV],
        },
        {
          content:
            'Sit down and help them solve their problem but complain that they should just use Linux',
          match: [TeamMatch.OSS, TeamMatch.DEV],
        },
      ],
    },
    {
      prompt: 'How many contributions do you have on Github?',
      choices: [
        {
          content: 'Too many',
          match: [TeamMatch.OSS, TeamMatch.DEV],
        },
        {
          content: 'More than you',
          match: [TeamMatch.ICPC, TeamMatch.OSS],
        },
        {
          content: 'Enough to show off',
          match: [TeamMatch.GAMEDEV, TeamMatch.AI, TeamMatch.DESIGN, TeamMatch.DEV],
        },
        {
          content: 'I keep everything locally',
          match: [TeamMatch.ICPC, TeamMatch.ALGO, TeamMatch.AI],
        },
      ],
    },
    {
      prompt: 'Favorite drink?',
      choices: [
        {
          content: 'Water',
          match: [TeamMatch.AI, TeamMatch.DEV],
        },
        {
          content: 'Soda',
          match: [TeamMatch.ALGO],
        },
        {
          content: 'Boba',
          match: [TeamMatch.DESIGN, TeamMatch.AI],
        },
        {
          content: 'Coffee',
          match: [TeamMatch.DEV, TeamMatch.GAMEDEV, TeamMatch.OSS],
        },
      ],
    },
  ],
};
