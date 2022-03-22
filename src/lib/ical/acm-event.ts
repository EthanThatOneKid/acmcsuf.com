import type { ICALResolvable } from './utils';

export class AcmEvent {
  private constructor(private icalData: ICALResolvable) {}

  get

  /*
  date: Date;
  month: string;
  day: number;
  time: string;
  location: string;
  title: string;
  description: string;
  summary: string;
  meetingLink: string;
  slug: string;
  selfLink: string;
  recurring: boolean;
  acmPath: AcmPath;
  calendarLinks: {
    google: string;
    outlook: string;
  };
  */

  static from(icalData: ICALResolvable) {
    return new AcmEvent(icalData);
  }
}
