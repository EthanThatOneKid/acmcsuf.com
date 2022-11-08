import type { Team } from '$lib/public/board/types';

export interface ClubEvent {
  month: string;
  day: number;
  startTime: string;
  endTime: string;
  hasStarted: boolean;
  hasEnded: boolean;
  isPinned: boolean;
  duration: string;
  date: string;
  location: string;
  title: string;
  description: string;
  summary: string;
  meetingLink: string;
  slug: string;
  selfLink: string;
  recurring: boolean;
  team: Team;
  calendarLinks: {
    google: string;
    outlook: string;
  };
}
