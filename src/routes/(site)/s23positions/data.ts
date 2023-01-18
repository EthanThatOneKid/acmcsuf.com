import type { ListItem } from '$lib/components/recursive-ul/types';
import { TEAMS } from '$lib/public/board/data';
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

function li(html: string, children?: ListItem[]): ListItem {
  return { html, children };
}

export const POSITIONS: ClubPosition<keyof typeof TOOLS>[] = [
  {
    title: 'AI Officer',
    teamColor: 'var(--acm-ai-rgb)',
    requirements: [
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
    requirements: [
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
  // TODO: Design Officer
  {
    title: 'Dev Officer',
    teamColor: 'var(--acm-dev-rgb)',
    requirements: [
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
  // TODO: Game Dev Officer
  // TODO: Marketing Officer
];
