import { li } from '$lib/components/recursive-ul/utils';

import type { ClubPosition } from './position';

/**
 * The tools that are used in the club.
 *
 * @remarks This is a map of tool names to their reasons for being used.
 */
export const TOOLS = {
  'Google Drive/Docs': 'To collaborate on presentations, documents, and spreadsheets.',
  Discord: 'Internal team communication, assistance for student questions',
  Figma: 'Create marketing materials and teaching students how to use it',
  GitHub: 'To collaborate on code, manage projects, and teach students how to use it',
  'Social media': 'Discord, Instagram, LinkedIn, and YouTube',
  'Google Colab/Juptyer Notebook': 'Cloud development environment for Python',
};

export const POSITIONS: ClubPosition<keyof typeof TOOLS>[] = [
  {
    title: 'AI Officer',
    teamColor: 'var(--acm-ai-rgb)',
    qualifications: [
      li('Interest in artificial intelligence'),
      li('Interest in public speaking/leading events'),
      li('Passion for guiding AI related student projects'),
    ],
    tools: ['Google Drive/Docs', 'Discord', 'Google Colab/Juptyer Notebook'],
    responsibilities: [
      li('Attend AI board meetings and collaborate with other AI board members for workshops'),
      li(
        'Create biweekly/weekly workshop presentations prior to events that effectively teach students algorithms/data structures',
        [li('Suggest new ideas/topics to teach at a workshop')]
      ),
      li('Oversee multiple AI semester projects'),
      li('Check Discord messages and respond to the important discussion in regards to AI daily'),
    ],
  },
  {
    title: 'Algo Officer',
    teamColor: 'var(--acm-algo-rgb)',
    qualifications: [
      li('Passion for algorithms'),
      li('Productive time management'),
      li('Interest in public speaking and leading events'),
    ],
    tools: ['Google Drive/Docs', 'Discord'],
    responsibilities: [
      li(
        'Attend Algo board meetings and collaborate with other Algo board members for Algo workshops'
      ),
      li(
        'Create weekly workshop presentations prior to events that effectively teach students algorithms/data structures'
      ),
      li('Check Discord messages and respond to the important discussion in regards to Algo daily'),
    ],
  },
  {
    title: 'Design Officer',
    teamColor: 'var(--acm-design-rgb)',
    qualifications: [
      li('Open mind to suggest new ideas in the field of design'),
      li('Interest in learning and teaching common apps (ex. Figma)'),
      li('Interest in programming to create basic front-end applications'),
    ],
    tools: ['Google Drive/Docs', 'Discord', 'Figma'],
    responsibilities: [
      li(
        'Host engaging and interesting biweekly/weekly events along with the Design President and Officers'
      ),
      li(
        'Research common design practices in tech and brands to relay this information via workshops and events, and to enhance our chapter'
      ),
      li('Attend weekly team meetings to catch up on what’s being worked on, progress, etc.'),
      li(
        'Check Discord messages and respond to the important discussion in regards to Design at least daily'
      ),
    ],
  },
  {
    title: 'Dev Officer',
    teamColor: 'var(--acm-dev-rgb)',
    qualifications: [
      li('Passion for helping students develop projects'),
      li('Strong communication and leadership'),
      li('Flexibility with skills to assist students in a variety of projects'),
    ],
    tools: ['Google Drive/Docs', 'Discord', 'GitHub'],
    responsibilities: [
      li(
        'Attend Dev board meetings, provide essential input and collaborate with the Dev President and other officers'
      ),
      li('Oversee multiple Dev semester projects'),
      li('Assist and direct students in ACM Open Source Projects'),
      li(
        'Possibility of being tasked to collaborate and participate in events created in partnerships with other ACM branches',
        [
          li(
            'These can include creating and presenting workshops on behalf of Dev or organizing an collab event'
          ),
        ]
      ),
      li(
        'Check Discord messages and respond to the important discussion in regards to Dev at least daily'
      ),
    ],
  },
  {
    title: 'Game Dev Officer',
    teamColor: 'var(--acm-gamedev-rgb)',
    qualifications: [
      li('Passion and interest in game development'),
      li('Strong communication and leadership'),
      li('Flexibility with skills to assist students in a variety of projects'),
    ],
    tools: ['Google Drive/Docs', 'Discord', 'GitHub'],
    responsibilities: [
      li(
        'Attend Game Dev board meetings, provide essential input and collaborate with the Game Dev President and other officers'
      ),
      li('Assist and direct students in Game Dev related projects'),
      li(
        'Host engaging and interesting biweekly/weekly workshops along with the Design President and Officers'
      ),
      li(
        'Research common game dev techniques to relay this information via workshops and events, and to enhance our chapter'
      ),
      li(
        'Check Discord messages and respond to the important discussion in regards to Dev at least daily'
      ),
    ],
  },
  {
    title: 'Marketing Officer',
    teamColor: 'var(--acm-marketing-rgb)',
    qualifications: [
      li('Interest in exploring business and marketing'),
      li('Substantial awareness or usage of multiple social media platforms'),
      li('Represent and advocate diversity within the club'),
    ],
    tools: ['Google Drive/Docs', 'Discord', 'GitHub'],
    responsibilities: [
      li(
        'Assist in designing flyers for marketing to be printed and posted on all forms of social media'
      ),
      li('Suggest and direct new ideas for the diversification of our club '),
      li('Take pictures of our members to add to our socials and website gallery'),
      li('Produce paragraphs for the announcements in our official Discord server'),
    ],
  },
];
