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
  'Unreal/Unity': 'Game development environment',
};

export const POSITIONS: ClubPosition<keyof typeof TOOLS>[] = [
  {
    title: 'President',
    teamColor: 'var(--acm-general-rgb)',
    qualifications: [
      li("Must have a deep commitment to the organization's mission and goals"),
      li('Strong leadership, communication, and organizational skills'),
      li('Committed to promoting diversity and inclusion within the organization'),
    ],
    requirements: [li('Must be a member of ACM for at least one semester')],
    tools: [
      'Google Drive/Docs',
      'Discord',
      'Figma',
      'GitHub',
      'Social media',
      'Google Colab/Juptyer Notebook',
    ],
    responsibilities: [
      li(
        'Official spokesperson of the organization, representing the policies, views and opinions of the organization in its relations with the campus and community at large'
      ),
      li(
        'Works with the Computer Science Department to plan, create, and advertise programs that benefit the student population'
      ),
      li('Collaborates with board members to establish new programs or to maintain existing ones'),
      li('Provides resources and support to fellow board members'),
      li('Meets with club advisors regularly to discuss the state of the organization'),
    ],
  },
  {
    title: 'Vice President',
    teamColor: 'var(--acm-general-rgb)',
    qualifications: [
      li('Retain similar intentions as the President and provide the backend support'),
      li('Must be approachable, positive, empathetic, and flexible'),
      li("Be familiar with the President's responsibilities and be able to step in if needed"),
    ],
    tools: [
      'Google Drive/Docs',
      'Discord',
      'Figma',
      'GitHub',
      'Social media',
      'Google Colab/Juptyer Notebook',
    ],
    responsibilities: [
      li('Presides at the organization’s meetings in the absence of the President'),
      li('Collaborates with the President to carry out tasks'),
      li('Organizes at least one board meeting a month'),
      li('Assist in reaching out other organizations to do collaborations'),
      li('Oversees all ACM teams and workshops'),
      li('Check Discord messages and respond to the important discussion in regards to ACM daily'),
    ],
  },
  {
    title: 'Treasurer',
    teamColor: 'var(--acm-general-rgb)',
    qualifications: [
      li('Strong organizational skills'),
      li(
        'Expertise and understanding of financial management, financial reporting, and budgeting.'
      ),
      li('Flexible schedule and availability to attend weekly ECS-ICC meetings'),
    ],
    tools: ['Google Drive/Docs', 'Discord'],
    responsibilities: [
      li('Handle all financial affairs and budgeting of the organization'),
      li(
        "Maintain ASI Agency Accounts in the organization's name, which requires signatures of the Treasurer, President, and Advisor"
      ),
      li('Manage club equipment and t-shirts'),
      li('Submit Financial Annual Report'),
      li('Lead fundraising effort and attaining professional sponsorship'),
      li('Manage sponsorship packet and disbursement'),
      li('Attend weekly ECS-ICC meetings and request funding for events if necessary'),
    ],
  },
  {
    title: 'AI Team Lead',
    teamColor: 'var(--acm-ai-rgb)',
    qualifications: [
      li('Interest in artificial intelligence'),
      li('Interest in public speaking/leading events'),
      li('Passion for guiding AI related student projects'),
      li('Strong leadership, communication, and organizational skills'),
    ],
    tools: ['Google Drive/Docs', 'Discord', 'Google Colab/Juptyer Notebook', 'GitHub'],
    responsibilities: [
      li(
        'Create biweekly/weekly workshop presentations prior to events that effectively teach students artificial intelligence'
      ),
      li('Recruit members to set up and maintain infrastructure for the AI Team'),
      li('Check Discord messages and respond to the important discussion in regards to AI daily'),
      li('Attend all necessary ACM Executive Board Meetings'),
    ],
  },
  {
    title: 'Algo Team Lead',
    teamColor: 'var(--acm-algo-rgb)',
    qualifications: [
      li('Passion for algorithms'),
      li('Productive time management'),
      li('Interest in public speaking and leading events'),
      li('Strong leadership, communication, and organizational skills'),
    ],
    tools: ['Google Drive/Docs', 'Discord'],
    responsibilities: [
      li(
        'Create biweekly/weekly workshop presentations prior to events that effectively teach students algorithms/data structures'
      ),
      li('Recruit members to set up and maintain infrastructure for the Algo Team'),
      li('Check Discord messages and respond to the important discussion in regards to Algo daily'),
      li('Attend all necessary ACM Executive Board Meetings'),
    ],
  },
  {
    title: 'Design Team Lead',
    teamColor: 'var(--acm-design-rgb)',
    qualifications: [
      li('Open mind to suggest new ideas in the field of design'),
      li('Interest in learning and teaching common apps (ex. Figma)'),
      li('Interest in programming to create basic front-end applications'),
      li('Strong leadership, communication, and organizational skills'),
    ],
    tools: ['Google Drive/Docs', 'Discord', 'Figma'],
    responsibilities: [
      li(
        'Create biweekly/weekly workshop presentations prior to events that effectively teach students design'
      ),
      li('Recruit members to set up and maintain infrastructure for the Design Team'),
      li(
        'Check Discord messages and respond to the important discussion in regards to Design daily'
      ),
      li('Attend all necessary ACM Executive Board Meetings'),
    ],
  },
  {
    title: 'Dev Team Lead',
    teamColor: 'var(--acm-dev-rgb)',
    qualifications: [
      li('Passion for helping students develop projects'),
      li('Strong leadership, communication, and organizational skills'),
      li('Flexibility with skills to assist students in a variety of projects'),
    ],
    tools: ['Google Drive/Docs', 'Discord', 'GitHub'],
    responsibilities: [
      li(
        'Create biweekly/weekly workshop presentations prior to events that effectively teach students common development tools'
      ),
      li('Oversee and manage multiple projects and teams'),
      li('Recruit members to set up and maintain infrastructure for the Dev Team'),
      li('Check Discord messages and respond to the important discussion in regards to Dev daily'),
      li('Attend all necessary ACM Executive Board Meetings'),
    ],
  },
  {
    title: 'Game Dev Team Lead',
    teamColor: 'var(--acm-gamedev-rgb)',
    qualifications: [
      li('Passion and interest in game development'),
      li('Strong leadership, communication, and organizational skills'),
      li('Flexibility with skills to assist students in a variety of projects'),
    ],
    tools: ['Google Drive/Docs', 'Discord', 'GitHub', 'Unreal/Unity'],
    responsibilities: [
      li(
        'Create biweekly/weekly workshop presentations prior to events that effectively teach students game development'
      ),
      li('Recruit members to set up and maintain infrastructure for the Game Dev Team'),
      li(
        'Check Discord messages and respond to the important discussion in regards to Game Dev daily'
      ),
      li('Attend all necessary ACM Executive Board Meetings'),
    ],
  },
  {
    title: 'Marketing Team Lead',
    teamColor: 'var(--acm-marketing-rgb)',
    qualifications: [
      li('Interest in exploring business and marketing'),
      li('Substantial awareness or usage of multiple social media platforms'),
      li('Represent and advocate diversity within the club'),
      li('Strong management and organizational skills'),
    ],
    tools: ['Google Drive/Docs', 'Discord', 'Figma', 'Social media'],
    responsibilities: [
      li(
        'Assist in designing flyers for marketing to be printed and posted on all forms of social media'
      ),
      li('Suggest and direct new ideas for the diversification of our club'),
      li('Oversee and manage all social media platforms'),
      li('Delegate tasks to other board members of the Marketing Team'),
    ],
  },
];
